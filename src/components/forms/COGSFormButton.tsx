"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { COGSCreateModal } from "@/components/cogs/COGSCreateModal";

interface COGSFormButtonProps {
  defaultFormulationId?: string;
}

export function COGSFormButton({ defaultFormulationId }: COGSFormButtonProps = {}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
        onSuccess={() => router.refresh()}
      />
    </>
  );
}

