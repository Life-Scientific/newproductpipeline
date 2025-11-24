"use client";

import { HeatmapGrid, type HeatmapDataPoint } from "@/components/charts/HeatmapGrid";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface SegmentRevenueMatrixProps {
  businessCases: BusinessCase[];
}

export function SegmentRevenueMatrix({ businessCases }: SegmentRevenueMatrixProps) {
  const revenueByCountry: Record<string, number> = {};
  const revenueByCategory: Record<string, number> = {};
  const dataMap: Record<string, number> = {};
  
  businessCases.forEach(bc => {
    const country = bc.country_name || "Unknown";
    const category = ("formulation_category" in bc ? (bc as any).formulation_category : ("product_category" in bc ? bc.product_category : null)) as string | null || "Other";
    const revenue = bc.total_revenue || 0;
    
    revenueByCountry[country] = (revenueByCountry[country] || 0) + revenue;
    revenueByCategory[category] = (revenueByCategory[category] || 0) + revenue;
    
    const key = `${country}:${category}`;
    dataMap[key] = (dataMap[key] || 0) + revenue;
  });
  
  const topCountries = Object.entries(revenueByCountry)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(e => e[0]);
    
  const categories = Object.keys(revenueByCategory).sort();
  
  const heatmapData: HeatmapDataPoint[] = [];
  
  topCountries.forEach(country => {
    categories.forEach(cat => {
      const key = `${country}:${cat}`;
      const value = dataMap[key] || 0;
      heatmapData.push({
        x: cat,
        y: country,
        value: value / 1000,
        label: value > 0 ? `€${(value / 1000000).toFixed(1)}M` : "",
        context: value > 0 ? `Revenue: €${value.toLocaleString()}` : "No revenue"
      });
    });
  });

  return (
    <HeatmapGrid
      data={heatmapData}
      xLabels={categories}
      yLabels={topCountries}
      valueFormatter={(v) => `€${v.toFixed(0)}K`}
      height={600}
    />
  );
}

