"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
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
      <Card className="border-border/50 bg-muted/20">
        <CardContent className="p-3">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                This Month
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tabular-nums text-foreground">
                  {currentValue.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {unit}
                </span>
              </div>
            </div>
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold border",
                changeIsGood
                  ? "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30"
                  : "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30",
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className="tabular-nums">
                {isPositive ? "+" : ""}
                {change.toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Line Chart */}
      <div className="h-[180px] min-h-[180px] w-full rounded-lg border border-border/50 bg-muted/10 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
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
