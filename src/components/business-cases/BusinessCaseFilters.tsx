"use client";

import { CheckCircle2, Filter, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import type { BusinessCaseGroupData } from "@/lib/db/queries";

interface BusinessCaseFiltersProps {
  businessCases: BusinessCaseGroupData[];
  onFilterChange: (filters: {
    countryIds: string[];
    formulationIds: string[];
    useGroupIds: string[];
  }) => void;
  /** Initial filter values from URL params for persistence */
  initialFilters?: {
    countryIds: string[];
    formulationIds: string[];
    useGroupIds: string[];
  };
}

export function BusinessCaseFilters({
  businessCases,
  onFilterChange,
  initialFilters,
}: BusinessCaseFiltersProps) {
  // Initialize from URL params if provided, otherwise empty arrays
  const [selectedCountryIds, setSelectedCountryIds] = useState<string[]>(
    initialFilters?.countryIds ?? [],
  );
  const [selectedFormulationIds, setSelectedFormulationIds] = useState<
    string[]
  >(initialFilters?.formulationIds ?? []);
  const [selectedUseGroupIds, setSelectedUseGroupIds] = useState<string[]>(
    initialFilters?.useGroupIds ?? [],
  );

  // Track if we're doing auto-selection to prevent loops
  const isAutoSelecting = useRef(false);

  // Sync internal state when URL params change (e.g., browser back/forward navigation)
  const prevInitialFiltersRef = useRef(initialFilters);
  useEffect(() => {
    // Skip if initialFilters haven't actually changed (reference comparison won't work, so compare contents)
    const prev = prevInitialFiltersRef.current;
    const hasChanged =
      JSON.stringify(prev?.countryIds) !==
        JSON.stringify(initialFilters?.countryIds) ||
      JSON.stringify(prev?.formulationIds) !==
        JSON.stringify(initialFilters?.formulationIds) ||
      JSON.stringify(prev?.useGroupIds) !==
        JSON.stringify(initialFilters?.useGroupIds);

    if (hasChanged) {
      prevInitialFiltersRef.current = initialFilters;
      setSelectedCountryIds(initialFilters?.countryIds ?? []);
      setSelectedFormulationIds(initialFilters?.formulationIds ?? []);
      setSelectedUseGroupIds(initialFilters?.useGroupIds ?? []);
    }
  }, [initialFilters]);

  // Build ALL filter options from business cases
  const allFilterOptions = useMemo(() => {
    const countries = new Map<string, string>();
    const formulations = new Map<string, string>();
    const useGroups = new Map<string, string>();

    businessCases.forEach((bc) => {
      if (bc.country_id && bc.country_name) {
        countries.set(bc.country_id, bc.country_name);
      }
      if (bc.formulation_id && bc.formulation_name) {
        // Show code first for better discoverability
        const display = bc.formulation_code
          ? `${bc.formulation_code} - ${bc.formulation_name}`
          : bc.formulation_name;
        formulations.set(bc.formulation_id, display);
      }
      const useGroupKey =
        bc.use_group_id ||
        `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
      const useGroupDisplay = bc.use_group_name
        ? `${bc.use_group_name}${bc.use_group_variant ? ` (${bc.use_group_variant})` : ""}`
        : bc.use_group_variant || "Unknown";
      if (useGroupKey) {
        useGroups.set(useGroupKey, useGroupDisplay);
      }
    });

    return {
      countries: Array.from(countries.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      formulations: Array.from(formulations.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      useGroups: Array.from(useGroups.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    };
  }, [businessCases]);

  // Available formulations based on selected countries
  const availableFormulations = useMemo(() => {
    if (selectedCountryIds.length === 0) {
      return allFilterOptions.formulations;
    }

    const filteredFormulations = new Map<string, string>();

    businessCases.forEach((bc) => {
      if (selectedCountryIds.includes(bc.country_id)) {
        if (bc.formulation_id && bc.formulation_name) {
          // Show code first for better discoverability
          const display = bc.formulation_code
            ? `${bc.formulation_code} - ${bc.formulation_name}`
            : bc.formulation_name;
          filteredFormulations.set(bc.formulation_id, display);
        }
      }
    });

    return Array.from(filteredFormulations.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [businessCases, selectedCountryIds, allFilterOptions.formulations]);

  // Available use groups based on selected countries AND formulations
  const availableUseGroups = useMemo(() => {
    if (
      selectedCountryIds.length === 0 &&
      selectedFormulationIds.length === 0
    ) {
      return allFilterOptions.useGroups;
    }

    const filteredUseGroups = new Map<string, string>();

    businessCases.forEach((bc) => {
      const matchesCountry =
        selectedCountryIds.length === 0 ||
        selectedCountryIds.includes(bc.country_id);
      const matchesFormulation =
        selectedFormulationIds.length === 0 ||
        selectedFormulationIds.includes(bc.formulation_id);

      if (matchesCountry && matchesFormulation) {
        const useGroupKey =
          bc.use_group_id ||
          `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
        const useGroupDisplay = bc.use_group_name
          ? `${bc.use_group_name}${bc.use_group_variant ? ` (${bc.use_group_variant})` : ""}`
          : bc.use_group_variant || "Unknown";
        if (useGroupKey) {
          filteredUseGroups.set(useGroupKey, useGroupDisplay);
        }
      }
    });

    return Array.from(filteredUseGroups.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [
    businessCases,
    selectedCountryIds,
    selectedFormulationIds,
    allFilterOptions.useGroups,
  ]);

  // Notify parent of filter changes
  const notifyFilterChange = useCallback(
    (countryIds: string[], formulationIds: string[], useGroupIds: string[]) => {
      onFilterChange({ countryIds, formulationIds, useGroupIds });
    },
    [onFilterChange],
  );

  // Handle country selection change with cascading updates
  const handleCountryChange = useCallback(
    (newCountryIds: string[]) => {
      isAutoSelecting.current = true;

      setSelectedCountryIds(newCountryIds);

      let newFormulationIds = selectedFormulationIds;
      let newUseGroupIds = selectedUseGroupIds;

      // Filter out formulations that are no longer available
      if (newCountryIds.length > 0) {
        const validFormulationIds = new Set<string>();
        businessCases.forEach((bc) => {
          if (newCountryIds.includes(bc.country_id) && bc.formulation_id) {
            validFormulationIds.add(bc.formulation_id);
          }
        });

        newFormulationIds = selectedFormulationIds.filter((id) =>
          validFormulationIds.has(id),
        );
        // Auto-select if only one formulation available
        if (newFormulationIds.length === 0 && validFormulationIds.size === 1) {
          newFormulationIds = Array.from(validFormulationIds);
        }
        setSelectedFormulationIds(newFormulationIds);
      }

      // Filter out use groups that are no longer available
      const validUseGroupIds = new Set<string>();
      businessCases.forEach((bc) => {
        const matchesCountry =
          newCountryIds.length === 0 || newCountryIds.includes(bc.country_id);
        const matchesFormulation =
          newFormulationIds.length === 0 ||
          newFormulationIds.includes(bc.formulation_id);
        if (matchesCountry && matchesFormulation) {
          const useGroupKey =
            bc.use_group_id ||
            `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
          if (useGroupKey) validUseGroupIds.add(useGroupKey);
        }
      });
      newUseGroupIds = selectedUseGroupIds.filter((id) =>
        validUseGroupIds.has(id),
      );
      // Auto-select if only one use group available
      if (newUseGroupIds.length === 0 && validUseGroupIds.size === 1) {
        newUseGroupIds = Array.from(validUseGroupIds);
      }
      setSelectedUseGroupIds(newUseGroupIds);

      notifyFilterChange(newCountryIds, newFormulationIds, newUseGroupIds);
      isAutoSelecting.current = false;
    },
    [
      businessCases,
      selectedFormulationIds,
      selectedUseGroupIds,
      notifyFilterChange,
    ],
  );

  // Handle formulation selection change with cascading updates
  const handleFormulationChange = useCallback(
    (newFormulationIds: string[]) => {
      isAutoSelecting.current = true;

      setSelectedFormulationIds(newFormulationIds);

      // Filter out use groups that are no longer available
      const validUseGroupIds = new Set<string>();
      businessCases.forEach((bc) => {
        const matchesCountry =
          selectedCountryIds.length === 0 ||
          selectedCountryIds.includes(bc.country_id);
        const matchesFormulation =
          newFormulationIds.length === 0 ||
          newFormulationIds.includes(bc.formulation_id);
        if (matchesCountry && matchesFormulation) {
          const useGroupKey =
            bc.use_group_id ||
            `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
          if (useGroupKey) validUseGroupIds.add(useGroupKey);
        }
      });
      let newUseGroupIds = selectedUseGroupIds.filter((id) =>
        validUseGroupIds.has(id),
      );
      // Auto-select if only one use group available
      if (newUseGroupIds.length === 0 && validUseGroupIds.size === 1) {
        newUseGroupIds = Array.from(validUseGroupIds);
      }
      setSelectedUseGroupIds(newUseGroupIds);

      notifyFilterChange(selectedCountryIds, newFormulationIds, newUseGroupIds);
      isAutoSelecting.current = false;
    },
    [
      businessCases,
      selectedCountryIds,
      selectedUseGroupIds,
      notifyFilterChange,
    ],
  );

  // Handle use group selection change
  const handleUseGroupChange = useCallback(
    (newUseGroupIds: string[]) => {
      setSelectedUseGroupIds(newUseGroupIds);
      notifyFilterChange(
        selectedCountryIds,
        selectedFormulationIds,
        newUseGroupIds,
      );
    },
    [selectedCountryIds, selectedFormulationIds, notifyFilterChange],
  );

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSelectedCountryIds([]);
    setSelectedFormulationIds([]);
    setSelectedUseGroupIds([]);
    notifyFilterChange([], [], []);
  }, [notifyFilterChange]);

  const hasActiveFilters =
    selectedCountryIds.length > 0 ||
    selectedFormulationIds.length > 0 ||
    selectedUseGroupIds.length > 0;

  // Count filtered business cases
  const filteredCount = useMemo(() => {
    return businessCases.filter((bc) => {
      const matchesCountry =
        selectedCountryIds.length === 0 ||
        selectedCountryIds.includes(bc.country_id);
      const matchesFormulation =
        selectedFormulationIds.length === 0 ||
        selectedFormulationIds.includes(bc.formulation_id);
      let matchesUseGroup = true;
      if (selectedUseGroupIds.length > 0) {
        const useGroupUuid = bc.use_group_id;
        const useGroupComposite = `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
        // Check both UUID and composite formats for backward compatibility
        matchesUseGroup = selectedUseGroupIds.some((filterId) => {
          if (useGroupUuid && filterId === useGroupUuid) return true;
          if (filterId === useGroupComposite) return true;
          return false;
        });
      }
      return matchesCountry && matchesFormulation && matchesUseGroup;
    }).length;
  }, [
    businessCases,
    selectedCountryIds,
    selectedFormulationIds,
    selectedUseGroupIds,
  ]);

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Filters</h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs">
              {filteredCount.toLocaleString()} of{" "}
              {businessCases.length.toLocaleString()}
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-8 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Country Filter */}
        <div className="space-y-2">
          <Label className="text-xs font-medium flex items-center justify-between">
            <span>Country</span>
            <span className="text-muted-foreground font-normal">
              {allFilterOptions.countries.length}
            </span>
          </Label>
          <MultiSelect
            options={allFilterOptions.countries}
            selected={selectedCountryIds}
            onChange={handleCountryChange}
            placeholder="All countries"
            searchPlaceholder="Search countries..."
            emptyText="No countries found"
          />
        </div>

        {/* Formulation Filter - filtered by country */}
        <div className="space-y-2">
          <Label className="text-xs font-medium flex items-center justify-between">
            <span>Formulation</span>
            <span className="text-muted-foreground font-normal">
              {availableFormulations.length}
            </span>
          </Label>
          <MultiSelect
            options={availableFormulations}
            selected={selectedFormulationIds}
            onChange={handleFormulationChange}
            placeholder="All formulations"
            searchPlaceholder="Search formulations..."
            emptyText="No formulations found"
          />
        </div>

        {/* Use Group Filter - filtered by country AND formulation */}
        <div className="space-y-2">
          <Label className="text-xs font-medium flex items-center justify-between">
            <span>Use Group</span>
            <span className="text-muted-foreground font-normal">
              {availableUseGroups.length}
            </span>
          </Label>
          <MultiSelect
            options={availableUseGroups}
            selected={selectedUseGroupIds}
            onChange={handleUseGroupChange}
            placeholder="All use groups"
            searchPlaceholder="Search use groups..."
            emptyText="No use groups found"
          />
        </div>
      </div>

      {/* Active filter badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t">
          {selectedCountryIds.length > 0 && (
            <Badge variant="outline" className="text-xs gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {selectedCountryIds.length}{" "}
              {selectedCountryIds.length === 1 ? "country" : "countries"}
            </Badge>
          )}
          {selectedFormulationIds.length > 0 && (
            <Badge variant="outline" className="text-xs gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {selectedFormulationIds.length}{" "}
              {selectedFormulationIds.length === 1
                ? "formulation"
                : "formulations"}
            </Badge>
          )}
          {selectedUseGroupIds.length > 0 && (
            <Badge variant="outline" className="text-xs gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {selectedUseGroupIds.length}{" "}
              {selectedUseGroupIds.length === 1 ? "use group" : "use groups"}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
