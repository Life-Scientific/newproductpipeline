"use client";

import { GitBranch, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { BusinessCaseModal } from "@/components/business-cases/BusinessCaseModal";
import { BusinessCaseFilters } from "@/components/business-cases/BusinessCaseFilters";
import { BusinessCasesProjectionTable } from "@/components/business-cases/BusinessCasesProjectionTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePermissions } from "@/hooks/use-permissions";
import { type FilterState, useUrlFilters } from "@/hooks/use-url-filters";
import type { BusinessCaseGroupData } from "@/lib/db/queries";

interface BusinessCasesPageClientProps {
  initialBusinessCases: BusinessCaseGroupData[];
}

function BusinessCasesContent({
  initialBusinessCases,
}: BusinessCasesPageClientProps) {
  // Use URL-based filters for persistence across navigation
  const { filters, setFilters } = useUrlFilters();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const router = useRouter();

  // Permission checks
  const {
    canCreateBusinessCases,
    canEditBusinessCases,
    isLoading: permissionsLoading,
  } = usePermissions();

  // Use initialBusinessCases directly - don't store in state!
  // This ensures data updates properly after router.refresh()
  const businessCases = initialBusinessCases;

  // Filter business cases based on URL-persisted filters
  const filteredBusinessCases = useMemo(() => {
    return businessCases.filter((bc) => {
      // Country filter
      if (
        filters.countryIds.length > 0 &&
        !filters.countryIds.includes(bc.country_id)
      ) {
        return false;
      }
      // Formulation filter
      if (
        filters.formulationIds.length > 0 &&
        !filters.formulationIds.includes(bc.formulation_id)
      ) {
        return false;
      }
      // Use group filter - handle both UUID and composite formats for backward compatibility
      if (filters.useGroupIds.length > 0) {
        const useGroupUuid = bc.use_group_id;
        const useGroupComposite = `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
        
        // Check if any of the filter IDs match either the UUID or composite format
        const matchesFilter = filters.useGroupIds.some((filterId) => {
          // Direct UUID match
          if (useGroupUuid && filterId === useGroupUuid) return true;
          // Composite format match (for backward compatible URLs)
          if (filterId === useGroupComposite) return true;
          return false;
        });
        
        if (!matchesFilter) {
          return false;
        }
      }
      return true;
    });
  }, [businessCases, filters]);

  // Handle filter changes from the filter component
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
      <BusinessCaseFilters
        businessCases={businessCases}
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

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
            {canCreateBusinessCases && !permissionsLoading && (
              <Button
                onClick={() => setCreateModalOpen(true)}
                size="lg"
                className="h-12 px-6"
              >
                <Plus className="mr-2 h-5 w-5" />
                New Business Case
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 sm:p-6 pt-0">
            <BusinessCasesProjectionTable
              businessCases={filteredBusinessCases}
              canEdit={canEditBusinessCases}
            />
          </div>
        </CardContent>
      </Card>

      {canCreateBusinessCases && (
        <BusinessCaseModal
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
          onSuccess={() => {
            // Use router.refresh() to get fresh data from the server
            router.refresh();
          }}
        />
      )}
    </>
  );
}

// Wrap in Suspense for useSearchParams
export function BusinessCasesPageClient(props: BusinessCasesPageClientProps) {
  return (
    <Suspense
      fallback={<div className="animate-pulse">Loading filters...</div>}
    >
      <BusinessCasesContent {...props} />
    </Suspense>
  );
}
