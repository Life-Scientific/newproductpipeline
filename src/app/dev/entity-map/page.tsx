"use client";

import { useEffect, useState } from "react";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  AlertTriangle,
  AlertCircle,
  ArrowLeft,
  Database,
  Eye,
  Loader2,
} from "lucide-react";
import Link from "next/link";

// Entity node definition
interface EntityNode {
  id: string;
  name: string;
  shortName?: string;
  table: string;
  view?: string;
  listPage?: string;
  detailPage?: string;
  status: "complete" | "partial" | "missing" | "critical";
  rowCount?: number;
  x: number;
  y: number;
  description?: string;
}

// Connection between nodes
interface Connection {
  from: string;
  to: string;
  label?: string;
}

// Node component
function EntityNodeComponent({ 
  node, 
  isSelected,
  onSelect,
}: { 
  node: EntityNode;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}) {
  const statusColors = {
    complete: "bg-green-500/10 border-green-500/50 hover:border-green-500",
    partial: "bg-yellow-500/10 border-yellow-500/50 hover:border-yellow-500",
    missing: "bg-red-500/10 border-red-500/50 hover:border-red-500",
    critical: "bg-destructive/20 border-destructive hover:border-destructive",
  };

  return (
    <g 
      transform={`translate(${node.x}, ${node.y})`}
      onClick={() => onSelect(isSelected ? null : node.id)}
      className="cursor-pointer"
    >
      {/* Node background */}
      <rect
        x={-70}
        y={-25}
        width={140}
        height={50}
        rx={8}
        className={`fill-background stroke-2 transition-all ${statusColors[node.status]} ${isSelected ? "stroke-primary stroke-[3px]" : ""}`}
      />
      
      {/* Status indicator */}
      <circle
        cx={55}
        cy={-10}
        r={8}
        className={`${
          node.status === "complete" ? "fill-green-500" :
          node.status === "partial" ? "fill-yellow-500" :
          node.status === "critical" ? "fill-destructive" :
          "fill-red-500"
        }`}
      />
      
      {/* Node name */}
      <text
        x={0}
        y={-2}
        textAnchor="middle"
        className="fill-foreground text-xs font-semibold"
      >
        {node.shortName || node.name}
      </text>
      
      {/* Row count */}
      {node.rowCount !== undefined && (
        <text
          x={0}
          y={14}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
        >
          {node.rowCount.toLocaleString()} rows
        </text>
      )}
    </g>
  );
}

