import { z } from "zod";

export const businessCaseYearDataSchema = z.object({
  volume: z.coerce.number().nullable(),
  nsp: z.coerce.number().nullable(),
  cogs: z.coerce.number().nullable(),
});

export type BusinessCaseYearDataInput = z.infer<
  typeof businessCaseYearDataSchema
>;

export const businessCaseFormDataSchema = z.object({
  formulation_id: z.string().min(1, "Formulation is required"),
  country_id: z.string().min(1, "Country is required"),
  use_group_ids: z
    .array(z.string())
    .min(1, "At least one use group is required"),
  business_case_name: z
    .string()
    .min(1, "Business case name is required")
    .max(500, "Business case name too long"),
  change_reason: z.string().max(2000, "Change reason too long").optional(),
});

export type BusinessCaseFormDataInput = z.infer<
  typeof businessCaseFormDataSchema
>;

export const targetMarketEntrySchema = z
  .string()
  .regex(/^\d{4}$/, "Must be a valid fiscal year (e.g., 2025)")
  .or(z.literal("null"))
  .optional();

export const yearOffsetRange = {
  min: 1,
  max: 10,
};
