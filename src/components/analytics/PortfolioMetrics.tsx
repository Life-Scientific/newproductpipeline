"use client";

import { CardGrid } from "@/components/layout/CardGrid";
import { MetricCard } from "@/components/layout/MetricCard";
import { ContentCard } from "@/components/layout/ContentCard";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface PortfolioMetricsProps {
  formulations: Formulation[];
  businessCases: BusinessCase[];
  activePortfolioCount: number;
  registrationPipelineCount: number;
}

export function PortfolioMetrics({
  formulations,
  businessCases,
  activePortfolioCount,
  registrationPipelineCount,
}: PortfolioMetricsProps) {
  const totalFormulations = formulations.length;
  const selectedFormulations = formulations.filter((f) => f.status === "Selected").length;
  const monitoringFormulations = formulations.filter((f) => f.status === "Monitoring").length;
  const killedFormulations = formulations.filter((f) => f.status === "Killed").length;

  const totalRevenue = businessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
  const totalMargin = businessCases.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
  const avgMarginPercent =
    businessCases.length > 0
      ? businessCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / businessCases.length
      : 0;

  const uniqueCountries = new Set(businessCases.map((bc) => bc.country_name).filter(Boolean)).size;

  return (
    <CardGrid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap="md">
      <MetricCard
        title="Total Formulations"
        value={totalFormulations}
        subtitle={`${selectedFormulations} selected, ${monitoringFormulations} monitoring`}
      />
      <MetricCard
        title="Active Portfolio"
        value={activePortfolioCount}
        subtitle="Currently selling products"
      />
      <MetricCard
        title="Total Revenue Projections"
        value={`$${(totalRevenue / 1000000).toFixed(1)}M`}
        subtitle={`Across ${businessCases.length} business cases`}
      />
      <MetricCard
        title="Average Margin %"
        value={`${avgMarginPercent.toFixed(1)}%`}
        subtitle={`Total margin: $${(totalMargin / 1000000).toFixed(1)}M`}
      />
      <MetricCard
        title="Countries Covered"
        value={uniqueCountries}
        subtitle="Active business cases"
      />
      <MetricCard
        title="Registration Pipeline"
        value={registrationPipelineCount}
        subtitle="Active registrations"
      />
      <ContentCard
        title="Status Breakdown"
        variant="default"
        className="col-span-full md:col-span-2 lg:col-span-1"
      >
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Selected:</span>
            <span className="font-semibold">{selectedFormulations}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Monitoring:</span>
            <span className="font-semibold">{monitoringFormulations}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Killed:</span>
            <span className="font-semibold">{killedFormulations}</span>
          </div>
        </div>
      </ContentCard>
      <MetricCard
        title="Total Business Cases"
        value={businessCases.length}
        subtitle="Financial projections"
      />
    </CardGrid>
  );
}
