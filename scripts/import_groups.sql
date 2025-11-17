-- Import Group Codes

INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3ARAC', 'arable crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3BMTC', 'biomass trees', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3CRRC', 'cress and rocket crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3FBRC', 'flowerhead brassica crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3FRUC', 'fruit crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3HBRC', 'head brassica crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3HERC', 'herb crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3LFBC', 'leafy brassica crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3MEDC', 'medicinal crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3RSBC', 'root/stem brassica and radish crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3SPIC', 'spice crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3SPSC', 'spelt (spring)', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3SPWC', 'spelt (winter)', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3UMRC', 'root umbelliferous vegetable crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3UMSC', 'stem umbelliferous vegetable crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3VEGC', 'vegetable crops', NULL, 'crop_group', 'crop', 'NTX', NULL, true, 0, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3ALLC', 'allium vegetable crops', NULL, 'crop_group', 'crop', 'NTX', '3VEGC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3ANNC', 'annona crops', NULL, 'crop_group', 'crop', 'NTX', '3FRUC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3BEEC', 'beet crops', NULL, 'crop_group', 'crop', 'NTX', '3ARAC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3BERC', 'beetroot crops', NULL, 'crop_group', 'crop', 'NTX', '3VEGC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3BRAC', 'brassica arable crops', NULL, 'crop_group', 'crop', 'NTX', '3ARAC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3BURC', 'burnet herb crops', NULL, 'crop_group', 'crop', 'NTX', '3HERC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3CERC', 'cereal crops', NULL, 'crop_group', 'crop', 'NTX', '3ARAC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3CHAC', 'chamomille herb crops', NULL, 'crop_group', 'crop', 'NTX', '3HERC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3CHMC', 'chamomille medicinal crops', NULL, 'crop_group', 'crop', 'NTX', '3MEDC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3CITC', 'citrus fruit crops', NULL, 'crop_group', 'crop', 'NTX', '3FRUC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3ECHC', 'echinacea medicinal crops', NULL, 'crop_group', 'crop', 'NTX', '3MEDC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3FCVC', 'fruiting cucurbitaceous vegetable crops', NULL, 'crop_group', 'crop', 'NTX', '3VEGC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3FOXC', 'foxglove medicinal crops', NULL, 'crop_group', 'crop', 'NTX', '3MEDC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3FSVC', 'fruiting solanaceous vegetable crops', NULL, 'crop_group', 'crop', 'NTX', '3VEGC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3GINC', 'ginseng medicinal crops', NULL, 'crop_group', 'crop', 'NTX', '3MEDC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3GRAC', 'grass crops', NULL, 'crop_group', 'crop', 'NTX', '3ARAC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3HCAC', 'head cabbage crops', NULL, 'crop_group', 'crop', 'NTX', '3HBRC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3LEAC', 'leafy vegetable crops (excluding brassica)', NULL, 'crop_group', 'crop', 'NTX', '3VEGC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3LEGC', 'legume crops', NULL, 'crop_group', 'crop', 'NTX', '3ARAC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3LEVC', 'legume vegetable crops', NULL, 'crop_group', 'crop', 'NTX', '3VEGC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3MAMC', 'maize and millet crops', NULL, 'crop_group', 'crop', 'NTX', '3ARAC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3MIMC', 'mint medicinal crops', NULL, 'crop_group', 'crop', 'NTX', '3MEDC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3MINC', 'mint herb crops', NULL, 'crop_group', 'crop', 'NTX', '3HERC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3NEMC', 'nettle medicinal crops', NULL, 'crop_group', 'crop', 'NTX', '3MEDC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3NETC', 'nettle herb crops', NULL, 'crop_group', 'crop', 'NTX', '3HERC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3NUTC', 'nut crops', NULL, 'crop_group', 'crop', 'NTX', '3FRUC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3PELC', 'pelargonium herb crops', NULL, 'crop_group', 'crop', 'NTX', '3HERC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3PMFC', 'pome fruit crops', NULL, 'crop_group', 'crop', 'NTX', '3FRUC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3RADC', 'radish crops', NULL, 'crop_group', 'crop', 'NTX', '3RSBC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3SMFC', 'small fruit crops', NULL, 'crop_group', 'crop', 'NTX', '3FRUC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3STFC', 'stone fruit crops', NULL, 'crop_group', 'crop', 'NTX', '3FRUC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3WOMC', 'wormwood medicinal crops', NULL, 'crop_group', 'crop', 'NTX', '3MEDC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3WORC', 'wormwood herb crops', NULL, 'crop_group', 'crop', 'NTX', '3HERC', true, 1, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3ALMC', 'almond crops', NULL, 'crop_group', 'crop', 'NTX', '3STFC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3ASTC', 'leafy asteraceous vegetable crops', NULL, 'crop_group', 'crop', 'NTX', '3LEAC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3CHEC', 'leafy chenopodiaceous vegetable crops', NULL, 'crop_group', 'crop', 'NTX', '3LEAC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3CLOC', 'clover and bird''s-foot trefoil crops', NULL, 'crop_group', 'crop', 'NTX', '3LEGC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3CONC', 'corylus nuts', NULL, 'crop_group', 'crop', 'NTX', '3NUTC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3FESC', 'fescue grasses', NULL, 'crop_group', 'crop', 'NTX', '3GRAC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3LUPC', 'lupin crops', NULL, 'crop_group', 'crop', 'NTX', '3LEGC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3MILC', 'millet crops', NULL, 'crop_group', 'crop', 'NTX', '3MAMC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3MULC', 'mulberry crops', NULL, 'crop_group', 'crop', 'NTX', '3SMFC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3MUSC', 'mustard crops', NULL, 'crop_group', 'crop', 'NTX', '3BRAC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3PLUC', 'plum crops', NULL, 'crop_group', 'crop', 'NTX', '3STFC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3RIBC', 'ribes berry crops', NULL, 'crop_group', 'crop', 'NTX', '3SMFC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3RUBC', 'rubus berry crops', NULL, 'crop_group', 'crop', 'NTX', '3SMFC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3RYGC', 'ryegrasses', NULL, 'crop_group', 'crop', 'NTX', '3GRAC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3TURC', 'turnip rape crops', NULL, 'crop_group', 'crop', 'NTX', '3BRAC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3VACC', 'vaccinium berry crops', NULL, 'crop_group', 'crop', 'NTX', '3SMFC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3VETC', 'vetch crops', NULL, 'crop_group', 'crop', 'NTX', '3LEGC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3WHEC', 'wheat crops', NULL, 'crop_group', 'crop', 'NTX', '3CERC', true, 2, true);
INSERT INTO public.eppo_codes (eppo_code, latin_name, english_name, eppo_type, classification, eppo_datatype, parent_eppo_code, is_parent, hierarchy_level, is_active)
VALUES ('3LETC', 'lettuce crops', NULL, 'crop_group', 'crop', 'NTX', '3ASTC', true, 3, true);
