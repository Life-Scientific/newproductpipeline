"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "./ProfileSettings";
import { ThemeSettings } from "./ThemeSettings";
import { WorkspaceSettings } from "./WorkspaceSettings";
import { PageLayout } from "@/components/layout/PageLayout";

export function SettingsPage() {
  return (
    <PageLayout
      title="Settings"
      description="Manage your account settings, preferences, and workspace configuration"
      variant="single"
    >
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
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
      </Tabs>
    </PageLayout>
  );
}

