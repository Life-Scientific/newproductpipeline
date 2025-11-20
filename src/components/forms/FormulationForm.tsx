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
import { EPPOCropSelector } from "./EPPOCropSelector";
import { EPPOTargetSelector } from "./EPPOTargetSelector";
import { useSupabase } from "@/hooks/use-supabase";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Tables"]["formulations"]["Row"];
type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

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
  "Unknown",
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
  const supabase = useSupabase();
  const [isPending, startTransition] = useTransition();
  const [ingredients, setIngredients] = useState<IngredientInput[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const [formData, setFormData] = useState({
    formulation_name: "", // Will be calculated
    formulation_category: formulation?.formulation_category || "",
    formulation_type: formulation?.formulation_type || "",
    uom: formulation?.uom || "L",
    short_name: formulation?.short_name || "",
    status: formulation?.status || "Not Yet Considered",
    status_rationale: formulation?.status_rationale || "",
  });

  // Load available ingredients on mount
  useEffect(() => {
    if (open) {
      loadAvailableIngredients();
    }
  }, [open]);

  useEffect(() => {
    if (open && formulation) {
      // Update form data when formulation changes
      setFormData({
        formulation_name: "", // Will be calculated
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
        formulation_name: "", // Will be calculated
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

  const loadAvailableIngredients = async () => {
    try {
      const { data } = await supabase
        .from("ingredients")
        .select("*")
        .eq("is_active", true)
        .order("ingredient_name");

      if (data) {
        setAvailableIngredients(data);
      }
    } catch (error) {
      console.error("Failed to load ingredients:", error);
    }
  };

  const loadExistingIngredients = async () => {
    if (!formulation) return;
    try {
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


  // Helper function to get ingredient type
  const getIngredientType = (ingredientId: string): string => {
    return availableIngredients.find((ing) => ing.ingredient_id === ingredientId)?.ingredient_type || "";
  };

  // Helper function to get ingredient name
  const getIngredientName = (ingredientId: string): string => {
    return availableIngredients.find((ing) => ing.ingredient_id === ingredientId)?.ingredient_name || "";
  };

  // Format concentration based on unit
  const formatConcentration = (quantity: string, unit: string): string => {
    if (unit === "%") {
      return `${quantity}%`;
    }
    // For g/L, kg/L, mL/L, g/kg, kg/kg - return only number (keep decimals)
    return quantity;
  };

  // Calculate formulation name from active ingredients, concentrations, and formulation type
  const calculateFormulationName = (): string => {
    // Filter active ingredients (check ingredient_type from ingredients table)
    const activeIngredients = ingredients
      .filter((ing) => getIngredientType(ing.ingredient_id) === "Active")
      .map((ing) => ({
        ...ing,
        name: getIngredientName(ing.ingredient_id),
      }))
      .filter((ing) => ing.name) // Only include if we have the name
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

    if (activeIngredients.length === 0) {
      return "";
    }

    // Extract ingredient names (join with "/" if multiple)
    const ingredientNames = activeIngredients.map((ing) => ing.name).join("/");

    // Extract concentrations (format based on unit, join with spaces)
    const concentrations = activeIngredients
      .map((ing) => formatConcentration(ing.quantity, ing.quantity_unit))
      .join(" ");

    // Combine: "IngredientA/IngredientB ConcentrationA ConcentrationB FormulationType"
    const formulationType = formData.formulation_type || "";
    const parts = [ingredientNames, concentrations, formulationType].filter(Boolean);
    return parts.join(" ");
  };

  // Real-time calculation of formulation name
  useEffect(() => {
    const calculatedName = calculateFormulationName();
    setFormData((prev) => ({ ...prev, formulation_name: calculatedName }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, formData.formulation_type, availableIngredients]);

  // Check if there's at least one active ingredient
  const hasActiveIngredients = ingredients.some(
    (ing) => getIngredientType(ing.ingredient_id) === "Active"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate: Require at least one active ingredient
    if (!hasActiveIngredients) {
      toast({
        title: "Validation Error",
        description: "At least one active ingredient is required",
        variant: "destructive",
      });
      return;
    }

    // Validate: Require formulation type, category, and UOM
    if (!formData.formulation_type || !formData.formulation_category || !formData.uom) {
      toast({
        title: "Validation Error",
        description: "Formulation Type, Category, and Unit of Measure are required",
        variant: "destructive",
      });
      return;
    }

    // Note: EPPO crop/target validation happens on the server side via EPPO selector components

    // Calculate final formulation name
    const calculatedName = calculateFormulationName();

    const form = new FormData();
    // Manually append all form fields to ensure Select values are included
    form.append("formulation_name", calculatedName); // Always use calculated name
    form.append("formulation_category", formData.formulation_category);
    form.append("formulation_type", formData.formulation_type);
    form.append("uom", formData.uom);
    if (formData.short_name) form.append("short_name", formData.short_name);
    form.append("status", formData.status);
    if (formData.status_rationale) form.append("status_rationale", formData.status_rationale);

    // Add ingredients data
    form.append("ingredients", JSON.stringify(ingredients));
    
    // Note: Crops and targets are managed directly by EPPO selectors via server actions

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
          {/* Section 1: Product Information */}
          <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Product Information</h3>
            
            {/* Ingredients Section - Required */}
            <div>
              <IngredientSelector 
                ingredients={ingredients} 
                onChange={setIngredients}
                availableIngredients={availableIngredients}
                onAvailableIngredientsChange={setAvailableIngredients}
              />
              {!hasActiveIngredients && (
                <div className="mt-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ At least one active ingredient is required to create a formulation.
                  </p>
                </div>
              )}
            </div>

            {/* Required Fields: Formulation Type, Category, UOM */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="formulation_type">
                  Formulation Type <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="formulation_type"
                  value={formData.formulation_type}
                  onChange={(e) =>
                    setFormData({ ...formData, formulation_type: e.target.value })
                  }
                  required
                  placeholder="e.g., EC, WG, SC"
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
              <div className="space-y-2">
                <Label htmlFor="uom">
                  Unit of Measure <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="uom"
                  value={formData.uom}
                  onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                  placeholder="L"
                  required
                />
              </div>
            </div>

            {/* Formulation Name - Auto-generated, read-only */}
            <div className="space-y-2">
              <Label htmlFor="formulation_name">
                Formulation Name <span className="text-muted-foreground text-xs">(Auto-generated)</span>
              </Label>
              <Input
                id="formulation_name"
                name="formulation_name"
                value={formData.formulation_name}
                readOnly
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                Automatically generated from active ingredients and formulation type
              </p>
            </div>

            {/* Optional: Short Name */}
            <div className="space-y-2">
              <Label htmlFor="short_name">Short Name</Label>
              <Input
                id="short_name"
                value={formData.short_name}
                onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
              />
            </div>
          </div>

          {/* Section 2: Status */}
          <div className="border rounded-lg p-4 bg-muted/20 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Status</h3>
            
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
          </div>

          {/* Section 3: Crops & Targets (EPPO System) */}
          {formulation && (
            <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Crops & Targets</h3>
              
              {/* EPPO Crops Section */}
              <div>
                <EPPOCropSelector 
                  formulationId={formulation.formulation_id}
                  onUpdate={() => router.refresh()}
                />
              </div>

              {/* EPPO Targets Section */}
              <div>
                <EPPOTargetSelector 
                  formulationId={formulation.formulation_id}
                  onUpdate={() => router.refresh()}
                />
              </div>
            </div>
          )}
          
          {!formulation && (
            <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> Save the formulation first, then add crops and targets on the edit screen.
              </p>
            </div>
          )}

          {/* Formulation Code Display */}
          <div>
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
            <Button 
              type="submit" 
              disabled={isPending || !hasActiveIngredients || !formData.formulation_type || !formData.formulation_category || !formData.uom} 
              size="lg" 
              className="h-12 px-6"
            >
              {isPending ? "Saving..." : formulation ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

