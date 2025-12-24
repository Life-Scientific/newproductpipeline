import { createClient } from "@/lib/supabase/server";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Database,
  Table2,
  Link as LinkIcon,
  Eye,
} from "lucide-react";
import Link from "next/link";

interface TableInfo {
  name: string;
  type: "table" | "view" | "junction" | "system" | "audit";
  rowCount: number | null;
  description?: string;
  hasUI?: boolean;
  uiPath?: string;
}

// Table metadata
const tableMetadata: Record<string, Partial<TableInfo>> = {
  // Core business tables
  formulations: {
    type: "table",
    description: "Core product formulations",
    hasUI: true,
    uiPath: "/portfolio/formulations",
  },
  business_case: {
    type: "table",
    description: "10-year financial projections",
    hasUI: true,
    uiPath: "/portfolio/business-cases",
  },
  countries: {
    type: "table",
    description: "Country/market reference",
    hasUI: true,
    uiPath: "/portfolio/countries",
  },
  formulation_country: {
    type: "table",
    description: "Formulation-country registrations",
    hasUI: true,
    uiPath: "/portfolio/formulation-countries",
  },
  formulation_country_use_group: {
    type: "table",
    description: "Use group definitions",
    hasUI: true,
    uiPath: "/portfolio/use-groups",
  },
  ingredients: {
    type: "table",
    description: "Active ingredients & co-formulants",
    hasUI: true,
    uiPath: "/portfolio/active-ingredients",
  },
  cogs: {
    type: "table",
    description: "Cost of Goods Sold",
    hasUI: true,
    uiPath: "/portfolio/cogs",
  },

  // Missing UI
  patents: {
    type: "table",
    description: "Patent records - NO UI",
    hasUI: false,
  },
  patent_assessments: {
    type: "table",
    description: "Patent relevance assessments - NO UI",
    hasUI: false,
  },
  reference_products: {
    type: "table",
    description: "Reference products - NO UI",
    hasUI: false,
  },
  suppliers: {
    type: "table",
    description: "Ingredient suppliers - NO UI",
    hasUI: false,
  },
  submissions: {
    type: "table",
    description: "Registration submissions - NO UI",
    hasUI: false,
  },
  external_links: {
    type: "table",
    description: "External links - UNUSED?",
    hasUI: false,
  },

  // Reference tables
  eppo_codes: {
    type: "table",
    description: "EPPO crop/pest codes",
    hasUI: true,
    uiPath: "/portfolio/reference",
  },
  exchange_rates: {
    type: "table",
    description: "Currency exchange rates",
    hasUI: true,
    uiPath: "/portfolio/reference",
  },
  currency_conversions: {
    type: "system",
    description: "Currency conversion cache",
  },

  // Junction tables
  business_case_use_groups: {
    type: "junction",
    description: "Links business cases to use groups",
  },
  formulation_ingredients: {
    type: "junction",
    description: "Links formulations to ingredients",
  },
  ingredient_suppliers: {
    type: "junction",
    description: "Links ingredients to suppliers",
  },
  formulation_country_use_group_eppo_crops: {
    type: "junction",
    description: "Use group EPPO crops",
  },
  formulation_country_use_group_eppo_targets: {
    type: "junction",
    description: "Use group EPPO targets",
  },
  formulation_eppo_crops: {
    type: "junction",
    description: "Formulation EPPO crops",
  },
  formulation_eppo_targets: {
    type: "junction",
    description: "Formulation EPPO targets",
  },
  patent_combination_ingredients: {
    type: "junction",
    description: "Patent combination ingredients",
  },
  patent_ingredient_protections: {
    type: "junction",
    description: "Patent ingredient protections",
  },
  patent_reference_product_protections: {
    type: "junction",
    description: "Patent reference product protections",
  },
  patent_use_protections: {
    type: "junction",
    description: "Patent use protections",
  },
  reference_product_eppo_crops: {
    type: "junction",
    description: "Reference product crops",
  },
  reference_product_eppo_targets: {
    type: "junction",
    description: "Reference product targets",
  },

  // Audit tables
  formulation_status_history: {
    type: "audit",
    description: "Formulation status changes",
  },
  formulation_readiness_history: {
    type: "audit",
    description: "Formulation readiness changes",
  },
  formulation_country_status_history: {
    type: "audit",
    description: "Country status changes",
  },
  formulation_country_readiness_history: {
    type: "audit",
    description: "Country readiness changes",
  },
  formulation_country_use_group_status_history: {
    type: "audit",
    description: "Use group status changes",
  },
  formulation_country_use_group_eppo_crops_audit: {
    type: "audit",
    description: "Use group crops audit",
  },
  formulation_country_use_group_eppo_targets_audit: {
    type: "audit",
    description: "Use group targets audit",
  },
  formulation_eppo_crops_audit: {
    type: "audit",
    description: "Formulation crops audit",
  },
  formulation_eppo_targets_audit: {
    type: "audit",
    description: "Formulation targets audit",
  },
  reference_product_eppo_crops_audit: {
    type: "audit",
    description: "Ref product crops audit",
  },
  reference_product_eppo_targets_audit: {
    type: "audit",
    description: "Ref product targets audit",
  },

  // System tables
  base_code_registry: {
    type: "system",
    description: "Formulation code generation",
  },
  chat_messages: { type: "system", description: "AI chat messages" },
  chat_sessions: { type: "system", description: "AI chat sessions" },
  invitations: { type: "system", description: "User invitations" },
  permissions: { type: "system", description: "Permission definitions" },
  role_permissions: { type: "system", description: "Role-permission mapping" },
  roles: { type: "system", description: "User roles" },
  user_roles: { type: "system", description: "User-role assignments" },
  user_preferences: { type: "system", description: "User preferences" },
  user_workspace_preferences: {
    type: "system",
    description: "Workspace preferences",
  },
  themes: { type: "system", description: "UI themes" },
  theme_colors: { type: "system", description: "Theme color definitions" },
  workspaces: { type: "system", description: "Workspace definitions" },
  workspace_menu_items: { type: "system", description: "Sidebar menu items" },
};

