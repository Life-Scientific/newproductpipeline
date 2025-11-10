Life Scientific Portfolio Management System - Business Logic & Process Guide
🎯 The Big Picture: What Problem Are We Solving?
Your Business Challenge
Life Scientific is a crop protection company that:

Develops and registers formulations (pesticides/fungicides/herbicides)
Operates in multiple countries with complex regulatory requirements
Needs to decide: "Which products should we commercialize and where?"
Balances R&D investment against market potential
Manages a mix of generic (me-too) products and novel formulations

The Core Problem
Without this system:

Products scattered across Excel files, emails, SharePoint
No clear view of "what formulations exist" vs "what we're pursuing"
Can't quickly answer: "Do we already have a Prothioconazole 250 product?"
Business cases disconnected from product data
Can't track which products are protected by patents/data protection
Hard to prioritize: "Which 10 products should we register in France next year?"

With this system:

Single source of truth for all formulations (existing and planned)
Instant answers: "We have 3 Prothioconazole variants: 250, 480, and 250+Azoxy"
Business cases linked to products with real-time margin calculations
Protection status visible: "This active is protected in EU until 2028"
Portfolio prioritization: "These 5 products have best ROI for France"


🔢 The Auto-Code System: Why It Exists
The Problem: How Do You Name Chemical Products?
Imagine you have:

Prothioconazole 250 g/L SC (suspension concentrate, 250 grams per liter)
Prothioconazole 480 g/L SC (same active, different strength)
Prothioconazole 200 + Azoxystrobin 100 SC (two actives combined)

Question: Are these related? Should they have related codes?
Chemical Industry Logic:

Products with the same active ingredients are fundamentally related
Different concentrations are just "variants" of the same chemistry
But mixing different actives creates a totally different product


The Solution: Base Code + Variant System
┌─────────────────────────────────────────────────────────┐
│  BASE CODE = Which active ingredients (chemistry)       │
│  VARIANT = Different concentrations/formulations        │
└─────────────────────────────────────────────────────────┘

Example:
000001-01  →  Prothioconazole 250 SC
000001-02  →  Prothioconazole 480 SC
000001-03  →  Prothioconazole 250 EC (different type)

000002-01  →  Prothioconazole 200 + Azoxystrobin 100 SC
000002-02  →  Prothioconazole 150 + Azoxystrobin 150 SC

000003-01  →  Glyphosate 360 SL
000003-02  →  Glyphosate 450 SL
The Logic:

000001 = "All Prothioconazole solo products"
000002 = "All Prothioconazole + Azoxystrobin products"
000003 = "All Glyphosate solo products"

Why?

Instant Recognition: See code 000001-05 → "Oh, that's another Prothio variant"
Family Grouping: Find all related products quickly
Regulatory Efficiency: Similar products often share dossier data
Portfolio Planning: "We have 3 Prothio variants, do we need a 4th?"


🔧 How Auto-Code Generation Works (Business Process)
Step-by-Step Creation Process
Step 1: Scientist Wants to Create a New Product
Scenario: R&D team develops Prothioconazole 250 SC
User goes to system:
1. Click "Create New Formulation"
2. Enter: "Prothioconazole 250 SC"
3. Select category: "Fungicide"
4. Select formulation type: "SC"
5. Click "Next"
At this point: No code assigned yet. Formulation exists but incomplete.

Step 2: Add Active Ingredients (Code Generation Trigger)
User adds actives:
1. Search for "Prothioconazole"
2. Enter quantity: 250
3. Unit: g/L
4. Click "Add Ingredient"
🔥 MAGIC HAPPENS HERE:
System thinks:
1. "User just added an ACTIVE ingredient"
2. "Let me check: do we have ANY products with ONLY Prothioconazole?"
   
   → Searches database for products with signature: "Prothioconazole-only"
   
3a. IF FOUND (e.g., 000001 exists):
    → "Okay, this is another Prothio variant"
    → Assign: 000001-02 (next available variant)
    
