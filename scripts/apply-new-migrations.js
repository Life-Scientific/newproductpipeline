import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectionString = 'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

async function applyMigration(filename) {
  const filePath = join(__dirname, '..', 'supabase', 'migrations', filename);
  const sql = readFileSync(filePath, 'utf8');
  
  console.log(`\n📄 Applying ${filename}...`);
  try {
    await client.query(sql);
    console.log(`✅ Successfully applied ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Error applying ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  try {
    await client.connect();
    console.log('✅ Connected to database');
    
    const migrations = [
      '20251122000003_reorganize_menu.sql',
      '20251122000004_add_joshs_matrix_theme.sql'
    ];
    
    for (const migration of migrations) {
      const success = await applyMigration(migration);
      if (!success) {
        console.error(`\n❌ Failed to apply ${migration}. Stopping.`);
        process.exit(1);
      }
    }
    
    console.log('\n✅ All migrations applied successfully!');
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
