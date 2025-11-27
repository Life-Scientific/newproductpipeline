"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import {
  User,
  LogOut,
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
  PanelLeftClose,
  PanelLeft,
  Palette,
  Check,
  Sparkles,
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
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSupabase } from "@/hooks/use-supabase";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useTheme, DARK_THEME_SLUGS } from "@/contexts/ThemeContext";
import { useForesightInit, usePrefetchOnIntent } from "@/hooks/use-prefetch-on-intent";
import type { WorkspaceMenuItem } from "@/lib/actions/workspaces";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { cn } from "@/lib/utils";
import { routes, WORKSPACE_BASE } from "@/lib/routes";

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
  Sparkles,
};

// Theme color previews for visual selection
const themeColors: Record<string, { bg: string; primary: string; accent: string; sidebar?: string }> = {
  light: { bg: "#ffffff", primary: "#09090b", accent: "#f4f4f5", sidebar: "#f4f4f5" },
  dark: { bg: "#09090b", primary: "#fafafa", accent: "#27272a", sidebar: "#09090b" },
  "prof-blue": { bg: "#fdfdfe", primary: "#4a6ee0", accent: "#e8edfc", sidebar: "#f8f9fc" },
  "nature-green": { bg: "#fcfdfc", primary: "#2e7d32", accent: "#e8f5e9", sidebar: "#f6f9f6" },
  "high-contrast": { bg: "#ffffff", primary: "#4b0082", accent: "#f0e6ff", sidebar: "#000000" },
  "dark-exec": { bg: "#1a1a1a", primary: "#d4af37", accent: "#2b2b2b", sidebar: "#111111" },
  "joshs-theme": { bg: "#0a0f0a", primary: "#00ff41", accent: "#0f150f", sidebar: "#050805" },
  bloomberg: { bg: "#000000", primary: "#ff9500", accent: "#121212", sidebar: "#080808" },
};

// Helper function to get icon component from string name
function getIconComponent(iconName: string | null): LucideIcon {
  if (!iconName) return LayoutDashboard;
  return iconMap[iconName] || LayoutDashboard;
}

