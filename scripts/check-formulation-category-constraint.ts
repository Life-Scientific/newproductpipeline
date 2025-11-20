#!/usr/bin/env tsx
/**
 * Check what formulation_category values are allowed in the database
 */

import pg from 'pg';

const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

async function checkConstraint() {
  try {
    await client.connect();
    
    const { rows } = await client.query(`
      SELECT 
        conname,
        pg_get_constraintdef(oid) as constraint_def
      FROM pg_constraint 
      WHERE conname LIKE '%formulation_category%'
      AND conrelid = 'formulations'::regclass;
    `);
    
    console.log('Formulation Category Constraint:');
    console.log(rows[0]?.constraint_def || 'No constraint found');
    
    // Also check what categories exist in the database
    const { rows: categories } = await client.query(`
      SELECT DISTINCT formulation_category 
      FROM formulations 
      ORDER BY formulation_category;
    `);
    
    console.log('\nExisting categories in database:');
    categories.forEach(c => console.log(`  - ${c.formulation_category}`));
    
  } catch (error: any) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

checkConstraint();

