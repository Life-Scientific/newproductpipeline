import { getBlacklistedFormulations } from "@/lib/db/queries";
import { BlacklistedFormulationsList } from "@/components/formulations/BlacklistedFormulationsList";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function BlacklistedFormulationsPage() {
  const formulations = await getBlacklistedFormulations();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Blacklisted Formulation Codes
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage legacy formulation codes that are reserved to prevent reuse
            </p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Reserved Codes</AlertTitle>
            <AlertDescription>
              These formulation codes exist in external systems and are
              blacklisted to prevent auto-generation from assigning them to new
              formulations. They will not appear in the main formulations list.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>
                Blacklisted Formulations ({formulations.length})
              </CardTitle>
              <CardDescription>
                All codes marked as inactive and reserved from external systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BlacklistedFormulationsList formulations={formulations} />
            </CardContent>
          </Card>
        </div>
      </AnimatedPage>
    </div>
  );
}