3b. IF NOT FOUND:
    → "This is a NEW active combination!"
    → Create new base code: 000004
    → Assign: 000004-01 (first variant)
User sees:
✅ Code assigned: 000001-02
   Similar products: 
   - 000001-01: Prothioconazole 250 SC ⚠️ DUPLICATE WARNING!

Step 3: Duplicate Detection
CRITICAL BUSINESS RULE: Don't create the same product twice!
System checks:
"Is there ALREADY a product with:
 - Prothioconazole
 - 250 g/L
 - No other actives?"

IF YES:
   → ❌ STOP! "This product already exists as 000001-01"
   → User must use existing product or change concentration

IF NO:
   → ✅ Proceed with 000001-02
Why this matters:

Prevents wasted R&D effort
Avoids duplicate registrations
Keeps portfolio clean


Step 4: Add Other Ingredients (Non-Actives)
User adds:
1. Isoxadifen-ethyl (Safener) - 50 g/L
2. Surfactant Blend A - 100 g/L
3. Solvent - 700 mL/L
Key: These DON'T change the code!
Why?

Safeners, adjuvants, solvents are "formulation details"
The ACTIVE chemistry defines the product family
You might reformulate with different adjuvants but it's still the same "base product"


Real-World Examples
Example 1: Creating Your First Prothio Product
Input:
- Product: "Prothioconazole 250 SC"
- Active: Prothioconazole 250 g/L

System:
- Searches: "Any products with ONLY Prothioconazole?"
- Result: NONE found
- Action: Create new base code 000001
- Assigned Code: 000001-01

User sees: "✅ New product family created: 000001-01"

Example 2: Creating Second Prothio Product
Input:
- Product: "Prothioconazole 480 SC"  
- Active: Prothioconazole 480 g/L

System:
- Searches: "Any products with ONLY Prothioconazole?"
- Result: YES! Found 000001
- Checks: "Already a 480 g/L version?"
- Result: NO
- Action: Use existing base code 000001
- Assigned Code: 000001-02

User sees: "✅ Added to Prothioconazole family: 000001-02
            Related: 000001-01 (Prothio 250)"

Example 3: Creating a Combination Product
Input:
- Product: "Prothioconazole 200 + Azoxystrobin 100 SC"
- Actives: 
  - Prothioconazole 200 g/L
  - Azoxystrobin 100 g/L

System:
- Searches: "Any products with Prothio + Azoxy?"
- Result: NONE found
- Action: Create new base code 000002
- Assigned Code: 000002-01

User sees: "✅ New combination product: 000002-01"

Example 4: Trying to Create a Duplicate
Input:
- Product: "Generic Prothio 250"
- Active: Prothioconazole 250 g/L

System:
- Searches: "Any products with ONLY Prothioconazole?"
- Result: YES! Found 000001
- Checks: "Already a 250 g/L version?"
- Result: YES! 000001-01 exists
- Action: BLOCK creation

User sees: "❌ This product already exists as 000001-01
            Would you like to:
            [ ] View existing product
            [ ] Change concentration
            [ ] Create anyway (requires approval)"

📊 Product Status Lifecycle
Status Options & What They Mean
┌─────────────────────────────────────────────────────┐
│  NOT YET CONSIDERED                                 │
│  └─ Idea stage, not actively pursued                │
│                                                      │
│  SELECTED                                           │
│  └─ Approved for development/commercialization      │
│                                                      │
│  MONITORING                                         │
│  └─ On hold, watching market/competitors            │
│                                                      │
│  KILLED                                             │
│  └─ Abandoned (with rationale tracked)              │
└─────────────────────────────────────────────────────┘
How Products Move Through Statuses
Scenario: New Generic Product Idea
Week 1:
Status: "Not Yet Considered"
Action: R&D scientist creates formulation entry
        "What if we made a generic Prothio 250?"

