import {
  getFormulations,
  getBusinessCases,
  getActivePortfolio,
} from "@/lib/db/queries";
import { FormulationsList } from "@/components/formulations/FormulationsList";
import { PageLayout } from "@/components/layout/PageLayout";
import { CardGrid } from "@/components/layout/CardGrid";
import { MetricCard } from "@/components/layout/MetricCard";
import { ContentCard } from "@/components/layout/ContentCard";
import { TimelineCard } from "@/components/relationships/TimelineCard";
import { BusinessCaseListItem } from "@/components/business-cases/BusinessCaseListItem";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import Link from "next/link";

type StatusHistory = Database["public"]["Tables"]["formulation_status_history"]["Row"];

export default async function Home() {
  const [formulations, businessCases, activePortfolio] = await Promise.all([
    getFormulations(),
    getBusinessCases(),
    getActivePortfolio(),
  ]);

  const totalFormulations = formulations.length;
  const activeFormulations = formulations.filter((f) => f.status === "Selected").length;
  const monitoringFormulations = formulations.filter((f) => f.status === "Monitoring").length;

  // Get recent status changes
  const supabase = await createClient();
  const { data: recentStatusChanges } = await supabase
    .from("formulation_status_history")
    .select(`
      *,
      formulations!inner (
        formulation_id,
        formulation_code,
        product_name
      )
    `)
    .order("changed_at", { ascending: false })
    .limit(10);

  // Calculate business case metrics
  const totalBusinessCases = businessCases.length;
  const totalRevenue = businessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
  const avgMarginPercent =
    businessCases.length > 0
      ? businessCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / businessCases.length
      : 0;

  // Get unique countries from business cases
  const uniqueCountries = new Set(
    businessCases.map((bc) => bc.country_name).filter(Boolean)
  ).size;

  // Get registration pipeline count
  const { data: registrationPipeline } = await supabase
    .from("vw_registration_pipeline")
    .select("*", { count: "exact" })
    .limit(1);

  const registrationCount = registrationPipeline?.length || 0;

  // Transform status changes for TimelineCard
  const timelineEvents =
    recentStatusChanges?.map((change: any) => {
      const formulation = change.formulations;
      return {
        id: change.history_id,
        date: change.changed_at || new Date(),
        type: change.new_status || "Status Change",
        title: `${formulation?.formulation_code || "—"} - ${formulation?.product_name || "—"}`,
        description: change.old_status
          ? `${change.old_status} → ${change.new_status}`
          : undefined,
        user: change.changed_by,
        href: `/formulations/${formulation?.formulation_id}`,
      };
    }) || [];

  return (
    <PageLayout
      title="Dashboard"
      description="LS Portfolio overview"
      variant="multi"
    >
      <CardGrid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap="md">
        <MetricCard
          title="Total Formulations"
          value={totalFormulations}
          subtitle={`${activeFormulations} selected, ${monitoringFormulations} monitoring`}
          href="/formulations"
        />
        <MetricCard
          title="Active Portfolio"
          value={activePortfolio?.length || 0}
          subtitle="Currently selling products"
          href="/formulations?filter=active"
        />
        <MetricCard
          title="Total Business Cases"
          value={totalBusinessCases}
          subtitle={`$${(totalRevenue / 1000000).toFixed(1)}M projected revenue`}
          href="/business-cases"
        />
        <MetricCard
          title="Average Margin %"
          value={`${avgMarginPercent.toFixed(1)}%`}
          subtitle="Across all business cases"
          href="/business-cases?sort=margin"
        />
        <MetricCard
          title="Countries Covered"
          value={uniqueCountries}
          subtitle="Active business cases"
          href="/business-cases?view=countries"
        />
        <MetricCard
          title="Active Registrations"
          value={registrationCount}
          subtitle="In registration pipeline"
          href="/registration"
        />
      </CardGrid>

      <CardGrid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap="md">
        <TimelineCard
          events={timelineEvents}
          title="Recent Status Changes"
          description="Latest formulation status updates"
          maxEvents={10}
          showFilters={true}
        />

        <ContentCard
          title="Recent Business Cases"
          description="Latest financial projections"
          variant="list"
          action={
            <Link
              href="/business-cases"
              className="text-sm text-primary hover:underline"
            >
              View all →
            </Link>
          }
        >
          {businessCases.length > 0 ? (
            <div className="space-y-2">
              {businessCases.slice(0, 5).map((bc) => (
                <BusinessCaseListItem key={bc.business_case_id} businessCase={bc} />
              ))}
              {businessCases.length > 5 && (
                <div className="pt-2 border-t">
                  <Link
                    href="/business-cases"
                    className="text-sm text-primary hover:underline block text-center font-medium"
                  >
                    View all {businessCases.length} business cases →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No business cases found.
            </p>
          )}
        </ContentCard>
      </CardGrid>

      <ContentCard
        title="Recent Formulations"
        description="Manage your product portfolio formulations"
        variant="table"
        action={
          <Link
            href="/formulations"
            className="text-sm text-primary hover:underline"
          >
            View all →
          </Link>
        }
      >
        <FormulationsList formulations={formulations} />
      </ContentCard>
    </PageLayout>
  );
}
