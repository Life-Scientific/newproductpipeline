"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
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
 */
function getDefaultRouteForWorkspace(workspace: WorkspaceWithMenuItems | null): string {
  if (!workspace) {
    return "/portfolio";
  }
  
  if (!workspace.menu_items || workspace.menu_items.length === 0) {
    return `/${workspace.slug}`;
  }
  
  // Find first menu item in "Overview" group, or first item overall
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
      const currentPath = pathnameRef.current || "";
      console.log("[WorkspaceContext] loadWorkspace called", {
        workspaceSlug,
        skipPathnameCheck,
        currentPath,
        currentWorkspace: currentWorkspaceRef.current?.slug,
      });
      
      let slugToTry = workspaceSlug;
      
      // If no slug provided, try to detect from pathname (unless we're skipping this check)
      if (!slugToTry && !skipPathnameCheck && typeof window !== "undefined") {
        const pathSlug = getWorkspaceSlugFromPath(pathnameRef.current);
        console.log("[WorkspaceContext] Detected pathname slug:", pathSlug);
        if (pathSlug) {
          slugToTry = pathSlug;
        }
      }
      
      // Try localStorage
      if (!slugToTry && typeof window !== "undefined") {
        const stored = localStorage.getItem("current_workspace");
        console.log("[WorkspaceContext] localStorage workspace:", stored);
        if (stored) {
          slugToTry = stored;
        }
      }
      
      // Final fallback
      if (!slugToTry) {
        slugToTry = "portfolio";
        console.log("[WorkspaceContext] Using fallback:", slugToTry);
      }

      console.log("[WorkspaceContext] Attempting to load workspace:", slugToTry);

      // Don't reload if we already have this workspace loaded
      if (currentWorkspaceRef.current?.slug === slugToTry) {
        console.log("[WorkspaceContext] Already have this workspace loaded, skipping");
        loadingRef.current = false;
        setIsLoading(false);
        return;
      }

      // Single optimized query for workspace + menu items
      let workspaceData = await getWorkspaceWithMenuBySlug(slugToTry);
      console.log("[WorkspaceContext] Workspace data loaded:", workspaceData ? { slug: workspaceData.slug, menuItems: workspaceData.menu_items?.length } : null);

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
        console.log("[WorkspaceContext] Setting workspace:", workspaceData.slug);
        setCurrentWorkspace(workspaceData);
        setWorkspaceWithMenu(workspaceData);
        if (typeof window !== "undefined") {
          localStorage.setItem("current_workspace", workspaceData.slug);
        }
      } else {
        console.error("[WorkspaceContext] Could not load any workspace - all fallbacks failed");
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
  const switchWorkspace = async (slug: string): Promise<string> => {
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
  };

  const refreshWorkspace = async () => {
    if (currentWorkspace) {
      await loadWorkspace(currentWorkspace.slug);
    } else {
      await loadWorkspace();
    }
  };

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
    if (!isInitialLoad && pathname && typeof window !== "undefined" && !isLoading && !loadingRef.current) {
      const pathSlug = getWorkspaceSlugFromPath(pathname);
      console.log("[WorkspaceContext] Pathname changed:", {
        pathname,
        pathSlug,
        currentWorkspace: currentWorkspaceRef.current?.slug,
        isLoading,
        loadingRef: loadingRef.current,
      });
      
      // Only reload if we detect a different workspace and we're not already loading
      // This is just for syncing the sidebar/context - it should NOT redirect
      if (pathSlug && currentWorkspaceRef.current?.slug !== pathSlug) {
        console.log("[WorkspaceContext] Syncing workspace from pathname:", pathSlug);
        // Load the workspace but don't navigate - the user is already on the correct page
        loadWorkspace(pathSlug, true).catch((error) => {
          console.error("[WorkspaceContext] Failed to sync workspace from pathname:", error);
          // Don't fallback or redirect - let the current page handle it
        });
      }
    }
  }, [pathname, isInitialLoad, isLoading, loadWorkspace]);

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaceWithMenu,
        isLoading,
        switchWorkspace,
        refreshWorkspace,
      }}
    >
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
