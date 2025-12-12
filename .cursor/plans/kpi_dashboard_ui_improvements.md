# KPI Dashboard UI Improvements Plan

## Analysis Summary

### Current Issues Identified

1. **Owner Visibility Missing**
   - Dashboard view: `KeyResultRow` receives `ownerName` prop but doesn't display it
   - Graph view: No owner information shown on KPI cards in `StrategicDriverNode`
   - Edit view: ✅ Owner is visible (good)
   - Detail modal: ✅ Owner is visible (good)

2. **Editing Experience Clarity**
   - Modal: Changes auto-apply on change, no explicit save button - could be confusing
   - Lock/unlock state: Present but could be more visually obvious
   - Edit view: Inline editing works but no visual feedback on unsaved changes

3. **UI Information Density**
   - Dashboard rows: Cluttered with many small icons (trend, target/reality, source, clock, lock)
   - Owner should be prioritized where it makes sense
   - Graph view: Could show owner on KPI cards

## Improvements to Implement

### 1. Add Owner Display to Dashboard View

**File**: `src/components/kpi-dashboard/KPIDashboardView.tsx`

**Changes**:
- Display owner name/avatar in `KeyResultRow` component
- Use compact format: show initials avatar or just name
- Position: Between label and meta info, or as part of meta section
- Show "Unassigned" badge when no owner

**Design**:
```tsx
// Add owner display in KeyResultRow
{ownerName ? (
  <div className="flex items-center gap-1 text-xs text-muted-foreground">
    <User className="h-3 w-3" />
    <span className="truncate max-w-[80px]">{ownerName}</span>
  </div>
) : (
  <Badge variant="outline" className="text-[10px] px-1.5 h-4">
    Unassigned
  </Badge>
)}
```

### 2. Add Owner Display to Graph View

**File**: `src/components/kpi-dashboard/KPINetworkGraph.tsx`

**Changes**:
- Add owner info to KPI buttons in `StrategicDriverNode`
- Show as small badge or text below KPI label
- Use compact format to maintain readability

**Design**:
```tsx
// In StrategicDriverNode, add owner to each KPI button
<div className="flex items-center justify-between gap-2">
  <div className="flex-1 min-w-0">
    <span className="truncate text-[10px]">{kr.label}</span>
    {ownerName && (
      <span className="text-[9px] text-muted-foreground block truncate">
        {ownerName}
      </span>
    )}
  </div>
  <Badge variant={statusConfig[kr.status].variant}>
    {statusConfig[kr.status].label}
  </Badge>
</div>
```

### 3. Improve Editing Clarity in Modal

**File**: `src/components/kpi-dashboard/KPIDetailModal.tsx`

**Changes**:
- Add visual indicator when fields are editable vs locked
- Add "Save Changes" button that only appears when there are unsaved changes
- Show lock status more prominently
- Add visual feedback on field changes (subtle highlight)

**Design**:
- Add `hasChanges` state to track modifications
- Show "Save Changes" button in footer when `hasChanges && !isLocked`
- Add subtle border/background change to edited fields
- Make lock badge more prominent in header

### 4. Improve Edit View Clarity

**File**: `src/components/kpi-dashboard/KPIEditView.tsx`

**Changes**:
- Add visual indicator for locked rows (already has opacity, but could improve)
- Show owner more prominently (maybe with avatar)
- Add hover states to make editable fields clearer
- Consider adding "Save" button per row or global save

**Design**:
- Keep current inline editing approach
- Enhance locked row styling (maybe strikethrough or different background)
- Add owner avatar/initials in owner column

### 5. Simplify Dashboard Row Meta Information

**File**: `src/components/kpi-dashboard/KPIDashboardView.tsx`

**Changes**:
- Reorganize meta info: prioritize owner, status, then secondary info
- Group related info together
- Reduce icon clutter
- Make target/reality more readable

**Design**:
```
[Status Icon] [Label] | [Owner] | [Target/Reality] | [Updated] [Lock]
```

### 6. Add Owner Helper Component

**File**: `src/components/kpi-dashboard/OwnerDisplay.tsx` (new)

**Purpose**: Reusable component for displaying owner consistently across views

**Features**:
- Shows avatar with initials or user icon
- Handles unassigned state
- Compact and expanded variants
- Clickable to show owner details (future)

## Implementation Order

1. ✅ Create `OwnerDisplay` component
2. ✅ Add owner to Dashboard `KeyResultRow`
3. ✅ Add owner to Graph `StrategicDriverNode`
4. ✅ Improve modal editing clarity
5. ✅ Enhance edit view owner display
6. ✅ Simplify dashboard row layout

## Design Principles

- **Owner visibility**: Always visible where contextually relevant
- **Editing clarity**: Clear visual distinction between editable and locked states
- **Information hierarchy**: Owner > Status > Metrics > Metadata
- **Consistency**: Use same owner display pattern across all views
- **Simplicity**: Reduce visual clutter, prioritize important info

## Testing Checklist

- [ ] Owner displays correctly in dashboard view
- [ ] Owner displays correctly in graph view
- [ ] Owner displays correctly in edit view
- [ ] Owner displays correctly in modal
- [ ] Unassigned state shows clearly
- [ ] Editing states are visually clear
- [ ] Lock/unlock is obvious
- [ ] Changes are saved correctly
- [ ] UI remains responsive and readable


