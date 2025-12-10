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
import { FORECAST_ACCURACY_DATA } from "@/lib/kpi-dummy-data";
import { tooltipStyle } from "./ChartTooltip";

export function ForecastAccuracyChart() {
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
        <span className="text-muted-foreground font-medium">% Forecast Accuracy (Plan vs Actual)</span>
        <div className="flex gap-4">
          <span>
            Actual: <strong className="text-cyan-600">{currentActual.toFixed(1)}%</strong>
          </span>
          <span>
            Plan: <strong className="text-violet-600">{currentPlan.toFixed(1)}%</strong>
          </span>
          <span>
            Variance:{" "}
            <strong className={variance >= 0 ? "text-green-600" : "text-red-600"}>
              {variance >= 0 ? "+" : ""}{variance.toFixed(1)}%
            </strong>
          </span>
        </div>
      </div>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fontWeight: 500 }}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 10, fontWeight: 500 }}
              className="text-muted-foreground"
              tickFormatter={(value) => `${value}%`}
              domain={[70, 100]}
            />
            <Tooltip
              {...tooltipStyle}
              formatter={(value: number, name: string) => [
                `${value.toFixed(1)}%`,
                name === "actual" ? "Actual" : "Plan",
              ]}
            />
            <Legend
              wrapperStyle={{ 
                fontSize: "10px", 
                fontWeight: 600,
              }}
              formatter={(value) => (value === "actual" ? "Actual" : "Plan")}
            />
            <ReferenceLine
              y={90}
              stroke="#94a3b8"
              strokeWidth={1}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="plan"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: "#8b5cf6" }}
              activeDot={{ r: 5, fill: "#8b5cf6" }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 3, fill: "#06b6d4" }}
              activeDot={{ r: 5, fill: "#06b6d4" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
