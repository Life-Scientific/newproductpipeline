import { getFormulationById, getFormulationCountryDetails, getFormulationUseGroups, getFormulationBusinessCasesForTree } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { FormulationTreeView } from "@/components/navigation/FormulationTreeView";
import { HierarchicalBreadcrumb } from "@/components/navigation/HierarchicalBreadcrumb";

interface FormulationHierarchyPageProps {
  params: Promise<{ id: string }>;
}

export default async function FormulationHierarchyPage({
  params,
}: FormulationHierarchyPageProps) {
  const { id } = await params;
  
  const [formulation, countryDetails, useGroups, businessCases] = await Promise.all([
    getFormulationById(id),
    getFormulationCountryDetails(id),
    getFormulationUseGroups(id),
    getFormulationBusinessCasesForTree(id),
  ]);

  if (!formulation) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Formulations", href: "/formulations" },
    {
      label: formulation.formulation_code || "Formulation",
      href: `/formulations/${id}`,
    },
    { label: "Tree View" },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />
        
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Formulation Tree</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Navigate through formulation → country → use group → business case hierarchy
          </p>
        </div>

                <FormulationTreeView
                  formulationId={id}
                  formulationCode={formulation.formulation_code || ""}
                  formulationName={formulation.product_name || ""}
                  countries={countryDetails}
                  useGroups={useGroups}
                  businessCases={businessCases}
                />
      </AnimatedPage>
    </div>
  );
}

