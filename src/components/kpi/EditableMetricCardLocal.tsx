"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import type { KPIMetric } from "@/lib/actions/kpi-actions";
import { toast } from "sonner";

interface EditableMetricCardLocalProps {
  metric: KPIMetric;
  canEdit: boolean;
  onSave: (value: number | null) => void;
}

export function EditableMetricCardLocal({
  metric,
  canEdit,
  onSave,
}: EditableMetricCardLocalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    metric.metric_value?.toString() || ""
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // Update edit value when metric changes
  useEffect(() => {
    if (!isEditing) {
      setEditValue(metric.metric_value?.toString() || "");
    }
  }, [metric.metric_value, isEditing]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    if (!canEdit) return;
    setEditValue(metric.metric_value?.toString() || "");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditValue(metric.metric_value?.toString() || "");
    setIsEditing(false);
  };

  const handleSave = () => {
    const newValue = editValue.trim() === "" ? null : parseFloat(editValue);

    if (editValue.trim() !== "" && isNaN(newValue as number)) {
      toast.error("Please enter a valid number");
      return;
    }

    onSave(newValue);
    toast.success("Metric updated");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  // Format the display value
  const formatValue = (value: number | null, unit: string | null) => {
    if (value === null) return "—";

    // Format based on unit type
    if (unit === "%") {
      return `${value.toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;
    } else if (unit === "EUR") {
      return `€${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    } else if (unit === "days") {
      return `${value.toLocaleString("en-US", { maximumFractionDigits: 0 })} days`;
    } else if (unit === "#") {
      return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
    }

    return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  return (
    <Card
      className={cn(
        "transition-all",
        canEdit && !isEditing && "cursor-pointer hover:border-primary/50",
        isEditing && "ring-2 ring-primary"
      )}
      onClick={!isEditing ? handleStartEdit : undefined}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Label */}
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-medium text-muted-foreground leading-tight">
              {metric.metric_label}
            </span>
            {canEdit && !isEditing && (
              <Pencil className="h-3 w-3 text-muted-foreground/50 shrink-0" />
            )}
          </div>

          {/* Value */}
          {isEditing ? (
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Input
                ref={inputRef}
                type="number"
                step="any"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-9 text-lg font-bold"
                placeholder="Enter value"
              />
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-green-600"
                  onClick={handleSave}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-600"
                  onClick={handleCancel}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-2xl font-bold tabular-nums">
              {formatValue(metric.metric_value, metric.metric_unit)}
            </div>
          )}

          {/* Last updated */}
          {metric.updated_by && metric.updated_at && (
            <div className="text-xs text-muted-foreground">
              Updated by {metric.updated_by}{" "}
              {formatDistanceToNow(new Date(metric.updated_at), {
                addSuffix: true,
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

