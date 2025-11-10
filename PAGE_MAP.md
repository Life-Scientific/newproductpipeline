# Application Page Map

This document provides a comprehensive map of all pages, routes, and navigation paths in LS Portfolio.

## Route Structure

The application uses Next.js App Router with the following structure:
- `(auth)` - Authentication routes (login, signup)
- `(dashboard)` - Main application routes (protected, requires authentication)

---

## Public Routes

### Authentication Pages

#### `/login`
- **Path**: `src/app/(auth)/login/page.tsx`
- **Purpose**: User login page
- **Access**: Public
- **Features**: 
  - Login form
  - Redirects to dashboard on success

#### `/signup`
- **Path**: `src/app/(auth)/signup/page.tsx`
- **Purpose**: User registration page
- **Access**: Public
- **Features**: 
  - Registration form
  - Redirects to dashboard on success

---

## Dashboard Routes (Protected)

### Main Dashboard

#### `/` (Dashboard Home)
- **Path**: `src/app/(dashboard)/page.tsx`
- **Purpose**: Main dashboard overview
- **Access**: Authenticated users
- **Features**:
  - Portfolio metrics cards (Total Formulations, Active Portfolio, Total Business Cases, Average Margin %, Countries Covered, Active Registrations)
  - Recent status changes list
  - Recent business cases list
  - Recent formulations table
- **Data Sources**:
  - `getFormulations()`
  - `getBusinessCases()`
  - `getActivePortfolio()`
  - `getFormulationStatusHistory()`

---

### Formulations

#### `/formulations`
- **Path**: `src/app/(dashboard)/formulations/page.tsx`
- **Purpose**: List all formulations
- **Access**: Authenticated users
- **Features**:
  - Searchable, paginated table of formulations
  - Create new formulation button
  - Edit/Delete actions per row
  - Links to detail pages
- **Components**: `FormulationsListWithActions`, `FormulationFormButton`
- **Data Sources**: `getFormulations()`

#### `/formulations/[id]`
- **Path**: `src/app/(dashboard)/formulations/[id]/page.tsx`
- **Purpose**: Detailed formulation view
- **Access**: Authenticated users
- **Features**:
  - Summary metrics (Countries, Labels, Business Cases, Ingredients)
  - Tabbed interface:
    - **Overview**: Basic details, financial summary, countries preview
    - **Tree View**: Hierarchical view of formulation → country → label → business case
    - **Financial**: Business cases and COGS data
    - **Regulatory**: Countries, labels, and protection status
    - **Composition**: Ingredients list
    - **History**: Status change history
  - Link to tree view page
- **Components**: 
  - `FormulationTreeView`
  - `FormulationIngredients`
  - `FormulationCOGS`
  - `FormulationBusinessCases`
  - `FormulationStatusHistory`
  - `FormulationRegulatory`
- **Data Sources**:
  - `getFormulationById()`
  - `getFormulationCountryDetails()`
  - `getFormulationIngredients()`
  - `getFormulationCOGS()`
  - `getFormulationBusinessCases()`
  - `getFormulationStatusHistory()`
  - `getFormulationProtectionStatus()`
  - `getFormulationLabels()`
  - `getFormulationBusinessCasesForTree()`

#### `/formulations/[id]/hierarchy`
- **Path**: `src/app/(dashboard)/formulations/[id]/hierarchy/page.tsx`
- **Purpose**: Dedicated tree view page
- **Access**: Authenticated users
- **Features**:
  - Full-screen hierarchical tree view
  - Shows formulation → country → label → business case structure
  - Collapsible sections
  - Summary metrics
- **Components**: `FormulationTreeView`
- **Data Sources**:
  - `getFormulationById()`
  - `getFormulationCountryDetails()`
  - `getFormulationLabels()`
  - `getFormulationBusinessCasesForTree()`

