"use client";

import { WaterfallChart, type WaterfallDataPoint } from "@/components/charts/WaterfallChart";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface MarginWaterfallChartProps {
  businessCases: BusinessCase[];
}

export function MarginWaterfallChart({ businessCases }: MarginWaterfallChartProps) {
  let totalRevenue = 0;
  let totalCOGS = 0;

  businessCases.forEach(bc => {
    totalRevenue += bc.total_revenue || 0;
    totalCOGS += bc.total_cogs || 0;
  });

  const totalMargin = totalRevenue - totalCOGS;

  const data: WaterfallDataPoint[] = [
    { name: "Gross Revenue", value: totalRevenue / 1000000, isTotal: true },
    { name: "Cost of Goods", value: -(totalCOGS / 1000000) },
    { name: "Net Margin", value: totalMargin / 1000000, isTotal: true },
  ];

  return (
    <WaterfallChart
      data={data}
      currencySymbol="€"
      height={400}
    />
  );
}

