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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
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
  Loader2,
  RefreshCw,
  Mail,
  X,
  Trash2,
  Shield,
  UserCog,
  UserPlus,
} from "lucide-react";
import {
  getAllUsers,
  getAllRoles,
  updateUserRoles,
  getAllInvitations,
  getUserManagementData,
  resendInvitation,
  cancelInvitation,
  deleteUser,
  type UserManagementData,
  type InvitationData,
} from "@/lib/actions/user-management";
import { type Role } from "@/lib/permissions";
import { useToast } from "@/components/ui/use-toast";
import { InviteUserModal } from "./InviteUserModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { DeleteConfirmDialog } from "@/components/forms/DeleteConfirmDialog";
import { usePermissions } from "@/hooks/use-permissions";

export function UserManagement() {
  const { toast } = useToast();
  const {
    canManageUsers,
    canInviteUsers,
    canDeleteUsers,
    isLoading: permissionsLoading,
  } = usePermissions();
  const [users, setUsers] = useState<UserManagementData[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [resending, setResending] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // Role editing state
  const [editingUser, setEditingUser] = useState<UserManagementData | null>(
    null,
  );
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Use batch function to fetch all data in parallel (more efficient)
      const { users: usersData, roles: rolesData, invitations: invitationsData } =
        await getUserManagementData();
      setUsers(usersData);
      setRoles(rolesData);
      setInvitations(invitationsData);
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

  const openRoleEditDialog = (user: UserManagementData) => {
    setEditingUser(user);
    setSelectedRoleIds(user.roles.map((r) => r.role_id));
  };

  const closeRoleEditDialog = () => {
    setEditingUser(null);
    setSelectedRoleIds([]);
  };

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoleIds((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId],
    );
  };

  const handleSaveRoles = async () => {
    if (!editingUser) return;

    try {
      setSaving(true);

      if (selectedRoleIds.length === 0) {
        throw new Error("At least one role must be selected");
      }

      await updateUserRoles(editingUser.id, selectedRoleIds);
      await loadData();
      toast({
        title: "Success",
        description: "User roles updated successfully",
      });
      closeRoleEditDialog();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update user roles";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResendInvitation = async (invitationId: string) => {
    try {
      setResending(invitationId);
      await resendInvitation(invitationId);
      await loadData();
      toast({
        title: "Success",
        description: "Invitation resent successfully",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to resend invitation";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setResending(null);
    }
  };

  const handleCancelInvitation = async (invitationId: string) => {
    try {
      await cancelInvitation(invitationId);
      await loadData();
      toast({
        title: "Success",
        description: "Invitation cancelled",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to cancel invitation";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUserId) return;
    try {
      await deleteUser(deletingUserId);
      await loadData();
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      setDeleteDialogOpen(false);
      setDeletingUserId(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete user";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setDeleteDialogOpen(false);
      setDeletingUserId(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleBadgeVariant = (
    roleName: string,
  ): "default" | "secondary" | "outline" => {
    switch (roleName) {
      case "Admin":
        return "default";
      case "Editor":
      case "Portfolio Manager":
      case "KPI Manager":
        return "default";
      case "Country Manager":
      case "KPI Contributor":
        return "secondary";
      default:
        return "outline";
    }
  };


  const userColumns = useMemo<ColumnDef<UserManagementData>[]>(
    () => [
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <span className="font-medium">
            {row.getValue("email") || "No email"}
          </span>
        ),
      },
      {
        accessorKey: "role_names",
        header: "Roles",
        cell: ({ row }) => {
          const roleNames = row.original.role_names || ["Viewer"];
          return (
            <div className="flex flex-wrap gap-1">
              {roleNames.map((role, idx) => (
                <Badge
                  key={idx}
                  variant={getRoleBadgeVariant(role)}
                  className="flex items-center gap-1"
                >
                  <Shield className="h-3 w-3" />
                  {role}
                </Badge>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "email_confirmed_at",
        header: "Status",
        cell: ({ row }) => {
          const confirmed = row.getValue("email_confirmed_at");
          return confirmed ? (
            <Badge
              variant="outline"
              className="text-green-600 border-green-600/30"
            >
              Verified
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-yellow-600 border-yellow-600/30"
            >
              Unverified
            </Badge>
          );
        },
      },
      {
        accessorKey: "user_created_at",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {formatDate(row.getValue("user_created_at"))}
          </span>
        ),
      },
      {
        accessorKey: "last_sign_in_at",
        header: "Last Sign In",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {formatDate(row.getValue("last_sign_in_at"))}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const user = row.original;
          // Don't show actions if user has no permissions
          if (!canManageUsers && !canDeleteUsers) return null;

          return (
            <div className="flex items-center justify-end gap-2">
              {canManageUsers && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openRoleEditDialog(user)}
                  className="h-8"
                >
                  <UserCog className="h-4 w-4 mr-1" />
                  Edit Roles
                </Button>
              )}
              {canDeleteUsers && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDeletingUserId(user.id);
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
    [canManageUsers, canDeleteUsers],
  );

  const invitationColumns = useMemo<ColumnDef<InvitationData>[]>(
    () => [
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue("email")}</span>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.getValue("role") as string;
          return (
            <Badge
              variant={getRoleBadgeVariant(role)}
              className="flex items-center gap-1 w-fit"
            >
              <Shield className="h-3 w-3" />
              {role}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge
              variant={
                status === "accepted"
                  ? "outline"
                  : status === "expired"
                    ? "destructive"
                    : "default"
              }
            >
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "invited_by_email",
        header: "Invited By",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.getValue("invited_by_email") || "Unknown"}
          </span>
        ),
      },
      {
        accessorKey: "expires_at",
        header: "Expires",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {formatDate(row.getValue("expires_at"))}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const invitation = row.original;
          if (invitation.status !== "pending" || !canInviteUsers) return null;

          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleResendInvitation(invitation.id)}
                disabled={resending === invitation.id}
              >
                {resending === invitation.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-1" />
                    Resend
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCancelInvitation(invitation.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [resending, canInviteUsers],
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

  if (error) {
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

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users and their role assignments. Users can have multiple
                roles.
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
              {canInviteUsers && (
                <Button size="sm" onClick={() => setInviteModalOpen(true)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="w-full">
            <TabsList>
              <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
              <TabsTrigger value="invitations">
                Invitations (
                {invitations.filter((i) => i.status === "pending").length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="mt-4">
              <EnhancedDataTable
                columns={userColumns}
                data={users}
                searchKey="email"
                searchPlaceholder="Search users..."
                pageSize={10}
                showPageSizeSelector={true}
                tableId="users"
                emptyMessage="No users found"
              />
            </TabsContent>
            <TabsContent value="invitations" className="mt-4">
              <EnhancedDataTable
                columns={invitationColumns}
                data={invitations}
                searchKey="email"
                searchPlaceholder="Search invitations..."
                pageSize={10}
                showPageSizeSelector={true}
                tableId="invitations"
                emptyMessage="No invitations found"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Role Edit Dialog */}
      <Dialog
        open={editingUser !== null}
        onOpenChange={(open) => !open && closeRoleEditDialog()}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User Roles</DialogTitle>
            <DialogDescription>{editingUser?.email}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Select the roles for this user. Users can have multiple roles, and
              their permissions will be combined.
            </p>

            <div className="space-y-3">
              {roles.map((role) => (
                <div
                  key={role.role_id}
                  className="flex items-start gap-3 p-3 rounded-md border hover:bg-muted/50"
                >
                  <Checkbox
                    id={role.role_id}
                    checked={selectedRoleIds.includes(role.role_id)}
                    onCheckedChange={() => handleRoleToggle(role.role_id)}
                  />
                  <div className="space-y-1 flex-1">
                    <Label
                      htmlFor={role.role_id}
                      className="text-sm font-medium cursor-pointer flex items-center gap-2"
                    >
                      {role.role_name}
                      {role.is_system_role && (
                        <Badge variant="outline" className="text-xs">
                          System
                        </Badge>
                      )}
                    </Label>
                    {role.description && (
                      <p className="text-xs text-muted-foreground">
                        {role.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {role.permissions.length} permission
                      {role.permissions.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {selectedRoleIds.length === 0 && (
              <Alert>
                <AlertDescription>
                  At least one role must be selected.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeRoleEditDialog}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveRoles}
              disabled={saving || selectedRoleIds.length === 0}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Roles"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <InviteUserModal
        open={inviteModalOpen}
        onOpenChange={setInviteModalOpen}
        onSuccess={loadData}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteUser}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone and will remove all their data."
        itemName={
          deletingUserId
            ? users.find((u) => u.id === deletingUserId)?.email || undefined
            : undefined
        }
      />
    </>
  );
}
