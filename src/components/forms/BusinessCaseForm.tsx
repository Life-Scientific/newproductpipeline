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
import { getFormulationCountryDetails } from "@/lib/db/queries";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Tables"]["business_case"]["Row"];
type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];

interface BusinessCaseFormProps {
  businessCase?: BusinessCase | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  defaultFormulationCountryId?: string;
  defaultFormulationCountryLabelId?: string;
}

const BUSINESS_CASE_TYPES = [
  "Single Label",
  "All Labels (Formulation-Country)",
  "Multiple Labels",
  "Product Portfolio",
];

const CONFIDENCE_LEVELS = ["Low", "Medium", "High"];

export function BusinessCaseForm({
  businessCase,
  open,
  onOpenChange,
  onSuccess,
  defaultFormulationCountryId,
  defaultFormulationCountryLabelId,
}: BusinessCaseFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formulationCountryOptions, setFormulationCountryOptions] = useState<
    FormulationCountryDetail[]
  >([]);
  const [formData, setFormData] = useState({
    formulation_country_id: businessCase?.formulation_country_id || defaultFormulationCountryId || "",
    formulation_country_label_id:
      businessCase?.formulation_country_label_id || defaultFormulationCountryLabelId || "",
    business_case_name: businessCase?.business_case_name || "",
    business_case_type: businessCase?.business_case_type || "Single Label",
    year_offset: businessCase?.year_offset?.toString() || "1",
    volume: businessCase?.volume?.toString() || "",
    nsp: businessCase?.nsp?.toString() || "",
    cogs_per_unit: businessCase?.cogs_per_unit?.toString() || "",
    fiscal_year: businessCase?.fiscal_year || "",
    scenario_name: businessCase?.scenario_name || "",
    assumptions: businessCase?.assumptions || "",
    confidence_level: businessCase?.confidence_level || "",
  });

  useEffect(() => {
    // Load formulation country options if needed
    if (formData.formulation_country_id && !businessCase) {
      // This would need to be done server-side or via API
      // For now, we'll leave it empty
    }
  }, [formData.formulation_country_id, businessCase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.formulation_country_id && !formData.formulation_country_label_id) {
      toast({
        title: "Error",
        description: "Must link to either formulation-country or label",
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
        const action = businessCase
          ? await import("@/lib/actions/business-cases").then((m) =>
              m.updateBusinessCase(businessCase.business_case_id, form)
            )
          : await import("@/lib/actions/business-cases").then((m) => m.createBusinessCase(form));

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
          <DialogTitle>
            {businessCase ? "Edit Business Case" : "Create Business Case"}
          </DialogTitle>
          <DialogDescription>
            {businessCase
              ? "Update business case details"
              : "Create a new financial projection"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business_case_name">Business Case Name</Label>
              <Input
                id="business_case_name"
                value={formData.business_case_name}
                onChange={(e) =>
                  setFormData({ ...formData, business_case_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_case_type">Business Case Type</Label>
              <Select
                value={formData.business_case_type}
                onValueChange={(value) =>
                  setFormData({ ...formData, business_case_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_CASE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="fiscal_year">Fiscal Year</Label>
              <Input
                id="fiscal_year"
                value={formData.fiscal_year}
                onChange={(e) =>
                  setFormData({ ...formData, fiscal_year: e.target.value })
                }
                placeholder="FY2025"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="volume">Volume</Label>
              <Input
                id="volume"
                type="number"
                step="0.01"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nsp">NSP</Label>
              <Input
                id="nsp"
                type="number"
                step="0.01"
                value={formData.nsp}
                onChange={(e) => setFormData({ ...formData, nsp: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cogs_per_unit">COGS per Unit</Label>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scenario_name">Scenario Name</Label>
              <Input
                id="scenario_name"
                value={formData.scenario_name}
                onChange={(e) =>
                  setFormData({ ...formData, scenario_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confidence_level">Confidence Level</Label>
              <Select
                value={formData.confidence_level}
                onValueChange={(value) =>
                  setFormData({ ...formData, confidence_level: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select confidence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {CONFIDENCE_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assumptions">Assumptions</Label>
            <Textarea
              id="assumptions"
              value={formData.assumptions}
              onChange={(e) => setFormData({ ...formData, assumptions: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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

