"use client";

import { useDisplayPreferences } from "@/hooks/use-display-preferences";

interface FormattedCurrencyProps {
  /** Amount in EUR (base currency) */
  value: number | null | undefined;
  /** Use compact format (e.g., $1.2M instead of $1,200,000.00) */
  compact?: boolean;
  /** Number of decimal places (default: 2) */
  decimals?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Client component that displays a currency value in the user's preferred currency.
 * Values should be provided in EUR; they will be converted based on user preferences.
 */
export function FormattedCurrency({
  value,
  compact = true,
  decimals = 2,
  className,
}: FormattedCurrencyProps) {
  const { formatCurrency } = useDisplayPreferences();

  const formatted = formatCurrency(value, { compact, decimals });

  return <span className={className}>{formatted}</span>;
}

/**
 * Hook wrapper for cases where you need the formatted string directly
 * in a client component
 */
export function useFormattedCurrency() {
  const { formatCurrency, formatCurrencyCompact, currencySymbol, preferences } = useDisplayPreferences();
  
  return {
    formatCurrency,
    formatCurrencyCompact,
    currencySymbol,
    currency: preferences.currency,
  };
}
