import { getFormulations, getBusinessCases, getRevenueProjections, getActivePortfolio, getAllProtectionStatus } from "@/lib/db/queries";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/layout/CardGrid";
import { ContentCard } from "@/components/layout/ContentCard";
import { PortfolioMetrics } from "@/components/analytics/PortfolioMetrics";
import { RevenueProjections } from "@/components/analytics/RevenueProjections";
import { PortfolioPrioritization } from "@/components/analytics/PortfolioPrioritization";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { StatusPieChart } from "@/components/charts/StatusPieChart";
import { MarginTrendChart } from "@/components/charts/MarginTrendChart";
import { CountryCoverageChart } from "@/components/charts/CountryCoverageChart";
import { BusinessCaseFormButton } from "@/components/forms/BusinessCaseFormButton";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type RegistrationPipeline = Database["public"]["Views"]["vw_registration_pipeline"]["Row"];

export default async function AnalyticsPage() {
  const [formulations, businessCases, revenueProjections, activePortfolio, protectionStatus] = await Promise.all([
    getFormulations(),
    getBusinessCases(),
    getRevenueProjections(),
    getActivePortfolio(),
    getAllProtectionStatus().catch(() => []), // Gracefully handle errors
  ]);

  const supabase = await createClient();
  const { data: registrationPipeline } = await supabase
    .from("vw_registration_pipeline")
    .select("*", { count: "exact" })
    .limit(10000);

  const registrationPipelineCount = registrationPipeline?.length || 0;

  // Count registrations by status
  const registrationStatusCounts = (registrationPipeline as RegistrationPipeline[] || []).reduce(
    (acc, item) => {
      const status = item.registration_status || "Unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Count by pathway
  const pathwayCounts = (registrationPipeline as RegistrationPipeline[] || []).reduce(
    (acc, item) => {
      const pathway = item.registration_pathway || "Unknown";
      acc[pathway] = (acc[pathway] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <PageLayout
      title="Analytics Dashboard"
      description="Portfolio insights and financial projections"
      variant="multi"
      action={<BusinessCaseFormButton />}
    >
      <Section>
        <PortfolioMetrics
          formulations={formulations}
          businessCases={businessCases}
          activePortfolioCount={activePortfolio?.length || 0}
          registrationPipelineCount={registrationPipelineCount}
        />
      </Section>

      <Section>
        <PortfolioPrioritization
          formulations={formulations}
          businessCases={businessCases}
          protectionStatus={protectionStatus}
        />
      </Section>

      <Section>
        <RevenueProjections businessCases={revenueProjections} />
      </Section>

      <Section>
        <CardGrid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap="md">
          <RevenueChart businessCases={businessCases} />
          <StatusPieChart formulations={formulations} />
        </CardGrid>
      </Section>

      <Section>
        <CardGrid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap="md">
          <MarginTrendChart businessCases={businessCases} />
          <CountryCoverageChart businessCases={businessCases} />
        </CardGrid>
      </Section>

      <Section>
        <CardGrid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap="md">
          <ContentCard
            title="Registration Pipeline Status"
            description="Breakdown by registration status"
            variant="list"
          >
            {Object.keys(registrationStatusCounts).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(registrationStatusCounts).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm">{status}</span>
                    <span className="font-semibold text-sm">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No registration data available.
              </p>
            )}
          </ContentCard>

          <ContentCard
            title="Registration Pathway"
            description="Breakdown by registration pathway"
            variant="list"
          >
            {Object.keys(pathwayCounts).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(pathwayCounts).map(([pathway, count]) => (
                  <div
                    key={pathway}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm">{pathway}</span>
                    <span className="font-semibold text-sm">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No pathway data available.
              </p>
            )}
          </ContentCard>
        </CardGrid>
      </Section>
    </PageLayout>
  );
}
