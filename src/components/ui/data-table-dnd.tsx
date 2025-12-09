/**
 * DnD-enabled Table Wrapper
 *
 * This component is loaded dynamically only when column reordering is enabled.
 * It wraps the table content with DnD context and sortable functionality.
 */

"use client";

import * as React from "react";
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
import { flexRender } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SortableHeaderCellProps {
  header: any;
  columnId: string;
  stickyStyle?: React.CSSProperties;
}

/**
 * Memoized sortable header cell component
 */
const SortableHeaderCell = React.memo(function SortableHeaderCell({
  header,
  columnId,
  stickyStyle,
}: SortableHeaderCellProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: columnId,
    transition: {
      duration: 200,
      easing: "ease-in-out",
    },
  });

  const style = React.useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition: isDragging ? "none" : transition,
      opacity: isDragging ? 0.6 : 1,
      backgroundColor: isDragging ? "hsl(var(--muted))" : undefined,
      boxShadow: isDragging
        ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        : undefined,
      borderRadius: isDragging ? "4px" : undefined,
      ...stickyStyle,
    }),
    [transform, transition, isDragging, stickyStyle],
  );

  return (
    <TableHead
      ref={setNodeRef}
      style={style}
      className={`relative h-10 ${isDragging ? "z-50" : ""}`}
    >
      <div className="flex items-center gap-2 h-full">
        {flexRender(header.column.columnDef.header, header.getContext())}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing opacity-50 hover:opacity-100 transition-opacity touch-none flex-shrink-0"
          type="button"
          aria-label="Drag to reorder column"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>
    </TableHead>
  );
});

interface MemoizedTableCellProps {
  cell: any;
  stickyStyle?: React.CSSProperties;
  align?: string;
  minWidth?: string;
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
  }: MemoizedTableCellProps) {
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
    if (prevProps.cell.id !== nextProps.cell.id) return false;
    if (prevProps.align !== nextProps.align) return false;
    if (prevProps.minWidth !== nextProps.minWidth) return false;
    if (prevProps.cell.column.id !== nextProps.cell.column.id) return false;

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

export interface DndTableProps {
  table: any;
  columns: any[];
  reorderableColumns: any[];
  headerStylesMap: Map<string, React.CSSProperties>;
  columnStylesMap: Map<string, React.CSSProperties>;
  rowModel: any;
  isLoading: boolean;
  emptyMessage: string;
  onColumnOrderChange: (newOrder: string[]) => void;
  getRowClassName?: (row: any, index: number) => string;
}

export function DndTable({
  table,
  columns,
  reorderableColumns,
  headerStylesMap,
  columnStylesMap,
  rowModel,
  isLoading,
  emptyMessage,
  onColumnOrderChange,
  getRowClassName,
}: DndTableProps) {
  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Handle column reordering
  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const columnOrder = table.getState().columnOrder;
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        const newOrder = arrayMove(columnOrder, oldIndex, newIndex) as string[];
        onColumnOrderChange(newOrder);
      }
    },
    [table, onColumnOrderChange],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      autoScroll={{
        threshold: { x: 0.2, y: 0.2 },
        acceleration: 10,
        interval: 5,
      }}
    >
      <Table className="min-w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              <SortableContext
                items={reorderableColumns.map((col: any) => col.id || "")}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header: any) => {
                  const columnId =
                    header.column.id ||
                    ((header.column.columnDef as any).accessorKey as string);
                  const meta = header.column.columnDef.meta as
                    | {
                        align?: string;
                        minWidth?: string;
                        sticky?: "left" | "right";
                        enableReordering?: boolean;
                      }
                    | undefined;
                  const stickyStyle = headerStylesMap.get(columnId);

                  // Check if column is reorderable (default true unless explicitly disabled)
                  const isReorderable = meta?.enableReordering !== false;

                  return isReorderable ? (
                    <SortableHeaderCell
                      key={header.id}
                      header={header}
                      columnId={columnId}
                      stickyStyle={stickyStyle}
                    />
                  ) : (
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
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </SortableContext>
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
            rowModel.rows.map((row: any, index: number) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`h-12 hover:bg-muted/30 border-border/40 ${getRowClassName ? getRowClassName(row.original, index) : ""}`}
              >
                {row.getVisibleCells().map((cell: any) => {
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
                <p className="text-sm text-muted-foreground">{emptyMessage}</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </DndContext>
  );
}
