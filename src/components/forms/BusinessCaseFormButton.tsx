"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BusinessCaseForm } from "./BusinessCaseForm";
import { usePermissions } from "@/hooks/use-permissions";

export function BusinessCaseFormButton() {
  const [open, setOpen] = useState(false);
  const { canCreateBusinessCases, isLoading } = usePermissions();

  // Don't render if user doesn't have permission
  if (isLoading || !canCreateBusinessCases) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg" className="h-12 px-6">
        <Plus className="mr-2 h-5 w-5" />
        Create/Update Business Case
      </Button>
      <BusinessCaseForm open={open} onOpenChange={setOpen} />
    </>
  );
}
