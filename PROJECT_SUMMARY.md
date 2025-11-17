# EPPO Label-Relevant Crops and Pests Extraction Project

## Project Overview
Extract EPPO codes for crops and pests relevant to Plant Protection Product (PPP) labels, with multilingual names in 22 European languages.

## Data Sources
- **EPPO Flat Files**: Downloaded from data.eppo.int (pflname.txt, gafname.txt, gainame.txt, ntxname.txt, etc.)
- **EPPO SQLite Database**: `C:\Users\Vikram.Sridhar\Downloads\sqlite_all\eppocodes_all.sqlite`
  - Tables: t_codes, t_names, t_links, t_langs, t_datatypes
- **EPPO REST API**: `https://data.eppo.int/api/rest/1.0`
  - Token stored in: `C:\Users\Vikram.Sridhar\Downloads\bayer\eppo_token.txt`
  - Current token: `212dc220fb9da722c6388003308b044e`

## Key EPPO Concepts
- **Datatypes**:
  - PFL: Plants (61,577 total codes)
  - GAF: Microorganisms (fungi/bacteria/viruses)
  - GAI: Animals (insects/mites/nematodes)
  - NTX: Non-taxonomic classifications (PPP use codes)
- **PPP Classification Codes** (NTX datatype):
  - 3****C: Crop groups (103 codes found)
  - 3****T: Target groups (weed codes exist but no linked species)
  - Pattern: 5 characters, starts with 3, ends with C/T/etc.

## Final Outputs

### 1. Label-Relevant Crops (CSV)
**File**: `eppo_crops_all_european_languages.csv`
- **Count**: 465 crops
- **Extraction Method**:
  - Found 103 PPP crop group codes (3****C pattern) in NTX datatype
  - Extracted all PFL codes hierarchically linked via t_links table
- **Structure**: 26 columns
  - EPPO_Code, Latin_Name through Turkish_Name (22 languages)
  - Num_Crop_Groups, Crop_Group_Codes, Crop_Group_Names
- **Language Coverage**:
  - Latin: 100%
  - English: 98.7% (6 missing: RUBFC, AJTSS, APUGS, OCISS, PELFR, TTOSS)
  - German: 97.6%, French: 93.8%, etc.

### 2. Label-Relevant Pests (CSV)
**File**: `eppo_pests_all_european_languages.csv`
- **Count**: 1,492 individual pest codes
- **Breakdown by Category**:
  - 683 Fungi/Bacteria/Virus (GAF datatype)
  - 799 Insect/Mite/Nematode (GAI datatype)
  - 9 Weeds (PFL datatype)
  - 1 Other
- **Extraction Method**:
  - Queried EPPO API `/taxon/{cropCode}/pests` for each of 465 crops
  - Rate limited to 200ms delay (~5 requests/second)
  - Enriched with SQLite data
- **Structure**: 25 columns
  - EPPO_Code, Datatype, Category
  - Latin_Name through Turkish_Name (22 languages)
- **Language Coverage**:
  - Latin: 100%
  - English: 77.5%
  - German: 35.0%, French: 45.9%, etc.

### 3. Pests with Hierarchy (SQL for Database)
**File**: `eppo_pests_hierarchy.sql` (1.48 MB)
- **Count**: 2,611 total INSERT statements
  - **1,119 group codes** (target groups/parent classifications)
    - Disease groups (GAF): ~500
    - Insect groups (GAI): ~600
    - Weed groups (PFL): ~19
  - **1,492 individual codes** (same as CSV above, with parent relationships)
- **Hierarchy Structure**:
  - Multi-level taxonomy (up to 6 levels deep)
  - Each individual code linked to parent genus/family
  - Groups ordered before children for proper foreign key insertion
- **Database Fields**:
  - `eppo_code`, `eppo_datatype`, `classification`, `eppo_type`
  - `latin_name`, `english_name` (+ 22 other languages for individuals)
  - `parent_eppo_code`, `is_parent`, `hierarchy_level`
- **Example Hierarchy**:
  ```
  1BACTK (Bacteria) → 1ACTIC (Actinobacteria) → 1MICBF (Microbacteriaceae) 
  → 1CLABG (Clavibacter) → CORBMI (Clavibacter michiganensis)
  ```
- **Data Sources**:
  - Link files: `gailink.txt`, `gaflink.txt`, `pfllink.txt` (120,491 relationships)
  - Group files: `gaigroup.txt`, `gafgroup.txt`, `pflgroup.txt` (22,956 codes)

## Languages Included (22 European Languages)
Selected based on ≥50% coverage, excluding Asian languages:
1. Latin (la) - Scientific names
2. English (en)
3. German (de)
4. French (fr)
5. Italian (it)
6. Spanish (es)
7. Portuguese (pt)
8. Dutch (nl)
9. Russian (ru)
10. Swedish (sv)
11. Czech (cs)
12. Hungarian (hu)
13. Polish (pl)
14. Slovak (sk)
15. Croatian (hr)
16. Ukrainian (uk)
17. Bulgarian (bg)
18. Lithuanian (lt)
19. Catalan (ca)
20. Danish (da)
21. Slovene (sl)
22. Turkish (tr)

## Scripts Created

### Crop Extraction
1. **extract_label_crops_from_sqlite.js**
   - Extracts 465 label-relevant crops from SQLite
   - Finds 3****C codes, recursively links to PFL codes
   - Output: `eppo_label_relevant_plants_complete.csv`

2. **extract_all_european_languages.js**
   - Enriches crops with 22 language names
   - Output: `eppo_crops_all_european_languages.csv`

