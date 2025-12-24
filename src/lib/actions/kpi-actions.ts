"use server";

import { createClient } from "@/lib/supabase/server";
import { log, warn, error, table } from "@/lib/logger";
import { revalidatePath } from "next/cache";
import { PERMISSIONS } from "@/lib/permissions";
import { hasPermission } from "./user-management";
import type {
  KeyResultInput,
  CoreDriverInput,
  StrategicDriverInput,
  KeyResultRow,
} from "@/lib/kpi-dashboard/types";

/**
 * Log an audit entry for KPI changes
 */
async function logAudit(
  entityType: "core_driver" | "strategic_driver" | "key_result",
  entityId: string,
  action: "create" | "update" | "delete" | "lock" | "unlock",
  fieldName?: string | null,
  oldValue?: string | null,
  newValue?: string | null,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.schema("operations").from("kpi_audit_log").insert({
    entity_type: entityType,
    entity_id: entityId,
    user_id: user?.id || null,
    action,
    field_name: fieldName || null,
    old_value: oldValue || null,
    new_value: newValue || null,
  });
}

/**
 * Update a key result (KPI)
 * Checks permissions: owner OR kpi.edit OR kpi.manage_hierarchy
 */
export async function updateKeyResult(
  id: string,
  data: Partial<KeyResultInput>,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Check if user can edit (owner or has permission)
  const keyResult = await supabase
    .schema("operations")
    .from("kpi_key_results")
    .select("owner_id")
    .eq("id", id)
    .single();

  if (keyResult.error) {
    throw new Error("Key result not found");
  }

  const isOwner = keyResult.data.owner_id === user.id;
  // Only owner OR KPI Manager/Admin can edit KPI values
  // KPI Manager has KPI_MANAGE_HIERARCHY permission
  const canEdit =
    isOwner || (await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY));

  if (!canEdit) {
    throw new Error(
      "Only the assigned owner or KPI Manager can edit this KPI. Please contact a KPI Manager to update values.",
    );
  }

  // Get old values for audit log
  const { data: oldRow, error: fetchError } = await supabase
    .schema("operations")
    .from("kpi_key_results")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) {
    error("Error fetching old key result:", fetchError);
    // Continue anyway - audit log will be incomplete but update will proceed
  }

  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  // Map input fields to database fields
  if (data.label !== undefined) updateData.label = data.label;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.target !== undefined) updateData.target = data.target;
  if (data.reality !== undefined) updateData.reality = data.reality;
  if (data.trend !== undefined) updateData.trend = data.trend;
  if (data.owner_id !== undefined) updateData.owner_id = data.owner_id;
  if (data.justification !== undefined)
    updateData.justification = data.justification;
  if (data.notes !== undefined) updateData.notes = data.notes;

  const { error: updateError } = await supabase
    .schema("operations")
    .from("kpi_key_results")
    .update(updateData)
    .eq("id", id);

  if (updateError) {
    error("Error updating key result:", updateError);
    throw updateError;
  }

  // Log audit entries for changed fields
  if (oldRow) {
    for (const [field, newVal] of Object.entries(updateData)) {
      if (field === "updated_at") continue;
      const oldVal = oldRow[field as keyof KeyResultRow];
      if (oldVal !== newVal) {
        await logAudit(
          "key_result",
          id,
          "update",
          field,
          String(oldVal || ""),
          String(newVal || ""),
        );
      }
    }
  }

  revalidatePath("/operations/kpi-dashboard");
}

/**
 * Create a new key result
 * Requires: kpi.create OR kpi.manage_hierarchy
 */
export async function createKeyResult(data: KeyResultInput) {
  const supabase = await createClient();

  const canCreate =
    (await hasPermission(PERMISSIONS.KPI_CREATE)) ||
    (await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY));

  if (!canCreate) {
    throw new Error("You do not have permission to create KPIs");
  }

  const insertData = {
    strategic_driver_id: data.strategic_driver_id,
    label: data.label,
    status: data.status || "yellow",
    target: data.target || null,
    reality: data.reality || null,
    trend: data.trend || "flat",
    owner_id: data.owner_id || null,
    justification: data.justification || null,
    notes: data.notes || null,
  };

  const { data: result, error: insertError } = await supabase
    .schema("operations")
    .from("kpi_key_results")
    .insert(insertData)
    .select()
    .single();

  if (insertError) {
    error("Error creating key result:", insertError);
    throw insertError;
  }

  // Create default data source
  await supabase.schema("operations").from("kpi_data_sources").insert({
    key_result_id: result.id,
    source_system: "Manual Entry",
    frequency: "manual",
  });

  await logAudit("key_result", result.id, "create");

  revalidatePath("/operations/kpi-dashboard");
  return result.id;
}

