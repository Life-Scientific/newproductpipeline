# EPPO Pest SQL - Batched for Supabase

## Overview

The complete pest hierarchy SQL (2,611 inserts) has been split into **6 manageable batches** to avoid Supabase editor size limits.

## Batch Files

| File | Inserts | Size | Contains |
|------|---------|------|----------|
| `batch_01_500_inserts.sql` | 500 | 146 KB | Groups (parents) - START HERE |
| `batch_02_500_inserts.sql` | 500 | 146 KB | More groups |
| `batch_03_500_inserts.sql` | 500 | 341 KB | Remaining groups + start individuals |
| `batch_04_500_inserts.sql` | 500 | 397 KB | Individual pests |
| `batch_05_500_inserts.sql` | 500 | 394 KB | Individual pests |
| `batch_06_111_inserts.sql` | 111 | 87 KB | Final individual pests |
| **TOTAL** | **2,611** | **1.48 MB** | Complete dataset |

## How to Upload to Supabase

### ⚠️ IMPORTANT: Run batches in order!

Groups must be inserted before their children, so the order matters.

### Steps:

1. **Open Supabase SQL Editor**
   - Go to your project → SQL Editor

2. **Run Batch 1**
   - Open `batch_01_500_inserts.sql`
   - Copy all contents
   - Paste into Supabase SQL editor
   - Click "Run"
   - Wait for completion (~10-20 seconds)

3. **Run Batch 2-6**
   - Repeat for each batch in order
   - Each should take 5-20 seconds

4. **Verify**
   ```sql
   -- Check total count
   SELECT COUNT(*) FROM eppo_codes 
   WHERE classification IN ('disease', 'insect', 'weed');
   -- Should return: 2611

   -- Check breakdown
   SELECT eppo_type, classification, COUNT(*) 
   FROM eppo_codes 
   WHERE classification IN ('disease', 'insect', 'weed')
   GROUP BY eppo_type, classification;
   ```

## Expected Results

After running all 6 batches:
- **1,119** group codes (target_group)
- **1,492** individual codes (individual_target)
- **2,611** total pest codes

## Troubleshooting

### "Batch fails with foreign key error"
- Make sure you ran all previous batches first
- Batch 1 must run before Batch 2, etc.

### "Too slow / timeout"
- Each batch should complete in under 30 seconds
- If timing out, contact Supabase support

### "Duplicate key error"
- Already ran this batch before
- Safe to skip and move to next batch
- Or clear table and start over:
  ```sql
  DELETE FROM eppo_codes WHERE classification IN ('disease', 'insect', 'weed');
  ```

## What You're Inserting

**Group Codes** (Parents)
- 1BACTK, 1ACTIC, 1CLABG, 1CONTG, etc.
- Genus, family, order levels
- Used for hierarchical grouping

**Individual Codes** (Children)
- CORBMI, CONTTR, HELIAR, etc.
- Specific pest species
- Include all 24 language names

**Hierarchy Example**:
```
1CLABG (Clavibacter genus)
└── CORBMI (Clavibacter michiganensis)
```

