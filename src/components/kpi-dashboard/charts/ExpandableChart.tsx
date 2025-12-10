"use client";

import { useState } from "react";
import { BaseModal } from "@/components/ui/BaseModal";
import { Button } from "@/components/ui/button";
import { Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableChartProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Render function for expanded view - allows different sizing/config */
  expandedContent?: React.ReactNode;
  className?: string;
}

/**
 * Wraps a chart component to make it expandable into a full modal view.
 * Click the expand button or the chart itself to open in modal.
 */
export function ExpandableChart({
  title,
  description,
  children,
  expandedContent,
  className,
}: ExpandableChartProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Inline Chart with Expand Button */}
      <div className={cn("relative group", className)}>
        {/* Expand Button - appears on hover */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={() => setIsExpanded(true)}
        >
          <Expand className="h-4 w-4" />
        </Button>

        {/* Clickable Chart Area */}
        <div
          className="cursor-pointer"
          onClick={() => setIsExpanded(true)}
          title="Click to expand"
        >
          {children}
        </div>
      </div>

      {/* Expanded Modal */}
      <BaseModal
        open={isExpanded}
        onOpenChange={setIsExpanded}
        title={title}
        description={description}
        maxWidth="max-w-5xl"
        showCancel={false}
        showSave={false}
      >
        <div className="min-h-[400px]">
          {expandedContent || children}
        </div>
      </BaseModal>
    </>
  );
}

