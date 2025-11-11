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
          cogs_id: string
          cogs_value: number
          created_at: string | null
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
          updated_at: string | null
        }
        Insert: {
          cogs_id?: string
          cogs_value: number
          created_at?: string | null
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
          updated_at?: string | null
        }
        Update: {
          cogs_id?: string
          cogs_value?: number
          created_at?: string | null
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
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_normal_vs_intended_use"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_protection_status"
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
            referencedRelation: "vw_business_case"
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
      crops: {
        Row: {
          created_at: string | null
          crop_category: string | null
          crop_id: string
          crop_name: string
          is_active: boolean | null
        }
        Insert: {
          created_at?: string | null
          crop_category?: string | null
          crop_id?: string
          crop_name: string
          is_active?: boolean | null
        }
        Update: {
          created_at?: string | null
          crop_category?: string | null
          crop_id?: string
          crop_name?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      data_protections: {
        Row: {
          country_id: string
          created_at: string | null
          expiry_date: string
          ingredient_id: string
          notes: string | null
          protection_id: string
          reference_number: string | null
        }
        Insert: {
          country_id: string
          created_at?: string | null
          expiry_date: string
          ingredient_id: string
          notes?: string | null
          protection_id?: string
          reference_number?: string | null
        }
        Update: {
          country_id?: string
          created_at?: string | null
          expiry_date?: string
          ingredient_id?: string
          notes?: string | null
          protection_id?: string
          reference_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_protections_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "data_protections_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "vw_business_case"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "data_protections_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "data_protections_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "vw_ingredient_usage"
            referencedColumns: ["ingredient_id"]
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
            referencedRelation: "vw_business_case"
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
          created_at: string | null
          emd: string | null
          formulation_country_id: string
          formulation_id: string
          has_approval: boolean | null
          is_active: boolean | null
          is_eu_approved_formulation: boolean | null
          is_in_active_portfolio: boolean | null
          is_novel: boolean | null
          keyedin_project_ids: string | null
          registration_pathway: string | null
          registration_status: string | null
          updated_at: string | null
        }
        Insert: {
          country_id: string
          created_at?: string | null
          emd?: string | null
          formulation_country_id?: string
          formulation_id: string
          has_approval?: boolean | null
          is_active?: boolean | null
          is_eu_approved_formulation?: boolean | null
          is_in_active_portfolio?: boolean | null
          is_novel?: boolean | null
          keyedin_project_ids?: string | null
          registration_pathway?: string | null
          registration_status?: string | null
          updated_at?: string | null
        }
        Update: {
          country_id?: string
          created_at?: string | null
          emd?: string | null
          formulation_country_id?: string
          formulation_id?: string
          has_approval?: boolean | null
          is_active?: boolean | null
          is_eu_approved_formulation?: boolean | null
          is_in_active_portfolio?: boolean | null
          is_novel?: boolean | null
          keyedin_project_ids?: string | null
          registration_pathway?: string | null
          registration_status?: string | null
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
            foreignKeyName: "formulation_country_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "vw_business_case"
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
            referencedRelation: "vw_business_case"
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
      formulation_country_crops: {
        Row: {
          created_at: string | null
          crop_id: string
          formulation_country_id: string
          notes: string | null
        }
        Insert: {
          created_at?: string | null
          crop_id: string
          formulation_country_id: string
          notes?: string | null
        }
        Update: {
          created_at?: string | null
          crop_id?: string
          formulation_country_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_crops_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["crop_id"]
          },
          {
            foreignKeyName: "formulation_country_crops_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_crops_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_crops_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_normal_vs_intended_use"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_crops_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_crops_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
        ]
      }
      formulation_country_targets: {
        Row: {
          created_at: string | null
          efficacy_level: string | null
          formulation_country_id: string
          notes: string | null
          target_id: string
        }
        Insert: {
          created_at?: string | null
          efficacy_level?: string | null
          formulation_country_id: string
          notes?: string | null
          target_id: string
        }
        Update: {
          created_at?: string | null
          efficacy_level?: string | null
          formulation_country_id?: string
          notes?: string | null
          target_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_targets_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_targets_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_targets_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_normal_vs_intended_use"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_targets_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_targets_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_targets_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "targets"
            referencedColumns: ["target_id"]
          },
        ]
      }
      formulation_country_use_group: {
        Row: {
          actual_approval_date: string | null
          actual_market_entry_date: string | null
          actual_submission_date: string | null
          created_at: string | null
          earliest_approval_date: string | null
          earliest_market_entry_date: string | null
          earliest_submission_date: string | null
          formulation_country_id: string
          formulation_country_use_group_id: string
          is_active: boolean | null
          reference_product_id: string | null
          registration_status: string | null
          target_market_entry_fy: string | null
          updated_at: string | null
          use_group_name: string | null
          use_group_variant: string
        }
        Insert: {
          actual_approval_date?: string | null
          actual_market_entry_date?: string | null
          actual_submission_date?: string | null
          created_at?: string | null
          earliest_approval_date?: string | null
          earliest_market_entry_date?: string | null
          earliest_submission_date?: string | null
          formulation_country_id: string
          formulation_country_use_group_id?: string
          is_active?: boolean | null
          reference_product_id?: string | null
          registration_status?: string | null
          target_market_entry_fy?: string | null
          updated_at?: string | null
          use_group_name?: string | null
          use_group_variant: string
        }
        Update: {
          actual_approval_date?: string | null
          actual_market_entry_date?: string | null
          actual_submission_date?: string | null
          created_at?: string | null
          earliest_approval_date?: string | null
          earliest_market_entry_date?: string | null
          earliest_submission_date?: string | null
          formulation_country_id?: string
          formulation_country_use_group_id?: string
          is_active?: boolean | null
          reference_product_id?: string | null
          registration_status?: string | null
          target_market_entry_fy?: string | null
          updated_at?: string | null
          use_group_name?: string | null
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
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_normal_vs_intended_use"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_protection_status"
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
      formulation_country_use_group_crops: {
        Row: {
          created_at: string | null
          crop_id: string
          formulation_country_use_group_id: string
        }
        Insert: {
          created_at?: string | null
          crop_id: string
          formulation_country_use_group_id: string
        }
        Update: {
          created_at?: string | null
          crop_id?: string
          formulation_country_use_group_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "formulation_country_use_group_crops_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["crop_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_crops_formulation_country_use_gro"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_crops_formulation_country_use_gro"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_use_group"
            referencedColumns: ["formulation_country_use_group_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_crops_formulation_country_use_gro"
            columns: ["formulation_country_use_group_id"]
            isOneToOne: false
            referencedRelation: "vw_use_group_details"
            referencedColumns: ["formulation_country_use_group_id"]
          },
        ]
      }
      formulation_data_protections: {
        Row: {
          created_at: string | null
          expiry_date: string
          formulation_country_id: string
          formulation_protection_id: string
          notes: string | null
          reference_number: string | null
        }
        Insert: {
          created_at?: string | null
          expiry_date: string
          formulation_country_id: string
          formulation_protection_id?: string
          notes?: string | null
          reference_number?: string | null
        }
        Update: {
          created_at?: string | null
          expiry_date?: string
          formulation_country_id?: string
          formulation_protection_id?: string
          notes?: string | null
          reference_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_data_protections_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_data_protections_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_data_protections_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_normal_vs_intended_use"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_data_protections_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_data_protections_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
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
            referencedRelation: "vw_business_case"
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
      formulation_patents: {
        Row: {
          created_at: string | null
          expiry_date: string
          filing_date: string | null
          formulation_country_id: string
          formulation_patent_id: string
          grant_date: string | null
          notes: string | null
          patent_number: string | null
          patent_type: string | null
        }
        Insert: {
          created_at?: string | null
          expiry_date: string
          filing_date?: string | null
          formulation_country_id: string
          formulation_patent_id?: string
          grant_date?: string | null
          notes?: string | null
          patent_number?: string | null
          patent_type?: string | null
        }
        Update: {
          created_at?: string | null
          expiry_date?: string
          filing_date?: string | null
          formulation_country_id?: string
          formulation_patent_id?: string
          grant_date?: string | null
          notes?: string | null
          patent_number?: string | null
          patent_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_patents_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "formulation_country"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_patents_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_patents_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_normal_vs_intended_use"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_patents_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_protection_status"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_patents_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_registration_pipeline"
            referencedColumns: ["formulation_country_id"]
          },
        ]
      }
      formulation_status_history: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          formulation_id: string
          history_id: string
          new_status: string
          old_status: string | null
          status_rationale: string | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          formulation_id: string
          history_id?: string
          new_status: string
          old_status?: string | null
          status_rationale?: string | null
        }
        Update: {
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
            referencedRelation: "vw_business_case"
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
          formulation_type: string | null
          is_active: boolean | null
          short_name: string | null
          status: string
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
          formulation_type?: string | null
          is_active?: boolean | null
          short_name?: string | null
          status?: string
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
          formulation_type?: string | null
          is_active?: boolean | null
          short_name?: string | null
          status?: string
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
      patent_protections: {
        Row: {
          country_id: string
          created_at: string | null
          expiry_date: string
          filing_date: string | null
          grant_date: string | null
          ingredient_id: string
          notes: string | null
          patent_id: string
          patent_number: string | null
          patent_type: string | null
        }
        Insert: {
          country_id: string
          created_at?: string | null
          expiry_date: string
          filing_date?: string | null
          grant_date?: string | null
          ingredient_id: string
          notes?: string | null
          patent_id?: string
          patent_number?: string | null
          patent_type?: string | null
        }
        Update: {
          country_id?: string
          created_at?: string | null
          expiry_date?: string
          filing_date?: string | null
          grant_date?: string | null
          ingredient_id?: string
          notes?: string | null
          patent_id?: string
          patent_number?: string | null
          patent_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patent_protections_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "patent_protections_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "vw_business_case"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "patent_protections_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "patent_protections_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "vw_ingredient_usage"
            referencedColumns: ["ingredient_id"]
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
          {
            foreignKeyName: "suppliers_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "vw_business_case"
            referencedColumns: ["country_id"]
          },
        ]
      }
      targets: {
        Row: {
          created_at: string | null
          is_active: boolean | null
          target_category: string | null
          target_id: string
          target_name: string
          target_type: string
        }
        Insert: {
          created_at?: string | null
          is_active?: boolean | null
          target_category?: string | null
          target_id?: string
          target_name: string
          target_type: string
        }
        Update: {
          created_at?: string | null
          is_active?: boolean | null
          target_category?: string | null
          target_id?: string
          target_name?: string
          target_type?: string
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
          crops_used_on: string | null
          formulation_code: string | null
          has_approval: boolean | null
          is_in_active_portfolio: boolean | null
          max_margin: number | null
          max_revenue: number | null
          product_category: string | null
          product_name: string | null
          registration_pathway: string | null
          registration_status: string | null
          target_market_entry_fy: string | null
          targets: string | null
        }
        Relationships: []
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
          currency_code: string | null
          display_name: string | null
          fiscal_year: string | null
          formulation_code: string | null
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
        Relationships: []
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
      vw_cogs: {
        Row: {
          cogs_id: string | null
          cogs_value: number | null
          country_code: string | null
          country_name: string | null
          created_at: string | null
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
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_normal_vs_intended_use"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "cogs_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_protection_status"
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
            referencedRelation: "vw_business_case"
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
      vw_crop_target_matrix: {
        Row: {
          country_name: string | null
          crop_category: string | null
          crop_name: string | null
          formulation_codes: string | null
          has_active_product: string | null
          product_categories: string | null
          product_count: number | null
          target_name: string | null
          target_type: string | null
        }
        Relationships: []
      }
      vw_formulation_country_detail: {
        Row: {
          country_code: string | null
          country_name: string | null
          created_at: string | null
          crop_categories: string | null
          display_name: string | null
          emd: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_type: string | null
          has_approval: boolean | null
          is_in_active_portfolio: boolean | null
          is_novel: boolean | null
          max_supply_risk_level: number | null
          normal_crop_usage: string | null
          product_category: string | null
          product_name: string | null
          reference_manufacturer: string | null
          reference_product_name: string | null
          registration_pathway: string | null
          registration_status: string | null
          target_market_entry_fy: string | null
          target_types: string | null
          targets_treated: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      vw_formulation_country_use_group: {
        Row: {
          actual_approval_date: string | null
          actual_market_entry_date: string | null
          actual_submission_date: string | null
          country_code: string | null
          country_name: string | null
          created_at: string | null
          display_name: string | null
          earliest_approval_date: string | null
          earliest_market_entry_date: string | null
          earliest_submission_date: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_country_use_group_id: string | null
          formulation_name: string | null
          is_active: boolean | null
          reference_manufacturer: string | null
          reference_product_id: string | null
          reference_product_name: string | null
          registration_status: string | null
          updated_at: string | null
          use_group_crops: string | null
          use_group_name: string | null
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
            referencedRelation: "vw_formulation_country_detail"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_normal_vs_intended_use"
            referencedColumns: ["formulation_country_id"]
          },
          {
            foreignKeyName: "formulation_country_use_group_formulation_country_id_fkey"
            columns: ["formulation_country_id"]
            isOneToOne: false
            referencedRelation: "vw_protection_status"
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
          formulation_count: number | null
          formulations_used_in: string | null
          ingredient_id: string | null
          ingredient_name: string | null
          ingredient_type: string | null
          is_eu_approved: boolean | null
          selected_formulations: number | null
          suppliers: string | null
          supply_risk: string | null
        }
        Relationships: []
      }
      vw_normal_vs_intended_use: {
        Row: {
          country_name: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          intended_crop_usage: string | null
          normal_crop_usage: string | null
          product_name: string | null
          usage_comparison: string | null
          use_group_name: string | null
          use_group_variant: string | null
        }
        Relationships: []
      }
      vw_portfolio_by_country: {
        Row: {
          country_name: string | null
          crops: string | null
          currency_code: string | null
          emd: string | null
          formulation_code: string | null
          formulation_status: string | null
          has_approval: boolean | null
          is_eu_approved_formulation: boolean | null
          is_in_active_portfolio: boolean | null
          is_novel: boolean | null
          max_margin: number | null
          max_revenue: number | null
          product_category: string | null
          product_name: string | null
          registration_pathway: string | null
          registration_status: string | null
          target_market_entry_fy: string | null
          total_margin: number | null
          total_revenue: number | null
          use_group_count: number | null
          use_group_variants: string | null
        }
        Relationships: []
      }
      vw_portfolio_gaps: {
        Row: {
          country_name: string | null
          coverage_status: string | null
          crop_category: string | null
          crop_name: string | null
          pipeline_products: number | null
          target_name: string | null
          target_type: string | null
        }
        Relationships: []
      }
      vw_protection_status: {
        Row: {
          active_data_protections_count: number | null
          active_patents_count: number | null
          country_name: string | null
          earliest_active_data_protection_expiry: string | null
          earliest_active_patent_expiry: string | null
          earliest_formulation_data_protection_expiry: string | null
          earliest_formulation_patent_expiry: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          formulation_data_protections_count: number | null
          formulation_patents_count: number | null
          product_name: string | null
        }
        Relationships: []
      }
      vw_registration_pipeline: {
        Row: {
          active_ingredients: string | null
          country_name: string | null
          created_at: string | null
          display_name: string | null
          earliest_approval_date: string | null
          earliest_market_entry_date: string | null
          earliest_submission_date: string | null
          emd: string | null
          formulation_code: string | null
          formulation_country_id: string | null
          has_approval: boolean | null
          is_in_active_portfolio: boolean | null
          is_novel: boolean | null
          latest_actual_approval_date: string | null
          product_category: string | null
          product_name: string | null
          registration_pathway: string | null
          registration_status: string | null
          target_market_entry_fy: string | null
          updated_at: string | null
          use_group_count: number | null
        }
        Relationships: []
      }
      vw_target_coverage: {
        Row: {
          active_products: number | null
          country_code: string | null
          country_name: string | null
          crops_treated: string | null
          efficacy_levels: string | null
          product_count: number | null
          products: string | null
          target_category: string | null
          target_name: string | null
          target_type: string | null
        }
        Relationships: []
      }
      vw_use_group_details: {
        Row: {
          actual_approval_date: string | null
          actual_market_entry_date: string | null
          actual_submission_date: string | null
          country_name: string | null
          crops: string | null
          earliest_approval_date: string | null
          earliest_market_entry_date: string | null
          earliest_submission_date: string | null
          formulation_code: string | null
          formulation_country_use_group_id: string | null
          product_name: string | null
          reference_manufacturer: string | null
          reference_product_name: string | null
          registration_status: string | null
          use_group_name: string | null
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
      get_next_variant_suffix: {
        Args: { p_base_code: string }
        Returns: string
      }
      get_or_create_base_code: {
        Args: { p_active_signature: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
