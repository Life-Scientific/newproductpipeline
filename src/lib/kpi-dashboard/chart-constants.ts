/**
 * Unified Chart Design Constants
 * 
 * Provides consistent spacing, typography, and styling across all KPI dashboard charts
 */

// Standard spacing scale (4px base)
export const CHART_SPACING = {
  xs: "0.5", // 2px
  sm: "1",   // 4px
  md: "2",   // 8px
  lg: "3",   // 12px
  xl: "4",   // 16px
  "2xl": "6", // 24px
} as const;

// Standard padding for chart cards
export const CHART_PADDING = {
  card: "p-4",           // 16px - standard card padding
  cardCompact: "p-3",   // 12px - compact card padding
  content: "px-4 pb-4", // Content area padding
  chart: "p-2",         // 8px - chart container padding
} as const;

// Standard chart heights
export const CHART_HEIGHTS = {
  compact: 120,   // Small sparklines/metrics
  small: 180,     // Small charts
  medium: 220,    // Standard charts
  large: 300,     // Large charts
  xlarge: 350,    // Extra large charts
} as const;

// Standard typography
export const CHART_TYPOGRAPHY = {
  title: "text-sm font-semibold text-foreground",           // Chart titles
  titleCompact: "text-xs font-semibold text-foreground",     // Compact titles
  description: "text-[11px] text-muted-foreground",         // Descriptions
  label: "text-[11px] text-muted-foreground font-medium",  // Labels
  value: "text-xl font-bold tabular-nums text-foreground",  // Large values
  valueMedium: "text-base font-bold tabular-nums text-foreground", // Medium values
  valueSmall: "text-sm font-semibold tabular-nums text-foreground", // Small values
  trend: "text-[10px] font-semibold tabular-nums",         // Trend indicators
  unit: "text-xs text-muted-foreground font-medium",        // Units
  unitSmall: "text-[10px] text-muted-foreground",           // Small units
} as const;

// Standard chart margins (for Recharts)
export const CHART_MARGINS = {
  compact: { top: 5, right: 5, left: 0, bottom: 0 },
  standard: { top: 10, right: 10, left: 0, bottom: 5 },
  spacious: { top: 20, right: 20, left: 0, bottom: 5 },
} as const;

// Standard border radius
export const CHART_BORDER_RADIUS = {
  card: "rounded-xl",      // Chart cards
  chart: "rounded-lg",    // Chart containers
  element: "rounded-md",  // Chart elements (bars, etc.)
  small: "rounded-sm",    // Small elements
} as const;

// Standard card styling
export const CHART_CARD_STYLES = {
  base: "border-border/50 hover:border-border transition-colors",
  background: "bg-card/50 backdrop-blur-sm",
  hover: "hover:bg-card hover:shadow-lg",
} as const;

// Standard trend indicator colors
export const TREND_COLORS = {
  positive: {
    bg: "bg-green-500/15",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-500/20",
    icon: "text-green-600 dark:text-green-400",
  },
  negative: {
    bg: "bg-red-500/15",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-500/20",
    icon: "text-red-600 dark:text-red-400",
  },
  neutral: {
    bg: "bg-muted/40",
    text: "text-muted-foreground",
    border: "border-border/50",
    icon: "text-muted-foreground",
  },
} as const;

