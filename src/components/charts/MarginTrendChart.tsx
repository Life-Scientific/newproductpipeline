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

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface MarginTrendChartProps {
  businessCases: BusinessCase[];
  onDrillDown?: (yearOffset: number) => void;
}

export function MarginTrendChart({ businessCases, onDrillDown }: MarginTrendChartProps) {
  const router = useRouter();

  // Group by year offset
  const byYearOffset = businessCases.reduce((acc, bc) => {
    const offset = bc.year_offset || 0;
    if (!acc[offset]) {
      acc[offset] = { revenue: 0, margin: 0, count: 0, marginPercents: [] };
    }
    acc[offset].revenue += bc.total_revenue || 0;
    acc[offset].margin += bc.total_margin || 0;
    acc[offset].count += 1;
    if (bc.margin_percent !== null && bc.margin_percent !== undefined) {
      acc[offset].marginPercents.push(bc.margin_percent);
    }
    return acc;
  }, {} as Record<number, { revenue: number; margin: number; count: number; marginPercents: number[] }>);

  const chartData = Object.entries(byYearOffset)
    .map(([offset, data]) => ({
      yearOffset: `Year ${offset}`,
      offset: Number(offset),
      marginPercent:
        data.marginPercents.length > 0
          ? data.marginPercents.reduce((a, b) => a + b, 0) / data.marginPercents.length
          : data.revenue > 0
            ? (data.margin / data.revenue) * 100
            : 0,
      revenue: data.revenue / 1000000,
      margin: data.margin / 1000000,
    }))
    .sort((a, b) => a.offset - b.offset);

  const handleClick = (data: any) => {
    if (onDrillDown) {
      onDrillDown(data.offset);
    } else {
      router.push(`/business-cases?yearOffset=${data.offset}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Margin Trend by Year</CardTitle>
        <CardDescription>Average margin percentage by year offset</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <LineChart data={chartData} onClick={handleClick} style={{ cursor: "pointer" }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="yearOffset" />
            <YAxis label={{ value: "Margin %", angle: -90, position: "insideLeft" }} />
            <Tooltip
              formatter={(value: number) => `${value.toFixed(1)}%`}
              labelFormatter={(label) => label}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="marginPercent"
              stroke="#8884d8"
              strokeWidth={2}
              name="Margin %"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

