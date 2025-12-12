"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { createClient } from "@/lib/supabase/client";

// ============================================================================
// Types
// ============================================================================

export type CurrencyCode = "EUR" | "USD" | "GBP" | "CAD";
export type VolumeUnit = "L" | "GAL";
export type WeightUnit = "KG" | "LB";

export interface DisplayPreferences {
  currency: CurrencyCode;
  volumeUnit: VolumeUnit;
  weightUnit: WeightUnit;
}

interface DisplayPreferencesContextValue {
  // State
  preferences: DisplayPreferences;
  isLoaded: boolean;
  exchangeRates: Record<CurrencyCode, number>; // currency_code -> rate_to_eur

  // Update function
  updatePreferences: (updates: Partial<DisplayPreferences>) => void;

  // Conversions (for display - EUR to user's preferred)
  convertCurrency: (eurAmount: number) => number;
  convertVolume: (liters: number) => number;
  convertWeight: (kg: number) => number;

  // Reverse conversions (for input → save)
  toEUR: (localAmount: number) => number;
  toLiters: (volume: number) => number;
  toKG: (weight: number) => number;

  // Formatters
  formatCurrency: (
    eurAmount: number | null | undefined,
    options?: { compact?: boolean; decimals?: number },
  ) => string;
  formatCurrencyCompact: (eurAmount: number | null | undefined) => string;
  formatVolume: (
    liters: number | null | undefined,
    options?: { decimals?: number },
  ) => string;
  formatWeight: (
    kg: number | null | undefined,
    options?: { decimals?: number },
  ) => string;

  // Per-unit helpers (for NSP, COGS that are €/L or €/KG)
  getDisplayUnit: (uom: string) => string; // Returns display unit based on product's UOM and user preference
  convertPerUnit: (eurValue: number, uom: string) => number; // Converts per-unit prices (e.g., €/L → $/GAL)
  formatPerUnit: (
    eurValue: number | null | undefined,
    uom: string,
    options?: { decimals?: number },
  ) => string;
  isWetProduct: (uom: string) => boolean;
  isDryProduct: (uom: string) => boolean;

  // Helpers
  currencySymbol: string;
  currencyName: string;
  volumeUnit: VolumeUnit;
  weightUnit: WeightUnit;

  // Constants for UI
  CURRENCY_OPTIONS: Array<{ code: CurrencyCode; symbol: string; name: string }>;
  VOLUME_OPTIONS: Array<{ code: VolumeUnit; name: string }>;
  WEIGHT_OPTIONS: Array<{ code: WeightUnit; name: string }>;
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = "display_preferences";

const DEFAULT_PREFERENCES: DisplayPreferences = {
  currency: "EUR",
  volumeUnit: "L",
  weightUnit: "KG",
};

// Conversion factors
const VOLUME_TO_GAL = 0.264172; // 1 L = 0.264172 GAL
const WEIGHT_TO_LB = 2.20462; // 1 KG = 2.20462 LB

// Currency symbols
const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CAD: "C$",
};

// Currency names for display
const CURRENCY_NAMES: Record<CurrencyCode, string> = {
  EUR: "Euro",
  USD: "US Dollar",
  GBP: "British Pound",
  CAD: "Canadian Dollar",
};

// Default rates (fallback if DB fetch fails) - rates are "to EUR"
const DEFAULT_EXCHANGE_RATES: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 0.86,
  GBP: 1.14,
  CAD: 0.61,
};

// ============================================================================
// Context
// ============================================================================

const DisplayPreferencesContext =
  createContext<DisplayPreferencesContextValue | null>(null);

// ============================================================================
// Provider
// ============================================================================

