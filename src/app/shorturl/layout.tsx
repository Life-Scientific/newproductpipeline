import { SidebarProvider } from "@/components/layout/SidebarProvider";

export default function ShortUrlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
