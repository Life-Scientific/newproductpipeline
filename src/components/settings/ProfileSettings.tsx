"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSupabase } from "@/hooks/use-supabase";
import { User } from "lucide-react";

export function ProfileSettings() {
  const supabase = useSupabase();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, [supabase]);

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading profile...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              {user?.email?.charAt(0).toUpperCase() || <User className="h-8 w-8" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user?.email || "No email"}</p>
            <p className="text-xs text-muted-foreground">User ID: {user?.id || "N/A"}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <p className="text-sm text-muted-foreground">{user?.email || "No email"}</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Account Created</label>
          <p className="text-sm text-muted-foreground">
            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

