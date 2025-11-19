"use client";

import { useCallback, useMemo } from "react";
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
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
import { 
  FlaskConical, 
  Globe, 
  FileText, 
  DollarSign 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getStatusVariant } from "@/lib/design-system";
import type { Database } from "@/lib/supabase/database.types";

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

const FormulationNode = ({ data }: { data: any }) => (
  <Card className="w-[250px] border-2 border-primary/20 shadow-sm hover:shadow-md transition-shadow bg-background">
    <CardContent className="p-3">
      <Handle type="source" position={Position.Right} className="!bg-primary/50" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <FlaskConical className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-sm">{data.code}</span>
          </div>
          <Badge variant={getStatusVariant(data.status, 'formulation')} className="text-[10px] px-1.5 h-5">
            {data.status}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground line-clamp-1" title={data.name}>
          {data.name}
        </div>
        <div className="flex items-center justify-between text-xs pt-2 border-t mt-1">
          <span className="text-muted-foreground">Revenue</span>
          <span className="font-medium">{data.revenue}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CountryNode = ({ data }: { data: any }) => (
  <Card className="w-[200px] shadow-sm hover:shadow-md transition-shadow bg-background">
    <CardContent className="p-3">
      <Handle type="target" position={Position.Left} className="!bg-muted-foreground/50" />
      <Handle type="source" position={Position.Right} className="!bg-muted-foreground/50" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium text-sm truncate">{data.name}</span>
          </div>
          <Badge variant={getStatusVariant(data.status, 'country')} className="text-[10px] px-1 h-4">
            {data.status}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground flex justify-between">
          <span>Use Groups: {data.useGroupCount}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const UseGroupNode = ({ data }: { data: any }) => (
  <Card className="w-[180px] border-dashed shadow-none bg-muted/20 hover:bg-muted/30 transition-colors">
    <CardContent className="p-2.5">
      <Handle type="target" position={Position.Left} className="!bg-muted-foreground/30" />
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <FileText className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium text-xs truncate" title={data.name}>
            {data.variant}
          </span>
        </div>
        <div className="text-[10px] text-muted-foreground line-clamp-1">
          {data.name}
        </div>
        {data.hasBusinessCase && (
           <div className="flex items-center gap-1 mt-1 text-[10px] font-medium text-primary">
             <DollarSign className="h-3 w-3" />
             <span>Active BC</span>
           </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const nodeTypes = {
  formulation: FormulationNode,
  country: CountryNode,
  useGroup: UseGroupNode,
};

// --- Layout Helper ---

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 250;
  const nodeHeight = 100;
  const rankSep = 100;
  const nodeSep = 50;

  dagreGraph.setGraph({ rankdir: 'LR', ranksep: rankSep, nodesep: nodeSep });

  nodes.forEach((node) => {
    // Adjust dimensions based on node type if needed
    const width = node.type === 'formulation' ? 250 : (node.type === 'country' ? 200 : 180);
    const height = node.type === 'formulation' ? 120 : (node.type === 'country' ? 90 : 80);
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - (node.type === 'formulation' ? 250 : (node.type === 'country' ? 200 : 180)) / 2,
      y: nodeWithPosition.y - (node.type === 'formulation' ? 120 : (node.type === 'country' ? 90 : 80)) / 2,
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

  // Format currency helper
  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `€${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `€${(val / 1000).toFixed(0)}K`;
    return `€${val}`;
  };

  // Build graph elements
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Filter logic (replicated from dashboard for consistency)
    const filteredFormulations = formulations.filter(f => {
      const matchesSearch = (
        (f.formulation_code?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (f.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      );
      const matchesStatus = statusFilter === "all" || f.formulation_status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // We limit the number of formulations shown in graph view to prevent performance issues
    // If no filter, maybe just show top 5 by default or all if < 20
    const formulationsToShow = filteredFormulations.length > 20 && !searchTerm 
      ? filteredFormulations.slice(0, 10) 
      : filteredFormulations;

    formulationsToShow.forEach(f => {
      const fId = `f-${f.formulation_id}`;
      
      // Calculate total revenue for formulation
      const fCountries = countries.filter(c => c.formulation_code === f.formulation_code);
      let fRevenue = 0;

      // Add Formulation Node
      nodes.push({
        id: fId,
        type: 'formulation',
        data: { 
          code: f.formulation_code,
          name: f.product_name,
          status: f.formulation_status,
          revenue: "calculating..." // Placeholder, updated below
        },
        position: { x: 0, y: 0 }, // Set by dagre
      });

      fCountries.forEach(c => {
        const cId = `c-${c.formulation_country_id}`;
        const cUseGroups = useGroups.filter(ug => ug.formulation_country_id === c.formulation_country_id);
        
        // Add Country Node
        nodes.push({
          id: cId,
          type: 'country',
          data: {
            name: c.country_name,
            status: c.country_status,
            useGroupCount: cUseGroups.length
          },
          position: { x: 0, y: 0 },
        });

        // Edge Formulation -> Country
        edges.push({
          id: `e-${fId}-${cId}`,
          source: fId,
          target: cId,
          type: 'smoothstep',
          animated: c.country_status === 'Active',
          style: { stroke: c.country_status === 'Active' ? '#2563eb' : '#e2e8f0' },
        });

        cUseGroups.forEach(ug => {
          const ugId = `ug-${ug.formulation_country_use_group_id}`;
          const hasBC = businessCases.some(bc => bc.formulation_country_use_group_id === ug.formulation_country_use_group_id);
          
          if (hasBC) {
             const bcRevenue = businessCases
               .filter(bc => bc.formulation_country_use_group_id === ug.formulation_country_use_group_id)
               .reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
             fRevenue += bcRevenue;
          }

          // Add Use Group Node
          nodes.push({
            id: ugId,
            type: 'useGroup',
            data: {
              name: ug.use_group_name,
              variant: ug.use_group_variant,
              hasBusinessCase: hasBC
            },
            position: { x: 0, y: 0 },
          });

          // Edge Country -> Use Group
          edges.push({
            id: `e-${cId}-${ugId}`,
            source: cId,
            target: ugId,
            type: 'smoothstep',
            style: { stroke: '#e2e8f0' },
          });
        });
      });

      // Update formulation revenue display
      const fNode = nodes.find(n => n.id === fId);
      if (fNode) {
        fNode.data.revenue = formatCurrency(fRevenue);
      }
    });

    return getLayoutedElements(nodes, edges);
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
      <div className="h-[500px] flex items-center justify-center border rounded-lg bg-muted/10 text-muted-foreground">
        No items to display in graph. Try adjusting your search.
      </div>
    );
  }
  
  if (initialNodes.length > 300) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center border rounded-lg bg-muted/10 text-muted-foreground p-4 text-center gap-2">
        <p>Too many items to display ({initialNodes.length} nodes).</p>
        <p className="text-sm">Please search for a specific formulation to view its network.</p>
      </div>
    );
  }

  return (
    <div className="h-[600px] border rounded-lg bg-slate-50 dark:bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: 'smoothstep',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#94a3b8',
          },
        }}
      >
        <Background color="#94a3b8" gap={16} size={1} />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>
    </div>
  );
}

