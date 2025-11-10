"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FlaskConical,
  TrendingUp,
  FileCheck,
  Database,
  Menu,
  BarChart3,
  DollarSign,
  Beaker,
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

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Formulations",
    url: "/formulations",
    icon: FlaskConical,
  },
  {
    title: "Business Cases",
    url: "/business-cases",
    icon: TrendingUp,
  },
  {
    title: "Registration Pipeline",
    url: "/registration",
    icon: FileCheck,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "COGS",
    url: "/cogs",
    icon: DollarSign,
  },
  {
    title: "Ingredients",
    url: "/ingredients",
    icon: Beaker,
  },
  {
    title: "Reference Data",
    url: "/reference",
    icon: Database,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Menu className="size-3.5" />
          </div>
          <div className="grid flex-1 text-left text-xs leading-tight">
            <span className="truncate font-semibold">LS Portfolio</span>
            <span className="truncate text-[10px] text-sidebar-foreground/70">
              Life Scientific
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url || 
                  (item.url !== "/" && pathname?.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      size="sm"
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span className="text-xs">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-1 text-[10px] text-sidebar-foreground/60">
          LS Portfolio
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

