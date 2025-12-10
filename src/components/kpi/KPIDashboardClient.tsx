"use client";

import { useState, useEffect, useCallback } from "react";
import { Section } from "@/components/layout/Section";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { EditableKPISectionLocal } from "./EditableKPISectionLocal";
import type {
  KPISection,
  KPIMetric,
  KPIMetricHistoryEntry,
} from "@/lib/actions/kpi-actions";

const STORAGE_KEY = "kpi_dashboard_prototype";

interface StoredData {
  metrics: Record<string, number | null>; // metric_key -> value
  history: KPIMetricHistoryEntry[];
  owners: Record<string, string | null>; // section_key -> user_id
}

interface KPIDashboardClientProps {
  sections: KPISection[];
  metrics: KPIMetric[];
  history: KPIMetricHistoryEntry[];
  currentUserId: string | null;
  currentUserEmail: string | null;
  isAdmin: boolean;
  users: { id: string; email: string }[];
}

export function KPIDashboardClient({
  sections,
  metrics: initialMetrics,
  history: initialHistory,
  currentUserId,
  currentUserEmail,
  isAdmin,
  users,
}: KPIDashboardClientProps) {
  const [metrics, setMetrics] = useState<KPIMetric[]>(initialMetrics);
  const [history, setHistory] = useState<KPIMetricHistoryEntry[]>(initialHistory);
  const [sectionOwners, setSectionOwners] = useState<Record<string, string | null>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: StoredData = JSON.parse(stored);

        // Merge stored metric values with initial metrics
        const mergedMetrics = initialMetrics.map((m) => ({
          ...m,
          metric_value: data.metrics[m.metric_key] ?? m.metric_value,
        }));
        setMetrics(mergedMetrics);

        // Load history
        if (data.history) {
          setHistory(data.history);
        }

        // Load owners
        if (data.owners) {
          setSectionOwners(data.owners);
        }
      }
    } catch (e) {
      console.error("Failed to load KPI data from localStorage:", e);
    }

    setIsLoaded(true);
  }, [initialMetrics]);

  // Save to localStorage
  const saveToStorage = useCallback(
    (
      newMetrics: KPIMetric[],
      newHistory: KPIMetricHistoryEntry[],
      newOwners: Record<string, string | null>
    ) => {
      if (typeof window === "undefined") return;

      const data: StoredData = {
        metrics: newMetrics.reduce(
          (acc, m) => {
            acc[m.metric_key] = m.metric_value;
            return acc;
          },
          {} as Record<string, number | null>
        ),
        history: newHistory,
        owners: newOwners,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },
    []
  );

  // Update a metric value
  const updateMetric = useCallback(
    (sectionKey: string, metricKey: string, newValue: number | null) => {
      const metric = metrics.find(
        (m) => m.section_key === sectionKey && m.metric_key === metricKey
      );
      if (!metric) return;

      const oldValue = metric.metric_value;

      // Update metrics
      const updatedMetrics = metrics.map((m) =>
        m.section_key === sectionKey && m.metric_key === metricKey
          ? {
              ...m,
              metric_value: newValue,
              updated_at: new Date().toISOString(),
              updated_by: currentUserEmail || "Unknown",
            }
          : m
      );
      setMetrics(updatedMetrics);

      // Add history entry
      const historyEntry: KPIMetricHistoryEntry = {
        history_id: `h_${Date.now()}`,
        metric_id: metric.metric_id,
        section_key: sectionKey,
        metric_key: metricKey,
        old_value: oldValue,
        new_value: newValue,
        changed_by: currentUserEmail || "Unknown",
        changed_at: new Date().toISOString(),
        change_reason: null,
      };
      const updatedHistory = [historyEntry, ...history].slice(0, 100); // Keep last 100
      setHistory(updatedHistory);

      // Save to localStorage
      saveToStorage(updatedMetrics, updatedHistory, sectionOwners);
    },
    [metrics, history, sectionOwners, currentUserEmail, saveToStorage]
  );

  // Update section owner
  const updateOwner = useCallback(
    (sectionKey: string, ownerUserId: string | null) => {
      const newOwners = { ...sectionOwners, [sectionKey]: ownerUserId };
      setSectionOwners(newOwners);
      saveToStorage(metrics, history, newOwners);
    },
    [metrics, history, sectionOwners, saveToStorage]
  );

  // Sort sections by display_order
  const sortedSections = [...sections].sort(
    (a, b) => a.display_order - b.display_order
  );

  // Don't render until localStorage is loaded to avoid hydration mismatch
  if (!isLoaded) {
    return (
      <div className="space-y-6">
        {sortedSections.map((section) => (
          <Section key={section.section_id}>
            <div className="h-48 rounded-lg border bg-muted/30 animate-pulse" />
          </Section>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Prototype Mode:</strong> Data is saved to your browser&apos;s
          local storage. Click any metric to edit. Changes will persist in this
          browser only.
        </AlertDescription>
      </Alert>

      {sortedSections.map((section) => (
        <Section key={section.section_id}>
          <EditableKPISectionLocal
            section={{
              ...section,
              owner_user_id: sectionOwners[section.section_key] ?? section.owner_user_id,
            }}
            metrics={metrics}
            history={history}
            currentUserId={currentUserId}
            isAdmin={isAdmin}
            users={users}
            onUpdateMetric={updateMetric}
            onUpdateOwner={updateOwner}
          />
        </Section>
      ))}
    </div>
  );
}
