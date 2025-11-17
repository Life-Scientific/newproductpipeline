/**
 * Complete EPPO Import - Import all individual crop batches
 * Run this script to finish importing the 465 individual crops
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Note: You'll need to set these environment variables or edit them here
const supabaseUrl = process.env.SUPABASE_URL || 'https://ls-main-vikram-branch.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('\n❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable not set');
  console.log('\nTo run this script:');
  console.log('1. Get your service role key from Supabase Dashboard → Settings → API');
  console.log('2. Run: $env:SUPABASE_SERVICE_ROLE_KEY="your-key-here"; node scripts/complete_eppo_import.js\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importBatchFile(batchNum) {
  const filePath = path.join(__dirname, `import_individuals_batch_${batchNum}.sql`);
  
  console.log(`\nImporting batch ${batchNum}/5...`);
  
  const sql = fs.readFileSync(filePath, 'utf-8');
  
  // Execute the SQL
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
  
  if (error) {
    console.error(`❌ Error importing batch ${batchNum}:`, error);
    throw error;
  }
  
  console.log(`✅ Batch ${batchNum} imported successfully`);
}

async function main() {
  console.log('========================================');
  console.log('COMPLETE EPPO IMPORT');
  console.log('========================================\n');
  
  console.log('This will import 465 individual crops in 5 batches...\n');
  
  try {
    // Check current count
    const { data: currentCount, error: countError } = await supabase
      .from('eppo_codes')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking current count:', countError);
      throw countError;
    }
    
    console.log(`Current EPPO codes in database: ${currentCount}`);
    console.log(`Expected after import: 533 (68 groups + 465 individuals)\n`);
    
    // Import all 5 batches
    for (let i = 1; i <= 5; i++) {
      await importBatchFile(i);
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Verify final count
    const { count: finalCount, error: finalError } = await supabase
      .from('eppo_codes')
      .select('*', { count: 'exact', head: true });
    
    if (finalError) {
      console.error('Error verifying final count:', finalError);
      throw finalError;
    }
    
    console.log('\n========================================');
    console.log(`✅ Import complete! Total codes: ${finalCount}`);
    
    if (finalCount === 533) {
      console.log('✅ Verification successful - all 533 codes imported!');
    } else {
      console.warn(`⚠️  Warning: Expected 533, got ${finalCount}`);
    }
    
    console.log('========================================\n');
    
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  }
}

main();

