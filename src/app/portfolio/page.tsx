import {
  getFormulations,
  getBusinessCasesForChart,
  getActivePortfolio,
  getExchangeRates,
  getFormulationCountries,
} from "@/lib/db/queries";
import { getAllUseGroups } from "@/lib/db/use-groups";
import { getCountries } from "@/lib/db/countries";
import { FormulationsList } from "@/components/formulations/FormulationsList";
import { PageLayout } from "@/components/layout/PageLayout";
import { CardGrid } from "@/components/layout/CardGrid";
import { ContentCard } from "@/components/layout/ContentCard";
import { TimelineCard } from "@/components/relationships/TimelineCard";
import { BusinessCaseListItem } from "@/components/business-cases/BusinessCaseListItem";
import { DashboardClient } from "./DashboardClient";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { countUniqueBusinessCaseGroups } from "@/lib/utils/business-case-utils";
import { getFormulationStatus, getCountryStatus, getUseGroupStatus } from "@/lib/utils/schema-migration";
import { getStatusVariant } from "@/lib/design-system";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Cache dashboard data for 60 seconds
export const revalidate = 60;

type StatusHistory = Database["public"]["Tables"]["formulation_status_history"]["Row"];

export default async function Home() {
  let formulations: any[] = [];
  let countries: any[] = [];
  let businessCases: any[] = [];
  let activePortfolio: any[] = [];
  let allExchangeRates: any[] = [];
  let formulationCountries: any[] = [];
  let useGroups: any[] = [];
  
  try {
    [formulations, countries, businessCases, activePortfolio, allExchangeRates, formulationCountries, useGroups] = await Promise.all([
      getFormulations(),
      getCountries(), // Reference data for filter lookups
      getBusinessCasesForChart(), // Lightweight version for chart - only essential columns
      getActivePortfolio(),
      getExchangeRates(),
      getFormulationCountries(), // For accurate counts
      getAllUseGroups(), // For use group counts
    ]);
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    // Set defaults on error
    formulations = [];
    countries = [];
    businessCases = [];
    activePortfolio = [];
    allExchangeRates = [];
    formulationCountries = [];
    useGroups = [];
  }

  // Create exchange rate map: country_id -> exchange_rate_to_eur
  // Get the latest rate for each country
  const exchangeRateMap = new Map<string, number>();
  const countryToLatestRate = new Map<string, { rate: number; date: string }>();
  
  allExchangeRates.forEach((er: any) => {
    if (er.country_id && er.exchange_rate_to_eur && er.is_active) {
      const existing = countryToLatestRate.get(er.country_id);
      if (!existing || er.effective_date > existing.date) {
        countryToLatestRate.set(er.country_id, {
          rate: er.exchange_rate_to_eur,
          date: er.effective_date,
        });
      }
    }
  });
  
  countryToLatestRate.forEach((value, countryId) => {
    exchangeRateMap.set(countryId, value.rate);
  });

  const totalFormulations = formulations.length;
  const activeFormulations = formulations.filter((f) => f.status === "Selected").length;
  const monitoringFormulations = formulations.filter((f) => f.status === "Being Monitored").length;

  // Fetch formulation countries and use groups for status counts (with pagination)
  const supabase = await createClient();
  
  // Fetch formulation country statuses with pagination
  let formulationCountryStatuses: any[] = [];
  let fcPage = 0;
  const fcPageSize = 10000;
  let fcHasMore = true;
  
  while (fcHasMore) {
    const { data: pageData } = await supabase
      .from("formulation_country")
      .select("country_status")
      .eq("is_active", true)
      .range(fcPage * fcPageSize, (fcPage + 1) * fcPageSize - 1);
    
    if (!pageData || pageData.length === 0) {
      fcHasMore = false;
    } else {
      formulationCountryStatuses = [...formulationCountryStatuses, ...pageData];
      fcHasMore = pageData.length === fcPageSize;
      fcPage++;
    }
  }
  
  // Fetch use group statuses with pagination (for status counts only)
  let useGroupStatuses: any[] = [];
  let ugPage = 0;
  const ugPageSize = 10000;
  let ugHasMore = true;
  
  while (ugHasMore) {
    const { data: pageData } = await supabase
      .from("formulation_country_use_group")
      .select("use_group_status, is_active")
      .range(ugPage * ugPageSize, (ugPage + 1) * ugPageSize - 1);
    
    if (!pageData || pageData.length === 0) {
      ugHasMore = false;
    } else {
      useGroupStatuses = [...useGroupStatuses, ...pageData];
      ugHasMore = pageData.length === ugPageSize;
      ugPage++;
    }
  }

  // Calculate formulation status counts
  const formulationStatusCounts = formulations.reduce((acc, f) => {
    const status = getFormulationStatus(f) || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate country status counts
  const countryStatusCounts = formulationCountryStatuses.reduce((acc, fc) => {
    const status = getCountryStatus(fc) || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate use group status counts (use is_active if use_group_status is null)
  const useGroupStatusCounts = useGroupStatuses.reduce((acc, ug) => {
    const status = getUseGroupStatus(ug) || (ug.is_active ? "Active" : "Inactive");
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalFormulationCountries = formulationCountries.length;
  const totalUseGroups = useGroups.length;

  // Enrich formulation-country data with formulation status for DashboardClient
  const formulationCodeToStatus = new Map<string, string>();
  formulations.forEach((f) => {
    if (f.formulation_code && f.status) {
      formulationCodeToStatus.set(f.formulation_code, f.status);
    }
  });

  const enrichedFormulationCountries = formulationCountries.map((fc: any) => ({
    ...fc,
    formulation_status: fc.formulation_code 
      ? (formulationCodeToStatus.get(fc.formulation_code) || null)
      : null,
  }));

  // Build country status lookup map for use groups (formulation_country_id -> country_status)
  const formulationCountryIdToStatus = new Map<string, string>();
  formulationCountries.forEach((fc: any) => {
    if (fc.formulation_country_id && fc.country_status) {
      formulationCountryIdToStatus.set(fc.formulation_country_id, fc.country_status);
    }
  });

  // Enrich use groups with formulation_status and country_status for DashboardClient
  const enrichedUseGroups = useGroups.map((ug: any) => ({
    ...ug,
    formulation_status: ug.formulation_code 
      ? (formulationCodeToStatus.get(ug.formulation_code) || null)
      : null,
    country_status: ug.formulation_country_id
      ? (formulationCountryIdToStatus.get(ug.formulation_country_id) || null)
      : null,
  }));

  // Get recent status changes
  const { data: recentStatusChanges } = await supabase
    .from("formulation_status_history")
    .select(`
      *,
      formulations!inner (
        formulation_id,
        formulation_code,
        formulation_name
      )
    `)
    .order("changed_at", { ascending: false })
    .limit(10);

  // Calculate business case metrics
  // Note: getBusinessCases() already filters out orphaned business cases
  // Count unique business case groups (multi-year projections) instead of individual year records
  const totalBusinessCaseGroups = countUniqueBusinessCaseGroups(businessCases);
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
        title: `${formulation?.formulation_code || "—"} - ${("formulation_name" in (formulation || {}) ? (formulation as any).formulation_name : formulation?.formulation_code) || "—"}`,
        description: change.old_status
          ? `${change.old_status} → ${change.new_status}`
          : undefined,
        user: change.changed_by,
        href: `/portfolio/formulations/${formulation?.formulation_id}`,
      };
    }) || [];

  return (
    <PageLayout
      title="Dashboard"
      description="Navigator overview"
      variant="multi"
    >
      {/* 10-Year Projection Chart with Global Filters */}
      <DashboardClient 
        businessCases={businessCases} 
        formulations={formulations}
        countries={countries}
        formulationCountries={enrichedFormulationCountries}
        useGroups={enrichedUseGroups}
      />

      {/* Status Overview Cards */}
      <CardGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap="md">
        {/* Formulations Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Formulations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold tabular-nums">{totalFormulations}</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Selected</span>
                <Badge variant={getStatusVariant("Selected", "formulation")}>
                  {formulationStatusCounts["Selected"] || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Being Monitored</span>
                <Badge variant={getStatusVariant("Being Monitored", "formulation")}>
                  {formulationStatusCounts["Being Monitored"] || formulationStatusCounts["Monitoring"] || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Not Yet Evaluated</span>
                <Badge variant={getStatusVariant("Not Yet Evaluated", "formulation")}>
                  {formulationStatusCounts["Not Yet Evaluated"] || formulationStatusCounts["Not Yet Considered"] || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Killed</span>
                <Badge variant={getStatusVariant("Killed", "formulation")}>
                  {formulationStatusCounts["Killed"] || 0}
                </Badge>
              </div>
            </div>
            <div className="pt-2 border-t">
              <Link href="/portfolio/formulations" className="text-sm text-primary hover:underline block text-center">
                View all →
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Formulation-Countries Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Formulation-Countries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold tabular-nums">{totalFormulationCountries}</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Selected for entry</span>
                <Badge variant={getStatusVariant("Selected for entry", "country")}>
                  {countryStatusCounts["Selected for entry"] || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Not yet evaluated</span>
                <Badge variant={getStatusVariant("Not yet evaluated", "country")}>
                  {countryStatusCounts["Not yet evaluated"] || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Not selected</span>
                <Badge variant={getStatusVariant("Not selected for entry", "country")}>
                  {countryStatusCounts["Not selected for entry"] || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">On hold</span>
                <Badge variant={getStatusVariant("On hold", "country")}>
                  {countryStatusCounts["On hold"] || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Withdrawn</span>
                <Badge variant={getStatusVariant("Withdrawn", "country")}>
                  {countryStatusCounts["Withdrawn"] || 0}
                </Badge>
              </div>
            </div>
            <div className="pt-2 border-t">
              <Link href="/portfolio/formulation-countries" className="text-sm text-primary hover:underline block text-center">
                View all →
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Use Groups Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Use Groups
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold tabular-nums">{totalUseGroups}</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active</span>
                <Badge variant={getStatusVariant("Active", "registration")}>
                  {useGroupStatusCounts["Active"] || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Inactive</span>
                <Badge variant="muted">
                  {useGroupStatusCounts["Inactive"] || 0}
                </Badge>
              </div>
            </div>
            <div className="pt-2 border-t">
              <Link href="/portfolio/use-groups" className="text-sm text-primary hover:underline block text-center">
                View all →
              </Link>
            </div>
          </CardContent>
        </Card>
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
              href="/portfolio/business-cases"
              className="text-sm text-primary hover:underline"
            >
              View all →
            </Link>
          }
        >
          {businessCases.length > 0 ? (
            <div className="space-y-2">
              {(() => {
                // Sort by updated_at descending to get most recent first
                const sortedBusinessCases = [...businessCases].sort((a, b) => {
                  const aTime = a.updated_at ? new Date(a.updated_at).getTime() : 
                                (a.created_at ? new Date(a.created_at).getTime() : 0);
                  const bTime = b.updated_at ? new Date(b.updated_at).getTime() : 
                                (b.created_at ? new Date(b.created_at).getTime() : 0);
                  return bTime - aTime; // Most recent first
                });
                
                // Group business cases by business_case_group_id, keeping the most recent per group
                const groupsMap = new Map<string, typeof businessCases[0]>();
                sortedBusinessCases.forEach((bc) => {
                  if (bc.business_case_group_id && !groupsMap.has(bc.business_case_group_id)) {
                    groupsMap.set(bc.business_case_group_id, bc);
                  }
                });
                const uniqueGroups = Array.from(groupsMap.values()).slice(0, 5);
                
                return (
                  <>
                    {uniqueGroups.map((bc, index) => (
                      <BusinessCaseListItem 
                        key={bc.business_case_group_id || bc.business_case_id || `bc-${index}`} 
                        businessCase={bc} 
                        exchangeRates={exchangeRateMap}
                      />
                    ))}
                    {totalBusinessCaseGroups > 5 && (
                      <div className="pt-2 border-t">
                        <Link
                          href="/portfolio/business-cases"
                          className="text-sm text-primary hover:underline block text-center font-medium"
                        >
                          View all {totalBusinessCaseGroups} business cases →
                        </Link>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No business cases found. Create financial projections for formulations in specific markets.
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
            href="/portfolio/formulations"
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
