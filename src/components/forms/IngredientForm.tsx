"use client";

import { useState, useTransition } from "react";
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
import type { Database } from "@/lib/supabase/database.types";

type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

interface IngredientFormProps {
  ingredient?: Ingredient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const INGREDIENT_TYPES = [
  "Active",
  "Safener",
  "Adjuvant",
  "Solvent",
  "Surfactant",
  "Other",
];
const SUPPLY_RISKS = ["Low", "Medium", "High", "Critical"];

export function IngredientForm({
  ingredient,
  open,
  onOpenChange,
  onSuccess,
}: IngredientFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    ingredient_name: ingredient?.ingredient_name || "",
    ingredient_type: ingredient?.ingredient_type || "Active",
    cas_number: ingredient?.cas_number || "",
    standard_density_g_per_l:
      ingredient?.standard_density_g_per_l?.toString() || "",
    supply_risk: ingredient?.supply_risk || "",
    supply_risk_notes: ingredient?.supply_risk_notes || "",
    is_eu_approved: ingredient?.is_eu_approved || false,
    regulatory_notes: ingredient?.regulatory_notes || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ingredient_name || !formData.ingredient_type) {
      toast({
        title: "Error",
        description: "Ingredient name and type are required",
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

    startTransition(async () => {
      try {
        const action = ingredient
          ? await import("@/lib/actions/ingredients").then((m) =>
              m.updateIngredient(ingredient.ingredient_id, form),
            )
          : await import("@/lib/actions/ingredients").then((m) =>
              m.createIngredient(form),
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
            description: ingredient
              ? "Ingredient updated successfully"
              : "Ingredient created successfully",
          });
          onOpenChange(false);
          if (onSuccess) onSuccess();
          // No router.refresh() - revalidatePath in server action handles cache invalidation
        }
      } catch (supabaseError) {
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {ingredient ? "Edit Ingredient" : "Create Ingredient"}
          </DialogTitle>
          <DialogDescription>
            {ingredient
              ? "Update ingredient details"
              : "Add a new ingredient to the database"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ingredient_name">
                Ingredient Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ingredient_name"
                value={formData.ingredient_name}
                onChange={(e) =>
                  setFormData({ ...formData, ingredient_name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ingredient_type">
                Ingredient Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.ingredient_type}
                onValueChange={(value) =>
                  setFormData({ ...formData, ingredient_type: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INGREDIENT_TYPES.map((type) => (
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
              <Label htmlFor="cas_number">CAS Number</Label>
              <Input
                id="cas_number"
                value={formData.cas_number}
                onChange={(e) =>
                  setFormData({ ...formData, cas_number: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="standard_density_g_per_l">
                Standard Density (g/L)
              </Label>
              <Input
                id="standard_density_g_per_l"
                type="number"
                step="0.01"
                value={formData.standard_density_g_per_l}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    standard_density_g_per_l: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supply_risk">Supply Risk</Label>
            <Select
              value={formData.supply_risk || "__none__"}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  supply_risk: value === "__none__" ? "" : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supply risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">None</SelectItem>
                {SUPPLY_RISKS.map((risk) => (
                  <SelectItem key={risk} value={risk}>
                    {risk}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supply_risk_notes">Supply Risk Notes</Label>
            <Textarea
              id="supply_risk_notes"
              value={formData.supply_risk_notes}
              onChange={(e) =>
                setFormData({ ...formData, supply_risk_notes: e.target.value })
              }
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_eu_approved"
              checked={formData.is_eu_approved}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_eu_approved: checked })
              }
            />
            <Label htmlFor="is_eu_approved">EU Approved</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regulatory_notes">Regulatory Notes</Label>
            <Textarea
              id="regulatory_notes"
              value={formData.regulatory_notes}
              onChange={(e) =>
                setFormData({ ...formData, regulatory_notes: e.target.value })
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
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="h-12 px-6"
            >
              {isPending ? "Saving..." : ingredient ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
