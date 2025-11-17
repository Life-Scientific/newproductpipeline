"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormulationCountryUseGroupForm } from "./FormulationCountryUseGroupForm";

export function FormulationCountryUseGroupFormButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="lg" className="h-12 px-6" onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-5 w-5" />
        New Use Group
      </Button>
      <FormulationCountryUseGroupForm
        open={open}
        onOpenChange={setOpen}
        onSuccess={() => {
          setOpen(false);
          window.location.reload();
        }}
      />
    </>
  );
}

