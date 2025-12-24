"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { decodeJWT } from "@/lib/utils/jwt";
import { randomBytes } from "crypto";
import {
  PERMISSIONS,
  type PermissionKey,
  type Role,
  type Permission,
} from "@/lib/permissions";
import { warn, error } from "@/lib/logger";

// ============================================================================
// Types
// ============================================================================

// Legacy type for backward compatibility
export type AppRole = "viewer" | "editor" | "admin";

export interface UserRole {
  role_id: string;
  role_name: string;
  assigned_at: string;
}

export interface UserManagementData {
  id: string;
  email: string | null;
  user_created_at: string | null;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  roles: UserRole[];
  role_names: string[];
  // Legacy fields for backward compatibility
  role?: AppRole;
  role_assigned_at?: string | null;
  role_updated_at?: string | null;
}

export interface InvitationData {
  id: string;
  email: string;
  role: string; // Now can be any role name
  invited_by_email: string | null;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
  status: "pending" | "accepted" | "expired";
}

// ============================================================================
// Permission Checking Functions
// ============================================================================

/**
 * Check if the current user has a specific permission
 * Admin role automatically has all permissions
 */
export async function hasPermission(
  permission: PermissionKey,
): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  // Check if user is Admin first (Admin has all permissions)
  try {
    const { data: userRoles } = await supabase
      .from("user_roles")
      .select("roles!inner(role_name)")
      .eq("user_id", user.id);
    
    if (userRoles && userRoles.length > 0) {
      const roleNames = userRoles.map((ur: any) => ur.roles?.role_name).filter(Boolean);
      if (roleNames.includes("Admin")) {
        return true; // Admin has all permissions
      }
    }
  } catch (err) {
    // Fall through to permission check
    warn("Error checking Admin role:", err);
  }

  // Try to get permissions from JWT first
  try {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const token = session.data.session.access_token;
      const payload = decodeJWT(token);
      if (payload?.permissions && Array.isArray(payload.permissions)) {
        return payload.permissions.includes(permission);
      }
    }
  } catch {
    // Fall back to database query
  }

  // Fallback: use database function (which also checks for Admin)
  const { data, error } = await supabase.rpc("has_permission", {
    p_key: permission,
  });

  if (error) {
    error("Error checking permission:", error);
    return false;
  }

  return data === true;
}

/**
 * Check if the current user has any of the specified permissions
 */
export async function hasAnyPermission(
  permissions: PermissionKey[],
): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  // Try JWT first
  try {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const token = session.data.session.access_token;
      const payload = decodeJWT(token);
      if (payload?.permissions && Array.isArray(payload.permissions)) {
        return permissions.some((p) => payload.permissions.includes(p));
      }
    }
  } catch {
    // Fall back to database
  }

  const { data, error } = await supabase.rpc("has_any_permission", {
    p_keys: permissions,
  });

  if (error) {
    error("Error checking permissions:", error);
    return false;
  }

  return data === true;
}

/**
 * Get all permissions for the current user
 */
export async function getUserPermissions(): Promise<string[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  // Try JWT first
  try {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const token = session.data.session.access_token;
      const payload = decodeJWT(token);
      if (payload?.permissions && Array.isArray(payload.permissions)) {
        return payload.permissions;
      }
    }
  } catch {
    // Fall back to database
  }

  const { data, error } = await supabase.rpc("get_user_permissions");

  if (error) {
    error("Error getting permissions:", error);
    return [];
  }

  return data || [];
}

/**
 * Get all roles for the current user
 */
export async function getUserRoles(): Promise<string[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  // Try JWT first
  try {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const token = session.data.session.access_token;
      const payload = decodeJWT(token);
      if (payload?.roles && Array.isArray(payload.roles)) {
        return payload.roles;
      }
    }
  } catch {
    // Fall back to database
  }

  const { data, error } = await supabase.rpc("get_user_roles");

  if (error) {
    error("Error getting roles:", error);
    return [];
  }

  return data || [];
}

// ============================================================================
// Legacy Compatibility Functions
// ============================================================================

/**
 * Check if the current user is an editor (has user management permissions)
 * @deprecated Use hasPermission(PERMISSIONS.USER_EDIT_ROLE) instead
 */
export async function isEditor(): Promise<boolean> {
  return hasPermission(PERMISSIONS.USER_EDIT_ROLE);
}

/**
 * Check if the current user is an admin (has role management permissions)
 * @deprecated Use hasPermission(PERMISSIONS.ROLE_EDIT) instead
 */
