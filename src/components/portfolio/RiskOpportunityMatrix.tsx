"use client";

import { ScatterPlotChart, type ScatterDataPoint } from "@/components/charts/ScatterPlotChart";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface RiskOpportunityMatrixProps {
  formulations: Formulation[];
  businessCases: BusinessCase[];
}

export function RiskOpportunityMatrix({ formulations, businessCases }: RiskOpportunityMatrixProps) {
  const readinessScore: Record<string, number> = {
    "Selected": 80,
    "Monitoring": 40,
    "Not Yet Considered": 10,
    "Killed": 0,
  };

  const data: ScatterDataPoint[] = formulations
    .map((f) => {
      const fCases = businessCases.filter(bc => bc.formulation_id === f.formulation_id);
      const totalRevenue = fCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
      const avgMargin = fCases.length > 0 
        ? fCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / fCases.length 
        : 0;

      if (totalRevenue === 0 && f.status === 'Not Yet Considered') return null;

      return {
        id: f.formulation_id,
        name: f.product_name || f.formulation_code || "Unknown",
        x: readinessScore[f.status || ""] || 20,
        y: totalRevenue / 1000000,
        z: Math.max(10, avgMargin * 10),
        category: f.status || "Unknown",
        fill: f.status === 'Selected' ? "var(--color-success)" : 
              f.status === 'Monitoring' ? "var(--color-info)" : "var(--color-muted)",
      };
    })
    .filter((d): d is ScatterDataPoint => d !== null);

  return (
    <ScatterPlotChart
      data={data}
      xAxisLabel="Commercial Readiness Score"
      yAxisLabel="Revenue Potential (M€)"
      zAxisLabel="Avg Margin %"
      xAxisDomain={[0, 100]}
      categories={["Selected", "Monitoring", "Not Yet Considered"]}
      height={400}
    />
  );
}
