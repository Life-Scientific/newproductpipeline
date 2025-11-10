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

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface RevenueChartProps {
  businessCases: BusinessCase[];
  onDrillDown?: (fiscalYear: string) => void;
}

export function RevenueChart({ businessCases, onDrillDown }: RevenueChartProps) {
  const router = useRouter();

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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fiscalYear" />
            <YAxis label={{ value: "Amount (M$)", angle: -90, position: "insideLeft" }} />
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(2)}M`}
              labelFormatter={(label) => `Fiscal Year: ${label}`}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
            <Bar dataKey="margin" fill="#82ca9d" name="Margin" />
            <Bar dataKey="cogs" fill="#ffc658" name="COGS" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

