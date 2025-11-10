"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormulationForm } from "./FormulationForm";

export function FormulationFormButton() {
  const [open, setOpen] = useState(false);

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

