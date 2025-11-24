"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Fuzzy search for formulations
 */
export async function searchFormulations(params: {
  search?: string;
  limit?: number;
  countryId?: string;
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from("vw_formulations_with_ingredients")
    .select("formulation_id, formulation_code, product_name, formulation_name")
    .order("formulation_code", { ascending: true });
  
  if (params.search && params.search.trim().length > 0) {
    const searchTerm = params.search.trim();
    const searchPattern = `%${searchTerm}%`;
    query = query.or(
      `formulation_code.ilike.${searchPattern},` +
      `product_name.ilike.${searchPattern},` +
      `formulation_name.ilike.${searchPattern}`
    );
  }
  
  if (params.limit) {
    query = query.limit(params.limit);
  } else {
    query = query.limit(100);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return { error: error.message };
  }
  
  // Sort by relevance if search term provided
  if (params.search && data) {
    const searchLower = params.search.toLowerCase();
    data.sort((a, b) => {
      const aCode = (a.formulation_code || "").toLowerCase();
      const bCode = (b.formulation_code || "").toLowerCase();
      const aName = (a.product_name || a.formulation_name || "").toLowerCase();
      const bName = (b.product_name || b.formulation_name || "").toLowerCase();
      
      // Exact match in code
      const aExactCode = aCode === searchLower ? 1 : 0;
      const bExactCode = bCode === searchLower ? 1 : 0;
      if (aExactCode !== bExactCode) return bExactCode - aExactCode;
      
      // Starts with search term in code
      const aStartsCode = aCode.startsWith(searchLower) ? 1 : 0;
      const bStartsCode = bCode.startsWith(searchLower) ? 1 : 0;
      if (aStartsCode !== bStartsCode) return bStartsCode - aStartsCode;
      
      // Starts with search term in name
      const aStartsName = aName.startsWith(searchLower) ? 1 : 0;
      const bStartsName = bName.startsWith(searchLower) ? 1 : 0;
      if (aStartsName !== bStartsName) return bStartsName - aStartsName;
      
      // Alphabetical fallback
      return aCode.localeCompare(bCode);
    });
  }
  
  return { data, success: true };
}

/**
 * Fuzzy search for countries
 */
export async function searchCountries(params: {
  search?: string;
  limit?: number;
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from("countries")
    .select("country_id, country_name, country_code")
    .eq("is_active", true)
    .order("country_name", { ascending: true });
  
  if (params.search && params.search.trim().length > 0) {
    const searchTerm = params.search.trim();
    const searchPattern = `%${searchTerm}%`;
    query = query.or(
      `country_name.ilike.${searchPattern},` +
      `country_code.ilike.${searchPattern}`
    );
  }
  
  if (params.limit) {
    query = query.limit(params.limit);
  } else {
    query = query.limit(200);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return { error: error.message };
  }
  
  // Sort by relevance if search term provided
  if (params.search && data) {
    const searchLower = params.search.toLowerCase();
    data.sort((a, b) => {
      const aName = (a.country_name || "").toLowerCase();
      const bName = (b.country_name || "").toLowerCase();
      const aCode = (a.country_code || "").toLowerCase();
      const bCode = (b.country_code || "").toLowerCase();
      
      // Exact match in name
      const aExactName = aName === searchLower ? 1 : 0;
      const bExactName = bName === searchLower ? 1 : 0;
      if (aExactName !== bExactName) return bExactName - aExactName;
      
      // Starts with search term
      const aStarts = aName.startsWith(searchLower) ? 1 : 0;
      const bStarts = bName.startsWith(searchLower) ? 1 : 0;
      if (aStarts !== bStarts) return bStarts - aStarts;
      
      // Exact match in code
      const aExactCode = aCode === searchLower ? 1 : 0;
      const bExactCode = bCode === searchLower ? 1 : 0;
      if (aExactCode !== bExactCode) return bExactCode - aExactCode;
      
      // Alphabetical fallback
      return aName.localeCompare(bName);
    });
  }
  
  return { data, success: true };
}

/**
 * Fuzzy search for use groups
 */
export async function searchUseGroups(params: {
  search?: string;
  formulationId?: string;
  countryId?: string;
  formulationCountryId?: string;
  limit?: number;
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from("vw_formulation_country_use_group")
    .select("formulation_country_use_group_id, use_group_variant, use_group_name, display_name, formulation_code, country_name")
    .order("use_group_variant", { ascending: true });
  
  if (params.formulationCountryId) {
    query = query.eq("formulation_country_id", params.formulationCountryId);
  } else if (params.formulationId && params.countryId) {
    // Find formulation_country_id
    const { data: fcData } = await supabase
      .from("formulation_country")
      .select("formulation_country_id")
      .eq("formulation_id", params.formulationId)
      .eq("country_id", params.countryId)
      .single();
    
    if (fcData?.formulation_country_id) {
      query = query.eq("formulation_country_id", fcData.formulation_country_id);
    } else {
      // No formulation-country found, return empty
      return { data: [], success: true };
    }
  }
  
  if (params.search && params.search.trim().length > 0) {
    const searchTerm = params.search.trim();
    const searchPattern = `%${searchTerm}%`;
    query = query.or(
      `use_group_name.ilike.${searchPattern},` +
      `use_group_variant.ilike.${searchPattern},` +
      `display_name.ilike.${searchPattern},` +
      `formulation_code.ilike.${searchPattern},` +
      `country_name.ilike.${searchPattern}`
    );
  }
  
  if (params.limit) {
    query = query.limit(params.limit);
  } else {
    query = query.limit(200);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return { error: error.message };
  }
  
  // Sort by relevance if search term provided
  if (params.search && data) {
    const searchLower = params.search.toLowerCase();
    data.sort((a, b) => {
      const aVariant = (a.use_group_variant || "").toLowerCase();
      const bVariant = (b.use_group_variant || "").toLowerCase();
      const aName = (a.use_group_name || "").toLowerCase();
      const bName = (b.use_group_name || "").toLowerCase();
      const aDisplay = (a.display_name || "").toLowerCase();
      const bDisplay = (b.display_name || "").toLowerCase();
      
      // Exact match in variant
      const aExactVariant = aVariant === searchLower ? 1 : 0;
      const bExactVariant = bVariant === searchLower ? 1 : 0;
      if (aExactVariant !== bExactVariant) return bExactVariant - aExactVariant;
      
      // Starts with search term in variant
      const aStartsVariant = aVariant.startsWith(searchLower) ? 1 : 0;
      const bStartsVariant = bVariant.startsWith(searchLower) ? 1 : 0;
      if (aStartsVariant !== bStartsVariant) return bStartsVariant - aStartsVariant;
      
      // Starts with search term in name
      const aStartsName = aName.startsWith(searchLower) ? 1 : 0;
      const bStartsName = bName.startsWith(searchLower) ? 1 : 0;
      if (aStartsName !== bStartsName) return bStartsName - aStartsName;
      
      // Alphabetical fallback
      return aDisplay.localeCompare(bDisplay);
    });
  }
  
  return { data, success: true };
}

/**
 * Fuzzy search for formulation countries
 */
export async function searchFormulationCountries(params: {
  search?: string;
  formulationId?: string;
  formulationCode?: string;
  limit?: number;
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from("vw_formulation_country_detail")
    .select("formulation_country_id, display_name, formulation_code, country_name")
    .order("country_name", { ascending: true });
  
  if (params.formulationId) {
    const { data: formulation } = await supabase
      .from("formulations")
      .select("formulation_code")
      .eq("formulation_id", params.formulationId)
      .single();
    
    if (formulation?.formulation_code) {
      query = query.eq("formulation_code", formulation.formulation_code);
    } else {
      return { data: [], success: true };
    }
  } else if (params.formulationCode) {
    query = query.eq("formulation_code", params.formulationCode);
  }
  
  if (params.search && params.search.trim().length > 0) {
    const searchTerm = params.search.trim();
    const searchPattern = `%${searchTerm}%`;
    query = query.or(
      `display_name.ilike.${searchPattern},` +
      `formulation_code.ilike.${searchPattern},` +
      `country_name.ilike.${searchPattern}`
    );
  }
  
  if (params.limit) {
    query = query.limit(params.limit);
  } else {
    query = query.limit(200);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return { error: error.message };
  }
  
  // Sort by relevance if search term provided
  if (params.search && data) {
    const searchLower = params.search.toLowerCase();
    data.sort((a, b) => {
      const aDisplay = (a.display_name || "").toLowerCase();
      const bDisplay = (b.display_name || "").toLowerCase();
      const aCountry = (a.country_name || "").toLowerCase();
      const bCountry = (b.country_name || "").toLowerCase();
      
      // Exact match in display name
      const aExactDisplay = aDisplay === searchLower ? 1 : 0;
      const bExactDisplay = bDisplay === searchLower ? 1 : 0;
      if (aExactDisplay !== bExactDisplay) return bExactDisplay - aExactDisplay;
      
      // Starts with search term in country name
      const aStartsCountry = aCountry.startsWith(searchLower) ? 1 : 0;
      const bStartsCountry = bCountry.startsWith(searchLower) ? 1 : 0;
      if (aStartsCountry !== bStartsCountry) return bStartsCountry - aStartsCountry;
      
      // Alphabetical fallback
      return aDisplay.localeCompare(bDisplay);
    });
  }
  
  return { data, success: true };
}

/**
 * Fuzzy search for ingredients
 */
export async function searchIngredients(params: {
  search?: string;
  limit?: number;
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from("ingredients")
    .select("ingredient_id, ingredient_name, cas_number, ingredient_type")
    .eq("is_active", true)
    .order("ingredient_name", { ascending: true });
  
  if (params.search && params.search.trim().length > 0) {
    const searchTerm = params.search.trim();
    const searchPattern = `%${searchTerm}%`;
    query = query.or(
      `ingredient_name.ilike.${searchPattern},` +
      `cas_number.ilike.${searchPattern}`
    );
  }
  
  if (params.limit) {
    query = query.limit(params.limit);
  } else {
    query = query.limit(200);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return { error: error.message };
  }
  
  // Sort by relevance if search term provided
  if (params.search && data) {
    const searchLower = params.search.toLowerCase();
    data.sort((a, b) => {
      const aName = (a.ingredient_name || "").toLowerCase();
      const bName = (b.ingredient_name || "").toLowerCase();
      const aCas = (a.cas_number || "").toLowerCase();
      const bCas = (b.cas_number || "").toLowerCase();
      
      // Exact match in name
      const aExactName = aName === searchLower ? 1 : 0;
      const bExactName = bName === searchLower ? 1 : 0;
      if (aExactName !== bExactName) return bExactName - aExactName;
      
      // Starts with search term
      const aStarts = aName.startsWith(searchLower) ? 1 : 0;
      const bStarts = bName.startsWith(searchLower) ? 1 : 0;
      if (aStarts !== bStarts) return bStarts - aStarts;
      
      // Exact match in CAS number
      const aExactCas = aCas === searchLower ? 1 : 0;
      const bExactCas = bCas === searchLower ? 1 : 0;
      if (aExactCas !== bExactCas) return bExactCas - aExactCas;
      
      // Alphabetical fallback
      return aName.localeCompare(bName);
    });
  }
  
  return { data, success: true };
}






