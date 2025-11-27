/**
 * Maps ISO 4217 currency codes to their display symbols
 */
const CURRENCY_SYMBOLS: Record<string, string> = {
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
  // Add more as needed
};

/**
 * Get currency symbol for a given currency code
 * @param currencyCode ISO 4217 currency code (e.g., "USD", "EUR")
 * @returns Currency symbol (e.g., "$", "€") or "$" as default
 */
export function getCurrencySymbol(currencyCode: string | null | undefined): string {
  if (!currencyCode) return "$"; // Default to USD
  return CURRENCY_SYMBOLS[currencyCode.toUpperCase()] || currencyCode; // Fallback to code if symbol not found
}

/**
 * Format currency value with 1 decimal place and comma separators
 * Used for displaying revenue/margin values in the countries section
 * @param value Amount to format
 * @returns Formatted string (e.g., "€1,274.8M" or "€906.2K")
 */
export function formatCurrencyCompact(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  
  if (value >= 1000000) {
    const millions = value / 1000000;
    // Format with 1 decimal and commas
    const formatted = millions.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `€${formatted}M`;
  }
  
  if (value >= 1000) {
    const thousands = value / 1000;
    // Format with 1 decimal and commas
    const formatted = thousands.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `€${formatted}K`;
  }
  
  // For values less than 1000, format with 1 decimal and commas
  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `€${formatted}`;
}
