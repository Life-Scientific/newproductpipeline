const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const sqlitePath = 'C:\\Users\\Vikram.Sridhar\\Downloads\\sqlite_all\\eppocodes_all.sqlite';

/**
 * Helper script to find potential family codes in EPPO database
 * Helps identify which codes have children and could be families
 */

const db = new sqlite3.Database(sqlitePath, sqlite3.OPEN_READONLY);

// Find codes that have children (potential families)
db.all(`
  SELECT DISTINCT
    c.codeid,
    c.eppocode,
    c.dtcode,
    dt.libtype,
    n.fullname,
    COUNT(DISTINCT l.child_codeid) as child_count
  FROM t_codes c
  JOIN t_datatypes dt ON c.dtcode = dt.dtcode
  LEFT JOIN t_names n ON c.codeid = n.codeid AND n.preferred = 1 AND n.status = 'A' AND n.codelang = 'en'
  LEFT JOIN t_links l ON c.codeid = l.codeid_parent AND l.status = 'A'
  WHERE c.status = 'A'
    AND c.dtcode IN ('PFL', 'GAF', 'GAI')
  GROUP BY c.codeid, c.eppocode, c.dtcode, dt.libtype, n.fullname
  HAVING COUNT(DISTINCT l.child_codeid) > 0
  ORDER BY child_count DESC
  LIMIT 100
`, [], (err, families) => {
  if (err) {
    console.error('Error:', err.message);
    db.close();
    return;
  }
  
  console.log('\n=== POTENTIAL FAMILY CODES (Top 100 by child count) ===\n');
  
  // Group by datatype
  const byType = {
    PFL: [],
    GAF: [],
    GAI: []
  };
  
  families.forEach(f => {
    if (byType[f.dtcode]) {
      byType[f.dtcode].push(f);
    }
  });
  
  console.log('PLANTS (CROPS):');
  byType.PFL.slice(0, 20).forEach(f => {
    console.log(`  ${f.eppocode}: ${f.fullname || 'N/A'} (${f.child_count} children)`);
  });
  
  console.log('\nMICROORGANISMS (DISEASES):');
  byType.GAF.slice(0, 20).forEach(f => {
    console.log(`  ${f.eppocode}: ${f.fullname || 'N/A'} (${f.child_count} children)`);
  });
  
  console.log('\nANIMALS (INSECTS):');
  byType.GAI.slice(0, 20).forEach(f => {
    console.log(`  ${f.eppocode}: ${f.fullname || 'N/A'} (${f.child_count} children)`);
  });
  
  db.close();
});