/**
 * Delete a key result
 * Requires: kpi.delete OR kpi.manage_hierarchy
 */
export async function deleteKeyResult(id: string) {
  const supabase = await createClient();

  const canDelete =
    (await hasPermission(PERMISSIONS.KPI_DELETE)) ||
    (await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY));

  if (!canDelete) {
    throw new Error("You do not have permission to delete KPIs");
  }

  const { error: supabaseError } = await supabase
    .schema("operations")
    .from("kpi_key_results")
    .delete()
    .eq("id", id);

  if (supabaseError) {
    supabaseError("Error deleting key result:", supabaseError);
    throw supabaseError;
  }

  await logAudit("key_result", id, "delete");

  revalidatePath("/operations/kpi-dashboard");
}

/**
 * Toggle lock status of a key result
 * Requires: kpi.lock OR kpi.manage_hierarchy
 */
export async function toggleLock(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const canLock =
    (await hasPermission(PERMISSIONS.KPI_LOCK)) ||
    (await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY));

  if (!canLock) {
    throw new Error("You do not have permission to lock/unlock KPIs");
  }

  // Get current lock status
  const { data: current, error: fetchError } = await supabase
    .schema("operations")
    .from("kpi_key_results")
    .select("is_locked")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error("Key result not found");
  }

  const newLockStatus = !current.is_locked;

  const { error: supabaseError } = await supabase
    .schema("operations")
    .from("kpi_key_results")
    .update({
      is_locked: newLockStatus,
      locked_by: newLockStatus ? user.id : null,
      locked_at: newLockStatus ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (supabaseError) {
    supabaseError("Error toggling lock:", supabaseError);
    throw supabaseError;
  }

  await logAudit(
    "key_result",
    id,
    newLockStatus ? "lock" : "unlock",
    "is_locked",
    String(current.is_locked),
    String(newLockStatus),
  );

  revalidatePath("/operations/kpi-dashboard");
}

/**
 * Create a core driver
 * Requires: kpi.manage_hierarchy
 */
export async function createCoreDriver(data: CoreDriverInput) {
  const supabase = await createClient();

  const canManage =
    await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY);

  if (!canManage) {
    throw new Error("You do not have permission to manage hierarchy");
  }

  const { data: result, error: supabaseError } = await supabase
    .schema("operations")
    .from("kpi_core_drivers")
    .insert({
      label: data.label,
      target: data.target || null,
      sort_order: data.sort_order || 0,
    })
    .select()
    .single();

  if (supabaseError) {
    supabaseError("Error creating core driver:", supabaseError);
    throw supabaseError;
  }

  await logAudit("core_driver", result.id, "create");

  revalidatePath("/operations/kpi-dashboard");
  return result.id;
}

/**
 * Update a core driver
 * Requires: kpi.manage_hierarchy
 */
export async function updateCoreDriver(id: string, data: Partial<CoreDriverInput>) {
  const supabase = await createClient();

  const canManage =
    await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY);

  if (!canManage) {
    throw new Error("You do not have permission to manage hierarchy");
  }

  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (data.label !== undefined) updateData.label = data.label;
  if (data.target !== undefined) updateData.target = data.target;
  if (data.sort_order !== undefined) updateData.sort_order = data.sort_order;

  const { error: supabaseError } = await supabase
    .schema("operations")
    .from("kpi_core_drivers")
    .update(updateData)
    .eq("id", id);

  if (supabaseError) {
    supabaseError("Error updating core driver:", supabaseError);
    throw supabaseError;
  }

  await logAudit("core_driver", id, "update");

  revalidatePath("/operations/kpi-dashboard");
}

/**
 * Delete a core driver
 * Requires: kpi.manage_hierarchy
 */
export async function deleteCoreDriver(id: string) {
  const supabase = await createClient();

  const canManage =
    await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY);

  if (!canManage) {
    throw new Error("You do not have permission to manage hierarchy");
  }

  const { error: supabaseError } = await supabase
    .schema("operations")
    .from("kpi_core_drivers")
    .delete()
    .eq("id", id);

  if (supabaseError) {
    supabaseError("Error deleting core driver:", supabaseError);
    throw supabaseError;
  }

  await logAudit("core_driver", id, "delete");

  revalidatePath("/operations/kpi-dashboard");
}

/**
 * Create a strategic driver
 * Requires: kpi.manage_hierarchy
 */
export async function createStrategicDriver(data: StrategicDriverInput) {
  const supabase = await createClient();

  const canManage =
    await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY);

  if (!canManage) {
    throw new Error("You do not have permission to manage hierarchy");
  }

  const { data: result, error: supabaseError } = await supabase
    .schema("operations")
    .from("kpi_strategic_drivers")
    .insert({
      core_driver_id: data.core_driver_id,
      label: data.label,
      sort_order: data.sort_order || 0,
    })
    .select()
    .single();

  if (supabaseError) {
    supabaseError("Error creating strategic driver:", supabaseError);
    throw supabaseError;
  }

  await logAudit("strategic_driver", result.id, "create");

  revalidatePath("/operations/kpi-dashboard");
  return result.id;
}

