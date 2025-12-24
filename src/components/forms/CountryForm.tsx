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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/lib/supabase/database.types";

type Country = Database["public"]["Tables"]["countries"]["Row"];

interface CountryFormProps {
  country?: Country | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CountryForm({
  country,
  open,
  onOpenChange,
  onSuccess,
}: CountryFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    country_code: country?.country_code || "",
    country_name: country?.country_name || "",
    currency_code: country?.currency_code || "",
    has_tariffs: country?.has_tariffs || false,
    is_active: country?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.country_code ||
      !formData.country_name ||
      !formData.currency_code
    ) {
      toast({
        title: "Error",
        description: "Country code, name, and currency code are required",
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
        const action = country
          ? await import("@/lib/actions/countries").then((m) =>
              m.updateCountry(country.country_id, form),
            )
          : await import("@/lib/actions/countries").then((m) =>
              m.createCountry(form),
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
            description: country
              ? "Country updated successfully"
              : "Country created successfully",
          });
          onOpenChange(false);
          if (onSuccess) onSuccess();
          // Server action already calls revalidatePath() - no need for router.refresh()
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {country ? "Edit Country" : "Create Country"}
          </DialogTitle>
          <DialogDescription>
            {country
              ? "Update country details"
              : "Add a new country to the database"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country_code">
                Country Code <span className="text-destructive">*</span>
              </Label>
              <Input
                id="country_code"
                value={formData.country_code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    country_code: e.target.value.toUpperCase(),
                  })
                }
                placeholder="US"
                maxLength={2}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country_name">
                Country Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="country_name"
                value={formData.country_name}
                onChange={(e) =>
                  setFormData({ ...formData, country_name: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency_code">
              Currency Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="currency_code"
              value={formData.currency_code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currency_code: e.target.value.toUpperCase(),
                })
              }
              placeholder="USD"
              maxLength={3}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="has_tariffs"
              checked={formData.has_tariffs}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, has_tariffs: checked })
              }
            />
            <Label htmlFor="has_tariffs">Has Tariffs</Label>
          </div>

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
              {isPending ? "Saving..." : country ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
