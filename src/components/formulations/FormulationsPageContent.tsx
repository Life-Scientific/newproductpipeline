"use client";

import { useSearchParams } from "next/navigation";
import { FormulationsListWithActions } from "./FormulationsListWithActions";
import { FormulationsExcelView } from "./FormulationsExcelView";
import { Card, CardContent } from "@/components/ui/card";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

interface FormulationsPageContentProps {
  formulations: Formulation[];
}

export function FormulationsPageContent({ formulations }: FormulationsPageContentProps) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "excel" ? "excel" : "table";

  return (
    <>
      {view === "excel" ? (
        <Card>
          <CardContent className="p-0">
            <div className="p-6">
              <FormulationsExcelView formulations={formulations} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="p-6">
              <FormulationsListWithActions formulations={formulations} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

