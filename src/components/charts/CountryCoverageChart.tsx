"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface CountryCoverageChartProps {
  businessCases: BusinessCase[];
  onDrillDown?: (country: string) => void;
}

export function CountryCoverageChart({
  businessCases,
  onDrillDown,
}: CountryCoverageChartProps) {
  const router = useRouter();

  const byCountry = businessCases.reduce((acc, bc) => {
    const country = bc.country_name || "Unknown";
    if (!acc[country]) {
      acc[country] = { revenue: 0, count: 0 };
    }
    acc[country].revenue += bc.total_revenue || 0;
    acc[country].count += 1;
    return acc;
  }, {} as Record<string, { revenue: number; count: number }>);

  const chartData = Object.entries(byCountry)
    .map(([country, data]) => ({
      country,
      revenue: data.revenue / 1000000, // Convert to millions
      count: data.count,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10); // Top 10 countries

  const handleClick = (data: any) => {
    if (onDrillDown) {
      onDrillDown(data.country);
    } else {
      router.push(`/business-cases?country=${encodeURIComponent(data.country)}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Countries by Revenue</CardTitle>
        <CardDescription>Revenue projections by country (top 10)</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <BarChart data={chartData} layout="vertical" onClick={handleClick} style={{ cursor: "pointer" }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" label={{ value: "Revenue (M$)", position: "insideBottom" }} />
            <YAxis dataKey="country" type="category" width={100} />
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(2)}M`}
              labelFormatter={(label) => `Country: ${label}`}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

