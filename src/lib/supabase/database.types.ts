export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      base_code_registry: {
        Row: {
          active_signature: string
          base_code: string
          created_at: string | null
          description: string | null
          next_variant_number: number | null
        }
        Insert: {
          active_signature: string
          base_code: string
          created_at?: string | null
          description?: string | null
          next_variant_number?: number | null
        }
        Update: {
          active_signature?: string
          base_code?: string
          created_at?: string | null
          description?: string | null
          next_variant_number?: number | null
        }
        Relationships: []
      }
      business_case: {
        Row: {
          assumptions: string | null
          business_case_group_id: string
          business_case_id: string
          business_case_name: string | null
          cogs_last_updated_at: string | null
          cogs_last_updated_by: string | null
          cogs_per_unit: number | null
          created_at: string | null
          created_by: string | null
          effective_start_fiscal_year: string
          margin_percent: number | null
          nsp: number | null
          nsp_last_updated_at: string | null
          nsp_last_updated_by: string | null
          status: string | null
          total_cogs: number | null
          total_margin: number | null
          total_revenue: number | null
          updated_at: string | null
          volume: number | null
          volume_last_updated_at: string | null
          volume_last_updated_by: string | null
          year_offset: number
        }
        Insert: {
          assumptions?: string | null
          business_case_group_id: string
          business_case_id?: string
          business_case_name?: string | null
          cogs_last_updated_at?: string | null
          cogs_last_updated_by?: string | null
          cogs_per_unit?: number | null
          created_at?: string | null
          created_by?: string | null
          effective_start_fiscal_year: string
          margin_percent?: number | null
          nsp?: number | null
          nsp_last_updated_at?: string | null
          nsp_last_updated_by?: string | null
          status?: string | null
          total_cogs?: number | null
          total_margin?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          volume?: number | null
          volume_last_updated_at?: string | null
          volume_last_updated_by?: string | null
          year_offset: number
        }
        Update: {
          assumptions?: string | null
          business_case_group_id?: string
          business_case_id?: string
          business_case_name?: string | null
          cogs_last_updated_at?: string | null
          cogs_last_updated_by?: string | null
          cogs_per_unit?: number | null
          created_at?: string | null
          created_by?: string | null
          effective_start_fiscal_year?: string
          margin_percent?: number | null
          nsp?: number | null
          nsp_last_updated_at?: string | null
          nsp_last_updated_by?: string | null
          status?: string | null
          total_cogs?: number | null
          total_margin?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          volume?: number | null
          volume_last_updated_at?: string | null
          volume_last_updated_by?: string | null
          year_offset?: number
        }
        Relationships: []
      }
      business_case_use_groups: {
        Row: {
          business_case_id: string
          created_at: string | null
          formulation_country_use_group_id: string
          weighting: number | null
        }
        Insert: {
          business_case_id: string
          created_at?: string | null
          formulation_country_use_group_id: string
          weighting?: number | null
        }
        Update: {
          business_case_id?: string
          created_at?: string | null
          formulation_country_use_group_id?: string
          weighting?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "business_case_use_groups_business_case_id_fkey"
            columns: ["business_case_id"]
            isOneToOne: false
            referencedRelation: "business_case"
            referencedColumns: ["business_case_id"]
          },
          {
            foreignKeyName: "business_case_use_groups_business_case_id_fkey"
            columns: ["business_case_id"]
            isOneToOne: false
            referencedRelation: "vw_business_case"
            referencedColumns: ["business_case_id"]
          },
          {
            foreignKeyName: "business_case_use_groups_business_case_id_fkey"
            columns: ["business_case_id"]
            isOneToOne: false
            referencedRelation: "vw_business_case_detail"
            referencedColumns: ["business_case_id"]
          },
          {
            foreignKeyName: "business_case_use_groups_formulation_country_use_group_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "business_case_use_groups_formulation_country_use_group_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "business_case_use_groups_formulation_country_use_group_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_use_group_details"
            referencedColumns: ["formulation_country_use_group_id"]
          },
        ]
      }
      cogs: {
        Row: {
          cogs_group_id: string
          cogs_id: string
          cogs_value: number
          created_at: string | null
          created_by: string | null
          fiscal_year: string
          formulation_country_id: string | null
          formulation_id: string
          is_country_specific: boolean | null
          last_updated_at: string | null
          last_updated_by: string | null
          manufacturing_cost: number | null
          notes: string | null
          other_costs: number | null
          packaging_cost: number | null
          raw_material_cost: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          cogs_group_id: string
          cogs_id?: string
          cogs_value: number
          created_at?: string | null
          created_by?: string | null
          fiscal_year: string
          formulation_country_id?: string | null
          formulation_id: string
          is_country_specific?: boolean | null
          last_updated_at?: string | null
          last_updated_by?: string | null
          manufacturing_cost?: number | null
          notes?: string | null
          other_costs?: number | null
          packaging_cost?: number | null
          raw_material_cost?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          cogs_group_id?: string
          cogs_id?: string
          cogs_value?: number
          created_at?: string | null
          created_by?: string | null
          fiscal_year?: string
          formulation_country_id?: string | null
          formulation_id?: string
          is_country_specific?: boolean | null
          last_updated_at?: string | null
          last_updated_by?: string | null
          manufacturing_cost?: number | null
          notes?: string | null
          other_costs?: number | null
          packaging_cost?: number | null
          raw_material_cost?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_active_portfolio"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "cogs_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      countries: {
        Row: {
          country_code: string
          country_id: string
          country_name: string
          created_at: string | null
          currency_code: string
          has_tariffs: boolean | null
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          country_code: string
          country_id?: string
          country_name: string
          created_at?: string | null
          currency_code: string
          has_tariffs?: boolean | null
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          country_code?: string
          country_id?: string
          country_name?: string
          created_at?: string | null
          currency_code?: string
          has_tariffs?: boolean | null
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      currency_conversions: {
        Row: {
          created_at: string | null
          created_by: string | null
          currency_conversion_id: string
          from_currency: string
          rate: number
          status: string | null
          to_currency: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          currency_conversion_id?: string
          from_currency: string
          rate: number
          status?: string | null
          to_currency: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          currency_conversion_id?: string
          from_currency?: string
          rate?: number
          status?: string | null
          to_currency?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      eppo_codes: {
        Row: {
          bulgarian_name: string | null
          catalan_name: string | null
          classification: string
          created_at: string | null
          croatian_name: string | null
          czech_name: string | null
          danish_name: string | null
          display_name: string | null
          dutch_name: string | null
          english_name: string | null
          eppo_code: string
          eppo_code_id: string
          eppo_datatype: string | null
          eppo_type: string
          french_name: string | null
          german_name: string | null
          hierarchy_level: number | null
          hungarian_name: string | null
          is_active: boolean | null
          is_parent: boolean | null
          italian_name: string | null
          latin_name: string | null
          lithuanian_name: string | null
          notes: string | null
          parent_eppo_code: string | null
          polish_name: string | null
          portuguese_name: string | null
          russian_name: string | null
          slovak_name: string | null
          slovene_name: string | null
          spanish_name: string | null
          swedish_name: string | null
          turkish_name: string | null
          ukrainian_name: string | null
          updated_at: string | null
        }
        Insert: {
          bulgarian_name?: string | null
          catalan_name?: string | null
          classification: string
          created_at?: string | null
          croatian_name?: string | null
          czech_name?: string | null
          danish_name?: string | null
          display_name?: string | null
          dutch_name?: string | null
          english_name?: string | null
          eppo_code: string
          eppo_code_id?: string
          eppo_datatype?: string | null
          eppo_type: string
          french_name?: string | null
          german_name?: string | null
          hierarchy_level?: number | null
          hungarian_name?: string | null
          is_active?: boolean | null
          is_parent?: boolean | null
          italian_name?: string | null
          latin_name?: string | null
          lithuanian_name?: string | null
          notes?: string | null
          parent_eppo_code?: string | null
          polish_name?: string | null
          portuguese_name?: string | null
          russian_name?: string | null
          slovak_name?: string | null
          slovene_name?: string | null
          spanish_name?: string | null
          swedish_name?: string | null
          turkish_name?: string | null
          ukrainian_name?: string | null
          updated_at?: string | null
        }
        Update: {
          bulgarian_name?: string | null
          catalan_name?: string | null
          classification?: string
          created_at?: string | null
          croatian_name?: string | null
          czech_name?: string | null
          danish_name?: string | null
          display_name?: string | null
          dutch_name?: string | null
          english_name?: string | null
          eppo_code?: string
          eppo_code_id?: string
          eppo_datatype?: string | null
          eppo_type?: string
          french_name?: string | null
          german_name?: string | null
          hierarchy_level?: number | null
          hungarian_name?: string | null
          is_active?: boolean | null
          is_parent?: boolean | null
          italian_name?: string | null
          latin_name?: string | null
          lithuanian_name?: string | null
          notes?: string | null
          parent_eppo_code?: string | null
          polish_name?: string | null
          portuguese_name?: string | null
          russian_name?: string | null
          slovak_name?: string | null
          slovene_name?: string | null
          spanish_name?: string | null
          swedish_name?: string | null
          turkish_name?: string | null
          ukrainian_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_eppo_codes_parent"
            columns: ["parent_eppo_code"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code"]
          },
          {
            foreignKeyName: "fk_eppo_codes_parent"
            columns: ["parent_eppo_code"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["crop_eppo_code"]
          },
          {
            foreignKeyName: "fk_eppo_codes_parent"
            columns: ["parent_eppo_code"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["target_eppo_code"]
          },
        ]
      }
      exchange_rates: {
        Row: {
          country_id: string
          created_at: string | null
          created_by: string | null
          currency_code: string
          effective_date: string
          exchange_rate_id: string
          exchange_rate_to_eur: number
          is_active: boolean | null
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          country_id: string
          created_at?: string | null
          created_by?: string | null
          currency_code: string
          effective_date: string
          exchange_rate_id?: string
          exchange_rate_to_eur: number
          is_active?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          country_id?: string
          created_at?: string | null
          created_by?: string | null
          currency_code?: string
          effective_date?: string
          exchange_rate_id?: string
          exchange_rate_to_eur?: number
          is_active?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_exchange_rates_country"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
        ]
      }
      external_links: {
        Row: {
          created_at: string | null
          description: string | null
          formulation_id: string | null
          link_id: string
          link_type: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          formulation_id?: string | null
          link_id?: string
          link_type?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          formulation_id?: string | null
          link_id?: string
          link_type?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_links_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "external_links_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      formulation_country: {
        Row: {
          country_id: string
          country_readiness: string
          country_readiness_notes: string | null
          country_status: string
          created_at: string | null
          earliest_market_entry_date: string | null
          formulation_country_id: string
          formulation_id: string
          is_active: boolean | null
          is_eu_approved_formulation: boolean | null
          is_novel: boolean | null
          likely_registration_pathway: string | null
          updated_at: string | null
        }
        Insert: {
          country_id: string
          country_readiness?: string
          country_readiness_notes?: string | null
          country_status?: string
          created_at?: string | null
          earliest_market_entry_date?: string | null
          formulation_country_id?: string
          formulation_id: string
          is_active?: boolean | null
          is_eu_approved_formulation?: boolean | null
          is_novel?: boolean | null
          likely_registration_pathway?: string | null
          updated_at?: string | null
        }
        Update: {
          country_id?: string
          country_readiness?: string
          country_readiness_notes?: string | null
          country_status?: string
          created_at?: string | null
          earliest_market_entry_date?: string | null
          formulation_country_id?: string
          formulation_id?: string
          is_active?: boolean | null
          is_eu_approved_formulation?: boolean | null
          is_novel?: boolean | null
          likely_registration_pathway?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      formulation_country_readiness_history: {
        Row: {
          change_type: string | null
          changed_at: string | null
          changed_by: string | null
          formulation_country_id: string
          history_id: string
          new_readiness: string
          old_readiness: string | null
          readiness_notes: string | null
        }
        Insert: {
          change_type?: string | null
          changed_at?: string | null
          changed_by?: string | null
          formulation_country_id: string
          history_id?: string
          new_readiness: string
          old_readiness?: string | null
          readiness_notes?: string | null
        }
        Update: {
          change_type?: string | null
          changed_at?: string | null
          changed_by?: string | null
          formulation_country_id?: string
          history_id?: string
          new_readiness?: string
          old_readiness?: string | null
          readiness_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_readiness_history_formulation_country_id_fk"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_readiness_history_formulation_country_id_fk"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_active_portfolio"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_readiness_history_formulation_country_id_fk"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_readiness_history_formulation_country_id_fk"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_readiness_history_formulation_country_id_fk"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_readiness_history_formulation_country_id_fk"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_readiness_history_formulation_country_id_fk"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_readiness_history_formulation_country_id_fk"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
        ]
      }
      formulation_country_status_history: {
        Row: {
          change_type: string | null
          changed_at: string | null
          changed_by: string | null
          formulation_country_id: string
          history_id: string
          new_status: string
          old_status: string | null
          status_rationale: string | null
        }
        Insert: {
          change_type?: string | null
          changed_at?: string | null
          changed_by?: string | null
          formulation_country_id: string
          history_id?: string
          new_status: string
          old_status?: string | null
          status_rationale?: string | null
        }
        Update: {
          change_type?: string | null
          changed_at?: string | null
          changed_by?: string | null
          formulation_country_id?: string
          history_id?: string
          new_status?: string
          old_status?: string | null
          status_rationale?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_status_history_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_status_history_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_active_portfolio"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_status_history_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_status_history_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_status_history_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_status_history_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_status_history_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_status_history_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
        ]
      }
      formulation_country_use_group: {
        Row: {
          created_at: string | null
          earliest_actual_approval_date: string | null
          earliest_actual_submission_date: string | null
          earliest_planned_approval_date: string | null
          earliest_planned_submission_date: string | null
          formulation_country_id: string
          formulation_country_use_group_id: string
          is_active: boolean | null
          reference_product_id: string | null
          target_market_entry_fy: string | null
          updated_at: string | null
          use_group_name: string | null
          use_group_status: string
          use_group_variant: string
        }
        Insert: {
          created_at?: string | null
          earliest_actual_approval_date?: string | null
          earliest_actual_submission_date?: string | null
          earliest_planned_approval_date?: string | null
          earliest_planned_submission_date?: string | null
          formulation_country_id: string
          formulation_country_use_group_id?: string
          is_active?: boolean | null
          reference_product_id?: string | null
          target_market_entry_fy?: string | null
          updated_at?: string | null
          use_group_name?: string | null
          use_group_status?: string
          use_group_variant: string
        }
        Update: {
          created_at?: string | null
          earliest_actual_approval_date?: string | null
          earliest_actual_submission_date?: string | null
          earliest_planned_approval_date?: string | null
          earliest_planned_submission_date?: string | null
          formulation_country_id?: string
          formulation_country_use_group_id?: string
          is_active?: boolean | null
          reference_product_id?: string | null
          target_market_entry_fy?: string | null
          updated_at?: string | null
          use_group_name?: string | null
          use_group_status?: string
          use_group_variant?: string
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_active_portfolio"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_reference_product_id_fkey"
            columns: ["reference_product_id"]
            isOneToOne: false
            referencedRelation: "reference_products"
            referencedColumns: ["reference_product_id"]
          },
        ]
      }
      formulation_country_use_group_eppo_crops: {
        Row: {
          created_at: string | null
          eppo_code_id: string
          formulation_country_use_group_id: string
          include_children: boolean | null
          is_critical: boolean | null
          is_excluded: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          eppo_code_id: string
          formulation_country_use_group_id: string
          include_children?: boolean | null
          is_critical?: boolean | null
          is_excluded?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          eppo_code_id?: string
          formulation_country_use_group_id?: string
          include_children?: boolean | null
          is_critical?: boolean | null
          is_excluded?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_fcug_eppo_crops_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_fcug_eppo_crops_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "fk_fcug_eppo_crops_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "fk_fcug_eppo_crops_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_use_group_details"
            referencedColumns: ["formulation_country_use_group_id"]
          },
        ]
      }
      formulation_country_use_group_eppo_crops_audit: {
        Row: {
          action: string
          audit_id: string
          changed_at: string | null
          changed_by: string | null
          eppo_code: string | null
          eppo_code_id: string
          formulation_country_use_group_id: string
          include_children: boolean | null
          is_critical: boolean | null
          is_excluded: boolean | null
        }
        Insert: {
          action: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id: string
          formulation_country_use_group_id: string
          include_children?: boolean | null
          is_critical?: boolean | null
          is_excluded?: boolean | null
        }
        Update: {
          action?: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id?: string
          formulation_country_use_group_id?: string
          include_children?: boolean | null
          is_critical?: boolean | null
          is_excluded?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_fcug_crops_audit_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_fcug_crops_audit_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "fk_fcug_crops_audit_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "fk_fcug_crops_audit_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_use_group_details"
            referencedColumns: ["formulation_country_use_group_id"]
          },
        ]
      }
      formulation_country_use_group_eppo_targets: {
        Row: {
          created_at: string | null
          eppo_code_id: string
          formulation_country_use_group_id: string
          include_children: boolean | null
          is_critical: boolean | null
          is_excluded: boolean | null
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          eppo_code_id: string
          formulation_country_use_group_id: string
          include_children?: boolean | null
          is_critical?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          eppo_code_id?: string
          formulation_country_use_group_id?: string
          include_children?: boolean | null
          is_critical?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_fcug_eppo_targets_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_fcug_eppo_targets_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "fk_fcug_eppo_targets_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "fk_fcug_eppo_targets_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_use_group_details"
            referencedColumns: ["formulation_country_use_group_id"]
          },
        ]
      }
      formulation_country_use_group_eppo_targets_audit: {
        Row: {
          action: string
          audit_id: string
          changed_at: string | null
          changed_by: string | null
          eppo_code: string | null
          eppo_code_id: string
          formulation_country_use_group_id: string
          include_children: boolean | null
          is_critical: boolean | null
          is_excluded: boolean | null
          notes: string | null
        }
        Insert: {
          action: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id: string
          formulation_country_use_group_id: string
          include_children?: boolean | null
          is_critical?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
        }
        Update: {
          action?: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id?: string
          formulation_country_use_group_id?: string
          include_children?: boolean | null
          is_critical?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_fcug_targets_audit_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_fcug_targets_audit_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "fk_fcug_targets_audit_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "fk_fcug_targets_audit_fcug"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_use_group_details"
            referencedColumns: ["formulation_country_use_group_id"]
          },
        ]
      }
      formulation_country_use_group_status_history: {
        Row: {
          change_type: string | null
          changed_at: string | null
          changed_by: string | null
          formulation_country_use_group_id: string
          history_id: string
          new_status: string
          old_status: string | null
          status_rationale: string | null
        }
        Insert: {
          change_type?: string | null
          changed_at?: string | null
          changed_by?: string | null
          formulation_country_use_group_id: string
          history_id?: string
          new_status: string
          old_status?: string | null
          status_rationale?: string | null
        }
        Update: {
          change_type?: string | null
          changed_at?: string | null
          changed_by?: string | null
          formulation_country_use_group_id?: string
          history_id?: string
          new_status?: string
          old_status?: string | null
          status_rationale?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_use_group_status_history_fcug_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_status_history_fcug_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_status_history_fcug_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_use_group_details"
            referencedColumns: ["formulation_country_use_group_id"]
          },
        ]
      }
      formulation_eppo_crops: {
        Row: {
          created_at: string | null
          eppo_code_id: string
          formulation_id: string
          include_children: boolean | null
          is_excluded: boolean | null
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          eppo_code_id: string
          formulation_id: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          eppo_code_id?: string
          formulation_id?: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_formulation_eppo_crops_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_formulation_eppo_crops_formulation"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "fk_formulation_eppo_crops_formulation"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      formulation_eppo_crops_audit: {
        Row: {
          action: string
          audit_id: string
          changed_at: string | null
          changed_by: string | null
          eppo_code: string | null
          eppo_code_id: string
          formulation_id: string
          include_children: boolean | null
          is_excluded: boolean | null
          notes: string | null
        }
        Insert: {
          action: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id: string
          formulation_id: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
        }
        Update: {
          action?: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id?: string
          formulation_id?: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_formulation_crops_audit_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_formulation_crops_audit_formulation"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "fk_formulation_crops_audit_formulation"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      formulation_eppo_targets: {
        Row: {
          created_at: string | null
          eppo_code_id: string
          formulation_id: string
          include_children: boolean | null
          is_excluded: boolean | null
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          eppo_code_id: string
          formulation_id: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          eppo_code_id?: string
          formulation_id?: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_formulation_eppo_targets_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_formulation_eppo_targets_formulation"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "fk_formulation_eppo_targets_formulation"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      formulation_eppo_targets_audit: {
        Row: {
          action: string
          audit_id: string
          changed_at: string | null
          changed_by: string | null
          eppo_code: string | null
          eppo_code_id: string
          formulation_id: string
          include_children: boolean | null
          is_excluded: boolean | null
          notes: string | null
        }
        Insert: {
          action: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id: string
          formulation_id: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
        }
        Update: {
          action?: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id?: string
          formulation_id?: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_formulation_targets_audit_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_formulation_targets_audit_formulation"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "fk_formulation_targets_audit_formulation"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      formulation_ingredients: {
        Row: {
          created_at: string | null
          formulation_id: string
          formulation_ingredient_id: string
          ingredient_id: string
          ingredient_role: string | null
          notes: string | null
          quantity: number
          quantity_unit: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          formulation_id: string
          formulation_ingredient_id?: string
          ingredient_id: string
          ingredient_role?: string | null
          notes?: string | null
          quantity: number
          quantity_unit: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          formulation_id?: string
          formulation_ingredient_id?: string
          ingredient_id?: string
          ingredient_role?: string | null
          notes?: string | null
          quantity?: number
          quantity_unit?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_ingredients_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_ingredients_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "formulation_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "vw_ingredient_usage"
            referencedColumns: ["ingredient_id"]
          },
        ]
      }
      formulation_readiness_history: {
        Row: {
          change_type: string | null
          changed_at: string | null
          changed_by: string | null
          formulation_id: string
          history_id: string
          new_readiness: string
          old_readiness: string | null
          readiness_notes: string | null
        }
        Insert: {
          change_type?: string | null
          changed_at?: string | null
          changed_by?: string | null
          formulation_id: string
          history_id?: string
          new_readiness: string
          old_readiness?: string | null
          readiness_notes?: string | null
        }
        Update: {
          change_type?: string | null
          changed_at?: string | null
          changed_by?: string | null
          formulation_id?: string
          history_id?: string
          new_readiness?: string
          old_readiness?: string | null
          readiness_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_readiness_history_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_readiness_history_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      formulation_status_history: {
        Row: {
          change_type: string | null
          changed_at: string | null
          changed_by: string | null
          formulation_id: string
          history_id: string
          new_status: string
          old_status: string | null
          status_rationale: string | null
        }
        Insert: {
          change_type?: string | null
          changed_at?: string | null
          changed_by?: string | null
          formulation_id: string
          history_id?: string
          new_status: string
          old_status?: string | null
          status_rationale?: string | null
        }
        Update: {
          change_type?: string | null
          changed_at?: string | null
          changed_by?: string | null
          formulation_id?: string
          history_id?: string
          new_status?: string
          old_status?: string | null
          status_rationale?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_status_history_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_status_history_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      formulations: {
        Row: {
          active_signature: string | null
          base_code: string
          created_at: string | null
          created_by: string | null
          formulation_category: string
          formulation_code: string | null
          formulation_id: string
          formulation_name: string
          formulation_readiness: string
          formulation_readiness_notes: string | null
          formulation_status: string
          formulation_type: string | null
          is_active: boolean | null
          short_name: string | null
          status_rationale: string | null
          uom: string | null
          updated_at: string | null
          variant_suffix: string
        }
        Insert: {
          active_signature?: string | null
          base_code?: string
          created_at?: string | null
          created_by?: string | null
          formulation_category: string
          formulation_code?: string | null
          formulation_id?: string
          formulation_name: string
          formulation_readiness?: string
          formulation_readiness_notes?: string | null
          formulation_status?: string
          formulation_type?: string | null
          is_active?: boolean | null
          short_name?: string | null
          status_rationale?: string | null
          uom?: string | null
          updated_at?: string | null
          variant_suffix?: string
        }
        Update: {
          active_signature?: string | null
          base_code?: string
          created_at?: string | null
          created_by?: string | null
          formulation_category?: string
          formulation_code?: string | null
          formulation_id?: string
          formulation_name?: string
          formulation_readiness?: string
          formulation_readiness_notes?: string | null
          formulation_status?: string
          formulation_type?: string | null
          is_active?: boolean | null
          short_name?: string | null
          status_rationale?: string | null
          uom?: string | null
          updated_at?: string | null
          variant_suffix?: string
        }
        Relationships: []
      }
      ingredient_suppliers: {
        Row: {
          cost_per_kg: number | null
          created_at: string | null
          ingredient_id: string
          is_primary: boolean | null
          supplier_id: string
          updated_at: string | null
        }
        Insert: {
          cost_per_kg?: number | null
          created_at?: string | null
          ingredient_id: string
          is_primary?: boolean | null
          supplier_id: string
          updated_at?: string | null
        }
        Update: {
          cost_per_kg?: number | null
          created_at?: string | null
          ingredient_id?: string
          is_primary?: boolean | null
          supplier_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_suppliers_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "ingredient_suppliers_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "vw_ingredient_usage"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "ingredient_suppliers_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["supplier_id"]
          },
        ]
      }
      ingredients: {
        Row: {
          cas_number: string | null
          created_at: string | null
          ingredient_id: string
          ingredient_name: string
          ingredient_type: string
          is_active: boolean | null
          is_eu_approved: boolean | null
          regulatory_notes: string | null
          standard_density_g_per_l: number | null
          supply_risk: string | null
          supply_risk_notes: string | null
          updated_at: string | null
        }
        Insert: {
          cas_number?: string | null
          created_at?: string | null
          ingredient_id?: string
          ingredient_name: string
          ingredient_type: string
          is_active?: boolean | null
          is_eu_approved?: boolean | null
          regulatory_notes?: string | null
          standard_density_g_per_l?: number | null
          supply_risk?: string | null
          supply_risk_notes?: string | null
          updated_at?: string | null
        }
        Update: {
          cas_number?: string | null
          created_at?: string | null
          ingredient_id?: string
          ingredient_name?: string
          ingredient_type?: string
          is_active?: boolean | null
          is_eu_approved?: boolean | null
          regulatory_notes?: string | null
          standard_density_g_per_l?: number | null
          supply_risk?: string | null
          supply_risk_notes?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      invitations: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          email: string
          expires_at: string
          id: string
          invited_by: string | null
          role: string
          token_hash: string
          updated_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          invited_by?: string | null
          role?: string
          token_hash: string
          updated_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          role?: string
          token_hash?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      patent_assessments: {
        Row: {
          assessed_at: string | null
          assessed_by: string | null
          assessment_id: string
          blocking_reason: string | null
          created_at: string | null
          estimated_launch_date: string | null
          formulation_country_id: string | null
          is_blocking: boolean
          notes: string | null
          patent_id: string
          relevance: string | null
          updated_at: string | null
        }
        Insert: {
          assessed_at?: string | null
          assessed_by?: string | null
          assessment_id?: string
          blocking_reason?: string | null
          created_at?: string | null
          estimated_launch_date?: string | null
          formulation_country_id?: string | null
          is_blocking: boolean
          notes?: string | null
          patent_id: string
          relevance?: string | null
          updated_at?: string | null
        }
        Update: {
          assessed_at?: string | null
          assessed_by?: string | null
          assessment_id?: string
          blocking_reason?: string | null
          created_at?: string | null
          estimated_launch_date?: string | null
          formulation_country_id?: string | null
          is_blocking?: boolean
          notes?: string | null
          patent_id?: string
          relevance?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patent_assessments_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "patent_assessments_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_active_portfolio"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "patent_assessments_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "patent_assessments_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "patent_assessments_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "patent_assessments_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "patent_assessments_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "patent_assessments_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "patent_assessments_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_assessments_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_assessments_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_applicable_countries"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_assessments_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_assessments_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["patent_id"]
          },
        ]
      }
      patent_combination_ingredients: {
        Row: {
          created_at: string | null
          ingredient_id: string
          patent_combination_ingredient_id: string
          patent_id: string
        }
        Insert: {
          created_at?: string | null
          ingredient_id: string
          patent_combination_ingredient_id?: string
          patent_id: string
        }
        Update: {
          created_at?: string | null
          ingredient_id?: string
          patent_combination_ingredient_id?: string
          patent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patent_combination_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "patent_combination_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "vw_ingredient_usage"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "patent_combination_ingredients_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_combination_ingredients_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_combination_ingredients_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_applicable_countries"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_combination_ingredients_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_combination_ingredients_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["patent_id"]
          },
        ]
      }
      patent_ingredient_protections: {
        Row: {
          created_at: string | null
          ingredient_id: string
          patent_id: string
          patent_ingredient_protection_id: string
        }
        Insert: {
          created_at?: string | null
          ingredient_id: string
          patent_id: string
          patent_ingredient_protection_id?: string
        }
        Update: {
          created_at?: string | null
          ingredient_id?: string
          patent_id?: string
          patent_ingredient_protection_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patent_ingredient_protections_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "patent_ingredient_protections_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "vw_ingredient_usage"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "patent_ingredient_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_ingredient_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_ingredient_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_applicable_countries"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_ingredient_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_ingredient_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["patent_id"]
          },
        ]
      }
      patent_reference_product_protections: {
        Row: {
          created_at: string | null
          patent_id: string
          patent_reference_product_protection_id: string
          reference_product_id: string
        }
        Insert: {
          created_at?: string | null
          patent_id: string
          patent_reference_product_protection_id?: string
          reference_product_id: string
        }
        Update: {
          created_at?: string | null
          patent_id?: string
          patent_reference_product_protection_id?: string
          reference_product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patent_reference_product_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_reference_product_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_reference_product_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_applicable_countries"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_reference_product_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_reference_product_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_reference_product_protections_reference_product_id_fkey"
            columns: ["reference_product_id"]
            isOneToOne: false
            referencedRelation: "reference_products"
            referencedColumns: ["reference_product_id"]
          },
        ]
      }
      patent_use_protections: {
        Row: {
          created_at: string | null
          eppo_crop_code_id: string | null
          eppo_target_code_id: string | null
          patent_id: string
          patent_use_protection_id: string
          reference_product_id: string | null
        }
        Insert: {
          created_at?: string | null
          eppo_crop_code_id?: string | null
          eppo_target_code_id?: string | null
          patent_id: string
          patent_use_protection_id?: string
          reference_product_id?: string | null
        }
        Update: {
          created_at?: string | null
          eppo_crop_code_id?: string | null
          eppo_target_code_id?: string | null
          patent_id?: string
          patent_use_protection_id?: string
          reference_product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patent_use_protections_eppo_crop_code_id_fkey"
            columns: ["eppo_crop_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "patent_use_protections_eppo_target_code_id_fkey"
            columns: ["eppo_target_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "patent_use_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_use_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_use_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_applicable_countries"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_use_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_use_protections_patent_id_fkey"
            columns: ["patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patent_use_protections_reference_product_id_fkey"
            columns: ["reference_product_id"]
            isOneToOne: false
            referencedRelation: "reference_products"
            referencedColumns: ["reference_product_id"]
          },
        ]
      }
      patents: {
        Row: {
          applicant: string | null
          created_at: string | null
          expiration_date: string
          filing_date: string | null
          google_patents_link: string | null
          grant_date: string | null
          legal_status: string
          notes: string | null
          parent_patent_id: string | null
          patent_id: string
          patent_number: string
          patent_office: string
          patent_title: string | null
          patent_type: string
          priority_date: string | null
          publication_date: string | null
          updated_at: string | null
        }
        Insert: {
          applicant?: string | null
          created_at?: string | null
          expiration_date: string
          filing_date?: string | null
          google_patents_link?: string | null
          grant_date?: string | null
          legal_status?: string
          notes?: string | null
          parent_patent_id?: string | null
          patent_id?: string
          patent_number: string
          patent_office: string
          patent_title?: string | null
          patent_type: string
          priority_date?: string | null
          publication_date?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant?: string | null
          created_at?: string | null
          expiration_date?: string
          filing_date?: string | null
          google_patents_link?: string | null
          grant_date?: string | null
          legal_status?: string
          notes?: string | null
          parent_patent_id?: string | null
          patent_id?: string
          patent_number?: string
          patent_office?: string
          patent_title?: string | null
          patent_type?: string
          priority_date?: string | null
          publication_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patents_parent_patent_id_fkey"
            columns: ["parent_patent_id"]
            isOneToOne: false
            referencedRelation: "patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patents_parent_patent_id_fkey"
            columns: ["parent_patent_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patents_parent_patent_id_fkey"
            columns: ["parent_patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_applicable_countries"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patents_parent_patent_id_fkey"
            columns: ["parent_patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patents_parent_patent_id_fkey"
            columns: ["parent_patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["patent_id"]
          },
        ]
      }
      permissions: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          display_name: string
          permission_id: string
          permission_key: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          display_name: string
          permission_id?: string
          permission_key: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          display_name?: string
          permission_id?: string
          permission_key?: string
        }
        Relationships: []
      }
      reference_product_eppo_crops: {
        Row: {
          created_at: string | null
          eppo_code_id: string
          include_children: boolean | null
          is_excluded: boolean | null
          reference_product_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          eppo_code_id: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          reference_product_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          eppo_code_id?: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          reference_product_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_ref_prod_eppo_crops_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_ref_prod_eppo_crops_ref_prod"
            columns: ["reference_product_id"]
            isOneToOne: false
            referencedRelation: "reference_products"
            referencedColumns: ["reference_product_id"]
          },
        ]
      }
      reference_product_eppo_crops_audit: {
        Row: {
          action: string
          audit_id: string
          changed_at: string | null
          changed_by: string | null
          eppo_code: string | null
          eppo_code_id: string
          include_children: boolean | null
          is_excluded: boolean | null
          reference_product_id: string
        }
        Insert: {
          action: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          reference_product_id: string
        }
        Update: {
          action?: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id?: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          reference_product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_ref_prod_crops_audit_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_ref_prod_crops_audit_ref_prod"
            columns: ["reference_product_id"]
            isOneToOne: false
            referencedRelation: "reference_products"
            referencedColumns: ["reference_product_id"]
          },
        ]
      }
      reference_product_eppo_targets: {
        Row: {
          created_at: string | null
          eppo_code_id: string
          include_children: boolean | null
          is_excluded: boolean | null
          reference_product_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          eppo_code_id: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          reference_product_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          eppo_code_id?: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          reference_product_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_ref_prod_eppo_targets_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_ref_prod_eppo_targets_ref_prod"
            columns: ["reference_product_id"]
            isOneToOne: false
            referencedRelation: "reference_products"
            referencedColumns: ["reference_product_id"]
          },
        ]
      }
      reference_product_eppo_targets_audit: {
        Row: {
          action: string
          audit_id: string
          changed_at: string | null
          changed_by: string | null
          eppo_code: string | null
          eppo_code_id: string
          include_children: boolean | null
          is_excluded: boolean | null
          reference_product_id: string
        }
        Insert: {
          action: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          reference_product_id: string
        }
        Update: {
          action?: string
          audit_id?: string
          changed_at?: string | null
          changed_by?: string | null
          eppo_code?: string | null
          eppo_code_id?: string
          include_children?: boolean | null
          is_excluded?: boolean | null
          reference_product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_ref_prod_targets_audit_eppo_code"
            columns: ["eppo_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "fk_ref_prod_targets_audit_ref_prod"
            columns: ["reference_product_id"]
            isOneToOne: false
            referencedRelation: "reference_products"
            referencedColumns: ["reference_product_id"]
          },
        ]
      }
      reference_products: {
        Row: {
          active_ingredients_description: string | null
          created_at: string | null
          formulation_type: string | null
          is_active: boolean | null
          manufacturer: string | null
          notes: string | null
          product_name: string
          reference_product_id: string
          registration_number: string | null
          supplier_id: string | null
          updated_at: string | null
        }
        Insert: {
          active_ingredients_description?: string | null
          created_at?: string | null
          formulation_type?: string | null
          is_active?: boolean | null
          manufacturer?: string | null
          notes?: string | null
          product_name: string
          reference_product_id?: string
          registration_number?: string | null
          supplier_id?: string | null
          updated_at?: string | null
        }
        Update: {
          active_ingredients_description?: string | null
          created_at?: string | null
          formulation_type?: string | null
          is_active?: boolean | null
          manufacturer?: string | null
          notes?: string | null
          product_name?: string
          reference_product_id?: string
          registration_number?: string | null
          supplier_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reference_products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["supplier_id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string | null
          permission_id: string
          role_id: string
        }
        Insert: {
          created_at?: string | null
          permission_id: string
          role_id: string
        }
        Update: {
          created_at?: string | null
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          is_system_role: boolean | null
          role_id: string
          role_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          is_system_role?: boolean | null
          role_id?: string
          role_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          is_system_role?: boolean | null
          role_id?: string
          role_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          actual_approval_date: string | null
          actual_submission_date: string | null
          created_at: string | null
          formulation_country_use_group_id: string
          is_active: boolean | null
          keyedin_project_id: string
          planned_approval_date: string | null
          planned_submission_date: string | null
          submission_id: string
          updated_at: string | null
        }
        Insert: {
          actual_approval_date?: string | null
          actual_submission_date?: string | null
          created_at?: string | null
          formulation_country_use_group_id: string
          is_active?: boolean | null
          keyedin_project_id: string
          planned_approval_date?: string | null
          planned_submission_date?: string | null
          submission_id?: string
          updated_at?: string | null
        }
        Update: {
          actual_approval_date?: string | null
          actual_submission_date?: string | null
          created_at?: string | null
          formulation_country_use_group_id?: string
          is_active?: boolean | null
          keyedin_project_id?: string
          planned_approval_date?: string | null
          planned_submission_date?: string | null
          submission_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_formulation_country_use_group_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "submissions_formulation_country_use_group_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "submissions_formulation_country_use_group_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_use_group_details"
            referencedColumns: ["formulation_country_use_group_id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          country_id: string | null
          created_at: string | null
          is_active: boolean | null
          supplier_code: string | null
          supplier_id: string
          supplier_name: string
        }
        Insert: {
          address?: string | null
          country_id?: string | null
          created_at?: string | null
          is_active?: boolean | null
          supplier_code?: string | null
          supplier_id?: string
          supplier_name: string
        }
        Update: {
          address?: string | null
          country_id?: string | null
          created_at?: string | null
          is_active?: boolean | null
          supplier_code?: string | null
          supplier_id?: string
          supplier_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
        ]
      }
      theme_colors: {
        Row: {
          color_id: string
          color_name: string
          color_value: string
          created_at: string | null
          theme_id: string
          updated_at: string | null
        }
        Insert: {
          color_id?: string
          color_name: string
          color_value: string
          created_at?: string | null
          theme_id: string
          updated_at?: string | null
        }
        Update: {
          color_id?: string
          color_name?: string
          color_value?: string
          created_at?: string | null
          theme_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_theme_colors_theme"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["theme_id"]
          },
        ]
      }
      themes: {
        Row: {
          created_at: string | null
          description: string | null
          is_preset: boolean | null
          name: string
          slug: string
          theme_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          is_preset?: boolean | null
          name: string
          slug: string
          theme_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          is_preset?: boolean | null
          name?: string
          slug?: string
          theme_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          theme_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          theme_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          theme_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_preferences_theme"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["theme_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          role_id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          role_id: string
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
      user_workspace_preferences: {
        Row: {
          created_at: string | null
          is_default: boolean | null
          updated_at: string | null
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          is_default?: boolean | null
          updated_at?: string | null
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          is_default?: boolean | null
          updated_at?: string | null
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_workspace_preferences_workspace"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["workspace_id"]
          },
        ]
      }
      workspace_menu_items: {
        Row: {
          created_at: string | null
          display_order: number
          group_name: string
          icon: string | null
          is_active: boolean | null
          menu_item_id: string
          title: string
          updated_at: string | null
          url: string
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number
          group_name: string
          icon?: string | null
          is_active?: boolean | null
          menu_item_id?: string
          title: string
          updated_at?: string | null
          url: string
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          display_order?: number
          group_name?: string
          icon?: string | null
          is_active?: boolean | null
          menu_item_id?: string
          title?: string
          updated_at?: string | null
          url?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_workspace_menu_items_workspace"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["workspace_id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
          workspace_id?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      vw_active_portfolio: {
        Row: {
          active_use_groups: number | null
          country_code: string | null
          country_name: string | null
          country_readiness: string | null
          country_status: string | null
          crops_used_on: string | null
          display_name: string | null
          earliest_market_entry_date: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          is_eu_approved_formulation: boolean | null
          is_novel: boolean | null
          last_updated: string | null
          product_category: string | null
          product_name: string | null
          registration_pathway: string | null
          targets: string | null
        }
        Relationships: []
      }
      vw_blocking_patents: {
        Row: {
          applicant: string | null
          assessed_at: string | null
          assessed_by: string | null
          assessment_type: string | null
          blocking_reason: string | null
          country_code: string | null
          country_id: string | null
          country_name: string | null
          estimated_launch_date: string | null
          expiration_date: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_id: string | null
          formulation_name: string | null
          legal_status: string | null
          patent_id: string | null
          patent_number: string | null
          patent_office: string | null
          patent_title: string | null
          patent_type: string | null
          relevance: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      vw_business_case: {
        Row: {
          assumptions: string | null
          business_case_group_id: string | null
          business_case_id: string | null
          business_case_name: string | null
          cogs_last_updated_at: string | null
          cogs_last_updated_by: string | null
          cogs_per_unit: number | null
          country_code: string | null
          country_id: string | null
          country_name: string | null
          created_at: string | null
          created_by: string | null
          display_name: string | null
          effective_start_fiscal_year: string | null
          fiscal_year: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_country_use_group_id: string | null
          formulation_id: string | null
          formulation_name: string | null
          margin_percent: number | null
          nsp: number | null
          nsp_last_updated_at: string | null
          nsp_last_updated_by: string | null
          status: string | null
          target_market_entry_fy: string | null
          total_cogs: number | null
          total_margin: number | null
          total_revenue: number | null
          uom: string | null
          updated_at: string | null
          use_group_name: string | null
          use_group_variant: string | null
          volume: number | null
          volume_last_updated_at: string | null
          volume_last_updated_by: string | null
          year_offset: number | null
        }
        Relationships: [
          {
            foreignKeyName: "business_case_use_groups_formulation_country_use_group_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "business_case_use_groups_formulation_country_use_group_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "business_case_use_groups_formulation_country_use_group_id_fkey"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_use_group_details"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "formulation_country_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_active_portfolio"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
        ]
      }
      vw_business_case_detail: {
        Row: {
          assumptions: string | null
          business_case_group_id: string | null
          business_case_id: string | null
          cogs_last_updated_at: string | null
          cogs_last_updated_by: string | null
          cogs_per_unit: number | null
          country_name: string | null
          currency_code: string | null
          effective_start_fiscal_year: string | null
          emd: string | null
          fiscal_year: string | null
          formulation_code: string | null
          margin_percent: number | null
          nsp: number | null
          nsp_last_updated_at: string | null
          nsp_last_updated_by: string | null
          product_category: string | null
          product_name: string | null
          status: string | null
          target_market_entry_fy: string | null
          total_cogs: number | null
          total_margin: number | null
          total_revenue: number | null
          uom: string | null
          use_group_name: string | null
          use_group_variant: string | null
          volume: number | null
          volume_last_updated_at: string | null
          volume_last_updated_by: string | null
          year_offset: number | null
        }
        Relationships: []
      }
      vw_chart_data_by_year: {
        Row: {
          avg_margin_percent: number | null
          business_case_group_count: number | null
          country_id: string | null
          country_name: string | null
          currency_code: string | null
          exchange_rate_to_eur: number | null
          fiscal_year: string | null
          formulation_count: number | null
          total_cogs: number | null
          total_margin: number | null
          total_margin_eur: number | null
          total_revenue: number | null
          total_revenue_eur: number | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
        ]
      }
      vw_chart_data_totals_by_year: {
        Row: {
          avg_margin_percent: number | null
          business_case_group_count: number | null
          country_count: number | null
          fiscal_year: string | null
          formulation_count: number | null
          total_margin_eur: number | null
          total_revenue_eur: number | null
        }
        Relationships: []
      }
      vw_cogs: {
        Row: {
          cogs_group_id: string | null
          cogs_id: string | null
          cogs_value: number | null
          country_code: string | null
          country_name: string | null
          created_at: string | null
          created_by: string | null
          display_name: string | null
          fiscal_year: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_id: string | null
          formulation_name: string | null
          is_country_specific: boolean | null
          last_updated_at: string | null
          last_updated_by: string | null
          manufacturing_cost: number | null
          notes: string | null
          other_costs: number | null
          packaging_cost: number | null
          raw_material_cost: number | null
          status: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_active_portfolio"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "cogs_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      vw_dashboard_summary: {
        Row: {
          avg_margin_percent: number | null
          formulations_with_business_cases: number | null
          killed_formulations: number | null
          monitoring_formulations: number | null
          not_evaluated_formulations: number | null
          selected_formulations: number | null
          total_business_cases: number | null
          total_formulations: number | null
          total_margin: number | null
          total_revenue: number | null
          unique_business_case_groups: number | null
          unique_countries: number | null
        }
        Relationships: []
      }
      vw_formulation_country_detail: {
        Row: {
          country_code: string | null
          country_name: string | null
          country_readiness: string | null
          country_status: string | null
          created_at: string | null
          crop_categories: string | null
          display_name: string | null
          earliest_market_entry_date: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_type: string | null
          is_novel: boolean | null
          likely_registration_pathway: string | null
          max_supply_risk_level: number | null
          normal_crop_usage: string | null
          product_category: string | null
          product_name: string | null
          readiness: string | null
          target_market_entry_fy: string | null
          target_types: string | null
          targets_treated: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      vw_formulation_country_use_group: {
        Row: {
          country_code: string | null
          country_name: string | null
          created_at: string | null
          display_name: string | null
          earliest_actual_approval_date: string | null
          earliest_actual_submission_date: string | null
          earliest_planned_approval_date: string | null
          earliest_planned_submission_date: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_country_use_group_id: string | null
          formulation_name: string | null
          is_active: boolean | null
          reference_manufacturer: string | null
          reference_product_id: string | null
          reference_product_name: string | null
          target_market_entry_fy: string | null
          updated_at: string | null
          use_group_crops: string | null
          use_group_name: string | null
          use_group_status: string | null
          use_group_variant: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_active_portfolio"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_reference_product_id_fkey"
            columns: ["reference_product_id"]
            isOneToOne: false
            referencedRelation: "reference_products"
            referencedColumns: ["reference_product_id"]
          },
        ]
      }
      vw_formulation_families: {
        Row: {
          active_ingredients: string | null
          base_code: string | null
          family_description: string | null
          variant_count: number | null
          variants: string | null
        }
        Relationships: []
      }
      vw_formulations_with_ingredients: {
        Row: {
          active_ingredients: string | null
          created_at: string | null
          formulation_code: string | null
          formulation_id: string | null
          formulation_type: string | null
          full_composition: string | null
          max_supply_risk_level: number | null
          product_category: string | null
          product_name: string | null
          short_name: string | null
          status: string | null
          uom: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      vw_ingredient_usage: {
        Row: {
          cas_number: string | null
          formulation_count: number | null
          formulations_used_in: string | null
          ingredient_id: string | null
          ingredient_name: string | null
          ingredient_type: string | null
          is_eu_approved: boolean | null
          selected_formulations: number | null
          standard_density_g_per_l: number | null
          suppliers: string | null
          supply_risk: string | null
        }
        Relationships: []
      }
      vw_patent_applicable_countries: {
        Row: {
          country_code: string | null
          country_id: string | null
          country_name: string | null
          created_at: string | null
          expiration_date: string | null
          legal_status: string | null
          patent_id: string | null
          patent_number: string | null
          patent_office: string | null
          patent_type: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      vw_patent_assessments_effective: {
        Row: {
          assessed_at: string | null
          assessed_by: string | null
          assessment_id: string | null
          assessment_type: string | null
          blocking_reason: string | null
          country_code: string | null
          country_id: string | null
          country_name: string | null
          estimated_launch_date: string | null
          expiration_date: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_id: string | null
          is_blocking: boolean | null
          legal_status: string | null
          notes: string | null
          patent_id: string | null
          patent_number: string | null
          patent_office: string | null
          patent_type: string | null
          relevance: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      vw_patent_landscape: {
        Row: {
          applicant: string | null
          assessed_at: string | null
          assessed_by: string | null
          assessment_id: string | null
          assessment_type: string | null
          blocking_reason: string | null
          country_code: string | null
          country_id: string | null
          country_name: string | null
          created_at: string | null
          crop_classification: string | null
          crop_eppo_code: string | null
          crop_name: string | null
          eppo_crop_code_id: string | null
          eppo_target_code_id: string | null
          estimated_launch_date: string | null
          expiration_date: string | null
          filing_date: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_id: string | null
          formulation_name: string | null
          google_patents_link: string | null
          grant_date: string | null
          ingredient_id: string | null
          ingredient_name: string | null
          is_blocking: boolean | null
          legal_status: string | null
          parent_patent_id: string | null
          patent_id: string | null
          patent_number: string | null
          patent_office: string | null
          patent_title: string | null
          patent_type: string | null
          priority_date: string | null
          protection_type: string | null
          publication_date: string | null
          reference_product_id: string | null
          reference_product_name: string | null
          relevance: string | null
          target_eppo_code: string | null
          target_name: string | null
          target_type: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "patent_ingredient_protections_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "patent_ingredient_protections_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "vw_ingredient_usage"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "patent_reference_product_protections_reference_product_id_fkey"
            columns: ["reference_product_id"]
            isOneToOne: false
            referencedRelation: "reference_products"
            referencedColumns: ["reference_product_id"]
          },
          {
            foreignKeyName: "patent_use_protections_eppo_crop_code_id_fkey"
            columns: ["eppo_crop_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "patent_use_protections_eppo_target_code_id_fkey"
            columns: ["eppo_target_code_id"]
            isOneToOne: false
            referencedRelation: "eppo_codes"
            referencedColumns: ["eppo_code_id"]
          },
          {
            foreignKeyName: "patents_parent_patent_id_fkey"
            columns: ["parent_patent_id"]
            isOneToOne: false
            referencedRelation: "patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patents_parent_patent_id_fkey"
            columns: ["parent_patent_id"]
            isOneToOne: false
            referencedRelation: "vw_blocking_patents"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patents_parent_patent_id_fkey"
            columns: ["parent_patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_applicable_countries"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patents_parent_patent_id_fkey"
            columns: ["parent_patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_assessments_effective"
            referencedColumns: ["patent_id"]
          },
          {
            foreignKeyName: "patents_parent_patent_id_fkey"
            columns: ["parent_patent_id"]
            isOneToOne: false
            referencedRelation: "vw_patent_landscape"
            referencedColumns: ["patent_id"]
          },
        ]
      }
      vw_patent_protection_status: {
        Row: {
          blocking_patents_count: number | null
          combination_patents_count: number | null
          country_code: string | null
          country_id: string | null
          country_name: string | null
          earliest_combination_patent_expiry: string | null
          earliest_estimated_launch_date: string | null
          earliest_formulation_patent_expiry: string | null
          earliest_ingredient_patent_expiry: string | null
          earliest_use_patent_expiry: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_id: string | null
          formulation_name: string | null
          formulation_patents_count: number | null
          ingredient_patents_count: number | null
          use_patents_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "formulations"
            referencedColumns: ["formulation_id"]
          },
          {
            foreignKeyName: "formulation_country_formulation_id_fkey"
            columns: ["formulation_id"]
            isOneToOne: false
            referencedRelation: "vw_formulations_with_ingredients"
            referencedColumns: ["formulation_id"]
          },
        ]
      }
      vw_portfolio_by_country: {
        Row: {
          country_name: string | null
          country_readiness: string | null
          country_status: string | null
          currency_code: string | null
          earliest_market_entry_date: string | null
          formulation_code: string | null
          formulation_status: string | null
          highest_supply_risk: string | null
          is_eu_approved_formulation: boolean | null
          is_novel: boolean | null
          likely_registration_pathway: string | null
          product_category: string | null
          product_name: string | null
          use_group_count: number | null
          use_group_variants: string | null
        }
        Relationships: []
      }
      vw_registration_pipeline: {
        Row: {
          active_ingredients: string | null
          country_name: string | null
          country_readiness: string | null
          country_status: string | null
          created_at: string | null
          display_name: string | null
          earliest_market_entry_date: string | null
          earliest_planned_approval_date: string | null
          earliest_planned_submission_date: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          is_novel: boolean | null
          latest_actual_approval_date: string | null
          likely_registration_pathway: string | null
          product_category: string | null
          product_name: string | null
          updated_at: string | null
          use_group_count: number | null
        }
        Relationships: []
      }
      vw_use_group_details: {
        Row: {
          country_name: string | null
          crops: string | null
          earliest_actual_approval_date: string | null
          earliest_actual_submission_date: string | null
          earliest_planned_approval_date: string | null
          earliest_planned_submission_date: string | null
          formulation_code: string | null
          formulation_country_use_group_id: string | null
          product_name: string | null
          reference_manufacturer: string | null
          reference_product_name: string | null
          use_group_name: string | null
          use_group_status: string | null
          use_group_variant: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_active_signature_from_table: {
        Args: { p_formulation_id: string }
        Returns: string
      }
      check_duplicate_formulation: {
        Args: { p_temp_formulation_id: string }
        Returns: string
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      get_all_invitations: {
        Args: never
        Returns: {
          accepted_at: string
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by_email: string
          role: string
          status: string
        }[]
      }
      get_all_permissions: {
        Args: never
        Returns: {
          category: string
          description: string
          display_name: string
          permission_id: string
          permission_key: string
        }[]
      }
      get_all_roles: {
        Args: never
        Returns: {
          created_at: string
          description: string
          is_system_role: boolean
          permissions: Json
          role_id: string
          role_name: string
        }[]
      }
      get_all_users_with_roles: {
        Args: never
        Returns: {
          email: string
          email_confirmed_at: string
          id: string
          last_sign_in_at: string
          role_names: string[]
          roles: Json
          user_created_at: string
        }[]
      }
      get_effective_patent_assessment: {
        Args: { p_formulation_country_id: string; p_patent_id: string }
        Returns: {
          assessed_at: string
          assessed_by: string
          assessment_id: string
          blocking_reason: string
          estimated_launch_date: string
          is_blocking: boolean
          is_global_default: boolean
          notes: string
          relevance: string
        }[]
      }
      get_formulation_country_crops: {
        Args: { fc_id: string }
        Returns: {
          display_name: string
          eppo_code: string
          eppo_code_id: string
        }[]
      }
      get_formulation_country_targets: {
        Args: { fc_id: string }
        Returns: {
          display_name: string
          eppo_code: string
          eppo_code_id: string
        }[]
      }
      get_formulation_crops: {
        Args: { f_id: string }
        Returns: {
          display_name: string
          eppo_code: string
          eppo_code_id: string
        }[]
      }
      get_formulation_targets: {
        Args: { f_id: string }
        Returns: {
          display_name: string
          eppo_code: string
          eppo_code_id: string
        }[]
      }
      get_latest_exchange_rate: {
        Args: { p_country_id: string; p_date?: string }
        Returns: number
      }
      get_next_variant_suffix: {
        Args: { p_base_code: string }
        Returns: string
      }
      get_or_create_base_code: {
        Args: { p_active_signature: string }
        Returns: string
      }
      get_patents_for_country: {
        Args: { p_country_id: string }
        Returns: {
          expiration_date: string
          legal_status: string
          patent_id: string
          patent_number: string
          patent_office: string
          patent_type: string
        }[]
      }
      get_use_group_crops: {
        Args: { ug_id: string }
        Returns: {
          display_name: string
          eppo_code: string
          eppo_code_id: string
          is_critical: boolean
        }[]
      }
      get_use_group_targets: {
        Args: { ug_id: string }
        Returns: {
          display_name: string
          eppo_code: string
          eppo_code_id: string
          is_critical: boolean
        }[]
      }
      get_user_permissions: { Args: never; Returns: string[] }
      get_user_role: { Args: never; Returns: string }
      get_user_roles: { Args: never; Returns: string[] }
      has_any_permission: { Args: { p_keys: string[] }; Returns: boolean }
      has_permission: { Args: { p_key: string }; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      is_editor: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "viewer" | "editor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["viewer", "editor", "admin"],
    },
  },
} as const
