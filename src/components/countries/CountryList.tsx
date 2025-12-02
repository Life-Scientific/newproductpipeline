"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";
import type { CountryWithStats } from "@/lib/db/countries";
import type { Database } from "@/lib/supabase/database.types";
import { FiscalYearSelector } from "@/components/countries/FiscalYearSelector";
import { 
  Globe, 
  TrendingUp, 
  Search, 
  ArrowUpDown,
  ChevronRight,
  Package,
  DollarSign,
} from "lucide-react";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface CountryListProps {
  countries: CountryWithStats[];
  businessCases: BusinessCase[];
}

type SortField = "name" | "formulations" | "revenue" | "margin";
type SortDirection = "asc" | "desc";

/**
 * Parse effective_start_fiscal_year string (e.g., "FY26") to numeric year (e.g., 26)
 */
function parseEffectiveStartFY(effectiveStartFY: string | null): number | null {
  if (!effectiveStartFY) return null;
  const match = effectiveStartFY.match(/FY(\d{2})/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

/**
 * Check if a business case matches the selected fiscal year
 * Formula: effective_start_fiscal_year + year_offset - 1 = selected_FY
 */
function matchesFiscalYear(bc: BusinessCase, selectedFY: number): boolean {
  const effectiveStart = parseEffectiveStartFY(bc.effective_start_fiscal_year);
  if (effectiveStart === null || bc.year_offset === null) return false;
  return effectiveStart + bc.year_offset - 1 === selectedFY;
}

export function CountryList({ countries, businessCases }: CountryListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formatCurrencyCompact } = useDisplayPreferences();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("revenue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  
  // Get selected FY from URL params, default to FY30
  const selectedFY = parseInt(searchParams.get("fy") || "30", 10);

  // Update URL when FY changes
  const handleFYChange = (fy: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("fy", fy.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Filter business cases by selected FY and calculate revenue/margin per country
  const countryFinancialsByFY = useMemo(() => {
    const filteredBCs = businessCases.filter((bc) => matchesFiscalYear(bc, selectedFY));
    const financials = new Map<string, { revenue: number; margin: number }>();
    
    filteredBCs.forEach((bc) => {
      if (!bc.country_name) return;
      const existing = financials.get(bc.country_name) || { revenue: 0, margin: 0 };
      financials.set(bc.country_name, {
        revenue: existing.revenue + (bc.total_revenue || 0),
        margin: existing.margin + (bc.total_margin || 0),
      });
    });
    
    return financials;
  }, [businessCases, selectedFY]);

  // Merge FY-filtered financials with country data
  const countriesWithFYFilteredStats = useMemo(() => {
    return countries.map((country) => {
      const financials = countryFinancialsByFY.get(country.country_name) || { revenue: 0, margin: 0 };
      return {
        ...country,
        total_revenue: financials.revenue,
        total_margin: financials.margin,
      };
    });
  }, [countries, countryFinancialsByFY]);

  const filteredAndSortedCountries = useMemo(() => {
    let filtered = countriesWithFYFilteredStats;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = countriesWithFYFilteredStats.filter(
        (c) =>
          c.country_name.toLowerCase().includes(term) ||
          c.country_code.toLowerCase().includes(term)
      );
    }

    // Sort
    return [...filtered].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.country_name.localeCompare(b.country_name);
          break;
        case "formulations":
          comparison = (a.formulations_count || 0) - (b.formulations_count || 0);
          break;
        case "revenue":
          comparison = (a.total_revenue || 0) - (b.total_revenue || 0);
          break;
        case "margin":
          comparison = (a.total_margin || 0) - (b.total_margin || 0);
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [countriesWithFYFilteredStats, searchTerm, sortField, sortDirection]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Calculate totals for header (using FY-filtered stats)
  const totals = useMemo(() => ({
    countries: countries.length,
    formulations: countries.reduce((sum, c) => sum + (c.formulations_count || 0), 0),
    revenue: countriesWithFYFilteredStats.reduce((sum, c) => sum + (c.total_revenue || 0), 0),
    margin: countriesWithFYFilteredStats.reduce((sum, c) => sum + (c.total_margin || 0), 0),
  }), [countries, countriesWithFYFilteredStats]);

  return (
    <div className="space-y-6">
      {/* Fiscal Year Selector - Prominent placement */}
      <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
        <div className="flex items-center gap-4">
          <span className="text-base font-semibold">
            Showing financial data for:
          </span>
          <FiscalYearSelector
            selectedFY={selectedFY}
            onFYChange={handleFYChange}
            minFY={26}
            maxFY={35}
            className="[&_button]:text-base [&_button]:font-bold [&_button]:h-10 [&_button]:w-28 [&_button]:bg-primary/10 [&_button]:border-primary/30"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Total Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.countries}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Formulation Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.formulations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              FY{selectedFY} Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrencyCompact(totals.revenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              FY{selectedFY} Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(
              "text-2xl font-bold",
              totals.margin < 0 && "text-destructive"
            )}>
              {formatCurrencyCompact(totals.margin)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={sortField === "name" ? "default" : "outline"}
            size="sm"
            onClick={() => toggleSort("name")}
          >
            Name
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
          <Button
            variant={sortField === "formulations" ? "default" : "outline"}
            size="sm"
            onClick={() => toggleSort("formulations")}
          >
            Formulations
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
          <Button
            variant={sortField === "revenue" ? "default" : "outline"}
            size="sm"
            onClick={() => toggleSort("revenue")}
          >
            Revenue
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
          <Button
            variant={sortField === "margin" ? "default" : "outline"}
            size="sm"
            onClick={() => toggleSort("margin")}
          >
            Margin
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Country Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedCountries.map((country) => {
          const marginPercent = country.total_revenue > 0
            ? (country.total_margin / country.total_revenue) * 100
            : 0;

          return (
            <Link
              key={country.country_id}
              href={`/portfolio/countries/${country.country_id}`}
              className="group"
            >
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/30 group-hover:bg-muted/30">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {country.country_name}
                        <Badge variant="outline" className="text-xs font-normal">
                          {country.country_code}
                        </Badge>
                      </CardTitle>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Formulations</p>
                    <p className="font-semibold">{country.formulations_count || 0}</p>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">FY{selectedFY} Revenue</p>
                        <p className="font-semibold">
                          {formatCurrencyCompact(country.total_revenue)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">FY{selectedFY} Margin</p>
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            "font-semibold",
                            country.total_margin < 0 && "text-destructive"
                          )}>
                            {formatCurrencyCompact(country.total_margin)}
                          </p>
                          {country.total_revenue > 0 && (
                            <Badge
                              variant={
                                marginPercent >= 40 ? "success" :
                                marginPercent >= 20 ? "info" :
                                marginPercent >= 0 ? "warning" : "destructive"
                              }
                              className="text-xs"
                            >
                              {marginPercent.toFixed(0)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filteredAndSortedCountries.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Globe className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No countries found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? `No countries match "${searchTerm}"`
                : "No countries have been added yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
