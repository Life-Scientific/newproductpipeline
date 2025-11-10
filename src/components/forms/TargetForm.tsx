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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/lib/supabase/database.types";

type Target = Database["public"]["Tables"]["targets"]["Row"];

interface TargetFormProps {
  target?: Target | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const TARGET_TYPES = ["Disease", "Pest", "Weed", "Other"];

export function TargetForm({ target, open, onOpenChange, onSuccess }: TargetFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    target_name: target?.target_name || "",
    target_type: target?.target_type || "Disease",
    target_category: target?.target_category || "",
    is_active: target?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.target_name || !formData.target_type) {
      toast({
        title: "Error",
        description: "Target name and type are required",
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
        const action = target
          ? await import("@/lib/actions/targets").then((m) => m.updateTarget(target.target_id, form))
          : await import("@/lib/actions/targets").then((m) => m.createTarget(form));

        if (action.error) {
          toast({
            title: "Error",
            description: action.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: target ? "Target updated successfully" : "Target created successfully",
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
          <DialogTitle>{target ? "Edit Target" : "Create Target"}</DialogTitle>
          <DialogDescription>
            {target ? "Update target details" : "Add a new target (disease, pest, weed) to the database"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target_name">
                Target Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="target_name"
                value={formData.target_name}
                onChange={(e) => setFormData({ ...formData, target_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_type">
                Target Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.target_type}
                onValueChange={(value) => setFormData({ ...formData, target_type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TARGET_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_category">Target Category</Label>
            <Input
              id="target_category"
              value={formData.target_category}
              onChange={(e) => setFormData({ ...formData, target_category: e.target.value })}
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
              {isPending ? "Saving..." : target ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