#### `/formulations/compare`
- **Path**: `src/app/(dashboard)/formulations/compare/page.tsx`
- **Purpose**: Compare multiple formulations side-by-side
- **Access**: Authenticated users
- **Features**:
  - Select up to 5 formulations to compare
  - Side-by-side comparison table showing:
    - Basic info (code, name, category, type, status)
    - Financial metrics (revenue, margin, margin %)
    - Counts (business cases, countries, labels, ingredients, COGS entries)
  - Add/remove formulations dynamically
  - Links to individual formulation detail pages
- **Components**: `FormulationComparison`
- **Data Sources**: 
  - `getFormulations()`
  - API routes for detailed data:
    - `/api/formulations/[id]/business-cases`
    - `/api/formulations/[id]/ingredients`
    - `/api/formulations/[id]/countries`
    - `/api/formulations/[id]/labels`
    - `/api/formulations/[id]/cogs`

---

### Business Cases

#### `/business-cases`
- **Path**: `src/app/(dashboard)/business-cases/page.tsx`
- **Purpose**: List all business cases
- **Access**: Authenticated users
- **Features**:
  - Searchable, paginated table of business cases
  - Columns: Business Case, Formulation Code, Formulation, Country, Label, Type, Year Offset, Volume, NSP, COGS/Unit, Revenue, Margin, Margin %, Fiscal Year, Scenario, Confidence
  - Links to detail pages
- **Components**: `BusinessCasesList`
- **Data Sources**: `getBusinessCases()`

#### `/business-cases/[id]`
- **Path**: `src/app/(dashboard)/business-cases/[id]/page.tsx`
- **Purpose**: Detailed business case view
- **Access**: Authenticated users
- **Features**:
  - Summary metrics (Total Revenue, Total Margin, Volume, NSP per Unit)
  - Details card (Type, Year Offset, Fiscal Year, Scenario, Confidence, COGS)
  - Context card (Formulation link, Country, Label)
  - Financial breakdown (Revenue calculation, COGS calculation, Margin analysis)
  - Assumptions section
  - Metadata (Created by, dates, last updated by)
- **Data Sources**: `getBusinessCaseById()`, `getFormulationById()`

---

### Analytics

#### `/analytics`
- **Path**: `src/app/(dashboard)/analytics/page.tsx`
- **Purpose**: Analytics and reporting dashboard
- **Access**: Authenticated users
- **Features**:
  - Portfolio metrics cards
  - Revenue projections chart
  - Status breakdown pie chart
  - Margin trend chart
  - Country coverage chart
  - Registration pipeline status
  - Registration pathway breakdown
- **Components**:
  - `PortfolioMetrics`
  - `RevenueProjections`
  - `RevenueChart`
  - `StatusPieChart`
  - `MarginTrendChart`
  - `CountryCoverageChart`
- **Data Sources**:
  - `getFormulations()`
  - `getBusinessCases()`
  - `getActivePortfolio()`
  - `getPortfolioGaps()`
  - `getRevenueProjections()`

---

### COGS Management

#### `/cogs`
- **Path**: `src/app/(dashboard)/cogs/page.tsx`
- **Purpose**: COGS (Cost of Goods Sold) management
- **Access**: Authenticated users
- **Features**:
  - Searchable, paginated table of COGS entries
  - View COGS by formulation and country
- **Components**: `COGSList`
- **Data Sources**: `getCOGSList()`

---

### Ingredients Analysis

#### `/ingredients`
- **Path**: `src/app/(dashboard)/ingredients/page.tsx`
- **Purpose**: Ingredient usage analysis
- **Access**: Authenticated users
- **Features**:
  - Searchable, paginated table of ingredient usage
  - Shows ingredient usage across formulations
  - Supply risk indicators
- **Components**: `IngredientUsage`
- **Data Sources**: `getIngredientUsage()`

---

### Registration Pipeline

#### `/registration`
- **Path**: `src/app/(dashboard)/registration/page.tsx`
- **Purpose**: Registration pipeline overview
- **Access**: Authenticated users
- **Features**:
  - View registration pipeline status
  - Track registration progress
- **Components**: `RegistrationPipelineList`
- **Data Sources**: `vw_registration_pipeline` view

---

