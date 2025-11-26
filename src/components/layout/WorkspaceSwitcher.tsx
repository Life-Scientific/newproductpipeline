"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  GitBranch,
  FlaskConical,
  Globe,
  FileText,
  TrendingUp,
  DollarSign,
  BarChart3,
  GitCompare,
  Database,
  Calculator,
  Target,
  Map,
  Shield,
  PieChart,
  MapPin,
  Beaker,
  Ban,
  type LucideIcon,
} from "lucide-react";
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

// Icon map for dynamic icon lookup - only includes icons actually used in workspaces
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  GitBranch,
  FlaskConical,
  Globe,
  FileText,
  TrendingUp,
  DollarSign,
  BarChart3,
  GitCompare,
  Database,
  Calculator,
  Target,
  Map,
  Shield,
  PieChart,
  MapPin,
  Beaker,
  Ban,
};

// Helper function to get icon component from string name
function getIconComponent(iconName: string | null): LucideIcon {
  if (!iconName) return LayoutDashboard;
  return iconMap[iconName] || LayoutDashboard;
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
      <div className="flex items-start gap-1.5 flex-1 min-w-0 overflow-hidden px-1.5 py-1.5">
        <div className="flex aspect-square size-6 items-center justify-center rounded-md bg-primary text-primary-foreground shrink-0 mt-0.5">
          <LayoutDashboard className="h-3 w-3" />
        </div>
        <div className="flex-1 min-w-0 overflow-hidden text-left leading-tight">
          <div className="truncate text-xs font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full min-w-0 justify-start gap-1.5 h-auto p-1.5 hover:bg-sidebar-accent"
          >
            <div className="flex aspect-square size-5 items-center justify-center rounded bg-primary text-primary-foreground shrink-0">
              <CurrentIcon className="h-2.5 w-2.5" />
            </div>
            <div className="flex-1 min-w-0 text-left leading-tight py-0.5">
              <div className="truncate text-xs font-semibold leading-tight">
                {currentWorkspace?.name || "Select Workspace"}
              </div>
              <div className="truncate text-[10px] text-sidebar-foreground/60 leading-tight mt-0.5">
                Life Scientific
              </div>
            </div>
            <ChevronDown className="h-3 w-3 text-sidebar-foreground/50 shrink-0 self-start mt-0.5" />
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
    </div>
  );
}

