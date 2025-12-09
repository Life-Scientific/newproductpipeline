import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { RegistrationPipelineList } from "@/components/registration/RegistrationPipelineList";
import { RegistrationFormButton } from "@/components/forms/RegistrationFormButton";
import type { Database } from "@/lib/supabase/database.types";

type RegistrationPipeline =
  Database["public"]["Views"]["vw_registration_pipeline"]["Row"];

export default async function RegistrationPipelinePage() {
  const supabase = await createClient();
  const { data: pipeline, error } = await supabase
    .from("vw_registration_pipeline")
    .select("*", { count: "exact" })
    .order("earliest_planned_submission_date", { ascending: false })
    .limit(10000); // Fetch up to 10k rows

  if (error) {
    throw new Error(`Failed to fetch registration pipeline: ${error.message}`);
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Registration Pipeline
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Track regulatory submissions and approvals
            </p>
          </div>
          <RegistrationFormButton />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration Pipeline</CardTitle>
            <CardDescription>
              Monitor registration status by pathway and country
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-6 pt-0">
              <RegistrationPipelineList
                pipeline={pipeline as RegistrationPipeline[]}
              />
            </div>
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}
