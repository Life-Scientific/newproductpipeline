-- ============================================================================
-- Script to inspect all triggers and their functions
-- Run this to see what triggers exist and verify they're working
-- ============================================================================

-- List all triggers
SELECT 
    t.tgname AS trigger_name,
    t.tgenabled AS enabled,
    c.relname AS table_name,
    CASE t.tgtype::integer & 66
        WHEN 2 THEN 'BEFORE'
        WHEN 64 THEN 'INSTEAD OF'
        ELSE 'AFTER'
    END AS timing,
    CASE t.tgtype::integer & 28
        WHEN 16 THEN 'UPDATE'
        WHEN 8 THEN 'DELETE'
        WHEN 4 THEN 'INSERT'
        WHEN 20 THEN 'INSERT OR UPDATE'
        WHEN 12 THEN 'UPDATE OR DELETE'
        WHEN 24 THEN 'INSERT OR UPDATE OR DELETE'
        ELSE 'UNKNOWN'
    END AS events,
    p.proname AS function_name,
    pg_get_functiondef(p.oid) AS function_definition
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE NOT t.tgisinternal
    AND c.relname NOT LIKE 'pg_%'
    AND c.relname NOT LIKE '_pg_%'
ORDER BY c.relname, t.tgname;

-- ============================================================================
-- Check specific business case trigger
-- ============================================================================

SELECT 
    'Business Case Triggers' AS section,
    t.tgname AS trigger_name,
    c.relname AS table_name,
    p.proname AS function_name
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE c.relname = 'business_case'
    AND NOT t.tgisinternal
ORDER BY t.tgname;

-- ============================================================================
-- Get function definition for track_business_case_field_updates
-- ============================================================================

SELECT 
    p.proname AS function_name,
    pg_get_functiondef(p.oid) AS function_definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE p.proname = 'track_business_case_field_updates'
    AND n.nspname = 'public';

-- ============================================================================
-- Check if app.current_user setting exists and can be read
-- ============================================================================

SELECT 
    'User Context Check' AS section,
    current_setting('app.current_user', TRUE) AS current_user_setting,
    current_user AS postgres_user,
    session_user AS session_user;

-- ============================================================================
-- Sample business case data to verify tracking fields
-- ============================================================================

SELECT 
    business_case_id,
    business_case_name,
    year_offset,
    volume,
    volume_last_updated_at,
    volume_last_updated_by,
    nsp,
    nsp_last_updated_at,
    nsp_last_updated_by,
    cogs_per_unit,
    cogs_last_updated_at,
    cogs_last_updated_by,
    created_by,
    created_at,
    updated_at
FROM business_case
WHERE status = 'active'
ORDER BY updated_at DESC
LIMIT 5;

-- ============================================================================
-- Check formulation status history
-- ============================================================================

SELECT 
    'Formulation Status History' AS section,
    COUNT(*) AS total_records,
    COUNT(DISTINCT changed_by) AS unique_users,
    MIN(changed_at) AS earliest_change,
    MAX(changed_at) AS latest_change
FROM formulation_status_history;

SELECT 
    formulation_id,
    old_status,
    new_status,
    changed_by,
    changed_at
FROM formulation_status_history
ORDER BY changed_at DESC
LIMIT 10;

