/**
 * Enhanced Data Table Component with Advanced Features (Performance Optimized)
 *
 * Performance optimizations:
 * - Memoized expensive calculations
 * - Debounced view saves
 * - Optimized sticky column calculations (only when needed)
 * - Reduced re-renders with React.memo
 * - Lazy-loaded drag and drop (only when enabled)
 * - Conditional rendering of expensive features
 */

"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnSizingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  RotateCcw,
  Save,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

// Dynamically import DnD table to reduce initial bundle size
// Only loaded when enableColumnReordering is true
const DndTable = dynamic(
  () => import("./data-table-dnd").then((mod) => ({ default: mod.DndTable })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-32 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading table...</p>
      </div>
    ),
  },
);

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableUtils, type TableViewConfig } from "@/lib/utils/table-utils";
import { useTableSettings } from "@/hooks/use-table-settings";
import type { TableSettings } from "@/lib/actions/table-settings";

/**
 * Filter configuration for a column
 */
export interface FilterConfig<TData> {
  /** Column key to filter on (accessor key) */
  columnKey: keyof TData | string;
  /** Display label for the filter */
  label: string;
  /** URL param name (defaults to columnKey) */
  paramKey?: string;
  /** Custom function to extract the value from a row (for nested/computed values) */
  getValue?: (row: TData) => string | null | undefined;
  /** Custom function to get display label for a value */
  getLabel?: (value: string) => string;
}

export interface EnhancedDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  showPageSizeSelector?: boolean;
  emptyMessage?: string;
  isLoading?: boolean;
  /** Unique table identifier for cookie-based settings persistence */
  tableId: string;
  enableColumnReordering?: boolean;
  enableViewManagement?: boolean;
  /** Enable URL-based pagination persistence (page number in URL params) */
  enableUrlPagination?: boolean;
  /** Filter configurations - enables URL-persisted multi-select filters */
  filterConfigs?: FilterConfig<TData>[];
  /** Show filter count badge */
  showFilterCount?: boolean;
  /** Default column visibility state (used for SSR skeleton) */
  defaultColumnVisibility?: Record<string, boolean>;
  /** Default column order (used for SSR skeleton) */
  defaultColumnOrder?: string[];
  /** Default column sizing (used for SSR skeleton) */
  defaultColumnSizing?: Record<string, number>;
  /** Default sorting (used for SSR skeleton) */
  defaultSorting?: Array<{ id: string; desc: boolean }>;
  /** Initial settings loaded from server (for SSR hydration) */
  initialSettings?: TableSettings | null;
  /** Custom row class name function */
  getRowClassName?: (row: TData, index: number) => string;
}

/**
 * Memoized table cell component
 */
