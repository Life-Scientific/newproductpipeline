#!/usr/bin/env node
/**
 * Bulk replace console.* calls with logger
 * Run: node scripts/bulk-replace-console.js
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

const loggerImport = 'import { log, warn, error, table } from "@/lib/logger";';

const srcDir = join(process.cwd(), "src");
const excludedDirs = ["node_modules", ".git", ".next"];
const excludedFiles = ["logger.ts", "KonamiCode.tsx"];

function getAllFiles(dir, files = []) {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (!excludedDirs.includes(item)) {
        getAllFiles(fullPath, files);
      }
    } else if (
      (item.endsWith(".ts") || item.endsWith(".tsx")) &&
      !excludedFiles.includes(item)
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

function replaceConsoleCalls(content) {
  let result = content;

  // Check if file already has logger import
  const hasLoggerImport = result.includes('from "@/lib/logger"');

  // Add import if missing
  if (!hasLoggerImport) {
    // Find the last import and add after it
    const lastImportMatch = result.match(/^import.*from\s+["'][^"']+["'];$/m);
    if (lastImportMatch) {
      const lastImportIndex = result.lastIndexOf(lastImportMatch[0]);
      const afterLastImport = result.indexOf(lastImportMatch[0], lastImportIndex) + lastImportMatch[0].length;
      const before = result.slice(0, afterLastImport);
      const after = result.slice(afterLastImport);
      result = `${before}\n${loggerImport}${after}`;
    }
  }

  // Replace console.log( → log(
  result = result.replace(/console\.log\s*\(/g, "log(");

  // Replace console.warn( → warn(
  result = result.replace(/console\.warn\s*\(/g, "warn(");

  // Replace console.error( → error(
  result = result.replace(/console\.error\s*\(/g, "error(");

  // Replace console.table( → table(
  result = result.replace(/console\.table\s*\(/g, "table(");

  return result;
}

async function main() {
  console.log("🔍 Scanning for TypeScript files...\n");
  const files = getAllFiles(srcDir);
  console.log(`Found ${files.length} files to check\n`);

  let replaced = 0;
  let skipped = 0;

  for (const file of files) {
    try {
      const content = readFileSync(file, "utf-8");
      const hasConsole = content.includes("console.log") ||
                         content.includes("console.warn") ||
                         content.includes("console.error") ||
                         content.includes("console.table");

      if (hasConsole) {
        const newContent = replaceConsoleCalls(content);
        if (newContent !== content) {
          writeFileSync(file, newContent);
          replaced++;
          console.log(`✅ Updated: ${file.replace(process.cwd(), "")}`);
        } else {
          skipped++;
        }
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Files updated: ${replaced}`);
  console.log(`   Files skipped (no changes): ${skipped}`);
  console.log(`   Total files scanned: ${files.length}`);
}

main();
