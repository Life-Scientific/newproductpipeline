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
import { KPIDetailModal } from "./KPIDetailModal";
import type { UserManagementData } from "@/lib/actions/user-management";
import type {
  KPIData,
  CoreDriver,
  StrategicDriver,
  KeyResult,
} from "@/lib/kpi-dashboard/mock-data";
import { cn } from "@/lib/utils";
import { Target, TrendingUp, BarChart3 } from "lucide-react";

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
  onKRClick: (kr: KeyResult, sdLabel: string) => void;
}>) => {
  return (
    <Card
      className={cn(
        "w-[260px] shadow-sm hover:shadow-md transition-all bg-background",
        selected ? "border-chart-2 ring-2 ring-chart-2/20" : "border",
      )}
    >
      <CardContent className="p-2.5">
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-chart-2 !w-2 !h-2 !border-2 !border-background"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-3.5 w-3.5 text-chart-2 shrink-0" />
            <span className="font-medium text-xs leading-tight">{data.strategicDriver.label}</span>
          </div>
          <div className="space-y-1">
            {data.strategicDriver.keyResults.map((kr) => (
              <button
                key={kr.id}
                onClick={(e) => {
                  e.stopPropagation();
                  data.onKRClick(kr, data.strategicDriver.label);
                }}
                className="w-full flex items-center justify-between gap-2 text-[10px] bg-muted/50 hover:bg-muted rounded px-2 py-1 transition-colors text-left"
              >
                <span className="truncate" title={kr.label}>
                  {kr.label}
                </span>
                <Badge
                  variant={statusConfig[kr.status].variant}
                  className="text-[9px] px-1.5 h-4 shrink-0"
                >
                  {statusConfig[kr.status].label}
                </Badge>
              </button>
            ))}
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
  dagreGraph.setGraph({ rankdir: "LR", ranksep: 100, nodesep: 30, edgesep: 15 });

  nodes.forEach((node) => {
    let width = 240;
    let height = 90;

    if (node.type === "shareholderValue") {
      width = 200;
      height = 70;
    } else if (node.type === "coreDriver") {
      width = 240;
      height = 100;
    } else if (node.type === "strategicDriver") {
      const krCount = (node.data as any)?.strategicDriver?.keyResults?.length || 1;
      height = 55 + krCount * 24;
      width = 260;
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
  }, [kpiData]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

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
