"use client";

import { PanelLeft, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface FooterActionsProps {
  isCollapsed: boolean;
}

export function FooterActions({ isCollapsed }: FooterActionsProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8 shrink-0", isCollapsed && "h-9 w-9")}
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {isCollapsed ? "Expand" : "Collapse"}{" "}
        <kbd className="ml-1 text-[10px] opacity-60">⌘B</kbd>
      </TooltipContent>
    </Tooltip>
  );
}
