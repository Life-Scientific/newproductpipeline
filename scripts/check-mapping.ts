
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkBaseCodes() {
  const { data: baseCodes, error } = await supabase
    .from('base_code_registry')
    .select('base_code');

  if (error) {
    console.error('Error fetching base codes:', error);
    return;
  }

  console.log(`Found ${baseCodes.length} base codes.`);
  const codes = baseCodes.map(b => b.base_code);
  
  // Check if sample indexes exist in base codes
  const samples = ['2', '257', '184', '345'];
  for (const s of samples) {
    // Pad with leading zeros? 002?
    const padded = s.padStart(3, '0');
    const exists = codes.includes(s) || codes.includes(padded);
    console.log(`Index ${s} (or ${padded}) exists? ${exists}`);
  }
  
  // Search all text columns for '257'
  const { data: searchData, error: searchError } = await supabase
    .from('formulations')
    .select('*')
    .or(`formulation_name.ilike.%257%,short_name.ilike.%257%,active_signature.ilike.%257%`);
    
  if (searchData && searchData.length > 0) {
      console.log('Found formulations matching 257:', searchData.map(f => ({ id: f.formulation_id, name: f.formulation_name, code: f.formulation_code })));
  } else {
      console.log('No formulations found matching 257 in name/short_name/signature');
  }
}

checkBaseCodes().catch(console.error);