/**
 * Update a strategic driver
 * Requires: kpi.manage_hierarchy
 */
export async function updateStrategicDriver(
  id: string,
  data: Partial<StrategicDriverInput>,
) {
  const supabase = await createClient();

  const canManage =
    await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY);

  if (!canManage) {
    throw new Error("You do not have permission to manage hierarchy");
  }

  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (data.label !== undefined) updateData.label = data.label;
  if (data.core_driver_id !== undefined)
    updateData.core_driver_id = data.core_driver_id;
  if (data.sort_order !== undefined) updateData.sort_order = data.sort_order;

  const { error: supabaseError } = await supabase
    .schema("operations")
    .from("kpi_strategic_drivers")
    .update(updateData)
    .eq("id", id);

  if (supabaseError) {
    supabaseError("Error updating strategic driver:", supabaseError);
    throw supabaseError;
  }

  await logAudit("strategic_driver", id, "update");

  revalidatePath("/operations/kpi-dashboard");
}

/**
 * Delete a strategic driver
 * Requires: kpi.manage_hierarchy
 */
export async function deleteStrategicDriver(id: string) {
  const supabase = await createClient();

  const canManage =
    await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY);

  if (!canManage) {
    throw new Error("You do not have permission to manage hierarchy");
  }

  const { error: supabaseError } = await supabase
    .schema("operations")
    .from("kpi_strategic_drivers")
    .delete()
    .eq("id", id);

  if (supabaseError) {
    supabaseError("Error deleting strategic driver:", supabaseError);
    throw supabaseError;
  }

  await logAudit("strategic_driver", id, "delete");

  revalidatePath("/operations/kpi-dashboard");
}

/**
 * Reorder items (update sort_order for multiple items)
 * Requires: kpi.manage_hierarchy
 */
export async function reorderItems(
  type: "core_driver" | "strategic_driver" | "key_result",
  items: Array<{ id: string; sort_order: number }>,
) {
  const supabase = await createClient();

  const canManage =
    await hasPermission(PERMISSIONS.KPI_MANAGE_HIERARCHY);

  if (!canManage) {
    throw new Error("You do not have permission to manage hierarchy");
  }

  const tableName =
    type === "core_driver"
      ? "kpi_core_drivers"
      : type === "strategic_driver"
        ? "kpi_strategic_drivers"
        : "kpi_key_results";

  // Update each item's sort_order
  for (const item of items) {
    const { error: supabaseError } = await supabase
      .schema("operations")
      .from(tableName)
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);

    if (supabaseError) {
      supabaseError(`Error reordering ${type}:`, supabaseError);
      throw supabaseError;
    }
  }

  revalidatePath("/operations/kpi-dashboard");
}

/**
 * Get audit log for an entity (server action wrapper)
 * Requires: kpi.view_audit
 */
export async function getAuditLogAction(
  entityType: "core_driver" | "strategic_driver" | "key_result",
  entityId: string,
) {
  const supabase = await createClient();

  const canViewAudit = await hasPermission(PERMISSIONS.KPI_VIEW_AUDIT);

  if (!canViewAudit) {
    throw new Error("You do not have permission to view audit logs");
  }

  const { data, error: supabaseError } = await supabase
    .schema("operations")
    .from("kpi_audit_log")
    .select("*")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (supabaseError) {
    supabaseError("Error fetching audit log:", supabaseError);
    throw supabaseError;
  }

  return (data || []).map((row) => ({
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

/**
 * Get core drivers (server action wrapper for client components)
 */
export async function getCoreDriversAction() {
  const supabase = await createClient();

  const { data, error: supabaseError } = await supabase
    .schema("operations")
    .from("kpi_core_drivers")
    .select("*")
    .order("sort_order", { ascending: true });

  if (supabaseError) {
    supabaseError("Error fetching core drivers:", supabaseError);
    throw supabaseError;
  }

  return (data || []) as Array<{
    id: string;
    label: string;
    target: string | null;
    sort_order: number;
    created_at: string;
    updated_at: string;
  }>;
}

/**
 * Get strategic drivers (server action wrapper for client components)
 */
export async function getStrategicDriversAction(coreDriverId?: string) {
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

  if (supabaseError) {
    supabaseError("Error fetching strategic drivers:", supabaseError);
    throw supabaseError;
  }

  return (data || []) as Array<{
    id: string;
    core_driver_id: string;
    label: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
  }>;
}

