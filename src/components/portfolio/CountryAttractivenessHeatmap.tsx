"use client";

import { HeatmapGrid, type HeatmapDataPoint } from "@/components/charts/HeatmapGrid";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface CountryAttractivenessHeatmapProps {
  businessCases: BusinessCase[];
}

export function CountryAttractivenessHeatmap({ businessCases }: CountryAttractivenessHeatmapProps) {
  const revenueByCountry: Record<string, number> = {};
  const revenueByFormulation: Record<string, number> = {};
  const dataMap: Record<string, number> = {};
  
  businessCases.forEach(bc => {
    const country = bc.country_name || "Unknown";
    const formulation = bc.formulation_code || "Unknown";
    const revenue = bc.total_revenue || 0;
    
    revenueByCountry[country] = (revenueByCountry[country] || 0) + revenue;
    revenueByFormulation[formulation] = (revenueByFormulation[formulation] || 0) + revenue;
    
    const key = `${country}:${formulation}`;
    dataMap[key] = (dataMap[key] || 0) + revenue;
  });
  
  const topCountries = Object.entries(revenueByCountry)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(e => e[0]);
    
  const topFormulations = Object.entries(revenueByFormulation)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(e => e[0]);
    
  const heatmapData: HeatmapDataPoint[] = [];
  
  topCountries.forEach(country => {
    topFormulations.forEach(formulation => {
      const key = `${country}:${formulation}`;
      const value = dataMap[key] || 0;
      heatmapData.push({
        x: formulation,
        y: country,
        value: value / 1000,
        label: value > 0 ? `${(value / 1000000).toFixed(1)}M` : "-",
        context: value > 0 ? `Revenue: €${value.toLocaleString()}` : "No active business case"
      });
    });
  });

  return (
    <HeatmapGrid
      data={heatmapData}
      xLabels={topFormulations}
      yLabels={topCountries}
      valueFormatter={(v) => `€${v.toFixed(0)}K`}
      height={500}
    />
  );
}
