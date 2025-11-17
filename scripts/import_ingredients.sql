-- ============================================================================
-- INGREDIENT IMPORT SCRIPT
-- ============================================================================
-- This script will DELETE all existing ingredients and insert 147 new ones
-- from the Master List Prototype CSV file.
--
-- WARNING: This will permanently delete all existing ingredient data!
-- 
-- HOW TO USE:
-- 1. Open your Supabase project dashboard
-- 2. Navigate to the SQL Editor
-- 3. Copy and paste this entire file
-- 4. Review the DELETE statement carefully
-- 5. Click 'Run' to execute
--
-- Data Source: Master List Prototype(Ingredients.csv)
-- Total Records: 147 ingredients (143 Active, 4 Safener)
-- ============================================================================

-- Step 1: Clear all existing ingredient-related data
-- We need to delete dependent records first due to foreign key constraints
-- Based on actual Supabase database schema (from database.types.ts)

-- Delete formulation ingredients (links between formulations and ingredients)
DELETE FROM public.formulation_ingredients;

-- Delete ingredient supplier relationships
DELETE FROM public.ingredient_suppliers;

-- Delete patent ingredient protections
DELETE FROM public.patent_ingredient_protections;

-- Delete patent combination ingredients
DELETE FROM public.patent_combination_ingredients;

-- Finally, delete all ingredients
DELETE FROM public.ingredients;

