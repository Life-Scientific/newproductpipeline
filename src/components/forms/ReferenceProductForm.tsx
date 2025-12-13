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
import { EPPOCropSelector } from "./EPPOCropSelector";
import { EPPOTargetSelector } from "./EPPOTargetSelector";

type ReferenceProduct =
  Database["public"]["Tables"]["reference_products"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];

interface ReferenceProductFormProps {
  referenceProduct?: ReferenceProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ReferenceProductForm({
  referenceProduct,
  open,
  onOpenChange,
  onSuccess,
}: ReferenceProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = useSupabase();
  const [isPending, startTransition] = useTransition();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [formData, setFormData] = useState({
    product_name: referenceProduct?.product_name || "",
    manufacturer: referenceProduct?.manufacturer || "",
    supplier_id: referenceProduct?.supplier_id || "",
    active_ingredients_description:
      referenceProduct?.active_ingredients_description || "",
    formulation_type: referenceProduct?.formulation_type || "",
    registration_number: referenceProduct?.registration_number || "",
    notes: referenceProduct?.notes || "",
    is_active: referenceProduct?.is_active ?? true,
  });

  useEffect(() => {
    if (open) {
      loadSuppliers();
    }
  }, [open]);

  const loadSuppliers = async () => {
    const { data } = await supabase
      .from("suppliers")
      .select("*")
      .eq("is_active", true)
      .order("supplier_name");
    if (data) setSuppliers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.product_name) {
      toast({
        title: "Error",
        description: "Product name is required",
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
        const action = referenceProduct
          ? await import("@/lib/actions/reference-products").then((m) =>
              m.updateReferenceProduct(
                referenceProduct.reference_product_id,
                form,
              ),
            )
          : await import("@/lib/actions/reference-products").then((m) =>
              m.createReferenceProduct(form),
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
            description: referenceProduct
              ? "Reference product updated successfully"
              : "Reference product created successfully",
          });
          onOpenChange(false);
          if (onSuccess) onSuccess();
          // Server action already calls revalidatePath() - no need for router.refresh()
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {referenceProduct
              ? "Edit Reference Product"
              : "Create Reference Product"}
          </DialogTitle>
          <DialogDescription>
            {referenceProduct
              ? "Update reference product details"
              : "Add a new reference product (competitor product) to the database"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product_name">
              Product Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="product_name"
              value={formData.product_name}
              onChange={(e) =>
                setFormData({ ...formData, product_name: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={formData.manufacturer}
                onChange={(e) =>
                  setFormData({ ...formData, manufacturer: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier_id">Supplier</Label>
              <Select
                value={formData.supplier_id || "__none__"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    supplier_id: value === "__none__" ? "" : value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">None</SelectItem>
                  {suppliers.map((s) => (
                    <SelectItem key={s.supplier_id} value={s.supplier_id}>
                      {s.supplier_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="active_ingredients_description">
              Active Ingredients Description
            </Label>
            <Textarea
              id="active_ingredients_description"
              value={formData.active_ingredients_description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  active_ingredients_description: e.target.value,
                })
              }
              rows={3}
            />
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
              <Label htmlFor="registration_number">Registration Number</Label>
              <Input
                id="registration_number"
                value={formData.registration_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration_number: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
            />
          </div>

          {/* EPPO Crops & Targets Section */}
          {referenceProduct && (
            <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Crops & Targets
              </h3>
              <p className="text-xs text-muted-foreground">
                Define which crops and targets this reference product can be
                used for.
              </p>

              {/* EPPO Crops Section */}
              <div>
                <EPPOCropSelector
                  formulationId={referenceProduct.reference_product_id}
                  onUpdate={() => {
                    // Server action already calls revalidatePath() - no need for router.refresh()
                  }}
                />
              </div>

              {/* EPPO Targets Section */}
              <div>
                <EPPOTargetSelector
                  formulationId={referenceProduct.reference_product_id}
                  onUpdate={() => {
                    // Server action already calls revalidatePath() - no need for router.refresh()
                  }}
                />
              </div>
            </div>
          )}

          {!referenceProduct && (
            <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> Save the reference product first, then
                add crops and targets on the edit screen.
              </p>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_active: checked })
              }
            />
            <Label htmlFor="is_active">Active</Label>
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
              {isPending ? "Saving..." : referenceProduct ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