export function DisplayPreferencesProvider({
  children,
  initialExchangeRates,
}: {
  children: React.ReactNode;
  initialExchangeRates?: Record<CurrencyCode, number>;
}) {
  const [preferences, setPreferences] =
    useState<DisplayPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<
    Record<CurrencyCode, number>
  >(initialExchangeRates || DEFAULT_EXCHANGE_RATES);

  // Load preferences from localStorage and fetch exchange rates on mount
  useEffect(() => {
    // Load preferences from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch (e) {
      console.warn("Failed to load display preferences:", e);
    }

    // Only fetch exchange rates if not provided as prop (fallback for client-side updates)
    if (!initialExchangeRates) {
      const fetchRates = async () => {
        try {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("exchange_rates")
            .select("currency_code, exchange_rate_to_eur")
            .eq("is_active", true);

          if (error) {
            console.warn("Failed to fetch exchange rates:", error);
            return;
          }

          if (data && data.length > 0) {
            const rates: Record<CurrencyCode, number> = {
              EUR: 1,
              USD: 0.86,
              GBP: 1.14,
              CAD: 0.61,
            };
            data.forEach((row) => {
              const code = row.currency_code as CurrencyCode;
              if (code in rates) {
                rates[code] = parseFloat(row.exchange_rate_to_eur);
              }
            });
            setExchangeRates(rates);
          }
        } catch (e) {
          console.warn("Failed to fetch exchange rates:", e);
        }
      };

      fetchRates();
    }
    setIsLoaded(true);
  }, [initialExchangeRates]);

  // Update preferences and persist to localStorage
  const updatePreferences = useCallback(
    (updates: Partial<DisplayPreferences>) => {
      setPreferences((prev) => {
        const next = { ...prev, ...updates };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (e) {
          console.warn("Failed to save display preferences:", e);
        }
        return next;
      });
    },
    [],
  );

  // ============================================================================
  // Currency Conversions
  // ============================================================================

  /**
   * Convert EUR amount to user's preferred currency
   * The rates are "to EUR", so to convert FROM EUR TO local, we divide by the rate
   */
  const convertCurrency = useCallback(
    (eurAmount: number): number => {
      if (preferences.currency === "EUR") return eurAmount;
      const rateToEur = exchangeRates[preferences.currency] || 1;
      // 1 USD = 0.86 EUR means €1 = $1.16, so divide by rate
      return eurAmount / rateToEur;
    },
    [preferences.currency, exchangeRates],
  );

  /**
   * Convert from user's preferred currency to EUR (for saving)
   */
  const toEUR = useCallback(
    (localAmount: number): number => {
      if (preferences.currency === "EUR") return localAmount;
      const rateToEur = exchangeRates[preferences.currency] || 1;
      return localAmount * rateToEur;
    },
    [preferences.currency, exchangeRates],
  );

  // ============================================================================
  // Volume Conversions
  // ============================================================================

  const convertVolume = useCallback(
    (liters: number): number => {
      if (preferences.volumeUnit === "L") return liters;
      return liters * VOLUME_TO_GAL;
    },
    [preferences.volumeUnit],
  );

  const toLiters = useCallback(
    (volume: number): number => {
      if (preferences.volumeUnit === "L") return volume;
      return volume / VOLUME_TO_GAL;
    },
    [preferences.volumeUnit],
  );

  // ============================================================================
  // Weight Conversions
  // ============================================================================

  const convertWeight = useCallback(
    (kg: number): number => {
      if (preferences.weightUnit === "KG") return kg;
      return kg * WEIGHT_TO_LB;
    },
    [preferences.weightUnit],
  );

  const toKG = useCallback(
    (weight: number): number => {
      if (preferences.weightUnit === "KG") return weight;
      return weight / WEIGHT_TO_LB;
    },
    [preferences.weightUnit],
  );

  // ============================================================================
  // Formatters
  // ============================================================================

  const formatCurrency = useCallback(
    (
      eurAmount: number | null | undefined,
      options?: { compact?: boolean; decimals?: number },
    ): string => {
      if (eurAmount === null || eurAmount === undefined) return "—";

      const converted = convertCurrency(eurAmount);
      const symbol = CURRENCY_SYMBOLS[preferences.currency];
      const compact = options?.compact ?? false;
      const decimals = options?.decimals ?? 2;

      if (compact) {
        if (Math.abs(converted) >= 1_000_000) {
          return `${symbol}${(converted / 1_000_000).toFixed(decimals)}M`;
        }
        if (Math.abs(converted) >= 1_000) {
          return `${symbol}${(converted / 1_000).toFixed(decimals > 0 ? 1 : 0)}K`;
        }
      }

      return `${symbol}${converted.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}`;
    },
    [convertCurrency, preferences.currency],
  );

  const formatCurrencyCompact = useCallback(
    (eurAmount: number | null | undefined): string => {
      return formatCurrency(eurAmount, { compact: true, decimals: 2 });
    },
    [formatCurrency],
  );

  const formatVolume = useCallback(
    (
      liters: number | null | undefined,
      options?: { decimals?: number },
    ): string => {
      if (liters === null || liters === undefined) return "—";
      const converted = convertVolume(liters);
      const decimals = options?.decimals ?? 0;
      return `${converted.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
      })}`;
    },
    [convertVolume],
  );

  const formatWeight = useCallback(
    (
      kg: number | null | undefined,
      options?: { decimals?: number },
    ): string => {
      if (kg === null || kg === undefined) return "—";
      const converted = convertWeight(kg);
      const decimals = options?.decimals ?? 2;
      return `${converted.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
      })} ${preferences.weightUnit}`;
    },
    [convertWeight, preferences.weightUnit],
  );

  // ============================================================================
  // Per-Unit Helpers (for NSP, COGS)
  // ============================================================================

  /**
   * Check if a product is wet (liquid, measured in L/GAL)
   */
  const isWetProduct = useCallback((uom: string): boolean => {
    const normalized = uom?.toLowerCase() || "";
    return (
      normalized === "l" ||
      normalized === "liters" ||
      normalized === "liter" ||
      normalized === "gal" ||
      normalized === "gallons"
    );
  }, []);

  /**
   * Check if a product is dry (solid, measured in KG/LB)
   */
  const isDryProduct = useCallback((uom: string): boolean => {
    const normalized = uom?.toLowerCase() || "";
    return (
      normalized === "kg" ||
      normalized === "kilograms" ||
      normalized === "kilogram" ||
      normalized === "lb" ||
      normalized === "pounds"
    );
  }, []);

  /**
   * Get the display unit for a product based on its UOM and user preferences
   */
  const getDisplayUnit = useCallback(
    (uom: string): string => {
      if (isWetProduct(uom)) return preferences.volumeUnit;
      if (isDryProduct(uom)) return preferences.weightUnit;
      return uom || "unit"; // Fallback to original UOM
    },
    [
      isWetProduct,
      isDryProduct,
      preferences.volumeUnit,
      preferences.weightUnit,
    ],
  );

  /**
   * Convert per-unit values (NSP, COGS) accounting for unit type.
   * For per-unit prices, we DIVIDE by the conversion factor because:
   * - If €10/L and user wants GAL: €10/L ÷ 0.264 = €37.85/GAL (price per larger unit is higher)
   * - If €10/KG and user wants LB: €10/KG ÷ 2.205 = €4.54/LB (price per smaller unit is lower)
   */
  const convertPerUnit = useCallback(
    (eurValue: number, uom: string): number => {
      // First convert currency
      const currencyConverted = convertCurrency(eurValue);

      // Then apply unit conversion for per-unit prices
      if (isWetProduct(uom) && preferences.volumeUnit === "GAL") {
        return currencyConverted / VOLUME_TO_GAL;
      }
      if (isDryProduct(uom) && preferences.weightUnit === "LB") {
        return currencyConverted / WEIGHT_TO_LB;
      }
      return currencyConverted;
    },
    [
      convertCurrency,
      isWetProduct,
      isDryProduct,
      preferences.volumeUnit,
      preferences.weightUnit,
    ],
  );

  /**
   * Format a per-unit value (like NSP or COGS) with proper currency and unit conversion
   */
  const formatPerUnit = useCallback(
    (
      eurValue: number | null | undefined,
      uom: string,
      options?: { decimals?: number },
    ): string => {
      if (eurValue === null || eurValue === undefined) return "—";
      const converted = convertPerUnit(eurValue, uom);
      const symbol = CURRENCY_SYMBOLS[preferences.currency];
      const decimals = options?.decimals ?? 2;
      return `${symbol}${converted.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}`;
    },
    [convertPerUnit, preferences.currency],
  );

  // ============================================================================
  // Memoized Value
  // ============================================================================

  const value = useMemo<DisplayPreferencesContextValue>(
    () => ({
      preferences,
      isLoaded,
      exchangeRates,
      updatePreferences,
      convertCurrency,
      convertVolume,
      convertWeight,
      toEUR,
      toLiters,
      toKG,
      formatCurrency,
      formatCurrencyCompact,
      formatVolume,
      formatWeight,
      getDisplayUnit,
      convertPerUnit,
      formatPerUnit,
      isWetProduct,
      isDryProduct,
      currencySymbol: CURRENCY_SYMBOLS[preferences.currency],
      currencyName: CURRENCY_NAMES[preferences.currency],
      volumeUnit: preferences.volumeUnit,
      weightUnit: preferences.weightUnit,
      CURRENCY_OPTIONS: Object.entries(CURRENCY_SYMBOLS).map(
        ([code, symbol]) => ({
          code: code as CurrencyCode,
          symbol,
          name: CURRENCY_NAMES[code as CurrencyCode],
        }),
      ),
      VOLUME_OPTIONS: [
        { code: "L" as VolumeUnit, name: "Liters (L)" },
        { code: "GAL" as VolumeUnit, name: "US Gallons (GAL)" },
      ],
      WEIGHT_OPTIONS: [
        { code: "KG" as WeightUnit, name: "Kilograms (KG)" },
        { code: "LB" as WeightUnit, name: "Pounds (LB)" },
      ],
    }),
    [
      preferences,
      isLoaded,
      exchangeRates,
      updatePreferences,
      convertCurrency,
      convertVolume,
      convertWeight,
      toEUR,
      toLiters,
      toKG,
      formatCurrency,
      formatCurrencyCompact,
      formatVolume,
      formatWeight,
      getDisplayUnit,
      convertPerUnit,
      formatPerUnit,
      isWetProduct,
      isDryProduct,
    ],
  );

  return (
    <DisplayPreferencesContext.Provider value={value}>
      {children}
    </DisplayPreferencesContext.Provider>
  );
}

