#!/usr/bin/env tsx
/**
 * Clean Up Duplicate Records for 370-01 and 312-01
 * 
 * These formulations were imported twice - once in the full import,
 * and once when we manually re-imported them. We need to keep only
 * the oldest set and delete the duplicates.
 */

import pg from 'pg';

const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

async function cleanup() {
  await client.connect();
  
  console.log('🧹 CLEANING UP DUPLICATE RECORDS\n');
  console.log('='.repeat(60));
  
  try {
    await client.query('BEGIN');
    
    // For formulations 370-01 and 312-01, we need to:
    // 1. Keep the oldest formulation_country records
    // 2. Delete duplicate use groups
    // 3. Delete duplicate business cases and junctions
    
    const targetFormulations = ['370-01', '312-01'];
    
    for (const code of targetFormulations) {
      console.log(`\n🔧 Processing ${code}...`);
      
      // Get formulation_id
      const formResult = await client.query(`
        SELECT formulation_id FROM formulations WHERE formulation_code = $1
      `, [code]);
      
      if (formResult.rows.length === 0) {
        console.log(`   ⚠️  Formulation not found, skipping`);
        continue;
      }
      
      const formulationId = formResult.rows[0].formulation_id;
      
      // For each country with duplicates, keep only the oldest formulation_country_id
      const dupCountries = await client.query(`
        SELECT c.country_code, COUNT(*) as count
        FROM formulation_country fc
        JOIN countries c ON c.country_id = fc.country_id
        WHERE fc.formulation_id = $1
        GROUP BY c.country_code
        HAVING COUNT(*) > 1
      `, [formulationId]);
      
      if (dupCountries.rows.length > 0) {
        console.log(`   Found ${dupCountries.rows.length} countries with duplicates`);
        
        for (const dupCountry of dupCountries.rows) {
          const countryCode = dupCountry.country_code;
          
          // Get all formulation_country_ids for this formulation+country, ordered by created_at
          const fcIds = await client.query(`
            SELECT fc.formulation_country_id, fc.created_at
            FROM formulation_country fc
            JOIN countries c ON c.country_id = fc.country_id
            WHERE fc.formulation_id = $1 AND c.country_code = $2
            ORDER BY fc.created_at ASC
          `, [formulationId, countryCode]);
          
          // Keep the first (oldest), delete the rest
          const keepId = fcIds.rows[0].formulation_country_id;
          const deleteIds = fcIds.rows.slice(1).map(r => r.formulation_country_id);
          
          if (deleteIds.length > 0) {
            console.log(`   - ${countryCode}: Keeping oldest, deleting ${deleteIds.length} duplicates`);
            
            // Delete dependent records first
            
            // Delete business_case_use_groups linked through these duplicate use groups
            await client.query(`
              DELETE FROM business_case_use_groups
              WHERE formulation_country_use_group_id IN (
                SELECT formulation_country_use_group_id
                FROM formulation_country_use_group
                WHERE formulation_country_id = ANY($1::uuid[])
              )
            `, [deleteIds]);
            
            // Delete business cases that are now orphaned (no junctions)
            await client.query(`
              DELETE FROM business_case bc
              WHERE bc.created_by = 'UUID Import Script'
                AND NOT EXISTS (
                  SELECT 1 FROM business_case_use_groups bcug
                  WHERE bcug.business_case_id = bc.business_case_id
                )
            `);
            
            // Delete the duplicate use groups
            await client.query(`
              DELETE FROM formulation_country_use_group
              WHERE formulation_country_id = ANY($1::uuid[])
            `, [deleteIds]);
            
            // Delete the duplicate formulation_country records
            await client.query(`
              DELETE FROM formulation_country
              WHERE formulation_country_id = ANY($1::uuid[])
            `, [deleteIds]);
          }
        }
      } else {
        console.log(`   ✅ No duplicate countries found`);
      }
    }
    
    // Also clean up any remaining duplicate business cases
    console.log('\n🔧 Cleaning up duplicate business cases...');
    
    // First, identify duplicate business cases (same group + year, keep oldest)
    const duplicateBCs = await client.query(`
      WITH duplicates AS (
        SELECT business_case_id, business_case_group_id, year_offset,
               ROW_NUMBER() OVER (PARTITION BY business_case_group_id, year_offset ORDER BY created_at) as rn
        FROM business_case
        WHERE created_by = 'UUID Import Script'
      )
      SELECT business_case_id FROM duplicates WHERE rn > 1
    `);
    
    if (duplicateBCs.rows.length > 0) {
      const duplicateIds = duplicateBCs.rows.map(r => r.business_case_id);
      
      // Delete junctions first
      const deletedJunctions = await client.query(`
        DELETE FROM business_case_use_groups
        WHERE business_case_id = ANY($1::uuid[])
        RETURNING *
      `, [duplicateIds]);
      
      console.log(`   Deleted ${deletedJunctions.rows.length} junction records for duplicate business cases`);
      
      // Then delete the duplicate business cases
      const deletedBCs = await client.query(`
        DELETE FROM business_case
        WHERE business_case_id = ANY($1::uuid[])
        RETURNING *
      `, [duplicateIds]);
      
      console.log(`   Deleted ${deletedBCs.rows.length} duplicate business case records`);
    } else {
      console.log(`   No duplicate business cases found`);
    }
    
    await client.query('COMMIT');
    
    console.log('\n✅ CLEANUP COMPLETE\n');
    console.log('📊 Verifying final counts...\n');
    
    // Verify counts
    const formCount = await client.query(`SELECT COUNT(*) as count FROM formulations WHERE created_by = 'UUID Import Script'`);
    console.log(`   Formulations: ${formCount.rows[0].count}`);
    
    const fcCount = await client.query(`
      SELECT COUNT(*) as count FROM formulation_country fc
      WHERE fc.formulation_id IN (SELECT formulation_id FROM formulations WHERE created_by = 'UUID Import Script')
    `);
    console.log(`   Formulation-Country Links: ${fcCount.rows[0].count} (expected: 720)`);
    
    const bcCount = await client.query(`SELECT COUNT(*) as count FROM business_case WHERE created_by = 'UUID Import Script'`);
    console.log(`   Business Cases: ${bcCount.rows[0].count} (expected: 7200)`);
    
    // Check for remaining duplicates
    const remainingDups = await client.query(`
      SELECT business_case_group_id, year_offset, COUNT(*) as count
      FROM business_case
      WHERE created_by = 'UUID Import Script'
      GROUP BY business_case_group_id, year_offset
      HAVING COUNT(*) > 1
    `);
    
    console.log(`   Remaining duplicate business cases: ${remainingDups.rows.length}`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error during cleanup:', error);
    throw error;
  } finally {
    await client.end();
  }
}

cleanup().catch(console.error);

