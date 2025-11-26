import { getCountriesWithStats } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { CountryList } from "@/components/countries/CountryList";
import type { CountryWithStats } from "@/lib/db/countries";

export default async function CountriesPage() {
  const countries = await getCountriesWithStats() as CountryWithStats[];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Countries</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore markets by country with formulation and revenue data
            </p>
          </div>
        </div>

        <CountryList countries={countries} />
      </AnimatedPage>
    </div>
  );
}

