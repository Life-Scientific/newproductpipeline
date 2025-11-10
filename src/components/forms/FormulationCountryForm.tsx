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
import { MultiSelect, type MultiSelectOption } from "@/components/ui/multi-select";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type FormulationCountry = Database["public"]["Tables"]["formulation_country"]["Row"];
type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];
type Crop = Database["public"]["Tables"]["crops"]["Row"];
type Target = Database["public"]["Tables"]["targets"]["Row"];

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
const EFFICACY_LEVELS = ["Excellent", "Good", "Moderate", "Fair"];

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
  const [isPending, startTransition] = useTransition();
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [targets, setTargets] = useState<Target[]>([]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [targetEfficacy, setTargetEfficacy] = useState<Record<string, string>>({});

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
    if (open) {
      loadData();
      if (formulationCountry) {
        loadExistingRelations();
      }
    }
  }, [open, formulationCountry]);

  const loadData = async () => {
    const supabase = createClient();

    // Load formulations
    const { data: formulationsData } = await supabase
      .from("vw_formulations_with_ingredients")
      .select("formulation_id, formulation_code, product_name")
      .order("formulation_code");
    if (formulationsData) setFormulations(formulationsData as Formulation[]);

    // Load countries
    const { data: countriesData } = await supabase
      .from("countries")
      .select("*")
      .eq("is_active", true)
      .order("country_name");
    if (countriesData) setCountries(countriesData);

    // Load crops
    const { data: cropsData } = await supabase
      .from("crops")
      .select("*")
      .eq("is_active", true)
      .order("crop_name");
    if (cropsData) setCrops(cropsData);

    // Load targets
    const { data: targetsData } = await supabase
      .from("targets")
      .select("*")
      .eq("is_active", true)
      .order("target_name");
    if (targetsData) setTargets(targetsData);
  };

  const loadExistingRelations = async () => {
    if (!formulationCountry) return;
    const supabase = createClient();

    // Load crops
    const { data: cropsData } = await supabase
      .from("formulation_country_crops")
      .select("crop_id")
      .eq("formulation_country_id", formulationCountry.formulation_country_id);
    if (cropsData) {
      setSelectedCrops(cropsData.map((c) => c.crop_id));
    }

    // Load targets
    const { data: targetsData } = await supabase
      .from("formulation_country_targets")
      .select("target_id, efficacy_level")
      .eq("formulation_country_id", formulationCountry.formulation_country_id);
    if (targetsData) {
      setSelectedTargets(targetsData.map((t) => t.target_id));
      const efficacyMap: Record<string, string> = {};
      targetsData.forEach((t) => {
        if (t.efficacy_level) efficacyMap[t.target_id] = t.efficacy_level;
      });
      setTargetEfficacy(efficacyMap);
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

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        form.append(key, value.toString());
      }
    });

    // Add crops and targets as JSON
    const cropsData = selectedCrops.map((cropId) => ({ crop_id: cropId }));
    form.append("crops", JSON.stringify(cropsData));

    const targetsData = selectedTargets.map((targetId) => ({
      target_id: targetId,
      efficacy_level: targetEfficacy[targetId] || null,
    }));
    form.append("targets", JSON.stringify(targetsData));

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

  const cropOptions: MultiSelectOption[] = crops.map((crop) => ({
    value: crop.crop_id,
    label: crop.crop_name,
  }));

  const targetOptions: MultiSelectOption[] = targets.map((target) => ({
    value: target.target_id,
    label: `${target.target_name} (${target.target_type})`,
  }));

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
              <Select
                value={formData.formulation_id}
                onValueChange={(value) => setFormData({ ...formData, formulation_id: value })}
                required
                disabled={!!formulationCountry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select formulation" />
                </SelectTrigger>
                <SelectContent>
                  {formulations.map((f) => (
                    <SelectItem key={f.formulation_id} value={f.formulation_id}>
                      {f.formulation_code} - {f.product_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country_id">
                Country <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.country_id}
                onValueChange={(value) => setFormData({ ...formData, country_id: value })}
                required
                disabled={!!formulationCountry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.country_id} value={c.country_id}>
                      {c.country_name} ({c.country_code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registration_pathway">Registration Pathway</Label>
              <Select
                value={formData.registration_pathway}
                onValueChange={(value) =>
                  setFormData({ ...formData, registration_pathway: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pathway" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
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

          <div className="space-y-2">
            <Label>Crops (Normal Use)</Label>
            <MultiSelect
              options={cropOptions}
              selected={selectedCrops}
              onChange={setSelectedCrops}
              placeholder="Select crops..."
            />
          </div>

          <div className="space-y-2">
            <Label>Targets</Label>
            <MultiSelect
              options={targetOptions}
              selected={selectedTargets}
              onChange={setSelectedTargets}
              placeholder="Select targets..."
            />
            {selectedTargets.length > 0 && (
              <div className="mt-2 space-y-2">
                {selectedTargets.map((targetId) => {
                  const target = targets.find((t) => t.target_id === targetId);
                  return (
                    <div key={targetId} className="flex items-center gap-2">
                      <Label className="text-sm w-32">{target?.target_name}:</Label>
                      <Select
                        value={targetEfficacy[targetId] || ""}
                        onValueChange={(value) =>
                          setTargetEfficacy({ ...targetEfficacy, [targetId]: value })
                        }
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Efficacy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {EFFICACY_LEVELS.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
              </div>
            )}
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
