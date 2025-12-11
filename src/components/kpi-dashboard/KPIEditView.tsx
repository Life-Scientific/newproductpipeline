"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OwnerSelector } from "./OwnerSelector";
import { OwnerDisplay } from "./OwnerDisplay";
import type { UserManagementData } from "@/lib/actions/user-management";
import type {
  KPIData,
  CoreDriver,
  StrategicDriver,
  KeyResult,
  StatusColor,
} from "@/lib/kpi-dashboard/mock-data";
import { Lock, Unlock, Clock, TrendingUp, ChevronDown } from "lucide-react";
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

  // Count KPIs per core driver for summary
  const getKPICounts = (coreDriver: CoreDriver) => {
    const counts = { total: 0, red: 0, yellow: 0, green: 0 };
    coreDriver.strategicDrivers.forEach((sd) => {
      sd.keyResults.forEach((kr) => {
        counts.total++;
        counts[kr.status]++;
      });
    });
    return counts;
  };

  return (
    <div className="space-y-3">
      <Accordion type="multiple" defaultValue={[]} className="w-full">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {kpiData.coreDrivers.map((coreDriver) => {
            const counts = getKPICounts(coreDriver);
            return (
              <AccordionItem key={coreDriver.id} value={coreDriver.id} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div className="bg-primary/10 p-1.5 rounded shrink-0">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{coreDriver.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{coreDriver.target}</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {counts.green}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      {counts.yellow}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      {counts.red}
                    </span>
                    <span className="ml-2 text-muted-foreground">({counts.total} KPIs)</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <div className="space-y-3">
                  {coreDriver.strategicDrivers.map((sd) => (
                    <div key={sd.id} className="border rounded-md overflow-hidden">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide py-1.5 px-3 bg-muted/50 border-b">
                        {sd.label}
                      </div>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="w-[20px] px-2"></TableHead>
                              <TableHead className="text-xs min-w-[200px]">KPI</TableHead>
                              <TableHead className="text-xs w-[90px]">Status</TableHead>
                              <TableHead className="text-xs w-[80px]">Target</TableHead>
                              <TableHead className="text-xs w-[80px]">Current</TableHead>
                              <TableHead className="text-xs w-[130px]">Owner</TableHead>
                              <TableHead className="text-xs w-[40px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sd.keyResults.map((kr) => (
                              <KeyResultRow
                                key={kr.id}
                                keyResult={kr}
                                users={users}
                                ownerName={getUserName(kr.ownerId)}
                                ownerEmail={getUserEmail(kr.ownerId)}
                                onUpdate={(updated) =>
                                  onUpdateKeyResult(coreDriver.id, sd.id, kr.id, updated)
                                }
                              />
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
              </AccordionItem>
            );
          })}
        </div>
      </Accordion>
    </div>
  );
}

function KeyResultRow({
  keyResult,
  users,
  ownerName,
  ownerEmail,
  onUpdate,
}: {
  keyResult: KeyResult;
  users: UserManagementData[];
  ownerName: string | null;
  ownerEmail: string | null;
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
      <TableCell className="px-2 py-1.5">
        <div className={cn("w-2.5 h-2.5 rounded-full", statusColor)} />
      </TableCell>

      {/* Label */}
      <TableCell className="py-1.5">
        <Input
          value={keyResult.label}
          onChange={(e) => handleChange("label", e.target.value)}
          className="h-7 text-xs border-none bg-transparent px-0 focus-visible:ring-1 disabled:opacity-100"
          disabled={keyResult.isLocked}
          placeholder="KPI name..."
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
          className="h-7 text-xs w-full"
          disabled={keyResult.isLocked}
        />
      </TableCell>

      {/* Lock */}
      <TableCell className="py-1.5 px-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLock}
          className={cn(
            "h-6 w-6",
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
      </TableCell>
    </TableRow>
  );
}
