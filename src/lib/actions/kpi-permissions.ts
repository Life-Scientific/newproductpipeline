"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { hasPermission, hasAnyPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";

/**
 * Grant KPI permissions to a user
 * Can grant either KPI Contributor (view + edit own) or KPI Manager (full access)
 * Requires: Any KPI permission (cascading - if you have KPI access, you can grant it)
 */
export async function grantKPIAccess(
  userId: string,
  roleType: "contributor" | "manager" = "contributor",
): Promise<{
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

  // Get role ID based on type
  const roleName = roleType === "manager" ? "KPI Manager" : "KPI Contributor";
  const { data: kpiRole, error: roleError } = await supabase
    .from("roles")
    .select("role_id")
    .eq("role_name", roleName)
    .single();

  if (roleError || !kpiRole) {
    return {
      success: false,
      message: `${roleName} role not found. Please contact an administrator.`,
    };
  }

  // Check if user already has this role
  const { data: existingRole } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", userId)
    .eq("role_id", kpiRole.role_id)
    .single();

  if (existingRole) {
    return {
      success: true,
      message: `User already has ${roleName} role.`,
    };
  }

  // Get current user for audit
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  // Assign role
  const { error: assignError } = await supabase.from("user_roles").insert({
    user_id: userId,
    role_id: kpiRole.role_id,
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
    message: `${roleName} access granted successfully.`,
  };
}

/**
 * Revoke KPI permissions from a user by removing their KPI role (Manager or Contributor)
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

  // Get both KPI role IDs
  const { data: kpiRoles } = await supabase
    .from("roles")
    .select("role_id")
    .in("role_name", ["KPI Manager", "KPI Contributor"]);

  if (!kpiRoles || kpiRoles.length === 0) {
    return {
      success: false,
      message: "KPI roles not found.",
    };
  }

  const roleIds = kpiRoles.map((r) => r.role_id);

  // Remove any KPI role
  const { error: removeError } = await supabase
    .from("user_roles")
    .delete()
    .eq("user_id", userId)
    .in("role_id", roleIds);

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
 * Check if a user has KPI access (either Contributor or Manager)
 */
export async function userHasKPIAccess(userId: string): Promise<boolean> {
  const supabase = await createClient();

  // Get both KPI role IDs
  const { data: kpiRoles } = await supabase
    .from("roles")
    .select("role_id")
    .in("role_name", ["KPI Manager", "KPI Contributor"]);

  if (!kpiRoles || kpiRoles.length === 0) {
    return false;
  }

  const roleIds = kpiRoles.map((r) => r.role_id);

  // Check if user has any KPI role
  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", userId)
    .in("role_id", roleIds)
    .limit(1);

  return !!userRole && userRole.length > 0;
}

/**
 * Get the KPI role type for a user (manager, contributor, or null)
 */
export async function getUserKPIRole(
  userId: string,
): Promise<"manager" | "contributor" | null> {
  const supabase = await createClient();

  // Get KPI Manager role
  const { data: managerRole } = await supabase
    .from("roles")
    .select("role_id")
    .eq("role_name", "KPI Manager")
    .single();

  if (managerRole) {
    const { data: hasManager } = await supabase
      .from("user_roles")
      .select("role_id")
      .eq("user_id", userId)
      .eq("role_id", managerRole.role_id)
      .single();

    if (hasManager) {
      return "manager";
    }
  }

  // Get KPI Contributor role
  const { data: contributorRole } = await supabase
    .from("roles")
    .select("role_id")
    .eq("role_name", "KPI Contributor")
    .single();

  if (contributorRole) {
    const { data: hasContributor } = await supabase
      .from("user_roles")
      .select("role_id")
      .eq("user_id", userId)
      .eq("role_id", contributorRole.role_id)
      .single();

    if (hasContributor) {
      return "contributor";
    }
  }

  return null;
}

