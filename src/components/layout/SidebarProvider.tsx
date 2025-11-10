"use client";

import { AppSidebar } from "./AppSidebar";
import { SidebarInset, SidebarProvider as UISidebarProvider } from "@/components/ui/sidebar";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return (
    <UISidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </div>
    </UISidebarProvider>
  );
}

