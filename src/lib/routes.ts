/**
 * Centralized route configuration for the application.
 * 
 * All internal links should use these helpers to ensure consistency
 * and make workspace/route changes trivial in the future.
 */

// Current workspace slug - change this to switch all routes
export const WORKSPACE_SLUG = "portfolio";

// Base workspace path
export const WORKSPACE_BASE = `/${WORKSPACE_SLUG}`;

/**
 * Generate a workspace-prefixed route
 * @example route("/formulations") => "/portfolio/formulations"
 * @example route("/formulations", id) => "/portfolio/formulations/abc123"
 */
export function route(path: string, id?: string): string {
  const basePath = path.startsWith("/") ? path : `/${path}`;
  const fullPath = id ? `${basePath}/${id}` : basePath;
  return `${WORKSPACE_BASE}${fullPath}`;
}

/**
 * Route definitions for type-safe navigation
 */
export const routes = {
  // Home
  home: () => WORKSPACE_BASE,
  
  // Formulations
  formulations: {
    list: () => route("/formulations"),
    detail: (id: string) => route("/formulations", id),
    hierarchy: (id: string) => `${route("/formulations", id)}/hierarchy`,
    compare: () => route("/formulations/compare"),
    blacklisted: () => route("/formulations/blacklisted"),
  },
  
  // Business Cases
  businessCases: {
    list: () => route("/business-cases"),
    detail: (id: string) => route("/business-cases", id),
  },
  
  // Countries
  countries: {
    list: () => route("/countries"),
    detail: (id: string) => route("/countries", id),
  },
  
  // Use Groups
  useGroups: {
    list: () => route("/use-groups"),
    detail: (id: string) => route("/use-groups", id),
  },
  
  // Active Ingredients
  activeIngredients: {
    list: () => route("/active-ingredients"),
    detail: (id: string) => route("/active-ingredients", id),
  },
  
  // Markets
  markets: {
    list: () => route("/markets"),
    detail: (countryId: string) => route("/markets", countryId),
  },
  
  // Formulation Countries
  formulationCountries: {
    list: () => route("/formulation-countries"),
    detail: (id: string) => route("/formulation-countries", id),
  },
  
  // Other pages
  analytics: () => route("/analytics"),
  cogs: () => route("/cogs"),
  chat: () => route("/chat"),
  ingredients: () => route("/ingredients"),
  pipelineTracker: () => route("/pipeline-tracker"),
  portfolioStrategy: () => route("/portfolio-strategy"),
  reference: () => route("/reference"),
  registration: () => route("/registration"),
  scenarioPlanning: () => route("/scenario-planning"),
  settings: () => route("/settings"),
} as const;

/**
 * Legacy route patterns that should be redirected
 * Used by middleware to handle old bookmarks/links
 */
export const LEGACY_ROUTES = [
  "/formulations",
  "/business-cases",
  "/countries",
  "/use-groups",
  "/active-ingredients",
  "/analytics",
  "/cogs",
  "/chat",
  "/ingredients",
  "/markets",
  "/pipeline-tracker",
  "/portfolio-strategy",
  "/reference",
  "/registration",
  "/scenario-planning",
  "/settings",
  "/formulation-countries",
] as const;

/**
 * Check if a path is a legacy route that needs redirecting
 */
export function isLegacyRoute(pathname: string): boolean {
  return LEGACY_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Convert a legacy route to the new workspace route
 */
export function toLegacyRedirect(pathname: string): string {
  return `${WORKSPACE_BASE}${pathname}`;
}



