# EPPO Codes Integration Guide

## Overview

This integration adds EPPO (European and Mediterranean Plant Protection Organization) codes to the crops and targets tables. The system supports:

- **4 Categories**: CROPS, DISEASES, INSECTS, WEEDS
- **Family Support**: Select entire families (e.g., "Solanaceae") which automatically includes all descendants
- **Pre-populated Lists**: Curated subset of EPPO codes (<1% of total database)

## Migration Order

Run migrations in this order:

1. `20251112230605_create_eppo_schema.sql` - Creates EPPO tables
2. `20251112230606_create_eppo_functions.sql` - Creates helper functions
3. `20251112230608_create_eppo_views.sql` - Creates views for queries
4. Import EPPO data (see below)
5. `20251112230607_make_eppo_required.sql` - Makes EPPO codes required

## Data Import Steps

### Step 1: Import Full EPPO Database

```bash
node scripts/import_eppo_codes.js
```

This imports:
- All EPPO codes (filtered to 4 categories) into `eppo_codes` table
- Hierarchy relationships into `eppo_code_hierarchy` table

### Step 2: Curate Important Codes

Create a curated list of EPPO codes that are important for your business:

**For Crops:**
- Individual crops: SOLTU (Potato), LYCPE (Tomato), etc.
- Families: 1SOLF (Solanaceae), etc.

**For Targets:**
- Diseases: FUSASP (Fusarium), etc.
- Insects: APHISP (Aphids), etc.
- Weeds: (various weed codes)

### Step 3: Populate Crops and Targets

Edit `scripts/populate_crops_targets.js` and add your curated list:

```javascript
const curatedCrops = [
  { eppocode: 'SOLTU', crop_name: 'Potato' },
  { eppocode: '1SOLF', crop_name: 'Solanaceae' }, // Family
  // Add more...
];

const curatedTargets = [
  { eppocode: 'APHISP', target_name: 'Aphids', target_type: 'Pest' },
  // Add more...
];
```

Then run:

```bash
node scripts/populate_crops_targets.js
```

This script will:
1. Insert curated codes into `crops` and `targets` tables
2. Auto-detect families (codes with children)
3. Auto-populate `eppo_family_members` for all families

### Step 4: Make EPPO Codes Required

```sql
-- Run migration 20251112230607_make_eppo_required.sql
-- This assigns random EPPO codes to existing test data
```

## Usage

### Querying Crops/Targets with Family Expansion

Use the views:

```sql
-- Get all crops for a formulation (including family members)
SELECT * FROM vw_formulation_crops_expanded 
WHERE formulation_country_id = '...';

-- Get all targets for a formulation (including family members)
SELECT * FROM vw_formulation_targets_expanded 
WHERE formulation_country_id = '...';
```

### Checking if a Code is a Family

```sql
SELECT is_eppo_family FROM crops WHERE crop_id = '...';
SELECT is_eppo_family FROM targets WHERE target_id = '...';
```

### Getting Family Members

```sql
SELECT * FROM eppo_family_members 
WHERE family_crop_id = '...';
```

## Helper Scripts

- `examine_eppo_db.js` - Examine SQLite database structure
- `examine_eppo_hierarchy.js` - Examine hierarchy examples
- `import_eppo_codes.js` - Import from SQLite to PostgreSQL
- `populate_crops_targets.js` - Populate curated lists

