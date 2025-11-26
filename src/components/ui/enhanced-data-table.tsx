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

import * as React from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnSizingState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Save,
  X,
} from "lucide-react";

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
  }
);

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TableUtils, type TableViewConfig } from "@/lib/utils/table-utils";

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
}

/**
 * Memoized table cell component
 */
const MemoizedTableCell = React.memo(function MemoizedTableCell({
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
}, (prevProps, nextProps) => {
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
});

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
}: EnhancedDataTableProps<TData, TValue>) {
  // URL-based pagination hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get initial page from URL if URL pagination is enabled
  const getInitialPageIndex = React.useCallback(() => {
    if (enableUrlPagination) {
      const pageParam = searchParams.get("page");
      if (pageParam) {
        const parsed = parseInt(pageParam, 10);
        if (!isNaN(parsed) && parsed >= 1) {
          return parsed - 1; // URL is 1-indexed, state is 0-indexed
        }
      }
    }
    return 0;
  }, [enableUrlPagination, searchParams]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(() =>
    columns.map((col) => (col.id as string) || ((col as any).accessorKey as string))
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
        setPagination(prev => ({ ...prev, pageIndex: initialPage }));
      }
      return;
    }
    
    // After initialization, sync from state to URL
    const currentPageParam = searchParams.get("page");
    const currentUrlPage = currentPageParam ? parseInt(currentPageParam, 10) : 1;
    const newPage = pagination.pageIndex + 1; // Convert to 1-indexed
    
    if (currentUrlPage !== newPage) {
      const params = new URLSearchParams(searchParams.toString());
      if (newPage === 1) {
        params.delete("page"); // Don't show page=1 in URL
      } else {
        params.set("page", newPage.toString());
      }
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [enableUrlPagination, isMounted, pagination.pageIndex, searchParams, pathname, router, getInitialPageIndex]);

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
          setSorting([{
            id: savedView.sortBy.column,
            desc: savedView.sortBy.direction === "desc",
          }]);
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
        sortBy: debouncedSorting[0] ? {
          column: debouncedSorting[0].id,
          direction: debouncedSorting[0].desc ? "desc" : "asc",
        } : undefined,
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
    data,
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
    [columnVisibility, columnOrder]
  );

  // Check if any columns have sticky positioning (only calculate styles if needed)
  const hasStickyColumns = React.useMemo(
    () => visibleColumns.some((col) => (col.columnDef.meta as any)?.sticky),
    [visibleColumns]
  );

  // Handle column reordering - passed to DndTable component
  const handleColumnOrderChange = React.useCallback(
    (newOrder: string[]) => {
      setColumnOrder(newOrder);
    },
    []
  );

  // Memoize sticky column calculations - only calculate if sticky columns exist
  // Cache column widths to avoid recalculating
  const columnWidthsCache = React.useRef<Map<string, number>>(new Map());
  
  const getStickyStyle = React.useCallback(
    (columnId: string, isHeader: boolean = false) => {
      if (!hasStickyColumns) return {};
      
      const meta = table.getColumn(columnId)?.columnDef.meta as {
        sticky?: "left" | "right";
        minWidth?: string;
      } | undefined;
      if (!meta?.sticky) return {};

      const stickyColumns = visibleColumns.filter(
        (col) => (col.columnDef.meta as any)?.sticky === meta.sticky
      );
      const currentIndex = stickyColumns.findIndex((col) => col.id === columnId);

      // Get column width with caching
      const getColumnWidth = (col: any) => {
        const cacheKey = `${col.id}_${columnSizing[col.id] || 'default'}`;
        if (columnWidthsCache.current.has(cacheKey)) {
          return columnWidthsCache.current.get(cacheKey)!;
        }
        
        let width: number;
        if (columnSizing[col.id]) {
          width = columnSizing[col.id];
        } else {
          const colMeta = col.columnDef.meta as { minWidth?: string } | undefined;
          if (colMeta?.minWidth) {
            const num = parseInt(colMeta.minWidth);
            width = isNaN(num) ? 150 : num;
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
    [hasStickyColumns, visibleColumns, columnSizing, table]
  );
  
  // Clear width cache when column sizing changes
  React.useEffect(() => {
    columnWidthsCache.current.clear();
  }, [columnSizing]);

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
    totalRows
  );

  const handleSaveView = React.useCallback(() => {
    if (tableId && viewName) {
      const viewConfig: TableViewConfig = {
        columnOrder,
        columnVisibility,
        columnSizing,
        pageSize: pagination.pageSize,
        sortBy: sorting[0] ? {
          column: sorting[0].id,
          direction: sorting[0].desc ? "desc" : "asc",
        } : undefined,
      };
      TableUtils.saveTableView(`${tableId}_${viewName}`, viewConfig);
      setSaveViewDialogOpen(false);
      setViewName("");
    }
  }, [tableId, viewName, columnOrder, columnVisibility, columnSizing, pagination.pageSize, sorting]);

  const handleResetView = React.useCallback(() => {
    if (tableId) {
      TableUtils.deleteTableView(tableId);
      setColumnOrder(columns.map((col) => (col.id as string) || ((col as any).accessorKey as string)));
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
    [enableColumnReordering, visibleColumns]
  );

  // Track search value in state to avoid table dependency
  const [searchValue, setSearchValue] = React.useState<string>("");
  
  // Sync search value with table filter (only when columnFilters change)
  React.useEffect(() => {
    if (searchKey) {
      const currentValue = (table.getColumn(searchKey)?.getFilterValue() as string) ?? "";
      if (currentValue !== searchValue) {
        setSearchValue(currentValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters, searchKey]);

  const handleSearchChange = React.useCallback(
    (value: string) => {
      setSearchValue(value);
      if (searchKey) {
        table.getColumn(searchKey)?.setFilterValue(value);
      }
    },
    [table, searchKey]
  );

  // Get row model - TanStack Table memoizes this internally, but we'll cache it
  // Only recalculate when pagination, sorting, or filters change
  const rowModel = React.useMemo(
    () => table.getRowModel(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagination.pageIndex, pagination.pageSize, sorting, columnFilters]
  );

  return (
    <div className="w-full space-y-4">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {searchKey && (
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full sm:max-w-sm"
          />
        )}
        <div className="flex items-center gap-2 flex-wrap">
          {showPageSizeSelector && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page:</span>
              <Select
                value={pagination.pageSize.toString()}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
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
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              {enableViewManagement && tableId && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Views</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setSaveViewDialogOpen(true);
                    }}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Current View
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onSelect={(e) => {
                      e.preventDefault();
                      handleResetView();
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reset to Default
                  </DropdownMenuCheckboxItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto relative">
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
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const columnId = header.column.id || ((header.column.columnDef as any).accessorKey as string);
                    const meta = header.column.columnDef.meta as {
                      align?: string;
                      minWidth?: string;
                      sticky?: "left" | "right";
                    } | undefined;
                    const stickyStyle = headerStylesMap.get(columnId);

                    return (
                      <TableHead
                        key={header.id}
                        className="h-10"
                        style={{
                          minWidth: meta?.minWidth,
                          ...stickyStyle,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center py-6">
                    <p className="text-sm text-muted-foreground">Loading...</p>
                  </TableCell>
                </TableRow>
              ) : rowModel.rows?.length ? (
                rowModel.rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="h-12"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const columnId = cell.column.id || ((cell.column.columnDef as any).accessorKey as string);
                      const meta = cell.column.columnDef.meta as {
                        align?: string;
                        sticky?: "left" | "right";
                        minWidth?: string;
                      } | undefined;
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
                  <TableCell colSpan={columns.length} className="h-24 text-center py-6">
                    <p className="text-sm text-muted-foreground">{emptyMessage}</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t">
        <div className="text-sm text-muted-foreground">
          Showing {startRow} to {endRow} of {totalRows} row{totalRows !== 1 ? "s" : ""}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="h-8"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8"
          >
            Previous
          </Button>
          <div className="flex items-center gap-1.5">
            <span className="text-sm whitespace-nowrap">Page</span>
            <Input
              type="number"
              min="1"
              max={table.getPageCount()}
              value={pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="h-8 w-16 text-center"
            />
            <span className="text-sm whitespace-nowrap">of {table.getPageCount()}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8"
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="h-8"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Save View Dialog */}
      <Dialog open={saveViewDialogOpen} onOpenChange={setSaveViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Table View</DialogTitle>
            <DialogDescription>
              Save the current column order, visibility, and settings as a named view.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="View name (e.g., 'My Custom View')"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && viewName) {
                  handleSaveView();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveViewDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveView} disabled={!viewName}>
              Save View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
