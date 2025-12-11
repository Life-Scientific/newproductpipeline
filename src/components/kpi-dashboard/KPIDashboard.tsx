"use client";

import { useState, useCallback, useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Network, Pencil } from "lucide-react";
import type { UserManagementData } from "@/lib/actions/user-management";
import type {
  KPIData,
  CoreDriver,
  StrategicDriver,
  KeyResult,
} from "@/lib/kpi-dashboard/types";
import { updateKeyResult as updateKeyResultAction } from "@/lib/actions/kpi-actions";
import { KPINetworkGraph } from "./KPINetworkGraph";
import { KPIDashboardView } from "./KPIDashboardView";
import { KPIEditView } from "./KPIEditView";
import { HierarchyManager } from "./HierarchyManager";
import { Settings } from "lucide-react";

interface KPIDashboardProps {
  users: UserManagementData[];
  initialData: KPIData;
}

type ViewMode = "graph" | "dashboard" | "edit" | "hierarchy";

export function KPIDashboard({ users, initialData }: KPIDashboardProps) {
  const [kpiData, setKpiData] = useState<KPIData>(initialData);
  const [optimisticData, setOptimisticData] = useOptimistic(
    kpiData,
    (state, newData: KPIData) => newData,
  );
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");

  const updateKeyResult = useCallback(
    async (
      coreDriverId: string,
      strategicDriverId: string,
      keyResultId: string,
      updated: KeyResult,
    ) => {
      // Optimistic update
      const updatedWithTimestamp = {
        ...updated,
        lastUpdated: new Date().toISOString(),
      };

      const optimisticUpdate: KPIData = {
        coreDrivers: optimisticData.coreDrivers.map((cd) =>
          cd.id === coreDriverId
            ? {
                ...cd,
                strategicDrivers: cd.strategicDrivers.map((sd) =>
                  sd.id === strategicDriverId
                    ? {
                        ...sd,
                        keyResults: sd.keyResults.map((kr) =>
                          kr.id === keyResultId ? updatedWithTimestamp : kr,
                        ),
                      }
                    : sd,
                ),
              }
            : cd,
        ),
      };

      setOptimisticData(optimisticUpdate);

      try {
        // Call server action
        await updateKeyResultAction(keyResultId, {
          label: updated.label,
          status: updated.status,
          target: updated.target || null,
          reality: updated.reality || null,
          trend: updated.trend,
          owner_id: updated.ownerId || null,
          justification: updated.justification || null,
          notes: updated.notes || null,
          strategic_driver_id: strategicDriverId,
        });

        // Update local state with server response
        setKpiData(optimisticUpdate);
      } catch (error) {
        console.error("Error updating key result:", error);
        // Revert optimistic update on error
        setKpiData(kpiData);
        throw error;
      }
    },
    [optimisticData, kpiData, setOptimisticData],
  );

  const updateCoreDriver = useCallback(
    (coreDriverId: string, updated: CoreDriver) => {
      setKpiData((prev) => ({
        coreDrivers: prev.coreDrivers.map((cd) =>
          cd.id === coreDriverId ? updated : cd,
        ),
      }));
    },
    [],
  );

  const updateStrategicDriver = useCallback(
    (
      coreDriverId: string,
      strategicDriverId: string,
      updated: StrategicDriver,
    ) => {
      setKpiData((prev) => ({
        coreDrivers: prev.coreDrivers.map((cd) =>
          cd.id === coreDriverId
            ? {
                ...cd,
                strategicDrivers: cd.strategicDrivers.map((sd) =>
                  sd.id === strategicDriverId ? updated : sd,
                ),
              }
            : cd,
        ),
      }));
    },
    [],
  );

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {viewMode === "graph" && "Visual hierarchy of strategic KPIs"}
          {viewMode === "dashboard" && "Summary view with status overview"}
          {viewMode === "edit" && "Edit KPI values and status"}
          {viewMode === "hierarchy" && "Manage Core Drivers and Strategic Drivers"}
        </p>
        <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
          <Button
            variant={viewMode === "dashboard" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("dashboard")}
            className="h-8"
          >
            <LayoutGrid className="h-4 w-4 mr-1.5" />
            Dashboard
          </Button>
          <Button
            variant={viewMode === "graph" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("graph")}
            className="h-8"
          >
            <Network className="h-4 w-4 mr-1.5" />
            Graph
          </Button>
          <Button
            variant={viewMode === "edit" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("edit")}
            className="h-8"
          >
            <Pencil className="h-4 w-4 mr-1.5" />
            Edit
          </Button>
          <Button
            variant={viewMode === "hierarchy" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("hierarchy")}
            className="h-8"
          >
            <Settings className="h-4 w-4 mr-1.5" />
            Hierarchy
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "dashboard" && (
        <KPIDashboardView
          kpiData={optimisticData}
          users={users}
          onUpdateKeyResult={updateKeyResult}
        />
      )}
      {viewMode === "graph" && (
        <KPINetworkGraph
          kpiData={optimisticData}
          users={users}
          onUpdateKeyResult={updateKeyResult}
        />
      )}
      {viewMode === "edit" && (
        <KPIEditView
          kpiData={optimisticData}
          users={users}
          onUpdateKeyResult={updateKeyResult}
          onUpdateCoreDriver={updateCoreDriver}
          onUpdateStrategicDriver={updateStrategicDriver}
        />
      )}
      {viewMode === "hierarchy" && (
        <HierarchyManager
          onUpdate={() => {
            // Refresh data after hierarchy changes
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