// Views metadata
const viewMetadata: Record<string, Partial<TableInfo>> = {
  vw_formulations_with_ingredients: {
    description: "Formulations with ingredient list",
    hasUI: true,
    uiPath: "/portfolio/formulations",
  },
  vw_business_case: {
    description: "Business case details",
    hasUI: true,
    uiPath: "/portfolio/business-cases",
  },
  vw_business_case_detail: { description: "Extended business case info" },
  vw_formulation_country_detail: {
    description: "Formulation-country details",
    hasUI: true,
    uiPath: "/portfolio/formulation-countries",
  },
  vw_formulation_country_use_group: {
    description: "Use group full details",
    hasUI: true,
    uiPath: "/portfolio/use-groups",
  },
  vw_use_group_details: { description: "Use group with crops/targets" },
  vw_cogs: {
    description: "COGS with formulation info",
    hasUI: true,
    uiPath: "/portfolio/cogs",
  },
  vw_ingredient_usage: {
    description: "Ingredient usage stats",
    hasUI: true,
    uiPath: "/portfolio/ingredients",
  },
  vw_active_portfolio: {
    description: "Active portfolio items",
    hasUI: true,
    uiPath: "/portfolio/pipeline-tracker",
  },
  vw_registration_pipeline: {
    description: "Registration pipeline",
    hasUI: true,
    uiPath: "/portfolio/registration",
  },
  vw_dashboard_summary: { description: "Dashboard metrics" },
  vw_chart_data_by_year: { description: "Chart data by fiscal year" },
  vw_chart_data_totals_by_year: { description: "Yearly totals for charts" },
  vw_portfolio_by_country: {
    description: "Portfolio by country",
    hasUI: true,
    uiPath: "/portfolio/markets",
  },
  vw_formulation_families: { description: "Formulation family groupings" },
  vw_blocking_patents: {
    description: "Blocking patents - NO UI",
    hasUI: false,
  },
  vw_patent_landscape: {
    description: "Patent landscape - NO UI",
    hasUI: false,
  },
  vw_patent_protection_status: { description: "Patent protection status" },
  vw_patent_assessments_effective: {
    description: "Effective patent assessments - NO UI",
    hasUI: false,
  },
  vw_patent_applicable_countries: {
    description: "Patents by country - NO UI",
    hasUI: false,
  },
};

const typeColors: Record<string, string> = {
  table: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  view: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  junction: "bg-gray-500/10 text-gray-600 border-gray-500/30",
  system: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  audit: "bg-orange-500/10 text-orange-600 border-orange-500/30",
};

