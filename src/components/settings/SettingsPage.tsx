"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "./ProfileSettings";
import { ThemeSettings } from "./ThemeSettings";
import { WorkspaceSettings } from "./WorkspaceSettings";
import { UserManagement } from "./UserManagement";
import { RoleManagement } from "./RoleManagement";
import { MenuVisibilitySettings } from "./MenuVisibilitySettings";
import { PageLayout } from "@/components/layout/PageLayout";
import { hasPermission } from "@/lib/actions/user-management";
import { PERMISSIONS } from "@/lib/permissions";
import { Users, Shield } from "lucide-react";

export function SettingsPage() {
  const [canManageUsers, setCanManageUsers] = useState(false);
  const [canManageRoles, setCanManageRoles] = useState(false);
  const [checkingPermissions, setCheckingPermissions] = useState(true);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const [userPerm, rolePerm] = await Promise.all([
          hasPermission(PERMISSIONS.USER_VIEW),
          hasPermission(PERMISSIONS.ROLE_VIEW),
        ]);
        setCanManageUsers(userPerm);
        setCanManageRoles(rolePerm);
      } catch {
        setCanManageUsers(false);
        setCanManageRoles(false);
      } finally {
        setCheckingPermissions(false);
      }
    };
    checkPermissions();
  }, []);

  // Calculate number of tabs for grid layout
  const tabCount = 3 + (canManageUsers ? 1 : 0) + (canManageRoles ? 1 : 0);

  return (
    <PageLayout
      title="Settings"
      description="Manage your account settings, preferences, and workspace configuration"
      variant="single"
    >
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className={`grid w-full grid-cols-${tabCount}`} style={{ gridTemplateColumns: `repeat(${tabCount}, minmax(0, 1fr))` }}>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          {canManageUsers && (
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
          )}
          {canManageRoles && (
            <TabsTrigger value="roles">
              <Shield className="h-4 w-4 mr-2" />
              Roles
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="theme" className="mt-6">
          <ThemeSettings />
        </TabsContent>
        <TabsContent value="workspace" className="mt-6 space-y-6">
          <WorkspaceSettings />
          {canManageUsers && <MenuVisibilitySettings />}
        </TabsContent>
        {canManageUsers && (
          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>
        )}
        {canManageRoles && (
          <TabsContent value="roles" className="mt-6">
            <RoleManagement />
          </TabsContent>
        )}
      </Tabs>
    </PageLayout>
  );
}
