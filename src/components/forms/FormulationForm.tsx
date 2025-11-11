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
import { IngredientSelector, type IngredientInput } from "./IngredientSelector";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Tables"]["formulations"]["Row"];

interface FormulationFormProps {
  formulation?: Formulation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const PRODUCT_CATEGORIES = [
  "Herbicide",
  "Fungicide",
  "Insecticide",
  "Growth Regulator",
  "Adjuvant",
  "Seed Treatment",
];

const STATUS_OPTIONS = ["Not Yet Considered", "Selected", "Monitoring", "Killed"];

export function FormulationForm({
  formulation,
  open,
  onOpenChange,
  onSuccess,
}: FormulationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [ingredients, setIngredients] = useState<IngredientInput[]>([]);
  const [formData, setFormData] = useState({
    formulation_name: formulation?.formulation_name || "",
    formulation_category: formulation?.formulation_category || "",
    formulation_type: formulation?.formulation_type || "",
    uom: formulation?.uom || "L",
    short_name: formulation?.short_name || "",
    status: formulation?.status || "Not Yet Considered",
    status_rationale: formulation?.status_rationale || "",
  });

  useEffect(() => {
    if (open && formulation) {
      // Update form data when formulation changes
      setFormData({
        formulation_name: formulation.formulation_name || "",
        formulation_category: formulation.formulation_category || "",
        formulation_type: formulation.formulation_type || "",
        uom: formulation.uom || "L",
        short_name: formulation.short_name || "",
        status: formulation.status || "Not Yet Considered",
        status_rationale: formulation.status_rationale || "",
      });
      // Load existing ingredients when editing
      loadExistingIngredients();
    } else if (open && !formulation) {
      // Reset form data and ingredients when creating new
      setFormData({
        formulation_name: "",
        formulation_category: "",
        formulation_type: "",
        uom: "L",
        short_name: "",
        status: "Not Yet Considered",
        status_rationale: "",
      });
      setIngredients([]);
    }
  }, [open, formulation]);

  const loadExistingIngredients = async () => {
    if (!formulation) return;
    try {
      const supabase = createClient();
      const { data: existingIngredients, error } = await supabase
        .from("formulation_ingredients")
        .select(`
          *,
          ingredients (
            ingredient_id,
            ingredient_name,
            ingredient_type
          )
        `)
        .eq("formulation_id", formulation.formulation_id);

      if (error) {
        console.error("Failed to load ingredients:", error);
        return;
      }

      const ingredientInputs: IngredientInput[] = (existingIngredients || []).map((ing) => ({
        ingredient_id: ing.ingredient_id,
        quantity: ing.quantity.toString(),
        quantity_unit: ing.quantity_unit,
        ingredient_role: ing.ingredient_role || "",
        notes: ing.notes || "",
      }));
      setIngredients(ingredientInputs);
    } catch (error) {
      console.error("Failed to load ingredients:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    // Manually append all form fields to ensure Select values are included
    form.append("formulation_name", formData.formulation_name);
    form.append("formulation_category", formData.formulation_category);
    if (formData.formulation_type) form.append("formulation_type", formData.formulation_type);
    if (formData.uom) form.append("uom", formData.uom);
    if (formData.short_name) form.append("short_name", formData.short_name);
    form.append("status", formData.status);
    if (formData.status_rationale) form.append("status_rationale", formData.status_rationale);

    // Add ingredients data
    form.append("ingredients", JSON.stringify(ingredients));

    startTransition(async () => {
      try {
        const action = formulation
          ? await import("@/lib/actions/formulations").then((m) =>
              m.updateFormulation(formulation.formulation_id, form)
            )
          : await import("@/lib/actions/formulations").then((m) => m.createFormulation(form));

        if (action.error) {
          // Check if it's a duplicate error
          if (action.duplicateFormulationCode) {
            toast({
              title: "Duplicate Product Detected",
              description: action.error,
              variant: "destructive",
              duration: 10000,
            });
          } else {
            toast({
              title: "Error",
              description: action.error,
              variant: "destructive",
            });
          }
        } else {
          // Show success with code assignment if available
          const successMessage = formulation
            ? action.formulationCode
              ? `Formulation updated successfully. Code: ${action.formulationCode}`
              : "Formulation updated successfully"
            : action.formulationCode
            ? `Formulation created successfully. Assigned code: ${action.formulationCode}`
            : "Formulation created successfully. Add active ingredients to assign a code.";

          toast({
            title: "Success",
            description: successMessage,
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
          <DialogTitle>{formulation ? "Edit Formulation" : "Create Formulation"}</DialogTitle>
          <DialogDescription>
            {formulation
              ? "Update formulation details and ingredients"
              : "Create a new product formulation with ingredients"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="formulation_name">
                Formulation Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="formulation_name"
                name="formulation_name"
                value={formData.formulation_name}
                onChange={(e) =>
                  setFormData({ ...formData, formulation_name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="formulation_category">
                Formulation Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.formulation_category}
                onValueChange={(value) =>
                  setFormData({ ...formData, formulation_category: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="formulation_type">Formulation Type</Label>
              <Input
                id="formulation_type"
                value={formData.formulation_type}
                onChange={(e) =>
                  setFormData({ ...formData, formulation_type: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uom">Unit of Measure</Label>
              <Input
                id="uom"
                value={formData.uom}
                onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                placeholder="L"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_name">Short Name</Label>
            <Input
              id="short_name"
              value={formData.short_name}
              onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status_rationale">Status Rationale</Label>
            <Textarea
              id="status_rationale"
              value={formData.status_rationale}
              onChange={(e) =>
                setFormData({ ...formData, status_rationale: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="border-t pt-4">
            <IngredientSelector ingredients={ingredients} onChange={setIngredients} />
            {formulation?.formulation_code && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Assigned Code:</p>
                <p className="text-lg font-mono font-semibold">{formulation.formulation_code}</p>
                {formulation.base_code && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Base Code: {formulation.base_code} | Variant: {formulation.variant_suffix}
                  </p>
                )}
              </div>
            )}
            {!formulation && ingredients.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Note:</strong> A formulation code will be automatically assigned when you save this formulation with active ingredients.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} size="lg" className="h-12 px-6">
              {isPending ? "Saving..." : formulation ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

