import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Formulation, FormulationWithNestedData } from "@/lib/db/types";
import type { PortfolioFilters } from "@/hooks/use-portfolio-filters";
import { getFormulationsWithFilters } from "@/lib/actions/formulations-filtered";

// =============================================================================
// Query Keys
// =============================================================================

function serializeFilters(filters: FormulationFilters): string {
  // Serialize filters for stable query key (avoid reference equality issues)
  return JSON.stringify(filters, Object.keys(filters).sort());
}

export const formulationKeys = {
  all: ["formulations"] as const,
  allList: () => [...formulationKeys.all, "list"] as const,
  active: () => [...formulationKeys.all, "active"] as const,
  detail: (id: string) => [...formulationKeys.all, "detail", id] as const,
  withCountries: (id: string) =>
    [...formulationKeys.all, "with-countries", id] as const,
  filtered: (filters: FormulationFilters) =>
    [...formulationKeys.all, "filtered", serializeFilters(filters)] as const,
  portfolioFiltered: (filters: PortfolioFilters) =>
    [
      ...formulationKeys.all,
      "portfolio-filtered",
      JSON.stringify(filters),
    ] as const,
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

async function fetchFormulations(
  filters?: FormulationFilters,
): Promise<Formulation[]> {
  const params = new URLSearchParams();
  if (filters?.search) params.set("search", filters.search);
  if (filters?.status) params.set("status", filters.status);
  if (filters?.countryId) params.set("country_id", filters.countryId);
  if (filters?.ingredientId) params.set("ingredient_id", filters.ingredientId);

  const queryString = params.toString();
  const url = queryString
    ? `/api/formulations?${queryString}`
    : "/api/formulations";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch formulations");
  }
  return response.json();
}

