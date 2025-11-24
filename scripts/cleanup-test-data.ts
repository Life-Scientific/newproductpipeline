import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

async function main() {
  try {
    await client.connect();
    console.log('Connected to database');
    
    console.log('Cleaning up test data...');
    
    // Delete in reverse order of dependencies
    
    // 1. Business Case Junctions
    await client.query(`
      DELETE FROM business_case_use_groups 
      WHERE business_case_id IN (
        SELECT business_case_id FROM business_case WHERE created_by = 'UUID Import Script'
      );
    `);
    console.log('Deleted business_case_use_groups');
    
    // 2. Business Cases
    await client.query(`
      DELETE FROM business_case WHERE created_by = 'UUID Import Script';
    `);
    console.log('Deleted business_case');
    
    // 3. Use Groups (Formulation Country Use Group)
    // We need to identify which ones were created by the script.
    // The import script doesn't set created_by on use groups explicitly in the columns list?
    // Let's check the import SQL.
    // It does: INSERT INTO formulation_country_use_group ... SELECT ...
    // It doesn't seem to set created_by column.
    
    // But we can link them to formulations created by the script.
    await client.query(`
      DELETE FROM formulation_country_use_group
      WHERE formulation_country_id IN (
        SELECT formulation_country_id 
        FROM formulation_country fc
        JOIN formulations f ON f.formulation_id = fc.formulation_id
        WHERE f.created_by = 'UUID Import Script'
      );
    `);
     console.log('Deleted formulation_country_use_group');

    // 4. Formulation Country
    await client.query(`
      DELETE FROM formulation_country
      WHERE formulation_id IN (
        SELECT formulation_id FROM formulations WHERE created_by = 'UUID Import Script'
      );
    `);
    console.log('Deleted formulation_country');
    
    // 5. COGS
    await client.query(`
        DELETE FROM cogs WHERE created_by = 'UUID Import Script';
    `);
    console.log('Deleted cogs');

    // 6. Formulation Ingredients
    await client.query(`
      DELETE FROM formulation_ingredients
      WHERE formulation_id IN (
        SELECT formulation_id FROM formulations WHERE created_by = 'UUID Import Script'
      );
    `);
    console.log('Deleted formulation_ingredients');
    
    // 7. Formulations
    await client.query(`
      DELETE FROM formulations WHERE created_by = 'UUID Import Script';
    `);
    console.log('Deleted formulations');
    
    console.log('Cleanup complete!');
    
  } catch (error) {
    console.error('Error cleaning up:', error);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
