"use client";

import {
  RevenueTable,
  MarketShareChart,
  ArticleSubmissionsChart,
  SparklineMetric,
  BulletChart,
  TrendLineChart,
  ForecastAccuracyChart,
  ObsoleteStockChart,
} from "./charts";
import {
  STOCK_WRITE_OFF_TREND,
  GM_PER_FTE_TREND,
  SUPPLY_CHAIN_METRICS,
  FREIGHT_COSTS_DATA,
  TARIFF_COSTS_DATA,
  getCurrentMonthValue,
} from "@/lib/kpi-dashboard/chart-data";

interface StrategicDriverChartsProps {
  strategicDriverId: string;
}

/**
 * Maps Strategic Driver IDs to their relevant chart visualizations.
 * Used in the KPIDetailModal to show contextual charts.
 */
export function StrategicDriverCharts({
  strategicDriverId,
}: StrategicDriverChartsProps) {
  // Render charts based on the strategic driver
  switch (strategicDriverId) {
    case "markets-regions":
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Revenue by Territory
            </h4>
            <RevenueTable />
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Market Share by Territory (Monthly)
            </h4>
            <MarketShareChart height={350} />
          </div>
        </div>
      );

    case "products-art34":
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            Article 34 Submissions (12 months)
          </h4>
          <ArticleSubmissionsChart articleType="34" height={300} />
        </div>
      );

    case "products-art33":
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            Article 33 Submissions (12 months)
          </h4>
          <ArticleSubmissionsChart articleType="33" height={300} />
        </div>
      );

    case "product-margin-cogs":
      return (
        <div className="space-y-4">
          <SparklineMetric
            label="Stock Write Off % of COGS"
            value={getCurrentMonthValue(STOCK_WRITE_OFF_TREND)}
            unit="%"
            data={STOCK_WRITE_OFF_TREND}
          />
          <SparklineMetric
            label="GM per FTE"
            value={getCurrentMonthValue(GM_PER_FTE_TREND)}
            unit=""
            data={GM_PER_FTE_TREND}
            formatValue={(v) => `€${(v / 1000).toFixed(0)}k`}
          />
        </div>
      );

    case "supply-chain-performance":
      return (
        <div className="space-y-4">
          <BulletChart
            label={SUPPLY_CHAIN_METRICS.otifCustomer.label}
            actual={SUPPLY_CHAIN_METRICS.otifCustomer.actual}
            target={SUPPLY_CHAIN_METRICS.otifCustomer.target}
            ranges={SUPPLY_CHAIN_METRICS.otifCustomer.ranges}
          />
          <BulletChart
            label={SUPPLY_CHAIN_METRICS.supplierOnTime.label}
            actual={SUPPLY_CHAIN_METRICS.supplierOnTime.actual}
            target={SUPPLY_CHAIN_METRICS.supplierOnTime.target}
            ranges={SUPPLY_CHAIN_METRICS.supplierOnTime.ranges}
          />
        </div>
      );

    case "freight-tariff-optimization":
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Freight Costs
            </h4>
            <TrendLineChart
              title="Freight Costs"
              data={FREIGHT_COSTS_DATA}
              unit="%"
              targetValue={4.0}
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Tariff Costs
            </h4>
            <TrendLineChart
              title="Tariff Costs"
              data={TARIFF_COSTS_DATA}
              unit="%"
              targetValue={2.5}
            />
          </div>
        </div>
      );

    case "demand-visibility":
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            Forecast Accuracy (Plan vs Actual)
          </h4>
          <ForecastAccuracyChart height={320} />
        </div>
      );

    case "supply-planning":
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            Obsolete Stock Trend
          </h4>
          <ObsoleteStockChart height={320} />
        </div>
      );

    // Additional mappings for other strategic drivers
    case "working-capital-optimization":
    case "process-efficiency":
    case "adjacent-offerings":
    case "revenue-return":
    case "roc":
      return (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          <p className="text-sm">
            No specific visualizations for this metric yet.
          </p>
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          <p className="text-sm">
            Select a KPI to view related visualizations.
          </p>
        </div>
      );
  }
}

