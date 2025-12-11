"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardGrid } from "@/components/layout/CardGrid";
import { OwnerSelector } from "./OwnerSelector";
import { OwnerDisplay } from "./OwnerDisplay";
import { useSupabase } from "@/hooks/use-supabase";
import type { UserManagementData } from "@/lib/actions/user-management";
import type {
  KPIData,
  CoreDriver,
  StrategicDriver,
  KeyResult,
  StatusColor,
} from "@/lib/kpi-dashboard/mock-data";
import { Lock, Unlock, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIEditViewProps {
  kpiData: KPIData;
  users: UserManagementData[];
  onUpdateKeyResult: (
    coreDriverId: string,
    strategicDriverId: string,
    keyResultId: string,
    updated: KeyResult,
  ) => void;
  onUpdateCoreDriver: (coreDriverId: string, updated: CoreDriver) => void;
  onUpdateStrategicDriver: (
    coreDriverId: string,
    strategicDriverId: string,
    updated: StrategicDriver,
  ) => void;
}

const statusOptions = [
  { value: "green", label: "On Track", color: "bg-green-500" },
  { value: "yellow", label: "Attention", color: "bg-yellow-500" },
  { value: "red", label: "At Risk", color: "bg-red-500" },
];

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1d";
  if (diffDays < 7) return `${diffDays}d`;
  return `${Math.floor(diffDays / 7)}w`;
}

