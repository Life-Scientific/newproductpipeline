"use client";

import { useState, useEffect } from "react";
import { log, warn, error, table } from "@/lib/logger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Mail, Shield } from "lucide-react";
import { inviteUserByEmail, getAllRoles } from "@/lib/actions/user-management";
import { type Role } from "@/lib/permissions";

interface InviteUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function InviteUserModal({
  open,
  onOpenChange,
  onSuccess,
}: InviteUserModalProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("Viewer");
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  useEffect(() => {
    async function fetchRoles() {
      try {
        setLoadingRoles(true);
        const rolesData = await getAllRoles();
        setRoles(rolesData);
        // Default to Viewer if available
        const viewerRole = rolesData.find((r) => r.role_name === "Viewer");
        if (viewerRole) {
          setSelectedRole(viewerRole.role_name);
        } else if (rolesData.length > 0) {
          setSelectedRole(rolesData[0].role_name);
        }
      } catch (err) {
        error("Failed to load roles:", err);
      } finally {
        setLoadingRoles(false);
      }
    }

    if (open) {
      fetchRoles();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await inviteUserByEmail(email.trim(), selectedRole);
      if (result.success) {
        toast({
          title: "Success",
          description: `Invitation sent to ${email}`,
        });
        setEmail("");
        setSelectedRole("Viewer");
        onOpenChange(false);
        onSuccess?.();
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to send invitation";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedRoleData = roles.find((r) => r.role_name === selectedRole);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
          <DialogDescription>
            Send an invitation email to a new user. They will receive a link to
            create their account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={selectedRole}
                onValueChange={setSelectedRole}
                disabled={loading || loadingRoles}
              >
                <SelectTrigger>
                  {loadingRoles ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SelectValue />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.role_id} value={role.role_name}>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        {role.role_name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedRoleData?.description && (
                <p className="text-sm text-muted-foreground">
                  {selectedRoleData.description}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || loadingRoles}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invitation
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
