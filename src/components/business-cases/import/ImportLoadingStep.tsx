"use client";

import { Loader2 } from "lucide-react";

export function ImportLoadingStep() {
  return (
    <div className="space-y-4">
      <div className="text-center py-8">
        <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
        <p className="font-medium">Importing business cases...</p>
        <p className="text-sm text-muted-foreground mt-2">
          This may take a few moments
        </p>
      </div>
    </div>
  );
}
