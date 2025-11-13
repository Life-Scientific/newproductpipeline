const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = 'C:\\Users\\Vikram.Sridhar\\Downloads\\sqlite_all\\eppocodes_all.sqlite';

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('Connected to EPPO database');
});

// Get all table names
db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
  if (err) {
    console.error('Error getting tables:', err.message);
    db.close();
    return;
  }
  
  console.log('\n=== TABLES ===');
  tables.forEach(table => {
    console.log(`- ${table.name}`);
  });
  
  // Get schema for each table
  tables.forEach(table => {
    db.all(`PRAGMA table_info(${table.name})`, [], (err, columns) => {
      if (err) {
        console.error(`Error getting schema for ${table.name}:`, err.message);
        return;
      }
      
      console.log(`\n=== ${table.name.toUpperCase()} SCHEMA ===`);
      columns.forEach(col => {
        console.log(`  ${col.name}: ${col.type}${col.notnull ? ' NOT NULL' : ''}${col.pk ? ' PRIMARY KEY' : ''}`);
      });
      
      // Get sample data (first 5 rows)
      db.all(`SELECT * FROM ${table.name} LIMIT 5`, [], (err, rows) => {
        if (err) {
          console.error(`Error getting sample data for ${table.name}:`, err.message);
          return;
        }
        
        if (rows.length > 0) {
          console.log(`\n=== ${table.name.toUpperCase()} SAMPLE DATA (first 5 rows) ===`);
          rows.forEach((row, idx) => {
            console.log(`Row ${idx + 1}:`, JSON.stringify(row, null, 2));
          });
        }
        
        // Get row count
        db.get(`SELECT COUNT(*) as count FROM ${table.name}`, [], (err, result) => {
          if (!err && result) {
            console.log(`\nTotal rows in ${table.name}: ${result.count}`);
          }
          
          // If this is the last table, close the database
          if (table === tables[tables.length - 1]) {
            setTimeout(() => {
              db.close((err) => {
                if (err) {
                  console.error('Error closing database:', err.message);
                } else {
                  console.log('\nDatabase connection closed');
                }
              });
            }, 1000);
          }
        });
      });
    });
  });
});

