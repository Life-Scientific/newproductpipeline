"use client";

import { lazy, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FormulationsListWithActions } from "./FormulationsListWithActions";
import { Card, CardContent } from "@/components/ui/card";
import type { FormulationWithNestedData } from "@/lib/db/queries";

// Lazy load the Excel view since it's only shown when view=excel
const FormulationsExcelView = lazy(() =>
  import("./FormulationsExcelView").then((mod) => ({
    default: mod.FormulationsExcelView,
  })),
);

interface FormulationsPageContentProps {
  formulationsWithNested: FormulationWithNestedData[];
}

export function FormulationsPageContent({
  formulationsWithNested,
}: FormulationsPageContentProps) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "excel" ? "excel" : "table";

  return (
    <>
      {view === "excel" ? (
        <Card>
          <CardContent className="p-0">
            <div className="p-6">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-12">
                    <div className="text-sm text-muted-foreground">
                      Loading Excel view...
                    </div>
                  </div>
                }
              >
                <FormulationsExcelView formulations={formulationsWithNested} />
              </Suspense>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="p-6">
              <FormulationsListWithActions
                formulations={formulationsWithNested}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
