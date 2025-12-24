"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Loader2,
  RefreshCw,
  Plus,
  Shield,
  Lock,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  getAllRoles,
  getAllPermissions,
  createRole,
  updateRole,
  updateRolePermissions,
  deleteRole,
} from "@/lib/actions/user-management";
import {
  type Role,
  type Permission,
  groupPermissionsByCategory,
} from "@/lib/permissions";
import { useToast } from "@/components/ui/use-toast";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { DeleteConfirmDialog } from "@/components/forms/DeleteConfirmDialog";
import { usePermissions } from "@/hooks/use-permissions";

interface RoleFormData {
  role_name: string;
  description: string;
  permission_ids: string[];
}

export function RoleManagement() {
  const { toast } = useToast();
  const {
    canManageRoles,
    canCreateRoles,
    canDeleteRoles,
    isLoading: permissionsLoading,
  } = usePermissions();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);

  // Form state
  const [formData, setFormData] = useState<RoleFormData>({
    role_name: "",
    description: "",
    permission_ids: [],
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [rolesData, permissionsData] = await Promise.all([
        getAllRoles(),
        getAllPermissions(),
      ]);
      setRoles(rolesData);
      setPermissions(permissionsData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load data";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const permissionsByCategory = useMemo(() => {
    return groupPermissionsByCategory(permissions);
  }, [permissions]);

  const resetForm = () => {
    setFormData({
      role_name: "",
      description: "",
      permission_ids: [],
    });
  };

  const openCreateDialog = () => {
    resetForm();
    setCreateDialogOpen(true);
  };

  const openEditDialog = (role: Role) => {
    setEditingRole(role);
    setFormData({
      role_name: role.role_name,
      description: role.description || "",
      permission_ids: role.permissions.map((p) => p.permission_id),
    });
  };

  const closeDialogs = () => {
    setCreateDialogOpen(false);
    setEditingRole(null);
    resetForm();
  };

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permission_ids: prev.permission_ids.includes(permissionId)
        ? prev.permission_ids.filter((id) => id !== permissionId)
        : [...prev.permission_ids, permissionId],
    }));
  };

  const handleCategoryToggle = (category: string) => {
    const categoryPermissions = permissionsByCategory[category] || [];
    const categoryIds = categoryPermissions.map((p) => p.permission_id);
    const allSelected = categoryIds.every((id) =>
      formData.permission_ids.includes(id),
    );

    setFormData((prev) => ({
      ...prev,
      permission_ids: allSelected
        ? prev.permission_ids.filter((id) => !categoryIds.includes(id))
        : [...new Set([...prev.permission_ids, ...categoryIds])],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (!formData.role_name.trim()) {
        throw new Error("Role name is required");
      }

      if (editingRole) {
        // Update existing role
        await updateRole(
          editingRole.role_id,
          formData.role_name,
          formData.description,
        );
        await updateRolePermissions(
          editingRole.role_id,
          formData.permission_ids,
        );
        toast({
          title: "Success",
          description: "Role updated successfully",
        });
      } else {
        // Create new role
        await createRole(
          formData.role_name,
          formData.description,
          formData.permission_ids,
        );
        toast({
          title: "Success",
          description: "Role created successfully",
        });
      }

      closeDialogs();
      await loadData();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save role";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingRole) return;

    try {
      await deleteRole(deletingRole.role_id);
      toast({
        title: "Success",
        description: "Role deleted successfully",
      });
      setDeleteDialogOpen(false);
      setDeletingRole(null);
      await loadData();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete role";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setDeleteDialogOpen(false);
      setDeletingRole(null);
    }
  };

  const columns = useMemo<ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: "role_name",
        header: "Role",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.is_system_role ? (
              <Lock className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Shield className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="font-medium">{row.getValue("role_name")}</span>
            {row.original.is_system_role && (
              <Badge variant="outline" className="text-xs">
                System
              </Badge>
            )}
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <span className="text-muted-foreground text-sm">
            {row.getValue("description") || "No description"}
          </span>
        ),
      },
      {
        accessorKey: "permissions",
        header: "Permissions",
        cell: ({ row }) => {
          const perms = row.original.permissions;
          return (
            <Badge variant="secondary">
              {perms.length} permission{perms.length !== 1 ? "s" : ""}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const role = row.original;
          // Don't show actions if user has no role management permissions
          if (!canManageRoles && !canDeleteRoles) return null;

          return (
            <div className="flex items-center justify-end gap-2">
              {canManageRoles && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditDialog(role)}
                  className="h-8 w-8 p-0"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
              {!role.is_system_role && canDeleteRoles && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDeletingRole(role);
                    setDeleteDialogOpen(true);
                  }}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [canManageRoles, canDeleteRoles],
  );

  if (loading || permissionsLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (supabaseError) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const isDialogOpen = createDialogOpen || editingRole !== null;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>
                Create and manage roles with custom permissions. System roles
                cannot be deleted.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadData}
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              {canCreateRoles && (
                <Button size="sm" onClick={openCreateDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <EnhancedDataTable
            columns={columns}
            data={roles}
            searchKey="role_name"
            searchPlaceholder="Search roles..."
            pageSize={10}
            showPageSizeSelector={false}
            tableId="roles"
            emptyMessage="No roles found"
          />
        </CardContent>
      </Card>

      {/* Create/Edit Role Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => !open && closeDialogs()}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRole
                ? `Edit Role: ${editingRole.role_name}`
                : "Create New Role"}
            </DialogTitle>
            <DialogDescription>
              {editingRole?.is_system_role
                ? "System roles can only have their description and permissions modified."
                : "Define the role name, description, and assign permissions."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Role Name */}
            <div className="space-y-2">
              <Label htmlFor="role_name">Role Name</Label>
              <Input
                id="role_name"
                value={formData.role_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    role_name: e.target.value,
                  }))
                }
                placeholder="e.g., Regional Manager"
                disabled={editingRole?.is_system_role}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe what this role can do..."
                rows={2}
              />
            </div>

            {/* Permissions */}
            <div className="space-y-2">
              <Label>Permissions</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Select the permissions this role should have. Click a category
                header to select/deselect all.
              </p>

              <Accordion type="multiple" className="w-full">
                {Object.entries(permissionsByCategory).map(
                  ([category, categoryPermissions]) => {
                    const categoryIds = categoryPermissions.map(
                      (p) => p.permission_id,
                    );
                    const selectedCount = categoryIds.filter((id) =>
                      formData.permission_ids.includes(id),
                    ).length;
                    const allSelected = selectedCount === categoryIds.length;
                    const someSelected =
                      selectedCount > 0 && selectedCount < categoryIds.length;

                    return (
                      <AccordionItem key={category} value={category}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={allSelected}
                              ref={(el) => {
                                if (el) {
                                  (
                                    el as HTMLButtonElement & {
                                      indeterminate: boolean;
                                    }
                                  ).indeterminate = someSelected;
                                }
                              }}
                              onCheckedChange={() =>
                                handleCategoryToggle(category)
                              }
                              onClick={(e) => e.stopPropagation()}
                            />
                            <span className="font-medium">{category}</span>
                            <Badge variant="outline" className="text-xs">
                              {selectedCount}/{categoryIds.length}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-8 pt-2">
                            {categoryPermissions.map((permission) => (
                              <div
                                key={permission.permission_id}
                                className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50"
                              >
                                <Checkbox
                                  id={permission.permission_id}
                                  checked={formData.permission_ids.includes(
                                    permission.permission_id,
                                  )}
                                  onCheckedChange={() =>
                                    handlePermissionToggle(
                                      permission.permission_id,
                                    )
                                  }
                                />
                                <div className="space-y-1">
                                  <Label
                                    htmlFor={permission.permission_id}
                                    className="text-sm font-medium cursor-pointer"
                                  >
                                    {permission.display_name}
                                  </Label>
                                  {permission.description && (
                                    <p className="text-xs text-muted-foreground">
                                      {permission.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  },
                )}
              </Accordion>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialogs} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : editingRole ? (
                "Save Changes"
              ) : (
                "Create Role"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Role"
        description="Are you sure you want to delete this role? Users with this role will need to be reassigned to a different role."
        itemName={deletingRole?.role_name}
      />
    </>
  );
}
