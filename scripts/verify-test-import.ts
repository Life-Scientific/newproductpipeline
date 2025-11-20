#!/usr/bin/env tsx
/**
 * Verify the test import - check that ingredients and countries link correctly
 */

import pg from 'pg';

const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

const TEST_FORMULATION_CODES = ['370-01', '312-01', '371-01', '372-01', '246-01'];

async function verify() {
  try {
    await client.connect();
    console.log('🔍 Verifying test import...\n');

    // Check formulations
    const { rows: formulations } = await client.query(`
      SELECT formulation_code, formulation_name, base_code, formulation_category
      FROM formulations
      WHERE formulation_code = ANY($1)
      ORDER BY formulation_code
    `, [TEST_FORMULATION_CODES]);
    
    console.log(`✅ Found ${formulations.length} formulations:`);
    formulations.forEach(f => {
      console.log(`   - ${f.formulation_code}: ${f.formulation_name} (base: ${f.base_code}, category: ${f.formulation_category})`);
    });

    // Check ingredients
    const { rows: ingredients } = await client.query(`
      SELECT 
        f.formulation_code,
        i.ingredient_name,
        fi.quantity,
        fi.quantity_unit,
        fi.ingredient_role
      FROM formulation_ingredients fi
      JOIN formulations f ON f.formulation_id = fi.formulation_id
      JOIN ingredients i ON i.ingredient_id = fi.ingredient_id
      WHERE f.formulation_code = ANY($1)
      ORDER BY f.formulation_code, fi.ingredient_role
    `, [TEST_FORMULATION_CODES]);
    
    console.log(`\n✅ Found ${ingredients.length} ingredient links:`);
    const byFormulation = ingredients.reduce((acc: any, ing: any) => {
      if (!acc[ing.formulation_code]) acc[ing.formulation_code] = [];
      acc[ing.formulation_code].push(`${ing.ingredient_name} (${ing.quantity} ${ing.quantity_unit})`);
      return acc;
    }, {});
    Object.entries(byFormulation).forEach(([code, ings]: [string, any]) => {
      console.log(`   - ${code}: ${ings.join(', ')}`);
    });

    // Check if any formulation_country entries exist
    const { rows: countries } = await client.query(`
      SELECT 
        f.formulation_code,
        c.country_code,
        c.country_name
      FROM formulation_country fc
      JOIN formulations f ON f.formulation_id = fc.formulation_id
      JOIN countries c ON c.country_id = fc.country_id
      WHERE f.formulation_code = ANY($1)
      ORDER BY f.formulation_code, c.country_code
    `, [TEST_FORMULATION_CODES]);
    
    if (countries.length > 0) {
      console.log(`\n✅ Found ${countries.length} country links:`);
      const byFormulation = countries.reduce((acc: any, row: any) => {
        if (!acc[row.formulation_code]) acc[row.formulation_code] = [];
        acc[row.formulation_code].push(row.country_code);
        return acc;
      }, {});
      Object.entries(byFormulation).forEach(([code, countryCodes]: [string, any]) => {
        console.log(`   - ${code}: ${countryCodes.join(', ')}`);
      });
    } else {
      console.log(`\n⚠️  No country links found yet (need to import part 2)`);
    }

    console.log('\n✅ Verification complete!');
    console.log('\n📝 Summary:');
    console.log(`   - Formulations: ${formulations.length}/5`);
    console.log(`   - Ingredients: ${ingredients.length}/5`);
    console.log(`   - Countries: ${countries.length} (need part 2)`);
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

verify();

