"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Users, UserPlus, UserMinus, Shield } from "lucide-react";
import { getAllUsers } from "@/lib/actions/user-management";
import { grantKPIAccess, revokeKPIAccess, userHasKPIAccess } from "@/lib/actions/kpi-permissions";
import type { UserManagementData } from "@/lib/actions/user-management";
import { Badge } from "@/components/ui/badge";

export function KPIPermissionManager() {
  const { toast } = useToast();
  const { canViewKPIs } = usePermissions();
  const [users, setUsers] = useState<UserManagementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [granting, setGranting] = useState(false);
  const [userKPIStatus, setUserKPIStatus] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);

  // Load users
  useEffect(() => {
    async function loadUsers() {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);

        // Check KPI access for each user
        const statusPromises = allUsers.map(async (user) => {
          const hasAccess = await userHasKPIAccess(user.id);
          return { userId: user.id, hasAccess };
        });

        const statuses = await Promise.all(statusPromises);
        const statusMap: Record<string, boolean> = {};
        statuses.forEach(({ userId, hasAccess }) => {
          statusMap[userId] = hasAccess;
        });
        setUserKPIStatus(statusMap);
      } catch (error) {
        console.error("Failed to load users:", error);
        toast({
          title: "Error",
          description: "Failed to load users. You may not have permission.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    if (canViewKPIs) {
      loadUsers();
    }
  }, [canViewKPIs, toast]);

  const handleGrant = async () => {
    if (!selectedUserId) {
      toast({
        title: "Error",
        description: "Please select a user",
        variant: "destructive",
      });
      return;
    }

    setGranting(true);
    try {
      const result = await grantKPIAccess(selectedUserId);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        // Update status
        setUserKPIStatus((prev) => ({ ...prev, [selectedUserId]: true }));
        setSelectedUserId("");
        setOpen(false);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to grant access",
        variant: "destructive",
      });
    } finally {
      setGranting(false);
    }
  };

  const handleRevoke = async (userId: string) => {
    setGranting(true);
    try {
      const result = await revokeKPIAccess(userId);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        // Update status
        setUserKPIStatus((prev) => ({ ...prev, [userId]: false }));
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to revoke access",
        variant: "destructive",
      });
    } finally {
      setGranting(false);
    }
  };

  if (!canViewKPIs) {
    return null;
  }

  const usersWithAccess = users.filter((u) => userKPIStatus[u.id]);
  const usersWithoutAccess = users.filter((u) => !userKPIStatus[u.id]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              KPI Access Management
            </CardTitle>
            <CardDescription>
              Grant or revoke KPI Dashboard access. Anyone with KPI access can grant it to others.
            </CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Grant Access
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Grant KPI Access</DialogTitle>
                <DialogDescription>
                  Select a user to grant them access to the KPI Dashboard. They will receive the
                  "KPI Manager" role with full KPI permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">User</label>
                  <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {usersWithoutAccess.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.email || "Unknown"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGrant} disabled={granting || !selectedUserId}>
                  {granting ? "Granting..." : "Grant Access"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-muted-foreground py-4">Loading users...</div>
        ) : (
          <div className="space-y-6">
            {/* Users with access */}
            {usersWithAccess.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Users with KPI Access ({usersWithAccess.length})
                </h3>
                <div className="space-y-2">
                  {usersWithAccess.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {user.email || "Unknown"}
                        </span>
                        <Badge variant="secondary">KPI Manager</Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevoke(user.id)}
                        disabled={granting}
                      >
                        <UserMinus className="h-4 w-4 mr-2" />
                        Revoke
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users without access */}
            {usersWithoutAccess.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3">
                  Users without KPI Access ({usersWithoutAccess.length})
                </h3>
                <div className="space-y-2">
                  {usersWithoutAccess.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                    >
                      <span className="text-sm text-muted-foreground">
                        {user.email || "Unknown"}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          setSelectedUserId(user.id);
                          await handleGrant();
                        }}
                        disabled={granting}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Grant
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {users.length === 0 && (
              <div className="text-center text-muted-foreground py-4">
                No users found. You may not have permission to view users.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

