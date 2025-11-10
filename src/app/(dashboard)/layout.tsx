import { SidebarProvider } from "@/components/layout/SidebarProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <main className="flex-1 overflow-auto">{children}</main>
    </SidebarProvider>
  );
}

