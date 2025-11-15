-- EPPO Pest Codes - Batch 2
-- Contains 500 INSERT statements
-- Run batches in order: 01, 02, 03, etc.


INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LYMAG', 'GAI', 'insect', 'target_group',
    'Lymantria', 'Hübner',
    '1EREBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ORIEG', 'GAI', 'insect', 'target_group',
    'Orientus', 'DeLong',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PRABG', 'GAI', 'insect', 'target_group',
    'Parabemisia', 'Takahashi',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCOLG', 'GAI', 'insect', 'target_group',
    'Scolytus', 'Geoffroy',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GRCPG', 'GAI', 'insect', 'target_group',
    'Graphocephala', 'van Duzee',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TEPHF', 'GAI', 'insect', 'target_group',
    'Tephritidae', NULL,
    '1DIPTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CERTG', 'GAI', 'insect', 'target_group',
    'Ceratitis', 'MacLeay',
    '1TEPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PARVA', 'GAF', 'disease', 'target_group',
    'Pararnavirae', NULL,
    '1RIBVD', TRUE, 6,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ARTVP', 'GAF', 'disease', 'target_group',
    'Artverviricota', NULL,
    '1PARVA', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1REVVC', 'GAF', 'disease', 'target_group',
    'Revtraviricetes', NULL,
    '1ARTVP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ORTEO', 'GAF', 'disease', 'target_group',
    'Ortervirales', NULL,
    '1REVVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CAULF', 'GAF', 'disease', 'target_group',
    'Caulimoviridae', NULL,
    '1ORTEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BADNG', 'GAF', 'disease', 'target_group',
    'Badnavirus', NULL,
    '1CAULF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALTHG', 'GAI', 'insect', 'target_group',
    'Aleurothrixus', 'Quaintance & Baker',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALTEG', 'GAF', 'disease', 'target_group',
    'Ulocladium', 'Preuss',
    '1PLEOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANSTG', 'GAI', 'insect', 'target_group',
    'Toxotrypana', 'Gerstaecker',
    '1TEPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BCTRG', 'GAI', 'insect', 'target_group',
    'Bactrocera', 'Macquart',
    '1TEPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BATHG', 'GAI', 'insect', 'target_group',
    'Bathycoelia', NULL,
    '1PENTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TENUF', 'GAI', 'insect', 'target_group',
    'Tenuipalpidae', NULL,
    '1ACARO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BRVPG', 'GAI', 'insect', 'target_group',
    'Brevipalpus', 'Donnadieu',
    '1TENUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYBF', 'GAF', 'disease', 'target_group',
    'Phyllobacteriaceae', NULL,
    '1RIZBO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LIBEG', 'GAF', 'disease', 'target_group',
    'Liberibacter', NULL,
    '1PHYBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CAPLG', 'GAF', 'disease', 'target_group',
    'Capillovirus', NULL,
    '1BFLXF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHANG', 'GAI', 'insect', 'target_group',
    'Chaetanaphothrips', 'Priesner',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1KITVF', 'GAF', 'disease', 'target_group',
    'Kitaviridae', NULL,
    '1MARVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CILVG', 'GAF', 'disease', 'target_group',
    'Cilevirus', NULL,
    '1KITVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CIRCG', 'GAI', 'insect', 'target_group',
    'Circulifer', 'Zachvatkin',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CITVG', 'GAF', 'disease', 'target_group',
    'Citlodavirus', NULL,
    '1GEMIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1VIRLD', 'GAF', 'disease', 'target_group',
    'Virus-like diseases', NULL,
    '1VIRUK', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DICVG', 'GAF', 'disease', 'target_group',
    'Dichorhavirus', NULL,
    '1RHAVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COCCG', 'GAI', 'insect', 'target_group',
    'Coccus', NULL,
    '1COCCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DERMF', 'GAF', 'disease', 'target_group',
    'Dermateaceae', NULL,
    '1HELOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CYPTG', 'GAF', 'disease', 'target_group',
    'Cryptosporiopsis (rejected name)', 'Bubák & Kabát',
    '1DERMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DEMAG', 'GAF', 'disease', 'target_group',
    'Dematophora', 'R. Hartig',
    '1XYLAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIALG', 'GAI', 'insect', 'target_group',
    'Dialeurodes', 'Cockerell',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSYLF', 'GAI', 'insect', 'target_group',
    'Psyllidae', 'Latreille',
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIAAG', 'GAI', 'insect', 'target_group',
    'Diaphorina', 'Loew',
    '1PSYLF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MIRIF', 'GAI', 'insect', 'target_group',
    'Miridae', NULL,
    '1HETER', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DISTG', 'GAI', 'insect', 'target_group',
    'Distantiella', 'China',
    '1MIRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MYRIO', 'GAF', 'disease', 'target_group',
    'Myriangiales', NULL,
    '1DTHDL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ELSIF', 'GAF', 'disease', 'target_group',
    'Elsinoaceae', NULL,
    '1MYRIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ELSIG', 'GAF', 'disease', 'target_group',
    'Elsinoë', 'Raciborski',
    '1ELSIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ENAMG', 'GAF', 'disease', 'target_group',
    'Enamovirus', NULL,
    '1SOLVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EUTEG', 'GAI', 'insect', 'target_group',
    'Eutetranychus', 'Banks',
    '1TETRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EUZDG', 'GAI', 'insect', 'target_group',
    'Euzopherodes', 'Hampson',
    '1PYRAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GASDG', 'GAI', 'insect', 'target_group',
    'Gascardia', NULL,
    '1COCCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GMNDG', 'GAI', 'insect', 'target_group',
    'Gymnandrosoma', 'Dyar',
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MONOF', 'GAI', 'insect', 'target_group',
    'Monophlebidae', NULL,
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ICERG', 'GAI', 'insect', 'target_group',
    'Icerya', 'Signoret',
    '1MONOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1JACSG', 'GAI', 'insect', 'target_group',
    'Jacobiasca', NULL,
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BOTSO', 'GAF', 'disease', 'target_group',
    'Botryosphaeriales', NULL,
    '1DOTHC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BOTSF', 'GAF', 'disease', 'target_group',
    'Botryosphaeriaceae', NULL,
    '1BOTSO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LSDPG', 'GAF', 'disease', 'target_group',
    'Lasiodiplodia (anamorphic genus)', 'Ellis & Everhart',
    '1BOTSF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COREF', 'GAI', 'insect', 'target_group',
    'Coreidae', NULL,
    '1HETER', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LEPLG', 'GAI', 'insect', 'target_group',
    'Leptoglossus', 'Guérin-Méneville',
    '1COREF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACHAF', 'GAI', 'insect', 'target_group',
    'Achatinidae', NULL,
    '1SIGMO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LISCG', 'GAI', 'insect', 'target_group',
    'Lissachatina', 'Bequaert',
    '1ACHAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BASIC', 'GAF', 'disease', 'target_group',
    'Agaricomycotina', NULL,
    '1BASIP', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AGARL', 'GAF', 'disease', 'target_group',
    'Agaricomycetes', NULL,
    '1BASIC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CORTO', 'GAF', 'disease', 'target_group',
    'Corticiales', NULL,
    '1AGARL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CORTF', 'GAF', 'disease', 'target_group',
    'Corticiaceae', NULL,
    '1CORTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NEKAG', 'GAF', 'disease', 'target_group',
    'Necator', 'Massee',
    '1CORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NEOAG', 'GAI', 'insect', 'target_group',
    'Neoaliturus', 'Distant',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OEMOG', 'GAI', 'insect', 'target_group',
    'Oemona', 'Newman',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MILVC', 'GAF', 'disease', 'target_group',
    'Milneviricetes', NULL,
    '1HAPVQ', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SERPO', 'GAF', 'disease', 'target_group',
    'Naedrevirales', NULL,
    '1MILVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OPHVF', 'GAF', 'disease', 'target_group',
    'Aspiviridae', NULL,
    '1SERPO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OPHVG', 'GAF', 'disease', 'target_group',
    'Ophiovirus', NULL,
    '1OPHVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ORCMG', 'GAI', 'insect', 'target_group',
    'Orchamoplatus', NULL,
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PACNG', 'GAI', 'insect', 'target_group',
    'Pachnaeus', 'Schönherr',
    '1ENTIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PASAG', 'GAI', 'insect', 'target_group',
    'Parasaissetia', 'Takahashi',
    '1COCCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PARLG', 'GAI', 'insect', 'target_group',
    'Parlatoria', 'Targioni-Tozzetti',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PETHG', 'GAI', 'insect', 'target_group',
    'Penthimiola', 'Linnavuori',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PEZTG', 'GAI', 'insect', 'target_group',
    'Pezothrips', 'Karny',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GRACF', 'GAI', 'insect', 'target_group',
    'Gracillariidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYNG', 'GAI', 'insect', 'target_group',
    'Phyllocnistis', 'Zeller',
    '1GRACF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYCF', 'GAF', 'disease', 'target_group',
    'Phyllostictaceae', 'Fries',
    '1BOTSO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYSG', 'GAF', 'disease', 'target_group',
    'Phyllosticta (anamorphic genus)', NULL,
    '1PHYCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLANG', 'GAI', 'insect', 'target_group',
    'Planococcus', 'Ferris',
    '1PSEUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1VIRDD', 'GAF', 'disease', 'target_group',
    'Viroids', NULL,
    '1VIRUK', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POSPF', 'GAF', 'disease', 'target_group',
    'Pospiviroidae', NULL,
    '1VIRDD', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POSPG', 'GAF', 'disease', 'target_group',
    'Pospiviroid', NULL,
    '1POSPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AFLXF', 'GAF', 'disease', 'target_group',
    'Alphaflexiviridae', NULL,
    '1TYMOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POTXG', 'GAF', 'disease', 'target_group',
    'Potexvirus', NULL,
    '1AFLXF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1YPONF', 'GAI', 'insect', 'target_group',
    'Yponomeutidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PRAYG', 'GAI', 'insect', 'target_group',
    'Prays', 'Hübner',
    '1YPONF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSCSG', 'GAF', 'disease', 'target_group',
    'Cercoseptoria', 'Petrák',
    '1MYCOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ROTYG', 'GAI', 'insect', 'target_group',
    'Rotylenchulus', 'Linford & Oliveira',
    '1HOPLF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SLENG', 'GAI', 'insect', 'target_group',
    'Selenothrips', 'Karny',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1THEBG', 'GAI', 'insect', 'target_group',
    'Theba', NULL,
    '1HELIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TIRAG', 'GAI', 'insect', 'target_group',
    'Tiracola', 'Moore',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TYLEF', 'GAI', 'insect', 'target_group',
    'Tylenchulidae', 'Skarbilovich',
    '1RHABO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TYLEG', 'GAI', 'insect', 'target_group',
    'Tylenchulus', 'Cobb',
    '1TYLEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1UNASG', 'GAI', 'insect', 'target_group',
    'Unaspis', 'MacGillivray',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DROSF', 'GAI', 'insect', 'target_group',
    'Drosophilidae', NULL,
    '1DIPTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ZAPRG', 'GAI', 'insect', 'target_group',
    'Zaprionus', 'Coquillett',
    '1DROSF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACEIG', 'GAI', 'insect', 'target_group',
    'Aceria', 'Keifer',
    '1ERIOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CCADG', 'GAF', 'disease', 'target_group',
    'Cocadviroid', NULL,
    '1POSPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HOSTG', 'GAF', 'disease', 'target_group',
    'Hostuviroid', NULL,
    '1POSPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PARYG', 'GAI', 'insect', 'target_group',
    'Paraleyrodes', 'Quaintance',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRIZF', 'GAI', 'insect', 'target_group',
    'Triozidae', 'Löw',
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRIZG', 'GAI', 'insect', 'target_group',
    'Trioza', 'Förster',
    '1TRIZF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACRGG', 'GAI', 'insect', 'target_group',
    'Acrogonia', 'Stål',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FINGG', 'GAI', 'insect', 'target_group',
    'Fingeriana', 'Cavichioli',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BUCLG', 'GAI', 'insect', 'target_group',
    'Bucephalogonia', 'Melichar',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHRYG', 'GAI', 'insect', 'target_group',
    'Chrysomphalus', 'Ashmead',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DACUG', 'GAI', 'insect', 'target_group',
    'Dacus', 'Fabricius',
    '1TEPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DLBPG', 'GAI', 'insect', 'target_group',
    'Dilobopterus', NULL,
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DROSG', 'GAI', 'insect', 'target_group',
    'Drosophila', 'Fallén',
    '1DROSF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HIGVG', 'GAF', 'disease', 'target_group',
    'Higrevirus', NULL,
    '1KITVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MAGOG', 'GAI', 'insect', 'target_group',
    'Macugonalia', 'Young',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSFBG', 'GAF', 'disease', 'target_group',
    'Pseudofabraea', 'Chen, Verkley & Crous',
    '1DERMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RESSG', 'GAI', 'insect', 'target_group',
    'Thomasia', 'Rübsaamen',
    '1CECIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SIBOG', 'GAI', 'insect', 'target_group',
    'Sibovia', 'China',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SONEG', 'GAI', 'insect', 'target_group',
    'Sonesimia', 'Young',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ZEUDG', 'GAI', 'insect', 'target_group',
    'Zeugodacus', 'Hendel',
    '1TEPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TYMOF', 'GAF', 'disease', 'target_group',
    'Tymoviridae', NULL,
    '1TYMOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MARFG', 'GAF', 'disease', 'target_group',
    'Marafivirus', NULL,
    '1TYMOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALCLG', 'GAI', 'insect', 'target_group',
    'Aleurotuberculatus', 'Takahashi',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CTRIG', 'GAF', 'disease', 'target_group',
    'Citrivirus', NULL,
    '1BFLXF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PPYTG', 'GAF', 'disease', 'target_group',
    'Phytopythium', 'Abad, De Cock, Bala, Robideau, Lodhi & Lévesque',
    '1PYTHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NCRBG', 'GAI', 'insect', 'target_group',
    'Neocerambyx', 'Thomson',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AMPSO', 'GAF', 'disease', 'target_group',
    'Amphisphaeriales', NULL,
    '1XYLAL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SOROF', 'GAF', 'disease', 'target_group',
    'Bartaliniaceae', 'Wijayawardene, Maharachchikumbura, P.M. Kirk & K.D. Hyde',
    '1AMPSO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NPESG', 'GAF', 'disease', 'target_group',
    'Neopestalotiopsis', 'Maharachchikumbura, K.D. Hyde & Crous',
    '1SOROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACNLF', 'GAI', 'insect', 'target_group',
    'Acanaloniidae', NULL,
    '1AUCHR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACNLG', 'GAI', 'insect', 'target_group',
    'Acanalonia', NULL,
    '1ACNLF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRTHG', 'GAI', 'insect', 'target_group',
    'Corythucha', 'Stål',
    '1TINGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GNOMF', 'GAF', 'disease', 'target_group',
    'Gnomoniaceae', NULL,
    '1DIAPO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GNMPG', 'GAF', 'disease', 'target_group',
    'Gnomoniopsis', 'Berlese',
    '1GNOMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYPHG', 'GAI', 'insect', 'target_group',
    'Hyphantria', 'Harris',
    '1EREBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LNSDG', 'GAF', 'disease', 'target_group',
    'Lonsdalea', 'Brady, Cleenwerck, Denman, Venter, Rodriguez-Palenzuela, Coutinho & de Vos',
    '1PECTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCLEF', 'GAF', 'disease', 'target_group',
    'Sclerotiniaceae', NULL,
    '1HELOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MONIG', 'GAF', 'disease', 'target_group',
    'Monilia', 'Bonorden',
    '1SCLEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XYBIG', 'GAI', 'insect', 'target_group',
    'Xyleborinus', 'Reitter',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANIGG', 'GAF', 'disease', 'target_group',
    'Anisogramma', 'Theissen & Sydow',
    '1GNOMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CURCS', 'GAI', 'insect', 'target_group',
    'Curculioninae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CURCG', 'GAI', 'insect', 'target_group',
    'Curculio', 'Linnaeus',
    '1CURCS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ERYSO', 'GAF', 'disease', 'target_group',
    'Erysiphales', NULL,
    '1LETOC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ERYSF', 'GAF', 'disease', 'target_group',
    'Erysiphaceae', NULL,
    '1ERYSO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ERYSG', 'GAF', 'disease', 'target_group',
    'Uncinula', 'Léveillé',
    '1ERYSF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OXYCF', 'GAI', 'insect', 'target_group',
    'Oxycarenidae', NULL,
    '1HETER', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OXYAG', 'GAI', 'insect', 'target_group',
    'Oxycarenus', 'Fieber',
    '1OXYCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ADXPG', 'GAI', 'insect', 'target_group',
    'Adoxophyes', 'Meyrick',
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANARG', 'GAI', 'insect', 'target_group',
    'Anarsia', 'Zeller',
    '1GELEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANTHG', 'GAI', 'insect', 'target_group',
    'Anthonomus', 'Germar',
    '1CURCS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1VENTO', 'GAF', 'disease', 'target_group',
    'Venturiales', NULL,
    '1DOTHC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1VENTF', 'GAF', 'disease', 'target_group',
    'Venturiaceae', NULL,
    '1VENTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APIPG', 'GAF', 'disease', 'target_group',
    'Dibotryon', 'Theissen & Sydow',
    '1VENTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CARSF', 'GAI', 'insect', 'target_group',
    'Carposinidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CARSG', 'GAI', 'insect', 'target_group',
    'Carposina', 'Herrich-Schäffer',
    '1CARSF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AGARO', 'GAF', 'disease', 'target_group',
    'Agaricales', NULL,
    '1AGARL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CYPHF', 'GAF', 'disease', 'target_group',
    'Cyphellaceae', NULL,
    '1AGARO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1KDOSG', 'GAF', 'disease', 'target_group',
    'Chondrostereum', NULL,
    '1CYPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MOLYS', 'GAI', 'insect', 'target_group',
    'Molytinae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CONHG', 'GAI', 'insect', 'target_group',
    'Conotrachelus', 'Dejean',
    '1MOLYS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1VALSF', 'GAF', 'disease', 'target_group',
    'Cytosporaceae', NULL,
    '1DIAPO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CYTOG', 'GAF', 'disease', 'target_group',
    'Leucostoma', '(Nitschke) Höhnel',
    '1VALSF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GRPLG', 'GAI', 'insect', 'target_group',
    'Grapholita', 'Treitschke',
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LIMCF', 'GAI', 'insect', 'target_group',
    'Limacodidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MONMG', 'GAI', 'insect', 'target_group',
    'Monema', NULL,
    '1LIMCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OLIGG', 'GAI', 'insect', 'target_group',
    'Oligonychus', 'Berlese',
    '1TETRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AVSUF', 'GAF', 'disease', 'target_group',
    'Avsunviroidae', NULL,
    '1VIRDD', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PELAG', 'GAF', 'disease', 'target_group',
    'Pelamoviroid', NULL,
    '1AVSUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSEAG', 'GAI', 'insect', 'target_group',
    'Pseudaulacaspis', 'MacGillivray',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RHAGG', 'GAI', 'insect', 'target_group',
    'Rhagoletis', 'Loew',
    '1TEPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RIZBG', 'GAF', 'disease', 'target_group',
    'Rhizobium', 'Frank',
    '1RIZBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ROBIG', 'GAF', 'disease', 'target_group',
    'Robigovirus', NULL,
    '1BFLXF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SAPEG', 'GAI', 'insect', 'target_group',
    'Saperda', 'Fabricius',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STRVG', 'GAF', 'disease', 'target_group',
    'Stralarivirus', NULL,
    '1SECOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRCVG', 'GAF', 'disease', 'target_group',
    'Trichovirus', NULL,
    '1BFLXF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1VELVG', 'GAF', 'disease', 'target_group',
    'Velarivirus', NULL,
    '1CLOTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AROMG', 'GAI', 'insect', 'target_group',
    'Aromia', 'Audinet de Serville',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FUNLD', 'GAF', 'disease', 'target_group',
    'Fungi-like diseases', NULL,
    '1FUNGK', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CAPNG', 'GAI', 'insect', 'target_group',
    'Capnodis', NULL,
    '1BUPRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EURYF', 'GAI', 'insect', 'target_group',
    'Eurytomidae', NULL,
    '1HYMEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EURTG', 'GAI', 'insect', 'target_group',
    'Eurytoma', 'Illiger',
    '1EURYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIATF', 'GAF', 'disease', 'target_group',
    'Diatrypaceae', NULL,
    '1XYLAO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EUTYG', 'GAF', 'disease', 'target_group',
    'Eutypa', NULL,
    '1DIATF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XYLOG', 'GAI', 'insect', 'target_group',
    'Xylotrechus', 'Chevrolat',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACLRG', 'GAI', 'insect', 'target_group',
    'Acleris', 'Hübner',
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MAYVF', 'GAF', 'disease', 'target_group',
    'Mayoviridae', NULL,
    '1MARVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1IDAEG', 'GAF', 'disease', 'target_group',
    'Idaeovirus', NULL,
    '1MAYVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHRAF', 'GAF', 'disease', 'target_group',
    'Phragmidiaceae', NULL,
    '1UREDO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HAMAG', 'GAF', 'disease', 'target_group',
    'Hamaspora', NULL,
    '1PHRAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TOBAG', 'GAF', 'disease', 'target_group',
    'Tobamovirus', NULL,
    '1VIRGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BYTUF', 'GAI', 'insect', 'target_group',
    'Byturidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BYTUG', 'GAI', 'insect', 'target_group',
    'Byturus', NULL,
    '1BYTUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRONF', 'GAF', 'disease', 'target_group',
    'Cronartiaceae', NULL,
    '1UREDO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRONG', 'GAF', 'disease', 'target_group',
    'Endocronartium', 'Y. Hiratsuka',
    '1CRONF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EPHNG', 'GAI', 'insect', 'target_group',
    'Euphranta', 'Loew',
    '1TEPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CECPG', 'GAI', 'insect', 'target_group',
    'Cecidophyopsis', 'Keifer',
    '1ERIOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DRPPF', 'GAF', 'disease', 'target_group',
    'Drepanopezizaceae', NULL,
    '1HELOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DREPG', 'GAF', 'disease', 'target_group',
    'Drepanopeziza', '(Klebahn) Jaap',
    '1DRPPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LONGG', 'GAI', 'insect', 'target_group',
    'Longidorus', 'Micoletskii',
    '1LONGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STEPG', 'GAI', 'insect', 'target_group',
    'Stephanitis', 'Stål',
    '1TINGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BLUVG', 'GAF', 'disease', 'target_group',
    'Blunervirus', NULL,
    '1KITVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EXOBO', 'GAF', 'disease', 'target_group',
    'Exobasidiales', NULL,
    '1EXOBL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EXOBF', 'GAF', 'disease', 'target_group',
    'Exobasidiaceae', NULL,
    '1EXOBO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EXOBG', 'GAF', 'disease', 'target_group',
    'Exobasidium', 'Woronin',
    '1EXOBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GODRF', 'GAF', 'disease', 'target_group',
    'Godroniaceae', NULL,
    '1HELOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GODRG', 'GAF', 'disease', 'target_group',
    'Godronia', 'Mougeot & Léveillé',
    '1GODRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DASYG', 'GAI', 'insect', 'target_group',
    'Dasineura', 'Rondani',
    '1CECIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHLYG', 'GAI', 'insect', 'target_group',
    'Phlyctinus', 'Schönherr',
    '1ENTIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RALSG', 'GAF', 'disease', 'target_group',
    'Ralstonia', 'Yabuuchi, Kosako, Yano, Hotta & Nishiuchi',
    '1BURKF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PUCIF', 'GAF', 'disease', 'target_group',
    'Pucciniastraceae', NULL,
    '1UREDO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PUCIG', 'GAF', 'disease', 'target_group',
    'Pucciniastrum', 'Otth',
    '1PUCIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CNETG', 'GAI', 'insect', 'target_group',
    'Cnestus', 'Sampson',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DPHNG', 'GAI', 'insect', 'target_group',
    'Diaphania', 'Hübner',
    '1CRAMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHNTG', 'GAI', 'insect', 'target_group',
    'Phryneta', NULL,
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PRDRG', 'GAF', 'disease', 'target_group',
    'Peridiopsora', 'Kamat & Sathe',
    '1UREDO', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSACG', 'GAI', 'insect', 'target_group',
    'Psacothea', NULL,
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AMBPG', 'GAI', 'insect', 'target_group',
    'Amblypelta', 'Stål',
    '1COREF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRTBO', 'GAF', 'disease', 'target_group',
    'Ceratobasidiales', NULL,
    '1AGARL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRTBF', 'GAF', 'disease', 'target_group',
    'Ceratobasidiaceae', NULL,
    '1CRTBO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RHIZG', 'GAF', 'disease', 'target_group',
    'Rhizoctonia (anamorphic genus)', 'de Candolle',
    '1CRTBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ANUVG', 'GAF', 'disease', 'target_group',
    'Anulavirus', NULL,
    '1BROMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ARTAO', 'GAI', 'insect', 'target_group',
    'Architaenioglossa', NULL,
    '1GASTC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AMPUF', 'GAI', 'insect', 'target_group',
    'Ampullariidae', NULL,
    '1ARTAO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POMAG', 'GAI', 'insect', 'target_group',
    'Pomacea', 'Perry',
    '1AMPUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BARIS', 'GAI', 'insect', 'target_group',
    'Baridinae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BARIG', 'GAI', 'insect', 'target_group',
    'Baris', 'Germar',
    '1BARIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLULF', 'GAI', 'insect', 'target_group',
    'Plutellidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACLSG', 'GAI', 'insect', 'target_group',
    'Acrolepiopsis', 'Gaedike',
    '1PLULF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BOTTG', 'GAF', 'disease', 'target_group',
    'Botryotinia (rejected name)', 'Whetzel',
    '1SCLEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CIBOG', 'GAF', 'disease', 'target_group',
    'Ciborinia', 'Whetzel',
    '1SCLEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COSSF', 'GAI', 'insect', 'target_group',
    'Cossidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DYSPG', 'GAI', 'insect', 'target_group',
    'Dyspessa', 'Hübner',
    '1COSSF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STMTG', 'GAF', 'disease', 'target_group',
    'Stromatinia', NULL,
    '1SCLEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1USTIO', 'GAF', 'disease', 'target_group',
    'Ustilaginales', NULL,
    '1USTOL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1USTIF', 'GAF', 'disease', 'target_group',
    'Ustilaginaceae', NULL,
    '1USTIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1USTIG', 'GAF', 'disease', 'target_group',
    'Ustilago', '(Persoon) Roussel',
    '1USTIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BRCHF', 'GAI', 'insect', 'target_group',
    'Brachyceridae', 'Billberg',
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BRCCG', 'GAI', 'insect', 'target_group',
    'Brachycerus', 'Olivier',
    '1BRCHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NEOTG', 'GAI', 'insect', 'target_group',
    'Neotoxoptera', NULL,
    '1APHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MORGF', 'GAF', 'disease', 'target_group',
    'Morganellaceae', NULL,
    '1ENTEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ARSEG', 'GAF', 'disease', 'target_group',
    'Arsenophonus', 'Gherna et al.',
    '1MORGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BCTCG', 'GAI', 'insect', 'target_group',
    'Bactericera', 'Puton',
    '1TRIZF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APOMG', 'GAI', 'insect', 'target_group',
    'Apomecyna', 'Dejean',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MYIOG', 'GAI', 'insect', 'target_group',
    'Myiopardalis', NULL,
    '1TEPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COGUG', 'GAF', 'disease', 'target_group',
    'Coguvirus', NULL,
    '1PHENF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1IPOMG', 'GAF', 'disease', 'target_group',
    'Ipomovirus', NULL,
    '1POTYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MSPSG', 'GAF', 'disease', 'target_group',
    'Monosporascus', 'Pollack & Uecker',
    '1DIATF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCUNG', 'GAI', 'insect', 'target_group',
    'Scutellonema', 'Andrássy',
    '1HOPLF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APSCG', 'GAF', 'disease', 'target_group',
    'Apscaviroid', NULL,
    '1POSPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TYMOG', 'GAF', 'disease', 'target_group',
    'Tymovirus', NULL,
    '1TYMOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CUCMG', 'GAF', 'disease', 'target_group',
    'Cucumovirus', NULL,
    '1BROMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRIAG', 'GAI', 'insect', 'target_group',
    'Trialeurodes', 'Cockerell',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XYFOG', 'GAI', 'insect', 'target_group',
    'Carneocephala', 'Ball',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POLVG', 'GAF', 'disease', 'target_group',
    'Polerovirus', NULL,
    '1SOLVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LONHF', 'GAI', 'insect', 'target_group',
    'Lonchaeidae', NULL,
    '1DIPTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NSILG', 'GAI', 'insect', 'target_group',
    'Neosilba', 'McAlpine',
    '1LONHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYROG', 'GAI', 'insect', 'target_group',
    'Hyperodes', 'Jeckel',
    '1CYCLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHAOG', 'GAI', 'insect', 'target_group',
    'Phalonia', NULL,
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSILF', 'GAI', 'insect', 'target_group',
    'Psilidae', NULL,
    '1DIPTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHPSG', 'GAI', 'insect', 'target_group',
    'Chamaepsila', NULL,
    '1PSILF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MARGG', 'GAI', 'insect', 'target_group',
    'Margarodes', 'Guilding',
    '1MARGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HYAEG', 'GAI', 'insect', 'target_group',
    'Hyalesthes', 'Signoret',
    '1CIXIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STGSG', 'GAF', 'disease', 'target_group',
    'Stagonosporopsis', 'Diedicke',
    '1DIDYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DICKG', 'GAF', 'disease', 'target_group',
    'Dickeya', 'Samson et al.',
    '1PECTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HEPVO', 'GAF', 'disease', 'target_group',
    'Hepelivirales', NULL,
    '1ALSVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BENYF', 'GAF', 'disease', 'target_group',
    'Benyviridae', NULL,
    '1HEPVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BENYG', 'GAF', 'disease', 'target_group',
    'Benyvirus', NULL,
    '1BENYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NEMMG', 'GAI', 'insect', 'target_group',
    'Nemorimyza', 'Frey',
    '1AGROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TORVG', 'GAF', 'disease', 'target_group',
    'Torradovirus', NULL,
    '1SECOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TEPOG', 'GAF', 'disease', 'target_group',
    'Tepovirus', NULL,
    '1BFLXF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LIXUG', 'GAI', 'insect', 'target_group',
    'Lixus', 'Fabricius',
    '1LIXIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NCAMF', 'GAF', 'disease', 'target_group',
    'Neocamarosporiaceae', 'Wanasinghe, Wijayawardene, P.W. Crous & K.D. Hyde',
    '1PLEOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NCAMG', 'GAF', 'disease', 'target_group',
    'Neocamarosporium', 'Crous & M.J. Wingfield',
    '1NCAMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACANG', 'GAI', 'insect', 'target_group',
    'Acanthoscelides', 'Schilsky',
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BRUCF', 'GAI', 'insect', 'target_group',
    'Bruchidae', NULL,
    '1COLEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BRCHG', 'GAI', 'insect', 'target_group',
    'Bruchus', NULL,
    '1BRUCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CLAGG', 'GAI', 'insect', 'target_group',
    'Clavigralla', NULL,
    '1COREF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MARUG', 'GAI', 'insect', 'target_group',
    'Maruca', 'Walker',
    '1CRAMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OPHOG', 'GAI', 'insect', 'target_group',
    'Ophiomyia', 'Braschnikov',
    '1AGROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MEAGG', 'GAI', 'insect', 'target_group',
    'Melanagromyza', 'Hendel',
    '1AGROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCZOF', 'GAF', 'disease', 'target_group',
    'Schizoparmaceae', NULL,
    '1DIAPO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CONLG', 'GAF', 'disease', 'target_group',
    'Pilidiella', 'Petrák & Sydow',
    '1SCZOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CNTYF', 'GAF', 'disease', 'target_group',
    'Coniothyriaceae', 'Cooke',
    '1PLEOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CONIG', 'GAF', 'disease', 'target_group',
    'Coniothyrium', 'Corda',
    '1CNTYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MCCTG', 'GAI', 'insect', 'target_group',
    'Microcephalothrips', 'Bagnall',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYCG', 'GAI', 'insect', 'target_group',
    'Phyllocoptes', 'Nalepa',
    '1ERIOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1WAHLG', 'GAI', 'insect', 'target_group',
    'Wahlgreniella', 'Hille Ris Lambers',
    '1APHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PELVG', 'GAF', 'disease', 'target_group',
    'Pelarspovirus', NULL,
    '1TOMBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CALOG', 'GAF', 'disease', 'target_group',
    'Calonectria', 'de Notaris',
    '1NECTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SPHIF', 'GAI', 'insect', 'target_group',
    'Sphingidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CEPOG', 'GAI', 'insect', 'target_group',
    'Cephonodes', NULL,
    '1SPHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COTMG', 'GAI', 'insect', 'target_group',
    'Corythauma', 'Drake & Poor',
    '1TINGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COKLG', 'GAI', 'insect', 'target_group',
    'Cochlochila', 'Stål',
    '1TINGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RAOIG', 'GAI', 'insect', 'target_group',
    'Raoiella', 'Hirst',
    '1TENUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BTHGG', 'GAI', 'insect', 'target_group',
    'Bothrogonia', 'Melichar',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HELOG', 'GAI', 'insect', 'target_group',
    'Helopeltis', NULL,
    '1MIRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HETBG', 'GAI', 'insect', 'target_group',
    'Heterobostrychus', 'Lesne',
    '1BOSTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RHIOF', 'GAI', 'insect', 'target_group',
    'Rhizoecidae', 'Williams',
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RIPLG', 'GAI', 'insect', 'target_group',
    'Ripersiella', 'Tinsley',
    '1RHIOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ZEUZG', 'GAI', 'insect', 'target_group',
    'Zeuzera', 'Latreille',
    '1COSSF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HOMOG', 'GAI', 'insect', 'target_group',
    'Homona', NULL,
    '1TORTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLASG', 'GAF', 'disease', 'target_group',
    'Plasmopara', 'J. Schröter',
    '1PEROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CACYG', 'GAI', 'insect', 'target_group',
    'Cacyreus', NULL,
    '1LYCAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ACUPG', 'GAI', 'insect', 'target_group',
    'Aculops', 'Keifer',
    '1ERIOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSPEG', 'GAF', 'disease', 'target_group',
    'Pseudoperonospora', NULL,
    '1PEROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TOMBG', 'GAF', 'disease', 'target_group',
    'Tombusvirus', NULL,
    '1TOMBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LYONF', 'GAI', 'insect', 'target_group',
    'Lyonetiidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LEUCG', 'GAI', 'insect', 'target_group',
    'Leucoptera', 'Hübner',
    '1LYONF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NOTOF', 'GAI', 'insect', 'target_group',
    'Notodontidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1THAUG', 'GAI', 'insect', 'target_group',
    'Thaumetopoea', 'Hübner',
    '1NOTOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GYMNF', 'GAF', 'disease', 'target_group',
    'Gymnosporangiaceae', NULL,
    '1UREDO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GYMNG', 'GAF', 'disease', 'target_group',
    'Roestelia', 'Rebentisch',
    '1GYMNF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CCPSG', 'GAI', 'insect', 'target_group',
    'Cacopsylla', 'Ossiannilsson',
    '1PSYLF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FOVVG', 'GAF', 'disease', 'target_group',
    'Foveavirus', NULL,
    '1BFLXF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ARFVC', 'GAF', 'disease', 'target_group',
    'Arfiviricetes', NULL,
    '1CREVP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MULVO', 'GAF', 'disease', 'target_group',
    'Mulpavirales', NULL,
    '1ARFVC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NANOF', 'GAF', 'disease', 'target_group',
    'Nanoviridae', NULL,
    '1MULVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BABUG', 'GAF', 'disease', 'target_group',
    'Babuvirus', NULL,
    '1NANOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STRAG', 'GAI', 'insect', 'target_group',
    'Strauzia', 'Robineau-Desvoidy',
    '1TEPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OPHGG', 'GAF', 'disease', 'target_group',
    'Ophiognomonia', '(Saccardo) Saccardo',
    '1GNOMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BATCG', 'GAI', 'insect', 'target_group',
    'Batocera', 'Dejean',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BIONF', 'GAF', 'disease', 'target_group',
    'Bionectriaceae', NULL,
    '1HYPRO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GEOHG', 'GAF', 'disease', 'target_group',
    'Geosmithia', 'Pitt',
    '1BIONF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ENTEF', 'GAF', 'disease', 'target_group',
    'Enterobacteriaceae', NULL,
    '1ENTEO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GIBSG', 'GAF', 'disease', 'target_group',
    'Gibbsiella', 'Brady et al.',
    '1ENTEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PITOG', 'GAI', 'insect', 'target_group',
    'Pityophthorus', 'Eichhoff',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DRYOG', 'GAI', 'insect', 'target_group',
    'Dryocoetes', 'Eichhoff',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NNECG', 'GAF', 'disease', 'target_group',
    'Neonectria', 'Wollenweber',
    '1NECTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DOTHO', 'GAF', 'disease', 'target_group',
    'Dothideales', NULL,
    '1DTHDL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DOTRF', 'GAF', 'disease', 'target_group',
    'Dothioraceae', NULL,
    '1DOTHO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DSCSG', 'GAF', 'disease', 'target_group',
    'Discosphaerina', NULL,
    '1DOTRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BOERG', 'GAF', 'disease', 'target_group',
    'Boeremia (anamorphic genus)', 'Aveskamp, Gruyter & Verkley',
    '1DIDYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MYCOG', 'GAF', 'disease', 'target_group',
    'Mycosphaerella (rejected name)', 'Johanson',
    '1MYCOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHYTP', 'GAF', 'disease', 'target_group',
    'Chytridiomycota', NULL,
    '1FUNGK', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHYTC', 'GAF', 'disease', 'target_group',
    'Chytridiomycetes', NULL,
    '1CHYTP', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHYTO', 'GAF', 'disease', 'target_group',
    'Chytridiales', NULL,
    '1CHYTC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SYNCF', 'GAF', 'disease', 'target_group',
    'Synchytriaceae', NULL,
    '1CHYTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SYNCG', 'GAF', 'disease', 'target_group',
    'Synchytrium', NULL,
    '1SYNCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AONMG', 'GAI', 'insect', 'target_group',
    'Aonidomytilus', NULL,
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POMVG', 'GAF', 'disease', 'target_group',
    'Pomovirus', NULL,
    '1VIRGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PREMG', 'GAI', 'insect', 'target_group',
    'Premnotrypes', 'Pierce',
    '1ENTIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1KEIRG', 'GAI', 'insect', 'target_group',
    'Keiferia', 'Busk',
    '1GELEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LPTNG', 'GAI', 'insect', 'target_group',
    'Leptinotarsa', 'Chevrolat',
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GLSPF', 'GAF', 'disease', 'target_group',
    'Glomosporiaceae', NULL,
    '1USTIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1THPHG', 'GAF', 'disease', 'target_group',
    'Thecaphora', 'Fingerhuth',
    '1GLSPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CLASG', 'GAI', 'insect', 'target_group',
    'Clastoptera', 'Germar',
    '1CERCF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHACO', 'GAF', 'disease', 'target_group',
    'Phacidiales', NULL,
    '1LETOC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHACF', 'GAF', 'disease', 'target_group',
    'Bulgariaceae', NULL,
    '1PHACO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ALTMG', 'GAF', 'disease', 'target_group',
    'Allantophomopsiella', 'Crous',
    '1PHACF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CLLLG', 'GAI', 'insect', 'target_group',
    'Callidiellum', 'Linsley',
    '1CERAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CHIOG', 'GAI', 'insect', 'target_group',
    'Phenacaspis', 'Cooley & Cockerell',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CINAG', 'GAI', 'insect', 'target_group',
    'Cinara', NULL,
    '1APHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RUSSO', 'GAF', 'disease', 'target_group',
    'Russulales', NULL,
    '1AGARL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BONDF', 'GAF', 'disease', 'target_group',
    'Bondarzewiaceae', NULL,
    '1RUSSO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HETEG', 'GAF', 'disease', 'target_group',
    'Heterobasidion', 'Brefeld',
    '1BONDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SEIRG', 'GAF', 'disease', 'target_group',
    'Seiridium', 'Nees',
    '1SOROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ASCOA', 'GAF', 'disease', 'target_group',
    'Pezizomycotina (unclassified)', NULL,
    '1PEZIQ', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STIGG', 'GAF', 'disease', 'target_group',
    'Stigmina', 'Saccardo',
    '1ASCOA', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SPNAG', 'GAI', 'insect', 'target_group',
    'Siphonatrophia', 'Swain',
    '1APHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCLEG', 'GAF', 'disease', 'target_group',
    'Sclerotinia', 'Fuckel',
    '1SCLEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ASCOG', 'GAF', 'disease', 'target_group',
    'Ascochyta', 'Libert',
    '1DIDYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PECTG', 'GAI', 'insect', 'target_group',
    'Pectinophora', NULL,
    '1GELEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AUTGG', 'GAI', 'insect', 'target_group',
    'Autographa', 'Hübner',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EMPOG', 'GAI', 'insect', 'target_group',
    'Empoasca', 'Walsh',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHTOG', 'GAI', 'insect', 'target_group',
    'Phthorimaea', 'Meyrick',
    '1GELEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCROG', 'GAI', 'insect', 'target_group',
    'Scrobipalpa', 'Janse',
    '1GELEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AGRSG', 'GAI', 'insect', 'target_group',
    'Agrius', 'Hübner',
    '1SPHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EPIEG', 'GAI', 'insect', 'target_group',
    'Epicaerus', 'Schönherr',
    '1ENTIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NCERG', 'GAI', 'insect', 'target_group',
    'Neoceratitis', 'Hendel',
    '1TEPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PNSTG', 'GAI', 'insect', 'target_group',
    'Pentastiridius', 'Kirschbaum',
    '1CIXIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHRDG', 'GAI', 'insect', 'target_group',
    'Phyrdenus', 'LeConte',
    '1CRYPS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RHGPG', 'GAI', 'insect', 'target_group',
    'Rhigopsidius', 'Heller',
    '1CYCLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AECIG', 'GAF', 'disease', 'target_group',
    'Aecidium (rejected name)', 'Persoon',
    '1UREDO', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ATHLO', 'GAF', 'disease', 'target_group',
    'Atheliales', NULL,
    '1AGARL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ATHLF', 'GAF', 'disease', 'target_group',
    'Atheliaceae', NULL,
    '1ATHLO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ATHLG', 'GAF', 'disease', 'target_group',
    'Athelia', NULL,
    '1ATHLF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SACCQ', 'GAF', 'disease', 'target_group',
    'Saccharomycotina', NULL,
    '1ASCOP', TRUE, 6,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCCMC', 'GAF', 'disease', 'target_group',
    'Saccharomycetes', NULL,
    '1SACCQ', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SACCO', 'GAF', 'disease', 'target_group',
    'Saccharomycetales', NULL,
    '1SCCMC', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIPOF', 'GAF', 'disease', 'target_group',
    'Dipodascaceae', NULL,
    '1SACCO', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DPDAG', 'GAF', 'disease', 'target_group',
    'Dipodascus', NULL,
    '1DIPOF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GEOTG', 'GAF', 'disease', 'target_group',
    'Geotrichum (anamorphic genus)', NULL,
    '1DPDAG', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GLOBG', 'GAI', 'insect', 'target_group',
    'Globodera', '(Skarbilovich) Behrens',
    '1HETEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MASRF', 'GAF', 'disease', 'target_group',
    'Massarinaceae', NULL,
    '1PLEOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HELMG', 'GAF', 'disease', 'target_group',
    'Helminthosporium', 'Link',
    '1MASRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PECBG', 'GAF', 'disease', 'target_group',
    'Pectobacterium', 'Waldee',
    '1PECTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PLSCG', 'GAF', 'disease', 'target_group',
    'Polyscytalum (anamorphic genus)', NULL,
    '1ASCOA', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RUSLG', 'GAI', 'insect', 'target_group',
    'Russelliana', 'Tuthill',
    '1PSYLF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STRMF', 'GAF', 'disease', 'target_group',
    'Streptomycetaceae', NULL,
    '1ACTNO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STREG', 'GAF', 'disease', 'target_group',
    'Streptomyces', 'Waksman & Henrici',
    '1STRMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TECAG', 'GAI', 'insect', 'target_group',
    'Tecia', NULL,
    '1GELEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIOPF', 'GAI', 'insect', 'target_group',
    'Diopsidae', NULL,
    '1DIPTO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIOPG', 'GAI', 'insect', 'target_group',
    'Diopsis', NULL,
    '1DIOPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GEOFO', 'GAF', 'disease', 'target_group',
    'Georgefischeriales', NULL,
    '1EXOBL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EBALF', 'GAF', 'disease', 'target_group',
    'Eballistraceae', NULL,
    '1GEOFO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EBALG', 'GAF', 'disease', 'target_group',
    'Eballistra', NULL,
    '1EBALF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LEMAG', 'GAI', 'insect', 'target_group',
    'Lema', 'Fabricius',
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LEPRG', 'GAI', 'insect', 'target_group',
    'Leptocorisa', NULL,
    '1ALYDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OOSPG', 'GAF', 'disease', 'target_group',
    'Oospora (anamorphic genus)', NULL,
    '1ERYSG', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ORYVG', 'GAF', 'disease', 'target_group',
    'Oryzavirus', NULL,
    '1REOVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HESPF', 'GAI', 'insect', 'target_group',
    'Hesperiidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PARNG', 'GAI', 'insect', 'target_group',
    'Parnara', NULL,
    '1HESPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SAROF', 'GAF', 'disease', 'target_group',
    'Sarocladiaceae', NULL,
    '1HYPRO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SARMG', 'GAF', 'disease', 'target_group',
    'Sarocladium (anamorphic genus)', NULL,
    '1SAROF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCIPG', 'GAI', 'insect', 'target_group',
    'Scirpophaga', 'Treitschke',
    '1CRAMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCOTG', 'GAI', 'insect', 'target_group',
    'Scotinophara', NULL,
    '1PENTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SOBEG', 'GAF', 'disease', 'target_group',
    'Sobemovirus', NULL,
    '1SOLVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRCAG', 'GAI', 'insect', 'target_group',
    'Trichispa', NULL,
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BALAG', 'GAF', 'disease', 'target_group',
    'Balansia', 'Spegazzini',
    '1CLAVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DCLDG', 'GAI', 'insect', 'target_group',
    'Dicladispa', 'Gestro',
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIMOG', 'GAI', 'insect', 'target_group',
    'Dimorphopterus', 'Stål',
    '1LYGAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GONAG', 'GAI', 'insect', 'target_group',
    'Gonocephalum', NULL,
    '1TENEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LISSG', 'GAI', 'insect', 'target_group',
    'Lissorhoptrus', 'LeConte',
    '1BRCHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MELNF', 'GAF', 'disease', 'target_group',
    'Pseudodidymellaceae', 'A. Hashimoto & K. Tanaka',
    '1PLEOO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MLNMG', 'GAF', 'disease', 'target_group',
    'Melanomma', 'Nitschke ex Fuckel',
    '1MELNF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NILAG', 'GAI', 'insect', 'target_group',
    'Nilaparvata', NULL,
    '1DELPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ORSEG', 'GAI', 'insect', 'target_group',
    'Orseolia', 'Kieffer & Massalongo',
    '1CECIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PREOG', 'GAF', 'disease', 'target_group',
    'Phytoreovirus', NULL,
    '1REOVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SOGLG', 'GAI', 'insect', 'target_group',
    'Sogatella', 'Fennah',
    '1DELPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TAGOG', 'GAI', 'insect', 'target_group',
    'Tagosodes', NULL,
    '1DELPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STCTG', 'GAI', 'insect', 'target_group',
    'Stenchaetothrips', 'Bagnall',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TUNVG', 'GAF', 'disease', 'target_group',
    'Tungrovirus', NULL,
    '1CAULF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BTHTG', 'GAI', 'insect', 'target_group',
    'Bathytricha', 'Turner',
    '1NOCTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COLAG', 'GAI', 'insect', 'target_group',
    'Maecolaspis', 'Bechyné',
    '1CHRYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LIGNG', 'GAF', 'disease', 'target_group',
    'Ligniera', NULL,
    '1PLADF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NEOMG', 'GAI', 'insect', 'target_group',
    'Neomaskellia', 'Quaintance & Baker',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ISOPO', 'GAI', 'insect', 'target_group',
    'Isoptera', NULL,
    '1INSEC', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TERMF', 'GAI', 'insect', 'target_group',
    'Termitidae', NULL,
    '1ISOPO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSCAG', 'GAI', 'insect', 'target_group',
    'Pseudacanthotermes', NULL,
    '1TERMF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1COMD', 'PFL', 'weed', 'target_group',
    'Commelinids', NULL,
    '1ANGC', TRUE, 5,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1POAO', 'PFL', 'weed', 'target_group',
    'Poales', NULL,
    '1COMD', TRUE, 4,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GRAF', 'PFL', 'weed', 'target_group',
    'Gramineae', NULL,
    '1POAO', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PANS', 'PFL', 'weed', 'target_group',
    'Panicoideae', NULL,
    '1GRAF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ROOG', 'PFL', 'weed', 'target_group',
    'Rottboellia', 'Linnaeus filius',
    '1PANS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SOSPG', 'GAF', 'disease', 'target_group',
    'Sorosporium', 'F. Rudolphi',
    '1USTIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SPHTG', 'GAF', 'disease', 'target_group',
    'Sphacelotheca', '(Ellis & Everhart) Clinton',
    '1USTIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SPSRG', 'GAF', 'disease', 'target_group',
    'Sporisorium', 'Ehrenberg ex Link',
    '1USTIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STAGG', 'GAF', 'disease', 'target_group',
    'Stagonospora', '(Saccardo) Saccardo',
    '1MASRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AULSG', 'GAI', 'insect', 'target_group',
    'Aulacaspis', 'Cockerell',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BLAAF', 'GAI', 'insect', 'target_group',
    'Blastobasidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1BLAAG', 'GAI', 'insect', 'target_group',
    'Blastobasis', 'Zeller',
    '1BLAAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CINTF', 'GAF', 'disease', 'target_group',
    'Cintractiaceae', NULL,
    '1USTIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CINTG', 'GAF', 'disease', 'target_group',
    'Cintractia', NULL,
    '1CINTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EUMGG', 'GAI', 'insect', 'target_group',
    'Eumargarodes', 'Jakubski',
    '1MARGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LEIFG', 'GAF', 'disease', 'target_group',
    'Leifsonia', 'Evtushenko, Dorofeeva, Subbotin, Cole & Tiedje',
    '1MICBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHYGG', 'GAI', 'insect', 'target_group',
    'Lachnosterna', 'Hope',
    '1SCARF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LOPHF', 'GAI', 'insect', 'target_group',
    'Lophopidae', NULL,
    '1AUCHR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PYRLG', 'GAI', 'insect', 'target_group',
    'Pyrilla', NULL,
    '1LOPHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CASTF', 'GAI', 'insect', 'target_group',
    'Castniidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TLCHG', 'GAI', 'insect', 'target_group',
    'Telchin', NULL,
    '1CASTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PANVG', 'GAF', 'disease', 'target_group',
    'Panicovirus', NULL,
    '1TOMBF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MICRO', 'GAF', 'disease', 'target_group',
    'Microascales', NULL,
    '1HYPRL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CERKF', 'GAF', 'disease', 'target_group',
    'Ceratocystidaceae', NULL,
    '1MICRO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CERAG', 'GAF', 'disease', 'target_group',
    'Ceratocystis', 'Ellis & Halsted',
    '1CERKF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HOLPG', 'GAI', 'insect', 'target_group',
    'Holopothrips', 'O''Neill',
    '1PHLAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1RHIEF', 'GAI', 'insect', 'target_group',
    'Rhinotermitidae', NULL,
    '1ISOPO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCHTG', 'GAI', 'insect', 'target_group',
    'Schedorhinotermes', NULL,
    '1RHIEF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STRYG', 'GAI', 'insect', 'target_group',
    'Strymon', 'Hübner',
    '1LYCAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TMOLG', 'GAI', 'insect', 'target_group',
    'Tmolus', NULL,
    '1LYCAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ASPRG', 'GAF', 'disease', 'target_group',
    'Asperisporium', 'Maublanc',
    '1MYCOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CRYHG', 'GAI', 'insect', 'target_group',
    'Hypocryphalus', 'Hopkins',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1FIORG', 'GAI', 'insect', 'target_group',
    'Fiorinia', 'Targioni-Tozzetti',
    '1DIASF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1GREEG', 'GAI', 'insect', 'target_group',
    'Greenidea', 'Schouteden',
    '1APHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CAULG', 'GAF', 'disease', 'target_group',
    'Caulimovirus', NULL,
    '1CAULF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OTIOG', 'GAI', 'insect', 'target_group',
    'Otiorhynchus', 'Germar',
    '1ENTIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PHMBG', 'GAF', 'disease', 'target_group',
    'Phlomobacter', NULL,
    '1GAMBC', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1XYLBG', 'GAI', 'insect', 'target_group',
    'Xyleborus', 'Eichhoff',
    '1SCOLS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1KERRF', 'GAI', 'insect', 'target_group',
    'Kerriidae', NULL,
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PTACG', 'GAI', 'insect', 'target_group',
    'Paratachardina', 'Balachowsky',
    '1KERRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APHAF', 'GAI', 'insect', 'target_group',
    'Aphalaridae', 'Löw',
    '1STERR', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1APSYG', 'GAI', 'insect', 'target_group',
    'Apsylla', 'Crawford',
    '1APHAF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DROCG', 'GAI', 'insect', 'target_group',
    'Drosicha', 'Walker',
    '1MONOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1EPLTG', 'GAI', 'insect', 'target_group',
    'Euplatypus', 'Wood',
    '1PLATS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1IDISG', 'GAI', 'insect', 'target_group',
    'Idioscopus', 'Baker',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSDTG', 'GAI', 'insect', 'target_group',
    'Pseudotheraptus', NULL,
    '1COREF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SRNCG', 'GAI', 'insect', 'target_group',
    'Sternochetus', 'Pierce',
    '1CRYPS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HERCG', 'GAI', 'insect', 'target_group',
    'Hercinothrips', 'Bagnall',
    '1THRIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1LACPG', 'GAI', 'insect', 'target_group',
    'Lachnopus', 'Schönherr',
    '1ENTIS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ODOIG', 'GAI', 'insect', 'target_group',
    'Odoiporus', 'Chevrolat',
    '1DRYOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PAPUG', 'GAI', 'insect', 'target_group',
    'Papuana', NULL,
    '1SCARF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1ERNTG', 'GAI', 'insect', 'target_group',
    'Erionota', NULL,
    '1HESPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HAPBG', 'GAF', 'disease', 'target_group',
    'Haplobasidion (anamorphic genus)', NULL,
    '1ASCOA', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TRACG', 'GAF', 'disease', 'target_group',
    'Trachysphaera', NULL,
    '1PYTHF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AVSUG', 'GAF', 'disease', 'target_group',
    'Avsunviroid', NULL,
    '1AVSUF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OPHIO', 'GAF', 'disease', 'target_group',
    'Ophiostomatales', NULL,
    '1SRDAL', TRUE, 3,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OPHIF', 'GAF', 'disease', 'target_group',
    'Ophiostomataceae', NULL,
    '1OPHIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HARIG', 'GAF', 'disease', 'target_group',
    'Harringtonia', 'Z.W. de Beer & Procter',
    '1OPHIF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HEILG', 'GAI', 'insect', 'target_group',
    'Heilipus', 'Germar',
    '1MOLYS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1CONOS', 'GAI', 'insect', 'target_group',
    'Conoderinae', NULL,
    '1CURCF', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1MCPTG', 'GAI', 'insect', 'target_group',
    'Macrocopturus', 'Heller',
    '1CONOS', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1PSEYG', 'GAI', 'insect', 'target_group',
    'Pseudacysta', 'Blatchley',
    '1TINGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1OECOF', 'GAI', 'insect', 'target_group',
    'Oecophoridae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1STENG', 'GAI', 'insect', 'target_group',
    'Stenoma', NULL,
    '1OECOF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TETLG', 'GAI', 'insect', 'target_group',
    'Tetraleurodes', 'Cockerell',
    '1ALEYF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SPHRF', 'GAF', 'disease', 'target_group',
    'Sphaerophragmiaceae', 'Cummins & Y. Hiratsuka',
    '1UREDO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AUPUG', 'GAF', 'disease', 'target_group',
    'Austropuccinia', 'Beenken',
    '1SPHRF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1DIMAG', 'GAI', 'insect', 'target_group',
    'Dimargarodes', 'Silvestri',
    '1MARGF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NPHPF', 'GAF', 'disease', 'target_group',
    'Neophysopellaceae', NULL,
    '1UREDO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1NPHPG', 'GAF', 'disease', 'target_group',
    'Neophysopella', 'Jing X. Ji & Kakishima',
    '1NPHPF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1SCAPG', 'GAI', 'insect', 'target_group',
    'Scaphoideus', 'Uhler',
    '1CICDF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AMEVF', 'GAF', 'disease', 'target_group',
    'Amesuviridae', NULL,
    '1MULVO', TRUE, 2,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1TEMVG', 'GAF', 'disease', 'target_group',
    'Temfrudevirus', NULL,
    '1AMEVF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1AMPVG', 'GAF', 'disease', 'target_group',
    'Ampelovirus', NULL,
    '1CLOTF', TRUE, 1,
    TRUE
);

INSERT INTO eppo_codes (
    eppo_code, eppo_datatype, classification, eppo_type,
    latin_name, english_name,
    parent_eppo_code, is_parent, hierarchy_level,
    is_active
) VALUES (
    '1HELZF', 'GAI', 'insect', 'target_group',
    'Heliozelidae', NULL,
    '1LEPIO', TRUE, 2,
    TRUE
);
