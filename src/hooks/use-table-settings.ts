"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";
import {
  saveTableSettings,
  deleteTableSettings,
  type TableSettings,
  type TableSettingsInput,
} from "@/lib/actions/table-settings";

interface UseTableSettingsOptions {
  tableId: string;
  defaultSettings?: Partial<TableSettings>;
  delay?: number; // Debounce delay in ms (default: 1000)
}

interface UseTableSettingsReturn extends TableSettings {
  isSaving: boolean;
  saveSettings: (settings: TableSettingsInput) => void;
  resetSettings: () => void;
  columnOrder: string[];
  columnVisibility: Record<string, boolean>;
  columnSizing: Record<string, number>;
  sorting: Array<{ id: string; desc: boolean }>;
  pagination?: {
    pageSize: number;
    pageIndex: number;
  };
}

/**
 * Hook for managing table settings with cookie persistence.
 *
 * Features:
 * - SSR-compatible (reads initial settings from props or cookies)
 * - Debounced saves to avoid excessive cookie writes
 * - Zero layout shift when settings are loaded
 *
 * Usage:
 * ```tsx
 * const {
 *   columnOrder,
 *   columnVisibility,
 *   columnSizing,
 *   sorting,
 *   isSaving,
 *   saveSettings,
 *   resetSettings,
 * } = useTableSettings({ tableId: "business-cases" });
 * ```
 */
export function useTableSettings({
  tableId,
  defaultSettings = {},
  delay = 1000,
}: UseTableSettingsOptions): UseTableSettingsReturn {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  // Local state initialized with defaults
  const [settings, setSettings] = useState<TableSettings>(() => ({
    columnOrder: defaultSettings.columnOrder ?? [],
    columnVisibility: defaultSettings.columnVisibility ?? {},
    columnSizing: defaultSettings.columnSizing ?? {},
    sorting: defaultSettings.sorting ?? [],
    pagination: defaultSettings.pagination,
  }));

  // Debounced settings for saving
  const [debouncedSettings] = useDebounce(settings, delay);

  // Load settings from cookie on mount (client-side)
  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch(`/api/table-settings/${tableId}`);
        if (response.ok) {
          const loadedSettings = await response.json();
          setSettings((prev) => ({
            columnOrder: loadedSettings.columnOrder ?? prev.columnOrder,
            columnVisibility:
              loadedSettings.columnVisibility ?? prev.columnVisibility,
            columnSizing: loadedSettings.columnSizing ?? prev.columnSizing,
            sorting: loadedSettings.sorting ?? prev.sorting,
            pagination: loadedSettings.pagination ?? prev.pagination,
          }));
        }
      } catch {
        // Silently fail - we'll use default settings
        console.warn(`Could not load settings for table: ${tableId}`);
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, [tableId]);

  // Save settings to cookie when debounced settings change
  useEffect(() => {
    if (isLoading) return; // Don't save until we've tried to load

    startTransition(async () => {
      await saveTableSettings(tableId, debouncedSettings);
    });
  }, [debouncedSettings, tableId, isLoading]);

  // Save settings helper
  const saveSettings = useCallback(
    (newSettings: TableSettingsInput) => {
      setSettings((prev) => ({
        columnOrder: newSettings.columnOrder ?? prev.columnOrder,
        columnVisibility: newSettings.columnVisibility ?? prev.columnVisibility,
        columnSizing: newSettings.columnSizing ?? prev.columnSizing,
        sorting: newSettings.sorting ?? prev.sorting,
        pagination: newSettings.pagination ?? prev.pagination,
      }));
    },
    [tableId],
  );

  // Reset settings to defaults
  const resetSettings = useCallback(() => {
    startTransition(async () => {
      await deleteTableSettings(tableId);
      setSettings({
        columnOrder: defaultSettings.columnOrder ?? [],
        columnVisibility: defaultSettings.columnVisibility ?? {},
        columnSizing: defaultSettings.columnSizing ?? {},
        sorting: defaultSettings.sorting ?? [],
        pagination: defaultSettings.pagination,
      });
    });
  }, [tableId, defaultSettings]);

  return {
    ...settings,
    isSaving: isPending,
    saveSettings,
    resetSettings,
    columnOrder: settings.columnOrder,
    columnVisibility: settings.columnVisibility,
    columnSizing: settings.columnSizing,
    sorting: settings.sorting,
    pagination: settings.pagination,
  };
}

/**
 * Hook for getting table settings in Server Components
 * This is used in page.tsx to pass initial settings to the client component
 */
export async function getServerTableSettings(
  tableId: string,
): Promise<TableSettings | null> {
  "use server";

  const { getTableSettings } = await import(
    "@/lib/actions/table-settings"
  );
  return getTableSettings(tableId);
}

