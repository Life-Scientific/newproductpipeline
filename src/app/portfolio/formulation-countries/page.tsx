import { getFormulationCountries } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { FormulationCountriesList } from "@/components/formulations/FormulationCountriesList";

export default async function FormulationCountriesPage() {
  const countries = await getFormulationCountries();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Formulation-Countries</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              View all formulation-country registrations and their status
            </p>
          </div>
        </div>

        <FormulationCountriesList countries={countries} />
      </AnimatedPage>
    </div>
  );
}


