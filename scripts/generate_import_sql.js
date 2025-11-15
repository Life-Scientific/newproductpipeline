/**
 * Generate SQL INSERT statements from enriched EPPO data
 * 
 * Reads the enriched_eppo_data.json and generates SQL INSERT statements
 * for populating the eppo_codes table
 */

const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.join(__dirname, 'enriched_eppo_data.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'supabase', 'migrations', '20251116000001_import_eppo_codes.sql');

console.log('==========================================');
console.log('GENERATE EPPO IMPORT SQL');
console.log('==========================================\n');

// Read enriched data
console.log('Reading enriched data...');
const enrichedData = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf-8'));

console.log(`Found ${enrichedData.codes.length} codes to import\n`);

// Helper function to escape SQL strings
function escapeSQLString(str) {
  if (str === null || str === undefined || str === '') return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Generate SQL
let sql = `-- ============================================================================
-- Migration: Import EPPO Codes Data
-- Description: Insert all 533 EPPO codes (465 crops + 68 groups) with
--              multilingual names and hierarchy relationships
-- Generated: ${new Date().toISOString()}
-- ============================================================================

-- Disable triggers temporarily for bulk insert
SET session_replication_role = replica;

-- ============================================================================
-- SECTION 1: Import Group Codes (parents must be imported first)
-- ============================================================================

`;

// Separate groups and individuals
const groups = enrichedData.codes.filter(c => c.eppo_type === 'crop_group');
const individuals = enrichedData.codes.filter(c => c.eppo_type === 'individual_crop');

console.log(`Generating SQL for ${groups.length} group codes...`);

// Sort groups by hierarchy level (parents first)
groups.sort((a, b) => (a.hierarchy_level || 0) - (b.hierarchy_level || 0));

groups.forEach(code => {
  const parentCode = code.parents && code.parents.length > 0 ? escapeSQLString(code.parents[0]) : 'NULL';
  
  sql += `INSERT INTO public.eppo_codes (
  eppo_code, latin_name, english_name,
  eppo_type, classification, eppo_datatype,
  parent_eppo_code, is_parent, hierarchy_level,
  is_active
) VALUES (
  ${escapeSQLString(code.eppo_code)}, 
  ${escapeSQLString(code.latin_name)}, 
  ${escapeSQLString(code.english_name)},
  ${escapeSQLString(code.eppo_type)}, 
  ${escapeSQLString(code.classification)}, 
  ${escapeSQLString(code.eppo_datatype)},
  ${parentCode}, 
  ${code.is_parent}, 
  ${code.hierarchy_level || 0},
  true
);
`;
});

sql += `
-- ============================================================================
-- SECTION 2: Import Individual Crop Codes
-- ============================================================================

`;

console.log(`Generating SQL for ${individuals.length} individual crop codes...`);

// Sort individuals by hierarchy level
individuals.sort((a, b) => (a.hierarchy_level || 0) - (b.hierarchy_level || 0));

individuals.forEach((code, index) => {
  const parentCode = code.parents && code.parents.length > 0 ? escapeSQLString(code.parents[0]) : 'NULL';
  
  sql += `INSERT INTO public.eppo_codes (
  eppo_code, 
  latin_name, english_name, german_name, french_name, italian_name,
  spanish_name, portuguese_name, dutch_name, russian_name, swedish_name,
  czech_name, hungarian_name, polish_name, slovak_name, croatian_name,
  ukrainian_name, bulgarian_name, lithuanian_name, catalan_name, danish_name,
  slovene_name, turkish_name,
  eppo_type, classification, eppo_datatype,
  parent_eppo_code, is_parent, hierarchy_level,
  is_active
) VALUES (
  ${escapeSQLString(code.eppo_code)},
  ${escapeSQLString(code.latin_name)},
  ${escapeSQLString(code.english_name)},
  ${escapeSQLString(code.german_name)},
  ${escapeSQLString(code.french_name)},
  ${escapeSQLString(code.italian_name)},
  ${escapeSQLString(code.spanish_name)},
  ${escapeSQLString(code.portuguese_name)},
  ${escapeSQLString(code.dutch_name)},
  ${escapeSQLString(code.russian_name)},
  ${escapeSQLString(code.swedish_name)},
  ${escapeSQLString(code.czech_name)},
  ${escapeSQLString(code.hungarian_name)},
  ${escapeSQLString(code.polish_name)},
  ${escapeSQLString(code.slovak_name)},
  ${escapeSQLString(code.croatian_name)},
  ${escapeSQLString(code.ukrainian_name)},
  ${escapeSQLString(code.bulgarian_name)},
  ${escapeSQLString(code.lithuanian_name)},
  ${escapeSQLString(code.catalan_name)},
  ${escapeSQLString(code.danish_name)},
  ${escapeSQLString(code.slovene_name)},
  ${escapeSQLString(code.turkish_name)},
  ${escapeSQLString(code.eppo_type)},
  ${escapeSQLString(code.classification)},
  ${escapeSQLString(code.eppo_datatype)},
  ${parentCode},
  ${code.is_parent},
  ${code.hierarchy_level || 0},
  true
);
`;
  
  // Add progress indicator every 50 rows
  if ((index + 1) % 50 === 0) {
    sql += `\n-- Imported ${index + 1} / ${individuals.length} individual crops\n\n`;
  }
});

sql += `
-- ============================================================================
-- SECTION 3: Re-enable Triggers and Verify Import
-- ============================================================================

-- Re-enable triggers
SET session_replication_role = DEFAULT;

-- Verify import counts
DO $$
DECLARE
  total_count INTEGER;
  crop_count INTEGER;
  group_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_count FROM public.eppo_codes;
  SELECT COUNT(*) INTO crop_count FROM public.eppo_codes WHERE eppo_type = 'individual_crop';
  SELECT COUNT(*) INTO group_count FROM public.eppo_codes WHERE eppo_type = 'crop_group';
  
  RAISE NOTICE 'EPPO Import Verification:';
  RAISE NOTICE '  Total codes imported: %', total_count;
  RAISE NOTICE '  Individual crops: %', crop_count;
  RAISE NOTICE '  Crop groups: %', group_count;
  
  IF total_count <> ${enrichedData.codes.length} THEN
    RAISE EXCEPTION 'Import count mismatch! Expected ${enrichedData.codes.length}, got %', total_count;
  END IF;
  
  IF crop_count <> ${individuals.length} THEN
    RAISE EXCEPTION 'Crop count mismatch! Expected ${individuals.length}, got %', crop_count;
  END IF;
  
  IF group_count <> ${groups.length} THEN
    RAISE EXCEPTION 'Group count mismatch! Expected ${groups.length}, got %', group_count;
  END IF;
  
  RAISE NOTICE 'Import verification successful!';
END $$;
`;

// Write SQL file
console.log('Writing SQL file...');
fs.writeFileSync(OUTPUT_PATH, sql);

console.log(`\n✅ SQL generation complete!`);
console.log(`   Output: ${OUTPUT_PATH}`);
console.log(`   Total statements: ${enrichedData.codes.length}`);
console.log(`   File size: ${(sql.length / 1024).toFixed(2)} KB`);

console.log('\n==========================================');
console.log('GENERATION COMPLETE');
console.log('==========================================');

