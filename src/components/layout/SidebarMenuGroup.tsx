"use client";

import type { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { usePrefetchOnIntent } from "@/hooks/use-prefetch-on-intent";
import { useRef } from "react";
import { type WorkspaceMenuItem } from "@/lib/actions/workspaces";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
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
  Sparkles: require("lucide-react").Sparkles,
  Link: require("lucide-react").Link,
  Plus: require("lucide-react").Plus,
};

function getIconComponent(iconName: string | null): LucideIcon {
  if (!iconName) return iconMap.LayoutDashboard;
  return iconMap[iconName] || iconMap.LayoutDashboard;
}

interface NavItemProps {
  item: WorkspaceMenuItem;
  isActive: boolean;
}

function NavItem({ item, isActive }: NavItemProps) {
  const IconComponent = getIconComponent(item.icon);
  const prefetchRef = usePrefetchOnIntent(item.url);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const setRefs = (node: HTMLAnchorElement | null) => {
    linkRef.current = node;
    if (node) {
      prefetchRef(node);
    }
  };

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

interface MenuGroupProps {
  groupName: string;
  items: WorkspaceMenuItem[];
  pathname: string | null;
  showSeparator?: boolean;
  isCollapsed?: boolean;
}

export function SidebarMenuGroup({
  groupName,
  items,
  pathname,
  showSeparator = false,
  isCollapsed = false,
}: MenuGroupProps) {
  const isActive = (url: string) => {
    if (!pathname) return false;
    const WORKSPACE_BASE = "/operations";
    if (url === WORKSPACE_BASE) {
      return pathname === WORKSPACE_BASE;
    }
    return pathname?.startsWith(url);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <NavItem
              key={item.menu_item_id}
              item={item}
              isActive={isActive(item.url)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      {showSeparator && isCollapsed && <SidebarSeparator className="my-1" />}
    </SidebarGroup>
  );
}
