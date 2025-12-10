"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OwnerSelector } from "./OwnerSelector";
import type { UserManagementData } from "@/lib/actions/user-management";
import type {
  KPIData,
  CoreDriver,
  StrategicDriver,
  KeyResult,
  StatusColor,
} from "@/lib/kpi-dashboard/mock-data";
import { Lock, Unlock, Clock, TrendingUp } from "lucide-react";
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
  return (
    <div className="space-y-4">
      {kpiData.coreDrivers.map((coreDriver) => (
        <Card key={coreDriver.id}>
          <CardHeader className="py-3 px-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{coreDriver.label}</CardTitle>
                <p className="text-xs text-muted-foreground">{coreDriver.target}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            {coreDriver.strategicDrivers.map((sd) => (
              <div key={sd.id} className="mb-4 last:mb-0">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 border-b bg-muted/30 px-2 -mx-2 rounded-t">
                  {sd.label}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[30px] px-1"></TableHead>
                      <TableHead className="text-xs">KPI</TableHead>
                      <TableHead className="text-xs w-[100px]">Status</TableHead>
                      <TableHead className="text-xs w-[80px]">Target</TableHead>
                      <TableHead className="text-xs w-[80px]">Current</TableHead>
                      <TableHead className="text-xs w-[140px]">Owner</TableHead>
                      <TableHead className="text-xs w-[50px]">Updated</TableHead>
                      <TableHead className="w-[30px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sd.keyResults.map((kr) => (
                      <KeyResultRow
                        key={kr.id}
                        keyResult={kr}
                        users={users}
                        onUpdate={(updated) =>
                          onUpdateKeyResult(coreDriver.id, sd.id, kr.id, updated)
                        }
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function KeyResultRow({
  keyResult,
  users,
  onUpdate,
}: {
  keyResult: KeyResult;
  users: UserManagementData[];
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

  return (
    <TableRow className={cn(keyResult.isLocked && "opacity-60 bg-muted/20")}>
      {/* Status Dot */}
      <TableCell className="px-1">
        <div className={cn("w-2.5 h-2.5 rounded-full", statusColor)} />
      </TableCell>

      {/* Label */}
      <TableCell className="py-1.5">
        <Input
          value={keyResult.label}
          onChange={(e) => handleChange("label", e.target.value)}
          className="h-7 text-xs border-none bg-transparent px-0 focus-visible:ring-1 disabled:opacity-100"
          disabled={keyResult.isLocked}
        />
      </TableCell>

      {/* Status */}
      <TableCell className="py-1.5">
        <Select
          value={keyResult.status}
          onValueChange={(v) => handleChange("status", v as StatusColor)}
          disabled={keyResult.isLocked}
        >
          <SelectTrigger className="h-7 text-xs w-full">
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
      </TableCell>

      {/* Target */}
      <TableCell className="py-1.5">
        <Input
          value={keyResult.target || ""}
          onChange={(e) => handleChange("target", e.target.value)}
          placeholder="—"
          className="h-7 text-xs w-full"
          disabled={keyResult.isLocked}
        />
      </TableCell>

      {/* Current */}
      <TableCell className="py-1.5">
        <Input
          value={keyResult.reality || ""}
          onChange={(e) => handleChange("reality", e.target.value)}
          placeholder="—"
          className="h-7 text-xs w-full"
          disabled={keyResult.isLocked}
        />
      </TableCell>

      {/* Owner */}
      <TableCell className="py-1.5">
        <OwnerSelector
          users={users}
          selectedOwnerId={keyResult.ownerId}
          onOwnerChange={(id) => handleChange("ownerId", id)}
          className="h-7 text-xs"
          disabled={keyResult.isLocked}
        />
      </TableCell>

      {/* Updated */}
      <TableCell className="py-1.5 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-0.5">
          <Clock className="h-2.5 w-2.5" />
          {formatRelativeTime(keyResult.lastUpdated)}
        </div>
      </TableCell>

      {/* Lock */}
      <TableCell className="py-1.5 px-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLock}
          className="h-6 w-6"
        >
          {keyResult.isLocked ? (
            <Lock className="h-3 w-3" />
          ) : (
            <Unlock className="h-3 w-3 text-muted-foreground" />
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
}
