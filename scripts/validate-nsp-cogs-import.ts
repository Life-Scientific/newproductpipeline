#!/usr/bin/env tsx
/**
 * NSP & COGS Import Validator
 * 
 * Validates SQL import file before execution
 * Usage: npx tsx scripts/validate-nsp-cogs-import.ts <path-to-sql-file>
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalStatements: number;
    updateStatements: number;
    insertStatements: number;
    hasTransactions: boolean;
    estimatedRows: number;
  };
}

function validateSQLFile(filePath: string): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    stats: {
      totalStatements: 0,
      updateStatements: 0,
      insertStatements: 0,
      hasTransactions: false,
      estimatedRows: 0,
    },
  };

  try {
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Check for BEGIN/COMMIT
    const hasBegin = /^\s*BEGIN\s*;?\s*$/i.test(content);
    const hasCommit = /^\s*COMMIT\s*;?\s*$/i.test(content);
    result.stats.hasTransactions = hasBegin && hasCommit;

    if (!hasBegin) {
      result.warnings.push('No BEGIN statement found - consider wrapping in transaction');
    }
    if (!hasCommit) {
      result.warnings.push('No COMMIT statement found - consider wrapping in transaction');
    }

    // Count statements
    const updateMatches = content.match(/UPDATE\s+business_case/gi);
    const insertMatches = content.match(/INSERT\s+INTO\s+business_case/gi);
    
    result.stats.updateStatements = updateMatches?.length || 0;
    result.stats.insertStatements = insertMatches?.length || 0;
    result.stats.totalStatements = result.stats.updateStatements + result.stats.insertStatements;

    // Estimate rows (rough count of VALUES or SET clauses)
    if (result.stats.updateStatements > 0) {
      const setMatches = content.match(/SET\s+[^;]+/gi);
      result.stats.estimatedRows = setMatches?.length || result.stats.updateStatements;
    } else if (result.stats.insertStatements > 0) {
      const valuesMatches = content.match(/VALUES\s*\(/gi);
      result.stats.estimatedRows = valuesMatches?.length || result.stats.insertStatements;
    }

    // Check for NSP and COGS columns
    const hasNSP = /nsp\s*=/i.test(content) || /nsp\s*,/i.test(content);
    const hasCOGS = /cogs_per_unit\s*=/i.test(content) || /cogs_per_unit\s*,/i.test(content);

    if (!hasNSP && !hasCOGS) {
      result.errors.push('No NSP or COGS columns found in SQL file');
      result.isValid = false;
    }

    if (!hasNSP) {
      result.warnings.push('No NSP column found - only COGS will be updated');
    }

    if (!hasCOGS) {
      result.warnings.push('No COGS column found - only NSP will be updated');
    }

    // Check for common syntax issues
    const unclosedParens = (content.match(/\(/g) || []).length;
    const closedParens = (content.match(/\)/g) || []).length;
    if (unclosedParens !== closedParens) {
      result.errors.push(`Mismatched parentheses: ${unclosedParens} open, ${closedParens} close`);
      result.isValid = false;
    }

    // Check for semicolons (should have them)
    const semicolonCount = (content.match(/;/g) || []).length;
    if (semicolonCount < result.stats.totalStatements) {
      result.warnings.push(`Low semicolon count (${semicolonCount}) - some statements might be missing semicolons`);
    }

    // Check file size
    const fileSizeMB = content.length / (1024 * 1024);
    if (fileSizeMB > 100) {
      result.warnings.push(`Large file size (${fileSizeMB.toFixed(2)}MB) - consider chunking`);
    }

    // Check for business_case_id references
    const hasBusinessCaseId = /business_case_id/i.test(content);
    const hasBusinessCaseGroupId = /business_case_group_id/i.test(content);
    const hasFormulationCode = /formulation_code/i.test(content);

    if (!hasBusinessCaseId && !hasBusinessCaseGroupId && !hasFormulationCode) {
      result.warnings.push('No clear identifier found (business_case_id, business_case_group_id, or formulation_code) - verify WHERE clauses are correct');
    }

    // Check for WHERE clauses in UPDATE statements
    if (result.stats.updateStatements > 0) {
      const updateBlocks = content.split(/UPDATE\s+business_case/gi);
      let updatesWithoutWhere = 0;
      for (let i = 1; i < updateBlocks.length; i++) {
        const block = updateBlocks[i];
        if (!/WHERE/i.test(block.split(';')[0])) {
          updatesWithoutWhere++;
        }
      }
      if (updatesWithoutWhere > 0) {
        result.errors.push(`Found ${updatesWithoutWhere} UPDATE statements without WHERE clause - this will update ALL rows!`);
        result.isValid = false;
      }
    }

  } catch (error: any) {
    result.errors.push(`Failed to read file: ${error.message}`);
    result.isValid = false;
  }

  return result;
}

function printResults(result: ValidationResult, filePath: string) {
  console.log('\n' + '='.repeat(80));
  console.log('📋 NSP & COGS Import Validation Report');
  console.log('='.repeat(80));
  console.log(`\n📄 File: ${filePath}`);
  console.log(`\n✅ Status: ${result.isValid ? 'VALID ✓' : 'INVALID ✗'}`);

  console.log('\n📊 Statistics:');
  console.log(`   Total Statements: ${result.stats.totalStatements}`);
  console.log(`   UPDATE Statements: ${result.stats.updateStatements}`);
  console.log(`   INSERT Statements: ${result.stats.insertStatements}`);
  console.log(`   Estimated Rows: ${result.stats.estimatedRows.toLocaleString()}`);
  console.log(`   Has Transactions: ${result.stats.hasTransactions ? 'Yes ✓' : 'No ⚠️'}`);

  if (result.errors.length > 0) {
    console.log('\n❌ Errors:');
    result.errors.forEach((error, i) => {
      console.log(`   ${i + 1}. ${error}`);
    });
  }

  if (result.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    result.warnings.forEach((warning, i) => {
      console.log(`   ${i + 1}. ${warning}`);
    });
  }

  if (result.isValid && result.warnings.length === 0) {
    console.log('\n🎉 File looks good! Ready for import.');
  } else if (result.isValid) {
    console.log('\n✅ File is valid but has warnings. Review before importing.');
  } else {
    console.log('\n🛑 File has errors. Fix them before importing.');
  }

  console.log('\n' + '='.repeat(80) + '\n');
}

// Main execution
const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: npx tsx scripts/validate-nsp-cogs-import.ts <path-to-sql-file>');
  process.exit(1);
}

const result = validateSQLFile(filePath);
printResults(result, filePath);

process.exit(result.isValid ? 0 : 1);



