/**
 * EPPO Data Enrichment Script
 * 
 * This script reads the crops CSV and enriches it with data from the full EPPO database:
 * - Parent-child relationships from t_links table
 * - EPPO datatypes from t_codes table
 * - Hierarchy levels (calculated)
 * - Group code metadata
 * 
 * Output: JSON file with enriched data ready for SQL generation
 */

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Paths
const EPPO_DB_PATH = 'C:\\Users\\Vikram.Sridhar\\Downloads\\sqlite_all\\eppocodes_all.sqlite';
const CROPS_CSV_PATH = 'C:\\Users\\Vikram.Sridhar\\Downloads\\bayer\\eppo_crops_all_european_languages.csv';
const OUTPUT_PATH = path.join(__dirname, 'enriched_eppo_data.json');

console.log('==========================================');
console.log('EPPO DATA ENRICHMENT SCRIPT');
console.log('==========================================\n');

// Open EPPO database
console.log('Opening EPPO database...');
const db = new Database(EPPO_DB_PATH, { readonly: true });

// Read and parse CSV
console.log('Reading crops CSV...');
const csvContent = fs.readFileSync(CROPS_CSV_PATH, 'utf-8');
const lines = csvContent.split('\n');

// Parse header
const header = lines[0].split('","').map(h => h.replace(/^"|"$/g, ''));
console.log(`Found ${header.length} columns in CSV\n`);

// Parse crop data
const crops = [];
for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  
  const match = lines[i].match(/"([^"]*)"/g);
  if (!match || match.length < 3) continue;
  
  const values = match.map(v => v.replace(/^"|"$/g, ''));
  
  const crop = {
    eppo_code: values[0],
    latin_name: values[1] || null,
    english_name: values[2] || null,
    german_name: values[3] || null,
    french_name: values[4] || null,
    italian_name: values[5] || null,
    spanish_name: values[6] || null,
    portuguese_name: values[7] || null,
    dutch_name: values[8] || null,
    russian_name: values[9] || null,
    swedish_name: values[10] || null,
    czech_name: values[11] || null,
    hungarian_name: values[12] || null,
    polish_name: values[13] || null,
    slovak_name: values[14] || null,
    croatian_name: values[15] || null,
    ukrainian_name: values[16] || null,
    bulgarian_name: values[17] || null,
    lithuanian_name: values[18] || null,
    catalan_name: values[19] || null,
    danish_name: values[20] || null,
    slovene_name: values[21] || null,
    turkish_name: values[22] || null,
    num_crop_groups: parseInt(values[23]) || 0,
    crop_group_codes: values[24] || '',
    crop_group_names: values[25] || ''
  };
  
  crops.push(crop);
}

console.log(`Parsed ${crops.length} crops from CSV\n`);

// Extract all unique group codes
const groupCodes = new Set();
crops.forEach(crop => {
  if (crop.crop_group_codes) {
    const codes = crop.crop_group_codes.split(';').map(c => c.trim()).filter(c => c);
    codes.forEach(code => groupCodes.add(code));
  }
});

console.log(`Found ${groupCodes.size} unique group codes\n`);

// Function to enrich a single EPPO code with database metadata
function enrichEPPOCode(eppoCode) {
  // Get basic code info from EPPO database
  const codeInfo = db.prepare(`
    SELECT 
      c.codeid,
      c.eppocode,
      c.dtcode,
      dt.libtype as datatype_name,
      c.status
    FROM t_codes c
    LEFT JOIN t_datatypes dt ON c.dtcode = dt.dtcode
    WHERE c.eppocode = ? AND c.status = 'A'
  `).get(eppoCode);
  
  if (!codeInfo) {
    console.warn(`Warning: EPPO code ${eppoCode} not found in database`);
    return null;
  }
  
  // Get parent codes (direct parents only)
  const parents = db.prepare(`
    SELECT 
      c.eppocode as parent_code,
      lt.linkdesc as link_type
    FROM t_links l
    JOIN t_codes c ON l.codeid_parent = c.codeid
    LEFT JOIN t_link_types lt ON l.idlinkcode = lt.idlinkcode
    WHERE l.codeid = ? AND l.status = 'A'
  `).all(codeInfo.codeid);
  
  // Get child count
  const childCount = db.prepare(`
    SELECT COUNT(*) as count
    FROM t_links l
    WHERE l.codeid_parent = ? AND l.status = 'A'
  `).get(codeInfo.codeid);
  
  return {
    eppo_code: eppoCode,
    codeid: codeInfo.codeid,
    eppo_datatype: codeInfo.dtcode,
    datatype_name: codeInfo.datatype_name,
    parents: parents.map(p => p.parent_code),
    link_types: parents.map(p => p.link_type),
    is_parent: childCount.count > 0,
    child_count: childCount.count
  };
}

