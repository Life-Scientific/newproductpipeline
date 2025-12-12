"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import type {
  Workspace,
  WorkspaceWithMenuItems,
} from "@/lib/actions/workspaces";
import { getWorkspaceWithMenuBySlug } from "@/lib/actions/workspaces";

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  workspaceWithMenu: WorkspaceWithMenuItems | null;
  isLoading: boolean;
  switchWorkspace: (slug: string) => Promise<string>; // Returns default route
  refreshWorkspace: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

// Known workspace slugs - used for pathname detection and route checking
const knownWorkspaces = ["portfolio", "operations", "shorturl"];

/**
 * Extract workspace slug from pathname
 * Examples:
 *   /operations/kpi-dashboard -> operations
 *   /portfolio/formulations -> portfolio
 *   /shorturl -> shorturl
 */
function getWorkspaceSlugFromPath(pathname: string | null): string | null {
  if (!pathname) return null;
  
  // Remove leading slash and split
  const parts = pathname.slice(1).split("/");
  if (parts.length === 0) return null;
  
  const firstSegment = parts[0];
  
  if (knownWorkspaces.includes(firstSegment)) {
    return firstSegment;
  }
  
  return null;
}

/**
 * Get default route for a workspace (first menu item or workspace root)
 * IMPORTANT: Menu items are already filtered by can_access_url RLS policy,
 * so we can safely use the first available item
 */
