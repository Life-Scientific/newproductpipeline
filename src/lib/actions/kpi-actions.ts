"use server";

import {
  DEFAULT_SECTIONS,
  DEFAULT_METRICS,
  type KPISection,
  type KPIMetric,
  type KPIMetricHistoryEntry,
} from "@/lib/kpi-data";

// Re-export types for convenience
export type { KPISection, KPIMetric, KPIMetricHistoryEntry };

// ============================================================================
// Server Actions (placeholder for localStorage prototype)
// ============================================================================

export async function updateKPIMetric(
  sectionKey: string,
  metricKey: string,
  value: number | null
): Promise<{ success: boolean; error?: string }> {
  // This is handled client-side in localStorage prototype
  return { success: true };
}

export async function updateSectionOwner(
  sectionKey: string,
  ownerUserId: string | null
): Promise<{ success: boolean; error?: string }> {
  // This is handled client-side in localStorage prototype
  return { success: true };
}

export async function getKPIData(): Promise<{
  sections: KPISection[];
  metrics: KPIMetric[];
  history: KPIMetricHistoryEntry[];
}> {
  // Return default data - client will merge with localStorage
  return {
    sections: DEFAULT_SECTIONS,
    metrics: DEFAULT_METRICS,
    history: [],
  };
}

export async function getKPISectionHistory(
  sectionKey: string
): Promise<KPIMetricHistoryEntry[]> {
  return [];
}
