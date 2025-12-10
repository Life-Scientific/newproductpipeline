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
import { MARKET_SHARE_DATA } from "@/lib/kpi-dashboard/chart-data";
import {
  getAxisProps,
  getTooltipProps,
  chartTheme,
  chartColors,
} from "@/lib/utils/chart-theme";

// Territory colors - use semantic colors from chart theme
const COLORS = {
  northAmerica: chartColors.primary,
  france: chartColors.secondary,
  ukIreland: chartColors.tertiary,
  other: chartColors.quaternary,
};

interface MarketShareChartProps {
  height?: number;
}

export function MarketShareChart({ height = 300 }: MarketShareChartProps) {
  // Round the data values for cleaner display
  const formattedData = MARKET_SHARE_DATA.map((d) => ({
    ...d,
    northAmerica: Math.round(d.northAmerica * 10) / 10,
    france: Math.round(d.france * 10) / 10,
    ukIreland: Math.round(d.ukIreland * 10) / 10,
    other: Math.round(d.other * 10) / 10,
  }));

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid {...chartTheme.grid} />
          <XAxis dataKey="month" {...getAxisProps()} />
          <YAxis
            {...getAxisProps()}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            {...getTooltipProps()}
            formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
          />
          <Legend wrapperStyle={chartTheme.legend.wrapperStyle} />
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
