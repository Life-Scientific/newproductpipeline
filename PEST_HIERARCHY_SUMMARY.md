# EPPO Pest Codes with Hierarchy

## Summary

Complete SQL export of all EPPO pest codes with parent-child hierarchical relationships.

## Files

### Full SQL (if your editor supports it)
📄 **eppo_pests_hierarchy.sql** (1.48 MB, 2,611 inserts)

### Batched SQL (recommended for Supabase)
📁 **pest_sql_batches/** folder with 6 batch files:
- batch_01 through batch_06 (146-397 KB each)
- Run in order: 01 → 02 → 03 → 04 → 05 → 06
- See `pest_sql_batches/README.md` for detailed instructions

## What's Inside

### Total: 2,611 EPPO Codes

**1,119 Group Codes** (Parents)
- Disease groups (GAF): ~500 codes
- Insect groups (GAI): ~600 codes  
- Weed groups (PFL): ~19 codes

**1,492 Individual Codes** (Children)
- Diseases: 683 codes
- Insects: 800 codes
- Weeds: 9 codes

## Database Structure

### Group Codes (Parents)
```sql
INSERT INTO eppo_codes (
    eppo_code,           -- e.g., '1CLABG'
    eppo_datatype,       -- 'GAF', 'GAI', or 'PFL'
    classification,      -- 'disease', 'insect', or 'weed'
    eppo_type,          -- 'target_group'
    latin_name,         -- Genus/Family name
    english_name,       -- Authority
    parent_eppo_code,   -- Parent group or NULL
    is_parent,          -- TRUE
    hierarchy_level,    -- 1-5 (higher = broader)
    is_active           -- TRUE
)
```

### Individual Codes (Children)
```sql
INSERT INTO eppo_codes (
    eppo_code,           -- e.g., 'CORBMI'
    eppo_datatype,       -- 'GAF', 'GAI', or 'PFL'
    classification,      -- 'disease', 'insect', or 'weed'
    eppo_type,          -- 'individual_target'
    latin_name,         -- Species name
    english_name,       -- English common name
    german_name,        -- + 22 other languages
    parent_eppo_code,   -- Parent group code
    is_parent,          -- FALSE
    hierarchy_level,    -- 0
    is_active           -- TRUE
)
```

## Hierarchy Examples

### Bacterial Disease (6 levels deep)
```
1BACTK (Bacteria) - level 5
└── 1ACTIC (Actinobacteria) - level 4
    └── 1MICOO (Micrococcales) - level 3
        └── 1MICBF (Microbacteriaceae) - level 2
            └── 1CLABG (Clavibacter) - level 1
                └── CORBMI (Clavibacter michiganensis) - level 0
```

### Insect Pest
```
1CECIF (Cecidomyiidae family)
└── 1CONTG (Contarinia) - level 1
    └── CONTTR (Contarinia tritici - Yellow wheat blossom midge) - level 0
```

### Weed
```
1STRG (Striga)
└── STRLU (Striga asiatica - Common mealie witchweed) - level 0
```

## How to Use

### Recommended: Use Batched Files

Since Supabase SQL editor has size limits, use the batched version:

1. **Open Supabase SQL Console**
2. **Navigate to** `pest_sql_batches/` folder  
3. **Run batches in order**:
   - Open `batch_01_500_inserts.sql` → Copy → Paste → Run
   - Open `batch_02_500_inserts.sql` → Copy → Paste → Run
   - Continue through batch_03, 04, 05, 06
4. **Each batch takes ~10-20 seconds**

**Why batches?** Supabase editor typically limits queries to ~1-2 MB. Our batches are 146-397 KB each, well within limits.

**Order matters!** Groups (parents) must be inserted before their children.

## Verify After Upload

```sql
-- Check counts
SELECT eppo_type, classification, COUNT(*) 
FROM eppo_codes 
WHERE classification IN ('disease', 'insect', 'weed')
GROUP BY eppo_type, classification;

-- Check a hierarchy example
SELECT 
    eppo_code,
    latin_name,
    parent_eppo_code,
    hierarchy_level
FROM eppo_codes
WHERE eppo_code IN ('1CLABG', 'CORBMI')
ORDER BY hierarchy_level DESC;

-- Find children of a group
SELECT eppo_code, latin_name, english_name
FROM eppo_codes
WHERE parent_eppo_code = '1CONTG';
```

## Category Breakdown

| CSV Category | Database | Type | Count |
|--------------|----------|------|-------|
| Fungi/Bacteria/Virus | disease | GAF | 683 |
| Insect/Mite/Nematode | insect | GAI | 800 |
| Weed | weed | PFL | 9 |

---

**Generated**: November 15, 2025  
**Source**: EPPO Global Database