export async function isAdmin(): Promise<boolean> {
  return hasPermission(PERMISSIONS.ROLE_EDIT);
}

/**
 * Get user's primary role from JWT or database
 * @deprecated Use getUserRoles() for multi-role support
 */
export async function getUserRoleFromSession(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Try JWT first
  try {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const token = session.data.session.access_token;
      const payload = decodeJWT(token);
      if (payload?.user_role) {
        return payload.user_role;
      }
    }
  } catch {
    // Fall back to database
  }

  const { data, error } = await supabase.rpc("get_user_role");

  if (error) {
    error("Error getting role:", error);
    return "Viewer";
  }

  return data || "Viewer";
}

/**
 * Get the current user's primary role
 * @deprecated Use getUserRoles() for multi-role support
 */
export async function getCurrentUserRole(): Promise<string> {
  const role = await getUserRoleFromSession();
  return role || "Viewer";
}

// ============================================================================
// User Management Functions
// ============================================================================

/**
 * Get all users with their roles
 * Requires user.view permission
 */
export async function getAllUsers(): Promise<UserManagementData[]> {
  const supabase = await createClient();

  // Check permission
  const canView = await hasPermission(PERMISSIONS.USER_VIEW);
  if (!canView) {
    throw new Error("Unauthorized: user.view permission required");
  }

  // Call the database function
  const { data, error } = await supabase.rpc("get_all_users_with_roles");

  if (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }

  return (data || []).map((user: any) => ({
    id: user.id,
    email: user.email,
    user_created_at: user.user_created_at,
    last_sign_in_at: user.last_sign_in_at,
    email_confirmed_at: user.email_confirmed_at,
    roles: user.roles || [],
    role_names: user.role_names || ["Viewer"],
  }));
}

/**
 * Batch fetch all user management data in parallel
 * Returns users, roles, and invitations in a single call
 * This is more efficient than calling each function separately
 */
