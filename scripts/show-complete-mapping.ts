import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function showCompleteExample() {
  console.log('\n=== COMPLETE EXAMPLE: Index 257 with All Relationships ===\n');
  
  // Get Belgium
  const { data: belgium } = await supabase
    .from('countries')
    .select('country_id, country_code, country_name, currency_code')
    .eq('country_code', 'BE')
    .single();
  
  // Get sample ingredients (to show UUIDs are available)
  const { data: ingredients } = await supabase
    .from('ingredients')
    .select('ingredient_id, ingredient_name, ingredient_type')
    .eq('ingredient_type', 'Active')
    .limit(5);
  
  console.log('=== FROM IMPORT FILE ===');
  console.log('Index: 257');
  console.log('Country: BE');
  console.log('Group ID: 2deb71aa-03a8-45d9-b377-f757f18ae615');
  console.log('Business Cases: 10 years (volume=14000, nsp=0, cogs=0, FY31)');
  
  console.log('\n=== WHAT WOULD BE CREATED IN SUPABASE ===\n');
  
  console.log('1. FORMULATION (if not exists):');
  const formulation = {
    formulation_id: '[UUID - generated]',
    formulation_code: '257-01',
    formulation_name: 'Imported Formulation 257',
    base_code: '257',
    variant_suffix: '01',
    formulation_category: 'Herbicide',
    formulation_status: 'Selected',
    is_active: true
  };
  console.log(JSON.stringify(formulation, null, 2));
  
  console.log('\n2. FORMULATION_INGREDIENTS (if mapping provided):');
  console.log('   ⚠️  Currently empty in import file');
  console.log('   If you have Index → Ingredient mapping, would create:');
  if (ingredients && ingredients.length > 0) {
    const exampleIngredients = ingredients.slice(0, 2).map(ing => ({
      formulation_ingredient_id: '[UUID - generated]',
      formulation_id: '[UUID from step 1]',
      ingredient_id: ing.ingredient_id, // ✅ UUID from Supabase
      ingredient_name: ing.ingredient_name,
      quantity: '[from mapping]',
      quantity_unit: 'g/L',
      ingredient_role: 'Active'
    }));
    console.log(JSON.stringify(exampleIngredients, null, 2));
    console.log('   ✅ Ingredient UUIDs exist in Supabase and can be mapped!');
  }
  
  console.log('\n3. FORMULATION_COUNTRY:');
  if (belgium) {
    const fc = {
      formulation_country_id: '[UUID - generated]',
      formulation_id: '[UUID from step 1]',
      country_id: belgium.country_id, // ✅ UUID from Supabase
      country_code: belgium.country_code,
      country_name: belgium.country_name,
      is_active: true
    };
    console.log(JSON.stringify(fc, null, 2));
    console.log('   ✅ Country UUID mapped correctly!');
  }
  
  console.log('\n4. FORMULATION_COUNTRY_USE_GROUP:');
  const useGroup = {
    formulation_country_use_group_id: '[UUID - generated]',
    formulation_country_id: '[UUID from step 3]',
    use_group_variant: '01',
    use_group_name: 'Imported Default',
    use_group_status: 'Active',
    is_active: true
  };
  console.log(JSON.stringify(useGroup, null, 2));
  
  console.log('\n5. BUSINESS_CASE (10 records):');
  const businessCases = Array.from({ length: 3 }, (_, i) => ({
    business_case_id: '[UUID - generated]',
    business_case_group_id: '2deb71aa-03a8-45d9-b377-f757f18ae615',
    year_offset: i + 1,
    volume: 14000,
    nsp: 0,
    cogs_per_unit: 0,
    effective_start_fiscal_year: 'FY31',
    status: 'active',
    created_by: 'Import Script'
  }));
  console.log(JSON.stringify(businessCases, null, 2));
  console.log('   ... (7 more years)');
  
  console.log('\n6. BUSINESS_CASE_USE_GROUPS (Junction):');
  const junctions = businessCases.map(bc => ({
    business_case_id: '[UUID from step 5]',
    formulation_country_use_group_id: '[UUID from step 4]',
    weighting: null
  }));
  console.log(JSON.stringify(junctions, null, 2));
  
  console.log('\n=== RELATIONSHIP VERIFICATION ===');
  console.log('✅ Country UUIDs: Mapped from country_code → country_id');
  console.log('✅ Ingredient UUIDs: Available in Supabase (170 ingredients)');
  console.log('✅ Formulation UUIDs: Generated when created');
  console.log('✅ Use Group UUIDs: Generated when created');
  console.log('✅ Business Case UUIDs: Generated when created');
  console.log('\n⚠️  MISSING: Index → Ingredient mapping');
  console.log('   If you have this mapping, we can link ingredients automatically!');
  
  console.log('\n=== TO ADD INGREDIENT MAPPING ===');
  console.log('Provide mapping in one of these formats:');
  console.log('1. CSV/Excel: Index, Ingredient_Name, Quantity, Unit');
  console.log('2. SQL: INSERT INTO formulation_ingredients for each Index');
  console.log('3. JSON: { "257": [{ "ingredient_name": "...", "quantity": 360, "unit": "g/L" }] }');
  console.log('\nThe script can then:');
  console.log('  - Look up ingredient UUIDs by name from Supabase');
  console.log('  - Create formulation_ingredients entries');
  console.log('  - Link everything together automatically');
}

showCompleteExample().catch(console.error);

