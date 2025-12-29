"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, LogOut, RefreshCw, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSupabase } from "@/hooks/use-supabase";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";
import { revalidateAllCaches } from "@/lib/actions/cache";
import { error } from "@/lib/logger";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  userInitial: string;
  userName: string;
  isCollapsed: boolean;
}

export function UserMenu({
  userInitial,
  userName,
  isCollapsed,
}: UserMenuProps) {
  const router = useRouter();
  const supabase = useSupabase();
  const {
    preferences,
    updatePreferences,
    CURRENCY_OPTIONS,
    VOLUME_OPTIONS,
    WEIGHT_OPTIONS,
  } = useDisplayPreferences();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      const result = await revalidateAllCaches();
      if (result.success) {
        router.refresh();
      }
    } catch (err) {
      error("Failed to refresh data:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const triggerButton = (
    <Button
      variant="ghost"
      className={cn(
        "transition-all hover:bg-sidebar-accent",
        isCollapsed ? "h-9 w-9 p-0" : "flex-1 h-9 justify-start gap-2 px-2",
      )}
    >
      <div className="relative shrink-0">
        <Avatar className={cn(isCollapsed ? "h-7 w-7" : "h-6 w-6")}>
          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-[10px] font-semibold">
            {userInitial}
          </AvatarFallback>
        </Avatar>
      </div>
      {!isCollapsed && (
        <span className="flex-1 truncate text-left text-sm font-medium">
          {userName}
        </span>
      )}
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64"
        align={isCollapsed ? "center" : "start"}
        side="right"
        sideOffset={8}
      >
        <div className="px-2 py-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xs font-semibold">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-2 py-1.5">
          Currency
        </DropdownMenuLabel>
        {CURRENCY_OPTIONS.map((option) => {
          const isActive = preferences.currency === option.code;
          return (
            <DropdownMenuItem
              key={option.code}
              onClick={() => updatePreferences({ currency: option.code })}
              className={cn(
                "cursor-pointer gap-2 px-2 py-2 transition-colors",
                isActive && "bg-accent",
              )}
            >
              <span className="w-6 text-center font-medium">
                {option.symbol}
              </span>
              <span className="flex-1 text-sm">{option.name}</span>
              {isActive && <Check className="h-4 w-4 text-primary shrink-0" />}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-2 py-1.5">
          Volume Unit
        </DropdownMenuLabel>
        {VOLUME_OPTIONS.map((option) => {
          const isActive = preferences.volumeUnit === option.code;
          return (
            <DropdownMenuItem
              key={option.code}
              onClick={() => updatePreferences({ volumeUnit: option.code })}
              className={cn(
                "cursor-pointer gap-2 px-2 py-2 transition-colors",
                isActive && "bg-accent",
              )}
            >
              <span className="flex-1 text-sm">{option.name}</span>
              {isActive && <Check className="h-4 w-4 text-primary shrink-0" />}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-2 py-1.5">
          Weight Unit
        </DropdownMenuLabel>
        {WEIGHT_OPTIONS.map((option) => {
          const isActive = preferences.weightUnit === option.code;
          return (
            <DropdownMenuItem
              key={option.code}
              onClick={() => updatePreferences({ weightUnit: option.code })}
              className={cn(
                "cursor-pointer gap-2 px-2 py-2 transition-colors",
                isActive && "bg-accent",
              )}
            >
              <span className="flex-1 text-sm">{option.name}</span>
              {isActive && <Check className="h-4 w-4 text-primary shrink-0" />}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleRefreshData}
          disabled={isRefreshing}
          className="cursor-pointer"
        >
          {isRefreshing ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          <span>Refresh all data</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface SignInButtonProps {
  isCollapsed: boolean;
}

export function SignInButton({ isCollapsed }: SignInButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size={isCollapsed ? "icon" : "default"}
      className={cn(isCollapsed ? "h-9 w-9" : "flex-1 h-9")}
      onClick={() => router.push("/login")}
    >
      {isCollapsed ? <User className="h-4 w-4" /> : "Sign In"}
    </Button>
  );
}
