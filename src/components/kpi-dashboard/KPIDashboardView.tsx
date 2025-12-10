"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardGrid } from "@/components/layout/CardGrid";
import { MetricCard } from "@/components/layout/MetricCard";
import { KPIDetailModal } from "./KPIDetailModal";
import { VisualizationsSection } from "./VisualizationsSection";
import type { UserManagementData } from "@/lib/actions/user-management";
import type { KPIData, KeyResult } from "@/lib/kpi-dashboard/mock-data";
import {
  Lock,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIDashboardViewProps {
  kpiData: KPIData;
  users: UserManagementData[];
  onUpdateKeyResult?: (
    coreDriverId: string,
    strategicDriverId: string,
    keyResultId: string,
    updated: KeyResult,
  ) => void;
}

const statusConfig = {
  red: {
    variant: "destructive" as const,
    label: "At Risk",
    icon: AlertCircle,
    color: "text-red-600 dark:text-red-400",
  },
  yellow: {
    variant: "warning" as const,
    label: "Attention",
    icon: AlertTriangle,
    color: "text-yellow-600 dark:text-yellow-400",
  },
  green: {
    variant: "success" as const,
    label: "On Track",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
  },
};

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export function KPIDashboardView({
  kpiData,
  users,
  onUpdateKeyResult,
}: KPIDashboardViewProps) {
  const [selectedKR, setSelectedKR] = useState<{
    keyResult: KeyResult;
    coreDriverId: string;
    coreDriverLabel: string;
    strategicDriverId: string;
    strategicDriverLabel: string;
  } | null>(null);

  const getUserName = useCallback((ownerId: string | null) => {
    if (!ownerId) return null;
    const user = users.find((u) => u.id === ownerId);
    return user?.email?.split("@")[0] || null;
  }, [users]);

  // Calculate totals - memoized to prevent recalculation on every render
  const totals = useMemo(() => {
    return kpiData.coreDrivers.reduce(
      (acc, cd) => {
        cd.strategicDrivers.forEach((sd) => {
          sd.keyResults.forEach((kr) => {
            acc.total++;
            acc[kr.status]++;
            if (kr.isLocked) acc.locked++;
          });
        });
        return acc;
      },
      { total: 0, red: 0, yellow: 0, green: 0, locked: 0 },
    );
  }, [kpiData.coreDrivers]);

  const healthScore = useMemo(() => {
    return Math.round(
      ((totals.green * 100 + totals.yellow * 50) / (totals.total * 100)) * 100,
    );
  }, [totals]);

  const handleKRClick = useCallback((
    keyResult: KeyResult,
    coreDriverId: string,
    coreDriverLabel: string,
    strategicDriverId: string,
    strategicDriverLabel: string,
  ) => {
    setSelectedKR({
      keyResult,
      coreDriverId,
      coreDriverLabel,
      strategicDriverId,
      strategicDriverLabel,
    });
  }, []);

  const handleKRUpdate = useCallback((updated: KeyResult) => {
    if (selectedKR && onUpdateKeyResult) {
      onUpdateKeyResult(
        selectedKR.coreDriverId,
        selectedKR.strategicDriverId,
        updated.id,
        updated,
      );
      setSelectedKR((prev) => prev ? { ...prev, keyResult: updated } : null);
    }
  }, [selectedKR, onUpdateKeyResult]);

  return (
    <>
      <div className="space-y-6">
        {/* Metrics Row */}
        <CardGrid columns={{ mobile: 2, tablet: 3, desktop: 5 }} gap="md">
          <MetricCard
            title="Total KPIs"
            value={totals.total}
            subtitle={`${totals.locked} locked`}
          />
          <MetricCard
            title="Health Score"
            value={`${healthScore}%`}
            subtitle="Weighted average"
            trend={
              healthScore >= 70
                ? { value: healthScore, label: "healthy", direction: "up" }
                : { value: 100 - healthScore, label: "at risk", direction: "down" }
            }
          />
          <Card className="border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                On Track
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tabular-nums text-green-600 dark:text-green-400">
                {totals.green}
              </div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
                Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tabular-nums text-yellow-600 dark:text-yellow-400">
                {totals.yellow}
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-500/30 bg-red-500/5 hover:bg-red-500/10 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                At Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tabular-nums text-red-600 dark:text-red-400">
                {totals.red}
              </div>
            </CardContent>
          </Card>
        </CardGrid>

        {/* Core Drivers */}
        <CardGrid columns={{ mobile: 1, tablet: 1, desktop: 3 }} gap="md">
          {kpiData.coreDrivers.map((coreDriver, idx) => (
            <Card
              key={coreDriver.id}
              className="border-border/50 hover:border-border transition-colors hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">
                        {coreDriver.label}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">
                        {coreDriver.target}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {coreDriver.strategicDrivers.map((sd) => (
                  <div key={sd.id} className="space-y-2">
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 px-1">
                      {sd.label}
                    </div>
                    <div className="space-y-1">
                      {sd.keyResults.map((kr) => (
                        <KeyResultRow
                          key={kr.id}
                          keyResult={kr}
                          ownerName={getUserName(kr.ownerId)}
                          onClick={() =>
                            handleKRClick(
                              kr,
                              coreDriver.id,
                              coreDriver.label,
                              sd.id,
                              sd.label,
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </CardGrid>

        {/* Visualizations Section - Below the fold */}
        <VisualizationsSection defaultOpen={true} />
      </div>

      {/* Detail Modal */}
      <KPIDetailModal
        keyResult={selectedKR?.keyResult || null}
        users={users}
        onUpdate={handleKRUpdate}
        onClose={() => setSelectedKR(null)}
        coreDriverLabel={selectedKR?.coreDriverLabel}
        strategicDriverLabel={selectedKR?.strategicDriverLabel}
        strategicDriverId={selectedKR?.strategicDriverId}
      />
    </>
  );
}

const KeyResultRow = memo(function KeyResultRow({
  keyResult,
  ownerName,
  onClick,
}: {
  keyResult: KeyResult;
  ownerName: string | null;
  onClick: () => void;
}) {
  const config = statusConfig[keyResult.status];
  const Icon = config.icon;
  const TrendIcon =
    keyResult.trend === "up"
      ? TrendingUp
      : keyResult.trend === "down"
        ? TrendingDown
        : Minus;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 py-2 px-2.5 rounded-lg hover:bg-muted/60 active:bg-muted transition-all duration-150 group text-left border border-transparent hover:border-border/50"
    >
      {/* Status Icon */}
      <div className="relative">
        <Icon className={cn("h-4 w-4 shrink-0", config.color)} />
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-sm opacity-0 group-hover:opacity-30 transition-opacity",
            config.color,
          )}
        />
      </div>

      {/* Label */}
      <span className="text-sm font-medium flex-1 min-w-0 truncate group-hover:text-primary transition-colors">
        {keyResult.label}
      </span>

      {/* Meta */}
      <div className="flex items-center gap-2 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
        {/* Trend */}
        {keyResult.trend && (
          <TrendIcon
            className={cn(
              "h-3.5 w-3.5 shrink-0",
              keyResult.trend === "up" && "text-green-500 dark:text-green-400",
              keyResult.trend === "down" && "text-red-500 dark:text-red-400",
              keyResult.trend === "flat" && "text-muted-foreground",
            )}
          />
        )}

        {/* Target/Reality */}
        {keyResult.target && (
          <span className="text-xs font-semibold tabular-nums text-muted-foreground group-hover:text-foreground transition-colors">
            {keyResult.reality || "—"}/{keyResult.target}
          </span>
        )}

        {/* Source indicator */}
        <div
          title={keyResult.source.system}
          className="p-0.5 rounded hover:bg-muted/50 transition-colors"
        >
          <Database className="h-3 w-3 text-muted-foreground" />
        </div>

        {/* Last Updated */}
        <span className="text-[10px] text-muted-foreground flex items-center gap-0.5 hidden sm:inline-flex">
          <Clock className="h-2.5 w-2.5" />
          {formatRelativeTime(keyResult.lastUpdated)}
        </span>

        {/* Lock */}
        {keyResult.isLocked && (
          <Lock className="h-3 w-3 text-muted-foreground shrink-0" />
        )}
      </div>
    </button>
  );
});
