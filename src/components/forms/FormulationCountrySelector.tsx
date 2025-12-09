"use client";

import { FuzzySearchSelect } from "./FuzzySearchSelect";
import { searchFormulationCountries } from "@/lib/actions/search";
import type { Database } from "@/lib/supabase/database.types";

type FormulationCountry =
  Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];

interface FormulationCountrySelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  formulationId?: string;
  formulationCode?: string;
  selectedFormulationCountry?: FormulationCountry;
}

export function FormulationCountrySelector({
  value,
  onValueChange,
  placeholder = "Search formulation-country combinations...",
  className,
  disabled = false,
  required = false,
  formulationId,
  formulationCode,
  selectedFormulationCountry,
}: FormulationCountrySelectorProps) {
  return (
    <FuzzySearchSelect
      value={value}
      onValueChange={onValueChange}
      searchFunction={(search) =>
        searchFormulationCountries({
          search,
          formulationId,
          formulationCode,
          limit: 200,
        })
      }
      getOptionValue={(item) => item.formulation_country_id}
      getOptionLabel={(item) =>
        item.display_name || `${item.formulation_code} - ${item.country_name}`
      }
      getOptionSubtitle={(item) => item.formulation_code}
      placeholder={placeholder}
      searchPlaceholder="Type formulation code, country name, or display name..."
      emptyText="No formulation-country combinations found."
      className={className}
      disabled={disabled}
      required={required}
      selectedItem={selectedFormulationCountry}
      preloadAll={false}
    />
  );
}
