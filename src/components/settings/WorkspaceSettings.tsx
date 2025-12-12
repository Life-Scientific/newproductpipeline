"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import {
  getWorkspaces,
  setUserDefaultWorkspace,
  type Workspace,
} from "@/lib/actions/workspaces";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function WorkspaceSettings() {
  const { currentWorkspace, switchWorkspace } = useWorkspace();
  const { toast } = useToast();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadWorkspaces() {
      try {
        const data = await getWorkspaces();
        setWorkspaces(data);
      } catch (error) {
        console.error("Failed to load workspaces:", error);
        toast({
          title: "Error",
          description: "Failed to load workspaces",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadWorkspaces();
  }, []);

  const handleSetDefault = async (workspaceId: string) => {
    setIsSaving(true);
    try {
      await setUserDefaultWorkspace(workspaceId);
      const workspace = workspaces.find((w) => w.workspace_id === workspaceId);
      if (workspace) {
        const defaultRoute = await switchWorkspace(workspace.slug);
        // Navigate to the default route for this workspace
        window.location.href = defaultRoute;
      }
      toast({
        title: "Success",
        description: "Default workspace updated",
      });
    } catch (error) {
      console.error("Failed to set default workspace:", error);
      toast({
        title: "Error",
        description: "Failed to set default workspace",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground">Loading workspaces...</div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace Preferences</CardTitle>
        <CardDescription>
          Manage your workspace settings and defaults
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Workspace</label>
          <p className="text-sm text-muted-foreground">
            {currentWorkspace?.name || "No workspace selected"}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Available Workspaces</label>
          <div className="space-y-2">
            {workspaces.map((workspace) => {
              const isCurrent =
                currentWorkspace?.workspace_id === workspace.workspace_id;
              return (
                <div
                  key={workspace.workspace_id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">{workspace.name}</p>
                    {workspace.description && (
                      <p className="text-xs text-muted-foreground">
                        {workspace.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isCurrent && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Current
                      </span>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(workspace.workspace_id)}
                      disabled={isSaving || isCurrent}
                    >
                      Set as Default
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
