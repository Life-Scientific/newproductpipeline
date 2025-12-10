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
    <div className="space-y-4">
      {/* Current Value Tile */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">
                This Month
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tabular-nums">
                  {currentValue.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">{unit}</span>
              </div>
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${
                changeIsGood
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {isPositive ? "+" : ""}
              {change.toFixed(1)}%
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Line Chart */}
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid {...chartTheme.grid} />
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
                  fontSize: 10,
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColors.primary}
              strokeWidth={2}
              dot={{ r: 3, fill: chartColors.primary }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
