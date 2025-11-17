#!/usr/bin/env python3
"""
Import Formulations from CSV
Processes Master List CSV, validates ingredients, generates formulation names,
and produces SQL INSERT statements for formulations and formulation_ingredients tables.
"""

import csv
import re
from typing import Dict, List, Tuple, Optional, Set
from dataclasses import dataclass
from pathlib import Path


@dataclass
class Ingredient:
    """Represents an ingredient with its database info"""
    ingredient_id: str
    ingredient_name: str
    ingredient_type: str


@dataclass
class FormulationIngredient:
    """Represents an ingredient within a formulation"""
    ingredient: Ingredient
    concentration: float
    unit: str


@dataclass
class Formulation:
    """Represents a complete formulation"""
    csv_index: str
    formulation_name: str
    category: str
    formulation_type: str
    uom: str
    status: str
    ingredients: List[FormulationIngredient]
    signature: str


# Database ingredients - from the query result
DATABASE_INGREDIENTS = [
    ("bd0444f8-e0e9-4cce-9ef5-4647b4cb51bc", "Acetamiprid", "Active"),
    ("818bb8e6-b627-45f3-98a5-640105eb15a0", "Aclonifen", "Active"),
    ("f2e49b3a-e4ce-40f0-a0d7-9c1b374a6b75", "Ametoctradin", "Active"),
    ("5b58c9e4-193c-4089-a5c4-1d288d3f3b94", "Amidosulfuron", "Active"),
    ("7915b14e-5f52-4013-a288-4df3aefdd816", "Aminopyralid", "Active"),
    ("b8ddd902-b246-41b4-9a66-f4a1d077dff2", "Atrazine", "Active"),
    ("4f00cf7a-14ab-4477-af1c-eda25340d1e5", "Azoxystrobin", "Active"),
    ("23089b1d-3c1f-43b9-ae6f-662609ba936b", "Benoxacor", "Safener"),
    ("15a13ab2-63e3-4a11-9eab-d8ebec0a64a7", "Bentazone", "Active"),
    ("e7beddc5-9fc6-45dc-9179-738ab24d1308", "Benzovindiflupyr", "Active"),
    ("b61edfe9-5af7-4533-add7-170c4a1118e5", "Bicyclopyrone", "Active"),
    ("9781b269-21e0-430a-b2c8-a515bb0514da", "Bixafen", "Active"),
    ("1699d37f-19e0-4e56-9dc6-4016096af316", "Boscalid", "Active"),
    ("6c0a662f-11a5-44ea-b3a6-e57b6cd389ee", "Bromoxynil", "Active"),
    ("0860a6fa-194d-41ab-bc73-41781dddf76a", "Captan", "Active"),
    ("6972bad1-63d4-40aa-8edc-d92e59d3bcd2", "Carfentrazone", "Active"),
    ("20b6285a-1365-43ef-9748-410d36967076", "Chlorantraniliprole", "Active"),
    ("c90b0ea9-0ef2-427e-95b3-5d9cc6a7d222", "Chlormequat", "Active"),
    ("a2f1a0c2-df17-4627-9994-c6b4747df55b", "Chlorotoluron", "Active"),
    ("3fc1b231-63a7-4006-9d23-826fab5adf36", "Cinmethylin", "Active"),
    ("ee4287af-e979-4dbc-b721-ba2234d92bef", "Clethodim", "Active"),
    ("6f820927-42a2-491b-b3ba-f49c344ad6a9", "Clodinafop", "Active"),
    ("9afa3649-8ecd-4d76-a2cb-8f66efd8e0ac", "Clodinafop propargyl", "Active"),
    ("e43b4ef6-1234-4f2c-b1ac-713c8db1e1b1", "Clomazone", "Active"),
    ("630f9d08-95b3-48e0-9d00-4941af8f301a", "Clopyralid", "Active"),
    ("e4c5c900-3413-4e53-9862-8800c74dd2d2", "Cloquintocet", "Safener"),
    ("d3c0e9ae-0e84-4893-878a-60658dc1d334", "Copper sulphate", "Active"),
    ("fca06541-3f84-4fa5-a4ef-fd1bca92a75a", "Cyantraniliprole", "Active"),
    ("aae34925-c0d7-4384-a1fb-3b6578af2a2c", "Cyazofamid", "Active"),
    ("6d43ae8d-1a7f-4365-a98d-77852e4e406a", "Cycloxydim", "Active"),
    ("1d8cedd8-dc35-40bd-ae70-a1f47b2e7e1d", "Cyflufenamid", "Active"),
    ("29cb66c8-d34b-4570-918a-40520fa47142", "Cymoxanil", "Active"),
    ("f6024aa3-0754-4cbf-9d09-48acfad48713", "Cypermethrin", "Active"),
    ("66928dd2-6dc4-433a-b9e0-ddf087536ab2", "Cyproconazole", "Active"),
    ("396ee3f9-d38a-4778-ad1a-e85743356da7", "Cyprodinil", "Active"),
    ("480722ed-08cd-4542-abd5-c629197b2edf", "Cyprosulfamide", "Safener"),
    ("a673f9d3-0f28-4378-b3e1-575f9eb4f08e", "Deltamethrin", "Active"),
    ("c99ddd26-0878-49ad-9357-8e370c67555c", "Dicamba", "Active"),
    ("3b8b9929-dedd-4601-84e7-488fdbf4d65c", "Difenoconazole", "Active"),
    ("d58d7788-f5d0-4bd7-bd70-e207abd35831", "Diflufenican", "Active"),
    ("cffbdbec-8348-4d5c-a3ef-da22dadacb73", "Dimethachlor", "Active"),
    ("42917df7-9e10-4401-997a-4879e7065352", "Dimethenamid", "Active"),
    ("9852633d-4b22-4eea-b2b0-17819f19de7d", "Dimethenamid-P", "Active"),
    ("66d7bebe-6718-4a7f-8189-728119129fa3", "Diquat", "Active"),
    ("278549da-12f1-48f8-9130-04caafceff66", "Disodium phosphonate", "Active"),
    ("ff225e89-718f-4a70-b5d1-8ef9396d9e02", "Dithianon", "Active"),
    ("9c14ae60-e267-4bc0-96ed-bec46d95fb1a", "Dodine", "Active"),
    ("db4b5380-683e-41f8-b6a0-a4117a8ff7ec", "Esfenvalerate", "Active"),
    ("f783d0d4-001f-4d31-9cbe-a61e051f2eed", "Ethofumesate", "Active"),
    ("e48bf033-1a63-4936-98c0-311119d50b1b", "Etofenprox", "Active"),
    ("bb8f1a50-d1c7-4f21-914d-543701e7f7e4", "Fenhexamid", "Active"),
    ("705c9ba6-d942-48cf-8b0f-f4797da8134a", "Fenpicoxamid", "Active"),
    ("6cef5dd7-7e8d-46bb-ae9a-1c1bd45ebc40", "Fenpropidin", "Active"),
    ("5023ce6d-98e8-48e4-85cf-75a7671cf1f4", "Flazasulfuron", "Active"),
    ("05a03882-4337-48fd-8cee-9dde5338230f", "Flonicamid", "Active"),
    ("489a7d94-f6a5-42fa-9444-aa2c71e51b9f", "Florasulam", "Active"),
    ("30a8d6b4-19d3-4c59-b180-fdd0e0d91371", "Fludioxonil", "Active"),
    ("edcc8291-34b7-4157-ab3e-6f6ab2f985c8", "Flufenacet", "Active"),
    ("1d53d40f-7aae-4d35-beb4-317b6d27441d", "Flumioxazin", "Active"),
    ("2b7f769f-2bdc-4d0b-8a0c-4b0a0f1ce51d", "Fluopicolide", "Active"),
    ("a7ec824e-1f0b-4fea-ad47-a82f9bd38955", "Fluopyram", "Active"),
    ("76788e79-53b0-4f1f-8a80-4bbe182d62b4", "Fluoxastrobin", "Active"),
    ("0428c48f-8067-479e-a33d-c0668263d7f3", "Flupyradifurone", "Active"),
    ("84a2678b-aeb3-49c9-81b3-e729e82b04a5", "Flurochloridone", "Active"),
    ("07892d42-c2d3-41dc-8af4-ff69aac59c96", "Fluroxypyr", "Active"),
    ("c5a091d7-9c9b-4175-872b-2330b4f20141", "Fluthiacet", "Active"),
    ("0cb476c9-d32c-4631-af23-bb5029c7d3be", "Fluxapyroxad", "Active"),
    ("7810e2ee-4b8b-4e91-9d53-ee0fa3a4cb97", "Folpet", "Active"),
    ("286f10dc-bdc4-448c-a8ea-fabdab5dd558", "Foramsulfuron", "Active"),
    ("7f2cd542-94cc-4e83-8347-83ca95e47738", "Fosetyl", "Active"),
    ("5c5eb593-aab5-4b6a-9c51-57e9c50f9dae", "Glufosinate", "Active"),
    ("2a27887f-7e5d-4b1f-b592-a85071efb58c", "Glyphosate", "Active"),
    ("a99180b1-5768-4474-92db-03777888cf55", "Halauxifen", "Active"),
    ("72970088-075e-4fe0-92f1-9d9837ca148a", "Imazamox", "Active"),
    ("314bde9f-856f-4ad4-8c6e-2c9c029e35ee", "Imidacloprid", "Active"),
    ("3cbd6d33-8f02-48d5-a642-6c073205e032", "Indaziflam", "Active"),
    ("a11d05cb-c711-4579-b674-7edeaf7ffb57", "Iodosulfuron", "Active"),
    ("7b3d3298-9f3e-4b81-b50a-c5140e761b87", "Isofetamid", "Active"),
    ("7c1f52a8-771c-45a3-b99b-86ad7d2a8b92", "Isoxadifen-ethyl", "Safener"),
    ("ef6c5334-49ea-4c63-b2a7-8af3e3329458", "Isoxaflutole", "Active"),
    ("504d01b0-b1b9-4248-9c3e-f0051a45062f", "Kresoxim-methyl", "Active"),
    ("4f07d388-fa26-4462-93f6-8a51f9acd3b9", "Lambda-cyhalothrin", "Active"),
    ("75b2198c-c3f5-4e14-b78b-11ee706f0615", "Mandipropamid", "Active"),
    ("8550d3e9-e9a0-4055-8592-d93dec137533", "Mefentrifluconazole", "Active"),
    ("0b26e330-3865-48e9-8525-5481452c999c", "Mepanipyrim", "Active"),
    ("3cea474f-db8e-412a-86a3-ff634a34b92c", "Mepiquat", "Active"),
    ("c5101c57-c9c1-43a9-8af8-f93b10848392", "Mepiquat chloride", "Active"),
    ("1741b0b3-b0a0-4944-9974-6bb09f761814", "Meptyldinocap", "Active"),
    ("9701cb5b-7bef-4e02-a1ea-7a929c8083b1", "Mesosulfuron", "Active"),
    ("fe2a04a3-8469-426e-8842-3f6742c6bcaa", "Mesotrione", "Active"),
    ("6b59e2b6-b25a-4d5b-9569-224c4f9388a3", "Metalaxyl", "Active"),
    ("40aa22e2-e926-44ba-9feb-fbdcbb43189f", "Metalaxyl-M", "Active"),
    ("b3d240c5-7602-4531-9dfb-f1979d8d97cf", "Metazachlor", "Active"),
    ("6a8f73f7-0deb-4eff-b924-a24576c219f1", "Metconazole", "Active"),
    ("86ad7181-f77a-449e-82bf-ab9f2a2dbee5", "Metobromuron", "Active"),
    ("935650ff-24aa-4c45-92ac-a340a0328473", "Metrafenone", "Active"),
    ("52b88db8-1fe1-4264-89df-3a8ffacb8e06", "Metsulfuron-methyl", "Active"),
    ("c59b578b-bba8-45cb-a415-40fb139a04ef", "Napropamide", "Active"),
    ("9e78d0d1-ff72-4cab-969f-649d2eb636e2", "Nicosulfuron", "Active"),
    ("67581231-e42a-4888-8f87-408b9ef7e5e7", "Oxyfluorfen", "Active"),
    ("66ec4ab4-12a5-4b09-bd13-9f4f5841220a", "Penconazole", "Active"),
    ("42de83a4-df37-41cf-b832-b944e0993505", "Pendimethalin", "Active"),
    ("7c35060d-4dc8-4f33-9d94-7b2c6a464256", "Penoxsulam", "Active"),
    ("227abaff-0b2e-4e8e-850d-26879819b4f8", "Picloram", "Active"),
    ("7ce1eb99-6995-4ba0-a3cd-42ef9413721f", "Picolinafen", "Active"),
    ("53bae9bc-b0c6-46e0-8939-67c66d64f877", "Picoxystrobin", "Active"),
    ("f5b0fe53-e8a8-41b9-8e66-e6264a04a715", "Pinoxaden", "Active"),
    ("f48832e8-6263-4579-9a96-2f54f16e3ee5", "Pirimicarb", "Active"),
    ("8271a019-efdc-403f-ad45-de98083b068d", "Potassium phosphonates", "Active"),
    ("95fd1a41-154f-4afd-b36c-1318df661731", "Prohexadione", "Active"),
    ("2c83bb38-406e-4e0f-8295-a0212e2b2d33", "Propamocarb", "Active"),
    ("ed81d28f-0c98-4dae-ab90-9716c7bfac60", "Propiconazole", "Active"),
    ("a63004d5-b807-40a7-bd10-c266a0fcf22c", "Propoxycarbazone", "Active"),
    ("1c67c757-7c03-4e5b-b17f-0ebc847c2903", "Propyzamide", "Active"),
    ("47c064f3-6847-4d6e-b058-2a1542f0502c", "Proquinazid", "Active"),
    ("fda50e3a-36b0-421c-9d7b-e814bce44dec", "Prosulfocarb", "Active"),
    ("a270b6bc-e953-4706-a550-5b53ced3a954", "Prosulfuron", "Active"),
    ("19978257-1d2c-425a-812c-07dc9973411d", "Prothioconazole", "Active"),
    ("d3724d81-2f7a-423a-9ee7-ebf97ad5b649", "Pyraclostrobin", "Active"),
    ("044d74b1-a365-471f-92d1-0940e8ef16fd", "Pyrasulfotole", "Active"),
    ("3068e614-882c-4ca0-9ad4-8473351a3107", "Pyriproxyfen", "Active"),
    ("f1dc8830-7acd-4755-bc4e-45b095209779", "Pyroxasulfone", "Active"),
    ("0c0825a2-13e8-4fda-a681-87d81e14f146", "Pyroxsulam", "Active"),
    ("b4d6d883-7d37-4ae7-90f0-c6e7a92bc968", "Quinmerac", "Active"),
    ("48881cb0-4749-41fa-ab86-39b6f06515e8", "Quizalofop-P-ethyl", "Active"),
    ("080365a1-e9d0-4ea5-9259-e5f00f4e0fe0", "Rimsulfuron", "Active"),
    ("15ec5df4-9041-4806-8b96-df5e67aebdae", "S-metolachlor", "Active"),
    ("30419b8e-08a7-4b3e-90a1-869af62d7dd6", "Silthiofam", "Active"),
    ("147683fc-6315-42d2-bff6-1d03e9197ea9", "Spirotetramat", "Active"),
    ("8f3748bb-fd44-4d33-9cee-ae5f1cbbebd1", "Spiroxamine", "Active"),
    ("2a19bac8-b2a2-4467-bf06-321328dc09e0", "Sulfentrazone", "Active"),
    ("f5f924c7-904e-4651-bd24-2a3f4ed20bde", "Tau-fluvalinate", "Active"),
    ("2195d777-b1a2-436a-8c10-97be175b7f72", "Tebuconazole", "Active"),
    ("4cdab078-db23-4a03-9a50-c8ff8542f5c9", "Tefluthrin", "Active"),
    ("a6652a19-493f-42f2-afd1-376421affd41", "Tembotrione", "Active"),
    ("a769eed8-427e-4537-a1ed-c34e1a13ba00", "Terbuthylazine", "Active"),
    ("73bcaaa9-073c-4721-86be-8d521684b1ad", "Tetraconazole", "Active"),
    ("d43242e6-2b99-4664-846f-e4be4d13ddb5", "Thiamethoxam", "Active"),
    ("83a72b1c-fc6e-491f-bee3-fc11c2adfdb4", "Thiencarbazone", "Active"),
    ("42e64124-eb75-4a56-84a5-96136f7e4472", "Thiencarbazone-methyl", "Active"),
    ("5aa8f37d-cbf2-42e1-a299-fd9e4dd8055c", "Tri-allate", "Active"),
    ("e672d74f-c0f6-456a-8212-ff0e936923bf", "Tribenuron-methyl", "Active"),
    ("339620e9-027f-4b1e-89e3-91a197850f19", "Triclopyr", "Active"),
    ("72e99c13-8f24-4188-a040-4d329f94aa15", "Trifloxystrobin", "Active"),
    ("4853f40a-e1c0-4471-86aa-c48c8f494034", "Triflusulfuron", "Active"),
    ("56d6f543-313f-4bc6-9d89-49e31a1746ec", "Trinexapac-ethyl", "Active"),
    ("5e3429fe-8279-4292-838a-5a0ab7bc0936", "Zoxamide", "Active"),
]


