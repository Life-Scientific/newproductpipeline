"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  PERMISSIONS,
  type PermissionKey,
  type PermissionContextType,
  hasPermission as checkPermission,
  hasAnyPermission as checkAnyPermission,
  hasAllPermissions as checkAllPermissions,
} from "@/lib/permissions";

interface UsePermissionsOptions {
  /**
   * If true, will fetch permissions from JWT first, then fall back to database
   * If false, will only use database
   */
  preferJwt?: boolean;
}

/**
 * Hook to get and check user permissions
 *
 * Reads permissions from JWT token if available, otherwise fetches from database.
 * Provides utilities for checking specific permissions.
 */
export function usePermissions(
  options: UsePermissionsOptions = {},
): PermissionContextType {
  const { preferJwt = true } = options;

  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [primaryRole, setPrimaryRole] = useState<string>("Viewer");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPermissions() {
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setPermissions([]);
          setRoles(["Viewer"]);
          setPrimaryRole("Viewer");
          setIsLoading(false);
          return;
        }

        // Try to get permissions from JWT first
        if (preferJwt) {
          const jwt = session.access_token;
          try {
            // Decode JWT payload (middle part)
            const payload = JSON.parse(atob(jwt.split(".")[1]));

            if (payload.permissions && Array.isArray(payload.permissions)) {
              setPermissions(payload.permissions);
              setRoles(payload.roles || ["Viewer"]);
              setPrimaryRole(payload.user_role || "Viewer");
              setIsLoading(false);
              return;
            }
          } catch {
            // JWT decode failed, fall back to database
          }
        }

        // Fall back to database query
        const { data: userPermissions, error: permError } = await supabase.rpc(
          "get_user_permissions",
        );
        const { data: userRoles, error: rolesError } =
          await supabase.rpc("get_user_roles");

        if (permError) {
          console.error("Error fetching permissions:", permError);
        }
        if (rolesError) {
          console.error("Error fetching roles:", rolesError);
        }

        setPermissions(userPermissions || []);
        setRoles(userRoles || ["Viewer"]);

        // Determine primary role (highest privilege)
        const roleOrder = [
          "Admin",
          "Editor",
          "KPI Manager",
          "Portfolio Manager",
          "Country Manager",
          "Viewer",
        ];
        const userRoleList = userRoles || ["Viewer"];
        for (const role of roleOrder) {
          if (userRoleList.includes(role)) {
            setPrimaryRole(role);
            break;
          }
        }
      } catch (error) {
        console.error("Error in usePermissions:", error);
        setPermissions([]);
        setRoles(["Viewer"]);
        setPrimaryRole("Viewer");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPermissions();

    // Subscribe to auth changes
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchPermissions();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [preferJwt]);

  // Permission check functions
  const hasPermission = useCallback(
    (permission: PermissionKey) => checkPermission(permissions, permission),
    [permissions],
  );

  const hasAnyPermission = useCallback(
    (perms: PermissionKey[]) => checkAnyPermission(permissions, perms),
    [permissions],
  );

  const hasAllPermissions = useCallback(
    (perms: PermissionKey[]) => checkAllPermissions(permissions, perms),
    [permissions],
  );

  // Memoized permission shortcuts
  const permissionShortcuts = useMemo(
    () => ({
      // Business Cases
      canViewBusinessCases: checkPermission(
        permissions,
        PERMISSIONS.BUSINESS_CASE_VIEW,
      ),
      canEditBusinessCases: checkPermission(
        permissions,
        PERMISSIONS.BUSINESS_CASE_EDIT,
      ),
      canCreateBusinessCases: checkPermission(
        permissions,
        PERMISSIONS.BUSINESS_CASE_CREATE,
      ),
      canDeleteBusinessCases: checkPermission(
        permissions,
        PERMISSIONS.BUSINESS_CASE_DELETE,
      ),

      // Formulations
      canViewFormulations: checkPermission(
        permissions,
        PERMISSIONS.FORMULATION_VIEW,
      ),
      canEditFormulations: checkPermission(
        permissions,
        PERMISSIONS.FORMULATION_EDIT,
      ),
      canCreateFormulations: checkPermission(
        permissions,
        PERMISSIONS.FORMULATION_CREATE,
      ),
      canDeleteFormulations: checkPermission(
        permissions,
        PERMISSIONS.FORMULATION_DELETE,
      ),

      // Formulation Countries
      canViewFormulationCountries: checkPermission(
        permissions,
        PERMISSIONS.FORMULATION_COUNTRY_VIEW,
      ),
      canEditFormulationCountries: checkPermission(
        permissions,
        PERMISSIONS.FORMULATION_COUNTRY_EDIT,
      ),
      canCreateFormulationCountries: checkPermission(
        permissions,
        PERMISSIONS.FORMULATION_COUNTRY_CREATE,
      ),
      canDeleteFormulationCountries: checkPermission(
        permissions,
        PERMISSIONS.FORMULATION_COUNTRY_DELETE,
      ),

      // Use Groups
      canViewUseGroups: checkPermission(
        permissions,
        PERMISSIONS.USE_GROUP_VIEW,
      ),
      canEditUseGroups: checkPermission(
        permissions,
        PERMISSIONS.USE_GROUP_EDIT,
      ),
      canCreateUseGroups: checkPermission(
        permissions,
        PERMISSIONS.USE_GROUP_CREATE,
      ),
      canDeleteUseGroups: checkPermission(
        permissions,
        PERMISSIONS.USE_GROUP_DELETE,
      ),

      // COGS
      canViewCOGS: checkPermission(permissions, PERMISSIONS.COGS_VIEW),
      canEditCOGS: checkPermission(permissions, PERMISSIONS.COGS_EDIT),

      // Countries
      canViewCountries: checkPermission(permissions, PERMISSIONS.COUNTRY_VIEW),
      canEditCountries: checkPermission(permissions, PERMISSIONS.COUNTRY_EDIT),

      // Ingredients
      canViewIngredients: checkPermission(
        permissions,
        PERMISSIONS.INGREDIENT_VIEW,
      ),
      canEditIngredients: checkPermission(
        permissions,
        PERMISSIONS.INGREDIENT_EDIT,
      ),

      // Suppliers
      canViewSuppliers: checkPermission(permissions, PERMISSIONS.SUPPLIER_VIEW),
      canEditSuppliers: checkPermission(permissions, PERMISSIONS.SUPPLIER_EDIT),

      // Exchange Rates
      canViewExchangeRates: checkPermission(
        permissions,
        PERMISSIONS.EXCHANGE_RATE_VIEW,
      ),
      canEditExchangeRates: checkPermission(
        permissions,
        PERMISSIONS.EXCHANGE_RATE_EDIT,
      ),

      // Reference Products
      canViewReferenceProducts: checkPermission(
        permissions,
        PERMISSIONS.REFERENCE_PRODUCT_VIEW,
      ),
      canEditReferenceProducts: checkPermission(
        permissions,
        PERMISSIONS.REFERENCE_PRODUCT_EDIT,
      ),

      // Reference Data (combined check for any edit permission)
      canEditReferenceData: checkAnyPermission(permissions, [
        PERMISSIONS.EXCHANGE_RATE_EDIT,
        PERMISSIONS.COUNTRY_EDIT,
        PERMISSIONS.REFERENCE_PRODUCT_EDIT,
        PERMISSIONS.COGS_EDIT,
        PERMISSIONS.INGREDIENT_EDIT,
        PERMISSIONS.SUPPLIER_EDIT,
      ]),

      // User Management
      canViewUsers: checkPermission(permissions, PERMISSIONS.USER_VIEW),
      canInviteUsers: checkPermission(permissions, PERMISSIONS.USER_INVITE),
      canManageUsers: checkPermission(permissions, PERMISSIONS.USER_EDIT_ROLE),
      canDeleteUsers: checkPermission(permissions, PERMISSIONS.USER_DELETE),

      // Role Management
      canViewRoles: checkPermission(permissions, PERMISSIONS.ROLE_VIEW),
      canCreateRoles: checkPermission(permissions, PERMISSIONS.ROLE_CREATE),
      canManageRoles: checkPermission(permissions, PERMISSIONS.ROLE_EDIT),
      canDeleteRoles: checkPermission(permissions, PERMISSIONS.ROLE_DELETE),

      // Analytics
      canViewAnalytics: checkPermission(
        permissions,
        PERMISSIONS.ANALYTICS_VIEW,
      ),
      canExportAnalytics: checkPermission(
        permissions,
        PERMISSIONS.ANALYTICS_EXPORT,
      ),

      // Settings
      canViewSettings: checkPermission(permissions, PERMISSIONS.SETTINGS_VIEW),
      canEditSettings: checkPermission(permissions, PERMISSIONS.SETTINGS_EDIT),

      // KPI Dashboard
      canViewKPIs: checkPermission(permissions, PERMISSIONS.KPI_VIEW),
      canCreateKPIs: checkPermission(permissions, PERMISSIONS.KPI_CREATE),
      canEditKPIs: checkPermission(permissions, PERMISSIONS.KPI_EDIT),
      canDeleteKPIs: checkPermission(permissions, PERMISSIONS.KPI_DELETE),
      canManageKPIHierarchy: checkPermission(
        permissions,
        PERMISSIONS.KPI_MANAGE_HIERARCHY,
      ),
      canLockKPIs: checkPermission(permissions, PERMISSIONS.KPI_LOCK),
      canViewKPIAudit: checkPermission(permissions, PERMISSIONS.KPI_VIEW_AUDIT),
    }),
    [permissions],
  );

  return {
    permissions,
    roles,
    primaryRole,
    isLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    ...permissionShortcuts,
  };
}

/**
 * Hook to check a single permission
 * Simpler alternative when you only need one permission check
 */
export function useHasPermission(permission: PermissionKey): {
  hasPermission: boolean;
  isLoading: boolean;
} {
  const { hasPermission: check, isLoading } = usePermissions();

  return {
    hasPermission: check(permission),
    isLoading,
  };
}

/**
 * Hook to check if user can perform any of the given actions
 */
export function useCanPerformAny(permissions: PermissionKey[]): {
  canPerform: boolean;
  isLoading: boolean;
} {
  const { hasAnyPermission, isLoading } = usePermissions();

  return {
    canPerform: hasAnyPermission(permissions),
    isLoading,
  };
}
