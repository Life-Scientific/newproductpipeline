/**
 * @deprecated This component uses the legacy crops table.
 * EPPO codes are imported from external sources and should not be manually created.
 * This component is kept for backward compatibility but should not be used in new code.
 */
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/lib/supabase/database.types";

type Crop = any; // Database["public"]["Tables"]["crops"]["Row"]; // crops table may not exist in current schema

interface CropFormProps {
  crop?: Crop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CropForm({ crop, open, onOpenChange, onSuccess }: CropFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    crop_name: crop?.crop_name || "",
    crop_category: crop?.crop_category || "",
    is_active: crop?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.crop_name) {
      toast({
        title: "Error",
        description: "Crop name is required",
        variant: "destructive",
      });
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value.toString());
    });

    startTransition(async () => {
      try {
        const action = crop
          ? await import("@/lib/actions/crops").then((m) => m.updateCrop(crop.crop_id, form))
          : await import("@/lib/actions/crops").then((m) => m.createCrop(form));

        if (action.error) {
          toast({
            title: "Error",
            description: action.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: crop ? "Crop updated successfully" : "Crop created successfully",
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{crop ? "Edit Crop" : "Create Crop"}</DialogTitle>
          <DialogDescription>
            {crop ? "Update crop details" : "Add a new crop to the database"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="crop_name">
              Crop Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="crop_name"
              value={formData.crop_name}
              onChange={(e) => setFormData({ ...formData, crop_name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="crop_category">Crop Category</Label>
            <Input
              id="crop_category"
              value={formData.crop_category}
              onChange={(e) => setFormData({ ...formData, crop_category: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} size="lg" className="h-12 px-6">
              {isPending ? "Saving..." : crop ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

