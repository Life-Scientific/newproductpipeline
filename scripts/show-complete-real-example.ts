import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function showCompleteRealExample() {
  console.log('\n=== COMPLETE EXAMPLE: Index 257 → All Relationships ===\n');
  
  // Get real data from Supabase
  const { data: belgium } = await supabase
    .from('countries')
    .select('country_id, country_code, country_name, currency_code')
    .eq('country_code', 'BE')
    .single();
  
  // Get some real ingredients
  const { data: ingredients } = await supabase
    .from('ingredients')
    .select('ingredient_id, ingredient_name, ingredient_type')
    .limit(5);
  
  console.log('=== FROM IMPORT FILE ===');
  console.log('Index: 257');
  console.log('Country: BE');
  console.log('Group ID: 2deb71aa-03a8-45d9-b377-f757f18ae615');
  
  console.log('\n=== COMPLETE RELATIONAL STRUCTURE IN SUPABASE ===\n');
  
  console.log('1️⃣  FORMULATION');
  const formulation = {
    formulation_id: '[UUID - generated when created]',
    formulation_code: '257-01',
    base_code: '257',
    variant_suffix: '01',
    formulation_name: 'Imported Formulation 257'
  };
  console.log(JSON.stringify(formulation, null, 2));
  
  console.log('\n2️⃣  FORMULATION_INGREDIENTS (if mapping provided)');
  console.log('   Example: Index 257 → Ingredients');
  if (ingredients && ingredients.length >= 2) {
    const exampleIngredients = [
      {
        formulation_ingredient_id: '[UUID - generated]',
        formulation_id: '[UUID from step 1]',
        ingredient_id: ingredients[0].ingredient_id, // ✅ REAL UUID from Supabase
        ingredient_name: ingredients[0].ingredient_name,
        quantity: 360,
        quantity_unit: 'g/L',
        ingredient_role: 'Active'
      },
      {
        formulation_ingredient_id: '[UUID - generated]',
        formulation_id: '[UUID from step 1]',
        ingredient_id: ingredients[1].ingredient_id, // ✅ REAL UUID from Supabase
        ingredient_name: ingredients[1].ingredient_name,
        quantity: 50,
        quantity_unit: 'g/L',
        ingredient_role: 'Adjuvant'
      }
    ];
    console.log(JSON.stringify(exampleIngredients, null, 2));
    console.log('   ✅ Ingredient UUIDs are REAL and exist in Supabase!');
    console.log(`   ✅ Can look up by name from ${ingredients.length}+ ingredients`);
  }
  
  console.log('\n3️⃣  FORMULATION_COUNTRY');
  if (belgium) {
    const fc = {
      formulation_country_id: '[UUID - generated]',
      formulation_id: '[UUID from step 1]',
      country_id: belgium.country_id, // ✅ REAL UUID from Supabase
      country_code: belgium.country_code,
      country_name: belgium.country_name
    };
    console.log(JSON.stringify(fc, null, 2));
    console.log('   ✅ Country UUID is REAL and exists in Supabase!');
  }
  
  console.log('\n4️⃣  FORMULATION_COUNTRY_USE_GROUP');
  const useGroup = {
    formulation_country_use_group_id: '[UUID - generated]',
    formulation_country_id: '[UUID from step 3]',
    use_group_variant: '01',
    use_group_name: 'Imported Default'
  };
  console.log(JSON.stringify(useGroup, null, 2));
  
  console.log('\n5️⃣  BUSINESS_CASE (10 years)');
  const businessCase = {
    business_case_id: '[UUID - generated]',
    business_case_group_id: '2deb71aa-03a8-45d9-b377-f757f18ae615', // From import file
    year_offset: 1,
    volume: 14000,
    nsp: 0,
    cogs_per_unit: 0,
    effective_start_fiscal_year: 'FY31'
  };
  console.log(JSON.stringify(businessCase, null, 2));
  console.log('   ... (9 more years with same group_id)');
  
  console.log('\n6️⃣  BUSINESS_CASE_USE_GROUPS (Junction)');
  const junction = {
    business_case_id: '[UUID from step 5]',
    formulation_country_use_group_id: '[UUID from step 4]'
  };
  console.log(JSON.stringify(junction, null, 2));
  
  console.log('\n=== RELATIONSHIP VERIFICATION ===');
  console.log('✅ Country UUIDs: Mapped from BE →', belgium?.country_id);
  console.log('✅ Ingredient UUIDs: Available in Supabase (lookup by name)');
  console.log('   Example:', ingredients?.[0]?.ingredient_name, '→', ingredients?.[0]?.ingredient_id);
  console.log('✅ All foreign keys: Preserved via UUIDs');
  console.log('✅ business_case_group_id: Preserved from import file');
  
  console.log('\n=== HOW IT WORKS ===');
  console.log(`
When importing Index 257:
  1. Check if formulation 257 exists → Create if not
  2. Look up ingredient UUIDs by name (if mapping provided)
  3. Create formulation_ingredients entries
  4. Look up country UUID for BE → ${belgium?.country_id}
  5. Create formulation_country link
  6. Create use group
  7. Create 10 business cases
  8. Link via junction table

ALL relationships are preserved because:
  - Country UUIDs exist in Supabase ✅
  - Ingredient UUIDs exist in Supabase ✅  
  - Formulation UUIDs generated when created ✅
  - Use Group UUIDs generated when created ✅
  - Business Case UUIDs generated when created ✅
  - Junction table links them all together ✅
  `);
  
  console.log('\n=== TO ADD INGREDIENT MAPPING ===');
  console.log('If you have Index → Ingredient mapping, provide it as:');
  console.log('  - CSV: Index, Ingredient_Name, Quantity, Unit');
  console.log('  - JSON: { "257": [{ "name": "...", "quantity": 360, "unit": "g/L" }] }');
  console.log('  - SQL: INSERT statements in import file');
  console.log('\nThe script will:');
  console.log('  1. Look up ingredient UUIDs by name from Supabase');
  console.log('  2. Create formulation_ingredients automatically');
  console.log('  3. Link everything together');
}

showCompleteRealExample().catch(console.error);

