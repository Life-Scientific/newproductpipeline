"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CountryForm } from "./CountryForm";
import { usePermissions } from "@/hooks/use-permissions";

export function CountryFormButton() {
  const [open, setOpen] = useState(false);
  const { canEditCountries, isLoading } = usePermissions();

  // Don't render if user doesn't have permission
  if (isLoading || !canEditCountries) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg" className="h-12 px-6">
        <Plus className="mr-2 h-5 w-5" />
        New Country
      </Button>
      <CountryForm open={open} onOpenChange={setOpen} />
    </>
  );
}