export default async function TablesPage() {
  const supabase = await createClient();

  // Fetch row counts for key tables
  const tablesToCount = [
    "formulations",
    "business_case",
    "countries",
    "formulation_country",
    "formulation_country_use_group",
    "ingredients",
    "cogs",
    "patents",
    "patent_assessments",
    "reference_products",
    "suppliers",
    "submissions",
    "eppo_codes",
    "exchange_rates",
    "external_links",
  ];

  const counts: Record<string, number> = {};

  await Promise.all(
    tablesToCount.map(async (table) => {
      try {
        const { count } = await supabase
          .from(table)
          .select("*", { count: "exact", head: true });
        counts[table] = count || 0;
      } catch {
        counts[table] = -1;
      }
    }),
  );

  // Build table info array
  const tables: TableInfo[] = Object.entries(tableMetadata).map(
    ([name, meta]) => ({
      name,
      type: meta.type || "table",
      rowCount: counts[name] ?? null,
      description: meta.description,
      hasUI: meta.hasUI,
      uiPath: meta.uiPath,
    }),
  );

  const views: TableInfo[] = Object.entries(viewMetadata).map(
    ([name, meta]) => ({
      name,
      type: "view",
      rowCount: null,
      description: meta.description,
      hasUI: meta.hasUI,
      uiPath: meta.uiPath,
    }),
  );

  // Group tables by type
  const coreTables = tables.filter((t) => t.type === "table");
  const junctionTables = tables.filter((t) => t.type === "junction");
  const auditTables = tables.filter((t) => t.type === "audit");
  const systemTables = tables.filter((t) => t.type === "system");

  const totalRows = Object.values(counts).reduce(
    (sum, c) => sum + (c > 0 ? c : 0),
    0,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 max-w-5xl">
        <AnimatedPage>
          {/* Header */}
          <div className="space-y-2 mb-6">
            <Link
              href="/dev"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Dev Tools
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Database Tables
              </h1>
              <Badge
                variant="outline"
                className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
              >
                Dev Tool
              </Badge>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Overview of all database tables and views with row counts
            </p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{tables.length}</div>
                <p className="text-xs text-muted-foreground">Tables</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{views.length}</div>
                <p className="text-xs text-muted-foreground">Views</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {totalRows.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Total Rows</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600">
                  {tables.filter((t) => t.hasUI).length}
                </div>
                <p className="text-xs text-muted-foreground">With UI</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-red-500">
                  {coreTables.filter((t) => !t.hasUI).length}
                </div>
                <p className="text-xs text-muted-foreground">No UI</p>
              </CardContent>
            </Card>
          </div>

          {/* Core Tables */}
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Table2 className="h-4 w-4" />
                Core Tables ({coreTables.length})
              </CardTitle>
              <CardDescription>Main business data tables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {coreTables.map((table) => (
                  <div
                    key={table.name}
                    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors ${!table.hasUI ? "bg-red-500/5" : ""}`}
                  >
                    <Badge
                      variant="outline"
                      className={`font-mono text-[10px] w-14 justify-center ${typeColors[table.type]}`}
                    >
                      table
                    </Badge>
                    <code className="text-sm font-mono flex-1">
                      {table.name}
                    </code>
                    {table.rowCount !== null && table.rowCount >= 0 && (
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {table.rowCount.toLocaleString()}
                      </span>
                    )}
                    {table.hasUI && table.uiPath && (
                      <Link
                        href={table.uiPath}
                        className="text-primary hover:underline"
                      >
                        <LinkIcon className="h-3 w-3" />
                      </Link>
                    )}
                    {!table.hasUI && (
                      <span className="text-xs text-red-500">No UI</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Views */}
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Views ({views.length})
              </CardTitle>
              <CardDescription>Database views for querying</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {views.map((view) => (
                  <div
                    key={view.name}
                    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors ${view.hasUI === false ? "bg-red-500/5" : ""}`}
                  >
                    <Badge
                      variant="outline"
                      className={`font-mono text-[10px] w-14 justify-center ${typeColors.view}`}
                    >
                      view
                    </Badge>
                    <code className="text-xs font-mono flex-1 text-muted-foreground">
                      {view.name}
                    </code>
                    {view.hasUI && view.uiPath && (
                      <Link
                        href={view.uiPath}
                        className="text-primary hover:underline"
                      >
                        <LinkIcon className="h-3 w-3" />
                      </Link>
                    )}
                    {view.hasUI === false && (
                      <span className="text-xs text-red-500">No UI</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Junction Tables */}
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-muted-foreground">
                Junction Tables ({junctionTables.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {junctionTables.map((table) => (
                  <Badge
                    key={table.name}
                    variant="outline"
                    className="font-mono text-[10px]"
                  >
                    {table.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Audit & System Tables */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-muted-foreground">
                  Audit Tables ({auditTables.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {auditTables.map((table) => (
                    <Badge
                      key={table.name}
                      variant="outline"
                      className="font-mono text-[10px]"
                    >
                      {table.name.replace(/_/g, "_\u200B")}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-muted-foreground">
                  System Tables ({systemTables.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {systemTables.map((table) => (
                    <Badge
                      key={table.name}
                      variant="outline"
                      className="font-mono text-[10px]"
                    >
                      {table.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedPage>
      </div>
    </div>
  );
}

