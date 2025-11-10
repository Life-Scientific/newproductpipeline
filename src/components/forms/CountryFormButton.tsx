"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CountryForm } from "./CountryForm";

export function CountryFormButton() {
  const [open, setOpen] = useState(false);

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

