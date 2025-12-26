"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useForesightInit } from "@/hooks/use-prefetch-on-intent";
import { useSupabase } from "@/hooks/use-supabase";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { cn } from "@/lib/utils";
import { log } from "@/lib/logger";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { FooterActions } from "./FooterActions";
import { UserMenu, SignInButton } from "./UserMenu";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
} from "@/components/ui/sidebar";
import type { WorkspaceMenuItem } from "@/lib/actions/workspaces";

const iconMap: Record<string, any> = {
  LayoutDashboard: require("lucide-react").LayoutDashboard,
  GitBranch: require("lucide-react").GitBranch,
  FlaskConical: require("lucide-react").FlaskConical,
  Globe: require("lucide-react").Globe,
  FileText: require("lucide-react").FileText,
  TrendingUp: require("lucide-react").TrendingUp,
  DollarSign: require("lucide-react").DollarSign,
  BarChart3: require("lucide-react").BarChart3,
  GitCompare: require("lucide-react").GitCompare,
  Database: require("lucide-react").Database,
  Calculator: require("lucide-react").Calculator,
  Target: require("lucide-react").Target,
  Map: require("lucide-react").Map,
  Shield: require("lucide-react").Shield,
  PieChart: require("lucide-react").PieChart,
  MapPin: require("lucide-react").MapPin,
  Beaker: require("lucide-react").Beaker,
  Ban: require("lucide-react").Ban,
  Settings: require("lucide-react").Settings,
};

function NavItem({
  item,
  isActive,
}: {
  item: WorkspaceMenuItem;
  isActive: boolean;
}) {
  const IconComponent = item.icon
    ? iconMap[item.icon] || iconMap.LayoutDashboard
    : iconMap.LayoutDashboard;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
        <a href={item.url} className="flex items-center gap-2.5">
          <IconComponent className="size-4 shrink-0" />
          <span className="truncate">{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { workspaceWithMenu, isLoading: workspaceLoading } = useWorkspace();
  const supabase = useSupabase();
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        const {
          data: { session },
          error: authError,
        } = await supabase.auth.getSession();
        if (authError) {
          log("[AppSidebar] getSession error:", authError);
        }
        if (mounted) {
          setUser(session?.user ?? null);
        }
      } catch (err) {
        log("[AppSidebar] Auth check failed:", err);
      }
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      log(
        "[AppSidebar] Auth state changed:",
        _event,
        session?.user?.email || "no user",
      );
      if (mounted) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useForesightInit();

  const menuItems = workspaceWithMenu?.menu_items ?? [];

  const menuGroups = useMemo(() => {
    if (!workspaceWithMenu || !menuItems || menuItems.length === 0) {
      return [];
    }

    const grouped = new Map<string, typeof menuItems>();

    menuItems.forEach((item) => {
      if (!grouped.has(item.group_name)) {
        grouped.set(item.group_name, []);
      }
      const groupItems = grouped.get(item.group_name);
      if (groupItems) {
        groupItems.push(item);
      }
    });

    grouped.forEach((items) => {
      items.sort((a, b) => a.display_order - b.display_order);
    });

    const orderedGroups: Array<{
      groupName: string;
      items: typeof menuItems;
    }> = [];
    const groupOrder = [
      "Overview",
      "Market & Strategy",
      "Core Data",
      "Financials",
      "Analysis",
      "Workspace",
      "System",
    ];

    for (const groupName of groupOrder) {
      if (grouped.has(groupName)) {
        const group = grouped.get(groupName);
        if (group) {
          orderedGroups.push({
            groupName,
            items: group,
          });
        }
      }
    }

    grouped.forEach((items, groupName) => {
      if (!groupOrder.includes(groupName)) {
        orderedGroups.push({ groupName, items });
      }
    });

    return orderedGroups;
  }, [workspaceWithMenu, menuItems]);

  const userInitial = user?.email?.charAt(0).toUpperCase() || "U";
  const userName = user?.email?.split("@")[0] || "User";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>

      <SidebarContent>
        {workspaceLoading ? (
          <div className="flex flex-col gap-2 p-3">
            {Array.from({ length: 6 }).map(() => (
              <div
                key={`skeleton-${crypto.randomUUID()}`}
                className="h-9 w-full rounded-md bg-sidebar-accent/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          menuGroups.map((group) => (
            <div key={group.groupName} className="mb-4">
              <div className="px-3 pb-1.5 pt-3">
                <div className="text-xs font-medium uppercase tracking-wide text-sidebar-foreground/40">
                  {group.groupName}
                </div>
              </div>
              <SidebarMenu>
                {group.items.map((item) => (
                  <NavItem
                    key={item.menu_item_id}
                    item={item}
                    isActive={
                      item.url === pathname || pathname?.startsWith(item.url)
                    }
                  />
                ))}
              </SidebarMenu>
            </div>
          ))
        )}
      </SidebarContent>

      <SidebarFooter>
        {user ? (
          <div
            className={cn(
              "flex items-center gap-1.5",
              isCollapsed ? "flex-col" : "flex-row",
            )}
          >
            <UserMenu
              userInitial={userInitial}
              userName={userName}
              isCollapsed={isCollapsed}
            />
            <FooterActions isCollapsed={isCollapsed} />
          </div>
        ) : (
          <div
            className={cn(
              "flex items-center gap-1.5",
              isCollapsed ? "flex-col" : "flex-row",
            )}
          >
            <SignInButton isCollapsed={isCollapsed} />
            <FooterActions isCollapsed={isCollapsed} />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
