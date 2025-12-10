"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { FORECAST_ACCURACY_DATA } from "@/lib/kpi-dashboard/chart-data";
import {
  getAxisProps,
  getTooltipProps,
  chartTheme,
  chartColors,
} from "@/lib/utils/chart-theme";

interface ForecastAccuracyChartProps {
  height?: number;
}

export function ForecastAccuracyChart({ height = 220 }: ForecastAccuracyChartProps) {
  // Generate plan data (target + some variance)
  const formattedData = FORECAST_ACCURACY_DATA.map((d, i) => ({
    month: d.month,
    actual: Math.round(d.value * 10) / 10,
    plan: Math.round((85 + Math.sin(i * 0.3) * 3) * 10) / 10, // Plan around 85% with slight variance
  }));

  const currentActual = formattedData[formattedData.length - 1]?.actual || 0;
  const currentPlan = formattedData[formattedData.length - 1]?.plan || 0;
  const variance = currentActual - currentPlan;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">
          % Forecast Accuracy (Plan vs Actual)
        </span>
        <div className="flex gap-4">
          <span>
            Actual:{" "}
            <strong className="text-cyan-600 dark:text-cyan-400">
              {currentActual.toFixed(1)}%
            </strong>
          </span>
          <span>
            Plan:{" "}
            <strong className="text-violet-600 dark:text-violet-400">
              {currentPlan.toFixed(1)}%
            </strong>
          </span>
          <span>
            Variance:{" "}
            <strong
              className={
                variance >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }
            >
              {variance >= 0 ? "+" : ""}
              {variance.toFixed(1)}%
            </strong>
          </span>
        </div>
      </div>
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid {...chartTheme.grid} />
            <XAxis dataKey="month" {...getAxisProps()} />
            <YAxis
              {...getAxisProps()}
              tickFormatter={(value) => `${value}%`}
              domain={[70, 100]}
            />
            <Tooltip
              {...getTooltipProps()}
              formatter={(value: number, name: string) => [
                `${value.toFixed(1)}%`,
                name === "actual" ? "Actual" : "Plan",
              ]}
            />
            <Legend
              wrapperStyle={chartTheme.legend.wrapperStyle}
              formatter={(value) => (value === "actual" ? "Actual" : "Plan")}
            />
            <ReferenceLine
              y={90}
              stroke="var(--color-muted-foreground)"
              strokeWidth={1}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="plan"
              stroke={chartColors.secondary}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: chartColors.secondary }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke={chartColors.info}
              strokeWidth={2}
              dot={{ r: 3, fill: chartColors.info }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
