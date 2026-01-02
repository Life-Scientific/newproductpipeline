/**
 * Command Palette Configuration
 *
 * Centralized configuration for Command+K palette:
 * - Quick actions (modals, creation flows)
 * - Workspace navigation (Portfolio, Short URLs, etc.)
 * - Keyboard shortcuts
 *
 * To add new items, simply add entries to the arrays below.
 */

import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FlaskConical,
  Globe,
  FileText,
  TrendingUp,
  Settings,
  Plus,
  Beaker,
  Target,
  Link2,
  Code,
  BarChart3,
  DollarSign,
  MessageSquare,
  Map,
  PieChart,
  GitBranch,
} from "lucide-react";
import { routes, shortUrlRoutes } from "@/lib/routes";

// ============================================================================
// TYPES
// ============================================================================

export interface QuickAction {
  icon: LucideIcon;
  label: string;
  /** Callback property name (e.g., "onOpenBusinessCaseModal") */
  callbackProp: string;
  /** Optional keyboard shortcut hint */
  shortcut?: string;
  /** Optional description */
  description?: string;
}

export interface NavigationItem {
  icon: LucideIcon;
  label: string;
  path: string;
  /** Optional badge text */
  badge?: string;
  description?: string;
}

export interface WorkspaceGroup {
  heading: string;
  items: NavigationItem[];
}

// ============================================================================
// QUICK ACTIONS
// ============================================================================

/**
 * Quick actions that trigger modals or creation flows.
 *
 * To add a new action:
 * 1. Add entry here with callbackProp name
 * 2. Add optional prop to CommandPaletteProps interface
 * 3. Pass callback from SidebarProvider
 */
export const quickActions: QuickAction[] = [
  {
    icon: Plus,
    label: "New Business Case",
    callbackProp: "onOpenBusinessCaseModal",
    shortcut: "N B",
    description: "Create a new business case projection",
  },
  {
    icon: FlaskConical,
    label: "New Formulation",
    callbackProp: "onOpenFormulationModal",
    shortcut: "N F",
    description: "Register a new formulation",
  },
  {
    icon: Target,
    label: "New Use Group",
    callbackProp: "onOpenUseGroupModal",
    shortcut: "N U",
    description: "Create a new use group for a formulation-country pair",
  },
  {
    icon: Globe,
    label: "New Country Entry",
    callbackProp: "onOpenCountryModal",
    shortcut: "N C",
    description: "Add a country to a formulation",
  },
  {
    icon: DollarSign,
    label: "New COGS Entry",
    callbackProp: "onOpenCOGSModal",
    shortcut: "N $",
    description: "Add cost of goods sold data",
  },
];

// ============================================================================
// WORKSPACE NAVIGATION
// ============================================================================

/**
 * Portfolio workspace navigation.
 * Items are auto-generated from routes - add new pages to routes.ts.
 */
export const portfolioNavigation: NavigationItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: routes.home(),
    description: "Portfolio overview and key metrics",
  },
  {
    icon: FlaskConical,
    label: "Formulations",
    path: routes.formulations.list(),
    description: "Browse all formulations",
  },
  {
    icon: Globe,
    label: "Countries",
    path: routes.countries.list(),
    description: "Country registrations and markets",
  },
  {
    icon: Beaker,
    label: "Active Ingredients",
    path: routes.activeIngredients.list(),
    description: "Browse active ingredients and patents",
  },
  {
    icon: FileText,
    label: "Reference Products",
    path: routes.reference(),
    description: "Competitor reference products",
  },
  {
    icon: TrendingUp,
    label: "Business Cases",
    path: routes.businessCases.list(),
    description: "Financial projections and NPV analysis",
  },
  {
    icon: DollarSign,
    label: "COGS",
    path: routes.cogs(),
    description: "Cost of goods sold data",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: routes.analytics(),
    description: "Portfolio analytics and insights",
  },
  {
    icon: MessageSquare,
    label: "AI Chat",
    path: routes.chat(),
    description: "Chat with Claude about your portfolio",
  },
  {
    icon: Settings,
    label: "Settings",
    path: routes.settings(),
    description: "User preferences and workspace settings",
  },
];

/**
 * Other workspaces and tools.
 * Add new workspaces here as they're created.
 */
export const otherWorkspaces: NavigationItem[] = [
  {
    icon: Link2,
    label: "Short URLs (ls.life)",
    path: shortUrlRoutes.home(),
    description: "Manage short links",
  },
  {
    icon: Code,
    label: "Dev Tools",
    path: "/dev",
    description: "Developer utilities and debugging",
  },
  {
    icon: Map,
    label: "Entity Map",
    path: "/dev/entity-map",
    description: "Visualize data model relationships",
  },
  {
    icon: GitBranch,
    label: "KPI Dashboard",
    path: "/operations/kpi-dashboard",
    description: "Team objectives and key results",
  },
];

/**
 * Grouped workspace navigation.
 *
 * To add a new workspace group:
 * 1. Create a new NavigationItem[] array above
 * 2. Add a new entry to this array
 */
export const workspaceGroups: WorkspaceGroup[] = [
  {
    heading: "Portfolio",
    items: portfolioNavigation,
  },
  {
    heading: "Other Workspaces",
    items: otherWorkspaces,
  },
];

// ============================================================================
// SEARCH CONFIGURATION
// ============================================================================

/**
 * Search configuration
 */
export const searchConfig = {
  /** Minimum query length before searching */
  minQueryLength: 2,
  /** Debounce delay in milliseconds */
  debounceMs: 200,
  /** Maximum number of results */
  maxResults: 10,
  /** Show search results when no query (trending/recent) */
  showEmptyState: false,
} as const;

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

/**
 * Global keyboard shortcuts for Command Palette
 */
export const keyboardShortcuts = {
  /** Open command palette */
  open: ["cmd+k", "ctrl+k"],
  /** Close command palette */
  close: ["escape"],
} as const;
