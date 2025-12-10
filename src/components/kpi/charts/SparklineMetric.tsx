"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
} from "recharts";

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
  const trend = previousValue !== 0
    ? ((currentValue - previousValue) / previousValue) * 100
    : 0;

  const isPositive = trend >= 0;
  const displayValue = formatValue ? formatValue(value) : value.toFixed(1);

  // Normalize data for sparkline (show relative changes)
  const minVal = Math.min(...data.map((d) => d.value));
  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tabular-nums">
                {displayValue}
              </span>
              <span className="text-xs text-muted-foreground">{unit}</span>
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isPositive ? "+" : ""}
              {trend.toFixed(1)}% vs last month
            </div>
          </div>
          <div className="w-24 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <YAxis domain={[minVal * 0.95, maxVal * 1.05]} hide />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "#22c55e" : "#ef4444"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
