"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  ChevronDown, 
  Globe, 
  FileText, 
  DollarSign, 
  FlaskConical,
  Search,
  Filter,
  ArrowUpDown,
  ArrowRight,
  LayoutGrid,
  List as ListIcon,
  Share2,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getStatusVariant } from "@/lib/design-system";
import type { Database } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type FormulationCountryUseGroup = Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface PipelineTrackerDashboardProps {
  formulations: Formulation[];
  countries: FormulationCountryDetail[];
  useGroups: FormulationCountryUseGroup[];
  businessCases: BusinessCase[];
}

type SortField = "code" | "revenue" | "margin" | "countries" | "status";
type SortDirection = "asc" | "desc";

type ViewMode = "table" | "cards";

export function PipelineTrackerDashboard({
  formulations,
  countries,
  useGroups,
  businessCases,
}: PipelineTrackerDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [sortField, setSortField] = useState<SortField>("revenue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // --- Data Processing & Aggregation ---

  const { processedData, globalStats } = useMemo(() => {
    // 1. Map Data for faster lookup
    const countriesByFormulation = new Map<string, FormulationCountryDetail[]>();
    countries.forEach(c => {
      const code = c.formulation_code || "";
      if (!countriesByFormulation.has(code)) countriesByFormulation.set(code, []);
      countriesByFormulation.get(code)!.push(c);
    });

    const useGroupsByCountry = new Map<string, FormulationCountryUseGroup[]>();
    useGroups.forEach(ug => {
      const cid = ug.formulation_country_id || "";
      if (!useGroupsByCountry.has(cid)) useGroupsByCountry.set(cid, []);
      useGroupsByCountry.get(cid)!.push(ug);
    });

    const businessCasesByUseGroup = new Map<string, BusinessCase[]>();
    const businessCasesByCountry = new Map<string, BusinessCase[]>();

    // Calculate global totals for relative comparisons
    let globalTotalRevenue = 0;
    let globalTotalMargin = 0;

    businessCases.forEach(bc => {
      globalTotalRevenue += bc.total_revenue || 0;
      globalTotalMargin += bc.total_margin || 0;

      if (bc.formulation_country_use_group_id) {
        const ugid = bc.formulation_country_use_group_id;
        if (!businessCasesByUseGroup.has(ugid)) businessCasesByUseGroup.set(ugid, []);
        businessCasesByUseGroup.get(ugid)!.push(bc);
      } else if (bc.formulation_country_id) {
        const cid = bc.formulation_country_id;
        if (!businessCasesByCountry.has(cid)) businessCasesByCountry.set(cid, []);
        businessCasesByCountry.get(cid)!.push(bc);
      }
    });

    // Avoid division by zero
    if (globalTotalRevenue === 0) globalTotalRevenue = 1;

    // 2. Augment Formulations with aggregates
    const enrichedFormulations = formulations.map(f => {
      const fCode = f.formulation_code || "";
      const fCountries = countriesByFormulation.get(fCode) || [];
      
      let totalRevenue = 0;
      let totalMargin = 0;
      let totalUseGroups = 0;
      let activeCountries = 0;
      let totalBusinessCases = 0;

      fCountries.forEach(c => {
        if (c.country_status === 'Active') activeCountries++;
        const cId = c.formulation_country_id || "";
        const cUseGroups = useGroupsByCountry.get(cId) || [];
        totalUseGroups += cUseGroups.length;

        // Add revenue from Use Group Business Cases
        cUseGroups.forEach(ug => {
          const ugId = ug.formulation_country_use_group_id || "";
          const bcs = businessCasesByUseGroup.get(ugId) || [];
          totalBusinessCases += bcs.length;
          bcs.forEach(bc => {
            const rev = bc.total_revenue || 0;
            const margin = bc.total_margin || 0;
            totalRevenue += rev;
            totalMargin += margin;
          });
        });

        // Add revenue from Direct Country Business Cases
        const directBcs = businessCasesByCountry.get(cId) || [];
        totalBusinessCases += directBcs.length;
        directBcs.forEach(bc => {
          const rev = bc.total_revenue || 0;
          const margin = bc.total_margin || 0;
          totalRevenue += rev;
          totalMargin += margin;
        });
      });

      const revenueShare = (totalRevenue / globalTotalRevenue) * 100;
      const marginPercent = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;
      const countryPenetration = fCountries.length > 0 ? (activeCountries / fCountries.length) * 100 : 0;

      return {
        ...f,
        stats: {
          countryCount: fCountries.length,
          activeCountryCount: activeCountries,
          useGroupCount: totalUseGroups,
          businessCaseCount: totalBusinessCases,
          totalRevenue,
          totalMargin,
          marginPercent,
          revenueShare,
          countryPenetration
        },
      };
    });

    // 3. Filter
    const filtered = enrichedFormulations.filter(f => {
      const matchesSearch = (
        (f.formulation_code?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (f.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      );
      const matchesStatus = statusFilter === "all" || f.formulation_status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // 4. Sort
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case "code":
          comparison = (a.formulation_code || "").localeCompare(b.formulation_code || "");
          break;
        case "revenue":
          comparison = a.stats.totalRevenue - b.stats.totalRevenue;
          break;
        case "margin":
          comparison = a.stats.marginPercent - b.stats.marginPercent;
          break;
        case "countries":
          comparison = a.stats.countryCount - b.stats.countryCount;
          break;
        case "status":
          comparison = (a.formulation_status || "").localeCompare(b.formulation_status || "");
          break;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });

    const globalStats = {
      totalFormulations: filtered.length,
      totalCountries: filtered.reduce((sum, f) => sum + f.stats.countryCount, 0),
      totalActiveCountries: filtered.reduce((sum, f) => sum + f.stats.activeCountryCount, 0),
      totalUseGroups: filtered.reduce((sum, f) => sum + f.stats.useGroupCount, 0),
      totalBusinessCases: filtered.reduce((sum, f) => sum + f.stats.businessCaseCount, 0),
      totalRevenue: filtered.reduce((sum, f) => sum + f.stats.totalRevenue, 0),
      totalMargin: filtered.reduce((sum, f) => sum + f.stats.totalMargin, 0),
      avgMarginPercent: 0,
    };

    globalStats.avgMarginPercent = globalStats.totalRevenue > 0 
      ? (globalStats.totalMargin / globalStats.totalRevenue) * 100 
      : 0;

    return { processedData: sorted, globalStats };
  }, [formulations, countries, useGroups, businessCases, searchTerm, statusFilter, sortField, sortDirection]);

  // --- Pagination ---
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Actions ---

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    setCurrentPage(1);
  }, [sortField]);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `€${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `€${(val / 1000).toFixed(0)}K`;
    return `€${val}`;
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 hover:bg-muted"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field && (
        sortDirection === "asc" ? 
          <TrendingUp className="ml-1 h-3 w-3" /> : 
          <TrendingDown className="ml-1 h-3 w-3" />
      )}
    </Button>
  );

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search formulations..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>
          <Select 
            value={statusFilter} 
            onValueChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Development">Development</SelectItem>
              <SelectItem value="Pipeline">Pipeline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {paginatedData.length} of {processedData.length}
          </span>
        </div>
      </div>

      {/* Summary Stats - Compact */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card>
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Formulations</div>
            <div className="text-xl font-bold">{globalStats.totalFormulations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Countries</div>
            <div className="text-xl font-bold">{globalStats.totalCountries}</div>
            <div className="text-[10px] text-muted-foreground">{globalStats.totalActiveCountries} active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Use Groups</div>
            <div className="text-xl font-bold">{globalStats.totalUseGroups}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Business Cases</div>
            <div className="text-xl font-bold">{globalStats.totalBusinessCases}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Avg Margin</div>
            <div className={cn("text-xl font-bold", 
              globalStats.avgMarginPercent > 40 ? "text-green-600" : "text-amber-600"
            )}>
              {globalStats.avgMarginPercent.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Total Value</div>
            <div className="text-xl font-bold text-primary">
              {formatCurrency(globalStats.totalRevenue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table View - Optimized for scale */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead className="w-[180px]">
                    <SortButton field="code">Formulation</SortButton>
                  </TableHead>
                  <TableHead className="w-[120px]">
                    <SortButton field="status">Status</SortButton>
                  </TableHead>
                  <TableHead className="w-[100px] text-right">
                    <SortButton field="countries">Countries</SortButton>
                  </TableHead>
                  <TableHead className="w-[80px] text-right">Use Groups</TableHead>
                  <TableHead className="w-[80px] text-right">Bus. Cases</TableHead>
                  <TableHead className="w-[100px] text-right">
                    <SortButton field="margin">Margin</SortButton>
                  </TableHead>
                  <TableHead className="w-[120px] text-right">
                    <SortButton field="revenue">Revenue</SortButton>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No formulations found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((formulation) => (
                    <TableRow 
                      key={formulation.formulation_id}
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => window.location.href = `/formulations/${formulation.formulation_id}`}
                    >
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{formulation.formulation_code}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[160px]" title={formulation.product_name || ""}>
                            {formulation.product_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(formulation.formulation_status, 'formulation')} className="text-xs">
                          {formulation.formulation_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-medium text-sm">
                            {formulation.stats.activeCountryCount}/{formulation.stats.countryCount}
                          </span>
                          <Progress 
                            value={formulation.stats.countryPenetration} 
                            className="h-1 w-12 mt-1" 
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-sm">
                        {formulation.stats.useGroupCount}
                      </TableCell>
                      <TableCell className="text-right font-medium text-sm">
                        {formulation.stats.businessCaseCount}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={cn("font-medium text-sm", 
                          formulation.stats.marginPercent > 40 ? "text-green-600" : 
                          formulation.stats.marginPercent > 0 ? "text-amber-600" : "text-muted-foreground"
                        )}>
                          {formulation.stats.marginPercent > 0 ? `${formulation.stats.marginPercent.toFixed(1)}%` : "—"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-semibold text-sm">
                            {formatCurrency(formulation.stats.totalRevenue)}
                          </span>
                          {formulation.stats.revenueShare > 5 && (
                            <span className="text-[10px] text-primary font-medium">
                              {formulation.stats.revenueShare.toFixed(0)}% share
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `/formulations/${formulation.formulation_id}`;
                          }}
                        >
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t px-4 py-3">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