Week 2:
Status: → "Selected" 
Action: Portfolio review meeting approves
Rationale: "Competitor product losing protection in 2026,
            market size €50M, strong margins"

Week 3-52:
Actions while "Selected":
- Register in France (Label A: Wheat, Barley)
- Register in Germany (Label A: Cereals, Label B: Potatoes)
- Build business case (10-year projections)
- Enter COGS data
- Track regulatory timeline

Year 2:
Status: Still "Selected"
Product now in market, generating revenue

Year 5:
Status: → "Monitoring"
Rationale: "Sales declining, considering phase-out,
            watching for new formulation needs"

Year 7:
Status: → "Killed"
Rationale: "Replaced by 000001-02 (480g/L version)
            which has better efficacy"

🌍 Registration Process: Products → Countries → Labels
The Three-Layer Structure
Layer 1: FORMULATION (Global)
└─ 000001-01: Prothioconazole 250 SC
   
Layer 2: FORMULATION_COUNTRY (Registration Container)
└─ 000001-01 in FRANCE
   ├─ EMD: 2026-03-01
   ├─ Target Market Entry: FY27
   └─ EU Approved: Yes
   
Layer 3: LABELS (Specific Use Cases)
└─ Label A: Cereals (Wheat, Barley)
   ├─ Earliest Submission: 2025-06-01
   ├─ Actual Submission: 2025-07-15
   ├─ Crops: Wheat, Barley
   └─ Reference Product: "Proline" (Bayer)
   
└─ Label B: Potatoes
   ├─ Earliest Submission: 2026-01-01
   ├─ Crops: Potatoes
   └─ Reference Product: Same

