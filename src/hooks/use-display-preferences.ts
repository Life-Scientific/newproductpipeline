"use client";

// Re-export everything from the context for backward compatibility
// All existing imports of useDisplayPreferences will continue to work
export {
  useDisplayPreferences,
  DisplayPreferencesProvider,
  type CurrencyCode,
  type VolumeUnit,
  type WeightUnit,
  type DisplayPreferences,
} from "@/contexts/DisplayPreferencesContext";
