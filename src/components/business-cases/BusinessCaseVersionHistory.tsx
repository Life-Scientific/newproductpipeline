"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  GitBranch,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  Eye,
  Archive,
  MessageSquare,
  FileText,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { getBusinessCaseVersionHistoryAction } from "@/lib/actions/business-cases";
import type { BusinessCaseVersionHistoryEntry } from "@/lib/db/queries";
import { hasChanges } from "@/lib/utils/business-case-diff";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";

interface BusinessCaseVersionHistoryProps {
  useGroupId: string;
  currentGroupId: string;
  formulationName?: string;
  countryName?: string;
}

export function BusinessCaseVersionHistory({
  useGroupId,
  currentGroupId,
  formulationName,
  countryName,
}: BusinessCaseVersionHistoryProps) {
  const [versions, setVersions] = useState<BusinessCaseVersionHistoryEntry[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // All hooks must be called before any early returns (Rules of Hooks)
  const { formatCurrencyCompact } = useDisplayPreferences();

  useEffect(() => {
    if (useGroupId) {
      setLoading(true);
      getBusinessCaseVersionHistoryAction(useGroupId)
        .then((result) => {
          if (result.error) {
            setError(result.error);
          } else if (result.data) {
            setVersions(result.data);
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [useGroupId]);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading version history...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="text-sm text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (versions.length <= 1) {
    // Only one version or no versions - don't show history
    return null;
  }

  const displayVersions = expanded ? versions : versions.slice(0, 3);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <GitBranch className="h-4 w-4" />
          Version History
          <Badge variant="secondary" className="ml-2">
            {versions.length} versions
          </Badge>
        </CardTitle>
        <CardDescription>
          {formulationName && countryName
            ? `${formulationName} - ${countryName}`
            : "Track changes over time with automatic versioning"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayVersions.map((version, index) => {
            const isCurrent = version.business_case_group_id === currentGroupId;
            const isActive = version.status === "active";

            return (
              <div
                key={version.business_case_group_id}
                className={`flex items-center gap-4 p-3 border rounded-lg transition-colors ${
                  isCurrent
                    ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                    : isActive
                      ? "bg-background"
                      : "bg-muted/30"
                }`}
              >
                {/* Version indicator */}
                <div className="flex flex-col items-center w-12 flex-shrink-0">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isActive ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {index < displayVersions.length - 1 && (
                    <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600 mt-1" />
                  )}
                </div>

                {/* Version details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">
                      Version {version.version_number}
                    </span>
                    {isCurrent && (
                      <Badge variant="default" className="text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        Current
                      </Badge>
                    )}
                    {!isActive && (
                      <Badge variant="secondary" className="text-xs">
                        <Archive className="h-3 w-3 mr-1" />
                        Archived
                      </Badge>
                    )}
                    {/* Change summary badge */}
                    {hasChanges(version.change_summary) && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="outline"
                              className="text-xs cursor-help"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              Changes
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-md">
                            <div className="space-y-1">
                              <p className="font-medium text-xs">
                                What Changed:
                              </p>
                              <p className="text-xs">
                                {version.change_summary}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  {/* Change reason - show if present */}
                  {version.change_reason && (
                    <div className="flex items-start gap-1 mt-1.5 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-md max-w-[400px]">
                      <MessageSquare className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span
                        className="italic truncate"
                        title={version.change_reason}
                      >
                        "{version.change_reason}"
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{version.created_by || "system"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {version.created_at
                          ? formatDistanceToNow(new Date(version.created_at), {
                              addSuffix: true,
                            })
                          : "—"}
                      </span>
                    </div>
                    {version.created_at && (
                      <span className="text-muted-foreground/60">
                        {format(
                          new Date(version.created_at),
                          "MMM d, yyyy HH:mm",
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Year 1 summary */}
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-medium">
                    {formatCurrencyCompact(
                      version.year_1_summary.total_revenue,
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    FY1 Revenue
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {versions.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show {versions.length - 3} More Versions
              </>
            )}
          </Button>
        )}

        <div className="mt-4 p-3 bg-muted/50 rounded-lg border">
          <p className="text-xs text-muted-foreground">
            <strong>Version Control:</strong> Every change creates a new version
            with automatic diff tracking. Add a reason for your changes to help
            your team understand the context. Previous versions are preserved
            for audit tracking and can be referenced.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
