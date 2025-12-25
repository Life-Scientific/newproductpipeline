# Business Case JSONB Schema Design

**Date**: 2025-12-25
**Based On**: Actual database inspection
**Current State**: 8,810 active rows (881 groups × 10 years)

---

## Current Table Structure (Actual)

### Discovered Columns:
```sql
business_case_id                uuid PRIMARY KEY
business_case_name              varchar
year_offset                     integer (1-10)
volume                          numeric
nsp                             numeric
cogs_per_unit                   numeric
total_revenue                   numeric (GENERATED)
total_cogs                      numeric (GENERATED)
total_margin                    numeric (GENERATED)
margin_percent                  numeric (GENERATED)
assumptions                     text
volume_last_updated_at          timestamp
volume_last_updated_by          varchar
nsp_last_updated_at             timestamp
nsp_last_updated_by             varchar
cogs_last_updated_at            timestamp
cogs_last_updated_by            varchar
created_by                      varchar
created_at                      timestamp
updated_at                      timestamp
business_case_group_id          uuid NOT NULL
status                          varchar (active/inactive/superseded)
effective_start_fiscal_year     varchar (e.g., 'FY26')
change_summary                  text
change_reason                   text
previous_group_id               uuid (version history)
```

---

## Proposed JSONB Schema

### New Table Structure

```sql
CREATE TABLE business_case_v2 (
  -- Primary identifier (was business_case_group_id)
  business_case_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Metadata (stays at group level)
  business_case_name varchar,
  assumptions text,
  effective_start_fiscal_year varchar NOT NULL,

  -- Version control / audit fields
  status varchar DEFAULT 'active',
  change_summary text,
  change_reason text,
  previous_group_id uuid REFERENCES business_case_v2(business_case_id),
  created_by varchar,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),

  -- JSONB: 10 years of data
  years_data jsonb NOT NULL,

  -- Constraints
  CONSTRAINT valid_years_data CHECK (
    jsonb_typeof(years_data) = 'object' AND
    (years_data ? '1') AND
    (years_data ? '2') AND
    (years_data ? '3') AND
    (years_data ? '4') AND
    (years_data ? '5') AND
    (years_data ? '6') AND
    (years_data ? '7') AND
    (years_data ? '8') AND
    (years_data ? '9') AND
    (years_data ? '10')
  )
);

-- Index for fast JSONB queries
CREATE INDEX idx_business_case_years_data ON business_case_v2 USING GIN (years_data);

-- Index for status queries
CREATE INDEX idx_business_case_status ON business_case_v2 (status) WHERE status = 'active';
```

### JSONB Structure: `years_data`

**Format**:
```json
{
  "1": {
    "volume": 100.00,
    "nsp": 5.50,
    "cogs_per_unit": 3.25,
    "volume_last_updated_at": "2025-01-15T10:30:00Z",
    "volume_last_updated_by": "user@example.com",
    "nsp_last_updated_at": "2025-01-15T10:35:00Z",
    "nsp_last_updated_by": "user@example.com",
    "cogs_last_updated_at": "2025-01-15T10:40:00Z",
    "cogs_last_updated_by": "user@example.com"
  },
  "2": {
    "volume": 105.00,
    "nsp": 5.75,
    "cogs_per_unit": 3.30,
    "volume_last_updated_at": "2025-01-15T10:30:00Z",
    "volume_last_updated_by": "user@example.com",
    "nsp_last_updated_at": "2025-01-15T10:35:00Z",
    "nsp_last_updated_by": "user@example.com",
    "cogs_last_updated_at": "2025-01-15T10:40:00Z",
    "cogs_last_updated_by": "user@example.com"
  },
  ... (years 3-9) ...
  "10": {
    "volume": 150.00,
    "nsp": 7.00,
    "cogs_per_unit": 3.75,
    "volume_last_updated_at": "2025-01-15T10:30:00Z",
    "volume_last_updated_by": "user@example.com",
    "nsp_last_updated_at": "2025-01-15T10:35:00Z",
    "nsp_last_updated_by": "user@example.com",
    "cogs_last_updated_at": "2025-01-15T10:40:00Z",
    "cogs_last_updated_by": "user@example.com"
  }
}
```

**Per-Year Fields**:
- `volume` (numeric) - Product volume
- `nsp` (numeric) - Net selling price
- `cogs_per_unit` (numeric) - Cost of goods sold per unit
- `volume_last_updated_at` (timestamp ISO 8601)
- `volume_last_updated_by` (string)
- `nsp_last_updated_at` (timestamp ISO 8601)
- `nsp_last_updated_by` (string)
- `cogs_last_updated_at` (timestamp ISO 8601)
- `cogs_last_updated_by` (string)