Why Labels Matter: Real Business Example
Scenario: Italy Registration of "Pyrex" (Hypothetical)
Product: 000045-01 (Your Tebuconazole 250 SC)
Country: Italy
Reference: "Pyrex" (Syngenta's original product)

Label A: Vineyards (Grapes)
- Submitted: 2024-01-15
- Approved: 2024-08-30
- Crops: Grapes (wine, table)

Label B: Tree Fruits (Apples, Pears)  
- Submitted: 2024-06-01
- Approved: 2025-01-20
- Crops: Apples, Pears, Cherries

Label C: Cereals (Wheat, Barley)
- Submitted: 2025-03-01
- Status: Pending
- Crops: Wheat, Barley
Business Question: "What's the business case?"
Answer Option 1: One combined case
Business Case: "000045-01 Italy (All Labels)"
- Volume Year 1: 50,000 L (sum of all three labels)
- Revenue: €2.5M
- This represents total market potential
Answer Option 2: Separate cases per label
Business Case A: "Italy Vineyards"
- Volume: 30,000 L
- Revenue: €1.8M

Business Case B: "Italy Tree Fruits"
- Volume: 15,000 L  
- Revenue: €600K

Business Case C: "Italy Cereals"
- Volume: 5,000 L
- Revenue: €100K

Total = €2.5M
Why Both Options Exist:

Option 1: When labels are approved together, market is unified
Option 2: When labels come sequentially, track incremental value


Me-Too Products: The Reference Product Connection
What's a Me-Too Product?
You're a generics company = you create equivalents of innovator products after protection expires.
Innovator:
- Bayer develops "Proline" (Prothioconazole 250)
- Protected 2005-2025
- Builds market, farmers trust it

Life Scientific:
- 2025: Protection expires
- You create generic equivalent: 000001-01
- Link to reference product: "Proline" (Bayer)
- Regulatory strategy: "We're the same as Proline"
- Market position: "Same product, lower price"
Why Track Reference Products?

Regulatory: "Our dossier references Proline's data"
Marketing: "Approved for same uses as Proline"
Commercial: "Proline market = €50M → we target 20% share"
Supply Chain: "May need to buy reference samples from Bayer"


💰 Business Cases: Making the Go/No-Go Decision
The Core Question: Should We Pursue This Product in This Market?
What Is a Business Case?
Business Case = 10-year financial projection

For: 000001-01 in France, Label A (Cereals)
From: Year 1 (TME = FY27) to Year 10 (FY36)

Each year has:
- Volume (liters or kg we'll sell)
- NSP (Net Sales Price per unit)
- COGS (Cost of Goods Sold per unit)

System calculates:
- Total Revenue = Volume × NSP
- Total Margin = Revenue - (Volume × COGS)
- Margin % = Margin / Revenue × 100

How Country Managers Use This
Scenario: France Country Manager Planning 2027
Manager opens system:
"Show me all Selected products for France"

Results:
- 000001-01: Prothio 250 (TME: FY27)
- 000001-02: Prothio 480 (TME: FY28)  
- 000002-01: Prothio+Azoxy (TME: FY27)
- 000015-01: Glyphosate 360 (TME: FY26, already in market)

Manager clicks: "000001-01 Business Case"
Business Case Grid:
YearFYVolume (L)NSP (€)COGS (€)RevenueMarginMargin %1FY2710,0002512€250K€130K52%2FY2825,0002511€625K€350K56%3FY2950,0002411€1.2M€650K54%4FY3075,0002410€1.8M€1.05M58%5FY31100,0002310€2.3M€1.3M57%........................10FY36120,0002210€2.64M€1.44M55%
10-Year Total: Revenue: €15M, Margin: €8M

The Git-Style Tracking: Who Changed What, When?
Why This Matters
Monday 9am:
- France Manager (Marie) updates Volume Year 1: 10,000 → 15,000
- System records: "Marie updated volume on 2025-11-10 09:15"

Tuesday 2pm:
- Procurement Manager (Pierre) updates COGS: €12 → €11
- System records: "Pierre updated COGS on 2025-11-11 14:30"

Wednesday 10am:
- Finance Director (Jean) reviews business case
- Jean sees: 
  - Volume: 15,000 L (last updated by Marie, 2 days ago)
  - NSP: €25 (last updated by Marie, 1 month ago ⚠️ needs review?)
  - COGS: €11 (last updated by Pierre, yesterday ✅ fresh)
Business Value:

Accountability: Know who to ask about assumptions
Data Freshness: See what's stale and needs updating
Audit Trail: "Why did margin drop?" → "Pierre updated COGS from €10 to €12"
Collaboration: Multiple people work on same business case without conflicts


Three Business Case Scenarios (The Italy Pyrex Example)
Scenario 1: Single Label Business Case
Product: 000045-01 in Italy
Label: Label A (Vineyards) only

Business Case: "Italy Vineyards - Label A"
Links to: formulation_country_label_id (Label A)

Year 1 Projection:
- Volume: 30,000 L
- NSP: €60/L
- Revenue: €1.8M
- (Only covers vineyard market)

Scenario 2: Multiple Separate Business Cases
Business Case #1: "Italy Vineyards - Label A"
- Volume: 30,000 L
- Revenue: €1.8M

Business Case #2: "Italy Tree Fruits - Label B"  
- Volume: 15,000 L
- Revenue: €600K

Business Case #3: "Italy Cereals - Label C"
- Volume: 5,000 L
- Revenue: €100K

Portfolio Report:
Total Italy Revenue = €1.8M + €600K + €100K = €2.5M
Use Case: When labels launch sequentially, track incremental value of each.

Scenario 3: Combined Business Case (Sum of All Labels)
Product: 000045-01 in Italy
Links to: formulation_country_id (all labels)

Business Case: "Italy - All Labels Combined"

Year 1 Projection:
- Volume: 50,000 L (sum: 30K + 15K + 5K)
- NSP: €50/L (weighted average)
- Revenue: €2.5M
- (Represents total market potential)

Note: System can optionally track which labels contribute:
via business_case_labels table:
- Label A: 60% of volume
- Label B: 30% of volume  
- Label C: 10% of volume
Use Case: When all labels approved together, managing as single market.

🛡️ IP Protection: Understanding What's Protected
Two-Level Protection System
Level 1: ACTIVE INGREDIENT Protection (Country-Specific)
Example: Prothioconazole is protected in France until 2028

Level 2: FORMULATION Protection (Country-Specific)
Example: The specific combination of Prothio 200 + Azoxy 100 
         is protected in France until 2030

Why Two Levels?
Active Ingredient Protection
Scenario:
- Bayer invented Prothioconazole in 2005
- Has EU data protection until 2028
- Has patent until 2026

Result:
- NO ONE can sell Prothioconazole-based products in EU until 2028
- Doesn't matter if you use 250g/L or 480g/L
- The active itself is protected
Database Structure:
sqlTable: data_protections
- ingredient_id: Prothioconazole
- country_id: France (and Germany, Italy, etc.)
- expiry_date: 2028-12-31
```

**Query Logic:**
```
User asks: "Can we launch 000001-01 (Prothio 250) in France in 2027?"

System checks:
1. What actives are in 000001-01? → Prothioconazole
2. Is Prothioconazole protected in France? → YES, until 2028
3. Answer: ❌ Cannot launch until 2029
```

---

#### **Formulation-Level Protection**
```
Scenario:
- Bayer creates Prothio 200 + Azoxy 100 combination
- Novel ratio, files composition patent
- Patent expires 2030 (separate from active protection)

Result:
- Even after Prothio and Azoxy lose individual protection...
- This SPECIFIC COMBINATION is protected until 2030
- You could make Prothio 250 solo (OK)
- You could make Prothio 150 + Azoxy 150 (different ratio, OK)
- But not Prothio 200 + Azoxy 100 (protected)
Database Structure:
sqlTable: formulation_patents
- formulation_country_id: 000002-01 in France
- patent_type: "Composition"
- expiry_date: 2030-06-30
```

---

### **Real Decision-Making Example**

#### **Question: Can We Launch This Product Here?**
```
Product: 000002-01 (Prothio 200 + Azoxy 100)
Market: Germany
Year: 2027

System Checks:

✅ Step 1: Active Ingredient Protections
- Prothioconazole in Germany: Protected until 2028 ❌
- Azoxystrobin in Germany: Protected until 2025 ✅

✅ Step 2: Formulation Protections  
- 000002-01 composition patent in Germany: Until 2030 ❌

Answer: ❌ CANNOT LAUNCH
Blockers:
1. Prothioconazole still protected (until 2028)
2. Formulation composition patent (until 2030)

Recommendation: Wait until 2031 (latest blocker expires)
```

---

### **Protection Dashboard View**
```
Product: 000002-01 (Prothio + Azoxy combo)

┌─────────────────────────────────────────────────────┐
│ France                                              │
│ ├─ Active: Prothioconazole → 🔴 Protected (2028)   │
│ ├─ Active: Azoxystrobin → ✅ Clear (2025)          │
│ └─ Formulation Patent → 🔴 Protected (2030)        │
│ Status: ❌ BLOCKED until 2031                       │
├─────────────────────────────────────────────────────┤
│ UK                                                  │
│ ├─ Active: Prothioconazole → ✅ Clear (2024)       │
│ ├─ Active: Azoxystrobin → ✅ Clear (2023)          │
│ └─ Formulation Patent → 🟡 Expires Soon (2026-03)  │
│ Status: ✅ CAN LAUNCH after March 2026              │
├─────────────────────────────────────────────────────┤
│ US                                                  │
│ ├─ Active: Prothioconazole → ✅ Clear (2023)       │
│ ├─ Active: Azoxystrobin → ✅ Clear (2022)          │
│ └─ Formulation Patent → ✅ No patent filed          │
│ Status: ✅ CAN LAUNCH NOW                           │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Portfolio Decision-Making: The Big Picture

### **Annual Portfolio Review Process**

#### **Step 1: Review All "Not Yet Considered" Products**
```
Query: "Show all formulations with status = Not Yet Considered"

Results (50 products):
- 000023-01: Tebuconazole 250 SC
- 000024-01: Glyphosate 480 SL
- 000025-01: Novel combination X+Y
- ...

For each product, ask:
1. Market potential? (€)
2. Protection status? (can we launch legally?)
3. Competitive landscape? (how many competitors?)
4. Development cost? (regulatory + manufacturing)
5. Strategic fit? (does this fill a gap?)
```

---

#### **Step 2: Prioritization Matrix**
```
         │ High Market Potential │ Low Market Potential
─────────┼───────────────────────┼─────────────────────
High ROI │ ⭐⭐⭐ SELECT NOW     │ 🟡 Maybe Later
─────────┼───────────────────────┼─────────────────────  
Low ROI  │ 🟡 Consider           │ ❌ Kill / Monitor
```

**Example Decisions:**
```
000023-01: Tebuconazole 250 SC
- Market: €80M (EU cereals)
- Protection: Clear in 2026
- Competition: 3 existing generics
- ROI: 45% margin expected
- Decision: ⭐ SELECT → Move to development

000024-01: Glyphosate 480 SL  
- Market: €200M but saturated
- Protection: Clear (old chemistry)
- Competition: 20+ competitors, price war
- ROI: 15% margin (low)
- Decision: ❌ KILL → Not worth investment

000025-01: Novel Combination
- Market: Unknown (new use pattern)
- Protection: Would have exclusivity (novel)
- Competition: None (first to market)
- ROI: High potential but risky
- Decision: 🟡 MONITOR → Pilot study first
```

---

#### **Step 3: Country Deployment Planning**
```
Product Selected: 000023-01 (Tebuconazole 250)

Question: "In which countries should we register?"

Analysis:
┌──────────┬─────────────┬────────────┬──────────┬──────────┐
│ Country  │ Market Size │ Protection │ Reg Cost │ Priority │
├──────────┼─────────────┼────────────┼──────────┼──────────┤
│ France   │ €25M        │ Clear 2026 │ €150K    │ HIGH ⭐  │
│ Germany  │ €30M        │ Clear 2026 │ €200K    │ HIGH ⭐  │
│ UK       │ €8M         │ Clear 2025 │ €100K    │ MEDIUM   │
│ Spain    │ €12M        │ Clear 2027 │ €120K    │ MEDIUM   │
│ Italy    │ €15M        │ Patent 2029│ €180K    │ LOW ❌   │
└──────────┴─────────────┴────────────┴──────────┴──────────┘

Decision: Register in France + Germany first (largest markets, clear path)
```

---

### **Novel Formulations: The Innovation Path**

#### **When You Invent Something New**
```
Scenario: Your R&D lab invents a novel combination

Product Concept:
- Prothioconazole 150 + New Active X 200
- New Active X is Life Scientific's proprietary compound
- Potentially better efficacy than existing products

Process:
1. Create formulation: Gets code 000050-01 (new chemistry)
2. Status: "Not Yet Considered" initially
3. R&D develops:
   - Efficacy trials
   - Safety studies  
   - Manufacturing process
4. IP Strategy:
   - File patents on New Active X
   - File formulation patents on the combination
   - Add to formulation_patents table: "Protected until 2040"
5. After successful trials:
   - Status → "Selected"
   - Begin regulatory submissions
   - This is now an ORIGINATOR product (not me-too)
   - No reference_product_id (you are the reference!)
```

---

## 📈 Real-World Usage Scenarios

### **Scenario A: "What Products Should We Make?"**
```
User (Portfolio Director): 
"Show me all Selected products with TME in next 2 years"

System Returns:
- 000001-01: Prothio 250 (TME: FY26) - 5 countries
- 000001-02: Prothio 480 (TME: FY27) - 3 countries  
- 000015-01: Glyphosate 360 (TME: FY26) - 8 countries
- Total Investment: €2.5M (regulatory + manufacturing)
- Projected Revenue (10-year): €45M
- Decision: Approved ✅
```

---

### **Scenario B: "Can We Launch This Product?"**
```
User (Regulatory Manager):
"Check if 000002-01 can launch in Germany in 2026"

System Checks:
1. Active protections → Prothio blocked until 2028
2. Formulation patents → None blocking
3. Answer: ❌ No, wait until 2028

Alternative:
"Try UK instead?"
→ ✅ UK is clear, can launch 2026
```

---

### **Scenario C: "How's Our France Portfolio Performing?"**
```
User (France Country Manager):
"Show France business case summary"

System Shows:
┌──────────────┬───────────┬──────────┬──────────┐
│ Product      │ FY26 Rev  │ FY27 Rev │ Status   │
├──────────────┼───────────┼──────────┼──────────┤
│ 000015-01    │ €500K     │ €1.2M    │ Launch ✅│
│ 000001-01    │ -         │ €250K    │ Prep     │
│ 000001-02    │ -         │ -        │ Pending  │
├──────────────┼───────────┼──────────┼──────────┤
│ TOTAL        │ €500K     │ €1.45M   │          │
└──────────────┴───────────┴──────────┴──────────┘

Action Items:
- 000001-01: Need to finalize Label B crops
- 000015-01: Update Year 2 volume (last edit 6 months ago)
```

---

### **Scenario D: "Should We Develop This New Idea?"**
```
R&D Proposes: "Azoxystrobin 500 SC (higher concentration)"

System Checks:
1. Does this exist? 
   → Search: Azoxy-only products
   → Found: 000012-01 (Azoxy 250), 000012-02 (Azoxy 400)
   → This would be 000012-03 ✅

2. Market Analysis:
   → Competitors: 2 existing Azoxy 500 products
   → Market size: €15M (small niche)
   → Margin projection: 38%

3. Protection Status:
   → Azoxy active: Clear since 2020
   → No formulation patents blocking

4. Cost Analysis:
   → Regulatory: €180K
   → Manufacturing: €50K setup
   → ROI: 3 years to break even

Decision Framework:
- Technically feasible ✅
- Legally clear ✅
- Financially marginal 🟡
- Recommendation: Monitor, revisit if market grows

🎓 Training Your Team: Who Uses What?
Portfolio Director
Uses:

Product catalog (all formulations)
Status dashboard (Selected vs Killed)
Protection expiry calendar
10-year portfolio revenue projection

Key Questions:

"What's in our pipeline?"
"Where should we invest next?"
"Which products are most profitable?"


Country Managers
Uses:

Country-specific product list
Business case grids (10-year projections)
Label management (crops, timelines)
Registration status tracking

Key Questions:

"What products are approved for my market?"
"What's my revenue forecast for FY27?"
"Which labels are pending approval?"


Regulatory Team
Uses:

Registration timeline (Gantt view)
Label submission tracking
Protection status checker
Reference product links

Key Questions:

"When are we submitting to EFSA?"
"What's blocking launch in Germany?"
"Which reference product are we citing?"


R&D Scientists
Uses:

Formulation creation wizard
Ingredient database
Duplicate checker
Product family view (all variants)

Key Questions:

"Does this formulation already exist?"
"What other Prothio products do we have?"
"Which crops can we target?"


Finance Team
Uses:

Business case review (with git history)
COGS tracking
Margin analysis dashboard
ROI calculator

Key Questions:

"Who updated these numbers?"
"Why did margin drop in Q3?"
"What's our projected return on this product?"


Procurement
Uses:

Ingredient supplier database
COGS entry forms
Supply risk dashboard
Cost trend analysis

Key Questions:

"What's the current COGS for this formulation?"
"Which ingredients are high risk?"
"Who supplies Prothioconazole?"