"use client";

import { createClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Singleton Supabase client instance.
 * Created once at module level to ensure true singleton pattern.
 * This prevents creating new client instances across all components,
 * reducing memory usage and eliminating duplicate auth requests.
 */
let supabaseClient: SupabaseClient<Database> | null = null;

function getSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseClient) {
    supabaseClient = createClient();
  }
  return supabaseClient;
}

/**
 * Hook that returns the singleton Supabase client instance.
 * Uses a true singleton pattern at module level for optimal performance.
 */
export function useSupabase(): SupabaseClient<Database> {
  return getSupabaseClient();
}