### Reference Data

#### `/reference`
- **Path**: `src/app/(dashboard)/reference/page.tsx`
- **Purpose**: Reference data management
- **Access**: Authenticated users
- **Features**:
  - Countries table
  - Crops table
  - Ingredients table
- **Components**:
  - `CountriesTable`
  - `CropsTable`
  - `IngredientsTable`
- **Data Sources**: Reference tables from database

---

## API Routes

### Formulations API

#### `/api/formulations/[id]`
- **Path**: `src/app/api/formulations/[id]/route.ts`
- **Purpose**: Fetch single formulation by ID
- **Method**: GET
- **Returns**: Full formulation data from `formulations` table
- **Use Case**: Used for editing formulations (provides fields not in aggregated views)

#### `/api/formulations/[id]/business-cases`
- **Path**: `src/app/api/formulations/[id]/business-cases/route.ts`
- **Purpose**: Fetch business cases for a formulation
- **Method**: GET
- **Returns**: Array of business cases
- **Use Case**: Used by comparison page

#### `/api/formulations/[id]/ingredients`
- **Path**: `src/app/api/formulations/[id]/ingredients/route.ts`
- **Purpose**: Fetch ingredients for a formulation
- **Method**: GET
- **Returns**: Array of formulation ingredients
- **Use Case**: Used by comparison page

#### `/api/formulations/[id]/countries`
- **Path**: `src/app/api/formulations/[id]/countries/route.ts`
- **Purpose**: Fetch countries for a formulation
- **Method**: GET
- **Returns**: Array of formulation country details
- **Use Case**: Used by comparison page

#### `/api/formulations/[id]/labels`
- **Path**: `src/app/api/formulations/[id]/labels/route.ts`
- **Purpose**: Fetch labels for a formulation
- **Method**: GET
- **Returns**: Array of formulation country labels
- **Use Case**: Used by comparison page

#### `/api/formulations/[id]/cogs`
- **Path**: `src/app/api/formulations/[id]/cogs/route.ts`
- **Purpose**: Fetch COGS data for a formulation
- **Method**: GET
- **Returns**: Array of COGS entries
- **Use Case**: Used by comparison page

---

## Navigation Structure

### Sidebar Navigation (`AppSidebar`)
- **Dashboard** (`/`)
- **Formulations** (`/formulations`)
- **Business Cases** (`/business-cases`)
- **Analytics** (`/analytics`)
- **COGS** (`/cogs`)
- **Ingredients** (`/ingredients`)
- **Registration** (`/registration`)
- **Reference** (`/reference`)

### Breadcrumbs
- Used on detail pages for hierarchical navigation
- Component: `HierarchicalBreadcrumb`
- Example: Formulations → F-001 → Tree View

---

## Component Organization

### Layout Components
- `src/components/layout/`
  - `AnimatedPage.tsx` - Page transition wrapper
  - `AppSidebar.tsx` - Main navigation sidebar
  - `Header.tsx` - Page header component
  - `SidebarProvider.tsx` - Sidebar state management

### Form Components
- `src/components/forms/`
  - `FormulationForm.tsx` - Create/edit formulation form
  - `FormulationFormButton.tsx` - Trigger button for formulation form
  - `BusinessCaseForm.tsx` - Create/edit business case form
  - `DeleteConfirmDialog.tsx` - Confirmation dialog for deletions

### Data Display Components
- `src/components/formulations/`
  - `FormulationsList.tsx` - Basic formulations list
  - `FormulationsListWithActions.tsx` - List with CRUD actions
  - `FormulationIngredients.tsx` - Ingredients display
  - `FormulationCOGS.tsx` - COGS display
  - `FormulationBusinessCases.tsx` - Business cases display
  - `FormulationStatusHistory.tsx` - Status history display
  - `FormulationRegulatory.tsx` - Regulatory information display

- `src/components/business-cases/`
  - `BusinessCasesList.tsx` - Business cases table

- `src/components/analytics/`
  - `PortfolioMetrics.tsx` - Portfolio metrics cards
  - `RevenueProjections.tsx` - Revenue projections display

