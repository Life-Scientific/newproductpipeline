#!/usr/bin/env tsx
/**
 * Run Complete Test Import - Execute all 4 parts and verify relationships
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

const TEST_FORMULATION_CODES = ['370-01', '312-01', '371-01', '372-01', '246-01'];

async function executeSQLFile(filePath: string): Promise<void> {
  const fileName = filePath.split('/').pop() || filePath;
  console.log(`\n📄 Executing: ${fileName}`);
  
  const sql = readFileSync(filePath, 'utf8');
  await client.query(sql);
  console.log(`   ✅ Success`);
}

async function verifyRelationships() {
  console.log('\n🔍 Verifying relationships...\n');
  
  // Formulations
  const { rows: formulations } = await client.query(`
    SELECT formulation_code, formulation_name, base_code, formulation_category
    FROM formulations
    WHERE formulation_code = ANY($1)
    ORDER BY formulation_code
  `, [TEST_FORMULATION_CODES]);
  
  console.log(`✅ Formulations: ${formulations.length}/5`);
  formulations.forEach(f => {
    console.log(`   - ${f.formulation_code}: ${f.formulation_name} (${f.formulation_category})`);
  });

  // Ingredients
  const { rows: ingredients } = await client.query(`
    SELECT 
      f.formulation_code,
      COUNT(*) as ingredient_count,
      STRING_AGG(i.ingredient_name, ', ') as ingredients
    FROM formulation_ingredients fi
    JOIN formulations f ON f.formulation_id = fi.formulation_id
    JOIN ingredients i ON i.ingredient_id = fi.ingredient_id
    WHERE f.formulation_code = ANY($1)
    GROUP BY f.formulation_code
    ORDER BY f.formulation_code
  `, [TEST_FORMULATION_CODES]);
  
  console.log(`\n✅ Ingredients: ${ingredients.reduce((sum, r) => sum + parseInt(r.ingredient_count), 0)} total`);
  ingredients.forEach(ing => {
    console.log(`   - ${ing.formulation_code}: ${ing.ingredients}`);
  });

  // Countries
  const { rows: countries } = await client.query(`
    SELECT 
      f.formulation_code,
      COUNT(*) as country_count,
      STRING_AGG(c.country_code, ', ' ORDER BY c.country_code) as countries
    FROM formulation_country fc
    JOIN formulations f ON f.formulation_id = fc.formulation_id
    JOIN countries c ON c.country_id = fc.country_id
    WHERE f.formulation_code = ANY($1)
    GROUP BY f.formulation_code
    ORDER BY f.formulation_code
  `, [TEST_FORMULATION_CODES]);
  
  console.log(`\n✅ Countries: ${countries.reduce((sum, r) => sum + parseInt(r.country_count), 0)} total`);
  countries.forEach(c => {
    console.log(`   - ${c.formulation_code}: ${c.countries}`);
  });

  // Use Groups
  const { rows: useGroups } = await client.query(`
    SELECT 
      f.formulation_code,
      c.country_code,
      COUNT(*) as use_group_count
    FROM formulation_country_use_group fcug
    JOIN formulation_country fc ON fc.formulation_country_id = fcug.formulation_country_id
    JOIN formulations f ON f.formulation_id = fc.formulation_id
    JOIN countries c ON c.country_id = fc.country_id
    WHERE f.formulation_code = ANY($1)
    GROUP BY f.formulation_code, c.country_code
    ORDER BY f.formulation_code, c.country_code
  `, [TEST_FORMULATION_CODES]);
  
  console.log(`\n✅ Use Groups: ${useGroups.length} formulation-country combinations`);
  const byFormulation = useGroups.reduce((acc: any, ug: any) => {
    if (!acc[ug.formulation_code]) acc[ug.formulation_code] = [];
    acc[ug.formulation_code].push(ug.country_code);
    return acc;
  }, {});
  Object.entries(byFormulation).forEach(([code, countryCodes]: [string, any]) => {
    console.log(`   - ${code}: ${countryCodes.join(', ')}`);
  });

  // Business Cases
  const { rows: businessCases } = await client.query(`
    SELECT 
      f.formulation_code,
      c.country_code,
      COUNT(DISTINCT bc.business_case_group_id) as group_count,
      COUNT(*) as total_years
    FROM business_case bc
    JOIN business_case_use_groups bcug ON bcug.business_case_id = bc.business_case_id
    JOIN formulation_country_use_group fcug ON fcug.formulation_country_use_group_id = bcug.formulation_country_use_group_id
    JOIN formulation_country fc ON fc.formulation_country_id = fcug.formulation_country_id
    JOIN formulations f ON f.formulation_id = fc.formulation_id
    JOIN countries c ON c.country_id = fc.country_id
    WHERE f.formulation_code = ANY($1)
    GROUP BY f.formulation_code, c.country_code
    ORDER BY f.formulation_code, c.country_code
  `, [TEST_FORMULATION_CODES]);
  
  console.log(`\n✅ Business Cases: ${businessCases.length} groups, ${businessCases.reduce((sum, r) => sum + parseInt(r.total_years), 0)} total years`);
  businessCases.forEach(bc => {
    console.log(`   - ${bc.formulation_code} + ${bc.country_code}: ${bc.group_count} group(s), ${bc.total_years} years`);
  });

  // Complete relationship chain example
  console.log(`\n📊 Complete Relationship Example:`);
  const { rows: example } = await client.query(`
    SELECT 
      f.formulation_code,
      f.formulation_name,
      STRING_AGG(DISTINCT i.ingredient_name, ', ') as ingredients,
      STRING_AGG(DISTINCT c.country_code, ', ' ORDER BY c.country_code) as countries,
      COUNT(DISTINCT fcug.formulation_country_use_group_id) as use_groups,
      COUNT(DISTINCT bc.business_case_id) as business_cases
    FROM formulations f
    LEFT JOIN formulation_ingredients fi ON fi.formulation_id = f.formulation_id
    LEFT JOIN ingredients i ON i.ingredient_id = fi.ingredient_id
    LEFT JOIN formulation_country fc ON fc.formulation_id = f.formulation_id
    LEFT JOIN countries c ON c.country_id = fc.country_id
    LEFT JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = fc.formulation_country_id
    LEFT JOIN business_case_use_groups bcug ON bcug.formulation_country_use_group_id = fcug.formulation_country_use_group_id
    LEFT JOIN business_case bc ON bc.business_case_id = bcug.business_case_id
    WHERE f.formulation_code = '370-01'
    GROUP BY f.formulation_code, f.formulation_name
  `);
  
  if (example.length > 0) {
    const e = example[0];
    console.log(`   Formulation: ${e.formulation_code} (${e.formulation_name})`);
    console.log(`   ├─ Ingredients: ${e.ingredients || 'none'}`);
    console.log(`   ├─ Countries: ${e.countries || 'none'}`);
    console.log(`   ├─ Use Groups: ${e.use_groups}`);
    console.log(`   └─ Business Cases: ${e.business_cases} years`);
  }
}

async function main() {
  const testDir = join(__dirname, '..', 'contextsql', 'Final Import', 'test');
  const testFiles = [
    join(testDir, 'test_part1_complete_manual.sql'),
    join(testDir, 'test_part2_manual.sql'),
    join(testDir, 'test_part3_manual.sql'),
    join(testDir, 'test_part4_manual.sql'),
  ];
  
  try {
    console.log('🚀 Starting Complete Test Import\n');
    console.log('='.repeat(80));
    
    await client.connect();
    console.log('✅ Connected to database\n');
    
    // Execute each file sequentially
    for (const file of testFiles) {
      await executeSQLFile(file);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('🎉 All imports completed successfully!\n');
    
    // Verify relationships
    await verifyRelationships();
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ Test import complete! Check the UI to see how relationships display.');
    console.log('='.repeat(80));
    
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔌 Disconnected from database');
  }
}

main().catch(console.error);

