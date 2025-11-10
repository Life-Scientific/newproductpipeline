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
import { useToast } from "@/components/ui/use-toast";
import { MultiSelect, type MultiSelectOption } from "@/components/ui/multi-select";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type FormulationCountryLabel = Database["public"]["Tables"]["formulation_country_label"]["Row"];
type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type Crop = Database["public"]["Tables"]["crops"]["Row"];
type ReferenceProduct = Database["public"]["Tables"]["reference_products"]["Row"];

interface FormulationCountryLabelFormProps {
  formulationCountryLabel?: FormulationCountryLabel | null;
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

export function FormulationCountryLabelForm({
  formulationCountryLabel,
  open,
  onOpenChange,
  onSuccess,
  defaultFormulationCountryId,
}: FormulationCountryLabelFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formulationCountries, setFormulationCountries] = useState<FormulationCountryDetail[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [referenceProducts, setReferenceProducts] = useState<ReferenceProduct[]>([]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    formulation_country_id:
      formulationCountryLabel?.formulation_country_id || defaultFormulationCountryId || "",
    label_variant: formulationCountryLabel?.label_variant || "",
    label_name: formulationCountryLabel?.label_name || "",
    reference_product_id: formulationCountryLabel?.reference_product_id || "",
    registration_status: formulationCountryLabel?.registration_status || "",
    earliest_submission_date: formulationCountryLabel?.earliest_submission_date || "",
    earliest_approval_date: formulationCountryLabel?.earliest_approval_date || "",
    earliest_market_entry_date: formulationCountryLabel?.earliest_market_entry_date || "",
    actual_submission_date: formulationCountryLabel?.actual_submission_date || "",
    actual_approval_date: formulationCountryLabel?.actual_approval_date || "",
    actual_market_entry_date: formulationCountryLabel?.actual_market_entry_date || "",
  });

  useEffect(() => {
    if (open) {
      loadData();
      if (formulationCountryLabel) {
        loadExistingCrops();
      }
    }
  }, [open, formulationCountryLabel]);

  const loadData = async () => {
    const supabase = createClient();

    // Load formulation countries
    const { data: fcData } = await supabase
      .from("vw_formulation_country_detail")
      .select("formulation_country_id, display_name, formulation_code, country_name")
      .order("display_name");
    if (fcData) setFormulationCountries(fcData as FormulationCountryDetail[]);

    // Load crops
    const { data: cropsData } = await supabase
      .from("crops")
      .select("*")
      .eq("is_active", true)
      .order("crop_name");
    if (cropsData) setCrops(cropsData);

    // Load reference products
    const { data: refData } = await supabase
      .from("reference_products")
      .select("*")
      .eq("is_active", true)
      .order("product_name");
    if (refData) setReferenceProducts(refData);
  };

  const loadExistingCrops = async () => {
    if (!formulationCountryLabel) return;
    const supabase = createClient();

    const { data: cropsData } = await supabase
      .from("formulation_country_label_crops")
      .select("crop_id")
      .eq("formulation_country_label_id", formulationCountryLabel.formulation_country_label_id);
    if (cropsData) {
      setSelectedCrops(cropsData.map((c) => c.crop_id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.formulation_country_id || !formData.label_variant) {
      toast({
        title: "Error",
        description: "Formulation-country and label variant are required",
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

    startTransition(async () => {
      try {
        const action = formulationCountryLabel
          ? await import("@/lib/actions/formulation-country-label").then((m) =>
              m.updateFormulationCountryLabel(
                formulationCountryLabel.formulation_country_label_id,
                form
              )
            )
          : await import("@/lib/actions/formulation-country-label").then((m) =>
              m.createFormulationCountryLabel(form)
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
            description: formulationCountryLabel
              ? "Label updated successfully"
              : "Label created successfully",
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

  const cropOptions: MultiSelectOption[] = crops.map((crop) => ({
    value: crop.crop_id,
    label: crop.crop_name,
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formulationCountryLabel ? "Edit Label Registration" : "Add Label Registration"}
          </DialogTitle>
          <DialogDescription>
            {formulationCountryLabel
              ? "Update label registration details"
              : "Create a new label registration for a formulation-country combination"}
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
                onValueChange={(value) =>
                  setFormData({ ...formData, formulation_country_id: value })
                }
                required
                disabled={!!formulationCountryLabel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select formulation-country" />
                </SelectTrigger>
                <SelectContent>
                  {formulationCountries.map((fc) => (
                    <SelectItem key={fc.formulation_country_id} value={fc.formulation_country_id}>
                      {fc.display_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="label_variant">
                Label Variant <span className="text-destructive">*</span>
              </Label>
              <Input
                id="label_variant"
                value={formData.label_variant}
                onChange={(e) => setFormData({ ...formData, label_variant: e.target.value })}
                placeholder="A, B, C, etc."
                required
                disabled={!!formulationCountryLabel}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="label_name">Label Name</Label>
              <Input
                id="label_name"
                value={formData.label_name}
                onChange={(e) => setFormData({ ...formData, label_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference_product_id">Reference Product</Label>
              <Select
                value={formData.reference_product_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, reference_product_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reference product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
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
              value={formData.registration_status}
              onValueChange={(value) =>
                setFormData({ ...formData, registration_status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
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

          <div className="space-y-2">
            <Label>Crops (Intended Use)</Label>
            <MultiSelect
              options={cropOptions}
              selected={selectedCrops}
              onChange={setSelectedCrops}
              placeholder="Select crops for this label..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} size="lg" className="h-12 px-6">
              {isPending ? "Saving..." : formulationCountryLabel ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
