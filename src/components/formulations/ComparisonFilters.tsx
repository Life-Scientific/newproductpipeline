"use client";

import { memo } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import type { Formulation } from "./comparison-utils";
import { MAX_COMPARISONS } from "./comparison-utils";

interface ComparisonFiltersProps {
  selectedFormulations: Formulation[];
  availableFormulations: Formulation[];
  onAddFormulation: (formulationId: string) => void;
  onRemoveFormulation: (formulationId: string) => void;
}

export const ComparisonFilters = memo(
  ({
    selectedFormulations,
    availableFormulations,
    onAddFormulation,
    onRemoveFormulation,
  }: ComparisonFiltersProps) => {
    return (
      <div className="border rounded-lg bg-card p-4">
        <div className="mb-4">
          <h3 className="font-semibold text-sm">
            Selected Formulations ({selectedFormulations.length}/
            {MAX_COMPARISONS})
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Add or remove formulations from comparison
          </p>
        </div>
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
                onClick={() =>
                  formulation.formulation_id &&
                  onRemoveFormulation(formulation.formulation_id)
                }
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        {selectedFormulations.length < MAX_COMPARISONS && (
          <Select onValueChange={onAddFormulation} value="">
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Add another formulation..." />
            </SelectTrigger>
            <SelectContent>
              {availableFormulations
                .filter((formulation) => formulation.formulation_id)
                .map((formulation) => (
                  <SelectItem
                    key={formulation.formulation_id!}
                    value={formulation.formulation_id!}
                  >
                    {formulation.formulation_code || formulation.product_name} -{" "}
                    {formulation.product_name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      </div>
    );
  },
);

ComparisonFilters.displayName = "ComparisonFilters";
