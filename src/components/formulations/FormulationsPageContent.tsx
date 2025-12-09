"use client";

import { useSearchParams } from "next/navigation";
import { FormulationsListWithActions } from "./FormulationsListWithActions";
import { FormulationsExcelView } from "./FormulationsExcelView";
import { Card, CardContent } from "@/components/ui/card";
import type { FormulationWithNestedData } from "@/lib/db/queries";

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
              <FormulationsExcelView formulations={formulationsWithNested} />
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
