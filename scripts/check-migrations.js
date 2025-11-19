import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local file
const envPath = join(__dirname, '..', '.env.local');
try {
  const envFile = readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
} catch (err) {
  console.error('Could not load .env.local:', err.message);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMigrations() {
  console.log('Checking if new migration tables exist...\n');
  
  const tablesToCheck = [
    'workspaces',
    'workspace_menu_items',
    'user_workspace_preferences',
    'themes',
    'theme_colors',
    'user_preferences'
  ];
  
  for (const tableName of tablesToCheck) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
      
      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          console.log(`❌ ${tableName}: Table does NOT exist`);
        } else {
          console.log(`⚠️  ${tableName}: Error - ${error.message}`);
        }
      } else {
        console.log(`✅ ${tableName}: Table exists`);
        
        // Try to get count
        const { count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });
        console.log(`   └─ Row count: ${count || 0}`);
      }
    } catch (err) {
      console.log(`❌ ${tableName}: Exception - ${err.message}`);
    }
  }
  
  console.log('\n--- Checking migration history ---\n');
  
  // Check supabase_migrations.schema_migrations table
  try {
    const { data: migrations, error } = await supabase
      .from('schema_migrations')
      .select('version, name')
      .order('version', { ascending: false })
      .limit(5);
    
    if (error) {
      console.log('Could not check migration history:', error.message);
    } else {
      console.log('Recent migrations:');
      migrations?.forEach(m => {
        const isNew = m.version.includes('20251121');
        console.log(`${isNew ? '🆕' : '  '} ${m.version} - ${m.name || 'N/A'}`);
      });
    }
  } catch (err) {
    console.log('Could not access migration history:', err.message);
  }
}

checkMigrations().catch(console.error);

