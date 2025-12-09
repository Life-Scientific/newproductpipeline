"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table2, Grid3x3 } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function FormulationsViewSwitcher() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<"table" | "excel">("table");

  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam === "excel") {
      setView("excel");
    } else {
      setView("table");
    }
  }, [searchParams]);

  const handleViewChange = (newView: "table" | "excel") => {
    setView(newView);
    const params = new URLSearchParams(searchParams.toString());
    if (newView === "excel") {
      params.set("view", "excel");
    } else {
      params.delete("view");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1 border rounded-lg p-1 bg-background">
      <Button
        variant={view === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => handleViewChange("table")}
        className="h-9"
      >
        <Table2 className="mr-2 h-4 w-4" />
        Table
      </Button>
      <Button
        variant={view === "excel" ? "default" : "ghost"}
        size="sm"
        onClick={() => handleViewChange("excel")}
        className="h-9"
      >
        <Grid3x3 className="mr-2 h-4 w-4" />
        Excel View
      </Button>
    </div>
  );
}
