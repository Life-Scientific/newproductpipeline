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

const COLORS = {
  "Not Yet Considered": "#94a3b8",
  Selected: "#10b981",
  Monitoring: "#f59e0b",
  Killed: "#ef4444",
};

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
              fill="#8884d8"
              dataKey="value"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as keyof typeof COLORS] || "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

