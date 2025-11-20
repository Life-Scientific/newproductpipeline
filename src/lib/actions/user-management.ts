"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { decodeJWT } from "@/lib/utils/jwt";
import { randomBytes } from "crypto";

export type AppRole = "viewer" | "editor" | "admin";

export interface UserManagementData {
  id: string;
  email: string | null;
  user_created_at: string | null;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  role: AppRole;
  role_assigned_at: string | null;
  role_updated_at: string | null;
}

/**
 * Check if the current user is an editor
 */
export async function isEditor(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  // First try to get role from JWT (if auth hook is enabled)
  try {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const token = session.data.session.access_token;
      const payload = decodeJWT(token);
      if (payload?.user_role === "editor" || payload?.user_role === "admin") {
        return true;
      }
    }
  } catch {
    // Fall back to database query if JWT decode fails
  }

  // Fallback: query database
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (error || !data) return false;
  return data.role === "editor" || data.role === "admin";
}

/**
 * Get user role from JWT or database
 */
export async function getUserRoleFromSession(): Promise<AppRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Try to get role from JWT first (if auth hook is enabled)
  try {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const token = session.data.session.access_token;
      const payload = decodeJWT(token);
      if (payload?.user_role && (payload.user_role === "viewer" || payload.user_role === "editor" || payload.user_role === "admin")) {
        return payload.user_role as AppRole;
      }
    }
  } catch {
    // Fall back to database query
  }

  // Fallback: query database
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (error || !data) return "viewer";
  return data.role as AppRole;
}

/**
 * Get the current user's role
 */
export async function getCurrentUserRole(): Promise<AppRole> {
  const role = await getUserRoleFromSession();
  return role || "viewer";
}

/**
 * Get all users with their roles (editor only)
 * Uses a database function that securely accesses auth.users
 */
export async function getAllUsers(): Promise<UserManagementData[]> {
  const supabase = await createClient();

  // Check if user is editor
  const editorCheck = await isEditor();
  if (!editorCheck) {
    throw new Error("Unauthorized: Editor access required");
  }

  // Call the database function that securely returns all users with roles
  const { data, error } = await supabase.rpc("get_all_users_with_roles");

  if (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }

  return (data || []).map((user) => ({
    id: user.id,
    email: user.email,
    user_created_at: user.user_created_at,
    last_sign_in_at: user.last_sign_in_at,
    email_confirmed_at: user.email_confirmed_at,
    role: user.role as AppRole,
    role_assigned_at: user.role_assigned_at,
    role_updated_at: user.role_updated_at,
  }));
}

/**
 * Update a user's role (editor only)
 */
