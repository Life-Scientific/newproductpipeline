# Pipeline Tracker Visualization Strategy

## Problem
- Current network graph: Great for exploration, breaks at scale (1000+ formulations)
- Current table: Scales well, but loses hierarchical context
- Need: Compare/score at high level, drill down to financial detail

## Solution: Three-Tier Visualization System

### Tier 1: Portfolio Heatmap (10,000+ formulations)
**Purpose**: Compare all formulations at a glance
- **Visualization**: Treemap or Heatmap
- **Axes**: 
  - Size = Total Revenue
  - Color = Margin % (red→yellow→green)
  - Position = By therapeutic area / product family
- **Interaction**: Click tile → drill to Tier 2
- **Performance**: Handles unlimited formulations (just smaller tiles)

### Tier 2: Formulation Scorecard (Selected formulation)
**Purpose**: Understand why this formulation wins/loses
- **Visualization**: Dashboard with charts
- **Components**:
  - Revenue waterfall (Country breakdown)
  - Margin trend over time
  - Country penetration map
  - Use group contribution table
- **Interaction**: Click country → drill to Tier 3

### Tier 3: Detailed Network (Single formulation)
**Purpose**: Explore complete hierarchy for ONE formulation
- **Visualization**: Current ReactFlow graph
- **Scope**: 1 formulation → N countries → M use groups → K business cases
- **Performance**: Max ~100 nodes per formulation (totally manageable)

## Implementation Priority

1. **Phase 1** (Immediate): 
   - Keep table view as default
   - Restrict network to single formulation (via search)
   - Add warning when >1 formulation selected

2. **Phase 2** (Next):
   - Build Treemap/Heatmap for portfolio overview
   - Add drill-down from heatmap → scorecard → network

3. **Phase 3** (Future):
   - AI-powered "insights" layer
   - Comparative scoring (rank formulations by custom metrics)
   - Scenario planning (what-if analysis)

## Key Insight
**Don't try to show everything at once.** Use progressive disclosure:
- Overview first (heatmap)
- Details on demand (drill-down)
- Full hierarchy only for single entities (network)



