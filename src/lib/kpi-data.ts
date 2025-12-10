// ============================================================================
// KPI Dashboard Types and Default Data
// ============================================================================

export interface KPISection {
  section_id: string;
  section_key: string;
  section_name: string;
  section_description: string | null;
  display_order: number;
  owner_user_id: string | null;
  owner_email?: string | null;
  created_at: string;
  updated_at: string;
}

export interface KPIMetric {
  metric_id: string;
  section_key: string;
  metric_key: string;
  metric_label: string;
  metric_value: number | null;
  metric_unit: string | null;
  target_value: number | null;
  display_order: number;
  updated_at: string;
  updated_by: string | null;
}

export interface KPIMetricHistoryEntry {
  history_id: string;
  metric_id: string;
  section_key: string;
  metric_key: string;
  old_value: number | null;
  new_value: number | null;
  changed_by: string;
  changed_at: string;
  change_reason: string | null;
}

// ============================================================================
// Default Sections
// ============================================================================

export const DEFAULT_SECTIONS: KPISection[] = [
  { section_id: "1", section_key: "markets_regions", section_name: "Markets/Regions", section_description: "Revenue and market share by region", display_order: 1, owner_user_id: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { section_id: "2", section_key: "products", section_name: "Products", section_description: "Article submissions and product portfolio metrics", display_order: 2, owner_user_id: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { section_id: "3", section_key: "product_margins", section_name: "Product Margins", section_description: "Margin and profitability targets", display_order: 3, owner_user_id: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { section_id: "4", section_key: "supply_chain", section_name: "Supply Chain Performance", section_description: "Delivery and supplier performance", display_order: 4, owner_user_id: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { section_id: "5", section_key: "working_capital", section_name: "Working Capital Optimization", section_description: "Cash flow and working capital metrics", display_order: 5, owner_user_id: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { section_id: "6", section_key: "process_efficiency", section_name: "Process Efficiency", section_description: "Operational efficiency metrics", display_order: 6, owner_user_id: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { section_id: "7", section_key: "freight", section_name: "Freight Optimization", section_description: "Freight cost management", display_order: 7, owner_user_id: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { section_id: "8", section_key: "tariff", section_name: "Tariff Optimization", section_description: "Tariff cost management", display_order: 8, owner_user_id: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { section_id: "9", section_key: "planning", section_name: "Planning", section_description: "Forecasting and planning metrics", display_order: 9, owner_user_id: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { section_id: "10", section_key: "capital_efficiency", section_name: "Capital Efficiency", section_description: "Return on capital and R&D metrics", display_order: 10, owner_user_id: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

// ============================================================================
// Default Metrics
// ============================================================================

export const DEFAULT_METRICS: KPIMetric[] = [
  // Markets/Regions
  { metric_id: "m1", section_key: "markets_regions", metric_key: "rev_north_america", metric_label: "% Rev from North America", metric_value: null, metric_unit: "%", target_value: null, display_order: 1, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m2", section_key: "markets_regions", metric_key: "rev_france", metric_label: "% Rev from France", metric_value: null, metric_unit: "%", target_value: null, display_order: 2, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m3", section_key: "markets_regions", metric_key: "rev_uk_ireland", metric_label: "% Rev from UK & Ireland", metric_value: null, metric_unit: "%", target_value: null, display_order: 3, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m4", section_key: "markets_regions", metric_key: "rev_other", metric_label: "% Rev from Other", metric_value: null, metric_unit: "%", target_value: null, display_order: 4, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m5", section_key: "markets_regions", metric_key: "share_north_america", metric_label: "% Market Share North America", metric_value: null, metric_unit: "%", target_value: null, display_order: 5, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m6", section_key: "markets_regions", metric_key: "share_france", metric_label: "% Market Share France", metric_value: null, metric_unit: "%", target_value: null, display_order: 6, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m7", section_key: "markets_regions", metric_key: "share_uk_ireland", metric_label: "% Market Share UK & Ireland", metric_value: null, metric_unit: "%", target_value: null, display_order: 7, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m8", section_key: "markets_regions", metric_key: "share_other", metric_label: "% Market Share Other", metric_value: null, metric_unit: "%", target_value: null, display_order: 8, updated_at: new Date().toISOString(), updated_by: null },

  // Products
  { metric_id: "m9", section_key: "products", metric_key: "art34_submissions", metric_label: "Article 34 - Number of Submissions", metric_value: null, metric_unit: "#", target_value: null, display_order: 1, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m10", section_key: "products", metric_key: "art34_success_rate", metric_label: "Article 34 - Success Rate", metric_value: null, metric_unit: "%", target_value: null, display_order: 2, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m11", section_key: "products", metric_key: "art33_submissions", metric_label: "Article 33 - Number of Submissions", metric_value: null, metric_unit: "#", target_value: null, display_order: 3, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m12", section_key: "products", metric_key: "art33_success_rate", metric_label: "Article 33 - Success Rate", metric_value: null, metric_unit: "%", target_value: null, display_order: 4, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m13", section_key: "products", metric_key: "patented_products", metric_label: "Number of Patented Products", metric_value: null, metric_unit: "#", target_value: null, display_order: 5, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m14", section_key: "products", metric_key: "products_in_portfolio", metric_label: "Number of Products in Portfolio", metric_value: null, metric_unit: "#", target_value: null, display_order: 6, updated_at: new Date().toISOString(), updated_by: null },

  // Product Margins
  { metric_id: "m15", section_key: "product_margins", metric_key: "target_gross_margin", metric_label: "Target Gross Margin", metric_value: null, metric_unit: "%", target_value: null, display_order: 1, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m16", section_key: "product_margins", metric_key: "target_rebate_rev", metric_label: "Target Rebate % Rev", metric_value: null, metric_unit: "%", target_value: null, display_order: 2, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m17", section_key: "product_margins", metric_key: "stock_write_off_cogs", metric_label: "Stock Write Off % of COGS", metric_value: null, metric_unit: "%", target_value: null, display_order: 3, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m18", section_key: "product_margins", metric_key: "gm_per_fte", metric_label: "GM per FTE", metric_value: null, metric_unit: "EUR", target_value: null, display_order: 4, updated_at: new Date().toISOString(), updated_by: null },

  // Supply Chain Performance
  { metric_id: "m19", section_key: "supply_chain", metric_key: "target_otif_customer", metric_label: "Target Delivery OTIF % to Customer", metric_value: null, metric_unit: "%", target_value: null, display_order: 1, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m20", section_key: "supply_chain", metric_key: "target_supplier_on_time", metric_label: "Target Supplier Deliver On Time %", metric_value: null, metric_unit: "%", target_value: null, display_order: 2, updated_at: new Date().toISOString(), updated_by: null },

  // Working Capital Optimization
  { metric_id: "m21", section_key: "working_capital", metric_key: "nwc_percent_sales", metric_label: "Net Working Capital % of Sales", metric_value: null, metric_unit: "%", target_value: null, display_order: 1, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m22", section_key: "working_capital", metric_key: "target_stock_days", metric_label: "Target Stock Days", metric_value: null, metric_unit: "days", target_value: null, display_order: 2, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m23", section_key: "working_capital", metric_key: "target_aged_debt_180", metric_label: "Target Aged Debt % > 180 Days", metric_value: null, metric_unit: "%", target_value: null, display_order: 3, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m24", section_key: "working_capital", metric_key: "target_creditor_days_60", metric_label: "Target Creditor Days % > 60", metric_value: null, metric_unit: "%", target_value: null, display_order: 4, updated_at: new Date().toISOString(), updated_by: null },

  // Process Efficiency
  { metric_id: "m25", section_key: "process_efficiency", metric_key: "right_first_time", metric_label: "Right First Time Metric (TBD)", metric_value: null, metric_unit: "%", target_value: null, display_order: 1, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m26", section_key: "process_efficiency", metric_key: "toller_performance", metric_label: "Toller Performance Score", metric_value: null, metric_unit: "#", target_value: null, display_order: 2, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m27", section_key: "process_efficiency", metric_key: "customer_returns_number", metric_label: "Customer Returns (Number)", metric_value: null, metric_unit: "#", target_value: null, display_order: 3, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m28", section_key: "process_efficiency", metric_key: "customer_returns_value", metric_label: "Customer Returns (Value)", metric_value: null, metric_unit: "EUR", target_value: null, display_order: 4, updated_at: new Date().toISOString(), updated_by: null },

  // Freight Optimization
  { metric_id: "m29", section_key: "freight", metric_key: "freight_costs_percent", metric_label: "Freight Costs as % of Purchases", metric_value: null, metric_unit: "%", target_value: null, display_order: 1, updated_at: new Date().toISOString(), updated_by: null },

  // Tariff Optimization
  { metric_id: "m30", section_key: "tariff", metric_key: "tariff_costs_percent", metric_label: "Tariff Costs as % of Purchases", metric_value: null, metric_unit: "%", target_value: null, display_order: 1, updated_at: new Date().toISOString(), updated_by: null },

  // Planning
  { metric_id: "m31", section_key: "planning", metric_key: "forecast_accuracy", metric_label: "% Forecast Accuracy (Plan vs Actual)", metric_value: null, metric_unit: "%", target_value: null, display_order: 1, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m32", section_key: "planning", metric_key: "obsolete_stock_percent", metric_label: "Obsolete Stock % of Total Stock", metric_value: null, metric_unit: "%", target_value: null, display_order: 2, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m33", section_key: "planning", metric_key: "avg_time_to_register", metric_label: "Avg Time to Register Product", metric_value: null, metric_unit: "days", target_value: null, display_order: 3, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m34", section_key: "planning", metric_key: "products_in_lab", metric_label: "Number of Products in Lab Production", metric_value: null, metric_unit: "#", target_value: null, display_order: 4, updated_at: new Date().toISOString(), updated_by: null },

  // Capital Efficiency
  { metric_id: "m35", section_key: "capital_efficiency", metric_key: "roc_percent", metric_label: "ROC (Operating Profit / Capex)", metric_value: null, metric_unit: "%", target_value: null, display_order: 1, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m36", section_key: "capital_efficiency", metric_key: "new_product_growth", metric_label: "New Product Rev Growth Rate (2yr)", metric_value: null, metric_unit: "%", target_value: null, display_order: 2, updated_at: new Date().toISOString(), updated_by: null },
  { metric_id: "m37", section_key: "capital_efficiency", metric_key: "rd_spend_percent", metric_label: "R&D Spend / Total Sales", metric_value: null, metric_unit: "%", target_value: null, display_order: 3, updated_at: new Date().toISOString(), updated_by: null },
];

