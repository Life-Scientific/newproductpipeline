"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Download,
  X,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStatusVariant } from "@/lib/design-system";
import type { Database } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";
import { PipelineNetworkGraph } from "./PipelineNetworkGraph";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";

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

// Get unique statuses from formulations
const STATUS_OPTIONS = ["Selected", "Monitoring", "Not Yet Considered", "Killed"] as const;

// Enriched formulation type with computed stats
interface EnrichedFormulation extends Formulation {
  stats: {
    countryCount: number;
    activeCountryCount: number;
    useGroupCount: number;
    businessCaseCount: number;
    totalRevenue: number;
    totalMargin: number;
    marginPercent: number;
    revenueShare: number;
    countryPenetration: number;
    topCountries: string[]; // Top 3 country names
  };
}

// Helper function to format currency
function formatCurrency(val: number) {
  if (val >= 1000000) return `€${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `€${(val / 1000).toFixed(0)}K`;
  return `€${val.toFixed(0)}`;
}

export function PipelineTrackerDashboard({
  formulations,
  countries,
  useGroups,
  businessCases,
}: PipelineTrackerDashboardProps) {
  const [statusFilters, setStatusFilters] = useState<Set<string>>(new Set());
  const [selectedView, setSelectedView] = useState<"table" | "network">("table");

  // Data processing - enriches formulations with computed statistics
  const { processedData, globalStats } = useMemo(() => {
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

    if (globalTotalRevenue === 0) globalTotalRevenue = 1;

    const enrichedFormulations: EnrichedFormulation[] = formulations.map(f => {
      const fCode = f.formulation_code || "";
      const fCountries = countriesByFormulation.get(fCode) || [];
      
      let totalRevenue = 0;
      let totalMargin = 0;
      let totalUseGroups = 0;
      let activeCountries = 0;
      let totalBusinessCases = 0;

      // Track revenue by country for sorting
      const countryRevenue: { name: string; revenue: number; status: string }[] = [];

      fCountries.forEach(c => {
        if (c.country_status === 'Active') activeCountries++;
        const cId = c.formulation_country_id || "";
        const cUseGroups = useGroupsByCountry.get(cId) || [];
        totalUseGroups += cUseGroups.length;

        let countryRev = 0;
        cUseGroups.forEach(ug => {
          const ugId = ug.formulation_country_use_group_id || "";
          const bcs = businessCasesByUseGroup.get(ugId) || [];
          totalBusinessCases += bcs.length;
          bcs.forEach(bc => {
            const rev = bc.total_revenue || 0;
            const margin = bc.total_margin || 0;
            totalRevenue += rev;
            totalMargin += margin;
            countryRev += rev;
          });
        });

        const directBcs = businessCasesByCountry.get(cId) || [];
        totalBusinessCases += directBcs.length;
        directBcs.forEach(bc => {
          const rev = bc.total_revenue || 0;
          const margin = bc.total_margin || 0;
          totalRevenue += rev;
          totalMargin += margin;
          countryRev += rev;
        });

        countryRevenue.push({
          name: c.country_name || c.country_code || "Unknown",
          revenue: countryRev,
          status: c.country_status || "",
        });
      });

      // Sort by revenue and take top 3
      const topCountries = countryRevenue
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 3)
        .map(c => c.name);

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
          countryPenetration,
          topCountries,
        },
      };
    });

    // Apply status filters only (search is handled by EnhancedDataTable)
    const filtered = enrichedFormulations.filter(f => {
      const status = "formulation_status" in f ? (f as any).formulation_status : null;
      const matchesStatus = statusFilters.size === 0 || (status && statusFilters.has(status));
      return matchesStatus;
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

    return { processedData: filtered, globalStats };
  }, [formulations, countries, useGroups, businessCases, statusFilters]);

  // Column definitions for EnhancedDataTable
  const columns = useMemo<ColumnDef<EnrichedFormulation>[]>(() => [
    {
      id: "formulation",
      accessorKey: "formulation_code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 -ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Formulation
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const formulation = row.original;
        // Use product_name from the view, fallback to formulation_code
        const name = formulation.product_name || formulation.formulation_code;
        const activeIngredients = formulation.active_ingredients;
        return (
          <Link 
            href={`/formulations/${formulation.formulation_id}`}
            className="flex flex-col hover:underline group/cell"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-semibold text-sm text-primary truncate max-w-[220px] group-hover/cell:underline" title={name || ""}>
              {name || "—"}
            </span>
            {formulation.formulation_code && name !== formulation.formulation_code && (
              <span className="text-[10px] text-muted-foreground">
                {formulation.formulation_code}
              </span>
            )}
            {activeIngredients && (
              <span className="text-[10px] text-muted-foreground/70 truncate max-w-[220px]" title={activeIngredients}>
                {activeIngredients}
              </span>
            )}
          </Link>
        );
      },
      meta: { sticky: "left" as const, minWidth: "220px" },
      enableHiding: false,
    },
    {
      id: "status",
      accessorFn: (row) => "formulation_status" in row ? (row as any).formulation_status : null,
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 -ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = "formulation_status" in row.original 
          ? (row.original as any).formulation_status 
          : null;
        return status ? (
          <Badge variant={getStatusVariant(status, 'formulation')} className="text-xs">
            {status}
          </Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
      meta: { minWidth: "120px" },
    },
    {
      id: "countries",
      accessorFn: (row) => row.stats.countryCount,
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 -ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Markets
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const { activeCountryCount, countryCount, topCountries } = row.original.stats;
        const moreCount = countryCount - topCountries.length;
        return (
          <div className="flex flex-col items-start min-w-[140px]">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-sm">
                {activeCountryCount}/{countryCount}
              </span>
              <span className="text-[10px] text-muted-foreground">active</span>
            </div>
            {topCountries.length > 0 && (
              <div className="text-[10px] text-muted-foreground truncate max-w-[140px]" title={topCountries.join(", ")}>
                {topCountries.join(", ")}{moreCount > 0 && ` +${moreCount}`}
              </div>
            )}
          </div>
        );
      },
      meta: { minWidth: "150px" },
    },
    {
      id: "useGroups",
      accessorFn: (row) => row.stats.useGroupCount,
      header: "Use Groups",
      cell: ({ row }) => (
        <span className="font-medium text-sm">{row.original.stats.useGroupCount}</span>
      ),
      meta: { align: "right", minWidth: "90px" },
    },
    {
      id: "businessCases",
      accessorFn: (row) => row.stats.businessCaseCount,
      header: "Business Cases",
      cell: ({ row }) => {
        const { businessCaseCount, totalRevenue } = row.original.stats;
        return (
          <div className="flex flex-col items-end">
            <span className={cn(
              "font-medium text-sm",
              businessCaseCount > 0 ? "text-green-600" : "text-muted-foreground"
            )}>
              {businessCaseCount || "—"}
            </span>
            {businessCaseCount > 0 && totalRevenue > 0 && (
              <span className="text-[10px] text-muted-foreground">
                {formatCurrency(totalRevenue)}
              </span>
            )}
          </div>
        );
      },
      meta: { align: "right", minWidth: "110px" },
    },
    {
      id: "margin",
      accessorFn: (row) => row.stats.marginPercent,
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 -ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Margin
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const marginPercent = row.original.stats.marginPercent;
        return (
          <span className={cn(
            "font-medium text-sm",
            marginPercent > 40 ? "text-green-600" : 
            marginPercent > 0 ? "text-amber-600" : "text-muted-foreground"
          )}>
            {marginPercent > 0 ? `${marginPercent.toFixed(1)}%` : "—"}
          </span>
        );
      },
      meta: { align: "right", minWidth: "90px" },
    },
    {
      id: "revenue",
      accessorFn: (row) => row.stats.totalRevenue,
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 -ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Revenue
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const { totalRevenue, revenueShare } = row.original.stats;
        return (
          <div className="flex flex-col items-end">
            <span className="font-semibold text-sm">
              {formatCurrency(totalRevenue)}
            </span>
            {revenueShare > 5 && (
              <span className="text-[10px] text-primary font-medium">
                {revenueShare.toFixed(0)}% share
              </span>
            )}
          </div>
        );
      },
      meta: { align: "right", minWidth: "110px" },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Link href={`/formulations/${row.original.formulation_id}`}>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      ),
      meta: { minWidth: "50px" },
      enableHiding: false,
      enableSorting: false,
    },
  ], []);

  const toggleStatusFilter = (status: string) => {
    setStatusFilters(prev => {
      const next = new Set(prev);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  };

  const clearAllFilters = () => {
    setStatusFilters(new Set());
  };

  const exportToCSV = () => {
    const headers = ["Product Name", "Code", "Active Ingredients", "Status", "Markets", "Active Markets", "Top Countries", "Use Groups", "Business Cases", "Revenue", "Margin", "Margin %"];
    const rows = processedData.map(f => [
      f.product_name || f.formulation_code || "",
      f.formulation_code || "",
      f.active_ingredients || "",
      f.status || "",
      f.stats.countryCount,
      f.stats.activeCountryCount,
      f.stats.topCountries.join("; "),
      f.stats.useGroupCount,
      f.stats.businessCaseCount,
      f.stats.totalRevenue.toFixed(2),
      f.stats.totalMargin.toFixed(2),
      f.stats.marginPercent.toFixed(1),
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pipeline-tracker-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Network view can show for up to 20 results
  const canShowNetwork = processedData.length <= 20 && processedData.length > 0;

  const hasActiveFilters = statusFilters.size > 0;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        {/* View Toggle and Export */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Status:</span>
            {STATUS_OPTIONS.map((status) => (
              <Badge
                key={status}
                variant={statusFilters.has(status) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all hover:scale-105",
                  statusFilters.has(status) && "bg-primary"
                )}
                onClick={() => toggleStatusFilter(status)}
              >
                {status}
                {statusFilters.has(status) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Badge>
            ))}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-muted-foreground hover:text-foreground"
                onClick={clearAllFilters}
              >
                Clear all
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={exportToCSV}
              title="Export to CSV"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>

            <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as "table" | "network")}>
              <TabsList className="h-8">
                <TabsTrigger value="table" className="text-xs h-7">Table</TabsTrigger>
                <TabsTrigger value="network" className="text-xs h-7" disabled={!canShowNetwork}>
                  Network
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {selectedView === "network" && !canShowNetwork && (
          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-3">
              <p className="text-sm text-amber-900 dark:text-amber-100">
                Network view works best with ≤20 results. Filter or search to reduce results.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Summary Stats */}
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

      {/* Content */}
      {selectedView === "table" ? (
        <Card>
          <CardContent className="p-4">
            <EnhancedDataTable
              columns={columns}
              data={processedData}
              searchKey="formulation"
              searchPlaceholder="Search formulations..."
              pageSize={50}
              showPageSizeSelector={true}
              emptyMessage="No formulations found"
              tableId="pipeline-tracker"
              enableColumnReordering={true}
              enableViewManagement={true}
            />
          </CardContent>
        </Card>
      ) : (
        <PipelineNetworkGraph
          formulations={formulations.filter(f => 
            processedData.map(p => p.formulation_id).includes(f.formulation_id)
          )}
          countries={countries}
          useGroups={useGroups}
          businessCases={businessCases}
          searchTerm=""
          statusFilter={Array.from(statusFilters)[0] || "all"}
        />
      )}
    </div>
  );
}


