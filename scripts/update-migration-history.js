import pg from "pg";

const connectionString =
  "postgresql://postgres.phizaaaxgbvgcaojiyow:13121982Jr2205@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";

const client = new pg.Client({ connectionString });

async function updateMigrationHistory() {
  try {
    await client.connect();
    console.log("✅ Connected to database");

    // Insert migration records into supabase_migrations.schema_migrations
    const migrations = [
      { version: "20251121000001", name: "create_workspaces" },
      { version: "20251121000002", name: "create_themes" },
    ];

    for (const migration of migrations) {
      try {
        await client.query(
          `INSERT INTO supabase_migrations.schema_migrations (version, name) 
           VALUES ($1, $2) 
           ON CONFLICT (version) DO NOTHING`,
          [migration.version, migration.name],
        );
        console.log(`✅ Recorded migration: ${migration.version}`);
      } catch (error) {
        console.log(
          `⚠️  Migration ${migration.version} may already be recorded:`,
          error.message,
        );
      }
    }

    console.log("\n✅ Migration history updated!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

updateMigrationHistory();
