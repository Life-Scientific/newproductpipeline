# KPI Dashboard Permissions Guide

## Overview

The KPI Dashboard is located in the **Operations** workspace and requires the `kpi.view` permission to access.

## Workspace Structure

The KPI Dashboard is now in the **Operations** workspace (not Portfolio). Users need to:
1. Switch to the "Operations" workspace using the workspace switcher in the sidebar
2. Have the `kpi.view` permission to see and access the dashboard

## How to Grant Access

### Option 1: Assign a Role (Recommended)

Assign one of these roles to users, which include `kpi.view` permission:

- **Admin** - Has all permissions including all KPI permissions
- **KPI Manager** - Has all KPI permissions (`kpi.view`, `kpi.create`, `kpi.edit`, `kpi.delete`, `kpi.manage_hierarchy`, `kpi.lock`, `kpi.view_audit`)
- **Editor** - Has `kpi.view` and other KPI permissions
- **Portfolio Manager** - Has `kpi.view`, `kpi.edit`, `kpi.lock`, `kpi.view_audit`
- **Country Manager** - Has `kpi.view`
- **Viewer** - Has `kpi.view` (read-only access)

**Via UI:**
1. Go to `/admin/users` (or your user management page)
2. Find the user you want to grant access to
3. Edit their role and assign one of the roles above

**Via SQL (if needed):**
```sql
-- Assign KPI Manager role to a user
-- Replace USER_EMAIL with the user's email
UPDATE public.user_roles
SET role_id = '00000000-0000-0000-0000-000000000006' -- KPI Manager role ID
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'USER_EMAIL'
);
```

### Option 2: Grant Permission Directly (Advanced)

If you need to grant only `kpi.view` without changing their role:

```sql
-- Get the permission ID
SELECT permission_id FROM public.permissions WHERE permission_key = 'kpi.view';

-- Grant permission directly to user (if you have a user_permissions table)
-- Note: This depends on your permission system structure
```

## Permission Levels

| Permission | Description | Roles with Permission |
|------------|-------------|----------------------|
| `kpi.view` | View KPI Dashboard | Admin, KPI Manager, Editor, Portfolio Manager, Country Manager, Viewer |
| `kpi.create` | Create new KPIs | Admin, KPI Manager, Editor |
| `kpi.edit` | Edit KPIs (if owner or has permission) | Admin, KPI Manager, Editor, Portfolio Manager |
| `kpi.delete` | Delete KPIs | Admin, KPI Manager, Editor |
| `kpi.manage_hierarchy` | Manage Core Drivers & Strategic Drivers | Admin, KPI Manager, Editor |
| `kpi.lock` | Lock/unlock KPIs | Admin, KPI Manager, Editor, Portfolio Manager |
| `kpi.view_audit` | View audit log | Admin, KPI Manager, Editor, Portfolio Manager |

## Quick Reference

**To grant access to a new user:**
1. Assign them the **Viewer** role for read-only access, OR
2. Assign them the **KPI Manager** role for full KPI management access

**To check if a user has access:**
```sql
SELECT 
  u.email,
  r.role_name,
  p.permission_key
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
LEFT JOIN public.roles r ON ur.role_id = r.role_id
LEFT JOIN public.role_permissions rp ON r.role_id = rp.role_id
LEFT JOIN public.permissions p ON rp.permission_id = p.permission_id
WHERE u.email = 'USER_EMAIL'
  AND p.permission_key = 'kpi.view';
```

## Workspace Access

Users also need access to the Operations workspace. By default, all authenticated users can see all active workspaces, but you can restrict workspace access if needed through the `user_workspace_preferences` table.
