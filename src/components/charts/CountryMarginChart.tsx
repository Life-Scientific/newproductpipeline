"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useRouter } from "next/navigation";
import type { EnrichedBusinessCase } from "@/lib/db/types";
import {
  chartTheme,
  chartColors,
  getAxisProps,
  getTooltipProps,
  getLegendFormatter,
} from "@/lib/utils/chart-theme";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";

type BusinessCase = EnrichedBusinessCase;

interface CountryMarginChartProps {
  businessCases: BusinessCase[];
  onDrillDown?: (country: string) => void;
}

export function CountryMarginChart({
  businessCases,
  onDrillDown,
}: CountryMarginChartProps) {
  const router = useRouter();
  const { currencySymbol } = useDisplayPreferences();

  // Group by country and calculate average margin percentage
  const byCountry = businessCases.reduce(
    (acc, bc) => {
      const country = bc.country_name || "Unknown";
      if (!acc[country]) {
        acc[country] = {
          revenue: 0,
          margin: 0,
          marginPercents: [] as number[],
          count: 0,
        };
      }
      acc[country].revenue += bc.total_revenue || 0;
      acc[country].margin += bc.total_margin || 0;
      acc[country].count += 1;
      if (bc.margin_percent !== null && bc.margin_percent !== undefined) {
        acc[country].marginPercents.push(bc.margin_percent);
      }
      return acc;
    },
    {} as Record<
      string,
      {
        revenue: number;
        margin: number;
        marginPercents: number[];
        count: number;
      }
    >,
  );

  const chartData = Object.entries(byCountry)
    .map(([country, data]) => ({
      country,
      marginPercent:
        data.marginPercents.length > 0
          ? data.marginPercents.reduce((a, b) => a + b, 0) /
            data.marginPercents.length
          : data.revenue > 0
            ? (data.margin / data.revenue) * 100
            : 0,
      revenue: data.revenue / 1000000,
      margin: data.margin / 1000000,
      count: data.count,
    }))
    .sort((a, b) => b.marginPercent - a.marginPercent)
    .slice(0, 15); // Top 15 countries

  const handleClick = (data: any) => {
    if (onDrillDown) {
      onDrillDown(data.country);
    } else {
      router.push(
        `/business-cases?country=${encodeURIComponent(data.country)}`,
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Margin % by Country</CardTitle>
        <CardDescription>
          Average margin percentage by country (top 15)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <ResponsiveContainer
          width="100%"
          height={300}
          className="min-h-[300px]"
        >
          <BarChart
            data={chartData}
            layout="vertical"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis type="number" {...getAxisProps("Margin %")} />
            <YAxis
              dataKey="country"
              type="category"
              width={120}
              tick={chartTheme.tick}
              axisLine={chartTheme.axis}
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "marginPercent" || name === "Margin %") {
                  return `${value.toFixed(1)}%`;
                }
                return `${currencySymbol}${value.toFixed(2)}M`;
              }}
              labelFormatter={(label) => `Country: ${label}`}
              {...getTooltipProps()}
              cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
            />
            <Legend
              wrapperStyle={chartTheme.legend.wrapperStyle}
              formatter={getLegendFormatter()}
            />
            <Bar
              dataKey="marginPercent"
              fill={chartColors.success}
              name="Margin %"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
