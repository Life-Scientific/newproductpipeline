/**
 * Utility functions for currency conversion
 * EUR is the rollup currency for reporting
 */

import { getLatestExchangeRate } from "@/lib/db/queries";

/**
 * Convert an amount from local currency to EUR
 * @param amount Amount in local currency
 * @param countryId Country ID to get exchange rate for
 * @param date Optional date for historical rates (defaults to today)
 * @returns Amount in EUR, or null if exchange rate not found
 */
export async function convertToEUR(
  amount: number,
  countryId: string | null,
  date: Date = new Date()
): Promise<number | null> {
  if (!countryId || amount === 0) {
    return amount === 0 ? 0 : null;
  }

  const rate = await getLatestExchangeRate(countryId, date);
  if (rate === null) {
    return null;
  }

  // Rate is multiplier: 1 EUR = rate * local currency
  // So: local_amount / rate = EUR_amount
  return amount / rate;
}

/**
 * Convert an amount from EUR to local currency
 * @param amount Amount in EUR
 * @param countryId Country ID to get exchange rate for
 * @param date Optional date for historical rates (defaults to today)
 * @returns Amount in local currency, or null if exchange rate not found
 */
export async function convertFromEUR(
  amount: number,
  countryId: string | null,
  date: Date = new Date()
): Promise<number | null> {
  if (!countryId || amount === 0) {
    return amount === 0 ? 0 : null;
  }

  const rate = await getLatestExchangeRate(countryId, date);
  if (rate === null) {
    return null;
  }

  // Rate is multiplier: 1 EUR = rate * local currency
  // So: EUR_amount * rate = local_amount
  return amount * rate;
}

/**
 * Format currency with symbol
 * @param amount Amount to format
 * @param currencyCode Currency code (e.g., "USD", "EUR")
 * @param showDecimals Whether to show decimals
 * @returns Formatted string
 */
export function formatCurrency(
  amount: number | null | undefined,
  currencyCode: string | null | undefined,
  showDecimals: boolean = true
): string {
  if (amount === null || amount === undefined) {
    return "—";
  }

  const symbol = getCurrencySymbol(currencyCode);
  const formatted = showDecimals
    ? amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : amount.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

  return `${symbol}${formatted}`;
}

/**
 * Get currency symbol for a given currency code
 */
function getCurrencySymbol(currencyCode: string | null | undefined): string {
  if (!currencyCode) return "€"; // Default to EUR
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CAD: "C$",
    AUD: "A$",
    CHF: "CHF",
    CNY: "¥",
    INR: "₹",
    BRL: "R$",
    MXN: "$",
    ZAR: "R",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    PLN: "zł",
    CZK: "Kč",
    HUF: "Ft",
    RON: "lei",
    TRY: "₺",
  };
  return symbols[currencyCode.toUpperCase()] || currencyCode;
}




