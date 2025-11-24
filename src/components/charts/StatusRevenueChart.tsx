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

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface StatusRevenueChartProps {
  formulations: Formulation[];
  businessCases: BusinessCase[];
  onDrillDown?: (status: string) => void;
}

export function StatusRevenueChart({
  formulations,
  businessCases,
  onDrillDown,
}: StatusRevenueChartProps) {
  const router = useRouter();

  // Create a map of formulation_id to status
  const formulationStatusMap = new Map<string, string>();
  formulations.forEach((f) => {
    if (f.formulation_id) {
      formulationStatusMap.set(f.formulation_id, f.status || "Unknown");
    }
  });

  // Group business cases by status
  const byStatus = businessCases.reduce((acc, bc) => {
    const formulationId = bc.formulation_id;
    const status = formulationId
      ? formulationStatusMap.get(formulationId) || "Unknown"
      : "Unknown";

    if (!acc[status]) {
      acc[status] = { revenue: 0, margin: 0, count: 0 };
    }
    acc[status].revenue += bc.total_revenue || 0;
    acc[status].margin += bc.total_margin || 0;
    acc[status].count += 1;
    return acc;
  }, {} as Record<string, { revenue: number; margin: number; count: number }>);

  const chartData = Object.entries(byStatus)
    .map(([status, data]) => ({
      status,
      revenue: data.revenue / 1000000, // Convert to millions
      margin: data.margin / 1000000,
      marginPercent: data.revenue > 0 ? (data.margin / data.revenue) * 100 : 0,
      count: data.count,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const handleClick = (data: any) => {
    if (onDrillDown) {
      onDrillDown(data.status);
    } else {
      router.push(`/formulations?status=${encodeURIComponent(data.status)}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Margin by Status</CardTitle>
        <CardDescription>Financial projections grouped by formulation status</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <BarChart data={chartData} onClick={handleClick} style={{ cursor: "pointer" }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" angle={-45} textAnchor="end" height={80} />
            <YAxis label={{ value: "Amount (M$)", angle: -90, position: "insideLeft" }} />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "marginPercent") {
                  return `${value.toFixed(1)}%`;
                }
                return `$${value.toFixed(2)}M`;
              }}
              labelFormatter={(label) => `Status: ${label}`}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" name="Revenue (M$)" />
            <Bar dataKey="margin" fill="#82ca9d" name="Margin (M$)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}






