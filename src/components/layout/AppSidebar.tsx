"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import {
  User,
  LogOut,
  ChevronUp,
  Settings,
} from "lucide-react";
import * as Icons from "lucide-react";
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

// Helper function to get icon component from string name
function getIconComponent(iconName: string | null) {
  if (!iconName) return Icons.LayoutDashboard;
  const IconComponent = (Icons as Record<string, React.ComponentType<any>>)[iconName];
  return IconComponent || Icons.LayoutDashboard;
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useSupabase();
  const { workspaceWithMenu, isLoading: workspaceLoading } = useWorkspace();
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

  // Group menu items by group_name
  const menuGroups = useMemo(() => {
    if (!workspaceWithMenu?.menu_items) return [];
    
    const groups = new Map<string, typeof workspaceWithMenu.menu_items>();
    
    workspaceWithMenu.menu_items.forEach((item) => {
      const group = item.group_name;
      if (!groups.has(group)) {
        groups.set(group, []);
      }
      groups.get(group)!.push(item);
    });
    
    // Sort items within each group by display_order
    groups.forEach((items) => {
      items.sort((a, b) => a.display_order - b.display_order);
    });
    
    return Array.from(groups.entries()).map(([groupName, items]) => ({
      groupName,
      items,
    }));
  }, [workspaceWithMenu]);

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <WorkspaceSwitcher />
          <SidebarTrigger className="ml-auto" />
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
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
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
  );
}

