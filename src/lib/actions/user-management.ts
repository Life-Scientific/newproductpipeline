"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { decodeJWT } from "@/lib/utils/jwt";

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


