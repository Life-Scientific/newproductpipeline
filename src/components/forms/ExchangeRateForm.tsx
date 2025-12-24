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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CountrySelector } from "@/components/forms/CountrySelector";
import type { Database } from "@/lib/supabase/database.types";

type ExchangeRate = Database["public"]["Tables"]["exchange_rates"]["Row"];

interface ExchangeRateFormProps {
  exchangeRate?: ExchangeRate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ExchangeRateForm({
  exchangeRate,
  open,
  onOpenChange,
  onSuccess,
}: ExchangeRateFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // Initialize state with default values to avoid null issues
  const [formData, setFormData] = useState({
    country_id: "",
    currency_code: "",
    exchange_rate_to_eur: "",
    effective_date: new Date().toISOString().split("T")[0],
    is_active: true,
    notes: "",
  });

  const [selectedCountryId, setSelectedCountryId] = useState<string>("");

  // Reset or populate form when modal opens or exchange rate changes
  useEffect(() => {
    if (!open) return;

    if (exchangeRate) {
      setFormData({
        country_id: exchangeRate.country_id,
        currency_code: exchangeRate.currency_code || "",
        exchange_rate_to_eur:
          exchangeRate.exchange_rate_to_eur?.toString() || "",
        effective_date: exchangeRate.effective_date
          ? new Date(exchangeRate.effective_date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        is_active: exchangeRate.is_active ?? true,
        notes: exchangeRate.notes || "",
      });
      setSelectedCountryId(exchangeRate.country_id);
    } else {
      // Reset to defaults for new entry
      setFormData({
        country_id: "",
        currency_code: "",
        exchange_rate_to_eur: "",
        effective_date: new Date().toISOString().split("T")[0],
        is_active: true,
        notes: "",
      });
      setSelectedCountryId("");
    }
  }, [exchangeRate?.exchange_rate_id, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCountryId) {
      toast({
        title: "Error",
        description: "Country is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.currency_code || !formData.exchange_rate_to_eur) {
      toast({
        title: "Error",
        description: "Currency code and exchange rate are required",
        variant: "destructive",
      });
      return;
    }

    const rate = parseFloat(formData.exchange_rate_to_eur);
    if (isNaN(rate) || rate <= 0) {
      toast({
        title: "Error",
        description: "Exchange rate must be a positive number",
        variant: "destructive",
      });
      return;
    }

    const form = new FormData();
    form.append("country_id", selectedCountryId);
    form.append("currency_code", formData.currency_code.toUpperCase());
    form.append("exchange_rate_to_eur", formData.exchange_rate_to_eur);
    form.append("effective_date", formData.effective_date);
    form.append("is_active", formData.is_active.toString());
    if (formData.notes) {
      form.append("notes", formData.notes);
    }

    startTransition(async () => {
      try {
        const action = exchangeRate
          ? await import("@/lib/actions/exchange-rates").then((m) =>
              m.updateExchangeRate(exchangeRate.exchange_rate_id, form),
            )
          : await import("@/lib/actions/exchange-rates").then((m) =>
              m.createExchangeRate(form),
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
            description: exchangeRate
              ? "Exchange rate updated successfully"
              : "Exchange rate created successfully",
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
            {exchangeRate ? "Edit Exchange Rate" : "Create Exchange Rate"}
          </DialogTitle>
          <DialogDescription>
            {exchangeRate
              ? "Update exchange rate details"
              : "Add a new exchange rate. Rate is multiplier to convert from local currency to EUR."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country_id">Country *</Label>
            <CountrySelector
              value={selectedCountryId}
              onValueChange={setSelectedCountryId}
              disabled={!!exchangeRate}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency_code">Currency Code *</Label>
            <Input
              id="currency_code"
              value={formData.currency_code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currency_code: e.target.value.toUpperCase(),
                })
              }
              placeholder="USD, EUR, GBP, etc."
              maxLength={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exchange_rate_to_eur">
              Exchange Rate to EUR * (multiplier)
            </Label>
            <Input
              id="exchange_rate_to_eur"
              type="number"
              step="0.000001"
              value={formData.exchange_rate_to_eur}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  exchange_rate_to_eur: e.target.value,
                })
              }
              placeholder="1.10"
              required
            />
            <p className="text-xs text-muted-foreground">
              Multiplier to convert from local currency to EUR. Example: 1.10
              means 1 EUR = 1.10 USD
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="effective_date">Effective Date *</Label>
            <Input
              id="effective_date"
              type="date"
              value={formData.effective_date}
              onChange={(e) =>
                setFormData({ ...formData, effective_date: e.target.value })
              }
              required
            />
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

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Optional notes about this exchange rate..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : exchangeRate ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
