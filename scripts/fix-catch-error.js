#!/usr/bin/env bun
/**
 * Fix catch(error) collisions with logger import
 * Run: bun scripts/fix-catch-error.js
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const srcDir = join(process.cwd(), "src");
const excludedDirs = ["node_modules", ".git", ".next"];

function getAllFiles(dir, files = []) {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (!excludedDirs.includes(item)) {
        getAllFiles(fullPath, files);
      }
    } else if (item.endsWith(".ts") || item.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

function fixCatchError(content) {
  // Only process files that have both catch(error) and error( pattern
  if (!content.includes("catch (error)") || !content.includes("error(")) {
    return content;
  }

  // Replace all instances of catch(error) with catch(err)
  let result = content.replace(/catch\s*\(error\)\s*{/g, "catch (err) {");
  
  // Replace error( inside catch blocks - but we need to be careful
  // Split by catch blocks and fix them individually
  const lines = result.split("\n");
  let inCatch = false;
  let catchBraceCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes("catch (err) {")) {
      inCatch = true;
      catchBraceCount = 1;
    } else if (inCatch) {
      // Count braces
      catchBraceCount += (line.match(/{/g) || []).length;
      catchBraceCount -= (line.match(/}/g) || []).length;
      
      // Replace error( with err( but avoid string literals
      // Only replace if it looks like a function call (not in quotes)
      if (line.includes("error(") && !line.match(/["']/) && !line.includes("status === 'error'")) {
        lines[i] = line.replace(/error\(/g, "err(");
      }
      
      // Check if we're out of the catch block
      if (catchBraceCount <= 0) {
        inCatch = false;
      }
    }
  }
  
  return lines.join("\n");
}

console.log("🔍 Scanning for files with catch(error) collisions...\n");
const files = getAllFiles(srcDir);

let fixed = 0;
for (const file of files) {
  try {
    const content = readFileSync(file, "utf-8");
    if (content.includes("catch (error)") && content.includes("error(") && content.includes('from "@/lib/logger"')) {
      const newContent = fixCatchError(content);
      if (newContent !== content) {
        writeFileSync(file, newContent);
        fixed++;
        console.log(`✅ Fixed: ${file.replace(process.cwd(), "")}`);
      }
    }
  } catch (err) {
    console.error(`❌ Error processing ${file}:`, err.message);
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Files fixed: ${fixed}`);
console.log(`   Total files scanned: ${files.length}`);
