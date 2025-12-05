"use client";

import { useState, useMemo, useEffect, useId, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import type { Database } from "@/lib/supabase/database.types";
import { useTheme } from "@/contexts/ThemeContext";
import { countUniqueBusinessCaseGroups } from "@/lib/utils/business-case-utils";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";

// MECE (Mutually Exclusive, Collectively Exhaustive) status constants
const ALL_COUNTRY_STATUSES = [
  "Not yet evaluated",
  "Not selected for entry",
  "Selected for entry",
  "On hold",
  "Withdrawn",
] as const;

const ALL_FORMULATION_STATUSES = [
  "Not Yet Evaluated",
  "Selected",
  "Being Monitored",
  "Killed",
] as const;

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"] & {
  country_id?: string | null;
  country_status?: string | null;
  formulation_country_id?: string | null;
};
type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

interface TenYearProjectionChartProps {
  businessCases: BusinessCase[];
  formulations: Formulation[];
}

type FilterType = {
  countries: string[];
  formulations: string[];
  useGroups: string[];
  formulationStatuses: string[];
  countryStatuses: string[];
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
  const selectAllId = useId();

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
        className="justify-between h-9 px-3"
        disabled
      >
        <span className="text-sm">{label}</span>
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
            "justify-between h-9 px-3",
            selected.length > 0 && "bg-accent border-primary/20",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="text-sm whitespace-nowrap">
            {selected.length === 0
              ? label
              : `${label} (${selected.length})`}
          </span>
          <ChevronDown className={cn(
            "ml-2 h-4 w-4 shrink-0",
            open && "rotate-180"
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <div className="p-3 border-b space-y-2">
          <div className="flex items-center space-x-2 px-2 py-1.5">
            <Checkbox
              id={selectAllId}
              checked={allSelected}
              onCheckedChange={handleToggleAll}
            />
            <label
              htmlFor={selectAllId}
              className="text-sm font-medium cursor-pointer flex-1"
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
              {filteredOptions.map((option, index) => {
                const isSelected = selected.includes(option);
                const optionId = `${selectAllId}-option-${index}`;
                return (
                  <div
                    key={option}
                    className={cn(
                      "w-full flex items-center space-x-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors cursor-pointer",
                      isSelected && "bg-accent/50"
                    )}
                    onClick={() => handleToggle(option)}
                  >
                    <Checkbox 
                      id={optionId}
                      checked={isSelected} 
                      onCheckedChange={() => handleToggle(option)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label 
                      htmlFor={optionId} 
                      className="flex-1 cursor-pointer"
                      onClick={(e) => {
                        // Prevent the label's htmlFor from triggering the checkbox
                        // and handle the toggle directly to avoid double-firing
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggle(option);
                      }}
                    >
                      {option}
                    </label>
                    {counts && counts.has(option) && (
                      <span className="text-xs text-muted-foreground ml-auto">
                        ({counts.get(option)})
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Default year range
const DEFAULT_YEAR_RANGE = 10;

export function TenYearProjectionChart({
  businessCases,
  formulations,
}: TenYearProjectionChartProps) {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { currencySymbol, preferences, formatCurrencyCompact, convertCurrency } = useDisplayPreferences();
  // Initialize with default filter states
  const [filters, setFilters] = useState<FilterType>({
    countries: [],
    formulations: [],
    useGroups: [],
    formulationStatuses: ["Selected"],
    countryStatuses: ["Selected for entry"],
  });
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const chartId = useId().replace(/:/g, "-");
  
  // Year range selection state
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  
  // Get chart colors from theme - compute hex values from CSS variables
  const [revenueColor, setRevenueColor] = useState("#3b82f6");
  const [marginColor, setMarginColor] = useState("#10b981");
  const [axisColor, setAxisColor] = useState("#71717a");
  const [borderColor, setBorderColor] = useState("#e4e4e7");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [popoverColor, setPopoverColor] = useState("#ffffff");
  const [mutedColor, setMutedColor] = useState("#f4f4f5");
  
  // Update colors when theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const computedStyle = getComputedStyle(document.documentElement);
    
    // Convert oklch/color to hex using canvas
    const colorToHex = (colorStr: string, fallback: string): string => {
      if (!colorStr || colorStr === "") return fallback;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext("2d");
        if (!ctx) return fallback;
        ctx.fillStyle = colorStr;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      } catch {
        return fallback;
      }
    };
    
    // Get all theme colors
    const chart1 = computedStyle.getPropertyValue("--chart-1").trim();
    const chart2 = computedStyle.getPropertyValue("--chart-2").trim();
    const mutedFg = computedStyle.getPropertyValue("--muted-foreground").trim();
    const border = computedStyle.getPropertyValue("--border").trim();
    const bg = computedStyle.getPropertyValue("--background").trim();
    const popover = computedStyle.getPropertyValue("--popover").trim();
    const muted = computedStyle.getPropertyValue("--muted").trim();
    
    setRevenueColor(colorToHex(chart1, "#3b82f6"));
    setMarginColor(colorToHex(chart2, "#10b981"));
    setAxisColor(colorToHex(mutedFg, "#71717a"));
    setBorderColor(colorToHex(border, "#e4e4e7"));
    setBgColor(colorToHex(bg, "#ffffff"));
    setPopoverColor(colorToHex(popover, "#ffffff"));
    setMutedColor(colorToHex(muted, "#f4f4f5"));
  }, [currentTheme]);

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

  // Create a formulation code -> status lookup map once
  const formulationStatusMap = useMemo(() => {
    const map = new Map<string, string>();
    formulations.forEach((f) => {
      if (f.formulation_code && f.status) {
        map.set(f.formulation_code, f.status);
      }
    });
    return map;
  }, [formulations]);

  // Get available countries and formulations for cascading filters
  const availableCountriesForFormulations = useMemo(() => {
    const countryMap = new Map<string, Set<string>>(); // formulation_code -> Set<country_name>
    businessCases.forEach((bc) => {
      if (bc.formulation_code && bc.country_name) {
        if (!countryMap.has(bc.formulation_code)) {
          countryMap.set(bc.formulation_code, new Set());
        }
        countryMap.get(bc.formulation_code)!.add(bc.country_name);
      }
    });
    return countryMap;
  }, [businessCases]);

  const availableFormulationsForCountries = useMemo(() => {
    const formulationMap = new Map<string, Set<string>>(); // country_name -> Set<formulation_code>
    businessCases.forEach((bc) => {
      if (bc.country_name && bc.formulation_code) {
        if (!formulationMap.has(bc.country_name)) {
          formulationMap.set(bc.country_name, new Set());
        }
        formulationMap.get(bc.country_name)!.add(bc.formulation_code);
      }
    });
    return formulationMap;
  }, [businessCases]);

  const filterOptions = useMemo(() => {
    const countries = new Set<string>();
    const formulationDisplays = new Set<string>();
    const useGroups = new Set<string>();
    const formulationStatusCounts = new Map<string, number>();
    const countryStatusCounts = new Map<string, number>();

    // Count maps for each filter type - tracking unique groups
    const countryCounts = new Map<string, Set<string>>(); // country_name -> Set<business_case_group_id>
    const formulationCounts = new Map<string, Set<string>>(); // formulation_display -> Set<business_case_group_id>
    const useGroupCounts = new Map<string, Set<string>>(); // use_group_name -> Set<business_case_group_id>
    const formulationStatusGroupCounts = new Map<string, Set<string>>(); // status -> Set<business_case_group_id>
    const countryStatusGroupCounts = new Map<string, Set<string>>(); // status -> Set<formulation_country_id>

    // Determine which countries/formulations to show based on cascading filters
    let filteredBCs = businessCases;

    // If formulations are selected, only show countries for those formulations
    if (filters.formulations.length > 0) {
      const selectedFormulationCodes = filters.formulations.map(display => {
        // Extract code from "Name (Code)" format
        const match = display.match(/\(([^)]+)\)$/);
        return match ? match[1] : display;
      });
      filteredBCs = filteredBCs.filter(bc => 
        bc.formulation_code && selectedFormulationCodes.includes(bc.formulation_code)
      );
    }

    // If countries are selected, only show formulations for those countries
    if (filters.countries.length > 0) {
      filteredBCs = filteredBCs.filter(bc => 
        bc.country_name && filters.countries.includes(bc.country_name)
      );
    }

    filteredBCs.forEach((bc) => {
      const groupId = bc.business_case_group_id;
      if (!groupId) return; // Skip if no group ID

      if (bc.country_name) {
        countries.add(bc.country_name);
        if (!countryCounts.has(bc.country_name)) {
          countryCounts.set(bc.country_name, new Set());
        }
        countryCounts.get(bc.country_name)!.add(groupId);
      }
      if (bc.formulation_code) {
        const display = formulationDisplayMap.get(bc.formulation_code) || bc.formulation_code;
        formulationDisplays.add(display);
        if (!formulationCounts.has(display)) {
          formulationCounts.set(display, new Set());
        }
        formulationCounts.get(display)!.add(groupId);
        
        // Count by formulation status (unique groups)
        const status = formulationStatusMap.get(bc.formulation_code);
        if (status) {
          if (!formulationStatusGroupCounts.has(status)) {
            formulationStatusGroupCounts.set(status, new Set());
          }
          formulationStatusGroupCounts.get(status)!.add(groupId);
        }
      }
      if (bc.use_group_name) {
        useGroups.add(bc.use_group_name);
        if (!useGroupCounts.has(bc.use_group_name)) {
          useGroupCounts.set(bc.use_group_name, new Set());
        }
        useGroupCounts.get(bc.use_group_name)!.add(groupId);
      }
      // Count by country status (unique formulation-country combinations)
      // Country status is at the formulation-country level, not business case group level
      // We need formulation_country_id to count, but it should be set by the query for all cases
      if (bc.formulation_country_id) {
        // Use the actual country_status value, or "Not yet evaluated" if null/undefined
        // Note: Database default is "Not yet evaluated", so null means it wasn't fetched
        const countryStatus = bc.country_status !== null && bc.country_status !== undefined && bc.country_status !== ""
          ? bc.country_status 
          : "Not yet evaluated";
        if (!countryStatusGroupCounts.has(countryStatus)) {
          countryStatusGroupCounts.set(countryStatus, new Set());
        }
        countryStatusGroupCounts.get(countryStatus)!.add(bc.formulation_country_id);
      } else {
        // If no formulation_country_id, try to get country_status directly
        // This shouldn't happen if query is correct, but handle gracefully
        if (bc.country_status !== null && bc.country_status !== undefined && bc.country_status !== "") {
          const countryStatus = bc.country_status;
          if (!countryStatusGroupCounts.has(countryStatus)) {
            countryStatusGroupCounts.set(countryStatus, new Set());
          }
          // Use a composite key since we don't have formulation_country_id
          const fallbackKey = `${bc.formulation_id || 'unknown'}-${bc.country_id || 'unknown'}`;
          countryStatusGroupCounts.get(countryStatus)!.add(fallbackKey);
        }
      }
    });

    // Convert Sets to counts
    const countryCountsFinal = new Map<string, number>();
    countryCounts.forEach((groups, country) => {
      countryCountsFinal.set(country, groups.size);
    });

    const formulationCountsFinal = new Map<string, number>();
    formulationCounts.forEach((groups, display) => {
      formulationCountsFinal.set(display, groups.size);
    });

    const useGroupCountsFinal = new Map<string, number>();
    useGroupCounts.forEach((groups, useGroup) => {
      useGroupCountsFinal.set(useGroup, groups.size);
    });

    const formulationStatusCountsFinal = new Map<string, number>();
    formulationStatusGroupCounts.forEach((groups, status) => {
      formulationStatusCountsFinal.set(status, groups.size);
    });

    const countryStatusCountsFinal = new Map<string, number>();
    countryStatusGroupCounts.forEach((groups, status) => {
      countryStatusCountsFinal.set(status, groups.size);
    });

    // Ensure all country statuses appear in filter (MECE - even with 0 count)
    ALL_COUNTRY_STATUSES.forEach((status) => {
      if (!countryStatusCountsFinal.has(status)) {
        countryStatusCountsFinal.set(status, 0);
      }
    });

    // Ensure all formulation statuses appear in filter (MECE - even with 0 count)
    ALL_FORMULATION_STATUSES.forEach((status) => {
      if (!formulationStatusCountsFinal.has(status)) {
        formulationStatusCountsFinal.set(status, 0);
      }
    });

    return {
      countries: Array.from(countries).sort(),
      formulations: Array.from(formulationDisplays).sort(),
      useGroups: Array.from(useGroups).sort(),
      formulationStatuses: Array.from(formulationStatusCountsFinal.keys()).sort(),
      countryStatuses: Array.from(countryStatusCountsFinal.keys()).sort(),
      countryCounts: countryCountsFinal,
      formulationCounts: formulationCountsFinal,
      useGroupCounts: useGroupCountsFinal,
      formulationStatusCounts: formulationStatusCountsFinal,
      countryStatusCounts: countryStatusCountsFinal,
    };
  }, [businessCases, formulationDisplayMap, formulationStatusMap, filters.formulations, filters.countries]);

  // Filter business cases based on active filters
  const filteredBusinessCases = useMemo(() => {
    return businessCases.filter((bc) => {
      // Country filter
      if (filters.countries.length > 0 && !filters.countries.includes(bc.country_name || "")) {
        return false;
      }
      // Formulation filter
      if (filters.formulations.length > 0) {
        const bcDisplay = formulationDisplayMap.get(bc.formulation_code || "") || bc.formulation_code || "";
        if (!filters.formulations.includes(bcDisplay)) {
          return false;
        }
      }
      // Use Group filter
      if (filters.useGroups.length > 0 && !filters.useGroups.includes(bc.use_group_name || "")) {
        return false;
      }
      // Formulation Status filter
      if (filters.formulationStatuses.length > 0) {
        const status = formulationStatusMap.get(bc.formulation_code || "");
        if (!status || !filters.formulationStatuses.includes(status)) {
          return false;
        }
      }
      // Country Status filter - only include if status is in selected list
      if (filters.countryStatuses.length > 0) {
        // Treat null/undefined as "Not yet evaluated" for filtering
        const countryStatus = bc.country_status !== null && bc.country_status !== undefined 
          ? bc.country_status 
          : "Not yet evaluated";
        // Only include if the country status is in the selected list
        if (!filters.countryStatuses.includes(countryStatus)) {
          return false;
        }
      }
      return true;
    });
  }, [businessCases, filters, formulationDisplayMap, formulationStatusMap]);


  // Calculate available year range from data
  const availableYearRange = useMemo(() => {
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
      latestYear = CURRENT_FISCAL_YEAR + DEFAULT_YEAR_RANGE - 1;
    }

    return { minYear: earliestYear, maxYear: latestYear };
  }, [filteredBusinessCases]);

  // Generate year options for dropdowns - show all available years
  const yearOptions = useMemo(() => {
    const options: number[] = [];
    for (let fy = availableYearRange.minYear; fy <= availableYearRange.maxYear; fy++) {
      options.push(fy);
    }
    return options;
  }, [availableYearRange]);

  // Effective year range (selected or default to 10-year range starting from data min)
  const effectiveStartYear = startYear ?? availableYearRange.minYear;
  const effectiveEndYear = endYear ?? Math.min(availableYearRange.minYear + 9, availableYearRange.maxYear);
  
  // Start year options: all years up to end year (allow selecting full range)
  const validStartYearOptions = useMemo(() => {
    return yearOptions.filter(y => y <= effectiveEndYear);
  }, [yearOptions, effectiveEndYear]);

  // End year options: all years from start year onwards (allow selecting full range)
  const validEndYearOptions = useMemo(() => {
    return yearOptions.filter(y => y >= effectiveStartYear);
  }, [yearOptions, effectiveStartYear]);
  
  // Calculate if current selection exceeds 10 years
  const yearCount = effectiveEndYear - effectiveStartYear + 1;
  const exceedsLimit = yearCount > 10;

  // Generate chart data - show only years in selected range
  const chartData = useMemo(() => {
    // Use selected year range or default to data range
    const displayStartYear = effectiveStartYear;
    const displayEndYear = effectiveEndYear;

    // Generate fiscal years for the selected range
    const fiscalYears: string[] = [];
    
    for (let fyNum = displayStartYear; fyNum <= displayEndYear; fyNum++) {
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

        // Data is already in EUR - no conversion needed
        years[yearIndex].revenueEUR += localRevenue;
        years[yearIndex].marginEUR += localMargin;
      }
    });

    // Convert to millions for display and apply user's currency preference
    return years.map((year) => ({
      ...year,
      revenue: year.revenue / 1000000,
      margin: year.margin / 1000000,
      // Convert EUR values to user's preferred currency for display
      revenueEUR: convertCurrency(year.revenueEUR) / 1000000,
      marginEUR: convertCurrency(year.marginEUR) / 1000000,
      cogs: year.cogs / 1000000,
    }));
  }, [filteredBusinessCases, effectiveStartYear, effectiveEndYear, convertCurrency]);

  const handleRemoveFilter = (type: keyof FilterType, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (type === "formulationStatuses") {
        // Don't allow removing the last "Selected" if it's the only one
        const filtered = prev.formulationStatuses.filter((v) => v !== value);
        newFilters.formulationStatuses = filtered.length === 0 ? ["Selected"] : filtered;
      } else if (type === "countryStatuses") {
        // Don't allow removing the last "Selected for entry" if it's the only one
        const filtered = prev.countryStatuses.filter((v) => v !== value);
        newFilters.countryStatuses = filtered.length === 0 ? ["Selected for entry"] : filtered;
      } else {
        newFilters[type] = prev[type].filter((v) => v !== value);
      }
      return newFilters;
    });
  };

  const handleClearAllFilters = () => {
    setFilters({
      countries: [],
      formulations: [],
      useGroups: [],
      formulationStatuses: ["Selected"],
      countryStatuses: ["Selected for entry"],
    });
  };

  // Handle year range changes
  const handleStartYearChange = useCallback((value: string) => {
    const newStartYear = parseInt(value, 10);
    setStartYear(newStartYear);
    // Ensure end year is not before start year
    if (endYear !== null && endYear < newStartYear) {
      setEndYear(newStartYear);
    }
  }, [endYear]);

  const handleEndYearChange = useCallback((value: string) => {
    const newEndYear = parseInt(value, 10);
    setEndYear(newEndYear);
    // Ensure start year is not after end year  
    if (startYear !== null && startYear > newEndYear) {
      setStartYear(newEndYear);
    }
  }, [startYear]);

  const handleResetYearRange = useCallback(() => {
    setStartYear(null);
    setEndYear(null);
  }, []);

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
    (filters.formulationStatuses.length > 0 && filters.formulationStatuses.length !== 1) ||
    (filters.countryStatuses.length > 0 && filters.countryStatuses.length !== 1) ||
    (filters.formulationStatuses.length === 1 && filters.formulationStatuses[0] !== "Selected") ||
    (filters.countryStatuses.length === 1 && filters.countryStatuses[0] !== "Selected for entry");

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

  // Calculate unique business case groups (multi-year projections)
  const uniqueBusinessCaseGroups = useMemo(() => {
    return countUniqueBusinessCaseGroups(filteredBusinessCases);
  }, [filteredBusinessCases]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card className="w-full overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <motion.div 
              className="space-y-0.5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <CardTitle className="text-xl font-semibold">Long-Range Revenue and Gross Margin Projection</CardTitle>
              <CardDescription className="text-sm">
                {hasActiveFilters 
                  ? <motion.span key="filtered" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{uniqueBusinessCaseGroups} business case group{uniqueBusinessCaseGroups !== 1 ? 's' : ''}, {uniqueFormulations} formulation{uniqueFormulations !== 1 ? 's' : ''}</motion.span>
                  : <span>{uniqueFormulations} formulation{uniqueFormulations !== 1 ? 's' : ''} represented</span>
                }
              </CardDescription>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 flex-wrap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
            {/* Compact Year Range */}
            <div className="flex items-center gap-1.5 text-sm">
              <Select value={effectiveStartYear.toString()} onValueChange={handleStartYearChange}>
                <SelectTrigger className="w-[72px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {validStartYearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      FY{year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-muted-foreground">–</span>
              <Select value={effectiveEndYear.toString()} onValueChange={handleEndYearChange}>
                <SelectTrigger className="w-[72px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {validEndYearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      FY{year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className={cn(
                "text-xs tabular-nums",
                exceedsLimit ? "text-amber-500" : "text-muted-foreground"
              )}>
                ({yearCount}yr)
              </span>
            </div>
              
              <div className="h-6 w-px bg-border hidden sm:block" />
              
              {/* Chart Type Toggle */}
              <div className="flex items-center gap-1">
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("line")}
                  className="h-8 px-3 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Line
                </Button>
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("bar")}
                  className="h-8 px-3 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Bar
                </Button>
              </div>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">

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
          
          {/* Filter Multi-Selects - Scrollable on mobile */}
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="flex gap-6 min-w-max">
              {/* Scope Filters Group */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Scope</h4>
                <div className="flex gap-2">
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
                </div>
              </div>
              
              {/* Status Filters Group */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status Filters</h4>
                <div className="flex gap-2">
                  {filterOptions.formulationStatuses.length > 0 && (
                    <FilterMultiSelectClient
                      label="Formulation Status"
                      options={filterOptions.formulationStatuses}
                      selected={filters.formulationStatuses}
                      onSelectionChange={(selected) => {
                        setFilters((prev) => ({ ...prev, formulationStatuses: selected }));
                      }}
                      counts={filterOptions.formulationStatusCounts}
                    />
                  )}
                  {filterOptions.countryStatuses.length > 0 && (
                    <FilterMultiSelectClient
                      label="Formulation-Country Status"
                      options={filterOptions.countryStatuses}
                      selected={filters.countryStatuses}
                      onSelectionChange={(selected) => {
                        setFilters((prev) => ({ ...prev, countryStatuses: selected }));
                      }}
                      counts={filterOptions.countryStatusCounts}
                    />
                  )}
                </div>
              </div>
            </div>
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
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="gap-1.5 pr-1 py-1 px-2 text-xs hover:scale-105 transition-transform"
                    >
                      <span className="text-muted-foreground">Country:</span>
                      <span>{country}</span>
                      <button
                        onClick={() => handleRemoveFilter("countries", country)}
                        className="ml-0.5 hover:bg-destructive/20 rounded-full p-0.5"
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
                    transition={{ duration: 0.2, delay: (filters.countries.length + index) * 0.03 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="gap-1.5 pr-1 py-1 px-2 text-xs hover:scale-105 transition-transform"
                    >
                      <span className="text-muted-foreground">Formulation:</span>
                      <span className="max-w-[150px] truncate">{formulation}</span>
                      <button
                        onClick={() => handleRemoveFilter("formulations", formulation)}
                        className="ml-0.5 hover:bg-destructive/20 rounded-full p-0.5"
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
                    transition={{ duration: 0.2, delay: (filters.countries.length + filters.formulations.length + index) * 0.03 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="gap-1.5 pr-1 py-1 px-2 text-xs hover:scale-105 transition-transform"
                    >
                      <span className="text-muted-foreground">Use Group:</span>
                      <span>{useGroup}</span>
                      <button
                        onClick={() => handleRemoveFilter("useGroups", useGroup)}
                        className="ml-0.5 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
                {filters.formulationStatuses.filter(s => s !== "Selected" || filters.formulationStatuses.length > 1).map((status, index) => (
                  <motion.div
                    key={`formulation-status-${status}`}
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: (filters.countries.length + filters.formulations.length + filters.useGroups.length + index) * 0.03 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="gap-1.5 pr-1 py-1 px-2 text-xs hover:scale-105 transition-transform"
                    >
                      <span className="text-muted-foreground">Formulation Status:</span>
                      <span>{status}</span>
                      <button
                        onClick={() => handleRemoveFilter("formulationStatuses", status)}
                        className="ml-0.5 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
                {filters.countryStatuses.filter(s => s !== "Selected for entry" || filters.countryStatuses.length > 1).map((status, index) => (
                  <motion.div
                    key={`country-status-${status}`}
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: (filters.countries.length + filters.formulations.length + filters.useGroups.length + filters.formulationStatuses.length + index) * 0.03 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="gap-1.5 pr-1 py-1 px-2 text-xs hover:scale-105 transition-transform"
                    >
                      <span className="text-muted-foreground">Formulation-Country Status:</span>
                      <span>{status}</span>
                      <button
                        onClick={() => handleRemoveFilter("countryStatuses", status)}
                        className="ml-0.5 hover:bg-destructive/20 rounded-full p-0.5"
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
          className="w-full h-[400px] sm:h-[500px] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={chartType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
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
                  stroke={borderColor} 
                  opacity={0.4}
                  vertical={true}
                  horizontal={true}
                />
                <XAxis 
                  dataKey="fiscalYear" 
                  tick={{ fill: axisColor, fontSize: 11, fontWeight: 500 }}
                  axisLine={{ stroke: borderColor, strokeWidth: 1 }}
                  tickLine={{ stroke: borderColor }}
                  interval={chartData.length > 20 ? Math.floor(chartData.length / 10) : 0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  domain={['dataMin', 'dataMax']}
                />
                <YAxis 
                  label={{ 
                    value: `Amount (M${currencySymbol})`, 
                    angle: -90, 
                    position: "insideLeft",
                    style: { fill: axisColor, fontSize: 12, fontWeight: 500 }
                  }}
                  tick={{ fill: axisColor, fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: borderColor, strokeWidth: 1 }}
                  tickLine={{ stroke: borderColor }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: popoverColor,
                    border: `1px solid ${borderColor}`,
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
                        if (!entry.name?.includes('Revenue') && !entry.name?.includes('Margin')) {
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
                                <span className="font-medium">{currencySymbol}{Number(entry.value).toFixed(2)}M</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ stroke: axisColor, strokeWidth: 1, strokeDasharray: "5 5", opacity: 0.3 }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "24px", paddingRight: "20px" }}
                  iconType="line"
                  iconSize={12}
                  verticalAlign="top"
                  align="right"
                  formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                />
                {/* Revenue Area with gradient fill and line (EUR) */}
                <Area
                  type="monotone"
                  dataKey="revenueEUR"
                  stroke={revenueColor}
                  strokeWidth={2.5}
                  fill={`url(#colorRevenue-${chartId})`}
                  name={`Revenue (${preferences.currency})`}
                  dot={{ r: 3, fill: revenueColor, strokeWidth: 2, stroke: bgColor }}
                  activeDot={{ r: 5, fill: revenueColor, strokeWidth: 2, stroke: bgColor }}
                  isAnimationActive={true}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
                {/* Margin Area with gradient fill and line (EUR) */}
                <Area
                  type="monotone"
                  dataKey="marginEUR"
                  stroke={marginColor}
                  strokeWidth={2.5}
                  fill={`url(#colorMargin-${chartId})`}
                  name={`Margin (${preferences.currency})`}
                  dot={{ r: 3, fill: marginColor, strokeWidth: 2, stroke: bgColor }}
                  activeDot={{ r: 5, fill: marginColor, strokeWidth: 2, stroke: bgColor }}
                  isAnimationActive={true}
                  animationDuration={800}
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
                  stroke={borderColor} 
                  opacity={0.4}
                  vertical={true}
                  horizontal={true}
                />
                <XAxis 
                  dataKey="fiscalYear"
                  tick={{ fill: axisColor, fontSize: 11, fontWeight: 500 }}
                  axisLine={{ stroke: borderColor, strokeWidth: 1 }}
                  tickLine={{ stroke: borderColor }}
                  interval={chartData.length > 20 ? Math.floor(chartData.length / 10) : 0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  domain={['dataMin', 'dataMax']}
                />
                <YAxis 
                  label={{ 
                    value: `Amount (M${currencySymbol})`, 
                    angle: -90, 
                    position: "insideLeft",
                    style: { fill: axisColor, fontSize: 12, fontWeight: 500 }
                  }}
                  tick={{ fill: axisColor, fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: borderColor, strokeWidth: 1 }}
                  tickLine={{ stroke: borderColor }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: popoverColor,
                    border: `1px solid ${borderColor}`,
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
                        if (!entry.name?.includes('Revenue') && !entry.name?.includes('Margin')) {
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
                                <span className="font-medium">{currencySymbol}{Number(entry.value).toFixed(2)}M</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ fill: mutedColor, opacity: 0.1 }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "24px", paddingRight: "20px" }}
                  iconSize={12}
                  verticalAlign="top"
                  align="right"
                  formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                />
                <Bar 
                  dataKey="revenueEUR" 
                  fill={revenueColor} 
                  name={`Revenue (${preferences.currency})`} 
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
                <Bar 
                  dataKey="marginEUR" 
                  fill={marginColor} 
                  name={`Margin (${preferences.currency})`} 
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={800}
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

        {/* Year-by-Year Metrics Table */}
        {chartData.length > 0 && (() => {
          // Calculate totals for summary column
          const totalRevenue = chartData.reduce((sum, y) => sum + y.revenueEUR, 0);
          const totalMargin = chartData.reduce((sum, y) => sum + y.marginEUR, 0);
          const avgMarginPercent = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;
          
          return (
            <motion.div 
              className="pt-4 border-t -mx-4 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="overflow-x-auto pb-2">
                <table className="border-collapse min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap sticky left-0 bg-background z-10 min-w-[120px]">Metric</th>
                      {chartData.map((year) => (
                        <th 
                          key={year.fiscalYear}
                          className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap min-w-[80px]"
                        >
                          {year.fiscalYear}
                        </th>
                      ))}
                      <th className="text-center py-3 px-3 text-xs font-semibold text-foreground uppercase tracking-wide bg-muted/50 whitespace-nowrap min-w-[90px]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-3 text-sm font-medium sticky left-0 bg-background z-10 whitespace-nowrap">Revenue ({preferences.currency})</td>
                      {chartData.map((year) => (
                        <td 
                          key={`revenue-${year.fiscalYear}`}
                          className="text-center py-3 px-3 text-sm tabular-nums whitespace-nowrap"
                        >
                          {currencySymbol}{(year.revenueEUR).toFixed(2)}M
                        </td>
                      ))}
                      <td className="text-center py-3 px-3 text-sm tabular-nums font-semibold bg-muted/50 whitespace-nowrap">
                        {currencySymbol}{(totalRevenue).toFixed(2)}M
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-3 text-sm font-medium sticky left-0 bg-background z-10 whitespace-nowrap">Margin ({preferences.currency})</td>
                      {chartData.map((year) => (
                        <td 
                          key={`margin-${year.fiscalYear}`}
                          className="text-center py-3 px-3 text-sm tabular-nums whitespace-nowrap"
                        >
                          {currencySymbol}{(year.marginEUR).toFixed(2)}M
                        </td>
                      ))}
                      <td className="text-center py-3 px-3 text-sm tabular-nums font-semibold bg-muted/50 whitespace-nowrap">
                        {currencySymbol}{(totalMargin).toFixed(2)}M
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-3 text-sm font-medium sticky left-0 bg-background z-10 whitespace-nowrap">Margin %</td>
                      {chartData.map((year) => (
                        <td 
                          key={`margin-pct-${year.fiscalYear}`}
                          className="text-center py-3 px-3 text-sm tabular-nums whitespace-nowrap"
                        >
                          {year.revenueEUR > 0 
                            ? ((year.marginEUR / year.revenueEUR) * 100).toFixed(1)
                            : "0.0"}%
                        </td>
                      ))}
                      <td className="text-center py-3 px-3 text-sm tabular-nums font-semibold bg-muted/50 whitespace-nowrap">
                        {avgMarginPercent.toFixed(1)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          );
        })()}

        {/* Disclaimer */}
        <motion.div 
          className="pt-4 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-xs text-muted-foreground italic">
            Some formulation-country combinations may be excluded from projections if marked as excluded (e.g., Article 33 entries pending financial validation, or products with expected market exits before the projection horizon).
          </p>
        </motion.div>
      </CardContent>
    </Card>
    </motion.div>
  );
}




