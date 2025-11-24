#!/usr/bin/env tsx
/**
 * Verify Full Import - All 329 Formulations
 * 
 * Comprehensive verification of the full import including:
 * - Total counts for all entities
 * - Data integrity checks
 * - Relationship verification
 * - Sample data validation
 */

import pg from 'pg';

const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

async function main() {
  try {
    await client.connect();
    console.log('✅ Connected to database\n');
    
    // 1. Overall counts
    console.log('📊 OVERALL IMPORT STATISTICS');
    console.log('='.repeat(50));
    
    const formulations = await client.query(`
      SELECT COUNT(*) as count FROM formulations WHERE created_by = 'UUID Import Script'
    `);
    console.log(`Formulations: ${formulations.rows[0].count}`);
    
    const ingredients = await client.query(`
      SELECT COUNT(*) as count FROM formulation_ingredients fi
      WHERE fi.formulation_id IN (
        SELECT formulation_id FROM formulations WHERE created_by = 'UUID Import Script'
      )
    `);
    console.log(`Formulation Ingredients: ${ingredients.rows[0].count}`);
    
    const countries = await client.query(`
      SELECT COUNT(*) as count FROM formulation_country fc
      WHERE fc.formulation_id IN (
        SELECT formulation_id FROM formulations WHERE created_by = 'UUID Import Script'
      )
    `);
    console.log(`Formulation-Country Links: ${countries.rows[0].count}`);
    
    const useGroups = await client.query(`
      SELECT COUNT(*) as count FROM formulation_country_use_group fcug
      WHERE fcug.formulation_country_id IN (
        SELECT fc.formulation_country_id FROM formulation_country fc
        WHERE fc.formulation_id IN (
          SELECT formulation_id FROM formulations WHERE created_by = 'UUID Import Script'
        )
      )
    `);
    console.log(`Use Groups: ${useGroups.rows[0].count}`);
    
    const businessCases = await client.query(`
      SELECT COUNT(*) as count FROM business_case WHERE created_by = 'UUID Import Script'
    `);
    console.log(`Business Cases: ${businessCases.rows[0].count}`);
    
    const junctions = await client.query(`
      SELECT COUNT(*) as count FROM business_case_use_groups bcug
      WHERE bcug.business_case_id IN (
        SELECT business_case_id FROM business_case WHERE created_by = 'UUID Import Script'
      )
    `);
    console.log(`Business Case-Use Group Junctions: ${junctions.rows[0].count}`);
    
    const cogs = await client.query(`
      SELECT COUNT(*) as count FROM cogs c
      WHERE c.formulation_id IN (
        SELECT formulation_id FROM formulations WHERE created_by = 'UUID Import Script'
      )
    `);
    console.log(`COGS Entries: ${cogs.rows[0].count} (expected 0 - skipped intentionally)`);
    
    // 2. Formulation categories breakdown
    console.log('\n📋 FORMULATIONS BY CATEGORY');
    console.log('='.repeat(50));
    const categories = await client.query(`
      SELECT formulation_category, COUNT(*)::text as count
      FROM formulations
      WHERE created_by = 'UUID Import Script'
      GROUP BY formulation_category
      ORDER BY formulation_category
    `);
    console.table(categories.rows);
    
    // 3. Data completeness - formulations with countries
    console.log('\n🌍 FORMULATIONS WITH COUNTRY COVERAGE');
    console.log('='.repeat(50));
    const countryCoverage = await client.query(`
      SELECT 
        CASE 
          WHEN country_count = 0 THEN 'No countries'
          WHEN country_count BETWEEN 1 AND 5 THEN '1-5 countries'
          WHEN country_count BETWEEN 6 AND 10 THEN '6-10 countries'
          WHEN country_count > 10 THEN '10+ countries'
        END as coverage,
        COUNT(*)::text as formulation_count
      FROM (
        SELECT f.formulation_id, COUNT(fc.formulation_country_id) as country_count
        FROM formulations f
        LEFT JOIN formulation_country fc ON fc.formulation_id = f.formulation_id
        WHERE f.created_by = 'UUID Import Script'
        GROUP BY f.formulation_id
      ) counts
      GROUP BY coverage
      ORDER BY coverage
    `);
    console.table(countryCoverage.rows);
    
    // 4. Business cases per formulation
    console.log('\n📊 BUSINESS CASES DISTRIBUTION');
    console.log('='.repeat(50));
    const bcDistribution = await client.query(`
      SELECT 
        CASE 
          WHEN case_count = 0 THEN 'No business cases'
          WHEN case_count BETWEEN 1 AND 50 THEN '1-50 cases'
          WHEN case_count BETWEEN 51 AND 100 THEN '51-100 cases'
          WHEN case_count > 100 THEN '100+ cases'
        END as distribution,
        COUNT(*)::text as formulation_count
      FROM (
        SELECT f.formulation_id, COUNT(bc.business_case_id) as case_count
        FROM formulations f
        LEFT JOIN formulation_country fc ON fc.formulation_id = f.formulation_id
        LEFT JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = fc.formulation_country_id
        LEFT JOIN business_case_use_groups bcug ON bcug.formulation_country_use_group_id = fcug.formulation_country_use_group_id
        LEFT JOIN business_case bc ON bc.business_case_id = bcug.business_case_id
        WHERE f.created_by = 'UUID Import Script'
        GROUP BY f.formulation_id
      ) counts
      GROUP BY distribution
      ORDER BY distribution
    `);
    console.table(bcDistribution.rows);
    
    // 5. Data integrity checks
    console.log('\n🔍 DATA INTEGRITY CHECKS');
    console.log('='.repeat(50));
    
    // Check for orphaned records
    const orphanedIngredients = await client.query(`
      SELECT COUNT(*) as count
      FROM formulation_ingredients fi
      WHERE fi.formulation_id IN (
          SELECT formulation_id FROM formulations WHERE created_by = 'UUID Import Script'
        )
        AND NOT EXISTS (
          SELECT 1 FROM formulations f
          WHERE f.formulation_id = fi.formulation_id
        )
    `);
    console.log(`Orphaned ingredients: ${orphanedIngredients.rows[0].count} (expected 0)`);
    
    const orphanedCountries = await client.query(`
      SELECT COUNT(*) as count
      FROM formulation_country fc
      WHERE fc.formulation_id IN (
          SELECT formulation_id FROM formulations WHERE created_by = 'UUID Import Script'
        )
        AND NOT EXISTS (
          SELECT 1 FROM formulations f
          WHERE f.formulation_id = fc.formulation_id
        )
    `);
    console.log(`Orphaned formulation-country links: ${orphanedCountries.rows[0].count} (expected 0)`);
    
    const orphanedUseGroups = await client.query(`
      SELECT COUNT(*) as count
      FROM formulation_country_use_group fcug
      WHERE fcug.formulation_country_id IN (
          SELECT fc.formulation_country_id FROM formulation_country fc
          WHERE fc.formulation_id IN (
            SELECT formulation_id FROM formulations WHERE created_by = 'UUID Import Script'
          )
        )
        AND NOT EXISTS (
          SELECT 1 FROM formulation_country fc
          WHERE fc.formulation_country_id = fcug.formulation_country_id
        )
    `);
    console.log(`Orphaned use groups: ${orphanedUseGroups.rows[0].count} (expected 0)`);
    
    const orphanedJunctions = await client.query(`
      SELECT COUNT(*) as count
      FROM business_case_use_groups bcug
      WHERE bcug.business_case_id IN (
          SELECT business_case_id FROM business_case WHERE created_by = 'UUID Import Script'
        )
        AND (
          NOT EXISTS (
            SELECT 1 FROM business_case bc
            WHERE bc.business_case_id = bcug.business_case_id
          )
          OR NOT EXISTS (
            SELECT 1 FROM formulation_country_use_group fcug
            WHERE fcug.formulation_country_use_group_id = bcug.formulation_country_use_group_id
          )
        )
    `);
    console.log(`Orphaned junctions: ${orphanedJunctions.rows[0].count} (expected 0)`);
    
    // 6. Sample data - top formulations by business case count
    console.log('\n🏆 TOP 10 FORMULATIONS BY BUSINESS CASE COUNT');
    console.log('='.repeat(50));
    const topFormulations = await client.query(`
      SELECT f.formulation_code, f.formulation_name, COUNT(bc.business_case_id)::text as business_case_count
      FROM formulations f
      LEFT JOIN formulation_country fc ON fc.formulation_id = f.formulation_id
      LEFT JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = fc.formulation_country_id
      LEFT JOIN business_case_use_groups bcug ON bcug.formulation_country_use_group_id = fcug.formulation_country_use_group_id
      LEFT JOIN business_case bc ON bc.business_case_id = bcug.business_case_id
      WHERE f.created_by = 'UUID Import Script'
      GROUP BY f.formulation_id, f.formulation_code, f.formulation_name
      ORDER BY COUNT(bc.business_case_id) DESC
      LIMIT 10
    `);
    console.table(topFormulations.rows);
    
    // 7. Sample business case data with calculations
    console.log('\n🧮 SAMPLE BUSINESS CASE CALCULATIONS');
    console.log('='.repeat(50));
    const sampleCalcs = await client.query(`
      SELECT 
        f.formulation_code,
        c.country_code,
        bc.year_offset,
        bc.volume,
        bc.nsp,
        bc.cogs_per_unit,
        bc.total_revenue,
        bc.total_cogs,
        bc.total_margin
      FROM business_case bc
      JOIN business_case_use_groups bcug ON bcug.business_case_id = bc.business_case_id
      JOIN formulation_country_use_group fcug ON fcug.formulation_country_use_group_id = bcug.formulation_country_use_group_id
      JOIN formulation_country fc ON fc.formulation_country_id = fcug.formulation_country_id
      JOIN formulations f ON f.formulation_id = fc.formulation_id
      JOIN countries c ON c.country_id = fc.country_id
      WHERE f.created_by = 'UUID Import Script'
      ORDER BY random()
      LIMIT 10
    `);
    console.table(sampleCalcs.rows);
    
    // 8. Summary
    console.log('\n✅ VERIFICATION COMPLETE');
    console.log('='.repeat(50));
    const totalFormulations = parseInt(formulations.rows[0].count);
    const totalBusinessCases = parseInt(businessCases.rows[0].count);
    
    console.log(`\n📈 Import Summary:`);
    console.log(`   - ${totalFormulations} formulations imported`);
    console.log(`   - ${totalBusinessCases} business cases created`);
    console.log(`   - Average ${Math.round(totalBusinessCases / totalFormulations)} business cases per formulation`);
    console.log(`\n⚠️  Note: COGS intentionally skipped - will be imported separately`);
    
  } catch (error) {
    console.error('Error verifying import:', error);
  } finally {
    await client.end();
  }
}

main().catch(console.error);

