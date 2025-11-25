/**
 * Permission-based RBAC system
 * 
 * This module defines all permissions and provides utilities for checking them.
 * Permissions are stored in the database and assigned to roles.
 */

// ============================================================================
// Permission Keys (must match database exactly)
// ============================================================================

export const PERMISSIONS = {
  // Business Cases
  BUSINESS_CASE_VIEW: 'business_case.view',
  BUSINESS_CASE_CREATE: 'business_case.create',
  BUSINESS_CASE_EDIT: 'business_case.edit',
  BUSINESS_CASE_DELETE: 'business_case.delete',

  // Formulations
  FORMULATION_VIEW: 'formulation.view',
  FORMULATION_CREATE: 'formulation.create',
  FORMULATION_EDIT: 'formulation.edit',
  FORMULATION_DELETE: 'formulation.delete',

  // Formulation Countries
  FORMULATION_COUNTRY_VIEW: 'formulation_country.view',
  FORMULATION_COUNTRY_CREATE: 'formulation_country.create',
  FORMULATION_COUNTRY_EDIT: 'formulation_country.edit',
  FORMULATION_COUNTRY_DELETE: 'formulation_country.delete',

  // Use Groups
  USE_GROUP_VIEW: 'use_group.view',
  USE_GROUP_CREATE: 'use_group.create',
  USE_GROUP_EDIT: 'use_group.edit',
  USE_GROUP_DELETE: 'use_group.delete',

  // Reference Data - Exchange Rates
  EXCHANGE_RATE_VIEW: 'exchange_rate.view',
  EXCHANGE_RATE_EDIT: 'exchange_rate.edit',

  // Reference Data - Countries
  COUNTRY_VIEW: 'country.view',
  COUNTRY_EDIT: 'country.edit',

  // Reference Data - Reference Products
  REFERENCE_PRODUCT_VIEW: 'reference_product.view',
  REFERENCE_PRODUCT_EDIT: 'reference_product.edit',

  // Reference Data - COGS
  COGS_VIEW: 'cogs.view',
  COGS_EDIT: 'cogs.edit',

  // Reference Data - Ingredients
  INGREDIENT_VIEW: 'ingredient.view',
  INGREDIENT_EDIT: 'ingredient.edit',

  // Reference Data - Suppliers
  SUPPLIER_VIEW: 'supplier.view',
  SUPPLIER_EDIT: 'supplier.edit',

  // User Management
  USER_VIEW: 'user.view',
  USER_INVITE: 'user.invite',
  USER_EDIT_ROLE: 'user.edit_role',
  USER_DELETE: 'user.delete',

  // Role Management
  ROLE_VIEW: 'role.view',
  ROLE_CREATE: 'role.create',
  ROLE_EDIT: 'role.edit',
  ROLE_DELETE: 'role.delete',

  // Analytics & Reporting
  ANALYTICS_VIEW: 'analytics.view',
  ANALYTICS_EXPORT: 'analytics.export',

  // Settings
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_EDIT: 'settings.edit',
} as const;

export type PermissionKey = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// ============================================================================
// Permission Categories (for UI grouping)
// ============================================================================

export const PERMISSION_CATEGORIES = {
  'Business Cases': [
    PERMISSIONS.BUSINESS_CASE_VIEW,
    PERMISSIONS.BUSINESS_CASE_CREATE,
    PERMISSIONS.BUSINESS_CASE_EDIT,
    PERMISSIONS.BUSINESS_CASE_DELETE,
  ],
  'Formulations': [
    PERMISSIONS.FORMULATION_VIEW,
    PERMISSIONS.FORMULATION_CREATE,
    PERMISSIONS.FORMULATION_EDIT,
    PERMISSIONS.FORMULATION_DELETE,
  ],
  'Formulation Countries': [
    PERMISSIONS.FORMULATION_COUNTRY_VIEW,
    PERMISSIONS.FORMULATION_COUNTRY_CREATE,
    PERMISSIONS.FORMULATION_COUNTRY_EDIT,
    PERMISSIONS.FORMULATION_COUNTRY_DELETE,
  ],
  'Use Groups': [
    PERMISSIONS.USE_GROUP_VIEW,
    PERMISSIONS.USE_GROUP_CREATE,
    PERMISSIONS.USE_GROUP_EDIT,
    PERMISSIONS.USE_GROUP_DELETE,
  ],
  'Reference Data': [
    PERMISSIONS.EXCHANGE_RATE_VIEW,
    PERMISSIONS.EXCHANGE_RATE_EDIT,
    PERMISSIONS.COUNTRY_VIEW,
    PERMISSIONS.COUNTRY_EDIT,
    PERMISSIONS.REFERENCE_PRODUCT_VIEW,
    PERMISSIONS.REFERENCE_PRODUCT_EDIT,
    PERMISSIONS.COGS_VIEW,
    PERMISSIONS.COGS_EDIT,
    PERMISSIONS.INGREDIENT_VIEW,
    PERMISSIONS.INGREDIENT_EDIT,
    PERMISSIONS.SUPPLIER_VIEW,
    PERMISSIONS.SUPPLIER_EDIT,
  ],
  'User Management': [
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_INVITE,
    PERMISSIONS.USER_EDIT_ROLE,
    PERMISSIONS.USER_DELETE,
  ],
  'Role Management': [
    PERMISSIONS.ROLE_VIEW,
    PERMISSIONS.ROLE_CREATE,
    PERMISSIONS.ROLE_EDIT,
    PERMISSIONS.ROLE_DELETE,
  ],
  'Analytics': [
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.ANALYTICS_EXPORT,
  ],
  'Settings': [
    PERMISSIONS.SETTINGS_VIEW,
    PERMISSIONS.SETTINGS_EDIT,
  ],
} as const;

