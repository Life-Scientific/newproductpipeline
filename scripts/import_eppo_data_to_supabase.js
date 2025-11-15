/**
 * Import EPPO data to Supabase in batches
 * This script reads the enriched JSON and imports via Supabase client
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const INPUT_PATH = path.join(__dirname, 'enriched_eppo_data.json');

console.log('==========================================');
console.log('IMPORT EPPO DATA TO SUPABASE');
console.log('==========================================\n');

// Load Supabase config
const supabaseUrl = process.env.SUPABASE_URL || 'https://ls-main-vikram-branch.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read enriched data
console.log('Reading enriched data...');
const enrichedData = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf-8'));

const groups = enrichedData.codes.filter(c => c.eppo_type === 'crop_group');
const individuals = enrichedData.codes.filter(c => c.eppo_type === 'individual_crop');

console.log(`Found ${groups.length} groups and ${individuals.length} individual crops\n`);

// Helper to prepare data for Supabase
function prepareRecord(code) {
  const record = {
    eppo_code: code.eppo_code,
    latin_name: code.latin_name || null,
    english_name: code.english_name || null,
    german_name: code.german_name || null,
    french_name: code.french_name || null,
    italian_name: code.italian_name || null,
    spanish_name: code.spanish_name || null,
    portuguese_name: code.portuguese_name || null,
    dutch_name: code.dutch_name || null,
    russian_name: code.russian_name || null,
    swedish_name: code.swedish_name || null,
    czech_name: code.czech_name || null,
    hungarian_name: code.hungarian_name || null,
    polish_name: code.polish_name || null,
    slovak_name: code.slovak_name || null,
    croatian_name: code.croatian_name || null,
    ukrainian_name: code.ukrainian_name || null,
    bulgarian_name: code.bulgarian_name || null,
    lithuanian_name: code.lithuanian_name || null,
    catalan_name: code.catalan_name || null,
    danish_name: code.danish_name || null,
    slovene_name: code.slovene_name || null,
    turkish_name: code.turkish_name || null,
    eppo_type: code.eppo_type,
    classification: code.classification,
    eppo_datatype: code.eppo_datatype || null,
    parent_eppo_code: code.parents && code.parents.length > 0 ? code.parents[0] : null,
    is_parent: code.is_parent,
    hierarchy_level: code.hierarchy_level || 0,
    is_active: true
  };
  
  return record;
}

async function importBatch(records, batchName) {
  console.log(`Importing ${records.length} ${batchName}...`);
  
  const BATCH_SIZE = 50;
  let imported = 0;
  
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    
    const { data, error } = await supabase
      .from('eppo_codes')
      .insert(batch);
    
    if (error) {
      console.error(`Error importing batch ${i / BATCH_SIZE + 1}:`, error);
      throw error;
    }
    
    imported += batch.length;
    process.stdout.write(`\r  Progress: ${imported}/${records.length} (${Math.round(imported / records.length * 100)}%)`);
  }
  
  console.log(`\n✅ Imported ${imported} ${batchName}\n`);
}

async function main() {
  try {
    // Sort groups by hierarchy level (parents first)
    groups.sort((a, b) => (a.hierarchy_level || 0) - (b.hierarchy_level || 0));
    
    // Import groups first (parents must exist before children)
    const groupRecords = groups.map(prepareRecord);
    await importBatch(groupRecords, 'group codes');
    
    // Sort individuals by hierarchy level
    individuals.sort((a, b) => (a.hierarchy_level || 0) - (b.hierarchy_level || 0));
    
    // Import individuals
    const individualRecords = individuals.map(prepareRecord);
    await importBatch(individualRecords, 'individual crops');
    
    // Verify import
    console.log('Verifying import...');
    const { count, error } = await supabase
      .from('eppo_codes')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error verifying import:', error);
      throw error;
    }
    
    console.log(`\n✅ Import complete! Total records in database: ${count}`);
    console.log(`Expected: ${enrichedData.codes.length}`);
    
    if (count === enrichedData.codes.length) {
      console.log('✅ Verification successful!');
    } else {
      console.warn(`⚠️  Warning: Count mismatch! Expected ${enrichedData.codes.length}, got ${count}`);
    }
    
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  }
}

main();

console.log('\n==========================================');
console.log('IMPORT COMPLETE');
console.log('==========================================');

