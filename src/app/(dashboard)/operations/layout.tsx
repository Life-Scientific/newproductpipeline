import { SidebarProvider } from "@/components/layout/SidebarProvider";

export default function OperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}

