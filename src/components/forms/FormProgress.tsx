"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/**
 * Represents a single step in a multi-step form
 */
export interface FormStep {
  /** Unique identifier for the step */
  id: string;
  /** Display label for the step */
  label: string;
  /** Optional description shown below the label */
  description?: string;
}

interface FormProgressProps {
  /** Array of steps to display */
  steps: FormStep[];
  /** Current active step index (0-based) */
  currentStep: number;
  /** Array of completed step indices (useful when steps can be completed out of order) */
  completedSteps?: number[];
  /** Layout variant */
  variant?: "horizontal" | "vertical";
  /** Size variant */
  size?: "sm" | "md";
  /** Optional click handler for step navigation */
  onStepClick?: (stepIndex: number) => void;
  /** Allow clicking on completed steps to navigate back */
  allowNavigation?: boolean;
}

export function FormProgress({ 
  steps, 
  currentStep, 
  completedSteps = [],
  variant = "horizontal",
  size = "md",
  onStepClick,
  allowNavigation = false,
}: FormProgressProps) {
  const isHorizontal = variant === "horizontal";
  const isSmall = size === "sm";

  const handleStepClick = (index: number) => {
    if (!allowNavigation || !onStepClick) return;
    
    // Only allow clicking on completed steps or current step
    const isCompleted = completedSteps.includes(index) || index < currentStep;
    if (isCompleted || index === currentStep) {
      onStepClick(index);
    }
  };

  return (
    <nav aria-label="Progress">
      <ol 
        className={cn(
          "w-full",
          isHorizontal 
            ? "flex items-center" 
            : "flex flex-col gap-4"
        )}
      >
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index) || index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep && !completedSteps.includes(index);
          const isClickable = allowNavigation && onStepClick && (isCompleted || isCurrent);

          return (
            <li
              key={step.id}
              className={cn(
                isHorizontal && "flex-1 flex items-center",
                !isHorizontal && "flex gap-3"
              )}
            >
              {/* Step indicator and content wrapper */}
              <div 
                className={cn(
                  "flex items-center gap-3",
                  isClickable && "cursor-pointer group"
                )}
                onClick={() => handleStepClick(index)}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={isClickable ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleStepClick(index);
                  }
                } : undefined}
              >
                {/* Step number/check circle */}
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 transition-all duration-200 flex-shrink-0",
                    isSmall ? "h-6 w-6 text-xs" : "h-8 w-8 text-sm",
                    isCompleted && "border-success bg-success text-success-foreground",
                    isCurrent && "border-primary bg-primary text-primary-foreground",
                    isUpcoming && "border-muted-foreground/30 bg-background text-muted-foreground",
                    isClickable && "group-hover:scale-110"
                  )}
                >
                  {isCompleted ? (
                    <Check className={cn(isSmall ? "h-3 w-3" : "h-4 w-4")} />
                  ) : (
                    <span className="font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Step label and description */}
                <div className={cn(isHorizontal && "hidden sm:block")}>
                  <p 
                    className={cn(
                      "font-medium transition-colors",
                      isSmall ? "text-xs" : "text-sm",
                      isCurrent && "text-foreground",
                      isCompleted && "text-success",
                      isUpcoming && "text-muted-foreground",
                      isClickable && "group-hover:text-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && !isSmall && (
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  )}
                </div>
              </div>

              {/* Connector line (horizontal variant) */}
              {index < steps.length - 1 && isHorizontal && (
                <div 
                  className={cn(
                    "flex-1 h-0.5 mx-3 transition-colors duration-200",
                    isCompleted ? "bg-success" : "bg-muted"
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Connector line (vertical variant) */}
              {index < steps.length - 1 && !isHorizontal && (
                <div 
                  className={cn(
                    "ml-4 w-0.5 h-8 transition-colors duration-200",
                    isCompleted ? "bg-success" : "bg-muted"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Compact progress dots for mobile or tight spaces
 */
interface FormProgressDotsProps {
  /** Total number of steps */
  totalSteps: number;
  /** Current active step index (0-based) */
  currentStep: number;
  /** Array of completed step indices */
  completedSteps?: number[];
}

export function FormProgressDots({
  totalSteps,
  currentStep,
  completedSteps = [],
}: FormProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2" role="group" aria-label="Progress">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = completedSteps.includes(index) || index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div
            key={index}
            className={cn(
              "rounded-full transition-all duration-200",
              isCurrent 
                ? "h-2.5 w-2.5 bg-primary" 
                : isCompleted 
                  ? "h-2 w-2 bg-success"
                  : "h-2 w-2 bg-muted"
            )}
            aria-label={`Step ${index + 1}${isCurrent ? " (current)" : isCompleted ? " (completed)" : ""}`}
          />
        );
      })}
    </div>
  );
}

