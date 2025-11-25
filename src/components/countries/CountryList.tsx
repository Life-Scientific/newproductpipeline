"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CountryWithStats } from "@/lib/db/countries";
import { 
  Globe, 
  TrendingUp, 
  Search, 
  ArrowUpDown,
  ChevronRight,
  Package,
  DollarSign,
  Banknote,
} from "lucide-react";

interface CountryListProps {
  countries: CountryWithStats[];
}

type SortField = "name" | "formulations" | "revenue" | "margin";
type SortDirection = "asc" | "desc";

function formatCurrency(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(2)}`;
}

export function CountryList({ countries }: CountryListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("revenue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const filteredAndSortedCountries = useMemo(() => {
    let filtered = countries;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = countries.filter(
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
  }, [countries, searchTerm, sortField, sortDirection]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Calculate totals for header
  const totals = useMemo(() => ({
    countries: countries.length,
    formulations: countries.reduce((sum, c) => sum + (c.formulations_count || 0), 0),
    revenue: countries.reduce((sum, c) => sum + (c.total_revenue || 0), 0),
    margin: countries.reduce((sum, c) => sum + (c.total_margin || 0), 0),
  }), [countries]);

  return (
    <div className="space-y-6">
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
              Total Registrations
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
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.revenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(
              "text-2xl font-bold",
              totals.margin < 0 && "text-destructive"
            )}>
              {formatCurrency(totals.margin)}
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
              href={`/countries/${country.country_id}`}
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
                      <CardDescription className="mt-1">
                        {country.currency_code}
                        {country.has_tariffs && " • Has Tariffs"}
                      </CardDescription>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Formulations</p>
                    <p className="font-semibold">{country.formulations_count || 0}</p>
                    <p className="text-xs text-muted-foreground">
                      {country.approved_count || 0} approved
                    </p>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                        <p className="font-semibold">
                          {formatCurrency(country.total_revenue)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Margin</p>
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            "font-semibold",
                            country.total_margin < 0 && "text-destructive"
                          )}>
                            {formatCurrency(country.total_margin)}
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

