"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAllWorkspaceMenuItems,
  toggleMenuItemVisibility,
  type WorkspaceMenuItem,
} from "@/lib/actions/workspaces";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

export function MenuVisibilitySettings() {
  const { currentWorkspace } = useWorkspace();
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<WorkspaceMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!currentWorkspace?.workspace_id) return;

    const loadMenuItems = async () => {
      try {
        setLoading(true);
        const items = await getAllWorkspaceMenuItems(
          currentWorkspace.workspace_id,
        );
        setMenuItems(items);
      } catch (error) {
        console.error("Failed to load menu items:", error);
        toast({
          title: "Error",
          description: "Failed to load menu items",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkspace?.workspace_id]); // Only depend on workspace_id, not the entire object

  const handleToggle = async (menuItemId: string, currentValue: boolean) => {
    try {
      setUpdating((prev) => new Set(prev).add(menuItemId));
      await toggleMenuItemVisibility(menuItemId, !currentValue);

      // Update local state
      setMenuItems((prev) =>
        prev.map((item) =>
          item.menu_item_id === menuItemId
            ? { ...item, is_active: !currentValue }
            : item,
        ),
      );

      toast({
        title: "Success",
        description: "Menu visibility updated",
      });
    } catch (error) {
      console.error("Failed to toggle menu item:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update menu visibility",
        variant: "destructive",
      });
    } finally {
      setUpdating((prev) => {
        const next = new Set(prev);
        next.delete(menuItemId);
        return next;
      });
    }
  };

  // Group items by group_name
  const groupedItems = menuItems.reduce(
    (acc, item) => {
      if (!acc[item.group_name]) {
        acc[item.group_name] = [];
      }
      acc[item.group_name].push(item);
      return acc;
    },
    {} as Record<string, WorkspaceMenuItem[]>,
  );

  // Sort groups and items within groups
  const sortedGroups = Object.keys(groupedItems).sort();
  sortedGroups.forEach((group) => {
    groupedItems[group].sort((a, b) => a.display_order - b.display_order);
  });

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Page Visibility</CardTitle>
          <CardDescription>
            Control which pages are visible in the sidebar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Visibility</CardTitle>
        <CardDescription>
          Control which pages are visible in the sidebar. Hidden pages are still
          accessible via direct URL.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {sortedGroups.map((groupName) => {
          const items = groupedItems[groupName];
          const activeCount = items.filter((item) => item.is_active).length;

          return (
            <div key={groupName} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{groupName}</h3>
                <Badge variant="secondary" className="text-xs">
                  {activeCount} / {items.length} visible
                </Badge>
              </div>
              <div className="space-y-2 pl-4 border-l-2 border-muted">
                {items.map((item) => {
                  const isUpdating = updating.has(item.menu_item_id);

                  return (
                    <div
                      key={item.menu_item_id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <Label
                            htmlFor={`menu-${item.menu_item_id}`}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {item.title}
                          </Label>
                          {!item.is_active && (
                            <Badge variant="outline" className="text-xs">
                              Hidden
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.url}
                        </p>
                      </div>
                      <Switch
                        id={`menu-${item.menu_item_id}`}
                        checked={item.is_active ?? true}
                        onCheckedChange={() =>
                          handleToggle(
                            item.menu_item_id,
                            item.is_active ?? true,
                          )
                        }
                        disabled={isUpdating}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {menuItems.length === 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-8">
            <AlertCircle className="h-4 w-4" />
            <span>No menu items found for this workspace.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