// Connection line component
function ConnectionLine({ 
  from, 
  to, 
  nodes,
  label,
}: { 
  from: string; 
  to: string; 
  nodes: EntityNode[];
  label?: string;
}) {
  const fromNode = nodes.find(n => n.id === from);
  const toNode = nodes.find(n => n.id === to);
  
  if (!fromNode || !toNode) return null;
  
  const startX = fromNode.x;
  const startY = fromNode.y + 25;
  const endX = toNode.x;
  const endY = toNode.y - 25;
  
  // Calculate control points for curved line
  const midY = (startY + endY) / 2;
  
  const path = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
  
  return (
    <g>
      <path
        d={path}
        fill="none"
        className="stroke-muted-foreground/40"
        strokeWidth={2}
        markerEnd="url(#arrowhead)"
      />
      {label && (
        <text
          x={(startX + endX) / 2}
          y={midY}
          textAnchor="middle"
          className="fill-muted-foreground text-[9px]"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// Detail panel for selected node
function NodeDetailPanel({ node, onClose }: { node: EntityNode; onClose: () => void }) {
  const canLink = node.listPage && !node.listPage.includes("[");
  
  return (
    <Card className="absolute top-4 right-4 w-72 shadow-lg z-10">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{node.name}</CardTitle>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {node.description && (
          <CardDescription className="text-xs">{node.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            <Database className="h-3 w-3 mr-1" />
            {node.table}
          </Badge>
          {node.view && (
            <Badge variant="secondary" className="text-xs font-mono">
              <Eye className="h-3 w-3 mr-1" />
              {node.view}
            </Badge>
          )}
        </div>
        
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">List Page:</span>
            {node.listPage ? (
              canLink ? (
                <Link href={node.listPage} className="text-primary hover:underline">
                  View →
                </Link>
              ) : (
                <span className="text-green-600">✓ Inline</span>
              )
            ) : (
              <span className="text-red-500">Missing</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Detail Page:</span>
            {node.detailPage ? (
              <span className="text-green-600">✓ Exists</span>
            ) : (
              <span className="text-red-500">Missing</span>
            )}
          </div>
          {node.rowCount !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Row Count:</span>
              <span>{node.rowCount.toLocaleString()}</span>
            </div>
          )}
        </div>
        
        {node.status === "critical" && (
          <div className="p-2 bg-destructive/10 rounded text-xs text-destructive">
            ⚠️ Critical gap - needs UI implementation
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function EntityMapPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Fetch counts on mount
  useEffect(() => {
    // Use placeholder counts - in real app, fetch from API
    setCounts({
      formulations: 150,
      business_case: 7920,
      countries: 25,
      formulation_country_use_group: 792,
      ingredients: 85,
      patents: 0,
      reference_products: 0,
      suppliers: 0,
      cogs: 3960,
      formulation_country: 769,
    });
    setLoading(false);
  }, []);

  // Define nodes with positions
  const nodes: EntityNode[] = [
    // Top level - Formulations
    {
      id: "formulations",
      name: "Formulations",
      shortName: "Formulations",
      table: "formulations",
      view: "vw_formulations_with_ingredients",
      listPage: "/portfolio/formulations",
      detailPage: "/portfolio/formulations/[id]",
      status: "complete",
      rowCount: counts.formulations,
      x: 400,
      y: 60,
      description: "Core product formulations with ingredients",
    },
    
    // Second level
    {
      id: "formulation-countries",
      name: "Formulation Countries",
      shortName: "Form. Countries",
      table: "formulation_country",
      view: "vw_formulation_country_detail",
      listPage: "/portfolio/formulation-countries",
      detailPage: "/portfolio/formulation-countries/[id]",
      status: "complete",
      rowCount: counts.formulation_country,
      x: 250,
      y: 160,
      description: "Formulation registered in specific countries",
    },
    {
      id: "ingredients",
      name: "Ingredients",
      shortName: "Ingredients",
      table: "formulation_ingredients",
      listPage: "/portfolio/formulations/[id]#ingredients",
      status: "partial",
      x: 550,
      y: 160,
      description: "Junction table - shown in formulation detail",
    },
    
    // Third level
    {
      id: "use-groups",
      name: "Use Groups",
      shortName: "Use Groups",
      table: "formulation_country_use_group",
      view: "vw_formulation_country_use_group",
      listPage: "/portfolio/use-groups",
      detailPage: "/portfolio/use-groups/[id]",
      status: "complete",
      rowCount: counts.formulation_country_use_group,
      x: 250,
      y: 260,
      description: "Crop/target combinations for registration",
    },
    {
      id: "cogs",
      name: "COGS",
      shortName: "COGS",
      table: "cogs",
      view: "vw_cogs",
      listPage: "/portfolio/cogs",
      status: "partial",
      rowCount: counts.cogs,
      x: 100,
      y: 260,
      description: "Cost of Goods Sold - missing detail view",
    },
    
    // Fourth level - Business Cases
    {
      id: "business-cases",
      name: "Business Cases",
      shortName: "Business Cases",
      table: "business_case",
      view: "vw_business_case",
      listPage: "/portfolio/business-cases",
      detailPage: "/portfolio/business-cases/[id]",
      status: "complete",
      rowCount: counts.business_case,
      x: 250,
      y: 360,
      description: "10-year financial projections",
    },
    
    // Countries branch (right side)
    {
      id: "countries",
      name: "Countries",
      shortName: "Countries",
      table: "countries",
      listPage: "/portfolio/countries",
      detailPage: "/portfolio/countries/[id]",
      status: "complete",
      rowCount: counts.countries,
      x: 650,
      y: 260,
      description: "Country/market reference data",
    },
    {
      id: "markets",
      name: "Markets",
      shortName: "Markets",
      table: "countries",
      view: "vw_portfolio_by_country",
      listPage: "/portfolio/markets",
      detailPage: "/portfolio/markets/[countryId]",
      status: "complete",
      x: 650,
      y: 360,
      description: "Portfolio view by country",
    },
    
    // Active Ingredients branch
    {
      id: "active-ingredients",
      name: "Active Ingredients",
      shortName: "Active Ingr.",
      table: "ingredients",
      view: "vw_ingredient_usage",
      listPage: "/portfolio/active-ingredients",
      detailPage: "/portfolio/active-ingredients/[id]",
      status: "complete",
      rowCount: counts.ingredients,
      x: 550,
      y: 260,
      description: "Active ingredient analysis",
    },
    {
      id: "suppliers",
      name: "Suppliers",
      shortName: "Suppliers",
      table: "suppliers",
      status: "missing",
      rowCount: counts.suppliers,
      x: 550,
      y: 360,
      description: "Ingredient suppliers - needs pages",
    },
    
    // Patents branch (critical gap - bottom)
    {
      id: "patents",
      name: "Patents",
      shortName: "Patents",
      table: "patents",
      status: "critical",
      rowCount: counts.patents,
      x: 100,
      y: 380,
      description: "CRITICAL: No UI for patent management",
    },
    {
      id: "patent-assessments",
      name: "Patent Assessments",
      shortName: "Assessments",
      table: "patent_assessments",
      view: "vw_patent_assessments_effective",
      status: "critical",
      x: 100,
      y: 480,
      description: "Patent relevance assessments - no UI",
    },
    
    // Reference Products
    {
      id: "reference-products",
      name: "Reference Products",
      shortName: "Ref Products",
      table: "reference_products",
      status: "missing",
      rowCount: counts.reference_products,
      x: 400,
      y: 480,
      description: "Reference products - has form, no pages",
    },
  ];

  // Define connections
  const connections: Connection[] = [
    { from: "formulations", to: "formulation-countries", label: "in" },
    { from: "formulations", to: "ingredients", label: "has" },
    { from: "formulation-countries", to: "use-groups", label: "has" },
    { from: "formulation-countries", to: "cogs" },
    { from: "use-groups", to: "business-cases", label: "has" },
    { from: "formulation-countries", to: "countries", label: "for" },
    { from: "countries", to: "markets" },
    { from: "ingredients", to: "active-ingredients", label: "refs" },
    { from: "active-ingredients", to: "suppliers", label: "from" },
    { from: "cogs", to: "patents", label: "blocked by?" },
    { from: "patents", to: "patent-assessments" },
    { from: "use-groups", to: "reference-products", label: "vs" },
  ];

  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null;
  
  // Calculate stats
  const stats = {
    complete: nodes.filter(n => n.status === "complete").length,
    partial: nodes.filter(n => n.status === "partial").length,
    missing: nodes.filter(n => n.status === "missing").length,
    critical: nodes.filter(n => n.status === "critical").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
        <AnimatedPage>
          {/* Header */}
          <div className="space-y-2 mb-6">
            <Link 
              href="/dev" 
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Dev Tools
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">Entity Hierarchy</h1>
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
                Dev Tool
              </Badge>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Interactive node diagram showing database entities and their relationships.
              Click nodes for details.
            </p>
          </div>

          {/* Legend */}
          <Card className="mb-6">
            <CardContent className="py-3">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>{stats.complete} Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>{stats.partial} Partial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>{stats.missing} Missing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span>{stats.critical} Critical</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Node Diagram */}
          <Card className="relative">
            <CardHeader>
              <CardTitle>Entity Relationship Diagram</CardTitle>
              <CardDescription>
                Data flows from top to bottom. Click a node to see details.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <svg 
                  width="800" 
                  height="550" 
                  viewBox="0 0 800 550"
                  className="w-full min-w-[600px]"
                >
                  {/* Arrow marker definition */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        className="fill-muted-foreground/40"
                      />
                    </marker>
                  </defs>
                  
                  {/* Connection lines */}
                  {connections.map((conn, i) => (
                    <ConnectionLine 
                      key={i} 
                      from={conn.from} 
                      to={conn.to} 
                      nodes={nodes}
                      label={conn.label}
                    />
                  ))}
                  
                  {/* Nodes */}
                  {nodes.map(node => (
                    <EntityNodeComponent
                      key={node.id}
                      node={node}
                      isSelected={selectedNode === node.id}
                      onSelect={setSelectedNode}
                    />
                  ))}
                </svg>
              </div>
              
              {/* Detail panel */}
              {selectedNodeData && (
                <NodeDetailPanel 
                  node={selectedNodeData} 
                  onClose={() => setSelectedNode(null)} 
                />
              )}
            </CardContent>
          </Card>

          {/* Key Paths Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Key Data Paths</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="font-medium text-green-700 mb-1 flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Complete Path
                </div>
                <code className="text-xs text-muted-foreground">
                  Formulations → Form. Countries → Use Groups → Business Cases
                </code>
              </div>
              <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="font-medium text-destructive mb-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Critical Gap
                </div>
                <code className="text-xs text-muted-foreground">
                  Patents → Patent Assessments (no UI at all)
                </code>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                <div className="font-medium text-yellow-700 mb-1 flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  Partial Coverage
                </div>
                <code className="text-xs text-muted-foreground">
                  COGS (list only), Suppliers (no pages), Reference Products (form only)
                </code>
              </div>
            </CardContent>
          </Card>
        </AnimatedPage>
      </div>
    </div>
  );
}

