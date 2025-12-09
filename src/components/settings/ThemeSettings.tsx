"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeSelector } from "./ThemeSelector";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function ThemeSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Select a theme to customize the look and feel of your workspace.
            Themes apply to all pages and components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSelector />
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base">Custom Themes</CardTitle>
              <CardDescription>
                Create your own color palette for a fully personalized
                experience.
              </CardDescription>
            </div>
            <Button variant="outline" disabled>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Theme
            </Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
