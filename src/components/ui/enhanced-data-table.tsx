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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  tableId?: string;
  enableColumnReordering?: boolean;
  enableViewManagement?: boolean;
  /** Enable URL-based pagination persistence (page number in URL params) */
  enableUrlPagination?: boolean;
  /** Filter configurations - enables URL-persisted multi-select filters */
  filterConfigs?: FilterConfig<TData>[];
  /** Show filter count badge */
  showFilterCount?: boolean;
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
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

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
}: EnhancedDataTableProps<TData, TValue>) {
  // URL-based pagination hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPendingFilter, startFilterTransition] = React.useTransition();

  // Parse filters from URL
  const activeFilters = React.useMemo(() => {
    const filters: Record<string, string[]> = {};
    filterConfigs.forEach((config) => {
      const paramKey = config.paramKey || String(config.columnKey);
      const value = searchParams.get(paramKey);
      filters[paramKey] = value ? value.split(",").filter(Boolean) : [];
    });
    return filters;
  }, [searchParams, filterConfigs]);

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

  // Update URL with new filter values
  const updateFilter = React.useCallback(
    (paramKey: string, values: string[]) => {
      startFilterTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (values.length > 0) {
          params.set(paramKey, values.join(","));
        } else {
          params.delete(paramKey);
        }
        // Reset to page 1 when filters change
        params.delete("page");
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;
        router.replace(newUrl, { scroll: false });
      });
    },
    [searchParams, pathname, router],
  );

  // Clear all filters
  const clearAllFilters = React.useCallback(() => {
    startFilterTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      filterConfigs.forEach((config) => {
        const paramKey = config.paramKey || String(config.columnKey);
        params.delete(paramKey);
      });
      params.delete("page");
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newUrl, { scroll: false });
    });
  }, [searchParams, pathname, router, filterConfigs]);

  // Filter data based on active filters
  const filteredData = React.useMemo(() => {
    if (filterConfigs.length === 0) return data;

    return data.filter((row) => {
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

  // Get initial page from URL if URL pagination is enabled
  const getInitialPageIndex = React.useCallback(() => {
    if (enableUrlPagination) {
      const pageParam = searchParams.get("page");
      if (pageParam) {
        const parsed = parseInt(pageParam, 10);
        if (!Number.isNaN(parsed) && parsed >= 1) {
          return parsed - 1; // URL is 1-indexed, state is 0-indexed
        }
      }
    }
    return 0;
  }, [enableUrlPagination, searchParams]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(() =>
    columns.map(
      (col) => (col.id as string) || ((col as any).accessorKey as string),
    ),
  );
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: getInitialPageIndex(),
    pageSize,
  });
  const [saveViewDialogOpen, setSaveViewDialogOpen] = React.useState(false);
  const [viewName, setViewName] = React.useState("");
  const [isMounted, setIsMounted] = React.useState(false);

  // Ensure drag-and-drop only renders on client to avoid hydration mismatch
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync URL with pagination state when URL pagination is enabled
  const hasInitializedFromUrl = React.useRef(false);
  React.useEffect(() => {
    if (!enableUrlPagination || !isMounted) return;

    // On initial mount, sync from URL to state
    if (!hasInitializedFromUrl.current) {
      hasInitializedFromUrl.current = true;
      const initialPage = getInitialPageIndex();
      if (initialPage !== pagination.pageIndex) {
        setPagination((prev) => ({ ...prev, pageIndex: initialPage }));
      }
      return;
    }

    // After initialization, sync from state to URL
    const currentPageParam = searchParams.get("page");
    const currentUrlPage = currentPageParam
      ? parseInt(currentPageParam, 10)
      : 1;
    const newPage = pagination.pageIndex + 1; // Convert to 1-indexed

    if (currentUrlPage !== newPage) {
      const params = new URLSearchParams(searchParams.toString());
      if (newPage === 1) {
        params.delete("page"); // Don't show page=1 in URL
      } else {
        params.set("page", newPage.toString());
      }
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [
    enableUrlPagination,
    isMounted,
    pagination.pageIndex,
    searchParams,
    pathname,
    router,
    getInitialPageIndex,
  ]);

  // Memoize columns to prevent unnecessary re-renders
  const memoizedColumns = React.useMemo(() => columns, [columns]);

  // Load saved view on mount (only once)
  const hasLoadedView = React.useRef(false);
  React.useEffect(() => {
    if (tableId && enableViewManagement && !hasLoadedView.current) {
      hasLoadedView.current = true;
      const savedView = TableUtils.loadTableView(tableId);
      if (savedView) {
        setColumnOrder(savedView.columnOrder);
        setColumnVisibility(savedView.columnVisibility);
        setColumnSizing(savedView.columnSizing);
        setPagination((prev) => ({ ...prev, pageSize: savedView.pageSize }));
        if (savedView.sortBy) {
          setSorting([
            {
              id: savedView.sortBy.column,
              desc: savedView.sortBy.direction === "desc",
            },
          ]);
        }
      }
    }
  }, [tableId, enableViewManagement]);

  // Debounce view saves to reduce localStorage writes (only save when actually changed)
  const prevViewConfigRef = React.useRef<string>("");
  // Increase debounce delay to reduce writes
  const debouncedColumnOrder = useDebounce(columnOrder, 2000);
  const debouncedColumnVisibility = useDebounce(columnVisibility, 2000);
  const debouncedColumnSizing = useDebounce(columnSizing, 2000);
  const debouncedPageSize = useDebounce(pagination.pageSize, 2000);
  const debouncedSorting = useDebounce(sorting, 2000);

  // Save view when changes occur (debounced and only if changed)
  React.useEffect(() => {
    if (tableId && enableViewManagement && hasLoadedView.current) {
      const viewConfig: TableViewConfig = {
        columnOrder: debouncedColumnOrder,
        columnVisibility: debouncedColumnVisibility,
        columnSizing: debouncedColumnSizing,
        pageSize: debouncedPageSize,
        sortBy: debouncedSorting[0]
          ? {
              column: debouncedSorting[0].id,
              direction: debouncedSorting[0].desc ? "desc" : "asc",
            }
          : undefined,
      };
      const configString = JSON.stringify(viewConfig);
      if (configString !== prevViewConfigRef.current) {
        prevViewConfigRef.current = configString;
        TableUtils.saveTableView(tableId, viewConfig);
      }
    }
  }, [
    tableId,
    enableViewManagement,
    debouncedColumnOrder,
    debouncedColumnVisibility,
    debouncedColumnSizing,
    debouncedPageSize,
    debouncedSorting,
  ]);

  const table = useReactTable({
    data: filteredData,
    columns: memoizedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
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
      TableUtils.deleteTableView(tableId);
      setColumnOrder(
        columns.map(
          (col) => (col.id as string) || ((col as any).accessorKey as string),
        ),
      );
      setColumnVisibility({});
      setColumnSizing({});
      setPagination((prev) => ({ ...prev, pageSize: 25 }));
      setSorting([]);
    }
  }, [tableId, columns]);

  const reorderableColumns = React.useMemo(
    () =>
      enableColumnReordering
        ? visibleColumns.filter((col) => col.getCanHide())
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

  // Get row model - TanStack Table memoizes this internally, but we'll cache it
  // Only recalculate when pagination, sorting, or filters change
  const rowModel = React.useMemo(
    () => table.getRowModel(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table.getRowModel],
  );

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
                  disabled={isPendingFilter}
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
                rowModel.rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="h-12 hover:bg-muted/30 border-border/40"
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
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
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
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
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