async function fetchFormulationById(
  id: string,
): Promise<FormulationWithNestedData> {
  const response = await fetch(`/api/formulations/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch formulation");
  }
  return response.json();
}

async function fetchFormulationsWithNested(): Promise<
  FormulationWithNestedData[]
> {
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
    queryKey: filters
      ? formulationKeys.filtered(filters)
      : formulationKeys.allList(),
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
 * Hook to fetch formulations with nested data filtered by portfolio filters.
 * This performs server-side filtering to reduce data transfer (80%+ reduction).
 * Filters are applied at the database level before data is returned.
 *
 * @param filters - Portfolio filters from URL params
 * @param initialData - Optional initial data from SSR to prevent loading state
 */
export function useFormulationsWithPortfolioFilters(
  filters: PortfolioFilters,
  initialData?: FormulationWithNestedData[],
) {
  return useQuery({
    queryKey: formulationKeys.portfolioFiltered(filters),
    queryFn: () => getFormulationsWithFilters(filters),
    initialData, // Use SSR data as initial data to prevent loading state
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to fetch a single formulation by ID.
 */
export function useFormulation(formulationId: string | null) {
  return useQuery({
    queryKey: formulationId
      ? formulationKeys.detail(formulationId)
      : ["formulations", "detail", null],
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
    queryKey: formulationId
      ? formulationKeys.withCountries(formulationId)
      : ["formulations", "with-countries", null],
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

// =============================================================================
// Formulation Nested Data Hooks (for comparison feature)
// =============================================================================

/**
 * Hook to fetch formulation business cases
 */
export function useFormulationBusinessCases(formulationId: string | null) {
  return useQuery({
    queryKey: formulationId
      ? [...formulationKeys.detail(formulationId), "business-cases"]
      : ["formulations", "business-cases", null],
    queryFn: async () => {
      if (!formulationId) throw new Error("Formulation ID is required");
      const response = await fetch(
        `/api/formulations/${formulationId}/business-cases`,
      );
      if (!response.ok) throw new Error("Failed to fetch business cases");
      return response.json();
    },
    enabled: Boolean(formulationId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch formulation ingredients
 */
export function useFormulationIngredients(formulationId: string | null) {
  return useQuery({
    queryKey: formulationId
      ? [...formulationKeys.detail(formulationId), "ingredients"]
      : ["formulations", "ingredients", null],
    queryFn: async () => {
      if (!formulationId) throw new Error("Formulation ID is required");
      const response = await fetch(
        `/api/formulations/${formulationId}/ingredients`,
      );
      if (!response.ok) throw new Error("Failed to fetch ingredients");
      return response.json();
    },
    enabled: Boolean(formulationId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch formulation countries
 */
export function useFormulationCountries(formulationId: string | null) {
  return useQuery({
    queryKey: formulationId
      ? [...formulationKeys.detail(formulationId), "countries"]
      : ["formulations", "countries", null],
    queryFn: async () => {
      if (!formulationId) throw new Error("Formulation ID is required");
      const response = await fetch(
        `/api/formulations/${formulationId}/countries`,
      );
      if (!response.ok) throw new Error("Failed to fetch countries");
      return response.json();
    },
    enabled: Boolean(formulationId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch formulation use groups
 */
export function useFormulationUseGroups(formulationId: string | null) {
  return useQuery({
    queryKey: formulationId
      ? [...formulationKeys.detail(formulationId), "use-groups"]
      : ["formulations", "use-groups", null],
    queryFn: async () => {
      if (!formulationId) throw new Error("Formulation ID is required");
      const response = await fetch(
        `/api/formulations/${formulationId}/use-groups`,
      );
      if (!response.ok) throw new Error("Failed to fetch use groups");
      return response.json();
    },
    enabled: Boolean(formulationId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch formulation COGS
 */
export function useFormulationCogs(formulationId: string | null) {
  return useQuery({
    queryKey: formulationId
      ? [...formulationKeys.detail(formulationId), "cogs"]
      : ["formulations", "cogs", null],
    queryFn: async () => {
      if (!formulationId) throw new Error("Formulation ID is required");
      const response = await fetch(`/api/formulations/${formulationId}/cogs`);
      if (!response.ok) throw new Error("Failed to fetch COGS");
      return response.json();
    },
    enabled: Boolean(formulationId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch formulation protection status
 */
export function useFormulationProtection(formulationId: string | null) {
  return useQuery({
    queryKey: formulationId
      ? [...formulationKeys.detail(formulationId), "protection"]
      : ["formulations", "protection", null],
    queryFn: async () => {
      if (!formulationId) throw new Error("Formulation ID is required");
      const response = await fetch(
        `/api/formulations/${formulationId}/protection`,
      );
      if (!response.ok) throw new Error("Failed to fetch protection status");
      return response.json();
    },
    enabled: Boolean(formulationId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch formulation status history
 */
export function useFormulationStatusHistory(formulationId: string | null) {
  return useQuery({
    queryKey: formulationId
      ? [...formulationKeys.detail(formulationId), "status-history"]
      : ["formulations", "status-history", null],
    queryFn: async () => {
      if (!formulationId) throw new Error("Formulation ID is required");
      const response = await fetch(
        `/api/formulations/${formulationId}/status-history`,
      );
      if (!response.ok) throw new Error("Failed to fetch status history");
      return response.json();
    },
    enabled: Boolean(formulationId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch all formulation nested data at once
 * Used in FormulationComparison component for efficient parallel loading with caching
 */
export function useFormulationCompleteData(formulationId: string | null) {
  const businessCases = useFormulationBusinessCases(formulationId);
  const ingredients = useFormulationIngredients(formulationId);
  const countries = useFormulationCountries(formulationId);
  const useGroups = useFormulationUseGroups(formulationId);
  const cogs = useFormulationCogs(formulationId);
  const protection = useFormulationProtection(formulationId);
  const statusHistory = useFormulationStatusHistory(formulationId);

  return {
    businessCases: businessCases.data || [],
    ingredients: ingredients.data || [],
    countries: countries.data || [],
    useGroups: useGroups.data || [],
    cogs: cogs.data || [],
    protection: protection.data || [],
    statusHistory: statusHistory.data || [],
    isLoading:
      businessCases.isLoading ||
      ingredients.isLoading ||
      countries.isLoading ||
      useGroups.isLoading ||
      cogs.isLoading ||
      protection.isLoading ||
      statusHistory.isLoading,
    isError:
      businessCases.isError ||
      ingredients.isError ||
      countries.isError ||
      useGroups.isError ||
      cogs.isError ||
      protection.isError ||
      statusHistory.isError,
  };
}



