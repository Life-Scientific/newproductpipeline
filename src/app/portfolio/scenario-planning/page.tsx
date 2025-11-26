import { getBusinessCasesForProjectionTable, getExchangeRates } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { ScenarioPlanningClient } from "./ScenarioPlanningClient";

// Cache business cases data for 60 seconds
export const revalidate = 60;

export default async function ScenarioPlanningPage() {
  const [businessCases, allExchangeRates] = await Promise.all([
    getBusinessCasesForProjectionTable(),
    getExchangeRates(),
  ]);

  // Create exchange rate map: country_id -> exchange_rate_to_eur
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
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Scenario Planning</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Model &ldquo;what-if&rdquo; scenarios by adjusting COGS, NSP, and Volume. Compare multiple scenarios against your baseline.
            </p>
          </div>

          <ScenarioPlanningClient 
            businessCases={businessCases} 
            exchangeRates={exchangeRateMap}
          />
        </div>
      </AnimatedPage>
    </div>
  );
}


