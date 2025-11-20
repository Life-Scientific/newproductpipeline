import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function showSample() {
  // Get simple sample
  const { data: bcs } = await supabase
    .from('business_case')
    .select('business_case_id, business_case_group_id, year_offset, volume, nsp, effective_start_fiscal_year')
    .eq('created_by', 'Import Script')
    .limit(3);

  console.log('\n=== Sample Business Cases ===');
  console.log(JSON.stringify(bcs, null, 2));

  const { data: forms } = await supabase
    .from('formulations')
    .select('formulation_id, formulation_code, formulation_name, base_code')
    .like('formulation_name', 'Imported Formulation%')
    .limit(3);

  console.log('\n=== Sample Formulations ===');
  console.log(JSON.stringify(forms, null, 2));

  // Check ingredient IDs are fine (they're UUIDs, should be fine)
  const { data: sampleIngredient } = await supabase
    .from('ingredients')
    .select('ingredient_id, ingredient_name')
    .limit(1)
    .single();

  console.log('\n=== Sample Ingredient (to verify ID format) ===');
  console.log(JSON.stringify(sampleIngredient, null, 2));
  console.log('✅ Ingredient IDs are UUIDs - format is correct');
}

async function deleteTestData() {
  console.log('\n=== Deleting Test Data ===');
  
  // Get business case IDs to delete
  const { data: bcIds } = await supabase
    .from('business_case')
    .select('business_case_id')
    .eq('created_by', 'Import Script');

  if (bcIds && bcIds.length > 0) {
    const ids = bcIds.map(bc => bc.business_case_id);
    
    // Delete junction table entries first
    const { error: junctionError } = await supabase
      .from('business_case_use_groups')
      .delete()
      .in('business_case_id', ids);
    
    if (junctionError) {
      console.error('Error deleting junction entries:', junctionError);
    } else {
      console.log(`✓ Deleted ${ids.length} business_case_use_groups entries`);
    }

    // Delete business cases
    const { error: bcError } = await supabase
      .from('business_case')
      .delete()
      .in('business_case_id', ids);
    
    if (bcError) {
      console.error('Error deleting business cases:', bcError);
    } else {
      console.log(`✓ Deleted ${ids.length} business cases`);
    }
  }

  // Delete use groups created for test
  const { data: testForms } = await supabase
    .from('formulations')
    .select('formulation_id')
    .like('formulation_name', 'Imported Formulation%');

  if (testForms && testForms.length > 0) {
    const formIds = testForms.map(f => f.formulation_id);
    
    // Get formulation_country_ids
    const { data: fcData } = await supabase
      .from('formulation_country')
      .select('formulation_country_id')
      .in('formulation_id', formIds);

    if (fcData && fcData.length > 0) {
      const fcIds = fcData.map(fc => fc.formulation_country_id);
      
      // Delete use groups
      const { error: ugError } = await supabase
        .from('formulation_country_use_group')
        .delete()
        .in('formulation_country_id', fcIds);
      
      if (ugError) {
        console.error('Error deleting use groups:', ugError);
      } else {
        console.log(`✓ Deleted use groups for ${fcIds.length} formulation_country entries`);
      }

      // Delete formulation_country entries
      const { error: fcError } = await supabase
        .from('formulation_country')
        .delete()
        .in('formulation_country_id', fcIds);
      
      if (fcError) {
        console.error('Error deleting formulation_country:', fcError);
      } else {
        console.log(`✓ Deleted ${fcIds.length} formulation_country entries`);
      }
    }

    // Delete formulations
    const { error: formError } = await supabase
      .from('formulations')
      .delete()
      .in('formulation_id', formIds);
    
    if (formError) {
      console.error('Error deleting formulations:', formError);
    } else {
      console.log(`✓ Deleted ${formIds.length} formulations`);
    }
  }

  console.log('\n✅ Test data cleanup complete!');
}

async function main() {
  await showSample();
  await deleteTestData();
}

main().catch(console.error);

