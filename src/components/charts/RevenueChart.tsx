"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Database } from "@/lib/supabase/database.types";
import { useRouter } from "next/navigation";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface RevenueChartProps {
  businessCases: BusinessCase[];
  onDrillDown?: (fiscalYear: string) => void;
}

export function RevenueChart({ businessCases, onDrillDown }: RevenueChartProps) {
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
      marginPercent: data.revenue > 0 ? (data.margin / data.revenue) * 100 : 0,
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
        <CardTitle>Revenue Projections</CardTitle>
        <CardDescription>Revenue, margin, and COGS by fiscal year</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <BarChart data={chartData} onClick={handleClick} style={{ cursor: "pointer" }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="fiscalYear" 
              tick={{ fill: 'var(--color-muted-foreground)' }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis 
              label={{ value: `Amount (M${currencySymbol})`, angle: -90, position: "insideLeft", fill: 'var(--color-muted-foreground)' }} 
              tick={{ fill: 'var(--color-muted-foreground)' }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <Tooltip
              formatter={(value: number) => [`${currencySymbol}${value.toFixed(2)}M`, ""]}
              labelFormatter={(label) => `Fiscal Year: ${label}`}
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                borderColor: 'var(--color-border)',
                color: 'var(--color-popover-foreground)'
              }}
              itemStyle={{ color: 'var(--color-foreground)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="revenue" fill="var(--color-chart-1)" name="Revenue" radius={[4, 4, 0, 0]} />
            <Bar dataKey="margin" fill="var(--color-chart-2)" name="Margin" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cogs" fill="var(--color-chart-3)" name="COGS" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
