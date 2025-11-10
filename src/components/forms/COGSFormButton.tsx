"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { COGSForm } from "./COGSForm";

export function COGSFormButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg" className="h-12 px-6">
        <Plus className="mr-2 h-5 w-5" />
        New COGS Entry
      </Button>
      <COGSForm open={open} onOpenChange={setOpen} />
    </>
  );
}

