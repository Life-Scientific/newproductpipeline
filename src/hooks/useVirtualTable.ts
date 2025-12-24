"use client";

import {
  useVirtualizer,
  type VirtualizerOptions,
  type VirtualItem,
} from "@tanstack/react-virtual";
import React from "react";

interface UseVirtualTableOptions<T> {
  /** The data array to virtualize */
  data: T[];
  /** Estimate of row height in pixels (default: 52) */
  estimateSize?: number;
  /** Number of items to render outside the visible area (default: 10) */
  overscan?: number;
  /** Optional: Count of items to show (for loading states) */
  count?: number;
  /** Optional: Callback when virtual items are calculated */
  onVirtualItemsChange?: (items: VirtualItem[]) => void;
}

/**
 * Virtual table hook for rendering large lists efficiently.
 *
 * Only renders items visible in the viewport plus overscan buffer,
 * dramatically improving performance for tables with 100+ rows.
 *
 * @example
 * ```tsx
 * const parentRef = useRef<HTMLDivElement>(null);
 * const { virtualItems, totalSize, scrollToIndex } = useVirtualTable({
 *   data: myData,
 *   estimateSize: 52,
 *   overscan: 10,
 * });
 *
 * return (
 *   <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
 *     <div style={{ height: `${totalSize}px`, position: 'relative' }}>
 *       {virtualItems.map((virtualItem) => (
 *         <div
 *           key={virtualItem.key}
 *           style={{
 *             position: 'absolute',
 *             top: 0,
 *             left: 0,
 *             width: '100%',
 *             height: `${virtualItem.size}px`,
 *             transform: `translateY(${virtualItem.start}px)`,
 *           }}
 *         >
 *           {myData[virtualItem.index]}
 *         </div>
 *       ))}
 *     </div>
 *   </div>
 * );
 * ```
 */
export function useVirtualTable<T>({
  data,
  estimateSize = 52,
  overscan = 10,
  count = data.length,
  onVirtualItemsChange,
}: UseVirtualTableOptions<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: overscan,
    initialScrollOffset: 0,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  // Notify when virtual items change
  React.useEffect(() => {
    onVirtualItemsChange?.(virtualItems);
  }, [virtualItems, onVirtualItemsChange]);

  return {
    /** Reference to the scroll container element */
    parentRef,
    /** Array of virtual items to render */
    virtualItems,
    /** Total height of all items combined */
    totalSize,
    /** Virtualizer instance for advanced control */
    virtualizer,
    /** Scroll to a specific index */
    scrollToIndex: (index: number, align: "start" | "center" | "end" = "start") =>
      virtualizer.scrollToIndex(index, { align }),
    /** Scroll to a specific offset */
    scrollToOffset: (offset: number) => virtualizer.scrollToOffset(offset),
    /** Measure a specific item's size */
    measureElement: (index: number) => virtualizer.measureElement(index),
    /** Check if an index is currently visible */
    isIndexVisible: (index: number) => {
      const firstVisible = virtualItems[0]?.index ?? -1;
      const lastVisible = virtualItems[virtualItems.length - 1]?.index ?? -1;
      return index >= firstVisible && index <= lastVisible;
    },
    /** Get the index of the first visible item */
    startIndex: virtualItems[0]?.index ?? 0,
    /** Get the index of the last visible item */
    endIndex: virtualItems[virtualItems.length - 1]?.index ?? 0,
    /** Number of visible items */
    visibleCount: virtualItems.length,
  };
}

/**
 * Hook for virtualizing a single dimension (rows or columns)
 */
export function useVirtualList<T>(options: UseVirtualTableOptions<T>) {
  return useVirtualTable(options);
}

/**
 * Hook for virtualizing both rows and columns (2D grid)
 */
interface UseVirtualGridOptions<T> {
  data: T[];
  estimateRowSize?: number;
  estimateColumnSize?: number;
  overscan?: number;
  columns: number;
}

export function useVirtualGrid<T>({
  data,
  estimateRowSize = 52,
  estimateColumnSize = 150,
  overscan = 5,
  columns,
}: UseVirtualGridOptions<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(data.length / columns),
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowSize,
    overscan,
  });

  const columnVirtualizer = useVirtualizer({
    count: columns,
    getScrollElement: () => null, // Not used for horizontal
    estimateSize: () => estimateColumnSize,
    overscan,
    horizontal: true,
  });

  return {
    parentRef,
    rowVirtualizer,
    columnVirtualizer,
    totalHeight: rowVirtualizer.getTotalSize(),
    totalWidth: columnVirtualizer.getTotalSize(),
  };
}

