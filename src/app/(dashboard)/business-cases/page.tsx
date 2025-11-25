import { getBusinessCasesForProjectionTable, getExchangeRates } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { BusinessCasesPageClient } from "./BusinessCasesPageClient";

// Cache business cases data for 60 seconds
export const revalidate = 60;

export default async function BusinessCasesPage() {
  const [businessCases, allExchangeRates] = await Promise.all([
    getBusinessCasesForProjectionTable(),
    getExchangeRates(),
  ]);

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

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold">Product Portfolio Long Range Plan</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                10-year revenue and margin projections. Each row represents a formulation registered in a country for a specific use.
              </p>
            </div>
          </div>

          <BusinessCasesPageClient 
            initialBusinessCases={businessCases} 
            exchangeRates={exchangeRateMap}
          />
        </div>
      </AnimatedPage>
    </div>
  );
}

