"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select";
import { EPPOCodeMultiSelect } from "./EPPOCodeMultiSelect";
import { FormulationCountrySelector } from "./FormulationCountrySelector";
import { useSupabase } from "@/hooks/use-supabase";
import type { Database } from "@/lib/supabase/database.types";

type FormulationCountryUseGroup =
  Database["public"]["Tables"]["formulation_country_use_group"]["Row"];
type FormulationCountryDetail =
  Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type EPPOCode = Database["public"]["Tables"]["eppo_codes"]["Row"];
type ReferenceProduct =
  Database["public"]["Tables"]["reference_products"]["Row"];

interface FormulationCountryUseGroupFormProps {
  formulationCountryUseGroup?: FormulationCountryUseGroup | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  defaultFormulationCountryId?: string;
}

const REGISTRATION_STATUSES = [
  "Not Started",
  "In Progress",
  "Submitted",
  "Approved",
  "Rejected",
  "Withdrawn",
];

export function FormulationCountryUseGroupForm({
  formulationCountryUseGroup,
  open,
  onOpenChange,
  onSuccess,
  defaultFormulationCountryId,
}: FormulationCountryUseGroupFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = useSupabase();
  const [isPending, startTransition] = useTransition();
  const [selectedFormulationCountry, setSelectedFormulationCountry] =
    useState<FormulationCountryDetail | null>(null);
  const [formulationEppoCrops, setFormulationEppoCrops] = useState<EPPOCode[]>(
    [],
  );
  const [formulationEppoTargets, setFormulationEppoTargets] = useState<
    EPPOCode[]
  >([]);
  const [referenceProducts, setReferenceProducts] = useState<
    ReferenceProduct[]
  >([]);
  const [selectedEppoCropIds, setSelectedEppoCropIds] = useState<string[]>([]);
  const [selectedEppoTargetIds, setSelectedEppoTargetIds] = useState<string[]>(
    [],
  );
  const [eppoCropsCritical, setEppoCropsCritical] = useState<
    Record<string, boolean>
  >({});
  const [eppoTargetsCritical, setEppoTargetsCritical] = useState<
    Record<string, boolean>
  >({});
  const [formulationId, setFormulationId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    formulation_country_id:
      formulationCountryUseGroup?.formulation_country_id ||
      defaultFormulationCountryId ||
      "",
    use_group_variant: formulationCountryUseGroup?.use_group_variant || "",
    use_group_name: formulationCountryUseGroup?.use_group_name || "",
    reference_product_id:
      formulationCountryUseGroup?.reference_product_id || "",
    use_group_status:
      ("use_group_status" in (formulationCountryUseGroup || {})
        ? (formulationCountryUseGroup as any).use_group_status
        : "") || "",
    earliest_planned_submission_date:
      ("earliest_planned_submission_date" in (formulationCountryUseGroup || {})
        ? (formulationCountryUseGroup as any).earliest_planned_submission_date
        : "") || "",
    earliest_planned_approval_date:
      ("earliest_planned_approval_date" in (formulationCountryUseGroup || {})
        ? (formulationCountryUseGroup as any).earliest_planned_approval_date
        : "") || "",
    earliest_actual_submission_date:
      ("earliest_actual_submission_date" in (formulationCountryUseGroup || {})
        ? (formulationCountryUseGroup as any).earliest_actual_submission_date
        : "") || "",
    earliest_actual_approval_date:
      ("earliest_actual_approval_date" in (formulationCountryUseGroup || {})
        ? (formulationCountryUseGroup as any).earliest_actual_approval_date
        : "") || "",
    // earliest_market_entry_date and actual_market_entry_date removed from use group schema
  });

  useEffect(() => {
    if (open) {
      loadData();
      if (formulationCountryUseGroup) {
        loadExistingCropsAndTargets();
      } else if (formData.formulation_country_id) {
        // When creating new use group, load formulation crops/targets and pre-select all as critical
        loadFormulationCropsAndTargets(formData.formulation_country_id);
      }
    }
  }, [open, formulationCountryUseGroup, formData.formulation_country_id]);

  const loadData = async () => {
    // Load reference products
    const { data: refData } = await supabase
      .from("reference_products")
      .select("*")
      .eq("is_active", true)
      .order("product_name");
    if (refData) setReferenceProducts(refData);

    // Load selected formulation country if editing
    if (formulationCountryUseGroup?.formulation_country_id) {
      const { data: fcData } = await supabase
        .from("vw_formulation_country_detail")
        .select(
          "formulation_country_id, display_name, formulation_code, country_name",
        )
        .eq(
          "formulation_country_id",
          formulationCountryUseGroup.formulation_country_id,
        )
        .single();
      if (fcData)
        setSelectedFormulationCountry(fcData as FormulationCountryDetail);
    }
  };

  const loadFormulationCropsAndTargets = async (
    formulationCountryId: string,
  ) => {
    // Get formulation_id from formulation_country
    const { data: fcData } = await supabase
      .from("formulation_country")
      .select("formulation_id")
      .eq("formulation_country_id", formulationCountryId)
      .single();

    if (!fcData) return;

    const fcDataTyped = fcData as { formulation_id: string };
    setFormulationId(fcDataTyped.formulation_id);

    // Load formulation EPPO crops using server action
    const { getFormulationCrops } = await import("@/lib/actions/eppo-codes");
    const cropsResult = await getFormulationCrops(fcDataTyped.formulation_id);

    if (cropsResult.data) {
      // Get full EPPO code details
      const cropEppoIds = cropsResult.data.map((c: any) => c.eppo_code_id);
      const { data: eppoCodesData } = await supabase
        .from("eppo_codes")
        .select("*")
        .in("eppo_code_id", cropEppoIds);

      if (eppoCodesData) {
        setFormulationEppoCrops(eppoCodesData);
        // Pre-select ALL formulation crops as CRITICAL when creating new use group
        setSelectedEppoCropIds(cropEppoIds);
        const criticalMap: Record<string, boolean> = {};
        cropEppoIds.forEach((eppoCodeId: string) => {
          criticalMap[eppoCodeId] = true; // All critical by default
        });
        setEppoCropsCritical(criticalMap);
      }
    }

    // Load formulation EPPO targets using server action
    const { getFormulationTargets } = await import("@/lib/actions/eppo-codes");
    const targetsResult = await getFormulationTargets(
      fcDataTyped.formulation_id,
    );

    if (targetsResult.data) {
      // Get full EPPO code details
      const targetEppoIds = targetsResult.data.map((t: any) => t.eppo_code_id);
      const { data: eppoCodesData } = await supabase
        .from("eppo_codes")
        .select("*")
        .in("eppo_code_id", targetEppoIds);

      if (eppoCodesData) {
        setFormulationEppoTargets(eppoCodesData);
        // Pre-select ALL formulation targets as CRITICAL when creating new use group
        setSelectedEppoTargetIds(targetEppoIds);
        const criticalMap: Record<string, boolean> = {};
        targetEppoIds.forEach((eppoCodeId: string) => {
          criticalMap[eppoCodeId] = true; // All critical by default
        });
        setEppoTargetsCritical(criticalMap);
      }
    }
  };

  const loadExistingCropsAndTargets = async () => {
    if (!formulationCountryUseGroup) return;
    // Get formulation_id
    const { data: fcData } = await supabase
      .from("formulation_country")
      .select("formulation_id")
      .eq(
        "formulation_country_id",
        formulationCountryUseGroup.formulation_country_id,
      )
      .single();

    if (!fcData) return;

    const fcDataTyped2 = fcData as { formulation_id: string };
    setFormulationId(fcDataTyped2.formulation_id);

    // Load formulation EPPO crops (for reference - all available options)
    const { getFormulationCrops } = await import("@/lib/actions/eppo-codes");
    const cropsResult = await getFormulationCrops(fcDataTyped2.formulation_id);

    if (cropsResult.data) {
      const cropEppoIds = cropsResult.data.map((c: any) => c.eppo_code_id);
      const { data: eppoCodesData } = await supabase
        .from("eppo_codes")
        .select("*")
        .in("eppo_code_id", cropEppoIds);
      if (eppoCodesData) setFormulationEppoCrops(eppoCodesData);
    }

    // Load formulation EPPO targets (for reference - all available options)
    const { getFormulationTargets } = await import("@/lib/actions/eppo-codes");
    const targetsResult = await getFormulationTargets(
      fcDataTyped2.formulation_id,
    );

    if (targetsResult.data) {
      const targetEppoIds = targetsResult.data.map((t: any) => t.eppo_code_id);
      const { data: eppoCodesData } = await supabase
        .from("eppo_codes")
        .select("*")
        .in("eppo_code_id", targetEppoIds);
      if (eppoCodesData) setFormulationEppoTargets(eppoCodesData);
    }

    // Load existing use group EPPO crops with critical flags
    const { data: useGroupCrops } = await supabase
      .from("formulation_country_use_group_eppo_crops")
      .select("eppo_code_id, is_critical")
      .eq(
        "formulation_country_use_group_id",
        formulationCountryUseGroup.formulation_country_use_group_id,
      );

    if (useGroupCrops) {
      const cropsTyped = useGroupCrops as any[];
      setSelectedEppoCropIds(cropsTyped.map((c: any) => c.eppo_code_id));
      const criticalMap: Record<string, boolean> = {};
      cropsTyped.forEach((c: any) => {
        criticalMap[c.eppo_code_id] = c.is_critical || false;
      });
      setEppoCropsCritical(criticalMap);
    }

    // Load existing use group EPPO targets with critical flags
    const { data: useGroupTargets } = await supabase
      .from("formulation_country_use_group_eppo_targets")
      .select("eppo_code_id, is_critical")
      .eq(
        "formulation_country_use_group_id",
        formulationCountryUseGroup.formulation_country_use_group_id,
      );

    if (useGroupTargets) {
      const targetsTyped = useGroupTargets as any[];
      setSelectedEppoTargetIds(targetsTyped.map((t: any) => t.eppo_code_id));
      const criticalMap: Record<string, boolean> = {};
      targetsTyped.forEach((t: any) => {
        criticalMap[t.eppo_code_id] = t.is_critical || false;
      });
      setEppoTargetsCritical(criticalMap);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.formulation_country_id || !formData.use_group_variant) {
      toast({
        title: "Error",
        description: "Formulation-country and use group variant are required",
        variant: "destructive",
      });
      return;
    }

    // Validate at least one EPPO crop AND one EPPO target
    if (selectedEppoCropIds.length === 0) {
      toast({
        title: "Error",
        description: "At least one crop must be selected",
        variant: "destructive",
      });
      return;
    }

    if (selectedEppoTargetIds.length === 0) {
      toast({
        title: "Error",
        description: "At least one target must be selected",
        variant: "destructive",
      });
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        form.append(key, value.toString());
      }
    });

    form.append("eppo_crop_ids", JSON.stringify(selectedEppoCropIds));
    form.append("eppo_target_ids", JSON.stringify(selectedEppoTargetIds));
    form.append("eppo_crops_critical", JSON.stringify(eppoCropsCritical));
    form.append("eppo_targets_critical", JSON.stringify(eppoTargetsCritical));

    startTransition(async () => {
      try {
        const action = formulationCountryUseGroup
          ? await import("@/lib/actions/formulation-country-use-group").then(
              (m) =>
                m.updateFormulationCountryUseGroup(
                  formulationCountryUseGroup.formulation_country_use_group_id,
                  form,
                ),
            )
          : await import("@/lib/actions/formulation-country-use-group").then(
              (m) => m.createFormulationCountryUseGroup(form),
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
            description: formulationCountryUseGroup
              ? "Use group updated successfully"
              : "Use group created successfully",
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

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return dateStr.split("T")[0];
  };

  // Handle formulation country change - load crops/targets
  const handleFormulationCountryChange = (value: string) => {
    setFormData({ ...formData, formulation_country_id: value });
    if (!formulationCountryUseGroup) {
      // Creating new use group - load and pre-select all crops/targets as critical
      loadFormulationCropsAndTargets(value);
    } else {
      // Editing - just load for reference
      loadFormulationCropsAndTargets(value);
    }
  };

  // EPPO Crop options from formulation EPPO crops only
  const eppoCropOptions: MultiSelectOption[] = formulationEppoCrops.map(
    (eppoCode) => ({
      value: eppoCode.eppo_code_id,
      label: eppoCode.display_name || eppoCode.latin_name || eppoCode.eppo_code,
    }),
  );

  // EPPO Target options from formulation EPPO targets only
  const eppoTargetOptions: MultiSelectOption[] = formulationEppoTargets.map(
    (eppoCode) => ({
      value: eppoCode.eppo_code_id,
      label: eppoCode.display_name || eppoCode.latin_name || eppoCode.eppo_code,
    }),
  );

  // Group EPPO crops by critical/non-critical, then alphabetize
  const criticalEppoCrops = selectedEppoCropIds
    .filter((eppoCodeId) => eppoCropsCritical[eppoCodeId] === true)
    .map((eppoCodeId) =>
      formulationEppoCrops.find((c) => c.eppo_code_id === eppoCodeId),
    )
    .filter((c): c is EPPOCode => c !== undefined)
    .sort((a, b) =>
      (a.display_name || a.latin_name || "").localeCompare(
        b.display_name || b.latin_name || "",
      ),
    );

  const nonCriticalEppoCrops = selectedEppoCropIds
    .filter((eppoCodeId) => eppoCropsCritical[eppoCodeId] !== true)
    .map((eppoCodeId) =>
      formulationEppoCrops.find((c) => c.eppo_code_id === eppoCodeId),
    )
    .filter((c): c is EPPOCode => c !== undefined)
    .sort((a, b) =>
      (a.display_name || a.latin_name || "").localeCompare(
        b.display_name || b.latin_name || "",
      ),
    );

  // Group EPPO targets by critical/non-critical, then alphabetize
  const criticalEppoTargets = selectedEppoTargetIds
    .filter((eppoCodeId) => eppoTargetsCritical[eppoCodeId] === true)
    .map((eppoCodeId) =>
      formulationEppoTargets.find((t) => t.eppo_code_id === eppoCodeId),
    )
    .filter((t): t is EPPOCode => t !== undefined)
    .sort((a, b) =>
      (a.display_name || a.latin_name || "").localeCompare(
        b.display_name || b.latin_name || "",
      ),
    );

  const nonCriticalEppoTargets = selectedEppoTargetIds
    .filter((eppoCodeId) => eppoTargetsCritical[eppoCodeId] !== true)
    .map((eppoCodeId) =>
      formulationEppoTargets.find((t) => t.eppo_code_id === eppoCodeId),
    )
    .filter((t): t is EPPOCode => t !== undefined)
    .sort((a, b) =>
      (a.display_name || a.latin_name || "").localeCompare(
        b.display_name || b.latin_name || "",
      ),
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formulationCountryUseGroup
              ? "Edit Use Group Registration"
              : "Add Use Group Registration"}
          </DialogTitle>
          <DialogDescription>
            {formulationCountryUseGroup
              ? "Update use group registration details"
              : "Create a new use group registration for a formulation-country combination"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="formulation_country_id">
                Formulation-Country <span className="text-destructive">*</span>
              </Label>
              <FormulationCountrySelector
                value={formData.formulation_country_id}
                onValueChange={handleFormulationCountryChange}
                placeholder="Search formulation-country combinations..."
                disabled={!!formulationCountryUseGroup}
                required
                selectedFormulationCountry={
                  selectedFormulationCountry || undefined
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="use_group_variant">
                Use Group Variant <span className="text-destructive">*</span>
              </Label>
              <Input
                id="use_group_variant"
                value={formData.use_group_variant}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    use_group_variant: e.target.value,
                  })
                }
                placeholder="A, B, C, etc."
                required
                disabled={!!formulationCountryUseGroup}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="use_group_name">Use Group Name</Label>
              <Input
                id="use_group_name"
                value={formData.use_group_name}
                onChange={(e) =>
                  setFormData({ ...formData, use_group_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference_product_id">Reference Product</Label>
              <Select
                value={formData.reference_product_id || "__none__"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    reference_product_id: value === "__none__" ? "" : value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reference product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">None</SelectItem>
                  {referenceProducts.map((rp) => (
                    <SelectItem
                      key={rp.reference_product_id}
                      value={rp.reference_product_id}
                    >
                      {rp.product_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registration_status">Registration Status</Label>
            <Select
              value={formData.use_group_status || "__none__"}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  use_group_status: value === "__none__" ? "" : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">None</SelectItem>
                {REGISTRATION_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">
              Earliest Dates (Predicted)
            </Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="earliest_submission_date">
                  Submission Date
                </Label>
                <Input
                  id="earliest_submission_date"
                  type="date"
                  value={formatDate(formData.earliest_planned_submission_date)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      earliest_planned_submission_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="earliest_approval_date">Approval Date</Label>
                <Input
                  id="earliest_approval_date"
                  type="date"
                  value={formatDate(formData.earliest_planned_approval_date)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      earliest_planned_approval_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="earliest_market_entry_date">
                  Market Entry Date
                </Label>
                <Input
                  id="earliest_market_entry_date"
                  type="date"
                  value="" // earliest_market_entry_date removed from use group schema
                  onChange={() => {}}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Actual Dates</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="actual_submission_date">Submission Date</Label>
                <Input
                  id="actual_submission_date"
                  type="date"
                  value={formatDate(formData.earliest_actual_submission_date)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      earliest_actual_submission_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actual_approval_date">Approval Date</Label>
                <Input
                  id="actual_approval_date"
                  type="date"
                  value={formatDate(formData.earliest_actual_approval_date)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      earliest_actual_approval_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actual_market_entry_date">
                  Market Entry Date
                </Label>
                <Input
                  id="actual_market_entry_date"
                  type="date"
                  value="" // actual_market_entry_date removed from use group schema
                  onChange={() => {}}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* EPPO Crops Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Crops (Intended Use) <span className="text-destructive">*</span>
              </Label>
              {formulationEppoCrops.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  Select from {formulationEppoCrops.length} formulation crop
                  {formulationEppoCrops.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            {formulationEppoCrops.length === 0 &&
              formData.formulation_country_id && (
                <p className="text-sm text-muted-foreground">
                  No crops defined for this formulation. Please add crops at the
                  formulation level first.
                </p>
              )}
            {formulationEppoCrops.length > 0 && (
              <>
                <EPPOCodeMultiSelect
                  selected={selectedEppoCropIds}
                  onChange={setSelectedEppoCropIds}
                  classification="crop"
                  placeholder="Search and select crops for this use group..."
                  searchPlaceholder="Type crop name, EPPO code, or latin name..."
                  allowedEppoCodeIds={formulationEppoCrops.map(
                    (c) => c.eppo_code_id,
                  )}
                  showCode={true}
                />
                {selectedEppoCropIds.length > 0 && (
                  <div className="space-y-3 mt-4 p-4 border rounded-lg bg-muted/50">
                    {/* Critical EPPO Crops */}
                    {criticalEppoCrops.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-green-700 dark:text-green-400">
                          Critical Crops
                        </Label>
                        <div className="space-y-2 pl-4">
                          {criticalEppoCrops.map((eppoCode) => (
                            <div
                              key={eppoCode.eppo_code_id}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                checked={
                                  eppoCropsCritical[eppoCode.eppo_code_id] ===
                                  true
                                }
                                onCheckedChange={(checked) =>
                                  setEppoCropsCritical({
                                    ...eppoCropsCritical,
                                    [eppoCode.eppo_code_id]: checked === true,
                                  })
                                }
                              />
                              <Label className="text-sm font-normal">
                                {eppoCode.display_name ||
                                  eppoCode.latin_name ||
                                  eppoCode.eppo_code}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Non-Critical EPPO Crops */}
                    {nonCriticalEppoCrops.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Non-Critical Crops
                        </Label>
                        <div className="space-y-2 pl-4">
                          {nonCriticalEppoCrops.map((eppoCode) => (
                            <div
                              key={eppoCode.eppo_code_id}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                checked={
                                  eppoCropsCritical[eppoCode.eppo_code_id] ===
                                  true
                                }
                                onCheckedChange={(checked) =>
                                  setEppoCropsCritical({
                                    ...eppoCropsCritical,
                                    [eppoCode.eppo_code_id]: checked === true,
                                  })
                                }
                              />
                              <Label className="text-sm font-normal">
                                {eppoCode.display_name ||
                                  eppoCode.latin_name ||
                                  eppoCode.eppo_code}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* EPPO Targets Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Targets (Intended Use){" "}
                <span className="text-destructive">*</span>
              </Label>
              {formulationEppoTargets.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  Select from {formulationEppoTargets.length} formulation target
                  {formulationEppoTargets.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            {formulationEppoTargets.length === 0 &&
              formData.formulation_country_id && (
                <p className="text-sm text-muted-foreground">
                  No targets defined for this formulation. Please add targets at
                  the formulation level first.
                </p>
              )}
            {formulationEppoTargets.length > 0 && (
              <>
                <EPPOCodeMultiSelect
                  selected={selectedEppoTargetIds}
                  onChange={setSelectedEppoTargetIds}
                  classification={["insect", "disease", "weed"]}
                  placeholder="Search and select targets for this use group..."
                  searchPlaceholder="Type target name, EPPO code, or latin name..."
                  allowedEppoCodeIds={formulationEppoTargets.map(
                    (t) => t.eppo_code_id,
                  )}
                  showCode={true}
                />
                {selectedEppoTargetIds.length > 0 && (
                  <div className="space-y-3 mt-4 p-4 border rounded-lg bg-muted/50">
                    {/* Critical EPPO Targets */}
                    {criticalEppoTargets.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-green-700 dark:text-green-400">
                          Critical Targets
                        </Label>
                        <div className="space-y-2 pl-4">
                          {criticalEppoTargets.map((eppoCode) => (
                            <div
                              key={eppoCode.eppo_code_id}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                checked={
                                  eppoTargetsCritical[eppoCode.eppo_code_id] ===
                                  true
                                }
                                onCheckedChange={(checked) =>
                                  setEppoTargetsCritical({
                                    ...eppoTargetsCritical,
                                    [eppoCode.eppo_code_id]: checked === true,
                                  })
                                }
                              />
                              <Label className="text-sm font-normal">
                                {eppoCode.display_name ||
                                  eppoCode.latin_name ||
                                  eppoCode.eppo_code}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Non-Critical EPPO Targets */}
                    {nonCriticalEppoTargets.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Non-Critical Targets
                        </Label>
                        <div className="space-y-2 pl-4">
                          {nonCriticalEppoTargets.map((eppoCode) => (
                            <div
                              key={eppoCode.eppo_code_id}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                checked={
                                  eppoTargetsCritical[eppoCode.eppo_code_id] ===
                                  true
                                }
                                onCheckedChange={(checked) =>
                                  setEppoTargetsCritical({
                                    ...eppoTargetsCritical,
                                    [eppoCode.eppo_code_id]: checked === true,
                                  })
                                }
                              />
                              <Label className="text-sm font-normal">
                                {eppoCode.display_name ||
                                  eppoCode.latin_name ||
                                  eppoCode.eppo_code}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="h-12 px-6"
            >
              {isPending
                ? "Saving..."
                : formulationCountryUseGroup
                  ? "Update"
                  : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
