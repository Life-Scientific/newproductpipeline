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
    // Check if it's a "already exists" error - that's okay
    if (error.message.includes('already exists') || error.message.includes('duplicate')) {
      console.log(`⚠️  ${filename} already applied (skipping)`);
      return true;
    }
    console.error(`❌ Error applying ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  try {
    await client.connect();
    console.log('✅ Connected to remote database');
    
    // All new migrations I created today
    const migrations = [
      '20251122000000_add_preset_themes.sql',
      '20251122000001_fix_theme_contrast.sql',
      '20251122000002_add_portfolio_strategy_menu.sql',
      '20251122000003_reorganize_menu.sql',
    ];
    
    console.log(`\n🚀 Applying ${migrations.length} new migrations...\n`);
    
    for (const migration of migrations) {
      const success = await applyMigration(migration);
      if (!success) {
        console.error(`\n❌ Failed to apply ${migration}. Stopping.`);
        process.exit(1);
      }
    }
    
    console.log('\n✅ All migrations applied successfully to remote database!');
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();



