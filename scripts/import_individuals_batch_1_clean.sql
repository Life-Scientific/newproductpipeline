-- Import Individual Crops Batch 1 (MODIFIED - Skips first 5 already imported)
-- Starting from individual #6

INSERT INTO public.eppo_codes (
  eppo_code, latin_name, english_name, german_name, french_name, italian_name,
  spanish_name, portuguese_name, dutch_name, russian_name, swedish_name,
  czech_name, hungarian_name, polish_name, slovak_name, croatian_name,
  ukrainian_name, bulgarian_name, lithuanian_name, catalan_name, danish_name,
  slovene_name, turkish_name, eppo_type, classification, eppo_datatype,
  parent_eppo_code, is_parent, hierarchy_level, is_active
) VALUES (
  'TRZTN', 'Triticum turanicum', 'Oriental wheat',
  'Weizen, Khorassan-', 'blé de Khorasan', NULL,
  NULL, NULL, NULL,
  NULL, NULL, NULL,
  NULL, NULL, NULL,
  NULL, NULL, NULL,
  NULL, NULL, NULL,
  NULL, NULL,
  'individual_crop', 'crop', 'PFL',
  '3WHEC', false, 3, true
);

-- Continue with the rest of batch 1 (records 6-100)...

