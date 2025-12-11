import { createClient } from "@/lib/supabase/server";
import type {
  KPIDashboardViewRow,
  KPIData,
  CoreDriver,
  StrategicDriver,
  KeyResult,
  DataSource,
  CoreDriverRow,
  StrategicDriverRow,
  KeyResultRow,
  AuditLogRow,
  AuditLogEntry,
} from "@/lib/kpi-dashboard/types";

/**
 * Fetch full KPI dashboard data from operations.vw_kpi_dashboard
 * Returns hierarchical structure for UI consumption
 */
export async function getKPIDashboardData(): Promise<KPIData> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("operations")
    .from("vw_kpi_dashboard")
    .select("*")
    .order("cd_sort", { ascending: true })
    .order("sd_sort", { ascending: true })
    .order("kr_sort", { ascending: true });

  if (error) {
    console.error("Error fetching KPI dashboard data:", error);
    throw error;
  }

  const rows = (data || []) as KPIDashboardViewRow[];

  // Transform flat rows into hierarchical structure
  const coreDriversMap = new Map<string, CoreDriver>();
  const strategicDriversMap = new Map<string, StrategicDriver>();

  for (const row of rows) {
    // Ensure core driver exists
    if (!coreDriversMap.has(row.core_driver_id)) {
      coreDriversMap.set(row.core_driver_id, {
        id: row.core_driver_id,
        label: row.core_driver_label,
        target: row.core_driver_target,
        strategicDrivers: [],
      });
    }

    // Ensure strategic driver exists
    const strategicKey = `${row.core_driver_id}-${row.strategic_driver_id}`;
    if (!strategicDriversMap.has(strategicKey)) {
      const strategicDriver: StrategicDriver = {
        id: row.strategic_driver_id,
        label: row.strategic_driver_label,
        keyResults: [],
      };
      strategicDriversMap.set(strategicKey, strategicDriver);
      coreDriversMap.get(row.core_driver_id)!.strategicDrivers.push(
        strategicDriver,
      );
    }

    // Add key result
    const strategicDriver = strategicDriversMap.get(strategicKey)!;
    const source: DataSource = {
      system: row.source_system || "Manual Entry",
      endpoint: row.endpoint || undefined,
      lastSync: row.last_sync || row.updated_at,
      frequency: row.frequency || "manual",
      syncEnabled: row.sync_enabled || false,
    };

    const keyResult: KeyResult = {
      id: row.id,
      label: row.label,
      status: row.status,
      ownerId: row.owner_id,
      target: row.target || undefined,
      reality: row.reality || undefined,
      justification: row.justification || undefined,
      lastUpdated: row.updated_at,
      isLocked: row.is_locked,
      lockedBy: row.locked_by || undefined,
      lockedAt: row.locked_at || undefined,
      source,
      notes: row.notes || undefined,
      trend: row.trend,
    };

    strategicDriver.keyResults.push(keyResult);
  }

  return {
    coreDrivers: Array.from(coreDriversMap.values()),
  };
}

/**
 * Fetch core drivers (for hierarchy management)
 */
export async function getCoreDrivers(): Promise<CoreDriverRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("operations")
    .from("kpi_core_drivers")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching core drivers:", error);
    throw error;
  }

  return (data || []) as CoreDriverRow[];
}

/**
 * Fetch strategic drivers (optionally filtered by core driver)
 */
export async function getStrategicDrivers(
  coreDriverId?: string,
): Promise<StrategicDriverRow[]> {
  const supabase = await createClient();

  let query = supabase
    .schema("operations")
    .from("kpi_strategic_drivers")
    .select("*")
    .order("sort_order", { ascending: true });

  if (coreDriverId) {
    query = query.eq("core_driver_id", coreDriverId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching strategic drivers:", error);
    throw error;
  }

  return (data || []) as StrategicDriverRow[];
}

/**
 * Fetch a single key result with full details
 */
export async function getKeyResultById(id: string): Promise<KeyResultRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("operations")
    .from("kpi_key_results")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Not found
      return null;
    }
    console.error("Error fetching key result:", error);
    throw error;
  }

  return data as KeyResultRow;
}

/**
 * Fetch audit log for a specific entity
 */
export async function getAuditLog(
  entityType: "core_driver" | "strategic_driver" | "key_result",
  entityId: string,
): Promise<AuditLogEntry[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("operations")
    .from("kpi_audit_log")
    .select("*")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching audit log:", error);
    throw error;
  }

  const rows = (data || []) as AuditLogRow[];

  // Transform to audit log entries
  // Note: User names would need to be fetched separately if needed
  // For now, we'll just return the user_id
  return rows.map((row) => ({
    id: row.id,
    entityType: row.entity_type,
    entityId: row.entity_id,
    userId: row.user_id,
    userName: null, // Could be enhanced to fetch user emails if needed
    action: row.action,
    fieldName: row.field_name,
    oldValue: row.old_value,
    newValue: row.new_value,
    createdAt: row.created_at,
  }));
}