- `src/components/charts/`
  - `RevenueChart.tsx` - Revenue visualization
  - `StatusPieChart.tsx` - Status breakdown pie chart
  - `MarginTrendChart.tsx` - Margin trends over time
  - `CountryCoverageChart.tsx` - Country coverage visualization

- `src/components/cogs/`
  - `COGSList.tsx` - COGS data table

- `src/components/ingredients/`
  - `IngredientUsage.tsx` - Ingredient usage analysis

- `src/components/reference/`
  - `CountriesTable.tsx` - Countries reference table
  - `CropsTable.tsx` - Crops reference table
  - `IngredientsTable.tsx` - Ingredients reference table

- `src/components/registration/`
  - `RegistrationPipelineList.tsx` - Registration pipeline table

### Navigation Components
- `src/components/navigation/`
  - `FormulationTreeView.tsx` - Hierarchical tree view
  - `HierarchicalBreadcrumb.tsx` - Breadcrumb navigation

### UI Components
- `src/components/ui/` - Shadcn/ui components
  - `enhanced-data-table.tsx` - Enhanced data table with pagination
  - Standard UI components (button, card, input, etc.)

---

## Data Flow

### Data Fetching Pattern
1. **Server Components**: Pages are server components that fetch data using async functions
2. **Query Functions**: All queries in `src/lib/db/queries.ts` use Supabase client
3. **Views**: Frontend primarily uses `vw_*` views for aggregated, readable data
4. **Type Safety**: TypeScript types generated from database schema

### Common Data Sources
- **Formulations**: `vw_formulations_with_ingredients`
- **Business Cases**: `vw_business_case`
- **COGS**: `vw_cogs`
- **Countries**: `countries` table
- **Ingredients**: `ingredients` table
- **Status History**: `formulation_status_history` table

---

## URL Patterns

### List Pages
- Pattern: `/resource`
- Example: `/formulations`, `/business-cases`

### Detail Pages
- Pattern: `/resource/[id]`
- Example: `/formulations/[id]`, `/business-cases/[id]`

### Nested Routes
- Pattern: `/resource/[id]/sub-resource`
- Example: `/formulations/[id]/hierarchy`

### Query Parameters
- Used for filtering: `/business-cases?bc=[id]` (future enhancement)

---

## Authentication & Authorization

### Middleware
- **Path**: `src/middleware.ts`
- **Purpose**: Protects dashboard routes, redirects unauthenticated users
- **Implementation**: Uses Supabase middleware for session management

### Protected Routes
- All routes under `(dashboard)` require authentication
- Unauthenticated users are redirected to `/login`

---

## Page Templates

### List Page Template
```tsx
export default async function ResourcePage() {
  const data = await getData();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="space-y-2 mb-6">
          <h1>Page Title</h1>
          <p>Description</p>
        </div>
        <Card>
          <CardContent>
            {/* List component */}
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}
```

### Detail Page Template
```tsx
export default async function ResourceDetailPage({ params }: Props) {
  const { id } = await params;
  const data = await getDataById(id);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />
        <div className="space-y-2 mb-6">
          <h1>Title</h1>
          <p>Subtitle</p>
        </div>
        {/* Content */}
      </AnimatedPage>
    </div>
  );
}
```

---

## Future Enhancements

### Planned Routes
- `/formulations/[id]/edit` - Edit formulation page
- `/business-cases/[id]/edit` - Edit business case page
- `/cogs/[id]` - COGS detail page
- `/ingredients/[id]` - Ingredient detail page
- `/countries/[id]` - Country detail page

### Planned Features
- Advanced filtering on list pages
- Export functionality (CSV, PDF)
- Bulk operations
- Comparison views
- Timeline visualization

---

## Notes

- All routes use Next.js App Router conventions
- Server components are used for data fetching
- Client components are used for interactive features
- Consistent spacing and layout patterns (see `DESIGN_SYSTEM.md`)
- Responsive design (mobile-first approach)

