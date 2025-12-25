"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Formulation, ComparisonData } from "./comparison-utils";
import { MAX_COMPARISONS } from "./comparison-utils";
import { calculateMetrics } from "./comparison-utils";
import { ComparisonChart } from "./ComparisonChart";
import { ComparisonFilters } from "./ComparisonFilters";
import { ComparisonDataTable } from "./ComparisonDataTable";
import { ComparisonSummary } from "./ComparisonSummary";
import { useFormulationCompleteData } from "@/lib/queries/formulations";

interface FormulationComparisonProps {
  formulations: Formulation[];
}

export function FormulationComparison({
  formulations,
}: FormulationComparisonProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<
    Map<string, ComparisonData>
  >(new Map());

  const selectedFormulations = useMemo(() => {
    return formulations.filter(
      (f) => f.formulation_id && selectedIds.includes(f.formulation_id),
    );
  }, [formulations, selectedIds]);

  const availableFormulations = formulations.filter(
    (f) => !f.formulation_id || !selectedIds.includes(f.formulation_id),
  );

  const handleAddFormulation = useCallback(
    (formulationId: string) => {
      if (
        selectedIds.includes(formulationId) ||
        selectedIds.length >= MAX_COMPARISONS
      ) {
        return;
      }

      setSelectedIds((prev) => [...prev, formulationId]);
    },
    [selectedIds],
  );

  // Use React Query to fetch data for each selected formulation
  // This provides automatic caching, deduplication, and loading states
  const formulationQueries = selectedIds.map((id) => ({
    id,
    data: useFormulationCompleteData(id),
  }));

  // Update comparison data when query data changes
  useEffect(() => {
    formulationQueries.forEach(({ id, data }) => {
      if (!data.isLoading && !data.isError) {
        const formulation = formulations.find((f) => f.formulation_id === id);
        if (formulation) {
          setComparisonData((prev) => {
            const next = new Map(prev);
            next.set(id, {
              formulation,
              businessCases: data.businessCases,
              ingredients: data.ingredients,
              countries: data.countries,
              useGroups: data.useGroups,
              cogs: data.cogs,
              protectionStatus: data.protection,
              statusHistory: data.statusHistory,
            });
            return next;
          });
        }
      }
    });
  }, [formulationQueries.map(q => q.data.isLoading).join(','), formulations]);

  const handleRemoveFormulation = useCallback(
    (formulationId: string) => {
      setSelectedIds(selectedIds.filter((id) => id !== formulationId));
      setComparisonData((prev) => {
        const next = new Map(prev);
        next.delete(formulationId);
        return next;
      });
    },
    [selectedIds],
  );

  const metricsByFormulation = useMemo(() => {
    const result: Record<string, ReturnType<typeof calculateMetrics>> = {};
    for (const [id, data] of comparisonData.entries()) {
      result[id] = calculateMetrics(data);
    }
    return result;
  }, [comparisonData]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const formulationNames = selectedFormulations.map(
    (f) => f.formulation_code || f.product_name || "",
  );

  if (selectedFormulations.length === 0) {
    return (
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">
            Select Formulations to Compare
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Choose up to {MAX_COMPARISONS} formulations to compare side-by-side
          </p>
          <div className="space-y-4">
            <Select onValueChange={handleAddFormulation} value="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a formulation to add..." />
              </SelectTrigger>
              <SelectContent>
                {formulations
                  .filter((formulation) => formulation.formulation_id)
                  .map((formulation) => (
                    <SelectItem
                      key={formulation.formulation_id!}
                      value={formulation.formulation_id!}
                    >
                      {formulation.formulation_code || formulation.product_name}{" "}
                      - {formulation.product_name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Select formulations from the dropdown above to start comparing.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <ComparisonFilters
        selectedFormulations={selectedFormulations}
        availableFormulations={availableFormulations}
        onAddFormulation={handleAddFormulation}
        onRemoveFormulation={handleRemoveFormulation}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedFormulations.map((formulation) => {
          const metrics =
            metricsByFormulation[formulation.formulation_id || ""];
          return metrics ? (
            <div
              key={formulation.formulation_id}
              className="border rounded-lg p-4"
            >
              <ComparisonSummary
                formulationId={formulation.formulation_id || ""}
                formulationCode={formulation.formulation_code}
                productName={formulation.product_name}
                metrics={metrics}
                formatCurrency={formatCurrency}
              />
            </div>
          ) : null;
        })}
      </div>

      <ComparisonChart
        formulationNames={formulationNames}
        metricsByFormulation={metricsByFormulation}
      />

      <ComparisonDataTable
        formulations={selectedFormulations}
        metricsByFormulation={metricsByFormulation}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}
