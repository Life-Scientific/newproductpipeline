"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Get the current authenticated user's email or ID
 * Returns null if no user is authenticated
 */
export async function getCurrentUser(): Promise<{ email: string | null; id: string | null }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    email: user?.email || null,
    id: user?.id || null,
  };
}

/**
 * Get a display name for the current user (email or "Unknown User")
 */
export async function getCurrentUserName(): Promise<string> {
  const user = await getCurrentUser();
  return user.email || user.id || "Unknown User";
}

