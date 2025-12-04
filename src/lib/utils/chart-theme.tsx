/**
 * Chart Theme Utilities
 * 
 * Provides consistent theming for Recharts components across dark and light modes.
 * Uses CSS variables that are already defined in globals.css
 */

/**
 * Common chart styling objects that work with CSS variables
 */
export const chartTheme = {
  // Grid styling
  grid: {
    stroke: "var(--color-border)",
    strokeDasharray: "3 3",
  },
  
  // Axis styling
  axis: {
    stroke: "var(--color-border)",
  },
  
  // Tick styling
  tick: {
    fill: "var(--color-muted-foreground)",
    fontSize: 12,
  },
  
  // Label styling
  label: {
    fill: "var(--color-muted-foreground)",
    fontSize: 12,
  },
  
  // Tooltip styling
  tooltip: {
    contentStyle: {
      backgroundColor: "var(--color-popover)",
      border: "1px solid var(--color-border)",
      borderRadius: "8px",
      padding: "12px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
    itemStyle: {
      color: "var(--color-foreground)",
    },
    labelStyle: {
      color: "var(--color-foreground)",
      fontWeight: 600,
    },
    cursor: {
      fill: "var(--color-muted)",
      opacity: 0.1,
    },
  },
  
  // Legend styling
  legend: {
    wrapperStyle: {
      paddingTop: "20px",
    },
  },
};

/**
 * Chart color palette using CSS variables
 * These automatically adapt to light/dark mode
 */
export const chartColors = {
  primary: "var(--color-chart-1)",
  secondary: "var(--color-chart-2)",
  tertiary: "var(--color-chart-3)",
  quaternary: "var(--color-chart-4)",
  quinary: "var(--color-chart-5)",
  
  // Semantic colors
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  destructive: "var(--color-destructive)",
  info: "var(--color-info)",
  muted: "var(--color-muted)",
};

/**
 * Array of chart colors for iterating
 */
export const chartColorArray = [
  chartColors.primary,
  chartColors.secondary,
  chartColors.tertiary,
  chartColors.quaternary,
  chartColors.quinary,
];

/**
 * Get consistent axis props for XAxis/YAxis
 */
export function getAxisProps(labelValue?: string, isVertical = false) {
  return {
    tick: chartTheme.tick,
    axisLine: chartTheme.axis,
    tickLine: { stroke: "var(--color-border)" },
    ...(labelValue && {
      label: {
        value: labelValue,
        angle: isVertical ? -90 : 0,
        position: isVertical ? "insideLeft" : "insideBottom",
        ...chartTheme.label,
      },
    }),
  };
}

/**
 * Get consistent tooltip props
 */
export function getTooltipProps() {
  return {
    contentStyle: chartTheme.tooltip.contentStyle,
    itemStyle: chartTheme.tooltip.itemStyle,
    labelStyle: chartTheme.tooltip.labelStyle,
  };
}

/**
 * Get legend formatter that uses theme colors
 */
export function getLegendFormatter() {
  return (value: string) => (
    <span style={{ color: "var(--color-foreground)", fontSize: "12px" }}>{value}</span>
  );
}

/**
 * Heatmap color scales for dark and light modes
 * Returns a function that generates colors based on value (0-100)
 */
export function getHeatmapColorScale(isDark: boolean) {
  if (isDark) {
    // Dark mode: Use a green scale that works on dark backgrounds
    return (value: number) => {
      const intensity = Math.max(0.15, Math.min(0.9, value / 100));
      // Use emerald/green tones that are visible on dark
      return `oklch(${0.45 + intensity * 0.35} ${0.1 + intensity * 0.1} 155)`;
    };
  }
  
  // Light mode: Standard green intensity
  return (value: number) => {
    const opacity = Math.max(0.1, Math.min(1, value / 100));
    return `oklch(0.65 0.18 145 / ${opacity})`;
  };
}

/**
 * Get text color for heatmap cells based on background intensity
 */
export function getHeatmapTextColor(value: number, isDark: boolean): string {
  if (isDark) {
    // In dark mode, text should always be light for visibility
    return value > 30 ? "oklch(0.98 0 0)" : "oklch(0.85 0 0)";
  }
  // In light mode, use dark text on light backgrounds
  return value > 50 ? "oklch(0.98 0 0)" : "oklch(0.2 0 0)";
}








