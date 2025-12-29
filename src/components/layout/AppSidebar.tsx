"use client";

import { useEffect, useMemo, useState, memo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
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
import { useSearch } from "@/hooks/use-search";
import { Search, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

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

// Search bar component
const SearchBar = memo(function SearchBar({ isCollapsed }: { isCollapsed: boolean }) {
  const router = useRouter();
  const { query, setQuery, results, isSearching, clearSearch } = useSearch({
    debounceMs: 300,
    minQueryLength: 2,
    limit: 20,
  });

  const handleResultClick = (result: typeof results[0]) => {
    // Navigate based on entity type
    if (result.entity_type === "formulation") {
      router.push(`/portfolio/formulations/${result.entity_id}`);
    } else if (result.entity_type === "country") {
      router.push(`/portfolio/countries/${result.entity_id}`);
    } else if (result.entity_type === "reference_product") {
      router.push(`/portfolio/reference`);
    }
    clearSearch();
  };

  if (isCollapsed) {
    return null;
  }

  return (
    <div className="relative px-2 pb-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-sidebar-foreground/50" />
        <SidebarInput
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-8 pl-8 pr-8 text-xs"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-2.5 top-2.5 text-sidebar-foreground/50 hover:text-sidebar-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {query.length >= 2 && (
        <div className="absolute left-2 right-2 top-full z-50 mt-1 max-h-[300px] overflow-y-auto rounded-lg border border-sidebar-border bg-sidebar shadow-lg">
          {isSearching ? (
            <div className="p-3 text-center text-xs text-sidebar-foreground/50">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="p-3 text-center text-xs text-sidebar-foreground/50">
              No results found
            </div>
          ) : (
            <div className="py-1">
              {results.map((result) => (
                <button
                  key={`${result.entity_type}-${result.entity_id}`}
                  onClick={() => handleResultClick(result)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs hover:bg-sidebar-accent transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sidebar-foreground truncate">
                      {result.entity_code}
                    </div>
                    <div className="text-sidebar-foreground/60 truncate">
                      {result.entity_name}
                    </div>
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-sidebar-foreground/40 shrink-0">
                    {result.entity_type === "formulation"
                      ? "Form"
                      : result.entity_type === "country"
                      ? "Country"
                      : "Ref"}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

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
        <a href={item.url} className="flex items-center gap-2">
          <IconComponent className="size-4 shrink-0" />
          <span className="truncate">{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

// Unwrapped component for memoization
function AppSidebarComponent() {
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
      <SidebarHeader className="gap-0">
        <WorkspaceSwitcher />
        <SearchBar isCollapsed={isCollapsed} />
      </SidebarHeader>

      <SidebarContent>
        {workspaceLoading ? (
          <div className="flex flex-col gap-1.5 p-2">
            {Array.from({ length: 6 }).map(() => (
              <div
                key={`skeleton-${crypto.randomUUID()}`}
                className="h-8 w-full rounded-md bg-sidebar-accent/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {menuGroups.map((group) => (
              <div key={group.groupName} className="mb-3">
                <div className="px-3 pb-1 pt-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
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
            ))}

            {/* Settings button - relocated from footer */}
            {!isCollapsed && (
              <div className="mt-auto px-2 pb-2">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings">
                      <a href={routes.settings()} className="flex items-center gap-2">
                        <Settings className="size-4 shrink-0" />
                        <span className="truncate">Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            )}
          </>
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

// Export memoized version to prevent unnecessary re-renders
export const AppSidebar = memo(AppSidebarComponent);
