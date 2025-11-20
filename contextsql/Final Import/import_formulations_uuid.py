"""
UUID-Based Import Script for Formulations
Clean implementation using direct UUID references from CSV
Generates SQL split into 3-4 files for easier handling
"""

import csv
import uuid as uuid_module
from collections import defaultdict
from dataclasses import dataclass
from typing import Dict, List, Set, Optional
from decimal import Decimal
import os

# File paths
FORMULATION_CSV = r"C:\Users\Vikram.Sridhar\Downloads\Master List Prototype(Formulation.Ingredient (3).csv"
INGREDIENTS_UUID_CSV = r"C:\Users\Vikram.Sridhar\Downloads\ingredients_rows.csv"
COUNTRIES_UUID_CSV = r"C:\Users\Vikram.Sridhar\Downloads\countries_rows.csv"
BASE_CODE_REGISTRY_CSV = r"C:\Users\Vikram.Sridhar\Downloads\base_code_registry_rows.csv"
FORMULATION_CODE_MAPPING_CSV = r"C:\Users\Vikram.Sridhar\OneDrive - LifeScientific\Desktop\intermediate.files\Formulation.Code\Simplified.Index.to.Form.Code.csv"
DUPLICATES_MAPPING_CSV = r"C:\Users\Vikram.Sridhar\OneDrive - LifeScientific\Desktop\intermediate.files\duplicates_report_replace_parents_upload.csv"
BUSINESS_CASE_CSV = r"C:\Users\Vikram.Sridhar\Downloads\Master List Prototype(Business Case Data).csv"

# Output file base names (will be split)
SQL_OUTPUT_BASE = "import_part"
LOG_OUTPUT = "import_uuid_log.txt"
SUMMARY_OUTPUT = "import_uuid_summary.csv"


@dataclass
class IngredientInfo:
    """Ingredient information"""
    ingredient_id: str
    ingredient_name: str
    ingredient_type: str
    concentration: Decimal
    unit: str


@dataclass
class FormulationInfo:
    """Formulation information"""
    csv_index: str
    formulation_code: str
    base_code: str
    variant_suffix: str
    formulation_name: str
    formulation_category: str
    formulation_type: str
    uom: str
    formulation_status: str
    ingredients: List[IngredientInfo]
    conflict_resolved: bool = False


