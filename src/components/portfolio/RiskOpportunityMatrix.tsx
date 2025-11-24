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

  const data = formulations
    .map((f) => {
      const fCases = businessCases.filter(bc => bc.formulation_id === f.formulation_id);
      const totalRevenue = fCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
      const avgMargin = fCases.length > 0 
        ? fCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / fCases.length 
        : 0;

      const status = ("formulation_status" in f ? (f as any).formulation_status : ("status" in f ? f.status : null)) as string | null;
      if (totalRevenue === 0 && status === 'Not Yet Considered') return null;

      const name = ("formulation_name" in f ? (f as any).formulation_name : ("product_name" in f ? f.product_name : null)) as string | null;
      return {
        id: f.formulation_id || "",
        name: name || f.formulation_code || "Unknown",
        x: readinessScore[status || ""] || 20,
        y: totalRevenue / 1000000,
        z: Math.max(10, avgMargin * 10),
        category: status || "Unknown",
        fill: status === 'Selected' ? "var(--color-success)" : 
              status === 'Monitoring' ? "var(--color-info)" : "var(--color-muted)",
      };
    })
    .filter((d) => d !== null) as ScatterDataPoint[];

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
