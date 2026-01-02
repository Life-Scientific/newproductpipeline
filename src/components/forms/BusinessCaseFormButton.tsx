"use client";

import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";

// Lazy load the modal - only loaded when user clicks the button
const BusinessCaseModal = lazy(() =>
  import("@/components/business-cases/BusinessCaseModal").then((mod) => ({
    default: mod.BusinessCaseModal,
  })),
);

export function BusinessCaseFormButton() {
  const [open, setOpen] = useState(false);
  const { canCreateBusinessCases, isLoading } = usePermissions();

  // Don't render if user doesn't have permission
  if (isLoading || !canCreateBusinessCases) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg">
        <Plus className="mr-2 h-4 w-4" />
        Create/Update Business Case
      </Button>
      <Suspense fallback={null}>
        <BusinessCaseModal
          open={open}
          onOpenChange={setOpen}
          onSuccess={() => {
            // Server action already calls revalidatePath() - no need for full page reload
            // The page will automatically refetch on next navigation or component remount
          }}
        />
      </Suspense>
    </>
  );
}
