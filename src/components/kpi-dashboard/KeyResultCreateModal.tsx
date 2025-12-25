"use client";

import { useState } from "react";
import { log, warn, error, table } from "@/lib/logger";
import { BaseModal } from "@/components/ui/BaseModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OwnerSelector } from "./OwnerSelector";
import { useToast } from "@/components/ui/use-toast";
import { createKeyResult } from "@/lib/actions/kpi-actions";
import { usePermissions } from "@/hooks/use-permissions";
import type { UserManagementData } from "@/lib/actions/user-management";
import type { StrategicDriver, StatusColor, Trend } from "@/lib/kpi-dashboard/types";
import { Loader2 } from "lucide-react";

interface KeyResultCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  strategicDriver: StrategicDriver;
  coreDriverId: string;
  users: UserManagementData[];
  onSuccess: () => void;
}

export function KeyResultCreateModal({
  open,
  onOpenChange,
  strategicDriver,
  coreDriverId,
  users,
  onSuccess,
}: KeyResultCreateModalProps) {
  const { toast } = useToast();
  const { canCreateKPIs, isLoading: permissionsLoading } = usePermissions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    status: "yellow" as StatusColor,
    target: "",
    reality: "",
    trend: "flat" as Trend,
    owner_id: null as string | null,
    justification: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canCreateKPIs) {
      toast({
        title: "Permission Denied",
        description: "You do not have permission to create KPIs.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.label.trim()) {
      toast({
        title: "Label Required",
        description: "Please provide a label for this KPI.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createKeyResult({
        strategic_driver_id: strategicDriver.id,
        label: formData.label,
        status: formData.status,
        target: formData.target || null,
        reality: formData.reality || null,
        trend: formData.trend,
        owner_id: formData.owner_id,
        justification: formData.justification || null,
        notes: formData.notes || null,
      });

      toast({
        title: "Success",
        description: "KPI created successfully.",
      });

      // Reset form
      setFormData({
        label: "",
        status: "yellow",
        target: "",
        reality: "",
        trend: "flat",
        owner_id: null,
        justification: "",
        notes: "",
      });

      onOpenChange(false);
      onSuccess();
    } catch (err) {
      error("Error creating key result:", err);
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to create KPI.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (permissionsLoading) {
    return null;
  }

  if (!canCreateKPIs) {
    return null;
  }

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title="Create New KPI"
      description={`Add a new Key Result under "${strategicDriver.label}"`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label">Label *</Label>
          <Input
            id="label"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            placeholder="e.g., Revenue Growth Rate"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as StatusColor })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="green">On Track</SelectItem>
                <SelectItem value="yellow">Attention</SelectItem>
                <SelectItem value="red">At Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trend">Trend</Label>
            <Select
              value={formData.trend}
              onValueChange={(value) =>
                setFormData({ ...formData, trend: value as Trend })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="up">Up</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="down">Down</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="target">Target</Label>
            <Input
              id="target"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              placeholder="e.g., 15%"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reality">Current Reality</Label>
            <Input
              id="reality"
              value={formData.reality}
              onChange={(e) => setFormData({ ...formData, reality: e.target.value })}
              placeholder="e.g., 12%"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="owner">Owner</Label>
          <OwnerSelector
            users={users}
            selectedOwnerId={formData.owner_id}
            onOwnerChange={(id) => setFormData({ ...formData, owner_id: id })}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="justification">Justification</Label>
          <Textarea
            id="justification"
            value={formData.justification}
            onChange={(e) =>
              setFormData({ ...formData, justification: e.target.value })
            }
            placeholder="Why is this KPI important?"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Additional notes..."
            rows={2}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create KPI
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}


