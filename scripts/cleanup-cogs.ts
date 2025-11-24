#!/usr/bin/env tsx
/**
 * Clean Up All COGS Data
 * 
 * Removes all entries from the cogs table to prepare for fresh COGS import later
 */

import pg from 'pg';

const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

async function cleanupCogs() {
  await client.connect();
  
  console.log('🧹 CLEANING UP COGS DATA\n');
  console.log('='.repeat(60));
  
  try {
    // Check current count
    const beforeCount = await client.query(`SELECT COUNT(*) as count FROM cogs`);
    const count = parseInt(beforeCount.rows[0].count);
    
    console.log(`\n📊 Current COGS entries: ${count}`);
    
    if (count === 0) {
      console.log('\n✅ COGS table is already empty - nothing to clean up!');
      await client.end();
      return;
    }
    
    // Show breakdown
    const bySource = await client.query(`
      SELECT 
        COALESCE(source, 'NULL') as source,
        COALESCE(created_by, 'NULL') as created_by,
        COUNT(*) as count
      FROM cogs
      GROUP BY source, created_by
      ORDER BY count DESC
    `);
    
    console.log('\n📋 COGS Breakdown:');
    console.table(bySource.rows);
    
    // Confirm deletion
    console.log('\n🗑️  Deleting all COGS entries...');
    
    await client.query('BEGIN');
    
    const deleted = await client.query(`
      DELETE FROM cogs
      RETURNING cogs_id
    `);
    
    await client.query('COMMIT');
    
    console.log(`\n✅ Successfully deleted ${deleted.rows.length} COGS entries`);
    
    // Verify
    const afterCount = await client.query(`SELECT COUNT(*) as count FROM cogs`);
    console.log(`\n📊 Remaining COGS entries: ${afterCount.rows[0].count}`);
    
    console.log('\n✨ COGS cleanup complete!');
    console.log('\n💡 Note: COGS can be imported later when ready.');
    console.log('   The cogs_per_unit values are preserved in the business_case table.');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error during cleanup:', error);
    throw error;
  } finally {
    await client.end();
  }
}

cleanupCogs().catch(console.error);



