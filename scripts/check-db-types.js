#!/usr/bin/env node

/**
 * Pre-build check for database types file
 *
 * This script validates that the Supabase database types file exists and is valid.
 * It runs automatically before `pnpm build`.
 *
 * If the types file is missing or invalid, it provides instructions to fix it.
 */

const fs = require("fs");
const path = require("path");

const TYPES_PATH = path.join(
  __dirname,
  "../src/lib/supabase/database.types.ts",
);
const MIN_FILE_SIZE = 1000; // bytes - a valid types file should be at least this size

function checkTypesFile() {
  console.log("🔍 Checking database types file...");

  // Check if file exists
  if (!fs.existsSync(TYPES_PATH)) {
    console.error("");
    console.error("❌ Database types file is missing!");
    console.error(`   Expected at: ${TYPES_PATH}`);
    console.error("");
    printFixInstructions();
    process.exit(1);
  }

  // Check if file has content
  const content = fs.readFileSync(TYPES_PATH, "utf-8");

  if (content.trim().length === 0) {
    console.error("");
    console.error("❌ Database types file is empty!");
    console.error("");
    printFixInstructions();
    process.exit(1);
  }

  if (content.length < MIN_FILE_SIZE) {
    console.error("");
    console.error("❌ Database types file seems too small to be valid.");
    console.error(
      `   Size: ${content.length} bytes (expected at least ${MIN_FILE_SIZE})`,
    );
    console.error("");
    printFixInstructions();
    process.exit(1);
  }

  // Check for required exports
  if (!content.includes("export type Database")) {
    console.error("");
    console.error('❌ Database types file is missing "export type Database"');
    console.error("   The file may be corrupted or incomplete.");
    console.error("");
    printFixInstructions();
    process.exit(1);
  }

  // Check for basic structure
  if (!content.includes("public:") || !content.includes("Tables:")) {
    console.error("");
    console.error("❌ Database types file structure appears invalid.");
    console.error('   Missing expected "public:" or "Tables:" definitions.');
    console.error("");
    printFixInstructions();
    process.exit(1);
  }

  console.log("✅ Database types file is valid");
  console.log(`   Size: ${(content.length / 1024).toFixed(1)} KB`);
}

function printFixInstructions() {
  console.error("📋 To fix this, regenerate types from the REMOTE database:");
  console.error("");
  console.error("   Step 1: Login to Supabase CLI (one-time)");
  console.error("   ─────────────────────────────────────────");
  console.error("      npx supabase login");
  console.error("");
  console.error("   Step 2: Generate types from remote");
  console.error("   ───────────────────────────────────");
  console.error("      pnpm db:types");
  console.error("");
  console.error(
    "   This will fetch the schema from the remote Supabase project",
  );
  console.error("   (Life Scientific Main: phizaaaxgbvgcaojiyow)");
  console.error("");
}

checkTypesFile();
