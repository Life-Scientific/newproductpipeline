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
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type COGS = Database["public"]["Tables"]["cogs"]["Row"];
type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationCountry = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];

interface COGSFormProps {
  cogs?: COGS | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  defaultFormulationId?: string;
  defaultFormulationCountryId?: string;
}

export function COGSForm({
  cogs,
  open,
  onOpenChange,
  onSuccess,
  defaultFormulationId,
  defaultFormulationCountryId,
}: COGSFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [formulationCountries, setFormulationCountries] = useState<FormulationCountry[]>([]);
  const [formData, setFormData] = useState({
    formulation_id: cogs?.formulation_id || defaultFormulationId || "",
    formulation_country_id: cogs?.formulation_country_id || defaultFormulationCountryId || "",
    fiscal_year: cogs?.fiscal_year || "",
    cogs_value: cogs?.cogs_value?.toString() || "",
    raw_material_cost: cogs?.raw_material_cost?.toString() || "",
    manufacturing_cost: cogs?.manufacturing_cost?.toString() || "",
    packaging_cost: cogs?.packaging_cost?.toString() || "",
    other_costs: cogs?.other_costs?.toString() || "",
    notes: cogs?.notes || "",
  });

  useEffect(() => {
    if (open) {
      // Load formulations
      const supabase = createClient();
      supabase
        .from("vw_formulations_with_ingredients")
        .select("formulation_id, formulation_code, product_name")
        .order("formulation_code")
        .then(({ data }) => {
          if (data) setFormulations(data as Formulation[]);
        });

      // Load formulation countries if formulation is selected
      if (formData.formulation_id) {
        loadFormulationCountries(formData.formulation_id);
      }
    }
  }, [open]);

  useEffect(() => {
    if (formData.formulation_id) {
      loadFormulationCountries(formData.formulation_id);
    } else {
      setFormulationCountries([]);
      setFormData((prev) => ({ ...prev, formulation_country_id: "" }));
    }
  }, [formData.formulation_id]);

  const loadFormulationCountries = async (formulationId: string) => {
    const supabase = createClient();
    const { data: formulation } = await supabase
      .from("formulations")
      .select("formulation_code")
      .eq("formulation_id", formulationId)
      .single();

    if (formulation?.formulation_code) {
      const { data } = await supabase
        .from("vw_formulation_country_detail")
        .select("formulation_country_id, display_name, country_name")
        .eq("formulation_code", formulation.formulation_code)
        .order("country_name");

      if (data) setFormulationCountries(data as FormulationCountry[]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.formulation_id || !formData.fiscal_year || !formData.cogs_value) {
      toast({
        title: "Error",
        description: "Formulation, fiscal year, and COGS value are required",
        variant: "destructive",
      });
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value.toString());
    });

    startTransition(async () => {
      try {
        const action = cogs
          ? await import("@/lib/actions/cogs").then((m) =>
              m.updateCOGS(cogs.cogs_id, form)
            )
          : await import("@/lib/actions/cogs").then((m) => m.createCOGS(form));

        if (action.error) {
          toast({
            title: "Error",
            description: action.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: cogs ? "COGS updated successfully" : "COGS created successfully",
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
          <DialogTitle>{cogs ? "Edit COGS" : "Create COGS"}</DialogTitle>
          <DialogDescription>
            {cogs ? "Update cost of goods sold" : "Add new cost of goods sold entry"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="formulation_id">
                Formulation <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.formulation_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, formulation_id: value, formulation_country_id: "" })
                }
                required
                disabled={!!cogs}
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
              <Label htmlFor="formulation_country_id">Country (Optional)</Label>
              <Select
                value={formData.formulation_country_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, formulation_country_id: value })
                }
                disabled={!formData.formulation_id}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Global (no country)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Global (no country)</SelectItem>
                  {formulationCountries.map((fc) => (
                    <SelectItem key={fc.formulation_country_id} value={fc.formulation_country_id}>
                      {fc.country_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Leave empty for global COGS, or select a country for country-specific COGS
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fiscal_year">
                Fiscal Year <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fiscal_year"
                value={formData.fiscal_year}
                onChange={(e) => setFormData({ ...formData, fiscal_year: e.target.value })}
                placeholder="FY2025"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cogs_value">
                Total COGS Value <span className="text-destructive">*</span>
              </Label>
              <Input
                id="cogs_value"
                type="number"
                step="0.01"
                value={formData.cogs_value}
                onChange={(e) => setFormData({ ...formData, cogs_value: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-semibold">Cost Breakdown (Optional)</Label>
            <p className="text-xs text-muted-foreground">
              Break down the total COGS into components
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="raw_material_cost">Raw Material Cost</Label>
              <Input
                id="raw_material_cost"
                type="number"
                step="0.01"
                value={formData.raw_material_cost}
                onChange={(e) =>
                  setFormData({ ...formData, raw_material_cost: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturing_cost">Manufacturing Cost</Label>
              <Input
                id="manufacturing_cost"
                type="number"
                step="0.01"
                value={formData.manufacturing_cost}
                onChange={(e) =>
                  setFormData({ ...formData, manufacturing_cost: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="packaging_cost">Packaging Cost</Label>
              <Input
                id="packaging_cost"
                type="number"
                step="0.01"
                value={formData.packaging_cost}
                onChange={(e) => setFormData({ ...formData, packaging_cost: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other_costs">Other Costs</Label>
              <Input
                id="other_costs"
                type="number"
                step="0.01"
                value={formData.other_costs}
                onChange={(e) => setFormData({ ...formData, other_costs: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} size="lg" className="h-12 px-6">
              {isPending ? "Saving..." : cogs ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

