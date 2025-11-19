"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

interface StatusPieChartProps {
  formulations: Formulation[];
  onDrillDown?: (status: string) => void;
}

// Use CSS variables for theme-aware colors
const STATUS_COLORS: Record<string, string> = {
  "Not Yet Considered": "var(--color-muted)",
  "Selected": "var(--color-success)",
  "Monitoring": "var(--color-info)", // or warning depending on preference
  "Killed": "var(--color-destructive)",
};

// Fallback colors from the theme chart palette
const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function StatusPieChart({ formulations, onDrillDown }: StatusPieChartProps) {
  const router = useRouter();

  const statusCounts = formulations.reduce((acc, f) => {
    const status = f.status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  const handleClick = (data: any) => {
    const status = data.name;
    if (onDrillDown) {
      onDrillDown(status);
    } else {
      router.push(`/formulations?status=${encodeURIComponent(status)}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Status</CardTitle>
        <CardDescription>Formulation status breakdown</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="var(--color-chart-1)"
              dataKey="value"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              {chartData.map((entry, index) => {
                const color = STATUS_COLORS[entry.name] || CHART_COLORS[index % CHART_COLORS.length];
                return <Cell key={`cell-${index}`} fill={color} stroke="var(--color-background)" strokeWidth={2} />;
              })}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                borderColor: 'var(--color-border)',
                color: 'var(--color-popover-foreground)'
              }}
              itemStyle={{ color: 'var(--color-foreground)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