// ============================================================================
// Default System Roles
// ============================================================================

export const SYSTEM_ROLES = {
  ADMIN: 'Admin',
  EDITOR: 'Editor',
  PORTFOLIO_MANAGER: 'Portfolio Manager',
  COUNTRY_MANAGER: 'Country Manager',
  VIEWER: 'Viewer',
} as const;

export type SystemRole = typeof SYSTEM_ROLES[keyof typeof SYSTEM_ROLES];

// ============================================================================
// Role Interface
// ============================================================================

export interface Role {
  role_id: string;
  role_name: string;
  description: string | null;
  is_system_role: boolean;
  created_at: string;
  permissions: Permission[];
}

export interface Permission {
  permission_id: string;
  permission_key: string;
  category: string;
  display_name: string;
  description?: string;
}

export interface UserRole {
  role_id: string;
  role_name: string;
  assigned_at: string;
}

// ============================================================================
// Permission Check Utilities
// ============================================================================

/**
 * Check if a set of permissions includes a specific permission
 */
export function hasPermission(permissions: string[], permission: PermissionKey): boolean {
  return permissions.includes(permission);
}

/**
 * Check if a set of permissions includes any of the specified permissions
 */
export function hasAnyPermission(permissions: string[], requiredPermissions: PermissionKey[]): boolean {
  return requiredPermissions.some(p => permissions.includes(p));
}

/**
 * Check if a set of permissions includes all of the specified permissions
 */
export function hasAllPermissions(permissions: string[], requiredPermissions: PermissionKey[]): boolean {
  return requiredPermissions.every(p => permissions.includes(p));
}

/**
 * Get the display name for a permission key
 */
export function getPermissionDisplayName(permissionKey: string): string {
  const parts = permissionKey.split('.');
  if (parts.length !== 2) return permissionKey;
  
  const [resource, action] = parts;
  const resourceName = resource.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const actionName = action.replace(/\b\w/g, c => c.toUpperCase());
  
  return `${actionName} ${resourceName}`;
}

/**
 * Group permissions by category
 */
export function groupPermissionsByCategory(permissions: Permission[]): Record<string, Permission[]> {
  return permissions.reduce((acc, permission) => {
    const category = permission.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);
}

// ============================================================================
// Permission Context Type (for React context)
// ============================================================================

export interface PermissionContextType {
  permissions: string[];
  roles: string[];
  primaryRole: string;
  isLoading: boolean;
  
  // Permission checks
  hasPermission: (permission: PermissionKey) => boolean;
  hasAnyPermission: (permissions: PermissionKey[]) => boolean;
  hasAllPermissions: (permissions: PermissionKey[]) => boolean;
  
  // Business Cases
  canViewBusinessCases: boolean;
  canEditBusinessCases: boolean;
  canCreateBusinessCases: boolean;
  canDeleteBusinessCases: boolean;
  
  // Formulations
  canViewFormulations: boolean;
  canEditFormulations: boolean;
  canCreateFormulations: boolean;
  canDeleteFormulations: boolean;
  
  // Formulation Countries
  canViewFormulationCountries: boolean;
  canEditFormulationCountries: boolean;
  canCreateFormulationCountries: boolean;
  canDeleteFormulationCountries: boolean;
  
  // Use Groups
  canViewUseGroups: boolean;
  canEditUseGroups: boolean;
  canCreateUseGroups: boolean;
  canDeleteUseGroups: boolean;
  
  // COGS
  canViewCOGS: boolean;
  canEditCOGS: boolean;
  
  // Countries
  canViewCountries: boolean;
  canEditCountries: boolean;
  
  // Ingredients
  canViewIngredients: boolean;
  canEditIngredients: boolean;
  
  // Suppliers
  canViewSuppliers: boolean;
  canEditSuppliers: boolean;
  
  // Exchange Rates
  canViewExchangeRates: boolean;
  canEditExchangeRates: boolean;
  
  // Reference Products
  canViewReferenceProducts: boolean;
  canEditReferenceProducts: boolean;
  
  // Reference Data (combined)
  canEditReferenceData: boolean;
  
  // User Management
  canViewUsers: boolean;
  canInviteUsers: boolean;
  canManageUsers: boolean;
  canDeleteUsers: boolean;
  
  // Role Management
  canViewRoles: boolean;
  canCreateRoles: boolean;
  canManageRoles: boolean;
  canDeleteRoles: boolean;
  
  // Analytics
  canViewAnalytics: boolean;
  canExportAnalytics: boolean;
  
  // Settings
  canViewSettings: boolean;
  canEditSettings: boolean;
}