// Build set of all codes we have
const allCodesInSubset = new Set([...crops.map(c => c.eppo_code), ...Array.from(groupCodes)]);

// Enrich all individual crops
console.log('Enriching individual crop codes...');
const enrichedCrops = [];
let enrichedCount = 0;

for (const crop of crops) {
  const enrichedMeta = enrichEPPOCode(crop.eppo_code);
  
  if (enrichedMeta) {
    // Filter parents to only include those in our subset
    const validParents = enrichedMeta.parents.filter(p => allCodesInSubset.has(p));
    
    enrichedCrops.push({
      ...crop,
      ...enrichedMeta,
      parents: validParents,
      eppo_type: 'individual_crop',
      classification: 'crop'
    });
    enrichedCount++;
  } else {
    enrichedCrops.push({
      ...crop,
      eppo_type: 'individual_crop',
      classification: 'crop',
      eppo_datatype: null,
      datatype_name: null,
      parents: [],
      link_types: [],
      is_parent: false,
      child_count: 0
    });
  }
}

console.log(`Enriched ${enrichedCount}/${crops.length} individual crops\n`);

// Enrich all group codes
console.log('Enriching group codes...');
const enrichedGroups = [];
let groupEnrichedCount = 0;

for (const groupCode of Array.from(groupCodes).sort()) {
  const enrichedMeta = enrichEPPOCode(groupCode);
  
  if (enrichedMeta) {
    // Get preferred name from EPPO database
    const nameInfo = db.prepare(`
      SELECT fullname, codelang
      FROM t_names
      WHERE codeid = ? AND preferred = 1
      LIMIT 1
    `).get(enrichedMeta.codeid);
    
    // Filter parents to only include those in our subset
    const validParents = enrichedMeta.parents.filter(p => allCodesInSubset.has(p));
    
    enrichedGroups.push({
      eppo_code: groupCode,
      ...enrichedMeta,
      parents: validParents,
      latin_name: nameInfo ? nameInfo.fullname : null,
      english_name: null, // Group codes typically only have Latin names
      eppo_type: 'crop_group',
      classification: 'crop'
    });
    groupEnrichedCount++;
  }
}

console.log(`Enriched ${groupEnrichedCount}/${groupCodes.size} group codes\n`);

// Calculate hierarchy levels
console.log('Calculating hierarchy levels...');

function calculateHierarchyLevel(code, allCodes, visited = new Set()) {
  if (visited.has(code.eppo_code)) {
    return 0; // Circular reference, treat as root
  }
  
  visited.add(code.eppo_code);
  
  if (!code.parents || code.parents.length === 0) {
    return 0; // Root level
  }
  
  // Find parent in our dataset
  const parentCode = code.parents[0]; // Use first parent if multiple
  const parent = allCodes.find(c => c.eppo_code === parentCode);
  
  if (!parent) {
    return 1; // Parent not in our dataset, assume level 1
  }
  
  return calculateHierarchyLevel(parent, allCodes, visited) + 1;
}

const allEnrichedCodes = [...enrichedCrops, ...enrichedGroups];

allEnrichedCodes.forEach(code => {
  code.hierarchy_level = calculateHierarchyLevel(code, allEnrichedCodes);
});

console.log('Hierarchy levels calculated\n');

// Generate summary statistics
const stats = {
  total_codes: allEnrichedCodes.length,
  individual_crops: enrichedCrops.length,
  crop_groups: enrichedGroups.length,
  codes_with_parents: allEnrichedCodes.filter(c => c.parents && c.parents.length > 0).length,
  parent_codes: allEnrichedCodes.filter(c => c.is_parent).length,
  datatypes: {}
};

allEnrichedCodes.forEach(code => {
  const dt = code.eppo_datatype || 'UNKNOWN';
  stats.datatypes[dt] = (stats.datatypes[dt] || 0) + 1;
});

// Write output
const output = {
  metadata: {
    generated_at: new Date().toISOString(),
    source_csv: CROPS_CSV_PATH,
    source_db: EPPO_DB_PATH,
    statistics: stats
  },
  codes: allEnrichedCodes
};

console.log('Writing enriched data to file...');
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

console.log(`\n✅ Enrichment complete! Output written to: ${OUTPUT_PATH}`);
console.log('\nStatistics:');
console.log(`  Total codes: ${stats.total_codes}`);
console.log(`  Individual crops: ${stats.individual_crops}`);
console.log(`  Crop groups: ${stats.crop_groups}`);
console.log(`  Codes with parents: ${stats.codes_with_parents}`);
console.log(`  Parent codes: ${stats.parent_codes}`);
console.log('\nDatatypes:');
Object.entries(stats.datatypes).forEach(([dt, count]) => {
  console.log(`  ${dt}: ${count}`);
});

db.close();

console.log('\n==========================================');
console.log('ENRICHMENT COMPLETE');
console.log('==========================================');

