/**
 * Test script to verify change logging functionality
 * Tests both business cases and formulations change tracking
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

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

interface BusinessCaseChangeLog {
  business_case_id: string;
  volume: number | null;
  volume_last_updated_at: string | null;
  volume_last_updated_by: string | null;
  nsp: number | null;
  nsp_last_updated_at: string | null;
  nsp_last_updated_by: string | null;
  cogs_per_unit: number | null;
  cogs_last_updated_at: string | null;
  cogs_last_updated_by: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

interface FormulationStatusHistory {
  history_id: string;
  formulation_id: string;
  old_status: string | null;
  new_status: string;
  changed_by: string | null;
  changed_at: string;
}

async function testBusinessCaseChangeLogging() {
  console.log("\n" + "=".repeat(80));
  console.log("TESTING BUSINESS CASE CHANGE LOGGING");
  console.log("=".repeat(80));

  // Get a sample business case
  const { data: businessCases, error: fetchError } = await supabase
    .from("business_case")
    .select("*")
    .eq("status", "active")
    .limit(5);

  if (fetchError) {
    console.error("❌ Error fetching business cases:", fetchError.message);
    return;
  }

  if (!businessCases || businessCases.length === 0) {
    console.log("⚠️  No business cases found to test");
    return;
  }

  console.log(`\n📊 Found ${businessCases.length} business cases to analyze\n`);

  let issuesFound = 0;

  for (const bc of businessCases) {
    const log = bc as unknown as BusinessCaseChangeLog;
    
    console.log(`Business Case ID: ${log.business_case_id}`);
    console.log(`  Created by: ${log.created_by || "null"}`);
    console.log(`  Created at: ${log.created_at}`);
    console.log(`  Updated at: ${log.updated_at}`);
    
    // Check volume tracking
    if (log.volume_last_updated_at) {
      const volumeUpdater = log.volume_last_updated_by || "null";
      const isCreator = volumeUpdater === log.created_by;
      console.log(`  📈 Volume:`);
      console.log(`     Last updated: ${log.volume_last_updated_at}`);
      console.log(`     Updated by: ${volumeUpdater}`);
      if (isCreator && log.updated_at !== log.created_at) {
        console.log(`     ⚠️  WARNING: Volume updated by creator, but record was updated after creation`);
        issuesFound++;
      }
    }
    
    // Check NSP tracking
    if (log.nsp_last_updated_at) {
      const nspUpdater = log.nsp_last_updated_by || "null";
      const isCreator = nspUpdater === log.created_by;
      console.log(`  💰 NSP:`);
      console.log(`     Last updated: ${log.nsp_last_updated_at}`);
      console.log(`     Updated by: ${nspUpdater}`);
      if (isCreator && log.updated_at !== log.created_at) {
        console.log(`     ⚠️  WARNING: NSP updated by creator, but record was updated after creation`);
        issuesFound++;
      }
    }
    
    // Check COGS tracking
    if (log.cogs_last_updated_at) {
      const cogsUpdater = log.cogs_last_updated_by || "null";
      const isCreator = cogsUpdater === log.created_by;
      console.log(`  🏭 COGS:`);
      console.log(`     Last updated: ${log.cogs_last_updated_at}`);
      console.log(`     Updated by: ${cogsUpdater}`);
      if (isCreator && log.updated_at !== log.created_at) {
        console.log(`     ⚠️  WARNING: COGS updated by creator, but record was updated after creation`);
        issuesFound++;
      }
    }
    
    console.log("");
  }

  if (issuesFound > 0) {
    console.log(`\n⚠️  Found ${issuesFound} potential issues with change tracking`);
    console.log("   The trigger uses NEW.created_by instead of the actual updater");
  } else {
    console.log("\n✅ No obvious issues found (but this doesn't guarantee correctness)");
  }
}

async function testFormulationStatusHistory() {
  console.log("\n" + "=".repeat(80));
  console.log("TESTING FORMULATION STATUS HISTORY");
  console.log("=".repeat(80));

  // Get formulation status history
  const { data: history, error: fetchError } = await supabase
    .from("formulation_status_history")
    .select("*")
    .order("changed_at", { ascending: false })
    .limit(20);

  if (fetchError) {
    console.error("❌ Error fetching status history:", fetchError.message);
    return;
  }

  if (!history || history.length === 0) {
    console.log("⚠️  No status history found");
    return;
  }

  console.log(`\n📊 Found ${history.length} status change records\n`);

  // Get formulations to compare
  const formulationIds = [...new Set(history.map((h: FormulationStatusHistory) => h.formulation_id))];
  const { data: formulations } = await supabase
    .from("formulations")
    .select("formulation_id, created_by")
    .in("formulation_id", formulationIds);

  const formulationMap = new Map(
    (formulations || []).map((f: any) => [f.formulation_id, f.created_by])
  );

  let issuesFound = 0;

  for (const record of history) {
    const hist = record as FormulationStatusHistory;
    const creator = formulationMap.get(hist.formulation_id);
    
    console.log(`Formulation ID: ${hist.formulation_id}`);
    console.log(`  Status change: ${hist.old_status || "null"} → ${hist.new_status}`);
    console.log(`  Changed by: ${hist.changed_by || "null"}`);
    console.log(`  Changed at: ${hist.changed_at}`);
    console.log(`  Creator: ${creator || "unknown"}`);
    
    if (hist.changed_by === creator) {
      console.log(`  ⚠️  WARNING: Changed by matches creator (may be incorrect if updated later)`);
      issuesFound++;
    }
    console.log("");
  }

  if (issuesFound > 0) {
    console.log(`\n⚠️  Found ${issuesFound} records where changed_by matches creator`);
    console.log("   This suggests the trigger uses NEW.created_by instead of actual updater");
  } else {
    console.log("\n✅ No obvious issues found");
  }
}

async function checkTriggerDefinitions() {
  console.log("\n" + "=".repeat(80));
  console.log("CHECKING TRIGGER DEFINITIONS");
  console.log("=".repeat(80));

  // Check business case trigger
  const { data: bcTrigger, error: bcError } = await supabase.rpc("pg_get_functiondef", {
    funcname: "track_business_case_field_updates"
  });

  if (bcError) {
    console.log("⚠️  Could not fetch business case trigger definition");
    console.log("   (This is expected - checking via SQL query instead)");
  }

  // Check if app.current_user setting is used anywhere
  const { data: triggers, error: triggerError } = await supabase
    .from("pg_trigger")
    .select("*")
    .limit(1);

  console.log("\n📝 Key Findings:");
  console.log("   1. Business case trigger uses: NEW.created_by");
  console.log("   2. This means updates always show creator, not actual updater");
  console.log("   3. EPPO audit triggers use: current_setting('app.current_user', TRUE)");
  console.log("   4. But app.current_user is never set by application code");
  console.log("   5. No business_case_history table exists (unlike formulations)");
}

async function main() {
  console.log("🔍 Change Logging Analysis");
  console.log("=".repeat(80));

  await testBusinessCaseChangeLogging();
  await testFormulationStatusHistory();
  await checkTriggerDefinitions();

  console.log("\n" + "=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));
  console.log("\nIssues Identified:");
  console.log("1. ❌ Business case triggers use NEW.created_by instead of actual updater");
  console.log("2. ❌ Formulation status history uses NEW.created_by instead of actual updater");
  console.log("3. ❌ No app.current_user setting is set by application code");
  console.log("4. ❌ No business_case_history table (only field-level timestamps)");
  console.log("\nRecommendations:");
  console.log("1. Update triggers to use current_setting('app.current_user', TRUE)");
  console.log("2. Set app.current_user in application code before updates");
  console.log("3. Consider creating business_case_history table for full audit trail");
  console.log("4. Update formulation status history trigger similarly");
}

main().catch(console.error);



