/**
 * Batch Import EPPO Data
 * Reads enriched data and generates batch INSERT statements
 */

const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.join(__dirname, 'enriched_eppo_data.json');

console.log('Reading enriched data...');
const enrichedData = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf-8'));

const groups = enrichedData.codes.filter(c => c.eppo_type === 'crop_group');
const individuals = enrichedData.codes.filter(c => c.eppo_type === 'individual_crop');

console.log(`Found ${groups.length} groups and ${individuals.length} individuals\n`);

// Helper to escape SQL strings
function escapeSQLString(str) {
  if (str === null || str === undefined || str === '') return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Sort by hierarchy
groups.sort((a, b) => (a.hierarchy_level || 0) - (b.hierarchy_level || 0));
individuals.sort((a, b) => (a.hierarchy_level || 0) - (b.hierarchy_level || 0));

// Generate INSERT for groups
console.log('Generating SQL for groups...');
let groupSQL = '-- Import Group Codes\n\n';

groups.forEach(code => {
  const parentCode = code.parents && code.parents.length > 0 ? escapeSQLString(code.parents[0]) : 'NULL';
  
  groupSQL += `INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES (${escapeSQLString(code.eppo_code)}, ${escapeSQLString(code.latin_name)}, ${escapeSQLString(code.english_name)}, ${escapeSQLString(code.eppo_type)}, ${escapeSQLString(code.classification)}, ${escapeSQLString(code.eppo_datatype)}, ${parentCode}, ${code.is_parent}, ${code.hierarchy_level || 0}, true);\n`;
});

// Write groups SQL
const groupsPath = path.join(__dirname, 'import_groups.sql');
fs.writeFileSync(groupsPath, groupSQL);
console.log(`✓ Groups SQL written to: ${groupsPath}`);

// Generate INSERT for individuals in batches of 100
console.log('Generating SQL for individuals in batches...');

const BATCH_SIZE = 100;
const numBatches = Math.ceil(individuals.length / BATCH_SIZE);

for (let batchNum = 0; batchNum < numBatches; batchNum++) {
  const start = batchNum * BATCH_SIZE;
  const end = Math.min(start + BATCH_SIZE, individuals.length);
  const batch = individuals.slice(start, end);
  
  let batchSQL = `-- Import Individual Crops Batch ${batchNum + 1}/${numBatches} (${start + 1}-${end})\n\n`;
  
  batch.forEach(code => {
    const parentCode = code.parents && code.parents.length > 0 ? escapeSQLString(code.parents[0]) : 'NULL';
    
    batchSQL += `INSERT INTO public.eppo_codes (
  eppo_code, latin_name, english_name, german_name, french_name, italian_name,
  spanish_name, portuguese_name, dutch_name, russian_name, swedish_name,
  czech_name, hungarian_name, polish_name, slovak_name, croatian_name,
  ukrainian_name, bulgarian_name, lithuanian_name, catalan_name, danish_name,
  slovene_name, turkish_name, eppo_type, classification, eppo_datatype,
  parent_eppo_code, is_parent, hierarchy_level, is_active
) VALUES (
  ${escapeSQLString(code.eppo_code)}, ${escapeSQLString(code.latin_name)}, ${escapeSQLString(code.english_name)},
  ${escapeSQLString(code.german_name)}, ${escapeSQLString(code.french_name)}, ${escapeSQLString(code.italian_name)},
  ${escapeSQLString(code.spanish_name)}, ${escapeSQLString(code.portuguese_name)}, ${escapeSQLString(code.dutch_name)},
  ${escapeSQLString(code.russian_name)}, ${escapeSQLString(code.swedish_name)}, ${escapeSQLString(code.czech_name)},
  ${escapeSQLString(code.hungarian_name)}, ${escapeSQLString(code.polish_name)}, ${escapeSQLString(code.slovak_name)},
  ${escapeSQLString(code.croatian_name)}, ${escapeSQLString(code.ukrainian_name)}, ${escapeSQLString(code.bulgarian_name)},
  ${escapeSQLString(code.lithuanian_name)}, ${escapeSQLString(code.catalan_name)}, ${escapeSQLString(code.danish_name)},
  ${escapeSQLString(code.slovene_name)}, ${escapeSQLString(code.turkish_name)},
  ${escapeSQLString(code.eppo_type)}, ${escapeSQLString(code.classification)}, ${escapeSQLString(code.eppo_datatype)},
  ${parentCode}, ${code.is_parent}, ${code.hierarchy_level || 0}, true
);\n\n`;
  });
  
  const batchPath = path.join(__dirname, `import_individuals_batch_${batchNum + 1}.sql`);
  fs.writeFileSync(batchPath, batchSQL);
  console.log(`✓ Batch ${batchNum + 1}/${numBatches} written to: ${batchPath}`);
}

console.log(`\n✅ Generated ${numBatches + 1} SQL files for import`);
console.log('\nTo import:');
console.log('1. Import groups first: import_groups.sql');
console.log(`2. Import individual batches 1-${numBatches}`);

