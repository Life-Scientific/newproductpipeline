#!/usr/bin/env node
/**
 * Fix all remaining patterns where catch uses supabaseError but body has error
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

  // Replace `error instanceof Error` with `supabaseError instanceof Error`
  // but only when `supabaseError` is defined in the catch block
  if (content.includes('catch (supabaseError)')) {
    content = content.replace(/error instanceof Error/g, 'supabaseError instanceof Error');
    content = content.replace(/catch\s*\(\s*error\s*\)\s*\{[^}]*catch\s*\(supabaseError\)/g, (match) => {
      // Already handled
      return match;
    });
  }

  if (content !== originalContent) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath.replace(rootDir, '')}`);
    return true;
  }
  
  return false;
}

function main() {
  console.log('🔍 Scanning for remaining error/supabaseError mismatches...\n');
  
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
