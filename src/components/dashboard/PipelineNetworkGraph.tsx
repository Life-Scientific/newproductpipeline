"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import { 
  FlaskConical, 
  Globe, 
  FileText, 
  DollarSign,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStatusVariant } from "@/lib/design-system";
import type { Database } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type FormulationCountryUseGroup = Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface PipelineNetworkGraphProps {
  formulations: Formulation[];
  countries: FormulationCountryDetail[];
  useGroups: FormulationCountryUseGroup[];
  businessCases: BusinessCase[];
  searchTerm: string;
  statusFilter: string;
}

// --- Custom Node Components ---

const FormulationNode = ({ data, selected }: NodeProps) => {
  const router = useRouter();
  
  return (
    <Card 
      className={cn(
        "w-[280px] border-2 shadow-lg hover:shadow-xl transition-all cursor-pointer bg-background",
        selected ? "border-primary ring-2 ring-primary/20" : "border-primary/20"
      )}
      onClick={() => router.push(`/formulations/${data.id}`)}
    >
      <CardContent className="p-4">
        <Handle type="source" position={Position.Right} className="!bg-primary !w-3 !h-3" />
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="bg-primary/10 p-2 rounded-md shrink-0">
                <FlaskConical className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm truncate" title={data.code}>{data.code}</div>
                <div className="text-[10px] text-muted-foreground truncate" title={data.name}>
                  {data.name || "No name"}
                </div>
              </div>
            </div>
            <Badge variant={getStatusVariant(data.status, 'formulation')} className="text-[10px] px-1.5 h-5 shrink-0">
              {data.status}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-xs pt-2 border-t">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-[10px]">Countries</span>
              <span className="font-semibold">{data.countryCount}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-muted-foreground text-[10px]">Revenue</span>
              <span className="font-bold text-primary">{data.revenue}</span>
            </div>
          </div>
          
          {data.revenueShare > 5 && (
            <div className="flex items-center gap-1 text-[10px] text-primary font-medium bg-primary/5 px-2 py-1 rounded">
              <TrendingUp className="h-3 w-3" />
              <span>{data.revenueShare}% of portfolio</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const CountryNode = ({ data, selected }: NodeProps) => {
  const router = useRouter();
  
  return (
    <Card 
      className={cn(
        "w-[220px] shadow-md hover:shadow-lg transition-all cursor-pointer bg-background",
        selected ? "border-2 border-blue-500 ring-2 ring-blue-500/20" : "border"
      )}
      onClick={() => router.push(`/formulation-countries/${data.id}`)}
    >
      <CardContent className="p-3">
        <Handle type="target" position={Position.Left} className="!bg-slate-400 !w-2.5 !h-2.5" />
        <Handle type="source" position={Position.Right} className="!bg-slate-400 !w-2.5 !h-2.5" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Globe className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="font-semibold text-sm truncate">{data.name}</span>
            </div>
            <Badge variant={getStatusVariant(data.status, 'country')} className="text-[10px] px-1 h-4 shrink-0">
              {data.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{data.useGroupCount} use groups</span>
            {data.revenue && data.revenue !== "€0" && (
              <span className="font-medium text-foreground">{data.revenue}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UseGroupNode = ({ data, selected }: NodeProps) => {
  const router = useRouter();
  
  return (
    <Card 
      className={cn(
        "w-[200px] border-dashed shadow-sm hover:shadow-md transition-all cursor-pointer",
        data.hasBusinessCase ? "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-800" : "bg-muted/20",
        selected && "ring-2 ring-green-500/30"
      )}
      onClick={() => router.push(`/use-groups/${data.id}`)}
    >
      <CardContent className="p-3">
        <Handle type="target" position={Position.Left} className="!bg-slate-300 !w-2 !h-2" />
        <Handle type="source" position={Position.Right} className="!bg-slate-300 !w-2 !h-2" />
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <FileText className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="font-medium text-xs truncate" title={data.variant}>
                {data.variant}
              </div>
              <div className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">
                {data.name}
              </div>
            </div>
          </div>
          {data.hasBusinessCase && (
            <div className="flex items-center gap-1 text-[10px] font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
              <DollarSign className="h-3 w-3" />
              <span>{data.businessCaseCount || 1} BC</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const BusinessCaseNode = ({ data, selected }: NodeProps) => {
  const router = useRouter();
  
  return (
    <Card 
      className={cn(
        "w-[160px] shadow-sm hover:shadow-md transition-all cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800",
        selected && "ring-2 ring-green-500/40 border-green-400"
      )}
      onClick={() => router.push(`/business-cases/${data.id}`)}
    >
      <CardContent className="p-2.5">
        <Handle type="target" position={Position.Left} className="!bg-green-500 !w-2 !h-2" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-green-600 dark:text-green-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-xs text-green-700 dark:text-green-300">
                {data.fiscalYear}
              </div>
              <div className="text-[10px] text-muted-foreground">
                Year {data.yearOffset}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 pt-1 border-t border-green-200 dark:border-green-800">
            <div className="text-xs font-bold text-green-700 dark:text-green-300">
              {data.revenue}
            </div>
            {data.margin && (
              <div className="text-[10px] text-muted-foreground">
                {data.margin}% margin
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const nodeTypes = {
  formulation: FormulationNode,
  country: CountryNode,
  useGroup: UseGroupNode,
  businessCase: BusinessCaseNode,
};

// --- Layout Helper ---

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const rankSep = 150;
  const nodeSep = 80;

  dagreGraph.setGraph({ rankdir: 'LR', ranksep: rankSep, nodesep: nodeSep });

  nodes.forEach((node) => {
    let width = 200;
    let height = 90;
    
    if (node.type === 'formulation') {
      width = 280;
      height = 150;
    } else if (node.type === 'country') {
      width = 220;
      height = 100;
    } else if (node.type === 'useGroup') {
      width = 200;
      height = 90;
    } else if (node.type === 'businessCase') {
      width = 160;
      height = 80;
    }
    
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    let width = 200;
    let height = 90;
    
    if (node.type === 'formulation') {
      width = 280;
      height = 150;
    } else if (node.type === 'country') {
      width = 220;
      height = 100;
    } else if (node.type === 'useGroup') {
      width = 200;
      height = 90;
    } else if (node.type === 'businessCase') {
      width = 160;
      height = 80;
    }
    
    node.position = {
      x: nodeWithPosition.x - width / 2,
      y: nodeWithPosition.y - height / 2,
    };
    return node;
  });

  return { nodes: layoutedNodes, edges };
};

export function PipelineNetworkGraph({
  formulations,
  countries,
  useGroups,
  businessCases,
  searchTerm,
  statusFilter,
}: PipelineNetworkGraphProps) {

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `€${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `€${(val / 1000).toFixed(0)}K`;
    return `€${val}`;
  };

  // Build graph elements
  const { nodes: initialNodes, edges: initialEdges, stats } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Filter logic
    const filteredFormulations = formulations.filter(f => {
      const matchesSearch = (
        (f.formulation_code?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (f.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      );
      const matchesStatus = statusFilter === "all" || f.formulation_status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Limit to prevent performance issues - be more conservative with business cases
    const formulationsToShow = filteredFormulations.length > 10 && !searchTerm 
      ? filteredFormulations.slice(0, 10) 
      : filteredFormulations;

    let totalRevenue = 0;
    let nodeCount = 0;

    formulationsToShow.forEach(f => {
      const fId = `f-${f.formulation_id}`;
      const fCountries = countries.filter(c => c.formulation_code === f.formulation_code);
      let fRevenue = 0;

      // Calculate revenue
      fCountries.forEach(c => {
        const cUseGroups = useGroups.filter(ug => ug.formulation_country_id === c.formulation_country_id);
        cUseGroups.forEach(ug => {
          const bcs = businessCases.filter(bc => bc.formulation_country_use_group_id === ug.formulation_country_use_group_id);
          bcs.forEach(bc => {
            fRevenue += bc.total_revenue || 0;
          });
        });
      });

      totalRevenue += fRevenue;

      // Add Formulation Node
      nodes.push({
        id: fId,
        type: 'formulation',
        data: { 
          id: f.formulation_id,
          code: f.formulation_code,
          name: f.product_name,
          status: f.formulation_status,
          revenue: formatCurrency(fRevenue),
          countryCount: fCountries.length,
          revenueShare: 0, // Will calculate after total known
        },
        position: { x: 0, y: 0 },
      });
      nodeCount++;

      fCountries.forEach(c => {
        const cId = `c-${c.formulation_country_id}`;
        const cUseGroups = useGroups.filter(ug => ug.formulation_country_id === c.formulation_country_id);
        
        // Calculate country revenue
        let cRevenue = 0;
        cUseGroups.forEach(ug => {
          const bcs = businessCases.filter(bc => bc.formulation_country_use_group_id === ug.formulation_country_use_group_id);
          bcs.forEach(bc => {
            cRevenue += bc.total_revenue || 0;
          });
        });

        // Add Country Node
        nodes.push({
          id: cId,
          type: 'country',
          data: {
            id: c.formulation_country_id,
            name: c.country_name,
            status: c.country_status,
            useGroupCount: cUseGroups.length,
            revenue: cRevenue > 0 ? formatCurrency(cRevenue) : null,
          },
          position: { x: 0, y: 0 },
        });
        nodeCount++;

        // Edge Formulation -> Country
        edges.push({
          id: `e-${fId}-${cId}`,
          source: fId,
          target: cId,
          type: 'smoothstep',
          animated: c.country_status === 'Active',
          style: { 
            stroke: c.country_status === 'Active' ? '#2563eb' : '#cbd5e1',
            strokeWidth: 2,
          },
        });

        cUseGroups.forEach(ug => {
          const ugId = `ug-${ug.formulation_country_use_group_id}`;
          const ugBusinessCases = businessCases.filter(bc => bc.formulation_country_use_group_id === ug.formulation_country_use_group_id);
          const hasBC = ugBusinessCases.length > 0;

          // Add Use Group Node
          nodes.push({
            id: ugId,
            type: 'useGroup',
            data: {
              id: ug.formulation_country_use_group_id,
              name: ug.use_group_name,
              variant: ug.use_group_variant,
              hasBusinessCase: hasBC,
              businessCaseCount: ugBusinessCases.length,
            },
            position: { x: 0, y: 0 },
          });
          nodeCount++;

          // Edge Country -> Use Group
          edges.push({
            id: `e-${cId}-${ugId}`,
            source: cId,
            target: ugId,
            type: 'smoothstep',
            animated: hasBC,
            style: { 
              stroke: hasBC ? '#22c55e' : '#e2e8f0',
              strokeWidth: hasBC ? 2 : 1,
            },
          });

          // Add Business Case Nodes
          ugBusinessCases.forEach(bc => {
            const bcId = `bc-${bc.business_case_id}`;
            const bcRevenue = bc.total_revenue || 0;
            const bcMargin = bc.margin_percent || 0;

            nodes.push({
              id: bcId,
              type: 'businessCase',
              data: {
                id: bc.business_case_id,
                fiscalYear: bc.fiscal_year || `FY${bc.year_offset}`,
                yearOffset: bc.year_offset,
                revenue: formatCurrency(bcRevenue),
                margin: bcMargin > 0 ? bcMargin.toFixed(0) : null,
              },
              position: { x: 0, y: 0 },
            });
            nodeCount++;

            // Edge Use Group -> Business Case
            edges.push({
              id: `e-${ugId}-${bcId}`,
              source: ugId,
              target: bcId,
              type: 'smoothstep',
              animated: bcRevenue > 0,
              style: { 
                stroke: bcRevenue > 0 ? '#10b981' : '#e2e8f0',
                strokeWidth: bcRevenue > 100000 ? 3 : 1.5,
              },
            });
          });
        });
      });
    });

    // Update revenue share for formulation nodes
    nodes.forEach(node => {
      if (node.type === 'formulation' && node.data.revenue !== "€0") {
        const revenue = parseFloat(node.data.revenue.replace(/[€MK,]/g, ''));
        const multiplier = node.data.revenue.includes('M') ? 1000000 : (node.data.revenue.includes('K') ? 1000 : 1);
        const actualRevenue = revenue * multiplier;
        node.data.revenueShare = totalRevenue > 0 ? Math.round((actualRevenue / totalRevenue) * 100) : 0;
      }
    });

    return { 
      ...getLayoutedElements(nodes, edges),
      stats: {
        nodeCount,
        edgeCount: edges.length,
        totalRevenue,
      }
    };
  }, [formulations, countries, useGroups, businessCases, searchTerm, statusFilter]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when data changes
  useMemo(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  if (initialNodes.length === 0) {
     return (
      <Card className="h-[600px] flex flex-col items-center justify-center">
        <CardContent className="text-center space-y-2">
          <p className="text-muted-foreground">No items to display in network graph.</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or status filter.</p>
        </CardContent>
      </Card>
    );
  }
  
  if (initialNodes.length > 500) {
    return (
      <Card className="h-[600px] flex flex-col items-center justify-center">
        <CardContent className="text-center space-y-4 max-w-md">
          <p className="text-lg font-semibold">Too many items to visualize</p>
          <p className="text-muted-foreground">
            The network graph shows {initialNodes.length} nodes, which may impact performance.
          </p>
          <p className="text-sm text-muted-foreground">
            Please search for a specific formulation or use the table view for large datasets.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="h-[700px] relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.1}
            maxZoom={1.5}
            defaultEdgeOptions={{
              type: 'smoothstep',
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 16,
                height: 16,
                color: '#94a3b8',
              },
            }}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
          >
            <Background color="#94a3b8" gap={20} size={1} />
            <Controls showInteractive={false} />
            <MiniMap 
              zoomable 
              pannable 
              nodeColor={(node) => {
                if (node.type === 'formulation') return '#3b82f6';
                if (node.type === 'country') return '#6366f1';
                if (node.type === 'useGroup') return '#22c55e';
                if (node.type === 'businessCase') return '#10b981';
                return '#94a3b8';
              }}
            />
          </ReactFlow>
          
          {/* Stats Overlay */}
          <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur border rounded-lg shadow-lg p-3 text-xs space-y-1">
            <div className="font-semibold">Network Stats</div>
            <div className="text-muted-foreground">
              {stats.nodeCount} nodes • {stats.edgeCount} edges
            </div>
            <div className="text-muted-foreground">
              Click nodes to navigate
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