export async function getUserManagementData(): Promise<{
  users: UserManagementData[];
  roles: Role[];
  invitations: InvitationData[];
}> {
  // Check permissions once
  const supabase = await createClient();
  const [canViewUsers, canViewRoles] = await Promise.all([
    hasPermission(PERMISSIONS.USER_VIEW),
    hasPermission(PERMISSIONS.ROLE_VIEW),
  ]);

  if (!canViewUsers) {
    throw new Error("Unauthorized: user.view permission required");
  }

  // Fetch all data in parallel
  const [usersResult, rolesResult, invitationsResult] = await Promise.all([
    // Users
    supabase.rpc("get_all_users_with_roles").then(({ data, error }) => {
      if (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
      return (data || []).map((user: any) => ({
        id: user.id,
        email: user.email,
        user_created_at: user.user_created_at,
        last_sign_in_at: user.last_sign_in_at,
        email_confirmed_at: user.email_confirmed_at,
        roles: user.roles || [],
        role_names: user.role_names || ["Viewer"],
      }));
    }),
    // Roles (only if user has permission)
    canViewRoles
      ? supabase.rpc("get_all_roles").then(({ data, error }) => {
          if (error) {
            throw new Error(`Failed to fetch roles: ${error.message}`);
          }
          return (data || []).map((role: any) => ({
            role_id: role.role_id,
            role_name: role.role_name,
            description: role.description,
            is_system_role: role.is_system_role,
            created_at: role.created_at,
            permissions: role.permissions || [],
          }));
        })
      : Promise.resolve([]),
    // Invitations
    supabase.rpc("get_all_invitations").then(({ data, error }) => {
      if (error) {
        throw new Error(`Failed to fetch invitations: ${error.message}`);
      }
      return (data || []).map((invitation: any) => ({
        id: invitation.id,
        email: invitation.email,
        role: invitation.role,
        invited_by_email: invitation.invited_by_email,
        expires_at: invitation.expires_at,
        accepted_at: invitation.accepted_at,
        created_at: invitation.created_at,
        status: invitation.status as "pending" | "accepted" | "expired",
      }));
    }),
  ]);

  return {
    users: usersResult,
    roles: rolesResult,
    invitations: invitationsResult,
  };
}

/**
 * Update a user's roles (replaces all current roles)
 * Requires user.edit_role permission
 */
export async function updateUserRoles(
  userId: string,
  roleIds: string[],
): Promise<void> {
  const supabase = await createClient();

  // Check permission
  const canEdit = await hasPermission(PERMISSIONS.USER_EDIT_ROLE);
  if (!canEdit) {
    throw new Error("Unauthorized: user.edit_role permission required");
  }

  // Validate that at least one role is being assigned
  if (!roleIds || roleIds.length === 0) {
    throw new Error("At least one role must be assigned");
  }

  // Get current user to prevent self-lockout
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  // Check if we're removing admin role from ourselves
  if (currentUser?.id === userId) {
    const { data: adminRole } = await supabase
      .from("roles")
      .select("role_id")
      .eq("role_name", "Admin")
      .single();

    if (adminRole && !roleIds.includes(adminRole.role_id)) {
      // Check if there are other admins
      const { data: otherAdmins } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role_id", adminRole.role_id)
        .neq("user_id", userId);

      if (!otherAdmins || otherAdmins.length === 0) {
        throw new Error("Cannot remove the last admin user");
      }
    }
  }

  // Delete existing roles for user
  const { error: deleteError } = await supabase
    .from("user_roles")
    .delete()
    .eq("user_id", userId);

  if (deleteError) {
    throw new Error(`Failed to update user roles: ${deleteError.message}`);
  }

  // Insert new roles
  const rolesToInsert = roleIds.map((roleId) => ({
    user_id: userId,
    role_id: roleId,
    assigned_by: currentUser?.id,
  }));

  const { error: insertError } = await supabase
    .from("user_roles")
    .insert(rolesToInsert);

  if (insertError) {
    throw new Error(`Failed to assign new roles: ${insertError.message}`);
  }

  revalidatePath("/settings");
}

/**
 * Add a role to a user
 * Requires user.edit_role permission
 */
export async function addUserRole(
  userId: string,
  roleId: string,
): Promise<void> {
  const supabase = await createClient();

  const canEdit = await hasPermission(PERMISSIONS.USER_EDIT_ROLE);
  if (!canEdit) {
    throw new Error("Unauthorized: user.edit_role permission required");
  }

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("user_roles").insert({
    user_id: userId,
    role_id: roleId,
    assigned_by: currentUser?.id,
  });

  if (error) {
    if (error.code === "23505") {
      // Duplicate key - user already has this role
      return;
    }
    throw new Error(`Failed to add role: ${error.message}`);
  }

  revalidatePath("/settings");
}

/**
 * Remove a role from a user
 * Requires user.edit_role permission
 */
export async function removeUserRole(
  userId: string,
  roleId: string,
): Promise<void> {
  const supabase = await createClient();

  const canEdit = await hasPermission(PERMISSIONS.USER_EDIT_ROLE);
  if (!canEdit) {
    throw new Error("Unauthorized: user.edit_role permission required");
  }

  // Get current user
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  // Check if removing admin role from self and there are no other admins
  if (currentUser?.id === userId) {
    const { data: adminRole } = await supabase
      .from("roles")
      .select("role_id")
      .eq("role_name", "Admin")
      .single();

    if (adminRole && adminRole.role_id === roleId) {
      const { data: otherAdmins } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role_id", roleId)
        .neq("user_id", userId);

      if (!otherAdmins || otherAdmins.length === 0) {
        throw new Error("Cannot remove the last admin user");
      }
    }
  }

  // Ensure user will have at least one role remaining
  const { data: userRoles } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", userId);

  if (userRoles && userRoles.length <= 1) {
    throw new Error("Cannot remove the last role from a user");
  }

  const { error } = await supabase
    .from("user_roles")
    .delete()
    .eq("user_id", userId)
    .eq("role_id", roleId);

  if (error) {
    throw new Error(`Failed to remove role: ${error.message}`);
  }

  revalidatePath("/settings");
}

// ============================================================================
// Role Management Functions
// ============================================================================

/**
 * Get all roles with their permissions
 * Requires role.view permission
 */
export async function getAllRoles(): Promise<Role[]> {
  const supabase = await createClient();

  const canView = await hasPermission(PERMISSIONS.ROLE_VIEW);
  if (!canView) {
    throw new Error("Unauthorized: role.view permission required");
  }

  const { data, error } = await supabase.rpc("get_all_roles");

  if (error) {
    throw new Error(`Failed to fetch roles: ${error.message}`);
  }

  return (data || []).map((role: any) => ({
    role_id: role.role_id,
    role_name: role.role_name,
    description: role.description,
    is_system_role: role.is_system_role,
    created_at: role.created_at,
    permissions: role.permissions || [],
  }));
}

/**
 * Get all available permissions
 */
export async function getAllPermissions(): Promise<Permission[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_all_permissions");

  if (error) {
    throw new Error(`Failed to fetch permissions: ${error.message}`);
  }

  return data || [];
}

/**
 * Create a new role
 * Requires role.create permission
 */
export async function createRole(
  roleName: string,
  description: string,
  permissionIds: string[],
): Promise<string> {
  const supabase = await createClient();

  const canCreate = await hasPermission(PERMISSIONS.ROLE_CREATE);
  if (!canCreate) {
    throw new Error("Unauthorized: role.create permission required");
  }

  // Create the role
  const { data: roleData, error: roleError } = await supabase
    .from("roles")
    .insert({
      role_name: roleName,
      description,
      is_system_role: false,
    })
    .select("role_id")
    .single();

  if (roleError) {
    if (roleError.code === "23505") {
      throw new Error("A role with this name already exists");
    }
    throw new Error(`Failed to create role: ${roleError.message}`);
  }

  // Assign permissions to the role
  if (permissionIds.length > 0) {
    const permissionAssignments = permissionIds.map((permId) => ({
      role_id: roleData.role_id,
      permission_id: permId,
    }));

    const { error: permError } = await supabase
      .from("role_permissions")
      .insert(permissionAssignments);

    if (permError) {
      // Rollback role creation
      await supabase.from("roles").delete().eq("role_id", roleData.role_id);
      throw new Error(`Failed to assign permissions: ${permError.message}`);
    }
  }

  revalidatePath("/settings");
  return roleData.role_id;
}

/**
 * Update a role's permissions
 * Requires role.edit permission
 */
export async function updateRolePermissions(
  roleId: string,
  permissionIds: string[],
): Promise<void> {
  const supabase = await createClient();

  const canEdit = await hasPermission(PERMISSIONS.ROLE_EDIT);
  if (!canEdit) {
    throw new Error("Unauthorized: role.edit permission required");
  }

  // Delete existing permissions
  const { error: deleteError } = await supabase
    .from("role_permissions")
    .delete()
    .eq("role_id", roleId);

  if (deleteError) {
    throw new Error(`Failed to update permissions: ${deleteError.message}`);
  }

  // Insert new permissions
  if (permissionIds.length > 0) {
    const permissionAssignments = permissionIds.map((permId) => ({
      role_id: roleId,
      permission_id: permId,
    }));

    const { error: insertError } = await supabase
      .from("role_permissions")
      .insert(permissionAssignments);

    if (insertError) {
      throw new Error(`Failed to assign permissions: ${insertError.message}`);
    }
  }

  revalidatePath("/settings");
}

/**
 * Update a role's details
 * Requires role.edit permission
 */
export async function updateRole(
  roleId: string,
  roleName: string,
  description: string,
): Promise<void> {
  const supabase = await createClient();

  const canEdit = await hasPermission(PERMISSIONS.ROLE_EDIT);
  if (!canEdit) {
    throw new Error("Unauthorized: role.edit permission required");
  }

  // Check if it's a system role
  const { data: role } = await supabase
    .from("roles")
    .select("is_system_role")
    .eq("role_id", roleId)
    .single();

  if (role?.is_system_role) {
    // System roles can only have their description updated, not name
    const { error } = await supabase
      .from("roles")
      .update({ description })
      .eq("role_id", roleId);

    if (error) {
      throw new Error(`Failed to update role: ${error.message}`);
    }
  } else {
    const { error } = await supabase
      .from("roles")
      .update({ role_name: roleName, description })
      .eq("role_id", roleId);

    if (error) {
      if (error.code === "23505") {
        throw new Error("A role with this name already exists");
      }
      throw new Error(`Failed to update role: ${error.message}`);
    }
  }

  revalidatePath("/settings");
}

/**
 * Delete a role
 * Requires role.delete permission
 */
export async function deleteRole(roleId: string): Promise<void> {
  const supabase = await createClient();

  const canDelete = await hasPermission(PERMISSIONS.ROLE_DELETE);
  if (!canDelete) {
    throw new Error("Unauthorized: role.delete permission required");
  }

  // Check if it's a system role
  const { data: role } = await supabase
    .from("roles")
    .select("is_system_role")
    .eq("role_id", roleId)
    .single();

  if (role?.is_system_role) {
    throw new Error("Cannot delete system roles");
  }

  // Check if any users have this role
  const { data: usersWithRole } = await supabase
    .from("user_roles")
    .select("user_id")
    .eq("role_id", roleId);

  if (usersWithRole && usersWithRole.length > 0) {
    throw new Error(
      `Cannot delete role: ${usersWithRole.length} user(s) still have this role`,
    );
  }

  const { error } = await supabase.from("roles").delete().eq("role_id", roleId);

  if (error) {
    throw new Error(`Failed to delete role: ${error.message}`);
  }

  revalidatePath("/settings");
}

// ============================================================================
// Invitation Functions (Updated for new role system)
// ============================================================================

/**
 * Get all invitations
 * Requires user.view permission
 */
export async function getAllInvitations(): Promise<InvitationData[]> {
  const supabase = await createClient();

  const canView = await hasPermission(PERMISSIONS.USER_VIEW);
  if (!canView) {
    throw new Error("Unauthorized: user.view permission required");
  }

  const { data, error } = await supabase.rpc("get_all_invitations");

  if (error) {
    throw new Error(`Failed to fetch invitations: ${error.message}`);
  }

  return (data || []).map((invitation: any) => ({
    id: invitation.id,
    email: invitation.email,
    role: invitation.role,
    invited_by_email: invitation.invited_by_email,
    expires_at: invitation.expires_at,
    accepted_at: invitation.accepted_at,
    created_at: invitation.created_at,
    status: invitation.status as "pending" | "accepted" | "expired",
  }));
}

/**
 * Invite a user by email
 * Requires user.invite permission
 */
export async function inviteUserByEmail(
  email: string,
  role: string = "Viewer",
  redirectTo?: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  const canInvite = await hasPermission(PERMISSIONS.USER_INVITE);
  if (!canInvite) {
    throw new Error("Unauthorized: user.invite permission required");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email address");
  }

  // Validate role exists
  const { data: roleData } = await supabase
    .from("roles")
    .select("role_id")
    .eq("role_name", role)
    .single();

  if (!roleData) {
    throw new Error("Invalid role");
  }

  // Check if user already exists
  const { data: usersData } = await adminSupabase.auth.admin.listUsers();
  const existingUser = usersData?.users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Check for pending invitation
  const { data: existingInvitation } = await supabase
    .from("invitations")
    .select("id, expires_at, accepted_at")
    .eq("email", email.toLowerCase())
    .is("accepted_at", null)
    .single();

  if (existingInvitation) {
    const expiresAt = new Date(existingInvitation.expires_at);
    if (expiresAt > new Date()) {
      throw new Error("An invitation has already been sent to this email");
    }
  }

  const tokenHash = randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const redirectUrl =
    redirectTo ||
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/accept-invite`;

  const { error: inviteEmailError } =
    await adminSupabase.auth.admin.inviteUserByEmail(email.toLowerCase(), {
      data: {
        role,
        invited_by: user.id,
        invitation_token_hash: tokenHash,
      },
      redirectTo: redirectUrl,
    });

  if (inviteEmailError) {
    throw new Error(
      `Failed to send invitation email: ${inviteEmailError.message}`,
    );
  }

  const { error: inviteError } = await supabase.from("invitations").insert({
    email: email.toLowerCase(),
    role,
    invited_by: user.id,
    token_hash: tokenHash,
    expires_at: expiresAt.toISOString(),
  });

  if (inviteError) {
    error("Failed to create invitation record:", inviteError);
  }

  revalidatePath("/settings");
  return { success: true };
}

/**
 * Resend an invitation
 * Requires user.invite permission
 */
export async function resendInvitation(
  invitationId: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  const canInvite = await hasPermission(PERMISSIONS.USER_INVITE);
  if (!canInvite) {
    throw new Error("Unauthorized: user.invite permission required");
  }

  const { data: invitation, error: fetchError } = await supabase
    .from("invitations")
    .select("email, role, expires_at, accepted_at")
    .eq("id", invitationId)
    .single();

  if (fetchError || !invitation) {
    throw new Error("Invitation not found");
  }

  if (invitation.accepted_at) {
    throw new Error("This invitation has already been accepted");
  }

  const expiresAt = new Date(invitation.expires_at);
  if (expiresAt <= new Date()) {
    throw new Error("This invitation has expired. Please create a new one.");
  }

  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/accept-invite`;

  const { error: inviteEmailError } =
    await adminSupabase.auth.admin.inviteUserByEmail(invitation.email, {
      data: { role: invitation.role },
      redirectTo: redirectUrl,
    });

  if (inviteEmailError) {
    throw new Error(
      `Failed to resend invitation email: ${inviteEmailError.message}`,
    );
  }

  revalidatePath("/settings");
  return { success: true };
}

/**
 * Cancel an invitation
 * Requires user.invite permission
 */
export async function cancelInvitation(invitationId: string): Promise<void> {
  const supabase = await createClient();

  const canInvite = await hasPermission(PERMISSIONS.USER_INVITE);
  if (!canInvite) {
    throw new Error("Unauthorized: user.invite permission required");
  }

  const { error } = await supabase
    .from("invitations")
    .delete()
    .eq("id", invitationId);

  if (error) {
    throw new Error(`Failed to cancel invitation: ${error.message}`);
  }

  revalidatePath("/settings");
}

/**
 * Get invitation by token hash
 */
export async function getInvitationByToken(
  tokenHash: string,
): Promise<InvitationData | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invitations")
    .select("id, email, role, expires_at, accepted_at, created_at")
    .eq("token_hash", tokenHash)
    .single();

  if (error || !data) {
    return null;
  }

  const expiresAt = new Date(data.expires_at);
  const status: "pending" | "accepted" | "expired" = data.accepted_at
    ? "accepted"
    : expiresAt <= new Date()
      ? "expired"
      : "pending";

  return {
    id: data.id,
    email: data.email,
    role: data.role,
    invited_by_email: null,
    expires_at: data.expires_at,
    accepted_at: data.accepted_at,
    created_at: data.created_at,
    status,
  };
}

