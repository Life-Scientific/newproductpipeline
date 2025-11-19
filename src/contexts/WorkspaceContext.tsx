"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Workspace, WorkspaceWithMenuItems } from "@/lib/actions/workspaces";
import { getWorkspaceBySlug, getUserDefaultWorkspace, getWorkspaceWithMenuItems } from "@/lib/actions/workspaces";

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  workspaceWithMenu: WorkspaceWithMenuItems | null;
  isLoading: boolean;
  switchWorkspace: (slug: string) => Promise<void>;
  refreshWorkspace: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [workspaceWithMenu, setWorkspaceWithMenu] = useState<WorkspaceWithMenuItems | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadWorkspace = async (workspaceSlug?: string) => {
    setIsLoading(true);
    try {
      let workspace: Workspace | null = null;
      
      if (workspaceSlug) {
        workspace = await getWorkspaceBySlug(workspaceSlug);
      } else {
        // Try to get from localStorage first (only in browser)
        if (typeof window !== "undefined") {
          const storedSlug = localStorage.getItem("current_workspace");
          if (storedSlug) {
            workspace = await getWorkspaceBySlug(storedSlug);
          }
        }
        
        // If not found or no stored workspace, get user default
        if (!workspace) {
          workspace = await getUserDefaultWorkspace();
        }
      }
      
      if (!workspace) {
        // Fallback to portfolio
        workspace = await getWorkspaceBySlug("portfolio");
      }
      
      if (workspace) {
        setCurrentWorkspace(workspace);
        if (typeof window !== "undefined") {
          localStorage.setItem("current_workspace", workspace.slug);
        }
        
        // Load menu items
        const workspaceWithMenuData = await getWorkspaceWithMenuItems(workspace.workspace_id);
        setWorkspaceWithMenu(workspaceWithMenuData);
      }
    } catch (error) {
      console.error("Failed to load workspace:", error);
      // Fallback to portfolio on error
      const fallback = await getWorkspaceBySlug("portfolio");
      if (fallback) {
        setCurrentWorkspace(fallback);
        const fallbackWithMenu = await getWorkspaceWithMenuItems(fallback.workspace_id);
        setWorkspaceWithMenu(fallbackWithMenu);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchWorkspace = async (slug: string) => {
    setIsLoading(true);
    try {
      const workspace = await getWorkspaceBySlug(slug);
      if (workspace) {
        setCurrentWorkspace(workspace);
        if (typeof window !== "undefined") {
          localStorage.setItem("current_workspace", workspace.slug);
        }
        
        const workspaceWithMenuData = await getWorkspaceWithMenuItems(workspace.workspace_id);
        setWorkspaceWithMenu(workspaceWithMenuData);
        
        // Optionally redirect to workspace root or keep current page
        // For now, we'll keep the current page
      }
    } catch (error) {
      console.error("Failed to switch workspace:", error);
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

  useEffect(() => {
    loadWorkspace();
  }, []);

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

