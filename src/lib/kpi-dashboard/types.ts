/**
 * TypeScript types for KPI Dashboard
 * These types match the database schema in the operations schema
 */

export type StatusColor = "red" | "yellow" | "green";
export type Trend = "up" | "down" | "flat";
export type Frequency = "realtime" | "daily" | "weekly" | "monthly" | "manual";
export type EntityType = "core_driver" | "strategic_driver" | "key_result";
export type AuditAction = "create" | "update" | "delete" | "lock" | "unlock";

/**
 * Database row types (matching operations schema tables)
 */
export interface CoreDriverRow {
  id: string;
  label: string;
  target: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface StrategicDriverRow {
  id: string;
  core_driver_id: string;
  label: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface KeyResultRow {
  id: string;
  strategic_driver_id: string;
  label: string;
  status: StatusColor;
  target: string | null;
  reality: string | null;
  trend: Trend;
  owner_id: string | null;
  justification: string | null;
  notes: string | null;
  is_locked: boolean;
  locked_by: string | null;
  locked_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DataSourceRow {
  id: string;
  key_result_id: string;
  source_system: string;
  endpoint: string | null;
  frequency: Frequency;
  last_sync: string;
  sync_enabled: boolean;
  config: Record<string, unknown>;
  created_at: string;
}

export interface AuditLogRow {
  id: string;
  entity_type: EntityType;
  entity_id: string;
  user_id: string | null;
  action: AuditAction;
  field_name: string | null;
  old_value: string | null;
  new_value: string | null;
  created_at: string;
}

/**
 * View row type (from operations.vw_kpi_dashboard)
 */
export interface KPIDashboardViewRow {
  id: string;
  label: string;
  status: StatusColor;
  target: string | null;
  reality: string | null;
  trend: Trend;
  justification: string | null;
  notes: string | null;
  is_locked: boolean;
  locked_at: string | null;
  locked_by: string | null;
  owner_id: string | null;
  updated_at: string;
  kr_sort: number;
  strategic_driver_id: string;
  strategic_driver_label: string;
  sd_sort: number;
  core_driver_id: string;
  core_driver_label: string;
  core_driver_target: string | null;
  cd_sort: number;
  source_system: string | null;
  endpoint: string | null;
  frequency: Frequency | null;
  last_sync: string | null;
  sync_enabled: boolean | null;
}

/**
 * Transformed types for UI (hierarchical structure)
 */
export interface DataSource {
  system: string;
  endpoint?: string | null;
  lastSync: string;
  frequency: Frequency;
  syncEnabled?: boolean;
}

export interface KeyResult {
  id: string;
  label: string;
  status: StatusColor;
  ownerId: string | null;
  target?: string | null;
  reality?: string | null;
  justification?: string | null;
  lastUpdated: string;
  lastUpdatedBy?: string | null;
  isLocked: boolean;
  lockedBy?: string | null;
  lockedAt?: string | null;
  source: DataSource;
  notes?: string | null;
  trend?: Trend;
}

export interface StrategicDriver {
  id: string;
  label: string;
  keyResults: KeyResult[];
}

export interface CoreDriver {
  id: string;
  label: string;
  target: string | null;
  strategicDrivers: StrategicDriver[];
}

export interface KPIData {
  coreDrivers: CoreDriver[];
}

/**
 * Helper type for creating/updating key results
 */
export interface KeyResultInput {
  label: string;
  status?: StatusColor;
  target?: string | null;
  reality?: string | null;
  trend?: Trend;
  owner_id?: string | null;
  justification?: string | null;
  notes?: string | null;
  strategic_driver_id: string;
}

export interface CoreDriverInput {
  label: string;
  target?: string | null;
  sort_order?: number;
}

export interface StrategicDriverInput {
  label: string;
  core_driver_id: string;
  sort_order?: number;
}

/**
 * Audit log entry for display
 */
export interface AuditLogEntry {
  id: string;
  entityType: EntityType;
  entityId: string;
  userId: string | null;
  userName?: string | null;
  action: AuditAction;
  fieldName: string | null;
  oldValue: string | null;
  newValue: string | null;
  createdAt: string;
}


