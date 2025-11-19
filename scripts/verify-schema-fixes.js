#!/usr/bin/env node

/**
 * Script to verify that schema fixes have been applied correctly
 * Checks vw_formulation_country_detail for the fixed columns
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySchemaFixes() {
  console.log('🔍 Verifying schema fixes...\n');

  try {
    // Test 1: Check vw_formulation_country_detail has the fixed columns
    console.log('Test 1: Checking vw_formulation_country_detail...');
    const { data: detailData, error: detailError } = await supabase
      .from('vw_formulation_country_detail')
      .select('formulation_code, country_name, readiness, target_market_entry_fy, normal_crop_usage, targets_treated')
      .limit(5);

    if (detailError) {
      console.error('❌ Error querying vw_formulation_country_detail:', detailError);
      return false;
    }

    console.log(`✅ vw_formulation_country_detail query successful (${detailData.length} rows)`);
    if (detailData.length > 0) {
      const sample = detailData[0];
      console.log('   Sample row:');
      console.log(`   - formulation_code: ${sample.formulation_code}`);
      console.log(`   - country_name: ${sample.country_name}`);
      console.log(`   - readiness: ${sample.readiness || 'NULL'}`);
      console.log(`   - target_market_entry_fy: ${sample.target_market_entry_fy || 'NULL'}`);
      console.log(`   - normal_crop_usage: ${sample.normal_crop_usage || 'NULL'}`);
      console.log(`   - targets_treated: ${sample.targets_treated || 'NULL'}`);
    }

    // Test 2: Check vw_business_case has the fixed columns
    console.log('\nTest 2: Checking vw_business_case...');
    const { data: bcData, error: bcError } = await supabase
      .from('vw_business_case')
      .select('formulation_code, country_name, formulation_id, country_id, target_market_entry_fy, fiscal_year')
      .limit(5);

    if (bcError) {
      console.error('❌ Error querying vw_business_case:', bcError);
      return false;
    }

    console.log(`✅ vw_business_case query successful (${bcData.length} rows)`);
    if (bcData.length > 0) {
      const sample = bcData[0];
      console.log('   Sample row:');
      console.log(`   - formulation_code: ${sample.formulation_code}`);
      console.log(`   - country_name: ${sample.country_name}`);
      console.log(`   - formulation_id: ${sample.formulation_id || 'NULL'}`);
      console.log(`   - country_id: ${sample.country_id || 'NULL'}`);
      console.log(`   - target_market_entry_fy: ${sample.target_market_entry_fy || 'NULL'}`);
      console.log(`   - fiscal_year: ${sample.fiscal_year || 'NULL'}`);
    }

    // Test 3: Check vw_formulation_country_use_group has target_market_entry_fy
    console.log('\nTest 3: Checking vw_formulation_country_use_group...');
    const { data: ugData, error: ugError } = await supabase
      .from('vw_formulation_country_use_group')
      .select('formulation_code, country_name, use_group_name, target_market_entry_fy, use_group_crops')
      .limit(5);

    if (ugError) {
      console.error('❌ Error querying vw_formulation_country_use_group:', ugError);
      return false;
    }

    console.log(`✅ vw_formulation_country_use_group query successful (${ugData.length} rows)`);
    if (ugData.length > 0) {
      const sample = ugData[0];
      console.log('   Sample row:');
      console.log(`   - formulation_code: ${sample.formulation_code}`);
      console.log(`   - country_name: ${sample.country_name}`);
      console.log(`   - use_group_name: ${sample.use_group_name}`);
      console.log(`   - target_market_entry_fy: ${sample.target_market_entry_fy || 'NULL'}`);
      console.log(`   - use_group_crops: ${sample.use_group_crops || 'NULL'}`);
    }

    console.log('\n✅ All schema fixes verified successfully!');
    return true;
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return false;
  }
}

verifySchemaFixes().then(success => {
  process.exit(success ? 0 : 1);
});

