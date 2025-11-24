import { getAllUseGroups } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { UseGroupsList } from "@/components/use-groups/UseGroupsList";
import { FormulationCountryUseGroupFormButton } from "@/components/forms/FormulationCountryUseGroupFormButton";

export default async function UseGroupsPage() {
  const useGroups = await getAllUseGroups();

  // Calculate summary statistics
  const totalUseGroups = useGroups.length;
  const approvedUseGroups = useGroups.filter((ug) => ug.use_group_status === "Approved").length;
  const submittedUseGroups = useGroups.filter((ug) => ug.use_group_status === "Submitted").length;
  const uniqueFormulations = new Set(useGroups.map((ug) => ug.formulation_code).filter(Boolean)).size;
  const uniqueCountries = new Set(useGroups.map((ug) => ug.country_name).filter(Boolean)).size;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Use Groups</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Formulation use groups and registrations by country
            </p>
          </div>
          <FormulationCountryUseGroupFormButton />
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-5 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Use Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUseGroups}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedUseGroups}</div>
              <p className="text-xs text-muted-foreground">
                {totalUseGroups > 0 ? ((approvedUseGroups / totalUseGroups) * 100).toFixed(1) : 0}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{submittedUseGroups}</div>
              <p className="text-xs text-muted-foreground">
                {totalUseGroups > 0 ? ((submittedUseGroups / totalUseGroups) * 100).toFixed(1) : 0}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Formulations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueFormulations}</div>
              <p className="text-xs text-muted-foreground">Unique products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCountries}</div>
              <p className="text-xs text-muted-foreground">Markets covered</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Use Groups</CardTitle>
            <CardDescription>
              View and manage formulation use groups across all countries
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 sm:p-6 pt-0">
              <UseGroupsList useGroups={useGroups} />
            </div>
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}

