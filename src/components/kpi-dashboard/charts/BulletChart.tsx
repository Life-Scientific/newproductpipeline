"use client";

import { Card, CardContent } from "@/components/ui/card";
import { chartColors } from "@/lib/utils/chart-theme";
import {
  CHART_PADDING,
  CHART_TYPOGRAPHY,
  CHART_CARD_STYLES,
  TREND_COLORS,
} from "@/lib/kpi-dashboard/chart-constants";
import { cn } from "@/lib/utils";

interface BulletChartProps {
  label: string;
  actual: number;
  target: number;
  ranges: number[]; // [poor, ok, good, max]
  unit?: string;
}

export function BulletChart({
  label,
  actual,
  target,
  ranges,
  unit = "%",
}: BulletChartProps) {
  const max = ranges[ranges.length - 1];
  const actualPercent = (actual / max) * 100;
  const targetPercent = (target / max) * 100;

  // Determine performance status
  let status: "poor" | "ok" | "good" | "excellent";
  let statusColor: string;
  let statusBg: string;

  if (actual < ranges[0]) {
    status = "poor";
    statusColor = "text-red-600 dark:text-red-400";
    statusBg = "bg-red-500/10 border-red-500/20";
  } else if (actual < ranges[1]) {
    status = "ok";
    statusColor = "text-yellow-600 dark:text-yellow-400";
    statusBg = "bg-yellow-500/10 border-yellow-500/20";
  } else if (actual < ranges[2]) {
    status = "good";
    statusColor = "text-green-600 dark:text-green-400";
    statusBg = "bg-green-500/10 border-green-500/20";
  } else {
    status = "excellent";
    statusColor = "text-green-600 dark:text-green-400";
    statusBg = "bg-green-500/10 border-green-500/20";
  }

  const gap = target - actual;
  const gapText =
    gap > 0
      ? `${gap.toFixed(1)}${unit} below target`
      : `${Math.abs(gap).toFixed(1)}${unit} above target`;

  // Get bar color based on actual value
  const getBarColor = () => {
    if (actual >= target) return chartColors.success;
    if (actual >= ranges[1]) return chartColors.warning;
    return chartColors.destructive;
  };

  return (
    <Card className={cn(CHART_CARD_STYLES.base, CHART_CARD_STYLES.background)}>
      <CardContent className={CHART_PADDING.cardCompact}>
        <div className="space-y-2.5">
          <div className="flex items-start justify-between">
            <span className={CHART_TYPOGRAPHY.label}>
              {label}
            </span>
            <span
              className={cn(
                "text-[10px] font-semibold px-1.5 py-0.5 rounded border",
                statusColor,
                statusBg,
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>

          {/* Bullet Chart */}
          <div className="relative h-7 rounded-md overflow-hidden bg-muted/30">
            {/* Background ranges */}
            <div className="absolute inset-0 flex">
              <div
                className="transition-all"
                style={{
                  width: `${(ranges[0] / max) * 100}%`,
                  backgroundColor: "oklch(0.65 0.2 25 / 0.3)",
                }}
              />
              <div
                className="transition-all"
                style={{
                  width: `${((ranges[1] - ranges[0]) / max) * 100}%`,
                  backgroundColor: "oklch(0.75 0.15 85 / 0.3)",
                }}
              />
              <div
                className="transition-all"
                style={{
                  width: `${((ranges[2] - ranges[1]) / max) * 100}%`,
                  backgroundColor: "oklch(0.7 0.15 145 / 0.3)",
                }}
              />
              <div
                className="transition-all"
                style={{
                  width: `${((ranges[3] - ranges[2]) / max) * 100}%`,
                  backgroundColor: "oklch(0.7 0.15 160 / 0.4)",
                }}
              />
            </div>

            {/* Actual value bar */}
            <div
              className="absolute top-1.5 h-4 rounded-sm transition-all shadow-sm"
              style={{
                width: `${actualPercent}%`,
                backgroundColor: getBarColor(),
              }}
            />

            {/* Target marker */}
            <div
              className="absolute top-0 h-7 w-0.5 rounded-sm bg-foreground/80 shadow-sm"
              style={{
                left: `${targetPercent}%`,
                transform: "translateX(-50%)",
              }}
            />
          </div>

          {/* Values */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className={CHART_TYPOGRAPHY.valueMedium}>
                {actual.toFixed(1)}
              </span>
              <span className={CHART_TYPOGRAPHY.unitSmall}>{unit}</span>
            </div>
            <div className="text-right">
              <span className={CHART_TYPOGRAPHY.unitSmall}>Target: </span>
              <span className={CHART_TYPOGRAPHY.valueSmall}>
                {target}
                {unit}
              </span>
            </div>
          </div>

          <p
            className={cn(
              CHART_TYPOGRAPHY.trend,
              gap > 0
                ? TREND_COLORS.negative.text
                : TREND_COLORS.positive.text,
            )}
          >
            {gapText}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
