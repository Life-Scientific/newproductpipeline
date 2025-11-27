import { getCountryDetails } from "@/lib/db/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { HierarchicalBreadcrumb } from "@/components/navigation/HierarchicalBreadcrumb";
import { Package, FileText, DollarSign, TrendingUp } from "lucide-react";
import { CountryFormulationsTable } from "@/components/countries/CountryFormulationsTable";
import { CountryBusinessCases } from "@/components/countries/CountryBusinessCases";
import { CountryUseGroups } from "@/components/countries/CountryUseGroups";
import { CountrySummaryCards } from "@/components/countries/CountrySummaryCards";
import { CountryOverviewTab } from "@/components/countries/CountryOverviewTab";

interface CountryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CountryDetailPage({
  params,
}: CountryDetailPageProps) {
  const { id } = await params;

  let countryData;
  try {
    countryData = await getCountryDetails(id);
  } catch (error) {
    notFound();
  }

  if (!countryData || !countryData.country) {
    notFound();
  }

  const { country, formulations, businessCases, useGroups, stats } = countryData;

  const breadcrumbs = [
    { label: "Countries", href: "/portfolio/countries" },
    { label: country.country_name },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />

        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold">{country.country_name}</h1>
              <Badge variant="outline" className="text-sm">
                {country.country_code}
              </Badge>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <CountrySummaryCards
          stats={stats}
          businessCases={businessCases}
        />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="formulations">Formulations</TabsTrigger>
            <TabsTrigger value="business-cases">Business Cases</TabsTrigger>
            <TabsTrigger value="use-groups">Use Groups</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <CountryOverviewTab
              country={country}
              formulations={formulations}
              businessCases={businessCases}
              stats={stats}
            />
          </TabsContent>

          {/* Formulations Tab */}
          <TabsContent value="formulations" className="space-y-4 sm:space-y-6">
            <CountryFormulationsTable formulations={formulations} countryName={country.country_name} />
          </TabsContent>

          {/* Business Cases Tab */}
          <TabsContent value="business-cases" className="space-y-4 sm:space-y-6">
            <CountryBusinessCases businessCases={businessCases} countryName={country.country_name} />
          </TabsContent>

          {/* Use Groups Tab */}
          <TabsContent value="use-groups" className="space-y-4 sm:space-y-6">
            <CountryUseGroups useGroups={useGroups} countryName={country.country_name} />
          </TabsContent>
        </Tabs>
      </AnimatedPage>
    </div>
  );
}


