#!/usr/bin/env tsx
/**
 * Execute Full Import of All 329 Formulations
 * 
 * Imports all formulations with:
 * - Base code registry
 * - Formulations
 * - Formulation ingredients
 * - Formulation-country links
 * - Use groups
 * - Business cases (10-year projections)
 * - Business case-use group junctions
 * 
 * Note: COGS is intentionally skipped and will be handled separately
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database connection
const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({ connectionString });

async function executeSqlFile(filePath: string, description: string): Promise<boolean> {
  let sql = '';
  try {
    console.log(`\n📄 Executing: ${description}`);
    sql = readFileSync(filePath, 'utf8');
    await client.query(sql);
    console.log(`✅ Successfully executed ${description}`);
    return true;
  } catch (error: any) {
    console.error(`❌ Error executing ${description}:`, error.message);
    if (error.position) {
      const position = parseInt(error.position);
      const sqlLines = sql.split('\n');
      let charCount = 0;
      let errorLine = 0;
      
      for (let i = 0; i < sqlLines.length; i++) {
        charCount += sqlLines[i].length + 1; // +1 for newline
        if (charCount >= position) {
          errorLine = i + 1;
          break;
        }
      }
      
      console.error(`   Error at position: ${position}, approximately line: ${errorLine}`);
      if (errorLine > 0) {
        const start = Math.max(0, errorLine - 5);
        const end = Math.min(sqlLines.length, errorLine + 2);
        console.error('\n   Context:');
        for (let i = start; i < end; i++) {
          const marker = i === errorLine - 1 ? ' ➜ ' : '   ';
          console.error(`${marker}${i + 1}: ${sqlLines[i]}`);
        }
      }
    }
    return false;
  }
}

async function main() {
  console.log('🚀 Starting FULL Import - All 329 Formulations');
  console.log('==================================================');
  console.log('⚠️  Note: COGS import is intentionally skipped');
  console.log('   COGS will be handled separately later\n');
  
  try {
    await client.connect();
    console.log('✅ Connected to database\n');
    
    const baseDir = join(__dirname, '..', 'contextsql', 'Final Import');
    
    // Execute the three main import files in order
    const files = [
      {
        path: join(baseDir, 'import_part1.sql'),
        description: 'import_part1.sql (Base codes, Formulations, Ingredients, Countries, Use Groups)'
      },
      {
        path: join(baseDir, 'import_part2.sql'),
        description: 'import_part2.sql (Business Cases - 10-year projections)'
      },
      {
        path: join(baseDir, 'import_part3.sql'),
        description: 'import_part3.sql (Business Case-Use Group Junctions)'
      }
    ];
    
    for (const file of files) {
      const success = await executeSqlFile(file.path, file.description);
      if (!success) {
        console.error('\n❌ Import process failed. Please fix the error and try again.');
        process.exit(1);
      }
    }
    
    console.log('\n✨ Full import process completed successfully!');
    console.log('\n📊 Next Steps:');
    console.log('   1. Run: npx tsx scripts/verify-full-import.ts');
    console.log('   2. Review the data in your Supabase dashboard');
    console.log('   3. COGS can be imported later using a separate process');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main().catch(console.error);

