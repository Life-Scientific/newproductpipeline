#!/usr/bin/env tsx
/**
 * Extract 5 Random Formulations with All Data
 * 
 * Randomly extracts 5 formulations with ALL relationships:
 * 1. Base code registry
 * 2. Formulation
 * 3. Formulation ingredients
 * 4. Formulation-country links (from part1!)
 * 5. Use groups (from part1!)
 * 6. Business cases (from part2)
 * 7. Business case-use group junctions (from part3)
 * 8. COGS entries (generated from business case data)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface CogsEntry {
  formulationCode: string;
  countryCode: string | null;
  fiscalYear: string;
  cogsValue: number;
}

/**
 * Extract all formulation codes from part1
 */
function getAllFormulationCodes(part1: string): string[] {
  const codes: string[] = [];
  const lines = part1.split('\n');
  
  for (const line of lines) {
    const match = line.match(/-- Code:\s+([\d]+-[\d]+)/);
    if (match) {
      codes.push(match[1]);
    }
  }
  
  return codes;
}

/**
 * Randomly select N formulations
 */
function selectRandomFormulations(codes: string[], count: number): string[] {
  const shuffled = [...codes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Extract all sections for selected formulations from part1
 */
function extractFromPart1(part1: string, selectedCodes: Set<string>): {
  baseCodes: string[];
  formulations: string[];
  ingredients: string[];
  formulationCountries: string[];
  useGroups: string[];
} {
  const result = {
    baseCodes: [] as string[],
    formulations: [] as string[],
    ingredients: [] as string[],
    formulationCountries: [] as string[],
    useGroups: [] as string[],
  };
  
  const lines = part1.split('\n');
  let currentSection: 'none' | 'baseCode' | 'formulation' | 'ingredient' | 'formulationCountry' | 'useGroup' = 'none';
  let currentCode: string | null = null;
  let currentBlock: string[] = [];
  let capturing = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect base code section
    const baseCodeMatch = line.match(/-- Base Code:\s+([\d]+)/);
    if (baseCodeMatch) {
      // Save previous block if any
      if (capturing && currentBlock.length > 0) {
        saveBlock(result, currentSection, currentBlock);
      }
      
      const baseCode = baseCodeMatch[1];
      // Check if any selected formulation starts with this base code
      const matchingCode = Array.from(selectedCodes).find(code => code.startsWith(baseCode + '-'));
      
      if (matchingCode) {
        currentSection = 'baseCode';
        currentCode = matchingCode;
        currentBlock = [line];
        capturing = true;
      } else {
        capturing = false;
      }
      continue;
    }
    
    // Detect formulation section
    const formCodeMatch = line.match(/-- Code:\s+([\d]+-[\d]+)/);
    if (formCodeMatch) {
      // Save previous block if any
      if (capturing && currentBlock.length > 0) {
        saveBlock(result, currentSection, currentBlock);
      }
      
      const code = formCodeMatch[1];
      if (selectedCodes.has(code)) {
        currentSection = 'formulation';
        currentCode = code;
        currentBlock = [line];
        capturing = true;
      } else {
        capturing = false;
      }
      continue;
    }
    
    // Detect ingredient section
    const ingredientMatch = line.match(/--\s+([\d]+-[\d]+):/);
    if (ingredientMatch) {
      // Save previous block if any
      if (capturing && currentBlock.length > 0) {
        saveBlock(result, currentSection, currentBlock);
      }
      
      const code = ingredientMatch[1];
      if (selectedCodes.has(code)) {
        currentSection = 'ingredient';
        currentCode = code;
        currentBlock = [line];
        capturing = true;
      } else {
        capturing = false;
      }
      continue;
    }
    
    // Detect formulation_country section
    if (line.match(/INSERT INTO formulation_country \(/)) {
      // Look ahead to find the formulation code
      let lookAheadCode: string | null = null;
      for (let j = i; j < Math.min(i + 10, lines.length); j++) {
        const codeMatch = lines[j].match(/formulation_code\s*=\s*'([\d]+-[\d]+)'/);
        if (codeMatch) {
          lookAheadCode = codeMatch[1];
          break;
        }
      }
      
      // Save previous block if any
      if (capturing && currentBlock.length > 0) {
        saveBlock(result, currentSection, currentBlock);
      }
      
      if (lookAheadCode && selectedCodes.has(lookAheadCode)) {
        currentSection = 'formulationCountry';
        currentCode = lookAheadCode;
        currentBlock = [line];
        capturing = true;
      } else {
        capturing = false;
      }
      continue;
    }
    
    // Detect use group section  
    if (line.match(/INSERT INTO formulation_country_use_group \(/)) {
      // Look ahead to find the formulation code
      let lookAheadCode: string | null = null;
      for (let j = i; j < Math.min(i + 15, lines.length); j++) {
        const codeMatch = lines[j].match(/formulation_code\s*=\s*'([\d]+-[\d]+)'/);
        if (codeMatch) {
          lookAheadCode = codeMatch[1];
          break;
        }
      }
      
      // Save previous block if any
      if (capturing && currentBlock.length > 0) {
        saveBlock(result, currentSection, currentBlock);
      }
      
      if (lookAheadCode && selectedCodes.has(lookAheadCode)) {
        currentSection = 'useGroup';
        currentCode = lookAheadCode;
        currentBlock = [line];
        capturing = true;
      } else {
        capturing = false;
      }
      continue;
    }
    
    // Capture lines if we're in a selected block
    if (capturing) {
      currentBlock.push(line);
      
      // End of block detection (empty line or start of new section)
      if (line.trim() === '' || 
          line.match(/^-- (Base Code|Code|CSV Index):/) ||
          line.match(/^INSERT INTO/)) {
        // Check if this is truly the end (next line doesn't continue the statement)
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim();
          if (nextLine === '' || 
              nextLine.startsWith('--') || 
              nextLine.startsWith('INSERT') ||
              nextLine.startsWith('ON CONFLICT')) {
            // This is the end of the block
            continue;
          }
        }
      }
    }
  }
  
  // Save last block if any
  if (capturing && currentBlock.length > 0) {
    saveBlock(result, currentSection, currentBlock);
  }
  
  return result;
}

function saveBlock(
  result: any,
  section: string,
  block: string[]
) {
  const text = block.join('\n');
  
  switch (section) {
    case 'baseCode':
      result.baseCodes.push(text);
      break;
    case 'formulation':
      result.formulations.push(text);
      break;
    case 'ingredient':
      result.ingredients.push(text);
      break;
    case 'formulationCountry':
      result.formulationCountries.push(text);
      break;
    case 'useGroup':
      result.useGroups.push(text);
      break;
  }
}

/**
 * Extract business cases from part2
 */
function extractFromPart2(part2: string, selectedCodes: Set<string>): {
  businessCases: string[];
  cogsData: CogsEntry[];
} {
  const businessCases: string[] = [];
  const cogsData: CogsEntry[] = [];
  
  // Split into business case groups by the comment marker
  const groupPattern = /-- Business Case Group:[\s\S]*?(?=-- Business Case Group:|$)/g;
  const groups = part2.match(groupPattern) || [];
  
  for (const group of groups) {
    // Extract formulation code from comment
    const codeMatch = group.match(/-- Formulation Code:\s*([\d]+-[\d]+)/);
    if (!codeMatch) continue;
    
    const formulationCode = codeMatch[1];
    if (!selectedCodes.has(formulationCode)) continue;
    
    // Extract country from comment
    const countryMatch = group.match(/-- Business Case Group:.*Country\s+([A-Z]{2})/);
    const countryCode = countryMatch ? countryMatch[1] : null;
    
    // This is a selected formulation - save the entire group
    businessCases.push(group);
    
    // Extract all INSERT statements and their data
    const insertPattern = /INSERT INTO business_case[\s\S]*?\);/g;
    const inserts = group.match(insertPattern) || [];
    
    for (const insert of inserts) {
      // Extract year_offset, effective_start_fiscal_year, and cogs_per_unit
      const offsetMatch = insert.match(/year_offset.*?\n\s*(\d+)/);
      const yearMatch = insert.match(/effective_start_fiscal_year.*?'(FY\d+)'/);
      const cogsMatch = insert.match(/cogs_per_unit.*?\n\s*([\d.]+)/);
      
      if (offsetMatch && yearMatch && cogsMatch) {
        const yearOffset = parseInt(offsetMatch[1]);
        const startYear = yearMatch[1];
        const cogsValue = parseFloat(cogsMatch[1]);
        
        // Calculate actual fiscal year: FY30 with offset 1 = 2030, offset 2 = 2031, etc.
        const baseYear = parseInt(startYear.replace('FY', '20'));
        const fiscalYear = (baseYear + yearOffset - 1).toString();
        
        cogsData.push({
          formulationCode,
          countryCode,
          fiscalYear,
          cogsValue,
        });
      }
    }
  }
  
  return { businessCases, cogsData };
}

/**
 * Extract junctions from part3
 */
function extractFromPart3(part3: string, selectedCodes: Set<string>): string[] {
  const junctions: string[] = [];
  
  const lines = part3.split('\n');
  let capturing = false;
  let currentBlock: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect junction start
    if (line.match(/INSERT INTO business_case_use_groups \(/)) {
      // Look ahead to find the formulation code
      let lookAheadCode: string | null = null;
      for (let j = i; j < Math.min(i + 30, lines.length); j++) {
        const codeMatch = lines[j].match(/formulation_code\s*=\s*'([\d]+-[\d]+)'/);
        if (codeMatch) {
          lookAheadCode = codeMatch[1];
          break;
        }
      }
      
      // Save previous block if any
      if (capturing && currentBlock.length > 0) {
        junctions.push(currentBlock.join('\n'));
      }
      
      if (lookAheadCode && selectedCodes.has(lookAheadCode)) {
        currentBlock = [line];
        capturing = true;
      } else {
        capturing = false;
      }
      continue;
    }
    
    // Capture lines if we're in a selected block
    if (capturing) {
      currentBlock.push(line);
      
      // End of block detection
      if (line.trim() === '' || line.match(/^-- Junction:/)) {
        continue;
      }
    }
  }
  
  // Save last block if any
  if (capturing && currentBlock.length > 0) {
    junctions.push(currentBlock.join('\n'));
  }
  
  return junctions;
}

/**
 * Generate COGS SQL from extracted business case data
 */
function generateCogsSql(cogsData: CogsEntry[]): string {
  if (cogsData.length === 0) return '';
  
  // Group by formulation + fiscal year to determine if we should create country-specific or global entries
  const groupedByFormYear = new Map<string, CogsEntry[]>();
  
  for (const entry of cogsData) {
    const key = `${entry.formulationCode}|${entry.fiscalYear}`;
    if (!groupedByFormYear.has(key)) {
      groupedByFormYear.set(key, []);
    }
    groupedByFormYear.get(key)!.push(entry);
  }
  
  const sqlBlocks: string[] = [];
  
  // For each formulation + fiscal year combination
  for (const [key, entries] of groupedByFormYear.entries()) {
    const [formulationCode, fiscalYear] = key.split('|');
    
    // Check if all COGS values are the same
    const uniqueValues = new Set(entries.map(e => e.cogsValue));
    
    if (uniqueValues.size === 1) {
      // All countries have the same COGS - create a global entry
      const cogsValue = entries[0].cogsValue;
      sqlBlocks.push(`
-- ${formulationCode} - FY${fiscalYear} (Global)
INSERT INTO cogs (
  formulation_id, country_id, fiscal_year, cogs_value, currency, source,
  created_by, updated_by, version
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '${formulationCode}'),
  NULL,
  '${fiscalYear}',
  ${cogsValue},
  'USD',
  'UUID Import Script',
  auth.uid(),
  auth.uid(),
  1
WHERE NOT EXISTS (
  SELECT 1 FROM cogs
  WHERE formulation_id = (SELECT formulation_id FROM formulations WHERE formulation_code = '${formulationCode}')
    AND fiscal_year = '${fiscalYear}'
    AND country_id IS NULL
)
ON CONFLICT (formulation_id, COALESCE(country_id, '00000000-0000-0000-0000-000000000000'::uuid), fiscal_year)
DO UPDATE SET
  cogs_value = EXCLUDED.cogs_value,
  updated_by = EXCLUDED.updated_by,
  updated_at = CURRENT_TIMESTAMP,
  version = cogs.version + 1;
`);
    } else {
      // Different COGS values per country - create country-specific entries
      for (const entry of entries) {
        if (entry.countryCode) {
          sqlBlocks.push(`
-- ${entry.formulationCode} - ${entry.countryCode} - FY${entry.fiscalYear}
INSERT INTO cogs (
  formulation_id, country_id, fiscal_year, cogs_value, currency, source,
  created_by, updated_by, version
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '${entry.formulationCode}'),
  (SELECT country_id FROM countries WHERE country_code = '${entry.countryCode}'),
  '${entry.fiscalYear}',
  ${entry.cogsValue},
  'USD',
  'UUID Import Script',
  auth.uid(),
  auth.uid(),
  1
WHERE NOT EXISTS (
  SELECT 1 FROM cogs
  WHERE formulation_id = (SELECT formulation_id FROM formulations WHERE formulation_code = '${entry.formulationCode}')
    AND country_id = (SELECT country_id FROM countries WHERE country_code = '${entry.countryCode}')
    AND fiscal_year = '${entry.fiscalYear}'
)
ON CONFLICT (formulation_id, COALESCE(country_id, '00000000-0000-0000-0000-000000000000'::uuid), fiscal_year)
DO UPDATE SET
  cogs_value = EXCLUDED.cogs_value,
  updated_by = EXCLUDED.updated_by,
  updated_at = CURRENT_TIMESTAMP,
  version = cogs.version + 1;
`);
        }
      }
    }
  }
  
  return sqlBlocks.join('\n');
}

async function main() {
  console.log('🎲 Extracting 5 random formulations...\n');
  
  const baseDir = join(__dirname, '..', 'contextsql', 'Final Import');
  const testDir = join(baseDir, 'test');
  
  // Create test directory
  try {
    mkdirSync(testDir, { recursive: true });
  } catch (e) {
    // Directory might already exist
  }
  
  // Read all 3 parts
  console.log('   Reading import files...');
  const part1 = readFileSync(join(baseDir, 'import_part1.sql'), 'utf8');
  const part2 = readFileSync(join(baseDir, 'import_part2.sql'), 'utf8');
  const part3 = readFileSync(join(baseDir, 'import_part3.sql'), 'utf8');
  
  // Get all formulation codes and randomly select 5
  console.log('   Selecting random formulations...');
  const allCodes = getAllFormulationCodes(part1);
  const selectedCodes = selectRandomFormulations(allCodes, 5);
  const selectedSet = new Set(selectedCodes);
  
  console.log(`\n📝 Selected formulations: ${selectedCodes.join(', ')}\n`);
  
  // Extract from each part
  console.log('   Extracting from part1...');
  const part1Data = extractFromPart1(part1, selectedSet);
  
  console.log('   Extracting from part2...');
  const part2Data = extractFromPart2(part2, selectedSet);
  
  console.log('   Extracting from part3...');
  const part3Junctions = extractFromPart3(part3, selectedSet);
  
  console.log('   ⏭️  Skipping COGS generation (will be handled later)...');
  
  // Build test SQL files
  const testPart1 = `-- TEST IMPORT - 5 Random Formulations
-- Formulations: ${selectedCodes.join(', ')}
-- Part 1: Base Codes, Formulations, Ingredients, Countries, Use Groups

BEGIN;

-- Base Code Registry
${part1Data.baseCodes.join('\n\n')}

-- Formulations
${part1Data.formulations.join('\n\n')}

-- Formulation Ingredients
${part1Data.ingredients.join('\n\n')}

-- Formulation Countries
${part1Data.formulationCountries.join('\n\n')}

-- Formulation Country Use Groups
${part1Data.useGroups.join('\n\n')}

COMMIT;
`;
  
  const testCogs = `-- TEST IMPORT - COGS Entries
-- Formulations: ${selectedCodes.join(', ')}
-- COGS import skipped - will be handled separately later

BEGIN;

-- No COGS entries - skipped per user request

COMMIT;
`;
  
  const testPart2 = `-- TEST IMPORT - Business Cases
-- Formulations: ${selectedCodes.join(', ')}
-- Part 2: Business Cases (10-year projections)

BEGIN;

${part2Data.businessCases.join('\n\n')}

COMMIT;
`;
  
  const testPart3 = `-- TEST IMPORT - Junction Tables
-- Formulations: ${selectedCodes.join(', ')}
-- Part 3: Business Case-Use Group Links

BEGIN;

${part3Junctions.join('\n\n')}

COMMIT;
`;
  
  // Write test files
  writeFileSync(join(testDir, 'test_5_random_part1.sql'), testPart1);
  writeFileSync(join(testDir, 'test_5_random_cogs.sql'), testCogs);
  writeFileSync(join(testDir, 'test_5_random_part2.sql'), testPart2);
  writeFileSync(join(testDir, 'test_5_random_part3.sql'), testPart3);
  
  console.log('✅ Test files created:');
  console.log(`   - test_5_random_part1.sql (${part1Data.baseCodes.length} base codes, ${part1Data.formulations.length} formulations, ${part1Data.ingredients.length} ingredient blocks, ${part1Data.formulationCountries.length} countries, ${part1Data.useGroups.length} use groups)`);
  console.log(`   - test_5_random_cogs.sql (COGS skipped - will be handled later)`);
  console.log(`   - test_5_random_part2.sql (${part2Data.businessCases.length} business cases)`);
  console.log(`   - test_5_random_part3.sql (${part3Junctions.length} junctions)`);
  console.log('\n📋 Next steps:');
  console.log('   1. Run: npx tsx scripts/cleanup-test-data.ts');
  console.log('   2. Run: npx tsx scripts/run-test-import.ts');
  console.log('   3. Run: npx tsx scripts/verify-5-formulation-import.ts');
}

main().catch(console.error);


