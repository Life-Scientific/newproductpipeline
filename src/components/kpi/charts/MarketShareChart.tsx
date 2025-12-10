"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MARKET_SHARE_DATA } from "@/lib/kpi-dummy-data";
import { tooltipStyle } from "./ChartTooltip";

const COLORS = {
  northAmerica: "#3b82f6", // Blue
  france: "#8b5cf6", // Purple
  ukIreland: "#10b981", // Emerald
  other: "#f59e0b", // Amber
};

export function MarketShareChart() {
  // Round the data values for cleaner display
  const formattedData = MARKET_SHARE_DATA.map((d) => ({
    ...d,
    northAmerica: Math.round(d.northAmerica * 10) / 10,
    france: Math.round(d.france * 10) / 10,
    ukIreland: Math.round(d.ukIreland * 10) / 10,
    other: Math.round(d.other * 10) / 10,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fontWeight: 500 }}
            className="text-muted-foreground"
          />
          <YAxis
            tick={{ fontSize: 11, fontWeight: 500 }}
            className="text-muted-foreground"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
          />
          <Legend 
            wrapperStyle={{ 
              fontSize: "11px", 
              fontWeight: 600,
            }}
          />
          <Bar
            dataKey="northAmerica"
            name="North America"
            fill={COLORS.northAmerica}
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="france"
            name="France"
            fill={COLORS.france}
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="ukIreland"
            name="UK & Ireland"
            fill={COLORS.ukIreland}
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="other"
            name="Other"
            fill={COLORS.other}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
