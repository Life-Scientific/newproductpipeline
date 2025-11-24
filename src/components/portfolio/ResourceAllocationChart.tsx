"use client";

import { ScatterPlotChart, type ScatterDataPoint } from "@/components/charts/ScatterPlotChart";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface ResourceAllocationChartProps {
  businessCases: BusinessCase[];
}

export function ResourceAllocationChart({ businessCases }: ResourceAllocationChartProps) {
  const formulationStats: Record<string, {
    revenue: number;
    cogs: number;
    margin: number;
    startYear: number;
    name: string;
  }> = {};

  businessCases.forEach(bc => {
    if (!bc.formulation_code) return;
    const code = bc.formulation_code;
    
    if (!formulationStats[code]) {
      formulationStats[code] = {
        revenue: 0,
        cogs: 0,
        margin: 0,
        startYear: 9999,
        name: (("formulation_name" in bc ? (bc as any).formulation_name : ("product_name" in bc ? (bc as any).product_name : null)) as string | null) || code,
      };
    }
    
    formulationStats[code].revenue += bc.total_revenue || 0;
    formulationStats[code].cogs += bc.total_cogs || 0;
    formulationStats[code].margin += bc.total_margin || 0;
    
    const fy = parseInt(bc.fiscal_year || "9999");
    if (fy < formulationStats[code].startYear) {
      formulationStats[code].startYear = fy;
    }
  });

  const data = Object.entries(formulationStats)
    .map(([code, stats]) => {
      if (stats.revenue === 0) return null;
      const marginPercent = (stats.margin / stats.revenue) * 100;
      
      return {
        id: code,
        name: stats.name,
        x: stats.startYear === 9999 ? new Date().getFullYear() : stats.startYear,
        y: stats.revenue / 1000000,
        z: marginPercent,
        category: marginPercent > 40 ? "High Margin" : marginPercent > 20 ? "Medium Margin" : "Low Margin",
        fill: marginPercent > 40 ? "var(--color-success)" : marginPercent > 20 ? "var(--color-info)" : "var(--color-warning)",
      };
    })
    .filter((d) => d !== null) as ScatterDataPoint[];

  return (
    <ScatterPlotChart
      data={data}
      xAxisLabel="Launch Fiscal Year"
      yAxisLabel="Total Revenue (M€)"
      zAxisLabel="Margin %"
      xAxisDomain={['auto', 'auto']}
      categories={["High Margin", "Medium Margin", "Low Margin"]}
      height={400}
    />
  );
}
