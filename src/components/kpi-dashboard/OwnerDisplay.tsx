"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface OwnerDisplayProps {
  ownerName: string | null;
  ownerEmail?: string | null;
  variant?: "compact" | "expanded" | "badge";
  className?: string;
  showAvatar?: boolean;
}

export function OwnerDisplay({
  ownerName,
  ownerEmail,
  variant = "compact",
  className,
  showAvatar = false,
}: OwnerDisplayProps) {
  if (!ownerName) {
    return (
      <Badge
        variant="outline"
        className={cn(
          "text-[10px] px-1.5 h-4 font-normal",
          variant === "badge" && "text-xs px-2 h-5",
          className,
        )}
      >
        Unassigned
      </Badge>
    );
  }

  const initials = ownerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (variant === "badge") {
    return (
      <Badge variant="secondary" className={cn("text-xs px-2 h-5", className)}>
        {showAvatar && (
          <Avatar className="h-3 w-3 mr-1.5">
            <AvatarFallback className="bg-primary/10 text-primary text-[8px]">
              {initials}
            </AvatarFallback>
          </Avatar>
        )}
        {ownerName}
      </Badge>
    );
  }

  if (variant === "expanded") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {showAvatar && (
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium truncate">{ownerName}</span>
          {ownerEmail && (
            <span className="text-[10px] text-muted-foreground truncate">
              {ownerEmail}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Compact variant (default)
  return (
    <div className={cn("flex items-center gap-1.5 text-xs text-muted-foreground", className)}>
      {showAvatar && (
        <Avatar className="h-4 w-4">
          <AvatarFallback className="bg-muted text-muted-foreground text-[8px]">
            {initials}
          </AvatarFallback>
        </Avatar>
      )}
      <span className="truncate max-w-[100px]" title={ownerEmail || ownerName}>
        {ownerName}
      </span>
    </div>
  );
}

