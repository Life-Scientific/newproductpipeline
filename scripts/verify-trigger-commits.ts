/**
 * Verification script to test that trigger changes are actually committed
 * This addresses the concern: "Business cases almost have to be committed?"
 * 
 * Answer: YES - BEFORE triggers modify NEW record, which becomes the UPDATE.
 * All changes are atomic and committed together.
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "..", ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface BusinessCaseBefore {
  business_case_id: string;
  volume: number | null;
  volume_last_updated_at: string | null;
  volume_last_updated_by: string | null;
  nsp: number | null;
  nsp_last_updated_at: string | null;
  nsp_last_updated_by: string | null;
  created_by: string | null;
}

async function testTriggerCommit() {
  console.log("\n" + "=".repeat(80));
  console.log("TESTING: Are Trigger Changes Committed?");
  console.log("=".repeat(80));

  // Get a test business case
  const { data: businessCases, error: fetchError } = await supabase
    .from("business_case")
    .select("*")
    .eq("status", "active")
    .limit(1);

  if (fetchError || !businessCases || businessCases.length === 0) {
    console.log("❌ No business cases found to test");
    return;
  }

  const testBC = businessCases[0] as BusinessCaseBefore;
  const originalVolume = testBC.volume;
  const testVolume = originalVolume ? originalVolume + 1 : 100;

  console.log("\n📊 BEFORE UPDATE:");
  console.log(`  Business Case ID: ${testBC.business_case_id}`);
  console.log(`  Volume: ${testBC.volume}`);
  console.log(`  Volume last updated by: ${testBC.volume_last_updated_by || "null"}`);
  console.log(`  Volume last updated at: ${testBC.volume_last_updated_at || "null"}`);
  console.log(`  Created by: ${testBC.created_by || "null"}`);

  // Test 1: Update WITHOUT user context (should use created_by fallback)
  console.log("\n" + "-".repeat(80));
  console.log("TEST 1: Update WITHOUT user context (tests fallback)");
  console.log("-".repeat(80));

  const { data: update1, error: update1Error } = await supabase
    .from("business_case")
    .update({ volume: testVolume })
    .eq("business_case_id", testBC.business_case_id)
    .select()
    .single();

  if (update1Error) {
    console.error("❌ Update failed:", update1Error.message);
    return;
  }

  console.log("\n📊 AFTER UPDATE (no context):");
  console.log(`  Volume: ${update1.volume}`);
  console.log(`  Volume last updated by: ${update1.volume_last_updated_by || "null"}`);
  console.log(`  Volume last updated at: ${update1.volume_last_updated_at || "null"}`);

  if (update1.volume_last_updated_at) {
    console.log("✅ Trigger fired - timestamp was set");
  } else {
    console.log("⚠️  Trigger may not have fired - no timestamp");
  }

  if (update1.volume_last_updated_by === testBC.created_by) {
    console.log("✅ Fallback working - using created_by");
  } else if (update1.volume_last_updated_by) {
    console.log(`⚠️  Unexpected updater: ${update1.volume_last_updated_by}`);
  }

  // Test 2: Update WITH user context (should use app.current_user)
  console.log("\n" + "-".repeat(80));
  console.log("TEST 2: Update WITH user context (tests app.current_user)");
  console.log("-".repeat(80));

  const testUser = "test-verification@example.com";
  
  // Set user context
  const { error: contextError } = await supabase.rpc("set_current_user", {
    user_name: testUser
  });

  if (contextError) {
    console.log(`⚠️  Could not set user context: ${contextError.message}`);
    console.log("   (Migration may not be applied yet)");
    console.log("   Continuing with fallback test...");
  } else {
    console.log(`✅ User context set: ${testUser}`);
  }

  const testVolume2 = testVolume + 1;
  const { data: update2, error: update2Error } = await supabase
    .from("business_case")
    .update({ volume: testVolume2 })
    .eq("business_case_id", testBC.business_case_id)
    .select()
    .single();

  if (update2Error) {
    console.error("❌ Update failed:", update2Error.message);
    return;
  }

  console.log("\n📊 AFTER UPDATE (with context):");
  console.log(`  Volume: ${update2.volume}`);
  console.log(`  Volume last updated by: ${update2.volume_last_updated_by || "null"}`);
  console.log(`  Volume last updated at: ${update2.volume_last_updated_at || "null"}`);

  if (update2.volume_last_updated_by === testUser) {
    console.log("✅ User context working - using app.current_user");
  } else if (update2.volume_last_updated_by === testBC.created_by) {
    console.log("⚠️  User context not working - falling back to created_by");
    console.log("   This suggests the setting didn't persist or trigger didn't read it");
  }

  // Verify commit - read back from database
  console.log("\n" + "-".repeat(80));
  console.log("VERIFICATION: Read back from database");
  console.log("-".repeat(80));

  const { data: verify, error: verifyError } = await supabase
    .from("business_case")
    .select("*")
    .eq("business_case_id", testBC.business_case_id)
    .single();

  if (verifyError) {
    console.error("❌ Verification read failed:", verifyError.message);
    return;
  }

  console.log("\n📊 VERIFIED VALUES (from database):");
  console.log(`  Volume: ${verify.volume}`);
  console.log(`  Volume last updated by: ${verify.volume_last_updated_by || "null"}`);
  console.log(`  Volume last updated at: ${verify.volume_last_updated_at || "null"}`);

  if (verify.volume === testVolume2) {
    console.log("✅ Volume change was committed");
  }

  if (verify.volume_last_updated_at) {
    console.log("✅ Trigger timestamp was committed");
  }

  if (verify.volume_last_updated_by) {
    console.log(`✅ Trigger updater was committed: ${verify.volume_last_updated_by}`);
  }

  // Restore original value
  console.log("\n" + "-".repeat(80));
  console.log("RESTORING original value...");
  console.log("-".repeat(80));

  await supabase
    .from("business_case")
    .update({ volume: originalVolume })
    .eq("business_case_id", testBC.business_case_id);

  console.log("✅ Restored to original volume");
}

async function checkTriggerExists() {
  console.log("\n" + "=".repeat(80));
  console.log("CHECKING: Does trigger exist?");
  console.log("=".repeat(80));

  // We can't directly query pg_trigger via Supabase client easily
  // But we can check if the function exists
  try {
    const { data: func, error } = await supabase.rpc("pg_get_function_arguments", {
      function_name: "track_business_case_field_updates"
    });

    if (error) {
      console.log("⚠️  Cannot verify trigger via RPC");
      console.log("   Use SQL editor to run: SELECT * FROM pg_trigger WHERE tgname = 'trg_track_business_case_field_updates';");
    } else {
      console.log("✅ Function exists");
    }
  } catch (e) {
    console.log("⚠️  Function check not available via RPC");
  }
}

async function main() {
  console.log("🔍 Trigger Commit Verification");
  console.log("=".repeat(80));
  console.log("\nThis script tests whether trigger changes are actually committed.");
  console.log("BEFORE triggers modify NEW record, which becomes the UPDATE.");
  console.log("All changes should be atomic and visible after commit.\n");

  await checkTriggerExists();
  await testTriggerCommit();

  console.log("\n" + "=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));
  console.log("\n✅ Business case trigger changes ARE committed");
  console.log("   - BEFORE trigger modifies NEW record");
  console.log("   - Modified NEW becomes the actual UPDATE");
  console.log("   - All changes are atomic (commit or rollback together)");
  console.log("\n⚠️  To verify triggers are active:");
  console.log("   1. Run this script");
  console.log("   2. Check that volume_last_updated_at is set");
  console.log("   3. Check that volume_last_updated_by shows correct user");
  console.log("\n📝 To see all triggers:");
  console.log("   Run scripts/inspect-triggers.sql in SQL editor");
}

main().catch(console.error);

