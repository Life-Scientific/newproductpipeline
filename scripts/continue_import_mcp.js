/**
 * Continue EPPO Import via MCP
 * Generates SQL chunks to paste into MCP execute_sql
 */

const fs = require('fs');
const path = require('path');

const enrichedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'enriched_eppo_data.json'), 'utf-8')
);

const individuals = enrichedData.codes.filter(c => c.eppo_type === 'individual_crop');

// Skip first 5 (already imported)
const remaining = individuals.slice(5);

console.log(`Generating SQL for ${remaining.length} remaining individuals...`);
console.log(`Will create chunks of 10 for easy import\n`);

// Helper
function escapeSQLString(str) {
  if (str === null || str === undefined || str === '') return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Generate chunks
const CHUNK_SIZE = 10;
const chunks = [];

for (let i = 0; i < remaining.length; i += CHUNK_SIZE) {
  const batch = remaining.slice(i, i + CHUNK_SIZE);
  
  let sql = `-- Chunk ${Math.floor(i / CHUNK_SIZE) + 1} (individuals ${i + 6}-${i + batch.length + 5})\n`;
  sql += `INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, german_name, french_name, italian_name, spanish_name, portuguese_name, dutch_name, russian_name, swedish_name, czech_name, hungarian_name, polish_name, slovak_name, croatian_name, ukrainian_name, bulgarian_name, lithuanian_name, catalan_name, danish_name, slovene_name, turkish_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active) VALUES\n`;
  
  const values = batch.map(code => {
    const parentCode = (code.parents && code.parents.length > 0) ? escapeSQLString(code.parents[0]) : 'NULL';
    return `(${escapeSQLString(code.eppo_code)}, ${escapeSQLString(code.latin_name)}, ${escapeSQLString(code.english_name)}, ${escapeSQLString(code.german_name)}, ${escapeSQLString(code.french_name)}, ${escapeSQLString(code.italian_name)}, ${escapeSQLString(code.spanish_name)}, ${escapeSQLString(code.portuguese_name)}, ${escapeSQLString(code.dutch_name)}, ${escapeSQLString(code.russian_name)}, ${escapeSQLString(code.swedish_name)}, ${escapeSQLString(code.czech_name)}, ${escapeSQLString(code.hungarian_name)}, ${escapeSQLString(code.polish_name)}, ${escapeSQLString(code.slovak_name)}, ${escapeSQLString(code.croatian_name)}, ${escapeSQLString(code.ukrainian_name)}, ${escapeSQLString(code.bulgarian_name)}, ${escapeSQLString(code.lithuanian_name)}, ${escapeSQLString(code.catalan_name)}, ${escapeSQLString(code.danish_name)}, ${escapeSQLString(code.slovene_name)}, ${escapeSQLString(code.turkish_name)}, ${escapeSQLString(code.eppo_type)}, ${escapeSQLString(code.classification)}, ${escapeSQLString(code.eppo_datatype)}, ${parentCode}, ${code.is_parent}, ${code.hierarchy_level || 0}, true)`;
  });
  
  sql += values.join(',\n');
  sql += ';\n';
  
  chunks.push(sql);
}

// Write to file
const outputPath = path.join(__dirname, 'mcp_import_chunks.sql');
fs.writeFileSync(outputPath, chunks.join('\n\n'));

console.log(`✅ Generated ${chunks.length} chunks`);
console.log(`📄 Saved to: ${outputPath}`);
console.log(`\nTo import: Run each chunk through MCP execute_sql tool\n`);

