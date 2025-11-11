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
import { createClient } from "@/lib/supabase/client";
import type { Formulation, Country } from "@/lib/supabase/database.types";

interface BusinessCaseFiltersProps {
  onFilterChange: (filters: {
    countryIds: string[];
    formulationIds: string[];
    useGroupIds: string[];
  }) => void;
}

export function BusinessCaseFilters({ onFilterChange }: BusinessCaseFiltersProps) {
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
    if (filters.formulationIds.length > 0 || filters.countryIds.length > 0) {
      // This is a simplified version - in reality you'd want to load use groups
      // based on the selected formulations/countries
      // For now, we'll leave it empty and let the user select from all
      setUseGroupOptions([]);
    }
  }, [filters.formulationIds, filters.countryIds]);

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
              value: f.formulation_id,
              label: f.formulation_code || f.formulation_name || f.formulation_id,
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

