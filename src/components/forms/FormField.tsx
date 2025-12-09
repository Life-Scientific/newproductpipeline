"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Check, AlertCircle, Loader2 } from "lucide-react";

// Validation state type for real-time feedback
export type ValidationState = "idle" | "validating" | "valid" | "error";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  successMessage?: string;
  validationState?: ValidationState;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  required,
  error,
  success,
  successMessage,
  validationState = "idle",
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="flex items-center gap-2">
        {label} {required && <span className="text-destructive">*</span>}
        {/* Validation state indicators in label */}
        {validationState === "validating" && (
          <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
        )}
        {validationState === "valid" && (
          <Check className="h-3 w-3 text-success" />
        )}
      </Label>
      {children}
      {/* Error message */}
      {error && (
        <div className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {/* Success message */}
      {success && !error && successMessage && (
        <div className="flex items-center gap-1.5 text-sm text-success">
          <Check className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
      {/* Hint text - only show if no error or success message */}
      {hint && !error && !(success && successMessage) && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

interface FormInputFieldProps extends Omit<FormFieldProps, "children"> {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  disabled?: boolean;
}

export function FormInputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  required,
  error,
  success,
  successMessage,
  validationState,
  hint,
  disabled,
  className,
}: FormInputFieldProps) {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
      success={success}
      successMessage={successMessage}
      validationState={validationState}
      hint={hint}
      className={className}
    >
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive/50",
          success && !error && "border-success focus-visible:ring-success/50",
        )}
      />
    </FormField>
  );
}

interface FormSelectFieldProps extends Omit<FormFieldProps, "children"> {
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  noneOption?: boolean;
  disabled?: boolean;
}

export function FormSelectField({
  id,
  label,
  value,
  onValueChange,
  placeholder = "Select...",
  options,
  noneOption = false,
  required,
  error,
  success,
  successMessage,
  validationState,
  hint,
  disabled,
  className,
}: FormSelectFieldProps) {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
      success={success}
      successMessage={successMessage}
      validationState={validationState}
      hint={hint}
      className={className}
    >
      <Select
        value={value || "__none__"}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={id}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive/50",
            success && !error && "border-success focus-visible:ring-success/50",
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {noneOption && <SelectItem value="__none__">None</SelectItem>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}

interface FormTextareaFieldProps extends Omit<FormFieldProps, "children"> {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

export function FormTextareaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  required,
  error,
  success,
  successMessage,
  validationState,
  hint,
  disabled,
  className,
}: FormTextareaFieldProps) {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
      success={success}
      successMessage={successMessage}
      validationState={validationState}
      hint={hint}
      className={className}
    >
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive/50",
          success && !error && "border-success focus-visible:ring-success/50",
        )}
      />
    </FormField>
  );
}

interface FormSwitchFieldProps extends Omit<FormFieldProps, "children"> {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function FormSwitchField({
  id,
  label,
  checked,
  onCheckedChange,
  error,
  success,
  successMessage,
  hint,
  disabled,
  className,
}: FormSwitchFieldProps) {
  return (
    <FormField
      label=""
      error={error}
      success={success}
      successMessage={successMessage}
      hint={hint}
      className={className}
    >
      <div className="flex items-center space-x-2">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
        <Label htmlFor={id}>{label}</Label>
      </div>
    </FormField>
  );
}
