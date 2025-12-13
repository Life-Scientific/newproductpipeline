 # Operations Workspace

## Overview

The Operations workspace is designed to house operational tools, dashboards, and metrics. Currently, it contains the KPI Dashboard, but it is architected to support multiple pages with independent permission requirements.

## Current Pages

### KPI Dashboard (`/operations/kpi-dashboard`)
- **Permission Required**: `kpi.view`
- **Roles**: KPI Contributor, KPI Manager, Admin
- **Purpose**: Track and manage key performance indicators

## Future Expansion

As more operational tools are added to the Operations workspace, each page will have its own permission requirements. This allows users to access Operations workspace and see only the pages they have permission for.

### Example Future Pages
- Operations Analytics (might require `operations.analytics.view`)
- Process Management (might require `process.view`)
- Resource Planning (might require `resource.view`)

## Permission Model

### Current Behavior
- Users **with** `kpi.view`: Redirected to KPI Dashboard from `/operations`
- Users **without** `kpi.view`: See placeholder page at `/operations` explaining they need permission

### Future Behavior (Multi-Page)
- Users can access `/operations` workspace regardless of individual page permissions
- Sidebar will show only menu items for pages they have permission to access (filtered by `can_access_url`)
- Users without permission for any Operations pages will see a placeholder explaining the workspace
- Users with permission for some (but not all) pages will see those pages in the sidebar

## Implementation Notes

### Adding New Operations Pages

1. **Create the page** in `src/app/(dashboard)/operations/[page-name]/page.tsx`
2. **Add menu item** via migration:
   ```sql
   INSERT INTO public.workspace_menu_items (
     workspace_id,
     title,
     url,
     icon,
     group_name,
     display_order,
     is_active
   ) VALUES (
     (SELECT workspace_id FROM public.workspaces WHERE slug = 'operations'),
     'Page Name',
     '/operations/page-name',
     'IconName',
     'Overview', -- or appropriate group
     2, -- increment display_order
     true
   );
   ```
3. **Update `can_access_url` function** to map the URL to the required permission:
   ```sql
   CREATE OR REPLACE FUNCTION public.can_access_url(p_url varchar)
   RETURNS boolean
   LANGUAGE plpgsql
   STABLE
   SECURITY DEFINER
   SET search_path = ''
   AS $$
   BEGIN
     -- Existing mappings...
     IF p_url = '/operations/kpi-dashboard' THEN
       RETURN public.has_permission('kpi.view');
     ELSIF p_url = '/operations/new-page' THEN
       RETURN public.has_permission('new_permission.view');
     -- ...
     END IF;
     RETURN true;
   END;
   $$;
   ```
4. **Update Operations placeholder** if needed to reflect new pages

### Workspace Root Behavior

The `/operations` page currently:
- Redirects users with `kpi.view` to `/operations/kpi-dashboard`
- Shows placeholder for users without `kpi.view`

**Future**: When multiple pages exist, `/operations` should:
- Redirect to the first accessible page (first menu item user has permission for)
- Or show a dashboard/overview if one exists
- Show placeholder only if user has no access to any Operations pages

## Menu Item Filtering

Menu items are automatically filtered by the `can_access_url` RLS policy on `workspace_menu_items`. This ensures users only see menu items for pages they can access.

## Testing Permissions

To test Operations workspace access:
1. Create a user with only Viewer role (no KPI permissions)
2. Navigate to `/operations` - should see placeholder
3. Navigate to `/operations/kpi-dashboard` - should see placeholder
4. Grant KPI Contributor role - should now see KPI Dashboard

