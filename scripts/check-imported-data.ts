import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkData() {
  // Get sample business cases
  const { data: bcs } = await supabase
    .from('business_case')
    .select(`
      business_case_id,
      business_case_group_id,
      year_offset,
      volume,
      nsp,
      cogs_per_unit,
      effective_start_fiscal_year,
      status,
      created_by,
      business_case_use_groups(
        formulation_country_use_group(
          formulation_country_use_group_id,
          use_group_variant,
          use_group_name,
          formulation_country(
            formulation_country_id,
            formulation(
              formulation_id,
              formulation_code,
              formulation_name,
              base_code
            ),
            country(
              country_id,
              country_code,
              country_name
            )
          )
        )
      )
    `)
    .eq('created_by', 'Import Script')
    .limit(3);

  console.log('\n=== Sample Business Cases ===');
  console.log(JSON.stringify(bcs, null, 2));

  // Get sample formulations created
  const { data: formulations } = await supabase
    .from('formulations')
    .select('formulation_id, formulation_code, formulation_name, base_code, variant_suffix')
    .like('formulation_name', 'Imported Formulation%')
    .limit(5);

  console.log('\n=== Sample Formulations Created ===');
  console.log(JSON.stringify(formulations, null, 2));

  // Check if formulations have ingredients
  if (formulations && formulations.length > 0) {
    const formulationIds = formulations.map(f => f.formulation_id);
    const { data: ingredients } = await supabase
      .from('formulation_ingredients')
      .select('formulation_id, ingredient_id, ingredient(ingredient_name, ingredient_type)')
      .in('formulation_id', formulationIds);

    console.log('\n=== Formulation Ingredients ===');
    console.log(JSON.stringify(ingredients, null, 2));
    
    if (!ingredients || ingredients.length === 0) {
      console.log('\n⚠️  WARNING: No ingredients found for imported formulations!');
    }
  }

  // Count totals
  const { count: bcCount } = await supabase
    .from('business_case')
    .select('*', { count: 'exact', head: true })
    .eq('created_by', 'Import Script');

  const { count: formCount } = await supabase
    .from('formulations')
    .select('*', { count: 'exact', head: true })
    .like('formulation_name', 'Imported Formulation%');

  console.log('\n=== Summary ===');
  console.log(`Business Cases imported: ${bcCount}`);
  console.log(`Formulations created: ${formCount}`);
}

checkData().catch(console.error);

