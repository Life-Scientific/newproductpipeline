"use client";

import { useState, useEffect, useTransition, useMemo } from "react";
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
  getBusinessCaseGroupAction,
} from "@/lib/actions/business-cases";
import { useSupabase } from "@/hooks/use-supabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { GitBranch, Search, Calendar, Tag, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/lib/supabase/database.types";
type Formulation = Database["public"]["Tables"]["formulations"]["Row"] | Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import { getCurrencySymbol } from "@/lib/utils/currency";

// Use group with extended info for display
interface UseGroupOption {
  id: string;
  variant: string;
  name: string | null;
  targetMarketEntry: string | null;
}

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
  const supabase = useSupabase();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<"select" | "data">("select");
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [allFormulations, setAllFormulations] = useState<Formulation[]>([]); // Store all formulations for filtering
  const [countries, setCountries] = useState<Country[]>([]);
  const [useGroupOptions, setUseGroupOptions] = useState<UseGroupOption[]>([]);
  
  // Search state for formulation filter
  const [formulationSearch, setFormulationSearch] = useState("");
  
  const [formData, setFormData] = useState({
    formulation_id: "",
    country_id: "",
    use_group_ids: [] as string[],
    business_case_name: "",
  });

  const [yearData, setYearData] = useState<Record<number, { volume: string; nsp: string; cogs: string }>>({});
  const [existingGroupId, setExistingGroupId] = useState<string | null>(null);
  const [targetMarketEntry, setTargetMarketEntry] = useState<string | null>(null);
  const [targetEntryError, setTargetEntryError] = useState<string | null>(null);
  
  // Shadow data - previous version's values for comparison
  const [shadowData, setShadowData] = useState<Record<number, { volume: number | null; nsp: number | null; cogs: number | null }>>({});

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
            const formulationIds = fcData.map((fc: any) => fc.formulation_id).filter(Boolean) as string[];
            // Filter formulations to only show those available for this country
            const filteredFormulations = allFormulations.filter(f => 
              f.formulation_id && formulationIds.includes(f.formulation_id)
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
      // Find formulation_country_id
      supabase
        .from("formulation_country")
        .select("formulation_country_id")
        .eq("formulation_id", formData.formulation_id)
        .eq("country_id", formData.country_id)
        .single()
        .then(async ({ data: fcData, error: fcError }: any) => {
          if (fcError || !fcData?.formulation_country_id) {
            setUseGroupOptions([]);
            return;
          }
          
          // Get use groups for this formulation_country with extended info
          const { data: useGroups, error } = await supabase
            .from("formulation_country_use_group")
            .select("formulation_country_use_group_id, use_group_name, use_group_variant, target_market_entry_fy")
            .eq("formulation_country_id", fcData.formulation_country_id)
            .eq("is_active", true) as any;
          
          if (error) {
            console.error("Failed to load use groups:", error);
            setUseGroupOptions([]);
            return;
          }

          if (useGroups) {
            const options: UseGroupOption[] = useGroups.map((ug: any) => ({
              id: ug.formulation_country_use_group_id,
              variant: ug.use_group_variant || "A",
              name: ug.use_group_name || null,
              targetMarketEntry: ug.target_market_entry_fy || null,
            }));
            setUseGroupOptions(options);
          } else {
            setUseGroupOptions([]);
          }
        });
    } else {
      setUseGroupOptions([]);
      setTargetMarketEntry(null);
      setTargetEntryError(null);
    }
  }, [formData.formulation_id, formData.country_id]);

  // Filtered formulations based on search - fuzzy match on name and code
  // Note: View uses product_name for the formulation name
  const filteredFormulations = useMemo(() => {
    if (!formulationSearch.trim()) return formulations;
    
    const search = formulationSearch.toLowerCase().trim();
    return formulations.filter((f) => {
      const name = ("product_name" in f ? f.product_name : null) || "";
      const code = f.formulation_code || "";
      return (
        name.toLowerCase().includes(search) ||
        code.toLowerCase().includes(search)
      );
    });
  }, [formulations, formulationSearch]);

  // Validate target_market_entry_fy when use groups are selected
  useEffect(() => {
    if (formData.use_group_ids.length === 0) {
      setTargetMarketEntry(null);
      setTargetEntryError(null);
      return;
    }

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
        const targetEntries = (useGroups as any[])
          .map((ug: any) => ug.target_market_entry_fy)
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
      
      // Load existing business case data as shadow values
      const existingDataResult = await getBusinessCaseGroupAction(result.data);
      if (existingDataResult.data && existingDataResult.data.length > 0) {
        const shadow: Record<number, { volume: number | null; nsp: number | null; cogs: number | null }> = {};
        const prefill: Record<number, { volume: string; nsp: string; cogs: string }> = {};
        
        existingDataResult.data.forEach((year: any) => {
          shadow[year.year_offset] = {
            volume: year.volume,
            nsp: year.nsp,
            cogs: year.cogs_per_unit,
          };
          // Pre-fill with existing values
          prefill[year.year_offset] = {
            volume: year.volume?.toString() || "",
            nsp: year.nsp?.toString() || "",
            cogs: year.cogs_per_unit?.toString() || "",
          };
        });
        
        setShadowData(shadow);
        setYearData(prefill);
      }
      
      toast({
        title: "Existing Business Case Found",
        description: "Previous values are shown as reference. Modify and save to create a new version.",
      });
    } else {
      // Clear shadow data if no existing business case
      setShadowData({});
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

      // Add year data including COGS overrides
      for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
        const year = yearData[yearOffset];
        formDataToSubmit.append(`year_${yearOffset}_volume`, year?.volume || "0");
        formDataToSubmit.append(`year_${yearOffset}_nsp`, year?.nsp || "0");
        // Include COGS if user provided a manual override
        if (year?.cogs && parseFloat(year.cogs) > 0) {
          formDataToSubmit.append(`year_${yearOffset}_cogs`, year.cogs);
        }
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
          title: existingGroupId ? "New Version Created" : "Business Case Created",
          description: existingGroupId 
            ? "New version saved. Previous version has been archived." 
            : "Business case created successfully.",
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
  const currencySymbol = getCurrencySymbol(currency);

  // Calculate metrics helper function (similar to edit modal)
  const calculateMetrics = (yearOffset: number) => {
    const year = yearData[yearOffset];
    const volume = parseFloat(year?.volume || "0") || 0;
    const nsp = parseFloat(year?.nsp || "0") || 0;
    const cogs = parseFloat(year?.cogs || "0") || 0;

    const revenue = volume * nsp;
    const margin = revenue - volume * cogs;
    const marginPercent = revenue > 0 ? (margin / revenue) * 100 : 0;

    return {
      revenue,
      margin,
      marginPercent,
      cogs,
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
          <DialogTitle className="flex items-center gap-2">
            {existingGroupId ? "Create New Version" : "Create Business Case"}
            <Badge variant="outline" className="text-xs font-normal gap-1">
              <GitBranch className="h-3 w-3" />
              Version Controlled
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {step === "select" ? (
          <div className="space-y-6">
            <div className="space-y-5">
              {/* STEP 1: Country Selector */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                  Country <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.country_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, country_id: value, formulation_id: "", use_group_ids: [] })
                  }
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
                            <span className="text-xs text-muted-foreground">({c.currency_code})</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* STEP 2: Formulation Selector with fuzzy search */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                  Formulation <span className="text-destructive">*</span>
                </Label>
                
                {/* Search input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={!formData.country_id ? "Select country first..." : "Search by name or code..."}
                    value={formulationSearch}
                    onChange={(e) => setFormulationSearch(e.target.value)}
                    disabled={!formData.country_id}
                    className="pl-9"
                  />
                </div>
                
                {/* Formulation Select */}
                <Select
                  value={formData.formulation_id}
                  onValueChange={(value) => {
                    setFormData({ ...formData, formulation_id: value, use_group_ids: [] });
                    setFormulationSearch("");
                  }}
                  disabled={!formData.country_id}
                >
                  <SelectTrigger className={cn(!formData.country_id && "opacity-50")}>
                    {formData.formulation_id ? (
                      (() => {
                        const selectedFormulation = formulations.find(f => f.formulation_id === formData.formulation_id);
                        if (!selectedFormulation) return <SelectValue placeholder="Select formulation..." />;
                        const name = "product_name" in selectedFormulation ? selectedFormulation.product_name : null;
                        const code = selectedFormulation.formulation_code;
                        return (
                          <div className="flex items-center gap-2 text-left">
                            <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">
                              {name ? `${name} (${code})` : code || "Unknown"}
                            </span>
                          </div>
                        );
                      })()
                    ) : (
                      <SelectValue placeholder={
                        !formData.country_id 
                          ? "Select country first" 
                          : formulations.length === 0 
                            ? "No formulations available" 
                            : "Select formulation..."
                      } />
                    )}
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {filteredFormulations.length === 0 ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        {formulations.length === 0 
                          ? "No formulations available for this country"
                          : "No formulations match your search"}
                      </div>
                    ) : (
                      filteredFormulations.map((f) => {
                        const name = "product_name" in f ? f.product_name : null;
                        const code = f.formulation_code;
                        return (
                          <SelectItem key={f.formulation_id || ""} value={f.formulation_id || ""}>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="font-medium">{name ? `${name} (${code})` : code || "Unknown"}</span>
                              {f.uom && (
                                <Badge variant="secondary" className="text-xs ml-2">
                                  {f.uom}
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        );
                      })
                    )}
                  </SelectContent>
                </Select>
                
                {formData.country_id && formulations.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {filteredFormulations.length === formulations.length 
                      ? `${formulations.length} formulation${formulations.length !== 1 ? "s" : ""} available`
                      : `${filteredFormulations.length} of ${formulations.length} formulations shown`}
                  </p>
                )}
              </div>

              {/* STEP 3: Use Group Selector with rich info */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                  Use Group <span className="text-destructive">*</span>
                </Label>
                
                {!formData.country_id || !formData.formulation_id ? (
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
                      const isSelected = formData.use_group_ids.includes(ug.id);
                      return (
                        <Card 
                          key={ug.id}
                          className={cn(
                            "cursor-pointer transition-all hover:shadow-sm",
                            isSelected && "ring-2 ring-primary bg-primary/5"
                          )}
                          onClick={() => {
                            const newSelected = isSelected
                              ? formData.use_group_ids.filter((id) => id !== ug.id)
                              : [...formData.use_group_ids, ug.id];
                            setFormData({ ...formData, use_group_ids: newSelected });
                          }}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              <Checkbox 
                                checked={isSelected}
                                className="mt-0.5"
                                onCheckedChange={(checked) => {
                                  const newSelected = checked
                                    ? [...formData.use_group_ids, ug.id]
                                    : formData.use_group_ids.filter((id) => id !== ug.id);
                                  setFormData({ ...formData, use_group_ids: newSelected });
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge variant="outline" className="font-mono">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {ug.variant}
                                  </Badge>
                                  {ug.name && (
                                    <span className="font-medium text-sm truncate">{ug.name}</span>
                                  )}
                                </div>
                                {ug.targetMarketEntry && (
                                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>Target Market Entry:</span>
                                    <Badge variant="secondary" className="text-xs font-medium">
                                      {ug.targetMarketEntry}
                                    </Badge>
                                  </div>
                                )}
                                {!ug.targetMarketEntry && (
                                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                                    <Calendar className="h-3 w-3" />
                                    <span>No target market entry set</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
                
                {formData.use_group_ids.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {formData.use_group_ids.length} use group{formData.use_group_ids.length !== 1 ? "s" : ""} selected
                  </p>
                )}
              </div>

              {/* Target Market Entry Summary */}
              {formData.use_group_ids.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Target Market Entry Summary</Label>
                  <div className="flex flex-col gap-2">
                    {targetMarketEntry ? (
                      <div className="px-4 py-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            {targetMarketEntry}
                          </span>
                          {effectiveStartFiscalYear && effectiveStartFiscalYear !== targetMarketEntry && (
                            <Badge variant="outline" className="text-xs ml-auto">
                              Effective: {effectiveStartFiscalYear}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md text-sm text-amber-700 dark:text-amber-300">
                        Selected use groups do not have target market entry fiscal year set
                      </div>
                    )}
                    {targetEntryError && (
                      <div className="px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                        {targetEntryError}
                      </div>
                    )}
                  </div>
                </div>
              )}
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
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded text-sm text-blue-900 dark:text-blue-100 flex items-start gap-2">
                <GitBranch className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Existing business case found.</strong> Saving will create a new version and archive the current one. 
                  Previous versions are preserved in history for audit tracking.
                </div>
              </div>
            )}

            {/* Header with formulation details */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                {selectedFormulation && "product_name" in selectedFormulation ? selectedFormulation.product_name : selectedFormulation?.formulation_code || "Formulation"} | {selectedCountry?.country_name || "Country"} | Target Market Entry: {targetMarketEntry}
                {effectiveStartFiscalYear && effectiveStartFiscalYear !== targetMarketEntry && (
                  <> | Effective Start: {effectiveStartFiscalYear}</>
                )}
              </div>
            </div>

            {/* Shadow values legend */}
            {existingGroupId && Object.keys(shadowData).length > 0 && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground bg-muted/30 rounded-md px-3 py-2">
                <span className="font-medium">Previous version reference:</span>
                <span className="text-purple-600 dark:text-purple-400">Purple text = previous value</span>
              </div>
            )}

            {/* Mobile/Tablet: Card-based vertical layout */}
            <div className="block xl:hidden space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {fiscalYearColumns.map((col) => {
                  const metrics = calculateMetrics(col.yearOffset);
                  const shadow = shadowData[col.yearOffset];
                  const hasShadow = shadow && existingGroupId;
                  
                  return (
                    <Card key={col.yearOffset} className="overflow-hidden">
                      <div className="bg-muted/50 px-3 py-2 border-b">
                        <span className="font-semibold text-sm">{col.fiscalYear}</span>
                      </div>
                      <CardContent className="p-3 space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs text-muted-foreground">Volume ({uom})</Label>
                            {hasShadow && shadow.volume !== null && (
                              <span className="text-[10px] text-purple-600 dark:text-purple-400">
                                was: {shadow.volume.toLocaleString()}
                              </span>
                            )}
                          </div>
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
                                  cogs: yearData[col.yearOffset]?.cogs || "",
                                },
                              })
                            }
                            className="h-8 text-sm"
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs text-muted-foreground">NSP ({currency})</Label>
                            {hasShadow && shadow.nsp !== null && (
                              <span className="text-[10px] text-purple-600 dark:text-purple-400">
                                was: {shadow.nsp.toFixed(2)}
                              </span>
                            )}
                          </div>
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
                                  cogs: yearData[col.yearOffset]?.cogs || "",
                                },
                              })
                            }
                            className="h-8 text-sm"
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs text-muted-foreground">COGS ({currency})</Label>
                            {hasShadow && shadow.cogs !== null && (
                              <span className="text-[10px] text-purple-600 dark:text-purple-400">
                                was: {shadow.cogs.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <Input
                            type="number"
                            step="0.01"
                            value={yearData[col.yearOffset]?.cogs || ""}
                            onChange={(e) =>
                              setYearData({
                                ...yearData,
                                [col.yearOffset]: {
                                  ...yearData[col.yearOffset],
                                  volume: yearData[col.yearOffset]?.volume || "",
                                  nsp: yearData[col.yearOffset]?.nsp || "",
                                  cogs: e.target.value,
                                },
                              })
                            }
                            className="h-8 text-sm"
                            placeholder="Auto or enter value"
                          />
                        </div>
                        <div className="pt-2 border-t space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Revenue</span>
                            <span className="font-medium">
                              {metrics.revenue > 0 ? `${currencySymbol}${metrics.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Margin</span>
                            <span className="font-medium">
                              {metrics.margin > 0 ? `${currencySymbol}${metrics.margin.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Margin %</span>
                            <span className="font-medium">
                              {metrics.marginPercent > 0 ? `${metrics.marginPercent.toFixed(1)}%` : "-"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Desktop: Traditional table layout with sticky first column */}
            <div className="hidden xl:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px] sticky left-0 bg-background z-10">Metric</TableHead>
                    {fiscalYearColumns.map((col) => (
                      <TableHead key={col.yearOffset} className="min-w-[100px] text-center">
                        {col.fiscalYear}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Shadow row for previous version - Volume */}
                  {existingGroupId && Object.keys(shadowData).length > 0 && (
                    <TableRow className="bg-purple-50/50 dark:bg-purple-950/20">
                      <TableCell className="text-xs text-purple-600 dark:text-purple-400 sticky left-0 bg-purple-50/50 dark:bg-purple-950/20 z-10">
                        Previous Volume
                      </TableCell>
                      {fiscalYearColumns.map((col) => {
                        const shadow = shadowData[col.yearOffset];
                        return (
                          <TableCell key={col.yearOffset} className="p-1 text-center text-xs text-purple-600 dark:text-purple-400">
                            {shadow?.volume?.toLocaleString() || "-"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  )}
                  
                  {/* Volume row */}
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Volume ({uom})</TableCell>
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
                                cogs: yearData[col.yearOffset]?.cogs || "",
                              },
                            })
                          }
                          className="h-8 text-sm"
                          placeholder="0"
                        />
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Shadow row for previous version - NSP */}
                  {existingGroupId && Object.keys(shadowData).length > 0 && (
                    <TableRow className="bg-purple-50/50 dark:bg-purple-950/20">
                      <TableCell className="text-xs text-purple-600 dark:text-purple-400 sticky left-0 bg-purple-50/50 dark:bg-purple-950/20 z-10">
                        Previous NSP
                      </TableCell>
                      {fiscalYearColumns.map((col) => {
                        const shadow = shadowData[col.yearOffset];
                        return (
                          <TableCell key={col.yearOffset} className="p-1 text-center text-xs text-purple-600 dark:text-purple-400">
                            {shadow?.nsp?.toFixed(2) || "-"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  )}

                  {/* NSP row */}
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">NSP ({currency}/unit)</TableCell>
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
                                cogs: yearData[col.yearOffset]?.cogs || "",
                              },
                            })
                          }
                          className="h-8 text-sm"
                          placeholder="0"
                        />
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Shadow row for previous version - COGS */}
                  {existingGroupId && Object.keys(shadowData).length > 0 && (
                    <TableRow className="bg-purple-50/50 dark:bg-purple-950/20">
                      <TableCell className="text-xs text-purple-600 dark:text-purple-400 sticky left-0 bg-purple-50/50 dark:bg-purple-950/20 z-10">
                        Previous COGS
                      </TableCell>
                      {fiscalYearColumns.map((col) => {
                        const shadow = shadowData[col.yearOffset];
                        return (
                          <TableCell key={col.yearOffset} className="p-1 text-center text-xs text-purple-600 dark:text-purple-400">
                            {shadow?.cogs?.toFixed(2) || "-"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  )}

                  {/* COGS row (editable) */}
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">
                      <div className="flex flex-col">
                        <span>COGS ({currency}/unit)</span>
                        <span className="text-xs text-muted-foreground font-normal">Optional override</span>
                      </div>
                    </TableCell>
                    {fiscalYearColumns.map((col) => (
                      <TableCell key={col.yearOffset} className="p-1">
                        <Input
                          type="number"
                          step="0.01"
                          value={yearData[col.yearOffset]?.cogs || ""}
                          onChange={(e) =>
                            setYearData({
                              ...yearData,
                              [col.yearOffset]: {
                                ...yearData[col.yearOffset],
                                volume: yearData[col.yearOffset]?.volume || "",
                                nsp: yearData[col.yearOffset]?.nsp || "",
                                cogs: e.target.value,
                              },
                            })
                          }
                          className="h-8 text-sm"
                          placeholder="Auto"
                        />
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Revenue row (calculated, read-only) */}
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Total Revenue ({currency})</TableCell>
                    {fiscalYearColumns.map((col) => {
                      const metrics = calculateMetrics(col.yearOffset);
                      return (
                        <TableCell key={col.yearOffset} className="p-1 text-center">
                          <span className="text-sm">
                            {metrics.revenue > 0 ? `${currencySymbol}${metrics.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                          </span>
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {/* Margin row (calculated, read-only) */}
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Gross Margin ({currency})</TableCell>
                    {fiscalYearColumns.map((col) => {
                      const metrics = calculateMetrics(col.yearOffset);
                      return (
                        <TableCell key={col.yearOffset} className="p-1 text-center">
                          <span className="text-sm">
                            {metrics.margin > 0 ? `${currencySymbol}${metrics.margin.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                          </span>
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {/* Margin % row (calculated, read-only) */}
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Margin %</TableCell>
                    {fiscalYearColumns.map((col) => {
                      const metrics = calculateMetrics(col.yearOffset);
                      return (
                        <TableCell key={col.yearOffset} className="p-1 text-center">
                          <span className="text-sm">
                            {metrics.marginPercent > 0 ? `${metrics.marginPercent.toFixed(1)}%` : "-"}
                          </span>
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
                {isPending ? "Saving..." : existingGroupId ? "Save New Version" : "Create Business Case"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

