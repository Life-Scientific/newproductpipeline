"use client";

import { useEffect, useState } from "react";
import { ChevronDown, LayoutDashboard } from "lucide-react";
import * as Icons from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { getWorkspaces, type Workspace } from "@/lib/actions/workspaces";
import { cn } from "@/lib/utils";

// Helper function to get icon component from string name
function getIconComponent(iconName: string | null) {
  if (!iconName) return LayoutDashboard;
  const IconComponent = (Icons as Record<string, React.ComponentType<any>>)[iconName];
  return IconComponent || LayoutDashboard;
}

export function WorkspaceSwitcher() {
  const { currentWorkspace, switchWorkspace, isLoading } = useWorkspace();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(true);

  useEffect(() => {
    async function loadWorkspaces() {
      try {
        const data = await getWorkspaces();
        setWorkspaces(data);
      } catch (error) {
        console.error("Failed to load workspaces:", error);
      } finally {
        setIsLoadingWorkspaces(false);
      }
    }
    loadWorkspaces();
  }, []);

  const CurrentIcon = currentWorkspace
    ? getIconComponent(currentWorkspace.icon)
    : LayoutDashboard;

  if (isLoadingWorkspaces || isLoading) {
    return (
      <div className="flex items-center gap-2 px-2 py-3">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
          <LayoutDashboard className="h-4 w-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 h-auto p-2.5 hover:bg-sidebar-accent"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shrink-0">
            <CurrentIcon className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {currentWorkspace?.name || "Select Workspace"}
            </span>
            <span className="truncate text-xs text-sidebar-foreground/70">
              Life Scientific
            </span>
          </div>
          <ChevronDown className="ml-auto h-4 w-4 text-sidebar-foreground/50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" side="right">
        <DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((workspace) => {
          const Icon = getIconComponent(workspace.icon);
          const isActive = currentWorkspace?.workspace_id === workspace.workspace_id;
          
          return (
            <DropdownMenuItem
              key={workspace.workspace_id}
              onClick={() => switchWorkspace(workspace.slug)}
              className={cn(
                "cursor-pointer",
                isActive && "bg-accent"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{workspace.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

