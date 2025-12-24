#!/usr/bin/env node
/**
 * Aggressive fix - replace all `const { data, error }` with `const { data, error: supabaseError }`
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = resolve(__dirname, '../src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (statSync(join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(join(dirPath, file));
    }
  });
  return arrayOfFiles;
}

function fixFile(filePath) {
  let content = readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Pattern 1: Replace `const { data, error } = await supabase` with `const { data, error: supabaseError } = await supabase`
  const count1 = (content.match(/const\s*\{\s*data\s*,\s*error\s*\}\s*=\s*await\s+supabase/g) || []).length;
  content = content.replace(
    /const\s*\{\s*data\s*,\s*error\s*\}\s*=\s*await\s+supabase/g,
    'const { data, error: supabaseError } = await supabase'
  );

  // Pattern 2: Replace `const { error } = await supabase` with `const { error: supabaseError } = await supabase`
  const count2 = (content.match(/const\s*\{\s*error\s*\}\s*=\s*await\s+supabase\.(from|rpc)/g) || []).length;
  content = content.replace(
    /const\s*\{\s*error\s*\}\s*=\s*await\s+supabase\.(from|rpc)/g,
    'const { error: supabaseError } = await supabase.$1'
  );

  // Pattern 3: Replace `return { supabaseError: supabaseError.message }` with `return { error: supabaseError.message }`
  content = content.replace(
    /return\s*\{\s*supabaseError:\s*supabaseError\.message\s*\};/g,
    'return { error: supabaseError.message };'
  );

  const changes = count1 + count2;

  if (changes > 0) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${changes} instance(s): ${filePath.replace(rootDir, '')}`);
    return true;
  }
  
  return false;
}

function main() {
  console.log('🔍 Running aggressive Supabase error shadowing fix...\n');
  
  const allTsFiles = getAllFiles(rootDir).filter(file =>
    (file.endsWith('.ts') || file.endsWith('.tsx')) &&
    !file.includes('node_modules') &&
    !file.includes('.next')
  );

  let filesFixed = 0;

  for (const filePath of allTsFiles) {
    if (fixFile(filePath)) {
      filesFixed++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Files fixed: ${filesFixed}`);
  console.log(`   Total files scanned: ${allTsFiles.length}`);
}

main();
