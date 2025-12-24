"use client";

import dynamic from "next/dynamic";
import { ChartSkeleton } from "./ChartSkeleton";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"] & {
  country_id?: string | null;
};
type Formulation =
  Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

interface TenYearProjectionChartLazyProps {
  businessCases: BusinessCase[];
  formulations: Formulation[];
}

/**
 * Lazy-loaded wrapper for TenYearProjectionChart.
 * Uses dynamic import to defer loading of heavy chart libraries (Recharts, Framer Motion)
 * until the component is actually rendered.
 */
const TenYearProjectionChartDynamic = dynamic(
  () =>
    import("./TenYearProjectionChart").then((mod) => ({
      default: mod.TenYearProjectionChart,
    })),
  {
    ssr: false,
    loading: () => <ChartSkeleton height={500} />,
  },
);

export function TenYearProjectionChartLazy({
  businessCases,
  formulations,
}: TenYearProjectionChartLazyProps) {
  return (
    <TenYearProjectionChartDynamic
      businessCases={businessCases}
      formulations={formulations}
    />
  );
}