export function KPIEditView({
  kpiData,
  users,
  onUpdateKeyResult,
}: KPIEditViewProps) {
  const supabase = useSupabase();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setCurrentUserId(session?.user?.id || null);
    }
    getCurrentUser();
  }, [supabase]);

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

  // Collect all KPIs assigned to current user
  const myKPIs: Array<{
    keyResult: KeyResult;
    coreDriverId: string;
    coreDriverLabel: string;
    strategicDriverId: string;
    strategicDriverLabel: string;
  }> = [];

  if (currentUserId) {
    kpiData.coreDrivers.forEach((cd) => {
      cd.strategicDrivers.forEach((sd) => {
        sd.keyResults.forEach((kr) => {
          if (kr.ownerId === currentUserId) {
            myKPIs.push({
              keyResult: kr,
              coreDriverId: cd.id,
              coreDriverLabel: cd.label,
              strategicDriverId: sd.id,
              strategicDriverLabel: sd.label,
            });
          }
        });
      });
    });
  }

  return (
    <div className="space-y-6">
      {/* My KPIs Section */}
      {currentUserId && myKPIs.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-md">
                <User className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-base">My KPIs</CardTitle>
              <Badge variant="secondary" className="ml-auto">
                {myKPIs.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {myKPIs.map((item) => (
                <KeyResultCard
                  key={item.keyResult.id}
                  keyResult={item.keyResult}
                  users={users}
                  ownerName={getUserName(item.keyResult.ownerId)}
                  ownerEmail={getUserEmail(item.keyResult.ownerId)}
                  coreDriverLabel={item.coreDriverLabel}
                  strategicDriverLabel={item.strategicDriverLabel}
                  onUpdate={(updated) =>
                    onUpdateKeyResult(
                      item.coreDriverId,
                      item.strategicDriverId,
                      item.keyResult.id,
                      updated,
                    )
                  }
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All KPIs by Core Driver */}
      <CardGrid columns={{ mobile: 1, tablet: 1, desktop: 3 }} gap="md">
        {kpiData.coreDrivers.map((coreDriver) => (
          <Card key={coreDriver.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1.5 rounded-md">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{coreDriver.label}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {coreDriver.target}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {coreDriver.strategicDrivers.map((sd) => (
                <div key={sd.id}>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    {sd.label}
                  </div>
                  <div className="space-y-2">
                    {sd.keyResults.map((kr) => (
                      <KeyResultCard
                        key={kr.id}
                        keyResult={kr}
                        users={users}
                        ownerName={getUserName(kr.ownerId)}
                        ownerEmail={getUserEmail(kr.ownerId)}
                        coreDriverLabel={coreDriver.label}
                        strategicDriverLabel={sd.label}
                        onUpdate={(updated) =>
                          onUpdateKeyResult(coreDriver.id, sd.id, kr.id, updated)
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </CardGrid>
    </div>
  );
}

function KeyResultCard({
  keyResult,
  users,
  ownerName,
  ownerEmail,
  coreDriverLabel,
  strategicDriverLabel,
  onUpdate,
}: {
  keyResult: KeyResult;
  users: UserManagementData[];
  ownerName: string | null;
  ownerEmail: string | null;
  coreDriverLabel: string;
  strategicDriverLabel: string;
  onUpdate: (updated: KeyResult) => void;
}) {
  const handleChange = <K extends keyof KeyResult>(field: K, value: KeyResult[K]) => {
    if (keyResult.isLocked) return;
    onUpdate({ ...keyResult, [field]: value });
  };

  const toggleLock = () => {
    onUpdate({ ...keyResult, isLocked: !keyResult.isLocked });
  };

  const statusColor = statusOptions.find((s) => s.value === keyResult.status)?.color;
  const statusConfig = statusOptions.find((s) => s.value === keyResult.status);

  return (
    <Card
      className={cn(
        "border",
        keyResult.isLocked && "opacity-60 bg-muted/20",
        keyResult.status === "red" && "border-red-500/20",
        keyResult.status === "yellow" && "border-yellow-500/20",
        keyResult.status === "green" && "border-green-500/20",
      )}
    >
      <CardContent className="p-3 space-y-3">
        {/* Header: Status + Label + Lock */}
        <div className="flex items-start gap-2">
          <div className={cn("w-3 h-3 rounded-full shrink-0 mt-0.5", statusColor)} />
          <div className="flex-1 min-w-0">
            <Input
              value={keyResult.label}
              onChange={(e) => handleChange("label", e.target.value)}
              className="h-8 text-sm font-medium border-none bg-transparent pl-2 focus-visible:ring-1 disabled:opacity-100"
              disabled={keyResult.isLocked}
              placeholder="KPI name..."
            />
            <p className="text-[10px] text-muted-foreground mt-0.5 pl-2">
              {coreDriverLabel} → {strategicDriverLabel}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLock}
            className={cn(
              "h-6 w-6 shrink-0",
              keyResult.isLocked && "text-yellow-600 dark:text-yellow-400"
            )}
            title={keyResult.isLocked ? "Unlock to edit" : "Lock"}
          >
            {keyResult.isLocked ? (
              <Lock className="h-3.5 w-3.5" />
            ) : (
              <Unlock className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </Button>
        </div>

        {/* Status */}
        <div className="space-y-1.5 pl-2">
          <Label className="text-xs">Status</Label>
          <Select
            value={keyResult.status}
            onValueChange={(v) => handleChange("status", v as StatusColor)}
            disabled={keyResult.isLocked}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="flex items-center gap-1.5">
                    <div className={cn("w-2 h-2 rounded-full", opt.color)} />
                    {opt.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Target & Current */}
        <div className="grid grid-cols-2 gap-2 pl-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Target</Label>
            <Input
              value={keyResult.target || ""}
              onChange={(e) => handleChange("target", e.target.value)}
              placeholder="—"
              className="h-8 text-xs"
              disabled={keyResult.isLocked}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Current</Label>
            <Input
              value={keyResult.reality || ""}
              onChange={(e) => handleChange("reality", e.target.value)}
              placeholder="—"
              className="h-8 text-xs"
              disabled={keyResult.isLocked}
            />
          </div>
        </div>

        {/* Owner */}
        <div className="space-y-1.5 pl-2">
          <Label className="text-xs">Owner</Label>
          <OwnerSelector
            users={users}
            selectedOwnerId={keyResult.ownerId}
            onOwnerChange={(id) => handleChange("ownerId", id)}
            className="h-8 text-xs w-full"
            disabled={keyResult.isLocked}
          />
        </div>
      </CardContent>
    </Card>
  );
}
