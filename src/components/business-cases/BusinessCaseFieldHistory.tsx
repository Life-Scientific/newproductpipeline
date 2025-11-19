"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User, TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FieldUpdateInfo {
  field: string;
  lastUpdatedAt: string | null;
  lastUpdatedBy: string | null;
  currentValue: number | null;
}

interface BusinessCaseFieldHistoryProps {
  businessCaseId: string;
  volume: number | null;
  volumeLastUpdatedAt: string | null;
  volumeLastUpdatedBy: string | null;
  nsp: number | null;
  nspLastUpdatedAt: string | null;
  nspLastUpdatedBy: string | null;
  cogsPerUnit: number | null;
  cogsLastUpdatedAt: string | null;
  cogsLastUpdatedBy: string | null;
  fiscalYear: string | null;
  formulationCode: string | null;
}

export function BusinessCaseFieldHistory({
  businessCaseId,
  volume,
  volumeLastUpdatedAt,
  volumeLastUpdatedBy,
  nsp,
  nspLastUpdatedAt,
  nspLastUpdatedBy,
  cogsPerUnit,
  cogsLastUpdatedAt,
  cogsLastUpdatedBy,
  fiscalYear,
  formulationCode,
}: BusinessCaseFieldHistoryProps) {
  const fields: FieldUpdateInfo[] = [
    {
      field: "Volume",
      lastUpdatedAt: volumeLastUpdatedAt,
      lastUpdatedBy: volumeLastUpdatedBy,
      currentValue: volume,
    },
    {
      field: "NSP",
      lastUpdatedAt: nspLastUpdatedAt,
      lastUpdatedBy: nspLastUpdatedBy,
      currentValue: nsp,
    },
    {
      field: "COGS",
      lastUpdatedAt: cogsLastUpdatedAt,
      lastUpdatedBy: cogsLastUpdatedBy,
      currentValue: cogsPerUnit,
    },
  ];

  const hasAnyUpdates = fields.some(f => f.lastUpdatedAt);

  if (!hasAnyUpdates) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Field Update History
        </CardTitle>
        <CardDescription>
          {formulationCode} - {fiscalYear} | Git-style field-level tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {fields
            .filter(f => f.lastUpdatedAt)
            .map((field) => (
              <div
                key={field.field}
                className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {field.field}
                    </Badge>
                    <span className="text-sm font-semibold">
                      {field.currentValue !== null 
                        ? field.currentValue.toLocaleString(undefined, { 
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2 
                          })
                        : "—"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{field.lastUpdatedBy || "system"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {field.lastUpdatedAt
                          ? formatDistanceToNow(new Date(field.lastUpdatedAt), { addSuffix: true })
                          : "never"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-900 dark:text-blue-100">
            <strong>Git-style tracking:</strong> Each field maintains its own update timestamp and author,
            allowing you to see who last modified Volume, NSP, or COGS independently.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

