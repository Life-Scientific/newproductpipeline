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
import { useToast } from "@/components/ui/use-toast";
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
  const [formData, setFormData] = useState({
    product_name: formulation?.product_name || "",
    product_category: formulation?.product_category || "",
    formulation_type: formulation?.formulation_type || "",
    uom: formulation?.uom || "L",
    short_name: formulation?.short_name || "",
    status: formulation?.status || "Not Yet Considered",
    status_rationale: formulation?.status_rationale || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value.toString());
    });

    startTransition(async () => {
      try {
        const action = formulation
          ? await import("@/lib/actions/formulations").then((m) =>
              m.updateFormulation(formulation.formulation_id, form)
            )
          : await import("@/lib/actions/formulations").then((m) => m.createFormulation(form));

        if (action.error) {
          toast({
            title: "Error",
            description: action.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: formulation
              ? "Formulation updated successfully"
              : "Formulation created successfully",
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{formulation ? "Edit Formulation" : "Create Formulation"}</DialogTitle>
          <DialogDescription>
            {formulation
              ? "Update formulation details"
              : "Create a new product formulation"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="product_category">
                Product Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.product_category}
                onValueChange={(value) =>
                  setFormData({ ...formData, product_category: value })
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : formulation ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

