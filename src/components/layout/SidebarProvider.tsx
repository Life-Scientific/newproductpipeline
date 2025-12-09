"use client";

import { AppSidebar } from "./AppSidebar";
import {
  SidebarInset,
  SidebarProvider as UISidebarProvider,
} from "@/components/ui/sidebar";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <UISidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <SidebarInset className="flex-1 overflow-auto">
            {children}
          </SidebarInset>
        </div>
      </UISidebarProvider>
    </WorkspaceProvider>
  );
}
