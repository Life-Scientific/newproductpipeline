"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "./ProfileSettings";
import { ThemeSettings } from "./ThemeSettings";
import { WorkspaceSettings } from "./WorkspaceSettings";
import { UserManagement } from "./UserManagement";
import { PageLayout } from "@/components/layout/PageLayout";
import { isEditor } from "@/lib/actions/user-management";
import { Edit } from "lucide-react";

export function SettingsPage() {
  const [isUserEditor, setIsUserEditor] = useState(false);
  const [checkingEditor, setCheckingEditor] = useState(true);

  useEffect(() => {
    const checkEditor = async () => {
      try {
        const editor = await isEditor();
        setIsUserEditor(editor);
      } catch {
        setIsUserEditor(false);
      } finally {
        setCheckingEditor(false);
      }
    };
    checkEditor();
  }, []);

  return (
    <PageLayout
      title="Settings"
      description="Manage your account settings, preferences, and workspace configuration"
      variant="single"
    >
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className={`grid w-full ${isUserEditor ? "grid-cols-4" : "grid-cols-3"}`}>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          {isUserEditor && (
            <TabsTrigger value="users">
              <Edit className="h-4 w-4 mr-2" />
              Users & Roles
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="theme" className="mt-6">
          <ThemeSettings />
        </TabsContent>
        <TabsContent value="workspace" className="mt-6">
          <WorkspaceSettings />
        </TabsContent>
        {isUserEditor && (
          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>
        )}
      </Tabs>
    </PageLayout>
  );
}

