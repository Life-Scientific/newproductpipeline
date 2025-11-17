-- EPPO Pest Codes - Batch 1
-- Contains 500 INSERT statements
-- Run batches in order: 01, 02, 03, etc.


-- EPPO Pests with Hierarchy - Complete Insert Statements
-- Generated with parent-child relationships and group codes
-- Order: Groups first (parents), then individual codes (children)

-- ========================================
-- PART 1: GROUP CODES (Parents)
-- ========================================

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BACTK', 'GAF', 'disease', 'target_group',
    'Bacteria', NULL,
    NULL, TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACTIC', 'GAF', 'disease', 'target_group',
    'Actinobacteria', NULL,
    '1BACTK', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MICOO', 'GAF', 'disease', 'target_group',
    'Micrococcales', NULL,
    '1ACTIC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MICBF', 'GAF', 'disease', 'target_group',
    'Microbacteriaceae', NULL,
    '1MICOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CLABG', 'GAF', 'disease', 'target_group',
    'Clavibacter', 'Davis et al.',
    '1MICBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FUNGK', 'GAF', 'disease', 'target_group',
    'Fungi', NULL,
    NULL, TRUE, 8,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ASCOP', 'GAF', 'disease', 'target_group',
    'Ascomycota', NULL,
    '1FUNGK', TRUE, 7,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PEZIQ', 'GAF', 'disease', 'target_group',
    'Pezizomycotina', NULL,
    '1ASCOP', TRUE, 6,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SORDC', 'GAF', 'disease', 'target_group',
    'Sordariomycetes', NULL,
    '1PEZIQ', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYPRL', 'GAF', 'disease', 'target_group',
    'Hypocreomycetidae', NULL,
    '1SORDC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYPRO', 'GAF', 'disease', 'target_group',
    'Hypocreales', NULL,
    '1HYPRL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYPRF', 'GAF', 'disease', 'target_group',
    'Hypocreaceae', NULL,
    '1HYPRO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRCDG', 'GAF', 'disease', 'target_group',
    'Hypocrea', 'Fries',
    '1HYPRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DOTHC', 'GAF', 'disease', 'target_group',
    'Dothideomycetes', NULL,
    '1PEZIQ', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLEOL', 'GAF', 'disease', 'target_group',
    'Pleosporomycetidae', NULL,
    '1DOTHC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLEOO', 'GAF', 'disease', 'target_group',
    'Pleosporales', NULL,
    '1PLEOL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLEOF', 'GAF', 'disease', 'target_group',
    'Pleosporaceae', 'Nitschke',
    '1PLEOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BIPOG', 'GAF', 'disease', 'target_group',
    'Cochliobolus', 'Drechsler',
    '1PLEOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANIMK', 'GAI', 'insect', 'target_group',
    'Animalia', NULL,
    NULL, TRUE, 7,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ARTHP', 'GAI', 'insect', 'target_group',
    'Arthropoda', NULL,
    '1ANIMK', TRUE, 6,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HEXAQ', 'GAI', 'insect', 'target_group',
    'Hexapoda', NULL,
    '1ARTHP', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1INSEC', 'GAI', 'insect', 'target_group',
    'Insecta', NULL,
    '1HEXAQ', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIPTO', 'GAI', 'insect', 'target_group',
    'Diptera', NULL,
    '1INSEC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CECIF', 'GAI', 'insect', 'target_group',
    'Cecidomyiidae', NULL,
    '1DIPTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CONTG', 'GAI', 'insect', 'target_group',
    'Contarinia', 'Rondani',
    '1CECIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CURTG', 'GAF', 'disease', 'target_group',
    'Curtobacterium', 'Yamada & Komagata',
    '1MICBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COLEO', 'GAI', 'insect', 'target_group',
    'Coleoptera', NULL,
    '1INSEC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHRYF', 'GAI', 'insect', 'target_group',
    'Chrysomelidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIABG', 'GAI', 'insect', 'target_group',
    'Diabrotica', 'Chevrolat in Dejean',
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NEMAP', 'GAI', 'insect', 'target_group',
    'Nematoda', NULL,
    '1ANIMK', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHROC', 'GAI', 'insect', 'target_group',
    'Chromadorea', NULL,
    '1NEMAP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RHABO', 'GAI', 'insect', 'target_group',
    'Rhabditida', NULL,
    '1CHROC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANGUF', 'GAI', 'insect', 'target_group',
    'Anguinidae', NULL,
    '1RHABO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DITYG', 'GAI', 'insect', 'target_group',
    'Ditylenchus', 'Filipjev',
    '1ANGUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HEMIO', 'GAI', 'insect', 'target_group',
    'Hemiptera', NULL,
    '1INSEC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STERR', 'GAI', 'insect', 'target_group',
    'Sternorrhyncha', NULL,
    '1HEMIO', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APHIF', 'GAI', 'insect', 'target_group',
    'Aphididae', NULL,
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIURG', 'GAI', 'insect', 'target_group',
    'Diuraphis', NULL,
    '1APHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LEPIO', 'GAI', 'insect', 'target_group',
    'Lepidoptera', NULL,
    '1INSEC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PYRAF', 'GAI', 'insect', 'target_group',
    'Pyralidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ELASG', 'GAI', 'insect', 'target_group',
    'Elasmopalpus', NULL,
    '1PYRAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1VIRUK', 'GAF', 'disease', 'target_group',
    'Viruses and viroids', NULL,
    NULL, TRUE, 9,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RIBVD', 'GAF', 'disease', 'target_group',
    'Riboviria', NULL,
    '1VIRUK', TRUE, 8,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ORTVA', 'GAF', 'disease', 'target_group',
    'Orthornavirae', NULL,
    '1RIBVD', TRUE, 7,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NEGVP', 'GAF', 'disease', 'target_group',
    'Negarnaviricota', NULL,
    '1ORTVA', TRUE, 6,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POLVQ', 'GAF', 'disease', 'target_group',
    'Polyploviricotina', NULL,
    '1NEGVP', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BUNVC', 'GAF', 'disease', 'target_group',
    'Bunyaviricetes', NULL,
    '1POLVQ', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ELLVO', 'GAF', 'disease', 'target_group',
    'Elliovirales', NULL,
    '1BUNVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FIMOF', 'GAF', 'disease', 'target_group',
    'Fimoviridae', NULL,
    '1ELLVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EMRAG', 'GAF', 'disease', 'target_group',
    'Emaravirus', NULL,
    '1FIMOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DUPVP', 'GAF', 'disease', 'target_group',
    'Duplornaviricota', NULL,
    '1ORTVA', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RESVC', 'GAF', 'disease', 'target_group',
    'Resentoviricetes', NULL,
    '1DUPVP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1REOVO', 'GAF', 'disease', 'target_group',
    'Reovirales', NULL,
    '1RESVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1REOVF', 'GAF', 'disease', 'target_group',
    'Reoviridae', NULL,
    '1REOVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FIJIG', 'GAF', 'disease', 'target_group',
    'Fijivirus', NULL,
    '1REOVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1KITVP', 'GAF', 'disease', 'target_group',
    'Kitrinoviricota', NULL,
    '1ORTVA', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALSVC', 'GAF', 'disease', 'target_group',
    'Alsuviricetes', NULL,
    '1KITVP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MARVO', 'GAF', 'disease', 'target_group',
    'Martellivirales', NULL,
    '1ALSVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1VIRGF', 'GAF', 'disease', 'target_group',
    'Virgaviridae', NULL,
    '1MARVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FUROG', 'GAF', 'disease', 'target_group',
    'Furovirus', NULL,
    '1VIRGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HETEF', 'GAI', 'insect', 'target_group',
    'Heteroderidae', NULL,
    '1RHABO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HETDG', 'GAI', 'insect', 'target_group',
    'Heterodera', 'Schmidt',
    '1HETEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AGROF', 'GAI', 'insect', 'target_group',
    'Agromyzidae', NULL,
    '1DIPTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LIRIG', 'GAI', 'insect', 'target_group',
    'Liriomyza', 'Mik',
    '1AGROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CURCF', 'GAI', 'insect', 'target_group',
    'Curculionidae', NULL,
    '1COLEO', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CYCLS', 'GAI', 'insect', 'target_group',
    'Cyclominae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LISRG', 'GAI', 'insect', 'target_group',
    'Listronotus', 'Jekel',
    '1CYCLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MAYEG', 'GAI', 'insect', 'target_group',
    'Mayetiola', 'Kieffer',
    '1CECIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ELATF', 'GAI', 'insect', 'target_group',
    'Elateridae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MELNG', 'GAI', 'insect', 'target_group',
    'Melanotus', 'Erichson',
    '1ELATF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MELGF', 'GAI', 'insect', 'target_group',
    'Meloidogynidae', NULL,
    '1RHABO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MELGG', 'GAI', 'insect', 'target_group',
    'Meloidogyne', 'Goeldi',
    '1MELGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HETER', 'GAI', 'insect', 'target_group',
    'Heteroptera', NULL,
    '1HEMIO', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LYGAF', 'GAI', 'insect', 'target_group',
    'Lygaeidae', 'Schilling',
    '1HETER', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NYSIG', 'GAI', 'insect', 'target_group',
    'Nysius', 'Dallas',
    '1LYGAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MARGF', 'GAI', 'insect', 'target_group',
    'Margarodidae', NULL,
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PORPG', 'GAI', 'insect', 'target_group',
    'Porphyrophora', 'Brandt in Brandt & Ratzeburg',
    '1MARGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SRDAL', 'GAF', 'disease', 'target_group',
    'Sordariomycetidae', NULL,
    '1SORDC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MAGNO', 'GAF', 'disease', 'target_group',
    'Magnaporthales', NULL,
    '1SRDAL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PYRIF', 'GAF', 'disease', 'target_group',
    'Pyriculariaceae', NULL,
    '1MAGNO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PYRIG', 'GAF', 'disease', 'target_group',
    'Pyricularia', '(Saccardo) Saccardo',
    '1PYRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SITDG', 'GAI', 'insect', 'target_group',
    'Sitodiplosis', 'Kieffer',
    '1CECIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NOCTF', 'GAI', 'insect', 'target_group',
    'Noctuidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SPODG', 'GAI', 'insect', 'target_group',
    'Rusidrina', 'Staudinger',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BASIP', 'GAF', 'disease', 'target_group',
    'Basidiomycota', NULL,
    '1FUNGK', TRUE, 6,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1USTOC', 'GAF', 'disease', 'target_group',
    'Ustilaginomycotina', NULL,
    '1BASIP', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EXOBL', 'GAF', 'disease', 'target_group',
    'Exobasidiomycetes', NULL,
    '1USTOC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TILLO', 'GAF', 'disease', 'target_group',
    'Tilletiales', NULL,
    '1EXOBL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TILLF', 'GAF', 'disease', 'target_group',
    'Tilletiaceae', NULL,
    '1TILLO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TILLG', 'GAF', 'disease', 'target_group',
    'Neovossia', 'Körnicke',
    '1TILLF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ENOPC', 'GAI', 'insect', 'target_group',
    'Enoplea', NULL,
    '1NEMAP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DORYO', 'GAI', 'insect', 'target_group',
    'Dorylaimida', NULL,
    '1ENOPC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRIHF', 'GAI', 'insect', 'target_group',
    'Trichodoridae', NULL,
    '1DORYO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRIHG', 'GAI', 'insect', 'target_group',
    'Trichodorus', 'Cobb',
    '1TRIHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PROBP', 'GAF', 'disease', 'target_group',
    'Proteobacteria', NULL,
    '1BACTK', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GAMBC', 'GAF', 'disease', 'target_group',
    'Gammaproteobacteria', NULL,
    '1PROBP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LYSOO', 'GAF', 'disease', 'target_group',
    'Lysobacterales', NULL,
    '1GAMBC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LYSOF', 'GAF', 'disease', 'target_group',
    'Lysobacteraceae', 'Christensen & Cook',
    '1LYSOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XANTG', 'GAF', 'disease', 'target_group',
    'Xanthomonas', 'Dowson',
    '1LYSOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PISVP', 'GAF', 'disease', 'target_group',
    'Pisuviricota', NULL,
    '1ORTVA', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STEVC', 'GAF', 'disease', 'target_group',
    'Stelpaviricetes', NULL,
    '1PISVP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PATVO', 'GAF', 'disease', 'target_group',
    'Patatavirales', NULL,
    '1STEVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POTYF', 'GAF', 'disease', 'target_group',
    'Potyviridae', NULL,
    '1PATVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BYMOG', 'GAF', 'disease', 'target_group',
    'Bymovirus', NULL,
    '1POTYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HAPVQ', 'GAF', 'disease', 'target_group',
    'Haploviricotina', NULL,
    '1NEGVP', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MONVC', 'GAF', 'disease', 'target_group',
    'Monjiviricetes', NULL,
    '1HAPVQ', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MNNGO', 'GAF', 'disease', 'target_group',
    'Mononegavirales', NULL,
    '1MONVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RHAVF', 'GAF', 'disease', 'target_group',
    'Rhabdoviridae', NULL,
    '1MNNGO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRHAG', 'GAF', 'disease', 'target_group',
    'Cytorhabdovirus', NULL,
    '1RHAVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANTMF', 'GAI', 'insect', 'target_group',
    'Anthomyiidae', NULL,
    '1DIPTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DELIG', 'GAI', 'insect', 'target_group',
    'Delia', 'Robineau-Desvoidy',
    '1ANTMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HORDG', 'GAF', 'disease', 'target_group',
    'Hordeivirus', NULL,
    '1VIRGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LIMOG', 'GAI', 'insect', 'target_group',
    'Limonius', 'Eschscholtz',
    '1ELATF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DERTF', 'GAI', 'insect', 'target_group',
    'Dermestidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TROGG', 'GAI', 'insect', 'target_group',
    'Trogoderma', 'Dejean',
    '1DERTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PROTK', 'GAF', 'disease', 'target_group',
    'Protista', NULL,
    NULL, TRUE, 6,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CERCP', 'GAF', 'disease', 'target_group',
    'Cercozoa', NULL,
    '1PROTK', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYXC', 'GAF', 'disease', 'target_group',
    'Phytomyxea', NULL,
    '1CERCP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLADO', 'GAF', 'disease', 'target_group',
    'Plasmodiophorales', NULL,
    '1PHYXC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLADF', 'GAF', 'disease', 'target_group',
    'Plasmodiophoraceae', NULL,
    '1PLADO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SPONG', 'GAF', 'disease', 'target_group',
    'Spongospora', NULL,
    '1PLADF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANGUG', 'GAI', 'insect', 'target_group',
    'Anguina', 'Scopoli',
    '1ANGUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APLOF', 'GAI', 'insect', 'target_group',
    'Aphelenchoididae', NULL,
    '1RHABO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APLOG', 'GAI', 'insect', 'target_group',
    'Aphelenchoides', 'Fischer',
    '1APLOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AUCHR', 'GAI', 'insect', 'target_group',
    'Auchenorrhyncha', NULL,
    '1HEMIO', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CICDF', 'GAI', 'insect', 'target_group',
    'Cicadellidae', NULL,
    '1AUCHR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DRAEG', 'GAI', 'insect', 'target_group',
    'Draeculacephala', 'Ball',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HELVG', 'GAI', 'insect', 'target_group',
    'Helicoverpa', 'Hardwick',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DELPF', 'GAI', 'insect', 'target_group',
    'Delphacidae', NULL,
    '1AUCHR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LAODG', 'GAI', 'insect', 'target_group',
    'Laodelphax', 'Fennah',
    '1DELPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MONVD', 'GAF', 'disease', 'target_group',
    'Monodnaviria', NULL,
    '1VIRUK', TRUE, 7,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SHOTA', 'GAF', 'disease', 'target_group',
    'Shotokuvirae', NULL,
    '1MONVD', TRUE, 6,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CREVP', 'GAF', 'disease', 'target_group',
    'Cressdnaviricota', NULL,
    '1SHOTA', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1REPVC', 'GAF', 'disease', 'target_group',
    'Repensiviricetes', NULL,
    '1CREVP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GEPVO', 'GAF', 'disease', 'target_group',
    'Geplafuvirales', NULL,
    '1REPVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GEMIF', 'GAF', 'disease', 'target_group',
    'Geminiviridae', NULL,
    '1GEPVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MASVG', 'GAF', 'disease', 'target_group',
    'Mastrevirus', NULL,
    '1GEMIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLSOG', 'GAI', 'insect', 'target_group',
    'Plesiommata', 'Provancher',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSDMO', 'GAF', 'disease', 'target_group',
    'Pseudomonadales', NULL,
    '1GAMBC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSDMF', 'GAF', 'disease', 'target_group',
    'Pseudomonadaceae', NULL,
    '1PSDMO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSDMG', 'GAF', 'disease', 'target_group',
    'Pseudomonas', 'Migula',
    '1PSDMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TELIC', 'GAF', 'disease', 'target_group',
    'Pucciniomycotina', NULL,
    '1BASIP', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PUCCL', 'GAF', 'disease', 'target_group',
    'Pucciniomycetes', NULL,
    '1TELIC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1UREDO', 'GAF', 'disease', 'target_group',
    'Pucciniales', NULL,
    '1PUCCL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PUCCF', 'GAF', 'disease', 'target_group',
    'Pucciniaceae', NULL,
    '1UREDO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PUCCG', 'GAF', 'disease', 'target_group',
    'Puccinia', 'Persoon',
    '1PUCCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TAPAG', 'GAI', 'insect', 'target_group',
    'Tapajosa', 'Melichar',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HARVO', 'GAF', 'disease', 'target_group',
    'Hareavirales', NULL,
    '1BUNVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHENF', 'GAF', 'disease', 'target_group',
    'Phenuiviridae', NULL,
    '1HARVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TENVG', 'GAF', 'disease', 'target_group',
    'Tenuivirus', NULL,
    '1PHENF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1THYSO', 'GAI', 'insect', 'target_group',
    'Thysanoptera', NULL,
    '1INSEC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1THRIF', 'GAI', 'insect', 'target_group',
    'Thripidae', NULL,
    '1THYSO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1THRIG', 'GAI', 'insect', 'target_group',
    'Thrips', 'Linnaeus',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1VIUUD', 'GAF', 'disease', 'target_group',
    'Viruses (unclassified)', NULL,
    '1VIRUK', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PENTF', 'GAI', 'insect', 'target_group',
    'Pentatomidae', NULL,
    '1HETER', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HALYG', 'GAI', 'insect', 'target_group',
    'Halyomorpha', 'Mayr',
    '1PENTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHLAF', 'GAI', 'insect', 'target_group',
    'Phlaeothripidae', NULL,
    '1THYSO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HAPLG', 'GAI', 'insect', 'target_group',
    'Haplothrips', 'Amyot & Serville',
    '1PHLAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RATHG', 'GAF', 'disease', 'target_group',
    'Rathayibacter', 'Zgurskaya, Evtushenko, Akimov & Kalakoutskii',
    '1MICBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HOPLF', 'GAI', 'insect', 'target_group',
    'Hoplolaimidae', NULL,
    '1RHABO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ROTLG', 'GAI', 'insect', 'target_group',
    'Rotylenchus', 'Filipjev',
    '1HOPLF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CLAVF', 'GAF', 'disease', 'target_group',
    'Clavicipitaceae', NULL,
    '1HYPRO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CLAVG', 'GAF', 'disease', 'target_group',
    'Sphacelia', 'Léveillé',
    '1CLAVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MUSCF', 'GAI', 'insect', 'target_group',
    'Muscidae', NULL,
    '1DIPTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ATHEG', 'GAI', 'insect', 'target_group',
    'Atherigona', 'Rondani',
    '1MUSCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CICDG', 'GAI', 'insect', 'target_group',
    'Cicadulina', NULL,
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COCNF', 'GAI', 'insect', 'target_group',
    'Coccinellidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EPILG', 'GAI', 'insect', 'target_group',
    'Epilachna', NULL,
    '1COCNF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHROK', 'GAF', 'disease', 'target_group',
    'Stramenipila', NULL,
    NULL, TRUE, 6,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSDFP', 'GAF', 'disease', 'target_group',
    'Oomycota', NULL,
    '1CHROK', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OOMYC', 'GAF', 'disease', 'target_group',
    'Oomycetes', NULL,
    '1PSDFP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PEROO', 'GAF', 'disease', 'target_group',
    'Peronosporales', NULL,
    '1OOMYC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PEROF', 'GAF', 'disease', 'target_group',
    'Peronosporaceae', NULL,
    '1PEROO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCPHG', 'GAF', 'disease', 'target_group',
    'Sclerophthora', NULL,
    '1PEROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1USTOL', 'GAF', 'disease', 'target_group',
    'Ustilaginomycetes', NULL,
    '1USTOC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1UROCO', 'GAF', 'disease', 'target_group',
    'Urocystidales', NULL,
    '1USTOL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1URCYF', 'GAF', 'disease', 'target_group',
    'Urocystidaceae', NULL,
    '1UROCO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1UROCG', 'GAF', 'disease', 'target_group',
    'Urocystis', 'Rabenhorst ex Fuckel',
    '1URCYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EREBF', 'GAI', 'insect', 'target_group',
    'Erebidae', 'Leach',
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ORGYG', 'GAI', 'insect', 'target_group',
    'Hemerocampa', 'Dyar',
    '1EREBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GLOAO', 'GAF', 'disease', 'target_group',
    'Glomerellales', NULL,
    '1HYPRL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GLOMF', 'GAF', 'disease', 'target_group',
    'Glomerellaceae', NULL,
    '1GLOAO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COLLG', 'GAF', 'disease', 'target_group',
    'Colletotrichum', 'Corda',
    '1GLOMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PRATF', 'GAI', 'insect', 'target_group',
    'Pratylenchidae', NULL,
    '1RHABO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HIRSG', 'GAI', 'insect', 'target_group',
    'Hirschmanniella', 'Luc & Goodey',
    '1PRATF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AGMYG', 'GAI', 'insect', 'target_group',
    'Agromyza', 'Fallén',
    '1AGROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TENEP', 'GAF', 'disease', 'target_group',
    'Tenericutes', NULL,
    '1BACTK', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MOLLC', 'GAF', 'disease', 'target_group',
    'Mollicutes', NULL,
    '1TENEP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACHOO', 'GAF', 'disease', 'target_group',
    'Acholeplasmatales', NULL,
    '1MOLLC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACHOF', 'GAF', 'disease', 'target_group',
    'Acholeplasmataceae', NULL,
    '1ACHOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYPG', 'GAF', 'disease', 'target_group',
    '''Candidatus Phytoplasma''', NULL,
    '1ACHOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CUERG', 'GAI', 'insect', 'target_group',
    'Cuerna', 'Melichar',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ENTEO', 'GAF', 'disease', 'target_group',
    'Enterobacterales', NULL,
    '1GAMBC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ERWIF', 'GAF', 'disease', 'target_group',
    'Erwiniaceae', NULL,
    '1ENTEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ERWIG', 'GAF', 'disease', 'target_group',
    'Erwinia', 'Winslow et al.',
    '1ERWIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TENEF', 'GAI', 'insect', 'target_group',
    'Tenebrionidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LAGRG', 'GAI', 'insect', 'target_group',
    'Lagria', NULL,
    '1TENEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APHRF', 'GAI', 'insect', 'target_group',
    'Aphrophoridae', 'Evans',
    '1AUCHR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LEPOG', 'GAI', 'insect', 'target_group',
    'Lepyronia', 'Amyot & Serville',
    '1APHRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MYTHG', 'GAI', 'insect', 'target_group',
    'Pseudaletia', 'Franclemont',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ENTIS', 'GAI', 'insect', 'target_group',
    'Entiminae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NAUPG', 'GAI', 'insect', 'target_group',
    'Graphognathus', 'Buchanan',
    '1ENTIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CIXIF', 'GAI', 'insect', 'target_group',
    'Cixiidae', NULL,
    '1AUCHR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1REPTG', 'GAI', 'insect', 'target_group',
    'Reptalus', 'Emeljanov',
    '1CIXIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SESAG', 'GAI', 'insect', 'target_group',
    'Sesamia', 'Guenée',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CLOTF', 'GAF', 'disease', 'target_group',
    'Closteroviridae', NULL,
    '1MARVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CLOTG', 'GAF', 'disease', 'target_group',
    'Closterovirus', NULL,
    '1CLOTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCURF', 'GAI', 'insect', 'target_group',
    'Scutelleridae', NULL,
    '1HETER', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EURYG', 'GAI', 'insect', 'target_group',
    'Eurygaster', 'Laporte',
    '1SCURF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TOLVC', 'GAF', 'disease', 'target_group',
    'Tolucaviricetes', NULL,
    '1KITVP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TOLVO', 'GAF', 'disease', 'target_group',
    'Tolivirales', NULL,
    '1TOLVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TOMBF', 'GAF', 'disease', 'target_group',
    'Tombusviridae', NULL,
    '1TOLVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LUTEG', 'GAF', 'disease', 'target_group',
    'Luteovirus', NULL,
    '1TOMBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OULEG', 'GAI', 'insect', 'target_group',
    'Oulema', 'des Gozis',
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BACLD', 'GAF', 'disease', 'target_group',
    'Bacterium-like plant pathogens', NULL,
    '1BACTK', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHLEG', 'GAI', 'insect', 'target_group',
    'Chloridea', 'Duncan & Westwood',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NECTF', 'GAF', 'disease', 'target_group',
    'Nectriaceae', NULL,
    '1HYPRO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FUSAG', 'GAF', 'disease', 'target_group',
    'Gibberella', 'Saccardo',
    '1NECTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRAMF', 'GAI', 'insect', 'target_group',
    'Crambidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LEUIG', 'GAI', 'insect', 'target_group',
    'Sceliodes', 'Guenée',
    '1CRAMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PEZZC', 'GAF', 'disease', 'target_group',
    'Pezizomycetes', NULL,
    '1PEZIQ', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PEZZO', 'GAF', 'disease', 'target_group',
    'Pezizales', NULL,
    '1PEZZC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RIZIF', 'GAF', 'disease', 'target_group',
    'Rhizinaceae', NULL,
    '1PEZZO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHMPG', 'GAF', 'disease', 'target_group',
    'Phymatotrichopsis (anamorphic genus)', NULL,
    '1RIZIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RADOG', 'GAI', 'insect', 'target_group',
    'Radopholus', 'Thorne',
    '1PRATF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BETBC', 'GAF', 'disease', 'target_group',
    'Betaproteobacteria', NULL,
    '1PROBP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BURKO', 'GAF', 'disease', 'target_group',
    'Burkholderiales', NULL,
    '1BETBC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COMAF', 'GAF', 'disease', 'target_group',
    'Comamonadaceae', NULL,
    '1BURKO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACVRG', 'GAF', 'disease', 'target_group',
    'Acidovorax', 'Willems et al.',
    '1COMAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCARF', 'GAI', 'insect', 'target_group',
    'Scarabaeidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ADORG', 'GAI', 'insect', 'target_group',
    'Adoretus', NULL,
    '1SCARF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CERCF', 'GAI', 'insect', 'target_group',
    'Cercopidae', NULL,
    '1AUCHR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AENEG', 'GAI', 'insect', 'target_group',
    'Aeneolamia', 'Fennah',
    '1CERCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AGROG', 'GAI', 'insect', 'target_group',
    'Agrotis', 'Ochsenheimer',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LIXIS', 'GAI', 'insect', 'target_group',
    'Lixinae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ASPOG', 'GAI', 'insect', 'target_group',
    'Asproparthenis', 'Gozis',
    '1LIXIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AUACG', 'GAI', 'insect', 'target_group',
    'Aulacophora', NULL,
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BAGRG', 'GAI', 'insect', 'target_group',
    'Bagrada', NULL,
    '1PENTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALEYF', 'GAI', 'insect', 'target_group',
    'Aleyrodidae', NULL,
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BEMIG', 'GAI', 'insect', 'target_group',
    'Bemisia', 'Quaintance & Baker',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLAPF', 'GAI', 'insect', 'target_group',
    'Plataspidae', NULL,
    '1HETER', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BRAPG', 'GAI', 'insect', 'target_group',
    'Brachyplatys', 'Boisduval',
    '1PLAPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRTZG', 'GAI', 'insect', 'target_group',
    'Ceratothripoides', 'Bagnall',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHILG', 'GAI', 'insect', 'target_group',
    'Chilo', 'Zincken',
    '1CRAMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHRXG', 'GAI', 'insect', 'target_group',
    'Pseudoplusia', 'McDunnough',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CONOG', 'GAI', 'insect', 'target_group',
    'Conoderus', NULL,
    '1ELATF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRYBG', 'GAI', 'insect', 'target_group',
    'Cryptoblabes', 'Zeller',
    '1PYRAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APIOF', 'GAI', 'insect', 'target_group',
    'Apionidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CYLAG', 'GAI', 'insect', 'target_group',
    'Cylas', 'Latreille',
    '1APIOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DECHG', 'GAI', 'insect', 'target_group',
    'Dechacona', 'Young',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DPREG', 'GAI', 'insect', 'target_group',
    'Diaprepes', 'Schönherr',
    '1ENTIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIATG', 'GAI', 'insect', 'target_group',
    'Diatraea', 'Guilding',
    '1CRAMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DICHG', 'GAI', 'insect', 'target_group',
    'Dichocrocis', NULL,
    '1CRAMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIDYF', 'GAF', 'disease', 'target_group',
    'Didymellaceae', 'Gruyter, Aveskamp & Verkley',
    '1PLEOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIDYG', 'GAF', 'disease', 'target_group',
    'Didymella', 'Saccardo ex Saccardo',
    '1DIDYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NOLIF', 'GAI', 'insect', 'target_group',
    'Nolidae', 'Hampson',
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EARIG', 'GAI', 'insect', 'target_group',
    'Earias', 'Hübner',
    '1NOLIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ELDAG', 'GAI', 'insect', 'target_group',
    'Eldana', NULL,
    '1PYRAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EOZOG', 'GAI', 'insect', 'target_group',
    'Euzophera', 'Zeller',
    '1PYRAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TINGF', 'GAI', 'insect', 'target_group',
    'Tingidae', 'Laporte',
    '1HETER', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GARGG', 'GAI', 'insect', 'target_group',
    'Gargaphia', 'Stål',
    '1TINGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HAPXG', 'GAI', 'insect', 'target_group',
    'Haplaxius', 'Fowler',
    '1CIXIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HOMLG', 'GAI', 'insect', 'target_group',
    'Homalodisca', 'Stål',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCOLS', 'GAI', 'insect', 'target_group',
    'Scolytinae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYOTG', 'GAI', 'insect', 'target_group',
    'Stephanoderes', 'Eichhoff',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DRYOF', 'GAI', 'insect', 'target_group',
    'Dryophthoridae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1METAG', 'GAI', 'insect', 'target_group',
    'Metamasius', 'Horn',
    '1DRYOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MOLMG', 'GAI', 'insect', 'target_group',
    'Molomea', 'China',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MUSSG', 'GAI', 'insect', 'target_group',
    'Mussidia', NULL,
    '1PYRAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NACLG', 'GAI', 'insect', 'target_group',
    'Nacoleia', NULL,
    '1CRAMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ONCMG', 'GAI', 'insect', 'target_group',
    'Oncometopia', NULL,
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TINEF', 'GAI', 'insect', 'target_group',
    'Tineidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OPOGG', 'GAI', 'insect', 'target_group',
    'Opogona', 'Zeller',
    '1TINEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PNTOG', 'GAF', 'disease', 'target_group',
    'Pantoea', 'Gavini et al.',
    '1ERWIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PERKG', 'GAI', 'insect', 'target_group',
    'Perkinsiella', 'Kirkaldy',
    '1DELPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PRSCG', 'GAF', 'disease', 'target_group',
    'Peronosclerospora', '(Ito) Hara',
    '1PEROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BLASP', 'GAF', 'disease', 'target_group',
    'Blastocladiomycota', NULL,
    '1FUNGK', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BLASO', 'GAF', 'disease', 'target_group',
    'Blastocladiales', NULL,
    '1BLASP', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYDF', 'GAF', 'disease', 'target_group',
    'Physodermataceae', NULL,
    '1BLASO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYDG', 'GAF', 'disease', 'target_group',
    'Physoderma', NULL,
    '1PHYDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TORTF', 'GAI', 'insect', 'target_group',
    'Tortricidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLAAG', 'GAI', 'insect', 'target_group',
    'Platynota', 'Clemens',
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POOPG', 'GAI', 'insect', 'target_group',
    'Poophilus', NULL,
    '1CERCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RHSCG', 'GAI', 'insect', 'target_group',
    'Rhabdoscelus', 'Marshall',
    '1DRYOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BURKF', 'GAF', 'disease', 'target_group',
    'Burkholderiaceae', NULL,
    '1BURKO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ROBBG', 'GAF', 'disease', 'target_group',
    'Robbsia', 'Lopes-Santos, Castro, Ferreira-Tonin, CorrIa, Weir, Park, Ottoboni, Neto & Destefano',
    '1BURKF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLAK', 'PFL', 'weed', 'target_group',
    'Plantae', NULL,
    NULL, TRUE, 7,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MAGP', 'PFL', 'weed', 'target_group',
    'Magnoliophyta', NULL,
    '1PLAK', TRUE, 6,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANGC', 'PFL', 'weed', 'target_group',
    'Angiospermae', NULL,
    '1MAGP', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LAMD', 'PFL', 'weed', 'target_group',
    'Lamiids', NULL,
    '1ANGC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LAMO', 'PFL', 'weed', 'target_group',
    'Lamiales', NULL,
    '1LAMD', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ORAF', 'PFL', 'weed', 'target_group',
    'Orobanchaceae', NULL,
    '1LAMO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STRG', 'PFL', 'weed', 'target_group',
    'Striga', 'Loureiro',
    '1ORAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DOLIF', 'GAI', 'insect', 'target_group',
    'Dolichodoridae', 'Chitwood',
    '1RHABO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TYLRG', 'GAI', 'insect', 'target_group',
    'Tylenchorhynchus', 'Cobb',
    '1DOLIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LONGF', 'GAI', 'insect', 'target_group',
    'Longidoridae', NULL,
    '1DORYO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XIPHG', 'GAI', 'insect', 'target_group',
    'Xiphinema', 'Cobb',
    '1LONGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ARHVG', 'GAF', 'disease', 'target_group',
    'Alphanucleorhabdovirus', NULL,
    '1RHAVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BUSSG', 'GAI', 'insect', 'target_group',
    'Busseola', 'Thurau',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EOREG', 'GAI', 'insect', 'target_group',
    'Eoreuma', NULL,
    '1CRAMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHELQ', 'GAI', 'insect', 'target_group',
    'Chelicerata', NULL,
    '1ARTHP', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ARACC', 'GAI', 'insect', 'target_group',
    'Arachnida', NULL,
    '1CHELQ', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACARO', 'GAI', 'insect', 'target_group',
    'Acarida', NULL,
    '1ARACC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ERIOF', 'GAI', 'insect', 'target_group',
    'Eriophyidae', NULL,
    '1ACARO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ERPHG', 'GAI', 'insect', 'target_group',
    'Eriophyes', 'von Siebold',
    '1ERIOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EXOMG', 'GAI', 'insect', 'target_group',
    'Exomala', 'Reitter',
    '1SCARF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HETRG', 'GAI', 'insect', 'target_group',
    'Heteronychus', 'Seidlitz',
    '1SCARF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OSTRG', 'GAI', 'insect', 'target_group',
    'Ostrinia', 'Hübner',
    '1PYRAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYRO', 'GAF', 'disease', 'target_group',
    'Phyllachorales', NULL,
    '1SRDAL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYRF', 'GAF', 'disease', 'target_group',
    'Phyllachoraceae', NULL,
    '1PHYRO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYRG', 'GAF', 'disease', 'target_group',
    'Phyllachora', 'Nitschke ex Fuckel',
    '1PHYRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POPIG', 'GAI', 'insect', 'target_group',
    'Popillia', 'Serville',
    '1SCARF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POTYG', 'GAF', 'disease', 'target_group',
    'Potyvirus', NULL,
    '1POTYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BOSTF', 'GAI', 'insect', 'target_group',
    'Bostrichidae', 'Latreille',
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PROEG', 'GAI', 'insect', 'target_group',
    'Prostephanus', NULL,
    '1BOSTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PUNCG', 'GAI', 'insect', 'target_group',
    'Punctodera', 'Mulvey & Stone',
    '1HETEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1YERSF', 'GAF', 'disease', 'target_group',
    'Yersiniaceae', NULL,
    '1ENTEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SERRG', 'GAF', 'disease', 'target_group',
    'Serratia', 'Bizio',
    '1YERSF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ENTPO', 'GAF', 'disease', 'target_group',
    'Entomoplasmatales', NULL,
    '1MOLLC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SPIRF', 'GAF', 'disease', 'target_group',
    'Spiroplasmataceae', NULL,
    '1ENTPO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SPIRG', 'GAF', 'disease', 'target_group',
    'Spiroplasma', NULL,
    '1SPIRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIAPL', 'GAF', 'disease', 'target_group',
    'Diaporthomycetidae', NULL,
    '1SORDC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIAPO', 'GAF', 'disease', 'target_group',
    'Diaporthales', NULL,
    '1DIAPL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIAPF', 'GAF', 'disease', 'target_group',
    'Diaporthaceae', NULL,
    '1DIAPO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STCAG', 'GAF', 'disease', 'target_group',
    'Stenocarpella', 'Sydow & P. Sydow',
    '1DIAPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1THATG', 'GAI', 'insect', 'target_group',
    'Thaumatotibia', 'Zacher',
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NEPHG', 'GAI', 'insect', 'target_group',
    'Nephotettix', NULL,
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TOSPF', 'GAF', 'disease', 'target_group',
    'Tospoviridae', NULL,
    '1ELLVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TOSPG', 'GAF', 'disease', 'target_group',
    'Orthotospovirus', NULL,
    '1TOSPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PERCG', 'GAF', 'disease', 'target_group',
    'Periconia', 'Tode',
    '1PLEOO', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSEUF', 'GAI', 'insect', 'target_group',
    'Pseudococcidae', NULL,
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHENG', 'GAI', 'insect', 'target_group',
    'Phenacoccus', 'Cockerell',
    '1PSEUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PRATG', 'GAI', 'insect', 'target_group',
    'Pratylenchus', 'Filipjev',
    '1PRATF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RICAF', 'GAI', 'insect', 'target_group',
    'Ricaniidae', 'Amyot & Serville',
    '1AUCHR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RICAG', 'GAI', 'insect', 'target_group',
    'Ricania', 'Germar',
    '1RICAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STEIG', 'GAI', 'insect', 'target_group',
    'Stenodiplosis', 'Reuter',
    '1CECIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HELHG', 'GAI', 'insect', 'target_group',
    'Helochara', 'Fitch',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FRISG', 'GAI', 'insect', 'target_group',
    'Friscanus', 'Oman',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BROMF', 'GAF', 'disease', 'target_group',
    'Bromoviridae', NULL,
    '1MARVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALFAG', 'GAF', 'disease', 'target_group',
    'Alfamovirus', NULL,
    '1BROMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRIVG', 'GAF', 'disease', 'target_group',
    'Crinivirus', NULL,
    '1CLOTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EPCHG', 'GAI', 'insect', 'target_group',
    'Epichoristodes', NULL,
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EPPHG', 'GAI', 'insect', 'target_group',
    'Epiphyas', NULL,
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EPIXG', 'GAI', 'insect', 'target_group',
    'Epitrix', 'Foudras',
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EURHG', 'GAI', 'insect', 'target_group',
    'Eurhizococcus', 'Silvestri',
    '1MARGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HISHG', 'GAI', 'insect', 'target_group',
    'Hishimonus', 'Ishihara',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYPES', 'GAI', 'insect', 'target_group',
    'Hyperinae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYPRG', 'GAI', 'insect', 'target_group',
    'Hypera', 'Germar',
    '1HYPES', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ILARG', 'GAF', 'disease', 'target_group',
    'Ilarvirus', NULL,
    '1BROMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LOBEG', 'GAI', 'insect', 'target_group',
    'Lobesia', 'Guenée',
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NKOLG', 'GAI', 'insect', 'target_group',
    'Neokolla', 'Melichar',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OMOPG', 'GAI', 'insect', 'target_group',
    'Omophlus', NULL,
    '1TENEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PGARG', 'GAI', 'insect', 'target_group',
    'Pagaronia', 'Ball',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PRDIG', 'GAI', 'insect', 'target_group',
    'Prodiplosis', 'Felt',
    '1CECIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCITG', 'GAI', 'insect', 'target_group',
    'Scirtothrips', 'Shull',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GELEF', 'GAI', 'insect', 'target_group',
    'Gelechiidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TUTAG', 'GAI', 'insect', 'target_group',
    'Tuta', 'Kieffer & Jörgensen',
    '1GELEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLECF', 'GAF', 'disease', 'target_group',
    'Plectosphaerellaceae', NULL,
    '1GLOAO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1VERTG', 'GAF', 'disease', 'target_group',
    'Verticillium (anamorphic genus)', 'Nees',
    '1PLECF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XYLEG', 'GAF', 'disease', 'target_group',
    'Xylella', 'Wells, Raju, Hung, Weisburg, Parl & Beemer',
    '1LYSOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACYRG', 'GAI', 'insect', 'target_group',
    'Acyrthosiphon', 'Mordvilko',
    '1APHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALYDF', 'GAI', 'insect', 'target_group',
    'Alydidae', 'Amyot & Serville',
    '1HETER', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CAMSG', 'GAI', 'insect', 'target_group',
    'Camptopus', NULL,
    '1ALYDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FRANG', 'GAI', 'insect', 'target_group',
    'Frankliniella', 'Karny',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GONCG', 'GAI', 'insect', 'target_group',
    'Gonioctena', NULL,
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PISVC', 'GAF', 'disease', 'target_group',
    'Pisoniviricetes', NULL,
    '1PISVP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PRNAO', 'GAF', 'disease', 'target_group',
    'Picornavirales', NULL,
    '1PISVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SECOF', 'GAF', 'disease', 'target_group',
    'Secoviridae', NULL,
    '1PRNAO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SADWG', 'GAF', 'disease', 'target_group',
    'Sadwavirus', NULL,
    '1SECOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LYCAF', 'GAI', 'insect', 'target_group',
    'Lycaenidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LAMDG', 'GAI', 'insect', 'target_group',
    'Lampides', NULL,
    '1LYCAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACTNO', 'GAF', 'disease', 'target_group',
    'Actinomycetales', NULL,
    '1ACTIC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NOCRF', 'GAF', 'disease', 'target_group',
    'Nocardiaceae', NULL,
    '1ACTNO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RHDCG', 'GAF', 'disease', 'target_group',
    'Rhodococcus', 'Zopf',
    '1NOCRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TOBRG', 'GAF', 'disease', 'target_group',
    'Tobravirus', NULL,
    '1VIRGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NEPOG', 'GAF', 'disease', 'target_group',
    'Nepovirus', NULL,
    '1SECOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TETRF', 'GAI', 'insect', 'target_group',
    'Tetranychidae', 'Donnadieu',
    '1ACARO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TETRG', 'GAI', 'insect', 'target_group',
    'Tetranychus', 'Dufour',
    '1TETRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALEDG', 'GAI', 'insect', 'target_group',
    'Aleurodicus', 'Douglas',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BEGOG', 'GAF', 'disease', 'target_group',
    'Begomovirus', NULL,
    '1GEMIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FULGF', 'GAI', 'insect', 'target_group',
    'Fulgoridae', 'Latreille',
    '1AUCHR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LYCMG', 'GAI', 'insect', 'target_group',
    'Lycorma', 'Stål',
    '1FULGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MCNLG', 'GAI', 'insect', 'target_group',
    'Maconellicoccus', 'Ezzat',
    '1PSEUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MEGTG', 'GAI', 'insect', 'target_group',
    'Megalurothrips', 'Bagnall',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PYTHO', 'GAF', 'disease', 'target_group',
    'Pythiales', NULL,
    '1OOMYC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PYTHF', 'GAF', 'disease', 'target_group',
    'Pythiaceae', NULL,
    '1PYTHO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PYTHG', 'GAF', 'disease', 'target_group',
    'Pythium', 'Pringsheim',
    '1PYTHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APHIG', 'GAI', 'insect', 'target_group',
    'Aphis', 'Linnaeus',
    '1APHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LETOC', 'GAF', 'disease', 'target_group',
    'Leotiomycetes', NULL,
    '1PEZIQ', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HELOO', 'GAF', 'disease', 'target_group',
    'Helotiales', NULL,
    '1LETOC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POETF', 'GAF', 'disease', 'target_group',
    'Ploettnerulaceae', NULL,
    '1HELOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CADOG', 'GAF', 'disease', 'target_group',
    'Cadophora', 'Lagerberg & Melin',
    '1POETF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TYMOO', 'GAF', 'disease', 'target_group',
    'Tymovirales', NULL,
    '1ALSVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BFLXF', 'GAF', 'disease', 'target_group',
    'Betaflexiviridae', NULL,
    '1TYMOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CARLG', 'GAF', 'disease', 'target_group',
    'Carlavirus', NULL,
    '1BFLXF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DTHDL', 'GAF', 'disease', 'target_group',
    'Dothideomycetidae', NULL,
    '1DOTHC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MYCPO', 'GAF', 'disease', 'target_group',
    'Mycosphaerellales', NULL,
    '1DTHDL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MYCOF', 'GAF', 'disease', 'target_group',
    'Mycosphaerellaceae', NULL,
    '1MYCPO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CERCG', 'GAF', 'disease', 'target_group',
    'Cercospora', 'Fresenius ex Fuckel',
    '1MYCOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CYDIG', 'GAI', 'insect', 'target_group',
    'Cydia', 'Hübner',
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIAPG', 'GAF', 'disease', 'target_group',
    'Diaporthopsis', 'Fabre',
    '1DIAPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SOBVO', 'GAF', 'disease', 'target_group',
    'Sobelivirales', NULL,
    '1PISVC', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SOLVF', 'GAF', 'disease', 'target_group',
    'Solemoviridae', NULL,
    '1SOBVO', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MGCOG', 'GAI', 'insect', 'target_group',
    'Megacopta', 'Hsiao & Jen',
    '1PLAPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PEROG', 'GAF', 'disease', 'target_group',
    'Peronospora', 'Corda',
    '1PEROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHAKF', 'GAF', 'disease', 'target_group',
    'Phakopsoraceae', NULL,
    '1UREDO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHAKG', 'GAF', 'disease', 'target_group',
    'Phakopsora', 'Dietel',
    '1PHAKF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYTG', 'GAF', 'disease', 'target_group',
    'Phytophthora', 'de Bary',
    '1PEROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SEPTG', 'GAF', 'disease', 'target_group',
    'Septoria', 'Saccardo',
    '1MYCOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1UROMG', 'GAF', 'disease', 'target_group',
    'Uromyces', '(Link) Unger',
    '1PUCCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APHRG', 'GAI', 'insect', 'target_group',
    'Aphrophora', 'Germar',
    '1APHRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AMRAG', 'GAI', 'insect', 'target_group',
    'Amrasca', 'Ghauri',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PENHF', 'GAI', 'insect', 'target_group',
    'Penthaleidae', NULL,
    '1ACARO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HALOG', 'GAI', 'insect', 'target_group',
    'Halotydeus', NULL,
    '1PENHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EOTEG', 'GAI', 'insect', 'target_group',
    'Eotetranychus', 'Oudemans',
    '1TETRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHONG', 'GAI', 'insect', 'target_group',
    'Choristoneura', 'Lederer',
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COMOG', 'GAF', 'disease', 'target_group',
    'Comovirus', NULL,
    '1SECOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ERTNG', 'GAI', 'insect', 'target_group',
    'Erthesina', 'Spinola',
    '1PENTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALPBC', 'GAF', 'disease', 'target_group',
    'Alphaproteobacteria', NULL,
    '1PROBP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RIZBO', 'GAF', 'disease', 'target_group',
    'Rhizobiales', NULL,
    '1ALPBC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RIZBF', 'GAF', 'disease', 'target_group',
    'Rhizobiaceae', NULL,
    '1RIZBO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AGRBG', 'GAF', 'disease', 'target_group',
    'Agrobacterium', 'Conn',
    '1RIZBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALEUG', 'GAI', 'insect', 'target_group',
    'Aleurodes', 'Latreille',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYMEO', 'GAI', 'insect', 'target_group',
    'Hymenoptera', NULL,
    '1INSEC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TENTF', 'GAI', 'insect', 'target_group',
    'Tenthredinidae', NULL,
    '1HYMEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ATALG', 'GAI', 'insect', 'target_group',
    'Athalia', 'Leach',
    '1TENTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CEUTS', 'GAI', 'insect', 'target_group',
    'Ceutorhynchinae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CEUTG', 'GAI', 'insect', 'target_group',
    'Ceutorhynchus', 'Germar',
    '1CEUTS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EURDG', 'GAI', 'insect', 'target_group',
    'Eurydema', 'Laporte de Castelnau',
    '1PENTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYDRF', 'GAI', 'insect', 'target_group',
    'Hydrophilidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HELPG', 'GAI', 'insect', 'target_group',
    'Helophorus', 'Fabricius',
    '1HYDRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MAMEG', 'GAI', 'insect', 'target_group',
    'Barathra', 'Hübner',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TIPUF', 'GAI', 'insect', 'target_group',
    'Tipulidae', NULL,
    '1DIPTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NPHTG', 'GAI', 'insect', 'target_group',
    'Nephrotoma', NULL,
    '1TIPUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MOLLP', 'GAI', 'insect', 'target_group',
    'Mollusca', NULL,
    '1ANIMK', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GASTC', 'GAI', 'insect', 'target_group',
    'Gastropoda', NULL,
    '1MOLLP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SIGMO', 'GAI', 'insect', 'target_group',
    'Sigmurethra', NULL,
    '1GASTC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HELIF', 'GAI', 'insect', 'target_group',
    'Helicidae', NULL,
    '1SIGMO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OTALG', 'GAI', 'insect', 'target_group',
    'Otala', 'Schumacher',
    '1HELIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYEG', 'GAI', 'insect', 'target_group',
    'Phyllotreta', 'Chevrolat',
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYYG', 'GAI', 'insect', 'target_group',
    'Phytomyza', 'Fallén',
    '1AGROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PIERF', 'GAI', 'insect', 'target_group',
    'Pieridae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PIERG', 'GAI', 'insect', 'target_group',
    'Pieris (Animalia)', NULL,
    '1PIERF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLADG', 'GAF', 'disease', 'target_group',
    'Plasmodiophora', NULL,
    '1PLADF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LPTSF', 'GAF', 'disease', 'target_group',
    'Leptosphaeriaceae', NULL,
    '1PLEOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLENG', 'GAF', 'disease', 'target_group',
    'Deuterophoma', 'Petri',
    '1LPTSF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSYIG', 'GAI', 'insect', 'target_group',
    'Psylliodes', NULL,
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TATOG', 'GAI', 'insect', 'target_group',
    'Tatochila', NULL,
    '1PIERF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRYPS', 'GAI', 'insect', 'target_group',
    'Cryptorhynchinae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TYLOG', 'GAI', 'insect', 'target_group',
    'Tyloderma', 'Say',
    '1CRYPS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NACOG', 'GAI', 'insect', 'target_group',
    'Nacobbus', 'Thorne & Allen',
    '1PRATF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RHYCG', 'GAI', 'insect', 'target_group',
    'Rhynchophorus', 'Herbst',
    '1DRYOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CUTVG', 'GAF', 'disease', 'target_group',
    'Curtovirus', NULL,
    '1GEMIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LISTG', 'GAI', 'insect', 'target_group',
    'Listroderes', 'Schönherr',
    '1CYCLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LUPMG', 'GAI', 'insect', 'target_group',
    'Luperomorpha', 'Weise',
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PYRRF', 'GAI', 'insect', 'target_group',
    'Pyrrhocoridae', NULL,
    '1HETER', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DYSDG', 'GAI', 'insect', 'target_group',
    'Dysdercus', NULL,
    '1PYRRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHAEG', 'GAI', 'insect', 'target_group',
    'Phaedon', NULL,
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHEVG', 'GAF', 'disease', 'target_group',
    'Cheravirus', NULL,
    '1SECOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BLISG', 'GAI', 'insect', 'target_group',
    'Blissus', 'Burmeister',
    '1LYGAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GAREG', 'GAI', 'insect', 'target_group',
    'Garella', 'Walker',
    '1NOLIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BUPRF', 'GAI', 'insect', 'target_group',
    'Buprestidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AGRLG', 'GAI', 'insect', 'target_group',
    'Agrilus', 'Curtis',
    '1BUPRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALECG', 'GAI', 'insect', 'target_group',
    'Aleurocanthus', 'Quaintance & Baker',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIASF', 'GAI', 'insect', 'target_group',
    'Diaspididae', NULL,
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AONDG', 'GAI', 'insect', 'target_group',
    'Aonidiella', 'Berlese & Leonardi',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CERAF', 'GAI', 'insect', 'target_group',
    'Cerambycidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APRIG', 'GAI', 'insect', 'target_group',
    'Apriona', 'Chevrolat',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BRENF', 'GAI', 'insect', 'target_group',
    'Brentidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ARRHG', 'GAI', 'insect', 'target_group',
    'Arrhenodes', NULL,
    '1BRENF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CACMG', 'GAI', 'insect', 'target_group',
    'Cacoecimorpha', 'Obraztsov',
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COCCF', 'GAI', 'insect', 'target_group',
    'Coccidae', NULL,
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CERPG', 'GAI', 'insect', 'target_group',
    'Ceroplastes', 'Gray',
    '1COCCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COMSG', 'GAI', 'insect', 'target_group',
    'Comstockaspis', 'MacGillivray',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EUPRG', 'GAI', 'insect', 'target_group',
    'Porthesia', 'Stephens',
    '1EREBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EUWAG', 'GAI', 'insect', 'target_group',
    'Euwallacea', 'Hopkins',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LEPSG', 'GAI', 'insect', 'target_group',
    'Lepidosaphes', 'Shimer',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LOPLG', 'GAI', 'insect', 'target_group',
    'Lopholeucaspis', 'Balachowsky',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LASIF', 'GAI', 'insect', 'target_group',
    'Lasiocampidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MALAG', 'GAI', 'insect', 'target_group',
    'Malacosoma', NULL,
    '1LASIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLATS', 'GAI', 'insect', 'target_group',
    'Platypodinae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MEGPG', 'GAI', 'insect', 'target_group',
    'Megaplatypus', 'Wood',
    '1PLATS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MELMF', 'GAF', 'disease', 'target_group',
    'Melampsoraceae', NULL,
    '1UREDO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MELMG', 'GAF', 'disease', 'target_group',
    'Melampsora', 'Castagne',
    '1MELMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GEOMF', 'GAI', 'insect', 'target_group',
    'Geometridae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OPERG', 'GAI', 'insect', 'target_group',
    'Operophtera', 'Hübner',
    '1GEOMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POCZG', 'GAI', 'insect', 'target_group',
    'Pochazia', 'Amyot & Serville',
    '1RICAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSECG', 'GAI', 'insect', 'target_group',
    'Pseudococcus', 'Westwood',
    '1PSEUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRIFG', 'GAI', 'insect', 'target_group',
    'Trichoferus', 'Wollaston',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRRAG', 'GAI', 'insect', 'target_group',
    'Trirachys', 'Hope',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XYLSG', 'GAI', 'insect', 'target_group',
    'Xylosandrus', 'Reitter',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANOLG', 'GAI', 'insect', 'target_group',
    'Anoplophora', 'Hope',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANIDG', 'GAI', 'insect', 'target_group',
    'Anisandrus', 'Ferrari',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PECTF', 'GAF', 'disease', 'target_group',
    'Pectobacteriaceae', NULL,
    '1ENTEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BRNNG', 'GAF', 'disease', 'target_group',
    'Brenneria', 'Hauben et al.',
    '1PECTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHRBG', 'GAI', 'insect', 'target_group',
    'Chrysobothris', 'Eschscholtz',
    '1BUPRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XYLAL', 'GAF', 'disease', 'target_group',
    'Xylariomycetidae', NULL,
    '1SORDC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XYLAO', 'GAF', 'disease', 'target_group',
    'Xylariales', NULL,
    '1XYLAL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XYLAF', 'GAF', 'disease', 'target_group',
    'Xylariaceae', NULL,
    '1XYLAO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ENTKG', 'GAF', 'disease', 'target_group',
    'Entoleuca', 'Sydow',
    '1XYLAF', TRUE, 1,
    TRUE
);
