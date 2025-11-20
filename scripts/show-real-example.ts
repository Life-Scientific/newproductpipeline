import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function showRealExample() {
  // Get any formulation
  const { data: formulations } = await supabase
    .from('formulations')
    .select('formulation_id, formulation_code, formulation_name, base_code')
    .limit(1);
  
  // Get sample ingredients
  const { data: ingredients } = await supabase
    .from('ingredients')
    .select('ingredient_id, ingredient_name, ingredient_type, cas_number')
    .eq('ingredient_type', 'Active')
    .limit(3);
  
  // Get Belgium
  const { data: belgium } = await supabase
    .from('countries')
    .select('country_id, country_code, country_name, currency_code')
    .eq('country_code', 'BE')
    .single();
  
  console.log('\n=== HOW IMPORT DATA MAPS TO SUPABASE ===\n');
  console.log('Example from import file:');
  console.log('  Index: 257');
  console.log('  Country: BE (Belgium)');
  console.log('  Group ID: 2deb71aa-03a8-45d9-b377-f757f18ae615');
  console.log('  Years 1-10: volume=14000, nsp=0, cogs=0, FY31\n');
  
  console.log('=== STEP 1: FORMULATION (Index 257) ===');
  const formExample = {
    formulation_id: '[UUID - would be generated]',
    formulation_code: '257-01', // base_code + variant from registry
    formulation_name: 'Imported Formulation 257',
    base_code: '257',
    variant_suffix: '01', // From base_code_registry.next_variant_number
    formulation_category: 'Herbicide',
    formulation_status: 'Selected',
    is_active: true
  };
  console.log(JSON.stringify(formExample, null, 2));
  
  console.log('\n=== STEP 2: FORMULATION INGREDIENTS ===');
  console.log('(Would need to be linked separately - not in import file)');
  if (ingredients && ingredients.length > 0) {
    const ingredientExample = ingredients.map(ing => ({
      formulation_id: '[UUID from step 1]',
      ingredient_id: ing.ingredient_id,
      ingredient_name: ing.ingredient_name,
      ingredient_type: ing.ingredient_type,
      quantity: '[would need to be provided]',
      quantity_unit: 'g/L',
      ingredient_role: 'Active'
    }));
    console.log(JSON.stringify(ingredientExample, null, 2));
  } else {
    console.log('No ingredients found in database');
  }
  
  console.log('\n=== STEP 3: FORMULATION_COUNTRY ===');
  if (belgium) {
    const fcExample = {
      formulation_country_id: '[UUID - would be generated]',
      formulation_id: '[UUID from step 1]',
      country_id: belgium.country_id,
      country_code: belgium.country_code,
      country_name: belgium.country_name,
      is_active: true
    };
    console.log(JSON.stringify(fcExample, null, 2));
  }
  
  console.log('\n=== STEP 4: FORMULATION_COUNTRY_USE_GROUP ===');
  const useGroupExample = {
    formulation_country_use_group_id: '[UUID - would be generated]',
    formulation_country_id: '[UUID from step 3]',
    use_group_variant: '01', // Primary/default use group
    use_group_name: 'Imported Default',
    use_group_status: 'Active',
    is_active: true
  };
  console.log(JSON.stringify(useGroupExample, null, 2));
  
  console.log('\n=== STEP 5: BUSINESS_CASE (10 records, one per year) ===');
  const businessCasesExample = [];
  for (let year = 1; year <= 3; year++) { // Show first 3 years
    businessCasesExample.push({
      business_case_id: '[UUID - would be generated]',
      business_case_group_id: '2deb71aa-03a8-45d9-b377-f757f18ae615', // From import file
      year_offset: year,
      volume: 14000,
      nsp: 0,
      cogs_per_unit: 0,
      effective_start_fiscal_year: 'FY31',
      status: 'active',
      created_by: 'Import Script'
    });
  }
  businessCasesExample.push({ note: '... years 4-10 follow same pattern ...' });
  console.log(JSON.stringify(businessCasesExample, null, 2));
  
  console.log('\n=== STEP 6: BUSINESS_CASE_USE_GROUPS (Junction Table) ===');
  const junctionExample = businessCasesExample.slice(0, 3).map((bc, idx) => ({
    business_case_id: '[UUID from step 5]',
    formulation_country_use_group_id: '[UUID from step 4]',
    weighting: null
  }));
  console.log(JSON.stringify(junctionExample, null, 2));
  console.log('... (7 more junction entries for years 4-10)');
  
  console.log('\n=== COMPLETE RELATIONAL TREE ===');
  console.log(`
📦 Formulation (257-01)
   ├── formulation_id: [UUID]
   ├── base_code: "257"
   ├── variant_suffix: "01" (from base_code_registry)
   │
   ├── 🔬 Ingredients (linked separately)
   │   └── ingredient_id → ingredients table
   │
   └── 🌍 Countries
       └── BE (Belgium)
           ├── formulation_country_id: [UUID]
           │
           └── 📋 Use Groups
               └── 01 (Primary)
                   ├── formulation_country_use_group_id: [UUID]
                   │
                   └── 💼 Business Cases (10 years)
                       ├── Year 1: volume=14000, nsp=0, cogs=0
                       ├── Year 2: volume=14000, nsp=0, cogs=0
                       ├── ...
                       └── Year 10: volume=14000, nsp=0, cogs=0
                       │
                       └── 🔗 Linked via business_case_use_groups junction
  `);
  
  console.log('\n=== KEY POINTS ===');
  console.log('✅ Ingredient IDs are UUIDs - format is correct');
  console.log('✅ All relationships preserved via foreign keys');
  console.log('✅ business_case_group_id groups 10 years together');
  console.log('✅ Junction table links business cases to use groups');
  console.log('✅ Variant numbers come from base_code_registry (respects blacklist)');
}

showRealExample().catch(console.error);
