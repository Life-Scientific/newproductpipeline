# KPI Dashboard Structure

## Overview

The KPI Dashboard follows a hierarchical structure:

```
Shareholder Value
  └── Core Drivers (Level 1)
      └── Strategic Drivers (Level 2)
          └── Key Results (Level 3)
```

## Current Structure

### Core Drivers (Top Level)

1. **Revenue Growth** (Target: 4x by 2030 (€250m))
   - Markets / Regions
   - Products Art 34's
   - Products Art 33's
   - Adjacent offerings

2. **Cash Operating Margin** (Target: EBITDA 7x by 2030 (€100m))
   - Product Margin / COGS
   - Supply Chain Performance
   - Working Capital Optimization
   - Process Efficiency
   - Freight/Tariff Optimization
   - Cost Reduction (added via UI)
   - Operational Excellence (added via UI)

3. **Capital Efficiency** (Target: 15%+ IRR on investments)
   - Demand Visibility
   - Supply Planning
   - Revenue Return
   - ROC (Return on Capital)
   - Working Capital (added via UI)
   - Asset Utilization (added via UI)

4. **ROC** (Target: >12%) - *No strategic drivers yet*

5. **Revenue Return** - *No strategic drivers yet*

6. **R&D Spend** - *No strategic drivers yet*

## How It Works

### Data Model

- **Core Drivers** (`operations.kpi_core_drivers`): Top-level strategic objectives
- **Strategic Drivers** (`operations.kpi_strategic_drivers`): Mid-level initiatives that support core drivers
- **Key Results** (`operations.kpi_key_results`): Measurable outcomes tied to strategic drivers

### Relationships

- Each Strategic Driver belongs to exactly one Core Driver
- Each Key Result belongs to exactly one Strategic Driver
- The hierarchy is enforced via foreign keys

### Display Logic

The graph view (`KPINetworkGraph`) displays:
- **Shareholder Value** node at the top (root)
- **Core Drivers** as level 1 nodes (connected from Shareholder Value)
- **Strategic Drivers** as level 2 nodes (connected from their Core Driver)
- **Key Results** are displayed within each Strategic Driver node

### Adding New Items

1. **Core Drivers**: Use the Hierarchy Manager (KPI Manager role required)
2. **Strategic Drivers**: Use the Hierarchy Manager, select the parent Core Driver
3. **Key Results**: Use the "Add KPI" button in Dashboard/Edit views, select the parent Strategic Driver

### Permissions

- **KPI Contributor**: Can edit only their assigned KPIs
- **KPI Manager**: Can create/edit/delete Core Drivers, Strategic Drivers, and all Key Results

## Graph Display

The network graph uses a left-to-right layout:
- Shareholder Value → Core Drivers → Strategic Drivers
- Each Strategic Driver node shows its Key Results as badges
- Color coding: Green (on track), Yellow (at risk), Red (off track)

## Data Flow

1. Data is fetched via `getKPIDashboardData()` from `operations.vw_kpi_dashboard` view
2. The view joins all three tables and provides a flat structure
3. `kpi-queries.ts` transforms the flat data into a hierarchical structure
4. Components consume the hierarchical `KPIData` type

## Notes

- Empty Core Drivers (no Strategic Drivers) are still displayed but won't show in the graph
- Strategic Drivers without Key Results will show an empty state
- All items can be reordered via drag-and-drop in the Hierarchy Manager

