# Product Context & Design Philosophy
## Life Scientific Portfolio Management System

### **The Real Problem We're Solving**

This is a **Long Range Planning (LRP) system** for managing a portfolio of agrochemical formulations through their entire lifecycle - from concept to market launch to commercialization.

### **The Users**

1. **Portfolio Managers** - Making strategic decisions about which products to develop
2. **Financial Analysts** - Building 10-year business cases and financial projections
3. **Regulatory Teams** - Managing registration pipelines across countries
4. **R&D Teams** - Tracking formulation readiness and development status

### **Core User Journeys**

#### Journey 1: "Should we develop this formulation?"
**Steps:**
1. Look at formulation details (ingredients, targets, crops)
2. Check patent landscape - is it FTO (Freedom to Operate)?
3. Review existing business cases for similar products
4. Make decision: Selected / Monitoring / Killed

**Critical Pages:** Formulations, Portfolio Strategy Dashboard

#### Journey 2: "Build a business case for a new market"
**Steps:**
1. Select formulation + country + use groups
2. Create 10-year projection (volume, NSP, COGS per year)
3. Review margin projections
4. Compare to portfolio benchmarks
5. Present to leadership for approval

**Critical Pages:** Business Cases (projection table), Formulations, Countries, Use Groups

#### Journey 3: "Track registration progress"
**Steps:**
1. See which formulations are in registration pipeline
2. Check submission vs approval dates by country
3. Identify bottlenecks and delays
4. Report progress to leadership

**Critical Pages:** Pipeline Tracker, Registration, Use Groups

#### Journey 4: "Review portfolio health and make strategic decisions"
**Steps:**
1. See portfolio-wide metrics (revenue, margin, coverage)
2. Identify gaps (underperforming countries, missing use groups)
3. Prioritize investment decisions
4. Track status changes over time

**Critical Pages:** Dashboard, Portfolio Strategy, Analytics

---

## **Page Utility Assessment**

### 🟢 **CRITICAL - Core to the workflow**

**Dashboard** (`/`)
- **Purpose:** Portfolio overview - quick health check
- **Key Users:** Everyone - entry point
- **Frequency:** Daily
- **Keep?** ✅ YES - But simplify
- **Issues:** Too much information, overwhelming
- **Fix:** Focus on: Total formulations, Active portfolio count, Top 5 business cases, Recent status changes

**Business Cases** (`/business-cases`)
- **Purpose:** Financial modeling - the "money" page
- **Key Users:** Financial analysts, Portfolio managers
- **Frequency:** Weekly during planning cycles
- **Keep?** ✅ YES - This is THE critical page
- **Issues:** None - edit functionality exists, git-style tracking works
- **Fix:** Maybe add export to Excel

**Formulations** (`/formulations`)
- **Purpose:** Product catalog - what are we working on?
- **Key Users:** Everyone
- **Frequency:** Daily
- **Keep?** ✅ YES - Core entity
- **Issues:** Complex nested data
- **Fix:** Needs better filtering, clearer status indicators

**Pipeline Tracker** (`/pipeline-tracker`)
- **Purpose:** Registration status - where are we in the regulatory process?
- **Key Users:** Regulatory teams, Portfolio managers
- **Frequency:** Weekly
- **Keep?** ✅ YES - Critical for regulatory
- **Issues:** Name unclear - should be "Registration Pipeline"?
- **Fix:** Clarify it's about REGULATORY pipeline, not development pipeline

### 🟡 **USEFUL - Supporting workflows**

**Portfolio Strategy** (`/portfolio-strategy`)
- **Purpose:** Strategic dashboard - risk/opportunity analysis
- **Key Users:** Senior management, Portfolio managers
- **Frequency:** Monthly reviews, quarterly planning
- **Keep?** ✅ YES - But reconsider
- **Issues:** Overlaps with Dashboard and Analytics
- **Fix:** Either make this THE main dashboard OR merge with Analytics

**Analytics** (`/analytics`)
- **Purpose:** Deep dive analysis - charts and breakdowns
- **Key Users:** Analysts
- **Frequency:** Ad-hoc analysis
- **Keep?** 🤔 MAYBE - Overlaps with Portfolio Strategy
- **Issues:** Unclear differentiation from Portfolio Strategy
- **Fix:** Consider merging these two pages

**Countries** (`/countries`)
- **Purpose:** View formulations by country
- **Key Users:** Country managers, Regulatory teams
- **Frequency:** Weekly
- **Keep?** ✅ YES - Useful alternate view
- **Issues:** Might be redundant with filtering on Formulations page
- **Fix:** Keep if country managers find it useful, otherwise merge into Formulations filters

**Use Groups** (`/use-groups`)
- **Purpose:** View all use group registrations
- **Key Users:** Regulatory teams
- **Frequency:** Weekly
- **Keep?** ✅ YES - Core regulatory entity
- **Issues:** Name is jargon
- **Fix:** Keep, but explain better what a "use group" is (crop/target combination)

