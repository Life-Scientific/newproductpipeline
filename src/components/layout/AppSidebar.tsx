"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";
import {
  User,
  LogOut,
  ChevronUp,
  Settings,
  Sparkles,
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
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Helper function to get icon component from string name
function getIconComponent(iconName: string | null): LucideIcon {
  if (!iconName) return Icons.LayoutDashboard;
  const IconComponent = (Icons as Record<string, any>)[iconName];
  return IconComponent || Icons.LayoutDashboard;
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useSupabase();
  const { currentWorkspace, workspaceWithMenu, isLoading: workspaceLoading } = useWorkspace();
  const [user, setUser] = useState<any>(null);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent dropdown from opening
    
    setClickCount((prev) => {
      const newCount = prev + 1;
      
      // Reset timeout on each click
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      
      // If 5 clicks, trigger easter egg
      if (newCount >= 5) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 3000);
        return 0;
      }
      
      // Reset count after 2 seconds of inactivity
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
      
      return newCount;
    });
  };

  const handleAvatarMouseDown = (e: React.MouseEvent) => {
    // Only prevent if we're tracking clicks (not on first click)
    if (clickCount > 0) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  // Get menu items from database (respects is_active flag)
  const menuGroups = useMemo(() => {
    if (!workspaceWithMenu || !workspaceWithMenu.menu_items) return [];
    
    // Group items by group_name
    const grouped = new Map<string, typeof workspaceWithMenu.menu_items>();
    
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
    const orderedGroups: Array<{ groupName: string; items: typeof workspaceWithMenu.menu_items }> = [];
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
    <>
      {showEasterEgg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in-0">
          <div className="text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="flex justify-center">
              <Sparkles className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                🎉 You found it! 🎉
              </h3>
              <p className="text-sm text-muted-foreground">
                Great job exploring the interface!
              </p>
            </div>
          </div>
        </div>
      )}
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
                className="w-full justify-start gap-2 h-auto p-2.5 hover:bg-sidebar-accent"
              >
                <Avatar 
                  className="h-8 w-8 shrink-0 cursor-pointer transition-transform hover:scale-110 active:scale-95 relative z-10"
                  onMouseDown={handleAvatarMouseDown}
                  onClick={handleAvatarClick}
                  title="Click me 5 times!"
                >
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold pointer-events-none">
                    {user.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col items-start text-left text-sm">
                  <span className="truncate font-medium">
                    {user.email?.split("@")[0] || "User"}
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/60">
                    {user.email}
                  </span>
                </div>
                <ChevronUp className="ml-auto h-4 w-4 text-sidebar-foreground/50 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side="right">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
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
    </>
  );
}

