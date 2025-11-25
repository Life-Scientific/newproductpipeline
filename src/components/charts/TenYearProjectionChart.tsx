"use client";

import { useState, useMemo, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"] & {
  country_id?: string | null;
};
type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

interface TenYearProjectionChartProps {
  businessCases: BusinessCase[];
  formulations: Formulation[];
  exchangeRates?: Map<string, number>; // country_id -> exchange_rate_to_eur
}

type FilterType = {
  countries: string[];
  formulations: string[];
  useGroups: string[];
  statuses: string[];
};

interface FilterMultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  counts?: Map<string, number>; // Map of option -> count
  disabled?: boolean; // Whether the filter is disabled
}

// Client-only wrapper to prevent hydration mismatch
function FilterMultiSelectClient({ label, options, selected, onSelectionChange, counts, disabled = false }: FilterMultiSelectProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const allSelected = selected.length === options.length && options.length > 0;
  const someSelected = selected.length > 0 && selected.length < options.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    return options.filter((opt) =>
      opt.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  const handleToggleAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange([...options]);
    }
  };

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onSelectionChange(selected.filter((s) => s !== value));
    } else {
      onSelectionChange([...selected, value]);
    }
  };

  // Render placeholder on server to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        className="w-full justify-between"
        disabled
      >
        <span className="truncate">{label}</span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-between transition-colors",
            selected.length > 0 && "bg-accent border-primary/20",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="truncate text-sm">
            {selected.length === 0
              ? label
              : `${label} (${selected.length})`}
          </span>
          <ChevronDown className={cn(
            "ml-2 h-4 w-4 shrink-0 transition-transform",
            open && "rotate-180",
            "opacity-50"
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <div className="p-3 border-b space-y-2">
          <div className="flex items-center space-x-2 px-2 py-1.5">
            <Checkbox
              checked={allSelected}
              onCheckedChange={handleToggleAll}
            />
            <label
              className="text-sm font-medium cursor-pointer flex-1"
              onClick={handleToggleAll}
            >
              {someSelected ? `Selected ${selected.length} of ${options.length}` : "Select all"}
            </label>
            {selected.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectionChange([]);
                }}
              >
                Clear
              </Button>
            )}
          </div>
          <div className="px-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-8"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        <div className="max-h-[300px] overflow-auto p-1">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="space-y-0.5">
              {filteredOptions.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <label
                    key={option}
                    onClick={() => handleToggle(option)}
                    className={cn(
                      "w-full flex items-center space-x-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors cursor-pointer",
                      isSelected && "bg-accent/50"
                    )}
                  >
                    <Checkbox 
                      checked={isSelected} 
                      onCheckedChange={() => handleToggle(option)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="flex-1 truncate">{option}</span>
                    {counts && counts.has(option) && (
                      <span className="text-xs text-muted-foreground ml-auto">
                        ({counts.get(option)})
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function TenYearProjectionChart({
  businessCases,
  formulations,
  exchangeRates: initialExchangeRates,
}: TenYearProjectionChartProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterType>({
    countries: [],
    formulations: [],
    useGroups: [],
    statuses: [],
  });
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [exchangeRates] = useState<Map<string, number>>(initialExchangeRates || new Map());
  const chartId = useId().replace(/:/g, "-");
  
  // Get chart colors - use hex colors that work reliably in SVG
  // CSS variables with oklch don't work directly in SVG fill/stroke attributes
  const revenueColor = "#3b82f6"; // Blue
  const marginColor = "#10b981"; // Green

  // Get unique filter options
  // Map formulation codes to "Name (Code)" display format
  const formulationDisplayMap = useMemo(() => {
    const map = new Map<string, string>(); // code -> display string
    businessCases.forEach((bc) => {
      if (bc.formulation_code && !map.has(bc.formulation_code)) {
        const display = bc.formulation_name 
          ? `${bc.formulation_name} (${bc.formulation_code})`
          : bc.formulation_code;
        map.set(bc.formulation_code, display);
      }
    });
    return map;
  }, [businessCases]);

  const filterOptions = useMemo(() => {
    const countries = new Set<string>();
    const formulationDisplays = new Set<string>();
    const useGroups = new Set<string>();
    const statuses = new Set<string>();

    // Count maps for each filter type
    const countryCounts = new Map<string, number>();
    const formulationCounts = new Map<string, number>();
    const useGroupCounts = new Map<string, number>();
    const statusCounts = new Map<string, number>();

    businessCases.forEach((bc) => {
      if (bc.country_name) {
        countries.add(bc.country_name);
        countryCounts.set(bc.country_name, (countryCounts.get(bc.country_name) || 0) + 1);
      }
      if (bc.formulation_code) {
        // Use display format: "Name (Code)"
        const display = formulationDisplayMap.get(bc.formulation_code) || bc.formulation_code;
        formulationDisplays.add(display);
        formulationCounts.set(display, (formulationCounts.get(display) || 0) + 1);
      }
      if (bc.use_group_name) {
        useGroups.add(bc.use_group_name);
        useGroupCounts.set(bc.use_group_name, (useGroupCounts.get(bc.use_group_name) || 0) + 1);
      }
    });

    formulations.forEach((f) => {
      if (f.status) {
        statuses.add(f.status);
        // Count business cases for this status
        const bcCount = businessCases.filter(bc => {
          const formulation = formulations.find(form => form.formulation_code === bc.formulation_code);
          return formulation?.status === f.status;
        }).length;
        statusCounts.set(f.status, bcCount);
      }
    });

    return {
      countries: Array.from(countries).sort(),
      formulations: Array.from(formulationDisplays).sort(),
      useGroups: Array.from(useGroups).sort(),
      statuses: Array.from(statuses).sort(),
      countryCounts,
      formulationCounts,
      useGroupCounts,
      statusCounts,
    };
  }, [businessCases, formulations, formulationDisplayMap]);

  // Filter business cases based on active filters
  const filteredBusinessCases = useMemo(() => {
    return businessCases.filter((bc) => {
      if (filters.countries.length > 0 && !filters.countries.includes(bc.country_name || "")) {
        return false;
      }
      if (filters.formulations.length > 0) {
        // Formulation filter uses display format "Name (Code)", so check if BC's display matches
        const bcDisplay = formulationDisplayMap.get(bc.formulation_code || "") || bc.formulation_code || "";
        if (!filters.formulations.includes(bcDisplay)) {
          return false;
        }
      }
      if (filters.useGroups.length > 0 && !filters.useGroups.includes(bc.use_group_name || "")) {
        return false;
      }
      if (filters.statuses.length > 0) {
        const formulation = formulations.find((f) => f.formulation_code === bc.formulation_code);
        if (!formulation || !filters.statuses.includes(formulation.status || "")) {
          return false;
        }
      }
      return true;
    });
  }, [businessCases, formulations, filters, formulationDisplayMap]);


  // Generate chart data - show only years with actual data
  const chartData = useMemo(() => {
    // Find the actual range of fiscal years in the data
    let earliestYear = Infinity;
    let latestYear = -Infinity;
    
    filteredBusinessCases.forEach((bc) => {
      if (bc.fiscal_year) {
        const fyNum = parseInt(bc.fiscal_year.replace("FY", ""), 10);
        if (!isNaN(fyNum)) {
          if (fyNum < earliestYear) earliestYear = fyNum;
          if (fyNum > latestYear) latestYear = fyNum;
        }
      }
    });

    // If no valid data, use current fiscal year as default
    if (earliestYear === Infinity || latestYear === -Infinity) {
      earliestYear = CURRENT_FISCAL_YEAR;
      latestYear = CURRENT_FISCAL_YEAR + 9;
    }

    // Generate fiscal years only for the data range (no extra empty years)
    const fiscalYears: string[] = [];
    
    for (let fyNum = earliestYear; fyNum <= latestYear; fyNum++) {
      const fyStr = `FY${String(fyNum).padStart(2, "0")}`;
      fiscalYears.push(fyStr);
    }

    // Initialize years array
    const years: Array<{
      fiscalYear: string;
      fiscalYearNum: number;
      revenue: number;
      margin: number;
      revenueEUR: number;
      marginEUR: number;
      cogs: number;
      count: number;
    }> = [];

    fiscalYears.forEach((fyStr) => {
      const fyNum = parseInt(fyStr.replace("FY", ""), 10);
      years.push({
        fiscalYear: fyStr,
        fiscalYearNum: fyNum,
        revenue: 0,
        margin: 0,
        revenueEUR: 0,
        marginEUR: 0,
        cogs: 0,
        count: 0,
      });
    });

    // Aggregate filtered business cases by fiscal year
    filteredBusinessCases.forEach((bc) => {
      const fy = bc.fiscal_year || "";
      const yearIndex = years.findIndex((y) => y.fiscalYear === fy);
      if (yearIndex >= 0) {
        const localRevenue = bc.total_revenue || 0;
        const localMargin = bc.total_margin || 0;
        const localCogs = bc.total_cogs || 0;
        
        // Skip if values are invalid (e.g., NaN, Infinity)
        if (!Number.isFinite(localRevenue) || !Number.isFinite(localMargin)) {
          return;
        }
        
        years[yearIndex].revenue += localRevenue;
        years[yearIndex].margin += localMargin;
        years[yearIndex].cogs += localCogs;
        years[yearIndex].count += 1;

        // Convert to EUR using exchange rate if available
        // Default to rate of 1.0 (assume EUR) if no rate found
        const countryId = bc.country_id;
        let rate = 1.0;
        
        if (countryId && exchangeRates.has(countryId)) {
          const foundRate = exchangeRates.get(countryId);
          if (foundRate && foundRate > 0 && Number.isFinite(foundRate)) {
            rate = foundRate;
          }
        }
        
        years[yearIndex].revenueEUR += localRevenue / rate;
        years[yearIndex].marginEUR += localMargin / rate;
      }
    });

    // Convert to millions for display
    return years.map((year) => ({
      ...year,
      revenue: year.revenue / 1000000,
      margin: year.margin / 1000000,
      revenueEUR: year.revenueEUR / 1000000,
      marginEUR: year.marginEUR / 1000000,
      cogs: year.cogs / 1000000,
    }));
  }, [filteredBusinessCases, exchangeRates]);

  const handleRemoveFilter = (type: keyof FilterType, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((v) => v !== value),
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      countries: [],
      formulations: [],
      useGroups: [],
      statuses: [],
    });
  };

  const handleDrillDown = (fiscalYear: string) => {
    const params = new URLSearchParams();
    params.set("fiscalYear", fiscalYear);
    if (filters.countries.length > 0) {
      params.set("countries", filters.countries.join(","));
    }
    if (filters.formulations.length > 0) {
      params.set("formulations", filters.formulations.join(","));
    }
    router.push(`/business-cases?${params.toString()}`);
  };

  const hasActiveFilters =
    filters.countries.length > 0 ||
    filters.formulations.length > 0 ||
    filters.useGroups.length > 0 ||
    filters.statuses.length > 0;

  // Calculate unique formulations in the filtered view
  const uniqueFormulations = useMemo(() => {
    const formulationSet = new Set<string>();
    filteredBusinessCases.forEach((bc) => {
      if (bc.formulation_code) {
        formulationSet.add(bc.formulation_code);
      }
    });
    return formulationSet.size;
  }, [filteredBusinessCases]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card className="w-full overflow-hidden">
        <CardHeader className="space-y-1.5">
          <div className="flex items-start justify-between gap-4">
            <motion.div 
              className="flex-1 space-y-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <CardTitle className="text-xl font-semibold">Revenue Projection</CardTitle>
              <CardDescription className="text-sm">
                Projected revenue and margin by fiscal year
                {hasActiveFilters && (
                  <motion.span 
                    className="ml-1 font-medium text-foreground"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ({filteredBusinessCases.length} business cases, {uniqueFormulations} formulation{uniqueFormulations !== 1 ? 's' : ''})
                  </motion.span>
                )}
                {!hasActiveFilters && (
                  <motion.span 
                    className="ml-1 text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ({uniqueFormulations} formulation{uniqueFormulations !== 1 ? 's' : ''} represented)
                  </motion.span>
                )}
              </CardDescription>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("line")}
                className="transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Line
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Bar
              </Button>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Filters</h3>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearAllFilters} 
                className="h-7 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all
              </Button>
            )}
          </div>
          
          {/* Filter Multi-Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filterOptions.countries.length > 0 && (
              <FilterMultiSelectClient
                label="Country"
                options={filterOptions.countries}
                selected={filters.countries}
                onSelectionChange={(selected) => {
                  setFilters((prev) => ({ ...prev, countries: selected }));
                }}
                counts={filterOptions.countryCounts}
              />
            )}
            {filterOptions.formulations.length > 0 && (
              <FilterMultiSelectClient
                label="Formulation"
                options={filterOptions.formulations}
                selected={filters.formulations}
                onSelectionChange={(selected) => {
                  setFilters((prev) => ({ ...prev, formulations: selected }));
                }}
                counts={filterOptions.formulationCounts}
              />
            )}
            {filterOptions.useGroups.length > 0 && (
              <FilterMultiSelectClient
                label="Use Group"
                options={filterOptions.useGroups}
                selected={filters.useGroups}
                onSelectionChange={(selected) => {
                  setFilters((prev) => ({ ...prev, useGroups: selected }));
                }}
                counts={filterOptions.useGroupCounts}
                disabled={filters.formulations.length === 0 || filters.countries.length === 0}
              />
            )}
            {filterOptions.statuses.length > 0 && (
              <FilterMultiSelectClient
                label="Status"
                options={filterOptions.statuses}
                selected={filters.statuses}
                onSelectionChange={(selected) => {
                  setFilters((prev) => ({ ...prev, statuses: selected }));
                }}
                counts={filterOptions.statusCounts}
              />
            )}
          </div>

          {/* Active Filter Badges */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div 
                className="flex flex-wrap gap-2 pt-3 border-t"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filters.countries.map((country, index) => (
                  <motion.div
                    key={`country-${country}`}
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="gap-1.5 pr-1 py-1.5 px-2.5 text-xs font-medium transition-all duration-200 hover:scale-105"
                    >
                      <span className="text-muted-foreground">Country:</span>
                      <span className="text-foreground">{country}</span>
                      <button
                        onClick={() => handleRemoveFilter("countries", country)}
                        className="ml-0.5 hover:bg-destructive/20 rounded-full p-0.5 transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label={`Remove ${country} filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
                {filters.formulations.map((formulation, index) => (
                  <motion.div
                    key={`formulation-${formulation}`}
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: (filters.countries.length + index) * 0.05 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="gap-1.5 pr-1 py-1.5 px-2.5 text-xs font-medium transition-all duration-200 hover:scale-105"
                    >
                      <span className="text-muted-foreground">Formulation:</span>
                      <span className="text-foreground">{formulation}</span>
                      <button
                        onClick={() => handleRemoveFilter("formulations", formulation)}
                        className="ml-0.5 hover:bg-destructive/20 rounded-full p-0.5 transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label={`Remove ${formulation} filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
                {filters.useGroups.map((useGroup, index) => (
                  <motion.div
                    key={`useGroup-${useGroup}`}
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: (filters.countries.length + filters.formulations.length + index) * 0.05 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="gap-1.5 pr-1 py-1.5 px-2.5 text-xs font-medium transition-all duration-200 hover:scale-105"
                    >
                      <span className="text-muted-foreground">Use Group:</span>
                      <span className="text-foreground">{useGroup}</span>
                      <button
                        onClick={() => handleRemoveFilter("useGroups", useGroup)}
                        className="ml-0.5 hover:bg-destructive/20 rounded-full p-0.5 transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label={`Remove ${useGroup} filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
                {filters.statuses.map((status, index) => (
                  <motion.div
                    key={`status-${status}`}
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: (filters.countries.length + filters.formulations.length + filters.useGroups.length + index) * 0.05 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="gap-1.5 pr-1 py-1.5 px-2.5 text-xs font-medium transition-all duration-200 hover:scale-105"
                    >
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-foreground">{status}</span>
                      <button
                        onClick={() => handleRemoveFilter("statuses", status)}
                        className="ml-0.5 hover:bg-destructive/20 rounded-full p-0.5 transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label={`Remove ${status} filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chart */}
        <motion.div 
          className="w-full h-[400px] sm:h-[500px] lg:h-[600px] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Background grid pattern */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={chartType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full relative z-10"
            >
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                  {chartType === "line" ? (
                    <AreaChart
                      data={chartData}
                      onClick={(data: any) => {
                        if (data?.activePayload?.[0]?.payload?.fiscalYear) {
                          handleDrillDown(data.activePayload[0].payload.fiscalYear);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                      margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                      // Animation props removed - not supported in this chart type
                    >
                <defs>
                  {/* Revenue gradient using theme color */}
                  <linearGradient id={`colorRevenue-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={revenueColor} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={revenueColor} stopOpacity={0.08} />
                  </linearGradient>
                  {/* Margin gradient using theme color */}
                  <linearGradient id={`colorMargin-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={marginColor} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={marginColor} stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.4}
                  vertical={true}
                  horizontal={true}
                />
                <XAxis 
                  dataKey="fiscalYear" 
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 500 }}
                  axisLine={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                  interval={chartData.length > 20 ? Math.floor(chartData.length / 10) : 0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  domain={['dataMin', 'dataMax']}
                />
                <YAxis 
                  label={{ 
                    value: "Amount (M€)", 
                    angle: -90, 
                    position: "insideLeft",
                    style: { fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 500 }
                  }}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    opacity: 1,
                  }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      // Filter out duplicate entries by dataKey
                      // Recharts includes both the main Area and the dot-only Area in payload
                      const seen = new Set<string>();
                      const visibleEntries = payload.filter((entry: any) => {
                        const key = entry.dataKey;
                        // Skip duplicates and entries without proper names
                        if (seen.has(key) || !entry.name) {
                          return false;
                        }
                        // Only include entries with the expected names
                        if (entry.name !== 'Revenue (EUR)' && entry.name !== 'Margin (EUR)') {
                          return false;
                        }
                        seen.add(key);
                        return true;
                      });
                      
                      return (
                        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-semibold text-sm mb-2">{label}</p>
                          {visibleEntries.map((entry: any, index: number) => {
                            const color = entry.color || (entry.dataKey === 'revenueEUR' ? revenueColor : marginColor);
                            const name = entry.name;
                            return (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: color }}
                                />
                                <span className="text-muted-foreground">{name}:</span>
                                <span className="font-medium">€{Number(entry.value).toFixed(2)}M</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeDasharray: "5 5", opacity: 0.3 }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "24px" }}
                  iconType="line"
                  iconSize={12}
                  formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                />
                {/* Revenue Area with gradient fill and line (EUR) */}
                <Area
                  type="monotone"
                  dataKey="revenueEUR"
                  stroke={revenueColor}
                  strokeWidth={2.5}
                  fill={`url(#colorRevenue-${chartId})`}
                  name="Revenue (EUR)"
                  dot={{ r: 3, fill: revenueColor, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  activeDot={{ r: 5, fill: revenueColor, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                {/* Margin Area with gradient fill and line (EUR) */}
                <Area
                  type="monotone"
                  dataKey="marginEUR"
                  stroke={marginColor}
                  strokeWidth={2.5}
                  fill={`url(#colorMargin-${chartId})`}
                  name="Margin (EUR)"
                  dot={{ r: 3, fill: marginColor, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  activeDot={{ r: 5, fill: marginColor, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </AreaChart>
            ) : (
              <BarChart
                data={chartData}
                onClick={(data: any) => {
                  if (data?.activePayload?.[0]?.payload?.fiscalYear) {
                    handleDrillDown(data.activePayload[0].payload.fiscalYear);
                  }
                }}
                style={{ cursor: "pointer" }}
                margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                // Animation props removed - not supported in this chart type
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.4}
                  vertical={true}
                  horizontal={true}
                />
                <XAxis 
                  dataKey="fiscalYear"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 500 }}
                  axisLine={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                  interval={chartData.length > 20 ? Math.floor(chartData.length / 10) : 0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  domain={['dataMin', 'dataMax']}
                />
                <YAxis 
                  label={{ 
                    value: "Amount (M€)", 
                    angle: -90, 
                    position: "insideLeft",
                    style: { fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 500 }
                  }}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    opacity: 1,
                  }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      // Filter out duplicate entries by dataKey
                      const seen = new Set<string>();
                      const visibleEntries = payload.filter((entry: any) => {
                        const key = entry.dataKey;
                        // Skip duplicates and entries without proper names
                        if (seen.has(key) || !entry.name) {
                          return false;
                        }
                        // Only include entries with the expected names
                        if (entry.name !== 'Revenue (EUR)' && entry.name !== 'Margin (EUR)') {
                          return false;
                        }
                        seen.add(key);
                        return true;
                      });
                      
                      return (
                        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-semibold text-sm mb-2">{label}</p>
                          {visibleEntries.map((entry: any, index: number) => {
                            const color = entry.color || (entry.dataKey === 'revenueEUR' ? revenueColor : marginColor);
                            const name = entry.name;
                            return (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: color }}
                                />
                                <span className="text-muted-foreground">{name}:</span>
                                <span className="font-medium">€{Number(entry.value).toFixed(2)}M</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "24px" }}
                  iconSize={12}
                  formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                />
                <Bar 
                  dataKey="revenueEUR" 
                  fill={revenueColor} 
                  name="Revenue (EUR)" 
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={2000}
                  animationEasing="ease-out"
                />
                <Bar 
                  dataKey="marginEUR" 
                  fill={marginColor} 
                  name="Margin (EUR)" 
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={2000}
                  animationEasing="ease-out"
                />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">No data available</p>
                    <p className="text-xs text-muted-foreground">Try adjusting your filters</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="space-y-1"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Revenue</p>
            <motion.p 
              className="text-2xl sm:text-3xl font-bold text-foreground"
              key={chartData.reduce((sum, year) => sum + year.revenueEUR, 0)}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              €
              {(
                chartData.reduce((sum, year) => sum + year.revenueEUR, 0) * 1000000
              ).toLocaleString(undefined, {
                maximumFractionDigits: 1,
                notation: "compact",
                compactDisplay: "short",
              })}
            </motion.p>
            <p className="text-xs text-muted-foreground">EUR</p>
          </motion.div>
          <motion.div 
            className="space-y-1"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Margin</p>
            <motion.p 
              className="text-2xl sm:text-3xl font-bold text-foreground"
              key={chartData.reduce((sum, year) => sum + year.marginEUR, 0)}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              €
              {(
                chartData.reduce((sum, year) => sum + year.marginEUR, 0) * 1000000
              ).toLocaleString(undefined, {
                maximumFractionDigits: 1,
                notation: "compact",
                compactDisplay: "short",
              })}
            </motion.p>
            <p className="text-xs text-muted-foreground">EUR</p>
          </motion.div>
          <motion.div 
            className="space-y-1"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Avg Margin</p>
            <motion.p 
              className="text-2xl sm:text-3xl font-bold text-foreground"
              key={chartData.length > 0 && chartData.reduce((sum, year) => sum + year.revenueEUR, 0) > 0
                ? (
                    (chartData.reduce((sum, year) => sum + year.marginEUR, 0) /
                      chartData.reduce((sum, year) => sum + year.revenueEUR, 0)) *
                    100
                  ).toFixed(1)
                : "0.0"}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {chartData.length > 0 && chartData.reduce((sum, year) => sum + year.revenueEUR, 0) > 0
                ? (
                    (chartData.reduce((sum, year) => sum + year.marginEUR, 0) /
                      chartData.reduce((sum, year) => sum + year.revenueEUR, 0)) *
                    100
                  ).toFixed(1)
                : "0.0"}
              <span className="text-lg ml-1">%</span>
            </motion.p>
            <p className="text-xs text-muted-foreground">Across all years</p>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
    </motion.div>
  );
}