**COGS** (`/cogs`)
- **Purpose:** Cost management - update cost assumptions
- **Key Users:** Financial analysts, Supply chain
- **Frequency:** Quarterly updates
- **Keep?** ✅ YES - Feeds business cases
- **Issues:** Standalone page feels disconnected
- **Fix:** Keep but link more clearly to business cases that use these costs

**Compare** (`/formulations/compare`)
- **Purpose:** Side-by-side formulation comparison
- **Key Users:** R&D, Portfolio managers
- **Frequency:** Occasional
- **Keep?** 🤔 MAYBE
- **Issues:** Not sure anyone uses this
- **Fix:** Track usage, remove if unused

**Reference Data** (`/reference`)
- **Purpose:** Manage master data (countries, rates, ingredients, EPPO codes)
- **Key Users:** System admin, Data managers
- **Frequency:** Rare (setup/maintenance)
- **Keep?** ✅ YES - But hide from main nav
- **Issues:** Too prominent for admin function
- **Fix:** Move to Settings dropdown or separate admin section

### 🔴 **REMOVE or MERGE**

**Ingredients** (`/ingredients`) - Currently hidden
- **Purpose:** Ingredient catalog
- **Keep?** ❌ NO - Merge into Reference Data
- **Reason:** System admin function, not core workflow

---

## **Recommended Page Structure**

### **Simplified Navigation (12 pages → 9-10 pages)**

```
Overview
├── Dashboard (simplified - key metrics only)
├── Portfolio Strategy (make this THE strategy page, merge Analytics content)
└── Markets Overview (NEW - country-level dashboard with drill-down)

Pipeline
├── Formulations (product catalog)
├── Registration Pipeline (rename from "Pipeline Tracker")
└── Use Groups (registrations by crop/target)

Financials
├── Business Cases (the money page)
└── COGS (cost inputs)

Views
├── By Country (current Countries page)
└── Compare (if useful - track usage)

Settings
├── Reference Data (hidden/admin)
└── Account Settings
```

---

## **Design Principles**

### 1. **Context Over Data**
- Show WHY something matters, not just WHAT it is
- Example: Don't just show "FY26 revenue: €5M" - show "€5M (15% above benchmark)"

### 2. **Action-Oriented**
- Every page should answer: "What decision can I make here?"
- Example: Dashboard should highlight: "3 formulations need review" (with button)

### 3. **Progressive Disclosure**
- Start simple, allow drilling down
- Example: Dashboard → Portfolio Strategy → Formulation Detail → Business Case

### 4. **Workflow-Based**
- Design around real tasks, not data tables
- Example: "Create Business Case" wizard, not just a form

### 5. **Git-Style Tracking**
- Embrace the field-level audit trail you already have
- Show who last updated key fields and when
- Trust indicator: "Updated by Sarah 2 days ago"

---

## **Critical Questions to Answer**

1. **Dashboard vs Portfolio Strategy** - Which is THE main page?
   - Option A: Dashboard is simple overview, Strategy is detailed
   - Option B: Merge them - one comprehensive strategy page
   - **Recommendation:** Merge - Portfolio Strategy becomes the new home page

2. **Analytics** - Keep separate or merge?
   - Current: Charts and breakdowns
   - **Recommendation:** Merge into Portfolio Strategy - charts should be contextual

3. **Countries page** - Really useful or redundant?
   - **Action needed:** Ask users if they use this or just filter Formulations

4. **Compare page** - Anyone using it?
   - **Action needed:** Add analytics to track usage, remove if <5% of users

5. **Reference Data** - Should it be so prominent?
   - **Recommendation:** Move to Settings dropdown or admin section

---

## **Next Steps**

1. **User Research** - Interview 2-3 actual users
   - What pages do they visit daily?
   - What tasks feel painful?
   - What features do they never use?

2. **Usage Analytics** - Add simple tracking
   - Page visits
   - Time on page
   - Action completion rates

3. **Ruthless Simplification**
   - Merge Dashboard + Portfolio Strategy + Analytics → One "Portfolio Overview"
   - Move Reference Data to Settings
   - Remove/hide Compare if unused

4. **Improve Core Pages**
   - Business Cases: Add Excel export
   - Formulations: Better filtering and status indicators
   - Pipeline Tracker: Rename to "Registration Pipeline", clarify purpose

---

## **Success Metrics**

- **Speed:** Can a portfolio manager answer "Should we invest in this?" in <2 minutes?
- **Confidence:** Do users trust the numbers? (Git-style tracking helps)
- **Simplicity:** Can a new user find what they need without training?
- **Completeness:** Do business cases have all necessary data to make decisions?

---

**The Golden Rule:** If a page doesn't directly support a decision that needs to be made, it probably shouldn't exist.

