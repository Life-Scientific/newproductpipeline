"use client";

import { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
  Handle,
  MarkerType,
  Node,
  Edge,
  NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KPIDetailModal } from "./KPIDetailModal";
import { OwnerDisplay } from "./OwnerDisplay";
import type { UserManagementData } from "@/lib/actions/user-management";
import type {
  KPIData,
  CoreDriver,
  StrategicDriver,
  KeyResult,
} from "@/lib/kpi-dashboard/types";
import { cn } from "@/lib/utils";
import { Target, TrendingUp, BarChart3, Lock, TrendingDown, Minus, Clock } from "lucide-react";

interface KPINetworkGraphProps {
  kpiData: KPIData;
  users: UserManagementData[];
  onUpdateKeyResult?: (
    coreDriverId: string,
    strategicDriverId: string,
    keyResultId: string,
    updated: KeyResult,
  ) => void;
}

// Status badge variants matching design system
const statusConfig = {
  red: { variant: "destructive" as const, label: "At Risk" },
  yellow: { variant: "warning" as const, label: "Attention" },
  green: { variant: "success" as const, label: "On Track" },
};

// --- Custom Node Components ---

const ShareholderValueNode = ({ selected }: NodeProps) => {
  return (
    <Card
      className={cn(
        "w-[200px] border-2 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10 border-primary/30",
        selected && "ring-2 ring-primary/30",
      )}
    >
      <CardContent className="p-3">
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-primary !w-3 !h-3 !border-2 !border-background"
        />
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 p-2 rounded-md">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="text-sm font-bold leading-tight">
            Long-term<br />Shareholder Value
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CoreDriverNode = ({ data, selected }: NodeProps<{ coreDriver: CoreDriver }>) => {
  const statusCounts = data.coreDriver.strategicDrivers.reduce(
    (acc, sd) => {
      sd.keyResults.forEach((kr) => acc[kr.status]++);
      return acc;
    },
    { red: 0, yellow: 0, green: 0 },
  );
  const total = statusCounts.red + statusCounts.yellow + statusCounts.green;

  return (
    <Card
      className={cn(
        "w-[240px] border shadow-md hover:shadow-lg transition-all bg-background",
        selected ? "border-primary ring-2 ring-primary/20" : "border-border",
      )}
    >
      <CardContent className="p-3">
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-muted-foreground !w-2.5 !h-2.5 !border-2 !border-background"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-muted-foreground !w-2.5 !h-2.5 !border-2 !border-background"
        />
        <div className="flex flex-col gap-2.5">
          <div className="flex items-start gap-2">
            <div className="bg-chart-1/10 p-1.5 rounded-md shrink-0">
              <TrendingUp className="h-4 w-4 text-chart-1" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm leading-tight">{data.coreDriver.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{data.coreDriver.target}</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs pt-2 border-t">
            <span className="text-muted-foreground">{total} KPIs</span>
            <div className="flex items-center gap-1.5">
              {statusCounts.green > 0 && (
                <span className="flex items-center gap-0.5 text-green-600 dark:text-green-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {statusCounts.green}
                </span>
              )}
              {statusCounts.yellow > 0 && (
                <span className="flex items-center gap-0.5 text-yellow-600 dark:text-yellow-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  {statusCounts.yellow}
                </span>
              )}
              {statusCounts.red > 0 && (
                <span className="flex items-center gap-0.5 text-red-600 dark:text-red-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  {statusCounts.red}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StrategicDriverNode = ({
  data,
  selected,
}: NodeProps<{
  strategicDriver: StrategicDriver;
  coreDriverId: string;
  coreDriverLabel: string;
  getUserName: (ownerId: string | null) => string | null;
  getUserEmail: (ownerId: string | null) => string | null;
  onKRClick: (kr: KeyResult, sdLabel: string) => void;
}>) => {
  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1d";
    if (diffDays < 7) return `${diffDays}d`;
    return `${Math.floor(diffDays / 7)}w`;
  };

  const krCount = data.strategicDriver.keyResults.length;
  const maxKpisPerRow = 2; // Stagger 2 KPIs per row
  const rows = Math.ceil(krCount / maxKpisPerRow);

  return (
    <Card
      className={cn(
        "shadow-sm hover:shadow-md transition-all bg-background min-w-[500px]",
        selected ? "border-chart-2 ring-2 ring-chart-2/20" : "border",
      )}
    >
      <CardContent className="p-3">
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-chart-2 !w-2 !h-2 !border-2 !border-background"
        />
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2 pb-1.5 border-b">
            <BarChart3 className="h-4 w-4 text-chart-2 shrink-0" />
            <span className="font-semibold text-xs leading-tight">{data.strategicDriver.label}</span>
          </div>
          {/* Horizontal staggered grid of KPIs */}
          <div className="grid grid-cols-2 gap-2">
            {data.strategicDriver.keyResults.map((kr, index) => {
              const TrendIcon = kr.trend === "up" ? TrendingUp : kr.trend === "down" ? TrendingDown : Minus;
              return (
                <button
                  key={kr.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    data.onKRClick(kr, data.strategicDriver.label);
                  }}
                  className="flex flex-col gap-1 text-[10px] bg-muted/50 hover:bg-muted rounded px-2 py-1.5 transition-colors text-left border border-transparent hover:border-border"
                >
                  {/* Header: Label + Status */}
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="truncate font-medium text-[10px] leading-tight flex-1" title={kr.label}>
                      {kr.label}
                    </span>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {kr.trend && (
                        <TrendIcon
                          className={cn(
                            "h-2.5 w-2.5",
                            kr.trend === "up" && "text-green-500",
                            kr.trend === "down" && "text-red-500",
                            kr.trend === "flat" && "text-muted-foreground",
                          )}
                          title={`Trend: ${kr.trend}`}
                        />
                      )}
                      <Badge
                        variant={statusConfig[kr.status].variant}
                        className="text-[8px] px-1 h-3.5 shrink-0"
                      >
                        {statusConfig[kr.status].label}
                      </Badge>
                    </div>
                  </div>

                  {/* Values */}
                  {kr.target && (
                    <div className="text-[9px] font-medium tabular-nums text-muted-foreground">
                      {kr.reality || "—"} / {kr.target}
                    </div>
                  )}

                  {/* Footer: Owner + Meta */}
                  <div className="flex items-center justify-between gap-1.5 pt-0.5 border-t">
                    {data.getUserName(kr.ownerId) ? (
                      <div className="flex items-center gap-1 min-w-0 flex-1">
                        <Avatar className="h-3 w-3 shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-[7px] leading-none">
                            {data.getUserName(kr.ownerId)
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2) || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[8px] text-muted-foreground truncate">
                          {data.getUserName(kr.ownerId)}
                        </span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-[7px] px-1 h-3">
                        —
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 shrink-0">
                      {kr.isLocked && (
                        <Lock className="h-2.5 w-2.5 text-muted-foreground" title="Locked" />
                      )}
                      <div className="flex items-center gap-0.5 text-[7px] text-muted-foreground">
                        <Clock className="h-2 w-2" />
                        {formatRelativeTime(kr.lastUpdated)}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const nodeTypes = {
  shareholderValue: ShareholderValueNode,
  coreDriver: CoreDriverNode,
  strategicDriver: StrategicDriverNode,
};

// --- Layout Helper ---
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "LR", ranksep: 120, nodesep: 50, edgesep: 20 });

  nodes.forEach((node) => {
    let width = 240;
    let height = 90;

    if (node.type === "shareholderValue") {
      width = 200;
      height = 70;
    } else if (node.type === "coreDriver") {
      width = 240;
      height = 100;
    } else     if (node.type === "strategicDriver") {
      const krCount = (node.data as any)?.strategicDriver?.keyResults?.length || 1;
      const rows = Math.ceil(krCount / 2); // 2 KPIs per row
      height = 50 + rows * 65; // Reduced height due to horizontal layout
      width = 500; // Wider for horizontal KPIs
    }

    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const pos = dagreGraph.node(node.id);
      const info = dagreGraph.node(node.id);
      return {
        ...node,
        position: { x: pos.x - info.width / 2, y: pos.y - info.height / 2 },
      };
    }),
    edges,
  };
};

export function KPINetworkGraph({
  kpiData,
  users,
  onUpdateKeyResult,
}: KPINetworkGraphProps) {
  const [selectedKR, setSelectedKR] = useState<{
    keyResult: KeyResult;
    coreDriverId: string;
    coreDriverLabel: string;
    strategicDriverId: string;
    strategicDriverLabel: string;
  } | null>(null);

  const getUserName = (ownerId: string | null) => {
    if (!ownerId) return null;
    const user = users.find((u) => u.id === ownerId);
    return user?.email?.split("@")[0] || null;
  };

  const getUserEmail = (ownerId: string | null) => {
    if (!ownerId) return null;
    const user = users.find((u) => u.id === ownerId);
    return user?.email || null;
  };

  const handleKRClick = (
    kr: KeyResult,
    coreDriverId: string,
    coreDriverLabel: string,
    strategicDriverId: string,
    strategicDriverLabel: string,
  ) => {
    setSelectedKR({
      keyResult: kr,
      coreDriverId,
      coreDriverLabel,
      strategicDriverId,
      strategicDriverLabel,
    });
  };

  const handleKRUpdate = (updated: KeyResult) => {
    if (selectedKR && onUpdateKeyResult) {
      onUpdateKeyResult(
        selectedKR.coreDriverId,
        selectedKR.strategicDriverId,
        updated.id,
        updated,
      );
      setSelectedKR({ ...selectedKR, keyResult: updated });
    }
  };

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    if (kpiData.coreDrivers.length === 0) {
      return { nodes: [], edges: [] };
    }

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({
      id: "shareholder-value",
      type: "shareholderValue",
      position: { x: 0, y: 0 },
      data: {},
    });

    kpiData.coreDrivers.forEach((coreDriver) => {
      nodes.push({
        id: `core-${coreDriver.id}`,
        type: "coreDriver",
        position: { x: 0, y: 0 },
        data: { coreDriver },
      });

      edges.push({
        id: `e-shareholder-${coreDriver.id}`,
        source: "shareholder-value",
        target: `core-${coreDriver.id}`,
        type: "smoothstep",
        style: { stroke: "#94a3b8", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16, color: "#94a3b8" },
      });

      coreDriver.strategicDrivers.forEach((sd) => {
        nodes.push({
          id: `strategic-${sd.id}`,
          type: "strategicDriver",
          position: { x: 0, y: 0 },
          data: {
            strategicDriver: sd,
            coreDriverId: coreDriver.id,
            coreDriverLabel: coreDriver.label,
            getUserName,
            getUserEmail,
            onKRClick: (kr: KeyResult, sdLabel: string) =>
              handleKRClick(kr, coreDriver.id, coreDriver.label, sd.id, sdLabel),
          },
        });

        edges.push({
          id: `e-${coreDriver.id}-${sd.id}`,
          source: `core-${coreDriver.id}`,
          target: `strategic-${sd.id}`,
          type: "smoothstep",
          style: { stroke: "#cbd5e1", strokeWidth: 1.5 },
          markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: "#cbd5e1" },
        });
      });
    });

    return getLayoutedElements(nodes, edges);
  }, [kpiData, getUserName, getUserEmail]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  if (kpiData.coreDrivers.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No KPIs yet. Create core drivers and strategic drivers to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="overflow-hidden flex-1">
        <CardContent className="p-0 h-full">
          <div className="h-[calc(100vh-220px)] min-h-[500px] relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.05, minZoom: 0.7, maxZoom: 1.2 }}
              minZoom={0.3}
              maxZoom={2}
              nodesDraggable={true}
              nodesConnectable={false}
              elementsSelectable={true}
            >
              <Background color="#e2e8f0" gap={24} size={1} />
              <Controls showInteractive={false} className="!shadow-lg !border !rounded-lg" />
              <MiniMap
                nodeColor={(node) => {
                  if (node.type === "shareholderValue") return "#1e293b";
                  if (node.type === "coreDriver") return "#f97316";
                  if (node.type === "strategicDriver") return "#06b6d4";
                  return "#94a3b8";
                }}
                maskColor="rgba(255,255,255,0.8)"
                className="!shadow-lg !border !rounded-lg !bg-white"
                pannable
                zoomable
              />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <KPIDetailModal
        keyResult={selectedKR?.keyResult || null}
        users={users}
        onUpdate={handleKRUpdate}
        onClose={() => setSelectedKR(null)}
        coreDriverLabel={selectedKR?.coreDriverLabel}
        strategicDriverLabel={selectedKR?.strategicDriverLabel}
      />
    </>
  );
}
