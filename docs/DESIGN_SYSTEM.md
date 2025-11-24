# Design System - Spacing & Layout Standards

This document defines the standardized spacing system and layout patterns for consistent UI across the application.

## Spacing Scale

Based on a **4px base unit** for mathematical consistency:

| Scale | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `xs` | 0.5rem | 8px | Tight spacing, badges, icons |
| `sm` | 0.75rem | 12px | Small gaps, compact lists |
| `md` | 1rem | 16px | Standard spacing, form fields |
| `lg` | 1.5rem | 24px | Card padding, section gaps |
| `xl` | 2rem | 32px | Large section spacing |
| `2xl` | 2.5rem | 40px | Page sections |
| `3xl` | 3rem | 48px | Major page divisions |
| `4xl` | 4rem | 64px | Hero sections |

## Standard Spacing Classes

### Container Spacing

```tsx
// Page container (all pages)
className="container mx-auto p-4 sm:p-6"

// Multi-section pages (dashboard, analytics)
className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8"

// Single-card pages (list pages)
className="container mx-auto p-4 sm:p-6"
// Then use mb-6 on header for spacing to card
```

### Header Spacing

```tsx
// Standard header
className="space-y-2 mb-6"

// Header with action button
className="flex items-center justify-between mb-6"
// Title/description wrapper: className="space-y-2"
```

### Card Spacing

```tsx
// Card header (with description)
className="space-y-1.5"

// Card content (standard)
className="space-y-3"

// Card content (metric cards)
className="space-y-1"

// Card content (tables)
className="p-0"
// Inner wrapper: className="p-4 sm:p-6 pt-0"
```

### Grid Spacing

```tsx
// Card grids
className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"

// Chart grids
className="grid gap-4 sm:gap-6 md:grid-cols-2"
```

### List Item Spacing

```tsx
// Standard list items
className="space-y-2"

// Loose list items (more breathing room)
className="space-y-3"

// List item container
className="p-3 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
```

### Table Spacing

```tsx
// Table wrapper
className="p-0"

// Table inner padding
className="p-4 sm:p-6 pt-0"

// Table header height
className="h-10"

// Table row height
className="h-12"

// Table cell padding
className="py-3"

// Table footer
className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t"
```

## Component Patterns

### Page Header

```tsx
<div className="space-y-2 mb-6">
  <h1 className="text-2xl sm:text-3xl font-bold">Page Title</h1>
  <p className="text-sm sm:text-base text-muted-foreground">
    Page description
  </p>
</div>
```

### Metric Card

```tsx
<Card>
  <CardHeader className="pb-3">
    <CardTitle className="text-sm font-medium">Metric Name</CardTitle>
  </CardHeader>
  <CardContent className="space-y-1">
    <div className="text-2xl font-bold">{value}</div>
    <p className="text-xs text-muted-foreground">Context</p>
  </CardContent>
</Card>
```

### Content Card

```tsx
<Card>
  <CardHeader className="space-y-1.5">
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent className="space-y-3">
    {/* Content */}
  </CardContent>
</Card>
```

### List Item

```tsx
<div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors gap-4">
  <div className="flex-1 min-w-0 space-y-1">
    <p className="font-medium text-sm truncate">Primary Text</p>
    <p className="text-xs text-muted-foreground">Secondary Text</p>
  </div>
  <div className="text-right flex-shrink-0 space-y-0.5">
    <p className="font-semibold text-sm">Value</p>
    <p className="text-xs text-muted-foreground">Sub-value</p>
  </div>
</div>
```

### Table Card

```tsx
<Card>
  <CardHeader className="space-y-1.5">
    <CardTitle>Table Title</CardTitle>
    <CardDescription>Table description</CardDescription>
  </CardHeader>
  <CardContent className="p-0">
    <div className="p-4 sm:p-6 pt-0">
      <EnhancedDataTable {...props} />
    </div>
  </CardContent>
</Card>
```

