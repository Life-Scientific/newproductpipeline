"use client";

import { Card, CardContent } from "@/components/ui/card";

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

  if (actual < ranges[0]) {
    status = "poor";
    statusColor = "text-red-600";
  } else if (actual < ranges[1]) {
    status = "ok";
    statusColor = "text-yellow-600";
  } else if (actual < ranges[2]) {
    status = "good";
    statusColor = "text-green-600";
  } else {
    status = "excellent";
    statusColor = "text-green-600";
  }

  const gap = target - actual;
  const gapText = gap > 0 ? `${gap.toFixed(1)}${unit} below target` : `${Math.abs(gap).toFixed(1)}${unit} above target`;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs text-muted-foreground font-medium">{label}</span>
            <span className={`text-xs font-semibold ${statusColor}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>

          {/* Bullet Chart */}
          <div className="relative h-8">
            {/* Background ranges */}
            <div className="absolute inset-0 flex rounded-md overflow-hidden">
              <div
                style={{ 
                  width: `${(ranges[0] / max) * 100}%`,
                  backgroundColor: "rgba(239, 68, 68, 0.25)"
                }}
              />
              <div
                style={{ 
                  width: `${((ranges[1] - ranges[0]) / max) * 100}%`,
                  backgroundColor: "rgba(245, 158, 11, 0.25)"
                }}
              />
              <div
                style={{ 
                  width: `${((ranges[2] - ranges[1]) / max) * 100}%`,
                  backgroundColor: "rgba(34, 197, 94, 0.25)"
                }}
              />
              <div
                style={{ 
                  width: `${((ranges[3] - ranges[2]) / max) * 100}%`,
                  backgroundColor: "rgba(16, 185, 129, 0.35)"
                }}
              />
            </div>

            {/* Actual value bar */}
            <div
              className="absolute top-2 h-4 rounded-sm transition-all"
              style={{ 
                width: `${actualPercent}%`,
                backgroundColor: actual >= target ? "#22c55e" : actual >= ranges[1] ? "#f59e0b" : "#ef4444"
              }}
            />

            {/* Target marker - now grey/dark */}
            <div
              className="absolute top-0 h-8 w-1 rounded-sm"
              style={{ 
                left: `${targetPercent}%`,
                backgroundColor: "#374151",
                transform: "translateX(-50%)"
              }}
            />
          </div>

          {/* Values */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-base tabular-nums">{actual.toFixed(1)}</span>
              <span className="text-muted-foreground ml-0.5">{unit}</span>
            </div>
            <div className="text-right">
              <span className="text-muted-foreground">Target: </span>
              <span className="font-semibold">{target}{unit}</span>
            </div>
          </div>

          <p className={`text-xs font-medium ${gap > 0 ? "text-red-600" : "text-green-600"}`}>
            {gapText}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
