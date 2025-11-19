"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, User, TrendingUp, TrendingDown } from "lucide-react";
import { useSupabase } from "@/hooks/use-supabase";
import { formatDistanceToNow } from "date-fns";

interface AuditLogEntry {
  audit_id: string;
  operation: string;
  formulation_code: string | null;
  formulation_name: string | null;
  country_name: string | null;
  use_group_variant: string | null;
  fiscal_year: string | null;
  old_volume: number | null;
  new_volume: number | null;
  old_nsp: number | null;
  new_nsp: number | null;
  old_cogs_per_unit: number | null;
  new_cogs_per_unit: number | null;
  fields_changed: string[] | null;
  change_summary: string | null;
  changed_by: string | null;
  changed_at: string;
}

interface BusinessCaseAuditLogProps {
  businessCaseGroupId?: string;
  formulationId?: string;
  limit?: number;
}

export function BusinessCaseAuditLog({
  businessCaseGroupId,
  formulationId,
  limit = 50,
}: BusinessCaseAuditLogProps) {
  const supabase = useSupabase();
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      setLoading(true);
      
      let query = supabase
        .from("business_case_audit")
        .select("*")
        .order("changed_at", { ascending: false })
        .limit(limit);

      if (businessCaseGroupId) {
        query = query.eq("business_case_group_id", businessCaseGroupId);
      }

      if (formulationId) {
        query = query.eq("formulation_id", formulationId);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching audit logs:", error);
      } else {
        setAuditLogs((data as AuditLogEntry[]) || []);
      }
      
      setLoading(false);
    };

    fetchAuditLogs();
  }, [supabase, businessCaseGroupId, formulationId, limit]);

  const getOperationBadge = (operation: string) => {
    switch (operation) {
      case "INSERT":
        return <Badge variant="default" className="bg-green-500">Created</Badge>;
      case "UPDATE":
        return <Badge variant="default" className="bg-blue-500">Updated</Badge>;
      case "DELETE":
        return <Badge variant="destructive">Deleted</Badge>;
      default:
        return <Badge variant="secondary">{operation}</Badge>;
    }
  };

  const formatValue = (value: number | null, field: string): string => {
    if (value === null) return "—";
    
    if (field.includes("volume")) {
      return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }
    if (field.includes("nsp") || field.includes("cogs")) {
      return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    
    return value.toString();
  };

  const renderValueChange = (log: AuditLogEntry, field: string) => {
    const oldFieldKey = `old_${field}` as keyof AuditLogEntry;
    const newFieldKey = `new_${field}` as keyof AuditLogEntry;
    
    const oldValue = log[oldFieldKey] as number | null;
    const newValue = log[newFieldKey] as number | null;

    if (log.operation === "INSERT") {
      return (
        <span className="text-green-600 dark:text-green-400">
          {formatValue(newValue, field)}
        </span>
      );
    }

    if (log.operation === "DELETE") {
      return (
        <span className="text-red-600 dark:text-red-400 line-through">
          {formatValue(oldValue, field)}
        </span>
      );
    }

    if (oldValue === newValue || (!log.fields_changed?.includes(field))) {
      return <span className="text-muted-foreground">{formatValue(newValue, field)}</span>;
    }

    const isIncrease = newValue !== null && oldValue !== null && newValue > oldValue;

    return (
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground line-through">{formatValue(oldValue, field)}</span>
        <span className="text-xs">→</span>
        <span className={isIncrease ? "text-green-600 dark:text-green-400 font-semibold" : "text-orange-600 dark:text-orange-400 font-semibold"}>
          {formatValue(newValue, field)}
        </span>
        {isIncrease ? (
          <TrendingUp className="h-3 w-3 text-green-600" />
        ) : (
          <TrendingDown className="h-3 w-3 text-orange-600" />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>Loading change history...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (auditLogs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>Complete change history for business cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            No changes recorded yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
        <CardDescription>
          {businessCaseGroupId 
            ? "Change history for this business case" 
            : `Last ${auditLogs.length} changes across all business cases`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Action</TableHead>
                <TableHead className="w-[180px]">Formulation</TableHead>
                <TableHead className="w-[120px]">Country</TableHead>
                <TableHead className="w-[100px]">FY</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>NSP</TableHead>
                <TableHead>COGS</TableHead>
                <TableHead className="w-[150px]">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Changed By
                  </div>
                </TableHead>
                <TableHead className="w-[150px]">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    When
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.audit_id}>
                  <TableCell>{getOperationBadge(log.operation)}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="text-sm">{log.formulation_code || "—"}</span>
                      {log.formulation_name && (
                        <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                          {log.formulation_name}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{log.country_name || "—"}</TableCell>
                  <TableCell>{log.fiscal_year || "—"}</TableCell>
                  <TableCell>{renderValueChange(log, "volume")}</TableCell>
                  <TableCell>{renderValueChange(log, "nsp")}</TableCell>
                  <TableCell>{renderValueChange(log, "cogs_per_unit")}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {log.changed_by || "system"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(log.changed_at), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