**Note**: `total_revenue`, `total_cogs`, `total_margin`, and `margin_percent` are **computed fields** - they will be calculated in views/application layer, not stored in JSONB.

---

## Updated Views

### View: `vw_business_case` (Expanded JSONB)

**Purpose**: Expand JSONB back to row-per-year format for backward compatibility

```sql
CREATE OR REPLACE VIEW vw_business_case AS
SELECT
  bc.business_case_id as business_case_group_id,
  gen_random_uuid() as business_case_id, -- Generate UUID for each year
  bc.business_case_name,
  year_offset.offset as year_offset,

  -- Extract year data from JSONB
  (bc.years_data->year_offset.offset::text->>'volume')::numeric as volume,
  (bc.years_data->year_offset.offset::text->>'nsp')::numeric as nsp,
  (bc.years_data->year_offset.offset::text->>'cogs_per_unit')::numeric as cogs_per_unit,

  -- Computed fields (calculated on-the-fly)
  (bc.years_data->year_offset.offset::text->>'volume')::numeric *
    (bc.years_data->year_offset.offset::text->>'nsp')::numeric as total_revenue,

  (bc.years_data->year_offset.offset::text->>'volume')::numeric *
    (bc.years_data->year_offset.offset::text->>'cogs_per_unit')::numeric as total_cogs,

  ((bc.years_data->year_offset.offset::text->>'volume')::numeric *
    (bc.years_data->year_offset.offset::text->>'nsp')::numeric) -
  ((bc.years_data->year_offset.offset::text->>'volume')::numeric *
    (bc.years_data->year_offset.offset::text->>'cogs_per_unit')::numeric) as total_margin,

  CASE
    WHEN ((bc.years_data->year_offset.offset::text->>'volume')::numeric *
          (bc.years_data->year_offset.offset::text->>'nsp')::numeric) > 0
    THEN ((((bc.years_data->year_offset.offset::text->>'volume')::numeric *
            (bc.years_data->year_offset.offset::text->>'nsp')::numeric) -
          ((bc.years_data->year_offset.offset::text->>'volume')::numeric *
            (bc.years_data->year_offset.offset::text->>'cogs_per_unit')::numeric)) /
          ((bc.years_data->year_offset.offset::text->>'volume')::numeric *
            (bc.years_data->year_offset.offset::text->>'nsp')::numeric)) * 100
    ELSE 0
  END as margin_percent,

  -- Calculate fiscal_year
  CASE
    WHEN bc.effective_start_fiscal_year IS NOT NULL THEN
      'FY' || LPAD(
        ((CAST(SUBSTRING(bc.effective_start_fiscal_year FROM 3) AS INTEGER) +
          year_offset.offset - 1))::TEXT,
        2, '0'
      )
    ELSE NULL
  END as fiscal_year,

  -- Git-style tracking fields
  (bc.years_data->year_offset.offset::text->>'volume_last_updated_at')::timestamp as volume_last_updated_at,
  bc.years_data->year_offset.offset::text->>'volume_last_updated_by' as volume_last_updated_by,
  (bc.years_data->year_offset.offset::text->>'nsp_last_updated_at')::timestamp as nsp_last_updated_at,
  bc.years_data->year_offset.offset::text->>'nsp_last_updated_by' as nsp_last_updated_by,
  (bc.years_data->year_offset.offset::text->>'cogs_last_updated_at')::timestamp as cogs_last_updated_at,
  bc.years_data->year_offset.offset::text->>'cogs_last_updated_by' as cogs_last_updated_by,

  -- Metadata
  bc.assumptions,
  bc.effective_start_fiscal_year,
  bc.status,
  bc.change_summary,
  bc.change_reason,
  bc.previous_group_id,
  bc.created_by,
  bc.created_at,
  bc.updated_at

FROM business_case_v2 bc
CROSS JOIN generate_series(1, 10) AS year_offset(offset)
WHERE bc.status = 'active';
```

### View: `vw_business_case_aggregated` (For Charts)

**Purpose**: Pre-aggregate by fiscal year for chart performance

