"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, AlertCircle, Loader2 } from "lucide-react";

/**
 * Validation rule for ValidatedInput
 */
export interface ValidationRule {
  /** Validation function - returns true if valid, false if invalid. Can be async. */
  validate: (value: string) => boolean | Promise<boolean>;
  /** Error message to display when validation fails */
  message: string;
}

interface ValidatedInputProps extends Omit<InputProps, "onChange" | "value"> {
  /** Current input value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Array of validation rules to apply */
  rules?: ValidationRule[];
  /** Validate when user leaves the field (default: true) */
  validateOnBlur?: boolean;
  /** Validate as user types with debounce (default: false) */
  validateOnChange?: boolean;
  /** Debounce delay in ms for validateOnChange (default: 300) */
  debounceMs?: number;
  /** Callback when validation state changes */
  onValidationChange?: (isValid: boolean, error?: string) => void;
  /** Show green border and checkmark when valid (default: true) */
  showSuccessState?: boolean;
  /** Message to show when validation passes */
  successMessage?: string;
  /** Hint text shown below input when no validation message */
  hint?: string;
}

export function ValidatedInput({
  value,
  onChange,
  rules = [],
  validateOnBlur = true,
  validateOnChange = false,
  debounceMs = 300,
  onValidationChange,
  showSuccessState = true,
  successMessage,
  hint,
  className,
  ...props
}: ValidatedInputProps) {
  const [validationState, setValidationState] = useState<"idle" | "validating" | "valid" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const onValidationChangeRef = useRef(onValidationChange);
  
  // Keep callback ref updated
  useEffect(() => {
    onValidationChangeRef.current = onValidationChange;
  });

  const validate = useCallback(async (val: string) => {
    // No rules = always valid
    if (rules.length === 0) {
      setValidationState("idle");
      return;
    }

    // Empty value with no required rule = idle
    if (!val && !rules.some(r => r.message.toLowerCase().includes("required"))) {
      setValidationState("idle");
      setErrorMessage(null);
      return;
    }

    setValidationState("validating");
    
    for (const rule of rules) {
      try {
        const result = await rule.validate(val);
        if (!result) {
          setValidationState("error");
          setErrorMessage(rule.message);
          onValidationChangeRef.current?.(false, rule.message);
          return;
        }
      } catch {
        setValidationState("error");
        setErrorMessage("Validation failed");
        onValidationChangeRef.current?.(false, "Validation failed");
        return;
      }
    }

    setValidationState("valid");
    setErrorMessage(null);
    onValidationChangeRef.current?.(true);
  }, [rules]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (validateOnChange && touched) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        validate(newValue);
      }, debounceMs);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validateOnBlur) {
      validate(value);
    }
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const showSuccess = validationState === "valid" && touched && showSuccessState;
  const showError = validationState === "error" && touched;

  const inputClassName = cn(
    className,
    // Add padding-right for the icon
    touched && (validationState === "valid" || validationState === "error" || validationState === "validating") && "pr-10",
    showError && "border-destructive focus-visible:ring-destructive/50",
    showSuccess && "border-success focus-visible:ring-success/50"
  );

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <Input
          {...props}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClassName}
        />
        {/* Right-side icon indicator */}
        {touched && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {validationState === "validating" && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            {showSuccess && (
              <Check className="h-4 w-4 text-success" />
            )}
            {showError && (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
          </div>
        )}
      </div>
      {/* Error message */}
      {showError && errorMessage && (
        <p className="text-sm text-destructive flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          {errorMessage}
        </p>
      )}
      {/* Success message */}
      {showSuccess && successMessage && (
        <p className="text-sm text-success flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 flex-shrink-0" />
          {successMessage}
        </p>
      )}
      {/* Hint text - only show when no validation messages */}
      {hint && !showError && !(showSuccess && successMessage) && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

/**
 * Common validation rules for reuse
 */
export const ValidationRules = {
  required: (message = "This field is required"): ValidationRule => ({
    validate: (value) => value.trim().length > 0,
    message,
  }),
  
  minLength: (min: number, message?: string): ValidationRule => ({
    validate: (value) => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),
  
  maxLength: (max: number, message?: string): ValidationRule => ({
    validate: (value) => value.length <= max,
    message: message || `Must be at most ${max} characters`,
  }),
  
  pattern: (regex: RegExp, message: string): ValidationRule => ({
    validate: (value) => regex.test(value),
    message,
  }),
  
  email: (message = "Please enter a valid email"): ValidationRule => ({
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),
  
  number: (message = "Must be a valid number"): ValidationRule => ({
    validate: (value) => !isNaN(Number(value)) && value.trim() !== "",
    message,
  }),
  
  positiveNumber: (message = "Must be a positive number"): ValidationRule => ({
    validate: (value) => {
      const num = Number(value);
      return !isNaN(num) && num > 0;
    },
    message,
  }),
  
  /** Custom async validator */
  async: (
    validateFn: (value: string) => Promise<boolean>,
    message: string
  ): ValidationRule => ({
    validate: validateFn,
    message,
  }),
};

