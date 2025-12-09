"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  Workspace,
  WorkspaceWithMenuItems,
} from "@/lib/actions/workspaces";
import { getWorkspaceWithMenuBySlug } from "@/lib/actions/workspaces";

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  workspaceWithMenu: WorkspaceWithMenuItems | null;
  isLoading: boolean;
  switchWorkspace: (slug: string) => Promise<void>;
  refreshWorkspace: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null,
  );
  const [workspaceWithMenu, setWorkspaceWithMenu] =
    useState<WorkspaceWithMenuItems | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load workspace with menu items in a single optimized query.
   * Tries: provided slug -> localStorage -> "portfolio" fallback
   */
  const loadWorkspace = async (workspaceSlug?: string) => {
    setIsLoading(true);
    try {
      // Determine which slug to try
      const slugToTry =
        workspaceSlug ||
        (typeof window !== "undefined"
          ? localStorage.getItem("current_workspace")
          : null) ||
        "portfolio";

      // Single optimized query for workspace + menu items
      let workspaceData = await getWorkspaceWithMenuBySlug(slugToTry);

      // If the slug wasn't "portfolio" and we got nothing, try portfolio as fallback
      if (!workspaceData && slugToTry !== "portfolio") {
        workspaceData = await getWorkspaceWithMenuBySlug("portfolio");
      }

      if (workspaceData) {
        setCurrentWorkspace(workspaceData);
        setWorkspaceWithMenu(workspaceData);
        if (typeof window !== "undefined") {
          localStorage.setItem("current_workspace", workspaceData.slug);
        }
      } else {
        console.error("Could not load any workspace - all fallbacks failed");
      }
    } catch (error) {
      console.error("Failed to load workspace:", error);
      // Last resort fallback
      try {
        const fallback = await getWorkspaceWithMenuBySlug("portfolio");
        if (fallback) {
          setCurrentWorkspace(fallback);
          setWorkspaceWithMenu(fallback);
        }
      } catch (e) {
        console.error("Absolute fallback also failed:", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Switch to a different workspace - single optimized query
   */
  const switchWorkspace = async (slug: string) => {
    setIsLoading(true);
    try {
      const workspaceData = await getWorkspaceWithMenuBySlug(slug);
      if (workspaceData) {
        setCurrentWorkspace(workspaceData);
        setWorkspaceWithMenu(workspaceData);
        if (typeof window !== "undefined") {
          localStorage.setItem("current_workspace", workspaceData.slug);
        }
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