export async function updateUserRole(userId: string, role: AppRole): Promise<void> {
  const supabase = await createClient();

  // Check if user is editor
  const editorCheck = await isEditor();
  if (!editorCheck) {
    throw new Error("Unauthorized: Editor access required");
  }

  // Validate role
  if (role !== "viewer" && role !== "editor" && role !== "admin") {
    throw new Error("Invalid role");
  }

  // Prevent removing the last editor/admin
  if (role === "viewer") {
    const { data: adminsOrEditors } = await supabase
      .from("user_roles")
      .select("user_id")
      .in("role", ["editor", "admin"]);

    if (adminsOrEditors && adminsOrEditors.length === 1 && adminsOrEditors[0].user_id === userId) {
      throw new Error("Cannot remove the last editor or admin user");
    }
  }

  // Upsert the role
  const { error } = await supabase
    .from("user_roles")
    .upsert(
      {
        user_id: userId,
        role: role,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    );

  if (error) {
    throw new Error(`Failed to update user role: ${error.message}`);
  }

  revalidatePath("/settings");
}

export interface InvitationData {
  id: string;
  email: string;
  role: AppRole;
  invited_by_email: string | null;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
  status: "pending" | "accepted" | "expired";
}

/**
 * Get all invitations (editor only)
 */
export async function getAllInvitations(): Promise<InvitationData[]> {
  const supabase = await createClient();

  // Check if user is editor
  const editorCheck = await isEditor();
  if (!editorCheck) {
    throw new Error("Unauthorized: Editor access required");
  }

  // Call the database function that securely returns all invitations
  const { data, error } = await supabase.rpc("get_all_invitations");

  if (error) {
    throw new Error(`Failed to fetch invitations: ${error.message}`);
  }

  return (data || []).map((invitation) => ({
    id: invitation.id,
    email: invitation.email,
    role: invitation.role as AppRole,
    invited_by_email: invitation.invited_by_email,
    expires_at: invitation.expires_at,
    accepted_at: invitation.accepted_at,
    created_at: invitation.created_at,
    status: invitation.status as "pending" | "accepted" | "expired",
  }));
}

/**
 * Invite a user by email (editor only)
 */
export async function inviteUserByEmail(
  email: string,
  role: AppRole = "viewer",
  redirectTo?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  // Check if user is editor
  const editorCheck = await isEditor();
  if (!editorCheck) {
    throw new Error("Unauthorized: Editor access required");
  }

  // Get current user
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

  // Validate role
  if (role !== "viewer" && role !== "editor" && role !== "admin") {
    throw new Error("Invalid role");
  }

  // Check if user already exists
  const { data: existingUser } = await adminSupabase.auth.admin.getUserByEmail(email);
  if (existingUser?.user) {
    throw new Error("User with this email already exists");
  }

  // Check if there's a pending invitation for this email
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

  // Generate token hash for tracking (we'll use email as the primary identifier)
  const tokenHash = randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

  // Use Supabase Admin API to send invite email first
  const redirectUrl = redirectTo || `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/accept-invite`;
  
  const { data: inviteData, error: inviteEmailError } = await adminSupabase.auth.admin.inviteUserByEmail(
    email.toLowerCase(),
    {
      data: {
        role,
        invited_by: user.id,
        invitation_token_hash: tokenHash,
      },
      redirectTo: redirectUrl,
    }
  );

  if (inviteEmailError) {
    throw new Error(`Failed to send invitation email: ${inviteEmailError.message}`);
  }

  // Create invitation record after successful email send
  const { error: inviteError } = await supabase.from("invitations").insert({
    email: email.toLowerCase(),
    role,
    invited_by: user.id,
    token_hash: tokenHash,
    expires_at: expiresAt.toISOString(),
  });

  if (inviteError) {
    // Log error but don't fail - the email was sent
    console.error("Failed to create invitation record:", inviteError);
  }

  revalidatePath("/settings");
  return { success: true };
}

/**
 * Resend an invitation (editor only)
 */
export async function resendInvitation(invitationId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  // Check if user is editor
  const editorCheck = await isEditor();
  if (!editorCheck) {
    throw new Error("Unauthorized: Editor access required");
  }

  // Get invitation
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

  // Check if expired
  const expiresAt = new Date(invitation.expires_at);
  if (expiresAt <= new Date()) {
    throw new Error("This invitation has expired. Please create a new one.");
  }

  // Resend invite using Supabase Admin API
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/accept-invite`;
  
  const { error: inviteEmailError } = await adminSupabase.auth.admin.inviteUserByEmail(
    invitation.email,
    {
      data: {
        role: invitation.role,
      },
      redirectTo: redirectUrl,
    }
  );

  if (inviteEmailError) {
    throw new Error(`Failed to resend invitation email: ${inviteEmailError.message}`);
  }

  revalidatePath("/settings");
  return { success: true };
}

/**
 * Cancel an invitation (editor only)
 */
export async function cancelInvitation(invitationId: string): Promise<void> {
  const supabase = await createClient();

  // Check if user is editor
  const editorCheck = await isEditor();
  if (!editorCheck) {
    throw new Error("Unauthorized: Editor access required");
  }

  // Delete invitation
  const { error } = await supabase.from("invitations").delete().eq("id", invitationId);

  if (error) {
    throw new Error(`Failed to cancel invitation: ${error.message}`);
  }

  revalidatePath("/settings");
}

/**
 * Get invitation by token hash (for acceptance flow)
 */
export async function getInvitationByToken(tokenHash: string): Promise<InvitationData | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invitations")
    .select("id, email, role, expires_at, accepted_at, created_at")
    .eq("token_hash", tokenHash)
    .single();

  if (error || !data) {
    return null;
  }

  // Check if expired
  const expiresAt = new Date(data.expires_at);
  const status: "pending" | "accepted" | "expired" = data.accepted_at
    ? "accepted"
    : expiresAt <= new Date()
    ? "expired"
    : "pending";

  return {
    id: data.id,
    email: data.email,
    role: data.role as AppRole,
    invited_by_email: null,
    expires_at: data.expires_at,
    accepted_at: data.accepted_at,
    created_at: data.created_at,
    status,
  };
}

/**
 * Mark invitation as accepted and assign role (called after user signs up via invite)
 */
export async function markInvitationAsAccepted(userEmail: string, userId: string): Promise<void> {
  const supabase = await createClient();

  // Find the invitation by email (most recent pending one)
  const { data: invitation, error: fetchError } = await supabase
    .from("invitations")
    .select("id, role")
    .eq("email", userEmail.toLowerCase())
    .is("accepted_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (fetchError || !invitation) {
    console.error("Failed to find invitation:", fetchError);
    // Don't throw - user can still sign in, role can be updated manually
    return;
  }

  // Update invitation as accepted
  const { error: updateError } = await supabase
    .from("invitations")
    .update({ accepted_at: new Date().toISOString() })
    .eq("id", invitation.id);

  if (updateError) {
    console.error("Failed to mark invitation as accepted:", updateError);
    // Continue anyway - we'll still assign the role
  }

  // Assign the role from the invitation
  // The handle_new_user trigger will assign viewer by default
  // We need to update it to the invited role
  const { error: roleError } = await supabase
    .from("user_roles")
    .upsert(
      {
        user_id: userId,
        role: invitation.role,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    );

  if (roleError) {
    console.error("Failed to assign role from invitation:", roleError);
    // Don't throw - user can still sign in, role can be updated manually
  }

  revalidatePath("/settings");
}

/**
 * Delete a user (admin only)
 * This will delete the user from auth and remove their role
 */
export async function deleteUser(userId: string): Promise<void> {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  // Check if user is editor
  const editorCheck = await isEditor();
  if (!editorCheck) {
    throw new Error("Unauthorized: Editor access required");
  }

  // Get current user to prevent self-deletion
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  if (currentUser?.id === userId) {
    throw new Error("Cannot delete your own account");
  }

  // Prevent deleting the last editor/admin
  const { data: adminsOrEditors } = await supabase
    .from("user_roles")
    .select("user_id, role")
    .in("role", ["editor", "admin"]);

  if (adminsOrEditors) {
    const userRole = adminsOrEditors.find((r) => r.user_id === userId);
    if (userRole && (userRole.role === "editor" || userRole.role === "admin")) {
      if (adminsOrEditors.length === 1) {
        throw new Error("Cannot delete the last editor or admin user");
      }
    }
  }

  // Delete user role first
  const { error: roleError } = await supabase
    .from("user_roles")
    .delete()
    .eq("user_id", userId);

  if (roleError) {
    throw new Error(`Failed to delete user role: ${roleError.message}`);
  }

  // Delete user from auth using admin client
  const { error: deleteError } = await adminSupabase.auth.admin.deleteUser(userId);

  if (deleteError) {
    throw new Error(`Failed to delete user: ${deleteError.message}`);
  }

  revalidatePath("/settings");
}

