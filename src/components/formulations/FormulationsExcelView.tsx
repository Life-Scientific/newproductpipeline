"use client";

import {
  useState,
  useTransition,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Save,
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Search,
  ChevronDown,
  GripVertical,
  RotateCcw,
} from "lucide-react";
import type { Database } from "@/lib/supabase/database.types";
import type { FormulationWithNestedData } from "@/lib/db/queries";
import { usePermissions } from "@/hooks/use-permissions";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";

type FormulationTable = Database["public"]["Tables"]["formulations"]["Row"];

interface FormulationsExcelViewProps {
  formulations: FormulationWithNestedData[];
}

const STATUS_OPTIONS = [
  "Not Yet Considered",
  "Selected",
  "Monitoring",
  "Killed",
];
const PRODUCT_CATEGORIES = [
  "Herbicide",
  "Fungicide",
  "Insecticide",
  "Growth Regulator",
  "Adjuvant",
  "Seed Treatment",
];

const statusColors: Record<string, string> = {
  "Not Yet Considered": "secondary",
  Selected: "default",
  Monitoring: "outline",
  Killed: "destructive",
};

// Column definition type
interface ColumnDef {
  id: string;
  header: string;
  accessor: (row: FormulationWithNestedData) => any;
  editable?: boolean;
  editType?: "text" | "select" | "textarea" | "switch";
  editOptions?: string[];
  minWidth: number;
  render?: (value: any, row: FormulationWithNestedData) => React.ReactNode;
}

