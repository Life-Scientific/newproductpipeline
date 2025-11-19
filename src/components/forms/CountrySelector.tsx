"use client";

import { useCallback } from "react";
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
  
  const handleSearch = useCallback((search: string) => {
    return searchCountries({ search, limit: 200 });
  }, []);

  const handlePreload = useCallback(() => {
    return searchCountries({ limit: 200 });
  }, []);

  return (
    <FuzzySearchSelect
      value={value}
      onValueChange={onValueChange}
      searchFunction={handleSearch}
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
      preloadFunction={handlePreload}
    />
  );
}
