#!/usr/bin/env tsx
/**
 * Create Complete Test Import - Extract all data for 5 test formulations
 * 
 * Creates complete test SQL files with:
 * - Part 1: Base codes, formulations, ingredients, formulation_country
 * - Part 2: Use groups
 * - Part 3: Business cases
 * - Part 4: Business case-use group junctions
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEST_FORMULATION_CODES = ['370-01', '312-01', '371-01', '372-01', '246-01'];
const TEST_BASE_CODES = ['370', '312', '371', '372', '246'];
const TEST_INDEXES = ['278', '343', '344', '206', '181'];

async function extractSection(sql: string, startMarker: string, endMarker?: string): Promise<string> {
  const startIdx = sql.indexOf(startMarker);
  if (startIdx === -1) return '';
  
  const endIdx = endMarker ? sql.indexOf(endMarker, startIdx) : sql.length;
  return sql.substring(startIdx, endIdx);
}

async function extractFormulationCountryEntries(sql: string): Promise<string> {
  const lines = sql.split('\n');
  const result: string[] = [];
  let inSection = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('-- SECTION 4: Formulation-Country Relationships')) {
      inSection = true;
      result.push(line);
      continue;
    }
    
    if (inSection && line.includes('-- SECTION 5:')) {
      break;
    }
    
    if (inSection) {
      // Check if this line is for one of our test formulations
      const matches = TEST_FORMULATION_CODES.some(code => 
        line.includes(`-- ${code} -`) || line.includes(`formulation_code = '${code}'`)
      );
      
      if (matches) {
        // Include this entry and the next ~10 lines (the INSERT statement)
        for (let j = i; j < Math.min(i + 12, lines.length); j++) {
          result.push(lines[j]);
        }
        i += 11; // Skip ahead
      }
    }
  }
  
  return result.join('\n');
}

async function extractUseGroups(sql: string): Promise<string> {
  const lines = sql.split('\n');
  const result: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this use group is for one of our test formulations
    const matches = TEST_FORMULATION_CODES.some(code => 
      line.includes(`formulation_code = '${code}'`)
    );
    
    if (matches) {
      // Include the comment and the INSERT statement (~15 lines)
      for (let j = Math.max(0, i - 1); j < Math.min(i + 16, lines.length); j++) {
        result.push(lines[j]);
      }
      i += 15;
    }
  }
  
  return result.join('\n');
}

async function extractBusinessCases(sql: string): Promise<string> {
  const lines = sql.split('\n');
  const result: string[] = [];
  let inGroup = false;
  let groupLineCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is a business case group for one of our test indexes
    const matches = TEST_INDEXES.some(idx => 
      line.includes(`Index ${idx}, Country`)
    );
    
    if (matches) {
      inGroup = true;
      groupLineCount = 0;
    }
    
    if (inGroup) {
      result.push(line);
      groupLineCount++;
      
      // Each group has ~170 lines (10 years × ~17 lines each)
      if (groupLineCount > 170) {
        inGroup = false;
        groupLineCount = 0;
      }
    }
  }
  
  return result.join('\n');
}

async function extractJunctions(sql: string): Promise<string> {
  const lines = sql.split('\n');
  const result: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this junction is for one of our test formulations
    const matches = TEST_FORMULATION_CODES.some(code => 
      line.includes(`formulation_code = '${code}'`) || 
      line.includes(`Index ${TEST_INDEXES.find(idx => {
        // Map index to formulation code
        const map: Record<string, string> = {
          '278': '370-01',
          '343': '312-01',
          '344': '371-01',
          '206': '372-01',
          '181': '246-01'
        };
        return map[idx] === code;
      })}`)
    );
    
    if (matches) {
      // Include the comment and the INSERT statement (~20 lines)
      for (let j = Math.max(0, i - 1); j < Math.min(i + 21, lines.length); j++) {
        result.push(lines[j]);
      }
      i += 20;
    }
  }
  
  return result.join('\n');
}

async function main() {
  console.log('📝 Creating complete test import files...\n');
  
  const baseDir = join(__dirname, '..', 'contextsql', 'Final Import');
  const testDir = join(__dirname, '..', 'contextsql', 'Final Import', 'test');
  
  try {
    mkdirSync(testDir, { recursive: true });
  } catch (e) {
    // Directory might already exist
  }
  
  // Read original files
  console.log('   Reading import files...');
  const part1 = readFileSync(join(baseDir, 'import_part1.sql'), 'utf8');
  const part2 = readFileSync(join(baseDir, 'import_part2.sql'), 'utf8');
  const part3 = readFileSync(join(baseDir, 'import_part3.sql'), 'utf8');
  const part4 = readFileSync(join(baseDir, 'import_part4.sql'), 'utf8');
  
  // Read the clean part 1 we already created
  const part1Clean = readFileSync(join(testDir, 'test_part1_clean.sql'), 'utf8');
  
  // Extract formulation_country entries
  console.log('   Extracting formulation_country entries...');
  const formulationCountries = await extractFormulationCountryEntries(part1);
  
  // Extract use groups
  console.log('   Extracting use groups...');
  const useGroups = await extractUseGroups(part2);
  
  // Extract business cases
  console.log('   Extracting business cases...');
  const businessCases = await extractBusinessCases(part3);
  
  // Extract junctions
  console.log('   Extracting junctions...');
  const junctions = await extractJunctions(part4);
  
  // Create complete part 1 (add formulation_country to existing clean file)
  const part1Complete = part1Clean.replace(
    'COMMIT;',
    `-- SECTION 4: Formulation-Country Relationships
${formulationCountries}

COMMIT;`
  );
  
  // Create part 2
  const part2Complete = `-- TEST IMPORT - Part 2: Use Groups

BEGIN;

-- SECTION 5: Primary Use Groups
${useGroups}

COMMIT;
`;
  
  // Create part 3
  const part3Complete = `-- TEST IMPORT - Part 3: Business Cases

BEGIN;

-- SECTION 6: Business Cases
${businessCases}

COMMIT;
`;
  
  // Create part 4
  const part4Complete = `-- TEST IMPORT - Part 4: Business Case-Use Group Junctions

BEGIN;

-- SECTION 7: Business Case-Use Group Junctions
${junctions}

COMMIT;
`;
  
  // Write files
  writeFileSync(join(testDir, 'test_part1_complete.sql'), part1Complete);
  writeFileSync(join(testDir, 'test_part2_complete.sql'), part2Complete);
  writeFileSync(join(testDir, 'test_part3_complete.sql'), part3Complete);
  writeFileSync(join(testDir, 'test_part4_complete.sql'), part4Complete);
  
  console.log('\n✅ Complete test SQL files created:');
  console.log(`   - ${join(testDir, 'test_part1_complete.sql')}`);
  console.log(`   - ${join(testDir, 'test_part2_complete.sql')}`);
  console.log(`   - ${join(testDir, 'test_part3_complete.sql')}`);
  console.log(`   - ${join(testDir, 'test_part4_complete.sql')}`);
  
  // Show stats
  const stats = {
    part1: part1Complete.split('\n').length,
    part2: part2Complete.split('\n').length,
    part3: part3Complete.split('\n').length,
    part4: part4Complete.split('\n').length,
  };
  
  console.log('\n📊 File sizes:');
  console.log(`   - Part 1: ${stats.part1} lines`);
  console.log(`   - Part 2: ${stats.part2} lines`);
  console.log(`   - Part 3: ${stats.part3} lines`);
  console.log(`   - Part 4: ${stats.part4} lines`);
}

main().catch(console.error);

