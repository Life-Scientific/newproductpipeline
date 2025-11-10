"use client";

import { useState, useMemo } from "react";
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

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

interface FormulationComparisonProps {
  formulations: Formulation[];
}

interface ComparisonData {
  formulation: Formulation;
  businessCases: any[];
  ingredients: any[];
  countries: any[];
  labels: any[];
  cogs: any[];
}

const MAX_COMPARISONS = 5;

function formatCurrency(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(0)}`;
}

function formatNumber(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  return value.toLocaleString();
}

export function FormulationComparison({ formulations }: FormulationComparisonProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<Map<string, ComparisonData>>(new Map());

  const selectedFormulations = useMemo(() => {
    return formulations.filter((f) => selectedIds.includes(f.formulation_id));
  }, [formulations, selectedIds]);

  const handleAddFormulation = async (formulationId: string) => {
    if (selectedIds.includes(formulationId) || selectedIds.length >= MAX_COMPARISONS) {
      return;
    }

    setSelectedIds([...selectedIds, formulationId]);

    // Fetch detailed data for the formulation using API route
    try {
      const [businessCasesRes, ingredientsRes, countriesRes, labelsRes, cogsRes] = await Promise.all([
        fetch(`/api/formulations/${formulationId}/business-cases`).catch(() => null),
        fetch(`/api/formulations/${formulationId}/ingredients`).catch(() => null),
        fetch(`/api/formulations/${formulationId}/countries`).catch(() => null),
        fetch(`/api/formulations/${formulationId}/labels`).catch(() => null),
        fetch(`/api/formulations/${formulationId}/cogs`).catch(() => null),
      ]);

      const businessCases = businessCasesRes?.ok ? await businessCasesRes.json() : [];
      const ingredients = ingredientsRes?.ok ? await ingredientsRes.json() : [];
      const countries = countriesRes?.ok ? await countriesRes.json() : [];
      const labels = labelsRes?.ok ? await labelsRes.json() : [];
      const cogs = cogsRes?.ok ? await cogsRes.json() : [];

      const formulation = formulations.find((f) => f.formulation_id === formulationId);
      
      if (formulation) {
        setComparisonData((prev) => {
          const next = new Map(prev);
          next.set(formulationId, {
            formulation,
            businessCases,
            ingredients,
            countries,
            labels,
            cogs,
          });
          return next;
        });
      }
    } catch (error) {
      console.error("Error fetching formulation data:", error);
    }
  };

  const handleRemoveFormulation = (formulationId: string) => {
    setSelectedIds(selectedIds.filter((id) => id !== formulationId));
    setComparisonData((prev) => {
      const next = new Map(prev);
      next.delete(formulationId);
      return next;
    });
  };

  const availableFormulations = formulations.filter(
    (f) => !selectedIds.includes(f.formulation_id)
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
                {formulations.map((formulation) => (
                  <SelectItem key={formulation.formulation_id} value={formulation.formulation_id}>
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
                  href={`/formulations/${formulation.formulation_id}`}
                  className="hover:underline"
                >
                  {formulation.formulation_code || formulation.product_name}
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleRemoveFormulation(formulation.formulation_id)}
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
                {availableFormulations.map((formulation) => (
                  <SelectItem key={formulation.formulation_id} value={formulation.formulation_id}>
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
                      href={`/formulations/${formulation.formulation_id}`}
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

            {/* Financial Metrics */}
            <TableRow className="bg-muted/30">
              <TableCell className="font-semibold sticky left-0 bg-background z-10">Total Revenue</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`revenue-${formulation.formulation_id}`} className="text-center font-semibold">
                  {formatCurrency(getTotalRevenue(formulation.formulation_id))}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-muted/30">
              <TableCell className="font-semibold sticky left-0 bg-background z-10">Total Margin</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`margin-${formulation.formulation_id}`} className="text-center font-semibold">
                  {formatCurrency(getTotalMargin(formulation.formulation_id))}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Avg Margin %</TableCell>
              {selectedFormulations.map((formulation) => (
                <TableCell key={`marginpct-${formulation.formulation_id}`} className="text-center">
                  <Badge
                    variant={
                      getAvgMarginPercent(formulation.formulation_id) >= 50
                        ? "default"
                        : getAvgMarginPercent(formulation.formulation_id) >= 30
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {getAvgMarginPercent(formulation.formulation_id).toFixed(1)}%
                  </Badge>
                </TableCell>
              ))}
            </TableRow>

            {/* Counts */}
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Business Cases</TableCell>
              {selectedFormulations.map((formulation) => {
                const data = comparisonData.get(formulation.formulation_id);
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
                const data = comparisonData.get(formulation.formulation_id);
                return (
                  <TableCell key={`countries-${formulation.formulation_id}`} className="text-center">
                    {data?.countries.length || 0}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Labels</TableCell>
              {selectedFormulations.map((formulation) => {
                const data = comparisonData.get(formulation.formulation_id);
                return (
                  <TableCell key={`labels-${formulation.formulation_id}`} className="text-center">
                    {data?.labels.length || 0}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Ingredients</TableCell>
              {selectedFormulations.map((formulation) => {
                const data = comparisonData.get(formulation.formulation_id);
                return (
                  <TableCell key={`ingredients-${formulation.formulation_id}`} className="text-center">
                    {data?.ingredients.length || 0}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">Active Ingredients</TableCell>
              {selectedFormulations.map((formulation) => {
                const data = comparisonData.get(formulation.formulation_id);
                const activeCount = data?.ingredients.filter(
                  (ing: any) => ing.ingredients?.ingredient_type === "Active"
                ).length || 0;
                return (
                  <TableCell key={`active-${formulation.formulation_id}`} className="text-center">
                    {activeCount}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">COGS Entries</TableCell>
              {selectedFormulations.map((formulation) => {
                const data = comparisonData.get(formulation.formulation_id);
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

