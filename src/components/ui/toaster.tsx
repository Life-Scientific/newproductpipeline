"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  // Use Sonner Toaster which handles all toast rendering
  return <SonnerToaster position="bottom-right" />;
}
