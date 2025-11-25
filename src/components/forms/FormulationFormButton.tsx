"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormulationForm } from "./FormulationForm";
import { usePermissions } from "@/hooks/use-permissions";

export function FormulationFormButton() {
  const [open, setOpen] = useState(false);
  const { canCreateFormulations, isLoading } = usePermissions();

  // Don't render anything if user doesn't have permission
  if (isLoading || !canCreateFormulations) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        New Formulation
      </Button>
      <FormulationForm open={open} onOpenChange={setOpen} />
    </>
  );
}