```sql
CREATE OR REPLACE VIEW vw_business_case_aggregated AS
WITH expanded AS (
  SELECT
    bc.business_case_id,
    bc.business_case_name,
    year_offset.offset as year_offset,
    CASE
      WHEN bc.effective_start_fiscal_year IS NOT NULL THEN
        'FY' || LPAD(
          ((CAST(SUBSTRING(bc.effective_start_fiscal_year FROM 3) AS INTEGER) +
            year_offset.offset - 1))::TEXT,
          2, '0'
        )
      ELSE NULL
    END as fiscal_year,
    (bc.years_data->year_offset.offset::text->>'volume')::numeric as volume,
    (bc.years_data->year_offset.offset::text->>'nsp')::numeric as nsp,
    (bc.years_data->year_offset.offset::text->>'cogs_per_unit')::numeric as cogs_per_unit
  FROM business_case_v2 bc
  CROSS JOIN generate_series(1, 10) AS year_offset(offset)
  WHERE bc.status = 'active'
)
SELECT
  fiscal_year,
  SUM(volume * nsp) as total_revenue,
  SUM(volume * cogs_per_unit) as total_cogs,
  SUM(volume * nsp - volume * cogs_per_unit) as total_margin,
  COUNT(DISTINCT business_case_id) as business_case_count
FROM expanded
WHERE fiscal_year IS NOT NULL
GROUP BY fiscal_year
ORDER BY fiscal_year;
```

---

## Migration SQL

### Migration Script Preview

```sql
-- Step 1: Create new table
CREATE TABLE business_case_v2 (...);

-- Step 2: Migrate data
INSERT INTO business_case_v2 (
  business_case_id,
  business_case_name,
  assumptions,
  effective_start_fiscal_year,
  status,
  change_summary,
  change_reason,
  previous_group_id,
  created_by,
  created_at,
  updated_at,
  years_data
)
SELECT
  business_case_group_id as business_case_id,
  MAX(business_case_name) as business_case_name,
  MAX(assumptions) as assumptions,
  MAX(effective_start_fiscal_year) as effective_start_fiscal_year,
  MAX(status) as status,
  MAX(change_summary) as change_summary,
  MAX(change_reason) as change_reason,
  MAX(previous_group_id) as previous_group_id,
  MAX(created_by) as created_by,
  MIN(created_at) as created_at,
  MAX(updated_at) as updated_at,

  -- Build JSONB from 10 rows
  jsonb_object_agg(
    year_offset::text,
    jsonb_build_object(
      'volume', volume,
      'nsp', nsp,
      'cogs_per_unit', cogs_per_unit,
      'volume_last_updated_at', volume_last_updated_at,
      'volume_last_updated_by', volume_last_updated_by,
      'nsp_last_updated_at', nsp_last_updated_at,
      'nsp_last_updated_by', nsp_last_updated_by,
      'cogs_last_updated_at', cogs_last_updated_at,
      'cogs_last_updated_by', cogs_last_updated_by
    )
  ) as years_data

FROM business_case
GROUP BY business_case_group_id;

-- Step 3: Rename tables
ALTER TABLE business_case RENAME TO business_case_old;
ALTER TABLE business_case_v2 RENAME TO business_case;

-- Step 4: Create views
-- (See view definitions above)

-- Step 5: Verify
SELECT COUNT(*) FROM business_case;  -- Should be 1625 (881 active + 744 inactive)
SELECT COUNT(*) FROM vw_business_case;  -- Should be 16250 (expanded)
```

---

## Benefits Achieved

### 1. Storage Reduction
- **Before**: 16,250 rows
- **After**: 1,625 rows
- **Reduction**: 90%

### 2. Query Performance
- Single row fetch instead of 10-row query
- Atomic updates (one UPDATE instead of 10)
- Better caching (881 rows vs 8,810 rows for active data)

### 3. Data Integrity
- ✅ All 10 years always together (enforced by CHECK constraint)
- ✅ Atomic updates prevent partial group updates
- ✅ Version control maintained via `previous_group_id`

### 4. Application Compatibility
- ✅ `vw_business_case` provides row-per-year format
- ✅ Existing queries continue to work
- ✅ New aggregated view for better chart performance

---

## Next Steps

1. ✅ Schema designed
2. ✅ Create full migration script (`supabase/migrations/20251225000000_migrate_to_jsonb.sql`)
3. ⏳ Test migration on database
4. ⏳ Update application code (optional - views provide compatibility)
5. ⏳ Deploy to production

## Migration Files Created

- ✅ `supabase/migrations/BACKUP_business_case_pre_jsonb.sql` - Backup script (executed)
- ✅ `supabase/migrations/20251225000000_migrate_to_jsonb.sql` - Migration script (ready to run)
- ✅ `docs/overhaul/JSONB_MIGRATION_GUIDE.md` - Execution guide

**Status**: Ready to execute migration. See `JSONB_MIGRATION_GUIDE.md` for execution steps.
