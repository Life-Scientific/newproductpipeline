"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useSupabase } from "@/hooks/use-supabase";
import type { Database } from "@/lib/supabase/database.types";
import { FormulationSelector } from "./FormulationSelector";
import { CountrySelector } from "./CountrySelector";
import { UseGroupMultiSelect } from "./UseGroupMultiSelect";

type BusinessCase = Database["public"]["Tables"]["business_case"]["Row"];
type Formulation =
  Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];
type FormulationCountryUseGroup =
  Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];

/**
 * @deprecated This component uses single-record actions that don't handle versioning properly.
 * Use BusinessCaseModal instead, which uses group-based actions (createBusinessCaseGroupAction/updateBusinessCaseGroupAction)
 * that properly check for existing business cases and supersede old versions.
 * 
 * This component is kept for legacy support only and should not be used in new code.
 */
interface BusinessCaseFormProps {
  businessCase?: BusinessCase | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  defaultFormulationId?: string;
  defaultCountryId?: string;
}

/**
 * @deprecated Use BusinessCaseModal instead. This form doesn't handle versioning properly.
 */
export function BusinessCaseForm({
  businessCase,
  open,
  onOpenChange,
  onSuccess,
  defaultFormulationId,
  defaultCountryId,
}: BusinessCaseFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = useSupabase();
  const [isPending, startTransition] = useTransition();
  const [selectedFormulation, setSelectedFormulation] =
    useState<Formulation | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedUseGroups, setSelectedUseGroups] = useState<
    FormulationCountryUseGroup[]
  >([]);
  const [selectedUseGroupIds, setSelectedUseGroupIds] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    formulation_id: "",
    country_id: "",
    business_case_name: businessCase?.business_case_name || "",
    year_offset: businessCase?.year_offset?.toString() || "1",
    volume: businessCase?.volume?.toString() || "",
    nsp: businessCase?.nsp?.toString() || "",
    cogs_per_unit: businessCase?.cogs_per_unit?.toString() || "",
    fiscal_year:
      ("fiscal_year" in (businessCase || {})
        ? (businessCase as any).fiscal_year
        : "") || "",
    assumptions: businessCase?.assumptions || "",
  });

  // Load existing business case data when editing
  useEffect(() => {
    if (open && businessCase) {
      loadExistingBusinessCaseData();
    } else if (open) {
      // Set defaults for new business case
      if (defaultFormulationId) {
        setFormData((prev) => ({
          ...prev,
          formulation_id: defaultFormulationId,
        }));
      }
      if (defaultCountryId) {
        setFormData((prev) => ({ ...prev, country_id: defaultCountryId }));
      }
    }
  }, [open, businessCase]);

  // Load selected items for display when editing
  useEffect(() => {
    if (open && businessCase) {
      loadExistingBusinessCaseData();
    } else if (open) {
      // Set defaults for new business case
      if (defaultFormulationId) {
        setFormData((prev) => ({
          ...prev,
          formulation_id: defaultFormulationId,
        }));
      }
      if (defaultCountryId) {
        setFormData((prev) => ({ ...prev, country_id: defaultCountryId }));
      }
    }
  }, [open, businessCase, defaultFormulationId, defaultCountryId]);

  // Load selected formulation and country for display
  useEffect(() => {
    if (formData.formulation_id) {
      supabase
        .from("vw_formulations_with_ingredients")
        .select("formulation_id, formulation_code, product_name")
        .eq("formulation_id", formData.formulation_id)
        .single()
        .then(({ data }) => {
          if (data) setSelectedFormulation(data as Formulation);
        });
    } else {
      setSelectedFormulation(null);
    }
  }, [formData.formulation_id, supabase]);

  useEffect(() => {
    if (formData.country_id) {
      supabase
        .from("countries")
        .select("*")
        .eq("country_id", formData.country_id)
        .single()
        .then(({ data }) => {
          if (data) setSelectedCountry(data);
        });
    } else {
      setSelectedCountry(null);
    }
  }, [formData.country_id, supabase]);

  // Load use groups when both formulation and country are selected
  useEffect(() => {
    if (formData.formulation_id && formData.country_id) {
      loadUseGroups(formData.formulation_id, formData.country_id);
    } else {
      setSelectedUseGroups([]);
      setSelectedUseGroupIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.formulation_id, formData.country_id]); // loadUseGroups is stable function using supabase

  const loadExistingBusinessCaseData = async () => {
    if (!businessCase) return;

    // Get use groups for this business case from junction table
    const { data: junctionData } = await supabase
      .from("business_case_use_groups")
      .select(`
        formulation_country_use_group_id,
        formulation_country_use_group!inner(
          formulation_country_id,
          use_group_variant,
          use_group_name,
          display_name,
          formulation_code,
          country_name,
          formulation_country!inner(
            formulation_id,
            country_id
          )
        )
      `)
      .eq("business_case_id", businessCase.business_case_id);

    if (junctionData && junctionData.length > 0) {
      const junctionDataTyped = junctionData as any[];
      // Get first use group to determine formulation and country
      const firstUseGroup = junctionDataTyped[0]
        ?.formulation_country_use_group as any;
      const fc = firstUseGroup?.formulation_country;

      if (fc) {
        setFormData((prev) => ({
          ...prev,
          formulation_id: fc.formulation_id || "",
          country_id: fc.country_id || "",
        }));

        // Set selected use group IDs (using formulation_country_use_group_id)
        const useGroupIds = junctionDataTyped
          .map(
            (j) =>
              (j.formulation_country_use_group as any)
                ?.formulation_country_use_group_id,
          )
          .filter((id): id is string => Boolean(id));
        setSelectedUseGroupIds(useGroupIds);

        // Set selected use groups for display
        const useGroups = junctionDataTyped
          .map((j) => j.formulation_country_use_group as any)
          .filter((ug): ug is FormulationCountryUseGroup => Boolean(ug));
        setSelectedUseGroups(useGroups);
      }
    }
  };

  const loadUseGroups = async (formulationId: string, countryId: string) => {
    // First, find the formulation_country_id
    const { data: fcData } = await supabase
      .from("formulation_country")
      .select("formulation_country_id")
      .eq("formulation_id", formulationId)
      .eq("country_id", countryId)
      .single();

    if (!fcData) {
      setSelectedUseGroups([]);
      return;
    }

    const fcDataTyped = fcData as { formulation_country_id: string };

    // Load use groups for that formulation_country
    const { data } = await supabase
      .from("vw_formulation_country_use_group")
      .select(
        "formulation_country_use_group_id, use_group_variant, use_group_name, display_name, formulation_code, country_name",
      )
      .eq("formulation_country_id", fcDataTyped.formulation_country_id)
      .order("use_group_variant");

    if (data) {
      const useGroups = data as FormulationCountryUseGroup[];
      setSelectedUseGroups(useGroups);

      // If editing and we have selected IDs, match them to the loaded use groups
      if (businessCase && selectedUseGroupIds.length > 0) {
        // Keep existing selection - IDs should match
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.formulation_id || !formData.country_id) {
      toast({
        title: "Error",
        description: "Formulation and country are required",
        variant: "destructive",
      });
      return;
    }

    if (!selectedUseGroupIds || selectedUseGroupIds.length === 0) {
      toast({
        title: "Error",
        description: "At least one use group must be selected",
        variant: "destructive",
      });
      return;
    }

    const form = new FormData();
    form.append("formulation_id", formData.formulation_id);
    form.append("country_id", formData.country_id);
    selectedUseGroupIds.forEach((id) => {
      form.append("use_group_ids", id);
    });
    form.append("business_case_name", formData.business_case_name);
    form.append("year_offset", formData.year_offset);
    if (formData.volume) form.append("volume", formData.volume);
    if (formData.nsp) form.append("nsp", formData.nsp);
    if (formData.cogs_per_unit)
      form.append("cogs_per_unit", formData.cogs_per_unit);
    if (formData.fiscal_year) form.append("fiscal_year", formData.fiscal_year);
    if (formData.assumptions) form.append("assumptions", formData.assumptions);

    startTransition(async () => {
      try {
        const action = businessCase
          ? await import("@/lib/actions/business-cases").then((m) =>
              m.updateBusinessCase(businessCase.business_case_id, form),
            )
          : await import("@/lib/actions/business-cases").then((m) =>
              m.createBusinessCase(form),
            );

        if (action.error) {
          toast({
            title: "Error",
            description: action.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: businessCase
              ? "Business case updated successfully"
              : "Business case created successfully",
          });
          onOpenChange(false);
          if (onSuccess) onSuccess();
          router.refresh();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create/Update Business Case</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 border-b pb-4">
            <Label className="text-base font-semibold">Product Selection</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="formulation_id">
                  Formulation <span className="text-destructive">*</span>
                </Label>
                <FormulationSelector
                  value={formData.formulation_id}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      formulation_id: value,
                      country_id: "",
                    })
                  }
                  placeholder="Search formulations..."
                  required
                  selectedFormulation={selectedFormulation || undefined}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country_id">
                  Country <span className="text-destructive">*</span>
                </Label>
                <CountrySelector
                  value={formData.country_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, country_id: value })
                  }
                  placeholder="Search countries..."
                  required
                  disabled={!formData.formulation_id}
                  selectedCountry={selectedCountry || undefined}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="use_groups">
                  Use Groups <span className="text-destructive">*</span>
                </Label>
                <UseGroupMultiSelect
                  selected={selectedUseGroupIds}
                  onChange={setSelectedUseGroupIds}
                  placeholder={
                    !formData.formulation_id || !formData.country_id
                      ? "Select formulation and country first"
                      : "Search and select use groups..."
                  }
                  disabled={!formData.formulation_id || !formData.country_id}
                  formulationId={formData.formulation_id || undefined}
                  countryId={formData.country_id || undefined}
                  selectedUseGroups={selectedUseGroups}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business_case_name">Business Case Name</Label>
              <Input
                id="business_case_name"
                value={formData.business_case_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    business_case_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year_offset">
                Year Offset <span className="text-destructive">*</span>
              </Label>
              <Input
                id="year_offset"
                type="number"
                min="1"
                max="10"
                value={formData.year_offset}
                onChange={(e) =>
                  setFormData({ ...formData, year_offset: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="fiscal_year">Fiscal Year</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Auto-calculated from target market entry FY + year offset,
                      but can be overridden
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="fiscal_year"
              value={formData.fiscal_year}
              onChange={(e) =>
                setFormData({ ...formData, fiscal_year: e.target.value })
              }
              placeholder="FY2025"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="volume">Volume</Label>
              <Input
                id="volume"
                type="number"
                step="0.01"
                value={formData.volume}
                onChange={(e) =>
                  setFormData({ ...formData, volume: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nsp">NSP</Label>
              <Input
                id="nsp"
                type="number"
                step="0.01"
                value={formData.nsp}
                onChange={(e) =>
                  setFormData({ ...formData, nsp: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="cogs_per_unit">COGS per Unit</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Auto-populated from COGS table based on fiscal year, but
                        can be overridden
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="cogs_per_unit"
                type="number"
                step="0.01"
                value={formData.cogs_per_unit}
                onChange={(e) =>
                  setFormData({ ...formData, cogs_per_unit: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assumptions">Assumptions</Label>
            <Textarea
              id="assumptions"
              value={formData.assumptions}
              onChange={(e) =>
                setFormData({ ...formData, assumptions: e.target.value })
              }
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : businessCase ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