-- Step 2: Insert all new ingredients from CSV
INSERT INTO public.ingredients (
  ingredient_name,
  ingredient_type,
  cas_number,
  standard_density_g_per_l,
  regulatory_notes,
  is_active,
  supply_risk,
  supply_risk_notes,
  is_eu_approved
) VALUES
  ('Acetamiprid', 'Active', '135410-20-7', 1.33, NULL, true, NULL, NULL, false),
  ('Aclonifen', 'Active', '74070-46-5', 1.46, NULL, true, NULL, NULL, false),
  ('Ametoctradin', 'Active', '865318-97-4', 1.117, NULL, true, NULL, NULL, false),
  ('Amidosulfuron', 'Active', '120923-37-7', 1.51, NULL, true, NULL, NULL, false),
  ('Aminopyralid', 'Active', '150114-71-9', 1.76, NULL, true, NULL, NULL, false),
  ('Atrazine', 'Active', '1912-24-9', 1.23, NULL, true, NULL, NULL, false),
  ('Azoxystrobin', 'Active', '131860-33-8', 1.34, NULL, true, NULL, NULL, false),
  ('Bentazone', 'Active', '25057-89-0', 1.41, NULL, true, NULL, NULL, false),
  ('Benzovindiflupyr', 'Active', '1072957-71-1', NULL, NULL, true, NULL, NULL, false),
  ('Bicyclopyrone', 'Active', '352010-68-5', 1.503, NULL, true, NULL, NULL, false),
  ('Bixafen', 'Active', '581809-46-3', NULL, NULL, true, NULL, NULL, false),
  ('Boscalid', 'Active', '188425-85-6', 1.381, NULL, true, NULL, NULL, false),
  ('Bromoxynil', 'Active', '1689-84-5', 1.63, NULL, true, NULL, NULL, false),
  ('Captan', 'Active', '133-06-2', 1.68, NULL, true, NULL, NULL, false),
  ('Carfentrazone', 'Active', '128621-72-7', NULL, NULL, true, NULL, NULL, false),
  ('Chlorantraniliprole', 'Active', '500008-45-7', 1.51, NULL, true, NULL, NULL, false),
  ('Chlormequat', 'Active', '7003-89-6', NULL, NULL, true, NULL, NULL, false),
  ('Chlorotoluron', 'Active', '15545-48-9', NULL, NULL, true, NULL, NULL, false),
  ('Cinmethylin', 'Active', '87818-31-3', 1.014, NULL, true, NULL, NULL, false),
  ('Clethodim', 'Active', '99129-21-2', 1.16, NULL, true, NULL, NULL, false),
  ('Clodinafop', 'Active', '114420-56-3', NULL, NULL, true, NULL, NULL, false),
  ('Clodinafop propargyl', 'Active', '105512-06-9', 1.35, NULL, true, NULL, NULL, false),
  ('Clomazone', 'Active', '81777-89-1', 1.19, NULL, true, NULL, NULL, false),
  ('Clopyralid', 'Active', '1702-17-6', 1.76, NULL, true, NULL, NULL, false),
  ('Copper sulphate', 'Active', '12527-76-3', 2.29, NULL, true, NULL, NULL, false),
  ('Cyantraniliprole', 'Active', '736994-63-1', NULL, NULL, true, NULL, NULL, false),
  ('Cyazofamid', 'Active', '120116-88-3', 1.45, NULL, true, NULL, NULL, false),
  ('Cycloxydim', 'Active', '101205-02-1', 1.12, NULL, true, NULL, NULL, false),
  ('Cyflufenamid', 'Active', '180409-60-3', 1.35, NULL, true, NULL, NULL, false),
  ('Cymoxanil', 'Active', '57966-95-7', 1.31, NULL, true, NULL, NULL, false),
  ('Cypermethrin', 'Active', '52315-07-8', 1.3, NULL, true, NULL, NULL, false),
  ('Cyproconazole', 'Active', '94361-06-5', 1.26, NULL, true, NULL, NULL, false),
  ('Cyprodinil', 'Active', '121552-61-2', 1.21, NULL, true, NULL, NULL, false),
  ('Deltamethrin', 'Active', '52918-63-5', 0.55, NULL, true, NULL, NULL, false),
  ('Dicamba', 'Active', '1918-00-9', 1.484, NULL, true, NULL, NULL, false),
  ('Difenoconazole', 'Active', '119446-68-3', 1.37, NULL, true, NULL, NULL, false),
  ('Diflufenican', 'Active', '83164-33-4', 1.54, NULL, true, NULL, NULL, false),
  ('Dimethachlor', 'Active', '50563-36-5', 1.23, NULL, true, NULL, NULL, false),
  ('Dimethenamid', 'Active', '87674-68-8', 1.2, NULL, true, NULL, NULL, false),
  ('Dimethenamid-P', 'Active', '163515-14-8', 1.2, NULL, true, NULL, NULL, false),
  ('Diquat', 'Active', '2764-72-9', 1.61, NULL, true, NULL, NULL, false),
  ('Disodium phosphonate', 'Active', '13708-85-5', NULL, NULL, true, NULL, NULL, false),
  ('Dithianon', 'Active', '3347-22-6', 1.58, NULL, true, NULL, NULL, false),
  ('Dodine', 'Active', '2439-10-3', NULL, NULL, true, NULL, NULL, false),
  ('Esfenvalerate', 'Active', '66230-04-4', 1.23, NULL, true, NULL, NULL, false),
  ('Ethofumesate', 'Active', '26225-79-6', 1.3, NULL, true, NULL, NULL, false),
  ('Etofenprox', 'Active', '80844-07-1', 1.17, NULL, true, NULL, NULL, false),
  ('Fenhexamid', 'Active', '126833-17-8', 1.34, NULL, true, NULL, NULL, false),
  ('Fenpicoxamid', 'Active', '517875-34-2', NULL, NULL, true, NULL, NULL, false),
  ('Fenpropidin', 'Active', '67306-00-7', 0.91, NULL, true, NULL, NULL, false),
  ('Flazasulfuron', 'Active', '104040-78-0', 1.62, NULL, true, NULL, NULL, false),
  ('Flonicamid', 'Active', '158062-67-0', 1.54, NULL, true, NULL, NULL, false),
  ('Florasulam', 'Active', '145701-23-1', 1.53, NULL, true, NULL, NULL, false),
  ('Fludioxonil', 'Active', '131341-86-1', 1.54, NULL, true, NULL, NULL, false),
  ('Flufenacet', 'Active', '142459-58-3', 1.45, NULL, true, NULL, NULL, false),
  ('Flumioxazin', 'Active', '103361-09-7', 1.5, NULL, true, NULL, NULL, false),
  ('Fluopicolide', 'Active', '239110-15-7', 1.65, NULL, true, NULL, NULL, false),
  ('Fluopyram', 'Active', '658066-35-4', 1.36, NULL, true, NULL, NULL, false),
  ('Fluoxastrobin', 'Active', '361377-29-9', 1.42, NULL, true, NULL, NULL, false),
  ('Flupyradifurone', 'Active', '951659-40-8', 1.43, NULL, true, NULL, NULL, false),
  ('Flurochloridone', 'Active', '61213-25-0', 1.19, NULL, true, NULL, NULL, false),
  ('Fluroxypyr', 'Active', '69377-81-7', 1.09, NULL, true, NULL, NULL, false),
  ('Fluthiacet', 'Active', '149253-65-6', 1.600, NULL, true, NULL, NULL, false),
  ('Fluxapyroxad', 'Active', '907204-31-3', 1.72, NULL, true, NULL, NULL, false),
  ('Folpet', 'Active', '133-07-3', 1.72, NULL, true, NULL, NULL, false),
  ('Foramsulfuron', 'Active', '173159-57-4', 1.44, NULL, true, NULL, NULL, false),
  ('Fosetyl', 'Active', '15845-66-6', 1.72, NULL, true, NULL, NULL, false),
  ('Glufosinate', 'Active', '51276-47-2', NULL, NULL, true, NULL, NULL, false),
  ('Glyphosate', 'Active', '1071-83-6', 1.71, NULL, true, NULL, NULL, false),
  ('Halauxifen', 'Active', '943832-60-8', 1.76, NULL, true, NULL, NULL, false),
  ('Imazamox', 'Active', '114311-32-9', 1.39, NULL, true, NULL, NULL, false),
  ('Imidacloprid', 'Active', '138261-41-3', 1.54, NULL, true, NULL, NULL, false),
  ('Indaziflam', 'Active', '950782-86-2', 1.23, NULL, true, NULL, NULL, false),
  ('Iodosulfuron', 'Active', '185119-76-0', 1.45, NULL, true, NULL, NULL, false),
  ('Isofetamid', 'Active', '875915-78-9', 1.23, NULL, true, NULL, NULL, false),
  ('Isoxaflutole', 'Active', '141112-29-0', 1.59, NULL, true, NULL, NULL, false),
  ('Kresoxim-methyl', 'Active', '143390-89-0', 1.26, NULL, true, NULL, NULL, false),
  ('Lambda-cyhalothrin', 'Active', '91465-08-6', 1.33, NULL, true, NULL, NULL, false),
  ('Mandipropamid', 'Active', '374726-62-2', NULL, NULL, true, NULL, NULL, false),
  ('Mefentrifluconazole', 'Active', '1417782-03-6', NULL, NULL, true, NULL, NULL, false),
  ('Mepanipyrim', 'Active', '110235-47-7', 1.205, NULL, true, NULL, NULL, false),
  ('Mepiquat', 'Active', '15302-91-7', NULL, NULL, true, NULL, NULL, false),
  ('Mepiquat chloride', 'Active', '24307-26-4', 1.16, NULL, true, NULL, NULL, false),
  ('Meptyldinocap', 'Active', '131-72-6', 1.11, NULL, true, NULL, NULL, false),
  ('Mesosulfuron', 'Active', '400852-66-6', NULL, NULL, true, NULL, NULL, false),
  ('Mesotrione', 'Active', '104206-82-8', 1.49, NULL, true, NULL, NULL, false),
  ('Metalaxyl', 'Active', '57837-19-1', 1.2, NULL, true, NULL, NULL, false),
  ('Metalaxyl-M', 'Active', '70630-17-0', 1.13, NULL, true, NULL, NULL, false),
  ('Metazachlor', 'Active', '67129-08-2', 1.31, NULL, true, NULL, NULL, false),
  ('Metconazole', 'Active', '125116-23-6', 1.14, NULL, true, NULL, NULL, false),
  ('Metobromuron', 'Active', '3060-89-7', 1.52, NULL, true, NULL, NULL, false),
  ('Metrafenone', 'Active', '220899-03-6', 1.45, NULL, true, NULL, NULL, false),
  ('Metsulfuron-methyl', 'Active', '74223-64-6', 1.45, NULL, true, NULL, NULL, false),
  ('Napropamide', 'Active', '15299-99-7', 1.18, NULL, true, NULL, NULL, false),
  ('Nicosulfuron', 'Active', '111991-09-4', 0.31, NULL, true, NULL, NULL, false),
  ('Oxyfluorfen', 'Active', '42874-03-3', 1.53, NULL, true, NULL, NULL, false),
  ('Penconazole', 'Active', '66246-88-6', 1.27, NULL, true, NULL, NULL, false),
  ('Pendimethalin', 'Active', '40487-42-1', 1.17, NULL, true, NULL, NULL, false),
  ('Penoxsulam', 'Active', '219714-96-2', 1.61, NULL, true, NULL, NULL, false),
  ('Picloram', 'Active', '1918-02-1', 1.81, NULL, true, NULL, NULL, false),
  ('Picolinafen', 'Active', '137641-05-5', 1.45, NULL, true, NULL, NULL, false),
  ('Picoxystrobin', 'Active', '117428-22-5', 1.4, NULL, true, NULL, NULL, false),
  ('Pinoxaden', 'Active', '243973-20-8', 1.16, NULL, true, NULL, NULL, false),
  ('Pirimicarb', 'Active', '23103-98-2', 1.18, NULL, true, NULL, NULL, false),
  ('Potassium phosphonates', 'Active', '13977-65-6', 1.65, NULL, true, NULL, NULL, false),
  ('Prohexadione', 'Active', '88805-35-0', 1.46, NULL, true, NULL, NULL, false),
  ('Propamocarb', 'Active', '24579-73-5', 0.963, NULL, true, NULL, NULL, false),
  ('Propiconazole', 'Active', '60207-90-1', 1.09, NULL, true, NULL, NULL, false),
  ('Propoxycarbazone', 'Active', '145026-81-9', NULL, NULL, true, NULL, NULL, false),
  ('Propyzamide', 'Active', '23950-58-5', 1.33, NULL, true, NULL, NULL, false),
  ('Proquinazid', 'Active', '189278-12-4', 1.57, NULL, true, NULL, NULL, false),
  ('Prosulfocarb', 'Active', '52888-80-9', 1.04, NULL, true, NULL, NULL, false),
  ('Prosulfuron', 'Active', '94125-34-5', 1.45, NULL, true, NULL, NULL, false),
  ('Prothioconazole', 'Active', '178928-70-6', 1.36, NULL, true, NULL, NULL, false),
  ('Pyraclostrobin', 'Active', '175013-18-0', 1.37, NULL, true, NULL, NULL, false),
  ('Pyrasulfotole', 'Active', '365400-11-9', 1.53, NULL, true, NULL, NULL, false),
  ('Pyriproxyfen', 'Active', '95737-68-1', 1.26, NULL, true, NULL, NULL, false),
  ('Pyroxasulfone', 'Active', '447399-55-5', 1.600, NULL, true, NULL, NULL, false),
  ('Pyroxsulam', 'Active', '422556-08-9', 1.62, NULL, true, NULL, NULL, false),
  ('Quinmerac', 'Active', '90717-03-6', 1.49, NULL, true, NULL, NULL, false),
  ('Quizalofop-P-ethyl', 'Active', '100646-51-3', 1.301, NULL, true, NULL, NULL, false),
  ('Rimsulfuron', 'Active', '122931-48-0', 1.5, NULL, true, NULL, NULL, false),
  ('S-metolachlor', 'Active', '87392-12-9', 1.12, NULL, true, NULL, NULL, false),
  ('Silthiofam', 'Active', '175217-20-6', 1.07, NULL, true, NULL, NULL, false),
  ('Spirotetramat', 'Active', '203313-25-1', 1.22, NULL, true, NULL, NULL, false),
  ('Spiroxamine', 'Active', '118134-30-8', 0.93, NULL, true, NULL, NULL, false),
  ('Sulfentrazone', 'Active', '122836-35-5', 0.53, NULL, true, NULL, NULL, false),
  ('Tau-fluvalinate', 'Active', '102851-06-9', 1.266, NULL, true, NULL, NULL, false),
  ('Tebuconazole', 'Active', '107534-96-3', 1.25, NULL, true, NULL, NULL, false),
  ('Tefluthrin', 'Active', '79538-32-2', 1.48, NULL, true, NULL, NULL, false),
  ('Tembotrione', 'Active', '335104-84-2', 1.56, NULL, true, NULL, NULL, false),
  ('Terbuthylazine', 'Active', '5915-41-3', 1.19, NULL, true, NULL, NULL, false),
  ('Tetraconazole', 'Active', '112281-77-3', 1.459, NULL, true, NULL, NULL, false),
  ('Thiamethoxam', 'Active', '153719-23-4', 1.57, NULL, true, NULL, NULL, false),
  ('Thiencarbazone', 'Active', '936331-72-5', 1.19, NULL, true, NULL, NULL, false),
  ('Thiencarbazone-methyl', 'Active', '317815-83-1', 1.51, NULL, true, NULL, NULL, false),
  ('Tri-allate', 'Active', '2303-17-5', 1.27, NULL, true, NULL, NULL, false),
  ('Tribenuron-methyl', 'Active', '101200-48-0', 1.46, NULL, true, NULL, NULL, false),
  ('Triclopyr', 'Active', '55335-06-3', 1.3, NULL, true, NULL, NULL, false),
  ('Trifloxystrobin', 'Active', '141517-21-7', 1.36, NULL, true, NULL, NULL, false),
  ('Triflusulfuron', 'Active', '135990-29-3', NULL, NULL, true, NULL, NULL, false),
  ('Trinexapac-ethyl', 'Active', '95266-40-3', 1.31, NULL, true, NULL, NULL, false),
  ('Zoxamide', 'Active', '156052-68-5', 1.38, NULL, true, NULL, NULL, false),
  ('Benoxacor', 'Safener', '98730-04-2', NULL, NULL, true, NULL, NULL, false),
  ('Cloquintocet', 'Safener', '99607-70-2', NULL, NULL, true, NULL, NULL, false),
  ('Cyprosulfamide', 'Safener', '221667-31-8', NULL, NULL, true, NULL, NULL, false),
  ('Isoxadifen-ethyl', 'Safener', '163520-33-0', NULL, NULL, true, NULL, NULL, false);

-- ============================================================================
-- IMPORT COMPLETE
-- ============================================================================
-- Successfully imported 147 ingredients
-- - 143 Active ingredients
-- - 4 Safeners
-- ============================================================================
