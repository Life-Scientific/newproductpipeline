export type StatusColor = "red" | "yellow" | "green";

export type DataSource = {
  system: string; // e.g., "ClickUp", "SAP", "Salesforce", "Manual"
  endpoint?: string; // API endpoint or reference
  lastSync: string; // ISO date
  frequency: "realtime" | "daily" | "weekly" | "monthly" | "manual";
};

export interface KeyResult {
  id: string;
  label: string;
  status: StatusColor;
  ownerId: string | null;
  target?: string | number;
  reality?: string | number;
  justification?: string;
  lastUpdated: string;
  lastUpdatedBy?: string;
  isLocked: boolean;
  source: DataSource;
  notes?: string;
  trend?: "up" | "down" | "flat";
}

export interface StrategicDriver {
  id: string;
  label: string;
  keyResults: KeyResult[];
}

export interface CoreDriver {
  id: string;
  label: string;
  target: string;
  strategicDrivers: StrategicDriver[];
}

export interface KPIData {
  coreDrivers: CoreDriver[];
}

const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

// Mock data sources
const sources = {
  clickup: { system: "ClickUp", endpoint: "/api/clickup/tasks", frequency: "daily" as const },
  sap: { system: "SAP S/4HANA", endpoint: "/api/sap/financials", frequency: "daily" as const },
  salesforce: { system: "Salesforce", endpoint: "/api/sf/pipeline", frequency: "realtime" as const },
  manual: { system: "Manual Entry", frequency: "manual" as const },
  excel: { system: "Excel Import", endpoint: "/uploads/kpi-tracker.xlsx", frequency: "weekly" as const },
  power_bi: { system: "Power BI", endpoint: "/api/powerbi/dataset/12345", frequency: "daily" as const },
};

