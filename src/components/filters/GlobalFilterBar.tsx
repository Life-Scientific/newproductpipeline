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
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FilterContainer } from "./FilterContainer";

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
  /** If true, renders without Card wrapper for inline integration */
  inline?: boolean;
  /** If true, uses integrated container styling (background, borders) */
  integrated?: boolean;
  /** Custom className for the container */
  containerClassName?: string;
}

export function GlobalFilterBar({
  filterOptions,
  defaultExpanded = false,
  filteredCounts,
  inline = false,
  integrated = false,
  containerClassName,
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

  // Count active filters
  const activeFilterCount = useMemo(() => {
    return filters.countries.length +
           filters.formulations.length +
           filters.useGroups.length +
           filters.formulationStatuses.length +
           filters.countryStatuses.length;
  }, [filters]);

  const content = (
    <>
      {/* Header */}
      <div className={cn("flex items-center justify-between", inline ? "mb-4" : "mb-4")}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-1.5 rounded-md transition-colors",
              hasActiveFilters ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}>
              <Filter className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Portfolio Filters</h3>
              {hasActiveFilters && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"} active
                </p>
              )}
            </div>
          </div>
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs font-medium">
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
              className="h-8 text-xs hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="h-3 w-3 mr-1.5" />
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
                <ChevronUp className="h-4 w-4 mr-1.5" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1.5" />
                Expand
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Active Filter Pills (when expanded) */}
      <AnimatePresence>
        {isExpanded && hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-2 mb-4 pb-4"
          >
            {filters.countries.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium gap-1.5 px-2.5 py-1">
                <span className="font-semibold">{filters.countries.length}</span>
                <span>Country{filters.countries.length !== 1 ? "ies" : ""}</span>
                <button
                  onClick={() => setFilter("countries", [])}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.formulations.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium gap-1.5 px-2.5 py-1">
                <span className="font-semibold">{filters.formulations.length}</span>
                <span>Formulation{filters.formulations.length !== 1 ? "s" : ""}</span>
                <button
                  onClick={() => setFilter("formulations", [])}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.useGroups.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium gap-1.5 px-2.5 py-1">
                <span className="font-semibold">{filters.useGroups.length}</span>
                <span>Use Group{filters.useGroups.length !== 1 ? "s" : ""}</span>
                <button
                  onClick={() => setFilter("useGroups", [])}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.formulationStatuses.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium gap-1.5 px-2.5 py-1">
                <span className="font-semibold">{filters.formulationStatuses.length}</span>
                <span>Form Status{filters.formulationStatuses.length !== 1 ? "es" : ""}</span>
                <button
                  onClick={() => setFilter("formulationStatuses", [])}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.countryStatuses.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium gap-1.5 px-2.5 py-1">
                <span className="font-semibold">{filters.countryStatuses.length}</span>
                <span>Country Status{filters.countryStatuses.length !== 1 ? "es" : ""}</span>
                <button
                  onClick={() => setFilter("countryStatuses", [])}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Controls */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
              inline && "pb-4"
            )}>
              {/* Country Filter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="space-y-2"
              >
                <Label className="text-xs font-medium flex items-center justify-between">
                  <span>Country</span>
                  {filters.countries.length > 0 && (
                    <Badge variant="outline" className="text-xs h-4 px-1.5">
                      {filters.countries.length}
                    </Badge>
                  )}
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
              </motion.div>

              {/* Formulation Filter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <Label className="text-xs font-medium flex items-center justify-between">
                  <span>Formulation</span>
                  {filters.formulations.length > 0 && (
                    <Badge variant="outline" className="text-xs h-4 px-1.5">
                      {filters.formulations.length}
                    </Badge>
                  )}
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
              </motion.div>

              {/* Use Group Filter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-2"
              >
                <Label className="text-xs font-medium flex items-center justify-between">
                  <span>Use Group</span>
                  {filters.useGroups.length > 0 && (
                    <Badge variant="outline" className="text-xs h-4 px-1.5">
                      {filters.useGroups.length}
                    </Badge>
                  )}
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
              </motion.div>

              {/* Formulation Status Filter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label className="text-xs font-medium flex items-center justify-between">
                  <span>Formulation Status</span>
                  {filters.formulationStatuses.length > 0 && (
                    <Badge variant="outline" className="text-xs h-4 px-1.5">
                      {filters.formulationStatuses.length}
                    </Badge>
                  )}
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
              </motion.div>

              {/* Country Status Filter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-2"
              >
                <Label className="text-xs font-medium flex items-center justify-between">
                  <span>Country Status</span>
                  {filters.countryStatuses.length > 0 && (
                    <Badge variant="outline" className="text-xs h-4 px-1.5">
                      {filters.countryStatuses.length}
                    </Badge>
                  )}
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("pt-4", inline && "mt-4")}
          >
            <div className="flex items-center gap-2 flex-wrap text-sm">
              <span className="text-muted-foreground font-medium">{hasActiveFilters ? "Showing:" : "Total:"}</span>
              {countItems.map((item, index) => (
                <span key={item.label} className="flex items-center gap-1">
                  <span className="font-semibold tabular-nums text-foreground">{item.value.toLocaleString()}</span>
                  <span className="text-muted-foreground"> {item.label}</span>
                  {index < countItems.length - 1 && (
                    <span className="text-muted-foreground mx-1">•</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })()}

      {/* Active Filters Summary (when collapsed) */}
      <AnimatePresence>
        {!isExpanded && hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap gap-2 mt-3 pt-3"
          >
            {filters.countries.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium gap-1.5 px-2.5 py-1">
                <span className="font-semibold">{filters.countries.length}</span>
                <span>Country{filters.countries.length !== 1 ? "ies" : ""}</span>
              </Badge>
            )}
            {filters.formulations.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium gap-1.5 px-2.5 py-1">
                <span className="font-semibold">{filters.formulations.length}</span>
                <span>Formulation{filters.formulations.length !== 1 ? "s" : ""}</span>
              </Badge>
            )}
            {filters.useGroups.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium gap-1.5 px-2.5 py-1">
                <span className="font-semibold">{filters.useGroups.length}</span>
                <span>Use Group{filters.useGroups.length !== 1 ? "s" : ""}</span>
              </Badge>
            )}
            {filters.formulationStatuses.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium gap-1.5 px-2.5 py-1">
                <span className="font-semibold">{filters.formulationStatuses.length}</span>
                <span>Form Status{filters.formulationStatuses.length !== 1 ? "es" : ""}</span>
              </Badge>
            )}
            {filters.countryStatuses.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium gap-1.5 px-2.5 py-1">
                <span className="font-semibold">{filters.countryStatuses.length}</span>
                <span>Country Status{filters.countryStatuses.length !== 1 ? "es" : ""}</span>
              </Badge>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // Use FilterContainer for consistent styling
  if (inline) {
    return (
      <FilterContainer integrated={integrated} className={containerClassName}>
        <div className={cn("w-full", !isExpanded && "pb-2")}>{content}</div>
      </FilterContainer>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {content}
      </CardContent>
    </Card>
  );
}
