"use client";

import { useState, useMemo } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CardGrid } from "@/components/layout/CardGrid";
import { ContentCard } from "@/components/layout/ContentCard";
import { PortfolioHealthScore } from "@/components/dashboard/PortfolioHealthScore";
import { ActionItemsWidget, type ActionItem } from "@/components/dashboard/ActionItemsWidget";
import { RiskOpportunityMatrix } from "./RiskOpportunityMatrix";
import { CountryAttractivenessHeatmap } from "./CountryAttractivenessHeatmap";
import { ResourceAllocationChart } from "./ResourceAllocationChart";
import { SegmentRevenueMatrix } from "./SegmentRevenueMatrix";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];
type ProtectionStatus = Database["public"]["Views"]["vw_patent_protection_status"]["Row"];
type ActivePortfolio = Database["public"]["Views"]["vw_active_portfolio"]["Row"];

interface PortfolioStrategyDashboardProps {
  formulations: Formulation[];
  businessCases: BusinessCase[];
  activePortfolio: ActivePortfolio[];
  protectionStatus: ProtectionStatus[];
}

export function PortfolioStrategyDashboard({
  formulations,
  businessCases,
  activePortfolio,
  protectionStatus,
}: PortfolioStrategyDashboardProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFormulations = formulations.filter(f => {
    const category = ("formulation_category" in f ? (f as any).formulation_category : ("product_category" in f ? f.product_category : null)) as string | null;
    const matchesCategory = categoryFilter === "all" || category === categoryFilter;
    const name = ("formulation_name" in f ? (f as any).formulation_name : ("product_name" in f ? f.product_name : null)) as string | null;
    const matchesSearch = !searchTerm || 
      name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.formulation_code?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredBusinessCases = businessCases.filter(bc => {
    return filteredFormulations.some(f => f.formulation_id === bc.formulation_id);
  });

  const categories = Array.from(new Set(formulations.map(f => ("formulation_category" in f ? (f as any).formulation_category : ("product_category" in f ? f.product_category : null)) as string | null).filter(Boolean)));

  // Calculate Health Score
  const healthMetrics = useMemo(() => {
    const totalFormulations = formulations.length || 1;
    const formulationsWithBC = new Set(businessCases.map(bc => bc.formulation_id)).size;
    const pipelineScore = (formulationsWithBC / totalFormulations) * 100;
    
    const avgMargin = businessCases.length > 0 
      ? businessCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / businessCases.length
      : 0;
    const marginScore = Math.min(100, (avgMargin / 40) * 100);
    
    const activeCount = activePortfolio.length;
    const activeScore = (activeCount / totalFormulations) * 100;
    
    const healthScore = Math.round((pipelineScore * 0.4) + (marginScore * 0.4) + (activeScore * 0.2));
    
    return {
      healthScore,
      pipelineScore,
      avgMargin,
      activeCount,
      pendingReview: formulations.filter(f => ("formulation_readiness" in f ? (f as any).formulation_readiness : null) === 'Nominated for Review').length,
    };
  }, [formulations, businessCases, activePortfolio]);

  // Generate Action Items
  const actionItems = useMemo<ActionItem[]>(() => {
    const items: ActionItem[] = [];
    
    // Formulations needing review
    const pendingReview = formulations.filter(f => ("formulation_readiness" in f ? (f as any).formulation_readiness : null) === 'Nominated for Review');
    pendingReview.slice(0, 3).forEach(f => {
      const name = ("formulation_name" in f ? (f as any).formulation_name : ("product_name" in f ? f.product_name : null)) as string | null;
      items.push({
        id: `review-${f.formulation_id}`,
        title: "Review Formulation",
        description: `${name || f.formulation_code} is nominated for review`,
        priority: "medium",
        type: "review",
        href: `/formulations/${f.formulation_id}`,
      });
    });
    
    // Expiring Patents
    const now = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(now.getFullYear() + 1);
    
    protectionStatus.forEach(p => {
      if (p.earliest_ingredient_patent_expiry) {
        const expiry = new Date(p.earliest_ingredient_patent_expiry);
        if (expiry > now && expiry < nextYear) {
          items.push({
            id: `patent-${p.formulation_code}-${p.country_name}`,
            title: "Patent Expiring Soon",
            description: `${p.formulation_code} patent in ${p.country_name} expires ${expiry.toLocaleDateString()}`,
            priority: "high",
            type: "patent",
            dueDate: p.earliest_ingredient_patent_expiry,
            href: "/patent-landscape",
          });
        }
      }
    });
    
    return items;
  }, [formulations, protectionStatus]);

  return (
    <PageLayout
      title="Portfolio Strategy"
      description="Strategic analysis of portfolio performance, risk, and opportunities."
      variant="multi"
      action={
        <div className="flex items-center gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat as string} value={cat as string}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input 
            placeholder="Search formulations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px]"
          />
        </div>
      }
    >
      {/* Portfolio Health Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col gap-6">
          <PortfolioHealthScore 
            score={healthMetrics.healthScore} 
            trend={5}
            metrics={[
              { label: "Pipeline Coverage", value: `${Math.round(healthMetrics.pipelineScore)}%`, status: healthMetrics.pipelineScore > 70 ? "good" : "warning" },
              { label: "Avg Margin", value: `${healthMetrics.avgMargin.toFixed(1)}%`, status: healthMetrics.avgMargin > 30 ? "good" : "warning" },
              { label: "Active Products", value: healthMetrics.activeCount.toString(), status: "good" },
              { label: "Pending Reviews", value: healthMetrics.pendingReview.toString(), status: healthMetrics.pendingReview > 5 ? "warning" : "good" },
            ]}
          />
          <ActionItemsWidget items={actionItems} />
        </div>

        <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContentCard
            title="Risk vs. Opportunity"
            description="Commercial Readiness vs Revenue Potential"
            variant="chart"
          >
            <RiskOpportunityMatrix 
              formulations={filteredFormulations} 
              businessCases={filteredBusinessCases} 
            />
          </ContentCard>

          <ContentCard
            title="Value Pipeline"
            description="Revenue & Profitability by Launch Year"
            variant="chart"
          >
            <ResourceAllocationChart businessCases={filteredBusinessCases} />
          </ContentCard>
        </div>
      </div>

      <CardGrid columns={{ mobile: 1, tablet: 1, desktop: 2 }} gap="md">
        <ContentCard
          title="Market Attractiveness Heatmap"
          description="Top opportunities by Country and Formulation"
          variant="chart"
        >
          <CountryAttractivenessHeatmap businessCases={filteredBusinessCases} />
        </ContentCard>

        <ContentCard
          title="Segment Performance Matrix"
          description="Revenue by Product Category and Country"
          variant="chart"
        >
          <SegmentRevenueMatrix businessCases={filteredBusinessCases} />
        </ContentCard>
      </CardGrid>
    </PageLayout>
  );
}
