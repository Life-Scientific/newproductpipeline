/**
 * KPI Dashboard Charts
 * 
 * These chart components use the shared chart-theme.tsx utilities
 * for consistent styling across light/dark modes.
 */

export { RevenueTable } from "./RevenueTable";
export { MarketShareChart } from "./MarketShareChart";
export { ArticleSubmissionsChart } from "./ArticleSubmissionsChart";
export { SparklineMetric } from "./SparklineMetric";
export { BulletChart } from "./BulletChart";
export { TrendLineChart } from "./TrendLineChart";
export { ForecastAccuracyChart } from "./ForecastAccuracyChart";
export { ObsoleteStockChart } from "./ObsoleteStockChart";
export { ExpandableChart } from "./ExpandableChart";
export { ChartCard } from "./ChartCard";
export { ChartContainer } from "./ChartContainer";
export { TrendIndicator } from "./TrendIndicator";

// Drilldowns
export { RevenueDrilldown, MarketShareDrilldown } from "./drilldowns";

// Note: ChartTooltip is deprecated - use getTooltipProps() from @/lib/utils/chart-theme instead
