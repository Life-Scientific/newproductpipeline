"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";

type StatusHistory =
  Database["public"]["Tables"]["formulation_status_history"]["Row"];

interface FormulationStatusHistoryProps {
  history: StatusHistory[];
}

const statusColors: Record<string, string> = {
  "Not Yet Considered": "secondary",
  Selected: "default",
  Monitoring: "outline",
  Killed: "destructive",
};

export function FormulationStatusHistory({
  history,
}: FormulationStatusHistoryProps) {
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status History</CardTitle>
          <CardDescription>Audit trail of status changes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No status history found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status History</CardTitle>
        <CardDescription>Audit trail of status changes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Changed At</TableHead>
              <TableHead>Changed By</TableHead>
              <TableHead>Old Status</TableHead>
              <TableHead>New Status</TableHead>
              <TableHead>Rationale</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((entry) => (
              <TableRow key={entry.history_id}>
                <TableCell className="font-medium">
                  {entry.changed_at
                    ? new Date(entry.changed_at).toLocaleString()
                    : "—"}
                </TableCell>
                <TableCell>{entry.changed_by || "—"}</TableCell>
                <TableCell>
                  {entry.old_status ? (
                    <Badge
                      variant={
                        (statusColors[entry.old_status] as any) || "secondary"
                      }
                    >
                      {entry.old_status}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      (statusColors[entry.new_status] as any) || "secondary"
                    }
                  >
                    {entry.new_status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {entry.status_rationale || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
