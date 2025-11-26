"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import {
  User,
  LogOut,
  ChevronUp,
  Settings,
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
  Map as MapIcon,
  Shield,
  PieChart,
  MapPin,
  Beaker,
  Ban,
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSupabase } from "@/hooks/use-supabase";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import type { WorkspaceMenuItem } from "@/lib/actions/workspaces";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

// Icon map for dynamic icon lookup - only includes icons actually used in menus
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
  Map: MapIcon,
  Shield,
  PieChart,
  MapPin,
  Beaker,
  Ban,
  Settings,
};

// Helper function to get icon component from string name
function getIconComponent(iconName: string | null): LucideIcon {
  if (!iconName) return LayoutDashboard;
  return iconMap[iconName] || LayoutDashboard;
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useSupabase();
  const { currentWorkspace, workspaceWithMenu, isLoading: workspaceLoading } = useWorkspace();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial user state
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth state changes instead of polling
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(url);
  };

  // Get menu items from database (respects is_active flag)
  const menuGroups = useMemo(() => {
    if (!workspaceWithMenu || !workspaceWithMenu.menu_items) return [];
    
    // Group items by group_name
    const grouped = new Map<string, WorkspaceMenuItem[]>();
    
    workspaceWithMenu.menu_items.forEach((item) => {
      if (!grouped.has(item.group_name)) {
        grouped.set(item.group_name, []);
      }
      grouped.get(item.group_name)!.push(item);
    });
    
    // Sort items within each group by display_order
    grouped.forEach((items) => {
      items.sort((a, b) => a.display_order - b.display_order);
    });
    
    // Return groups in the desired order
    const orderedGroups: Array<{ groupName: string; items: WorkspaceMenuItem[] }> = [];
    const groupOrder = [
      "Overview",
      "Market & Strategy",
      "Core Data",
      "Financials",
      "Analysis",
      "System",
    ];
    
    for (const groupName of groupOrder) {
      if (grouped.has(groupName)) {
        orderedGroups.push({
          groupName,
          items: grouped.get(groupName)!,
        });
      }
    }
    
    // Add any remaining groups not in the order list
    grouped.forEach((items, groupName) => {
      if (!groupOrder.includes(groupName)) {
        orderedGroups.push({ groupName, items });
      }
    });
    
    return orderedGroups;
  }, [workspaceWithMenu]);

  return (
    <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="border-b p-0">
          <div className="flex items-start gap-1 px-1.5 py-2 min-w-0">
            <WorkspaceSwitcher />
            <SidebarTrigger className="shrink-0 mt-0.5" />
          </div>
        </SidebarHeader>
      <SidebarContent className="gap-2">
        {workspaceLoading ? (
          <div className="p-4 text-sm text-muted-foreground">Loading menu...</div>
        ) : (
          menuGroups.map((group) => (
            <SidebarGroup key={group.groupName}>
              <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70">
                {group.groupName}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    // Get icon component from string name
                    const IconComponent = getIconComponent(item.icon);
                    return (
                      <SidebarMenuItem key={item.menu_item_id}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(item.url)}
                          tooltip={item.title}
                          size="default"
                        >
                          <Link href={item.url}>
                            <IconComponent className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-3 px-3 hover:bg-sidebar-accent/80 transition-all duration-200 rounded-lg group"
              >
                {/* Avatar with online indicator */}
                <div className="relative shrink-0">
                  <Avatar className="h-9 w-9 transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-sm font-semibold shadow-sm">
                      {user.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online status indicator */}
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-sidebar" />
                </div>
                
                {/* User info */}
                <div className="flex flex-1 flex-col items-start text-left min-w-0">
                  <span className="truncate font-semibold text-sm text-sidebar-foreground max-w-full">
                    {user.email?.split("@")[0] || "User"}
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/50 max-w-full">
                    {currentWorkspace?.name || "Loading..."}
                  </span>
                </div>
                
                {/* Chevron with animation */}
                <ChevronUp className="ml-auto h-4 w-4 text-sidebar-foreground/40 shrink-0 transition-transform duration-200 group-hover:text-sidebar-foreground/70 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-64 p-2" 
              align="end" 
              side="right"
              sideOffset={8}
            >
              {/* Header section */}
              <div className="px-2 py-3 mb-2 rounded-md bg-muted/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-sm font-semibold">
                      {user.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {user.email?.split("@")[0] || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                {currentWorkspace && (
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      Workspace: <span className="font-medium text-foreground">{currentWorkspace.name}</span>
                    </p>
                  </div>
                )}
              </div>
              
              <DropdownMenuItem asChild className="cursor-pointer rounded-md">
                <Link href="/settings" className="flex items-center gap-2 py-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-2" />
              
              <DropdownMenuItem 
                onClick={handleSignOut} 
                className="cursor-pointer rounded-md text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

