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

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ label, required, error, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
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
  disabled,
  className,
}: FormInputFieldProps) {
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
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
  disabled,
  className,
}: FormSelectFieldProps) {
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <Select value={value || "__none__"} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id={id}>
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
  disabled,
  className,
}: FormTextareaFieldProps) {
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
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
  disabled,
  className,
}: FormSwitchFieldProps) {
  return (
    <FormField label="" error={error} className={className}>
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




