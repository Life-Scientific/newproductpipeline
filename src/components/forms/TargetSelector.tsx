"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import { useSupabase } from "@/hooks/use-supabase";
import type { Database } from "@/lib/supabase/database.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Target = any; // Database["public"]["Tables"]["targets"]["Row"]; // targets table may not exist in current schema

export interface TargetInput {
  target_id: string;
  notes: string;
}

interface TargetSelectorProps {
  targets: TargetInput[];
  onChange: (targets: TargetInput[]) => void;
}

export function TargetSelector({ targets, onChange }: TargetSelectorProps) {
  const supabase = useSupabase();
  const [availableTargets, setAvailableTargets] = useState<Target[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTarget, setNewTarget] = useState<TargetInput>({
    target_id: "",
    notes: "",
  });

  useEffect(() => {
    loadTargets();
  }, []);

  const loadTargets = async () => {
    const { data } = await supabase
      .from("targets")
      .select("*")
      .eq("is_active", true)
      .order("target_name");

    if (data) {
      setAvailableTargets(data);
    }
  };

  const filteredTargets = availableTargets.filter((target) =>
    target.target_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTarget = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!newTarget.target_id) {
      return;
    }

    // Check if target already added
    if (targets.some((t) => t.target_id === newTarget.target_id)) {
      return;
    }

    onChange([...targets, { ...newTarget }]);
    setNewTarget({
      target_id: "",
      notes: "",
    });
    setShowAddForm(false);
    setSearchTerm("");
  };

  const handleRemoveTarget = (index: number) => {
    onChange(targets.filter((_, i) => i !== index));
  };

  const handleUpdateTarget = (index: number, field: keyof TargetInput, value: string) => {
    const updated = [...targets];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const getTargetName = (targetId: string) => {
    return availableTargets.find((t) => t.target_id === targetId)?.target_name || "";
  };

  const getTargetType = (targetId: string) => {
    return availableTargets.find((t) => t.target_id === targetId)?.target_type || "";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold">
            Targets <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Add at least one target for normal use
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Target
        </Button>
      </div>

      {showAddForm && (
        <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target_search">Search Target</Label>
              <Input
                id="target_search"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_select">
                Target <span className="text-destructive">*</span>
              </Label>
              <Select
                value={newTarget.target_id}
                onValueChange={(value) =>
                  setNewTarget({ ...newTarget, target_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  {filteredTargets.map((target) => (
                    <SelectItem key={target.target_id} value={target.target_id}>
                      {target.target_name} ({target.target_type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_notes">Notes (Optional)</Label>
            <Textarea
              id="target_notes"
              value={newTarget.notes}
              onChange={(e) => setNewTarget({ ...newTarget, notes: e.target.value })}
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddTarget(e);
              }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {targets.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Target</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {targets.map((target, index) => (
                <TableRow key={`${target.target_id}-${index}`}>
                  <TableCell className="font-medium">
                    {getTargetName(target.target_id)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getTargetType(target.target_id)}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {target.notes || "—"}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTarget(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {targets.length === 0 && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
          <p>No targets added yet. Click "Add Target" to get started.</p>
        </div>
      )}
    </div>
  );
}

