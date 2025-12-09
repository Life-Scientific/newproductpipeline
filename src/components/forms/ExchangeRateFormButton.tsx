"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExchangeRateForm } from "./ExchangeRateForm";
import { usePermissions } from "@/hooks/use-permissions";

export function ExchangeRateFormButton() {
  const [open, setOpen] = useState(false);
  const { canEditExchangeRates, isLoading } = usePermissions();

  // Don't render if user doesn't have permission
  if (isLoading || !canEditExchangeRates) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Exchange Rate
      </Button>
      <ExchangeRateForm open={open} onOpenChange={setOpen} />
    </>
  );
}