class UUIDBasedImporter:
    """Clean UUID-based importer"""
    
    def __init__(self):
        # Lookups from existing database
        self.ingredient_type_by_uuid: Dict[str, str] = {}  # uuid -> type
        self.ingredient_name_by_uuid: Dict[str, str] = {}  # uuid -> name
        self.country_uuid_by_code: Dict[str, str] = {}     # code -> uuid
        self.base_code_registry: Dict[str, int] = {}       # base -> next_variant
        
        # Mapping files
        self.code_mapping: Dict[str, str] = {}             # index -> formulation_code
        self.duplicates_mapping: Dict[str, dict] = {}      # index -> flags/status
        
        # Output data
        self.formulations: List[FormulationInfo] = []
        self.business_cases: List[dict] = []
        self.formulation_countries: List[dict] = []
        
        # Tracking
        self.used_formulation_codes: Set[str] = set()
        self.formulation_code_to_csv_indexes: Dict[str, List[str]] = defaultdict(list)
        
        # Duplicate detection
        self.signatures_seen: Dict[str, List[tuple]] = defaultdict(list)  # signature -> [(csv_index, type), ...]
        self.duplicate_indexes: Dict[str, List[str]] = defaultdict(list)  # kept_index -> [duplicate_indexes]
        
        # Logging
        self.log_entries: List[str] = []
        self.conflicts_resolved: List[dict] = []
        self.missing_years_filled: List[dict] = []
        self.errors: List[str] = []
        self.warnings: List[str] = []
        
        # Auto-generation tracking
        self.next_base_code_number = 1
    
    def log(self, message: str, level: str = "INFO"):
        """Add log entry"""
        entry = f"[{level}] {message}"
        self.log_entries.append(entry)
        try:
            print(entry)
        except UnicodeEncodeError:
            # Handle encoding issues in Windows console
            print(entry.encode('ascii', 'replace').decode('ascii'))
    
    def _load_ingredient_types(self):
        """Load ingredient UUID -> type and name mappings"""
        self.log("Loading ingredient types and names by UUID...")
        try:
            with open(INGREDIENTS_UUID_CSV, 'r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    uuid_val = row['ingredient_id'].strip()
                    ing_type = row['ingredient_type'].strip()
                    ing_name = row['ingredient_name'].strip()
                    self.ingredient_type_by_uuid[uuid_val] = ing_type
                    self.ingredient_name_by_uuid[uuid_val] = ing_name
            self.log(f"Loaded {len(self.ingredient_type_by_uuid)} ingredient type mappings")
        except Exception as e:
            self.log(f"ERROR loading ingredient types: {e}", "ERROR")
            raise
    
    def _load_country_uuids(self):
        """Load country UUIDs"""
        self.log("Loading country UUIDs...")
        try:
            with open(COUNTRIES_UUID_CSV, 'r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    code = row['country_code'].strip()
                    uuid_val = row['country_id'].strip()
                    self.country_uuid_by_code[code] = uuid_val
            self.log(f"Loaded {len(self.country_uuid_by_code)} country UUIDs")
        except Exception as e:
            self.log(f"ERROR loading country UUIDs: {e}", "ERROR")
            raise
    
    def _load_base_code_registry(self):
        """Load existing base code registry"""
        self.log("Loading base code registry...")
        try:
            with open(BASE_CODE_REGISTRY_CSV, 'r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    base_code = row['base_code'].strip()
                    next_variant = int(row['next_variant_number'])
                    self.base_code_registry[base_code] = next_variant
            
            # Find next available base code number
            if self.base_code_registry:
                max_code = max([int(code) for code in self.base_code_registry.keys() if code.isdigit()])
                self.next_base_code_number = max_code + 1
            
            self.log(f"Loaded {len(self.base_code_registry)} existing base codes")
            self.log(f"Next auto-generated base code: {self.next_base_code_number:03d}")
        except Exception as e:
            self.log(f"ERROR loading base code registry: {e}", "ERROR")
            raise
    
    def _load_formulation_code_mapping(self):
        """Load CSV index to formulation code mapping"""
        self.log("Loading formulation code mapping...")
        try:
            with open(FORMULATION_CODE_MAPPING_CSV, 'r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    csv_index = row['Current Index'].strip()
                    formulation_code = row['Final'].strip()
                    if csv_index:
                        self.code_mapping[csv_index] = formulation_code
            
            dnh_count = sum(1 for code in self.code_mapping.values() if code == 'DNH')
            self.log(f"Loaded {len(self.code_mapping)} formulation code mappings")
            self.log(f"  - DNH (auto-generate) entries: {dnh_count}")
        except Exception as e:
            self.log(f"ERROR loading formulation code mapping: {e}", "ERROR")
            raise
    
    def _load_duplicates_mapping(self):
        """Load duplicates mapping with flags and final status"""
        self.log("Loading duplicates mapping...")
        try:
            with open(DUPLICATES_MAPPING_CSV, 'r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    primary_index = row['Primary Index'].strip()
                    if primary_index:
                        self.duplicates_mapping[primary_index] = {
                            'is_use_group': row['Index references a specific use group'].strip().upper() == 'TRUE',
                            'is_country_variant': row['Is a country variant'].strip().upper() == 'TRUE',
                            'final_status': row['Final Status'].strip()
                        }
            self.log(f"Loaded {len(self.duplicates_mapping)} duplicate mappings")
        except Exception as e:
            self.log(f"ERROR loading duplicates mapping: {e}", "ERROR")
            raise
    
    def _parse_ingredients_from_row(self, row, csv_index):
        """Parse ingredients using UUID column"""
        uuid_str = row.get('Linked_UUIDs', '').strip()
        if not uuid_str:
            return []
        
        uuids = [u.strip() for u in uuid_str.split(';') if u.strip()]
        ingredients = []
        uuid_idx = 0
        
        # Check each ingredient column in order
        ingredient_slots = [
            ('Active Ingredient 1', 'Active Ingredient 1 Concentration'),
            ('Active Ingredient 2', 'Active Ingredient 2 Concentration'),
            ('Active Ingredient 3', 'Active Ingredient 3 Concentration'),
            ('Active Ingredient 4', 'Active Ingredient 4 Concentration'),
            ('Safener', 'Safener Concentration')
        ]
        
        for name_col, conc_col in ingredient_slots:
            name = row.get(name_col, '').strip()
            conc = row.get(conc_col, '').strip()
            
            if not name:  # Empty slot
                continue
            
            if uuid_idx >= len(uuids):
                self.errors.append(f"Index {csv_index}: Not enough UUIDs for ingredients")
                self.log(f"  [ERROR] Not enough UUIDs for all ingredients", "ERROR")
                break
            
            uuid_val = uuids[uuid_idx]
            ingredient_type = self.ingredient_type_by_uuid.get(uuid_val, 'Active')
            ingredient_name = self.ingredient_name_by_uuid.get(uuid_val, name)
            uuid_idx += 1
            
            try:
                concentration = Decimal(conc) if conc else Decimal('0')
            except:
                concentration = Decimal('0')
            
            ingredients.append(IngredientInfo(
                ingredient_id=uuid_val,
                ingredient_name=ingredient_name,
                ingredient_type=ingredient_type,
                concentration=concentration,
                unit='g/L'
            ))
        
        return ingredients
    
    def _generate_formulation_name(self, ingredients: List[IngredientInfo]) -> str:
        """Generate formulation name from ingredients"""
        actives = []
        safeners = []
        adjuvants = []
        
        for ing in ingredients:
            if ing.ingredient_type == 'Active':
                actives.append((ing.ingredient_name, ing.concentration, ing.unit))
            elif ing.ingredient_type == 'Safener':
                safeners.append((ing.ingredient_name, ing.concentration, ing.unit))
            elif ing.ingredient_type == 'Adjuvant':
                adjuvants.append((ing.ingredient_name, ing.concentration, ing.unit))
        
        # Sort alphabetically
        actives.sort(key=lambda x: x[0])
        safeners.sort(key=lambda x: x[0])
        adjuvants.sort(key=lambda x: x[0])
        
        # Build name parts
        name_parts = []
        
        # Add all ingredient names
        for name, conc, unit in actives + safeners + adjuvants:
            name_parts.append(name)
        
        # Add concentrations
        for name, conc, unit in actives + safeners + adjuvants:
            name_parts.append(str(conc))
        
        return '/'.join(name_parts)
    
    def _generate_signature(self, ingredients: List[IngredientInfo]) -> str:
        """Generate unique signature for duplicate detection (ingredients + concentrations only)"""
        # Sort by ingredient UUID for consistent comparison
        sorted_ings = sorted(ingredients, key=lambda x: x.ingredient_id)
        
        # Build signature: "uuid1:conc1|uuid2:conc2"
        # NOTE: Formulation type is NOT included - duplicates are based solely on ingredients + concentrations
        parts = [f"{ing.ingredient_id}:{ing.concentration}" 
                 for ing in sorted_ings]
        
        return "|".join(parts)
    
    def _generate_ingredient_only_signature(self, ingredients: List[IngredientInfo]) -> str:
        """Generate signature based only on ingredients (not concentrations) for conflict resolution"""
        # Sort by ingredient UUID for consistent comparison
        sorted_ings = sorted(ingredients, key=lambda x: x.ingredient_id)
        
        # Build signature: just UUIDs, no concentrations
        parts = [ing.ingredient_id for ing in sorted_ings]
        
        return "|".join(parts)
    
    def _get_next_base_code(self) -> str:
        """Get next available base code number"""
        base_code = f"{self.next_base_code_number:03d}"
        
        while base_code in self.base_code_registry:
            self.next_base_code_number += 1
            base_code = f"{self.next_base_code_number:03d}"
        
        self.next_base_code_number += 1
        return base_code
    
    def _allocate_formulation_code(self, csv_index: str, ingredients: List[IngredientInfo], force_new_base: bool = False) -> tuple:
        """Allocate formulation code for a CSV index"""
        # If forcing new base code due to type conflict
        if force_new_base:
            return self._auto_generate_code(csv_index)
        
        # Check if we have a pre-existing mapping
        if csv_index in self.code_mapping:
            mapped_code = self.code_mapping[csv_index]
            
            if mapped_code == 'DNH':
                # Auto-generate new code
                return self._auto_generate_code(csv_index)
            else:
                # Use mapped code, but check for conflicts
                return self._resolve_code_conflict(mapped_code, csv_index, ingredients)
        else:
            # No mapping, auto-generate
            return self._auto_generate_code(csv_index)
    
    def _resolve_code_conflict(self, desired_code: str, csv_index: str, ingredients: List[IngredientInfo]) -> tuple:
        """Resolve formulation code conflicts - check if ingredients match existing formulation"""
        base_code, variant = desired_code.split('-')
        
        # Check if this exact code is already used
        if desired_code in self.used_formulation_codes:
            # Conflict! Check if the existing formulation has the same ingredients
            existing_formulation = next((f for f in self.formulations if f.formulation_code == desired_code), None)
            
            if existing_formulation:
                # Compare ingredients only (not concentrations) to determine if same formulation family
                existing_ing_sig = self._generate_ingredient_only_signature(existing_formulation.ingredients)
                current_ing_sig = self._generate_ingredient_only_signature(ingredients)
                
                if existing_ing_sig == current_ing_sig:
                    # Same ingredients → increment variant
                    if base_code in self.base_code_registry:
                        next_variant = self.base_code_registry[base_code]
                        new_variant = f"{next_variant:02d}"
                        new_code = f"{base_code}-{new_variant}"
                        
                        # Update registry
                        self.base_code_registry[base_code] = next_variant + 1
                        self.used_formulation_codes.add(new_code)
                        
                        self.conflicts_resolved.append({
                            'csv_index': csv_index,
                            'original_code': desired_code,
                            'resolved_code': new_code,
                            'reason': 'Different concentration - variant incremented'
                        })
                        
                        self.log(f"  [CONFLICT] Index {csv_index}: {desired_code} → {new_code} (different concentration)")
                        
                        return new_code, base_code, new_variant, True
                    else:
                        # Base code not in registry - shouldn't happen but handle it
                        self.base_code_registry[base_code] = int(variant) + 1
                        self.used_formulation_codes.add(desired_code)
                        return desired_code, base_code, variant, False
                else:
                    # Different ingredients → assign new base code
                    new_base = self._get_next_base_code()
                    new_variant = "01"
                    new_code = f"{new_base}-{new_variant}"
                    
                    self.base_code_registry[new_base] = 2
                    self.used_formulation_codes.add(new_code)
                    
                    self.conflicts_resolved.append({
                        'csv_index': csv_index,
                        'original_code': desired_code,
                        'resolved_code': new_code,
                        'reason': 'Different ingredients - new base code assigned'
                    })
                    
                    self.log(f"  [CONFLICT] Index {csv_index}: {desired_code} → {new_code} (different ingredients, new base code)")
                    
                    return new_code, new_base, new_variant, True
            else:
                # Shouldn't happen, but handle gracefully
                self.log(f"  [WARNING] Code {desired_code} marked as used but no formulation found", "WARN")
                return self._auto_generate_code(csv_index)
        else:
            # No conflict, use as-is
            self.used_formulation_codes.add(desired_code)
            
            # Make sure base code is in registry
            if base_code not in self.base_code_registry:
                self.base_code_registry[base_code] = int(variant) + 1
            
            return desired_code, base_code, variant, False
    
    def _auto_generate_code(self, csv_index: str) -> tuple:
        """Auto-generate a new formulation code"""
        base_code = self._get_next_base_code()
        variant = "01"
        formulation_code = f"{base_code}-{variant}"
        
        # Add to registry
        self.base_code_registry[base_code] = 2  # Next variant would be 02
        self.used_formulation_codes.add(formulation_code)
        
        self.log(f"  [AUTO-GEN] Index {csv_index}: Generated new code {formulation_code}")
        
        return formulation_code, base_code, variant, False
    
    def _process_formulations(self):
        """Process formulations CSV"""
        self.log("\nProcessing formulations CSV...")
        
        try:
            with open(FORMULATION_CSV, 'r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                rows = list(reader)
            
            self.log(f"Read {len(rows)} rows from formulations CSV")
            
            # Group by CSV Index
            formulations_by_index = defaultdict(list)
            for row in rows:
                csv_index = row.get('Current Index', '').strip()
                if csv_index:
                    formulations_by_index[csv_index].append(row)
            
            self.log(f"Found {len(formulations_by_index)} unique formulation indexes")
            
            # Process each formulation
            for csv_index, rows in formulations_by_index.items():
                try:
                    self._process_single_formulation(csv_index, rows[0])
                except Exception as e:
                    self.errors.append(f"Failed to process index {csv_index}: {e}")
                    self.log(f"ERROR processing index {csv_index}: {e}", "ERROR")
            
            self.log(f"\nSuccessfully processed {len(self.formulations)} formulations")
            self.log(f"  - Conflicts resolved: {len(self.conflicts_resolved)}")
            
        except Exception as e:
            self.log(f"ERROR processing formulations CSV: {e}", "ERROR")
            raise
    
    def _process_single_formulation(self, csv_index: str, row: dict):
        """Process a single formulation"""
        # Check if we should include this formulation
        include_flag = row.get('Include/Not Include', '').strip()
        if include_flag == 'Not Include':
            self.log(f"  [SKIP] Index {csv_index}: Marked as 'Not Include'", "WARN")
            return
        
        # Parse ingredients using UUIDs
        ingredients = self._parse_ingredients_from_row(row, csv_index)
        
        if not ingredients:
            self.log(f"  [SKIP] Index {csv_index}: No valid ingredients", "WARN")
            return
        
        # Get formulation-level info
        formulation_category = row.get('Formulation Category', '').strip() or 'Herbicide'
        formulation_type = row.get('Formulation Type', '').strip() or 'SC'
        uom = row.get('UoM', '').strip() or 'L'
        
        # Generate signature for duplicate detection (ingredients + concentrations only)
        signature = self._generate_signature(ingredients)
        
        # Check for duplicates - same ingredients + concentrations + type
        existing_with_same_type = None
        existing_with_diff_type = []
        
        if signature in self.signatures_seen:
            for idx, ftype in self.signatures_seen[signature]:
                if ftype == formulation_type:
                    existing_with_same_type = idx
                else:
                    existing_with_diff_type.append((idx, ftype))
        
        if existing_with_same_type:
            # TRUE DUPLICATE: Same ingredients, concentrations, AND type → consolidate
            existing_index = existing_with_same_type
            
            try:
                existing_idx_num = int(existing_index) if existing_index.lstrip('-').isdigit() else -999999
                current_idx_num = int(csv_index) if csv_index.lstrip('-').isdigit() else -999999
                
                if current_idx_num > existing_idx_num:
                    # Current has higher index - replace existing formulation
                    # First, remove the old formulation's code from used set
                    old_formulation = next((f for f in self.formulations if f.csv_index == existing_index), None)
                    if old_formulation:
                        self.used_formulation_codes.discard(old_formulation.formulation_code)
                    
                    self.formulations = [f for f in self.formulations if f.csv_index != existing_index]
                    
                    # Track duplicate indexes
                    if existing_index in self.duplicate_indexes:
                        self.duplicate_indexes[csv_index] = self.duplicate_indexes[existing_index] + [existing_index]
                        del self.duplicate_indexes[existing_index]
                    else:
                        self.duplicate_indexes[csv_index] = [existing_index]
                    
                    # Update signature mapping - remove old entry and add new
                    self.signatures_seen[signature] = [(idx, ftype) if idx != existing_index else (csv_index, formulation_type) 
                                                       for idx, ftype in self.signatures_seen[signature]]
                    self.log(f"  [DUPLICATE] Index {existing_index} replaced by {csv_index} (higher index)", "INFO")
                else:
                    # Existing has higher index - skip current
                    if existing_index in self.duplicate_indexes:
                        self.duplicate_indexes[existing_index].append(csv_index)
                    else:
                        self.duplicate_indexes[existing_index] = [csv_index]
                    
                    self.log(f"  [DUPLICATE] Index {csv_index} skipped (duplicate of {existing_index})")
                    return  # Skip creating this formulation
            except ValueError:
                # Keep first occurrence for non-numeric indexes
                self.log(f"  [DUPLICATE] Index {csv_index} skipped (duplicate of {existing_index})")
                self.duplicate_indexes[existing_index].append(csv_index)
                return
        
        # Track this signature + type combination
        self.signatures_seen[signature].append((csv_index, formulation_type))
        
        # Check for TYPE CONFLICT: same ingredients/concentrations but different type
        type_based_conflict = False
        if existing_with_diff_type:
            other_types = [ftype for _, ftype in existing_with_diff_type]
            self.log(f"  [TYPE CONFLICT] Index {csv_index} has same ingredients/concentrations as other indexes but different type ({formulation_type} vs {other_types})", "INFO")
        
        # Get formulation status from duplicates mapping
        if csv_index in self.duplicates_mapping:
            formulation_status = self.duplicates_mapping[csv_index]['final_status']
        else:
            formulation_status = 'Not Yet Evaluated'
        
        # Allocate formulation code - force new base if type conflict exists
        force_new_base = len(existing_with_diff_type) > 0
        formulation_code, base_code, variant, conflict_resolved = self._allocate_formulation_code(csv_index, ingredients, force_new_base=force_new_base)
        
        # Track this formulation code
        self.formulation_code_to_csv_indexes[formulation_code].append(csv_index)
        
        # Generate formulation name
        formulation_name = self._generate_formulation_name(ingredients)
        
        # Add formulation type to name if present
        if formulation_type:
            formulation_name = f"{formulation_name} {formulation_type}"
        
        # Create FormulationInfo
        formulation_info = FormulationInfo(
            csv_index=csv_index,
            formulation_code=formulation_code,
            base_code=base_code,
            variant_suffix=variant,
            formulation_name=formulation_name,
            formulation_category=formulation_category,
            formulation_type=formulation_type or 'SC',
            uom=uom,
            formulation_status=formulation_status,
            ingredients=ingredients,
            conflict_resolved=conflict_resolved
        )
        
        self.formulations.append(formulation_info)
        self.log(f"  [OK] Index {csv_index} → {formulation_code}: {formulation_name[:60]}")
    
    def _process_business_cases(self):
        """Process business cases CSV"""
        self.log("\nProcessing business cases...")
        
        try:
            with open(BUSINESS_CASE_CSV, 'r', encoding='latin-1') as f:
                reader = csv.DictReader(f)
                rows = list(reader)
            
            self.log(f"Read {len(rows)} business case rows")
            
            # Group by Index + Country
            bc_groups = defaultdict(list)
            for row in rows:
                index = row.get('Index', '').strip()
                country = row.get('Country', '').strip()
                if index and country:
                    key = f"{index}|{country}"
                    bc_groups[key].append(row)
            
            self.log(f"Found {len(bc_groups)} business case groups (Index + Country combinations)")
            
            # Build index to formulation_code mapping - include duplicates
            index_to_formulation_code = {}
            for formulation in self.formulations:
                index_to_formulation_code[formulation.csv_index] = formulation.formulation_code
                
                # Add all duplicate indexes
                if formulation.csv_index in self.duplicate_indexes:
                    for dup_idx in self.duplicate_indexes[formulation.csv_index]:
                        index_to_formulation_code[dup_idx] = formulation.formulation_code
            
            # Process ALL business cases first, then deduplicate
            # This ensures we don't lose countries unique to duplicate indexes
            all_processed_groups = {}
            
            for key, rows_list in bc_groups.items():
                index, country = key.split('|')
                
                # Get formulation code for this index
                if index not in index_to_formulation_code:
                    continue  # Skip if no formulation mapping
                
                # Process this group and store it
                self._process_business_case_group(index, country, rows_list)
                all_processed_groups[key] = {
                    'index': index,
                    'country': country,
                    'formulation_code': index_to_formulation_code[index],
                    'business_case_group_id': self.business_cases[-10]['business_case_group_id']  # Last 10 entries
                }
            
            # Now deduplicate at the (formulation_code, country) level
            formulation_country_to_keep = {}
            duplicate_groups_to_remove = []
            
            for key, group_data in all_processed_groups.items():
                fc_key = f"{group_data['formulation_code']}|{group_data['country']}"
                
                if fc_key in formulation_country_to_keep:
                    # Duplicate found - compare indexes
                    existing_data = formulation_country_to_keep[fc_key]
                    
                    try:
                        existing_idx_num = int(existing_data['index']) if existing_data['index'].lstrip('-').isdigit() else -999999
                        current_idx_num = int(group_data['index']) if group_data['index'].lstrip('-').isdigit() else -999999
                        
                        if current_idx_num > existing_idx_num:
                            # Current has higher index - replace
                            duplicate_groups_to_remove.append(existing_data['business_case_group_id'])
                            formulation_country_to_keep[fc_key] = group_data
                            self.log(f"  [BC DEDUP] Index {existing_data['index']} business case replaced by {group_data['index']} for {group_data['formulation_code']}-{group_data['country']}")
                        else:
                            # Existing has higher index - mark current for removal
                            duplicate_groups_to_remove.append(group_data['business_case_group_id'])
                            self.log(f"  [BC DEDUP] Index {group_data['index']} business case skipped (duplicate of {existing_data['index']}) for {group_data['formulation_code']}-{group_data['country']}")
                    except ValueError:
                        # For non-numeric indexes, keep first
                        duplicate_groups_to_remove.append(group_data['business_case_group_id'])
                        self.log(f"  [BC DEDUP] Index {group_data['index']} business case skipped (duplicate) for {group_data['formulation_code']}-{group_data['country']}")
                else:
                    # First occurrence
                    formulation_country_to_keep[fc_key] = group_data
            
            # Remove duplicate business cases
            if duplicate_groups_to_remove:
                self.business_cases = [bc for bc in self.business_cases 
                                     if bc['business_case_group_id'] not in duplicate_groups_to_remove]
            
            actual_bc_groups = len(formulation_country_to_keep)
            deduped_count = len(bc_groups) - actual_bc_groups
            self.log(f"Processed {actual_bc_groups} business case groups (removed {deduped_count} duplicates)")
            self.log(f"  - Missing years filled: {len(self.missing_years_filled)}")
            
        except Exception as e:
            self.log(f"ERROR processing business cases: {e}", "ERROR")
            raise
    
    def _process_business_case_group(self, index: str, country: str, rows: List[dict]):
        """Process a business case group ensuring all 10 years exist"""
        # Extract data by year
        data_by_year = {}
        tme_year = None
        
        for row in rows:
            year_offset_str = row.get('Year (1-10)', '').strip()
            if not year_offset_str:
                continue
            
            try:
                year_offset = int(year_offset_str)
            except:
                continue
            
            if year_offset < 1 or year_offset > 10:
                continue
            
            volume_str = row.get('Volume', '').strip().replace(',', '')
            nsp_str = row.get('NSP', '').strip()
            cogs_str = row.get('Unit COGs', '').strip()
            tme_year_str = row.get('TME_Year', '').strip()
            
            # Parse TME year
            if tme_year_str and tme_year is None:
                try:
                    tme_year = int(tme_year_str)
                except:
                    pass
            
            # Parse values
            try:
                volume = Decimal(volume_str) if volume_str else Decimal('0')
            except:
                volume = Decimal('0')
            
            try:
                nsp_clean = nsp_str.replace('€', '').replace('$', '').replace('£', '').strip()
                nsp = Decimal(nsp_clean) if nsp_clean else Decimal('0')
            except:
                nsp = Decimal('0')
            
            try:
                cogs_clean = cogs_str.replace('€', '').replace('$', '').replace('£', '').strip()
                cogs = Decimal(cogs_clean) if cogs_clean else Decimal('0')
            except:
                cogs = Decimal('0')
            
            data_by_year[year_offset] = {
                'volume': volume,
                'nsp': nsp,
                'cogs_per_unit': cogs
            }
        
        # Ensure all 10 years exist
        missing_years = []
        for year_offset in range(1, 11):
            if year_offset not in data_by_year:
                # Missing year - fill with zeros
                data_by_year[year_offset] = {
                    'volume': Decimal('0'),
                    'nsp': Decimal('0'),
                    'cogs_per_unit': Decimal('0')
                }
                missing_years.append(year_offset)
        
        if missing_years:
            self.missing_years_filled.append({
                'index': index,
                'country': country,
                'missing_years': missing_years
            })
            self.log(f"  [FILL] Index {index}, Country {country}: Filled years {missing_years} with zeros")
        
        # Store business case group
        business_case_group_id = str(uuid_module.uuid4())
        
        # Calculate effective start fiscal year
        if tme_year:
            fy = f"FY{str(tme_year)[-2:]}"
        else:
            fy = "FY26"  # Default
        
        for year_offset in range(1, 11):
            data = data_by_year[year_offset]
            self.business_cases.append({
                'business_case_group_id': business_case_group_id,
                'index': index,
                'country': country,
                'year_offset': year_offset,
                'volume': data['volume'],
                'nsp': data['nsp'],
                'cogs_per_unit': data['cogs_per_unit'],
                'effective_start_fiscal_year': fy,
                'status': 'active'
            })
    
    def _aggregate_formulation_countries(self):
        """Aggregate countries per formulation from ALL business case entries (before deduplication)"""
        self.log("\nAggregating formulation-country relationships...")
        
        # Read business cases CSV directly to get ALL index+country pairs
        try:
            with open(BUSINESS_CASE_CSV, 'r', encoding='latin-1') as f:
                reader = csv.DictReader(f)
                rows = list(reader)
        except Exception as e:
            self.log(f"ERROR reading business case CSV: {e}", "ERROR")
            raise
        
        # Build index to formulation_code mapping - include duplicates
        index_to_formulation_code = {}
        for formulation in self.formulations:
            index_to_formulation_code[formulation.csv_index] = formulation.formulation_code
            
            # Add all duplicate indexes
            if formulation.csv_index in self.duplicate_indexes:
                for dup_idx in self.duplicate_indexes[formulation.csv_index]:
                    index_to_formulation_code[dup_idx] = formulation.formulation_code
        
        # Extract all unique (index, country) pairs from CSV
        index_country_pairs = set()
        for row in rows:
            index = row.get('Index', '').strip()
            country = row.get('Country', '').strip()
            if index and country:
                index_country_pairs.add((index, country))
        
        self.log(f"Found {len(index_country_pairs)} unique index-country pairs in business case CSV")
        
        # Group countries by formulation_code
        formulation_countries_map = defaultdict(lambda: defaultdict(set))
        
        for index, country in index_country_pairs:
            # Skip if index not mapped to a formulation
            if index not in index_to_formulation_code:
                continue
            
            formulation_code = index_to_formulation_code[index]
            formulation_countries_map[formulation_code][country].add(index)
        
        # Check for country variant conflicts
        for formulation_code, countries in formulation_countries_map.items():
            for country, indexes in countries.items():
                # Check if any of these indexes are country variants
                variant_indexes = []
                non_variant_indexes = []
                
                for idx in indexes:
                    if idx in self.duplicates_mapping:
                        if self.duplicates_mapping[idx]['is_country_variant']:
                            variant_indexes.append(idx)
                        else:
                            non_variant_indexes.append(idx)
                    else:
                        non_variant_indexes.append(idx)
                
                # ERROR if both variant and non-variant exist
                if variant_indexes and non_variant_indexes:
                    error_msg = (
                        f"Country variant conflict for {formulation_code}, country {country}: "
                        f"Variant indexes {variant_indexes} conflict with non-variant indexes {non_variant_indexes}"
                    )
                    self.errors.append(error_msg)
                    self.log(f"  [ERROR] {error_msg}", "ERROR")
                    raise ValueError(error_msg)
        
        # Create formulation_country entries
        for formulation_code, countries in formulation_countries_map.items():
            for country in countries.keys():
                # Lookup country UUID
                if country not in self.country_uuid_by_code:
                    error_msg = f"Country code '{country}' not found in database"
                    self.errors.append(error_msg)
                    self.log(f"  [ERROR] {error_msg}", "ERROR")
                    raise ValueError(error_msg)
                
                country_uuid = self.country_uuid_by_code[country]
                
                self.formulation_countries.append({
                    'formulation_code': formulation_code,
                    'country_code': country,
                    'country_uuid': country_uuid,
                    'country_status': 'Not yet evaluated'
                })
        
        self.log(f"Created {len(self.formulation_countries)} formulation-country relationships")
        self.log(f"  - No country variant conflicts detected")
    
    def run(self):
        """Main execution flow"""
        try:
            # Load all data
            self.log("=" * 80)
            self.log("UUID-BASED FORMULATION IMPORT")
            self.log("=" * 80)
            
            self._load_ingredient_types()
            self._load_country_uuids()
            self._load_base_code_registry()
            self._load_formulation_code_mapping()
            self._load_duplicates_mapping()
            
            # Process formulations
            self._process_formulations()
            
            # Process business cases
            self._process_business_cases()
            
            # Aggregate countries
            self._aggregate_formulation_countries()
            
            # Generate SQL (will be implemented in next todo)
            self.log("\nGenerating SQL...")
            self._generate_sql()
            
            # Split SQL into files (will be implemented in next todo)
            self.log("\nSplitting SQL into multiple files...")
            self._split_sql_into_files()
            
            # Write logs
            self._write_log_file()
            self._write_summary_csv()
            
            self.log("\n" + "=" * 80)
            self.log("IMPORT GENERATION COMPLETE")
            self.log("=" * 80)
            
            if self.errors:
                self.log(f"\n[WARNING] {len(self.errors)} errors encountered (see log)")
                return 1
            
            return 0
            
        except Exception as e:
            self.log(f"\n[ERROR] Import failed: {e}", "ERROR")
            import traceback
            traceback.print_exc()
            return 1
    
    def _generate_sql(self):
        """Generate complete SQL file"""
        temp_sql_file = "import_temp_complete.sql"
        
        with open(temp_sql_file, 'w', encoding='utf-8') as f:
            self._write_sql_header(f)
            self._write_base_code_registry_sql(f)
            self._write_formulations_sql(f)
            self._write_formulation_ingredients_sql(f)
            self._write_formulation_country_sql(f)
            self._write_use_groups_sql(f)
            self._write_business_cases_sql(f)
            self._write_business_case_junction_sql(f)
            self._write_sql_footer(f)
        
        self.log(f"Temporary complete SQL file generated: {temp_sql_file}")
        self._temp_sql_file = temp_sql_file
    
    def _write_sql_header(self, f):
        """Write SQL file header"""
        f.write("-- " + "=" * 76 + "\n")
        f.write("-- UUID-BASED FORMULATION AND BUSINESS CASE IMPORT\n")
        f.write("-- " + "=" * 76 + "\n")
        f.write("-- Generated by import_formulations_uuid.py\n")
        f.write("-- \n")
        f.write("-- This file contains:\n")
        f.write("--   1. Base Code Registry updates\n")
        f.write("--   2. Formulation entries\n")
        f.write("--   3. Formulation-Ingredient junction entries\n")
        f.write("--   4. Formulation-Country entries\n")
        f.write("--   5. Use Group entries\n")
        f.write("--   6. Business Case entries\n")
        f.write("--   7. Business Case-Use Group junction entries\n")
        f.write("-- \n")
        f.write(f"-- Statistics:\n")
        f.write(f"--   - Formulations: {len(self.formulations)}\n")
        f.write(f"--   - Formulation-Countries: {len(self.formulation_countries)}\n")
        f.write(f"--   - Business Cases: {len(self.business_cases)}\n")
        f.write(f"--   - Conflicts Resolved: {len(self.conflicts_resolved)}\n")
        f.write(f"--   - Missing Years Filled: {len(self.missing_years_filled)}\n")
        f.write("-- " + "=" * 76 + "\n\n")
        f.write("BEGIN;\n\n")
    
    def _write_sql_footer(self, f):
        """Write SQL file footer"""
        f.write("\nCOMMIT;\n")
    
    def _write_base_code_registry_sql(self, f):
        """Write base code registry INSERT statements"""
        f.write("-- " + "=" * 76 + "\n")
        f.write("-- SECTION 1: Base Code Registry\n")
        f.write("-- " + "=" * 76 + "\n\n")
        
        for base_code in sorted(self.base_code_registry.keys()):
            next_variant = self.base_code_registry[base_code]
            f.write(f"-- Base Code: {base_code}, Next Variant: {next_variant:02d}\n")
            f.write("INSERT INTO base_code_registry (\n")
            f.write("  base_code, active_signature, description, next_variant_number\n")
            f.write(") VALUES (\n")
            f.write(f"  '{base_code}',\n")
            f.write(f"  'IMPORT:{base_code}',\n")
            f.write(f"  'UUID-based import',\n")
            f.write(f"  {next_variant}\n")
            f.write(")\n")
            f.write("ON CONFLICT (base_code) DO UPDATE SET\n")
            f.write("  next_variant_number = GREATEST(\n")
            f.write("    base_code_registry.next_variant_number,\n")
            f.write("    EXCLUDED.next_variant_number\n")
            f.write("  );\n\n")
    
    def _write_formulations_sql(self, f):
        """Write formulation INSERT statements"""
        f.write("-- " + "=" * 76 + "\n")
        f.write("-- SECTION 2: Formulations\n")
        f.write("-- " + "=" * 76 + "\n\n")
        
        for formulation in self.formulations:
            f.write(f"-- CSV Index: {formulation.csv_index}\n")
            if formulation.csv_index in self.duplicate_indexes:
                dup_list = ", ".join(self.duplicate_indexes[formulation.csv_index])
                f.write(f"-- Duplicate Indexes: {dup_list}\n")
            f.write(f"-- Code: {formulation.formulation_code}\n")
            if formulation.conflict_resolved:
                f.write(f"-- Note: Conflict resolved via variant incrementing\n")
            
            name_escaped = formulation.formulation_name.replace("'", "''")
            f.write("INSERT INTO formulations (\n")
            f.write("  base_code, variant_suffix, formulation_code,\n")
            f.write("  formulation_name, formulation_category, formulation_type,\n")
            f.write("  uom, formulation_status, formulation_readiness,\n")
            f.write("  is_active, created_by\n")
            f.write(") VALUES (\n")
            f.write(f"  '{formulation.base_code}',\n")
            f.write(f"  '{formulation.variant_suffix}',\n")
            f.write(f"  '{formulation.formulation_code}',\n")
            f.write(f"  '{name_escaped}',\n")
            f.write(f"  '{formulation.formulation_category}',\n")
            f.write(f"  '{formulation.formulation_type}',\n")
            f.write(f"  '{formulation.uom}',\n")
            f.write(f"  '{formulation.formulation_status}',\n")
            f.write(f"  'Nominated for Review',\n")
            f.write(f"  true,\n")
            f.write(f"  'UUID Import Script'\n")
            f.write(")\n")
            f.write("ON CONFLICT (formulation_code) DO UPDATE SET\n")
            f.write("  formulation_status = EXCLUDED.formulation_status;\n\n")
    
    def _write_formulation_ingredients_sql(self, f):
        """Write formulation ingredients junction table"""
        f.write("-- " + "=" * 76 + "\n")
        f.write("-- SECTION 3: Formulation Ingredients Junction\n")
        f.write("-- " + "=" * 76 + "\n\n")
        
        for formulation in self.formulations:
            for ingredient in formulation.ingredients:
                f.write(f"-- {formulation.formulation_code}: {ingredient.ingredient_name}\n")
                f.write("INSERT INTO formulation_ingredients (\n")
                f.write("  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role\n")
                f.write(") SELECT\n")
                f.write(f"  (SELECT formulation_id FROM formulations WHERE formulation_code = '{formulation.formulation_code}'),\n")
                f.write(f"  '{ingredient.ingredient_id}'::uuid,\n")
                f.write(f"  {ingredient.concentration},\n")
                f.write(f"  '{ingredient.unit}',\n")
                f.write(f"  '{ingredient.ingredient_type}'\n")
                f.write("ON CONFLICT DO NOTHING;\n\n")
    
    def _write_formulation_country_sql(self, f):
        """Write formulation_country entries"""
        f.write("-- " + "=" * 76 + "\n")
        f.write("-- SECTION 4: Formulation-Country Relationships\n")
        f.write("-- " + "=" * 76 + "\n\n")
        
        for fc in self.formulation_countries:
            f.write(f"-- {fc['formulation_code']} - {fc['country_code']}\n")
            f.write("INSERT INTO formulation_country (\n")
            f.write("  formulation_id, country_id, country_status, country_readiness, is_active\n")
            f.write(") SELECT\n")
            f.write(f"  (SELECT formulation_id FROM formulations WHERE formulation_code = '{fc['formulation_code']}'),\n")
            f.write(f"  '{fc['country_uuid']}'::uuid,\n")
            f.write(f"  '{fc['country_status']}',\n")
            f.write(f"  'Nominated for Review',\n")
            f.write(f"  true\n")
            f.write("ON CONFLICT DO NOTHING;\n\n")
    
    def _write_use_groups_sql(self, f):
        """Write use group entries"""
        f.write("-- " + "=" * 76 + "\n")
        f.write("-- SECTION 5: Primary Use Groups\n")
        f.write("-- " + "=" * 76 + "\n\n")
        
        # Group business cases by formulation_code + country
        fc_groups = defaultdict(list)
        for bc in self.business_cases:
            index = bc['index']
            country = bc['country']
            
            # Find formulation code for this index
            formulation_code = None
            for formulation in self.formulations:
                if formulation.csv_index == index:
                    formulation_code = formulation.formulation_code
                    break
            
            if formulation_code:
                key = f"{formulation_code}|{country}"
                fc_groups[key].append(bc)
        
        f.write("-- Create primary use groups for each formulation-country\n")
        for fc_key, bcs in fc_groups.items():
            formulation_code, country = fc_key.split('|')
            
            # Get earliest TME from business cases
            tme_fy = bcs[0]['effective_start_fiscal_year']
            
            f.write(f"\n-- Primary Use Group: {formulation_code} - {country}\n")
            f.write("INSERT INTO formulation_country_use_group (\n")
            f.write("  formulation_country_id, use_group_variant, use_group_name,\n")
            f.write("  use_group_status, target_market_entry_fy, is_primary\n")
            f.write(") SELECT\n")
            f.write("  fc.formulation_country_id,\n")
            f.write("  '001',\n")
            f.write("  'Primary Use Group',\n")
            f.write("  'Active',\n")
            f.write(f"  '{tme_fy}',\n")
            f.write("  true\n")
            f.write("FROM formulation_country fc\n")
            f.write("JOIN formulations f ON f.formulation_id = fc.formulation_id\n")
            f.write("JOIN countries c ON c.country_id = fc.country_id\n")
            f.write(f"WHERE f.formulation_code = '{formulation_code}'\n")
            f.write(f"  AND c.country_code = '{country}'\n")
            f.write("ON CONFLICT DO NOTHING;\n")
        
        # Create index-specific use groups
        f.write("\n-- " + "=" * 76 + "\n")
        f.write("-- SECTION 6: Index-Specific Use Groups\n")
        f.write("-- " + "=" * 76 + "\n\n")
        
        variant_counter = defaultdict(int)
        
        for index, mapping in self.duplicates_mapping.items():
            if mapping['is_use_group']:
                # Find business cases for this index
                index_bcs = [bc for bc in self.business_cases if bc['index'] == index]
                
                if not index_bcs:
                    continue
                
                # Find formulation code
                formulation_code = None
                for formulation in self.formulations:
                    if formulation.csv_index == index:
                        formulation_code = formulation.formulation_code
                        break
                
                if not formulation_code:
                    continue
                
                # Group by country
                country_groups = defaultdict(list)
                for bc in index_bcs:
                    country_groups[bc['country']].append(bc)
                
                for country, bcs in country_groups.items():
                    key = f"{formulation_code}|{country}"
                    variant_counter[key] += 1
                    variant = f"{variant_counter[key] + 1:03d}"
                    
                    tme_fy = bcs[0]['effective_start_fiscal_year']
                    
                    f.write(f"\n-- Index-Specific Use Group: {formulation_code} - {country} - Index {index}\n")
                    f.write("INSERT INTO formulation_country_use_group (\n")
                    f.write("  formulation_country_id, use_group_variant, use_group_name,\n")
                    f.write("  use_group_status, target_market_entry_fy, is_primary\n")
                    f.write(") SELECT\n")
                    f.write("  fc.formulation_country_id,\n")
                    f.write(f"  '{variant}',\n")
                    f.write(f"  'Index {index}',\n")
                    f.write("  'Active',\n")
                    f.write(f"  '{tme_fy}',\n")
                    f.write("  false\n")
                    f.write("FROM formulation_country fc\n")
                    f.write("JOIN formulations f ON f.formulation_id = fc.formulation_id\n")
                    f.write("JOIN countries c ON c.country_id = fc.country_id\n")
                    f.write(f"WHERE f.formulation_code = '{formulation_code}'\n")
                    f.write(f"  AND c.country_code = '{country}'\n")
                    f.write("ON CONFLICT DO NOTHING;\n")
    
    def _write_business_cases_sql(self, f):
        """Write business case entries"""
        f.write("-- " + "=" * 76 + "\n")
        f.write("-- SECTION 7: Business Cases (with Missing Year Handling)\n")
        f.write("-- " + "=" * 76 + "\n\n")
        
        # Group by business_case_group_id
        bc_by_group = defaultdict(list)
        for bc in self.business_cases:
            bc_by_group[bc['business_case_group_id']].append(bc)
        
        for group_id, cases in bc_by_group.items():
            # Get index and country from first case
            first = cases[0]
            f.write(f"-- Business Case Group: Index {first['index']}, Country {first['country']}\n")
            f.write(f"-- Group ID: {group_id}\n")
            
            for bc in sorted(cases, key=lambda x: x['year_offset']):
                f.write(f"-- Year {bc['year_offset']}\n")
                f.write("INSERT INTO business_case (\n")
                f.write("  business_case_group_id, year_offset,\n")
                f.write("  volume, nsp, cogs_per_unit,\n")
                f.write("  effective_start_fiscal_year, status, created_by\n")
                f.write(") VALUES (\n")
                f.write(f"  '{bc['business_case_group_id']}'::uuid,\n")
                f.write(f"  {bc['year_offset']},\n")
                f.write(f"  {bc['volume']},\n")
                f.write(f"  {bc['nsp']},\n")
                f.write(f"  {bc['cogs_per_unit']},\n")
                f.write(f"  '{bc['effective_start_fiscal_year']}',\n")
                f.write(f"  '{bc['status']}',\n")
                f.write(f"  'UUID Import Script'\n")
                f.write(");\n\n")
            f.write("\n")
    
    def _write_business_case_junction_sql(self, f):
        """Write business case junction entries"""
        f.write("-- " + "=" * 76 + "\n")
        f.write("-- SECTION 8: Business Case-Use Group Junction\n")
        f.write("-- " + "=" * 76 + "\n\n")
        
        # Group business cases by index + country
        index_country_groups = defaultdict(list)
        for bc in self.business_cases:
            key = f"{bc['index']}|{bc['country']}"
            index_country_groups[key].append(bc)
        
        f.write("-- Link business cases to their use groups\n")
        for key, bcs in index_country_groups.items():
            index, country = key.split('|')
            
            # Find formulation code for this index
            formulation_code = None
            for formulation in self.formulations:
                if formulation.csv_index == index:
                    formulation_code = formulation.formulation_code
                    break
            
            if not formulation_code:
                continue
            
            # Determine if this is a specific use group or primary
            is_specific_use_group = False
            if index in self.duplicates_mapping:
                is_specific_use_group = self.duplicates_mapping[index]['is_use_group']
            
            # Generate junction entries
            business_case_group_id = bcs[0]['business_case_group_id']
            
            if is_specific_use_group:
                use_group_name = f"'Index {index}'"
                is_primary_filter = "false"
            else:
                use_group_name = "'Primary Use Group'"
                is_primary_filter = "true"
            
            f.write(f"\n-- Junction: Index {index}, Country {country} → {formulation_code}\n")
            f.write("-- Link all business cases from this group to the appropriate use group\n")
            f.write("INSERT INTO business_case_use_groups (\n")
            f.write("  business_case_id, formulation_country_use_group_id\n")
            f.write(") SELECT\n")
            f.write("  bc.business_case_id,\n")
            f.write("  fcug.formulation_country_use_group_id\n")
            f.write("FROM business_case bc\n")
            f.write("JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (\n")
            f.write("  SELECT fc.formulation_country_id\n")
            f.write("  FROM formulation_country fc\n")
            f.write("  JOIN formulations f ON f.formulation_id = fc.formulation_id\n")
            f.write("  JOIN countries c ON c.country_id = fc.country_id\n")
            f.write(f"  WHERE f.formulation_code = '{formulation_code}'\n")
            f.write(f"    AND c.country_code = '{country}'\n")
            f.write(")\n")
            if is_specific_use_group:
                f.write(f"  AND fcug.use_group_name = {use_group_name}\n")
            else:
                f.write(f"  AND fcug.is_primary = {is_primary_filter}\n")
            f.write(f"WHERE bc.business_case_group_id = '{business_case_group_id}'::uuid\n")
            f.write("ON CONFLICT DO NOTHING;\n")
    
    def _split_sql_into_files(self):
        """Split SQL into 3-4 roughly equal files"""
        if not hasattr(self, '_temp_sql_file'):
            self.log("No temp SQL file to split", "ERROR")
            return
        
        # Read the complete SQL
        with open(self._temp_sql_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.split('\n')
        
        # Find section headers (natural split points)
        sections = []
        current_section = []
        current_section_name = "header"
        
        for i, line in enumerate(lines):
            if line.startswith('-- SECTION'):
                if current_section:
                    sections.append({
                        'name': current_section_name,
                        'content': '\n'.join(current_section)
                    })
                current_section = [line]
                current_section_name = line
            else:
                current_section.append(line)
        
        if current_section:
            sections.append({
                'name': current_section_name,
                'content': '\n'.join(current_section)
            })
        
        # Calculate target file count (3-4 files)
        total_size = sum(len(s['content']) for s in sections)
        target_size = total_size / 3.5  # Aim for ~3-4 files
        
        self.log(f"Total SQL size: {total_size / 1024 / 1024:.2f} MB")
        self.log(f"Target size per file: {target_size / 1024 / 1024:.2f} MB")
        self.log(f"Sections found: {len(sections)}")
        
        # Group sections into files
        files = []
        current_file = []
        current_size = 0
        
        for section in sections[1:]:  # Skip BEGIN/header
            if current_size > 0 and current_size + len(section['content']) > target_size:
                files.append(current_file)
                current_file = [section]
                current_size = len(section['content'])
            else:
                current_file.append(section)
                current_size += len(section['content'])
        
        if current_file:
            files.append(current_file)
        
        self.log(f"Splitting into {len(files)} files")
        
        # Write split files with proper wrapping
        for i, file_sections in enumerate(files, 1):
            filename = f"{SQL_OUTPUT_BASE}{i}.sql"
            with open(filename, 'w', encoding='utf-8') as f:
                f.write("-- " + "=" * 76 + "\n")
                f.write(f"-- UUID-BASED FORMULATION IMPORT - PART {i} of {len(files)}\n")
                f.write("-- " + "=" * 76 + "\n\n")
                f.write("BEGIN;\n\n")
                
                for section in file_sections:
                    f.write(section['content'])
                    f.write("\n\n")
                
                f.write("\nCOMMIT;\n")
            
            file_size = os.path.getsize(filename) / 1024 / 1024
            self.log(f"Created {filename} ({file_size:.2f} MB)")
        
        # Clean up temp file
        try:
            os.remove(self._temp_sql_file)
            self.log(f"Removed temporary file: {self._temp_sql_file}")
        except:
            pass
    
    def _write_log_file(self):
        """Write log file"""
        with open(LOG_OUTPUT, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("UUID-BASED IMPORT LOG\n")
            f.write("=" * 80 + "\n\n")
            
            f.write("SUMMARY\n")
            f.write("-" * 80 + "\n")
            f.write(f"Formulations processed: {len(self.formulations)}\n")
            f.write(f"Formulation-Countries: {len(self.formulation_countries)}\n")
            f.write(f"Business Cases: {len(self.business_cases)}\n")
            f.write(f"Duplicates consolidated: {len(self.duplicate_indexes)}\n")
            f.write(f"Conflicts resolved: {len(self.conflicts_resolved)}\n")
            f.write(f"Missing years filled: {len(self.missing_years_filled)}\n")
            f.write(f"Errors: {len(self.errors)}\n\n")
            
            if self.duplicate_indexes:
                f.write("DUPLICATES CONSOLIDATED\n")
                f.write("-" * 80 + "\n")
                for kept_idx, dup_list in self.duplicate_indexes.items():
                    f.write(f"Kept Index {kept_idx}, Duplicates: {', '.join(dup_list)}\n")
                f.write("\n")
            
            if self.conflicts_resolved:
                f.write("CONFLICTS RESOLVED\n")
                f.write("-" * 80 + "\n")
                for conflict in self.conflicts_resolved:
                    f.write(f"Index {conflict['csv_index']}: {conflict['original_code']} → {conflict['resolved_code']}\n")
                    f.write(f"  Reason: {conflict['reason']}\n\n")
            
            if self.missing_years_filled:
                f.write("\nMISSING YEARS FILLED WITH ZEROS\n")
                f.write("-" * 80 + "\n")
                for entry in self.missing_years_filled:
                    f.write(f"Index {entry['index']}, Country {entry['country']}: Years {entry['missing_years']}\n")
            
            if self.errors:
                f.write("\nERRORS\n")
                f.write("-" * 80 + "\n")
                for error in self.errors:
                    f.write(f"{error}\n")
            
            f.write("\n\nDETAILED LOG\n")
            f.write("-" * 80 + "\n")
            for entry in self.log_entries:
                f.write(f"{entry}\n")
        
        self.log(f"Log file generated: {LOG_OUTPUT}")
    
    def _write_summary_csv(self):
        """Write summary CSV"""
        with open(SUMMARY_OUTPUT, 'w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['Metric', 'Count'])
            writer.writerow(['Formulations', len(self.formulations)])
            writer.writerow(['Formulation-Countries', len(self.formulation_countries)])
            writer.writerow(['Business Cases', len(self.business_cases)])
            writer.writerow(['Duplicates Consolidated', len(self.duplicate_indexes)])
            writer.writerow(['Conflicts Resolved', len(self.conflicts_resolved)])
            writer.writerow(['Missing Years Filled', sum(len(e['missing_years']) for e in self.missing_years_filled)])
            writer.writerow(['Errors', len(self.errors)])
        
        self.log(f"Summary CSV generated: {SUMMARY_OUTPUT}")


def main():
    """Main entry point"""
    importer = UUIDBasedImporter()
    return importer.run()


if __name__ == "__main__":
    exit(main())

