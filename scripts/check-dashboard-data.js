// Quick diagnostic script to check dashboard data
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://phizaaaxgbvgcaojiyow.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoaXphYWF4Z2J2Z2Nhb2ppeW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNzQ1MTEsImV4cCI6MjA3Nzk1MDUxMX0.X1n9jLnq5PtXBvu758G9_G6u6bR2L3K-PJVitDHGiH0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log('🔍 Checking dashboard data...\n');
  
  // Check business cases from view
  const { data: businessCases, error: bcError } = await supabase
    .from('vw_business_case')
    .select('*')
    .limit(5);
  
  console.log('📊 Business Cases (from view):');
  console.log('  Count:', businessCases?.length || 0);
  if (bcError) {
    console.error('  ❌ Error:', bcError.message);
  } else if (businessCases && businessCases.length > 0) {
    console.log('  ✅ Sample:', {
      id: businessCases[0].business_case_id,
      fiscal_year: businessCases[0].fiscal_year,
      total_revenue: businessCases[0].total_revenue,
      total_margin: businessCases[0].total_margin,
      formulation_code: businessCases[0].formulation_code,
      country_name: businessCases[0].country_name,
    });
  } else {
    console.log('  ⚠️  No business cases found in view');
  }
  
  // Check raw business_case table
  const { data: rawBusinessCases, error: rawBcError } = await supabase
    .from('business_case')
    .select('*')
    .limit(5);
  
  console.log('\n📊 Business Cases (raw table):');
  console.log('  Count:', rawBusinessCases?.length || 0);
  if (rawBcError) {
    console.error('  ❌ Error:', rawBcError.message);
  } else if (rawBusinessCases && rawBusinessCases.length > 0) {
    console.log('  ✅ Sample:', {
      id: rawBusinessCases[0].business_case_id,
      fiscal_year: rawBusinessCases[0].fiscal_year,
      total_revenue: rawBusinessCases[0].total_revenue,
      formulation_country_id: rawBusinessCases[0].formulation_country_id,
      formulation_country_use_group_id: rawBusinessCases[0].formulation_country_use_group_id,
    });
  } else {
    console.log('  ⚠️  No business cases in raw table either');
  }
  
  // Check formulations
  const { data: formulations, error: fError } = await supabase
    .from('vw_formulations_with_ingredients')
    .select('*')
    .limit(5);
  
  console.log('\n🧪 Formulations:');
  console.log('  Count:', formulations?.length || 0);
  if (fError) {
    console.error('  ❌ Error:', fError.message);
  } else if (formulations && formulations.length > 0) {
    console.log('  ✅ Sample:', {
      formulation_code: formulations[0].formulation_code,
      formulation_name: formulations[0].formulation_name,
      status: formulations[0].status,
    });
  }
  
  // Check exchange rates
  const { data: exchangeRates, error: erError } = await supabase
    .from('exchange_rates')
    .select('*')
    .eq('is_active', true)
    .limit(5);
  
  console.log('\n💱 Exchange Rates:');
  console.log('  Count:', exchangeRates?.length || 0);
  if (erError) {
    console.error('  ❌ Error:', erError.message);
  } else if (exchangeRates && exchangeRates.length > 0) {
    console.log('  ✅ Sample:', {
      country_id: exchangeRates[0].country_id,
      currency_code: exchangeRates[0].currency_code,
      exchange_rate_to_eur: exchangeRates[0].exchange_rate_to_eur,
    });
  }
  
  // Check countries
  const { data: countries, error: cError } = await supabase
    .from('countries')
    .select('*')
    .eq('is_active', true)
    .limit(5);
  
  console.log('\n🌍 Countries:');
  console.log('  Count:', countries?.length || 0);
  if (cError) {
    console.error('  ❌ Error:', cError.message);
  } else if (countries && countries.length > 0) {
    console.log('  ✅ Sample:', {
      country_id: countries[0].country_id,
      country_code: countries[0].country_code,
      country_name: countries[0].country_name,
      currency_code: countries[0].currency_code,
    });
  }
  
  // Check if view exists
  const { data: viewCheck, error: viewError } = await supabase
    .rpc('exec_sql', { 
      query: "SELECT COUNT(*) as count FROM vw_business_case" 
    })
    .single();
  
  console.log('\n👁️  View Check:');
  if (viewError) {
    console.log('  ⚠️  Could not verify view (this is normal)');
  } else {
    console.log('  ✅ View exists and is queryable');
  }
}

checkData().catch(console.error);

