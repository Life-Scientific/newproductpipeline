import { FormulationCountriesList } from "@/components/formulations/FormulationCountriesList";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Card, CardContent } from "@/components/ui/card";
import { getFormulationCountries } from "@/lib/db/queries";

// Use ISR with 60 second revalidation for better performance
export const revalidate = 60;

export default async function FormulationCountriesPage() {
  const countries = await getFormulationCountries();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Formulation-Countries
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              View all formulation-country registrations and their status.
              Filter by formulation, country, status, or registration pathway.
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <FormulationCountriesList countries={countries} />
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}
