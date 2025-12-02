"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";
import type { Database } from "@/lib/supabase/database.types";
import Link from "next/link";
import { useRequestCache } from "@/hooks/use-request-cache";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

interface FormulationComparisonProps {
  formulations: Formulation[];
}

interface ComparisonData {
  formulation: Formulation;
  businessCases: any[];
  ingredients: any[];
  countries: any[];
  useGroups: any[];
  cogs: any[];
  protectionStatus: any[];
  statusHistory: any[];
}

const MAX_COMPARISONS = 5;

function formatNumber(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  return value.toLocaleString();
}

export function FormulationComparison({ formulations }: FormulationComparisonProps) {
  const { cachedFetch } = useRequestCache();
  const { formatCurrencyCompact } = useDisplayPreferences();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<Map<string, ComparisonData>>(new Map());
  
  // Use hook's formatter
  const formatCurrency = formatCurrencyCompact;

  const selectedFormulations = useMemo(() => {
    return formulations.filter((f) => f.formulation_id && selectedIds.includes(f.formulation_id));
  }, [formulations, selectedIds]);

  const handleAddFormulation = useCallback(async (formulationId: string) => {
    if (selectedIds.includes(formulationId) || selectedIds.length >= MAX_COMPARISONS) {
      return;
    }

    setSelectedIds((prev) => [...prev, formulationId]);

    // Fetch detailed data for the formulation using API route with request deduplication
    try {
      const [
        businessCasesRes,
        ingredientsRes,
        countriesRes,
        useGroupsRes,
        cogsRes,
        protectionRes,
        statusHistoryRes,
      ] = await Promise.all([
        cachedFetch(
          `formulation-${formulationId}-business-cases`,
          () => fetch(`/api/formulations/${formulationId}/business-cases`).catch(() => null)
        ),
        cachedFetch(
          `formulation-${formulationId}-ingredients`,
          () => fetch(`/api/formulations/${formulationId}/ingredients`).catch(() => null)
        ),
        cachedFetch(
          `formulation-${formulationId}-countries`,
          () => fetch(`/api/formulations/${formulationId}/countries`).catch(() => null)
        ),
        cachedFetch(
          `formulation-${formulationId}-use-groups`,
          () => fetch(`/api/formulations/${formulationId}/use-groups`).catch(() => null)
        ),
        cachedFetch(
          `formulation-${formulationId}-cogs`,
          () => fetch(`/api/formulations/${formulationId}/cogs`).catch(() => null)
        ),
        cachedFetch(
          `formulation-${formulationId}-protection`,
          () => fetch(`/api/formulations/${formulationId}/protection`).catch(() => null)
        ),
        cachedFetch(
          `formulation-${formulationId}-status-history`,
          () => fetch(`/api/formulations/${formulationId}/status-history`).catch(() => null)
        ),
      ]);

      const businessCases = businessCasesRes?.ok ? await businessCasesRes.json() : [];
      const ingredients = ingredientsRes?.ok ? await ingredientsRes.json() : [];
      const countries = countriesRes?.ok ? await countriesRes.json() : [];
      const useGroups = useGroupsRes?.ok ? await useGroupsRes.json() : [];
      const cogs = cogsRes?.ok ? await cogsRes.json() : [];
      const protectionStatus = protectionRes?.ok ? await protectionRes.json() : [];
      const statusHistory = statusHistoryRes?.ok ? await statusHistoryRes.json() : [];

      const formulation = formulations.find((f) => f.formulation_id === formulationId);
      
      if (formulation) {
        setComparisonData((prev) => {
          const next = new Map(prev);
          next.set(formulationId, {
            formulation,
            businessCases,
            ingredients,
            countries,
            useGroups,
            cogs,
            protectionStatus,
            statusHistory,
          });
          return next;
        });
      }
    } catch (error) {
      console.error("Error fetching formulation data:", error);
    }
  }, [formulations, cachedFetch]);

  const handleRemoveFormulation = (formulationId: string) => {
    setSelectedIds(selectedIds.filter((id) => id !== formulationId));
    setComparisonData((prev) => {
      const next = new Map(prev);
      next.delete(formulationId);
      return next;
    });
  };

  const availableFormulations = formulations.filter(
    (f) => !f.formulation_id || !selectedIds.includes(f.formulation_id)
  );

  // Calculate aggregated metrics
  const getTotalRevenue = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data) return 0;
    return data.businessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
  };

  const getTotalMargin = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data) return 0;
    return data.businessCases.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
  };

  const getAvgMarginPercent = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || data.businessCases.length === 0) return 0;
    const totalRevenue = getTotalRevenue(formulationId);
    const totalMargin = getTotalMargin(formulationId);
    return totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;
  };

  const getLatestCOGS = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.cogs || data.cogs.length === 0) return null;
    const sorted = [...data.cogs].sort((a, b) => {
      const yearA = parseInt(a.fiscal_year?.replace("FY", "") || "0");
      const yearB = parseInt(b.fiscal_year?.replace("FY", "") || "0");
      return yearB - yearA;
    });
    return sorted[0]?.cogs_value || null;
  };

  const getEarliestEMD = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.countries || data.countries.length === 0) return null;
    const emds = data.countries
      .map((c: any) => c.earliest_market_entry_date)
      .filter((emd: any) => emd)
      .map((emd: string) => new Date(emd))
      .sort((a, b) => a.getTime() - b.getTime());
    return emds.length > 0 ? emds[0] : null;
  };

  const getEarliestTME = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.countries || data.countries.length === 0) return null;
    const tmes = data.countries
      .map((c: any) => c.target_market_entry_fy)
      .filter((tme: any) => tme)
      .sort();
    return tmes.length > 0 ? tmes[0] : null;
  };

  const getEarliestProtectionExpiry = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.protectionStatus || data.protectionStatus.length === 0) return null;
    const expiries = data.protectionStatus
      .flatMap((ps: any) => [
        ps.earliest_active_patent_expiry,
        ps.earliest_formulation_patent_expiry,
      ])
      .filter((exp: any) => exp)
      .map((exp: string) => new Date(exp))
      .sort((a, b) => a.getTime() - b.getTime());
    return expiries.length > 0 ? expiries[0] : null;
  };

  const getActiveIngredientsList = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.ingredients) return [];
    return data.ingredients
      .filter((ing: any) => ing.ingredients?.ingredient_type === "Active")
      .map((ing: any) => ({
        name: ing.ingredients?.ingredient_name || "Unknown",
        quantity: ing.quantity,
        unit: ing.quantity_unit,
      }));
  };

  const getReferenceProducts = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.useGroups) return [];
    const refs = new Set(
      data.useGroups
        .map((ug: any) => ug.reference_product_name)
        .filter((r: any) => r)
    );
    return Array.from(refs);
  };

  const getApprovedCountries = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.countries) return 0;
    return data.countries.filter((c: any) => c.registration_status === "Approved").length;
  };

  const getStatusChangeDate = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.statusHistory || data.statusHistory.length === 0) return null;
    const sorted = [...data.statusHistory].sort(
      (a, b) => new Date(b.changed_at || 0).getTime() - new Date(a.changed_at || 0).getTime()
    );
    return sorted[0]?.changed_at ? new Date(sorted[0].changed_at) : null;
  };

  const getCountriesList = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.countries) return [];
    return data.countries.map((c: any) => c.country_name).filter(Boolean);
  };

  const getRegistrationPathways = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.countries) return [];
    const pathways = new Set(
      data.countries.map((c: any) => c.likely_registration_pathway).filter(Boolean)
    );
    return Array.from(pathways);
  };

  const getEUApprovedCount = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.countries) return 0;
    return data.countries.filter((c: any) => c.is_eu_approved_formulation === true).length;
  };

  const getNovelCount = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.countries) return 0;
    return data.countries.filter((c: any) => c.is_novel === true).length;
  };

  const getCropsList = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.useGroups) return [];
    const crops = new Set<string>();
    data.useGroups.forEach((useGroup: any) => {
      if (useGroup.crops && Array.isArray(useGroup.crops)) {
        useGroup.crops.forEach((crop: string) => {
          if (crop) crops.add(crop);
        });
      }
    });
    return Array.from(crops).sort();
  };

  const getBusinessCaseYearBreakdown = (formulationId: string) => {
    const data = comparisonData.get(formulationId);
    if (!data || !data.businessCases) return {};
    const breakdown: Record<string, { revenue: number; margin: number; count: number }> = {};
    data.businessCases.forEach((bc: any) => {
      const fy = bc.fiscal_year || "Unknown";
      if (!breakdown[fy]) {
        breakdown[fy] = { revenue: 0, margin: 0, count: 0 };
      }
      breakdown[fy].revenue += bc.total_revenue || 0;
      breakdown[fy].margin += bc.total_margin || 0;
      breakdown[fy].count += 1;
    });
    return breakdown;
  };

  if (selectedFormulations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Select Formulations to Compare</CardTitle>
          <CardDescription>
            Choose up to {MAX_COMPARISONS} formulations to compare side-by-side
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select
              onValueChange={handleAddFormulation}
              value=""
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a formulation to add..." />
              </SelectTrigger>
                <SelectContent>
                  {formulations
                    .filter((formulation) => formulation.formulation_id)
                    .map((formulation) => (
                      <SelectItem key={formulation.formulation_id!} value={formulation.formulation_id!}>
                        {formulation.formulation_code || formulation.product_name} - {formulation.product_name}
                      </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Select formulations from the dropdown above to start comparing.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selection Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Formulations ({selectedFormulations.length}/{MAX_COMPARISONS})</CardTitle>
          <CardDescription>Add or remove formulations from comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedFormulations.map((formulation) => (
              <Badge
                key={formulation.formulation_id}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-1.5"
              >
                <Link
                  href={`/portfolio/formulations/${formulation.formulation_id}`}
                  className="hover:underline"
                >
                  {formulation.formulation_code || formulation.product_name}
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => formulation.formulation_id && handleRemoveFormulation(formulation.formulation_id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          {selectedFormulations.length < MAX_COMPARISONS && (
            <Select onValueChange={handleAddFormulation} value="">
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Add another formulation..." />
              </SelectTrigger>
              <SelectContent>
                {availableFormulations
                  .filter((formulation) => formulation.formulation_id)
                  .map((formulation) => (
                    <SelectItem key={formulation.formulation_id!} value={formulation.formulation_id!}>
                      {formulation.formulation_code || formulation.product_name} - {formulation.product_name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-background z-10 min-w-[200px]">Metric</TableHead>
              {selectedFormulations.map((formulation) => (
                <TableHead key={formulation.formulation_id} className="text-center min-w-[200px]">
                  <div className="space-y-1">
                    <Link
                      href={`/portfolio/formulations/${formulation.formulation_id}`}
                      className="font-medium hover:underline"
                    >
                      {formulation.formulation_code || formulation.product_name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{formulation.product_name}</p>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Basic Info */}
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Formulation Code</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`code-${formulation.formulation_id}`} className="text-center">
                  {formulation.formulation_code || "—"}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Product Name</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`name-${formulation.formulation_id}`} className="text-center">
                  {formulation.product_name || "—"}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Category</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`category-${formulation.formulation_id}`} className="text-center">
                  {formulation.product_category || "—"}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Formulation Type</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`type-${formulation.formulation_id}`} className="text-center">
                  {formulation.formulation_type || "—"}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Status</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`status-${formulation.formulation_id}`} className="text-center">
                  <Badge variant={formulation.status === "Selected" ? "default" : "secondary"}>
                    {formulation.status || "—"}
                  </Badge>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">UOM</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`uom-${formulation.formulation_id}`} className="text-center">
                  {formulation.uom || "—"}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Short Name</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`short-${formulation.formulation_id}`} className="text-center">
                  {formulation.short_name || "—"}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Created Date</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`created-${formulation.formulation_id}`} className="text-center text-sm">
                  {formulation.created_at
                    ? new Date(formulation.created_at).toLocaleDateString()
                    : "—"}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Last Status Change</TableCell>
              {selectedFormulations.map((formulation) => {
                const changeDate = formulation.formulation_id ? getStatusChangeDate(formulation.formulation_id) : null;
                return (
                  <TableCell key={`statuschange-${formulation.formulation_id}`} className="text-center text-sm">
                    {changeDate ? changeDate.toLocaleDateString() : "—"}
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Active Ingredients Section */}
            <TableRow className="bg-muted/30">
              <TableCell className="font-semibold sticky left-0 bg-background z-10">Active Ingredients</TableCell>
              {selectedFormulations.map((formulation) => {
                const actives = formulation.formulation_id ? getActiveIngredientsList(formulation.formulation_id) : [];
                return (
                  <TableCell key={`actives-${formulation.formulation_id}`} className="text-center">
                    {actives.length > 0 ? (
                      <div className="space-y-1 text-sm">
                        {actives.map((active, idx) => (
                          <div key={idx}>
                            {active.name} {active.quantity} {active.unit}
                          </div>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Financial Metrics */}
            <TableRow className="bg-muted/30">
              <TableCell className="font-semibold sticky left-0 bg-background z-10">Total Revenue</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`revenue-${formulation.formulation_id}`} className="text-center font-semibold">
                  {formatCurrency(formulation.formulation_id ? getTotalRevenue(formulation.formulation_id) : 0)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-muted/30">
              <TableCell className="font-semibold sticky left-0 bg-background z-10">Total Margin</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`margin-${formulation.formulation_id}`} className="text-center font-semibold">
                  {formatCurrency(formulation.formulation_id ? getTotalMargin(formulation.formulation_id) : 0)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Avg Margin %</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`marginpct-${formulation.formulation_id}`} className="text-center">
                  <Badge
                    variant={
                      formulation.formulation_id && getAvgMarginPercent(formulation.formulation_id) >= 50
                        ? "default"
                        : formulation.formulation_id && getAvgMarginPercent(formulation.formulation_id) >= 30
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {formulation.formulation_id ? getAvgMarginPercent(formulation.formulation_id).toFixed(1) : "—"}%
                  </Badge>
                </TableCell>
              ))}
            </TableRow>

            {/* Registration & Market Entry */}
            <TableRow className="bg-muted/30">
              <TableCell className="font-semibold sticky left-0 bg-background z-10">Earliest EMD</TableCell>
              {selectedFormulations.map((formulation) => {
                const emd = formulation.formulation_id ? getEarliestEMD(formulation.formulation_id) : null;
                return (
                  <TableCell key={`emd-${formulation.formulation_id}`} className="text-center text-sm">
                    {emd ? emd.toLocaleDateString() : "—"}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Earliest Target Market Entry FY</TableCell>
              {selectedFormulations.map((formulation) => {
                const tme = formulation.formulation_id ? getEarliestTME(formulation.formulation_id) : null;
                return (
                  <TableCell key={`tme-${formulation.formulation_id}`} className="text-center">
                    {tme || "—"}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Approved Countries</TableCell>
              {selectedFormulations.map((formulation) => {
                const approved = formulation.formulation_id ? getApprovedCountries(formulation.formulation_id) : 0;
                return (
                  <TableCell key={`approved-${formulation.formulation_id}`} className="text-center">
                    <Badge variant={approved > 0 ? "default" : "outline"}>{approved}</Badge>
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Protection Status */}
            <TableRow className="bg-muted/30">
              <TableCell className="font-semibold sticky left-0 bg-background z-10">Earliest Protection Expiry</TableCell>
              {selectedFormulations.map((formulation) => {
                const expiry = formulation.formulation_id ? getEarliestProtectionExpiry(formulation.formulation_id) : null;
                return (
                  <TableCell key={`protection-${formulation.formulation_id}`} className="text-center text-sm">
                    {expiry ? (
                      <div>
                        <div>{expiry.toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {expiry > new Date() ? "Protected" : "Expired"}
                        </div>
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Reference Products */}
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Reference Products</TableCell>
              {selectedFormulations.map((formulation) => {
                const refs = formulation.formulation_id ? getReferenceProducts(formulation.formulation_id) : [];
                return (
                  <TableCell key={`refs-${formulation.formulation_id}`} className="text-center text-sm">
                    {refs.length > 0 ? (
                      <div className="space-y-1">
                        {refs.map((ref, idx) => (
                          <div key={idx}>{ref}</div>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Countries List */}
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Registered Countries</TableCell>
              {selectedFormulations.map((formulation) => {
                const countries = formulation.formulation_id ? getCountriesList(formulation.formulation_id) : [];
                return (
                  <TableCell key={`countrieslist-${formulation.formulation_id}`} className="text-center text-sm">
                    {countries.length > 0 ? (
                      <div className="space-y-1">
                        {countries.slice(0, 5).map((country, idx) => (
                          <div key={idx}>{country}</div>
                        ))}
                        {countries.length > 5 && (
                          <div className="text-xs text-muted-foreground">+{countries.length - 5} more</div>
                        )}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Registration Pathways */}
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Registration Pathways</TableCell>
              {selectedFormulations.map((formulation) => {
                const pathways = formulation.formulation_id ? getRegistrationPathways(formulation.formulation_id) : [];
                return (
                  <TableCell key={`pathways-${formulation.formulation_id}`} className="text-center text-sm">
                    {pathways.length > 0 ? (
                      <div className="space-y-1">
                        {pathways.map((pathway, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {pathway}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>

            {/* EU Approval & Novel Status */}
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">EU Approved Formulations</TableCell>
              {selectedFormulations.map((formulation) => {
                const euApproved = formulation.formulation_id ? getEUApprovedCount(formulation.formulation_id) : 0;
                return (
                  <TableCell key={`euapproved-${formulation.formulation_id}`} className="text-center">
                    <Badge variant={euApproved > 0 ? "default" : "outline"}>{euApproved}</Badge>
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Novel Formulations</TableCell>
              {selectedFormulations.map((formulation) => {
                const novel = formulation.formulation_id ? getNovelCount(formulation.formulation_id) : 0;
                return (
                  <TableCell key={`novel-${formulation.formulation_id}`} className="text-center">
                    <Badge variant={novel > 0 ? "default" : "outline"}>{novel}</Badge>
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Crops */}
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Target Crops</TableCell>
              {selectedFormulations.map((formulation) => {
                const crops = formulation.formulation_id ? getCropsList(formulation.formulation_id) : [];
                return (
                  <TableCell key={`crops-${formulation.formulation_id}`} className="text-center text-sm">
                    {crops.length > 0 ? (
                      <div className="space-y-1">
                        {crops.slice(0, 5).map((crop, idx) => (
                          <div key={idx}>{crop}</div>
                        ))}
                        {crops.length > 5 && (
                          <div className="text-xs text-muted-foreground">+{crops.length - 5} more</div>
                        )}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Business Case Year Breakdown */}
            <TableRow className="bg-muted/30">
              <TableCell className="font-semibold sticky left-0 bg-background z-10">Business Cases by Year</TableCell>
              {selectedFormulations.map((formulation) => {
                const breakdown = formulation.formulation_id ? getBusinessCaseYearBreakdown(formulation.formulation_id) : {};
                const sortedYears = Object.keys(breakdown).sort();
                return (
                  <TableCell key={`bcyears-${formulation.formulation_id}`} className="text-center text-xs">
                    {sortedYears.length > 0 ? (
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {sortedYears.slice(0, 5).map((year) => (
                          <div key={year} className="border-b pb-1">
                            <div className="font-medium">{year}</div>
                            <div className="text-muted-foreground">
                              {formatCurrency(breakdown[year].revenue)} rev
                            </div>
                            <div className="text-muted-foreground">
                              {breakdown[year].count} case{breakdown[year].count !== 1 ? "s" : ""}
                            </div>
                          </div>
                        ))}
                        {sortedYears.length > 5 && (
                          <div className="text-xs text-muted-foreground pt-1">
                            +{sortedYears.length - 5} more years
                          </div>
                        )}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>

            {/* COGS */}
            <TableRow className="bg-muted/30">
              <TableCell className="font-semibold sticky left-0 bg-background z-10">Latest COGS</TableCell>
              {selectedFormulations.map((formulation) => {
                const latestCOGS = formulation.formulation_id ? getLatestCOGS(formulation.formulation_id) : null;
                return (
                  <TableCell key={`latestcogs-${formulation.formulation_id}`} className="text-center font-semibold">
                    {latestCOGS ? formatCurrency(latestCOGS) : "—"}
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Counts */}
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Business Cases</TableCell>
              {selectedFormulations.map((formulation) => {
                const data = formulation.formulation_id ? comparisonData.get(formulation.formulation_id) : undefined;
                return (
                  <TableCell key={`bcs-${formulation.formulation_id}`} className="text-center">
                    {data?.businessCases.length || 0}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Countries</TableCell>
              {selectedFormulations.map((formulation) => {
                const data = formulation.formulation_id ? comparisonData.get(formulation.formulation_id) : undefined;
                return (
                  <TableCell key={`countries-${formulation.formulation_id}`} className="text-center">
                    {data?.countries.length || 0}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Use Groups</TableCell>
              {selectedFormulations.map((formulation) => {
                const data = formulation.formulation_id ? comparisonData.get(formulation.formulation_id) : undefined;
                return (
                  <TableCell key={`use-groups-${formulation.formulation_id}`} className="text-center">
                    {data?.useGroups.length || 0}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Total Ingredients</TableCell>
              {selectedFormulations.map((formulation) => {
                const data = formulation.formulation_id ? comparisonData.get(formulation.formulation_id) : undefined;
                return (
                  <TableCell key={`ingredients-${formulation.formulation_id}`} className="text-center">
                    {data?.ingredients.length || 0}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Active Ingredients Count</TableCell>
              {selectedFormulations.map((formulation) => {
                const actives = formulation.formulation_id ? getActiveIngredientsList(formulation.formulation_id) : [];
                return (
                  <TableCell key={`activecount-${formulation.formulation_id}`} className="text-center">
                    {actives.length}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">COGS Entries</TableCell>
              {selectedFormulations.map((formulation) => {
                const data = formulation.formulation_id ? comparisonData.get(formulation.formulation_id) : undefined;
                return (
                  <TableCell key={`cogs-${formulation.formulation_id}`} className="text-center">
                    {data?.cogs.length || 0}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

