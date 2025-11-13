const sqlite3 = require('sqlite3').verbose();
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const sqlitePath = 'C:\\Users\\Vikram.Sridhar\\Downloads\\sqlite_all\\eppocodes_all.sqlite';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Map EPPO datatypes to our categories
const DATATYPE_MAP = {
  'PFL': 'CROP',      // Plant
  'GAF': 'DISEASE',   // Microorganism (fungi/bacteria)
  'GAI': 'INSECT',    // Animal (insects)
  // Add more mappings as needed
};

// Map target types
const TARGET_TYPE_MAP = {
  'DISEASE': 'Disease',
  'INSECT': 'Pest',
  'WEED': 'Weed'
};

async function importEPPOCodes() {
  const db = new sqlite3.Database(sqlitePath, sqlite3.OPEN_READONLY);
  
  return new Promise((resolve, reject) => {
    console.log('Starting EPPO code import...');
    
    // Step 1: Import EPPO codes (filtered to our 4 categories)
    db.all(`
      SELECT 
        c.codeid,
        c.eppocode,
        c.dtcode,
        dt.libtype,
        c.status
      FROM t_codes c
      JOIN t_datatypes dt ON c.dtcode = dt.dtcode
      WHERE c.status = 'A'
        AND c.dtcode IN ('PFL', 'GAF', 'GAI')
      ORDER BY c.codeid
    `, [], async (err, codes) => {
      if (err) {
        reject(err);
        return;
      }
      
      console.log(`Found ${codes.length} EPPO codes to import`);
      
      // Get preferred names (English) - batch queries to avoid SQLite variable limit
      const codeIds = codes.map(c => c.codeid);
      const nameMap = new Map();
      const nameBatchSize = 500; // SQLite limit is 999, using 500 to be safe
      
      // Process names in batches using async IIFE
      (async () => {
        try {
          for (let i = 0; i < codeIds.length; i += nameBatchSize) {
            const batchIds = codeIds.slice(i, i + nameBatchSize);
            const placeholders = batchIds.map(() => '?').join(',');
            
            await new Promise((resolve, reject) => {
              db.all(`
                SELECT 
                  nameid,
                  codeid,
                  fullname,
                  codelang,
                  preferred
                FROM t_names
                WHERE codeid IN (${placeholders})
                  AND status = 'A'
                  AND preferred = 1
                  AND codelang = 'en'
              `, batchIds, (err, names) => {
                if (err) {
                  reject(err);
                  return;
                }
                
                // Add to name map
                names.forEach(n => {
                  if (!nameMap.has(n.codeid) || n.preferred === 1) {
                    nameMap.set(n.codeid, n.fullname);
                  }
                });
                
                resolve();
              });
            });
            
            if ((i + nameBatchSize) % 10000 === 0 || i + nameBatchSize >= codeIds.length) {
              console.log(`Loaded names for ${Math.min(i + nameBatchSize, codeIds.length)}/${codeIds.length} codes...`);
            }
          }
          
          // Continue with import after all names are loaded
        
        // Import codes in batches
        const batchSize = 1000;
        let imported = 0;
        
        for (let i = 0; i < codes.length; i += batchSize) {
          const batch = codes.slice(i, i + batchSize);
          const eppoCodes = batch.map(code => {
            const category = DATATYPE_MAP[code.dtcode] || null;
            if (!category) return null; // Skip unmapped datatypes
            
            return {
              codeid: code.codeid,
              eppocode: code.eppocode,
              category: category,
              preferred_name_en: nameMap.get(code.codeid) || code.eppocode,
              preferred_name_fr: null, // Can be added later if needed
              status: code.status
            };
          }).filter(Boolean);
          
          if (eppoCodes.length > 0) {
            const { error } = await supabase
              .from('eppo_codes')
              .upsert(eppoCodes, { onConflict: 'codeid' });
            
            if (error) {
              console.error(`Error importing batch ${i / batchSize + 1}:`, error);
            } else {
              imported += eppoCodes.length;
              console.log(`Imported ${imported}/${codes.length} EPPO codes...`);
            }
          }
        }
        
        console.log(`Imported ${imported} EPPO codes`);
        
        // Step 2: Import hierarchy
        await new Promise((resolveHierarchy, rejectHierarchy) => {
            db.all(`
              SELECT 
                l.idlink,
                l.codeid as child_codeid,
                l.codeid_parent as parent_codeid,
                lt.linkdesc as link_type,
                l.status
              FROM t_links l
              JOIN t_link_types lt ON l.idlinkcode = lt.idlinkcode
              WHERE l.status = 'A'
            `, [], async (err, links) => {
              if (err) {
                rejectHierarchy(err);
                return;
              }
              
              console.log(`Found ${links.length} hierarchy links to import`);
              
              // Get actual imported codeids from Supabase (paginate to get all)
              const importedCodeIdSet = new Set();
              let offset = 0;
              const pageSize = 1000;
              let hasMore = true;
              
              while (hasMore) {
                const { data: importedCodes, error: fetchError } = await supabase
                  .from('eppo_codes')
                  .select('codeid')
                  .range(offset, offset + pageSize - 1);
                
                if (fetchError) {
                  console.error('Error fetching imported codes:', fetchError);
                  rejectHierarchy(fetchError);
                  return;
                }
                
                if (!importedCodes || importedCodes.length === 0) {
                  hasMore = false;
                } else {
                  importedCodes.forEach(c => importedCodeIdSet.add(c.codeid));
                  offset += pageSize;
                  hasMore = importedCodes.length === pageSize;
                }
              }
              console.log(`Found ${importedCodeIdSet.size} codes in database`);
              
              // Filter to only include links where both parent and child exist in imported codes
              const validLinks = links.filter(link => 
                importedCodeIdSet.has(link.child_codeid) && importedCodeIdSet.has(link.parent_codeid)
              );
              
              console.log(`Filtered to ${validLinks.length} valid hierarchy links (both parent and child exist in imported codes)`);
              
              // Import links in batches
              const linkBatchSize = 1000;
              let linksImported = 0;
              
              for (let i = 0; i < validLinks.length; i += linkBatchSize) {
                const batch = validLinks.slice(i, i + linkBatchSize);
                const hierarchies = batch.map(link => ({
                  child_codeid: link.child_codeid,
                  parent_codeid: link.parent_codeid,
                  link_type: link.link_type,
                  status: link.status
                }));
                
                const { error } = await supabase
                  .from('eppo_code_hierarchy')
                  .upsert(hierarchies, { onConflict: 'child_codeid,parent_codeid,link_type' });
                
                if (error) {
                  console.error(`Error importing hierarchy batch ${i / linkBatchSize + 1}:`, error);
                } else {
                  linksImported += hierarchies.length;
                  console.log(`Imported ${linksImported}/${validLinks.length} hierarchy links...`);
                }
              }
              
              console.log(`Imported ${linksImported} hierarchy links`);
              db.close();
              resolveHierarchy();
            });
          });
          
          resolve();
        } catch (error) {
          reject(error);
        }
      })();
    });
  });
}

// Run import
importEPPOCodes()
  .then(() => {
    console.log('EPPO code import completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });

