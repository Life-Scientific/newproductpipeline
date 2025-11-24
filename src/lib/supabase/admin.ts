/**
 * Supabase Admin Client
 * 
 * This client uses the service role key to perform admin operations
 * like inviting users. It should ONLY be used in server-side code.
 * 
 * IMPORTANT: Never expose the service role key to the client!
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY environment variable is not set. " +
    "This is required for admin operations like inviting users."
  );
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL environment variable is not set."
  );
}

/**
 * Creates a Supabase admin client with service role privileges.
 * This client bypasses RLS and should only be used server-side.
 */
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}



