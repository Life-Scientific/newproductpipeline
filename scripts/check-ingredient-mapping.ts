import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkMapping() {
  console.log('\n=== CHECKING INGREDIENT MAPPING POSSIBILITIES ===\n');
  
  // Get all ingredients from Supabase
  const { data: allIngredients } = await supabase
    .from('ingredients')
    .select('ingredient_id, ingredient_name, ingredient_type, cas_number')
    .order('ingredient_name');
  
  console.log(`Total ingredients in Supabase: ${allIngredients?.length || 0}`);
  console.log('\nSample ingredients (first 10):');
  console.log(JSON.stringify(allIngredients?.slice(0, 10).map(ing => ({
    ingredient_id: ing.ingredient_id,
    ingredient_name: ing.ingredient_name,
    ingredient_type: ing.ingredient_type
  })), null, 2));
  
  // Check if import file has any ingredient references
  console.log('\n=== CHECKING IMPORT FILE STRUCTURE ===');
  console.log('The import_complete.sql file has:');
  console.log('  - SECTION 1: Base Code Registry (67 entries)');
  console.log('  - SECTION 2: Formulations (empty - says 0 formulations)');
  console.log('  - SECTION 3: Formulation Ingredients Junction (empty)');
  console.log('  - SECTION 4: Formulation-Country (empty - says 0)');
  console.log('  - SECTION 7: Business Cases (7390 records)');
  
  console.log('\n=== QUESTION FOR USER ===');
  console.log('Do you have a mapping file (Excel/CSV/SQL) that shows:');
  console.log('  - Index number → Ingredient UUID(s)');
  console.log('  - Index number → Ingredient names (we can look up UUIDs)');
  console.log('  - Index number → Ingredient quantities/concentrations');
  console.log('\nIf yes, we can update the import script to:');
  console.log('  1. Parse the ingredient mapping');
  console.log('  2. Look up ingredient UUIDs from Supabase by name');
  console.log('  3. Create formulation_ingredients entries when creating formulations');
  console.log('  4. This will properly link formulations to ingredients');
  
  // Show example of how it would work
  console.log('\n=== EXAMPLE: How Ingredient Mapping Would Work ===');
  console.log(`
If you have mapping like:
  Index 257 → Ingredient: "Glyphosate" (UUID: bd0444f8-...), Quantity: 360, Unit: g/L
  Index 257 → Ingredient: "Surfactant X" (UUID: 818bb8e6-...), Quantity: 50, Unit: g/L

The import script would:
  1. Create formulation 257-01
  2. Look up "Glyphosate" → get UUID from ingredients table
  3. Insert into formulation_ingredients:
     - formulation_id: [257-01 UUID]
     - ingredient_id: [Glyphosate UUID]
     - quantity: 360
     - quantity_unit: "g/L"
  4. Repeat for each ingredient
  `);
  
  // Check if there are any formulations that might give us a pattern
  const { data: existingForms } = await supabase
    .from('formulations')
    .select('formulation_id, formulation_code, base_code')
    .not('base_code', 'eq', '')
    .limit(5);
  
  if (existingForms && existingForms.length > 0) {
    console.log('\n=== EXISTING FORMULATIONS IN DATABASE ===');
    console.log(JSON.stringify(existingForms, null, 2));
    
    // Check if any have ingredients
    for (const form of existingForms.slice(0, 2)) {
      const { data: ing } = await supabase
        .from('formulation_ingredients')
        .select('ingredient_id, quantity, quantity_unit, ingredient(ingredient_name)')
        .eq('formulation_id', form.formulation_id)
        .limit(3);
      
      if (ing && ing.length > 0) {
        console.log(`\nFormulation ${form.formulation_code} has ingredients:`);
        console.log(JSON.stringify(ing.map(i => ({
          ingredient_name: (i.ingredient as any)?.ingredient_name,
          ingredient_id: i.ingredient_id,
          quantity: i.quantity,
          quantity_unit: i.quantity_unit
        })), null, 2));
      }
    }
  }
}

checkMapping().catch(console.error);

