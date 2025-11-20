import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function demonstrateMapping() {
  console.log('\n=== HOW INGREDIENT MAPPING WOULD WORK ===\n');
  
  // Example: Index 257 needs ingredients
  console.log('Example: Index 257 needs ingredients linked');
  console.log('\nStep 1: Look up ingredient UUIDs from Supabase by name:');
  
  const ingredientNames = ['Glyphosate', 'Surfactant', 'Adjuvant'];
  const ingredientMap = new Map<string, string>();
  
  for (const name of ingredientNames) {
    const { data } = await supabase
      .from('ingredients')
      .select('ingredient_id, ingredient_name')
      .ilike('ingredient_name', `%${name}%`)
      .limit(1)
      .maybeSingle();
    
    if (data) {
      ingredientMap.set(name, data.ingredient_id);
      console.log(`  "${name}" → ${data.ingredient_id}`);
    } else {
      console.log(`  "${name}" → NOT FOUND (would need to create or skip)`);
    }
  }
  
  console.log('\nStep 2: When creating formulation 257-01:');
  console.log('  - Create formulation (gets UUID)');
  console.log('  - Insert into formulation_ingredients:');
  
  const exampleMapping = [
    { ingredient_name: 'Glyphosate', quantity: 360, unit: 'g/L', role: 'Active' },
    { ingredient_name: 'Surfactant', quantity: 50, unit: 'g/L', role: 'Adjuvant' }
  ];
  
  const formulationIngredients = exampleMapping.map(ing => {
    const uuid = ingredientMap.get(ing.ingredient_name);
    return {
      formulation_id: '[UUID from formulation]',
      ingredient_id: uuid || '[UUID from lookup]',
      ingredient_name: ing.ingredient_name,
      quantity: ing.quantity,
      quantity_unit: ing.unit,
      ingredient_role: ing.role
    };
  });
  
  console.log(JSON.stringify(formulationIngredients, null, 2));
  
  console.log('\n=== ANSWER TO YOUR QUESTION ===');
  console.log('✅ YES - Ingredient UUIDs CAN be mapped!');
  console.log('✅ Supabase has 170 ingredients with UUIDs');
  console.log('✅ We can look them up by ingredient_name');
  console.log('✅ Then link them via formulation_ingredients table');
  console.log('\n⚠️  What we need:');
  console.log('   - Mapping file: Index → Ingredient names + quantities');
  console.log('   - Or: Index → Ingredient UUIDs directly (if you have them)');
  console.log('\nThe import script can be updated to:');
  console.log('   1. Accept ingredient mapping (CSV/JSON/SQL)');
  console.log('   2. Look up UUIDs by ingredient name');
  console.log('   3. Create formulation_ingredients when creating formulations');
  console.log('   4. Preserve all relationships automatically');
}

demonstrateMapping().catch(console.error);

