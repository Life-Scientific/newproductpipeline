"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IngredientForm } from "./IngredientForm";
import { usePermissions } from "@/hooks/use-permissions";

export function IngredientFormButton() {
  const [open, setOpen] = useState(false);
  const { canEditIngredients, isLoading } = usePermissions();

  // Don't render if user doesn't have permission
  if (isLoading || !canEditIngredients) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg">
        <Plus className="mr-2 h-4 w-4" />
        New Ingredient
      </Button>
      <IngredientForm open={open} onOpenChange={setOpen} />
    </>
  );
}
