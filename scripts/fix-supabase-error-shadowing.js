#!/usr/bin/env node
/**
 * Fixes Supabase error variable shadowing by renaming `const { error }` to `const { error: supabaseError }`
 * and updating all subsequent references to use `supabaseError` instead of `error`.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = resolve(__dirname, '../src');

const loggerImportRegex = /import.*from "@\/lib\/logger"/;

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

  // Check if the file imports from logger
  if (!loggerImportRegex.test(content)) {
    return false;
  }

  // Pattern 1: const { error } = await supabase... or const { data, error } = await supabase...
  const supabaseErrorRegex = /const\s*\{\s*([^}]*?\berror\b[^}]*?)\s*\}\s*=\s*await\s+supabase\.from\(/g;
  
  content = content.replace(supabaseErrorRegex, (match, destructuredVars) => {
    // Check if error is already renamed (has a different name after :)
    if (destructuredVars.includes('error:')) {
      // Already renamed, skip
      return match;
    }
    
    // Rename error to supabaseError
    const newVars = destructuredVars.replace(/\berror\b/g, 'error: supabaseError');
    return match.replace(destructuredVars, newVars);
  });

  // Pattern 2: Also handle supabase.rpc calls
  const rpcErrorRegex = /const\s*\{\s*([^}]*?\berror\b[^}]*?)\s*\}\s*=\s*await\s+supabase\.rpc\(/g;
  
  content = content.replace(rpcErrorRegex, (match, destructuredVars) => {
    if (destructuredVars.includes('error:')) {
      return match;
    }
    const newVars = destructuredVars.replace(/\berror\b/g, 'error: supabaseError');
    return match.replace(destructuredVars, newVars);
  });

  // Pattern 3: Update if (error) references that check for supabase errors
  // This is tricky - we need to find if statements that follow the Supabase query patterns
  // For simplicity, let's replace: if (error) { error(...) } with if (supabaseError) { error(...) }
  // Only where error is being used as a condition and then passed to the logger's error function
  
  // Replace isolated `if (error)` followed by lines that use `error.message` or `error.code`
  // This is a conservative approach - we only fix common patterns
  
  if (content !== originalContent) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed destructuring: ${filePath.replace(rootDir, '')}`);
    return true;
  }
  
  return false;
}

function fixReferences(filePath) {
  let content = readFileSync(filePath, 'utf8');
  let originalContent = content;
  let changes = 0;

  // Replace: if (error) { ... error.message ... } 
  // with: if (supabaseError) { ... supabaseError.message ... }
  // Only when error is used with .message or .code (indicating it's the Supabase error)
  
  const patterns = [
    /if\s*\(\s*error\s*\)\s*\{\s*return\s*\{\s*error:\s*error\.message\s*\}\s*;\s*\}/g,
    /if\s*\(\s*error\s*\)\s*\{\s*return\s*\{\s*error:\s*error\s*\}\s*;\s*\}/g,
    /if\s*\(\s*error\s*\)\s*\{\s*throw\s+error\s*;\s*\}/g,
    /if\s*\(\s*error\s*\)\s*\{\s*error\([^)]*\)\s*;\s*(?:\s*throw\s+error\s*;)?\s*\}/g,
  ];

  for (const pattern of patterns) {
    const matches = content.match(pattern);
    if (matches) {
      for (const match of matches) {
        // Replace `error` with `supabaseError` in these contexts
        const newMatch = match
          .replace(/\berror\.message\b/g, 'supabaseError.message')
          .replace(/\berror\.code\b/g, 'supabaseError.code')
          .replace(/\berror\b(?!\.)/g, 'supabaseError')
          .replace(/if\s*\(\s*error\s*\)/g, 'if (supabaseError)');
        
        if (newMatch !== match) {
          content = content.replace(match, newMatch);
          changes++;
        }
      }
    }
  }

  if (changes > 0) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${changes} reference(s): ${filePath.replace(rootDir, '')}`);
    return true;
  }
  
  return false;
}

function main() {
  console.log('🔍 Scanning for Supabase error shadowing...\n');
  
  const allTsFiles = getAllFiles(rootDir).filter(file =>
    (file.endsWith('.ts') || file.endsWith('.tsx')) &&
    !file.includes('node_modules') &&
    !file.includes('.next')
  );

  let filesFixed = 0;
  let refFilesFixed = 0;

  // First pass: fix destructuring
  for (const filePath of allTsFiles) {
    if (fixFile(filePath)) {
      filesFixed++;
    }
  }

  // Second pass: fix references
  for (const filePath of allTsFiles) {
    if (fixReferences(filePath)) {
      refFilesFixed++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Files fixed (destructuring): ${filesFixed}`);
  console.log(`   Files fixed (references): ${refFilesFixed}`);
  console.log(`   Total files scanned: ${allTsFiles.length}`);
}

main();
