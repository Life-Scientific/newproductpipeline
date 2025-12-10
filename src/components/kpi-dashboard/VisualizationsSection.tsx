"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, BarChart3, Sparkles } from "lucide-react";
import {
  RevenueTable,
  MarketShareChart,
  ArticleSubmissionsChart,
  SparklineMetric,
  BulletChart,
  TrendLineChart,
  ForecastAccuracyChart,
  ObsoleteStockChart,
  ChartCard,
  RevenueDrilldown,
  MarketShareDrilldown,
} from "./charts";
import {
  STOCK_WRITE_OFF_TREND,
  GM_PER_FTE_TREND,
  SUPPLY_CHAIN_METRICS,
  FREIGHT_COSTS_DATA,
  TARIFF_COSTS_DATA,
  getCurrentMonthValue,
  getMonthOverMonthChange,
} from "@/lib/kpi-dashboard/chart-data";
import { cn } from "@/lib/utils";

interface VisualizationsSectionProps {
  defaultOpen?: boolean;
}

export function VisualizationsSection({
  defaultOpen = true,
}: VisualizationsSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize expensive calculations
  const freightTrend = useMemo(
    () => getMonthOverMonthChange(FREIGHT_COSTS_DATA),
    [],
  );

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <motion.div
        initial={mounted ? { opacity: 0, y: -10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: mounted ? 0.3 : 0 }}
        className="flex items-center justify-between pb-2"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-primary/20">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Visualizations
              <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click expand to drill down into details
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-1.5 h-8 text-xs"
        >
          {isOpen ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              Collapse
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              Expand
            </>
          )}
        </Button>
      </motion.div>

      {/* Charts Grid */}
      {isOpen && (
        <motion.div
          initial={mounted ? { opacity: 0, height: 0 } : false}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: mounted ? 0.3 : 0 }}
          className="overflow-hidden"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 pt-2">
            {/* Row 1: Revenue, Market Share, Article Submissions, Product Margins */}

            {/* Revenue by Territory */}
            <ChartCard
              title="Revenue by Territory"
              description="Breakdown with period-over-period trends"
              accentColor="blue"
              trend={{ value: 2.1 }}
              expandedContent={<RevenueDrilldown />}
            >
              <RevenueTable />
            </ChartCard>

            {/* Market Share Trend */}
            <ChartCard
              title="Market Share Trend"
              description="12-month comparison across territories"
              accentColor="purple"
              trend={{ value: 5.8 }}
              expandedContent={<MarketShareDrilldown />}
            >
              <MarketShareChart />
            </ChartCard>

            {/* Article Submissions - Combined 34 & 33 */}
            <ChartCard
              title="Article Submissions"
              description="Art 34 & Art 33 approval rates"
              accentColor="green"
              trend={{ value: 10.5 }}
              expandedContent={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Article 34 Submissions</h4>
                    <ArticleSubmissionsChart articleType="34" height={300} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Article 33 Submissions</h4>
                    <ArticleSubmissionsChart articleType="33" height={300} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50 space-y-3 border border-border/50">
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        ARTICLE 34
                      </h5>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-xl font-bold text-green-600 dark:text-green-400">
                            87
                          </p>
                          <p className="text-[10px] text-muted-foreground">Approved</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-red-600 dark:text-red-400">23</p>
                          <p className="text-[10px] text-muted-foreground">Rejected</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            79%
                          </p>
                          <p className="text-[10px] text-muted-foreground">Rate</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 space-y-3 border border-border/50">
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        ARTICLE 33
                      </h5>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-xl font-bold text-green-600 dark:text-green-400">
                            52
                          </p>
                          <p className="text-[10px] text-muted-foreground">Approved</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-red-600 dark:text-red-400">31</p>
                          <p className="text-[10px] text-muted-foreground">Rejected</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            63%
                          </p>
                          <p className="text-[10px] text-muted-foreground">Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    ART 34
                  </p>
                  <ArticleSubmissionsChart articleType="34" height={120} />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    ART 33
                  </p>
                  <ArticleSubmissionsChart articleType="33" height={120} />
                </div>
              </div>
            </ChartCard>

            {/* Product Margin Metrics - Stacked */}
            <ChartCard
              title="Product Margins"
              description="Stock Write Off & GM per FTE"
              accentColor="amber"
            >
              <div className="space-y-3">
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
            </ChartCard>

            {/* Row 2: Supply Chain, Freight, Tariff, Obsolete Stock */}

            {/* Supply Chain Performance */}
            <ChartCard
              title="Supply Chain"
              description="OTIF & Supplier delivery"
              accentColor="rose"
            >
              <div className="space-y-3">
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
            </ChartCard>

            {/* Freight Costs Trend */}
            <ChartCard
              title="Freight Costs"
              description="Monthly % with target"
              accentColor="blue"
              trend={{ value: freightTrend }}
            >
              <TrendLineChart
                title="Freight Costs"
                data={FREIGHT_COSTS_DATA}
                unit="%"
                targetValue={4.0}
              />
            </ChartCard>

            {/* Tariff Costs Trend */}
            <ChartCard
              title="Tariff Costs"
              description="Monthly % with target"
              accentColor="purple"
              trend={{ value: -2.3 }}
            >
              <TrendLineChart
                title="Tariff Costs"
                data={TARIFF_COSTS_DATA}
                unit="%"
                targetValue={2.5}
              />
            </ChartCard>

            {/* Obsolete Stock */}
            <ChartCard
              title="Obsolete Stock"
              description="% of total with threshold"
              accentColor="rose"
              trend={{ value: -8.5 }}
              expandedContent={
                <div className="space-y-4">
                  <ObsoleteStockChart height={400} />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        4.2%
                      </p>
                      <p className="text-xs text-muted-foreground">Current Level</p>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        5.0%
                      </p>
                      <p className="text-xs text-muted-foreground">Target Max</p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        €1.2M
                      </p>
                      <p className="text-xs text-muted-foreground">Value at Risk</p>
                    </div>
                  </div>
                </div>
              }
            >
              <ObsoleteStockChart />
            </ChartCard>

            {/* Row 3: Forecast Accuracy - Full Width */}
            <div className="md:col-span-2 xl:col-span-4">
              <ChartCard
                title="Forecast Accuracy"
                description="Plan vs Actual comparison over 12 months"
                accentColor="cyan"
                trend={{ value: 4.2 }}
                expandedContent={
                  <div className="space-y-4">
                    <ForecastAccuracyChart height={450} />
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                          86.2%
                        </p>
                        <p className="text-xs text-muted-foreground">Current Accuracy</p>
                      </div>
                      <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          85.0%
                        </p>
                        <p className="text-xs text-muted-foreground">Plan Target</p>
                      </div>
                      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          +1.2%
                        </p>
                        <p className="text-xs text-muted-foreground">Variance</p>
                      </div>
                      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                          90%
                        </p>
                        <p className="text-xs text-muted-foreground">Stretch Goal</p>
                      </div>
                    </div>
                  </div>
                }
              >
                <ForecastAccuracyChart />
              </ChartCard>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
