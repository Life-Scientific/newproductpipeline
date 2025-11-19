"use client";

import { FuzzySearchSelect } from "./FuzzySearchSelect";
import { searchFormulations } from "@/lib/actions/search";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

interface FormulationSelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  countryId?: string;
  selectedFormulation?: Formulation;
}

export function FormulationSelector({
  value,
  onValueChange,
  placeholder = "Search formulations...",
  className,
  disabled = false,
  required = false,
  countryId,
  selectedFormulation,
}: FormulationSelectorProps) {
  return (
    <FuzzySearchSelect
      value={value}
      onValueChange={onValueChange}
      searchFunction={(search) => searchFormulations({ search, countryId, limit: 100 })}
      getOptionValue={(item) => item.formulation_id}
      getOptionLabel={(item) => {
        const code = item.formulation_code || "";
        const name = item.product_name || item.formulation_name || "";
        return name ? `${code} - ${name}` : code;
      }}
      getOptionSubtitle={(item) => item.formulation_code}
      placeholder={placeholder}
      searchPlaceholder="Type formulation code or name..."
      emptyText="No formulations found. Try a different search term."
      className={className}
      disabled={disabled}
      required={required}
      selectedItem={selectedFormulation}
      preloadAll={false}
    />
  );
}



