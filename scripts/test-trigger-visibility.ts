/**
 * Test script to verify triggers are visible and working
 * This helps ensure we can see what triggers exist and verify they're functioning
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, "..", ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectTriggers() {
  console.log("\n" + "=".repeat(80));
  console.log("INSPECTING TRIGGERS");
  console.log("=".repeat(80));

  // Read the SQL file
  const sql = readFileSync(join(__dirname, "inspect-triggers.sql"), "utf-8");
  
  // Split by semicolons and execute each statement
  const statements = sql
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith("--"));

  for (const statement of statements) {
    if (statement.includes("SELECT")) {
      try {
        const { data, error } = await supabase.rpc("exec_sql", { 
          sql_query: statement 
        });

        if (error) {
          console.log("\n⚠️  Could not execute via RPC, need direct SQL connection");
          console.log("   Query:", statement.substring(0, 100) + "...");
          continue;
        }

        if (data) {
          console.log("\n", data);
        }
      } catch (e) {
        console.log("\n⚠️  Error executing query:", e);
      }
    }
  }
}

async function checkBusinessCaseTrigger() {
  console.log("\n" + "=".repeat(80));
  console.log("CHECKING BUSINESS CASE TRIGGER");
  console.log("=".repeat(80));

  // Get a sample business case
  const { data: businessCases, error } = await supabase
    .from("business_case")
    .select("*")
    .eq("status", "active")
    .limit(1);

  if (error) {
    console.error("❌ Error:", error.message);
    return;
  }

  if (!businessCases || businessCases.length === 0) {
    console.log("⚠️  No business cases found");
    return;
  }

  const bc = businessCases[0];
  console.log("\n📊 Sample Business Case:");
  console.log(`  ID: ${bc.business_case_id}`);
  console.log(`  Created by: ${bc.created_by || "null"}`);
  console.log(`  Volume: ${bc.volume || "null"}`);
  console.log(`  Volume last updated by: ${bc.volume_last_updated_by || "null"}`);
  console.log(`  Volume last updated at: ${bc.volume_last_updated_at || "null"}`);
  console.log(`  NSP: ${bc.nsp || "null"}`);
  console.log(`  NSP last updated by: ${bc.nsp_last_updated_by || "null"}`);
  console.log(`  NSP last updated at: ${bc.nsp_last_updated_at || "null"}`);
  console.log(`  COGS: ${bc.cogs_per_unit || "null"}`);
  console.log(`  COGS last updated by: ${bc.cogs_last_updated_by || "null"}`);
  console.log(`  COGS last updated at: ${bc.cogs_last_updated_at || "null"}`);

  // Check if trigger fields are populated
  const hasTracking = 
    bc.volume_last_updated_at || 
    bc.nsp_last_updated_at || 
    bc.cogs_last_updated_at;

  if (hasTracking) {
    console.log("\n✅ Trigger tracking fields are populated");
  } else {
    console.log("\n⚠️  No trigger tracking data found (may be new record)");
  }

  // Check if updated_by matches created_by (potential issue)
  if (bc.volume_last_updated_by === bc.created_by && bc.volume_last_updated_at) {
    console.log("\n⚠️  WARNING: volume_last_updated_by matches created_by");
    console.log("   This suggests the trigger may be using NEW.created_by");
  }
}

async function testUserContextSetting() {
  console.log("\n" + "=".repeat(80));
  console.log("TESTING USER CONTEXT SETTING");
  console.log("=".repeat(80));

  // Try to set user context
  const testUser = "test-user@example.com";
  
  try {
    const { data, error } = await supabase.rpc("set_current_user", {
      user_name: testUser
    });

    if (error) {
      console.log(`\n❌ Error setting user context: ${error.message}`);
      console.log("   The set_current_user function may not exist yet");
      console.log("   This is expected if the migration hasn't been applied");
      return;
    }

    console.log("\n✅ Successfully set user context");
    console.log(`   Set to: ${testUser}`);
  } catch (e) {
    console.log("\n❌ Exception:", e);
  }
}

async function checkFormulationHistory() {
  console.log("\n" + "=".repeat(80));
  console.log("CHECKING FORMULATION STATUS HISTORY");
  console.log("=".repeat(80));

  const { data: history, error } = await supabase
    .from("formulation_status_history")
    .select("*")
    .order("changed_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("❌ Error:", error.message);
    return;
  }

  if (!history || history.length === 0) {
    console.log("⚠️  No status history found");
    return;
  }

  console.log(`\n📊 Found ${history.length} recent status changes:\n`);

  for (const record of history) {
    console.log(`  Formulation: ${record.formulation_id}`);
    console.log(`  Status: ${record.old_status || "null"} → ${record.new_status}`);
    console.log(`  Changed by: ${record.changed_by || "null"}`);
    console.log(`  Changed at: ${record.changed_at}`);
    console.log("");
  }
}

async function main() {
  console.log("🔍 Trigger Visibility and Verification");
  console.log("=".repeat(80));

  await checkBusinessCaseTrigger();
  await checkFormulationHistory();
  await testUserContextSetting();
  
  console.log("\n" + "=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));
  console.log("\nTo see all triggers in detail, run the SQL script:");
  console.log("  psql <your-connection-string> -f scripts/inspect-triggers.sql");
  console.log("\nOr use Supabase SQL Editor to run inspect-triggers.sql");
}

main().catch(console.error);

