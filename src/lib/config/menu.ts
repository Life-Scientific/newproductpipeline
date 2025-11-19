import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Type for menu item from config
export interface MenuItem {
  title: string;
  path: string;
  icon: LucideIcon;
  group: string;
  order: number;
}

// Helper function to get icon component from string name
function getIconComponent(iconName: string | null): LucideIcon {
  if (!iconName) return Icons.LayoutDashboard;
  const IconComponent = (Icons as Record<string, any>)[iconName];
  return IconComponent || Icons.LayoutDashboard;
}

// Menu configuration for the Portfolio workspace
const portfolioMenuItems: MenuItem[] = [
  // Overview
  { title: "Financial Dashboard", path: "/", icon: getIconComponent("LayoutDashboard"), group: "Overview", order: 1 },
  { title: "Strategy Dashboard", path: "/portfolio-strategy", icon: getIconComponent("Target"), group: "Overview", order: 2 },
  { title: "Markets Overview", path: "/markets", icon: getIconComponent("MapPin"), group: "Overview", order: 3 },
  
  // Market & Strategy
  { title: "Pipeline Tracker", path: "/pipeline-tracker", icon: getIconComponent("GitBranch"), group: "Market & Strategy", order: 1 },
  
  // Core Data
  { title: "Formulations", path: "/formulations", icon: getIconComponent("FlaskConical"), group: "Core Data", order: 1 },
  { title: "Countries", path: "/countries", icon: getIconComponent("Globe"), group: "Core Data", order: 2 },
  { title: "Use Groups", path: "/use-groups", icon: getIconComponent("FileText"), group: "Core Data", order: 3 },
  
  // Financials
  { title: "Business Cases", path: "/business-cases", icon: getIconComponent("TrendingUp"), group: "Financials", order: 1 },
  { title: "COGS", path: "/cogs", icon: getIconComponent("DollarSign"), group: "Financials", order: 2 },
  
  // Analysis
  { title: "Analytics", path: "/analytics", icon: getIconComponent("BarChart3"), group: "Analysis", order: 1 },
  { title: "Compare", path: "/formulations/compare", icon: getIconComponent("GitCompare"), group: "Analysis", order: 2 },
  
  // System
  { title: "Reference Data", path: "/reference", icon: getIconComponent("Database"), group: "System", order: 1 },
];

/**
 * Get menu items grouped by their group name
 * @param workspaceSlug - The slug of the workspace (e.g., 'portfolio')
 * @returns Map of group names to menu items
 */
export function getGroupedMenuItems(workspaceSlug: string): Map<string, MenuItem[]> {
  // Currently only Portfolio workspace is supported
  // In the future, this can be extended to support other workspaces
  const menuItems = workspaceSlug === "portfolio" ? portfolioMenuItems : [];
  
  // Group items by their group property
  const grouped = new Map<string, MenuItem[]>();
  
  for (const item of menuItems) {
    if (!grouped.has(item.group)) {
      grouped.set(item.group, []);
    }
    grouped.get(item.group)!.push(item);
  }
  
  // Sort items within each group by their order
  for (const [group, items] of grouped.entries()) {
    items.sort((a, b) => a.order - b.order);
  }
  
  // Return groups in the desired order
  const orderedGroups = new Map<string, MenuItem[]>();
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
      orderedGroups.set(groupName, grouped.get(groupName)!);
    }
  }
  
  return orderedGroups;
}
