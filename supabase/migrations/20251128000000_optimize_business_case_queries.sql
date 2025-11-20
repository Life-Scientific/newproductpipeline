-- ============================================================================
-- Migration: Optimize Business Case Queries
-- Description: Creates a view to replace N+1 query patterns in application layer
--              Consolidates business case data with formulation, country, and use group info
-- ============================================================================

CREATE OR REPLACE VIEW public.vw_business_case_enriched AS
WITH resolved_fc AS (
    SELECT 
        bc.business_case_id,
        COALESCE(
            bc.formulation_country_id,
            (
                SELECT fcug.formulation_country_id
                FROM business_case_use_groups bcug
                JOIN formulation_country_use_group fcug ON bcug.formulation_country_use_group_id = fcug.formulation_country_use_group_id
                WHERE bcug.business_case_id = bc.business_case_id
                LIMIT 1
            )
        ) as formulation_country_id
    FROM business_case bc
)
SELECT 
    bc.business_case_id,
    bc.business_case_group_id,
    bc.business_case_name,
    bc.year_offset,
    bc.volume,
    bc.nsp,
    bc.cogs_per_unit,
    bc.total_revenue,
    bc.total_cogs,
    bc.total_margin,
    bc.margin_percent,
    bc.effective_start_fiscal_year,
    -- Calculate fiscal_year based on effective_start_fiscal_year + year_offset
    -- Assuming effective_start_fiscal_year format is 'FY26'
    CASE 
        WHEN bc.effective_start_fiscal_year IS NOT NULL THEN
            'FY' || LPAD(((CAST(SUBSTRING(bc.effective_start_fiscal_year FROM 3) AS INTEGER) + bc.year_offset - 1))::TEXT, 2, '0')
        ELSE NULL
    END as fiscal_year,
    bc.status,
    bc.created_at,
    bc.updated_at,
    rfc.formulation_country_id,
    f.formulation_id,
    f.formulation_code,
    f.formulation_name,
    f.uom,
    c.country_id,
    c.country_name,
    c.country_code,
    c.currency_code,
    -- Aggregated use groups
    (
        SELECT string_agg(fcug.use_group_name, ', ')
        FROM business_case_use_groups bcug
        JOIN formulation_country_use_group fcug ON bcug.formulation_country_use_group_id = fcug.formulation_country_use_group_id
        WHERE bcug.business_case_id = bc.business_case_id
    ) as use_group_name,
    (
        SELECT string_agg(fcug.use_group_variant, ', ')
        FROM business_case_use_groups bcug
        JOIN formulation_country_use_group fcug ON bcug.formulation_country_use_group_id = fcug.formulation_country_use_group_id
        WHERE bcug.business_case_id = bc.business_case_id
    ) as use_group_variant,
    -- Use group ID (first one found, for grouping)
    (
        SELECT fcug.formulation_country_use_group_id
        FROM business_case_use_groups bcug
        JOIN formulation_country_use_group fcug ON bcug.formulation_country_use_group_id = fcug.formulation_country_use_group_id
        WHERE bcug.business_case_id = bc.business_case_id
        LIMIT 1
    ) as formulation_country_use_group_id,
    -- Target market entry from first use group
    (
        SELECT fcug.target_market_entry_fy
        FROM business_case_use_groups bcug
        JOIN formulation_country_use_group fcug ON bcug.formulation_country_use_group_id = fcug.formulation_country_use_group_id
        WHERE bcug.business_case_id = bc.business_case_id
        LIMIT 1
    ) as target_market_entry_fy
FROM business_case bc
JOIN resolved_fc rfc ON bc.business_case_id = rfc.business_case_id
LEFT JOIN formulation_country fc ON rfc.formulation_country_id = fc.formulation_country_id
LEFT JOIN formulations f ON fc.formulation_id = f.formulation_id
LEFT JOIN countries c ON fc.country_id = c.country_id;

COMMENT ON VIEW public.vw_business_case_enriched IS 'Enriched business case view with resolved formulation, country, and aggregated use group data';

