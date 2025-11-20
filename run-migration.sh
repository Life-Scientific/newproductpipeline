#!/bin/bash
set -e

CONNECTION_STRING="postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"

echo "📝 Running migration: 20251124000000_add_admin_role.sql"
echo ""

# Try to use psql if available, otherwise try docker
if command -v psql &> /dev/null; then
    psql "$CONNECTION_STRING" -f supabase/migrations/20251124000000_add_admin_role.sql
elif command -v docker &> /dev/null; then
    echo "Using Docker to run psql..."
    docker run --rm -i postgres:15 psql "$CONNECTION_STRING" < supabase/migrations/20251124000000_add_admin_role.sql
else
    echo "❌ Neither psql nor docker found. Please install one of them."
    echo ""
    echo "Alternatively, you can:"
    echo "1. Install PostgreSQL client: brew install postgresql"
    echo "2. Or use Supabase Dashboard SQL Editor"
    echo "3. Or use a Node.js script (requires 'pg' package)"
    exit 1
fi

echo ""
echo "✅ Migration completed!"
