# Filter Components

Standardized, modular filter components for consistent UI/UX across the application.

## Components

### `FilterContainer`
A standardized container component that handles consistent spacing, borders, and background styling for filter sections.

**Props:**
- `children`: ReactNode - Filter content
- `integrated?: boolean` - If true, applies integrated styling (background, padding, border)
- `className?: string` - Custom className for the container

**Usage:**
```tsx
<FilterContainer integrated={true}>
  {/* Filter content */}
</FilterContainer>
```

### `GlobalFilterBar`
Main filter component with expand/collapse functionality, active filter indicators, and results summary.

**Props:**
- `filterOptions`: ComputedFilterOptions - Filter options from useFilterOptions hook
- `defaultExpanded?: boolean` - Whether filters start expanded (default: false)
- `filteredCounts?: FilteredCounts` - Counts to display in summary
- `inline?: boolean` - If true, renders without Card wrapper (default: false)
- `integrated?: boolean` - If true, uses FilterContainer with integrated styling (default: false)
- `containerClassName?: string` - Custom className for the container

**Usage Examples:**

**Standalone (with Card wrapper):**
```tsx
<GlobalFilterBar 
  filterOptions={filterOptions} 
  defaultExpanded={true} 
  filteredCounts={filteredCounts} 
/>
```

**Integrated into existing card:**
```tsx
<Card>
  <CardContent>
    <GlobalFilterBar 
      filterOptions={filterOptions} 
      defaultExpanded={true} 
      filteredCounts={filteredCounts}
      inline={true}
      integrated={true}
    />
    {/* Other content */}
  </CardContent>
</Card>
```

## Styling

The `integrated` prop applies:
- Subtle background tint (`bg-muted/20`)
- Border separator (`border-b border-border/50`)
- Proper padding with negative margins for full-width effect
- Rounded top corners (`rounded-t-lg`)

This ensures consistent visual separation and spacing across all filter implementations.

