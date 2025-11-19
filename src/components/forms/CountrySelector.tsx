"use client";

import { FuzzySearchSelect } from "./FuzzySearchSelect";
import { searchCountries } from "@/lib/actions/search";
import type { Database } from "@/lib/supabase/database.types";

type Country = Database["public"]["Tables"]["countries"]["Row"];

interface CountrySelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  selectedCountry?: Country;
}

export function CountrySelector({
  value,
  onValueChange,
  placeholder = "Search countries...",
  className,
  disabled = false,
  required = false,
  selectedCountry,
}: CountrySelectorProps) {
  return (
    <FuzzySearchSelect
      value={value}
      onValueChange={onValueChange}
      searchFunction={(search) => searchCountries({ search, limit: 200 })}
      getOptionValue={(item) => item.country_id}
      getOptionLabel={(item) => item.country_name || ""}
      getOptionSubtitle={(item) => item.country_code ? `Code: ${item.country_code}` : undefined}
      placeholder={placeholder}
      searchPlaceholder="Type country name or code..."
      emptyText="No countries found. Try a different search term."
      className={className}
      disabled={disabled}
      required={required}
      selectedItem={selectedCountry}
      preloadAll={true}
      preloadFunction={() => searchCountries({ limit: 200 })}
    />
  );
}



