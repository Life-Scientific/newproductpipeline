"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CropForm } from "./CropForm";
import { usePermissions } from "@/hooks/use-permissions";

export function CropFormButton() {
  const [open, setOpen] = useState(false);
  // Crops are part of formulation management
  const { canEditFormulations, isLoading } = usePermissions();

  // Don't render if user doesn't have permission
  if (isLoading || !canEditFormulations) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg">
        <Plus className="mr-2 h-4 w-4" />
        New Crop
      </Button>
      <CropForm open={open} onOpenChange={setOpen} />
    </>
  );
}
