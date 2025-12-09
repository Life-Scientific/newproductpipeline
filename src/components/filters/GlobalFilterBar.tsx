"use client";

import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import type { ComputedFilterOptions } from "@/hooks/use-filter-options";

interface FilteredCounts {
  countries?: number;
  formulations?: number;
  formulationCountries?: number;
  useGroups?: number;
  businessCases?: number;
}

interface GlobalFilterBarProps {
  filterOptions: ComputedFilterOptions;
  defaultExpanded?: boolean;
  filteredCounts?: FilteredCounts;
}

export function GlobalFilterBar({
  filterOptions,
  defaultExpanded = false,
  filteredCounts,
}: GlobalFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { filters, setFilter, clearAllFilters, hasActiveFilters } = usePortfolioFilters();

  // Convert country codes to display names for MultiSelect
  const countryOptions = useMemo(() => {
    return filterOptions.countries.map((countryName) => {
      const code = filterOptions.countryNameToCode.get(countryName) || "";
      return {
        value: code,
        label: countryName,
      };
    });
  }, [filterOptions.countries, filterOptions.countryNameToCode]);

  // Convert formulation codes to display names for MultiSelect
  // Include selected formulations even if they're not in the filtered options (to preserve selection)
  const formulationOptions = useMemo(() => {
    const optionsMap = new Map<string, { value: string; label: string }>();
    
    // Add all formulations from filterOptions
    filterOptions.formulations.forEach((displayName) => {
      const code = filterOptions.displayToFormulationCode.get(displayName) || "";
      if (code) {
        optionsMap.set(code, {
          value: code,
          label: displayName,
        });
      }
    });
    
    // Also include any selected formulations that might not be in the filtered options
    // This ensures selected values persist even when options are constrained by cascading logic
    filters.formulations.forEach((code) => {
      if (!optionsMap.has(code)) {
        const displayName = filterOptions.formulationCodeToDisplay.get(code) || code;
        optionsMap.set(code, {
          value: code,
          label: displayName,
        });
      }
    });
    
    return Array.from(optionsMap.values());
  }, [filterOptions.formulations, filterOptions.displayToFormulationCode, filterOptions.formulationCodeToDisplay, filters.formulations]);

  // Use group options
  const useGroupOptions = useMemo(() => {
    return filterOptions.useGroups.map((name) => ({
      value: name,
      label: name,
    }));
  }, [filterOptions.useGroups]);

  // Formulation status options (without counts)
  const formulationStatusOptions = useMemo(() => {
    return filterOptions.formulationStatuses.map((status) => ({
      value: status,
      label: status,
    }));
  }, [filterOptions.formulationStatuses]);

  // Country status options (without counts)
  const countryStatusOptions = useMemo(() => {
    return filterOptions.countryStatuses.map((status) => ({
      value: status,
      label: status,
    }));
  }, [filterOptions.countryStatuses]);

  // Handle country filter change (codes)
  const handleCountryChange = (selectedCodes: string[]) => {
    setFilter("countries", selectedCodes);
  };

  // Handle formulation filter change (codes)
  const handleFormulationChange = (selectedCodes: string[]) => {
    setFilter("formulations", selectedCodes);
  };

  // Handle use group filter change (names)
  const handleUseGroupChange = (selectedNames: string[]) => {
    setFilter("useGroups", selectedNames);
  };

  // Handle formulation status filter change
  const handleFormulationStatusChange = (selectedStatuses: string[]) => {
    setFilter("formulationStatuses", selectedStatuses);
  };

  // Handle country status filter change
  const handleCountryStatusChange = (selectedStatuses: string[]) => {
    setFilter("countryStatuses", selectedStatuses);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Portfolio Filters</h3>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Expand
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Country Filter */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Country
              </Label>
              <MultiSelect
                options={countryOptions}
                selected={filters.countries}
                onChange={handleCountryChange}
                placeholder="All countries"
                searchPlaceholder="Search countries..."
                emptyText="No countries found"
                compact={true}
              />
            </div>

            {/* Formulation Filter */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Formulation
              </Label>
              <MultiSelect
                options={formulationOptions}
                selected={filters.formulations}
                onChange={handleFormulationChange}
                placeholder="All formulations"
                searchPlaceholder="Search formulations..."
                emptyText="No formulations found"
                compact={true}
              />
            </div>

            {/* Use Group Filter */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Use Group
              </Label>
              <MultiSelect
                options={useGroupOptions}
                selected={filters.useGroups}
                onChange={handleUseGroupChange}
                placeholder="All use groups"
                searchPlaceholder="Search use groups..."
                emptyText="No use groups found"
                disabled={filterOptions.useGroupsDisabled}
                compact={true}
              />
            </div>

            {/* Formulation Status Filter */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Formulation Status
              </Label>
              <MultiSelect
                options={formulationStatusOptions}
                selected={filters.formulationStatuses}
                onChange={handleFormulationStatusChange}
                placeholder="All statuses"
                searchPlaceholder="Search statuses..."
                emptyText="No statuses found"
                compact={true}
              />
            </div>

            {/* Country Status Filter */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Country Status
              </Label>
              <MultiSelect
                options={countryStatusOptions}
                selected={filters.countryStatuses}
                onChange={handleCountryStatusChange}
                placeholder="All statuses"
                searchPlaceholder="Search statuses..."
                emptyText="No statuses found"
                compact={true}
              />
            </div>
          </div>
        )}

        {/* Filtered Results Summary - show always when counts available */}
        {filteredCounts && (() => {
          const countItems: Array<{ value: number; label: string }> = [];
          if (filteredCounts.countries !== undefined) {
            countItems.push({ value: filteredCounts.countries, label: "countries" });
          }
          if (filteredCounts.formulations !== undefined) {
            countItems.push({ value: filteredCounts.formulations, label: "formulations" });
          }
          if (filteredCounts.formulationCountries !== undefined) {
            countItems.push({ value: filteredCounts.formulationCountries, label: "formulation-countries" });
          }
          if (filteredCounts.useGroups !== undefined) {
            countItems.push({ value: filteredCounts.useGroups, label: "use groups" });
          }
          if (filteredCounts.businessCases !== undefined) {
            countItems.push({ value: filteredCounts.businessCases, label: "business cases" });
          }

          if (countItems.length === 0) return null;

          return (
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <span className="text-muted-foreground">{hasActiveFilters ? "Showing:" : "Total:"}</span>
                {countItems.map((item, index) => (
                  <span key={item.label}>
                    <span className="font-semibold tabular-nums">{item.value}</span>
                    <span className="text-muted-foreground"> {item.label}</span>
                    {index < countItems.length - 1 && (
                      <span className="text-muted-foreground"> •</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Active Filters Summary (when collapsed) */}
        {!isExpanded && hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.countries.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.countries.length} {filters.countries.length === 1 ? "country" : "countries"}
              </Badge>
            )}
            {filters.formulations.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.formulations.length} {filters.formulations.length === 1 ? "formulation" : "formulations"}
              </Badge>
            )}
            {filters.useGroups.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.useGroups.length} {filters.useGroups.length === 1 ? "use group" : "use groups"}
              </Badge>
            )}
            {filters.formulationStatuses.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.formulationStatuses.length} formulation {filters.formulationStatuses.length === 1 ? "status" : "statuses"}
              </Badge>
            )}
            {filters.countryStatuses.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.countryStatuses.length} country {filters.countryStatuses.length === 1 ? "status" : "statuses"}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
