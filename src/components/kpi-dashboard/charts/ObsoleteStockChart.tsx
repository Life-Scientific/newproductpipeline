"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { OBSOLETE_STOCK_DATA } from "@/lib/kpi-dashboard/chart-data";
import {
  getAxisProps,
  getTooltipProps,
  chartTheme,
  chartColors,
} from "@/lib/utils/chart-theme";

interface ObsoleteStockChartProps {
  height?: number;
}

export function ObsoleteStockChart({ height = 220 }: ObsoleteStockChartProps) {
  // Round data values
  const formattedData = OBSOLETE_STOCK_DATA.map((d) => ({
    ...d,
    value: Math.round(d.value * 10) / 10,
  }));

  const currentValue = formattedData[formattedData.length - 1]?.value || 0;
  const targetValue = 5; // Target: under 5%

  // Color bars based on whether they're above or below target
  const getBarColor = (value: number) => {
    if (value <= targetValue) return chartColors.success;
    if (value <= targetValue * 1.2) return chartColors.warning;
    return chartColors.destructive;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">
          Obsolete Stock % of Total Stock
        </span>
        <div className="flex gap-4">
          <span>
            Current:{" "}
            <strong
              className={
                currentValue <= targetValue
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }
            >
              {currentValue.toFixed(1)}%
            </strong>
          </span>
          <span>
            Target: <strong>≤{targetValue}%</strong>
          </span>
        </div>
      </div>
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid {...chartTheme.grid} />
            <XAxis dataKey="month" {...getAxisProps()} />
            <YAxis
              {...getAxisProps()}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 10]}
            />
            <Tooltip
              {...getTooltipProps()}
              formatter={(value: number) => [
                `${value.toFixed(1)}%`,
                "Obsolete Stock",
              ]}
            />
            <ReferenceLine
              y={targetValue}
              stroke="var(--color-foreground)"
              strokeWidth={2}
              strokeDasharray="none"
              label={{
                value: `Target: ${targetValue}%`,
                position: "right",
                fill: "var(--color-muted-foreground)",
                fontSize: 10,
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
