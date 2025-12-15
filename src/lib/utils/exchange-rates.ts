import type { CurrencyCode } from "@/contexts/DisplayPreferencesContext";

/**
 * Transform exchange rate data from database format to DisplayPreferencesContext format
 * Extracts the latest active rate for each supported currency (EUR, USD, GBP, CAD)
 */
export function transformExchangeRatesForDisplay(
  exchangeRates: Array<{
    currency_code: string;
    exchange_rate_to_eur: string | number;
    is_active: boolean;
    effective_date?: string;
  }>,
): Record<CurrencyCode, number> {
  const rates: Record<CurrencyCode, number> = {
    EUR: 1,
    USD: 0.86,
    GBP: 1.14,
    CAD: 0.61,
  };

  // Filter to active rates only and get latest per currency
  const activeRates = exchangeRates.filter((er) => er.is_active);
  const currencyMap = new Map<string, { rate: number; date: string }>();

  activeRates.forEach((er) => {
    const code = er.currency_code;
    if (code === "EUR" || code === "USD" || code === "GBP" || code === "CAD") {
      const rate = typeof er.exchange_rate_to_eur === "string"
        ? parseFloat(er.exchange_rate_to_eur)
        : er.exchange_rate_to_eur;
      const date = er.effective_date || "";

      const existing = currencyMap.get(code);
      if (!existing || date > existing.date) {
        currencyMap.set(code, { rate, date });
      }
    }
  });

  // Update rates with latest values
  currencyMap.forEach((value, code) => {
    rates[code as CurrencyCode] = value.rate;
  });

  return rates;
}




