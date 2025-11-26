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
import { chartTheme, chartColors, getAxisProps, getLegendFormatter } from "@/lib/utils/chart-theme";

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
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="status" 
              angle={-45} 
              textAnchor="end" 
              height={80}
              tick={chartTheme.tick}
              axisLine={chartTheme.axis}
              tickFormatter={(value) => {
                const data = chartData.find(d => d.status === value);
                return data ? `${value} (${data.count})` : value;
              }}
            />
            <YAxis 
              {...getAxisProps("Amount (M$)", true)}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = chartData.find(d => d.status === label);
                  return (
                    <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold text-sm mb-2 text-foreground">
                        Status: {label}
                        {data && <span className="ml-2 text-muted-foreground font-normal">({data.count} business cases)</span>}
                      </p>
                      {payload.map((entry: any, index: number) => {
                        if (entry.dataKey === 'count') return null;
                        const color = entry.color;
                        const name = entry.name;
                        return (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-muted-foreground">{name}:</span>
                            <span className="font-medium text-foreground">
                              {name === "Margin %" 
                                ? `${Number(entry.value).toFixed(1)}%`
                                : `$${Number(entry.value).toFixed(2)}M`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
            />
            <Legend 
              wrapperStyle={chartTheme.legend.wrapperStyle}
              formatter={getLegendFormatter()}
            />
            <Bar 
              dataKey="revenue" 
              fill={chartColors.primary} 
              name="Revenue (M$)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="margin" 
              fill={chartColors.success} 
              name="Margin (M$)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
