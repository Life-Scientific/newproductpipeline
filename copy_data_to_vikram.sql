-- Migration script to copy all test data from main database to Vikram branch
-- This script preserves UUIDs to maintain relationships

-- ============================================================================
-- STEP 1: Reference Tables (No Dependencies)
-- ============================================================================

-- Countries
INSERT INTO countries (country_id, country_code, country_name, currency_code, has_tariffs, is_active, created_at, updated_at)
VALUES
  ('07a7b21c-7d58-413f-936d-3e2b8a2a3db5', 'FR', 'France', 'EUR', false, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('9589aa8e-433d-42a2-81ad-0f8fdb3fa188', 'DE', 'Germany', 'EUR', false, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('2ce3c5a6-c471-4eb5-b3c4-8564a9328a20', 'IE', 'Ireland', 'EUR', false, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('4e649dae-cc4c-438a-ae05-9e6967e726e4', 'IT', 'Italy', 'EUR', false, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('a1a30a5b-0994-47a4-9237-21eb00994ea5', 'ES', 'Spain', 'EUR', false, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('b7a2903a-cea6-47a2-9539-760c06a3b851', 'GB', 'United Kingdom', 'GBP', false, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('c9cd9ff6-7e65-406c-9848-513ef79ea730', 'US', 'United States', 'USD', true, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00')
ON CONFLICT (country_id) DO NOTHING;

-- Crops
INSERT INTO crops (crop_id, crop_name, crop_category, is_active, created_at)
VALUES
  ('65f44a70-ee7c-44c9-9d92-b4fa4b31814a', 'Maize', 'Cereals', true, '2025-11-05T21:25:16.07758+00:00'),
  ('621a7297-e4cc-4f62-b63e-5c8a820e5c97', 'Oilseed Rape', 'Oilseeds', true, '2025-11-05T21:25:16.07758+00:00'),
  ('f86ffb32-dbd7-4bcd-9719-71f764190947', 'Potatoes', 'Vegetables', true, '2025-11-05T21:25:16.07758+00:00'),
  ('a894e1d2-11db-448c-9b0d-7daa04ad915a', 'Spring Barley', 'Cereals', true, '2025-11-05T21:25:16.07758+00:00'),
  ('e0f95fe4-95d4-4746-a2a9-adc290a30a4d', 'Sugar Beet', 'Root Crops', true, '2025-11-05T21:25:16.07758+00:00'),
  ('8f0dcef1-32ad-49be-bd92-81e30eff6291', 'Tomatoes', 'Vegetables', true, '2025-11-05T21:25:16.07758+00:00'),
  ('bb518174-7167-4834-a901-f1e0fbe15620', 'Winter Wheat', 'Cereals', true, '2025-11-05T21:25:16.07758+00:00')
ON CONFLICT (crop_id) DO NOTHING;

-- Ingredients
INSERT INTO ingredients (ingredient_id, ingredient_name, ingredient_type, cas_number, standard_density_g_per_l, supply_risk, supply_risk_notes, is_eu_approved, regulatory_notes, is_active, created_at, updated_at)
VALUES
  ('4b46b0b0-bb41-4979-b03b-da0493020d19', 'Azoxystrobin', 'Active', NULL, 1340, 'Low', NULL, true, NULL, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('fc10c032-7c61-4f48-a444-59281939169a', 'Epoxiconazole', 'Active', NULL, 1200, 'Low', NULL, true, NULL, true, '2025-11-10T10:33:53.666447+00:00', '2025-11-10T10:33:53.666447+00:00'),
  ('69be9b79-c1ec-4635-8797-83b3faddc944', 'Fluxapyroxad', 'Active', NULL, 1280, 'Medium', NULL, true, NULL, true, '2025-11-10T10:33:53.666447+00:00', '2025-11-10T10:33:53.666447+00:00'),
  ('461e5ebc-283c-4b7b-8a89-6d5927a4cd28', 'Glyphosate', 'Active', NULL, 1700, 'Low', NULL, true, NULL, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('e7a3f5ea-5167-4ad4-a308-72698b596db0', 'Isoxadifen-ethyl', 'Safener', NULL, 1100, 'Medium', NULL, true, NULL, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('36af48e5-436f-46bf-9e31-125237557a7f', 'Metconazole', 'Active', NULL, 1320, 'Low', NULL, true, NULL, true, '2025-11-10T10:33:53.666447+00:00', '2025-11-10T10:33:53.666447+00:00'),
  ('637ee77a-b862-4896-98ee-1c3588be8b22', 'Prothioconazole', 'Active', NULL, 1300, 'Medium', NULL, true, NULL, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('9cc3c904-418f-4d64-9311-76af1812f342', 'Surfactant Blend A', 'Surfactant', NULL, 1000, 'Low', NULL, true, NULL, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00'),
  ('e2bef0fd-52e6-4f70-a064-2231b495a304', 'Tebuconazole', 'Active', NULL, 1450, 'High', NULL, true, NULL, true, '2025-11-05T21:25:16.07758+00:00', '2025-11-05T21:25:16.07758+00:00')
ON CONFLICT (ingredient_id) DO NOTHING;

-- Suppliers
INSERT INTO suppliers (supplier_id, supplier_name, supplier_code, address, country_id, is_active, created_at)
VALUES
  ('93dc0fb7-5450-4e63-adce-25cc137fad2c', 'BASF Agricultural Solutions', 'BASF', NULL, '9589aa8e-433d-42a2-81ad-0f8fdb3fa188', true, '2025-11-10T10:33:53.666447+00:00'),
  ('931772c0-fd9c-4e2f-a28a-8625a0b8d1ea', 'Bayer CropScience', 'BAYER', NULL, 'b7a2903a-cea6-47a2-9539-760c06a3b851', true, '2025-11-10T10:33:53.666447+00:00'),
  ('34282950-8334-409f-9377-bceb960f487f', 'Corteva Agriscience', 'CORTEVA', NULL, 'c9cd9ff6-7e65-406c-9848-513ef79ea730', true, '2025-11-10T10:33:53.666447+00:00'),
  ('8d572f8b-b502-48ac-a55c-82a7ef11dbfc', 'Syngenta AG', 'SYNGENTA', NULL, '07a7b21c-7d58-413f-936d-3e2b8a2a3db5', true, '2025-11-10T10:33:53.666447+00:00')
ON CONFLICT (supplier_id) DO NOTHING;

-- Targets
INSERT INTO targets (target_id, target_name, target_type, target_category, is_active, created_at)
VALUES
  ('be7aecb3-820e-425b-aa9b-bb225a6e70d1', 'Alternaria', 'Disease', 'Fungal Diseases', true, '2025-11-10T10:16:43.320963+00:00'),
  ('1d6beac9-dcf5-4098-9d00-2f31816e2cea', 'Annual Grasses', 'Weed', 'Grass Weeds', true, '2025-11-10T10:16:43.320963+00:00'),
  ('d1e0f772-ef68-455f-8ea1-b0024350206b', 'Annual Meadow Grass', 'Weed', 'Grass Weeds', true, '2025-11-10T10:16:43.320963+00:00'),
  ('25d5f303-9b40-4c48-80b7-c9bb7227de85', 'Aphids', 'Pest', 'Sucking Insects', true, '2025-11-10T10:16:43.320963+00:00'),
  ('8821f505-e487-46b8-b030-0d26a1da4117', 'Blackgrass', 'Weed', 'Grass Weeds', true, '2025-11-10T10:16:43.320963+00:00'),
  ('220da21d-9f01-4d7b-b88c-8895e6b94de9', 'Cabbage Root Fly', 'Pest', 'Flying Insects', true, '2025-11-10T10:16:43.320963+00:00'),
  ('fd810119-b80a-442f-9607-bd0443ebcd76', 'Charlock', 'Weed', 'Broadleaf Weeds', true, '2025-11-10T10:16:43.320963+00:00'),
  ('2e41403b-2780-4b7f-82b3-f41f19b2df0d', 'Chickweed', 'Weed', 'Broadleaf Weeds', true, '2025-11-10T10:16:43.320963+00:00'),
  ('f9e2a760-3637-4262-8da1-9552a2152b0a', 'Cleavers', 'Weed', 'Broadleaf Weeds', true, '2025-11-10T10:16:43.320963+00:00'),
  ('a17c0a58-4d02-4ce2-b4b6-ba9e55802f73', 'Colorado Potato Beetle', 'Pest', 'Chewing Insects', true, '2025-11-10T10:16:43.320963+00:00'),
  ('e90ff258-694e-4d7d-bb38-0dc43dc56319', 'Fat Hen', 'Weed', 'Broadleaf Weeds', true, '2025-11-10T10:16:43.320963+00:00'),
  ('773e0b16-a8c3-4452-b0b5-ebd2c33e65b1', 'Flea Beetle', 'Pest', 'Chewing Insects', true, '2025-11-10T10:16:43.320963+00:00'),
  ('42440e04-c2d0-4b98-a6e2-4724175342e5', 'Fusarium spp.', 'Disease', 'Fungal Diseases', true, '2025-11-10T10:16:43.320963+00:00'),
  ('1f65f2d4-0c69-4b5d-80ed-edc9ebe4827b', 'Powdery Mildew', 'Disease', 'Fungal Diseases', true, '2025-11-10T10:16:43.320963+00:00'),
  ('80f67ee2-040a-489b-a449-bbc9fb591ee9', 'Ramularia', 'Disease', 'Fungal Diseases', true, '2025-11-10T10:16:43.320963+00:00'),
  ('6c988846-dff0-49c8-98d1-5830a3cd3f7c', 'Rust', 'Disease', 'Fungal Diseases', true, '2025-11-10T10:16:43.320963+00:00'),
  ('11f7078b-6167-40c9-a21b-706cc4675b00', 'Sclerotinia', 'Disease', 'Fungal Diseases', true, '2025-11-10T10:16:43.320963+00:00'),
  ('b7030d03-8da8-4f82-97f3-790f917fcbd7', 'Septoria tritici', 'Disease', 'Fungal Diseases', true, '2025-11-10T10:16:43.320963+00:00'),
  ('65233e3b-9fce-4c5a-8d2a-8af5a18efc55', 'Spider Mites', 'Pest', 'Sucking Insects', true, '2025-11-10T10:16:43.320963+00:00'),
  ('13233f73-0604-4821-a56a-d3fa13ab5a2d', 'Volunteer Potatoes', 'Weed', 'Broadleaf Weeds', true, '2025-11-10T10:16:43.320963+00:00'),
  ('1c26b388-a802-46fc-a365-2013d27fcca2', 'Whitefly', 'Pest', 'Sucking Insects', true, '2025-11-10T10:16:43.320963+00:00'),
  ('8999ca1d-4518-4e35-b2be-65b56ac7cbaa', 'Wild Oats', 'Weed', 'Grass Weeds', true, '2025-11-10T10:16:43.320963+00:00')
ON CONFLICT (target_id) DO NOTHING;

-- Reference Products
INSERT INTO reference_products (reference_product_id, product_name, manufacturer, supplier_id, active_ingredients_description, formulation_type, registration_number, notes, is_active, created_at, updated_at)
VALUES
  ('a3c70a31-e7df-40ab-9f81-67993ee3a381', 'Amistar', 'Syngenta', '8d572f8b-b502-48ac-a55c-82a7ef11dbfc', 'Azoxystrobin', 'SC', NULL, NULL, true, '2025-11-10T10:33:53.666447+00:00', '2025-11-10T10:33:53.666447+00:00'),
  ('d8e16c05-0081-408a-9198-c5c4279a44a7', 'Prosaro EC', 'Bayer', '931772c0-fd9c-4e2f-a28a-8625a0b8d1ea', 'Prothioconazole + Tebuconazole', 'EC', NULL, NULL, true, '2025-11-10T10:33:53.666447+00:00', '2025-11-10T10:33:53.666447+00:00')
ON CONFLICT (reference_product_id) DO NOTHING;

-- Base Code Registry
INSERT INTO base_code_registry (base_code, active_signature, description, next_variant_number, created_at)
VALUES
  ('001', '637ee77a-b862-4896-98ee-1c3588be8b22|e2bef0fd-52e6-4f70-a064-2231b495a304', NULL, 2, '2025-11-10T10:33:53.666447+00:00'),
  ('002', '4b46b0b0-bb41-4979-b03b-da0493020d19|fc10c032-7c61-4f48-a444-59281939169a', NULL, 2, '2025-11-10T10:33:53.666447+00:00')
ON CONFLICT (base_code) DO NOTHING;

