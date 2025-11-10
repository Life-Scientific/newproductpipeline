# LS Portfolio - System Overview

## Purpose
A comprehensive database system for managing agricultural product portfolios, replacing scattered Excel files. Tracks formulations, regulatory approvals, business cases, and financial projections across multiple countries.

## Core Architecture

### Database Layers (5 interconnected layers)
1. **Reference Data** - Countries, crops, ingredients, suppliers (lookup tables)
2. **Core Products** - Formulations with ingredient compositions
3. **Market Approvals** - Formulation-country-label combinations (regulatory tracking)
4. **Business Cases** - Financial modeling and projections
5. **Regulatory Submissions** - Patents, data protections, timelines

### Key Design Principles
- **Single Source of Truth** - All data in one normalized database
- **Auto-Code Generation** - Formulations automatically get codes based on active ingredients
- **Dual-Level Tracking** - Formulation-country (market level) + Labels (registration level)
- **Git-Style Tracking** - Timestamps and user tracking for business case changes
- **Flexible Linking** - Business cases can link to formulation-country OR label level

---

## Core Tables & Relationships

### Reference Tables (Lookup Data)
- **countries** - Country codes, names, currencies
- **crops** - Crop names and categories
- **ingredients** - Active ingredients, safeners, adjuvants (with supply risk, EU approval)
- **suppliers** - Ingredient suppliers
- **reference_products** - External innovator products (for Article 34 comparisons)

### Core Product Tables
- **formulations** - Master product list
  - Auto-generated `formulation_code` (e.g., "001-01")
  - Status: Not Yet Considered, Selected, Monitoring, Killed
  - Links to ingredients via `formulation_ingredients`
  
- **formulation_ingredients** - Many-to-many with quantities
  - `quantity` + `quantity_unit` (e.g., "200 g/L")
  - `ingredient_role` (Active, Safener, Adjuvant, etc.)

### Market Approval Tables
- **formulation_country** - Formulation in a specific country
  - Registration status, pathway (Article 33/34), portfolio flags
  - Timeline: EMD, target market entry FY
  
- **formulation_country_label** - Specific label registration
  - Label variants (A, B, C) per formulation-country
  - Reference product links
  - Dual timelines: earliest predicted vs actual dates
  
- **formulation_country_label_crops** - Crops registered for this label (intended use)

### Business & Financial Tables
- **business_case** - Financial projections
  - Links to EITHER `formulation_country_id` OR `formulation_country_label_id`
  - Year offset (1-10 years from market entry)
  - Volume, NSP, COGS → auto-calculates revenue, margin, margin%
  - Git-style tracking: `volume_last_updated_at/by`, `nsp_last_updated_at/by`, etc.
  
- **cogs** - Cost of goods sold
  - Can be global (formulation-level) or country-specific
  - Fiscal year tracking
  - Breakdown: raw materials, manufacturing, packaging, other

### Regulatory Tables
- **data_protections** - Active ingredient data protection (country-specific)
- **patent_protections** - Active ingredient patents (country-specific)
- **formulation_data_protections** - Formulation-level data protection
- **formulation_patents** - Formulation-level patents

### Supporting Tables
- **base_code_registry** - Tracks base codes for auto-generation
- **formulation_status_history** - Audit trail of status changes
- **business_case_labels** - Links multiple labels to aggregate business cases
- **ingredient_suppliers** - Supplier relationships with costs
- **external_links** - URLs/documentation links

---

## Complete Schema Reference

### Reference Tables

```sql
-- Countries
CREATE TABLE countries (
  country_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code VARCHAR(2) UNIQUE NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  currency_code VARCHAR(3) NOT NULL,
  has_tariffs BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crops
CREATE TABLE crops (
  crop_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name VARCHAR(100) UNIQUE NOT NULL,
  crop_category VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ingredients
CREATE TABLE ingredients (
  ingredient_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_name VARCHAR(200) UNIQUE NOT NULL,
  ingredient_type VARCHAR(100) NOT NULL CHECK (ingredient_type IN ('Active', 'Safener', 'Adjuvant', 'Solvent', 'Surfactant', 'Other')),
  cas_number VARCHAR(50),
  standard_density_g_per_l DECIMAL(10,2),
  supply_risk VARCHAR(50) CHECK (supply_risk IN ('Low', 'Medium', 'High', 'Critical', NULL)),
  supply_risk_notes TEXT,
  is_eu_approved BOOLEAN DEFAULT false,
  regulatory_notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Suppliers
CREATE TABLE suppliers (
  supplier_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_name VARCHAR(200) NOT NULL,
  supplier_code VARCHAR(50) UNIQUE,
  address TEXT,
  country_id UUID REFERENCES countries(country_id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reference Products
CREATE TABLE reference_products (
  reference_product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name VARCHAR(255) NOT NULL,
  manufacturer VARCHAR(200),
  supplier_id UUID REFERENCES suppliers(supplier_id),
  active_ingredients_description TEXT,
  formulation_type VARCHAR(50),
  registration_number VARCHAR(100),
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ingredient-Supplier relationships
CREATE TABLE ingredient_suppliers (
  ingredient_id UUID REFERENCES ingredients(ingredient_id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES suppliers(supplier_id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  cost_per_kg DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (ingredient_id, supplier_id)
);
```