export const initialKPIData: KPIData = {
  coreDrivers: [
    {
      id: "revenue-growth",
      label: "Revenue Growth",
      target: "4x by 2030 (€250m)",
      strategicDrivers: [
        {
          id: "markets-regions",
          label: "Markets / Regions",
          keyResults: [
            {
              id: "kr-markets",
              label: "USA, Canada, France, UK, Other %",
              status: "yellow",
              ownerId: null,
              target: "25%",
              reality: "18%",
              lastUpdated: daysAgo(3),
              isLocked: false,
              source: { ...sources.salesforce, lastSync: daysAgo(0) },
              trend: "up",
              notes: "US market showing strong growth. France lagging due to regulatory delays.",
            },
          ],
        },
        {
          id: "products-art34",
          label: "Products Art 34's",
          keyResults: [
            {
              id: "kr-art34",
              label: "# of Art 34's submitted",
              status: "red",
              ownerId: null,
              target: "12",
              reality: "4",
              lastUpdated: daysAgo(1),
              isLocked: false,
              source: { ...sources.clickup, lastSync: daysAgo(0) },
              trend: "flat",
              notes: "Behind schedule. Resource constraints in regulatory team.",
            },
          ],
        },
        {
          id: "products-art33",
          label: "Products Art 33's",
          keyResults: [
            {
              id: "kr-art33",
              label: "# of Art 33's submitted",
              status: "yellow",
              ownerId: null,
              target: "8",
              reality: "5",
              lastUpdated: daysAgo(7),
              isLocked: true,
              source: { ...sources.clickup, lastSync: daysAgo(1) },
              trend: "up",
            },
          ],
        },
        {
          id: "adjacent-offerings",
          label: "Adjacent offerings",
          keyResults: [
            {
              id: "kr-patented",
              label: "Patented products",
              status: "green",
              ownerId: null,
              target: "3",
              reality: "3",
              lastUpdated: daysAgo(14),
              isLocked: true,
              source: { ...sources.manual, lastSync: daysAgo(14) },
              trend: "flat",
            },
            {
              id: "kr-portfolio-count",
              label: "# of products in portfolio",
              status: "red",
              ownerId: null,
              target: "50",
              reality: "28",
              lastUpdated: daysAgo(2),
              isLocked: false,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "up",
              notes: "Pipeline healthy but conversion rate needs improvement.",
            },
          ],
        },
      ],
    },
    {
      id: "cash-operating-margin",
      label: "Cash Operating Margin",
      target: "EBITDA 7x by 2030 (€100m)",
      strategicDrivers: [
        {
          id: "product-margin-cogs",
          label: "Product Margin / COGS",
          keyResults: [
            {
              id: "kr-stock-writeoff",
              label: "Stock Write off % of COGS",
              status: "yellow",
              ownerId: null,
              target: "<2%",
              reality: "3.1%",
              lastUpdated: daysAgo(5),
              isLocked: false,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "down",
              notes: "Improved from 4.2% last quarter.",
            },
            {
              id: "kr-target-rebate",
              label: "Target Rebate % of COGS",
              status: "green",
              ownerId: null,
              target: "<5%",
              reality: "4.2%",
              lastUpdated: daysAgo(10),
              isLocked: true,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "flat",
            },
            {
              id: "kr-target-gross-margin",
              label: "Target Gross Margin %",
              status: "green",
              ownerId: null,
              target: ">35%",
              reality: "38%",
              lastUpdated: daysAgo(8),
              isLocked: false,
              source: { ...sources.power_bi, lastSync: daysAgo(0) },
              trend: "up",
            },
            {
              id: "kr-gm-per-fte",
              label: "GM per FTE",
              status: "green",
              ownerId: null,
              target: "€150k",
              reality: "€165k",
              lastUpdated: daysAgo(12),
              isLocked: true,
              source: { ...sources.power_bi, lastSync: daysAgo(0) },
              trend: "up",
            },
          ],
        },
        {
          id: "supply-chain-performance",
          label: "Supply Chain Performance",
          keyResults: [
            {
              id: "kr-delivery-otif",
              label: "Target delivery OTIF % to customer",
              status: "yellow",
              ownerId: null,
              target: ">95%",
              reality: "91%",
              lastUpdated: daysAgo(4),
              isLocked: false,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "up",
            },
            {
              id: "kr-supplier-on-time",
              label: "Target Supplier deliver on time % to us",
              status: "green",
              ownerId: null,
              target: ">90%",
              reality: "92%",
              lastUpdated: daysAgo(6),
              isLocked: false,
              source: { ...sources.excel, lastSync: daysAgo(2) },
              trend: "flat",
            },
          ],
        },
        {
          id: "working-capital-optimization",
          label: "Working Capital Optimization",
          keyResults: [
            {
              id: "kr-net-working-capital",
              label: "Net Working Capital % of sales",
              status: "yellow",
              ownerId: null,
              target: "<20%",
              reality: "24%",
              lastUpdated: daysAgo(9),
              isLocked: false,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "down",
            },
            {
              id: "kr-stock-days",
              label: "Target Stock Days % >180",
              status: "yellow",
              ownerId: null,
              target: "<10%",
              reality: "15%",
              lastUpdated: daysAgo(11),
              isLocked: false,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "down",
            },
          ],
        },
        {
          id: "process-efficiency",
          label: "Process Efficiency",
          keyResults: [
            {
              id: "kr-aged-debt",
              label: "Target Aged Debt % >180",
              status: "red",
              ownerId: null,
              target: "<5%",
              reality: "12%",
              lastUpdated: daysAgo(2),
              isLocked: false,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "up",
              notes: "Collections team understaffed. Hiring in progress.",
            },
            {
              id: "kr-creditor-days",
              label: "Target Creditor Days % >60",
              status: "green",
              ownerId: null,
              target: "<15%",
              reality: "8%",
              lastUpdated: daysAgo(15),
              isLocked: true,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "flat",
            },
          ],
        },
        {
          id: "freight-tariff-optimization",
          label: "Freight/Tariff Optimization",
          keyResults: [
            {
              id: "kr-right-first-time",
              label: "Right first time metric to be developed",
              status: "yellow",
              ownerId: null,
              lastUpdated: daysAgo(20),
              isLocked: false,
              source: { ...sources.manual, lastSync: daysAgo(20) },
              notes: "KPI definition in progress with ops team.",
            },
            {
              id: "kr-toller-performance",
              label: "Toller Performance Score",
              status: "yellow",
              ownerId: null,
              target: ">85",
              reality: "78",
              lastUpdated: daysAgo(7),
              isLocked: false,
              source: { ...sources.excel, lastSync: daysAgo(3) },
              trend: "up",
            },
            {
              id: "kr-freight-costs",
              label: "Freight costs as % of purchases",
              status: "yellow",
              ownerId: null,
              target: "<8%",
              reality: "9.5%",
              lastUpdated: daysAgo(13),
              isLocked: false,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "down",
            },
            {
              id: "kr-returns",
              label: "% returns # and €",
              status: "yellow",
              ownerId: null,
              target: "<2%",
              reality: "2.8%",
              lastUpdated: daysAgo(5),
              isLocked: false,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "down",
            },
          ],
        },
      ],
    },
    {
      id: "capital-efficiency",
      label: "Capital Efficiency",
      target: "15%+ IRR on investments",
      strategicDrivers: [
        {
          id: "demand-visibility",
          label: "Demand Visibility",
          keyResults: [
            {
              id: "kr-forecast-accuracy",
              label: "% forecast accuracy",
              status: "yellow",
              ownerId: null,
              target: ">80%",
              reality: "72%",
              lastUpdated: daysAgo(6),
              isLocked: false,
              source: { ...sources.power_bi, lastSync: daysAgo(0) },
              trend: "up",
            },
          ],
        },
        {
          id: "supply-planning",
          label: "Supply planning",
          keyResults: [
            {
              id: "kr-rd-spend",
              label: "R&D spend / Total Sales",
              status: "yellow",
              ownerId: null,
              target: "5-7%",
              reality: "4.2%",
              lastUpdated: daysAgo(18),
              isLocked: true,
              source: { ...sources.sap, lastSync: daysAgo(0) },
              trend: "flat",
            },
          ],
        },
        {
          id: "revenue-return",
          label: "Revenue Return",
          keyResults: [
            {
              id: "kr-time-to-register",
              label: "Avg Time to Register",
              status: "green",
              ownerId: null,
              target: "<18 months",
              reality: "14 months",
              lastUpdated: daysAgo(4),
              isLocked: false,
              source: { ...sources.clickup, lastSync: daysAgo(0) },
              trend: "down",
            },
            {
              id: "kr-lab-throughput",
              label: "Product Lab Throughput",
              status: "yellow",
              ownerId: null,
              target: "120/yr",
              reality: "95/yr",
              lastUpdated: daysAgo(8),
              isLocked: false,
              source: { ...sources.excel, lastSync: daysAgo(4) },
              trend: "up",
            },
          ],
        },
        {
          id: "roc",
          label: "ROC (Return on Capital)",
          keyResults: [
            {
              id: "kr-op-profit-capex",
              label: "Op Profit / Capex % > 12%",
              status: "green",
              ownerId: null,
              target: ">12%",
              reality: "15.2%",
              lastUpdated: daysAgo(21),
              isLocked: true,
              source: { ...sources.power_bi, lastSync: daysAgo(0) },
              trend: "up",
            },
            {
              id: "kr-rev-growth-rates",
              label: "Rev from New Product Growth Rates",
              status: "yellow",
              ownerId: null,
              target: ">20%",
              reality: "16%",
              lastUpdated: daysAgo(3),
              isLocked: false,
              source: { ...sources.salesforce, lastSync: daysAgo(0) },
              trend: "up",
            },
          ],
        },
      ],
    },
  ],
};
