// Check what data exists in the database for dashboard
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDashboardData() {
  console.log('🔍 Checking dashboard data sources...\n');
  
  // 1. Check formulations table directly
  console.log('1️⃣ Formulations (table):');
  const { data: formulations, error: fError } = await supabase
    .from('formulations')
    .select('*')
    .limit(5);
  
  if (fError) {
    console.error('   ❌ Error:', fError.message);
  } else {
    console.log(`   Count: ${formulations?.length || 0}`);
    if (formulations && formulations.length > 0) {
      console.log('   Sample:', JSON.stringify(formulations[0], null, 2));
    } else {
      console.log('   ⚠️  No formulations found');
    }
  }
  
  // 2. Check vw_formulations_with_ingredients (view used by dashboard)
  console.log('\n2️⃣ vw_formulations_with_ingredients (view):');
  const { data: viewFormulations, error: vfError } = await supabase
    .from('vw_formulations_with_ingredients')
    .select('*')
    .limit(5);
  
  if (vfError) {
    console.error('   ❌ Error:', vfError.message);
  } else {
    console.log(`   Count: ${viewFormulations?.length || 0}`);
    if (viewFormulations && viewFormulations.length > 0) {
      console.log('   Sample keys:', Object.keys(viewFormulations[0]));
      console.log('   Sample:', JSON.stringify(viewFormulations[0], null, 2));
    } else {
      console.log('   ⚠️  No formulations in view');
    }
  }
  
  // 3. Check formulation_status_history
  console.log('\n3️⃣ Formulation Status History:');
  const { data: statusHistory, error: shError } = await supabase
    .from('formulation_status_history')
    .select('*')
    .order('changed_at', { ascending: false })
    .limit(5);
  
  if (shError) {
    console.error('   ❌ Error:', shError.message);
  } else {
    console.log(`   Count: ${statusHistory?.length || 0}`);
    if (statusHistory && statusHistory.length > 0) {
      console.log('   Sample:', JSON.stringify(statusHistory[0], null, 2));
    } else {
      console.log('   ⚠️  No status history found');
    }
  }
  
  // 4. Check vw_active_portfolio
  console.log('\n4️⃣ vw_active_portfolio (view):');
  const { data: activePortfolio, error: apError } = await supabase
    .from('vw_active_portfolio')
    .select('*')
    .limit(5);
  
  if (apError) {
    console.error('   ❌ Error:', apError.message);
  } else {
    console.log(`   Count: ${activePortfolio?.length || 0}`);
    if (activePortfolio && activePortfolio.length > 0) {
      console.log('   Sample:', JSON.stringify(activePortfolio[0], null, 2));
    } else {
      console.log('   ⚠️  No active portfolio items found');
    }
  }
  
  // 5. Check vw_registration_pipeline
  console.log('\n5️⃣ vw_registration_pipeline (view):');
  const { data: registrationPipeline, error: rpError } = await supabase
    .from('vw_registration_pipeline')
    .select('*')
    .limit(5);
  
  if (rpError) {
    console.error('   ❌ Error:', rpError.message);
  } else {
    console.log(`   Count: ${registrationPipeline?.length || 0}`);
    if (registrationPipeline && registrationPipeline.length > 0) {
      console.log('   Sample:', JSON.stringify(registrationPipeline[0], null, 2));
    } else {
      console.log('   ⚠️  No registration pipeline items found');
    }
  }
  
  // 6. Check business_case table
  console.log('\n6️⃣ business_case (table):');
  const { data: businessCases, error: bcError } = await supabase
    .from('business_case')
    .select('*')
    .limit(5);
  
  if (bcError) {
    console.error('   ❌ Error:', bcError.message);
  } else {
    console.log(`   Count: ${businessCases?.length || 0}`);
    if (businessCases && businessCases.length > 0) {
      console.log('   Sample:', JSON.stringify(businessCases[0], null, 2));
    } else {
      console.log('   ⚠️  No business cases found');
    }
  }
  
  // 7. Check vw_business_case (view) - get all columns
  console.log('\n7️⃣ vw_business_case (view):');
  const { data: viewBusinessCases, error: vbcError } = await supabase
    .from('vw_business_case')
    .select('*')
    .limit(5);
  
  if (vbcError) {
    console.error('   ❌ Error:', vbcError.message);
  } else {
    console.log(`   Count: ${viewBusinessCases?.length || 0}`);
    if (viewBusinessCases && viewBusinessCases.length > 0) {
      console.log('   Sample keys:', Object.keys(viewBusinessCases[0]));
      console.log('   Sample:', JSON.stringify(viewBusinessCases[0], null, 2));
    } else {
      console.log('   ⚠️  No business cases in view');
    }
  }
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Formulations (table): ${formulations?.length || 0}`);
  console.log(`   View Formulations: ${viewFormulations?.length || 0}`);
  console.log(`   Status History: ${statusHistory?.length || 0}`);
  console.log(`   Active Portfolio: ${activePortfolio?.length || 0}`);
  console.log(`   Registration Pipeline: ${registrationPipeline?.length || 0}`);
  console.log(`   Business Cases (table): ${businessCases?.length || 0}`);
  console.log(`   Business Cases (view): ${viewBusinessCases?.length || 0}`);
}

checkDashboardData().catch(console.error);
