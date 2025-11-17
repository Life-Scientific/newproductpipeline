"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormulationCountryForm } from "./FormulationCountryForm";
import { FormulationCountryUseGroupForm } from "./FormulationCountryUseGroupForm";

export function RegistrationFormButton() {
  const [formulationCountryOpen, setFormulationCountryOpen] = useState(false);
  const [formulationCountryUseGroupOpen, setFormulationCountryUseGroupOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" className="h-12 px-6">
            <Plus className="mr-2 h-5 w-5" />
            New Registration
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setFormulationCountryOpen(true)}>
            Add Formulation to Country
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFormulationCountryUseGroupOpen(true)}>
            Add Use Group Registration
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FormulationCountryForm open={formulationCountryOpen} onOpenChange={setFormulationCountryOpen} />
      <FormulationCountryUseGroupForm
        open={formulationCountryUseGroupOpen}
        onOpenChange={setFormulationCountryUseGroupOpen}
      />
    </>
  );
}

