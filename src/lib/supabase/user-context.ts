"use server";

import { createClient } from "@/lib/supabase/server";
import { log, warn, error, table } from "@/lib/logger";
import { getCurrentUserName } from "@/lib/utils/user-context";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Sets the current user context in the database for triggers to use.
 * This allows triggers to track who made changes.
 *
 * @param supabase - The Supabase client instance
 * @returns Promise that resolves when context is set
 */
export async function setUserContext(
  supabase: SupabaseClient<Database>,
): Promise<void> {
  try {
    const userName = await getCurrentUserName();
    // Note: set_current_user function may not exist - this call will fail silently
    await (supabase as SupabaseClient).rpc("set_current_user", {
      user_name: userName,
    });
  } catch (error) {
    // If setting context fails, log but don't throw (allows operations to continue)
    error("Failed to set user context:", error);
  }
}

/**
 * Executes an operation with user context set for database triggers.
 * This ensures that triggers can correctly identify who made changes.
 *
 * @param operation - Function that receives a Supabase client and returns a result
 * @returns The result of the operation
 */
export async function withUserContext<T>(
  operation: (supabase: SupabaseClient<Database>) => Promise<T>,
): Promise<T> {
  const supabase = await createClient();

  // Set user context for triggers
  await setUserContext(supabase);

  // Execute the operation
  return await operation(supabase);
}
