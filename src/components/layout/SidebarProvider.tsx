"use client";

import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import {
  SidebarInset,
  SidebarProvider as UISidebarProvider,
} from "@/components/ui/sidebar";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { CommandPalette } from "./CommandPalette";
import { BusinessCaseModal } from "@/components/business-cases/BusinessCaseModal";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [businessCaseModalOpen, setBusinessCaseModalOpen] = useState(false);

  return (
    <WorkspaceProvider>
      <UISidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <SidebarInset className="flex-1 overflow-auto">
            {children}
          </SidebarInset>
        </div>

        {/* Command Palette - Global Cmd+K */}
        <CommandPalette
          onOpenBusinessCaseModal={() => setBusinessCaseModalOpen(true)}
        />

        {/* Global Modals */}
        <BusinessCaseModal
          open={businessCaseModalOpen}
          onOpenChange={setBusinessCaseModalOpen}
        />
      </UISidebarProvider>
    </WorkspaceProvider>
  );
}
