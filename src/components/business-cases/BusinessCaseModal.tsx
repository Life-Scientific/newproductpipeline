"use client";

import { Edit3, GitBranch, History, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";
import { usePermissions } from "@/hooks/use-permissions";
import { useSupabase } from "@/hooks/use-supabase";
import {
  checkExistingBusinessCaseAction,
  getBusinessCaseGroupAction,
  getCountriesAction,
  getFormulationsAction,
} from "@/lib/actions/business-cases";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import type { BusinessCaseYearData } from "@/lib/db/types";
import { error, warn } from "@/lib/logger";
import type { Database } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";
import { BusinessCaseVersionHistory } from "./BusinessCaseVersionHistory";
import { BusinessCaseYearEditor } from "./BusinessCaseYearEditor";

type Formulation =
  | Database["public"]["Tables"]["formulations"]["Row"]
  | Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];

export interface UseGroupOption {
  id: string;
  variant: string;
  name: string | null;
  targetMarketEntry: string | null;
}

interface BusinessCaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
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

  const onOpenChangeRef = useRef(onOpenChange);
  const onSuccessRef = useRef(onSuccess);
  const toastRef = useRef(toast);

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
    onSuccessRef.current = onSuccess;
    toastRef.current = toast;
  });

  const [isPending, startTransition] = useTransition();
  const {
    preferences,
    currencySymbol,
    formatCurrency,
    convertCurrency,
    convertVolume,
    convertWeight,
    convertPerUnit,
    toEUR,
    toLiters,
    toKG,
    isWetProduct,
    isDryProduct,
    getDisplayUnit,
  } = useDisplayPreferences();

  const [step, setStep] = useState<"select" | "data">("select");
  const [loading, setLoading] = useState(false);

  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [allFormulations, setAllFormulations] = useState<Formulation[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [useGroupOptions, setUseGroupOptions] = useState<UseGroupOption[]>([]);

  const [formulationSearch, setFormulationSearch] = useState("");

  const [formData, setFormData] = useState({
    formulation_id: "",
    country_id: "",
    use_group_ids: [] as string[],
    business_case_name: "",
    change_reason: "",
  });

  const [yearDataRecord, setYearDataRecord] = useState<
    Record<number, { volume: string; nsp: string; cogs: string }>
  >({});
  const [yearDataArray, setYearDataArray] = useState<BusinessCaseYearData[]>(
    [],
  );

  const [rawInputs, setRawInputs] = useState<
    Record<number, { volume?: string; nsp?: string; cogs?: string }>
  >({});
  const [focusedInputs, setFocusedInputs] = useState<Set<string>>(new Set());

  const [existingGroupId, setExistingGroupId] = useState<string | null>(null);
  const [originalValues, setOriginalValues] = useState<
    Record<
      number,
      { volume: number | null; nsp: number | null; cogs: number | null }
    >
  >({});
  const [changedCells, setChangedCells] = useState<Set<string>>(new Set());

  const [targetMarketEntry, setTargetMarketEntry] = useState<string | null>(
    null,
  );
  const [targetEntryError, setTargetEntryError] = useState<string | null>(null);

  const [shadowData, setShadowData] = useState<
    Record<
      number,
      { volume: number | null; nsp: number | null; cogs: number | null }
    >
  >({});

  const [useGroupIdForHistory, setUseGroupIdForHistory] = useState<
    string | null
  >(null);

  const {
    canCreateBusinessCases,
    canEditBusinessCases,
    isLoading: permissionsLoading,
  } = usePermissions();

  const isEditMode = !!groupId;

  useEffect(() => {
    let aborted = false;

    if (open) {
      if (groupId) {
        setStep("data");
        setLoading(true);
        setExistingGroupId(groupId);

        getBusinessCaseGroupAction(groupId)
          .then((result) => {
            if (aborted) return;

            if (result.error) {
              toastRef.current({
                title: "Error",
                description: result.error,
                variant: "destructive",
              });
              onOpenChangeRef.current(false);
              return;
            }
            if (!result.data || result.data.length === 0) {
              error("Business case group returned no data:", groupId);
              toastRef.current({
                title: "Error",
                description:
                  "Business case not found or contains no data. It may have been deleted.",
                variant: "destructive",
              });
              onOpenChangeRef.current(false);
              return;
            }
            if (result.data && result.data.length > 0) {
              setYearDataArray(result.data);

              const originals: Record<
                number,
                {
                  volume: number | null;
                  nsp: number | null;
                  cogs: number | null;
                }
              > = {};
              const shadow: Record<
                number,
                {
                  volume: number | null;
                  nsp: number | null;
                  cogs: number | null;
                }
              > = {};

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

              const firstYear = result.data[0];
              if (firstYear) {
                setTargetMarketEntry(
                  firstYear.target_market_entry_fy ||
                    firstYear.effective_start_fiscal_year ||
                    null,
                );
                setUseGroupIdForHistory(
                  firstYear.formulation_country_use_group_id || null,
                );
              }
            }
          })
          .catch((supabaseError: unknown) => {
            if (aborted) return;

            const errorMessage =
              supabaseError instanceof Error
                ? supabaseError.message
                : "Failed to load business case";
            toastRef.current({
              title: "Error",
              description: `Failed to load business case: ${errorMessage}`,
              variant: "destructive",
            });
            onOpenChangeRef.current(false);
          })
          .finally(() => {
            if (!aborted) {
              setLoading(false);
            }
          });
      } else {
        setStep("select");
        setExistingGroupId(null);
        setYearDataArray([]);
        setYearDataRecord({});
        setShadowData({});
        setOriginalValues({});
        setChangedCells(new Set());
        setUseGroupIdForHistory(null);
        setRawInputs({});
        setFocusedInputs(new Set());
        setFormData({
          formulation_id: "",
          country_id: "",
          use_group_ids: [],
          business_case_name: "",
          change_reason: "",
        });

        Promise.all([getFormulationsAction(), getCountriesAction()])
          .then(([formResult, countryResult]) => {
            if (aborted) return;

            if (formResult.error) {
              toastRef.current({
                title: "Error",
                description: formResult.error,
                variant: "destructive",
              });
              return;
            }
            if (countryResult.error) {
              toastRef.current({
                title: "Error",
                description: countryResult.error,
                variant: "destructive",
              });
              return;
            }
            if (formResult.data) {
              setAllFormulations(formResult.data);
              setFormulations(formResult.data);
            }
            if (countryResult.data) setCountries(countryResult.data);
          })
          .catch((supabaseError: unknown) => {
            if (aborted) return;

            const errorMessage =
              supabaseError instanceof Error
                ? supabaseError.message
                : "Failed to load data";
            toastRef.current({
              title: "Error",
              description: `Failed to load data: ${errorMessage}`,
              variant: "destructive",
            });
          });
      }
    } else {
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
      setRawInputs({});
      setFocusedInputs(new Set());
      setTargetEntryError(null);
    }

    return () => {
      aborted = true;
    };
  }, [open, groupId]);

  useEffect(() => {
    if (!isEditMode && formData.country_id) {
      supabase
        .from("formulation_country")
        .select("formulation_id")
        .eq("country_id", formData.country_id)
        .eq("is_active", true)
        .then(({ data: fcData, error: supabaseError }) => {
          if (supabaseError) {
            error("Failed to load formulation countries:", supabaseError);
            setFormulations([]);
            return;
          }
          if (fcData && fcData.length > 0) {
            const formulationIds = fcData
              .map((fc) => fc.formulation_id)
              .filter(Boolean) as string[];
            const filteredFormulations = allFormulations.filter(
              (f) =>
                f.formulation_id && formulationIds.includes(f.formulation_id),
            );
            setFormulations(filteredFormulations);
          } else {
            setFormulations([]);
          }
        });
    } else if (!isEditMode) {
      setFormulations(allFormulations);
    }
  }, [formData.country_id, allFormulations, isEditMode, supabase]);

  useEffect(() => {
    if (!isEditMode && formData.formulation_id && formData.country_id) {
      supabase
        .from("formulation_country")
        .select("formulation_country_id")
        .eq("formulation_id", formData.formulation_id)
        .eq("country_id", formData.country_id)
        .single()
        .then(async ({ data: fcData, error: fcError }) => {
          if (fcError || !fcData?.formulation_country_id) {
            setUseGroupOptions([]);
            return;
          }

          const { data: useGroupsData, error: useGroupsError } = await supabase
            .from("formulation_country_use_group")
            .select(
              "formulation_country_use_group_id, use_group_name, use_group_variant, target_market_entry_fy",
            )
            .eq("formulation_country_id", fcData.formulation_country_id)
            .eq("is_active", true);

          if (useGroupsError) {
            error("Failed to load use groups:", useGroupsError);
            setUseGroupOptions([]);
            return;
          }

          if (useGroupsData) {
            const options: UseGroupOption[] = useGroupsData.map((ug) => ({
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
  }, [formData.formulation_id, formData.country_id, isEditMode, supabase]);

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

        const targetEntries = useGroups
          .map((ug) => ug.target_market_entry_fy)
          .filter(
            (entry): entry is string => entry !== null && entry !== undefined,
          );

        if (targetEntries.length === 0) {
          setTargetEntryError(
            "Selected use groups do not have effective fiscal year start set",
          );
          setTargetMarketEntry(null);
          return;
        }

        const uniqueEntries = Array.from(new Set(targetEntries));

        if (uniqueEntries.length > 1) {
          setTargetEntryError(
            `All selected use groups must have the same effective fiscal year start. Found values: ${uniqueEntries.join(", ")}`,
          );
          setTargetMarketEntry(null);
        } else {
          setTargetMarketEntry(uniqueEntries[0]);
          setTargetEntryError(null);
        }
      });
  }, [formData.use_group_ids, isEditMode, supabase]);

  const filteredFormulations = useMemo(() => {
    if (!formulationSearch.trim()) return formulations;

    const search = formulationSearch.toLowerCase().trim();
    return formulations.filter((f) => {
      const name =
        ("product_name" in f ? f.product_name : f.formulation_name) || "";
      const code = f.formulation_code || "";
      const activeIngredients =
        ("active_ingredients" in f ? f.active_ingredients : null) || "";
      const category =
        ("product_category" in f ? f.product_category : null) ||
        ("formulation_category" in f ? f.formulation_category : null) ||
        "";
      return (
        name.toLowerCase().includes(search) ||
        code.toLowerCase().includes(search) ||
        activeIngredients.toLowerCase().includes(search) ||
        category.toLowerCase().includes(search)
      );
    });
  }, [formulations, formulationSearch]);

  const fiscalYearColumns = useMemo(() => {
    if (isEditMode && yearDataArray.length > 0) {
      const effectiveStart = yearDataArray[0]?.effective_start_fiscal_year;
      const targetEntryFallback = yearDataArray[0]?.target_market_entry_fy;

      let match = effectiveStart?.match(/FY(\d{2})/);

      if (!match && targetEntryFallback) {
        match = targetEntryFallback.match(/FY(\d{2})/);
      }

      if (!match) {
        warn(
          "Business case missing effective_start_fiscal_year and target_market_entry_fy, using current fiscal year as fallback",
        );
        return Array.from({ length: 10 }, (_, i) => ({
          yearOffset: i + 1,
          fiscalYear: `FY${String(CURRENT_FISCAL_YEAR + i).padStart(2, "0")}`,
        }));
      }

      const startYear = parseInt(match[1], 10);
      const effectiveStartYear =
        startYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : startYear;
      return Array.from({ length: 10 }, (_, i) => ({
        yearOffset: i + 1,
        fiscalYear: `FY${String(effectiveStartYear + i).padStart(2, "0")}`,
      }));
    } else if (targetMarketEntry) {
      const match = targetMarketEntry.match(/FY(\d{2})/);
      if (!match) return [];
      const startYear = parseInt(match[1], 10);
      const effectiveStartYear =
        startYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : startYear;
      return Array.from({ length: 10 }, (_, i) => ({
        yearOffset: i + 1,
        fiscalYear: `FY${String(effectiveStartYear + i).padStart(2, "0")}`,
      }));
    }
    return [];
  }, [isEditMode, yearDataArray, targetMarketEntry]);

  const selectedFormulation = formulations.find(
    (f) => f.formulation_id === formData.formulation_id,
  );
  const selectedCountry = countries.find(
    (c) => c.country_id === formData.country_id,
  );
  const uom = isEditMode
    ? yearDataArray[0]?.uom || "L"
    : selectedFormulation?.uom || "L";
  const formulationName = isEditMode
    ? yearDataArray[0]?.formulation_name || ""
    : selectedFormulation && "product_name" in selectedFormulation
      ? selectedFormulation.product_name
      : selectedFormulation?.formulation_name || "";
  const countryName = isEditMode
    ? yearDataArray[0]?.country_name || ""
    : selectedCountry?.country_name || "";
  const useGroupName = isEditMode
    ? yearDataArray[0]?.use_group_name ||
      yearDataArray[0]?.use_group_variant ||
      ""
    : "";

  const handleNext = async () => {
    if (
      !formData.country_id ||
      !formData.formulation_id ||
      formData.use_group_ids.length === 0
    ) {
      toast({
        title: "Validation Error",
        description:
          "Please select country, formulation, and at least one use group",
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
        description:
          "Selected use groups do not have effective fiscal year start set",
        variant: "destructive",
      });
      return;
    }

    const result = await checkExistingBusinessCaseAction(
      formData.formulation_id,
      formData.country_id,
      formData.use_group_ids[0],
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

      const existingDataResult = await getBusinessCaseGroupAction(result.data);
      if (existingDataResult.data && existingDataResult.data.length > 0) {
        const shadow: Record<
          number,
          { volume: number | null; nsp: number | null; cogs: number | null }
        > = {};
        const prefill: Record<
          number,
          { volume: string; nsp: string; cogs: string }
        > = {};

        existingDataResult.data.forEach((year: BusinessCaseYearData) => {
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

        const firstYear = existingDataResult.data[0];
        if (firstYear?.formulation_country_use_group_id) {
          setUseGroupIdForHistory(firstYear.formulation_country_use_group_id);
        }
      }

      toast({
        title: "Existing Business Case Found",
        description:
          "Previous values are shown as reference. Modify and save to create a new version.",
      });
    } else {
      setShadowData({});
    }

    setStep("data");
  };

  const handleCellChange = (
    yearOffset: number,
    field: "volume" | "nsp" | "cogs_per_unit",
    value: string,
  ) => {
    const numValue = value === "" ? null : parseFloat(value);

    setYearDataArray((prev) =>
      prev.map((year) =>
        year.year_offset === yearOffset ? { ...year, [field]: numValue } : year,
      ),
    );

    const cellKey = `${yearOffset}_${field}`;
    const originalField = field === "cogs_per_unit" ? "cogs" : field;
    const original =
      originalValues[yearOffset]?.[originalField as "volume" | "nsp" | "cogs"];

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

  const calculateMetrics = (yearOffset: number) => {
    if (isEditMode) {
      const year = yearDataArray.find((y) => y.year_offset === yearOffset);
      const volumeEUR = year?.volume || 0;
      const nspEUR = year?.nsp || 0;
      const cogsEUR = year?.cogs_per_unit || 0;
      const revenueEUR = volumeEUR * nspEUR;
      const marginEUR = revenueEUR - volumeEUR * cogsEUR;
      const marginPercent = revenueEUR > 0 ? (marginEUR / revenueEUR) * 100 : 0;
      const revenue = convertCurrency(revenueEUR);
      const margin = convertCurrency(marginEUR);
      return { revenue, margin, marginPercent };
    } else {
      const year = yearDataRecord[yearOffset];
      const volumeEUR = parseFloat(year?.volume || "0") || 0;
      const nspEUR = parseFloat(year?.nsp || "0") || 0;
      const cogsEUR = parseFloat(year?.cogs || "0") || 0;
      const revenueEUR = volumeEUR * nspEUR;
      const marginEUR = revenueEUR - volumeEUR * cogsEUR;
      const marginPercent = revenueEUR > 0 ? (marginEUR / revenueEUR) * 100 : 0;
      const revenue = convertCurrency(revenueEUR);
      const margin = convertCurrency(marginEUR);
      return { revenue, margin, marginPercent };
    }
  };

  const convertQuantityForDisplay = (value: number) => {
    const productIsWet = isWetProduct(uom);
    const productIsDry = isDryProduct(uom);
    if (productIsWet) return convertVolume(value);
    if (productIsDry) return convertWeight(value);
    return value;
  };

  const convertQuantityToBase = (value: number) => {
    const productIsWet = isWetProduct(uom);
    const productIsDry = isDryProduct(uom);
    if (productIsWet) return toLiters(value);
    if (productIsDry) return toKG(value);
    return value;
  };

  const convertPerUnitForDisplay = (eurValue: number) => {
    return convertPerUnit(eurValue, uom);
  };

  const convertPerUnitToBase = (userValue: number) => {
    const eurValue = toEUR(userValue);
    const productIsWet = isWetProduct(uom);
    const productIsDry = isDryProduct(uom);
    const VOLUME_TO_GAL = 0.264172;
    const WEIGHT_TO_LB = 2.20462;

    if (productIsWet && preferences.volumeUnit === "GAL") {
      return eurValue * VOLUME_TO_GAL;
    }
    if (productIsDry && preferences.weightUnit === "LB") {
      return eurValue * WEIGHT_TO_LB;
    }
    return eurValue;
  };

  const displayUnit = getDisplayUnit(uom);

  const effectiveStartFiscalYear = useMemo(() => {
    if (isEditMode && yearDataArray.length > 0) {
      const effectiveStart = yearDataArray[0]?.effective_start_fiscal_year;
      if (effectiveStart) return effectiveStart;

      const targetEntryFallback = yearDataArray[0]?.target_market_entry_fy;
      if (targetEntryFallback) {
        const match = targetEntryFallback.match(/FY(\d{2})/);
        if (match) {
          const startYear = parseInt(match[1], 10);
          const effectiveStartYear =
            startYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : startYear;
          return `FY${String(effectiveStartYear).padStart(2, "0")}`;
        }
      }

      return `FY${String(CURRENT_FISCAL_YEAR).padStart(2, "0")}`;
    }
    if (!targetMarketEntry) return null;
    const match = targetMarketEntry.match(/FY(\d{2})/);
    if (!match) return null;
    const startYear = parseInt(match[1], 10);
    const effectiveStartYear =
      startYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : startYear;
    return `FY${String(effectiveStartYear).padStart(2, "0")}`;
  }, [isEditMode, yearDataArray, targetMarketEntry]);

  const handleSave = () => {
    const hasRequiredPermission =
      existingGroupId || isEditMode
        ? canEditBusinessCases
        : canCreateBusinessCases;
    if (!hasRequiredPermission) {
      toast({
        title: "Permission Denied",
        description:
          existingGroupId || isEditMode
            ? "You don't have permission to edit business cases"
            : "You don't have permission to create business cases",
        variant: "destructive",
      });
      return;
    }

    const missingData: string[] = [];

    if ((existingGroupId || isEditMode) && !formData.change_reason.trim()) {
      toast({
        title: "Reason Required",
        description:
          "Please provide a reason for this update for audit tracking.",
        variant: "destructive",
      });
      return;
    }

    if (isEditMode) {
      yearDataArray.forEach((year) => {
        if (
          year.volume === null ||
          year.volume === undefined ||
          year.volume < 0
        ) {
          missingData.push(`Year ${year.year_offset}: Volume is required`);
        }
        if (year.nsp === null || year.nsp === undefined || year.nsp < 0) {
          missingData.push(`Year ${year.year_offset}: NSP is required`);
        }
      });
    } else {
      for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
        const year = yearDataRecord[yearOffset];
        const volumeStr = year?.volume?.trim();
        const nspStr = year?.nsp?.trim();
        const volume =
          volumeStr !== undefined && volumeStr !== ""
            ? parseFloat(volumeStr)
            : null;
        const nsp =
          nspStr !== undefined && nspStr !== "" ? parseFloat(nspStr) : null;
        if (
          volume === null ||
          volume === undefined ||
          Number.isNaN(volume) ||
          volume < 0
        ) {
          missingData.push(`Year ${yearOffset}: Volume is required`);
        }
        if (nsp === null || nsp === undefined || Number.isNaN(nsp) || nsp < 0) {
          missingData.push(`Year ${yearOffset}: NSP is required`);
        }
      }
    }

    if (missingData.length > 0) {
      toast({
        title: "Validation Error",
        description:
          missingData.slice(0, 3).join("\n") +
          (missingData.length > 3
            ? `\n...and ${missingData.length - 3} more`
            : ""),
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const { createBusinessCaseGroupAction, updateBusinessCaseGroupAction } =
        await import("@/lib/actions/business-cases");

      if (isEditMode && groupId) {
        const formDataToSubmit = new FormData();

        yearDataArray.forEach((year) => {
          formDataToSubmit.append(
            `year_${year.year_offset}_volume`,
            String(year.volume ?? 0),
          );
          formDataToSubmit.append(
            `year_${year.year_offset}_nsp`,
            String(year.nsp ?? 0),
          );
          if (year.cogs_per_unit !== null && year.cogs_per_unit !== undefined) {
            formDataToSubmit.append(
              `year_${year.year_offset}_cogs`,
              String(year.cogs_per_unit),
            );
          }
        });

        if (formData.change_reason) {
          formDataToSubmit.append("change_reason", formData.change_reason);
        }

        const result = await updateBusinessCaseGroupAction(
          groupId,
          formDataToSubmit,
        );

        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "New Version Created",
            description:
              "Business case version saved successfully. Previous version archived.",
          });
          onOpenChange(false);
          if (onSuccess) onSuccess();
        }
      } else {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("formulation_id", formData.formulation_id);
        formDataToSubmit.append("country_id", formData.country_id);
        formData.use_group_ids.forEach((id) => {
          formDataToSubmit.append("use_group_ids", id);
        });
        if (formData.business_case_name) {
          formDataToSubmit.append(
            "business_case_name",
            formData.business_case_name,
          );
        }
        if (formData.change_reason) {
          formDataToSubmit.append("change_reason", formData.change_reason);
        }

        for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
          const year = yearDataRecord[yearOffset];
          if (year?.volume !== undefined && year.volume.trim() !== "") {
            formDataToSubmit.append(
              `year_${yearOffset}_volume`,
              year.volume.trim(),
            );
          }
          if (year?.nsp !== undefined && year.nsp.trim() !== "") {
            formDataToSubmit.append(`year_${yearOffset}_nsp`, year.nsp.trim());
          }
          if (
            year?.cogs &&
            year.cogs.trim() !== "" &&
            parseFloat(year.cogs) >= 0
          ) {
            formDataToSubmit.append(
              `year_${yearOffset}_cogs`,
              year.cogs.trim(),
            );
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
            title: existingGroupId
              ? "New Version Created"
              : "Business Case Created",
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

  const handleRawInputChange = (
    yearOffset: number,
    field: string,
    value: string,
  ) => {
    setRawInputs((prev) => ({
      ...prev,
      [yearOffset]: {
        ...prev[yearOffset],
        [field]: value,
      },
    }));
  };

  const handleFocus = (
    inputKey: string,
    yearOffset: number,
    field: "volume" | "nsp" | "cogs",
    currentValue: number,
  ) => {
    setFocusedInputs((prev) => new Set(prev).add(inputKey));
    if (!rawInputs[yearOffset]?.[field]) {
      setRawInputs((prev) => ({
        ...prev,
        [yearOffset]: {
          ...prev[yearOffset],
          [field]: String(currentValue).replace(/,/g, ""),
        },
      }));
    }
  };

  const handleBlur = (
    inputKey: string,
    yearOffset: number,
    field: "volume" | "nsp" | "cogs",
    currentValue: number,
  ) => {
    setFocusedInputs((prev) => {
      const next = new Set(prev);
      next.delete(inputKey);
      return next;
    });
    const rawValue =
      rawInputs[yearOffset]?.[field] || String(currentValue).replace(/,/g, "");
    const inputVal = parseFloat(rawValue) || 0;

    if (isEditMode) {
      if (field === "cogs") {
        handleCellChange(
          yearOffset,
          "cogs_per_unit",
          inputVal > 0 ? String(inputVal) : "",
        );
      } else {
        handleCellChange(
          yearOffset,
          field as "volume" | "nsp",
          String(inputVal),
        );
      }
    } else {
      setYearDataRecord({
        ...yearDataRecord,
        [yearOffset]: {
          ...yearDataRecord[yearOffset],
          [field]: String(inputVal),
        },
      });
    }

    setRawInputs((prev) => {
      const next = { ...prev };
      if (next[yearOffset]) {
        delete next[yearOffset][field as "volume" | "nsp" | "cogs"];
        if (Object.keys(next[yearOffset]).length === 0) {
          delete next[yearOffset];
        }
      }
      return next;
    });
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Loading...</DialogTitle>
            <DialogDescription>
              Please wait while we load the business case data.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">
              Loading business case data...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (isEditMode && step === "data" && yearDataArray.length === 0 && !loading) {
    error(
      "BusinessCaseModal: Edit mode with no data loaded. groupId:",
      groupId,
    );
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Error Loading Business Case</DialogTitle>
            <DialogDescription>
              Unable to load business case data. The business case may have been
              deleted or is unavailable.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center">
            <p className="text-muted-foreground mb-4">
              Please close this dialog and try again.
            </p>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <ErrorBoundary>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={
            step === "data"
              ? "max-w-[90vw] max-h-[90vh] overflow-y-auto"
              : "max-w-4xl max-h-[90vh] overflow-y-auto"
          }
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isEditMode || existingGroupId
                ? formulationName
                  ? `Edit Business Case - ${formulationName}`
                  : "Edit Business Case"
                : "Create Business Case"}
              <Badge variant="outline" className="text-xs font-normal gap-1">
                <GitBranch className="h-3 w-3" />
                {isEditMode || existingGroupId
                  ? "Creates New Version"
                  : "Version Controlled"}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the 10-year financial projections for this business case. Changes create a new version."
                : existingGroupId
                  ? "Create a new version of this business case with updated projections."
                  : "Define 10-year revenue and margin projections for a formulation in a specific market."}
            </DialogDescription>
          </DialogHeader>

          {step === "select" ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Country <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.country_id}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      country_id: value,
                      formulation_id: "",
                      use_group_ids: [],
                    });
                  }}
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
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Formulation <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={
                      !formData.country_id
                        ? "Select country first"
                        : "Search formulations..."
                    }
                    value={formulationSearch}
                    onChange={(e) => setFormulationSearch(e.target.value)}
                    disabled={!formData.country_id}
                    className="pl-9"
                  />
                </div>
                {formData.country_id && (
                  <div className="border rounded-md max-h-[280px] overflow-y-auto mt-2">
                    {filteredFormulations.length === 0 ? (
                      <div className="p-4 text-sm text-muted-foreground text-center">
                        No formulations match your search
                      </div>
                    ) : (
                      <div className="divide-y">
                        {filteredFormulations.map((f) => {
                          const name =
                            "product_name" in f
                              ? f.product_name
                              : f.formulation_name;
                          const code = f.formulation_code || "";
                          const activeIngredients =
                            "active_ingredients" in f
                              ? f.active_ingredients
                              : null;

                          return (
                            <button
                              type="button"
                              key={f.formulation_id}
                              className="w-full p-3 hover:bg-accent cursor-pointer transition-colors text-left"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  formulation_id: f.formulation_id || "",
                                  use_group_ids: [],
                                });
                                setFormulationSearch("");
                              }}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <span className="font-medium text-sm">
                                    {name || code}
                                  </span>
                                  {activeIngredients && (
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                      {activeIngredients}
                                    </p>
                                  )}
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {f.uom || "L"}
                                </Badge>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {formData.formulation_id && formData.country_id && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Use Group <span className="text-destructive">*</span>
                  </Label>
                  <div className="space-y-2 max-h-[250px] overflow-y-auto border rounded-md p-2">
                    {useGroupOptions.map((ug) => {
                      const isSelected = formData.use_group_ids.includes(ug.id);
                      return (
                        <Card
                          key={ug.id}
                          className={cn(
                            "cursor-pointer transition-all hover:shadow-sm",
                            isSelected && "ring-2 ring-primary bg-primary/5",
                          )}
                          onClick={() => {
                            const newSelected = isSelected
                              ? formData.use_group_ids.filter(
                                  (id) => id !== ug.id,
                                )
                              : [...formData.use_group_ids, ug.id];
                            setFormData({
                              ...formData,
                              use_group_ids: newSelected,
                            });
                          }}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  "mt-0.5 h-4 w-4 rounded border flex items-center justify-center flex-shrink-0",
                                  isSelected
                                    ? "bg-primary border-primary"
                                    : "border-input",
                                )}
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
                                {ug.targetMarketEntry ? (
                                  <div className="mt-1.5 text-xs text-muted-foreground">
                                    Effective FY Start: {ug.targetMarketEntry}
                                  </div>
                                ) : (
                                  <div className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">
                                    No effective fiscal year start set
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {formData.use_group_ids.length > 0 && (
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
                      Selected use groups do not have effective fiscal year
                      start set
                    </div>
                  )}
                  {targetEntryError && (
                    <p className="text-xs text-destructive">
                      {targetEntryError}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Business Case Name
                </Label>
                <Input
                  placeholder="Optional: Give this business case a descriptive name"
                  value={formData.business_case_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      business_case_name: e.target.value,
                    })
                  }
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={
                    !!targetEntryError ||
                    !targetMarketEntry ||
                    permissionsLoading ||
                    !canCreateBusinessCases
                  }
                >
                  Next →
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="edit" className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  Data
                </TabsTrigger>
                {(yearDataArray[0]?.formulation_country_use_group_id ||
                  useGroupIdForHistory) && (
                  <TabsTrigger value="history" className="gap-2">
                    <History className="h-4 w-4" />
                    Version History
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="edit" className="space-y-6">
                {(existingGroupId || isEditMode) && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded text-sm text-blue-900 dark:text-blue-100 flex items-start gap-2">
                    <GitBranch className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>
                        {isEditMode
                          ? "Editing existing business case."
                          : "Existing business case found."}
                      </strong>{" "}
                      Saving will create a new version and archive the current
                      one. Previous versions are preserved for audit tracking.
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {formulationName} | {countryName}{" "}
                    {useGroupName && `| ${useGroupName}`}
                  </span>
                  <span>Effective FY Start: {effectiveStartFiscalYear}</span>
                </div>

                {changedCells.size > 0 && (
                  <div className="text-xs text-amber-600 dark:text-amber-400">
                    {changedCells.size}{" "}
                    {changedCells.size === 1 ? "cell" : "cells"} modified from
                    current version
                  </div>
                )}

                <BusinessCaseYearEditor
                  fiscalYearColumns={fiscalYearColumns}
                  yearDataRecord={yearDataRecord}
                  yearDataArray={yearDataArray}
                  isEditMode={isEditMode}
                  displayUnit={displayUnit}
                  currencySymbol={currencySymbol}
                  rawInputs={rawInputs}
                  focusedInputs={focusedInputs}
                  onChanged={() => {}}
                  onRawInputChange={handleRawInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  convertQuantityForDisplay={convertQuantityForDisplay}
                  convertQuantityToBase={convertQuantityToBase}
                  convertPerUnitForDisplay={convertPerUnitForDisplay}
                  convertPerUnitToBase={convertPerUnitToBase}
                  shadowData={shadowData}
                  changedCells={changedCells}
                  calculateMetrics={calculateMetrics}
                />

                {(existingGroupId || isEditMode) && (
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <Label
                      htmlFor="change_reason"
                      className="text-sm text-muted-foreground whitespace-nowrap"
                    >
                      Update reason<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="change_reason"
                      placeholder="e.g., 'Revised per Q3 data', 'Distributor feedback'"
                      value={formData.change_reason}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          change_reason: e.target.value,
                        })
                      }
                      className={`flex-1 h-9 ${!formData.change_reason.trim() ? "border-destructive/50" : ""}`}
                    />
                  </div>
                )}

                <DialogFooter>
                  {!isEditMode && (
                    <Button
                      variant="outline"
                      onClick={() => setStep("select")}
                      disabled={isPending}
                    >
                      ← Back
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={
                      isPending ||
                      permissionsLoading ||
                      (existingGroupId || isEditMode
                        ? !canEditBusinessCases
                        : !canCreateBusinessCases)
                    }
                  >
                    {isPending ? "Saving..." : "Save Business Case"}
                  </Button>
                </DialogFooter>
              </TabsContent>

              {(yearDataArray[0]?.formulation_country_use_group_id ||
                useGroupIdForHistory) && (
                <TabsContent value="history">
                  <BusinessCaseVersionHistory
                    useGroupId={
                      yearDataArray[0]?.formulation_country_use_group_id ||
                      useGroupIdForHistory ||
                      ""
                    }
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
    </ErrorBoundary>
  );
}
