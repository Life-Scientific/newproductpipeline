# Business Case Slide Generation Analysis

## Overview
Analysis of what data we can generate from the current schema to replace the business case slide shown in the image.

## Slide Components Analysis

### ✅ Available in Schema

1. **Product Title & TAM**
   - ✅ Formulation name and code (`formulations.formulation_name`, `formulations.formulation_code`)
   - ❌ TAM (Total Addressable Market) - **NOT in schema**
   - 💡 **Workaround**: Could use sum of all business case revenue as proxy, or add TAM field

2. **Reference Product**
   - ✅ Available in `formulation_country_use_group.reference_product_name`
   - Can aggregate unique reference products for a formulation

3. **Total NPV Summaries (33/34 Countries)**
   - ❌ NPV calculation - **NOT in schema** (requires discount rate)
   - ✅ Revenue data available (`business_case.total_revenue`)
   - 💡 **Workaround**: Could calculate "10-year Revenue" instead of NPV, or add NPV calculation
   - ✅ Country aggregation possible (group by country)

4. **NPV Tables by Country**
   - ✅ Can aggregate revenue by country from `business_case` + `countries`
   - ❌ True NPV requires discount rate (not in schema)
   - ✅ Can show "10-year Revenue by Country" instead

5. **Product Breakdown**
   - ✅ Key Uses: Available via `formulation_country_use_group.use_group_name`
   - ✅ Commercial Reasoning: Could use `business_case.assumptions` field
   - ✅ Min/Max NSP: Can calculate from `business_case.nsp` grouped by country
   - ✅ Regulatory Comments: Could use `business_case.assumptions` or add dedicated field

6. **Market Chart (TAM by Country)**
   - ❌ TAM data - **NOT in schema**
   - ✅ Can use aggregated revenue by country as proxy
   - ✅ Exchange rate conversion available (`exchange_rates` table)

7. **Key Financial Metrics**
   - ✅ Average NSP: Calculate weighted average from `business_case.nsp` and `volume`
   - ✅ Average Unit COGS: Calculate weighted average from `business_case.cogs_per_unit` and `volume`
   - ✅ Margin %: Calculate weighted average from `business_case.margin_percent` and `total_revenue`
   - ✅ 10y Sales €: Sum `total_revenue` across all 10 years
   - ✅ 10y Volume: Sum `volume` across all 10 years
   - ✅ 10y Gross Margin: Sum `total_margin` across all 10 years

8. **Notes Section**
   - ✅ Can use `business_case.assumptions` field or add dedicated notes field

## Data Structure Available

### Business Case Data
```typescript
BusinessCaseGroupData {
  business_case_group_id: string;
  formulation_name: string;
  formulation_code: string;
  country_name: string;
  country_code: string;
  use_group_name: string;
  years_data: Record<string, {
    volume: number | null;
    nsp: number | null;
    cogs_per_unit: number | null;
    total_revenue: number | null;
    total_margin: number | null;
    margin_percent: number | null;
  }>;
}
```

### Available Aggregations
- ✅ Group by formulation → Get all countries/use groups
- ✅ Group by country → Get all formulations/use groups
- ✅ Group by use group → Get formulation + country
- ✅ Sum across 10 years → Get totals
- ✅ Weighted averages → NSP, COGS, Margin %

## Missing Data / Gaps

### 1. TAM (Total Addressable Market)
**Status**: Not in schema
**Options**:
- Add `tam` field to `formulation_country` or `formulation_country_use_group`
- Use aggregated revenue as proxy (not ideal)
- Add separate `market_size` table

### 2. NPV Calculation
**Status**: Not in schema
**Options**:
- Add discount rate field and calculate NPV
- Show "10-year Revenue" instead of NPV
- Add NPV as computed field

### 3. ART 33/34 Classification
**Status**: Not in schema
**Options**:
- Add `art_classification` field to `formulation_country_use_group`
- Skip this section if not critical
- Use regulatory status as proxy

### 4. Regulatory Comments
**Status**: Partial (assumptions field exists)
**Options**:
- Use `business_case.assumptions` field
- Add dedicated `regulatory_comments` field to `formulation_country_use_group`

## Recommended Implementation

### Phase 1: Generate from Existing Data
1. ✅ Product title (formulation name + code)
2. ✅ Reference product (from use groups)
3. ✅ 10-year Revenue by Country (instead of NPV)
4. ✅ Product breakdown (uses, min/max NSP)
5. ✅ Market chart (revenue by country as TAM proxy)
6. ✅ Key financial metrics (all available)
7. ✅ Notes (use assumptions field)

### Phase 2: Schema Enhancements (if needed)
1. Add TAM field to `formulation_country_use_group`
2. Add NPV calculation (discount rate + formula)
3. Add ART classification field
4. Add dedicated regulatory comments field

## Query Strategy

### For a Single Formulation Slide:
```sql
-- Get all business cases for a formulation
SELECT 
  bc.*,
  f.formulation_name,
  f.formulation_code,
  c.country_name,
  c.country_code,
  ug.use_group_name,
  ug.reference_product_name
FROM business_case bc
JOIN formulation_country fc ON bc.formulation_country_id = fc.formulation_country_id
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN formulation_country_use_group ug ON bc.formulation_country_use_group_id = ug.formulation_country_use_group_id
WHERE f.formulation_code = 'XXX'
  AND bc.status = 'active'
ORDER BY c.country_name, bc.year_offset;
```

### Aggregations Needed:
1. **By Country**: Sum revenue, margin, volume across all years
2. **By Use Group**: Aggregate for product breakdown
3. **Overall**: Calculate averages (weighted by volume/revenue)
4. **10-year Totals**: Sum across all 10 years

## Conclusion

**Can we generate slides?** ✅ **YES, with some limitations**

**What works:**
- ✅ Most financial metrics (revenue, margin, volume, averages)
- ✅ Country-level aggregations
- ✅ Product breakdown (uses, NSP ranges)
- ✅ Market visualization (revenue by country)

**What needs work:**
- ⚠️ TAM - use revenue as proxy or add field
- ⚠️ NPV - show "10-year Revenue" or add NPV calculation
- ⚠️ ART 33/34 - skip or add classification field
- ⚠️ Regulatory comments - use assumptions field or add dedicated field

**Recommendation**: Start with Phase 1 (existing data) and add schema enhancements as needed based on user feedback.




