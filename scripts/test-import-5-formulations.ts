#!/usr/bin/env tsx
/**
 * Test Import - First 5 Formulations Only
 * 
 * Extracts and imports only the first 5 formulations from the Final Import files
 * to verify that active ingredients and countries link correctly.
 * 
 * Test formulations:
 * 1. 370-01 (Index 278) - Abamectin/18 EC
 * 2. 312-01 (Index 343) - Acetamiprid/200 SG
 * 3. 371-01 (Index 344) - Acetamiprid/200 SP
 * 4. 372-01 (Index 206) - Acetamiprid/200 WG
 * 5. 246-01 (Index 181) - Aclonifen/600 ZZ
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

// The first 5 formulation codes to test
const TEST_FORMULATION_CODES = ['370-01', '312-01', '371-01', '372-01', '246-01'];
const TEST_BASE_CODES = ['370', '312', '371', '372', '246'];
const TEST_INDEXES = ['278', '343', '344', '206', '181'];

// Simple extraction: find blocks containing our test codes
function extractBlocks(sql: string, pattern: RegExp, includeNextLines: number = 15): string {
  const lines = sql.split('\n');
  const result: string[] = [];
  let includeNext = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (pattern.test(line)) {
      includeNext = includeNextLines;
    }

    if (includeNext > 0) {
      result.push(line);
      includeNext--;
      
      // Keep including if we're in a multi-line statement (has opening paren but not closing)
      if (line.includes('(') && !line.includes(')')) {
        includeNext = 50; // Extend for long statements
      }
    }
  }

  return result.join('\n');
}

async function createTestSQLFiles() {
  console.log('📝 Creating test SQL files for first 5 formulations...\n');

  const baseDir = join(__dirname, '..', 'contextsql', 'Final Import');
  
  // Read original files
  const part1 = readFileSync(join(baseDir, 'import_part1.sql'), 'utf8');
  const part2 = readFileSync(join(baseDir, 'import_part2.sql'), 'utf8');
  const part3 = readFileSync(join(baseDir, 'import_part3.sql'), 'utf8');
  const part4 = readFileSync(join(baseDir, 'import_part4.sql'), 'utf8');

  // Extract sections using simple pattern matching
  console.log('   Extracting base code registry...');
  const baseCodePattern = new RegExp(`base_code['"]?\\s*,\\s*['"]?(${TEST_BASE_CODES.join('|')})`);
  const baseCodes = extractBlocks(part1, baseCodePattern, 10);

  console.log('   Extracting formulations...');
  const formulationPattern = new RegExp(`-- Code:\\s*(${TEST_FORMULATION_CODES.join('|')})`);
  const formulations = extractBlocks(part1, formulationPattern, 25);

  console.log('   Extracting ingredients...');
  const ingredientPattern = new RegExp(`--\\s*(${TEST_FORMULATION_CODES.join('|')}):`);
  const ingredients = extractBlocks(part1, ingredientPattern, 10);

  console.log('   Extracting formulation-countries and use groups...');
  const fcPattern = new RegExp(`formulation_code\\s*=\\s*['"](${TEST_FORMULATION_CODES.join('|')})['"]`);
  const formulationCountries = extractBlocks(part2, fcPattern, 20);

  console.log('   Extracting business cases...');
  const bcPattern = new RegExp(`Index\\s+(${TEST_INDEXES.join('|')})`);
  const businessCases = extractBlocks(part3, bcPattern, 200); // 10 years × ~20 lines each

  console.log('   Extracting junctions...');
  const junctions = extractBlocks(part4, fcPattern, 20);

  // Combine into test files with proper structure
  const testPart1 = `-- TEST IMPORT - First 5 Formulations Only
-- Formulations: ${TEST_FORMULATION_CODES.join(', ')}

BEGIN;

-- SECTION 1: Base Code Registry
${baseCodes}

-- SECTION 2: Formulations
${formulations}

-- SECTION 3: Formulation Ingredients
${ingredients}

COMMIT;
`;

  const testPart2 = `-- TEST IMPORT - Part 2

BEGIN;

-- SECTION 4: Formulation Countries & Use Groups
${formulationCountries}

COMMIT;
`;

  const testPart3 = `-- TEST IMPORT - Part 3

BEGIN;

-- SECTION 5: Business Cases
${businessCases}

COMMIT;
`;

  const testPart4 = `-- TEST IMPORT - Part 4

BEGIN;

-- SECTION 6: Business Case-Use Group Junctions
${junctions}

COMMIT;
`;

  // Write test files
  const testDir = join(__dirname, '..', 'contextsql', 'Final Import', 'test');
  try {
    mkdirSync(testDir, { recursive: true });
  } catch (e) {
    // Directory might already exist
  }

  writeFileSync(join(testDir, 'test_part1.sql'), testPart1);
  writeFileSync(join(testDir, 'test_part2.sql'), testPart2);
  writeFileSync(join(testDir, 'test_part3.sql'), testPart3);
  writeFileSync(join(testDir, 'test_part4.sql'), testPart4);

  console.log('✅ Test SQL files created in contextsql/Final Import/test/\n');
  
  return [
    join(testDir, 'test_part1.sql'),
    join(testDir, 'test_part2.sql'),
    join(testDir, 'test_part3.sql'),
    join(testDir, 'test_part4.sql'),
  ];
}

async function executeTestImport(testFiles: string[]) {
  console.log('🚀 Executing test import...\n');

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    for (const file of testFiles) {
      const fileName = file.split('/').pop() || file;
      console.log(`📄 Executing: ${fileName}`);
      
      try {
        const sql = readFileSync(file, 'utf8');
        await client.query(sql);
        console.log(`   ✅ Success\n`);
      } catch (error: any) {
        console.error(`   ❌ Error: ${error.message}\n`);
        throw error;
      }
    }

    console.log('🎉 Test import completed successfully!\n');
    
    // Verify the data
    await verifyImportedData();

  } catch (error: any) {
    console.error('\n❌ Test import failed:', error.message);
    throw error;
  } finally {
    await client.end();
    console.log('\n🔌 Disconnected from database');
  }
}

async function verifyImportedData() {
  console.log('🔍 Verifying imported data...\n');
  
  const { rows: formulations } = await client.query(`
    SELECT formulation_code, formulation_name, base_code
    FROM formulations
    WHERE formulation_code = ANY($1)
    ORDER BY formulation_code
  `, [TEST_FORMULATION_CODES]);
  
  console.log(`✅ Found ${formulations.length} formulations:`);
  formulations.forEach(f => {
    console.log(`   - ${f.formulation_code}: ${f.formulation_name} (base: ${f.base_code})`);
  });

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
  ingredients.forEach(ing => {
    console.log(`   - ${ing.formulation_code}: ${ing.ingredient_name} (${ing.quantity} ${ing.quantity_unit}, ${ing.ingredient_role})`);
  });

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
  
  console.log(`\n✅ Found ${countries.length} country links:`);
  const byFormulation = countries.reduce((acc: any, row: any) => {
    if (!acc[row.formulation_code]) acc[row.formulation_code] = [];
    acc[row.formulation_code].push(row.country_code);
    return acc;
  }, {});
  Object.entries(byFormulation).forEach(([code, countryCodes]: [string, any]) => {
    console.log(`   - ${code}: ${countryCodes.join(', ')}`);
  });

  const { rows: useGroups } = await client.query(`
    SELECT 
      f.formulation_code,
      c.country_code,
      fcug.use_group_variant,
      fcug.is_primary
    FROM formulation_country_use_group fcug
    JOIN formulation_country fc ON fc.formulation_country_id = fcug.formulation_country_id
    JOIN formulations f ON f.formulation_id = fc.formulation_id
    JOIN countries c ON c.country_id = fc.country_id
    WHERE f.formulation_code = ANY($1)
    ORDER BY f.formulation_code, c.country_code
  `, [TEST_FORMULATION_CODES]);
  
  console.log(`\n✅ Found ${useGroups.length} use groups:`);
  useGroups.forEach(ug => {
    console.log(`   - ${ug.formulation_code} + ${ug.country_code}: variant ${ug.use_group_variant} (primary: ${ug.is_primary})`);
  });

  const { rows: businessCases } = await client.query(`
    SELECT 
      f.formulation_code,
      c.country_code,
      COUNT(*) as year_count
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
  
  console.log(`\n✅ Found ${businessCases.length} business case groups:`);
  businessCases.forEach(bc => {
    console.log(`   - ${bc.formulation_code} + ${bc.country_code}: ${bc.year_count} years`);
  });
}

async function main() {
  try {
    const testFiles = await createTestSQLFiles();
    await executeTestImport(testFiles);
  } catch (error: any) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
