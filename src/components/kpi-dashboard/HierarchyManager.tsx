"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { usePermissions } from "@/hooks/use-permissions";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  GripVertical,
} from "lucide-react";
import {
  createCoreDriver,
  updateCoreDriver,
  deleteCoreDriver,
  createStrategicDriver,
  updateStrategicDriver,
  deleteStrategicDriver,
  getCoreDriversAction,
  getStrategicDriversAction,
} from "@/lib/actions/kpi-actions";
import type {
  CoreDriverRow,
  StrategicDriverRow,
} from "@/lib/kpi-dashboard/types";
import { cn } from "@/lib/utils";

interface HierarchyManagerProps {
  onUpdate?: () => void;
}

export function HierarchyManager({ onUpdate }: HierarchyManagerProps) {
  const { toast } = useToast();
  const { canManageKPIHierarchy, isLoading: permissionsLoading } =
    usePermissions();

  const [coreDrivers, setCoreDrivers] = useState<CoreDriverRow[]>([]);
  const [strategicDrivers, setStrategicDrivers] = useState<
    Map<string, StrategicDriverRow[]>
  >(new Map());
  const [expandedCoreDrivers, setExpandedCoreDrivers] = useState<Set<string>>(
    new Set(),
  );
  const [loading, setLoading] = useState(true);

  // Core driver dialog state
  const [coreDriverDialogOpen, setCoreDriverDialogOpen] = useState(false);
  const [editingCoreDriver, setEditingCoreDriver] =
    useState<CoreDriverRow | null>(null);
  const [coreDriverForm, setCoreDriverForm] = useState({
    label: "",
    target: "",
  });

  // Strategic driver dialog state
  const [strategicDriverDialogOpen, setStrategicDriverDialogOpen] =
    useState(false);
  const [editingStrategicDriver, setEditingStrategicDriver] =
    useState<StrategicDriverRow | null>(null);
  const [selectedCoreDriverId, setSelectedCoreDriverId] = useState<string>("");
  const [strategicDriverForm, setStrategicDriverForm] = useState({
    label: "",
    core_driver_id: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const cores = await getCoreDriversAction();
      setCoreDrivers(cores);

      // Load strategic drivers for each core driver
      const strategicMap = new Map<string, StrategicDriverRow[]>();
      for (const core of cores) {
        const strategic = await getStrategicDriversAction(core.id);
        strategicMap.set(core.id, strategic);
      }
      setStrategicDrivers(strategicMap);
    } catch (error) {
      console.error("Error loading hierarchy:", error);
      toast({
        title: "Error",
        description: "Failed to load hierarchy data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoreDriver = async () => {
    try {
      await createCoreDriver({
        label: coreDriverForm.label,
        target: coreDriverForm.target || null,
      });
      toast({
        title: "Success",
        description: "Core driver created successfully",
      });
      setCoreDriverDialogOpen(false);
      setCoreDriverForm({ label: "", target: "" });
      await loadData();
      onUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create core driver",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCoreDriver = async () => {
    if (!editingCoreDriver) return;
    try {
      await updateCoreDriver(editingCoreDriver.id, {
        label: coreDriverForm.label,
        target: coreDriverForm.target || null,
      });
      toast({
        title: "Success",
        description: "Core driver updated successfully",
      });
      setCoreDriverDialogOpen(false);
      setEditingCoreDriver(null);
      setCoreDriverForm({ label: "", target: "" });
      await loadData();
      onUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update core driver",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCoreDriver = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this core driver? This will also delete all associated strategic drivers and key results.",
      )
    ) {
      return;
    }

    try {
      await deleteCoreDriver(id);
      toast({
        title: "Success",
        description: "Core driver deleted successfully",
      });
      await loadData();
      onUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete core driver",
        variant: "destructive",
      });
    }
  };

  const handleCreateStrategicDriver = async () => {
    if (!selectedCoreDriverId) {
      toast({
        title: "Error",
        description: "Please select a core driver",
        variant: "destructive",
      });
      return;
    }

    try {
      await createStrategicDriver({
        label: strategicDriverForm.label,
        core_driver_id: selectedCoreDriverId,
      });
      toast({
        title: "Success",
        description: "Strategic driver created successfully",
      });
      setStrategicDriverDialogOpen(false);
      setStrategicDriverForm({ label: "", core_driver_id: "" });
      setSelectedCoreDriverId("");
      await loadData();
      onUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create strategic driver",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStrategicDriver = async () => {
    if (!editingStrategicDriver) return;
    try {
      await updateStrategicDriver(editingStrategicDriver.id, {
        label: strategicDriverForm.label,
        core_driver_id: strategicDriverForm.core_driver_id,
      });
      toast({
        title: "Success",
        description: "Strategic driver updated successfully",
      });
      setStrategicDriverDialogOpen(false);
      setEditingStrategicDriver(null);
      setStrategicDriverForm({ label: "", core_driver_id: "" });
      setSelectedCoreDriverId("");
      await loadData();
      onUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update strategic driver",
        variant: "destructive",
      });
    }
  };

  const handleDeleteStrategicDriver = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this strategic driver? This will also delete all associated key results.",
      )
    ) {
      return;
    }

    try {
      await deleteStrategicDriver(id);
      toast({
        title: "Success",
        description: "Strategic driver deleted successfully",
      });
      await loadData();
      onUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete strategic driver",
        variant: "destructive",
      });
    }
  };

  const openCoreDriverDialog = (coreDriver?: CoreDriverRow) => {
    if (coreDriver) {
      setEditingCoreDriver(coreDriver);
      setCoreDriverForm({
        label: coreDriver.label,
        target: coreDriver.target || "",
      });
    } else {
      setEditingCoreDriver(null);
      setCoreDriverForm({ label: "", target: "" });
    }
    setCoreDriverDialogOpen(true);
  };

  const openStrategicDriverDialog = (
    coreDriverId: string,
    strategicDriver?: StrategicDriverRow,
  ) => {
    if (strategicDriver) {
      setEditingStrategicDriver(strategicDriver);
      setStrategicDriverForm({
        label: strategicDriver.label,
        core_driver_id: strategicDriver.core_driver_id,
      });
      setSelectedCoreDriverId(strategicDriver.core_driver_id);
    } else {
      setEditingStrategicDriver(null);
      setStrategicDriverForm({ label: "", core_driver_id: coreDriverId });
      setSelectedCoreDriverId(coreDriverId);
    }
    setStrategicDriverDialogOpen(true);
  };

  const toggleCoreDriver = (id: string) => {
    setExpandedCoreDrivers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (!canManageKPIHierarchy) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-sm text-muted-foreground">
            You do not have permission to manage KPI hierarchy. Contact an administrator to get the "KPI Manager" role or "kpi.manage_hierarchy" permission.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>KPI Hierarchy Management</CardTitle>
            <Button
              size="sm"
              onClick={() => openCoreDriverDialog()}
              disabled={permissionsLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Core Driver
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {coreDrivers.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                No core drivers yet. Create one to get started.
              </div>
            ) : (
              coreDrivers.map((coreDriver) => {
                const strategic = strategicDrivers.get(coreDriver.id) || [];
                const isExpanded = expandedCoreDrivers.has(coreDriver.id);

                return (
                  <div
                    key={coreDriver.id}
                    className="border rounded-lg p-3 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleCoreDriver(coreDriver.id)}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      <div className="flex-1">
                        <div className="font-medium">{coreDriver.label}</div>
                        {coreDriver.target && (
                          <div className="text-sm text-muted-foreground">
                            Target: {coreDriver.target}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openStrategicDriverDialog(coreDriver.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openCoreDriverDialog(coreDriver)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteCoreDriver(coreDriver.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="ml-8 space-y-1">
                        {strategic.length === 0 ? (
                          <div className="text-sm text-muted-foreground py-2">
                            No strategic drivers. Add one to get started.
                          </div>
                        ) : (
                          strategic.map((strategicDriver) => (
                            <div
                              key={strategicDriver.id}
                              className="flex items-center justify-between p-2 bg-muted/50 rounded"
                            >
                              <span className="text-sm">{strategicDriver.label}</span>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() =>
                                    openStrategicDriverDialog(
                                      coreDriver.id,
                                      strategicDriver,
                                    )
                                  }
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-destructive hover:text-destructive"
                                  onClick={() =>
                                    handleDeleteStrategicDriver(strategicDriver.id)
                                  }
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Core Driver Dialog */}
      <Dialog open={coreDriverDialogOpen} onOpenChange={setCoreDriverDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCoreDriver ? "Edit Core Driver" : "Create Core Driver"}
            </DialogTitle>
            <DialogDescription>
              Core drivers are the top-level KPI categories (e.g., Revenue Growth,
              Cash Operating Margin).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="core-label">Label *</Label>
              <Input
                id="core-label"
                value={coreDriverForm.label}
                onChange={(e) =>
                  setCoreDriverForm({ ...coreDriverForm, label: e.target.value })
                }
                placeholder="e.g., Revenue Growth"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="core-target">Target</Label>
              <Input
                id="core-target"
                value={coreDriverForm.target}
                onChange={(e) =>
                  setCoreDriverForm({ ...coreDriverForm, target: e.target.value })
                }
                placeholder="e.g., 15% YoY"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCoreDriverDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={
                editingCoreDriver ? handleUpdateCoreDriver : handleCreateCoreDriver
              }
              disabled={!coreDriverForm.label.trim()}
            >
              {editingCoreDriver ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Strategic Driver Dialog */}
      <Dialog
        open={strategicDriverDialogOpen}
        onOpenChange={setStrategicDriverDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStrategicDriver
                ? "Edit Strategic Driver"
                : "Create Strategic Driver"}
            </DialogTitle>
            <DialogDescription>
              Strategic drivers group related KPIs under a core driver.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="strategic-core">Core Driver *</Label>
              <Select
                value={selectedCoreDriverId}
                onValueChange={(value) => {
                  setSelectedCoreDriverId(value);
                  setStrategicDriverForm({
                    ...strategicDriverForm,
                    core_driver_id: value,
                  });
                }}
                disabled={!!editingStrategicDriver}
              >
                <SelectTrigger id="strategic-core">
                  <SelectValue placeholder="Select core driver" />
                </SelectTrigger>
                <SelectContent>
                  {coreDrivers.map((core) => (
                    <SelectItem key={core.id} value={core.id}>
                      {core.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="strategic-label">Label *</Label>
              <Input
                id="strategic-label"
                value={strategicDriverForm.label}
                onChange={(e) =>
                  setStrategicDriverForm({
                    ...strategicDriverForm,
                    label: e.target.value,
                  })
                }
                placeholder="e.g., Markets/Regions"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStrategicDriverDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={
                editingStrategicDriver
                  ? handleUpdateStrategicDriver
                  : handleCreateStrategicDriver
              }
              disabled={
                !strategicDriverForm.label.trim() || !selectedCoreDriverId
              }
            >
              {editingStrategicDriver ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

