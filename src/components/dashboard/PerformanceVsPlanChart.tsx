"use client";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PerformanceVsPlanChartProps {
  data: {
    year: string;
    actual: number;
    plan: number;
    margin: number;
  }[];
}

export function PerformanceVsPlanChart({ data }: PerformanceVsPlanChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Performance vs Plan</CardTitle>
        <CardDescription>Revenue Actuals vs Targets (M€)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="year" 
              tick={{ fill: "var(--color-muted-foreground)" }} 
              axisLine={{ stroke: "var(--color-border)" }}
            />
            <YAxis 
              yAxisId="left" 
              tick={{ fill: "var(--color-muted-foreground)" }} 
              axisLine={{ stroke: "var(--color-border)" }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tick={{ fill: "var(--color-muted-foreground)" }} 
              axisLine={{ stroke: "var(--color-border)" }}
              unit="%"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                borderColor: 'var(--color-border)',
                color: 'var(--color-popover-foreground)'
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="actual" name="Actual Revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            <Line yAxisId="left" type="monotone" dataKey="plan" name="Target" stroke="var(--color-muted-foreground)" strokeDasharray="5 5" />
            <Line yAxisId="right" type="monotone" dataKey="margin" name="Margin %" stroke="var(--color-success)" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}



