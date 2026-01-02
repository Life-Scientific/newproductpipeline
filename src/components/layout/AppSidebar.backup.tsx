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

// Search bar with Cmd+K hint - thoughtfully designed for non-technical users
const SearchBar = memo(function SearchBar({ isCollapsed }: { isCollapsed: boolean }) {
  const router = useRouter();
  const { query, setQuery, results, isSearching, clearSearch } = useSearch({
    debounceMs: 300,
    minQueryLength: 2,
    limit: 20,
  });

  const handleResultClick = (result: typeof results[0]) => {
    if (result.entity_type === "formulation") {
      router.push(`/portfolio/formulations/${result.entity_id}`);
    } else if (result.entity_type === "country") {
      router.push(`/portfolio/countries/${result.entity_id}`);
    } else if (result.entity_type === "reference_product") {
      router.push(`/portfolio/reference`);
    }
    clearSearch();
  };

  const openCommandPalette = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  if (isCollapsed) {
    return null;
  }

  return (
    <div className="relative px-2">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/40 group-focus-within:text-sidebar-foreground/60 transition-colors" />
        <SidebarInput
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={openCommandPalette}
          className="h-9 pl-9 pr-16 text-sm placeholder:text-sidebar-foreground/40 border-sidebar-border/50 focus:border-sidebar-border bg-sidebar-accent/50 hover:bg-sidebar-accent transition-all rounded-lg"
        />
        {query ? (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded bg-sidebar-accent border border-sidebar-border/50 px-1.5 font-mono text-[10px] font-medium text-sidebar-foreground/50 opacity-100 group-hover:opacity-100 transition-opacity">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
      </div>

      {/* Search results dropdown - beautiful and smooth */}
      {query.length >= 2 && (
        <div className="absolute left-2 right-2 top-full z-50 mt-2 max-h-[400px] overflow-hidden rounded-xl border border-sidebar-border/50 bg-sidebar shadow-2xl shadow-black/10 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
          <div className="overflow-y-auto max-h-[400px]">
            {isSearching ? (
              <div className="p-8 text-center">
                <div className="inline-flex h-6 w-6 animate-spin rounded-full border-2 border-sidebar-foreground/20 border-t-sidebar-foreground/60 mb-2" />
                <p className="text-xs text-sidebar-foreground/50">Searching...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <Search className="h-8 w-8 mx-auto mb-2 text-sidebar-foreground/20" />
                <p className="text-sm font-medium text-sidebar-foreground/60">No results found</p>
                <p className="text-xs text-sidebar-foreground/40 mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={`${result.entity_type}-${result.entity_id}`}
                    onClick={() => handleResultClick(result)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-sidebar-accent/80 active:bg-sidebar-accent transition-all group/item border-b border-sidebar-border/30 last:border-0"
                    style={{
                      animationDelay: `${index * 30}ms`,
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sidebar-foreground truncate text-sm group-hover/item:text-primary transition-colors">
                        {result.entity_name}
                      </div>
                      <div className="text-sidebar-foreground/50 truncate text-xs mt-0.5">
                        {result.entity_code}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] uppercase tracking-wide text-sidebar-foreground/30 font-medium px-2 py-1 rounded-md bg-sidebar-accent/50">
                        {result.entity_type === "formulation"
                          ? "Formulation"
                          : result.entity_type === "country"
                          ? "Country"
                          : "Reference"}
                      </span>
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
      {/* Header: Clean and spacious */}
      <SidebarHeader className="gap-3 p-3 border-b border-sidebar-border/50">
        <WorkspaceSwitcher />
        <SearchBar isCollapsed={isCollapsed} />
      </SidebarHeader>

      {/* Content: Perfect spacing and hierarchy */}
      <SidebarContent className="px-2 py-4">
        {workspaceLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map(() => (
              <div
                key={`skeleton-${crypto.randomUUID()}`}
                className="h-9 w-full rounded-lg bg-sidebar-accent/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {menuGroups.map((group) => (
              <div key={group.groupName} className="space-y-2">
                {/* Group header - subtle and elegant */}
                <div className="px-2">
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40 select-none">
                    {group.groupName}
                  </h3>
                </div>

                {/* Group items - clean and spacious */}
                <SidebarMenu className="space-y-1">
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
          </div>
        )}
      </SidebarContent>

      {/* Footer: Elegant and refined */}
      <SidebarFooter className="p-2 border-t border-sidebar-border/50 bg-sidebar-accent/30">
        {user ? (
          <div
            className={cn(
              "flex items-center gap-2",
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
              "flex items-center gap-2",
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
