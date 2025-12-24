"use client";

import React, { useState, useEffect } from "react";
import { log, warn, error, table } from "@/lib/logger";
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
import type { UserManagementData } from "@/lib/actions/user-management";
import type { KeyResult, StatusColor, AuditLogEntry } from "@/lib/kpi-dashboard/types";
import { updateKeyResult, toggleLock, getAuditLogAction } from "@/lib/actions/kpi-actions";
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
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIDetailModalProps {
  keyResult: KeyResult | null;
  users: UserManagementData[];
  onUpdate: (updated: KeyResult) => void;
  onClose: () => void;
  strategicDriverLabel?: string;
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

export function KPIDetailModal({
  keyResult,
  users,
  onUpdate,
  onClose,
  strategicDriverLabel,
  coreDriverLabel,
}: KPIDetailModalProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [localKeyResult, setLocalKeyResult] = useState<KeyResult | null>(keyResult);
  const [hasChanges, setHasChanges] = useState(false);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [isLoadingAudit, setIsLoadingAudit] = useState(false);

  // Update local state when keyResult prop changes
  React.useEffect(() => {
    if (keyResult) {
      setLocalKeyResult(keyResult);
      setHasChanges(false);
    }
  }, [keyResult]);

  // Fetch audit log when audit tab is opened
  useEffect(() => {
    if (activeTab === "audit" && keyResult && auditLog.length === 0) {
      setIsLoadingAudit(true);
      getAuditLogAction("key_result", keyResult.id)
        .then((log: AuditLogEntry[]) => {
          setAuditLog(log);
        })
        .catch((error: unknown) => {
          error("Error fetching audit log:", error);
        })
        .finally(() => {
          setIsLoadingAudit(false);
        });
    }
  }, [activeTab, keyResult, auditLog.length]);

  if (!keyResult || !localKeyResult) return null;

  const config = statusConfig[localKeyResult.status];

  const handleChange = <K extends keyof KeyResult>(field: K, value: KeyResult[K]) => {
    if (localKeyResult.isLocked) return;
    const updated = { ...localKeyResult, [field]: value, lastUpdated: new Date().toISOString() };
    setLocalKeyResult(updated);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (localKeyResult && hasChanges) {
      try {
        await updateKeyResult(localKeyResult.id, {
          label: localKeyResult.label,
          status: localKeyResult.status,
          target: localKeyResult.target || null,
          reality: localKeyResult.reality || null,
          trend: localKeyResult.trend,
          owner_id: localKeyResult.ownerId || null,
          justification: localKeyResult.justification || null,
          notes: localKeyResult.notes || null,
          strategic_driver_id: "", // Not needed for update
        });
        onUpdate(localKeyResult);
        setHasChanges(false);
      } catch (error) {
        error("Error saving key result:", error);
        // Could show error toast here
      }
    }
  };

  const handleToggleLock = async () => {
    try {
      await toggleLock(localKeyResult.id);
      const updated = {
        ...localKeyResult,
        isLocked: !localKeyResult.isLocked,
        lastUpdated: new Date().toISOString(),
      };
      setLocalKeyResult(updated);
      onUpdate(updated);
      setHasChanges(false);
    } catch (error) {
      error("Error toggling lock:", error);
      // Could show error toast here
    }
  };

  const TrendIcon = localKeyResult.trend === "up" ? TrendingUp : localKeyResult.trend === "down" ? TrendingDown : Minus;

  const title = (
    <div className="flex items-center gap-3 pr-8">
      <div className={cn("w-3 h-3 rounded-full shrink-0", config.color)} />
      <span className="truncate">{localKeyResult.label}</span>
      {localKeyResult.isLocked && (
        <Badge variant="outline" className="text-xs ml-auto">
          <Lock className="h-3 w-3 mr-1" />
          Locked
        </Badge>
      )}
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
        Updated {formatDate(localKeyResult.lastUpdated)}
        {hasChanges && (
          <span className="text-yellow-600 dark:text-yellow-400 ml-2">• Unsaved changes</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {hasChanges && !localKeyResult.isLocked && (
          <Button variant="default" onClick={handleSave}>
            Save Changes
          </Button>
        )}
        <Button
          variant={localKeyResult.isLocked ? "outline" : "secondary"}
          onClick={handleToggleLock}
        >
          {localKeyResult.isLocked ? (
            <>
              <Unlock className="h-4 w-4 mr-1.5" />
              Unlock
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
      onOpenChange={() => {
        if (hasChanges && !localKeyResult.isLocked) {
          // Could show confirmation dialog here
          handleSave();
        }
        onClose();
      }}
      title={title}
      description={description}
      footer={footer}
      maxWidth="max-w-2xl"
      showCancel={false}
      showSave={false}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="source">Data Source</TabsTrigger>
          <TabsTrigger value="audit">
            <History className="h-3.5 w-3.5 mr-1.5" />
            Audit Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-0">
          {/* Status & Trend */}
          <div className="flex items-center gap-3">
            <Badge variant={config.variant} className="text-sm px-3 py-1">
              {config.label}
            </Badge>
            {localKeyResult.trend && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                localKeyResult.trend === "up" && "text-green-600",
                localKeyResult.trend === "down" && "text-red-600",
                localKeyResult.trend === "flat" && "text-muted-foreground",
              )}>
                <TrendIcon className="h-4 w-4" />
                {localKeyResult.trend === "up" ? "Improving" : localKeyResult.trend === "down" ? "Declining" : "Stable"}
              </div>
            )}
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Target</Label>
              <Input
                value={localKeyResult.target || ""}
                onChange={(e) => handleChange("target", e.target.value)}
                placeholder="Not set"
                disabled={localKeyResult.isLocked}
                className={cn(
                  "text-lg font-semibold",
                  localKeyResult.isLocked && "opacity-60 cursor-not-allowed",
                  !localKeyResult.isLocked && "border-primary/20"
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Current Value</Label>
              <Input
                value={localKeyResult.reality || ""}
                onChange={(e) => handleChange("reality", e.target.value)}
                placeholder="Not set"
                disabled={localKeyResult.isLocked}
                className={cn(
                  "text-lg font-semibold",
                  localKeyResult.isLocked && "opacity-60 cursor-not-allowed",
                  !localKeyResult.isLocked && "border-primary/20"
                )}
              />
            </div>
          </div>

          {/* Status & Owner Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={localKeyResult.status}
                onValueChange={(v) => handleChange("status", v as StatusColor)}
                disabled={localKeyResult.isLocked}
              >
                <SelectTrigger className={cn(localKeyResult.isLocked && "opacity-60 cursor-not-allowed")}>
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
                selectedOwnerId={localKeyResult.ownerId}
                onOwnerChange={(id) => handleChange("ownerId", id)}
                disabled={localKeyResult.isLocked}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes & Justification</Label>
            <Textarea
              value={localKeyResult.justification || localKeyResult.notes || ""}
              onChange={(e) => handleChange("justification", e.target.value)}
              placeholder="Add context, notes, or justification..."
              disabled={localKeyResult.isLocked}
              className={cn(
                "min-h-[80px]",
                localKeyResult.isLocked && "opacity-60 cursor-not-allowed",
                !localKeyResult.isLocked && "border-primary/20"
              )}
            />
          </div>
        </TabsContent>

        <TabsContent value="source" className="space-y-4 mt-0">
          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">System</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-medium">
                  {localKeyResult.source.system}
                </Badge>
                {localKeyResult.source.endpoint && (
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
            {localKeyResult.source.endpoint && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Endpoint</span>
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                  {localKeyResult.source.endpoint}
                </code>
              </div>
            )}
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Sync Frequency</span>
              <Badge variant="outline" className="capitalize">
                {localKeyResult.source.frequency}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Synced</span>
              <div className="flex items-center gap-1.5 text-sm">
                <RefreshCw className="h-3.5 w-3.5 text-green-500" />
                {formatDate(localKeyResult.source.lastSync)}
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5" />
            KPI ID: <code className="font-mono">{localKeyResult.id}</code>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="mt-0">
          <div className="space-y-2">
            {isLoadingAudit ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : auditLog.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                No audit log entries yet
              </div>
            ) : (
              auditLog.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg text-sm"
                >
                  <div className="bg-muted rounded-full p-1.5 mt-0.5">
                    <History className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium capitalize">
                      {entry.action} {entry.fieldName ? `(${entry.fieldName})` : ""}
                    </div>
                    {entry.oldValue && entry.newValue && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {entry.oldValue} → {entry.newValue}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground">
                      {formatDate(entry.createdAt)}
                    </div>
                    <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                      {entry.userName || entry.userId || "System"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </BaseModal>
  );
}

