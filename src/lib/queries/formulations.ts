import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Formulation, FormulationWithNestedData } from "@/lib/db/types";

// =============================================================================
// Query Keys
// =============================================================================

function serializeFilters(filters: FormulationFilters): string {
  // Serialize filters for stable query key (avoid reference equality issues)
  return JSON.stringify(
    filters,
    Object.keys(filters).sort(),
  );
}

export const formulationKeys = {
  all: ["formulations"] as const,
  allList: () => [...formulationKeys.all, "list"] as const,
  active: () => [...formulationKeys.all, "active"] as const,
  detail: (id: string) => [...formulationKeys.all, "detail", id] as const,
  withCountries: (id: string) => [...formulationKeys.all, "with-countries", id] as const,
  filtered: (filters: FormulationFilters) => [...formulationKeys.all, "filtered", serializeFilters(filters)] as const,
};

// =============================================================================
// Types
// =============================================================================

export interface FormulationFilters {
  search?: string;
  status?: string;
  countryId?: string;
  ingredientId?: string;
}

// =============================================================================
// API Functions (Server-side - called from client hooks)
// =============================================================================

async function fetchFormulations(filters?: FormulationFilters): Promise<Formulation[]> {
  const params = new URLSearchParams();
  if (filters?.search) params.set("search", filters.search);
  if (filters?.status) params.set("status", filters.status);
  if (filters?.countryId) params.set("country_id", filters.countryId);
  if (filters?.ingredientId) params.set("ingredient_id", filters.ingredientId);

  const queryString = params.toString();
  const url = queryString ? `/api/formulations?${queryString}` : "/api/formulations";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch formulations");
  }
  return response.json();
}

async function fetchFormulationById(id: string): Promise<FormulationWithNestedData> {
  const response = await fetch(`/api/formulations/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch formulation");
  }
  return response.json();
}

async function fetchFormulationsWithNested(): Promise<FormulationWithNestedData[]> {
  const response = await fetch("/api/formulations?nested=true");
  if (!response.ok) {
    throw new Error("Failed to fetch formulations with nested data");
  }
  return response.json();
}

// =============================================================================
// React Query Hooks
// =============================================================================

/**
 * Hook to fetch all formulations with optional filtering.
 */
export function useFormulations(filters?: FormulationFilters) {
  return useQuery({
    queryKey: filters ? formulationKeys.filtered(filters) : formulationKeys.allList(),
    queryFn: () => fetchFormulations(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to fetch active formulations only.
 */
export function useActiveFormulations() {
  return useQuery({
    queryKey: formulationKeys.active(),
    queryFn: () => fetchFormulations({ status: "active" }),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch formulations with nested country/use group data.
 * Used for the formulations portfolio page.
 */
export function useFormulationsWithNested() {
  return useQuery({
    queryKey: [...formulationKeys.all, "nested"],
    queryFn: () => fetchFormulationsWithNested(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single formulation by ID.
 */
export function useFormulation(formulationId: string | null) {
  return useQuery({
    queryKey: formulationId ? formulationKeys.detail(formulationId) : ["formulations", "detail", null],
    queryFn: () => {
      if (!formulationId) throw new Error("Formulation ID is required");
      return fetchFormulationById(formulationId);
    },
    enabled: Boolean(formulationId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch formulation with its associated countries and use groups.
 */
export function useFormulationWithCountries(formulationId: string | null) {
  return useQuery({
    queryKey: formulationId ? formulationKeys.withCountries(formulationId) : ["formulations", "with-countries", null],
    queryFn: () => {
      if (!formulationId) throw new Error("Formulation ID is required");
      return fetchFormulationById(formulationId);
    },
    enabled: Boolean(formulationId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

// =============================================================================
// Mutations
// =============================================================================

/**
 * Mutation to create a new formulation.
 * Invalidates all formulation queries after successful creation.
 */
export function useCreateFormulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      formulationCode: string;
      productName: string;
      ingredientId: string;
      mixture: string;
      formulationType: string;
      registrationStartDate?: string;
    }) => {
      const response = await fetch("/api/formulations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create formulation");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formulationKeys.all });
    },
  });
}

/**
 * Mutation to update an existing formulation.
 * Invalidates all formulation queries after successful update.
 */
export function useUpdateFormulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      formulationId: string;
      updates: Partial<{
        productName: string;
        mixture: string;
        formulationType: string;
        registrationStartDate: string;
        status: string;
      }>;
    }) => {
      const response = await fetch(`/api/formulations/${data.formulationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.updates),
      });
      if (!response.ok) {
        throw new Error("Failed to update formulation");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formulationKeys.all });
    },
  });
}

/**
 * Mutation to delete a formulation.
 * Invalidates all formulation queries after successful deletion.
 */
export function useDeleteFormulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formulationId: string) => {
      const response = await fetch(`/api/formulations/${formulationId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete formulation");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formulationKeys.all });
    },
  });
}

// =============================================================================
// Prefetch Helpers
// =============================================================================

/**
 * Prefetch formulation data into the cache.
 * Useful for hover intents or anticipating navigation.
 */
export async function prefetchFormulation(
  queryClient: ReturnType<typeof useQueryClient>,
  formulationId: string,
) {
  await queryClient.prefetchQuery({
    queryKey: formulationKeys.detail(formulationId),
    queryFn: () => fetchFormulationById(formulationId),
    staleTime: 60 * 1000, // 1 minute stale for prefetch
  });
}

