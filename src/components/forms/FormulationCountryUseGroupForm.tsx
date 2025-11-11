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
import { MultiSelect, type MultiSelectOption } from "@/components/ui/multi-select";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type FormulationCountryUseGroup = Database["public"]["Tables"]["formulation_country_use_group"]["Row"];
type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type Crop = Database["public"]["Tables"]["crops"]["Row"];
type Target = Database["public"]["Tables"]["targets"]["Row"];
type ReferenceProduct = Database["public"]["Tables"]["reference_products"]["Row"];

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
  const [isPending, startTransition] = useTransition();
  const [formulationCountries, setFormulationCountries] = useState<FormulationCountryDetail[]>([]);
  const [formulationCrops, setFormulationCrops] = useState<Crop[]>([]);
  const [formulationTargets, setFormulationTargets] = useState<Target[]>([]);
  const [referenceProducts, setReferenceProducts] = useState<ReferenceProduct[]>([]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [cropsCritical, setCropsCritical] = useState<Record<string, boolean>>({});
  const [targetsCritical, setTargetsCritical] = useState<Record<string, boolean>>({});
  const [formulationId, setFormulationId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    formulation_country_id:
      formulationCountryUseGroup?.formulation_country_id || defaultFormulationCountryId || "",
    use_group_variant: formulationCountryUseGroup?.use_group_variant || "",
    use_group_name: formulationCountryUseGroup?.use_group_name || "",
    reference_product_id: formulationCountryUseGroup?.reference_product_id || "",
    registration_status: formulationCountryUseGroup?.registration_status || "",
    earliest_submission_date: formulationCountryUseGroup?.earliest_submission_date || "",
    earliest_approval_date: formulationCountryUseGroup?.earliest_approval_date || "",
    earliest_market_entry_date: formulationCountryUseGroup?.earliest_market_entry_date || "",
    actual_submission_date: formulationCountryUseGroup?.actual_submission_date || "",
    actual_approval_date: formulationCountryUseGroup?.actual_approval_date || "",
    actual_market_entry_date: formulationCountryUseGroup?.actual_market_entry_date || "",
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
    const supabase = createClient();

    // Load formulation countries
    const { data: fcData } = await supabase
      .from("vw_formulation_country_detail")
      .select("formulation_country_id, display_name, formulation_code, country_name")
      .order("display_name");
    if (fcData) setFormulationCountries(fcData as FormulationCountryDetail[]);

    // Load reference products
    const { data: refData } = await supabase
      .from("reference_products")
      .select("*")
      .eq("is_active", true)
      .order("product_name");
    if (refData) setReferenceProducts(refData);
  };

  const loadFormulationCropsAndTargets = async (formulationCountryId: string) => {
    const supabase = createClient();

    // Get formulation_id from formulation_country
    const { data: fcData } = await supabase
      .from("formulation_country")
      .select("formulation_id")
      .eq("formulation_country_id", formulationCountryId)
      .single();

    if (!fcData) return;

    setFormulationId(fcData.formulation_id);

    // Load formulation crops (normal use - global superset)
    const { data: fcCrops } = await supabase
      .from("formulation_crops")
      .select("crop_id")
      .eq("formulation_id", fcData.formulation_id);

    if (fcCrops && fcCrops.length > 0) {
      const cropIds = fcCrops.map(fc => fc.crop_id).filter(Boolean) as string[];
      const { data: cropsData } = await supabase
        .from("crops")
        .select("*")
        .in("crop_id", cropIds)
        .eq("is_active", true)
        .order("crop_name");
      if (cropsData) {
        setFormulationCrops(cropsData);
        // Pre-select ALL formulation crops as CRITICAL when creating new use group
        setSelectedCrops(cropIds);
        const criticalMap: Record<string, boolean> = {};
        cropIds.forEach(cropId => {
          criticalMap[cropId] = true; // All critical by default
        });
        setCropsCritical(criticalMap);
      }
    }

    // Load formulation targets (normal use - global superset)
    const { data: ftTargets } = await supabase
      .from("formulation_targets")
      .select("target_id")
      .eq("formulation_id", fcData.formulation_id);

    if (ftTargets && ftTargets.length > 0) {
      const targetIds = ftTargets.map(ft => ft.target_id).filter(Boolean) as string[];
      const { data: targetsData } = await supabase
        .from("targets")
        .select("*")
        .in("target_id", targetIds)
        .eq("is_active", true)
        .order("target_name");
      if (targetsData) {
        setFormulationTargets(targetsData);
        // Pre-select ALL formulation targets as CRITICAL when creating new use group
        setSelectedTargets(targetIds);
        const criticalMap: Record<string, boolean> = {};
        targetIds.forEach(targetId => {
          criticalMap[targetId] = true; // All critical by default
        });
        setTargetsCritical(criticalMap);
      }
    }
  };

  const loadExistingCropsAndTargets = async () => {
    if (!formulationCountryUseGroup) return;
    const supabase = createClient();

    // Get formulation_id
    const { data: fcData } = await supabase
      .from("formulation_country")
      .select("formulation_id")
      .eq("formulation_country_id", formulationCountryUseGroup.formulation_country_id)
      .single();

    if (!fcData) return;

    setFormulationId(fcData.formulation_id);

    // Load formulation crops (for reference)
    const { data: fcCrops } = await supabase
      .from("formulation_crops")
      .select("crop_id")
      .eq("formulation_id", fcData.formulation_id);

    if (fcCrops && fcCrops.length > 0) {
      const cropIds = fcCrops.map(fc => fc.crop_id).filter(Boolean) as string[];
      const { data: cropsData } = await supabase
        .from("crops")
        .select("*")
        .in("crop_id", cropIds)
        .eq("is_active", true)
        .order("crop_name");
      if (cropsData) setFormulationCrops(cropsData);
    }

    // Load formulation targets (for reference)
    const { data: ftTargets } = await supabase
      .from("formulation_targets")
      .select("target_id")
      .eq("formulation_id", fcData.formulation_id);

    if (ftTargets && ftTargets.length > 0) {
      const targetIds = ftTargets.map(ft => ft.target_id).filter(Boolean) as string[];
      const { data: targetsData } = await supabase
        .from("targets")
        .select("*")
        .in("target_id", targetIds)
        .eq("is_active", true)
        .order("target_name");
      if (targetsData) setFormulationTargets(targetsData);
    }

    // Load existing use group crops with critical flags
    const { data: useGroupCrops } = await supabase
      .from("formulation_country_use_group_crops")
      .select("crop_id, is_critical")
      .eq("formulation_country_use_group_id", formulationCountryUseGroup.formulation_country_use_group_id);
    
    if (useGroupCrops) {
      setSelectedCrops(useGroupCrops.map(c => c.crop_id));
      const criticalMap: Record<string, boolean> = {};
      useGroupCrops.forEach(c => {
        criticalMap[c.crop_id] = c.is_critical || false;
      });
      setCropsCritical(criticalMap);
    }

    // Load existing use group targets with critical flags
    const { data: useGroupTargets } = await supabase
      .from("formulation_country_use_group_targets")
      .select("target_id, is_critical")
      .eq("formulation_country_use_group_id", formulationCountryUseGroup.formulation_country_use_group_id);
    
    if (useGroupTargets) {
      setSelectedTargets(useGroupTargets.map(t => t.target_id));
      const criticalMap: Record<string, boolean> = {};
      useGroupTargets.forEach(t => {
        criticalMap[t.target_id] = t.is_critical || false;
      });
      setTargetsCritical(criticalMap);
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

    // Validate at least one crop AND one target
    if (selectedCrops.length === 0) {
      toast({
        title: "Error",
        description: "At least one crop must be selected",
        variant: "destructive",
      });
      return;
    }

    if (selectedTargets.length === 0) {
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

    form.append("crops", JSON.stringify(selectedCrops));
    form.append("targets", JSON.stringify(selectedTargets));
    form.append("crops_critical", JSON.stringify(cropsCritical));
    form.append("targets_critical", JSON.stringify(targetsCritical));

    startTransition(async () => {
      try {
        const action = formulationCountryUseGroup
          ? await import("@/lib/actions/formulation-country-use-group").then((m) =>
              m.updateFormulationCountryUseGroup(
                formulationCountryUseGroup.formulation_country_use_group_id,
                form
              )
            )
          : await import("@/lib/actions/formulation-country-use-group").then((m) =>
              m.createFormulationCountryUseGroup(form)
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

  // Crop options from formulation crops only
  const cropOptions: MultiSelectOption[] = formulationCrops.map((crop) => ({
    value: crop.crop_id,
    label: crop.crop_name,
  }));

  // Target options from formulation targets only
  const targetOptions: MultiSelectOption[] = formulationTargets.map((target) => ({
    value: target.target_id,
    label: target.target_name,
  }));

  // Group crops by critical/non-critical, then alphabetize
  const criticalCrops = selectedCrops
    .filter(cropId => cropsCritical[cropId] === true)
    .map(cropId => formulationCrops.find(c => c.crop_id === cropId))
    .filter((c): c is Crop => c !== undefined)
    .sort((a, b) => a.crop_name.localeCompare(b.crop_name));

  const nonCriticalCrops = selectedCrops
    .filter(cropId => cropsCritical[cropId] !== true)
    .map(cropId => formulationCrops.find(c => c.crop_id === cropId))
    .filter((c): c is Crop => c !== undefined)
    .sort((a, b) => a.crop_name.localeCompare(b.crop_name));

  // Group targets by critical/non-critical, then alphabetize
  const criticalTargets = selectedTargets
    .filter(targetId => targetsCritical[targetId] === true)
    .map(targetId => formulationTargets.find(t => t.target_id === targetId))
    .filter((t): t is Target => t !== undefined)
    .sort((a, b) => a.target_name.localeCompare(b.target_name));

  const nonCriticalTargets = selectedTargets
    .filter(targetId => targetsCritical[targetId] !== true)
    .map(targetId => formulationTargets.find(t => t.target_id === targetId))
    .filter((t): t is Target => t !== undefined)
    .sort((a, b) => a.target_name.localeCompare(b.target_name));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formulationCountryUseGroup ? "Edit Use Group Registration" : "Add Use Group Registration"}
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
              <Select
                value={formData.formulation_country_id}
                onValueChange={handleFormulationCountryChange}
                required
                disabled={!!formulationCountryUseGroup}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select formulation-country" />
                </SelectTrigger>
                <SelectContent>
                    {formulationCountries
                      .filter((fc) => fc.formulation_country_id)
                      .map((fc) => (
                        <SelectItem key={fc.formulation_country_id!} value={fc.formulation_country_id!}>
                          {fc.display_name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="use_group_variant">
                Use Group Variant <span className="text-destructive">*</span>
              </Label>
              <Input
                id="use_group_variant"
                value={formData.use_group_variant}
                onChange={(e) => setFormData({ ...formData, use_group_variant: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, use_group_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference_product_id">Reference Product</Label>
              <Select
                value={formData.reference_product_id || "__none__"}
                onValueChange={(value) =>
                  setFormData({ ...formData, reference_product_id: value === "__none__" ? "" : value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reference product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">None</SelectItem>
                  {referenceProducts.map((rp) => (
                    <SelectItem key={rp.reference_product_id} value={rp.reference_product_id}>
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
              value={formData.registration_status || "__none__"}
              onValueChange={(value) =>
                setFormData({ ...formData, registration_status: value === "__none__" ? "" : value })
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
            <Label className="text-base font-semibold">Earliest Dates (Predicted)</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="earliest_submission_date">Submission Date</Label>
                <Input
                  id="earliest_submission_date"
                  type="date"
                  value={formatDate(formData.earliest_submission_date)}
                  onChange={(e) =>
                    setFormData({ ...formData, earliest_submission_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="earliest_approval_date">Approval Date</Label>
                <Input
                  id="earliest_approval_date"
                  type="date"
                  value={formatDate(formData.earliest_approval_date)}
                  onChange={(e) =>
                    setFormData({ ...formData, earliest_approval_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="earliest_market_entry_date">Market Entry Date</Label>
                <Input
                  id="earliest_market_entry_date"
                  type="date"
                  value={formatDate(formData.earliest_market_entry_date)}
                  onChange={(e) =>
                    setFormData({ ...formData, earliest_market_entry_date: e.target.value })
                  }
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
                  value={formatDate(formData.actual_submission_date)}
                  onChange={(e) =>
                    setFormData({ ...formData, actual_submission_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actual_approval_date">Approval Date</Label>
                <Input
                  id="actual_approval_date"
                  type="date"
                  value={formatDate(formData.actual_approval_date)}
                  onChange={(e) =>
                    setFormData({ ...formData, actual_approval_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actual_market_entry_date">Market Entry Date</Label>
                <Input
                  id="actual_market_entry_date"
                  type="date"
                  value={formatDate(formData.actual_market_entry_date)}
                  onChange={(e) =>
                    setFormData({ ...formData, actual_market_entry_date: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Crops Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Crops (Intended Use) <span className="text-destructive">*</span>
              </Label>
              {formulationCrops.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  Select from {formulationCrops.length} formulation crop{formulationCrops.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            {formulationCrops.length === 0 && formData.formulation_country_id && (
              <p className="text-sm text-muted-foreground">
                No crops defined for this formulation. Please add crops at the formulation level first.
              </p>
            )}
            {formulationCrops.length > 0 && (
              <>
                <MultiSelect
                  options={cropOptions}
                  selected={selectedCrops}
                  onChange={setSelectedCrops}
                  placeholder="Select crops for this use group..."
                />
                {selectedCrops.length > 0 && (
                  <div className="space-y-3 mt-4 p-4 border rounded-lg bg-muted/50">
                    {/* Critical Crops */}
                    {criticalCrops.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-green-700 dark:text-green-400">
                          Critical Crops
                        </Label>
                        <div className="space-y-2 pl-4">
                          {criticalCrops.map((crop) => (
                            <div key={crop.crop_id} className="flex items-center gap-2">
                              <Checkbox
                                checked={cropsCritical[crop.crop_id] === true}
                                onCheckedChange={(checked) =>
                                  setCropsCritical({ ...cropsCritical, [crop.crop_id]: checked === true })
                                }
                              />
                              <Label className="text-sm font-normal">{crop.crop_name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Non-Critical Crops */}
                    {nonCriticalCrops.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Non-Critical Crops
                        </Label>
                        <div className="space-y-2 pl-4">
                          {nonCriticalCrops.map((crop) => (
                            <div key={crop.crop_id} className="flex items-center gap-2">
                              <Checkbox
                                checked={cropsCritical[crop.crop_id] === true}
                                onCheckedChange={(checked) =>
                                  setCropsCritical({ ...cropsCritical, [crop.crop_id]: checked === true })
                                }
                              />
                              <Label className="text-sm font-normal">{crop.crop_name}</Label>
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

          {/* Targets Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Targets (Intended Use) <span className="text-destructive">*</span>
              </Label>
              {formulationTargets.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  Select from {formulationTargets.length} formulation target{formulationTargets.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            {formulationTargets.length === 0 && formData.formulation_country_id && (
              <p className="text-sm text-muted-foreground">
                No targets defined for this formulation. Please add targets at the formulation level first.
              </p>
            )}
            {formulationTargets.length > 0 && (
              <>
                <MultiSelect
                  options={targetOptions}
                  selected={selectedTargets}
                  onChange={setSelectedTargets}
                  placeholder="Select targets for this use group..."
                />
                {selectedTargets.length > 0 && (
                  <div className="space-y-3 mt-4 p-4 border rounded-lg bg-muted/50">
                    {/* Critical Targets */}
                    {criticalTargets.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-green-700 dark:text-green-400">
                          Critical Targets
                        </Label>
                        <div className="space-y-2 pl-4">
                          {criticalTargets.map((target) => (
                            <div key={target.target_id} className="flex items-center gap-2">
                              <Checkbox
                                checked={targetsCritical[target.target_id] === true}
                                onCheckedChange={(checked) =>
                                  setTargetsCritical({ ...targetsCritical, [target.target_id]: checked === true })
                                }
                              />
                              <Label className="text-sm font-normal">{target.target_name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Non-Critical Targets */}
                    {nonCriticalTargets.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Non-Critical Targets
                        </Label>
                        <div className="space-y-2 pl-4">
                          {nonCriticalTargets.map((target) => (
                            <div key={target.target_id} className="flex items-center gap-2">
                              <Checkbox
                                checked={targetsCritical[target.target_id] === true}
                                onCheckedChange={(checked) =>
                                  setTargetsCritical({ ...targetsCritical, [target.target_id]: checked === true })
                                }
                              />
                              <Label className="text-sm font-normal">{target.target_name}</Label>
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} size="lg" className="h-12 px-6">
              {isPending ? "Saving..." : formulationCountryUseGroup ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