class FormulationImporter:
    """Handles the import of formulations from CSV"""
    
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.ingredient_lookup: Dict[str, Ingredient] = {}
        self.missing_ingredients: Set[str] = set()
        self.formulations: List[Formulation] = []
        self.duplicates: List[Tuple[str, str]] = []
        self.skipped_rows: List[Tuple[int, str]] = []
        self.signatures_seen: Dict[str, str] = {}  # signature -> csv_index
        
        self._build_ingredient_lookup()
    
    def _build_ingredient_lookup(self):
        """Build case-insensitive ingredient lookup from database data"""
        for ing_id, ing_name, ing_type in DATABASE_INGREDIENTS:
            ingredient = Ingredient(ing_id, ing_name, ing_type)
            # Store with lowercase key for case-insensitive lookup
            self.ingredient_lookup[ing_name.lower()] = ingredient
    
    def _clean_ingredient_name(self, name: str) -> str:
        """Clean ingredient name by removing special characters"""
        if not name:
            return ""
        
        # Remove trailing ? and * 
        name = name.strip()
        name = re.sub(r'[?*]+$', '', name)
        
        # Handle safeners in parentheses - e.g., "Cyprosulfamide(S)" -> "Cyprosulfamide"
        name = re.sub(r'\([A-Z]\)$', '', name)
        
        return name.strip()
    
    def _find_ingredient(self, name: str) -> Optional[Ingredient]:
        """Find ingredient in database, return None if not found"""
        if not name:
            return None
        
        cleaned = self._clean_ingredient_name(name)
        if not cleaned:
            return None
        
        # Try exact match first (case-insensitive)
        ingredient = self.ingredient_lookup.get(cleaned.lower())
        if ingredient:
            return ingredient
        
        # Mark as missing
        self.missing_ingredients.add(name)
        return None
    
    def _format_concentration(self, value: float, unit: str) -> str:
        """Format concentration value for display in formulation name"""
        # Remove trailing zeros and decimal point if not needed
        if value == int(value):
            return str(int(value))
        else:
            return str(value).rstrip('0').rstrip('.')
    
    def _generate_formulation_name(self, ingredients: List[FormulationIngredient], 
                                   formulation_type: str) -> str:
        """Generate formulation name from active ingredients"""
        # Filter only active ingredients
        active_ings = [ing for ing in ingredients if ing.ingredient.ingredient_type == "Active"]
        
        if not active_ings:
            return ""
        
        # Sort alphabetically by ingredient name
        active_ings.sort(key=lambda x: x.ingredient.ingredient_name)
        
        # Build name components
        names = [ing.ingredient.ingredient_name for ing in active_ings]
        concentrations = [self._format_concentration(ing.concentration, ing.unit) 
                         for ing in active_ings]
        
        # Join: "Ingredient1/Ingredient2 Conc1 Conc2 FormulationType"
        name_part = "/".join(names)
        conc_part = " ".join(concentrations)
        
        parts = [name_part, conc_part]
        if formulation_type:
            parts.append(formulation_type)
        
        return " ".join(parts)
    
    def _generate_signature(self, ingredients: List[FormulationIngredient],
                           formulation_type: str) -> str:
        """Generate unique signature for duplicate detection"""
        # Use only active ingredients
        active_ings = [ing for ing in ingredients if ing.ingredient.ingredient_type == "Active"]
        
        # Sort by ingredient name
        active_ings.sort(key=lambda x: x.ingredient.ingredient_name)
        
        # Build signature: "ingredient1:conc1:unit1|ingredient2:conc2:unit2|type"
        parts = [f"{ing.ingredient.ingredient_name}:{ing.concentration}:{ing.unit}"
                for ing in active_ings]
        parts.append(formulation_type or "")
        
        return "|".join(parts)
    
    def _map_status(self, csv_status: str) -> str:
        """Map CSV status to database formulation_status"""
        if not csv_status:
            return "Not Yet Evaluated"
        
        status_lower = csv_status.lower().strip()
        
        # Direct mappings
        if status_lower in ["selected"]:
            return "Selected"
        elif status_lower in ["being monitored"]:
            return "Being Monitored"
        elif status_lower in ["killed"]:
            return "Killed"
        elif status_lower in ["not yet considered", "not yet evaluated"]:
            return "Not Yet Evaluated"
        else:
            # Default to Not Yet Evaluated for unknown statuses
            return "Not Yet Evaluated"
    
    def _parse_concentration(self, value: str) -> Optional[float]:
        """Parse concentration value from string"""
        if not value or not value.strip():
            return None
        
        try:
            # Handle decimals with comma (European notation)
            value = value.replace(',', '.')
            return float(value)
        except ValueError:
            return None
    
    def process_csv(self):
        """Process the CSV file and extract formulations"""
        print(f"Reading CSV from: {self.csv_path}")
        
        with open(self.csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            for row_num, row in enumerate(reader, start=2):  # Start at 2 (header is row 1)
                # Check include/exclude flag
                include_flag = row.get('Include/Not Include', '').strip()
                if include_flag != 'Include':
                    continue
                
                # Extract basic fields
                csv_index = row.get('Current Index', '').strip()
                category = row.get('Formulation Category', '').strip()
                formulation_type = row.get('Formulation Type', '').strip()
                uom = row.get('UoM', '').strip() or 'L'
                status = self._map_status(row.get('Status', ''))
                
                # Extract ingredients (up to 4)
                ingredients: List[FormulationIngredient] = []
                ingredient_errors = []
                
                for i in range(1, 5):
                    ing_name = row.get(f'Active Ingredient {i}', '').strip()
                    ing_conc = row.get(f'Active Ingredient {i} Concentration', '').strip()
                    
                    if not ing_name:
                        continue
                    
                    # Find ingredient in database
                    ingredient = self._find_ingredient(ing_name)
                    if not ingredient:
                        ingredient_errors.append(f"Ingredient not found: '{ing_name}'")
                        continue
                    
                    # Parse concentration
                    concentration = self._parse_concentration(ing_conc)
                    if concentration is None:
                        continue  # Skip ingredients without concentration
                    
                    ingredients.append(FormulationIngredient(
                        ingredient=ingredient,
                        concentration=concentration,
                        unit=uom
                    ))
                
                # Check if we have any active ingredients
                active_count = sum(1 for ing in ingredients 
                                 if ing.ingredient.ingredient_type == "Active")
                
                if active_count == 0:
                    self.skipped_rows.append((row_num, 
                        f"No active ingredients found (Index: {csv_index})"))
                    continue
                
                if not formulation_type:
                    self.skipped_rows.append((row_num,
                        f"No formulation type (Index: {csv_index})"))
                    continue
                
                if not category:
                    self.skipped_rows.append((row_num,
                        f"No category (Index: {csv_index})"))
                    continue
                
                # Generate formulation name
                formulation_name = self._generate_formulation_name(ingredients, formulation_type)
                if not formulation_name:
                    self.skipped_rows.append((row_num,
                        f"Could not generate formulation name (Index: {csv_index})"))
                    continue
                
                # Generate signature for duplicate detection
                signature = self._generate_signature(ingredients, formulation_type)
                
                # Check for duplicates
                if signature in self.signatures_seen:
                    self.duplicates.append((csv_index, self.signatures_seen[signature]))
                    continue
                
                self.signatures_seen[signature] = csv_index
                
                # Create formulation
                formulation = Formulation(
                    csv_index=csv_index,
                    formulation_name=formulation_name,
                    category=category,
                    formulation_type=formulation_type,
                    uom=uom,
                    status=status,
                    ingredients=ingredients,
                    signature=signature
                )
                
                self.formulations.append(formulation)
    
    def generate_sql(self, output_path: str):
        """Generate SQL INSERT statements"""
        print(f"Generating SQL to: {output_path}")
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write("-- Generated SQL for Formulation Import\n")
            f.write("-- This file contains INSERT statements for formulations and formulation_ingredients\n\n")
            f.write("BEGIN;\n\n")
            
            for idx, formulation in enumerate(self.formulations, start=1):
                f.write(f"-- Formulation {idx}: {formulation.formulation_name}\n")
                f.write(f"-- CSV Index: {formulation.csv_index}\n")
                
                # Escape single quotes in strings
                name_escaped = formulation.formulation_name.replace("'", "''")
                category_escaped = formulation.category.replace("'", "''")
                type_escaped = formulation.formulation_type.replace("'", "''")
                status_escaped = formulation.status.replace("'", "''")
                
                f.write("WITH new_formulation AS (\n")
                f.write("  INSERT INTO formulations (\n")
                f.write("    formulation_name, formulation_category, formulation_type,\n")
                f.write("    uom, formulation_status, created_by\n")
                f.write("  ) VALUES (\n")
                f.write(f"    '{name_escaped}',\n")
                f.write(f"    '{category_escaped}',\n")
                f.write(f"    '{type_escaped}',\n")
                f.write(f"    '{formulation.uom}',\n")
                f.write(f"    '{status_escaped}',\n")
                f.write(f"    'Import Script'\n")
                f.write("  )\n")
                f.write("  RETURNING formulation_id\n")
                f.write(")\n")
                
                f.write("INSERT INTO formulation_ingredients (\n")
                f.write("  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role\n")
                f.write(")\n")
                
                # Generate SELECT statements for each ingredient
                for i, ing in enumerate(formulation.ingredients):
                    if i > 0:
                        f.write("UNION ALL\n")
                    f.write(f"SELECT nf.formulation_id, '{ing.ingredient.ingredient_id}'::uuid, ")
                    f.write(f"{ing.concentration}, '{ing.unit}', '{ing.ingredient.ingredient_type}' ")
                    f.write("FROM new_formulation nf")
                    if i < len(formulation.ingredients) - 1:
                        f.write("\n")
                
                f.write(";\n\n")
            
            f.write("COMMIT;\n")
    
    def write_log(self, log_path: str):
        """Write detailed log file"""
        print(f"Writing log to: {log_path}")
        
        with open(log_path, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("FORMULATION IMPORT LOG\n")
            f.write("=" * 80 + "\n\n")
            
            # Summary statistics
            f.write("SUMMARY\n")
            f.write("-" * 80 + "\n")
            f.write(f"Total formulations processed: {len(self.formulations)}\n")
            f.write(f"Duplicates detected: {len(self.duplicates)}\n")
            f.write(f"Rows skipped (missing data): {len(self.skipped_rows)}\n")
            f.write(f"Missing ingredients: {len(self.missing_ingredients)}\n")
            f.write("\n")
            
            # Missing ingredients
            if self.missing_ingredients:
                f.write("MISSING INGREDIENTS (NOT FOUND IN DATABASE)\n")
                f.write("-" * 80 + "\n")
                for ing_name in sorted(self.missing_ingredients):
                    f.write(f"  - {ing_name}\n")
                f.write("\n")
            
            # Duplicates
            if self.duplicates:
                f.write("DUPLICATE FORMULATIONS (SKIPPED)\n")
                f.write("-" * 80 + "\n")
                for dup_index, original_index in self.duplicates:
                    f.write(f"  - Index {dup_index} is duplicate of Index {original_index}\n")
                f.write("\n")
            
            # Skipped rows
            if self.skipped_rows:
                f.write("SKIPPED ROWS (MISSING CRITICAL DATA)\n")
                f.write("-" * 80 + "\n")
                for row_num, reason in self.skipped_rows:
                    f.write(f"  - Row {row_num}: {reason}\n")
                f.write("\n")
            
            # Successful formulations
            f.write("SUCCESSFULLY PROCESSED FORMULATIONS\n")
            f.write("-" * 80 + "\n")
            for formulation in self.formulations:
                f.write(f"Index {formulation.csv_index}: {formulation.formulation_name}\n")
                f.write(f"  Category: {formulation.category}\n")
                f.write(f"  Type: {formulation.formulation_type}\n")
                f.write(f"  Status: {formulation.status}\n")
                f.write(f"  Ingredients ({len(formulation.ingredients)}):\n")
                for ing in formulation.ingredients:
                    f.write(f"    - {ing.ingredient.ingredient_name} ({ing.ingredient.ingredient_type}): ")
                    f.write(f"{ing.concentration} {ing.unit}\n")
                f.write("\n")
    
    def print_summary(self):
        """Print summary to console"""
        print("\n" + "=" * 80)
        print("IMPORT SUMMARY")
        print("=" * 80)
        print(f"[OK] Successfully processed: {len(self.formulations)} formulations")
        print(f"[DUPLICATE] Duplicates detected: {len(self.duplicates)}")
        print(f"[SKIP] Rows skipped (missing data): {len(self.skipped_rows)}")
        print(f"[MISSING] Missing ingredients: {len(self.missing_ingredients)}")
        
        if self.missing_ingredients:
            print("\nMISSING INGREDIENTS:")
            for ing_name in sorted(self.missing_ingredients):
                print(f"  - {ing_name}")
        
        print("=" * 80 + "\n")


def main():
    """Main entry point"""
    csv_path = r"C:\Users\Vikram.Sridhar\Downloads\Master List Prototype(Formulation.Ingredient.csv"
    sql_output = "import_formulations.sql"
    log_output = "import_log.txt"
    
    importer = FormulationImporter(csv_path)
    
    # Process CSV
    importer.process_csv()
    
    # Check for missing ingredients - fail if any found
    if importer.missing_ingredients:
        print("\n[ERROR] Found missing ingredients in database!")
        print("The following ingredients from the CSV are not in the database:")
        for ing_name in sorted(importer.missing_ingredients):
            print(f"  - {ing_name}")
        print("\nPlease add these ingredients to the database before importing formulations.")
        
        # Still write the log for reference
        importer.write_log(log_output)
        return 1
    
    # Generate outputs
    importer.generate_sql(sql_output)
    importer.write_log(log_output)
    importer.print_summary()
    
    print(f"[SUCCESS] SQL file generated: {sql_output}")
    print(f"[SUCCESS] Log file generated: {log_output}")
    
    return 0


if __name__ == "__main__":
    exit(main())

