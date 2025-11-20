import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function showSample() {
  // Get a complete sample with all relationships
  const { data: sample } = await supabase
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
      business_case_use_groups(
        formulation_country_use_group(
          use_group_variant,
          use_group_name,
          formulation_country(
            formulation(
              formulation_code,
              formulation_name,
              base_code,
              variant_suffix
            ),
            country(
              country_code,
              country_name
            )
          )
        )
      )
    `)
    .eq('created_by', 'Import Script')
    .limit(1)
    .single();

  console.log('\n=== Sample Business Case with Relationships ===');
  console.log(JSON.stringify(sample, null, 2));

  // Check ingredient relationships for existing formulations
  const { data: formWithIngredients } = await supabase
    .from('formulations')
    .select(`
      formulation_id,
      formulation_code,
      formulation_name,
      formulation_ingredients(
        ingredient_id,
        quantity,
        quantity_unit,
        ingredient(
          ingredient_id,
          ingredient_name,
          ingredient_type
        )
      )
    `)
    .not('formulation_ingredients', 'is', null)
    .limit(1)
    .single();

  console.log('\n=== Sample Formulation with Ingredients (for reference) ===');
  console.log(JSON.stringify(formWithIngredients, null, 2));

  // Summary
  const { count: bcCount } = await supabase
    .from('business_case')
    .select('*', { count: 'exact', head: true })
    .eq('created_by', 'Import Script');

  const { count: formCount } = await supabase
    .from('formulations')
    .select('*', { count: 'exact', head: true })
    .like('formulation_name', 'Imported Formulation%');

  const { count: groupCount } = await supabase
    .from('business_case')
    .select('business_case_group_id', { count: 'exact', head: true })
    .eq('created_by', 'Import Script');

  console.log('\n=== Import Summary ===');
  console.log(`Business Cases: ${bcCount}`);
  console.log(`Business Case Groups: ${groupCount} unique groups`);
  console.log(`Formulations Created: ${formCount}`);
  console.log('\nNote: Imported formulations have no ingredients linked (as expected - they are placeholders)');
}

showSample().catch(console.error);

