"use client";

import { useEffect, useMemo, useState, memo, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  useSidebar,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useForesightInit } from "@/hooks/use-prefetch-on-intent";
import { useSupabase } from "@/hooks/use-supabase";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { cn } from "@/lib/utils";
import { log } from "@/lib/logger";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { FooterActions } from "./FooterActions";
import { UserMenu, SignInButton } from "./UserMenu";
import type { WorkspaceMenuItem } from "@/lib/actions/workspaces";
import { useSearch } from "@/hooks/use-search";
import { Search, X, ChevronRight } from "lucide-react";

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
  MessageSquare: require("lucide-react").MessageSquare,
};

// Search bar
const SearchBar = memo(function SearchBar({ isCollapsed }: { isCollapsed: boolean }) {
  const { query, setQuery, results, isSearching, clearSearch } = useSearch({
    debounceMs: 300,
    minQueryLength: 2,
    limit: 20,
  });

  const handleResultClick = useCallback((entityType: string, entityId: string) => {
    if (entityType === "formulation") {
      window.location.href = `/portfolio/formulations/${entityId}`;
    } else if (entityType === "country") {
      window.location.href = `/portfolio/countries/${entityId}`;
    } else if (entityType === "reference_product") {
      window.location.href = `/portfolio/reference`;
    }
    clearSearch();
  }, [clearSearch]);

  const openCommandPalette = useCallback(() => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  }, []);

  if (isCollapsed) {
    return null;
  }

  return (
    <div className="relative px-3 py-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/40" />
        <SidebarInput
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={openCommandPalette}
          className="h-8 pl-9 pr-12 text-sm bg-sidebar-accent/30 border-0 rounded-md placeholder:text-sidebar-foreground/40"
        />
        {query ? (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sidebar-foreground/40 hover:text-sidebar-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-sidebar-border/30 bg-sidebar px-1 font-mono text-[10px] text-sidebar-foreground/50">
            ⌘K
          </kbd>
        )}
      </div>

      {query.length >= 2 && (
        <div className="absolute left-3 right-3 top-full z-[30] mt-1 overflow-hidden rounded-md border border-sidebar-border/40 bg-sidebar shadow-lg">
          <div className="overflow-y-auto max-h-[300px]">
            {isSearching ? (
              <div className="p-4 text-center text-xs text-sidebar-foreground/50">
                Searching...
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-xs text-sidebar-foreground/50">
                No results found
              </div>
            ) : (
              <div className="py-1">
                {results.map((result) => (
                  <button
                    key={`${result.entity_type}-${result.entity_id}`}
                    onClick={() => handleResultClick(result.entity_type, result.entity_id)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-sidebar-accent/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sidebar-foreground truncate">
                        {result.entity_name}
                      </div>
                      <div className="text-sidebar-foreground/50 truncate text-xs">
                        {result.entity_code}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

// Thin nav item (Linear style)
const NavItem = memo(function NavItem({
  item,
  isActive,
  indent = 0,
}: {
  item: WorkspaceMenuItem;
  isActive: boolean;
  indent?: number;
}) {
  const IconComponent = item.icon
    ? iconMap[item.icon] || iconMap.LayoutDashboard
    : iconMap.LayoutDashboard;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
        size="sm"
        className="h-6 py-1 px-1.5 gap-1.5 text-[13px]"
      >
        <a href={item.url} className="flex items-center">
          <IconComponent className="shrink-0 opacity-60 h-3.5 w-3.5" />
          <span className="truncate">{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

// Category group header (non-clickable)
const NavGroup = memo(function NavGroup({
  groupName,
  items,
  pathname,
}: {
  groupName: string;
  items: WorkspaceMenuItem[];
  pathname: string | null;
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className={cn(isCollapsed && "mb-3")}>
      {!isCollapsed && (
        <div className="px-1 py-0.5 text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-wide">
          {groupName}
        </div>
      )}
      <SidebarMenu className={cn(isCollapsed ? "space-y-1" : "space-y-0.5")}>
        {items.map((item) => {
          // Exact match OR direct child detail page (for list pages only)
          // Workspace root pages (1 segment) should only match exactly
          // This prevents /portfolio from matching /portfolio/formulations
          // but allows /portfolio/formulations to match /portfolio/formulations/123
          const itemSegments = item.url.split('/').filter(Boolean).length;
          const pathSegments = pathname?.split('/').filter(Boolean).length ?? 0;
          const isWorkspaceRoot = itemSegments <= 1;
          const isDirectChild = !isWorkspaceRoot && pathSegments === itemSegments + 1 && (pathname?.startsWith(item.url + '/') ?? false);
          const isActive = pathname === item.url || isDirectChild;

          return (
            <NavItem
              key={item.menu_item_id}
              item={item}
              isActive={isActive}
              indent={0}
            />
          );
        })}
      </SidebarMenu>
    </div>
  );
});

// Main sidebar component
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

  const menuGroups = useMemo(() => {
    if (!workspaceWithMenu?.menu_items) return [];

    const grouped = new Map<string, WorkspaceMenuItem[]>();

    workspaceWithMenu.menu_items.forEach((item) => {
      if (!grouped.has(item.group_name)) {
        grouped.set(item.group_name, []);
      }
      grouped.get(item.group_name)?.push(item);
    });

    grouped.forEach((items) => {
      items.sort((a, b) => a.display_order - b.display_order);
    });

    const groupOrder = [
      "Overview",
      "Market & Strategy",
      "Core Data",
      "Financials",
      "Analysis",
      "Workspace",
      "System",
    ];

    const orderedGroups: Array<{ groupName: string; items: WorkspaceMenuItem[] }> = [];

    for (const groupName of groupOrder) {
      const items = grouped.get(groupName);
      if (items) {
        orderedGroups.push({ groupName, items });
      }
    }

    grouped.forEach((items, groupName) => {
      if (!groupOrder.includes(groupName)) {
        orderedGroups.push({ groupName, items });
      }
    });

    return orderedGroups;
  }, [workspaceWithMenu?.menu_items]);

  const userInitial = user?.email?.charAt(0).toUpperCase() || "U";
  const userName = user?.email?.split("@")[0] || "User";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/50">
        <WorkspaceSwitcher />
        <SearchBar isCollapsed={isCollapsed} />
      </SidebarHeader>

      <SidebarContent className="px-1.5 py-1.5">
        {workspaceLoading ? (
          <div className="flex flex-col gap-0.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-full rounded bg-sidebar-accent/20 animate-pulse"
                style={{ height: '24px' }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {menuGroups.map((group) => (
              <NavGroup
                key={group.groupName}
                groupName={group.groupName}
                items={group.items}
                pathname={pathname}
              />
            ))}
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-2">
        {user ? (
          <div
            className={cn(
              "flex items-center gap-1.5",
              isCollapsed ? "flex-col" : "flex-row"
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
              isCollapsed ? "flex-col" : "flex-row"
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

export const AppSidebar = memo(AppSidebarComponent);
