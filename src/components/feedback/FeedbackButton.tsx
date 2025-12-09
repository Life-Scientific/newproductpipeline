"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Floating feedback button component
 *
 * This component displays a floating button in the bottom right corner
 * that opens a Tally form modal when clicked.
 */
export function FeedbackButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setOpen(true)}
              className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              size="icon"
              aria-label="Provide feedback"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Provide feedback</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] h-[95vh] p-0 flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
            <DialogTitle>LS Navigator Feedback</DialogTitle>
            <DialogDescription>
              We'd love to hear your thoughts and suggestions.
            </DialogDescription>
          </DialogHeader>

          {/* Tally form embed */}
          <div className="w-full flex-1 relative min-h-0">
            {open && (
              <iframe
                src="https://tally.so/r/xXVMlk?transparentBackground=1"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="LS Navigator Feedback"
                className="absolute inset-0"
                allow="clipboard-read; clipboard-write"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