// ============================================================================
// Default values for SSR / fallback
// ============================================================================

const DEFAULT_CONTEXT_VALUE: DisplayPreferencesContextValue = {
  preferences: { currency: "EUR", volumeUnit: "L", weightUnit: "KG" },
  isLoaded: false,
  exchangeRates: { EUR: 1, USD: 0.86, GBP: 1.14, CAD: 0.61 },
  updatePreferences: () => {},
  convertCurrency: (v) => v,
  convertVolume: (v) => v,
  convertWeight: (v) => v,
  toEUR: (v) => v,
  toLiters: (v) => v,
  toKG: (v) => v,
  formatCurrency: (v) => (v == null ? "—" : `€${v.toLocaleString()}`),
  formatCurrencyCompact: (v) => (v == null ? "—" : `€${v.toLocaleString()}`),
  formatVolume: (v) => (v == null ? "—" : v.toLocaleString()),
  formatWeight: (v) => (v == null ? "—" : `${v.toLocaleString()} KG`),
  getDisplayUnit: (uom) => uom || "unit",
  convertPerUnit: (v) => v,
  formatPerUnit: (v) => (v == null ? "—" : `€${v.toLocaleString()}`),
  isWetProduct: (uom) =>
    ["l", "liters", "liter", "gal", "gallons"].includes(
      (uom || "").toLowerCase(),
    ),
  isDryProduct: (uom) =>
    ["kg", "kilograms", "kilogram", "lb", "pounds"].includes(
      (uom || "").toLowerCase(),
    ),
  currencySymbol: "€",
  currencyName: "Euro",
  volumeUnit: "L",
  weightUnit: "KG",
  CURRENCY_OPTIONS: [
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  ],
  VOLUME_OPTIONS: [
    { code: "L", name: "Liters (L)" },
    { code: "GAL", name: "US Gallons (GAL)" },
  ],
  WEIGHT_OPTIONS: [
    { code: "KG", name: "Kilograms (KG)" },
    { code: "LB", name: "Pounds (LB)" },
  ],
};

// ============================================================================
// Hook to consume context
// ============================================================================

export function useDisplayPreferences(): DisplayPreferencesContextValue {
  const context = useContext(DisplayPreferencesContext);
  // Return default values if context is not available (e.g., during SSR or before hydration)
  // This prevents the app from crashing if the hook is called before the provider mounts
  if (!context) {
    // In development, log a warning but don't crash
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "useDisplayPreferences called outside of DisplayPreferencesProvider, using defaults",
      );
    }
    return DEFAULT_CONTEXT_VALUE;
  }
  return context;
}
