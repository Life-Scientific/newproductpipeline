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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from "@/hooks/use-supabase";
import type { Database } from "@/lib/supabase/database.types";
import { FormulationSelector } from "./FormulationSelector";
import { CountrySelector } from "./CountrySelector";

type FormulationCountry = Database["public"]["Tables"]["formulation_country"]["Row"];
type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];

interface FormulationCountryFormProps {
  formulationCountry?: FormulationCountry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  defaultFormulationId?: string;
  defaultCountryId?: string;
}

const REGISTRATION_PATHWAYS = ["Article 33 - New", "Article 34 - Me-too", "Other"];
const REGISTRATION_STATUSES = [
  "Not Started",
  "In Progress",
  "Submitted",
  "Approved",
  "Rejected",
  "Withdrawn",
];

export function FormulationCountryForm({
  formulationCountry,
  open,
  onOpenChange,
  onSuccess,
  defaultFormulationId,
  defaultCountryId,
}: FormulationCountryFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = useSupabase();
  const [isPending, startTransition] = useTransition();
  const [selectedFormulation, setSelectedFormulation] = useState<Formulation | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [formData, setFormData] = useState({
    formulation_id: formulationCountry?.formulation_id || defaultFormulationId || "",
    country_id: formulationCountry?.country_id || defaultCountryId || "",
    registration_pathway: formulationCountry?.registration_pathway || "",
    registration_status: formulationCountry?.registration_status || "",
    target_market_entry_fy: formulationCountry?.target_market_entry_fy || "",
    emd: formulationCountry?.emd || "",
    keyedin_project_ids: formulationCountry?.keyedin_project_ids || "",
    is_novel: formulationCountry?.is_novel || false,
    is_eu_approved_formulation: formulationCountry?.is_eu_approved_formulation || false,
    is_in_active_portfolio: formulationCountry?.is_in_active_portfolio || false,
    has_approval: formulationCountry?.has_approval || false,
  });

  useEffect(() => {
    if (open && formulationCountry) {
      // Load selected formulation and country for display
      loadSelectedItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, formulationCountry]);

  const loadSelectedItems = async () => {
    if (!formulationCountry) return;

    // Load selected formulation
    const { data: formulationData } = await supabase
      .from("vw_formulations_with_ingredients")
      .select("formulation_id, formulation_code, product_name, formulation_name")
      .eq("formulation_id", formulationCountry.formulation_id)
      .single();
    if (formulationData) setSelectedFormulation(formulationData as Formulation);

    // Load selected country
    const { data: countryData } = await supabase
      .from("countries")
      .select("*")
      .eq("country_id", formulationCountry.country_id)
      .single();
    if (countryData) setSelectedCountry(countryData);
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

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        form.append(key, value.toString());
      }
    });

    // Note: Crops and targets are now managed at formulation level via EPPO codes,
    // not at formulation_country level

    startTransition(async () => {
      try {
        const action = formulationCountry
          ? await import("@/lib/actions/formulation-country").then((m) =>
              m.updateFormulationCountry(formulationCountry.formulation_country_id, form)
            )
          : await import("@/lib/actions/formulation-country").then((m) =>
              m.createFormulationCountry(form)
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
            description: formulationCountry
              ? "Formulation-country updated successfully"
              : "Formulation-country created successfully",
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formulationCountry ? "Edit Formulation-Country" : "Add Formulation to Country"}
          </DialogTitle>
          <DialogDescription>
            {formulationCountry
              ? "Update registration details"
              : "Register a formulation in a specific country"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="formulation_id">
                Formulation <span className="text-destructive">*</span>
              </Label>
              <FormulationSelector
                value={formData.formulation_id}
                onValueChange={(value) => setFormData({ ...formData, formulation_id: value })}
                placeholder="Search formulations..."
                disabled={!!formulationCountry}
                required
                selectedFormulation={selectedFormulation}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country_id">
                Country <span className="text-destructive">*</span>
              </Label>
              <CountrySelector
                value={formData.country_id}
                onValueChange={(value) => setFormData({ ...formData, country_id: value })}
                placeholder="Search countries..."
                disabled={!!formulationCountry}
                required
                selectedCountry={selectedCountry}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registration_pathway">Registration Pathway</Label>
              <Select
                value={formData.registration_pathway || "__none__"}
                onValueChange={(value) =>
                  setFormData({ ...formData, registration_pathway: value === "__none__" ? "" : value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pathway" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">None</SelectItem>
                  {REGISTRATION_PATHWAYS.map((pathway) => (
                    <SelectItem key={pathway} value={pathway}>
                      {pathway}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target_market_entry_fy">Target Market Entry FY</Label>
              <Input
                id="target_market_entry_fy"
                value={formData.target_market_entry_fy}
                onChange={(e) =>
                  setFormData({ ...formData, target_market_entry_fy: e.target.value })
                }
                placeholder="FY2025"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emd">EMD Date</Label>
              <Input
                id="emd"
                type="date"
                value={formData.emd ? formData.emd.split("T")[0] : ""}
                onChange={(e) => setFormData({ ...formData, emd: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyedin_project_ids">KeyedIn Project IDs</Label>
            <Textarea
              id="keyedin_project_ids"
              value={formData.keyedin_project_ids}
              onChange={(e) => setFormData({ ...formData, keyedin_project_ids: e.target.value })}
              rows={2}
              placeholder="Enter project IDs separated by commas"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_novel"
                checked={formData.is_novel}
                onCheckedChange={(checked) => setFormData({ ...formData, is_novel: checked })}
              />
              <Label htmlFor="is_novel">Is Novel</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_eu_approved_formulation"
                checked={formData.is_eu_approved_formulation}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_eu_approved_formulation: checked })
                }
              />
              <Label htmlFor="is_eu_approved_formulation">EU Approved Formulation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_in_active_portfolio"
                checked={formData.is_in_active_portfolio}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_in_active_portfolio: checked })
                }
              />
              <Label htmlFor="is_in_active_portfolio">In Active Portfolio</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="has_approval"
                checked={formData.has_approval}
                onCheckedChange={(checked) => setFormData({ ...formData, has_approval: checked })}
              />
              <Label htmlFor="has_approval">Has Approval</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} size="lg" className="h-12 px-6">
              {isPending ? "Saving..." : formulationCountry ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
