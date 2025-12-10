"use client";

import { useState } from "react";
import { BaseModal } from "@/components/ui/BaseModal";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { OwnerSelector } from "./OwnerSelector";
import { StrategicDriverCharts } from "./StrategicDriverCharts";
import type { UserManagementData } from "@/lib/actions/user-management";
import type { KeyResult, StatusColor } from "@/lib/kpi-dashboard/mock-data";
import {
  Lock,
  Unlock,
  Clock,
  Database,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  History,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIDetailModalProps {
  keyResult: KeyResult | null;
  users: UserManagementData[];
  onUpdate: (updated: KeyResult) => void;
  onClose: () => void;
  strategicDriverLabel?: string;
  strategicDriverId?: string;
  coreDriverLabel?: string;
}

const statusConfig = {
  red: { variant: "destructive" as const, label: "At Risk", color: "bg-red-500" },
  yellow: { variant: "warning" as const, label: "Needs Attention", color: "bg-yellow-500" },
  green: { variant: "success" as const, label: "On Track", color: "bg-green-500" },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Mock audit log entries
function generateMockAuditLog(keyResult: KeyResult) {
  const actions = [
    { action: "Status changed", from: "Yellow", to: "Green", field: "status" },
    { action: "Value updated", from: "15%", to: keyResult.reality, field: "reality" },
    { action: "Target set", from: "—", to: keyResult.target, field: "target" },
    { action: "Owner assigned", from: "Unassigned", to: "john.doe", field: "owner" },
    { action: "Locked", from: "Unlocked", to: "Locked", field: "lock" },
    { action: "Note added", from: "—", to: "Added context", field: "notes" },
  ];

  return actions.slice(0, 5).map((a, i) => ({
    ...a,
    id: `audit-${i}`,
    timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000 * (i + 1)).toISOString(),
    user: ["john.doe@company.com", "jane.smith@company.com", "admin@company.com"][i % 3],
  }));
}

export function KPIDetailModal({
  keyResult,
  users,
  onUpdate,
  onClose,
  strategicDriverLabel,
  strategicDriverId,
  coreDriverLabel,
}: KPIDetailModalProps) {
  const [activeTab, setActiveTab] = useState("details");

  if (!keyResult) return null;

  const config = statusConfig[keyResult.status];
  const auditLog = generateMockAuditLog(keyResult);

  const handleChange = <K extends keyof KeyResult>(field: K, value: KeyResult[K]) => {
    if (keyResult.isLocked) return;
    onUpdate({ ...keyResult, [field]: value });
  };

  const toggleLock = () => {
    onUpdate({ ...keyResult, isLocked: !keyResult.isLocked });
  };

  const TrendIcon = keyResult.trend === "up" ? TrendingUp : keyResult.trend === "down" ? TrendingDown : Minus;

  const title = (
    <div className="flex items-center gap-3 pr-8">
      <div className={cn("w-3 h-3 rounded-full shrink-0", config.color)} />
      <span className="truncate">{keyResult.label}</span>
    </div>
  );

  const description = (
    <span className="text-xs">
      {coreDriverLabel} → {strategicDriverLabel}
    </span>
  );

  const footer = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        Updated {formatDate(keyResult.lastUpdated)}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button
          variant={keyResult.isLocked ? "outline" : "default"}
          onClick={toggleLock}
        >
          {keyResult.isLocked ? (
            <>
              <Unlock className="h-4 w-4 mr-1.5" />
              Unlock to Edit
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-1.5" />
              Lock
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <BaseModal
      open={!!keyResult}
      onOpenChange={() => onClose()}
      title={title}
      description={description}
      footer={footer}
      maxWidth="max-w-2xl"
      showCancel={false}
      showSave={false}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="charts">
            <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="source">Data Source</TabsTrigger>
          <TabsTrigger value="audit">
            <History className="h-3.5 w-3.5 mr-1.5" />
            Audit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-0">
          {/* Status & Trend */}
          <div className="flex items-center gap-3">
            <Badge variant={config.variant} className="text-sm px-3 py-1">
              {config.label}
            </Badge>
            {keyResult.trend && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                keyResult.trend === "up" && "text-green-600",
                keyResult.trend === "down" && "text-red-600",
                keyResult.trend === "flat" && "text-muted-foreground",
              )}>
                <TrendIcon className="h-4 w-4" />
                {keyResult.trend === "up" ? "Improving" : keyResult.trend === "down" ? "Declining" : "Stable"}
              </div>
            )}
            {keyResult.isLocked && (
              <Badge variant="outline" className="text-xs ml-auto">
                <Lock className="h-3 w-3 mr-1" />
                Locked
              </Badge>
            )}
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Target</Label>
              <Input
                value={keyResult.target || ""}
                onChange={(e) => handleChange("target", e.target.value)}
                placeholder="Not set"
                disabled={keyResult.isLocked}
                className="text-lg font-semibold"
              />
            </div>
            <div className="space-y-2">
              <Label>Current Value</Label>
              <Input
                value={keyResult.reality || ""}
                onChange={(e) => handleChange("reality", e.target.value)}
                placeholder="Not set"
                disabled={keyResult.isLocked}
                className="text-lg font-semibold"
              />
            </div>
          </div>

          {/* Status & Owner Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={keyResult.status}
                onValueChange={(v) => handleChange("status", v as StatusColor)}
                disabled={keyResult.isLocked}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      On Track
                    </div>
                  </SelectItem>
                  <SelectItem value="yellow">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      Needs Attention
                    </div>
                  </SelectItem>
                  <SelectItem value="red">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      At Risk
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Owner</Label>
              <OwnerSelector
                users={users}
                selectedOwnerId={keyResult.ownerId}
                onOwnerChange={(id) => handleChange("ownerId", id)}
                disabled={keyResult.isLocked}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes & Justification</Label>
            <Textarea
              value={keyResult.justification || keyResult.notes || ""}
              onChange={(e) => handleChange("justification", e.target.value)}
              placeholder="Add context, notes, or justification..."
              disabled={keyResult.isLocked}
              className="min-h-[80px]"
            />
          </div>
        </TabsContent>

        <TabsContent value="charts" className="mt-0">
          {strategicDriverId ? (
            <StrategicDriverCharts strategicDriverId={strategicDriverId} />
          ) : (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p className="text-sm">No visualizations available for this KPI.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="source" className="space-y-4 mt-0">
          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">System</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-medium">
                  {keyResult.source.system}
                </Badge>
                {keyResult.source.endpoint && (
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
            {keyResult.source.endpoint && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Endpoint</span>
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                  {keyResult.source.endpoint}
                </code>
              </div>
            )}
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Sync Frequency</span>
              <Badge variant="outline" className="capitalize">
                {keyResult.source.frequency}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Synced</span>
              <div className="flex items-center gap-1.5 text-sm">
                <RefreshCw className="h-3.5 w-3.5 text-green-500" />
                {formatDate(keyResult.source.lastSync)}
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5" />
            KPI ID: <code className="font-mono">{keyResult.id}</code>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="mt-0">
          <div className="space-y-2">
            {auditLog.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg text-sm"
              >
                <div className="bg-muted rounded-full p-1.5 mt-0.5">
                  <History className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{entry.action}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {entry.from} → {entry.to}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground">
                    {formatDate(entry.timestamp)}
                  </div>
                  <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {entry.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </BaseModal>
  );
}

