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

/**
 * Format a number as an integer with comma separators (for Volume inputs)
 * @param value Number to format
 * @returns Formatted string with commas (e.g., "20,000") or empty string if invalid
 */
export function formatVolumeInput(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value) || value === 0) {
    return "";
  }
  return Math.round(value).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

/**
 * Format a number as currency with 2 decimal places (for NSP/COGS inputs)
 * @param value Number to format
 * @returns Formatted string with 2 decimals (e.g., "9.88") or empty string if invalid
 */
export function formatCurrencyInput(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value) || value === 0) {
    return "";
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Parse a formatted string back to a number (handles commas)
 * @param value Formatted string (e.g., "20,000" or "9.88")
 * @returns Parsed number or 0 if invalid
 */
export function parseFormattedNumber(value: string): number {
  if (!value || value.trim() === "") {
    return 0;
  }
  // Remove commas and any non-numeric characters except decimal point and minus
  const cleaned = value.replace(/[^0-9.\-]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Check if a string is a valid number input (allows digits, commas, decimal, minus)
 * @param value String to validate
 * @param allowDecimals Whether to allow decimal points
 * @returns True if valid input
 */
export function isValidNumberInput(value: string, allowDecimals: boolean = true): boolean {
  if (!value || value.trim() === "") return true;
  const pattern = allowDecimals 
    ? /^-?[\d,]*\.?\d*$/
    : /^-?[\d,]*$/;
  return pattern.test(value);
}