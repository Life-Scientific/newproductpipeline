import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { BusinessCase, BusinessCaseGroupData, BusinessCaseYearData } from "@/lib/db/types";

// =============================================================================
// Query Keys
// =============================================================================

function serializeFilters(filters: BusinessCaseFilters): string {
  // Serialize filters for stable query key (avoid reference equality issues)
  return JSON.stringify(
    filters,
    Object.keys(filters).sort(),
  );
}

export const businessCaseKeys = {
  all: ["business-cases"] as const,
  allList: () => [...businessCaseKeys.all, "list"] as const,
  active: () => [...businessCaseKeys.all, "active"] as const,
  chart: () => [...businessCaseKeys.all, "chart"] as const,
  group: (groupId: string) => [...businessCaseKeys.all, "group", groupId] as const,
  versionHistory: (groupId: string) => [...businessCaseKeys.all, "version-history", groupId] as const,
  filtered: (filters: BusinessCaseFilters) => [...businessCaseKeys.all, "filtered", serializeFilters(filters)] as const,
};

// =============================================================================
// Types
// =============================================================================

export interface BusinessCaseFilters {
  countryId?: string;
  formulationId?: string;
  fiscalYear?: string;
  status?: "active" | "all";
}

// =============================================================================
// API Functions (Server-side - called from client hooks)
// =============================================================================

async function fetchBusinessCases(filters?: BusinessCaseFilters): Promise<BusinessCase[]> {
  const params = new URLSearchParams();
  if (filters?.countryId) params.set("country_id", filters.countryId);
  if (filters?.formulationId) params.set("formulation_id", filters.formulationId);
  if (filters?.fiscalYear) params.set("fiscal_year", filters.fiscalYear);
  if (filters?.status) params.set("status", filters.status);

  const queryString = params.toString();
  const url = queryString ? `/api/business-cases?${queryString}` : "/api/business-cases";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch business cases");
  }
  return response.json();
}

async function fetchBusinessCaseById(id: string): Promise<BusinessCaseGroupData> {
  const response = await fetch(`/api/business-cases/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch business case");
  }
  return response.json();
}

async function fetchBusinessCaseVersionHistory(
  groupId: string,
): Promise<BusinessCaseYearData[]> {
  const response = await fetch(`/api/business-cases/${groupId}/history`);
  if (!response.ok) {
    throw new Error("Failed to fetch version history");
  }
  return response.json();
}

// =============================================================================
// React Query Hooks
// =============================================================================

/**
 * Hook to fetch all business cases with optional filtering.
 * Uses server-side filtering to avoid fetching all 8k+ rows.
 */
export function useBusinessCases(filters?: BusinessCaseFilters) {
  return useQuery({
    queryKey: filters ? businessCaseKeys.filtered(filters) : businessCaseKeys.allList(),
    queryFn: () => fetchBusinessCases(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to fetch active business cases only.
 */
export function useActiveBusinessCases() {
  return useQuery({
    queryKey: businessCaseKeys.active(),
    queryFn: () => fetchBusinessCases({ status: "active" }),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch business case data for charts.
 * Returns lighter payload optimized for chart aggregation.
 */
export function useBusinessCasesForChart() {
  return useQuery({
    queryKey: businessCaseKeys.chart(),
    queryFn: () => fetchBusinessCases({ status: "active" }),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single business case group by ID.
 */
export function useBusinessCaseGroup(groupId: string | null) {
  return useQuery({
    queryKey: groupId ? businessCaseKeys.group(groupId) : ["business-cases", "group", null],
    queryFn: () => {
      if (!groupId) throw new Error("Group ID is required");
      return fetchBusinessCaseById(groupId);
    },
    enabled: Boolean(groupId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch version history for a business case group.
 */
export function useBusinessCaseVersionHistory(groupId: string | null) {
  return useQuery({
    queryKey: groupId ? businessCaseKeys.versionHistory(groupId) : ["business-cases", "history", null],
    queryFn: () => {
      if (!groupId) throw new Error("Group ID is required");
      return fetchBusinessCaseVersionHistory(groupId);
    },
    enabled: Boolean(groupId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

// =============================================================================
// Mutations
// =============================================================================

/**
 * Mutation to create a new business case.
 * Invalidates all business case queries after successful creation.
 */
export function useCreateBusinessCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      formulationId: string;
      countryId: string;
      useGroupId?: string;
      years: Array<{
        yearOffset: number;
        volume: number;
        nsp: number;
        cogsPerUnit?: number;
      }>;
      changeReason?: string;
    }) => {
      const response = await fetch("/api/business-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create business case");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: businessCaseKeys.all });
    },
  });
}

/**
 * Mutation to update an existing business case.
 * Invalidates all business case queries after successful update.
 */
export function useUpdateBusinessCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      businessCaseGroupId: string;
      years: Array<{
        yearOffset: number;
        volume: number;
        nsp: number;
        cogsPerUnit?: number;
      }>;
      changeReason?: string;
    }) => {
      const response = await fetch("/api/business-cases", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update business case");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: businessCaseKeys.all });
    },
  });
}

/**
 * Mutation to delete a business case.
 * Invalidates all business case queries after successful deletion.
 */
export function useDeleteBusinessCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (businessCaseGroupId: string) => {
      const response = await fetch(`/api/business-cases/${businessCaseGroupId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete business case");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: businessCaseKeys.all });
    },
  });
}

// =============================================================================
// Prefetch Helpers
// =============================================================================

/**
 * Prefetch business case group data into the cache.
 * Useful for hover intents or anticipating navigation.
 */
export async function prefetchBusinessCaseGroup(
  queryClient: ReturnType<typeof useQueryClient>,
  groupId: string,
) {
  await queryClient.prefetchQuery({
    queryKey: businessCaseKeys.group(groupId),
    queryFn: () => fetchBusinessCaseById(groupId),
    staleTime: 60 * 1000, // 1 minute stale for prefetch
  });
}

/**
 * Prefetch business cases for known heavy datasets.
 * Call this on hover/touch to speed up navigation.
 */
export function usePrefetchBusinessCases() {
  const queryClient = useQueryClient();

  const prefetch = async (filters?: BusinessCaseFilters) => {
    await queryClient.prefetchQuery({
      queryKey: filters ? businessCaseKeys.filtered(filters) : businessCaseKeys.allList(),
      queryFn: () => fetchBusinessCases(filters),
    });
  };

  return { prefetch };
}

