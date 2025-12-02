"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/supabase/database.types";
import { chartTheme, chartColors, getAxisProps, getTooltipProps, getLegendFormatter } from "@/lib/utils/chart-theme";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface RevenueTrendChartProps {
  businessCases: BusinessCase[];
  onDrillDown?: (fiscalYear: string) => void;
}

export function RevenueTrendChart({
  businessCases,
  onDrillDown,
}: RevenueTrendChartProps) {
  const router = useRouter();
  const { currencySymbol } = useDisplayPreferences();

  // Group by fiscal year
  const byFiscalYear = businessCases.reduce((acc, bc) => {
    const fy = bc.fiscal_year || "Unknown";
    if (!acc[fy]) {
      acc[fy] = { revenue: 0, margin: 0, cogs: 0, count: 0 };
    }
    acc[fy].revenue += bc.total_revenue || 0;
    acc[fy].margin += bc.total_margin || 0;
    acc[fy].cogs += bc.total_cogs || 0;
    acc[fy].count += 1;
    return acc;
  }, {} as Record<string, { revenue: number; margin: number; cogs: number; count: number }>);

  const chartData = Object.entries(byFiscalYear)
    .map(([fy, data]) => ({
      fiscalYear: fy,
      revenue: data.revenue / 1000000, // Convert to millions
      margin: data.margin / 1000000,
      cogs: data.cogs / 1000000,
    }))
    .sort((a, b) => a.fiscalYear.localeCompare(b.fiscalYear));

  const handleClick = (data: any) => {
    if (onDrillDown) {
      onDrillDown(data.fiscalYear);
    } else {
      router.push(`/business-cases?fiscalYear=${data.fiscalYear}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend Over Time</CardTitle>
        <CardDescription>Revenue and margin trends by fiscal year</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <LineChart data={chartData} onClick={handleClick} style={{ cursor: "pointer" }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="fiscalYear" 
              {...getAxisProps()}
            />
            <YAxis 
              {...getAxisProps(`Amount (M${currencySymbol})`, true)}
            />
            <Tooltip
              formatter={(value: number) => `${currencySymbol}${value.toFixed(2)}M`}
              labelFormatter={(label) => `Fiscal Year: ${label}`}
              {...getTooltipProps()}
            />
            <Legend 
              wrapperStyle={chartTheme.legend.wrapperStyle}
              formatter={getLegendFormatter()}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={chartColors.primary}
              strokeWidth={2}
              name="Revenue"
              dot={{ fill: chartColors.primary, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="margin"
              stroke={chartColors.success}
              strokeWidth={2}
              name="Margin"
              dot={{ fill: chartColors.success, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