// NavItem component with predictive prefetching
function NavItem({
  item,
  isActive,
}: {
  item: WorkspaceMenuItem;
  isActive: boolean;
}) {
  const IconComponent = getIconComponent(item.icon);
  const prefetchRef = usePrefetchOnIntent(item.url);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Combine refs - attach prefetch tracking to the link element
  const setRefs = useCallback(
    (node: HTMLAnchorElement | null) => {
      linkRef.current = node;
      if (node) {
        prefetchRef(node);
      }
    },
    [prefetchRef]
  );

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
        <Link ref={setRefs} href={item.url}>
          <IconComponent className="size-4" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useSupabase();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { currentWorkspace, workspaceWithMenu, isLoading: workspaceLoading } = useWorkspace();
  const { currentTheme, availableThemes, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);

  // Initialize ForesightJS for predictive prefetching
  useForesightInit();

  useEffect(() => {
    // Get initial user state from session (no network request)
    // We use getSession() instead of getUser() to avoid redundant auth calls
    // The middleware already validates auth on every request
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth state changes - this handles login/logout reactively
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
    router.push("/");
    router.refresh();
  };

  const isActive = (url: string) => {
    if (url === WORKSPACE_BASE) {
      return pathname === WORKSPACE_BASE;
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

  const userInitial = user?.email?.charAt(0).toUpperCase() || "U";
  const userName = user?.email?.split("@")[0] || "User";

  // Separate light and dark themes
  const lightThemes = availableThemes.filter(t => !DARK_THEME_SLUGS.includes(t.slug));
  const darkThemes = availableThemes.filter(t => DARK_THEME_SLUGS.includes(t.slug));

  // Collapse/Expand button component for reuse
  const CollapseButton = ({ className }: { className?: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8 shrink-0", className)}
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {isCollapsed ? "Expand" : "Collapse"} <kbd className="ml-1 text-[10px] opacity-60">⌘B</kbd>
      </TooltipContent>
    </Tooltip>
  );

  // Theme swatch component - improved with circular design
  const ThemeSwatch = ({ slug, isActive }: { slug: string; isActive: boolean }) => {
    const colors = themeColors[slug] || themeColors.light;
    const isDark = DARK_THEME_SLUGS.includes(slug);
    return (
      <div 
        className={cn(
          "relative h-6 w-6 rounded-full border-2 overflow-hidden shrink-0 transition-all",
          isActive 
            ? "ring-2 ring-primary ring-offset-1 border-primary" 
            : "border-border hover:border-primary/50"
        )}
        style={{ backgroundColor: colors.bg }}
      >
        {/* Sidebar preview - circular segment */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1/3 rounded-l-full"
          style={{ backgroundColor: colors.sidebar || colors.accent }}
        />
        {/* Primary accent bar - circular at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-2.5 rounded-b-full"
          style={{ backgroundColor: colors.primary }}
        />
        {/* Dark theme indicator - circular dot */}
        {isDark && (
          <div className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-foreground/20" />
        )}
      </div>
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>

      <SidebarContent>
        {workspaceLoading ? (
          <div className="flex flex-col gap-1 p-2">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "rounded-lg bg-sidebar-accent/50 animate-pulse",
                  isCollapsed ? "h-9 w-9 mx-auto" : "h-9 w-full"
                )} 
              />
            ))}
          </div>
        ) : (
          menuGroups.map((group, groupIndex) => (
            <SidebarGroup key={group.groupName}>
              <SidebarGroupLabel>
                {group.groupName}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <NavItem
                      key={item.menu_item_id}
                      item={item}
                      isActive={isActive(item.url)}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              {groupIndex < menuGroups.length - 1 && isCollapsed && (
                <SidebarSeparator className="my-1" />
              )}
            </SidebarGroup>
          ))
        )}
      </SidebarContent>

      <SidebarFooter>
        {user ? (
          <div className={cn(
            "flex items-center gap-1",
            isCollapsed ? "flex-col" : "flex-row"
          )}>
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-all",
                    isCollapsed 
                      ? "h-9 w-9 p-0" 
                      : "flex-1 h-9 justify-start gap-2 px-2"
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar className={cn(isCollapsed ? "h-7 w-7" : "h-6 w-6")}>
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-[10px] font-semibold">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500 ring-1 ring-sidebar" />
                  </div>
                  {!isCollapsed && (
                    <span className="flex-1 truncate text-left text-sm font-medium">
                      {userName}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-64" 
                align={isCollapsed ? "center" : "start"} 
                side="right"
                sideOffset={8}
              >
                {/* User info header */}
                <div className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xs font-semibold">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-medium truncate">{userName}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <DropdownMenuSeparator />

                {/* Theme Submenu - Improved */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    <Palette className="mr-2 h-4 w-4" />
                    <span className="flex-1">Theme</span>
                    <ThemeSwatch slug={currentTheme?.slug || "light"} isActive={false} />
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-64 max-h-[400px] overflow-y-auto">
                      {/* Light Themes */}
                      {lightThemes.length > 0 && (
                        <>
                          <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-2 py-1.5">
                            Light Themes
                          </DropdownMenuLabel>
                          {lightThemes.map((theme) => {
                            const isThemeActive = currentTheme?.slug === theme.slug;
                            return (
                              <DropdownMenuItem
                                key={theme.theme_id}
                                onClick={() => setTheme(theme.slug)}
                                className={cn(
                                  "cursor-pointer gap-3 px-2 py-2.5 transition-colors",
                                  isThemeActive && "bg-accent"
                                )}
                              >
                                <ThemeSwatch slug={theme.slug} isActive={isThemeActive} />
                                <span className="flex-1 text-sm font-medium">{theme.name}</span>
                                {isThemeActive && (
                                  <Check className="h-4 w-4 text-primary shrink-0" />
                                )}
                              </DropdownMenuItem>
                            );
                          })}
                        </>
                      )}
                      
                      {lightThemes.length > 0 && darkThemes.length > 0 && (
                        <DropdownMenuSeparator className="my-1" />
                      )}
                      
                      {/* Dark Themes */}
                      {darkThemes.length > 0 && (
                        <>
                          <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-2 py-1.5">
                            Dark Themes
                          </DropdownMenuLabel>
                          {darkThemes.map((theme) => {
                            const isThemeActive = currentTheme?.slug === theme.slug;
                            return (
                              <DropdownMenuItem
                                key={theme.theme_id}
                                onClick={() => setTheme(theme.slug)}
                                className={cn(
                                  "cursor-pointer gap-3 px-2 py-2.5 transition-colors",
                                  isThemeActive && "bg-accent"
                                )}
                              >
                                <ThemeSwatch slug={theme.slug} isActive={isThemeActive} />
                                <span className="flex-1 text-sm font-medium">{theme.name}</span>
                                {isThemeActive && (
                                  <Check className="h-4 w-4 text-primary shrink-0" />
                                )}
                              </DropdownMenuItem>
                            );
                          })}
                        </>
                      )}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={routes.settings()} className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={handleSignOut} 
                  className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Collapse Button - Always in footer, next to user */}
            <CollapseButton />
          </div>
        ) : (
          <div className={cn(
            "flex items-center gap-1",
            isCollapsed ? "flex-col" : "flex-row"
          )}>
            <Button
              variant="outline"
              size={isCollapsed ? "icon" : "default"}
              className={cn(isCollapsed ? "h-9 w-9" : "flex-1 h-9")}
              onClick={() => router.push("/login")}
            >
              {isCollapsed ? <User className="h-4 w-4" /> : "Sign In"}
            </Button>
            <CollapseButton />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
