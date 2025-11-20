"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, RefreshCw, Eye, Edit, Crown, Mail, X, Trash2 } from "lucide-react";
import { getAllUsers, updateUserRole, getAllInvitations, resendInvitation, cancelInvitation, deleteUser, type UserManagementData, type InvitationData, type AppRole } from "@/lib/actions/user-management";
import { useToast } from "@/components/ui/use-toast";
import { InviteUserModal } from "./InviteUserModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { DeleteConfirmDialog } from "@/components/forms/DeleteConfirmDialog";

export function UserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserManagementData[]>([]);
  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [resending, setResending] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const [usersData, invitationsData] = await Promise.all([
        getAllUsers(),
        getAllInvitations(),
      ]);
      setUsers(usersData);
      setInvitations(invitationsData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load data";
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
    loadUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: AppRole) => {
    try {
      setUpdating(userId);
      await updateUserRole(userId, newRole);
      await loadUsers(); // Reload to get updated data
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update user role";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const handleResendInvitation = async (invitationId: string) => {
    try {
      setResending(invitationId);
      await resendInvitation(invitationId);
      await loadUsers();
      toast({
        title: "Success",
        description: "Invitation resent successfully",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to resend invitation";
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
      await loadUsers();
      toast({
        title: "Success",
        description: "Invitation cancelled",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to cancel invitation";
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
      await loadUsers();
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      setDeleteDialogOpen(false);
      setDeletingUserId(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete user";
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

  const userColumns = useMemo<ColumnDef<UserManagementData>[]>(() => [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("email") || "No email"}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as AppRole;
        return (
          <Badge
            variant={role === "admin" ? "default" : role === "editor" ? "default" : "secondary"}
            className="flex items-center gap-1 w-fit"
          >
            {role === "admin" ? (
              <Crown className="h-3 w-3" />
            ) : role === "editor" ? (
              <Edit className="h-3 w-3" />
            ) : (
              <Eye className="h-3 w-3" />
            )}
            {role}
          </Badge>
        );
      },
    },
    {
      accessorKey: "email_confirmed_at",
      header: "Status",
      cell: ({ row }) => {
        const confirmed = row.getValue("email_confirmed_at");
        return confirmed ? (
          <Badge variant="outline" className="text-green-600">Verified</Badge>
        ) : (
          <Badge variant="outline" className="text-yellow-600">Unverified</Badge>
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
        return (
          <div className="flex items-center justify-end gap-2">
            <Select
              value={user.role}
              onValueChange={(value) => handleRoleChange(user.id, value as AppRole)}
              disabled={updating === user.id}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Viewer
                  </div>
                </SelectItem>
                <SelectItem value="editor">
                  <div className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Editor
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Admin
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {updating === user.id && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDeletingUserId(user.id);
                setDeleteDialogOpen(true);
              }}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              disabled={updating === user.id}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ], [updating]);

  const invitationColumns = useMemo<ColumnDef<InvitationData>[]>(() => [
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
        const role = row.getValue("role") as AppRole;
        return (
          <Badge
            variant={role === "admin" ? "default" : role === "editor" ? "default" : "secondary"}
            className="flex items-center gap-1 w-fit"
          >
            {role === "admin" ? (
              <Crown className="h-3 w-3" />
            ) : role === "editor" ? (
              <Edit className="h-3 w-3" />
            ) : (
              <Eye className="h-3 w-3" />
            )}
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
        if (invitation.status !== "pending") return null;
        
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
  ], [resending]);

  if (loading) {
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
                Manage user roles and permissions. Only editors and admins can access this page.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadUsers}
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                size="sm"
                onClick={() => setInviteModalOpen(true)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="w-full">
            <TabsList>
              <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
              <TabsTrigger value="invitations">
                Invitations ({invitations.filter((i) => i.status === "pending").length})
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
      <InviteUserModal
        open={inviteModalOpen}
        onOpenChange={setInviteModalOpen}
        onSuccess={loadUsers}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteUser}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone and will remove all their data."
        itemName={deletingUserId ? users.find((u) => u.id === deletingUserId)?.email || undefined : undefined}
      />
    </>
  );
}
