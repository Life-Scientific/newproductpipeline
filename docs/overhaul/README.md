# Overhaul & Improvement Plans

This directory contains comprehensive plans for modernizing and improving the codebase.

## Files

- **[CHRISTMAS_OVERHAUL_TODO.md](./CHRISTMAS_OVERHAUL_TODO.md)** - Complete technical improvement plan with prioritized tasks, effort estimates, and implementation strategies
- **[DATA_ACCESS_PATTERNS_ANALYSIS.md](./DATA_ACCESS_PATTERNS_ANALYSIS.md)** - Deep analysis of data access patterns, caching strategies, and database optimization recommendations

## Quick Links

### High Priority Items
1. **Business Case Group Bundling** - Reduce 8,000 rows to 800 (90% reduction)
2. **TanStack Query + Parallel Pagination** - Fix sequential query loops
3. **Aggregated Views** - Pre-compute chart data for faster queries

### Implementation Timeline
- **Week 0**: ✅ Analysis complete
- **Week 1**: Quick wins (parallel pagination, TanStack Query setup)
- **Week 2**: Bundling + aggregated views
- **Week 3**: Data layer completion

## Related Documentation

- [`../API_CALL_OPTIMIZATION_PLAN.md`](../API_CALL_OPTIMIZATION_PLAN.md) - Previous optimization efforts
- [`../SCHEMA_MIGRATION.md`](../SCHEMA_MIGRATION.md) - Database schema changes