## Typography Scale

### Headings

```tsx
// Page title
className="text-2xl sm:text-3xl font-bold"

// Section title
className="text-xl sm:text-2xl font-bold"

// Card title
className="text-base sm:text-lg font-semibold"

// Small title
className="text-sm font-medium"
```

### Body Text

```tsx
// Standard body
className="text-sm sm:text-base"

// Small text
className="text-xs sm:text-sm"

// Muted text
className="text-sm text-muted-foreground"
// or
className="text-xs text-muted-foreground"
```

### Metric Values

```tsx
// Large metric
className="text-2xl font-bold"

// Medium metric
className="text-lg font-semibold"

// Small metric
className="text-sm font-semibold"
```

## Responsive Patterns

### Mobile-First Approach

Always start with mobile styles, then add `sm:` breakpoints:

```tsx
// Padding
className="p-4 sm:p-6"

// Spacing
className="space-y-4 sm:space-y-6"

// Text
className="text-sm sm:text-base"

// Grid gaps
className="gap-4 sm:gap-6"
```

### Breakpoints

- **Mobile**: Default (no prefix) - < 640px
- **Small**: `sm:` - ≥ 640px
- **Medium**: `md:` - ≥ 768px
- **Large**: `lg:` - ≥ 1024px

## Spacing Rules

### 1. Container Padding
- **Mobile**: `p-4` (16px)
- **Desktop**: `p-6` (24px)

### 2. Section Gaps
- **Between major sections**: `space-y-6 sm:space-y-8` (24px/32px)
- **Between cards in grid**: `gap-4 sm:gap-6` (16px/24px)
- **Header to content**: `mb-6` (24px)

### 3. Card Internal Spacing
- **Header**: `space-y-1.5` (6px) between title and description
- **Content**: `space-y-3` (12px) for standard content
- **Metric cards**: `space-y-1` (4px) for tight spacing
- **List items**: `space-y-2` (8px) between items

### 4. List Item Spacing
- **Item padding**: `p-3` (12px)
- **Item gap**: `gap-4` (16px) between left and right content
- **Internal spacing**: `space-y-1` (4px) for nested content

### 5. Table Spacing
- **Table wrapper**: `p-0` (no padding)
- **Inner padding**: `p-4 sm:p-6 pt-0` (16px/24px, no top)
- **Row height**: `h-12` (48px)
- **Cell padding**: `py-3` (12px vertical)
- **Footer**: `pt-2 border-t` (8px top, border separator)

## Common Patterns

### Empty State

```tsx
<div className="space-y-2 py-6">
  <p className="text-sm text-muted-foreground text-center">
    No items found.
  </p>
</div>
```

### Action Links

```tsx
<div className="pt-2 border-t">
  <Link className="text-sm text-primary hover:underline block text-center">
    View all →
  </Link>
</div>
```

### Button Groups

```tsx
<div className="flex items-center gap-2 flex-wrap">
  {/* Buttons */}
</div>
```

## Checklist for New Components

- [ ] Use standardized spacing classes
- [ ] Responsive padding: `p-4 sm:p-6`
- [ ] Consistent gaps: `gap-4 sm:gap-6`
- [ ] Proper header spacing: `space-y-2 mb-6`
- [ ] Card headers: `space-y-1.5`
- [ ] Card content: `space-y-3` (or `space-y-1` for metrics)
- [ ] List items: `space-y-2` with `p-3` padding
- [ ] Table spacing: `p-0` wrapper, `p-4 sm:p-6 pt-0` inner
- [ ] Mobile-first responsive classes
- [ ] Consistent text sizes with responsive variants

## Examples

See these files for reference:
- **Dashboard**: `src/app/(dashboard)/page.tsx`
- **List Page**: `src/app/(dashboard)/business-cases/page.tsx`
- **Table**: `src/components/ui/enhanced-data-table.tsx`
- **Metrics**: `src/components/analytics/PortfolioMetrics.tsx`

