"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Network, Pencil } from "lucide-react";
import type { UserManagementData } from "@/lib/actions/user-management";
import type {
  KPIData,
  CoreDriver,
  StrategicDriver,
  KeyResult,
} from "@/lib/kpi-dashboard/mock-data";
import { initialKPIData } from "@/lib/kpi-dashboard/mock-data";
import { KPINetworkGraph } from "./KPINetworkGraph";
import { KPIDashboardView } from "./KPIDashboardView";
import { KPIEditView } from "./KPIEditView";

interface KPIDashboardProps {
  users: UserManagementData[];
}

type ViewMode = "graph" | "dashboard" | "edit";

export function KPIDashboard({ users }: KPIDashboardProps) {
  const [kpiData, setKpiData] = useState<KPIData>(initialKPIData);
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");

  const updateKeyResult = useCallback(
    (
      coreDriverId: string,
      strategicDriverId: string,
      keyResultId: string,
      updated: KeyResult,
    ) => {
      const updatedWithTimestamp = {
        ...updated,
        lastUpdated: new Date().toISOString(),
      };

      setKpiData((prev) => ({
        coreDrivers: prev.coreDrivers.map((cd) =>
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
      }));
    },
    [],
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
        </div>
      </div>

      {/* Content */}
      {viewMode === "dashboard" && (
        <KPIDashboardView
          kpiData={kpiData}
          users={users}
          onUpdateKeyResult={updateKeyResult}
        />
      )}
      {viewMode === "graph" && (
        <KPINetworkGraph
          kpiData={kpiData}
          users={users}
          onUpdateKeyResult={updateKeyResult}
        />
      )}
      {viewMode === "edit" && (
        <KPIEditView
          kpiData={kpiData}
          users={users}
          onUpdateKeyResult={updateKeyResult}
          onUpdateCoreDriver={updateCoreDriver}
          onUpdateStrategicDriver={updateStrategicDriver}
        />
      )}
    </div>
  );
}
