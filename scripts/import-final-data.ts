#!/usr/bin/env tsx
/**
 * Import Final Data Script
 * 
 * Executes the 4 sequential SQL files from contextsql/Final Import/
 * in order: import_part1.sql, import_part2.sql, import_part3.sql, import_part4.sql
 * 
 * These files contain:
 * - Part 1: Base code registry, formulations, and formulation ingredients (with Index references)
 * - Part 2: Formulation countries and use groups
 * - Part 3: Business cases (with Index references)
 * - Part 4: Business case-use group junctions (with Index references)
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connection string - using the same as other migration scripts
const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

interface ImportStats {
  file: string;
  success: boolean;
  error?: string;
  duration: number;
  statementsExecuted?: number;
}

async function executeSqlFile(filePath: string): Promise<ImportStats> {
  const startTime = Date.now();
  const fileName = filePath.split('/').pop() || filePath;
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📄 Executing: ${fileName}`);
  console.log('='.repeat(80));
  
  try {
    const sql = readFileSync(filePath, 'utf8');
    
    // The SQL files already contain BEGIN; and COMMIT; statements
    // Execute the file as-is (it's already wrapped in a transaction)
    const sqlToExecute = sql.trim();
    
    // Count statements (rough estimate)
    const statementCount = sqlToExecute.split(';').filter(s => {
      const trimmed = s.trim();
      return trimmed.length > 0 && !trimmed.startsWith('--');
    }).length;
    
    console.log(`   Executing ${statementCount} SQL statements...`);
    
    await client.query(sqlToExecute);
    
    const duration = Date.now() - startTime;
    console.log(`✅ Successfully executed ${fileName} (${duration}ms)`);
    
    return {
      file: fileName,
      success: true,
      duration,
      statementsExecuted: statementCount
    };
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error executing ${fileName}:`, error.message);
    
    // Try to rollback if we're in a transaction
    try {
      await client.query('ROLLBACK;');
    } catch (rollbackError) {
      // Ignore rollback errors
    }
    
    return {
      file: fileName,
      success: false,
      error: error.message,
      duration
    };
  }
}

async function main() {
  const importFiles = [
    'contextsql/Final Import/import_part1.sql',
    'contextsql/Final Import/import_part2.sql',
    'contextsql/Final Import/import_part3.sql',
    'contextsql/Final Import/import_part4.sql',
  ];
  
  const stats: ImportStats[] = [];
  
  try {
    console.log('\n🚀 Starting Final Import Process');
    console.log('='.repeat(80));
    console.log(`📦 Files to import: ${importFiles.length}`);
    console.log(`🔗 Database: ${connectionString.split('@')[1] || 'connected'}`);
    
    await client.connect();
    console.log('✅ Connected to database');
    
    // Execute each file sequentially
    for (const file of importFiles) {
      const filePath = join(__dirname, '..', file);
      const result = await executeSqlFile(filePath);
      stats.push(result);
      
      // If a file fails, stop the import process
      if (!result.success) {
        console.error(`\n❌ Import stopped due to error in ${result.file}`);
        break;
      }
    }
    
    // Print summary
    console.log('\n' + '='.repeat(80));
    console.log('📊 IMPORT SUMMARY');
    console.log('='.repeat(80));
    
    const successful = stats.filter(s => s.success).length;
    const failed = stats.filter(s => !s.success).length;
    const totalDuration = stats.reduce((sum, s) => sum + s.duration, 0);
    const totalStatements = stats.reduce((sum, s) => sum + (s.statementsExecuted || 0), 0);
    
    console.log(`✅ Successful: ${successful}/${stats.length}`);
    console.log(`❌ Failed: ${failed}/${stats.length}`);
    console.log(`⏱️  Total duration: ${totalDuration}ms (${(totalDuration / 1000).toFixed(2)}s)`);
    console.log(`📝 Total statements: ${totalStatements}`);
    
    if (failed > 0) {
      console.log('\n❌ Failed files:');
      stats.filter(s => !s.success).forEach(s => {
        console.log(`   - ${s.file}: ${s.error}`);
      });
    }
    
    if (successful === stats.length) {
      console.log('\n🎉 All imports completed successfully!');
    }
    
  } catch (error: any) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔌 Disconnected from database');
  }
}

// Run the script
main().catch(console.error);

