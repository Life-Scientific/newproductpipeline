/**
 * Table Utilities and Helpers
 *
 * This file provides reusable utilities for creating consistent tables across the application.
 * Use these helpers to ensure consistent formatting, styling, and behavior.
 */

import { type ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getStatusVariant } from "@/lib/design-system";
import { warn } from "@/lib/logger";

// ============================================================================
// Type Definitions
// ============================================================================

export interface TableColumnConfig<T> {
  key: keyof T | string;
  header: string;
  cell?: (value: any, row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
  minWidth?: string;
  sortable?: boolean;
  searchable?: boolean;
  sticky?: "left" | "right";
}

export interface TableViewConfig {
  columnOrder: string[];
  columnVisibility: Record<string, boolean>;
  columnSizing: Record<string, number>;
  pageSize: number;
  sortBy?: { column: string; direction: "asc" | "desc" };
}

// ============================================================================
// Common Cell Renderers
// ============================================================================

/**
 * Renders a CAS number with monospace font
 */
export function renderCASNumber(
  cas: string | null | undefined,
): React.ReactNode {
  if (!cas) return <span className="text-sm text-muted-foreground">—</span>;
  return <span className="font-mono text-sm text-muted-foreground">{cas}</span>;
}

/**
 * Renders a currency value with proper formatting
 */
export function renderCurrency(
  value: number | null | undefined,
  currency: string = "€",
  showDecimals: boolean = true,
): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  const formatted = showDecimals
    ? value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : value.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <span className="text-sm font-medium">
      {currency}
      {formatted}
    </span>
  );
}

/**
 * Renders a number with proper formatting
 */
export function renderNumber(
  value: number | null | undefined,
  decimals: number = 2,
): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  return (
    <span className="text-sm font-medium">
      {value.toLocaleString(undefined, { maximumFractionDigits: decimals })}
    </span>
  );
}

/**
 * Renders a percentage with badge styling based on value ranges
 */
export function renderPercentage(
  value: number | null | undefined,
  ranges?: { high: number; medium: number; low: number },
): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  const defaultRanges = ranges || { high: 40, medium: 20, low: 0 };

  const variant =
    value >= defaultRanges.high
      ? "default"
      : value >= defaultRanges.medium
        ? "secondary"
        : value >= defaultRanges.low
          ? "outline"
          : "destructive";

  return (
    <Badge variant={variant} className="text-xs">
      {value.toFixed(1)}%
    </Badge>
  );
}

/**
 * Renders a status badge with appropriate variant
 */
export function renderStatusBadge(
  status: string | null | undefined,
  type:
    | "formulation"
    | "registration"
    | "country"
    | "priority"
    | "margin" = "formulation",
): React.ReactNode {
  if (!status) return <span className="text-sm text-muted-foreground">—</span>;

  return (
    <Badge variant={getStatusVariant(status, type)} className="text-xs">
      {status}
    </Badge>
  );
}

/**
 * Renders a boolean as Yes/No badge
 */
export function renderBoolean(
  value: boolean | null | undefined,
  trueLabel: string = "Yes",
  falseLabel: string = "No",
): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  return value ? (
    <Badge variant="default" className="text-xs">
      {trueLabel}
    </Badge>
  ) : (
    <Badge variant="outline" className="text-xs">
      {falseLabel}
    </Badge>
  );
}

/**
 * Renders a date with formatting
 */
export function renderDate(
  date: string | Date | null | undefined,
  format: "short" | "long" | "relative" = "short",
): React.ReactNode {
  if (!date) return <span className="text-sm text-muted-foreground">—</span>;

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (format === "short") {
    return <span className="text-sm">{dateObj.toLocaleDateString()}</span>;
  } else if (format === "long") {
    return (
      <span className="text-sm">
        {dateObj.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    );
  } else {
    // Relative time using date-fns (e.g., "2 days ago")
    return (
      <span
        className="text-sm text-muted-foreground"
        title={dateObj.toLocaleDateString()}
      >
        {formatDistanceToNow(dateObj, { addSuffix: true })}
      </span>
    );
  }
}

/**
 * Renders a link cell
 */
export function renderLink(
  href: string,
  label: string,
  external?: boolean,
): React.ReactNode {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-primary hover:underline"
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-sm font-medium text-primary hover:underline"
    >
      {label}
    </Link>
  );
}

/**
 * Renders supply risk badge
 */
const supplyRiskColors: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  Low: "default",
  Medium: "secondary",
  High: "outline",
  Critical: "destructive",
};

export function renderSupplyRisk(
  risk: string | null | undefined,
): React.ReactNode {
  if (!risk) return <span className="text-sm text-muted-foreground">—</span>;

  return (
    <Badge variant={supplyRiskColors[risk] || "outline"} className="text-xs">
      {risk}
    </Badge>
  );
}

// ============================================================================
// Column Builder Utilities
// ============================================================================

/**
 * Creates a standard text column
 */
export function createTextColumn<T>(
  accessor: keyof T | ((row: T) => any),
  header: string,
  options?: {
    minWidth?: string;
    className?: string;
    render?: (value: any, row: T) => React.ReactNode;
    sticky?: "left" | "right";
  },
): ColumnDef<T> {
  return {
    accessorKey: typeof accessor === "string" ? accessor : undefined,
    accessorFn: typeof accessor === "function" ? accessor : undefined,
    header,
    cell: ({ row, getValue }) => {
      const value = getValue();
      if (options?.render) {
        return options.render(value, row.original);
      }
      return (
        <span className={`text-sm ${options?.className || ""}`}>
          {value != null ? String(value) : "—"}
        </span>
      );
    },
    meta: {
      minWidth: options?.minWidth,
      sticky: options?.sticky,
    },
  };
}

