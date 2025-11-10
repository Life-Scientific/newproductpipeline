# Null Safety Patterns

This document identifies common TypeScript errors related to nullable database fields and provides patterns to prevent them.

## The Problem Pattern

**Database fields are nullable** (`string | null`, `number | null`) but **components expect non-nullable types** (`string`, `number`).

### Common Error Types

1. **Type Assignment Errors**
   ```typescript
   // ❌ Error: Type 'string | null' is not assignable to type 'string'
   <Component name={databaseField.name} />
   
   // ✅ Fix: Provide fallback
   <Component name={databaseField.name || ""} />
   ```

2. **Object Index Errors**
   ```typescript
   // ❌ Error: Type 'null' cannot be used as an index type
   const color = statusColors[formulation.status];
   
   // ✅ Fix: Check for null first
   const color = formulation.status 
     ? (statusColors[formulation.status] || "secondary")
     : "secondary";
   ```

3. **Array/Prop Type Errors**
   ```typescript
   // ❌ Error: Type 'string | null' is not assignable to type 'string'
   const breadcrumbs = [
     { label: databaseField.name }
   ];
   
   // ✅ Fix: Ensure non-null
   const breadcrumbs = [
     { label: databaseField.name || "Default" }
   ];
   ```

## Systematic Approach

### 1. Identify Nullable Fields

Check database types for `| null`:
```typescript
type Formulation = {
  product_name: string | null;  // ⚠️ Nullable
  formulation_code: string | null;  // ⚠️ Nullable
  status: string | null;  // ⚠️ Nullable
}
```

### 2. Component Props Pattern

**Always use non-nullable types in component props:**
```typescript
// ✅ Good: Component expects non-nullable
interface ComponentProps {
  name: string;  // Not string | null
  code: string;  // Not string | null
}
```

**When passing data, provide fallbacks:**
```typescript
// ✅ Good: Provide fallback at call site
<Component 
  name={data.name || ""}
  code={data.code || "N/A"}
/>
```

### 3. Object Index Pattern

**Never use nullable values directly as object keys:**
```typescript
// ❌ Bad
const color = statusColors[formulation.status];

// ✅ Good: Check null first
const color = formulation.status 
  ? (statusColors[formulation.status] || "secondary")
  : "secondary";

// ✅ Better: Extract to helper
const getStatusColor = (status: string | null) => {
  if (!status) return "secondary";
  return statusColors[status] || "secondary";
};
```

### 4. Display Pattern

**Always provide fallback display values:**
```typescript
// ✅ Good: Provide fallback for display
<p>{formulation.product_name || "—"}</p>
<Badge>{formulation.status || "Unknown"}</Badge>
```

### 5. Array/Collection Pattern

**Ensure array items have non-nullable required fields:**
```typescript
// ❌ Bad
const items = data.map(item => ({
  label: item.name  // name is string | null
}));

// ✅ Good: Ensure non-null
const items = data.map(item => ({
  label: item.name || "Unnamed"
}));
```

## Common Patterns by Use Case

### Pattern 1: Component Props
```typescript
// Database type
type Formulation = {
  product_name: string | null;
}

// Component prop (non-nullable)
interface Props {
  name: string;  // Required, non-nullable
}

// Usage (provide fallback)
<Component name={formulation.product_name || ""} />
```

### Pattern 2: Object Lookup
```typescript
// Status mapping
const statusColors: Record<string, string> = {
  "Selected": "default",
  "Monitoring": "outline",
};

// ❌ Bad
<Badge variant={statusColors[formulation.status] as any}>

// ✅ Good
<Badge variant={
  formulation.status 
    ? (statusColors[formulation.status] as any) || "secondary"
    : "secondary"
}>
```

### Pattern 3: Breadcrumbs/Navigation
```typescript
// ❌ Bad
const breadcrumbs = [
  { label: formulation.formulation_code }  // Can be null
];

// ✅ Good
const breadcrumbs = [
  { label: formulation.formulation_code || "Formulation" }
];
```

### Pattern 4: Conditional Rendering
```typescript
// ❌ Bad
{formulation.status && <Badge>{formulation.status}</Badge>}

// ✅ Good (if status can be empty string)
{formulation.status ? <Badge>{formulation.status}</Badge> : null}

// ✅ Better (if we want to show something)
<Badge>{formulation.status || "—"}</Badge>
```

## Utility Functions

Create helper functions for common patterns:

```typescript
// src/lib/utils.ts

/**
 * Safely get a string value with fallback
 */
export function safeString(value: string | null | undefined, fallback = ""): string {
  return value ?? fallback;
}

/**
 * Safely get a number value with fallback
 */
export function safeNumber(value: number | null | undefined, fallback = 0): number {
  return value ?? fallback;
}

/**
 * Safely lookup in a Record with nullable key
 */
export function safeLookup<T>(
  record: Record<string, T>,
  key: string | null | undefined,
  fallback: T
): T {
  if (!key) return fallback;
  return record[key] ?? fallback;
}

// Usage:
const name = safeString(formulation.product_name);
const color = safeLookup(statusColors, formulation.status, "secondary");
```

## Pre-Build Checklist

Before running a build, check for:

1. ✅ **Component props** - All nullable database fields have fallbacks
2. ✅ **Object indexing** - All nullable keys are checked before indexing
3. ✅ **Array items** - All required fields in arrays have fallbacks
4. ✅ **Display values** - All nullable display values have fallbacks
5. ✅ **Conditional logic** - Null checks use proper operators (`??`, `||`, `?.`)

## Quick Fix Patterns

### Fix 1: Prop Assignment
```typescript
// Find: <Component prop={database.field} />
// Replace: <Component prop={database.field || ""} />
```

### Fix 2: Object Index
```typescript
// Find: record[nullableKey]
// Replace: nullableKey ? (record[nullableKey] || fallback) : fallback
```

### Fix 3: Array Mapping
```typescript
// Find: array.map(item => ({ label: item.nullableField }))
// Replace: array.map(item => ({ label: item.nullableField || "Default" }))
```

## Examples from Codebase

### ✅ Good Example (BusinessCasesList)
```typescript
cell: ({ row }) => {
  const volume = row.getValue("volume") as number | null;
  return volume ? volume.toLocaleString() : "—";
}
```

### ✅ Good Example (IngredientUsage)
```typescript
cell: ({ row }) => {
  const risk = row.getValue("supply_risk") as string | null;
  if (!risk) return "—";
  return <Badge variant={(supplyRiskColors[risk] as any) || "outline"}>{risk}</Badge>;
}
```

### ❌ Bad Example (Fixed)
```typescript
// Before (error)
<Badge variant={statusColors[formulation.status] as any}>

// After (fixed)
<Badge variant={
  formulation.status 
    ? (statusColors[formulation.status] as any) || "secondary"
    : "secondary"
}>
```

## TypeScript Configuration

Consider enabling stricter null checks in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strictNullChecks": true,  // Already enabled
    "noUncheckedIndexedAccess": true  // Consider enabling
  }
}
```

## Summary

**The Golden Rule**: 
> Never pass nullable database fields directly to components or use them as object keys without null checks and fallbacks.

**Three-Step Fix**:
1. Identify nullable fields (`string | null`)
2. Provide fallback values (`|| ""`, `|| "—"`, `|| 0`)
3. Check before indexing (`key ? record[key] : fallback`)

