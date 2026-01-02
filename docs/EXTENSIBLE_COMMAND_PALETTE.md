# Extensible Command Palette System

**Date**: 2025-12-29
**Status**: ✅ Complete
**Build**: Passing

---

## Problem Solved

### 1. "azoxy" Search Issue ✅
**Problem**: Searching for "azoxy" didn't find "Azoxystrobin" formulations, even though "azox" worked.

**Root Cause**: PostgreSQL's English text search dictionary was stemming "azoxy" → "azoxi" before searching, which didn't match "azoxystrobin".

**Solution**: Changed search function to use `'simple'` dictionary instead of `'english'` to avoid stemming user queries.

**Result**:
- ✅ "azox" finds Azoxystrobin
- ✅ "azoxy" finds Azoxystrobin
- ✅ "azoxys" finds Azoxystrobin
- ✅ Any prefix now works

### 2. Hard-Coded Configuration ❌
**Problem**: Workspaces and actions were hard-coded in CommandPalette component.

**Solution**: Created centralized configuration file at `src/config/command-palette.config.ts`.

**Result**: Super easy to add new workspaces, actions, or keyboard shortcuts.

---

## How to Add New Items

### Adding a New Quick Action

1. **Add action to config** (`src/config/command-palette.config.ts`):
```typescript
export const quickActions: QuickAction[] = [
  // ... existing actions
  {
    icon: YourIcon,
    label: "Your Action Label",
    callbackProp: "onOpenYourModal",  // Must match prop name
    shortcut: "Y A",                   // Optional
    description: "What this action does",
  },
];
```

2. **Add prop to CommandPaletteProps** (`src/components/layout/CommandPalette.tsx`):
```typescript
interface CommandPaletteProps {
  // ... existing props
  onOpenYourModal?: () => void;
}
```

3. **Add modal and callback to SidebarProvider** (`src/components/layout/SidebarProvider.tsx`):
```typescript
const [yourModalOpen, setYourModalOpen] = useState(false);

<CommandPalette
  onOpenYourModal={() => setYourModalOpen(true)}
  // ... other props
/>

<YourModal open={yourModalOpen} onOpenChange={setYourModalOpen} />
```

**That's it!** The action will automatically appear in Command+K.

---

### Adding a New Workspace

1. **Add workspace navigation** (`src/config/command-palette.config.ts`):

```typescript
export const yourWorkspaceNavigation: NavigationItem[] = [
  {
    icon: YourIcon,
    label: "Your Page",
    path: "/your-workspace/your-page",
    description: "What this page does",
    badge: "New",  // Optional badge
  },
  // ... more pages
];
```

2. **Add to workspace groups**:
```typescript
export const workspaceGroups: WorkspaceGroup[] = [
  // ... existing groups
  {
    heading: "Your Workspace",
    items: yourWorkspaceNavigation,
  },
];
```

**That's it!** Your workspace will appear in Command+K with a separator.

---

### Adding a Single Navigation Item

Just add it to the appropriate navigation array:

```typescript
export const portfolioNavigation: NavigationItem[] = [
  // ... existing items
  {
    icon: YourIcon,
    label: "Your New Page",
    path: routes.yourNewPage(),
    description: "Description of the page",
  },
];
```

---

## Configuration File Structure

### Location
`src/config/command-palette.config.ts`

### Sections

#### 1. Quick Actions
```typescript
export const quickActions: QuickAction[] = [...]
```
- Modal triggers (New Business Case, New Formulation, etc.)
- Each action maps to a callback prop
- Optional shortcuts and descriptions

#### 2. Portfolio Navigation
```typescript
export const portfolioNavigation: NavigationItem[] = [...]
```
- Main portfolio workspace pages
- Dashboard, Formulations, Countries, etc.
- Auto-generated from routes.ts

#### 3. Other Workspaces
```typescript
export const otherWorkspaces: NavigationItem[] = [...]
```
- Short URLs (ls.life)
- Dev Tools
- Entity Map
- KPI Dashboard

#### 4. Workspace Groups
```typescript
export const workspaceGroups: WorkspaceGroup[] = [...]
```
- Groups navigation items with headings
- Renders with separators between groups

#### 5. Search Configuration
```typescript
export const searchConfig = {
  minQueryLength: 2,
  debounceMs: 200,
  maxResults: 10,
}
```
- Configure search behavior
- Single source of truth

#### 6. Keyboard Shortcuts
```typescript
export const keyboardShortcuts = {
  open: ["cmd+k", "ctrl+k"],
  close: ["escape"],
}
```
- Future: Can add more shortcuts

---

## Example: Adding "Import Data" Action

