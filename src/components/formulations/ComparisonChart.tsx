"use client";

import { useMemo } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FormulationMetrics } from "./comparison-utils";

interface ComparisonChartProps {
  formulationNames: string[];
  metricsByFormulation: Record<string, FormulationMetrics>;
}

export const ComparisonChart = ({
  formulationNames,
  metricsByFormulation,
}: ComparisonChartProps) => {
  const chartData = useMemo(() => {
    return formulationNames.map((name) => ({
      name: name.substring(0, 15),
      Revenue: metricsByFormulation[name]?.totalRevenue || 0,
      Margin: metricsByFormulation[name]?.totalMargin || 0,
    }));
  }, [formulationNames, metricsByFormulation]);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Margin Comparison</CardTitle>
        <CardDescription>
          Visual comparison of financial performance across formulations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => [
                  `$${(value / 1000000).toFixed(2)}M`,
                  "",
                ]}
              />
              <Legend />
              <Bar dataKey="Revenue" fill="#8884d8" name="Revenue" />
              <Bar dataKey="Margin" fill="#82ca9d" name="Margin" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
