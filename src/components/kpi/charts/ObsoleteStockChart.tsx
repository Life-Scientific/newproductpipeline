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
import { OBSOLETE_STOCK_DATA } from "@/lib/kpi-dummy-data";
import { tooltipStyle } from "./ChartTooltip";

export function ObsoleteStockChart() {
  // Round data values
  const formattedData = OBSOLETE_STOCK_DATA.map((d) => ({
    ...d,
    value: Math.round(d.value * 10) / 10,
  }));

  const currentValue = formattedData[formattedData.length - 1]?.value || 0;
  const targetValue = 5; // Target: under 5%

  // Color bars based on whether they're above or below target
  const getBarColor = (value: number) => {
    if (value <= targetValue) return "#22c55e"; // Green - good
    if (value <= targetValue * 1.2) return "#f59e0b"; // Amber - warning
    return "#ef4444"; // Red - bad
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">Obsolete Stock % of Total Stock</span>
        <div className="flex gap-4">
          <span>
            Current:{" "}
            <strong className={currentValue <= targetValue ? "text-green-600" : "text-red-600"}>
              {currentValue.toFixed(1)}%
            </strong>
          </span>
          <span>
            Target: <strong>≤{targetValue}%</strong>
          </span>
        </div>
      </div>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
              domain={[0, 10]}
            />
            <Tooltip
              {...tooltipStyle}
              formatter={(value: number) => [`${value.toFixed(1)}%`, "Obsolete Stock"]}
            />
            <ReferenceLine
              y={targetValue}
              stroke="#000000"
              strokeWidth={2}
              strokeDasharray="none"
            >
              <label 
                value={`Target: ${targetValue}%`}
                position="right"
                style={{ fontSize: 10, fontWeight: 600, fill: "#000000" }}
              />
            </ReferenceLine>
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
