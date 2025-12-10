"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { chartColors } from "@/lib/utils/chart-theme";
import { TrendIndicator } from "./TrendIndicator";
import {
  CHART_PADDING,
  CHART_TYPOGRAPHY,
  CHART_CARD_STYLES,
} from "@/lib/kpi-dashboard/chart-constants";
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
    <Card className={cn(CHART_CARD_STYLES.base, CHART_CARD_STYLES.background)}>
      <CardContent className={CHART_PADDING.cardCompact}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1 min-w-0">
            <p className={CHART_TYPOGRAPHY.label}>
              {label}
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className={CHART_TYPOGRAPHY.value}>
                {displayValue}
              </span>
              {unit && (
                <span className={CHART_TYPOGRAPHY.unit}>
                  {unit}
                </span>
              )}
            </div>
            <TrendIndicator
              value={trend}
              label="vs last month"
              size="sm"
            />
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
