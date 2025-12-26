"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH_COLLAPSED = "3.5rem"; // 56px - icon rail
const SIDEBAR_WIDTH_EXPANDED = "13.75rem"; // 220px - with labels
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext<{
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  isMobile: boolean;
} | null>(null);

export function useSidebarContext() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// Hover indicator context for sliding highlight effect
type HoverIndicatorState = {
  hoveredRect: DOMRect | null;
  containerRef: React.RefObject<HTMLUListElement | null>;
  setHoveredRect: (rect: DOMRect | null) => void;
};

const HoverIndicatorContext = React.createContext<HoverIndicatorState | null>(
  null,
);

function useHoverIndicator() {
  return React.useContext(HoverIndicatorContext);
}

const sidebarVariants = cva(
  "group/sidebar-wrapper relative flex flex-col text-sidebar-foreground transition-[width] duration-200 ease-out",
  {
    variants: {
      variant: {
        sidebar:
          "h-screen bg-sidebar border-r border-sidebar-border sticky top-0 self-start",
        floating:
          "h-screen bg-sidebar border-r border-sidebar-border sticky top-0 self-start",
        inset: "h-full bg-sidebar",
      },
    },
    defaultVariants: {
      variant: "sidebar",
    },
  },
);

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
  }
>(({ defaultOpen = true, children, ...props }, ref) => {
  const [openMobile, setOpenMobile] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Always start with defaultOpen for SSR consistency
  // Then sync with localStorage after hydration
  const [open, setOpen] = React.useState(defaultOpen);

  // Sync with localStorage after hydration to avoid mismatch
  React.useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_COOKIE_NAME);
    if (stored !== null) {
      setOpen(stored === "true");
    }
    setIsHydrated(true);
  }, []);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Debounce resize events to avoid excessive re-renders
    let timeoutId: NodeJS.Timeout;
    const debouncedCheckMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", debouncedCheckMobile);
    return () => {
      window.removeEventListener("resize", debouncedCheckMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Persist state to localStorage (only after hydration)
  React.useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(SIDEBAR_COOKIE_NAME, String(open));
    }
  }, [open, isHydrated]);

  // Keyboard shortcut (Cmd+B / Ctrl+B)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const state: "expanded" | "collapsed" = open ? "expanded" : "collapsed";

  const toggleSidebar = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      isMobile,
    }),
    [state, open, openMobile, toggleSidebar, isMobile],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    VariantProps<typeof sidebarVariants> & {
      side?: "left" | "right";
      variant?: "sidebar" | "floating" | "inset";
      collapsible?: "offcanvas" | "icon" | "none";
    }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "icon",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { state } = useSidebarContext();
    const width =
      state === "collapsed" ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

    return (
      <div
        ref={ref}
        className={cn(sidebarVariants({ variant }), className)}
        style={{ width }}
        data-state={state}
        data-side={side}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentProps<typeof Slot>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, isMobile, setOpenMobile } = useSidebarContext();

  return (
    <Slot
      ref={ref}
      data-sidebar="trigger"
      className={cn("cursor-pointer", className)}
      onClick={(e) => {
        onClick?.(e);
        if (isMobile) {
          setOpenMobile((prev) => !prev);
        } else {
          toggleSidebar();
        }
      }}
      {...props}
    />
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="rail"
      className={cn(
        "absolute inset-y-0 z-50 hidden w-2 -translate-x-full transition-all group-hover/sidebar-wrapper:translate-x-0 group-data-[collapsible=icon]/sidebar-wrapper:translate-x-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "flex h-8 w-full rounded-md border border-sidebar-border bg-sidebar-accent px-3 py-1 text-sm text-sidebar-foreground ring-offset-sidebar transition-shadow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sidebar-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { state } = useSidebarContext();
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn(
        "flex flex-col border-b border-sidebar-border transition-all duration-200",
        state === "collapsed" ? "items-center p-1.5" : "p-2",
        className,
      )}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { state } = useSidebarContext();
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn(
        "flex flex-col border-t border-sidebar-border transition-all duration-200",
        state === "collapsed" ? "items-center p-1.5" : "p-2",
        className,
      )}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="separator"
      className={cn("h-px w-full bg-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { state } = useSidebarContext();
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden transition-all duration-200",
        state === "collapsed" && "items-center",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { state } = useSidebarContext();
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn(
        "relative flex w-full min-w-0 flex-col",
        state === "collapsed" ? "p-1 items-center" : "px-2 py-1",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const { state } = useSidebarContext();

  // Hide completely in collapsed state
  if (state === "collapsed") {
    return null;
  }

  return (
    <div
      ref={ref}
      data-sidebar="group-label"
      data-label
      className={cn(
        "flex h-7 shrink-0 items-center px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 transition-opacity duration-150",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Slot> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={asChild ? ref : (ref as React.Ref<HTMLButtonElement>)}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-[transform,background-color,color] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  const { state } = useSidebarContext();
  const containerRef = React.useRef<HTMLUListElement | null>(null);
  const [hoveredRect, setHoveredRect] = React.useState<DOMRect | null>(null);

  // Combine refs
  const setRefs = React.useCallback(
    (node: HTMLUListElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const contextValue = React.useMemo(
    () => ({ hoveredRect, containerRef, setHoveredRect }),
    [hoveredRect],
  );

  return (
    <HoverIndicatorContext.Provider value={contextValue}>
      <ul
        ref={setRefs}
        data-sidebar="menu"
        className={cn(
          "relative flex min-w-0 flex-col gap-0.5",
          state === "collapsed" ? "w-auto items-center" : "w-full",
          className,
        )}
        onMouseLeave={() => setHoveredRect(null)}
        {...props}
      >
        {/* Sliding hover indicator */}
        <AnimatePresence>
          {hoveredRect && containerRef.current && (
            <motion.div
              className="pointer-events-none absolute left-0 right-0 z-0 rounded-lg bg-sidebar-accent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                y:
                  hoveredRect.top -
                  containerRef.current.getBoundingClientRect().top,
                height: hoveredRect.height,
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
                mass: 0.5,
              }}
              style={{
                width: state === "collapsed" ? hoveredRect.width : "100%",
                marginLeft:
                  state === "collapsed"
                    ? (containerRef.current.getBoundingClientRect().width -
                        hoveredRect.width) /
                      2
                    : 0,
              }}
            />
          )}
        </AnimatePresence>
        {props.children}
      </ul>
    </HoverIndicatorContext.Provider>
  );
});
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, onMouseEnter, ...props }, ref) => {
  const itemRef = React.useRef<HTMLLIElement | null>(null);
  const hoverContext = useHoverIndicator();

  // Combine refs
  const setRefs = React.useCallback(
    (node: HTMLLIElement | null) => {
      itemRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      onMouseEnter?.(e);
      if (itemRef.current && hoverContext) {
        hoverContext.setHoveredRect(itemRef.current.getBoundingClientRect());
      }
    },
    [onMouseEnter, hoverContext],
  );

  return (
    <li
      ref={setRefs}
      data-sidebar="menu-item"
      className={cn("group/menu-item relative z-10", className)}
      onMouseEnter={handleMouseEnter}
      {...props}
    />
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-3 text-left text-sm outline-none ring-sidebar-ring transition-[color,transform] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sidebar-accent-foreground focus-visible:ring-2 active:text-sidebar-accent-foreground active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:top-1/2 data-[active=true]:before:-translate-y-1/2 data-[active=true]:before:h-5 data-[active=true]:before:w-0.5 data-[active=true]:before:rounded-full data-[active=true]:before:bg-primary data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]/sidebar-wrapper:!w-9 group-data-[collapsible=icon]/sidebar-wrapper:!px-0 group-data-[collapsible=icon]/sidebar-wrapper:justify-center [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:transition-[color,transform] [&>svg]:duration-[250ms] [&>svg]:ease-[cubic-bezier(0.4,0,0.2,1)]",
  {
    variants: {
      variant: {
        default: "hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-9 text-sm",
        sm: "h-8 text-xs",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof sidebarMenuButtonVariants> & {
      asChild?: boolean;
      isActive?: boolean;
      tooltip?: string | React.ComponentProps<typeof TooltipContent>;
    }
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebarContext();
    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Slot> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ asChild = false, showOnHover = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={asChild ? ref : (ref as React.Ref<HTMLButtonElement>)}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-2 top-1/2 flex aspect-square w-5 -translate-y-1/2 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-[transform,background-color,color] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        "peer-data-[size=sm]/menu-button:top-1/2",
        "peer-data-[size=default]/menu-button:top-1/2",
        "peer-data-[size=lg]/menu-button:top-1/2",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100",
        showOnHover ? "opacity-0" : "opacity-100",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground",
        "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:text-[10px]",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
      {...props}
    >
      {showIcon && (
        <div className="flex h-4 w-4 rounded-md bg-sidebar-primary/10" />
      )}
      <div className="flex-1 flex flex-col gap-1">
        <div className="h-2 w-16 rounded-md bg-sidebar-primary/10" />
      </div>
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => {
  return <li ref={ref} {...props} />;
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={asChild ? ref : (ref as React.Ref<HTMLAnchorElement>)}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring transition-[background-color,color,width,height,padding] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[background-color,color] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-foreground/50 [&>svg]:transition-[color] [&>svg]:duration-[250ms] [&>svg]:ease-[cubic-bezier(0.4,0,0.2,1)]",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        isActive &&
          "bg-sidebar-accent font-medium text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebarContext as useSidebar,
};
