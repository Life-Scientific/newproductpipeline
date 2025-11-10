import { getFormulations } from "@/lib/db/queries";
import { FormulationsListWithActions } from "@/components/formulations/FormulationsListWithActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { FormulationForm } from "@/components/forms/FormulationForm";
import { FormulationFormButton } from "@/components/forms/FormulationFormButton";

export default async function FormulationsPage() {
  const formulations = await getFormulations();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Formulations</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your product portfolio formulations
            </p>
          </div>
          <FormulationFormButton />
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="p-6">
              <FormulationsListWithActions formulations={formulations} />
            </div>
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}

