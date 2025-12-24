import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PortfolioFilters {
  countries: string[];
  formulations: string[];
  fiscalYears: string[];
  statuses: string[];
  searchQuery: string;
}

interface PortfolioFilterState extends PortfolioFilters {
  // Actions
  setCountries: (countries: string[]) => void;
  toggleCountry: (countryId: string) => void;
  setFormulations: (formulations: string[]) => void;
  toggleFormulation: (formulationId: string) => void;
  setFiscalYears: (years: string[]) => void;
  toggleFiscalYear: (year: string) => void;
  setStatuses: (statuses: string[]) => void;
  toggleStatus: (status: string) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  setAllFilters: (filters: Partial<PortfolioFilters>) => void;
}

const defaultFilters: PortfolioFilters = {
  countries: [],
  formulations: [],
  fiscalYears: [],
  statuses: [],
  searchQuery: "",
};

// Custom storage that handles SSR hydration properly
function createNoopStorage() {
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
}

// Check if we're in browser context
const isBrowser = typeof window !== "undefined";

export const usePortfolioFilters = create<PortfolioFilterState>()(
  persist(
    (set) => ({
      ...defaultFilters,

      setCountries: (countries) => set({ countries }),

      toggleCountry: (countryId) =>
        set((state) => ({
          countries: state.countries.includes(countryId)
            ? state.countries.filter((id) => id !== countryId)
            : [...state.countries, countryId],
        })),

      setFormulations: (formulations) => set({ formulations }),

      toggleFormulation: (formulationId) =>
        set((state) => ({
          formulations: state.formulations.includes(formulationId)
            ? state.formulations.filter((id) => id !== formulationId)
            : [...state.formulations, formulationId],
        })),

      setFiscalYears: (fiscalYears) => set({ fiscalYears }),

      toggleFiscalYear: (year) =>
        set((state) => ({
          fiscalYears: state.fiscalYears.includes(year)
            ? state.fiscalYears.filter((y) => y !== year)
            : [...state.fiscalYears, year],
        })),

      setStatuses: (statuses) => set({ statuses }),

      toggleStatus: (status) =>
        set((state) => ({
          statuses: state.statuses.includes(status)
            ? state.statuses.filter((s) => s !== status)
            : [...state.statuses, status],
        })),

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      resetFilters: () =>
        set({
          countries: [],
          formulations: [],
          fiscalYears: [],
          statuses: [],
          searchQuery: "",
        }),

      setAllFilters: (filters) =>
        set((state) => ({
          ...state,
          ...filters,
        })),
    }),
    {
      name: "portfolio-filters",
      // Use noop storage during SSR to avoid hydration mismatch
      storage: createJSONStorage(() =>
        isBrowser ? localStorage : createNoopStorage(),
      ),
    },
  ),
);

