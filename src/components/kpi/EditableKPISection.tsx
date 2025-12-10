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
import { EditableMetricCard } from "./EditableMetricCard";
import { KPIMetricHistory } from "./KPIMetricHistory";
import { updateSectionOwner } from "@/lib/actions/kpi-actions";
import type {
  KPISection,
  KPIMetric,
  KPIMetricHistoryEntry,
} from "@/lib/actions/kpi-actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EditableKPISectionProps {
  section: KPISection;
  metrics: KPIMetric[];
  history: KPIMetricHistoryEntry[];
  currentUserId: string | null;
  isAdmin: boolean;
  users: { id: string; email: string }[];
}

export function EditableKPISection({
  section,
  metrics,
  history,
  currentUserId,
  isAdmin,
  users,
}: EditableKPISectionProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [isChangingOwner, setIsChangingOwner] = useState(false);

  // Filter metrics for this section
  const sectionMetrics = metrics
    .filter((m) => m.section_key === section.section_key)
    .sort((a, b) => a.display_order - b.display_order);

  // Check if current user can edit this section
  const isOwner = currentUserId && section.owner_user_id === currentUserId;
  const canEdit = isOwner || !section.owner_user_id; // Can edit if owner or unassigned

  // Get owner email
  const ownerUser = users.find((u) => u.id === section.owner_user_id);
  const ownerEmail = ownerUser?.email || section.owner_user_id;

  const handleOwnerChange = async (userId: string) => {
    const newOwnerId = userId === "unassigned" ? null : userId;
    const result = await updateSectionOwner(section.section_key, newOwnerId);

    if (result.success) {
      toast.success("Owner updated");
      setIsChangingOwner(false);
    } else {
      toast.error(result.error || "Failed to update owner");
    }
  };

  // Filter history for this section
  const sectionHistory = history.filter(
    (h) => h.section_key === section.section_key
  );

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

      <CardContent className="space-y-4">
        {/* Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sectionMetrics.map((metric) => (
            <EditableMetricCard
              key={metric.metric_id}
              metric={metric}
              canEdit={canEdit}
            />
          ))}
        </div>

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

