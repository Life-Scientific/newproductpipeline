/**
 * Generate small SQL batches for MCP import
 * Creates INSERT statements in batches of 10 for reliable import
 */

const fs = require('fs');
const path = require('path');

const enrichedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'enriched_eppo_data.json'), 'utf-8')
);

const individuals = enrichedData.codes.filter(c => c.eppo_type === 'individual_crop');

console.log(`Generating import batches for ${individuals.length} individuals...`);

// Helper to escape SQL strings
function escapeSQLString(str) {
  if (str === null || str === undefined || str === '') return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Create batches of 10
const BATCH_SIZE = 10;
let batchNum = 1;

for (let i = 0; i < individuals.length; i += BATCH_SIZE) {
  const batch = individuals.slice(i, i + BATCH_SIZE);
  
  let sql = `-- MCP Import Batch ${batchNum} (${i + 1}-${i + batch.length})\n\n`;
  
  batch.forEach(code => {
    const parentCode = (code.parents && code.parents.length > 0) ? escapeSQLString(code.parents[0]) : 'NULL';
    
    sql += `INSERT INTO public.eppo_codes (
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
  
  const filename = `mcp_batch_${String(batchNum).padStart(3, '0')}.sql`;
  fs.writeFileSync(path.join(__dirname, filename), sql);
  
  console.log(`Generated ${filename}`);
  batchNum++;
}

console.log(`\n✅ Generated ${batchNum - 1} batches`);
console.log(`Total individuals: ${individuals.length}`);

