"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ChartContainerProps {
  children: ReactNode;
  height: number;
  className?: string;
}

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

    checkDimensions();
    const timeout = setTimeout(checkDimensions, 100);
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

