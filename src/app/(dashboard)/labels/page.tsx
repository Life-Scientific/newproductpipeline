import { getAllLabels } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { LabelsList } from "@/components/labels/LabelsList";
import { FormulationCountryLabelFormButton } from "@/components/forms/FormulationCountryLabelFormButton";

export default async function LabelsPage() {
  const labels = await getAllLabels();

  // Calculate summary statistics
  const totalLabels = labels.length;
  const approvedLabels = labels.filter((l) => l.registration_status === "Approved").length;
  const submittedLabels = labels.filter((l) => l.registration_status === "Submitted").length;
  const uniqueFormulations = new Set(labels.map((l) => l.formulation_code).filter(Boolean)).size;
  const uniqueCountries = new Set(labels.map((l) => l.country_name).filter(Boolean)).size;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Labels</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Formulation labels and registrations by country
            </p>
          </div>
          <FormulationCountryLabelFormButton />
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-5 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Labels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLabels}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedLabels}</div>
              <p className="text-xs text-muted-foreground">
                {totalLabels > 0 ? ((approvedLabels / totalLabels) * 100).toFixed(1) : 0}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{submittedLabels}</div>
              <p className="text-xs text-muted-foreground">
                {totalLabels > 0 ? ((submittedLabels / totalLabels) * 100).toFixed(1) : 0}%
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
            <CardTitle>Labels</CardTitle>
            <CardDescription>
              View and manage formulation labels across all countries
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 sm:p-6 pt-0">
              <LabelsList labels={labels} />
            </div>
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}

