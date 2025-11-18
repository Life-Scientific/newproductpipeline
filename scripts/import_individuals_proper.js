/**
 * Proper EPPO Import Script
 * Imports individual crops from enriched JSON using Supabase client
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://phizaaaxgbvgcaojiyow.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('\n❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable not set');
  console.log('\nPlease set: $env:SUPABASE_SERVICE_ROLE_KEY="your-key"\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Read enriched data
const enrichedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'enriched_eppo_data.json'), 'utf-8')
);

const individuals = enrichedData.codes.filter(c => c.eppo_type === 'individual_crop');

console.log('==========================================');
console.log('EPPO INDIVIDUAL CROPS IMPORT');
console.log('==========================================\n');
console.log(`Found ${individuals.length} individual crops to import\n`);

async function importInBatches() {
  const BATCH_SIZE = 50;
  let imported = 0;
  let errors = [];
  
  for (let i = 0; i < individuals.length; i += BATCH_SIZE) {
    const batch = individuals.slice(i, i + BATCH_SIZE);
    
    const records = batch.map(code => ({
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
      parent_eppo_code: (code.parents && code.parents.length > 0) ? code.parents[0] : null,
      is_parent: code.is_parent || false,
      hierarchy_level: code.hierarchy_level || 0,
      is_active: true
    }));
    
    const { data, error } = await supabase
      .from('eppo_codes')
      .insert(records);
    
    if (error) {
      console.error(`❌ Error at batch starting at ${i}:`, error.message);
      errors.push({ batch: i, error: error.message });
      // Continue with next batch
    } else {
      imported += batch.length;
      process.stdout.write(`\r  Progress: ${imported}/${individuals.length} (${Math.round(imported / individuals.length * 100)}%)`);
    }
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return { imported, errors };
}

async function main() {
  try {
    // Check current count
    const { count: beforeCount } = await supabase
      .from('eppo_codes')
      .select('*', { count: 'exact', head: true });
    
    console.log(`Current EPPO codes in database: ${beforeCount}`);
    console.log(`Starting import...\n`);
    
    const { imported, errors } = await importInBatches();
    
    console.log('\n');
    
    // Verify final count
    const { count: afterCount } = await supabase
      .from('eppo_codes')
      .select('*', { count: 'exact', head: true });
    
    console.log('\n==========================================');
    console.log('IMPORT COMPLETE');
    console.log('==========================================');
    console.log(`  Before: ${beforeCount} codes`);
    console.log(`  After: ${afterCount} codes`);
    console.log(`  Imported: ${imported} individual crops`);
    
    if (errors.length > 0) {
      console.log(`\n⚠️  Errors: ${errors.length} batches had errors`);
      errors.forEach(e => console.log(`  - Batch ${e.batch}: ${e.error}`));
    }
    
    if (afterCount === 533) {
      console.log('\n✅ SUCCESS! All 533 EPPO codes imported (68 groups + 465 individuals)');
    } else {
      console.log(`\n⚠️  Expected 533 total, got ${afterCount}`);
    }
    
    console.log('==========================================\n');
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

main();

