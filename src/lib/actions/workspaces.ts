"use server";

import { createClient } from "@/lib/supabase/server";
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
  
  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("is_active", true)
    .order("name");
  
  if (error) {
    throw new Error(`Failed to fetch workspaces: ${error.message}`);
  }
  
  return data || [];
}

export async function getWorkspaceBySlug(slug: string): Promise<Workspace | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  
  if (error) {
    if (error.code === "PGRST116") {
      return null; // Not found
    }
    throw new Error(`Failed to fetch workspace: ${error.message}`);
  }
  
  return data;
}

export async function getWorkspaceWithMenuItems(workspaceId: string): Promise<WorkspaceWithMenuItems | null> {
  const supabase = await createClient();
  
  const { data: workspace, error: workspaceError } = await supabase
    .from("workspaces")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("is_active", true)
    .single();
  
  if (workspaceError || !workspace) {
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
    throw new Error(`Failed to fetch menu items: ${menuError.message}`);
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
  
  const { data: preference, error } = await supabase
    .from("user_workspace_preferences")
    .select("workspace_id")
    .eq("user_id", user.id)
    .eq("is_default", true)
    .single();
  
  if (error || !preference) {
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

export async function setUserDefaultWorkspace(workspaceId: string): Promise<void> {
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
  const { error } = await supabase
    .from("user_workspace_preferences")
    .upsert({
      user_id: user.id,
      workspace_id: workspaceId,
      is_default: true,
    });
  
  if (error) {
    throw new Error(`Failed to set default workspace: ${error.message}`);
  }
  
  revalidatePath("/settings");
}

/**
 * Get all menu items for a workspace (including inactive ones - admin only)
 */
export async function getAllWorkspaceMenuItems(workspaceId: string): Promise<WorkspaceMenuItem[]> {
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
export async function toggleMenuItemVisibility(menuItemId: string, isActive: boolean): Promise<void> {
  const supabase = await createClient();
  
  // Check if user is admin (we'll import this from user-management)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  
  // Check role - for now, allow editors too (we can restrict to admin later)
  // Schema uses role_id foreign key to roles table with role_name column
  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role_id, roles(role_name)")
    .eq("user_id", user.id)
    .single();
  
  const roleName = roleData?.roles?.role_name?.toLowerCase();
  if (!roleData || (roleName !== "admin" && roleName !== "editor")) {
    throw new Error("Unauthorized: Admin or Editor access required");
  }
  
  const { error } = await supabase
    .from("workspace_menu_items")
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("menu_item_id", menuItemId);
  
  if (error) {
    throw new Error(`Failed to update menu item: ${error.message}`);
  }
  
  revalidatePath("/settings");
  revalidatePath("/", "layout"); // Revalidate layout to refresh sidebar
}

