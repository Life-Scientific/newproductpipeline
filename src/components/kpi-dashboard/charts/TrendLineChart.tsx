"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  getCurrentMonthValue,
  getMonthOverMonthChange,
} from "@/lib/kpi-dashboard/chart-data";
import {
  getAxisProps,
  getTooltipProps,
  chartTheme,
  chartColors,
} from "@/lib/utils/chart-theme";
import { TrendIndicator } from "./TrendIndicator";
import {
  CHART_PADDING,
  CHART_TYPOGRAPHY,
  CHART_CARD_STYLES,
  CHART_MARGINS,
  CHART_HEIGHTS,
} from "@/lib/kpi-dashboard/chart-constants";
import { cn } from "@/lib/utils";

interface TrendLineChartProps {
  title: string;
  data: { month: string; value: number }[];
  unit?: string;
  targetValue?: number;
}

export function TrendLineChart({
  title,
  data,
  unit = "%",
  targetValue,
}: TrendLineChartProps) {
  const currentValue = getCurrentMonthValue(data);
  const change = getMonthOverMonthChange(data);
  const isPositive = change >= 0;

  // For costs, negative change is good
  const isCost = title.toLowerCase().includes("cost");
  const changeIsGood = isCost ? !isPositive : isPositive;

  // Round data values
  const formattedData = data.map((d) => ({
    ...d,
    value: Math.round(d.value * 100) / 100,
  }));

  return (
    <div className="space-y-3">
      {/* Current Value Tile */}
      <Card className={cn(CHART_CARD_STYLES.base, "bg-muted/20")}>
        <CardContent className={CHART_PADDING.cardCompact}>
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                This Month
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tabular-nums text-foreground">
                  {currentValue.toFixed(1)}
                </span>
                <span className={CHART_TYPOGRAPHY.unit}>
                  {unit}
                </span>
              </div>
            </div>
            <TrendIndicator value={change} size="md" showIcon={true} />
          </div>
        </CardContent>
      </Card>

      {/* Trend Line Chart */}
      <div
        className="w-full rounded-lg border border-border/50 bg-muted/10 p-2"
        style={{ height: CHART_HEIGHTS.small, minHeight: CHART_HEIGHTS.small }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={CHART_MARGINS.compact}
          >
            <CartesianGrid {...chartTheme.grid} strokeDasharray="3 3" />
            <XAxis dataKey="month" {...getAxisProps()} />
            <YAxis
              {...getAxisProps()}
              tickFormatter={(value) => `${value}${unit}`}
              domain={["auto", "auto"]}
            />
            <Tooltip
              {...getTooltipProps()}
              formatter={(value: number) => [`${value.toFixed(2)}${unit}`, title]}
            />
            {targetValue && (
              <ReferenceLine
                y={targetValue}
                stroke={chartColors.destructive}
                strokeWidth={2}
                strokeDasharray="none"
                label={{
                  value: `Target: ${targetValue}${unit}`,
                  position: "right",
                  fill: "var(--color-muted-foreground)",
                  fontSize: 9,
                  fontWeight: 600,
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColors.primary}
              strokeWidth={2.5}
              dot={{ r: 3, fill: chartColors.primary, strokeWidth: 1.5 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