### Core Product Tables

```sql
-- Base Code Registry (for auto-generation)
CREATE TABLE base_code_registry (
  base_code VARCHAR(3) PRIMARY KEY,
  active_signature TEXT UNIQUE NOT NULL,
  description TEXT,
  next_variant_number INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Formulations
CREATE TABLE formulations (
  formulation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_code VARCHAR(3) NOT NULL DEFAULT '',
  variant_suffix VARCHAR(2) NOT NULL DEFAULT '',
  formulation_code VARCHAR(6) GENERATED ALWAYS AS (base_code || '-' || variant_suffix) STORED,
  active_signature TEXT,
  product_name VARCHAR(255) NOT NULL,
  short_name VARCHAR(100),
  product_category VARCHAR(50) NOT NULL CHECK (product_category IN ('Herbicide', 'Fungicide', 'Insecticide', 'Growth Regulator', 'Adjuvant', 'Seed Treatment')),
  formulation_type VARCHAR(50),
  uom VARCHAR(20) DEFAULT 'L',
  status VARCHAR(50) NOT NULL DEFAULT 'Not Yet Considered' CHECK (status IN ('Not Yet Considered', 'Selected', 'Monitoring', 'Killed')),
  status_rationale TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(base_code, variant_suffix),
  UNIQUE(formulation_code)
);

-- Formulation Ingredients
CREATE TABLE formulation_ingredients (
  formulation_ingredient_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_id UUID NOT NULL REFERENCES formulations(formulation_id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(ingredient_id),
  quantity DECIMAL(10,2) NOT NULL,
  quantity_unit VARCHAR(20) NOT NULL,
  ingredient_role VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(formulation_id, ingredient_id)
);

-- Status History
CREATE TABLE formulation_status_history (
  history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_id UUID NOT NULL REFERENCES formulations(formulation_id) ON DELETE CASCADE,
  old_status VARCHAR(50),
  new_status VARCHAR(50) NOT NULL,
  status_rationale TEXT,
  changed_by VARCHAR(100),
  changed_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Market Approval Tables

```sql
-- Formulation-Country (top level)
CREATE TABLE formulation_country (
  formulation_country_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_id UUID NOT NULL REFERENCES formulations(formulation_id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES countries(country_id) ON DELETE CASCADE,
  is_novel BOOLEAN DEFAULT false,
  is_eu_approved_formulation BOOLEAN DEFAULT false,
  emd DATE,
  target_market_entry_fy VARCHAR(10),
  keyedin_project_ids TEXT,
  registration_status VARCHAR(50) CHECK (registration_status IN ('Not Started', 'In Progress', 'Submitted', 'Approved', 'Rejected', 'Withdrawn', NULL)),
  registration_pathway VARCHAR(50) CHECK (registration_pathway IN ('Article 33 - New', 'Article 34 - Me-too', 'Other', NULL)),
  is_in_active_portfolio BOOLEAN DEFAULT false,
  has_approval BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(formulation_id, country_id)
);

-- Formulation-Country-Label
CREATE TABLE formulation_country_label (
  formulation_country_label_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_country_id UUID NOT NULL REFERENCES formulation_country(formulation_country_id) ON DELETE CASCADE,
  label_variant VARCHAR(10) NOT NULL,
  label_name VARCHAR(255),
  reference_product_id UUID REFERENCES reference_products(reference_product_id),
  earliest_submission_date DATE,
  earliest_approval_date DATE,
  earliest_market_entry_date DATE,
  actual_submission_date DATE,
  actual_approval_date DATE,
  actual_market_entry_date DATE,
  registration_status VARCHAR(50) CHECK (registration_status IN ('Not Started', 'In Progress', 'Submitted', 'Approved', 'Rejected', 'Withdrawn', NULL)),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(formulation_country_id, label_variant)
);

-- Label Crops (intended use)
CREATE TABLE formulation_country_label_crops (
  formulation_country_label_id UUID REFERENCES formulation_country_label(formulation_country_label_id) ON DELETE CASCADE,
  crop_id UUID REFERENCES crops(crop_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (formulation_country_label_id, crop_id)
);

-- Formulation-Country Crops (normal use)
CREATE TABLE formulation_country_crops (
  formulation_country_id UUID REFERENCES formulation_country(formulation_country_id) ON DELETE CASCADE,
  crop_id UUID REFERENCES crops(crop_id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (formulation_country_id, crop_id)
);

-- Formulation-Country Targets
CREATE TABLE formulation_country_targets (
  formulation_country_id UUID REFERENCES formulation_country(formulation_country_id) ON DELETE CASCADE,
  target_id UUID REFERENCES targets(target_id) ON DELETE CASCADE,
  efficacy_level VARCHAR(20) CHECK (efficacy_level IN ('Excellent', 'Good', 'Moderate', 'Fair', NULL)),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (formulation_country_id, target_id)
);

-- Targets (diseases, pests, weeds)
CREATE TABLE targets (
  target_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_name VARCHAR(100) UNIQUE NOT NULL,
  target_type VARCHAR(50) NOT NULL CHECK (target_type IN ('Disease', 'Pest', 'Weed', 'Other')),
  target_category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Business & Financial Tables

```sql
-- COGS
CREATE TABLE cogs (
  cogs_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_id UUID NOT NULL REFERENCES formulations(formulation_id) ON DELETE CASCADE,
  formulation_country_id UUID REFERENCES formulation_country(formulation_country_id) ON DELETE CASCADE,
  fiscal_year VARCHAR(10) NOT NULL,
  cogs_value DECIMAL(12,2) NOT NULL,
  raw_material_cost DECIMAL(12,2),
  manufacturing_cost DECIMAL(12,2),
  packaging_cost DECIMAL(12,2),
  other_costs DECIMAL(12,2),
  is_country_specific BOOLEAN GENERATED ALWAYS AS (formulation_country_id IS NOT NULL) STORED,
  notes TEXT,
  last_updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_updated_by VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_cogs_scope CHECK (formulation_id IS NOT NULL),
  UNIQUE(formulation_id, formulation_country_id, fiscal_year)
);

-- Business Case
CREATE TABLE business_case (
  business_case_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_country_id UUID REFERENCES formulation_country(formulation_country_id) ON DELETE CASCADE,
  formulation_country_label_id UUID REFERENCES formulation_country_label(formulation_country_label_id) ON DELETE CASCADE,
  business_case_name VARCHAR(255),
  business_case_type VARCHAR(50) DEFAULT 'Single Label' CHECK (business_case_type IN ('Single Label', 'All Labels (Formulation-Country)', 'Multiple Labels', 'Product Portfolio')),
  year_offset INT NOT NULL CHECK (year_offset BETWEEN 1 AND 10),
  volume DECIMAL(12,2),
  nsp DECIMAL(12,2),
  cogs_per_unit DECIMAL(12,2),
  total_revenue DECIMAL(15,2) GENERATED ALWAYS AS (volume * nsp) STORED,
  total_cogs DECIMAL(15,2) GENERATED ALWAYS AS (volume * cogs_per_unit) STORED,
  total_margin DECIMAL(15,2) GENERATED ALWAYS AS (volume * nsp - volume * cogs_per_unit) STORED,
  margin_percent DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN (volume * nsp) > 0 
      THEN ((volume * nsp - volume * cogs_per_unit) / (volume * nsp)) * 100 
      ELSE 0 
    END
  ) STORED,
  fiscal_year VARCHAR(10),
  scenario_id UUID,
  scenario_name VARCHAR(100),
  assumptions TEXT,
  confidence_level VARCHAR(20) CHECK (confidence_level IN ('Low', 'Medium', 'High', NULL)),
  volume_last_updated_at TIMESTAMPTZ,
  volume_last_updated_by VARCHAR(100),
  nsp_last_updated_at TIMESTAMPTZ,
  nsp_last_updated_by VARCHAR(100),
  cogs_last_updated_at TIMESTAMPTZ,
  cogs_last_updated_by VARCHAR(100),
  created_by VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_business_case_link CHECK (
    (formulation_country_id IS NOT NULL AND formulation_country_label_id IS NULL) OR
    (formulation_country_id IS NULL AND formulation_country_label_id IS NOT NULL)
  ),
  UNIQUE(formulation_country_id, formulation_country_label_id, year_offset, scenario_id)
);

-- Business Case Labels (for aggregate cases)
CREATE TABLE business_case_labels (
  business_case_id UUID REFERENCES business_case(business_case_id) ON DELETE CASCADE,
  formulation_country_label_id UUID REFERENCES formulation_country_label(formulation_country_label_id) ON DELETE CASCADE,
  weighting DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (business_case_id, formulation_country_label_id)
);
```

### Regulatory Tables

```sql
-- Data Protections (ingredient level)
CREATE TABLE data_protections (
  protection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_id UUID NOT NULL REFERENCES ingredients(ingredient_id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES countries(country_id) ON DELETE CASCADE,
  expiry_date DATE NOT NULL,
  reference_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ingredient_id, country_id)
);

-- Patent Protections (ingredient level)
CREATE TABLE patent_protections (
  patent_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_id UUID NOT NULL REFERENCES ingredients(ingredient_id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES countries(country_id) ON DELETE CASCADE,
  patent_number VARCHAR(100),
  patent_type VARCHAR(50),
  expiry_date DATE NOT NULL,
  filing_date DATE,
  grant_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Formulation Data Protections
CREATE TABLE formulation_data_protections (
  formulation_protection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_country_id UUID NOT NULL REFERENCES formulation_country(formulation_country_id) ON DELETE CASCADE,
  expiry_date DATE NOT NULL,
  reference_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Formulation Patents
CREATE TABLE formulation_patents (
  formulation_patent_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_country_id UUID NOT NULL REFERENCES formulation_country(formulation_country_id) ON DELETE CASCADE,
  patent_number VARCHAR(100),
  patent_type VARCHAR(50),
  expiry_date DATE NOT NULL,
  filing_date DATE,
  grant_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Key Functions

```sql
-- Calculate active signature from formulation ingredients
CREATE OR REPLACE FUNCTION calculate_active_signature_from_table(
  p_formulation_id UUID
) RETURNS TEXT AS $$
DECLARE
  v_signature TEXT;
BEGIN
  SELECT string_agg(fi.ingredient_id::TEXT, '|' ORDER BY fi.ingredient_id)
  INTO v_signature
  FROM formulation_ingredients fi
  JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
  WHERE fi.formulation_id = p_formulation_id
    AND i.ingredient_type = 'Active';
  RETURN COALESCE(v_signature, '');
END;
$$ LANGUAGE plpgsql;

-- Check for duplicate formulation
CREATE OR REPLACE FUNCTION check_duplicate_formulation(
  p_temp_formulation_id UUID
) RETURNS UUID AS $$
-- Returns matching formulation_id if duplicate found, NULL otherwise
-- Checks same active ingredients with same quantities
$$ LANGUAGE plpgsql;

-- Get or create base code
CREATE OR REPLACE FUNCTION get_or_create_base_code(
  p_active_signature TEXT
) RETURNS VARCHAR(3) AS $$
-- Returns base code for active signature, creates new if doesn't exist
$$ LANGUAGE plpgsql;

-- Get next variant suffix
CREATE OR REPLACE FUNCTION get_next_variant_suffix(
  p_base_code VARCHAR(3)
) RETURNS VARCHAR(2) AS $$
-- Returns next variant number (01, 02, 03...) and increments registry
$$ LANGUAGE plpgsql;

-- Populate business case COGS
CREATE OR REPLACE FUNCTION populate_business_case_cogs()
RETURNS TRIGGER AS $$
-- Auto-populates cogs_per_unit and fiscal_year when business case created/updated
-- Priority: country-specific COGS > global COGS > latest available
$$ LANGUAGE plpgsql;

-- Track business case updates
CREATE OR REPLACE FUNCTION track_business_case_updates()
RETURNS TRIGGER AS $$
-- Updates *_last_updated_at/by fields when volume, nsp, or cogs_per_unit changes
$$ LANGUAGE plpgsql;

-- Log status changes
CREATE OR REPLACE FUNCTION log_status_change()
RETURNS TRIGGER AS $$
-- Inserts into formulation_status_history when status changes
$$ LANGUAGE plpgsql;
```

### Key Triggers

```sql
-- Auto-assign formulation code when active ingredient added
CREATE TRIGGER trg_assign_formulation_code
AFTER INSERT ON formulation_ingredients
FOR EACH ROW
EXECUTE FUNCTION assign_formulation_code();

-- Auto-populate COGS in business case
CREATE TRIGGER trg_populate_business_case_cogs
BEFORE INSERT OR UPDATE ON business_case
FOR EACH ROW
EXECUTE FUNCTION populate_business_case_cogs();

-- Track business case field updates
CREATE TRIGGER trg_track_business_case_updates
BEFORE UPDATE ON business_case
FOR EACH ROW
EXECUTE FUNCTION track_business_case_updates();

-- Log status changes
CREATE TRIGGER trg_log_status_change
AFTER UPDATE ON formulations
FOR EACH ROW
EXECUTE FUNCTION log_status_change();
```

### Foreign Key Relationships Summary

```
formulations
  └─ formulation_ingredients → ingredients
  └─ formulation_country → countries
      └─ formulation_country_label → reference_products
          └─ formulation_country_label_crops → crops
      └─ formulation_country_crops → crops
      └─ formulation_country_targets → targets
      └─ business_case
      └─ cogs
      └─ formulation_data_protections
      └─ formulation_patents

ingredients
  └─ ingredient_suppliers → suppliers
  └─ data_protections → countries
  └─ patent_protections → countries

business_case
  └─ business_case_labels → formulation_country_label
```

---

## Views Reference

All views prefixed with `vw_*` are designed for frontend tools (Retool/SOFTR). Key views include:

**Core Views:**
- `vw_formulation_country_detail` - Complete formulation-country info
- `vw_active_portfolio` - Currently selling products
- `vw_registration_pipeline` - Registration status by pathway
- `vw_business_case` - Business cases with readable names
- `vw_cogs` - COGS with readable names
- `vw_formulation_country_label` - Labels with readable names

**Analysis Views:**
- `vw_target_coverage` - Target coverage by country
- `vw_crop_target_matrix` - Crop-target cross-reference
- `vw_portfolio_gaps` - Unserved market segments
- `vw_normal_vs_intended_use` - Compare normal vs registered usage

**Utility Views:**
- `vw_formulations_with_ingredients` - Formulation composition
- `vw_ingredient_usage` - Ingredient usage across formulations
- `vw_protection_status` - Patent/data protection summary
- `vw_formulation_families` - Grouped by base code

**Important:** Always use views (`vw_*`) for frontend queries, never query base tables directly. Views include readable names (formulation_code, country_name) instead of UUIDs.

---

## Key Business Logic (Functions & Triggers)

### Auto-Code Generation System

**Purpose:** Automatically assign formulation codes based on active ingredient signature.

**How it works:**
1. When an active ingredient is added to a formulation → trigger fires
2. `calculate_active_signature_from_table()` - Creates signature from active ingredient IDs
3. `check_duplicate_formulation()` - Prevents duplicates (same actives + quantities)
4. `get_or_create_base_code()` - Gets existing base code or creates new one
5. `get_next_variant_suffix()` - Increments variant number (01, 02, 03...)
6. Updates `formulations` table with `base_code`, `variant_suffix`, `formulation_code`

**Example:**
- Formulation with Prothioconazole + Tebuconazole → Gets base code "001"
- Next variant with same actives → "001-02"
- Different actives → New base code "002"

### Business Case COGS Auto-Population

**Purpose:** Automatically populate COGS and fiscal year in business cases.

**How it works:**
1. Before INSERT/UPDATE on `business_case` → trigger fires
2. `populate_business_case_cogs()` function:
   - Determines formulation_country from business case link
   - Gets target_market_entry_fy
   - Calculates fiscal year: `TME FY + year_offset`
   - Looks up COGS in priority order:
     1. Country-specific COGS for that fiscal year
     2. Global COGS for that fiscal year
     3. Latest available global COGS
   - Auto-populates `cogs_per_unit` and `fiscal_year`

### Git-Style Change Tracking

**Purpose:** Track who changed what and when in business cases.

**How it works:**
- `track_business_case_updates()` trigger:
  - Detects changes to `volume`, `nsp`, or `cogs_per_unit`
  - Updates corresponding `*_last_updated_at` and `*_last_updated_by` fields
  - Uses `created_by` as the updater

**Example:**
- User updates volume → `volume_last_updated_at` = NOW(), `volume_last_updated_by` = user

### Status Change Logging

**Purpose:** Audit trail of formulation status changes.

**How it works:**
- `log_status_change()` trigger on `formulations` table
- When status changes → inserts into `formulation_status_history`
- Records: old_status, new_status, status_rationale, changed_by, changed_at

---

## Key Relationships & Patterns

### Formulation → Country → Label Hierarchy
```
formulations (1) ──→ (many) formulation_country ──→ (many) formulation_country_label
     │                        │                                    │
     │                        │                                    │
     └── ingredients          └── crops (normal use)              └── crops (intended use)
                              └── targets
                              └── business_case
                              └── cogs
```

### Business Case Linking Pattern
Business cases can link at TWO levels:
- **Formulation-Country level** - "All labels for this product in this country"
- **Label level** - "Specific label registration"

This allows:
- Single label projections (year 1, year 2...)
- Multi-label aggregations (via `business_case_labels` junction table)

### COGS Hierarchy
```
cogs
├── Global (formulation_id only) - Default cost
└── Country-specific (formulation_id + formulation_country_id) - Override for specific market
```

Business case COGS lookup prioritizes country-specific over global.

---

## Existing Views (Front-Facing)

All views prefixed with `vw_*` are designed for frontend tools (Retool/SOFTR).

**Core Views:**
- `vw_formulation_country_detail` - Complete formulation-country info with crops, targets, reference products
- `vw_active_portfolio` - Currently selling products (is_in_active_portfolio = true)
- `vw_registration_pipeline` - Registration status by pathway (Article 33 vs 34)
- `vw_business_case` - Business cases with readable formulation/country names
- `vw_cogs` - COGS with readable names
- `vw_formulation_country_label` - Labels with readable names

**Analysis Views:**
- `vw_target_coverage` - What targets are covered by country
- `vw_crop_target_matrix` - Crop-target cross-reference
- `vw_portfolio_gaps` - Unserved market segments
- `vw_normal_vs_intended_use` - Compare normal usage vs registered usage

**Utility Views:**
- `vw_formulations_with_ingredients` - Formulation composition
- `vw_ingredient_usage` - Which formulations use which ingredients
- `vw_protection_status` - Patent/data protection summary
- `vw_formulation_families` - Grouped by base code

---

## Common Workflows

### 1. Adding a New Formulation
1. INSERT into `formulations` (base_code/variant_suffix empty initially)
2. INSERT into `formulation_ingredients` (add active ingredients)
3. Trigger auto-generates `formulation_code` (e.g., "001-01")
4. Add non-active ingredients (safeners, adjuvants)

### 2. Registering in a Country
1. INSERT into `formulation_country` (links formulation + country)
2. Set registration pathway (Article 33 or 34)
3. Add crops (normal usage) → `formulation_country_crops`
4. Add targets → `formulation_country_targets`
5. Create labels → `formulation_country_label` (variant A, B, C...)
6. Add label crops (intended use) → `formulation_country_label_crops`

### 3. Creating Business Case
1. INSERT into `business_case`
2. Link to `formulation_country_id` OR `formulation_country_label_id`
3. Set `year_offset` (1-10)
4. Trigger auto-populates `cogs_per_unit` and `fiscal_year`
5. Set `volume` and `nsp` → auto-calculates revenue, margin, margin%
6. Updates tracked via git-style fields

### 4. Updating COGS
1. INSERT/UPDATE `cogs` table
2. Can be global (formulation_id only) or country-specific
3. Business cases automatically use latest COGS when created/updated

---

## Key Constraints & Validations

### Formulation Status
- Must be: 'Not Yet Considered', 'Selected', 'Monitoring', 'Killed'
- Changes logged in `formulation_status_history`

### Business Case
- Must link to EITHER formulation_country OR label (not both, not neither)
- Year offset: 1-10
- Business case type: 'Single Label', 'All Labels (Formulation-Country)', 'Multiple Labels', 'Product Portfolio'
- Confidence level: 'Low', 'Medium', 'High', NULL

### Registration Status
- Values: 'Not Started', 'In Progress', 'Submitted', 'Approved', 'Rejected', 'Withdrawn', NULL
- Tracked at both formulation_country and label levels

### Duplicate Prevention
- `check_duplicate_formulation()` prevents same active ingredients + quantities
- Unique constraints on (formulation_id, country_id), (formulation_country_id, label_variant)

---

## Data Flow Patterns

### Read Pattern (Frontend)
1. Query views (`vw_*`) instead of tables
2. Views include readable names (formulation_code, country_name) instead of UUIDs
3. Views aggregate related data (crops, targets, ingredients as comma-separated strings)

### Write Pattern (Backend/Forms)
1. Insert into base tables
2. Triggers handle auto-population (codes, COGS, timestamps)
3. Use UUIDs for foreign keys
4. Views automatically reflect changes

### Update Pattern
1. Update base tables directly
2. Triggers handle change tracking
3. Calculated fields (revenue, margin) auto-update via generated columns

---

## Integration Points

### External Systems (Future)
- **ERP Integration** - Formulation codes, COGS, volumes
- **Regulatory Databases** - Homologa, EU Commission database
- **PowerBI** - Views can be queried directly
- **Retool/SOFTR** - Use views for all frontend queries

### API Endpoints (If Building Custom Backend)
- Formulation CRUD
- Business case CRUD (with auto-COGS)
- Registration status updates
- COGS management
- Portfolio queries (use views)

---

## Common Custom Features to Build

### 1. Notification System
- Trigger on `formulation_country_label` date changes
- Alert when `earliest_approval_date` changes
- Notify stakeholders of status changes

### 2. Reporting Dashboard
- Use existing views for:
  - Portfolio summary by country
  - Revenue projections (sum business cases)
  - Registration pipeline status
  - Gap analysis (unserved markets)

### 3. Workflow Management
- Approval workflows for status changes
- Change request system (with edit frequency controls)
- Comment threads on formulation_country level

### 4. Scenario Analysis
- Business cases already support `scenario_id` and `scenario_name`
- Build UI to compare scenarios
- Aggregate across multiple business cases

### 5. Data Import/Export
- Excel import for bulk updates
- Export views to CSV/Excel
- Validation before import (check duplicates, required fields)

---

## Key Files Reference

- **Current.sql** - Complete schema with all tables, functions, triggers, views (use this as source of truth)
- **live.sql** - Current live schema (reference only, shows current state)
- **schema_updates.sql** - Additional tables/views (targets, crops, portfolio flags)
- **view_enhancements.sql** - Adds display_name columns to views
- **seed_mock_data.sql** - Test data for development
- **SYSTEM_OVERVIEW.md** - This document (system architecture and schema reference)

**For complete schema details:** See `Current.sql` - it contains the full CREATE TABLE statements, all functions, triggers, and views.

---

## Important Notes for AI Agents

### When Building Custom Features:

1. **Always use views for reads** - Never query base tables directly in frontend
2. **Respect auto-generation** - Don't manually set formulation_code, let triggers handle it
3. **Use UUIDs for writes** - Foreign keys are UUIDs, views provide readable names
4. **Leverage triggers** - Business case COGS auto-population, status logging, etc.
5. **Follow the hierarchy** - Formulation → Country → Label (don't skip levels)
6. **Check constraints** - Status values, business case types, etc. are constrained
7. **Use generated columns** - Revenue, margin, margin% are auto-calculated
8. **Track changes** - Use git-style fields for audit trails

### Common Mistakes to Avoid:

- ❌ Querying `formulation_country` table directly (use `vw_formulation_country_detail`)
- ❌ Manually setting `formulation_code` (let triggers handle it)
- ❌ Creating business case without linking to formulation_country OR label
- ❌ Forgetting to set `is_active = true` when creating new records
- ❌ Not using `display_name` columns from views (they're pre-formatted)

### Testing Patterns:

1. Create test formulation → verify code generation
2. Add to country → verify crops/targets can be added
3. Create label → verify reference product linking
4. Create business case → verify COGS auto-population
5. Update volume → verify git-style tracking updates

---

## Summary

This is a **mature, production-ready schema** with:
- ✅ Auto-code generation
- ✅ Business logic in triggers/functions
- ✅ Comprehensive views for frontend
- ✅ Change tracking and audit trails
- ✅ Flexible business case modeling
- ✅ Dual-level regulatory tracking

**When building custom features:**
- Use existing views as starting point
- Extend views rather than creating new tables
- Leverage existing triggers/functions
- Follow established patterns (hierarchy, linking, tracking)

The system is designed to be **extended, not rebuilt**. Most custom features should build on top of existing views and patterns.

