"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { 
  createBusinessCaseGroupAction,
  checkExistingBusinessCaseAction,
  getFormulationsAction,
  getCountriesAction,
} from "@/lib/actions/business-cases";
import { createClient } from "@/lib/supabase/client";
import { MultiSelect, type MultiSelectOption } from "@/components/ui/multi-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Formulation, Country } from "@/lib/supabase/database.types";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";

interface BusinessCaseCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function BusinessCaseCreateModal({
  open,
  onOpenChange,
  onSuccess,
}: BusinessCaseCreateModalProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<"select" | "data">("select");
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [allFormulations, setAllFormulations] = useState<Formulation[]>([]); // Store all formulations for filtering
  const [countries, setCountries] = useState<Country[]>([]);
  const [useGroupOptions, setUseGroupOptions] = useState<MultiSelectOption[]>([]);
  
  const [formData, setFormData] = useState({
    formulation_id: "",
    country_id: "",
    use_group_ids: [] as string[],
    business_case_name: "",
  });

  const [yearData, setYearData] = useState<Record<number, { volume: string; nsp: string }>>({});
  const [existingGroupId, setExistingGroupId] = useState<string | null>(null);
  const [targetMarketEntry, setTargetMarketEntry] = useState<string | null>(null);
  const [targetEntryError, setTargetEntryError] = useState<string | null>(null);

  // Load formulations and countries when modal opens
  useEffect(() => {
    if (open) {
      Promise.all([getFormulationsAction(), getCountriesAction()])
        .then(([formResult, countryResult]) => {
          if (formResult.error) {
            toast({
              title: "Error",
              description: formResult.error,
              variant: "destructive",
            });
            return;
          }
          if (countryResult.error) {
            toast({
              title: "Error",
              description: countryResult.error,
              variant: "destructive",
            });
            return;
          }
          if (formResult.data) {
            setAllFormulations(formResult.data);
            setFormulations(formResult.data); // Initially show all formulations
          }
          if (countryResult.data) setCountries(countryResult.data);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: `Failed to load data: ${error.message}`,
            variant: "destructive",
          });
        });
    }
  }, [open, toast]);

  // Filter formulations by selected country
  useEffect(() => {
    if (formData.country_id) {
      const supabase = createClient();
      
      // Get formulation_ids for this country
      supabase
        .from("formulation_country")
        .select("formulation_id")
        .eq("country_id", formData.country_id)
        .eq("is_active", true)
        .then(({ data: fcData, error }) => {
          if (error) {
            console.error("Failed to load formulation countries:", error);
            setFormulations([]);
            return;
          }

          if (fcData && fcData.length > 0) {
            const formulationIds = fcData.map(fc => fc.formulation_id).filter(Boolean) as string[];
            // Filter formulations to only show those available for this country
            const filteredFormulations = allFormulations.filter(f => 
              formulationIds.includes(f.formulation_id)
            );
            setFormulations(filteredFormulations);
          } else {
            setFormulations([]);
          }
        });
    } else {
      // No country selected, show all formulations
      setFormulations(allFormulations);
    }
  }, [formData.country_id, allFormulations]);

  // Load use groups when formulation and country are selected
  useEffect(() => {
    if (formData.formulation_id && formData.country_id) {
      const supabase = createClient();
      
      // Find formulation_country_id
      supabase
        .from("formulation_country")
        .select("formulation_country_id")
        .eq("formulation_id", formData.formulation_id)
        .eq("country_id", formData.country_id)
        .single()
        .then(({ data: fcData }) => {
          if (fcData?.formulation_country_id) {
            // Get use groups for this formulation_country
            return supabase
              .from("formulation_country_use_group")
              .select("formulation_country_use_group_id, use_group_name, use_group_variant, target_market_entry_fy")
              .eq("formulation_country_id", fcData.formulation_country_id)
              .eq("is_active", true);
          }
          return { data: null, error: null };
        })
        .then(({ data: useGroups, error }) => {
          if (error) {
            console.error("Failed to load use groups:", error);
            return;
          }

          if (useGroups) {
            const options: MultiSelectOption[] = useGroups.map((ug) => ({
              value: ug.formulation_country_use_group_id,
              label: ug.use_group_name
                ? `${ug.use_group_variant} - ${ug.use_group_name}`
                : ug.use_group_variant,
            }));
            setUseGroupOptions(options);
          }
        });
    } else {
      setUseGroupOptions([]);
      setTargetMarketEntry(null);
      setTargetEntryError(null);
    }
  }, [formData.formulation_id, formData.country_id]);

  // Validate target_market_entry_fy when use groups are selected
  useEffect(() => {
    if (formData.use_group_ids.length === 0) {
      setTargetMarketEntry(null);
      setTargetEntryError(null);
      return;
    }

    const supabase = createClient();
    
    // Fetch target_market_entry_fy for all selected use groups
    supabase
      .from("formulation_country_use_group")
      .select("formulation_country_use_group_id, target_market_entry_fy")
      .in("formulation_country_use_group_id", formData.use_group_ids)
      .then(({ data: useGroups, error }) => {
        if (error) {
          setTargetEntryError(`Failed to fetch use groups: ${error.message}`);
          setTargetMarketEntry(null);
          return;
        }

        if (!useGroups || useGroups.length === 0) {
          setTargetEntryError("No use groups found");
          setTargetMarketEntry(null);
          return;
        }

        // Get unique non-null target_market_entry_fy values
        const targetEntries = useGroups
          .map(ug => ug.target_market_entry_fy)
          .filter((entry): entry is string => entry !== null && entry !== undefined);

        if (targetEntries.length === 0) {
          setTargetEntryError("Selected use groups do not have target market entry fiscal year set");
          setTargetMarketEntry(null);
          return;
        }

        // Check if all values are the same
        const uniqueEntries = Array.from(new Set(targetEntries));
        
        if (uniqueEntries.length > 1) {
          setTargetEntryError(`All selected use groups must have the same target market entry fiscal year. Found values: ${uniqueEntries.join(", ")}`);
          setTargetMarketEntry(null);
        } else {
          setTargetMarketEntry(uniqueEntries[0]);
          setTargetEntryError(null);
        }
      });
  }, [formData.use_group_ids]);

  // Handle Next button - check for existing business case
  const handleNext = async () => {
    if (!formData.country_id || !formData.formulation_id || formData.use_group_ids.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select country, formulation, and at least one use group",
        variant: "destructive",
      });
      return;
    }

    // Validate target_market_entry_fy consistency
    if (targetEntryError) {
      toast({
        title: "Validation Error",
        description: targetEntryError,
        variant: "destructive",
      });
      return;
    }

    if (!targetMarketEntry) {
      toast({
        title: "Validation Error",
        description: "Selected use groups do not have target market entry fiscal year set",
        variant: "destructive",
      });
      return;
    }

    // Check if business case exists
    const result = await checkExistingBusinessCaseAction(
      formData.formulation_id,
      formData.country_id,
      formData.use_group_ids[0]
    );

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    if (result.data) {
      setExistingGroupId(result.data);
      toast({
        title: "Existing Business Case Found",
        description: "An existing business case was found. You can modify the values below.",
      });
    }

    setStep("data");
  };

  // Handle save
  const handleSave = () => {
    // Validate all 10 years have data
    const missingData: string[] = [];
    for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
      const year = yearData[yearOffset];
      if (!year || !year.volume || parseFloat(year.volume) <= 0) {
        missingData.push(`Year ${yearOffset}: Volume is required`);
      }
      if (!year || !year.nsp || parseFloat(year.nsp) <= 0) {
        missingData.push(`Year ${yearOffset}: NSP is required`);
      }
    }

    if (missingData.length > 0) {
      toast({
        title: "Validation Error",
        description: missingData.join("\n"),
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("formulation_id", formData.formulation_id);
      formDataToSubmit.append("country_id", formData.country_id);
      formData.use_group_ids.forEach((id) => {
        formDataToSubmit.append("use_group_ids", id);
      });
      // target_market_entry is now inherited from use groups, not submitted
      if (formData.business_case_name) {
        formDataToSubmit.append("business_case_name", formData.business_case_name);
      }

      // Add year data
      for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
        const year = yearData[yearOffset];
        formDataToSubmit.append(`year_${yearOffset}_volume`, year?.volume || "0");
        formDataToSubmit.append(`year_${yearOffset}_nsp`, year?.nsp || "0");
      }

      const result = await createBusinessCaseGroupAction(formDataToSubmit);

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Business case created successfully",
        });
        onOpenChange(false);
        if (onSuccess) onSuccess();
      }
    });
  };

  // Calculate fiscal year columns from inherited target_market_entry_fy
  // Note: The effective_start_fiscal_year will be calculated server-side at creation time
  // This preview uses the same logic for display purposes
  const fiscalYearColumns = (() => {
    if (!targetMarketEntry) return [];
    const match = targetMarketEntry.match(/FY(\d{2})/);
    if (!match) return [];
    const startYear = parseInt(match[1], 10);
    // Apply effective start year logic: if target < current FY, use current FY
    // This matches what will be stored as effective_start_fiscal_year
    const effectiveStartYear = startYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : startYear;
    return Array.from({ length: 10 }, (_, i) => ({
      yearOffset: i + 1,
      fiscalYear: `FY${String(effectiveStartYear + i).padStart(2, "0")}`,
    }));
  })();

  // Get UOM and currency
  const selectedFormulation = formulations.find((f) => f.formulation_id === formData.formulation_id);
  const selectedCountry = countries.find((c) => c.country_id === formData.country_id);
  const uom = selectedFormulation?.uom || "L";
  const currency = selectedCountry?.currency_code || "USD";

  // Calculate metrics helper function (similar to edit modal)
  const calculateMetrics = (yearOffset: number) => {
    const year = yearData[yearOffset];
    const volume = parseFloat(year?.volume || "0") || 0;
    const nsp = parseFloat(year?.nsp || "0") || 0;
    const cogs = 0; // COGS will be populated from database after creation

    const revenue = volume * nsp;
    const margin = revenue - volume * cogs;
    const marginPercent = revenue > 0 ? (margin / revenue) * 100 : 0;

    return {
      revenue,
      margin,
      marginPercent,
    };
  };

  // Calculate effective start fiscal year for display
  const effectiveStartFiscalYear = (() => {
    if (!targetMarketEntry) return null;
    const match = targetMarketEntry.match(/FY(\d{2})/);
    if (!match) return null;
    const startYear = parseInt(match[1], 10);
    const effectiveStartYear = startYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : startYear;
    return `FY${String(effectiveStartYear).padStart(2, "0")}`;
  })();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={step === "data" ? "max-w-[90vw] max-h-[90vh] overflow-y-auto" : "max-w-4xl max-h-[90vh] overflow-y-auto"}>
        <DialogHeader>
          <DialogTitle>Create/Update Business Case</DialogTitle>
        </DialogHeader>

        {step === "select" ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country_id">
                  Country <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.country_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, country_id: value, formulation_id: "", use_group_ids: [] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.country_id} value={c.country_id}>
                        {c.country_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="formulation_id">
                  Formulation <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.formulation_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, formulation_id: value, use_group_ids: [] })
                  }
                  disabled={!formData.country_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select formulation" />
                  </SelectTrigger>
                  <SelectContent>
                    {formulations.length === 0 && formData.country_id ? (
                      <SelectItem value="__no_formulations__" disabled>
                        No formulations available for this country
                      </SelectItem>
                    ) : (
                      formulations.map((f) => (
                        <SelectItem key={f.formulation_id} value={f.formulation_id}>
                          {f.product_name || f.formulation_code || f.formulation_id}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="use_group_ids">
                  Use Group <span className="text-destructive">*</span>
                </Label>
                <MultiSelect
                  options={useGroupOptions}
                  selected={formData.use_group_ids}
                  onChange={(selected) =>
                    setFormData({ ...formData, use_group_ids: selected })
                  }
                  placeholder="Select use groups"
                  disabled={!formData.country_id || !formData.formulation_id}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target_market_entry">
                  Target Market Entry <span className="text-destructive">*</span>
                </Label>
                <div className="flex flex-col gap-2">
                  {targetMarketEntry ? (
                    <div className="px-3 py-2 bg-muted rounded-md text-sm text-muted-foreground">
                      {targetMarketEntry}
                    </div>
                  ) : (
                    <div className="px-3 py-2 bg-muted rounded-md text-sm text-muted-foreground italic">
                      Select use groups to see target market entry
                    </div>
                  )}
                  {targetEntryError && (
                    <p className="text-sm text-destructive">{targetEntryError}</p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleNext} disabled={!!targetEntryError || !targetMarketEntry}>
                Next →
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-6">
            {existingGroupId && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded text-sm text-blue-900 dark:text-blue-100">
                ℹ️ Existing business case found for this combination. Current values are pre-populated. Modify any values you wish to update.
              </div>
            )}

            {/* Header with formulation details */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                {selectedFormulation?.formulation_name || "Formulation"} | {selectedCountry?.country_name || "Country"} | Target Market Entry: {targetMarketEntry}
                {effectiveStartFiscalYear && effectiveStartFiscalYear !== targetMarketEntry && (
                  <> | Effective Start: {effectiveStartFiscalYear}</>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Metric</TableHead>
                    {fiscalYearColumns.map((col) => (
                      <TableHead key={col.yearOffset} className="min-w-[120px] text-center">
                        {col.fiscalYear}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Volume row */}
                  <TableRow>
                    <TableCell className="font-medium">Volume ({uom})</TableCell>
                    {fiscalYearColumns.map((col) => (
                      <TableCell key={col.yearOffset} className="p-1">
                        <Input
                          type="number"
                          step="0.01"
                          value={yearData[col.yearOffset]?.volume || ""}
                          onChange={(e) =>
                            setYearData({
                              ...yearData,
                              [col.yearOffset]: {
                                ...yearData[col.yearOffset],
                                volume: e.target.value,
                                nsp: yearData[col.yearOffset]?.nsp || "",
                              },
                            })
                          }
                          className="h-9"
                          placeholder="0"
                        />
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* NSP row */}
                  <TableRow>
                    <TableCell className="font-medium">NSP ({currency}/unit)</TableCell>
                    {fiscalYearColumns.map((col) => (
                      <TableCell key={col.yearOffset} className="p-1">
                        <Input
                          type="number"
                          step="0.01"
                          value={yearData[col.yearOffset]?.nsp || ""}
                          onChange={(e) =>
                            setYearData({
                              ...yearData,
                              [col.yearOffset]: {
                                ...yearData[col.yearOffset],
                                volume: yearData[col.yearOffset]?.volume || "",
                                nsp: e.target.value,
                              },
                            })
                          }
                          className="h-9"
                          placeholder="0"
                        />
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* COGS row (read-only, will be auto-populated) */}
                  <TableRow>
                    <TableCell className="font-medium">COGS ({currency}/unit)</TableCell>
                    {fiscalYearColumns.map((col) => (
                      <TableCell key={col.yearOffset} className="p-1">
                        <Input
                          type="text"
                          value="Auto-populated"
                          disabled
                          className="h-9 bg-muted cursor-not-allowed opacity-70"
                        />
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Revenue row (calculated, read-only) */}
                  <TableRow>
                    <TableCell className="font-medium">Total Revenue ({currency})</TableCell>
                    {fiscalYearColumns.map((col) => {
                      const metrics = calculateMetrics(col.yearOffset);
                      return (
                        <TableCell key={col.yearOffset} className="p-1">
                          <Input
                            type="text"
                            value={metrics.revenue > 0 ? `$${metrics.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}
                            disabled
                            className="h-9 bg-muted cursor-not-allowed opacity-70"
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {/* Margin row (calculated, read-only) */}
                  <TableRow>
                    <TableCell className="font-medium">Total Gross Margin ({currency})</TableCell>
                    {fiscalYearColumns.map((col) => {
                      const metrics = calculateMetrics(col.yearOffset);
                      return (
                        <TableCell key={col.yearOffset} className="p-1">
                          <Input
                            type="text"
                            value={metrics.margin > 0 ? `$${metrics.margin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}
                            disabled
                            className="h-9 bg-muted cursor-not-allowed opacity-70"
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {/* Margin % row (calculated, read-only) */}
                  <TableRow>
                    <TableCell className="font-medium">Margin %</TableCell>
                    {fiscalYearColumns.map((col) => {
                      const metrics = calculateMetrics(col.yearOffset);
                      return (
                        <TableCell key={col.yearOffset} className="p-1">
                          <Input
                            type="text"
                            value={metrics.marginPercent > 0 ? `${metrics.marginPercent.toFixed(2)}%` : ""}
                            disabled
                            className="h-9 bg-muted cursor-not-allowed opacity-70"
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("select")} disabled={isPending}>
                ← Back
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

