#!/usr/bin/env node

/**
 * Generate Supabase database types
 * 
 * This script generates TypeScript types from your Supabase database schema.
 * 
 * Usage:
 *   pnpm db:types        # Uses SUPABASE_PROJECT_ID from env
 *   pnpm db:types -- --project-id=your-project-id
 * 
 * Requirements:
 *   - Supabase CLI installed: npx supabase --version
 *   - Either SUPABASE_PROJECT_ID env var or --project-id flag
 *   - Either logged in via `npx supabase login` OR SUPABASE_ACCESS_TOKEN env var
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, '../src/lib/supabase/database.types.ts');

// Parse command line args
const args = process.argv.slice(2);
const projectIdArg = args.find(arg => arg.startsWith('--project-id='));
const projectId = projectIdArg 
  ? projectIdArg.split('=')[1] 
  : process.env.SUPABASE_PROJECT_ID || process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;

if (!projectId) {
  console.error('❌ Error: No project ID provided.');
  console.error('');
  console.error('Set SUPABASE_PROJECT_ID environment variable or pass --project-id=xxx');
  console.error('');
  console.error('Your project ID can be found in your Supabase dashboard URL:');
  console.error('  https://supabase.com/dashboard/project/[PROJECT_ID]');
  process.exit(1);
}

console.log(`🔄 Generating types for project: ${projectId}`);

try {
  // Generate types using Supabase CLI
  const command = `npx supabase gen types typescript --project-id ${projectId}`;
  
  console.log(`📡 Running: ${command}`);
  
  const types = execSync(command, {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
    env: {
      ...process.env,
      // Pass through access token if set
      SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN,
    }
  });

  // Write to file
  fs.writeFileSync(OUTPUT_PATH, types, 'utf-8');
  
  console.log(`✅ Types written to: ${OUTPUT_PATH}`);
  
  // Quick validation - check the file isn't empty and has the Database export
  const content = fs.readFileSync(OUTPUT_PATH, 'utf-8');
  if (content.length < 1000 || !content.includes('export type Database')) {
    console.error('⚠️  Warning: Generated types file seems invalid or empty.');
    console.error('   Please check the output and try again.');
    process.exit(1);
  }
  
  console.log(`📊 Generated ${(content.length / 1024).toFixed(1)} KB of types`);
  
} catch (error) {
  console.error('❌ Failed to generate types:', error.message);
  
  if (error.message.includes('supabase: command not found') || error.message.includes('not found')) {
    console.error('');
    console.error('The Supabase CLI is required. It should work via npx, but you can also install it:');
    console.error('  npm install -g supabase');
    console.error('');
    console.error('Or run directly:');
    console.error('  npx supabase gen types typescript --project-id ' + projectId);
  }
  
  if (error.message.includes('not logged in') || error.message.includes('access token')) {
    console.error('');
    console.error('You need to authenticate with Supabase:');
    console.error('  npx supabase login');
    console.error('');
    console.error('Or set SUPABASE_ACCESS_TOKEN environment variable.');
  }
  
  process.exit(1);
}