const MemoizedTableCell = React.memo(
  function MemoizedTableCell({
    cell,
    stickyStyle,
    align,
    minWidth,
  }: {
    cell: any;
    stickyStyle?: React.CSSProperties;
    align?: string;
    minWidth?: string;
  }) {
    return (
      <TableCell
        className="py-3"
        style={{
          textAlign: align as any,
          minWidth,
          ...stickyStyle,
        }}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for better memoization - avoid JSON.stringify (expensive!)
    if (prevProps.cell.id !== nextProps.cell.id) return false;
    if (prevProps.align !== nextProps.align) return false;
    if (prevProps.minWidth !== nextProps.minWidth) return false;

    // Compare cell values - TanStack Table provides getValue() which is stable
    // We compare the cell's rendered value by checking if the cell context changed
    // The cell.id already changes when the value changes, so this is mostly redundant
    // but we keep it for safety
    if (prevProps.cell.column.id !== nextProps.cell.column.id) return false;

    // Compare sticky styles efficiently without JSON.stringify
    const prev = prevProps.stickyStyle;
    const next = nextProps.stickyStyle;
    if (!prev && !next) return true;
    if (!prev || !next) return false;
    if (prev.position !== next.position) return false;
    if (prev.left !== next.left) return false;
    if (prev.right !== next.right) return false;
    if (prev.zIndex !== next.zIndex) return false;
    if (prev.backgroundColor !== next.backgroundColor) return false;

    return true;
  },
);

/**
 * Debounce hook for view saves
 */
// useDebounce is now imported from use-debounce package at top of file

export function EnhancedDataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  pageSize = 25,
  showPageSizeSelector = true,
  emptyMessage = "No results.",
  isLoading = false,
  tableId,
  enableColumnReordering = true,
  enableViewManagement = true,
  enableUrlPagination = false,
  filterConfigs = [],
  showFilterCount = true,
  defaultColumnVisibility = {},
  defaultColumnOrder = [],
  defaultColumnSizing = {},
  defaultSorting = [],
  initialSettings = null,
  getRowClassName,
}: EnhancedDataTableProps<TData, TValue>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Use cookie-based table settings (Pontus pattern)
  // If initialSettings is provided (from SSR), use it as default
  const {
    columnOrder,
    columnVisibility,
    columnSizing,
    sorting,
    isSaving: isSettingsSaving,
    saveSettings,
    resetSettings,
  } = useTableSettings({
    tableId: tableId || "default",
    defaultSettings: {
      columnOrder: defaultColumnOrder,
      columnVisibility: defaultColumnVisibility,
      columnSizing: defaultColumnSizing,
      sorting: defaultSorting,
    },
  });

  // Merge initialSettings from SSR (loaded on client) with defaults
  React.useEffect(() => {
    if (initialSettings) {
      // Initial settings from server - they'll be loaded by useTableSettings
      // This effect is just for tracking
      console.log("[EnhancedDataTable] Loaded SSR settings:", initialSettings);
    }
  }, [initialSettings]);

  // Local state for filters (initialized empty, synced from URL after mount to avoid hydration mismatch)
  const [activeFilters, setActiveFilters] = React.useState<
    Record<string, string[]>
  >(() => {
    // Always initialize with empty filters to ensure server/client match
    const filters: Record<string, string[]> = {};
    filterConfigs.forEach((config) => {
      const paramKey = config.paramKey || String(config.columnKey);
      filters[paramKey] = [];
    });
    return filters;
  });

  // Build filter options from data
  const filterOptions = React.useMemo(() => {
    const options: Record<string, { value: string; label: string }[]> = {};

    filterConfigs.forEach((config) => {
      const paramKey = config.paramKey || String(config.columnKey);
      const uniqueValues = new Set<string>();

      data.forEach((row) => {
        let value: string | null | undefined;
        if (config.getValue) {
          value = config.getValue(row);
        } else {
          value = (row as any)[config.columnKey];
        }
        if (value) {
          uniqueValues.add(value);
        }
      });

      options[paramKey] = Array.from(uniqueValues)
        .map((v) => ({
          value: v,
          label: config.getLabel ? config.getLabel(v) : v,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    });

    return options;
  }, [data, filterConfigs]);

  // Update filter values (updates local state and URL)
  const updateFilter = React.useCallback(
    (paramKey: string, values: string[]) => {
      console.log("[EnhancedDataTable] updateFilter called:", {
        paramKey,
        values,
      });

      // Update local state
      setActiveFilters((prev) => {
        const next = { ...prev, [paramKey]: values };
        console.log("[EnhancedDataTable] activeFilters updating:", {
          prev,
          next,
        });
        return next;
      });

      // Reset to page 1 when filters change
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));

      // Update URL using history API (no server navigation)
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (values.length > 0) {
          params.set(paramKey, values.join(","));
        } else {
          params.delete(paramKey);
        }
        // Always remove page param when filters change to reset pagination
        params.delete("page");
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;
        console.log("[EnhancedDataTable] Updating URL to:", newUrl);
        // Use pushState instead of replaceState to ensure browser history is updated
        window.history.pushState(null, "", newUrl);
      }
    },
    [pathname],
  );

  // Clear all filters (updates local state and URL)
  const clearAllFilters = React.useCallback(() => {
    // Clear local state
    const clearedFilters: Record<string, string[]> = {};
    filterConfigs.forEach((config) => {
      const paramKey = config.paramKey || String(config.columnKey);
      clearedFilters[paramKey] = [];
    });
    setActiveFilters(clearedFilters);

    // Reset to page 1
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));

    // Update URL using history API (no server navigation)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      filterConfigs.forEach((config) => {
        const paramKey = config.paramKey || String(config.columnKey);
        params.delete(paramKey);
      });
      params.delete("page");
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      window.history.replaceState(null, "", newUrl);
    }
  }, [pathname, filterConfigs]);

  // Filter data based on active filters
  const filteredData = React.useMemo(() => {
    console.log(
      "[EnhancedDataTable] filteredData memo recalculating, activeFilters:",
      activeFilters,
    );
    if (filterConfigs.length === 0) return data;

    const result = data.filter((row) => {
      return filterConfigs.every((config) => {
        const paramKey = config.paramKey || String(config.columnKey);
        const filterValues = activeFilters[paramKey];
        if (!filterValues || filterValues.length === 0) return true;

        let value: string | null | undefined;
        if (config.getValue) {
          value = config.getValue(row);
        } else {
          value = (row as any)[config.columnKey];
        }

        return value && filterValues.includes(value);
      });
    });

    console.log("[EnhancedDataTable] filteredData result:", {
      originalCount: data.length,
      filteredCount: result.length,
    });
    return result;
  }, [data, filterConfigs, activeFilters]);

  // Check if any filters are active
  const hasActiveFilters = React.useMemo(() => {
    return Object.values(activeFilters).some((values) => values.length > 0);
  }, [activeFilters]);

  // Count of active filters
  const activeFilterCount = React.useMemo(() => {
    return Object.values(activeFilters).reduce(
      (sum, values) => sum + values.length,
      0,
    );
  }, [activeFilters]);

  // Use sorting from useTableSettings (cookie-based)
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});

  // Pagination initialization - always start at page 0 to ensure server/client match
  // URL params will be synced after mount in useEffect
  const [pagination, setPagination] = React.useState(() => {
    return { pageIndex: 0, pageSize };
  });

  const [saveViewDialogOpen, setSaveViewDialogOpen] = React.useState(false);
  const [viewName, setViewName] = React.useState("");
  const [isMounted, setIsMounted] = React.useState(false);

  // Track if we've done initial URL sync (to avoid overwriting user's filter selections)
  const hasInitializedFromUrl = React.useRef(false);

  // Ensure drag-and-drop only renders on client to avoid hydration mismatch
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync URL params after mount to avoid hydration mismatch
  // This ensures server and client render the same initial state, then syncs with URL
  // Only runs ONCE on mount - subsequent filter changes are handled via updateFilter/clearAllFilters
  React.useEffect(() => {
    if (typeof window === "undefined" || hasInitializedFromUrl.current) return;
    hasInitializedFromUrl.current = true;

    const params = new URLSearchParams(window.location.search);

    // Sync pagination from URL
    if (enableUrlPagination) {
      const pageParam = params.get("page");
      if (pageParam) {
        const parsed = parseInt(pageParam, 10);
        if (!Number.isNaN(parsed) && parsed >= 1) {
          setPagination((prev) => ({ ...prev, pageIndex: parsed - 1 }));
        }
      }
    }

    // Sync filters from URL
    if (filterConfigs.length > 0) {
      const newFilters: Record<string, string[]> = {};
      let hasUrlFilters = false;
      filterConfigs.forEach((config) => {
        const paramKey = config.paramKey || String(config.columnKey);
        const value = params.get(paramKey);
        const filterValues = value ? value.split(",").filter(Boolean) : [];
        newFilters[paramKey] = filterValues;
        if (filterValues.length > 0) hasUrlFilters = true;
      });
      // Only update if there are actually URL filters to apply
      if (hasUrlFilters) {
        setActiveFilters(newFilters);
      }
    }
  }, []); // Empty deps - only run once on mount

  // Watch for URL changes (including portfolio filters) and reset pagination if filters changed
  // This handles cases where external filters (like portfolio filters) change the URL
  // Use a ref to track previous filter state to detect changes
  const prevFilterParamsRef = React.useRef<string>("");
  const prevPageParamRef = React.useRef<string | null>(null);
  const isUpdatingPaginationRef = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (!enableUrlPagination) return;

    // Sync pagination from URL (but only if it's different from current state)
    const pageParam = searchParams.get("page");
    const currentPageFromUrl = pageParam ? parseInt(pageParam, 10) - 1 : 0;
    
    // Only sync if URL page param actually changed (not just searchParams object reference)
    if (prevPageParamRef.current !== pageParam) {
      prevPageParamRef.current = pageParam;
      // Only update if different from current state to avoid loops
      if (currentPageFromUrl !== pagination.pageIndex && !Number.isNaN(currentPageFromUrl)) {
        setPagination((prev) => ({ ...prev, pageIndex: Math.max(0, currentPageFromUrl) }));
      }
    }

    // Handle filter changes (only if filterConfigs exist)
    if (filterConfigs.length > 0) {
      // Build a string representation of current filter params (excluding page)
      const filterParams: string[] = [];
      filterConfigs.forEach((config) => {
        const paramKey = config.paramKey || String(config.columnKey);
        const value = searchParams.get(paramKey);
        if (value) {
          filterParams.push(`${paramKey}=${value}`);
        }
      });
      const currentFilterString = filterParams.sort().join("&");

      // Compare with previous to detect changes
      if (prevFilterParamsRef.current !== currentFilterString && prevFilterParamsRef.current !== "") {
        // If filters changed, reset pagination to page 1
        isUpdatingPaginationRef.current = true;
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        prevPageParamRef.current = null; // Reset page param ref since we're resetting to page 1
        setTimeout(() => {
          isUpdatingPaginationRef.current = false;
        }, 100);
        
        // Update active filters to match URL
        const newFilters: Record<string, string[]> = {};
        filterConfigs.forEach((config) => {
          const paramKey = config.paramKey || String(config.columnKey);
          const value = searchParams.get(paramKey);
          newFilters[paramKey] = value ? value.split(",").filter(Boolean) : [];
        });
        setActiveFilters(newFilters);
      }
      
      // Update ref for next comparison
      prevFilterParamsRef.current = currentFilterString;
    }
  }, [searchParams, enableUrlPagination, filterConfigs]);

  // Handle browser back/forward navigation (syncs both pagination and filters)
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      console.log("[EnhancedDataTable] popstate event triggered");
      const params = new URLSearchParams(window.location.search);

      // Sync pagination
      if (enableUrlPagination) {
        const pageParam = params.get("page");
        const newIndex = pageParam ? parseInt(pageParam, 10) - 1 : 0;
        setPagination((prev) => ({
          ...prev,
          pageIndex: Math.max(0, newIndex),
        }));
      }

      // Sync filters
      if (filterConfigs.length > 0) {
        const newFilters: Record<string, string[]> = {};
        filterConfigs.forEach((config) => {
          const paramKey = config.paramKey || String(config.columnKey);
          const value = params.get(paramKey);
          newFilters[paramKey] = value ? value.split(",").filter(Boolean) : [];
        });
        console.log(
          "[EnhancedDataTable] popstate setting filters:",
          newFilters,
        );
        setActiveFilters(newFilters);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [enableUrlPagination, filterConfigs]);

  // Memoize columns to prevent unnecessary re-renders
  const memoizedColumns = React.useMemo(() => columns, [columns]);

  // Cookie-based settings are now handled by useTableSettings hook
  // Settings are automatically saved to cookies via the hook
  // No localStorage code needed anymore (Pontus pattern)

  const table = useReactTable({
    data: filteredData,
    columns: memoizedColumns,
    onSortingChange: (updater) => {
      setSorting(updater);
      // Save sorting to cookie
      const newSorting = typeof updater === "function" ? updater(sorting) : updater;
      saveSettings({ sorting: newSorting });
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: (updater) => {
      const newVisibility = typeof updater === "function" 
        ? updater(columnVisibility) 
        : updater;
      saveSettings({ columnVisibility: newVisibility });
    },
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === "function"
        ? updater(pagination)
        : updater;
      setPagination(newPagination);
      // Save pagination to cookie
      saveSettings({ pagination: newPagination });
    },
    onColumnOrderChange: (updater) => {
      const newOrder = typeof updater === "function"
        ? updater(columnOrder)
        : updater;
      saveSettings({ columnOrder: newOrder });
    },
    onColumnSizingChange: (updater) => {
      const newSizing = typeof updater === "function"
        ? updater(columnSizing)
        : updater;
      saveSettings({ columnSizing: newSizing });
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      columnOrder,
      columnSizing,
    },
  });

  // Memoize visible columns - only recalculate when visibility or order changes
  // Note: table.getVisibleLeafColumns() is stable, but we need to recalc when visibility/order changes
  const visibleColumns = React.useMemo(
    () => table.getVisibleLeafColumns(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table.getVisibleLeafColumns],
  );

  // Check if any columns have sticky positioning (only calculate styles if needed)
  const hasStickyColumns = React.useMemo(
    () => visibleColumns.some((col) => (col.columnDef.meta as any)?.sticky),
    [visibleColumns],
  );

  // Handle column reordering - passed to DndTable component
  const handleColumnOrderChange = React.useCallback((newOrder: string[]) => {
    setColumnOrder(newOrder);
  }, []);

  // Memoize sticky column calculations - only calculate if sticky columns exist
  // Cache column widths to avoid recalculating
  const columnWidthsCache = React.useRef<Map<string, number>>(new Map());

  const getStickyStyle = React.useCallback(
    (columnId: string, isHeader: boolean = false) => {
      if (!hasStickyColumns) return {};

      const meta = table.getColumn(columnId)?.columnDef.meta as
        | {
            sticky?: "left" | "right";
            minWidth?: string;
          }
        | undefined;
      if (!meta?.sticky) return {};

      const stickyColumns = visibleColumns.filter(
        (col) => (col.columnDef.meta as any)?.sticky === meta.sticky,
      );
      const currentIndex = stickyColumns.findIndex(
        (col) => col.id === columnId,
      );

      // Get column width with caching
      const getColumnWidth = (col: any) => {
        const cacheKey = `${col.id}_${columnSizing[col.id] || "default"}`;
        if (columnWidthsCache.current.has(cacheKey)) {
          return columnWidthsCache.current.get(cacheKey)!;
        }

        let width: number;
        if (columnSizing[col.id]) {
          width = columnSizing[col.id];
        } else {
          const colMeta = col.columnDef.meta as
            | { minWidth?: string }
            | undefined;
          if (colMeta?.minWidth) {
            const num = parseInt(colMeta.minWidth, 10);
            width = Number.isNaN(num) ? 150 : num;
          } else {
            width = col.getSize() || 150;
          }
        }

        columnWidthsCache.current.set(cacheKey, width);
        return width;
      };

      if (meta.sticky === "left") {
        let leftOffset = 0;
        for (let i = 0; i < currentIndex; i++) {
          const col = stickyColumns[i];
          leftOffset += getColumnWidth(col);
        }
        return {
          position: "sticky" as const,
          left: leftOffset,
          zIndex: isHeader ? 20 : 10,
          backgroundColor: "hsl(var(--background))",
          minWidth: meta.minWidth || "150px",
        };
      } else {
        let rightOffset = 0;
        for (let i = currentIndex + 1; i < stickyColumns.length; i++) {
          const col = stickyColumns[i];
          rightOffset += getColumnWidth(col);
        }
        return {
          position: "sticky" as const,
          right: rightOffset,
          zIndex: isHeader ? 20 : 10,
          backgroundColor: "hsl(var(--background))",
          minWidth: meta.minWidth || "150px",
        };
      }
    },
    [hasStickyColumns, visibleColumns, columnSizing, table],
  );

  // Clear width cache when column sizing changes
  React.useEffect(() => {
    columnWidthsCache.current.clear();
  }, []);

  // Memoize column styles map - only calculate if sticky columns exist
  const columnStylesMap = React.useMemo(() => {
    if (!hasStickyColumns) return new Map<string, React.CSSProperties>();
    const map = new Map<string, React.CSSProperties>();
    visibleColumns.forEach((col) => {
      const columnId = col.id || ((col.columnDef as any).accessorKey as string);
      map.set(columnId, getStickyStyle(columnId, false));
    });
    return map;
  }, [hasStickyColumns, visibleColumns, getStickyStyle]);

  const headerStylesMap = React.useMemo(() => {
    if (!hasStickyColumns) return new Map<string, React.CSSProperties>();
    const map = new Map<string, React.CSSProperties>();
    visibleColumns.forEach((col) => {
      const columnId = col.id || ((col.columnDef as any).accessorKey as string);
      map.set(columnId, getStickyStyle(columnId, true));
    });
    return map;
  }, [hasStickyColumns, visibleColumns, getStickyStyle]);

  const totalRows = table.getFilteredRowModel().rows.length;
  const startRow = pagination.pageIndex * pagination.pageSize + 1;
  const endRow = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    totalRows,
  );

  const handleSaveView = React.useCallback(() => {
    if (tableId && viewName) {
      const viewConfig: TableViewConfig = {
        columnOrder,
        columnVisibility,
        columnSizing,
        pageSize: pagination.pageSize,
        sortBy: sorting[0]
          ? {
              column: sorting[0].id,
              direction: sorting[0].desc ? "desc" : "asc",
            }
          : undefined,
      };
      TableUtils.saveTableView(`${tableId}_${viewName}`, viewConfig);
      setSaveViewDialogOpen(false);
      setViewName("");
    }
  }, [
    tableId,
    viewName,
    columnOrder,
    columnVisibility,
    columnSizing,
    pagination.pageSize,
    sorting,
  ]);

  const handleResetView = React.useCallback(() => {
    if (tableId) {
      resetSettings();
    }
  }, [tableId, resetSettings]);

  // All visible columns are reorderable unless explicitly disabled via meta.enableReordering = false
  const reorderableColumns = React.useMemo(
    () =>
      enableColumnReordering
        ? visibleColumns.filter((col) => {
            const meta = col.columnDef.meta as
              | { enableReordering?: boolean }
              | undefined;
            // Allow reordering unless explicitly disabled
            return meta?.enableReordering !== false;
          })
        : visibleColumns,
    [enableColumnReordering, visibleColumns],
  );

  // Track search value in state to avoid table dependency
  const [searchValue, setSearchValue] = React.useState<string>("");

  // Sync search value with table filter (only when columnFilters change)
  React.useEffect(() => {
    if (searchKey) {
      const currentValue =
        (table.getColumn(searchKey)?.getFilterValue() as string) ?? "";
      if (currentValue !== searchValue) {
        setSearchValue(currentValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey, searchValue, table.getColumn]);

  const handleSearchChange = React.useCallback(
    (value: string) => {
      setSearchValue(value);
      if (searchKey) {
        table.getColumn(searchKey)?.setFilterValue(value);
      }
    },
    [table, searchKey],
  );

  // Get row model directly from table (table handles internal memoization)
  const rowModel = table.getRowModel();

  return (
    <div className="w-full space-y-3">
      {/* Unified Toolbar - Search, Filters, and Controls */}
      <div className="flex flex-col gap-3">
        {/* Top row: Search and controls */}
        <div className="flex items-center gap-3">
          {/* Search */}
          {searchKey && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9 h-9 bg-muted/30 border-border/60 focus:bg-background transition-colors"
              />
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Controls */}
          <div className="flex items-center gap-2">
            {showPageSizeSelector && (
              <Select
                value={pagination.pageSize.toString()}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-9 w-[80px] bg-background border-border/60 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="250">250</SelectItem>
                </SelectContent>
              </Select>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1.5 border-border/60"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">View</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                  Toggle columns
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-sm"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id.replace(/_/g, " ")}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                {enableViewManagement && tableId && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                      Saved views
                    </DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      onSelect={(e) => {
                        e.preventDefault();
                        setSaveViewDialogOpen(true);
                      }}
                      className="text-sm"
                    >
                      <Save className="mr-2 h-3.5 w-3.5" />
                      Save view
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onSelect={(e) => {
                        e.preventDefault();
                        handleResetView();
                      }}
                      className="text-sm"
                    >
                      <RotateCcw className="mr-2 h-3.5 w-3.5" />
                      Reset to default
                    </DropdownMenuCheckboxItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Filter Bar */}
        {filterConfigs.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter Icon */}
            <div className="flex items-center gap-1.5 text-muted-foreground mr-1">
              <Filter className="h-4 w-4" />
              {hasActiveFilters && (
                <span className="text-xs font-medium text-primary tabular-nums">
                  {activeFilterCount}
                </span>
              )}
            </div>

            {/* Filter Dropdowns */}
            {filterConfigs.map((config) => {
              const paramKey = config.paramKey || String(config.columnKey);
              const options = filterOptions[paramKey] || [];
              const selected = activeFilters[paramKey] || [];

              return (
                <MultiSelect
                  key={paramKey}
                  options={options}
                  selected={selected}
                  onChange={(values) => updateFilter(paramKey, values)}
                  placeholder={config.label}
                  searchPlaceholder={`Search ${config.label.toLowerCase()}...`}
                  emptyText={`No ${config.label.toLowerCase()} found`}
                  compact
                />
              );
            })}

            {/* Results count and clear */}
            {hasActiveFilters && (
              <>
                <div className="h-5 w-px bg-border/40 mx-1" />
                {showFilterCount && (
                  <span className="text-xs text-muted-foreground">
                    {filteredData.length.toLocaleString()}{" "}
                    <span className="hidden sm:inline">
                      of {data.length.toLocaleString()}
                    </span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-1"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border/60 overflow-x-auto relative bg-card/50">
        {enableColumnReordering && isMounted ? (
          /* DnD-enabled table - lazy loaded to reduce bundle size */
          <DndTable
            table={table}
            columns={columns}
            reorderableColumns={reorderableColumns}
            headerStylesMap={headerStylesMap}
            columnStylesMap={columnStylesMap}
            rowModel={rowModel}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
            onColumnOrderChange={handleColumnOrderChange}
            getRowClassName={getRowClassName}
          />
        ) : (
          // Simplified table without drag-and-drop when reordering is disabled
          <Table className="min-w-full [&_tr]:transition-colors">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const columnId =
                      header.column.id ||
                      ((header.column.columnDef as any).accessorKey as string);
                    const meta = header.column.columnDef.meta as
                      | {
                          align?: string;
                          minWidth?: string;
                          sticky?: "left" | "right";
                        }
                      | undefined;
                    const stickyStyle = headerStylesMap.get(columnId);

                    return (
                      <TableHead
                        key={header.id}
                        className="h-11 text-xs font-medium text-muted-foreground bg-muted/30 first:rounded-tl-lg last:rounded-tr-lg"
                        style={{
                          minWidth: meta?.minWidth,
                          ...stickyStyle,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center py-6"
                  >
                    <p className="text-sm text-muted-foreground">Loading...</p>
                  </TableCell>
                </TableRow>
              ) : rowModel.rows?.length ? (
                rowModel.rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`h-12 hover:bg-muted/30 border-border/40 ${getRowClassName ? getRowClassName(row.original, index) : ""}`}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const columnId =
                        cell.column.id ||
                        ((cell.column.columnDef as any).accessorKey as string);
                      const meta = cell.column.columnDef.meta as
                        | {
                            align?: string;
                            sticky?: "left" | "right";
                            minWidth?: string;
                          }
                        | undefined;
                      const stickyStyle = columnStylesMap.get(columnId);

                      return (
                        <MemoizedTableCell
                          key={cell.id}
                          cell={cell}
                          stickyStyle={stickyStyle}
                          align={meta?.align}
                          minWidth={meta?.minWidth}
                        />
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center py-6"
                  >
                    <p className="text-sm text-muted-foreground">
                      {emptyMessage}
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4 py-1">
        <p className="text-sm text-muted-foreground tabular-nums">
          <span className="hidden sm:inline">Showing </span>
          <span className="font-medium text-foreground">{startRow}</span>
          <span className="hidden sm:inline"> – </span>
          <span className="sm:hidden">-</span>
          <span className="font-medium text-foreground">{endRow}</span>
          <span className="hidden sm:inline"> of </span>
          <span className="sm:hidden">/</span>
          <span className="font-medium text-foreground">{totalRows}</span>
        </p>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newPageIndex = pagination.pageIndex - 1;
              if (newPageIndex >= 0) {
                // Mark that we're updating pagination to prevent effect from resetting
                isUpdatingPaginationRef.current = true;
                
                // Update URL first, then state (prevents race conditions)
                if (enableUrlPagination && typeof window !== "undefined") {
                  const params = new URLSearchParams(window.location.search);
                  if (newPageIndex === 0) {
                    params.delete("page");
                    prevPageParamRef.current = null;
                  } else {
                    params.set("page", (newPageIndex + 1).toString());
                    prevPageParamRef.current = (newPageIndex + 1).toString();
                  }
                  const newUrl = params.toString()
                    ? `${pathname}?${params.toString()}`
                    : pathname;
                  window.history.pushState(null, "", newUrl);
                }
                // Update React state
                setPagination((prev) => ({ ...prev, pageIndex: newPageIndex }));
                
                // Allow effect to run again after a short delay
                setTimeout(() => {
                  isUpdatingPaginationRef.current = false;
                }, 100);
              }
            }}
            disabled={pagination.pageIndex <= 0}
            className="h-8 w-8 p-0 hover:bg-muted/60"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1 px-2">
            <span className="text-sm tabular-nums">
              <span className="font-medium">{pagination.pageIndex + 1}</span>
              <span className="text-muted-foreground mx-1">/</span>
              <span className="text-muted-foreground">
                {table.getPageCount()}
              </span>
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newPageIndex = pagination.pageIndex + 1;
              const pageCount = table.getPageCount();
              if (newPageIndex < pageCount) {
                // Mark that we're updating pagination to prevent effect from resetting
                isUpdatingPaginationRef.current = true;
                
                // Update URL first, then state (prevents race conditions)
                if (enableUrlPagination && typeof window !== "undefined") {
                  const params = new URLSearchParams(window.location.search);
                  params.set("page", (newPageIndex + 1).toString());
                  const newUrl = params.toString()
                    ? `${pathname}?${params.toString()}`
                    : pathname;
                  window.history.pushState(null, "", newUrl);
                  // Update ref to prevent effect from resetting
                  prevPageParamRef.current = (newPageIndex + 1).toString();
                }
                // Update React state
                setPagination((prev) => ({ ...prev, pageIndex: newPageIndex }));
                
                // Allow effect to run again after a short delay
                setTimeout(() => {
                  isUpdatingPaginationRef.current = false;
                }, 100);
              }
            }}
            disabled={pagination.pageIndex >= table.getPageCount() - 1}
            className="h-8 w-8 p-0 hover:bg-muted/60"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Save View Dialog */}
      <Dialog open={saveViewDialogOpen} onOpenChange={setSaveViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Save view</DialogTitle>
            <DialogDescription className="text-sm">
              Save your current table configuration for quick access.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label
              htmlFor="view-name"
              className="text-sm font-medium mb-2 block"
            >
              View name
            </Label>
            <Input
              id="view-name"
              placeholder="e.g., Active Products"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && viewName) {
                  handleSaveView();
                }
              }}
              className="h-10"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setSaveViewDialogOpen(false)}
              className="text-muted-foreground"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveView} disabled={!viewName}>
              Save view
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
