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

