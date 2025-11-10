import { getCOGSList } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { COGSList } from "@/components/cogs/COGSList";

export default async function COGSPage() {
  const cogs = await getCOGSList();

  // Calculate summary statistics
  const totalCOGS = cogs.reduce((sum, c) => sum + (c.cogs_value || 0), 0);
  const globalCOGS = cogs.filter((c) => !c.is_country_specific);
  const countrySpecificCOGS = cogs.filter((c) => c.is_country_specific);
  const uniqueFormulations = new Set(cogs.map((c) => c.formulation_code).filter(Boolean)).size;
  const uniqueCountries = new Set(cogs.map((c) => c.country_name).filter(Boolean)).size;

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <AnimatedPage>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">COGS Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Cost of goods sold by formulation and country
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total COGS Records</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{cogs.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {uniqueFormulations} formulations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total COGS Value</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">
                ${(totalCOGS / 1000000).toFixed(2)}M
              </div>
              <p className="text-xs text-muted-foreground">Aggregated cost</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Global COGS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{globalCOGS.length}</div>
              <p className="text-xs text-muted-foreground">Default costs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Country-Specific</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{countrySpecificCOGS.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {uniqueCountries} countries
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>COGS List</CardTitle>
            <CardDescription>
              View and manage cost of goods sold by formulation, country, and fiscal year
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-6 pt-0">
              <COGSList cogs={cogs} />
            </div>
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}