/**
 * Mark invitation as accepted and assign role
 */
export async function markInvitationAsAccepted(
  userEmail: string,
  userId: string,
): Promise<void> {
  const supabase = await createClient();

  const { data: invitation, error: fetchError } = await supabase
    .from("invitations")
    .select("id, role")
    .eq("email", userEmail.toLowerCase())
    .is("accepted_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (fetchError || !invitation) {
    error("Failed to find invitation:", fetchError);
    return;
  }

  // Update invitation as accepted
  await supabase
    .from("invitations")
    .update({ accepted_at: new Date().toISOString() })
    .eq("id", invitation.id);

  // Find the role ID
  const { data: roleData } = await supabase
    .from("roles")
    .select("role_id")
    .eq("role_name", invitation.role)
    .single();

  if (roleData) {
    // Assign the role
    await supabase.from("user_roles").upsert(
      {
        user_id: userId,
        role_id: roleData.role_id,
      },
      {
        onConflict: "user_id,role_id",
      },
    );
  }

  revalidatePath("/settings");
}

/**
 * Delete a user
 * Requires user.delete permission
 */
export async function deleteUser(userId: string): Promise<void> {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  const canDelete = await hasPermission(PERMISSIONS.USER_DELETE);
  if (!canDelete) {
    throw new Error("Unauthorized: user.delete permission required");
  }

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  if (currentUser?.id === userId) {
    throw new Error("Cannot delete your own account");
  }

  // Check if this is the last admin
  const { data: adminRole } = await supabase
    .from("roles")
    .select("role_id")
    .eq("role_name", "Admin")
    .single();

  if (adminRole) {
    const { data: userIsAdmin } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("user_id", userId)
      .eq("role_id", adminRole.role_id)
      .single();

    if (userIsAdmin) {
      const { data: otherAdmins } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role_id", adminRole.role_id)
        .neq("user_id", userId);

      if (!otherAdmins || otherAdmins.length === 0) {
        throw new Error("Cannot delete the last admin user");
      }
    }
  }

  // Delete user roles
  await supabase.from("user_roles").delete().eq("user_id", userId);

  // Delete user from auth
  const { error: deleteError } =
    await adminSupabase.auth.admin.deleteUser(userId);

  if (deleteError) {
    throw new Error(`Failed to delete user: ${deleteError.message}`);
  }

  revalidatePath("/settings");
}

// ============================================================================
// Legacy Role Update (Backward Compatibility)
// ============================================================================

/**
 * Update a user's role (legacy single-role method)
 * @deprecated Use updateUserRoles() for multi-role support
 */
export async function updateUserRole(
  userId: string,
  roleName: string,
): Promise<void> {
  const supabase = await createClient();

  const canEdit = await hasPermission(PERMISSIONS.USER_EDIT_ROLE);
  if (!canEdit) {
    throw new Error("Unauthorized: user.edit_role permission required");
  }

  // Find the role ID
  const { data: roleData, error: roleError } = await supabase
    .from("roles")
    .select("role_id")
    .eq("role_name", roleName)
    .single();

  if (roleError || !roleData) {
    throw new Error("Invalid role");
  }

  // Update to single role
  await updateUserRoles(userId, [roleData.role_id]);
}
