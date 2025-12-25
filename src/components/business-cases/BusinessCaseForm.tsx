"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type BusinessCaseFormDataInput,
  businessCaseFormDataSchema,
} from "@/lib/schemas/business-cases";
import type { Database } from "@/lib/supabase/database.types";

type Formulation =
  | Database["public"]["Tables"]["formulations"]["Row"]
  | Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];

interface UseGroupOption {
  id: string;
  variant: string;
  name: string | null;
  targetMarketEntry: string | null;
}

interface BusinessCaseFormProps {
  countries: Country[];
  formulations: Formulation[];
  useGroupOptions: UseGroupOption[];
  targetMarketEntry: string | null;
  targetEntryError: string | null;
  onNext: () => void;
  onBack?: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export function BusinessCaseForm({
  countries,
  formulations,
  useGroupOptions,
  targetMarketEntry,
  targetEntryError,
  onNext,
  onBack,
  onCancel,
  disabled = false,
}: BusinessCaseFormProps) {
  const form = useForm<BusinessCaseFormDataInput>({
    resolver: zodResolver(businessCaseFormDataSchema),
    defaultValues: {
      formulation_id: "",
      country_id: "",
      use_group_ids: [],
      business_case_name: "",
      change_reason: "",
    },
    mode: "onBlur",
  });

  const selectedFormulation = formulations.find(
    (f) => f.formulation_id === form.watch("formulation_id"),
  );

  const getFormulationName = (f: Formulation) => {
    if ("product_name" in f) return f.product_name || f.formulation_code || "";
    return f.formulation_name || f.formulation_code || "";
  };

  const handleUseGroupToggle = (useGroupId: string) => {
    const currentIds = form.getValues("use_group_ids");
    const newIds = currentIds.includes(useGroupId)
      ? currentIds.filter((id) => id !== useGroupId)
      : [...currentIds, useGroupId];
    form.setValue("use_group_ids", newIds);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              1
            </span>
            Country <span className="text-destructive">*</span>
          </Label>
          <Select
            value={form.watch("country_id")}
            onValueChange={(value) => {
              form.setValue("country_id", value);
              form.setValue("formulation_id", "");
              form.setValue("use_group_ids", []);
            }}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country..." />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {countries.map((c) => (
                <SelectItem key={c.country_id} value={c.country_id}>
                  <div className="flex items-center gap-2">
                    <span>{c.country_name}</span>
                    {c.currency_code && (
                      <span className="text-xs text-muted-foreground">
                        ({c.currency_code})
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.country_id && (
            <p className="text-xs text-destructive">
              {form.formState.errors.country_id.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              2
            </span>
            Formulation <span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder={
              !form.watch("country_id")
                ? "Select country first"
                : "Search formulations by name, code, or ingredients..."
            }
            value={
              selectedFormulation ? getFormulationName(selectedFormulation) : ""
            }
            disabled={disabled || !form.watch("country_id")}
            onChange={(e) => {
              if (!e.target.value) {
                form.setValue("formulation_id", "");
              }
            }}
          />
          {form.formState.errors.formulation_id && (
            <p className="text-xs text-destructive">
              {form.formState.errors.formulation_id.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              3
            </span>
            Use Group <span className="text-destructive">*</span>
          </Label>
          {!form.watch("country_id") || !form.watch("formulation_id") ? (
            <div className="px-3 py-4 border rounded-md bg-muted/30 text-sm text-muted-foreground text-center">
              Select country and formulation first
            </div>
          ) : useGroupOptions.length === 0 ? (
            <div className="px-3 py-4 border rounded-md bg-amber-50 dark:bg-amber-950/30 text-sm text-amber-700 dark:text-amber-300 text-center">
              No use groups available for this combination
            </div>
          ) : (
            <div className="space-y-2 max-h-[250px] overflow-y-auto border rounded-md p-2">
              {useGroupOptions.map((ug) => {
                const isSelected = form.watch("use_group_ids").includes(ug.id);
                return (
                  <button
                    key={ug.id}
                    type="button"
                    className={`w-full text-left p-3 rounded-md border transition-all hover:shadow-sm ${
                      isSelected
                        ? "ring-2 ring-primary bg-primary/5"
                        : "bg-background"
                    }`}
                    onClick={() => handleUseGroupToggle(ug.id)}
                    disabled={disabled}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center ${
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-input"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            role="img"
                            aria-label="Selected"
                            className="h-3 w-3 text-primary-foreground"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs bg-secondary px-2 py-0.5 rounded">
                            {ug.variant}
                          </span>
                          {ug.name && (
                            <span className="font-medium text-sm truncate">
                              {ug.name}
                            </span>
                          )}
                        </div>
                        {ug.targetMarketEntry && (
                          <div className="mt-1.5 text-xs text-muted-foreground">
                            Effective FY Start: {ug.targetMarketEntry}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          {form.formState.errors.use_group_ids && (
            <p className="text-xs text-destructive">
              {form.formState.errors.use_group_ids.message}
            </p>
          )}
        </div>

        {form.watch("use_group_ids").length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Effective Fiscal Year Start
            </Label>
            {targetMarketEntry ? (
              <div className="px-4 py-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  {targetMarketEntry}
                </span>
              </div>
            ) : (
              <div className="px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md text-sm text-amber-700 dark:text-amber-300">
                Selected use groups do not have effective fiscal year start set
              </div>
            )}
            {targetEntryError && (
              <p className="text-xs text-destructive">{targetEntryError}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm font-medium">Business Case Name</Label>
          <Input
            placeholder="Optional: Give this business case a descriptive name"
            {...form.register("business_case_name")}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        {onBack && (
          <Button variant="outline" onClick={onBack} disabled={disabled}>
            ← Back
          </Button>
        )}
        <Button variant="outline" onClick={onCancel} disabled={disabled}>
          Cancel
        </Button>
        <Button
          onClick={onNext}
          disabled={disabled || !!targetEntryError || !targetMarketEntry}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
