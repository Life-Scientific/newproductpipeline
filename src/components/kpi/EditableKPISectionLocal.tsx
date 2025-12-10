"use client";

import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, ChevronDown, ChevronUp } from "lucide-react";
import { EditableMetricCardLocal } from "./EditableMetricCardLocal";
import { KPIMetricHistory } from "./KPIMetricHistory";
import {
  RevenueTable,
  MarketShareChart,
  ArticleSubmissionsChart,
  SparklineMetric,
  BulletChart,
  TrendLineChart,
  ForecastAccuracyChart,
  ObsoleteStockChart,
} from "./charts";
import {
  STOCK_WRITE_OFF_TREND,
  GM_PER_FTE_TREND,
  SUPPLY_CHAIN_METRICS,
  FREIGHT_COSTS_DATA,
  TARIFF_COSTS_DATA,
  getCurrentMonthValue,
} from "@/lib/kpi-dummy-data";
import type {
  KPISection,
  KPIMetric,
  KPIMetricHistoryEntry,
} from "@/lib/actions/kpi-actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EditableKPISectionLocalProps {
  section: KPISection;
  metrics: KPIMetric[];
  history: KPIMetricHistoryEntry[];
  currentUserId: string | null;
  isAdmin: boolean;
  users: { id: string; email: string }[];
  onUpdateMetric: (sectionKey: string, metricKey: string, value: number | null) => void;
  onUpdateOwner: (sectionKey: string, ownerUserId: string | null) => void;
}