/**
 * Creates a standard number column with right alignment
 */
export function createNumberColumn<T>(
  accessor: keyof T | ((row: T) => any),
  header: string,
  options?: {
    decimals?: number;
    minWidth?: string;
    formatCurrency?: boolean;
    currency?: string;
    sticky?: "left" | "right";
  },
): ColumnDef<T> {
  return {
    accessorKey: typeof accessor === "string" ? accessor : undefined,
    accessorFn: typeof accessor === "function" ? accessor : undefined,
    header,
    cell: ({ getValue }) => {
      const value = getValue() as number | null | undefined;
      if (options?.formatCurrency) {
        return (
          <div className="text-right">
            {renderCurrency(value, options?.currency)}
          </div>
        );
      }
      return (
        <div className="text-right">
          {renderNumber(value, options?.decimals)}
        </div>
      );
    },
    meta: {
      minWidth: options?.minWidth,
      align: "right",
      sticky: options?.sticky,
    },
  };
}

/**
 * Creates a standard badge column
 */
export function createBadgeColumn<T>(
  accessor: keyof T | ((row: T) => any),
  header: string,
  options?: {
    variant?: (
      value: any,
    ) => "default" | "secondary" | "outline" | "destructive";
    minWidth?: string;
    sticky?: "left" | "right";
  },
): ColumnDef<T> {
  return {
    accessorKey: typeof accessor === "string" ? accessor : undefined,
    accessorFn: typeof accessor === "function" ? accessor : undefined,
    header,
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value)
        return <span className="text-sm text-muted-foreground">—</span>;

      const variant = options?.variant ? options.variant(value) : "outline";
      return (
        <Badge variant={variant} className="text-xs">
          {String(value)}
        </Badge>
      );
    },
    meta: {
      minWidth: options?.minWidth,
      sticky: options?.sticky,
    },
  };
}

/**
 * Creates a standard date column
 */
export function createDateColumn<T>(
  accessor: keyof T | ((row: T) => any),
  header: string,
  options?: {
    format?: "short" | "long" | "relative";
    minWidth?: string;
    sticky?: "left" | "right";
  },
): ColumnDef<T> {
  return {
    accessorKey: typeof accessor === "string" ? accessor : undefined,
    accessorFn: typeof accessor === "function" ? accessor : undefined,
    header,
    cell: ({ getValue }) =>
      renderDate(getValue() as string | Date | null, options?.format),
    meta: {
      minWidth: options?.minWidth,
      sticky: options?.sticky,
    },
  };
}

// ============================================================================
// Table Configuration Helpers
// ============================================================================

/**
 * Standard table configuration
 */
export interface TableConfig<T> {
  searchKey?: keyof T | string;
  searchPlaceholder?: string;
  pageSize?: number;
  showPageSizeSelector?: boolean;
  defaultSort?: { column: keyof T; direction: "asc" | "desc" };
}

/**
 * Creates a standard table configuration
 */
export function createTableConfig<T>(config: TableConfig<T>): TableConfig<T> {
  return {
    searchPlaceholder: "Search...",
    pageSize: 25,
    showPageSizeSelector: true,
    ...config,
  };
}

// ============================================================================
// View Management Utilities
// ============================================================================

/**
 * Save a table view configuration to localStorage
 */
export function saveTableView(tableId: string, config: TableViewConfig): void {
  if (typeof window === "undefined") return;

  try {
    const key = `table_view_${tableId}`;
    localStorage.setItem(key, JSON.stringify(config));
  } catch (error) {
    warn("Failed to save table view:", error);
  }
}

/**
 * Load a table view configuration from localStorage
 */
export function loadTableView(tableId: string): TableViewConfig | null {
  if (typeof window === "undefined") return null;

  try {
    const key = `table_view_${tableId}`;
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    return JSON.parse(stored) as TableViewConfig;
  } catch (error) {
    warn("Failed to load table view:", error);
    return null;
  }
}

/**
 * Delete a saved table view
 */
export function deleteTableView(tableId: string): void {
  if (typeof window === "undefined") return;

  try {
    const key = `table_view_${tableId}`;
    localStorage.removeItem(key);
  } catch (error) {
    warn("Failed to delete table view:", error);
  }
}

/**
 * List all saved table views
 */
export function listTableViews(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const views: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("table_view_")) {
        views.push(key.replace("table_view_", ""));
      }
    }
    return views;
  } catch (error) {
    warn("Failed to list table views:", error);
    return [];
  }
}

// ============================================================================
// Export all utilities
// ============================================================================

export const TableUtils = {
  // Cell renderers
  renderCASNumber,
  renderCurrency,
  renderNumber,
  renderPercentage,
  renderStatusBadge,
  renderBoolean,
  renderDate,
  renderLink,
  renderSupplyRisk,

  // Column builders
  createTextColumn,
  createNumberColumn,
  createBadgeColumn,
  createDateColumn,

  // Configuration
  createTableConfig,

  // View management
  saveTableView,
  loadTableView,
  deleteTableView,
  listTableViews,
};
