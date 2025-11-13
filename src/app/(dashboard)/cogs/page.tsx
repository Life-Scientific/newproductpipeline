import { getCOGSList } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { COGSList } from "@/components/cogs/COGSList";
import { COGSFormButton } from "@/components/forms/COGSFormButton";

export default async function COGSPage() {
  const cogs = await getCOGSList();

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">COGS Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Cost of goods sold by formulation and country
            </p>
          </div>
          <COGSFormButton />
        </div>

        <COGSList cogs={cogs} />
      </AnimatedPage>
    </div>
  );
}

