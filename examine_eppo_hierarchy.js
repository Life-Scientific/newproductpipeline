const sqlite3 = require('sqlite3').verbose();

const dbPath = 'C:\\Users\\Vikram.Sridhar\\Downloads\\sqlite_all\\eppocodes_all.sqlite';
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

// Get sample links to understand hierarchy
db.all(`
  SELECT 
    l.idlink,
    l.codeid,
    l.codeid_parent,
    l.idlinkcode,
    lt.linkdesc,
    c1.eppocode as child_code,
    c1.dtcode as child_type,
    c2.eppocode as parent_code,
    c2.dtcode as parent_type
  FROM t_links l
  JOIN t_link_types lt ON l.idlinkcode = lt.idlinkcode
  JOIN t_codes c1 ON l.codeid = c1.codeid
  JOIN t_codes c2 ON l.codeid_parent = c2.codeid
  WHERE l.status = 'A'
  LIMIT 20
`, [], (err, rows) => {
  if (err) {
    console.error('Error:', err.message);
    db.close();
    return;
  }
  
  console.log('\n=== SAMPLE HIERARCHY LINKS ===');
  rows.forEach(row => {
    console.log(`${row.child_code} (${row.child_type}) -> ${row.parent_code} (${row.parent_type}) [${row.linkdesc}]`);
  });
  
  // Get some plant examples
  db.all(`
    SELECT 
      c.codeid,
      c.eppocode,
      c.dtcode,
      dt.libtype,
      n.fullname,
      n.codelang
    FROM t_codes c
    JOIN t_datatypes dt ON c.dtcode = dt.dtcode
    LEFT JOIN t_names n ON c.codeid = n.codeid AND n.preferred = 1 AND n.status = 'A'
    WHERE c.dtcode = 'PFL' AND c.status = 'A'
    LIMIT 10
  `, [], (err, plantRows) => {
    if (err) {
      console.error('Error:', err.message);
      db.close();
      return;
    }
    
    console.log('\n=== SAMPLE PLANTS (CROPS) ===');
    plantRows.forEach(row => {
      console.log(`${row.eppocode}: ${row.fullname || 'N/A'} (${row.libtype})`);
    });
    
    // Get a specific example with its hierarchy
    db.all(`
      WITH RECURSIVE hierarchy AS (
        SELECT 
          c.codeid,
          c.eppocode,
          c.dtcode,
          l.codeid_parent,
          0 as level
        FROM t_codes c
        LEFT JOIN t_links l ON c.codeid = l.codeid AND l.status = 'A'
        WHERE c.eppocode = 'SOLTU' AND c.status = 'A'
        
        UNION ALL
        
        SELECT 
          c.codeid,
          c.eppocode,
          c.dtcode,
          l.codeid_parent,
          h.level + 1
        FROM hierarchy h
        JOIN t_links l ON h.codeid_parent = l.codeid AND l.status = 'A'
        JOIN t_codes c ON l.codeid_parent = c.codeid AND c.status = 'A'
        WHERE h.level < 5
      )
      SELECT DISTINCT
        h.eppocode,
        h.dtcode,
        n.fullname,
        h.level
      FROM hierarchy h
      LEFT JOIN t_names n ON h.codeid = n.codeid AND n.preferred = 1 AND n.status = 'A'
      ORDER BY h.level DESC
      LIMIT 10
    `, [], (err, hierarchyRows) => {
      if (err) {
        console.error('Error:', err.message);
        db.close();
        return;
      }
      
      console.log('\n=== HIERARCHY EXAMPLE (SOLTU - Potato) ===');
      hierarchyRows.forEach(row => {
        const indent = '  '.repeat(row.level);
        console.log(`${indent}${row.eppocode}: ${row.fullname || 'N/A'} (level ${row.level})`);
      });
      
      // Get link types count
      db.all(`
        SELECT 
          lt.idlinkcode,
          lt.linkdesc,
          COUNT(*) as count
        FROM t_links l
        JOIN t_link_types lt ON l.idlinkcode = lt.idlinkcode
        WHERE l.status = 'A'
        GROUP BY lt.idlinkcode, lt.linkdesc
      `, [], (err, linkTypeRows) => {
        if (err) {
          console.error('Error:', err.message);
          db.close();
          return;
        }
        
        console.log('\n=== LINK TYPES SUMMARY ===');
        linkTypeRows.forEach(row => {
          console.log(`${row.linkdesc}: ${row.count} links`);
        });
        
        db.close();
      });
    });
  });
});