function getDefaultRouteForWorkspace(workspace: WorkspaceWithMenuItems | null): string {
  if (!workspace) {
    return "/portfolio";
  }
  
  if (!workspace.menu_items || workspace.menu_items.length === 0) {
    return `/${workspace.slug}`;
  }
  
  // Find first menu item in "Overview" group, or first item overall
  // Note: menu_items are already filtered by RLS (can_access_url), so
  // only items the user can access will be here
  const overviewItem = workspace.menu_items.find(
    (item) => item.group_name === "Overview" && item.is_active
  );
  
  if (overviewItem) {
    return overviewItem.url;
  }
  
  // Fallback to first active menu item
  const firstItem = workspace.menu_items.find((item) => item.is_active);
  if (firstItem) {
    return firstItem.url;
  }
  
  // Last resort: workspace root
  return `/${workspace.slug}`;
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null,
  );
  const [workspaceWithMenu, setWorkspaceWithMenu] =
    useState<WorkspaceWithMenuItems | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loadingRef = useRef(false);
  const currentWorkspaceRef = useRef<Workspace | null>(null);
  const pathnameRef = useRef<string | null>(null);

  // Keep refs in sync with state
  useEffect(() => {
    currentWorkspaceRef.current = currentWorkspace;
  }, [currentWorkspace]);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  /**
   * Load workspace with menu items in a single optimized query.
   * Priority: pathname -> localStorage -> "portfolio" fallback
   */
  const loadWorkspace = useCallback(async (workspaceSlug?: string, skipPathnameCheck = false) => {
    // Prevent concurrent loads
    if (loadingRef.current) {
      console.log("[WorkspaceContext] Skipping load - already loading");
      return;
    }
    
    loadingRef.current = true;
    setIsLoading(true);
    
    try {
      let slugToTry = workspaceSlug;
      
      // If no slug provided, try to detect from pathname (unless we're skipping this check)
      if (!slugToTry && !skipPathnameCheck && typeof window !== "undefined") {
        const pathSlug = getWorkspaceSlugFromPath(pathnameRef.current);
        if (pathSlug) {
          slugToTry = pathSlug;
        }
      }
      
      // Try localStorage
      if (!slugToTry && typeof window !== "undefined") {
        const stored = localStorage.getItem("current_workspace");
        if (stored) {
          slugToTry = stored;
        }
      }
      
      // Final fallback
      if (!slugToTry) {
        slugToTry = "portfolio";
      }

      // Don't reload if we already have this workspace loaded
      if (currentWorkspaceRef.current?.slug === slugToTry) {
        loadingRef.current = false;
        setIsLoading(false);
        return;
      }

      // Single optimized query for workspace + menu items
      let workspaceData = await getWorkspaceWithMenuBySlug(slugToTry);

      // Only fallback to portfolio if we're not already on a specific workspace route
      // This prevents redirecting away from valid workspace pages
      if (!workspaceData) {
        if (slugToTry !== "portfolio") {
          // If we're trying to load a specific workspace (from pathname) and it doesn't exist,
          // don't fallback - let the page handle the error (e.g., 404 or permission check)
          console.warn(`Workspace "${slugToTry}" not found`);
          // Only fallback if we're not on a workspace-specific route
          const currentPath = pathnameRef.current || "";
          const isOnWorkspaceRoute = knownWorkspaces.some(ws => currentPath.startsWith(`/${ws}/`));
          
          if (!isOnWorkspaceRoute) {
            // We're not on a workspace route, safe to fallback
            workspaceData = await getWorkspaceWithMenuBySlug("portfolio");
          }
        } else {
          // Last resort: try portfolio
          workspaceData = await getWorkspaceWithMenuBySlug("portfolio");
        }
      }

      if (workspaceData) {
        setCurrentWorkspace(workspaceData);
        setWorkspaceWithMenu(workspaceData);
        if (typeof window !== "undefined") {
          localStorage.setItem("current_workspace", workspaceData.slug);
        }
        
        // IMPORTANT: Do NOT navigate here - let the current page handle routing
        // Navigation should only happen when explicitly switching workspaces via WorkspaceSwitcher
        // This prevents redirect loops when users are on valid pages (like /operations placeholder)
      } else {
        console.error("Could not load any workspace - all fallbacks failed");
      }
    } catch (error) {
      console.error("Failed to load workspace:", error);
      // Only fallback to portfolio if we're not on a workspace-specific route
      // This prevents redirecting away from valid pages
      const currentPath = pathnameRef.current || "";
      const isOnWorkspaceRoute = knownWorkspaces.some(ws => currentPath.startsWith(`/${ws}/`) || currentPath === `/${ws}`);
      
      if (!isOnWorkspaceRoute) {
        // Last resort fallback - but only if we're not on a workspace route
        try {
          const fallback = await getWorkspaceWithMenuBySlug("portfolio");
          if (fallback) {
            setCurrentWorkspace(fallback);
            setWorkspaceWithMenu(fallback);
          }
        } catch (e) {
          console.error("Absolute fallback also failed:", e);
        }
      } else {
        // We're on a workspace route but failed to load - don't redirect, just log
        console.warn("Failed to load workspace but staying on current route:", currentPath);
      }
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
      loadingRef.current = false;
    }
  }, []); // No dependencies - use refs instead

  /**
   * Switch to a different workspace - single optimized query
   * Returns the default route for the workspace
   */
  const switchWorkspace = useCallback(async (slug: string): Promise<string> => {
    setIsLoading(true);
    try {
      const workspaceData = await getWorkspaceWithMenuBySlug(slug);
      if (workspaceData) {
        setCurrentWorkspace(workspaceData);
        setWorkspaceWithMenu(workspaceData);
        if (typeof window !== "undefined") {
          localStorage.setItem("current_workspace", workspaceData.slug);
        }
        // Return the default route for this workspace
        return getDefaultRouteForWorkspace(workspaceData);
      }
      // Fallback if workspace not found
      return `/${slug}`;
    } catch (error) {
      console.error("Failed to switch workspace:", error);
      return `/${slug}`;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshWorkspace = useCallback(async () => {
    if (currentWorkspaceRef.current) {
      await loadWorkspace(currentWorkspaceRef.current.slug);
    } else {
      await loadWorkspace();
    }
  }, [loadWorkspace]);

  // Load workspace on mount (initial load)
  useEffect(() => {
    if (isInitialLoad) {
      loadWorkspace(undefined, false);
    }
  }, [isInitialLoad, loadWorkspace]);

  // Detect workspace from pathname changes and sync workspace context
  // Only run after initial load to avoid conflicts
  // IMPORTANT: This should NOT cause navigation - it only updates the workspace context
  useEffect(() => {
    // Skip if still initializing or already loading
    if (isInitialLoad || isLoading || loadingRef.current) {
      return;
    }
    
    // Skip if no pathname (shouldn't happen, but safety check)
    if (!pathname || typeof window === "undefined") {
      return;
    }
    
    const pathSlug = getWorkspaceSlugFromPath(pathname);
    
    // Only reload if we detect a different workspace
    // This is just for syncing the sidebar/context - it should NOT redirect
    if (pathSlug && currentWorkspaceRef.current?.slug !== pathSlug) {
      // Load the workspace but don't navigate - the user is already on the correct page
      // Use skipPathnameCheck=true to prevent any navigation logic
      loadWorkspace(pathSlug, true).catch((error) => {
        console.error("Failed to sync workspace from pathname:", error);
        // Don't fallback or redirect - let the current page handle it
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Only depend on pathname - don't include loadWorkspace to avoid loops

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      currentWorkspace,
      workspaceWithMenu,
      isLoading,
      switchWorkspace,
      refreshWorkspace,
    }),
    [currentWorkspace, workspaceWithMenu, isLoading, switchWorkspace, refreshWorkspace],
  );

  return (
    <WorkspaceContext.Provider value={contextValue}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
