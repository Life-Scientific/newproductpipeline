"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { chartColors } from "@/lib/utils/chart-theme";
import { cn } from "@/lib/utils";

interface SparklineMetricProps {
  label: string;
  value: number;
  unit: string;
  data: { month: string; value: number }[];
  formatValue?: (value: number) => string;
}

export function SparklineMetric({
  label,
  value,
  unit,
  data,
  formatValue,
}: SparklineMetricProps) {
  // Calculate trend
  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const trend =
    previousValue !== 0
      ? ((currentValue - previousValue) / previousValue) * 100
      : 0;

  const isPositive = trend >= 0;
  const displayValue = formatValue ? formatValue(value) : value.toFixed(1);

  // Normalize data for sparkline (show relative changes)
  const minVal = Math.min(...data.map((d) => d.value));
  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 flex-1 min-w-0">
            <p className="text-[11px] text-muted-foreground font-medium leading-tight">
              {label}
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tabular-nums text-foreground">
                {displayValue}
              </span>
              {unit && (
                <span className="text-xs text-muted-foreground font-medium">
                  {unit}
                </span>
              )}
            </div>
            <div
              className={cn(
                "flex items-center gap-1 text-[10px] font-semibold",
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400",
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-2.5 w-2.5" />
              ) : (
                <TrendingDown className="h-2.5 w-2.5" />
              )}
              <span className="tabular-nums">
                {isPositive ? "+" : ""}
                {trend.toFixed(1)}%
              </span>
              <span className="text-muted-foreground font-normal ml-0.5">
                vs last month
              </span>
            </div>
          </div>
          <div className="w-20 h-10 min-h-[40px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                <YAxis domain={[minVal * 0.95, maxVal * 1.05]} hide />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? chartColors.success : chartColors.destructive}
                  strokeWidth={2}
                  dot={false}
                  strokeLinecap="round"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
