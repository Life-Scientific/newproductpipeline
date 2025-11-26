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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useSidebar } from "@/components/ui/sidebar";
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
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
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

  // Loading state
  if (isLoadingWorkspaces || isLoading) {
    return (
      <div className={cn(
        "flex items-center",
        isCollapsed ? "justify-center" : "gap-2"
      )}>
        <div className={cn(
          "flex items-center justify-center rounded-md bg-primary text-primary-foreground animate-pulse",
          isCollapsed ? "h-9 w-9" : "h-8 w-8"
        )}>
          <LayoutDashboard className="h-4 w-4" />
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <div className="h-4 w-24 rounded bg-sidebar-foreground/10 animate-pulse" />
          </div>
        )}
      </div>
    );
  }

  const triggerButton = (
    <Button
      variant="ghost"
      className={cn(
        "transition-all hover:bg-sidebar-accent",
        isCollapsed 
          ? "h-9 w-9 p-0 justify-center" 
          : "w-full justify-start gap-2 h-9 px-2"
      )}
    >
      <div className={cn(
        "flex shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground",
        isCollapsed ? "h-7 w-7" : "h-6 w-6"
      )}>
        <CurrentIcon className={cn(isCollapsed ? "h-4 w-4" : "h-3.5 w-3.5")} />
      </div>
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate text-left text-sm font-medium">
            {currentWorkspace?.name || "Select Workspace"}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </>
      )}
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              {triggerButton}
            </TooltipTrigger>
            <TooltipContent side="right">
              {currentWorkspace?.name || "Select Workspace"}
            </TooltipContent>
          </Tooltip>
        ) : (
          triggerButton
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56" 
        align="start" 
        side="right"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Switch Workspace
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((workspace) => {
          const Icon = getIconComponent(workspace.icon);
          const isActive = currentWorkspace?.workspace_id === workspace.workspace_id;
          
          return (
            <DropdownMenuItem
              key={workspace.workspace_id}
              onClick={() => switchWorkspace(workspace.slug)}
              className={cn(
                "cursor-pointer gap-2",
                isActive && "bg-accent"
              )}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="font-medium">{workspace.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
