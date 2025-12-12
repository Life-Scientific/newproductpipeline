// ============================================================================
// KPI Dashboard Dummy Data for Visualizations
// ============================================================================

// Generate months for the last 12 months
const generateMonths = () => {
  const months = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: date.toLocaleDateString("en-US", { month: "short" }),
      year: date.getFullYear(),
      fullDate: date.toISOString(),
      label: date.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
    });
  }
  return months;
};

export const MONTHS = generateMonths();

// ============================================================================
// Deterministic Random Function (must be defined before use)
// ============================================================================

// Using deterministic pseudo-random based on index to avoid hydration mismatches
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// ============================================================================
// Markets/Regions Data
// ============================================================================

export const REVENUE_BY_TERRITORY = [
  { territory: "North America", percentage: 35, trend: "+2.1%" },
  { territory: "France", percentage: 28, trend: "+0.5%" },
  { territory: "UK & Ireland", percentage: 25, trend: "-1.2%" },
  { territory: "Other", percentage: 12, trend: "+0.8%" },
];

export const MARKET_SHARE_DATA = MONTHS.map((m, i) => {
  const random1 = seededRandom(i * 0.555);
  const random2 = seededRandom(i * 0.666);
  const random3 = seededRandom(i * 0.777);
  const random4 = seededRandom(i * 0.888);
  return {
    month: m.label,
    northAmerica: 12 + Math.sin(i * 0.5) * 2 + random1 * 1,
    france: 18 + Math.cos(i * 0.4) * 2 + random2 * 1,
    ukIreland: 15 + Math.sin(i * 0.3) * 1.5 + random3 * 1,
    other: 8 + Math.cos(i * 0.6) * 1 + random4 * 0.5,
  };
});

// ============================================================================
// Products Data - Article Submissions
// ============================================================================

// Article 34 - Higher volume, ~75% success rate

export const ARTICLE_34_DATA = MONTHS.map((m, i) => {
  const random1 = seededRandom(i * 0.123);
  const random2 = seededRandom(i * 0.456);
  const total = Math.floor(15 + Math.sin(i * 0.4) * 5 + random1 * 3);
  const approved = Math.floor(total * (0.72 + random2 * 0.08));
  return {
    month: m.label,
    approved,
    notApproved: total - approved,
    total,
    successRate: Math.round((approved / total) * 100),
  };
});

// Article 33 - Lower volume, ~65% success rate
export const ARTICLE_33_DATA = MONTHS.map((m, i) => {
  const random1 = seededRandom(i * 0.789);
  const random2 = seededRandom(i * 0.321);
  const total = Math.floor(8 + Math.cos(i * 0.5) * 3 + random1 * 2);
  const approved = Math.floor(total * (0.60 + random2 * 0.12));
  return {
    month: m.label,
    approved,
    notApproved: total - approved,
    total,
    successRate: Math.round((approved / total) * 100),
  };
});

// ============================================================================
// Product Margins Data - Sparkline Trends
// ============================================================================

export const STOCK_WRITE_OFF_TREND = MONTHS.map((m, i) => {
  const random = seededRandom(i * 0.654);
  return {
    month: m.label,
    value: 2.5 + Math.sin(i * 0.3) * 0.8 + random * 0.3,
  };
});

export const GM_PER_FTE_TREND = MONTHS.map((m, i) => {
  const random = seededRandom(i * 0.987);
  return {
    month: m.label,
    value: 125000 + i * 2000 + Math.sin(i * 0.4) * 8000 + random * 3000,
  };
});

// ============================================================================
// Supply Chain Data - Bullet Charts
// ============================================================================

export const SUPPLY_CHAIN_METRICS = {
  otifCustomer: {
    actual: 94.2,
    target: 98,
    ranges: [85, 92, 98, 100], // Poor, OK, Good, Excellent
    label: "Target Delivery OTIF % to Customer",
  },
  supplierOnTime: {
    actual: 89.5,
    target: 95,
    ranges: [80, 88, 95, 100],
    label: "Target Supplier Deliver On Time %",
  },
};

// ============================================================================
// Freight & Tariff Data - Line Charts
// ============================================================================

export const FREIGHT_COSTS_DATA = MONTHS.map((m, i) => {
  const random = seededRandom(i * 0.111);
  return {
    month: m.label,
    value: 4.2 + Math.sin(i * 0.5) * 0.8 + random * 0.3,
  };
});

export const TARIFF_COSTS_DATA = MONTHS.map((m, i) => {
  const random = seededRandom(i * 0.222);
  return {
    month: m.label,
    value: 2.8 + Math.cos(i * 0.4) * 0.5 + random * 0.2,
  };
});

// ============================================================================
// Planning Data
// ============================================================================

export const FORECAST_ACCURACY_DATA = MONTHS.map((m, i) => {
  const random = seededRandom(i * 0.333);
  return {
    month: m.label,
    value: 78 + i * 0.8 + Math.sin(i * 0.6) * 5 + random * 3,
  };
});

export const OBSOLETE_STOCK_DATA = MONTHS.map((m, i) => {
  const random = seededRandom(i * 0.444);
  return {
    month: m.label,
    value: 6.5 - i * 0.15 + Math.sin(i * 0.3) * 1.2 + random * 0.5,
  };
});

// ============================================================================
// Helper Functions
// ============================================================================

export const getCurrentMonthValue = (data: { month: string; value: number }[]) => {
  return data[data.length - 1]?.value || 0;
};

export const getPreviousMonthValue = (data: { month: string; value: number }[]) => {
  return data[data.length - 2]?.value || 0;
};

export const getMonthOverMonthChange = (data: { month: string; value: number }[]) => {
  const current = getCurrentMonthValue(data);
  const previous = getPreviousMonthValue(data);
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