### Pest Extraction
3. **extract_pests_from_crops.js**
   - Queries EPPO API for pests affecting each crop
   - Handles categorized API response: `{"Host": [...], "Major host": [...]}`
   - Output: `eppo_pests_from_crops.csv`

4. **enrich_pests_multilingual.js**
   - Adds 22 language names to 1,492 pests
   - Proper categorization: GAF→Fungi/Bacteria/Virus, GAI→Insect/Mite/Nematode, PFL→Weed
   - Output: `eppo_pests_all_european_languages.csv`

### Pest SQL Generation
5. **convert_pests_with_hierarchy.js** (archived)
   - Parsed link files (gailink.txt, gaflink.txt, pfllink.txt) for parent-child relationships
   - Parsed group files (gaigroup.txt, gafgroup.txt, pflgroup.txt) for parent metadata
   - Built complete hierarchy with multi-level nesting
   - Output: SQL with 2,611 INSERT statements (groups + individuals)

6. **simplify_pest_sql.js**
   - Removed ON CONFLICT clauses from generated SQL
   - Reduced file size from 3.59 MB to 1.48 MB (59% reduction)
   - Output: `eppo_pests_hierarchy.sql`

### Weed Investigation Scripts (Incomplete)
7. **extract_weeds_from_targets.js** - Attempted to extract from 3****T codes via SQLite (no links found)
8. **extract_weeds_via_api.js** - Attempted to extract via API `/taxon/3WEEDT/taxonomy` (no children found)
9. **analyze_all_pfl_codes.js** - Analysis showing 61,103 potential additional weeds

## Key Issues Solved

### 1. Database Selection
- **Problem**: Initially used `eppocodes.sqlite` (plant-only), couldn't find NTX codes
- **Solution**: Switched to `eppocodes_all.sqlite` (complete database)

### 2. PPP Crop Group Location
- **Problem**: Expected 3****C codes in pflgroup.txt, found none
- **Solution**: Found codes in ntxname.txt (NTX datatype, not PFL)

### 3. EPPO API Authentication
- **Problem**: HTTP 403 errors with header-based auth
- **Solution**: Changed to query parameter: `?authtoken={token}`
- **Code Fix**:
  ```javascript
  // WRONG: const options = { headers: { 'authtoken': token } };
  // CORRECT:
  const url = `${EPPO_API_BASE}${endpoint}?authtoken=${token}`;
  ```

### 4. API Response Parsing
- **Problem**: "pests is not iterable" error
- **Solution**: API returns categorized object, not array. Flatten all categories:
  ```javascript
  const allPests = [];
  for (const category in result) {
    if (Array.isArray(result[category])) {
      allPests.push(...result[category]);
    }
  }
  ```

## Outstanding Issues

### Weed Count (9 vs Expected Higher)
- **Current State**: Only 9 weeds extracted via host-pest relationships
- **Investigation Results**:
  - Weed target codes exist in database: 3WEEDT, 3DICOT, 3MNCOT, 3ANDIT, 3PEDIT, 3ANMNT, 3PEMNT, 3ANGWT, 3PEGWT, 3ALGAT, 3MOSST, 3FERNT, 3AQUWT, 3WOOWT, 3PARWT, 3LICHT
  - No PFL codes linked to these targets in SQLite t_links table
  - No children returned from API `/taxon/3WEEDT/taxonomy` endpoint
  - Conclusion: Target codes are classification labels only, not linked to specific species in EPPO data
- **Options**:
  1. Keep 9 weeds (biologically linked to crops)
  2. Add all non-crop PFL codes as weeds (61,103 codes - too many)
  3. Use external weed list or manual curation
- **Status**: Paused for later resolution

## SQL Query Patterns

### Get EPPO Code Details
```sql
SELECT codeid, dtcode, eppocode
FROM t_codes
WHERE eppocode = ?
```

### Get Preferred Latin Name
```sql
SELECT fullname
FROM t_names
WHERE codeid = ? AND codelang = 'la' AND preferred = 1
LIMIT 1
```

### Get Best Available Name (Non-Latin)
```sql
SELECT fullname
FROM t_names
WHERE codeid = ? AND codelang = ?
AND fullname IS NOT NULL AND fullname != ''
ORDER BY status DESC, LENGTH(fullname) DESC
LIMIT 1
```

### Get Hierarchical Children
```sql
SELECT c.codeid, c.eppocode, c.dtcode
FROM t_links l
JOIN t_codes c ON l.codeid = c.codeid
WHERE l.codeid_parent = ?
```

## API Endpoint Patterns

### Get Pests for Crop
```
GET /taxon/{cropCode}/pests?authtoken={token}
Returns: {"Host": [...], "Major host": [...], "Experimental": [...]}
```

### Get Taxonomy/Children
```
GET /taxon/{code}/taxonomy?authtoken={token}
Returns: {children: [...], ...}
```

## File Locations
- **Working Directory**: `C:\Users\Vikram.Sridhar\Downloads\bayer\`
- **SQLite Database**: `C:\Users\Vikram.Sridhar\Downloads\sqlite_all\eppocodes_all.sqlite`
- **Flat Files**: `C:\Users\Vikram.Sridhar\Downloads\bayer\*.txt`

## Next Steps (If Resuming Weed Extraction)
1. Investigate external weed databases (WSSA, EWRS, etc.)
2. Check if EPPO has separate weed classification data
3. Manual curation of common agricultural weeds
4. Contact EPPO support about weed target code usage