// All available columns
const ALL_COLUMNS: ColumnDef[] = [
  {
    id: "formulation_code",
    header: "Code",
    accessor: (row) => row.formulation_code,
    minWidth: 140,
    render: (value, row) => (
      <Link
        href={`/portfolio/formulations/${row.formulation_id}`}
        className="text-primary hover:underline font-medium"
      >
        {value || "—"}
      </Link>
    ),
  },
  {
    id: "base_code",
    header: "Base Code",
    accessor: (row) => row.formulation_code?.split("-")[0],
    minWidth: 120,
  },
  {
    id: "variant",
    header: "Variant",
    accessor: (row) => row.formulation_code?.split("-")[1],
    minWidth: 120,
  },
  {
    id: "formulation_name",
    header: "Product Name",
    accessor: (row) => (row as any).formulation_name || row.product_name,
    editable: true,
    editType: "text",
    minWidth: 220,
    render: (value, row) => (
      <Link
        href={`/portfolio/formulations/${row.formulation_id}`}
        className="text-primary hover:underline"
      >
        {value || "—"}
      </Link>
    ),
  },
  {
    id: "short_name",
    header: "Short Name",
    accessor: (row) => row.short_name,
    editable: true,
    editType: "text",
    minWidth: 170,
  },
  {
    id: "formulation_category",
    header: "Category",
    accessor: (row) =>
      (row as any).formulation_category || row.product_category,
    editable: true,
    editType: "select",
    editOptions: PRODUCT_CATEGORIES,
    minWidth: 140,
  },
  {
    id: "formulation_type",
    header: "Type",
    accessor: (row) => row.formulation_type,
    editable: true,
    editType: "text",
    minWidth: 170,
  },
  {
    id: "uom",
    header: "UOM",
    accessor: (row) => row.uom,
    editable: true,
    editType: "text",
    minWidth: 100,
  },
  {
    id: "formulation_status",
    header: "Status",
    accessor: (row) => (row as any).formulation_status || row.status,
    editable: true,
    editType: "select",
    editOptions: STATUS_OPTIONS,
    minWidth: 170,
    render: (value) => (
      <Badge
        variant={
          (statusColors[value || "Not Yet Considered"] as any) || "secondary"
        }
      >
        {value || "Not Yet Considered"}
      </Badge>
    ),
  },
  {
    id: "status_rationale",
    header: "Status Rationale",
    accessor: (row) => (row as any).status_rationale,
    editable: true,
    editType: "textarea",
    minWidth: 220,
  },
  {
    id: "is_active",
    header: "Active",
    accessor: () => true,
    editable: true,
    editType: "switch",
    minWidth: 120,
    render: (value) => (
      <Badge variant={value ? "default" : "secondary"}>
        {value ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    id: "active_ingredients",
    header: "Active Ingredients",
    accessor: (row) => row.active_ingredients,
    minWidth: 280,
  },
  {
    id: "full_composition",
    header: "Full Composition",
    accessor: (row) => row.full_composition,
    minWidth: 320,
  },
  {
    id: "max_supply_risk_level",
    header: "Max Supply Risk",
    accessor: (row) => row.max_supply_risk_level,
    minWidth: 130,
    render: (value) => {
      if (!value) return "—";
      const labels = ["Low", "Medium", "High", "Critical"];
      return labels[value - 1] || "—";
    },
  },
  {
    id: "active_signature",
    header: "Active Signature",
    accessor: (row) => row.formulation_id,
    minWidth: 220,
    render: (value) => (
      <span className="font-mono text-muted-foreground text-xs">
        {value?.slice(0, 8)}...
      </span>
    ),
  },
  {
    id: "created_at",
    header: "Created At",
    accessor: (row) => row.created_at,
    minWidth: 140,
    render: (value) => (value ? new Date(value).toLocaleDateString() : "—"),
  },
  {
    id: "updated_at",
    header: "Updated At",
    accessor: (row) => row.updated_at,
    minWidth: 140,
    render: (value) => (value ? new Date(value).toLocaleDateString() : "—"),
  },
  {
    id: "created_by",
    header: "Created By",
    accessor: () => null,
    minWidth: 140,
    render: () => "—",
  },
  {
    id: "countries_count",
    header: "# Countries",
    accessor: (row) => row.countries_count,
    minWidth: 100,
    render: (value) => <span className="font-medium">{value || 0}</span>,
  },
  {
    id: "countries_list",
    header: "Countries",
    accessor: (row) => row.countries_list,
    minWidth: 220,
  },
  {
    id: "use_groups_count",
    header: "# Use Groups",
    accessor: (row) => row.use_groups_count,
    minWidth: 100,
    render: (value) => <span className="font-medium">{value || 0}</span>,
  },
  {
    id: "use_groups_list",
    header: "Use Groups",
    accessor: (row) => row.use_groups_list,
    minWidth: 280,
  },
  {
    id: "business_cases_count",
    header: "# Business Cases",
    accessor: (row) => row.business_cases_count,
    minWidth: 120,
    render: (value) => <span className="font-medium">{value || 0}</span>,
  },
  {
    id: "total_revenue",
    header: "Total Revenue",
    accessor: (row) => row.total_revenue,
    minWidth: 140,
    // Currency render handled in component via useMemo
  },
  {
    id: "total_margin",
    header: "Total Margin",
    accessor: (row) => row.total_margin,
    minWidth: 140,
    // Currency render handled in component via useMemo
  },
  {
    id: "cogs_count",
    header: "# COGS",
    accessor: (row) => row.cogs_count,
    minWidth: 100,
    render: (value) => <span className="font-medium">{value || 0}</span>,
  },
  {
    id: "latest_cogs",
    header: "Latest COGS",
    accessor: (row) => row.latest_cogs,
    minWidth: 120,
    // Currency render handled in component via useMemo
  },
  {
    id: "registration_statuses",
    header: "Reg Statuses",
    accessor: (row) => row.registration_statuses,
    minWidth: 220,
  },
  {
    id: "protection_status",
    header: "Protection Status",
    accessor: (row) => row.protection_status,
    minWidth: 220,
  },
  {
    id: "earliest_emd",
    header: "Earliest EMD",
    accessor: (row) => row.earliest_emd,
    minWidth: 140,
    render: (value) => (value ? new Date(value).toLocaleDateString() : "—"),
  },
  {
    id: "latest_tme_fy",
    header: "Latest TME FY",
    accessor: (row) => row.latest_tme_fy,
    minWidth: 120,
    render: (value) => <span className="font-medium">{value || "—"}</span>,
  },
  {
    id: "reference_products",
    header: "Reference Products",
    accessor: (row) => row.reference_products,
    minWidth: 220,
  },
  {
    id: "crops_list",
    header: "Crops",
    accessor: (row) => row.crops_list,
    minWidth: 220,
  },
  {
    id: "targets_list",
    header: "Targets",
    accessor: (row) => row.targets_list,
    minWidth: 220,
  },
];

// Default visible columns (core fields only)
const DEFAULT_VISIBLE_COLUMNS = [
  "formulation_code",
  "formulation_name",
  "short_name",
  "formulation_category",
  "formulation_status",
  "active_ingredients",
  "countries_count",
  "countries_list",
  "total_revenue",
  "total_margin",
];

// Storage keys
const STORAGE_KEY_COLUMNS = "excel_view_columns";
const STORAGE_KEY_ORDER = "excel_view_column_order";
const STORAGE_KEY_WIDTHS = "excel_view_column_widths";
const STORAGE_KEY_ZOOM = "excel_view_zoom";

// Sortable header cell component
function SortableHeaderCell({
  column,
  width,
  onResize,
  filterValue,
  onFilterChange,
}: {
  column: ColumnDef;
  width: number;
  onResize: (id: string, width: number) => void;
  filterValue: string;
  onFilterChange: (id: string, value: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const resizeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      startXRef.current = e.clientX;
      startWidthRef.current = width;
    },
    [width],
  );

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startXRef.current;
      const newWidth = Math.max(80, startWidthRef.current + diff);
      onResize(column.id, newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, column.id, onResize]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0.6 : 1,
    width: `${width}px`,
    minWidth: `${width}px`,
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      className={`px-3 py-2 text-left text-sm font-semibold border-r bg-muted relative select-none ${
        isDragging ? "z-50 shadow-lg" : ""
      }`}
    >
      <div className="flex items-center gap-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing opacity-50 hover:opacity-100 transition-opacity touch-none flex-shrink-0"
          type="button"
        >
          <GripVertical className="h-3 w-3" />
        </button>
        <span className="truncate flex-1">{column.header}</span>
      </div>
      <div className="mt-1">
        <Input
          value={filterValue}
          onChange={(e) => onFilterChange(column.id, e.target.value)}
          placeholder="Filter..."
          className="h-6 text-xs px-1"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div
        ref={resizeRef}
        onMouseDown={handleMouseDown}
        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 transition-colors"
      />
    </th>
  );
}

export function FormulationsExcelView({
  formulations,
}: FormulationsExcelViewProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    field: string;
  } | null>(null);
  const [editedData, setEditedData] = useState<
    Record<string, Partial<FormulationTable>>
  >({});

  // Permission check
  const { canEditFormulations, isLoading: permissionsLoading } =
    usePermissions();

  // Display preferences for currency formatting
  const { formatCurrencyCompact, formatCurrency } = useDisplayPreferences();

  // Process columns to add currency render functions
  const processedColumns = useMemo(() => {
    return ALL_COLUMNS.map((col) => {
      if (col.id === "total_revenue" || col.id === "total_margin") {
        return {
          ...col,
          render: (value: number | null) =>
            value ? formatCurrencyCompact(value) : "—",
        };
      }
      if (col.id === "latest_cogs") {
        return {
          ...col,
          render: (value: number | null) =>
            value
              ? formatCurrency(value, { compact: false, decimals: 2 })
              : "—",
        };
      }
      return col;
    });
  }, [formatCurrencyCompact, formatCurrency]);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom state
  const [zoom, setZoom] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY_ZOOM);
      return saved ? parseFloat(saved) : 100;
    }
    return 100;
  });

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY_COLUMNS);
      return saved ? JSON.parse(saved) : DEFAULT_VISIBLE_COLUMNS;
    }
    return DEFAULT_VISIBLE_COLUMNS;
  });

  // Column order state
  const [columnOrder, setColumnOrder] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY_ORDER);
      return saved ? JSON.parse(saved) : ALL_COLUMNS.map((c) => c.id);
    }
    return ALL_COLUMNS.map((c) => c.id);
  });

  // Column widths state
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEY_WIDTHS);
        if (saved) return JSON.parse(saved);
      }
      const widths: Record<string, number> = {};
      ALL_COLUMNS.forEach((col) => {
        widths[col.id] = col.minWidth;
      });
      return widths;
    },
  );

  // Global search state
  const [globalSearch, setGlobalSearch] = useState("");

  // Per-column filter state
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {},
  );

  // Persist settings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COLUMNS, JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(columnOrder));
  }, [columnOrder]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_WIDTHS, JSON.stringify(columnWidths));
  }, [columnWidths]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ZOOM, zoom.toString());
  }, [zoom]);

  // Escape key handler for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Handle column reorder
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setColumnOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  // Handle column resize
  const handleColumnResize = useCallback((id: string, width: number) => {
    setColumnWidths((prev) => ({ ...prev, [id]: width }));
  }, []);

  // Handle column filter change
  const handleColumnFilterChange = useCallback((id: string, value: string) => {
    setColumnFilters((prev) => ({ ...prev, [id]: value }));
  }, []);

  // Get ordered and visible columns
  const orderedVisibleColumns = useMemo(() => {
    return columnOrder
      .filter((id) => visibleColumns.includes(id))
      .map((id) => processedColumns.find((c) => c.id === id)!)
      .filter(Boolean);
  }, [columnOrder, visibleColumns, processedColumns]);

  // Filter formulations
  const filteredFormulations = useMemo(() => {
    return formulations.filter((formulation) => {
      // Global search
      if (globalSearch) {
        const searchLower = globalSearch.toLowerCase();
        const matchesGlobal = orderedVisibleColumns.some((col) => {
          const value = col.accessor(formulation);
          return value && String(value).toLowerCase().includes(searchLower);
        });
        if (!matchesGlobal) return false;
      }

      // Per-column filters
      for (const col of orderedVisibleColumns) {
        const filterValue = columnFilters[col.id];
        if (filterValue) {
          const cellValue = col.accessor(formulation);
          if (
            !cellValue ||
            !String(cellValue).toLowerCase().includes(filterValue.toLowerCase())
          ) {
            return false;
          }
        }
      }

      return true;
    });
  }, [formulations, globalSearch, columnFilters, orderedVisibleColumns]);

  // Editable fields - only if user has permission
  const editableFields = useMemo(() => {
    if (!canEditFormulations) return [];
    return ALL_COLUMNS.filter((c) => c.editable).map((c) => c.id);
  }, [canEditFormulations]);

  const handleCellClick = (rowId: string, field: string) => {
    if (!canEditFormulations) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to edit formulations",
        variant: "destructive",
      });
      return;
    }
    if (editableFields.includes(field)) {
      setEditingCell({ rowId, field });
    }
  };

  const handleCellChange = (
    rowId: string,
    field: string,
    value: string | boolean,
  ) => {
    setEditedData((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!canEditFormulations) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to edit formulations",
        variant: "destructive",
      });
      return;
    }

    if (Object.keys(editedData).length === 0) {
      toast({
        title: "No Changes",
        description: "No changes to save",
      });
      return;
    }

    startTransition(async () => {
      try {
        const { updateFormulation } = await import(
          "@/lib/actions/formulations"
        );
        const updates = Object.entries(editedData).map(
          async ([formulationId, data]) => {
            const form = new FormData();
            Object.entries(data).forEach(([key, value]) => {
              if (value !== null && value !== undefined) {
                form.append(key, value.toString());
              }
            });
            return updateFormulation(formulationId, form);
          },
        );

        const results = await Promise.all(updates);
        const errors = results.filter((r) => r.error);

        if (errors.length > 0) {
          toast({
            title: "Error",
            description: `Failed to save ${errors.length} formulation(s)`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: `Successfully updated ${results.length} formulation(s)`,
          });
          setEditedData({});
          setEditingCell(null);
          // No router.refresh() - revalidatePath in server action handles cache invalidation
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  const handleCancel = () => {
    setEditedData({});
    setEditingCell(null);
  };

  const handleResetView = () => {
    setVisibleColumns(DEFAULT_VISIBLE_COLUMNS);
    setColumnOrder(ALL_COLUMNS.map((c) => c.id));
    const widths: Record<string, number> = {};
    ALL_COLUMNS.forEach((col) => {
      widths[col.id] = col.minWidth;
    });
    setColumnWidths(widths);
    setZoom(100);
    setGlobalSearch("");
    setColumnFilters({});
  };

  const hasChanges = Object.keys(editedData).length > 0;

  const getCellValue = (
    formulation: FormulationWithNestedData,
    field: string,
  ): any => {
    if (!formulation.formulation_id) return "";
    if (
      editedData[formulation.formulation_id]?.[
        field as keyof FormulationTable
      ] !== undefined
    ) {
      return editedData[formulation.formulation_id][
        field as keyof FormulationTable
      ];
    }
    const column = processedColumns.find((c) => c.id === field);
    if (column) {
      return column.accessor(formulation);
    }
    return "";
  };

  const renderEditableCell = (
    formulation: FormulationWithNestedData,
    column: ColumnDef,
    isEditing: boolean,
  ) => {
    const value = getCellValue(formulation, column.id);

    if (isEditing && editingCell?.field === column.id) {
      switch (column.editType) {
        case "select":
          return (
            <Select
              value={String(value || "")}
              onValueChange={(val) =>
                formulation.formulation_id &&
                handleCellChange(formulation.formulation_id, column.id, val)
              }
              onOpenChange={(open) => !open && setEditingCell(null)}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {column.editOptions?.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        case "textarea":
          return (
            <Textarea
              value={String(value || "")}
              onChange={(e) =>
                formulation.formulation_id &&
                handleCellChange(
                  formulation.formulation_id,
                  column.id,
                  e.target.value,
                )
              }
              onBlur={() => setEditingCell(null)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setEditingCell(null);
              }}
              autoFocus
              className="h-16 text-sm"
              rows={2}
            />
          );
        case "switch":
          return (
            <Switch
              checked={Boolean(value)}
              onCheckedChange={(checked) =>
                formulation.formulation_id &&
                handleCellChange(formulation.formulation_id, column.id, checked)
              }
              onBlur={() => setEditingCell(null)}
            />
          );
        default:
          return (
            <Input
              value={String(value || "")}
              onChange={(e) =>
                formulation.formulation_id &&
                handleCellChange(
                  formulation.formulation_id,
                  column.id,
                  e.target.value,
                )
              }
              onBlur={() => setEditingCell(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setEditingCell(null);
                if (e.key === "Escape") setEditingCell(null);
              }}
              autoFocus
              className="h-8 text-sm"
            />
          );
      }
    }

    // Render display value
    if (column.render) {
      return column.render(value, formulation);
    }
    return (
      <span className="text-sm text-muted-foreground">{value || "—"}</span>
    );
  };

  const containerClasses = isFullscreen
    ? "fixed inset-0 z-50 bg-background flex flex-col"
    : "space-y-4";

  return (
    <div ref={containerRef} className={containerClasses}>
      {/* Toolbar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 ${isFullscreen ? "p-4 border-b" : ""}`}
      >
        {/* Left side: Search and filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search all columns..."
              className="pl-8 w-64"
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {filteredFormulations.length} of {formulations.length} rows
          </span>
        </div>

        {/* Right side: Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 border rounded-md px-2 py-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-3 w-3" />
            </Button>
            <span className="text-xs w-10 text-center">{zoom}%</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setZoom((z) => Math.min(200, z + 10))}
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-3 w-3" />
            </Button>
          </div>

          {/* Column visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Columns <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 max-h-96 overflow-y-auto"
            >
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_COLUMNS.map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={visibleColumns.includes(col.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setVisibleColumns((prev) => [...prev, col.id]);
                    } else {
                      setVisibleColumns((prev) =>
                        prev.filter((id) => id !== col.id),
                      );
                    }
                  }}
                >
                  {col.header}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reset view */}
          <Button variant="outline" size="sm" onClick={handleResetView}>
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>

          {/* Fullscreen toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-3 w-3 mr-1" />
                Exit
              </>
            ) : (
              <>
                <Maximize2 className="h-3 w-3 mr-1" />
                Fullscreen
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Unsaved changes bar */}
      {hasChanges && (
        <div
          className={`flex items-center justify-between p-3 bg-muted rounded-lg border ${isFullscreen ? "mx-4" : ""}`}
        >
          <span className="text-sm font-medium">
            {Object.keys(editedData).length} formulation(s) have unsaved changes
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isPending}
            >
              <X className="mr-1 h-3 w-3" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isPending}>
              <Save className="mr-1 h-3 w-3" />
              {isPending ? "Saving..." : "Save All"}
            </Button>
          </div>
        </div>
      )}

      {/* Table container */}
      <div
        className={`border rounded-lg overflow-hidden ${isFullscreen ? "flex-1 mx-4 mb-4" : ""}`}
      >
        <div
          className="overflow-auto h-full"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top left",
            width: `${10000 / zoom}%`,
          }}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted border-b">
                  <SortableContext
                    items={orderedVisibleColumns.map((c) => c.id)}
                    strategy={horizontalListSortingStrategy}
                  >
                    {orderedVisibleColumns.map((column) => (
                      <SortableHeaderCell
                        key={column.id}
                        column={column}
                        width={columnWidths[column.id] || column.minWidth}
                        onResize={handleColumnResize}
                        filterValue={columnFilters[column.id] || ""}
                        onFilterChange={handleColumnFilterChange}
                      />
                    ))}
                  </SortableContext>
                </tr>
              </thead>
              <tbody>
                {filteredFormulations.map((formulation) => {
                  const isEditing =
                    editingCell?.rowId === formulation.formulation_id;
                  const rowHasChanges =
                    !!formulation.formulation_id &&
                    !!editedData[formulation.formulation_id];

                  return (
                    <tr
                      key={formulation.formulation_id}
                      className={`border-b hover:bg-muted/50 transition-colors ${
                        rowHasChanges
                          ? "bg-yellow-50 dark:bg-yellow-900/10"
                          : ""
                      }`}
                    >
                      {orderedVisibleColumns.map((column) => {
                        const isEditableCell =
                          column.editable && canEditFormulations;
                        return (
                          <td
                            key={column.id}
                            className={`px-3 py-2 border-r text-sm ${isEditableCell ? "cursor-pointer hover:bg-muted/30" : ""}`}
                            style={{
                              width: `${columnWidths[column.id] || column.minWidth}px`,
                              minWidth: `${columnWidths[column.id] || column.minWidth}px`,
                            }}
                            onClick={() =>
                              column.editable &&
                              formulation.formulation_id &&
                              handleCellClick(
                                formulation.formulation_id,
                                column.id,
                              )
                            }
                          >
                            {renderEditableCell(formulation, column, isEditing)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </DndContext>
        </div>
      </div>

      {/* Help text */}
      {!isFullscreen && (
        <div className="text-xs text-muted-foreground space-y-1">
          {canEditFormulations ? (
            <p>
              Click on editable cells to edit. Press Enter to confirm, Escape to
              cancel.
            </p>
          ) : (
            <p className="text-amber-600">
              View-only mode. You don&apos;t have permission to edit
              formulations.
            </p>
          )}
          <p>
            Drag column headers to reorder. Drag column edges to resize. Press
            Escape to exit fullscreen.
          </p>
        </div>
      )}
    </div>
  );
}
