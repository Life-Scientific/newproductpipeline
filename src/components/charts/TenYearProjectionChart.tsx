"use client";

import { useState, useMemo, useEffect, useId, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import type { Database } from "@/lib/supabase/database.types";
import { useTheme } from "@/contexts/ThemeContext";
import { countUniqueBusinessCaseGroups } from "@/lib/utils/business-case-utils";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"] & {
  country_id?: string | null;
  country_status?: string | null;
  formulation_country_id?: string | null;
};
type Formulation =
  Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

interface TenYearProjectionChartProps {
  businessCases: BusinessCase[];
  formulations: Formulation[];
  /** If true, removes the Card wrapper for integration into parent card */
  noCard?: boolean;
}

// Default year range
const DEFAULT_YEAR_RANGE = 10;

export function TenYearProjectionChart({
  businessCases,
  formulations,
  noCard = false,
}: TenYearProjectionChartProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentTheme } = useTheme();
  const {
    currencySymbol,
    preferences,
    formatCurrencyCompact,
    convertCurrency,
  } = useDisplayPreferences();
  // Use global portfolio filters from URL (for display purposes - data is pre-filtered)
  const { filters, hasActiveFilters } = usePortfolioFilters();
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const chartId = useId().replace(/:/g, "-");
  
  // Track navigation to force chart remount and animation
  const [mountKey, setMountKey] = useState(0);
  
  // Force remount when pathname changes (even if data is the same)
  useEffect(() => {
    setMountKey((prev) => prev + 1);
  }, [pathname]);
  
  // Create a key based on pathname, filters, and mount counter to ensure chart remounts and animates
  const chartKey = useMemo(() => {
    const filterKey = JSON.stringify(filters);
    return `${pathname}-${filterKey}-${mountKey}`;
  }, [pathname, filters, mountKey]);

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

  // NOTE: businessCases are now PRE-FILTERED by DashboardClient for better performance
  // This component just renders the data it receives

  // Calculate available year range from data
  const availableYearRange = useMemo(() => {
    let earliestYear = Infinity;
    let latestYear = -Infinity;

    businessCases.forEach((bc) => {
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
  }, [businessCases]);

  // Generate year options for dropdowns - show all available years
  const yearOptions = useMemo(() => {
    const options: number[] = [];
    for (
      let fy = availableYearRange.minYear;
      fy <= availableYearRange.maxYear;
      fy++
    ) {
      options.push(fy);
    }
    return options;
  }, [availableYearRange]);

  // Effective year range (selected or default to 10-year range starting from data min)
  const effectiveStartYear = startYear ?? availableYearRange.minYear;
  const effectiveEndYear =
    endYear ??
    Math.min(availableYearRange.minYear + 9, availableYearRange.maxYear);

  // Start year options: all years up to end year (allow selecting full range)
  const validStartYearOptions = useMemo(() => {
    return yearOptions.filter((y) => y <= effectiveEndYear);
  }, [yearOptions, effectiveEndYear]);

  // End year options: all years from start year onwards (allow selecting full range)
  const validEndYearOptions = useMemo(() => {
    return yearOptions.filter((y) => y >= effectiveStartYear);
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
    businessCases.forEach((bc) => {
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
  }, [businessCases, effectiveStartYear, effectiveEndYear, convertCurrency]);

  // Handle year range changes
  const handleStartYearChange = useCallback(
    (value: string) => {
      const newStartYear = parseInt(value, 10);
      setStartYear(newStartYear);
      // Ensure end year is not before start year
      if (endYear !== null && endYear < newStartYear) {
        setEndYear(newStartYear);
      }
    },
    [endYear],
  );

  const handleEndYearChange = useCallback(
    (value: string) => {
      const newEndYear = parseInt(value, 10);
      setEndYear(newEndYear);
      // Ensure start year is not after end year
      if (startYear !== null && startYear > newEndYear) {
        setStartYear(newEndYear);
      }
    },
    [startYear],
  );

  const handleResetYearRange = useCallback(() => {
    setStartYear(null);
    setEndYear(null);
  }, []);

  const handleDrillDown = (fiscalYear: string) => {
    // Filters are now in URL, so they'll persist automatically
    // Navigate to business cases page with fiscal year using client-side navigation
    router.push(`/portfolio/business-cases?fiscalYear=${fiscalYear}`);
  };

  // Calculate unique formulations in the filtered view
  const uniqueFormulations = useMemo(() => {
    const formulationSet = new Set<string>();
    businessCases.forEach((bc) => {
      if (bc.formulation_code) {
        formulationSet.add(bc.formulation_code);
      }
    });
    return formulationSet.size;
  }, [businessCases]);

  // Build code to name lookup from formulations data
  const formulationCodeToName = useMemo(() => {
    const map = new Map<string, string>();
    formulations.forEach((f) => {
      if (f.formulation_code) {
        // Use product_name if available, otherwise use the code
        map.set(f.formulation_code, f.product_name || f.formulation_code);
      }
    });
    return map;
  }, [formulations]);

  // Get display names for selected formulations (for showing in description)
  // filters.formulations now contains codes, so look up the names
  const selectedFormulationNames = useMemo(() => {
    if (filters.formulations.length === 0) return [];
    return filters.formulations
      .map((code) => formulationCodeToName.get(code) || code)
      .filter(Boolean);
  }, [filters.formulations, formulationCodeToName]);

  // Calculate unique business case groups (multi-year projections)
  const uniqueBusinessCaseGroups = useMemo(() => {
    return countUniqueBusinessCaseGroups(businessCases);
  }, [businessCases]);

  const headerContent = (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <motion.div
        className="space-y-0.5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <CardTitle className="text-xl font-semibold">
          Long-Range Revenue and Gross Margin Projection
        </CardTitle>
        <CardDescription className="text-sm">
          {hasActiveFilters ? (
            <motion.span
              key="filtered"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {uniqueBusinessCaseGroups} business case group
              {uniqueBusinessCaseGroups !== 1 ? "s" : ""}
              {selectedFormulationNames.length > 0 ? (
                <>
                  {" • "}
                  {selectedFormulationNames.length <= 3
                    ? selectedFormulationNames.join(", ")
                    : `${selectedFormulationNames.slice(0, 2).join(", ")} +${selectedFormulationNames.length - 2} more`}
                </>
              ) : (
                <>
                  , {uniqueFormulations} formulation
                  {uniqueFormulations !== 1 ? "s" : ""}
                </>
              )}
            </motion.span>
          ) : (
            <span>
              {uniqueFormulations} formulation
              {uniqueFormulations !== 1 ? "s" : ""} represented
            </span>
          )}
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
          <Select
            value={effectiveStartYear.toString()}
            onValueChange={handleStartYearChange}
          >
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
          <Select
            value={effectiveEndYear.toString()}
            onValueChange={handleEndYearChange}
          >
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
          <span
            className={cn(
              "text-xs tabular-nums",
              exceedsLimit ? "text-amber-500" : "text-muted-foreground",
            )}
          >
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
  );

  const chartContent = (
    <div className="space-y-4" key={chartKey}>
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
              <ResponsiveContainer width="100%" height="100%" minHeight={400} key={chartKey}>
                {chartType === "line" ? (
                  <AreaChart
                    key={`${chartKey}-area`} // Key ensures chart remounts for animation
                    data={chartData}
                    onClick={(data: any) => {
                      if (data?.activePayload?.[0]?.payload?.fiscalYear) {
                        handleDrillDown(
                          data.activePayload[0].payload.fiscalYear,
                        );
                      }
                    }}
                    style={{ cursor: "pointer" }}
                    margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                  >
                    <defs>
                      {/* Revenue gradient using theme color */}
                      <linearGradient
                        id={`colorRevenue-${chartId}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={revenueColor}
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor={revenueColor}
                          stopOpacity={0.08}
                        />
                      </linearGradient>
                      {/* Margin gradient using theme color */}
                      <linearGradient
                        id={`colorMargin-${chartId}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={marginColor}
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor={marginColor}
                          stopOpacity={0.08}
                        />
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
                      interval={
                        chartData.length > 20
                          ? Math.floor(chartData.length / 10)
                          : 0
                      }
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      domain={["dataMin", "dataMax"]}
                    />
                    <YAxis
                      label={{
                        value: `Amount (M${currencySymbol})`,
                        angle: -90,
                        position: "insideLeft",
                        style: {
                          fill: axisColor,
                          fontSize: 12,
                          fontWeight: 500,
                        },
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
                        boxShadow:
                          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                        opacity: 1,
                      }}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          // Filter out duplicate entries by dataKey
                          // Recharts includes both the main Area and the dot-only Area in payload
                          const seen = new Set<string>();
                          const visibleEntries = payload.filter(
                            (entry: any) => {
                              const key = entry.dataKey;
                              // Skip duplicates and entries without proper names
                              if (seen.has(key) || !entry.name) {
                                return false;
                              }
                              // Only include entries with the expected names
                              if (
                                !entry.name?.includes("Revenue") &&
                                !entry.name?.includes("Margin")
                              ) {
                                return false;
                              }
                              seen.add(key);
                              return true;
                            },
                          );

                          return (
                            <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                              <p className="font-semibold text-sm mb-2">
                                {label}
                              </p>
                              {visibleEntries.map(
                                (entry: any, index: number) => {
                                  const color =
                                    entry.color ||
                                    (entry.dataKey === "revenueEUR"
                                      ? revenueColor
                                      : marginColor);
                                  const name = entry.name;
                                  return (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 text-sm"
                                    >
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: color }}
                                      />
                                      <span className="text-muted-foreground">
                                        {name}:
                                      </span>
                                      <span className="font-medium">
                                        {currencySymbol}
                                        {Number(entry.value).toFixed(2)}M
                                      </span>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{
                        stroke: axisColor,
                        strokeWidth: 1,
                        strokeDasharray: "5 5",
                        opacity: 0.3,
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        paddingTop: "24px",
                        paddingRight: "20px",
                      }}
                      iconType="line"
                      iconSize={12}
                      verticalAlign="top"
                      align="right"
                      formatter={(value) => (
                        <span className="text-sm text-foreground">{value}</span>
                      )}
                    />
                    {/* Revenue Area with gradient fill and line (EUR) */}
                    <Area
                      type="monotone"
                      dataKey="revenueEUR"
                      stroke={revenueColor}
                      strokeWidth={2.5}
                      fill={`url(#colorRevenue-${chartId})`}
                      name={`Revenue (${preferences.currency})`}
                      dot={{
                        r: 3,
                        fill: revenueColor,
                        strokeWidth: 2,
                        stroke: bgColor,
                      }}
                      activeDot={{
                        r: 5,
                        fill: revenueColor,
                        strokeWidth: 2,
                        stroke: bgColor,
                      }}
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
                      dot={{
                        r: 3,
                        fill: marginColor,
                        strokeWidth: 2,
                        stroke: bgColor,
                      }}
                      activeDot={{
                        r: 5,
                        fill: marginColor,
                        strokeWidth: 2,
                        stroke: bgColor,
                      }}
                      isAnimationActive={true}
                      animationDuration={800}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                ) : (
                  <BarChart
                    key={`${chartKey}-bar`} // Key ensures chart remounts for animation
                    data={chartData}
                    onClick={(data: any) => {
                      if (data?.activePayload?.[0]?.payload?.fiscalYear) {
                        handleDrillDown(
                          data.activePayload[0].payload.fiscalYear,
                        );
                      }
                    }}
                    style={{ cursor: "pointer" }}
                    margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
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
                      interval={
                        chartData.length > 20
                          ? Math.floor(chartData.length / 10)
                          : 0
                      }
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      domain={["dataMin", "dataMax"]}
                    />
                    <YAxis
                      label={{
                        value: `Amount (M${currencySymbol})`,
                        angle: -90,
                        position: "insideLeft",
                        style: {
                          fill: axisColor,
                          fontSize: 12,
                          fontWeight: 500,
                        },
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
                        boxShadow:
                          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                        opacity: 1,
                      }}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          // Filter out duplicate entries by dataKey
                          const seen = new Set<string>();
                          const visibleEntries = payload.filter(
                            (entry: any) => {
                              const key = entry.dataKey;
                              // Skip duplicates and entries without proper names
                              if (seen.has(key) || !entry.name) {
                                return false;
                              }
                              // Only include entries with the expected names
                              if (
                                !entry.name?.includes("Revenue") &&
                                !entry.name?.includes("Margin")
                              ) {
                                return false;
                              }
                              seen.add(key);
                              return true;
                            },
                          );

                          return (
                            <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                              <p className="font-semibold text-sm mb-2">
                                {label}
                              </p>
                              {visibleEntries.map(
                                (entry: any, index: number) => {
                                  const color =
                                    entry.color ||
                                    (entry.dataKey === "revenueEUR"
                                      ? revenueColor
                                      : marginColor);
                                  const name = entry.name;
                                  return (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 text-sm"
                                    >
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: color }}
                                      />
                                      <span className="text-muted-foreground">
                                        {name}:
                                      </span>
                                      <span className="font-medium">
                                        {currencySymbol}
                                        {Number(entry.value).toFixed(2)}M
                                      </span>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{ fill: mutedColor, opacity: 0.1 }}
                    />
                    <Legend
                      wrapperStyle={{
                        paddingTop: "24px",
                        paddingRight: "20px",
                      }}
                      iconSize={12}
                      verticalAlign="top"
                      align="right"
                      formatter={(value) => (
                        <span className="text-sm text-foreground">{value}</span>
                      )}
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
                  <p className="text-sm text-muted-foreground">
                    No data available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Try adjusting your filters
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Year-by-Year Metrics Table */}
      {chartData.length > 0 &&
        (() => {
          // Calculate totals for summary column
          const totalRevenue = chartData.reduce(
            (sum, y) => sum + y.revenueEUR,
            0,
          );
          const totalMargin = chartData.reduce(
            (sum, y) => sum + y.marginEUR,
            0,
          );
          const avgMarginPercent =
            totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;

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
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap sticky left-0 bg-background z-10 min-w-[120px]">
                        Metric
                      </th>
                      {chartData.map((year) => (
                        <th
                          key={year.fiscalYear}
                          className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap min-w-[80px]"
                        >
                          {year.fiscalYear}
                        </th>
                      ))}
                      <th className="text-center py-3 px-3 text-xs font-semibold text-foreground uppercase tracking-wide bg-muted/50 whitespace-nowrap min-w-[90px]">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-3 text-sm font-medium sticky left-0 bg-background z-10 whitespace-nowrap">
                        Revenue ({preferences.currency})
                      </td>
                      {chartData.map((year) => (
                        <td
                          key={`revenue-${year.fiscalYear}`}
                          className="text-center py-3 px-3 text-sm tabular-nums whitespace-nowrap"
                        >
                          {currencySymbol}
                          {year.revenueEUR.toFixed(2)}M
                        </td>
                      ))}
                      <td className="text-center py-3 px-3 text-sm tabular-nums font-semibold bg-muted/50 whitespace-nowrap">
                        {currencySymbol}
                        {totalRevenue.toFixed(2)}M
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-3 text-sm font-medium sticky left-0 bg-background z-10 whitespace-nowrap">
                        Margin ({preferences.currency})
                      </td>
                      {chartData.map((year) => (
                        <td
                          key={`margin-${year.fiscalYear}`}
                          className="text-center py-3 px-3 text-sm tabular-nums whitespace-nowrap"
                        >
                          {currencySymbol}
                          {year.marginEUR.toFixed(2)}M
                        </td>
                      ))}
                      <td className="text-center py-3 px-3 text-sm tabular-nums font-semibold bg-muted/50 whitespace-nowrap">
                        {currencySymbol}
                        {totalMargin.toFixed(2)}M
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-3 text-sm font-medium sticky left-0 bg-background z-10 whitespace-nowrap">
                        Margin %
                      </td>
                      {chartData.map((year) => (
                        <td
                          key={`margin-pct-${year.fiscalYear}`}
                          className="text-center py-3 px-3 text-sm tabular-nums whitespace-nowrap"
                        >
                          {year.revenueEUR > 0
                            ? (
                                (year.marginEUR / year.revenueEUR) *
                                100
                              ).toFixed(1)
                            : "0.0"}
                          %
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
          Some formulation-country combinations may be excluded from projections
          if marked as excluded (e.g., Article 33 entries pending financial
          validation, or products with expected market exits before the
          projection horizon).
        </p>
      </motion.div>
    </div>
  );

  if (noCard) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full space-y-4"
      >
        <div className="pb-3">{headerContent}</div>
        {chartContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card className="w-full overflow-hidden">
        <CardHeader className="pb-3">{headerContent}</CardHeader>
        <CardContent className="space-y-4">{chartContent}</CardContent>
      </Card>
    </motion.div>
  );
}
