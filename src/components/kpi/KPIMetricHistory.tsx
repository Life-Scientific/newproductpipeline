"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Clock, User, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { KPIMetricHistoryEntry, KPIMetric } from "@/lib/actions/kpi-actions";

interface KPIMetricHistoryProps {
  history: KPIMetricHistoryEntry[];
  metrics: KPIMetric[];
  sectionKey: string;
}

export function KPIMetricHistory({
  history,
  metrics,
  sectionKey,
}: KPIMetricHistoryProps) {
  const [expanded, setExpanded] = useState(false);

  // Filter history for this section
  const sectionHistory = history.filter((h) => h.section_key === sectionKey);

  if (sectionHistory.length === 0) {
    return null;
  }

  // Get metric label from metric_key
  const getMetricLabel = (metricKey: string) => {
    const metric = metrics.find(
      (m) => m.section_key === sectionKey && m.metric_key === metricKey
    );
    return metric?.metric_label || metricKey;
  };

  // Get metric unit
  const getMetricUnit = (metricKey: string): string | null => {
    const metric = metrics.find(
      (m) => m.section_key === sectionKey && m.metric_key === metricKey
    );
    return metric?.metric_unit || null;
  };

  // Format value with unit
  const formatValue = (value: number | null, unit: string | null) => {
    if (value === null) return "—";
    if (unit === "%") return `${value}%`;
    if (unit === "EUR") return `€${value.toLocaleString("en-US")}`;
    if (unit === "days") return `${value} days`;
    return value.toLocaleString("en-US");
  };

  const displayHistory = expanded ? sectionHistory : sectionHistory.slice(0, 3);

  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Changes
          </CardTitle>
          {sectionHistory.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="h-7 text-xs"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="ml-1 h-3 w-3" />
                </>
              ) : (
                <>
                  Show all ({sectionHistory.length}){" "}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {displayHistory.map((entry) => {
            const unit = getMetricUnit(entry.metric_key);
            return (
              <div
                key={entry.history_id}
                className="flex items-start gap-3 p-2 rounded-md bg-background/50 text-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    {getMetricLabel(entry.metric_key)}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <span className="text-red-600 dark:text-red-400 line-through">
                      {formatValue(entry.old_value, unit)}
                    </span>
                    <ArrowRight className="h-3 w-3" />
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {formatValue(entry.new_value, unit)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {entry.changed_by}
                    </span>
                    <span>
                      {formatDistanceToNow(new Date(entry.changed_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