### Step 1: Add to config
```typescript
// src/config/command-palette.config.ts
export const quickActions: QuickAction[] = [
  // ... existing
  {
    icon: Upload,
    label: "Import Data",
    callbackProp: "onOpenImportModal",
    shortcut: "I D",
    description: "Import CSV or Excel data",
  },
];
```

### Step 2: Add prop
```typescript
// src/components/layout/CommandPalette.tsx
interface CommandPaletteProps {
  // ... existing
  onOpenImportModal?: () => void;
}
```

### Step 3: Wire up modal
```typescript
// src/components/layout/SidebarProvider.tsx
const [importModalOpen, setImportModalOpen] = useState(false);

<CommandPalette
  onOpenImportModal={() => setImportModalOpen(true)}
/>

<ImportModal open={importModalOpen} onOpenChange={setImportModalOpen} />
```

**Done!** Users can now press Cmd+K → type "import" → open import modal.

---

## Auto-Discovery (Future Enhancement)

The current system requires manual registration. Future enhancements could include:

### Option 1: Route-Based Auto-Discovery
```typescript
// Scan routes.ts and auto-generate navigation
const autoNavigationItems = Object.entries(routes).map(...)
```

### Option 2: Convention-Based Actions
```typescript
// Scan modals directory and auto-register
const modalFiles = glob('src/components/**/Modal.tsx')
```

### Option 3: Plugin System
```typescript
// Plugins register themselves
registerAction({
  label: "My Action",
  callback: () => {...},
})
```

**Current approach** is deliberately simple and explicit to avoid magic.

---

## Benefits

### Developer Experience
- ✅ **One file to edit** - All configuration in one place
- ✅ **Type-safe** - TypeScript enforces correct structure
- ✅ **Self-documenting** - Descriptions explain what each item does
- ✅ **No magic** - Explicit registration, easy to understand

### User Experience
- ✅ **Consistent** - All actions follow same pattern
- ✅ **Discoverable** - Everything accessible via Cmd+K
- ✅ **Fast** - Prefix search works for partial queries
- ✅ **Cross-workspace** - Jump between workspaces instantly

### Maintainability
- ✅ **Easy to extend** - Add items without touching component logic
- ✅ **Easy to remove** - Delete from config, auto-removed from UI
- ✅ **Easy to reorder** - Change array order, UI updates
- ✅ **Easy to test** - Config is pure data, component is generic

---

## Files Changed

### New Files
1. **`src/config/command-palette.config.ts`** - Centralized configuration
2. **`docs/EXTENSIBLE_COMMAND_PALETTE.md`** - This file

### Modified Files
1. **`src/components/layout/CommandPalette.tsx`** - Now uses config
2. **Database: `search_portfolio()` function** - Fixed stemming issue

---

## Search Improvements

### Before
- "azox" ✅ finds Azoxystrobin
- "azoxy" ❌ no results (stemmed to "azoxi")
- "azoxys" ❌ no results

### After
- "azox" ✅ finds Azoxystrobin
- "azoxy" ✅ finds Azoxystrobin
- "azoxys" ✅ finds Azoxystrobin
- "azoxystrobi" ✅ finds Azoxystrobin
- Any prefix works!

### Technical Details
```sql
-- Before: Using 'english' dictionary
to_tsquery('english', 'azoxy:*')  -- Stems to 'azoxi:*' ❌

-- After: Using 'simple' dictionary
to_tsquery('simple', 'azoxy:*')   -- Stays as 'azoxy:*' ✅
```

---

## Testing

### Manual Testing
- [x] "azoxy" finds Azoxystrobin formulations
- [x] Quick actions appear from config
- [x] Workspaces render with separators
- [x] Descriptions and badges display
- [x] Build passes with zero errors

### Adding a Test Item
1. Add to config (1 line)
2. Check Command+K (appears automatically)
3. Remove from config (1 line)
4. Check Command+K (gone automatically)

---

## Future Enhancements

### Possible Additions
- [ ] Recent searches/pages
- [ ] Trending entities
- [ ] Custom keyboard shortcuts per action
- [ ] Fuzzy matching for typos
- [ ] Action categories (Create, View, Edit, Delete)
- [ ] Conditional actions (show based on permissions)
- [ ] Dynamic workspace discovery
- [ ] Plugin system for third-party integrations

---

## Summary

✅ **Search Fixed**: "azoxy" and any prefix now works
✅ **Extensible Config**: Add workspaces/actions by editing one file
✅ **Type-Safe**: TypeScript prevents mistakes
✅ **Build Passing**: Zero TypeScript errors
✅ **Well-Documented**: Clear examples for adding items

**To add a new item**: Edit `src/config/command-palette.config.ts` and add your entry. That's it!
