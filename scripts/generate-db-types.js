#!/usr/bin/env node

/**
 * Generate Supabase database types from REMOTE database
 *
 * This script generates TypeScript types from your hosted Supabase database schema.
 * It ALWAYS uses the remote database (not local) via the Supabase Management API.
 *
 * Usage:
 *   pnpm db:types        # Uses SUPABASE_PROJECT_ID from env
 *   pnpm db:types -- --project-id=your-project-id
 *
 * Requirements:
 *   - Supabase CLI installed: npx supabase --version
 *   - Either SUPABASE_PROJECT_ID env var or --project-id flag
 *   - Either logged in via `npx supabase login` OR SUPABASE_ACCESS_TOKEN env var
 *
 * Note: This uses --project-id which connects to the REMOTE hosted database,
 * NOT any local Supabase instance you might have running.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const OUTPUT_PATH = path.join(
  __dirname,
  "../src/lib/supabase/database.types.ts",
);

// Default to Life Scientific Main project
const DEFAULT_PROJECT_ID = "phizaaaxgbvgcaojiyow";

// Parse command line args
const args = process.argv.slice(2);
const projectIdArg = args.find((arg) => arg.startsWith("--project-id="));
const projectId = projectIdArg
  ? projectIdArg.split("=")[1]
  : process.env.SUPABASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID ||
    DEFAULT_PROJECT_ID;

console.log(`🔄 Generating types from REMOTE database`);
console.log(`   Project ID: ${projectId}`);

try {
  // Generate types using Supabase CLI with --project-id flag
  // This ALWAYS connects to the REMOTE hosted database via the Management API
  // (NOT local - would require --local flag which we explicitly don't use)
  const command = `npx supabase gen types typescript --project-id ${projectId}`;

  console.log(`📡 Fetching schema from remote Supabase...`);

  const types = execSync(command, {
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
    env: {
      ...process.env,
      // Pass through access token if set
      SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN,
    },
  });

  // Write to file
  fs.writeFileSync(OUTPUT_PATH, types, "utf-8");

  console.log(`✅ Types written to: ${OUTPUT_PATH}`);

  // Quick validation - check the file isn't empty and has the Database export
  const content = fs.readFileSync(OUTPUT_PATH, "utf-8");
  if (content.length < 1000 || !content.includes("export type Database")) {
    console.error("⚠️  Warning: Generated types file seems invalid or empty.");
    console.error("   Please check the output and try again.");
    process.exit(1);
  }

  console.log(`📊 Generated ${(content.length / 1024).toFixed(1)} KB of types`);
} catch (error) {
  console.error("❌ Failed to generate types:", error.message);

  if (
    error.message.includes("supabase: command not found") ||
    error.message.includes("not found")
  ) {
    console.error("");
    console.error(
      "The Supabase CLI is required. It should work via npx, but you can also install it:",
    );
    console.error("  npm install -g supabase");
    console.error("");
    console.error("Or run directly:");
    console.error(
      "  npx supabase gen types typescript --project-id " + projectId,
    );
  }

  if (
    error.message.includes("not logged in") ||
    error.message.includes("access token")
  ) {
    console.error("");
    console.error("You need to authenticate with Supabase:");
    console.error("  npx supabase login");
    console.error("");
    console.error("Or set SUPABASE_ACCESS_TOKEN environment variable.");
  }

  process.exit(1);
}
