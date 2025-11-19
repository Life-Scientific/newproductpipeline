"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BusinessCasesProjectionTable } from "@/components/business-cases/BusinessCasesProjectionTable";
import { BusinessCaseFilters } from "@/components/business-cases/BusinessCaseFilters";
import { BusinessCaseCreateModal } from "@/components/business-cases/BusinessCaseCreateModal";
import { Button } from "@/components/ui/button";
import { Plus, GitBranch } from "lucide-react";
import type { BusinessCaseGroupData } from "@/lib/db/queries";

interface BusinessCasesPageClientProps {
  initialBusinessCases: BusinessCaseGroupData[];
}

export function BusinessCasesPageClient({ initialBusinessCases }: BusinessCasesPageClientProps) {
  const [businessCases] = useState(initialBusinessCases);
  const [filters, setFilters] = useState({
    countryIds: [] as string[],
    formulationIds: [] as string[],
    useGroupIds: [] as string[],
  });
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Filter business cases based on selected filters
  const filteredBusinessCases = businessCases.filter((bc) => {
    if (filters.countryIds.length > 0 && !filters.countryIds.includes(bc.country_id)) {
      return false;
    }
    if (filters.formulationIds.length > 0 && !filters.formulationIds.includes(bc.formulation_id)) {
      return false;
    }
    // Note: use group filtering would need to check use_group_id
    // For now, we'll skip use group filtering as it requires more complex logic
    return true;
  });

  return (
    <>
      <BusinessCaseFilters onFilterChange={setFilters} />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Business Cases</CardTitle>
              <CardDescription className="flex items-center gap-2">
                View and manage financial projections
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100">
                  <GitBranch className="h-3 w-3" />
                  Git-style field tracking
                </span>
              </CardDescription>
            </div>
            <Button onClick={() => setCreateModalOpen(true)} size="lg" className="h-12 px-6">
              <Plus className="mr-2 h-5 w-5" />
              Create/Update Business Case
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 sm:p-6 pt-0">
            <BusinessCasesProjectionTable businessCases={filteredBusinessCases} />
          </div>
        </CardContent>
      </Card>

      <BusinessCaseCreateModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={() => {
          // Refresh data - in a real app you'd refetch here
          window.location.reload();
        }}
      />
    </>
  );
}

