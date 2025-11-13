const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Populate crops and targets tables with curated EPPO codes
 * This script:
 * 1. Takes a curated list of EPPO codes (to be provided)
 * 2. Auto-detects families (codes with children)
 * 3. Populates family members for all families
 * 4. Inserts into crops/targets tables
 */

async function populateCropsAndTargets() {
  console.log('Starting crops and targets population...');
  
  // TODO: Replace with actual curated list
  // For now, this is a template showing the structure
  
  // Example curated codes (you'll replace this with your actual list)
  const curatedCrops = [
    { eppocode: 'SOLTU', crop_name: 'Potato' },
    { eppocode: 'LYCPE', crop_name: 'Tomato' },
    { eppocode: 'CAPAN', crop_name: 'Pepper' },
    { eppocode: '1SOLF', crop_name: 'Solanaceae' }, // Family
    // Add more curated crops...
  ];
  
  const curatedTargets = [
    { eppocode: 'APHISP', target_name: 'Aphids', target_type: 'Pest' },
    { eppocode: 'FUSASP', target_name: 'Fusarium', target_type: 'Disease' },
    // Add more curated targets...
  ];
  
  // Step 1: Get EPPO code IDs for curated codes
  const cropEppoCodes = curatedCrops.map(c => c.eppocode);
  const targetEppoCodes = curatedTargets.map(t => t.eppocode);
  
  const { data: cropCodes, error: cropCodesError } = await supabase
    .from('eppo_codes')
    .select('eppo_code_id, eppocode, codeid, category')
    .in('eppocode', cropEppoCodes)
    .eq('category', 'CROP');
  
  if (cropCodesError) {
    console.error('Error fetching crop EPPO codes:', cropCodesError);
    return;
  }
  
  const { data: targetCodes, error: targetCodesError } = await supabase
    .from('eppo_codes')
    .select('eppo_code_id, eppocode, codeid, category')
    .in('eppocode', targetEppoCodes);
  
  if (targetCodesError) {
    console.error('Error fetching target EPPO codes:', targetCodesError);
    return;
  }
  
  // Step 2: Detect families and populate crops
  const cropsToInsert = [];
  
  for (const curated of curatedCrops) {
    const eppoCode = cropCodes.find(c => c.eppocode === curated.eppocode);
    if (!eppoCode) {
      console.warn(`EPPO code not found: ${curated.eppocode}`);
      continue;
    }
    
    // Check if it's a family (has children)
    const { data: hasChildren } = await supabase
      .from('eppo_code_hierarchy')
      .select('hierarchy_id')
      .eq('parent_codeid', eppoCode.codeid)
      .eq('status', 'A')
      .limit(1);
    
    const isFamily = (hasChildren?.length || 0) > 0;
    
    cropsToInsert.push({
      crop_name: curated.crop_name || eppoCode.preferred_name_en,
      crop_category: null, // Can be set if needed
      eppo_code_id: eppoCode.eppo_code_id,
      eppo_code: eppoCode.eppocode,
      is_eppo_family: isFamily,
      is_active: true
    });
  }
  
  // Insert crops
  if (cropsToInsert.length > 0) {
    const { error: insertError } = await supabase
      .from('crops')
      .upsert(cropsToInsert, { onConflict: 'crop_name' });
    
    if (insertError) {
      console.error('Error inserting crops:', insertError);
    } else {
      console.log(`Inserted ${cropsToInsert.length} crops`);
    }
    
    // Step 3: Populate family members for family crops
    for (const crop of cropsToInsert) {
      if (crop.is_eppo_family) {
        const { data: cropRecord } = await supabase
          .from('crops')
          .select('crop_id, eppo_code_id')
          .eq('eppo_code', crop.eppo_code)
          .single();
        
        if (cropRecord) {
          // Use SQL function to populate family members
          const { error: populateError } = await supabase.rpc('populate_family_members', {
            p_crop_id: cropRecord.crop_id,
            p_target_id: null
          });
          
          if (populateError) {
            console.error(`Error populating family members for ${crop.crop_name}:`, populateError);
          } else {
            // Count how many members were added
            const { count } = await supabase
              .from('eppo_family_members')
              .select('*', { count: 'exact', head: true })
              .eq('family_crop_id', cropRecord.crop_id);
            
            console.log(`Populated ${count || 0} family members for ${crop.crop_name}`);
          }
        }
      }
    }
  }
  
  // Step 4: Populate targets (similar process)
  const targetsToInsert = [];
  
  for (const curated of curatedTargets) {
    const eppoCode = targetCodes.find(c => c.eppocode === curated.eppocode);
    if (!eppoCode) {
      console.warn(`EPPO code not found: ${curated.eppocode}`);
      continue;
    }
    
    // Check if it's a family
    const { data: hasChildren } = await supabase
      .from('eppo_code_hierarchy')
      .select('hierarchy_id')
      .eq('parent_codeid', eppoCode.codeid)
      .eq('status', 'A')
      .limit(1);
    
    const isFamily = (hasChildren?.length || 0) > 0;
    
    // Map category to target_type
    const targetType = eppoCode.category === 'DISEASE' ? 'Disease' :
                      eppoCode.category === 'INSECT' ? 'Pest' :
                      eppoCode.category === 'WEED' ? 'Weed' : 'Other';
    
    targetsToInsert.push({
      target_name: curated.target_name || eppoCode.preferred_name_en,
      target_type: curated.target_type || targetType,
      target_category: null,
      eppo_code_id: eppoCode.eppo_code_id,
      eppo_code: eppoCode.eppocode,
      is_eppo_family: isFamily,
      is_active: true
    });
  }
  
  // Insert targets
  if (targetsToInsert.length > 0) {
    const { error: insertError } = await supabase
      .from('targets')
      .upsert(targetsToInsert, { onConflict: 'target_name' });
    
    if (insertError) {
      console.error('Error inserting targets:', insertError);
    } else {
      console.log(`Inserted ${targetsToInsert.length} targets`);
      
      // Populate family members for family targets
      for (const target of targetsToInsert) {
        if (target.is_eppo_family) {
          const { data: targetRecord } = await supabase
            .from('targets')
            .select('target_id, eppo_code_id')
            .eq('eppo_code', target.eppo_code)
            .single();
          
          if (targetRecord) {
            // Use SQL function to populate family members
            const { error: populateError } = await supabase.rpc('populate_family_members', {
              p_crop_id: null,
              p_target_id: targetRecord.target_id
            });
            
            if (populateError) {
              console.error(`Error populating family members for ${target.target_name}:`, populateError);
            } else {
              // Count how many members were added
              const { count } = await supabase
                .from('eppo_family_members')
                .select('*', { count: 'exact', head: true })
                .eq('family_target_id', targetRecord.target_id);
              
              console.log(`Populated ${count || 0} family members for ${target.target_name}`);
            }
          }
        }
      }
    }
  }
  
  console.log('Population completed!');
}

// Run population
populateCropsAndTargets()
  .then(() => {
    console.log('Crops and targets population completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Population failed:', error);
    process.exit(1);
  });

