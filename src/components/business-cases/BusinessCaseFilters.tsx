"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { MultiSelect, type MultiSelectOption } from "@/components/ui/multi-select";
import { getFormulationsAction, getCountriesAction } from "@/lib/actions/business-cases";
import { useSupabase } from "@/hooks/use-supabase";
import type { Database } from "@/lib/supabase/database.types";
type Formulation = Database["public"]["Tables"]["formulations"]["Row"] | Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];

interface BusinessCaseFiltersProps {
  onFilterChange: (filters: {
    countryIds: string[];
    formulationIds: string[];
    useGroupIds: string[];
  }) => void;
}

export function BusinessCaseFilters({ onFilterChange }: BusinessCaseFiltersProps) {
  const supabase = useSupabase();
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [useGroupOptions, setUseGroupOptions] = useState<MultiSelectOption[]>([]);

  const [filters, setFilters] = useState({
    countryIds: [] as string[],
    formulationIds: [] as string[],
    useGroupIds: [] as string[],
  });

  // Load formulations and countries
  useEffect(() => {
    Promise.all([getFormulationsAction(), getCountriesAction()])
      .then(([formResult, countryResult]) => {
        if (formResult.data) setFormulations(formResult.data);
        if (countryResult.data) setCountries(countryResult.data);
        if (formResult.error || countryResult.error) {
          console.error("Failed to load filter data:", formResult.error || countryResult.error);
        }
      })
      .catch((error) => {
        console.error("Failed to load filter data:", error);
      });
  }, []);

  // Load use groups when formulation or country changes
  useEffect(() => {
    if (filters.formulationIds.length === 0 && filters.countryIds.length === 0) {
      setUseGroupOptions([]);
      return;
    }

    // Build query to get formulation_country_ids that match selected countries and formulations
    let query = supabase
      .from("formulation_country")
      .select("formulation_country_id")
      .eq("is_active", true);

    if (filters.countryIds.length > 0) {
      query = query.in("country_id", filters.countryIds);
    }

    if (filters.formulationIds.length > 0) {
      query = query.in("formulation_id", filters.formulationIds);
    }

    query
      .then(({ data: fcData, error: fcError }) => {
        if (fcError) {
          console.error("Failed to load formulation countries:", fcError);
          setUseGroupOptions([]);
          return;
        }

        if (!fcData || fcData.length === 0) {
          setUseGroupOptions([]);
          return;
        }

        const fcIds = (fcData as any[]).map((fc: any) => fc.formulation_country_id).filter(Boolean) as string[];

        // Get use groups for these formulation_country_ids
        return supabase
          .from("formulation_country_use_group")
          .select("formulation_country_use_group_id, use_group_name, use_group_variant")
          .in("formulation_country_id", fcIds)
          .eq("is_active", true)
          .order("use_group_variant") as any;
      })
      .then(async (result: any) => {
        try {
          const { data: useGroups, error: ugError } = result || { data: null, error: null };
          if (ugError) {
            console.error("Failed to load use groups:", ugError);
            setUseGroupOptions([]);
            return;
          }

          if (useGroups) {
            const options: MultiSelectOption[] = (useGroups as any[]).map((ug: any) => ({
              value: ug.formulation_country_use_group_id,
              label: ug.use_group_name
                ? `${ug.use_group_variant} - ${ug.use_group_name}`
                : ug.use_group_variant,
            }));
            setUseGroupOptions(options);
          } else {
            setUseGroupOptions([]);
          }
        } catch (error) {
          console.error("Failed to load use groups:", error);
          setUseGroupOptions([]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.formulationIds, filters.countryIds]); // supabase is stable singleton

  const handleFilterChange = (key: keyof typeof filters, value: string[]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      countryIds: [],
      formulationIds: [],
      useGroupIds: [],
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.countryIds.length > 0 ||
    filters.formulationIds.length > 0 ||
    filters.useGroupIds.length > 0;

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Country</Label>
          <MultiSelect
            options={countries.map((c) => ({
              value: c.country_id,
              label: c.country_name,
            }))}
            selected={filters.countryIds}
            onChange={(selected) => handleFilterChange("countryIds", selected)}
            placeholder="Select countries"
          />
        </div>

        <div className="space-y-2">
          <Label>Formulation</Label>
          <MultiSelect
            options={formulations.map((f) => ({
              value: f.formulation_id || "",
              label: ("formulation_name" in f ? f.formulation_name : null) || f.formulation_code || f.formulation_id || "",
            }))}
            selected={filters.formulationIds}
            onChange={(selected) => handleFilterChange("formulationIds", selected)}
            placeholder="Select formulations"
          />
        </div>

        <div className="space-y-2">
          <Label>Use Group</Label>
          <MultiSelect
            options={useGroupOptions}
            selected={filters.useGroupIds}
            onChange={(selected) => handleFilterChange("useGroupIds", selected)}
            placeholder="Select use groups"
            disabled={useGroupOptions.length === 0}
          />
        </div>
      </div>
    </div>
  );
}

