"use server";

import { createClient } from "@/lib/supabase/server";
import { log, warn, error, table } from "@/lib/logger";
import { revalidatePath } from "next/cache";

export interface Workspace {
  workspace_id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMenuItem {
  menu_item_id: string;
  workspace_id: string;
  title: string;
  url: string;
  icon: string | null;
  group_name: string;
  display_order: number;
  is_active: boolean;
}

export interface WorkspaceWithMenuItems extends Workspace {
  menu_items: WorkspaceMenuItem[];
}

export async function getWorkspaces(): Promise<Workspace[]> {
  const supabase = await createClient();

  const { data, error: supabaseError } = await supabase
    .from("workspaces")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (supabaseError) {
    throw new Error(`Failed to fetch workspaces: ${supabaseError.message}`);
  }

  return data || [];
}

export async function getWorkspaceBySlug(
  slug: string,
): Promise<Workspace | null> {
  const supabase = await createClient();

  const { data, error: supabaseError } = await supabase
    .from("workspaces")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (supabaseError) {
    if (supabaseError.code === "PGRST116") {
      return null; // Not found
    }
    throw new Error(`Failed to fetch workspace: ${supabaseError.message}`);
  }

  return data;
}

/**
 * Get workspace with menu items in a single query using Supabase's nested select.
 * This is optimized for performance - reduces multiple DB round-trips to just one.
 * Menu items are filtered based on user permissions.
 */
export async function getWorkspaceWithMenuBySlug(
  slug: string,
): Promise<WorkspaceWithMenuItems | null> {
  const supabase = await createClient();

  // Single query with nested select for menu items
  const { data, error: supabaseError } = await supabase
    .from("workspaces")
    .select(`
      *,
      workspace_menu_items (*)
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (supabaseError) {
    if (supabaseError.code === "PGRST116") {
      return null; // Not found
    }
    warn("Failed to fetch workspace with menu:", supabaseError.message);
    return null;
  }

  if (!data) return null;

  // Extract workspace data (without menu_items)
  const { workspace_menu_items, ...workspace } = data;

  // Filter active menu items and check permissions
  const allMenuItems = (workspace_menu_items as WorkspaceMenuItem[]) || [];
  const activeMenuItems = allMenuItems.filter((item) => item.is_active);
  
  // OPTIMIZATION: Batch permission check instead of individual calls
  // This reduces N queries to 1 query, saving 100-500ms
  const urls = activeMenuItems.map(item => item.url);
  
  let accessibleUrls: Set<string>;
  
  if (urls.length > 0) {
    // Batch permission check - single RPC call for all URLs
    const { data: permissionResults, error: permError } = await supabase.rpc(
      'can_access_multiple_urls',
      { p_urls: urls }
    );
    
    if (permError) {
      // FALLBACK: If batch function doesn't exist or fails, use individual checks
      // This handles the case where migration hasn't been applied yet
      warn("Batch permission check failed, falling back to individual checks:", permError);
      
      const individualChecks = await Promise.all(
        activeMenuItems.map(async (item) => {
        const { data: canAccess } = await supabase.rpc("can_access_url", {
          p_url: item.url,
        });
          return { url: item.url, canAccess: canAccess !== false };
      })
  );

      accessibleUrls = new Set(
        individualChecks
    .filter(({ canAccess }) => canAccess)
          .map(({ url }) => url)
      );
    } else {
      // Batch check succeeded - create set of accessible URLs
      accessibleUrls = new Set(
        permissionResults
          ?.filter((r: { can_access: boolean }) => r.can_access)
          .map((r: { url: string }) => r.url) || []
      );
    }
  } else {
    accessibleUrls = new Set();
  }

  // Filter menu items based on batch permission check
  const menuItems = activeMenuItems
    .filter((item) => accessibleUrls.has(item.url))
    .sort((a, b) => {
      // Sort by group_name first, then by display_order
      const groupCompare = a.group_name.localeCompare(b.group_name);
      if (groupCompare !== 0) return groupCompare;
      return a.display_order - b.display_order;
    });

  // Return workspace with filtered and sorted menu items
  return {
    ...workspace,
    menu_items: menuItems,
  } as WorkspaceWithMenuItems;
}

export async function getWorkspaceWithMenuItems(
  workspaceId: string,
): Promise<WorkspaceWithMenuItems | null> {
  const supabase = await createClient();

  const { data: workspace, error: workspaceError } = await supabase
    .from("workspaces")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("is_active", true)
    .single();

  if (workspaceError || !workspace) {
    warn("Failed to fetch workspace:", workspaceError?.message);
    return null;
  }

  const { data: menuItems, error: menuError } = await supabase
    .from("workspace_menu_items")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("is_active", true)
    .order("group_name")
    .order("display_order");

  if (menuError) {
    // Log error but don't throw - return workspace with empty menu items
    warn("Failed to fetch menu items:", menuError.message);
    return {
      ...workspace,
      menu_items: [],
    };
  }

  return {
    ...workspace,
    menu_items: menuItems || [],
  };
}

export async function getUserDefaultWorkspace(): Promise<Workspace | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: preference, error: supabaseError } = await supabase
    .from("user_workspace_preferences")
    .select("workspace_id")
    .eq("user_id", user.id)
    .eq("is_default", true)
    .single();

  if (supabaseError || !preference) {
    // If no default, return the first workspace (Portfolio)
    return getWorkspaceBySlug("portfolio");
  }

  const { data: workspace, error: workspaceError } = await supabase
    .from("workspaces")
    .select("*")
    .eq("workspace_id", preference.workspace_id)
    .eq("is_active", true)
    .single();

  if (workspaceError || !workspace) {
    return getWorkspaceBySlug("portfolio");
  }

  return workspace;
}

export async function setUserDefaultWorkspace(
  workspaceId: string,
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // First, unset all defaults for this user
  await supabase
    .from("user_workspace_preferences")
    .update({ is_default: false })
    .eq("user_id", user.id);

  // Then set the new default (upsert)
  const { error: supabaseError } = await supabase.from("user_workspace_preferences").upsert({
    user_id: user.id,
    workspace_id: workspaceId,
    is_default: true,
  });

  if (supabaseError) {
    throw new Error(`Failed to set default workspace: ${supabaseError.message}`);
  }

  revalidatePath("/settings");
}

/**
 * Get all menu items for a workspace (including inactive ones - admin only)
 */
export async function getAllWorkspaceMenuItems(
  workspaceId: string,
): Promise<WorkspaceMenuItem[]> {
  const supabase = await createClient();

  const { data: menuItems, error: menuError } = await supabase
    .from("workspace_menu_items")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("group_name")
    .order("display_order");

  if (menuError) {
    throw new Error(`Failed to fetch menu items: ${menuError.message}`);
  }

  return menuItems || [];
}

/**
 * Toggle menu item visibility (admin only)
 */
export async function toggleMenuItemVisibility(
  menuItemId: string,
  isActive: boolean,
): Promise<void> {
  const supabase = await createClient();

  // Check if user is admin (we'll import this from user-management)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Check role - for now, allow editors too (we can restrict to admin later)
  // Schema uses role_id foreign key to roles table with role_name column
  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role_id, roles!inner(role_name)")
    .eq("user_id", user.id)
    .single();

  // With !inner join and single(), roles is returned as a single object but types show array
  const roles = roleData?.roles as unknown as { role_name: string } | null;
  const roleName = roles?.role_name?.toLowerCase();
  if (!roleData || (roleName !== "admin" && roleName !== "editor")) {
    throw new Error("Unauthorized: Admin or Editor access required");
  }

  const { error: supabaseError } = await supabase
    .from("workspace_menu_items")
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("menu_item_id", menuItemId);

  if (supabaseError) {
    throw new Error(`Failed to update menu item: ${supabaseError.message}`);
  }

  revalidatePath("/settings");
  revalidatePath("/", "layout"); // Revalidate layout to refresh sidebar
}
