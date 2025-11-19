"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeSelector } from "./ThemeSelector";

export function ThemeSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Preferences</CardTitle>
        <CardDescription>Customize the appearance of your workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <ThemeSelector />
      </CardContent>
    </Card>
  );
}