export function EditableKPISectionLocal({
  section,
  metrics,
  history,
  currentUserId,
  isAdmin,
  users,
  onUpdateMetric,
  onUpdateOwner,
}: EditableKPISectionLocalProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [isChangingOwner, setIsChangingOwner] = useState(false);

  // Filter metrics for this section
  const sectionMetrics = metrics
    .filter((m) => m.section_key === section.section_key)
    .sort((a, b) => a.display_order - b.display_order);

  // For prototype: everyone can edit (no owner restriction)
  const canEdit = true;

  // Get owner email
  const ownerUser = users.find((u) => u.id === section.owner_user_id);
  const ownerEmail = ownerUser?.email || section.owner_user_id;

  // Check if current user is owner
  const isOwner = currentUserId && section.owner_user_id === currentUserId;

  const handleOwnerChange = (userId: string) => {
    const newOwnerId = userId === "unassigned" ? null : userId;
    onUpdateOwner(section.section_key, newOwnerId);
    toast.success("Owner updated");
    setIsChangingOwner(false);
  };

  // Filter history for this section
  const sectionHistory = history.filter(
    (h) => h.section_key === section.section_key
  );

  // Render section-specific visualizations
  const renderVisualizations = () => {
    switch (section.section_key) {
      case "markets_regions":
        return (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Revenue by Territory
                </h4>
                <RevenueTable />
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Market Share by Territory (Monthly)
                </h4>
                <MarketShareChart />
              </div>
            </div>
          </div>
        );

      case "products":
        return (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <ArticleSubmissionsChart articleType="34" />
              <ArticleSubmissionsChart articleType="33" />
            </div>
          </div>
        );

      case "product_margins":
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <SparklineMetric
              label="Stock Write Off % of COGS"
              value={getCurrentMonthValue(STOCK_WRITE_OFF_TREND)}
              unit="%"
              data={STOCK_WRITE_OFF_TREND}
            />
            <SparklineMetric
              label="GM per FTE"
              value={getCurrentMonthValue(GM_PER_FTE_TREND)}
              unit=""
              data={GM_PER_FTE_TREND}
              formatValue={(v) => `€${(v / 1000).toFixed(0)}k`}
            />
          </div>
        );

      case "supply_chain":
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <BulletChart
              label={SUPPLY_CHAIN_METRICS.otifCustomer.label}
              actual={SUPPLY_CHAIN_METRICS.otifCustomer.actual}
              target={SUPPLY_CHAIN_METRICS.otifCustomer.target}
              ranges={SUPPLY_CHAIN_METRICS.otifCustomer.ranges}
            />
            <BulletChart
              label={SUPPLY_CHAIN_METRICS.supplierOnTime.label}
              actual={SUPPLY_CHAIN_METRICS.supplierOnTime.actual}
              target={SUPPLY_CHAIN_METRICS.supplierOnTime.target}
              ranges={SUPPLY_CHAIN_METRICS.supplierOnTime.ranges}
            />
          </div>
        );

      case "freight":
        return (
          <TrendLineChart
            title="Freight Costs"
            data={FREIGHT_COSTS_DATA}
            unit="%"
            targetValue={4.0}
          />
        );

      case "tariff":
        return (
          <TrendLineChart
            title="Tariff Costs"
            data={TARIFF_COSTS_DATA}
            unit="%"
            targetValue={2.5}
          />
        );

      case "planning":
        return (
          <div className="space-y-6">
            <ForecastAccuracyChart />
            <ObsoleteStockChart />
          </div>
        );

      default:
        return null;
    }
  };

  const visualizations = renderVisualizations();
  const hasVisualizations = visualizations !== null;

  // Determine which metrics to show as cards (exclude those shown in visualizations)
  const getMetricsToShowAsCards = () => {
    // For sections with visualizations, hide metrics that are visualized
    const visualizedMetricKeys: Record<string, string[]> = {
      markets_regions: [], // Show all as cards too for editing
      products: [], // Show all as cards too for editing
      product_margins: ["stock_write_off_cogs", "gm_per_fte"], // Hide these, shown in sparklines
      supply_chain: ["target_otif_customer", "target_supplier_on_time"], // Hide, shown in bullet charts
      freight: ["freight_costs_percent"], // Hide, shown in trend chart
      tariff: ["tariff_costs_percent"], // Hide, shown in trend chart
      planning: ["forecast_accuracy", "obsolete_stock_percent"], // Hide, shown in charts
    };

    const keysToHide = visualizedMetricKeys[section.section_key] || [];
    return sectionMetrics.filter((m) => !keysToHide.includes(m.metric_key));
  };

  const metricsToShow = getMetricsToShowAsCards();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <CardTitle className="flex items-center gap-2">
              {section.section_name}
              {isOwner && (
                <Badge variant="default" className="text-xs">
                  You own this
                </Badge>
              )}
            </CardTitle>
            {section.section_description && (
              <CardDescription>{section.section_description}</CardDescription>
            )}
          </div>

          {/* Owner Display/Edit */}
          <div className="flex items-center gap-2 shrink-0">
            {isAdmin && isChangingOwner ? (
              <Select
                defaultValue={section.owner_user_id || "unassigned"}
                onValueChange={handleOwnerChange}
              >
                <SelectTrigger className="w-[200px] h-8 text-xs">
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Badge
                variant="outline"
                className={cn(
                  "text-xs cursor-default",
                  isAdmin && "cursor-pointer hover:bg-accent"
                )}
                onClick={isAdmin ? () => setIsChangingOwner(true) : undefined}
              >
                <User className="h-3 w-3 mr-1" />
                {section.owner_user_id
                  ? ownerEmail?.split("@")[0] || "Assigned"
                  : "Unassigned"}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Visualizations */}
        {hasVisualizations && (
          <div className="pb-4 border-b">{visualizations}</div>
        )}

        {/* Metrics Grid (editable cards) */}
        {metricsToShow.length > 0 && (
          <div>
            {hasVisualizations && (
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Edit Values
              </h4>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {metricsToShow.map((metric) => (
                <EditableMetricCardLocal
                  key={metric.metric_id}
                  metric={metric}
                  canEdit={canEdit}
                  onSave={(value) =>
                    onUpdateMetric(section.section_key, metric.metric_key, value)
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* History Toggle */}
        {sectionHistory.length > 0 && (
          <div className="pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="text-muted-foreground h-8"
            >
              {showHistory ? (
                <>
                  Hide change history <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Show change history ({sectionHistory.length}){" "}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>

            {showHistory && (
              <div className="mt-3">
                <KPIMetricHistory
                  history={history}
                  metrics={metrics}
                  sectionKey={section.section_key}
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
