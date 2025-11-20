#!/bin/bash
set -e

echo "📝 Running migration: 20251125000000_create_invitations_system.sql"
echo ""

# Check if Supabase CLI is available
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it:"
    echo "   brew install supabase/tap/supabase"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Check if Supabase is running locally
if ! supabase status &> /dev/null; then
    echo "⚠️  Local Supabase is not running. Starting it..."
    supabase start
fi

echo ""
echo "🔄 Applying migration to local database..."
echo ""

# Apply migration using Supabase CLI
supabase migration up --local

echo ""
echo "✅ Local migration completed!"
echo ""
echo "To verify, run: supabase db diff"

