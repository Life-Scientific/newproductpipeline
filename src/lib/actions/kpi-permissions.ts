"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { hasPermission, hasAnyPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";

/**
 * Grant KPI permissions to a user by assigning them the KPI Manager role
 * Requires: Any KPI permission (cascading - if you have KPI access, you can grant it)
 */
export async function grantKPIAccess(userId: string): Promise<{
  success: boolean;
  message: string;
}> {
  const supabase = await createClient();

  // Check if current user has any KPI permission (cascading permission grant)
  const hasKPIAccess = await hasAnyPermission([
    PERMISSIONS.KPI_VIEW,
    PERMISSIONS.KPI_EDIT,
    PERMISSIONS.KPI_CREATE,
    PERMISSIONS.KPI_MANAGE_HIERARCHY,
  ]);

  if (!hasKPIAccess) {
    return {
      success: false,
      message: "You don't have permission to grant KPI access. You need at least one KPI permission.",
    };
  }

  // Get KPI Manager role ID
  const { data: kpiManagerRole, error: roleError } = await supabase
    .from("roles")
    .select("role_id")
    .eq("role_name", "KPI Manager")
    .single();

  if (roleError || !kpiManagerRole) {
    return {
      success: false,
      message: "KPI Manager role not found. Please contact an administrator.",
    };
  }

  // Check if user already has the role
  const { data: existingRole } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", userId)
    .eq("role_id", kpiManagerRole.role_id)
    .single();

  if (existingRole) {
    return {
      success: true,
      message: "User already has KPI Manager role.",
    };
  }

  // Get current user for audit
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  // Assign KPI Manager role
  const { error: assignError } = await supabase.from("user_roles").insert({
    user_id: userId,
    role_id: kpiManagerRole.role_id,
    assigned_by: currentUser?.id || null,
  });

  if (assignError) {
    return {
      success: false,
      message: `Failed to grant KPI access: ${assignError.message}`,
    };
  }

  revalidatePath("/operations/kpi-dashboard");
  revalidatePath("/settings");

  return {
    success: true,
    message: "KPI access granted successfully.",
  };
}

/**
 * Revoke KPI permissions from a user by removing the KPI Manager role
 * Requires: Any KPI permission (cascading)
 */
export async function revokeKPIAccess(userId: string): Promise<{
  success: boolean;
  message: string;
}> {
  const supabase = await createClient();

  // Check if current user has any KPI permission
  const hasKPIAccess = await hasAnyPermission([
    PERMISSIONS.KPI_VIEW,
    PERMISSIONS.KPI_EDIT,
    PERMISSIONS.KPI_CREATE,
    PERMISSIONS.KPI_MANAGE_HIERARCHY,
  ]);

  if (!hasKPIAccess) {
    return {
      success: false,
      message: "You don't have permission to revoke KPI access.",
    };
  }

  // Get KPI Manager role ID
  const { data: kpiManagerRole, error: roleError } = await supabase
    .from("roles")
    .select("role_id")
    .eq("role_name", "KPI Manager")
    .single();

  if (roleError || !kpiManagerRole) {
    return {
      success: false,
      message: "KPI Manager role not found.",
    };
  }

  // Remove KPI Manager role
  const { error: removeError } = await supabase
    .from("user_roles")
    .delete()
    .eq("user_id", userId)
    .eq("role_id", kpiManagerRole.role_id);

  if (removeError) {
    return {
      success: false,
      message: `Failed to revoke KPI access: ${removeError.message}`,
    };
  }

  revalidatePath("/operations/kpi-dashboard");
  revalidatePath("/settings");

  return {
    success: true,
    message: "KPI access revoked successfully.",
  };
}

/**
 * Check if a user has KPI access
 */
export async function userHasKPIAccess(userId: string): Promise<boolean> {
  const supabase = await createClient();

  // Get KPI Manager role ID
  const { data: kpiManagerRole } = await supabase
    .from("roles")
    .select("role_id")
    .eq("role_name", "KPI Manager")
    .single();

  if (!kpiManagerRole) {
    return false;
  }

  // Check if user has KPI Manager role
  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", userId)
    .eq("role_id", kpiManagerRole.role_id)
    .single();

  return !!userRole;
}

