"use client";

import { useState, useEffect, useTransition, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, GitBranch, Calendar, Tag, Package, Edit3, History, Search, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  createBusinessCaseGroupAction,
  updateBusinessCaseGroupAction,
  checkExistingBusinessCaseAction,
  getFormulationsAction,
  getCountriesAction,
  getBusinessCaseGroupAction,
} from "@/lib/actions/business-cases";
import { useSupabase } from "@/hooks/use-supabase";
import { usePermissions } from "@/hooks/use-permissions";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Database } from "@/lib/supabase/database.types";
import type { BusinessCaseYearData } from "@/lib/db/types";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import { BusinessCaseVersionHistory } from "./BusinessCaseVersionHistory";
import { formatVolumeInput, formatCurrencyInput, parseFormattedNumber } from "@/lib/utils/currency";

type Formulation = Database["public"]["Tables"]["formulations"]["Row"] | Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];

// Use group with extended info for display
interface UseGroupOption {
  id: string;
  variant: string;
  name: string | null;
  targetMarketEntry: string | null;
}

interface BusinessCaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  /** If provided, opens in edit mode for this group */
  groupId?: string | null;
}

export function BusinessCaseModal({
  open,
  onOpenChange,
  onSuccess,
  groupId,
}: BusinessCaseModalProps) {
  const { toast } = useToast();
  const supabase = useSupabase();
  const [isPending, startTransition] = useTransition();
  const { 
    preferences, currencySymbol, formatCurrency, 
    convertCurrency, convertVolume, convertWeight, convertPerUnit,
    toEUR, toLiters, toKG,
    isWetProduct, isDryProduct, getDisplayUnit
  } = useDisplayPreferences();
  
  // Mode: "select" for choosing country/formulation/use group, "data" for entering/editing year data
  const [step, setStep] = useState<"select" | "data">("select");
  const [loading, setLoading] = useState(false);
  
  // Selection data (for create flow)
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [allFormulations, setAllFormulations] = useState<Formulation[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [useGroupOptions, setUseGroupOptions] = useState<UseGroupOption[]>([]);
  
  // Search state
  const [formulationSearch, setFormulationSearch] = useState("");
  
  // Form data
  const [formData, setFormData] = useState({
    formulation_id: "",
    country_id: "",
    use_group_ids: [] as string[],
    business_case_name: "",
    change_reason: "",
  });
  
  // Year data - can be Record format (create) or array format (edit)
  const [yearDataRecord, setYearDataRecord] = useState<Record<number, { volume: string; nsp: string; cogs: string }>>({});
  const [yearDataArray, setYearDataArray] = useState<BusinessCaseYearData[]>([]);
  
  // Edit mode state
  const [existingGroupId, setExistingGroupId] = useState<string | null>(null);
  const [originalValues, setOriginalValues] = useState<Record<number, { volume: number | null; nsp: number | null; cogs: number | null }>>({});
  const [changedCells, setChangedCells] = useState<Set<string>>(new Set());
  
  // Validation
  const [targetMarketEntry, setTargetMarketEntry] = useState<string | null>(null);
  const [targetEntryError, setTargetEntryError] = useState<string | null>(null);
  
  // Shadow data - previous version's values for comparison
  const [shadowData, setShadowData] = useState<Record<number, { volume: number | null; nsp: number | null; cogs: number | null }>>({});
  
  // Use group ID for Version History (used in both create and edit flows)
  const [useGroupIdForHistory, setUseGroupIdForHistory] = useState<string | null>(null);
  
  const { canCreateBusinessCases, canEditBusinessCases, isLoading: permissionsLoading } = usePermissions();
  
  // Determine if we're in edit mode (have a groupId)
  const isEditMode = !!groupId;
  
  // Reset state when modal opens/closes or groupId changes
  useEffect(() => {
    if (open) {
      if (groupId) {
        // Edit mode - load existing data
        setStep("data");
        setLoading(true);
        setExistingGroupId(groupId);
        
        getBusinessCaseGroupAction(groupId)
          .then((result) => {
            if (result.error) {
              toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
              });
              onOpenChange(false);
              return;
            }
            if (result.data && result.data.length > 0) {
              setYearDataArray(result.data);
              
              // Store original values for change tracking
              const originals: Record<number, { volume: number | null; nsp: number | null; cogs: number | null }> = {};
              const shadow: Record<number, { volume: number | null; nsp: number | null; cogs: number | null }> = {};
              
              result.data.forEach((year) => {
                originals[year.year_offset] = {
                  volume: year.volume,
                  nsp: year.nsp,
                  cogs: year.cogs_per_unit,
                };
                shadow[year.year_offset] = {
                  volume: year.volume,
                  nsp: year.nsp,
                  cogs: year.cogs_per_unit,
                };
              });
              
              setOriginalValues(originals);
              setShadowData(shadow);
              setChangedCells(new Set());
              
              // Extract metadata from first year
              const firstYear = result.data[0];
              if (firstYear) {
                setTargetMarketEntry(firstYear.target_market_entry_fy || firstYear.effective_start_fiscal_year || null);
                // Store use group ID for Version History
                setUseGroupIdForHistory(firstYear.formulation_country_use_group_id || null);
                // Note: assumptions would need to be fetched separately or added to the view
              }
            }
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: `Failed to load business case: ${error.message}`,
              variant: "destructive",
            });
            onOpenChange(false);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        // Create mode - load selection data
        setStep("select");
        setExistingGroupId(null);
        setYearDataArray([]);
        setYearDataRecord({});
        setShadowData({});
        setOriginalValues({});
        setChangedCells(new Set());
        setUseGroupIdForHistory(null);
        setFormData({
          formulation_id: "",
          country_id: "",
          use_group_ids: [],
          business_case_name: "",
          change_reason: "",
        });
        
        Promise.all([getFormulationsAction(), getCountriesAction()])
          .then(([formResult, countryResult]) => {
            if (formResult.error) {
              toast({ title: "Error", description: formResult.error, variant: "destructive" });
              return;
            }
            if (countryResult.error) {
              toast({ title: "Error", description: countryResult.error, variant: "destructive" });
              return;
            }
            if (formResult.data) {
              setAllFormulations(formResult.data);
              setFormulations(formResult.data);
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
    } else {
      // Reset on close
      setStep("select");
      setLoading(false);
      setExistingGroupId(null);
      setYearDataArray([]);
      setYearDataRecord({});
      setShadowData({});
      setOriginalValues({});
      setChangedCells(new Set());
      setUseGroupIdForHistory(null);
      setTargetMarketEntry(null);
      setTargetEntryError(null);
    }
  }, [open, groupId, toast, onOpenChange]);

  // Filter formulations by selected country
  useEffect(() => {
    if (!isEditMode && formData.country_id) {
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
            const filteredFormulations = allFormulations.filter(f => 
              f.formulation_id && formulationIds.includes(f.formulation_id)
            );
            setFormulations(filteredFormulations);
          } else {
            setFormulations([]);
          }
        });
    } else if (!isEditMode) {
      setFormulations(allFormulations);
    }
  }, [formData.country_id, allFormulations, isEditMode]);

  // Load use groups when formulation and country are selected
  useEffect(() => {
    if (!isEditMode && formData.formulation_id && formData.country_id) {
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
    } else if (!isEditMode) {
      setUseGroupOptions([]);
      setTargetMarketEntry(null);
      setTargetEntryError(null);
    }
  }, [formData.formulation_id, formData.country_id, isEditMode]);

  // Validate target_market_entry_fy when use groups are selected
  useEffect(() => {
    if (isEditMode || formData.use_group_ids.length === 0) {
      if (!isEditMode) {
        setTargetMarketEntry(null);
        setTargetEntryError(null);
      }
      return;
    }

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

        const targetEntries = (useGroups as any[])
          .map((ug: any) => ug.target_market_entry_fy)
          .filter((entry): entry is string => entry !== null && entry !== undefined);

        if (targetEntries.length === 0) {
          setTargetEntryError("Selected use groups do not have effective fiscal year start set");
          setTargetMarketEntry(null);
          return;
        }

        const uniqueEntries = Array.from(new Set(targetEntries));
        
        if (uniqueEntries.length > 1) {
          setTargetEntryError(`All selected use groups must have the same effective fiscal year start. Found values: ${uniqueEntries.join(", ")}`);
          setTargetMarketEntry(null);
        } else {
          setTargetMarketEntry(uniqueEntries[0]);
          setTargetEntryError(null);
        }
      });
  }, [formData.use_group_ids, isEditMode]);

  // Filtered formulations based on search
  const filteredFormulations = useMemo(() => {
    if (!formulationSearch.trim()) return formulations;
    
    const search = formulationSearch.toLowerCase().trim();
    return formulations.filter((f) => {
      const name = ("product_name" in f ? f.product_name : null) || "";
      const code = f.formulation_code || "";
      const activeIngredients = ("active_ingredients" in f ? f.active_ingredients : null) || "";
      const category = ("product_category" in f ? f.product_category : null) || "";
      return (
        name.toLowerCase().includes(search) ||
        code.toLowerCase().includes(search) ||
        activeIngredients.toLowerCase().includes(search) ||
        category.toLowerCase().includes(search)
      );
    });
  }, [formulations, formulationSearch]);

  // Calculate fiscal year columns
  const fiscalYearColumns = useMemo(() => {
    if (isEditMode && yearDataArray.length > 0) {
      // Use effective_start_fiscal_year from loaded data
      const effectiveStart = yearDataArray[0]?.effective_start_fiscal_year;
      const match = effectiveStart?.match(/FY(\d{2})/);
      if (!match) return [];
      const startYear = parseInt(match[1], 10);
      return Array.from({ length: 10 }, (_, i) => ({
        yearOffset: i + 1,
        fiscalYear: `FY${String(startYear + i).padStart(2, "0")}`,
      }));
    } else if (targetMarketEntry) {
      const match = targetMarketEntry.match(/FY(\d{2})/);
      if (!match) return [];
      const startYear = parseInt(match[1], 10);
      const effectiveStartYear = startYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : startYear;
      return Array.from({ length: 10 }, (_, i) => ({
        yearOffset: i + 1,
        fiscalYear: `FY${String(effectiveStartYear + i).padStart(2, "0")}`,
      }));
    }
    return [];
  }, [isEditMode, yearDataArray, targetMarketEntry]);

  // Get metadata for display
  const selectedFormulation = formulations.find((f) => f.formulation_id === formData.formulation_id);
  const selectedCountry = countries.find((c) => c.country_id === formData.country_id);
  const uom = isEditMode ? (yearDataArray[0]?.uom || "L") : (selectedFormulation?.uom || "L");
  const formulationName = isEditMode ? (yearDataArray[0]?.formulation_name || "") : 
    (selectedFormulation && "product_name" in selectedFormulation ? selectedFormulation.product_name : selectedFormulation?.formulation_code || "");
  const countryName = isEditMode ? (yearDataArray[0]?.country_name || "") : (selectedCountry?.country_name || "");
  const useGroupName = isEditMode ? (yearDataArray[0]?.use_group_name || yearDataArray[0]?.use_group_variant || "") : "";

  // Handle Next button (create flow)
  const handleNext = async () => {
    if (!formData.country_id || !formData.formulation_id || formData.use_group_ids.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select country, formulation, and at least one use group",
        variant: "destructive",
      });
      return;
    }

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
        description: "Selected use groups do not have effective fiscal year start set",
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
          prefill[year.year_offset] = {
            volume: year.volume?.toString() || "",
            nsp: year.nsp?.toString() || "",
            cogs: year.cogs_per_unit?.toString() || "",
          };
        });
        
        setShadowData(shadow);
        setYearDataRecord(prefill);
        
        // Store use group ID for Version History
        const firstYear = existingDataResult.data[0];
        if (firstYear?.formulation_country_use_group_id) {
          setUseGroupIdForHistory(firstYear.formulation_country_use_group_id);
        }
      }
      
      toast({
        title: "Existing Business Case Found",
        description: "Previous values are shown as reference. Modify and save to create a new version.",
      });
    } else {
      setShadowData({});
    }

    setStep("data");
  };

  // Handle cell value change (edit mode)
  const handleCellChange = (yearOffset: number, field: "volume" | "nsp" | "cogs_per_unit", value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    
    setYearDataArray((prev) =>
      prev.map((year) =>
        year.year_offset === yearOffset
          ? { ...year, [field]: numValue }
          : year
      )
    );

    // Update change tracking
    const cellKey = `${yearOffset}_${field}`;
    const originalField = field === "cogs_per_unit" ? "cogs" : field;
    const original = originalValues[yearOffset]?.[originalField as "volume" | "nsp" | "cogs"];
    
    if (numValue !== original) {
      setChangedCells((prev) => new Set(prev).add(cellKey));
    } else {
      setChangedCells((prev) => {
        const next = new Set(prev);
        next.delete(cellKey);
        return next;
      });
    }
  };

  // Calculate metrics with currency conversion for display
  // Note: Data is stored in EUR, so we convert to user's preferred currency for display
  const calculateMetrics = (yearOffset: number) => {
    if (isEditMode) {
      const year = yearDataArray.find((y) => y.year_offset === yearOffset);
      const volumeEUR = year?.volume || 0;
      const nspEUR = year?.nsp || 0;
      const cogsEUR = year?.cogs_per_unit || 0;
      // Calculate in EUR first
      const revenueEUR = volumeEUR * nspEUR;
      const marginEUR = revenueEUR - volumeEUR * cogsEUR;
      const marginPercent = revenueEUR > 0 ? (marginEUR / revenueEUR) * 100 : 0;
      // Convert to user's preferred currency for display
      const revenue = convertCurrency(revenueEUR);
      const margin = convertCurrency(marginEUR);
      return { revenue, margin, marginPercent };
    } else {
      const year = yearDataRecord[yearOffset];
      const volumeEUR = parseFloat(year?.volume || "0") || 0;
      const nspEUR = parseFloat(year?.nsp || "0") || 0;
      const cogsEUR = parseFloat(year?.cogs || "0") || 0;
      // Calculate in EUR first
      const revenueEUR = volumeEUR * nspEUR;
      const marginEUR = revenueEUR - volumeEUR * cogsEUR;
      const marginPercent = revenueEUR > 0 ? (marginEUR / revenueEUR) * 100 : 0;
      // Convert to user's preferred currency for display
      const revenue = convertCurrency(revenueEUR);
      const margin = convertCurrency(marginEUR);
      return { revenue, margin, marginPercent };
    }
  };
  
  // Helper to convert volume/weight for display based on UOM
  const convertQuantityForDisplay = (value: number) => {
    const productIsWet = isWetProduct(uom);
    const productIsDry = isDryProduct(uom);
    if (productIsWet) return convertVolume(value);
    if (productIsDry) return convertWeight(value);
    return value;
  };
  
  // Helper to convert quantity back to base units (L/KG) for storage
  const convertQuantityToBase = (value: number) => {
    const productIsWet = isWetProduct(uom);
    const productIsDry = isDryProduct(uom);
    if (productIsWet) return toLiters(value);
    if (productIsDry) return toKG(value);
    return value;
  };
  
  // Helper to convert per-unit price for display (NSP, COGS)
  // EUR/L → USD/GAL (or whatever user prefers)
  const convertPerUnitForDisplay = (eurValue: number) => {
    return convertPerUnit(eurValue, uom);
  };
  
  // Helper to convert per-unit price back to EUR/base-unit for storage
  // USD/GAL → EUR/L (reverse of convertPerUnit)
  const convertPerUnitToBase = (userValue: number) => {
    // First convert currency: USD → EUR
    const eurValue = toEUR(userValue);
    // Then adjust for unit conversion (reverse the division that convertPerUnit does)
    const productIsWet = isWetProduct(uom);
    const productIsDry = isDryProduct(uom);
    const VOLUME_TO_GAL = 0.264172;
    const WEIGHT_TO_LB = 2.20462;
    
    if (productIsWet && preferences.volumeUnit === "GAL") {
      return eurValue * VOLUME_TO_GAL; // Reverse: multiply instead of divide
    }
    if (productIsDry && preferences.weightUnit === "LB") {
      return eurValue * WEIGHT_TO_LB; // Reverse: multiply instead of divide
    }
    return eurValue;
  };
  
  // Get the display unit based on UOM and user preferences
  const displayUnit = getDisplayUnit(uom);

  // Handle save
  const handleSave = () => {
    const hasRequiredPermission = existingGroupId || isEditMode ? canEditBusinessCases : canCreateBusinessCases;
    if (!hasRequiredPermission) {
      toast({
        title: "Permission Denied",
        description: existingGroupId || isEditMode
          ? "You don't have permission to edit business cases"
          : "You don't have permission to create business cases",
        variant: "destructive",
      });
      return;
    }

    // Validate data
    const missingData: string[] = [];
    
    // Change reason is required when updating existing business case
    if ((existingGroupId || isEditMode) && !formData.change_reason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for this update for audit tracking.",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditMode) {
      yearDataArray.forEach((year) => {
        if (!year.volume || year.volume <= 0) {
          missingData.push(`Year ${year.year_offset}: Volume is required`);
        }
        if (!year.nsp || year.nsp <= 0) {
          missingData.push(`Year ${year.year_offset}: NSP is required`);
        }
      });
    } else {
      for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
        const year = yearDataRecord[yearOffset];
        if (!year || !year.volume || parseFloat(year.volume) <= 0) {
          missingData.push(`Year ${yearOffset}: Volume is required`);
        }
        if (!year || !year.nsp || parseFloat(year.nsp) <= 0) {
          missingData.push(`Year ${yearOffset}: NSP is required`);
        }
      }
    }

    if (missingData.length > 0) {
      toast({
        title: "Validation Error",
        description: missingData.slice(0, 3).join("\n") + (missingData.length > 3 ? `\n...and ${missingData.length - 3} more` : ""),
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      if (isEditMode && groupId) {
        // Edit mode - update existing
        const formDataToSubmit = new FormData();
        
        yearDataArray.forEach((year) => {
          formDataToSubmit.append(`year_${year.year_offset}_volume`, String(year.volume || 0));
          formDataToSubmit.append(`year_${year.year_offset}_nsp`, String(year.nsp || 0));
          if (year.cogs_per_unit !== null && year.cogs_per_unit !== undefined) {
            formDataToSubmit.append(`year_${year.year_offset}_cogs`, String(year.cogs_per_unit));
          }
        });
        
        if (formData.change_reason) {
          formDataToSubmit.append("change_reason", formData.change_reason);
        }

        const result = await updateBusinessCaseGroupAction(groupId, formDataToSubmit);

        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "New Version Created",
            description: "Business case version saved successfully. Previous version archived.",
          });
          onOpenChange(false);
          if (onSuccess) onSuccess();
        }
      } else {
        // Create mode
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("formulation_id", formData.formulation_id);
        formDataToSubmit.append("country_id", formData.country_id);
        formData.use_group_ids.forEach((id) => {
          formDataToSubmit.append("use_group_ids", id);
        });
        if (formData.business_case_name) {
          formDataToSubmit.append("business_case_name", formData.business_case_name);
        }
        if (formData.change_reason) {
          formDataToSubmit.append("change_reason", formData.change_reason);
        }

        for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
          const year = yearDataRecord[yearOffset];
          formDataToSubmit.append(`year_${yearOffset}_volume`, year?.volume || "0");
          formDataToSubmit.append(`year_${yearOffset}_nsp`, year?.nsp || "0");
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
      }
    });
  };

  // Effective start fiscal year for display
  const effectiveStartFiscalYear = useMemo(() => {
    if (isEditMode && yearDataArray.length > 0) {
      return yearDataArray[0]?.effective_start_fiscal_year || "";
    }
    if (!targetMarketEntry) return null;
    const match = targetMarketEntry.match(/FY(\d{2})/);
    if (!match) return null;
    const startYear = parseInt(match[1], 10);
    const effectiveStartYear = startYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : startYear;
    return `FY${String(effectiveStartYear).padStart(2, "0")}`;
  }, [isEditMode, yearDataArray, targetMarketEntry]);

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Loading...</DialogTitle>
            <DialogDescription>Please wait while we load the business case data.</DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading business case data...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={step === "data" ? "max-w-[90vw] max-h-[90vh] overflow-y-auto" : "max-w-4xl max-h-[90vh] overflow-y-auto"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditMode || existingGroupId ? (formulationName ? `Edit Business Case - ${formulationName}` : "Edit Business Case") : "Create Business Case"}
            <Badge variant="outline" className="text-xs font-normal gap-1">
              <GitBranch className="h-3 w-3" />
              {isEditMode || existingGroupId ? "Creates New Version" : "Version Controlled"}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Update the 10-year financial projections for this business case. Changes create a new version."
              : existingGroupId 
                ? "Create a new version of this business case with updated projections."
                : "Define 10-year revenue and margin projections for a formulation in a specific market."
            }
          </DialogDescription>
        </DialogHeader>

        {step === "select" ? (
          // Selection step (create flow only)
          <div className="space-y-6">
            <div className="space-y-5">
              {/* Country Selector */}
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

              {/* Formulation Selector */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                  Formulation <span className="text-destructive">*</span>
                </Label>
                
{/* Search input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={!formData.country_id ? "Select country first" : "Search formulations by name, code, or ingredients..."}
                    value={formulationSearch}
                    onChange={(e) => setFormulationSearch(e.target.value)}
                    disabled={!formData.country_id}
                    className="pl-9"
                  />
                </div>
                
                {/* Selected formulation display */}
                {formData.formulation_id && (() => {
                  const sel = formulations.find(f => f.formulation_id === formData.formulation_id);
                  if (!sel) return null;
                  const name = "product_name" in sel ? sel.product_name : null;
                  const category = "product_category" in sel ? sel.product_category : null;
                  const activeIngredients = "active_ingredients" in sel ? sel.active_ingredients : null;
                  return (
                    <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 border border-primary/20">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm">{name || sel.formulation_code}</span>
                        <span className="text-xs text-muted-foreground ml-2">({sel.formulation_code})</span>
                      </div>
                      {category && <Badge variant="secondary" className="text-xs">{category}</Badge>}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => setFormData({ ...formData, formulation_id: "", use_group_ids: [] })}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })()}

                {/* Formulation list */}
                {formData.country_id && !formData.formulation_id && (
                  <div className="border rounded-md max-h-[280px] overflow-y-auto">
                    {filteredFormulations.length === 0 ? (
                      <div className="p-4 text-sm text-muted-foreground text-center">
                        {formulations.length === 0 
                          ? "No formulations available for this country"
                          : "No formulations match your search"}
                      </div>
                    ) : (
                      <div className="divide-y" role="listbox">
                        {filteredFormulations.map((f) => {
                          const name = "product_name" in f ? f.product_name : null;
                          const category = "product_category" in f ? f.product_category : null;
                          const formType = "formulation_type" in f ? f.formulation_type : null;
                          const activeIngredients = "active_ingredients" in f ? f.active_ingredients : null;
                          
                          return (
                            <button
                              type="button"
                              key={f.formulation_id || f.formulation_code}
                              className="w-full p-3 hover:bg-accent cursor-pointer transition-colors text-left focus:outline-none focus:bg-accent"
                              onClick={() => {
                                setFormData({ ...formData, formulation_id: f.formulation_id || "", use_group_ids: [] });
                                setFormulationSearch("");
                              }}
                              role="option"
                              aria-selected={false}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span className="font-medium text-sm">{name || f.formulation_code}</span>
                                    <span className="text-xs text-muted-foreground">({f.formulation_code})</span>
                                  </div>
                                  {activeIngredients && (
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1 ml-6">
                                      {activeIngredients}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  {category && (
                                    <Badge variant="outline" className="text-xs">
                                      {category}
                                    </Badge>
                                  )}
                                  {formType && (
                                    <Badge variant="secondary" className="text-xs">
                                      {formType}
                                    </Badge>
                                  )}
                                  {f.uom && (
                                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                      {f.uom}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Use Group Selector */}
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
                                {ug.targetMarketEntry ? (
                                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>Effective FY Start:</span>
                                    <Badge variant="secondary" className="text-xs font-medium">{ug.targetMarketEntry}</Badge>
                                  </div>
                                ) : (
                                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                                    <Calendar className="h-3 w-3" />
                                    <span>No effective fiscal year start set</span>
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
              </div>

              {/* Target Entry Summary */}
              {formData.use_group_ids.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Effective Fiscal Year Start</Label>
                  {targetMarketEntry ? (
                    <div className="px-4 py-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">{targetMarketEntry}</span>
                        {effectiveStartFiscalYear && effectiveStartFiscalYear !== targetMarketEntry && (
                          <Badge variant="outline" className="text-xs ml-auto">Effective: {effectiveStartFiscalYear}</Badge>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md text-sm text-amber-700 dark:text-amber-300">
                      Selected use groups do not have effective fiscal year start set
                    </div>
                  )}
                  {targetEntryError && (
                    <div className="px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                      {targetEntryError}
                    </div>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button 
                onClick={handleNext} 
                disabled={!!targetEntryError || !targetMarketEntry || permissionsLoading || !canCreateBusinessCases}
              >
                Next →
              </Button>
            </DialogFooter>
          </div>
        ) : (
          // Data entry step
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="edit" className="gap-2">
                <Edit3 className="h-4 w-4" />
                Data
              </TabsTrigger>
              {(yearDataArray[0]?.formulation_country_use_group_id || useGroupIdForHistory) && (
                <TabsTrigger value="history" className="gap-2">
                  <History className="h-4 w-4" />
                  Version History
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="edit" className="space-y-6">
              {/* Version info banner */}
              {(existingGroupId || isEditMode) && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded text-sm text-blue-900 dark:text-blue-100 flex items-start gap-2">
                  <GitBranch className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>{isEditMode ? "Editing existing business case." : "Existing business case found."}</strong> Saving will create a new version and archive the current one. Previous versions are preserved for audit tracking.
                  </div>
                </div>
              )}

              {/* Header info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{formulationName} | {countryName} {useGroupName && `| ${useGroupName}`}</span>
                <span>Effective FY Start: {effectiveStartFiscalYear}</span>
              </div>

              {/* Change indicator */}
              {changedCells.size > 0 && (
                <div className="text-xs text-amber-600 dark:text-amber-400">
                  {changedCells.size} {changedCells.size === 1 ? "cell" : "cells"} modified from current version
                </div>
              )}

              {/* Desktop Table */}
              <div className="hidden xl:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px] sticky left-0 bg-background z-10">Metric</TableHead>
                      {fiscalYearColumns.map((col) => (
                        <TableHead key={col.yearOffset} className="min-w-[100px] text-center">{col.fiscalYear}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Shadow row for previous version - Volume */}
                    {Object.keys(shadowData).length > 0 && (
                      <TableRow className="bg-muted/30">
                        <TableCell className="text-xs text-muted-foreground italic sticky left-0 bg-muted/30 z-10">↳ prev</TableCell>
                        {fiscalYearColumns.map((col) => {
                          const rawVal = shadowData[col.yearOffset]?.volume || 0;
                          const displayVal = convertQuantityForDisplay(rawVal);
                          return (
                            <TableCell key={col.yearOffset} className="p-1 text-right text-xs text-muted-foreground/70 italic tabular-nums">
                              {displayVal > 0 ? Math.round(displayVal).toLocaleString() : "-"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    )}

                    {/* Volume row */}
                    <TableRow>
                      <TableCell className="font-medium sticky left-0 bg-background z-10">Volume ({displayUnit})</TableCell>
                      {fiscalYearColumns.map((col) => {
                        const cellKey = `${col.yearOffset}_volume`;
                        const isChanged = changedCells.has(cellKey);
                        
                        if (isEditMode) {
                          const year = yearDataArray.find((y) => y.year_offset === col.yearOffset);
                          // Convert L/KG to GAL/LB for display
                          const rawVal = parseFloat(String(year?.volume || 0)) || 0;
                          const displayValue = convertQuantityForDisplay(rawVal);
                          return (
                            <TableCell key={col.yearOffset} className="p-1">
                              <Input
                                type="text"
                                inputMode="numeric"
                                value={formatVolumeInput(displayValue)}
                                onChange={(e) => {
                                  // Convert from display unit back to L/KG
                                  const inputVal = parseFormattedNumber(e.target.value);
                                  const baseVal = convertQuantityToBase(inputVal);
                                  handleCellChange(col.yearOffset, "volume", String(Math.round(baseVal)));
                                }}
                                className={cn("h-8 text-sm text-right tabular-nums", isChanged && "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700")}
                              />
                            </TableCell>
                          );
                        } else {
                          // Create mode - also convert for display
                          const rawValue = parseFloat(yearDataRecord[col.yearOffset]?.volume || "0") || 0;
                          const displayValue = convertQuantityForDisplay(rawValue);
                          return (
                            <TableCell key={col.yearOffset} className="p-1">
                              <Input
                                type="text"
                                inputMode="numeric"
                                value={formatVolumeInput(displayValue)}
                                onChange={(e) => {
                                  const inputVal = parseFormattedNumber(e.target.value);
                                  const baseVal = convertQuantityToBase(inputVal);
                                  setYearDataRecord({
                                    ...yearDataRecord,
                                    [col.yearOffset]: {
                                      ...yearDataRecord[col.yearOffset],
                                      volume: String(Math.round(baseVal)),
                                      nsp: yearDataRecord[col.yearOffset]?.nsp || "",
                                      cogs: yearDataRecord[col.yearOffset]?.cogs || "",
                                    },
                                  });
                                }}
                                className="h-8 text-sm text-right tabular-nums"
                                placeholder="0"
                              />
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>

                    {/* Shadow row for NSP */}
                    {Object.keys(shadowData).length > 0 && (
                      <TableRow className="bg-muted/30">
                        <TableCell className="text-xs text-muted-foreground italic sticky left-0 bg-muted/30 z-10">↳ prev</TableCell>
                        {fiscalYearColumns.map((col) => {
                          const rawVal = shadowData[col.yearOffset]?.nsp || 0;
                          const displayVal = convertPerUnitForDisplay(rawVal);
                          return (
                            <TableCell key={col.yearOffset} className="p-1 text-right text-xs text-muted-foreground/70 italic tabular-nums">
                              {displayVal > 0 ? displayVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "-"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    )}

                    {/* NSP row */}
                    <TableRow>
                      <TableCell className="font-medium sticky left-0 bg-background z-10">NSP ({preferences.currency}/{displayUnit})</TableCell>
                      {fiscalYearColumns.map((col) => {
                        const cellKey = `${col.yearOffset}_nsp`;
                        const isChanged = changedCells.has(cellKey);
                        
                        if (isEditMode) {
                          const year = yearDataArray.find((y) => y.year_offset === col.yearOffset);
                          // Convert EUR value to display currency/unit
                          const displayValue = convertPerUnitForDisplay(parseFloat(String(year?.nsp || 0)) || 0);
                          return (
                            <TableCell key={col.yearOffset} className="p-1">
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                                  {currencySymbol}
                                </span>
                                <Input
                                  type="text"
                                  inputMode="decimal"
                                  value={formatCurrencyInput(displayValue)}
                                  onChange={(e) => {
                                    // Convert from display currency/unit back to EUR/L
                                    const inputVal = parseFormattedNumber(e.target.value);
                                    const baseVal = convertPerUnitToBase(inputVal);
                                    handleCellChange(col.yearOffset, "nsp", String(baseVal));
                                  }}
                                  className={cn("h-8 text-sm text-right tabular-nums pl-6", isChanged && "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700")}
                                />
                              </div>
                            </TableCell>
                          );
                        } else {
                          // Create mode - also convert for display
                          const rawValue = parseFloat(yearDataRecord[col.yearOffset]?.nsp || "0") || 0;
                          const displayValue = convertPerUnitForDisplay(rawValue);
                          return (
                            <TableCell key={col.yearOffset} className="p-1">
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                                  {currencySymbol}
                                </span>
                                <Input
                                  type="text"
                                  inputMode="decimal"
                                  value={formatCurrencyInput(displayValue)}
                                  onChange={(e) => {
                                    const inputVal = parseFormattedNumber(e.target.value);
                                    const baseVal = convertPerUnitToBase(inputVal);
                                    setYearDataRecord({
                                      ...yearDataRecord,
                                      [col.yearOffset]: {
                                        ...yearDataRecord[col.yearOffset],
                                        volume: yearDataRecord[col.yearOffset]?.volume || "",
                                        nsp: String(baseVal),
                                        cogs: yearDataRecord[col.yearOffset]?.cogs || "",
                                      },
                                    });
                                  }}
                                  className="h-8 text-sm text-right tabular-nums pl-6"
                                  placeholder="0"
                                />
                              </div>
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>

                    {/* Shadow row for COGS */}
                    {Object.keys(shadowData).length > 0 && (
                      <TableRow className="bg-muted/30">
                        <TableCell className="text-xs text-muted-foreground italic sticky left-0 bg-muted/30 z-10">↳ prev</TableCell>
                        {fiscalYearColumns.map((col) => {
                          const rawVal = shadowData[col.yearOffset]?.cogs || 0;
                          const displayVal = rawVal > 0 ? convertPerUnitForDisplay(rawVal) : 0;
                          return (
                            <TableCell key={col.yearOffset} className="p-1 text-right text-xs text-muted-foreground/70 italic tabular-nums">
                              {displayVal > 0 ? displayVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "-"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    )}

                    {/* COGS row */}
                    <TableRow>
                      <TableCell className="font-medium sticky left-0 bg-background z-10">
                        <div className="flex flex-col">
                          <span>COGS ({preferences.currency}/{displayUnit})</span>
                          {!isEditMode && <span className="text-xs text-muted-foreground font-normal">Optional override</span>}
                        </div>
                      </TableCell>
                      {fiscalYearColumns.map((col) => {
                        const cellKey = `${col.yearOffset}_cogs_per_unit`;
                        const isChanged = changedCells.has(cellKey);
                        
                        if (isEditMode) {
                          const year = yearDataArray.find((y) => y.year_offset === col.yearOffset);
                          // Convert EUR value to display currency/unit
                          const rawVal = parseFloat(String(year?.cogs_per_unit || 0)) || 0;
                          const displayValue = rawVal > 0 ? convertPerUnitForDisplay(rawVal) : 0;
                          return (
                            <TableCell key={col.yearOffset} className="p-1">
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                                  {currencySymbol}
                                </span>
                                <Input
                                  type="text"
                                  inputMode="decimal"
                                  value={formatCurrencyInput(displayValue)}
                                  onChange={(e) => {
                                    // Convert from display currency/unit back to EUR/L
                                    const inputVal = parseFormattedNumber(e.target.value);
                                    const baseVal = inputVal > 0 ? convertPerUnitToBase(inputVal) : 0;
                                    handleCellChange(col.yearOffset, "cogs_per_unit", inputVal > 0 ? String(baseVal) : "");
                                  }}
                                  className={cn("h-8 text-sm text-right tabular-nums pl-6", isChanged && "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700")}
                                />
                              </div>
                            </TableCell>
                          );
                        } else {
                          // Create mode - also convert for display
                          const rawValue = parseFloat(yearDataRecord[col.yearOffset]?.cogs || "0") || 0;
                          const displayValue = rawValue > 0 ? convertPerUnitForDisplay(rawValue) : 0;
                          return (
                            <TableCell key={col.yearOffset} className="p-1">
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                                  {currencySymbol}
                                </span>
                                <Input
                                  type="text"
                                  inputMode="decimal"
                                  value={formatCurrencyInput(displayValue)}
                                  onChange={(e) => {
                                    const inputVal = parseFormattedNumber(e.target.value);
                                    const baseVal = inputVal > 0 ? convertPerUnitToBase(inputVal) : 0;
                                    setYearDataRecord({
                                      ...yearDataRecord,
                                      [col.yearOffset]: {
                                        ...yearDataRecord[col.yearOffset],
                                        volume: yearDataRecord[col.yearOffset]?.volume || "",
                                        nsp: yearDataRecord[col.yearOffset]?.nsp || "",
                                        cogs: inputVal > 0 ? String(baseVal) : "",
                                      },
                                    });
                                  }}
                                  className="h-8 text-sm text-right tabular-nums pl-6"
                                  placeholder="Auto"
                                />
                              </div>
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>

                    {/* Calculated rows */}
                    <TableRow>
                      <TableCell className="font-medium sticky left-0 bg-background z-10">Total Revenue ({preferences.currency})</TableCell>
                      {fiscalYearColumns.map((col) => {
                        const metrics = calculateMetrics(col.yearOffset);
                        return (
                          <TableCell key={col.yearOffset} className="p-1 text-right">
                            <span className="text-sm tabular-nums">
                              {metrics.revenue > 0 ? `${currencySymbol}${metrics.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                            </span>
                          </TableCell>
                        );
                      })}
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium sticky left-0 bg-background z-10">Gross Margin ({preferences.currency})</TableCell>
                      {fiscalYearColumns.map((col) => {
                        const metrics = calculateMetrics(col.yearOffset);
                        return (
                          <TableCell key={col.yearOffset} className="p-1 text-right">
                            <span className="text-sm tabular-nums">
                              {metrics.margin > 0 ? `${currencySymbol}${metrics.margin.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                            </span>
                          </TableCell>
                        );
                      })}
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium sticky left-0 bg-background z-10">Margin %</TableCell>
                      {fiscalYearColumns.map((col) => {
                        const metrics = calculateMetrics(col.yearOffset);
                        return (
                          <TableCell key={col.yearOffset} className="p-1 text-right">
                            <span className="text-sm tabular-nums">
                              {metrics.marginPercent > 0 ? `${metrics.marginPercent.toFixed(1)}%` : "-"}
                            </span>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card Layout */}
              <div className="block xl:hidden space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {fiscalYearColumns.map((col) => {
                    const metrics = calculateMetrics(col.yearOffset);
                    const volumeChanged = changedCells.has(`${col.yearOffset}_volume`);
                    const nspChanged = changedCells.has(`${col.yearOffset}_nsp`);
                    const cogsChanged = changedCells.has(`${col.yearOffset}_cogs_per_unit`);
                    
                    const yearValue = isEditMode 
                      ? yearDataArray.find((y) => y.year_offset === col.yearOffset)
                      : yearDataRecord[col.yearOffset];
                    
                    // Compute converted display values for mobile
                    const rawVolume = isEditMode 
                      ? parseFloat(String((yearValue as BusinessCaseYearData)?.volume || 0)) || 0
                      : parseFloat((yearValue as any)?.volume || "0") || 0;
                    const displayVolume = convertQuantityForDisplay(rawVolume);
                    
                    const rawNsp = isEditMode
                      ? parseFloat(String((yearValue as BusinessCaseYearData)?.nsp || 0)) || 0
                      : parseFloat((yearValue as any)?.nsp || "0") || 0;
                    const displayNsp = convertPerUnitForDisplay(rawNsp);
                    
                    const rawCogs = isEditMode
                      ? parseFloat(String((yearValue as BusinessCaseYearData)?.cogs_per_unit || 0)) || 0
                      : parseFloat((yearValue as any)?.cogs || "0") || 0;
                    const displayCogs = rawCogs > 0 ? convertPerUnitForDisplay(rawCogs) : 0;
                    
                    return (
                      <Card key={col.yearOffset} className="overflow-hidden">
                        <div className="bg-muted/50 px-3 py-2 border-b">
                          <span className="font-semibold text-sm">{col.fiscalYear}</span>
                        </div>
                        <CardContent className="p-3 space-y-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Volume ({displayUnit})</Label>
                            <Input
                              type="text"
                              inputMode="numeric"
                              value={formatVolumeInput(displayVolume)}
                              onChange={(e) => {
                                const inputVal = parseFormattedNumber(e.target.value);
                                const baseVal = convertQuantityToBase(inputVal);
                                if (isEditMode) {
                                  handleCellChange(col.yearOffset, "volume", String(Math.round(baseVal)));
                                } else {
                                  setYearDataRecord({
                                    ...yearDataRecord,
                                    [col.yearOffset]: {
                                      volume: String(Math.round(baseVal)),
                                      nsp: yearDataRecord[col.yearOffset]?.nsp || "",
                                      cogs: yearDataRecord[col.yearOffset]?.cogs || "",
                                    },
                                  });
                                }
                              }}
                              className={cn("h-8 text-sm text-right tabular-nums", volumeChanged && "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700")}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">NSP ({preferences.currency}/{displayUnit})</Label>
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                                {currencySymbol}
                              </span>
                              <Input
                                type="text"
                                inputMode="decimal"
                                value={formatCurrencyInput(displayNsp)}
                                onChange={(e) => {
                                  const inputVal = parseFormattedNumber(e.target.value);
                                  const baseVal = convertPerUnitToBase(inputVal);
                                  if (isEditMode) {
                                    handleCellChange(col.yearOffset, "nsp", String(baseVal));
                                  } else {
                                    setYearDataRecord({
                                      ...yearDataRecord,
                                      [col.yearOffset]: {
                                        volume: yearDataRecord[col.yearOffset]?.volume || "",
                                        nsp: String(baseVal),
                                        cogs: yearDataRecord[col.yearOffset]?.cogs || "",
                                      },
                                    });
                                  }
                                }}
                                className={cn("h-8 text-sm text-right tabular-nums pl-6", nspChanged && "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700")}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">COGS ({preferences.currency}/{displayUnit})</Label>
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                                {currencySymbol}
                              </span>
                              <Input
                                type="text"
                                inputMode="decimal"
                                value={formatCurrencyInput(displayCogs)}
                                onChange={(e) => {
                                  const inputVal = parseFormattedNumber(e.target.value);
                                  const baseVal = inputVal > 0 ? convertPerUnitToBase(inputVal) : 0;
                                  if (isEditMode) {
                                    handleCellChange(col.yearOffset, "cogs_per_unit", inputVal > 0 ? String(baseVal) : "");
                                  } else {
                                    setYearDataRecord({
                                      ...yearDataRecord,
                                      [col.yearOffset]: {
                                        volume: yearDataRecord[col.yearOffset]?.volume || "",
                                        nsp: yearDataRecord[col.yearOffset]?.nsp || "",
                                        cogs: inputVal > 0 ? String(baseVal) : "",
                                      },
                                    });
                                  }
                                }}
                                className={cn("h-8 text-sm text-right tabular-nums pl-6", cogsChanged && "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700")}
                              />
                            </div>
                          </div>
                          <div className="pt-2 border-t space-y-1.5 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Revenue</span>
                              <span className="font-medium tabular-nums">
                                {metrics.revenue > 0 ? `${currencySymbol}${metrics.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Margin</span>
                              <span className="font-medium tabular-nums">
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

              {/* Change reason - compact, at bottom when updating */}
              {(existingGroupId || isEditMode) && (
                <div className="flex items-center gap-3 pt-2 border-t">
                  <Label htmlFor="change_reason" className="text-sm text-muted-foreground whitespace-nowrap">
                    Update reason<span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="change_reason"
                    placeholder="e.g., 'Revised per Q3 data', 'Distributor feedback'"
                    value={formData.change_reason}
                    onChange={(e) => setFormData({ ...formData, change_reason: e.target.value })}
                    className={`flex-1 h-9 ${!formData.change_reason.trim() ? "border-destructive/50" : ""}`}
                  />
                </div>
              )}

              <DialogFooter>
                {!isEditMode && (
                  <Button variant="outline" onClick={() => setStep("select")} disabled={isPending}>
                    ← Back
                  </Button>
                )}
                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave} 
                  disabled={isPending || permissionsLoading || (existingGroupId || isEditMode ? !canEditBusinessCases : !canCreateBusinessCases)}
                >
                  {isPending ? "Saving..." : "Save Business Case"}
                </Button>
              </DialogFooter>
            </TabsContent>

            {(yearDataArray[0]?.formulation_country_use_group_id || useGroupIdForHistory) && (
              <TabsContent value="history">
                <BusinessCaseVersionHistory
                  useGroupId={yearDataArray[0]?.formulation_country_use_group_id || useGroupIdForHistory || ""}
                  currentGroupId={groupId || existingGroupId || ""}
                  formulationName={formulationName ?? undefined}
                  countryName={countryName ?? undefined}
                />
              </TabsContent>
            )}
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}

