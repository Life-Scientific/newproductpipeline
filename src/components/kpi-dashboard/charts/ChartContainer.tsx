"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ChartContainerProps {
  children: ReactNode;
  height: number;
  className?: string;
}

/**
 * Wrapper component that ensures charts only render when container has dimensions
 * Prevents Recharts warnings about negative width/height
 */
export function ChartContainer({
  children,
  height,
  className = "",
}: ChartContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasDimensions, setHasDimensions] = useState(false);

  useEffect(() => {
    const checkDimensions = () => {
      if (containerRef.current) {
        const { width, height: h } = containerRef.current.getBoundingClientRect();
        if (width > 0 && h > 0) {
          setHasDimensions(true);
        }
      }
    };

    // Check immediately
    checkDimensions();

    // Also check after a short delay to handle SSR hydration
    const timeout = setTimeout(checkDimensions, 100);

    // Watch for resize
    const resizeObserver = new ResizeObserver(checkDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeout);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height, minHeight: height }}
    >
      {hasDimensions ? children : (
        <div className="h-full flex items-center justify-center">
          <div className="text-xs text-muted-foreground">Loading...</div>
        </div>
      )}
    </div>
  );
}

