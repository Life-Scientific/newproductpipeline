# Supabase Local Development Guide

Complete guide for setting up Supabase locally, managing migrations, and understanding the database workflow.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installing Supabase CLI](#installing-supabase-cli)
3. [Local Development Setup](#local-development-setup)
4. [Understanding config.toml](#understanding-configtoml)
5. [Migration Workflows](#migration-workflows)
6. [TypeScript Type Generation](#typescript-type-generation)
7. [Branching Strategies](#branching-strategies)
8. [Project-Specific Notes](#project-specific-notes)
9. [Troubleshooting](#troubleshooting)
10. [Command Reference](#command-reference)

---

## Prerequisites

Before working with Supabase locally, ensure you have:

- **Docker Desktop** installed and running (required for local Supabase)
- **Node.js** (v18 or later)
- **pnpm** (our package manager)

### Installing Docker Desktop

1. Download from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Install and open Docker Desktop
3. Ensure it's running (you'll see the Docker icon in your menu bar)

---

## Installing Supabase CLI

### Via Homebrew (Recommended for Mac)

```bash
brew install supabase/tap/supabase
```

### Via npm (Alternative)

```bash
npm install -g supabase
```

### Verify Installation

```bash
supabase --version
```

### Update CLI

```bash
brew upgrade supabase
```

---

## Local Development Setup

### Starting Local Supabase

From the project root, start all Supabase services:

```bash
supabase start
```

This spins up Docker containers for:
- **PostgreSQL database** (port 54322)
- **Supabase Studio** (port 54323) - Visual database editor
- **API server** (port 54321)
- **Auth server**
- **Inbucket** (port 54324) - Email testing

First run takes longer as it downloads images.

### Accessing Local Services

| Service | URL |
|---------|-----|
| Supabase Studio | http://localhost:54323 |
| API | http://localhost:54321 |
| Database | postgresql://postgres:postgres@localhost:54322/postgres |
| Inbucket (email) | http://localhost:54324 |

### Stopping Local Supabase

```bash
supabase stop
```

To also reset the database:

```bash
supabase stop --no-backup
```

### Status Check

```bash
supabase status
```

Shows URLs and credentials for all local services.

---

## Understanding config.toml

The `supabase/config.toml` file configures your local Supabase instance.

### Key Sections

```toml
# Project identifier
project_id = "newproductdashboard"

# API settings
[api]
port = 54321
schemas = ["public", "graphql_public"]

# Database settings
[db]
port = 54322
major_version = 17

# Local Studio
[studio]
port = 54323

# Auth configuration
[auth]
site_url = "http://127.0.0.1:3000"
enable_signup = true
```

### Customizing Auth Providers

To enable OAuth locally (e.g., GitHub):

```toml
[auth.external.github]
enabled = true
client_id = "env(SUPABASE_AUTH_GITHUB_CLIENT_ID)"
secret = "env(SUPABASE_AUTH_GITHUB_SECRET)"
```

Secrets are loaded from `.env` in the project root.

---

## Migration Workflows

### ⚠️ Important: Current Project Policy

**For now, migrations are restricted.** Do not create or modify migrations without coordination. The production database already has 51 migrations applied.

If you need a database change, discuss with the team first.

---

### Understanding Migrations

Migrations are SQL files in `supabase/migrations/` that track database schema changes over time. They're named with timestamps for ordering:

```
20251110214254_create_complete_schema_with_use_groups.sql
20251111001129_rename_label_to_use_group.sql
20251126094010_create_dashboard_optimization_views.sql
```

### Viewing Current Migrations

```bash
supabase migration list
```

Shows which migrations have been applied locally and remotely.

---

### Creating a New Migration

> ⚠️ Coordinate with the team before creating migrations

#### Method 1: Manual Migration

```bash
supabase migration new add_new_feature
```

This creates an empty file: `supabase/migrations/<timestamp>_add_new_feature.sql`

Edit the file with your SQL:

```sql
-- Add a new column
ALTER TABLE formulations 
ADD COLUMN new_field TEXT;

-- Create a new table
CREATE TABLE my_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Method 2: Diff-Based Migration

Make changes via Supabase Studio (http://localhost:54323), then generate SQL:

```bash
supabase db diff -f describe_your_change
```

This creates a migration file with the detected changes.

---

### Applying Migrations Locally

#### Apply All Pending Migrations

```bash
supabase migration up
```

#### Reset Database (Apply All Migrations Fresh)

```bash
supabase db reset
```

This:
1. Drops and recreates the database
2. Applies all migrations in order
3. Runs seed file (`supabase/seed.sql`) if it exists

---

### Pushing Migrations to Production

> ⚠️ **Do not push migrations without team approval**

#### Using Supabase CLI

```bash
# Link to production project (one-time setup)
supabase link --project-ref phizaaaxgbvgcaojiyow

# Push pending migrations
supabase db push
```

#### Using Custom Scripts

The project has custom migration scripts in `scripts/`:

```bash
node scripts/apply-new-migrations.js
```

These scripts connect directly to the production database.

---

### Pulling Remote Changes

If someone made changes via the Supabase Dashboard:

```bash
supabase db pull
```

This generates a migration file capturing those changes.

---

### Rolling Back Migrations

Supabase doesn't support automatic rollbacks. To undo a migration:

1. Create a new migration that reverses the changes
2. Or reset the local database with `supabase db reset`

For production, you'll need to manually write reversal SQL.

---

## TypeScript Type Generation

Keep TypeScript types in sync with your database schema.

### Generate Types

```bash
supabase gen types typescript --local > src/lib/supabase/database.types.ts
```

Or from the remote database:

```bash
supabase gen types typescript --project-id phizaaaxgbvgcaojiyow > src/lib/supabase/database.types.ts
```

### When to Regenerate

- After applying migrations
- After pulling remote changes
- When you see type errors related to database columns

### Using Generated Types

```typescript
import type { Database } from "@/lib/supabase/database.types";

// Table row type
type Formulation = Database["public"]["Tables"]["formulations"]["Row"];

// View row type
type FormulationDetail = Database["public"]["Views"]["vw_formulation_detail"]["Row"];

// Insert type (for creating records)
type NewFormulation = Database["public"]["Tables"]["formulations"]["Insert"];

// Update type (for updating records)
type FormulationUpdate = Database["public"]["Tables"]["formulations"]["Update"];
```

---

## Branching Strategies

Supabase supports database branching for team development. This is a Pro feature.

### How Branching Works

1. Each Git branch can have its own database branch
2. Schema changes are isolated per branch
3. Merging applies migrations to production

### Local Development Workflow

1. Create a Git branch for your feature
2. Make schema changes using migrations
3. Test locally with `supabase db reset`
4. Commit migration files
5. Push and create PR
6. Merge applies migrations to production

### Preview Branches (Future)

When enabled, each PR gets its own preview database with:
- All production migrations applied
- Your new migrations on top
- Isolated data from other branches

### Branch Isolation

Each branch has completely separate:
- Database schema and data
- Storage objects
- Edge Functions
- Auth configurations

---

## Project-Specific Notes

### Production Project Details

| Property | Value |
|----------|-------|
| Project Ref | `phizaaaxgbvgcaojiyow` |
| Region | eu-west-1 |
| Database Version | PostgreSQL 17 |
| Total Migrations | 51 (as of Nov 2025) |

### Key Database Views

The app primarily uses views (not tables directly):

| View | Purpose |
|------|---------|
| `vw_formulation_detail` | Formulation data with related info |
| `vw_business_case` | Business case projections |
| `vw_registration_pipeline` | Registration tracking |
| `vw_active_portfolio` | Currently active products |
| `vw_formulation_country_detail` | Country-level formulation data |

### Schema Migration Helpers

The project has utilities for handling field renames:

```typescript
import { getFormulationName, getFormulationStatus } from "@/lib/utils/schema-migration";
```

See `docs/SCHEMA_MIGRATION.md` for the full field mapping.

### Menu Items

Navigation is stored in the database (`menu_items` table). Adding new pages requires:
1. Creating the page in `src/app/(dashboard)/`
2. Adding a migration to insert the menu item

---

## Troubleshooting

### Docker Issues

**Error: "Cannot connect to Docker daemon"**
- Ensure Docker Desktop is running
- Try restarting Docker Desktop

**Error: "Port already in use"**
- Stop other services using the same port
- Or modify ports in `config.toml`

### Migration Issues

**Error: "Migration failed"**
- Check SQL syntax in your migration file
- Ensure you're not referencing non-existent objects
- Check for conflicting changes

**Migrations out of sync**
```bash
supabase migration list
```
Compare local vs remote, then:
```bash
supabase db pull  # Get remote changes
# or
supabase db reset  # Reset local to match migrations
```

### Type Generation Issues

**Types don't match database**
```bash
# Regenerate from local
supabase gen types typescript --local > src/lib/supabase/database.types.ts

# Or from remote
supabase gen types typescript --project-id phizaaaxgbvgcaojiyow > src/lib/supabase/database.types.ts
```

### Permission Errors on db push

If tables were created via Dashboard:

```sql
-- Run in Supabase SQL Editor
ALTER TABLE your_table OWNER TO postgres;
```

### Connection Issues

**Can't connect to local database**
```bash
supabase status  # Check if running
supabase stop
supabase start
```

---

## Command Reference

### Essential Commands

| Command | Description |
|---------|-------------|
| `supabase start` | Start local Supabase |
| `supabase stop` | Stop local Supabase |
| `supabase status` | Show local service status |
| `supabase db reset` | Reset local database |
| `supabase migration list` | List all migrations |

### Migration Commands

| Command | Description |
|---------|-------------|
| `supabase migration new <name>` | Create empty migration |
| `supabase migration up` | Apply pending migrations |
| `supabase db diff -f <name>` | Generate migration from changes |
| `supabase db push` | Push migrations to remote |
| `supabase db pull` | Pull remote schema changes |

### Type Generation

| Command | Description |
|---------|-------------|
| `supabase gen types typescript --local` | Generate from local |
| `supabase gen types typescript --project-id <id>` | Generate from remote |

### Project Linking

| Command | Description |
|---------|-------------|
| `supabase link --project-ref <id>` | Link to remote project |
| `supabase projects list` | List your projects |

### Utility Commands

| Command | Description |
|---------|-------------|
| `supabase login` | Authenticate CLI |
| `supabase --help` | Show all commands |
| `supabase db --help` | Show database commands |

---

## Quick Start Checklist

For developers new to the project:

- [ ] Install Docker Desktop
- [ ] Install Supabase CLI (`brew install supabase/tap/supabase`)
- [ ] Run `supabase start` from project root
- [ ] Access Studio at http://localhost:54323
- [ ] Run `supabase migration list` to see current state
- [ ] Read `docs/SCHEMA_MIGRATION.md` for field naming

---

## Further Reading

- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [Local Development Guide](https://supabase.com/docs/guides/local-development)
- [Managing Environments](https://supabase.com/docs/guides/deployment/managing-environments)
- [Branching Documentation](https://supabase.com/docs/guides/deployment/branching)









