"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { COGSCreateModal } from "@/components/cogs/COGSCreateModal";
import { usePermissions } from "@/hooks/use-permissions";

interface COGSFormButtonProps {
  defaultFormulationId?: string;
}

export function COGSFormButton({
  defaultFormulationId,
}: COGSFormButtonProps = {}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { canEditCOGS, isLoading } = usePermissions();

  // Don't render if user doesn't have permission (COGS uses edit permission for create)
  if (isLoading || !canEditCOGS) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg" className="h-12 px-6">
        <Plus className="mr-2 h-5 w-5" />
        New COGS Entry
      </Button>
      <COGSCreateModal
        open={open}
        onOpenChange={setOpen}
        defaultFormulationId={defaultFormulationId}
        onSuccess={() => {
          // Server action already calls revalidatePath() - no need for router.refresh()
        }}
      />
    </>
  );
}
