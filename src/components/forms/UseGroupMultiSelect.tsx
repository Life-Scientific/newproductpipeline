"use client";

import { FuzzySearchMultiSelect } from "./FuzzySearchMultiSelect";
import { searchUseGroups } from "@/lib/actions/search";
import type { Database } from "@/lib/supabase/database.types";

type UseGroup = Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];

interface UseGroupMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  formulationId?: string;
  countryId?: string;
  formulationCountryId?: string;
  selectedUseGroups?: UseGroup[];
}

export function UseGroupMultiSelect({
  selected,
  onChange,
  placeholder = "Search and select use groups...",
  className,
  disabled = false,
  formulationId,
  countryId,
  formulationCountryId,
  selectedUseGroups = [],
}: UseGroupMultiSelectProps) {
  return (
    <FuzzySearchMultiSelect
      selected={selected}
      onChange={onChange}
      searchFunction={(search) =>
        searchUseGroups({
          search,
          formulationId,
          countryId,
          formulationCountryId,
          limit: 200,
        })
      }
      getOptionValue={(item) => item.formulation_country_use_group_id || item.use_group_variant || ""}
      getOptionLabel={(item) => {
        if (item.display_name) return item.display_name;
        if (item.use_group_variant && item.use_group_name) {
          return `${item.use_group_variant} - ${item.use_group_name}`;
        }
        return item.use_group_variant || item.use_group_name || "";
      }}
      getOptionSubtitle={(item) => {
        const parts: string[] = [];
        if (item.formulation_code) parts.push(item.formulation_code);
        if (item.country_name) parts.push(item.country_name);
        return parts.length > 0 ? parts.join(" • ") : undefined;
      }}
      placeholder={placeholder}
      searchPlaceholder="Type use group variant, name, formulation, or country..."
      emptyText="No use groups found. Try a different search term."
      className={className}
      disabled={disabled}
      selectedItems={selectedUseGroups}
      preloadAll={false}
    />
  );
}



