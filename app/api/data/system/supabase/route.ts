// "use server";

// import { SystemDataProps } from "@/contexts/useRecipeData";
// import { supabase } from "@/utils/supabaseClient";
// import { Prisma } from "@prisma/client";
// import { NextResponse } from "next/server";
// // Keep all your existing Prisma types

// export type UnitTypeSelect = Prisma.unit_typeGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//     imperial: true;
//     metric: true;
//   };
// }>;

// export type UnitMeasurementSelect = Prisma.unit_metric_imperialGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     is_default: true;
//   };
// }>;

// export type PrepInstructionsSelect = Prisma.prep_instructionsGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//     imperial: true;
//     metric: true;
//     translation: true;
//     yield: true;
//   };
// }>;

// export type CookedYieldsCategoriesSelect = Prisma.cooked_yields_categoriesGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     translation: true;
//     desc: true;
//     yield: true;
//     is_live?: boolean;
//   };
// }>;

// export type DryCookedYieldsCategoriesSelect = Prisma.dry_cooked_yields_categoriesGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//     translation: true;
//     yield: true;
//   };
// }>;

// export type DryCookedYieldsSelect = Prisma.dry_cooked_yieldsGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//     translation: true;
//     yield: true;
//   };
// }>;

// export type IngredientsReligiousCertificationSelect = Prisma.ingredients_religious_certificationGetPayload<{
//   select: {
//     id: true;
//     name: true;
//   };
// }>;

// export type LanguageSelect = Prisma.languageGetPayload<{
//   select: {
//     id: true;
//     name: true;
//   };
// }>;

// // export type NutritionalDataValuesSelect = Prisma.ingredients_nutritionGetPayload<
// export type NutritionalDataValuesSelect = { column_name: string };

// export type IngredientCategoryPrimarySelect = Prisma.ingredient_category_primaryGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     translation: true;
//   };
// }>;

// export type IngredientCategorySecondarySelect = Prisma.ingredient_category_secondaryGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     translation: true;
//     ingredient_category_primary_id: true;
//   };
// }>;

// export type DietaryClassificationSelect = Prisma.dietary_classificationGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     translation: true;
//   };
// }>;

// export type AllergySelect = Prisma.allergyGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//     translation: true;
//   };
// }>;

// export type RecipeModeSelect = Prisma.recipe_modeGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//   };
// }>;

// export type RecipeTypeSelect = Prisma.recipe_typeGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//     is_default: true;
//   };
// }>;

// export type OilPurposeSelect = Prisma.oil_purposeGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     factor: true;
//     desc: true;
//     is_default: true;
//     confidence: true;
//   };
// }>;

// export type SaltPurposeSelect = Prisma.salt_purposeGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     factor: true;
//     desc: true;
//     is_default: true;
//     confidence: true;
//   };
// }>;

// export type IngredientTypeSelect = Prisma.ingredient_typeGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     // desc: true;
//   };
// }>;

// export type MarkupTypeSelect = Prisma.markup_typeGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//   };
// }>;

// // DECIMAL FIELD: factor _____________START ::
// export type MarkupSelect = Prisma.markupGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     customer_id: true;
//     desc: true;
//     markup_type_id: true;
//     factor: true;
//     markup_type: { select: { id: true; name: true; desc: true } };
//   };
// }>;
// export type MarkupSelectSerializable = Omit<MarkupSelect, "factor"> & {
//   factor: string;
// };

// // DECIMAL FIELD: factor _____________END ::

// export type TodoStatusSelect = Prisma.todo_statusGetPayload<{
//   select: {
//     id: true;
//     name: true;
//   };
// }>;

// export type OtherCostsCategorySelect = Prisma.other_costs_categoryGetPayload<{
//   select: {
//     id: true;
//     name: true;
//   };
// }>;

// export type OtherCostsLineItemsLookupSelect = Prisma.other_costs_line_itemGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//     supplier_id: true;
//     cost: true;
//     is_active: true;
//     customer_id: true;
//     category_ids: true;
//   };
// }>;

// export type PackagingCostsCategorySelect = Prisma.packaging_costs_categoryGetPayload<{
//   select: {
//     id: true;
//     name: true;
//   };
// }>;

// // export type PackagingCostsLineItemsLookupSelect = Prisma.packaging_costs_line_itemGetPayload<{
// //   select: {
// //     id: true;
// //     name: true;
// //     desc: true;
// //     supplier_id: true;
// //     cost: true;
// //     is_active: true;
// //     customer_id: true;
// //     category_ids: true;
// //   };
// // }>;
// export interface PackagingCostsLineItemsLookupSelect {
//   id: number;
//   name: string;
//   desc: string;
//   supplier_id: number;
//   cost: number;
//   is_active: boolean;
//   customer_id: number;
//   category_ids: number[];
// }

// export interface PackagingCostsLineItemsLookup {
//   id: number;
//   name: string;
//   desc: string;
//   supplier_id: number;
//   cost: number;
//   is_active: boolean;
//   customer_id: number;
//   category_ids: number[]; // Adjust type based on your schema (e.g., array of numbers or strings)
// }

// export type VatRulesSelect = Prisma.vat_rulesGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     cost: true;
//     description: true;
//     customer_id: true;
//     default: true;
//   };
// }>;

// export type IngredientSelect = Prisma.ingredientsGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     names_alt: true;
//     name_orig: true;
//     customer_id: true;
//     translation: true;
//     primary_category_id: true;
//     secondary_category: true;
//     updated_at: true;
//     is_default: boolean;
//     confidence: true;
//     dietary_classification_id: true;
//     kosher_id: true;
//     halal_id: true;
//     ai_model: true;
//   };
// }>;

// interface obj {
//   [key: string]: Promise<any>;
// }

// /**
//  * A helper to handle Supabase's { data, error } response format inside Promise.all
//  */
// const handleSupabaseQuery = async (query: Promise<{ data: any; error: any }>) => {
//   const { data, error } = await query;
//   if (error) {
//     // Throws an error that will be caught by the main try/catch block
//     throw new Error(`Supabase query failed: ${error.message}`);
//   }
//   return data;
// };

// export const getSystemDataWithSupabase = async (customerId: number): Promise<SystemDataProps> => {
//   const [
//     unit_type,
//     unit_metric_imperial,
//     prep_instructions,
//     cooked_yields_categories,
//     dry_cooked_yields_categories,
//     dry_cooked_yields,
//     ingredients_religious_certification,
//     language,
//     nutritional_data_values,
//     ingredient_category_primary,
//     ingredient_category_secondary,
//     dietary_classification,
//     allergy,
//     recipe_mode,
//     recipe_type,
//     oil_purpose,
//     salt_purpose,
//     ingredient_type,
//     markup_type,
//     markup,
//     todo_status,
//     other_costs_category,
//     other_costs_line_items_lookup,
//     packaging_costs_category,
//     packaging_costs_line_items_lookup,
//     vat_rules,
//     ingredients,
//   ] = await Promise.all([
//     // The order here MUST match the destructuring order above
//     handleSupabaseQuery(supabase.from("unit_type").select("id, name, desc, imperial, metric")),
//     handleSupabaseQuery(supabase.from("unit_metric_imperial").select("id, name, is_default")),
//     handleSupabaseQuery(supabase.from("prep_instructions").select("id, name, desc, imperial, metric, translation, yield").eq("is_live", true)),
//     handleSupabaseQuery(supabase.from("cooked_yields_categories").select("id, name, translation, desc, yield, is_live").eq("is_live", true)),
//     handleSupabaseQuery(supabase.from("dry_cooked_yields_categories").select("id, name, desc, translation, yield").eq("is_live", true)),
//     handleSupabaseQuery(supabase.from("dry_cooked_yields").select("id, name, desc, translation, yield").eq("is_live", true)),
//     handleSupabaseQuery(supabase.from("ingredients_religious_certification").select("id, name")),
//     handleSupabaseQuery(supabase.from("language").select("id, name")),
//     handleSupabaseQuery(supabase.rpc("get_nutritional_column_names")),
//     handleSupabaseQuery(supabase.from("ingredient_category_primary").select("id, name, translation")),
//     handleSupabaseQuery(supabase.from("ingredient_category_secondary").select("id, name, translation, ingredient_category_primary_id")),
//     handleSupabaseQuery(supabase.from("dietary_classification").select("id, name, translation")),
//     handleSupabaseQuery(supabase.from("allergy").select("id, name, desc, translation")),
//     handleSupabaseQuery(supabase.from("recipe_mode").select("id, name, desc")),
//     handleSupabaseQuery(supabase.from("recipe_type").select("id, name, desc, is_default")),
//     handleSupabaseQuery(supabase.from("oil_purpose").select("id, name, factor, desc, is_default, confidence")),
//     handleSupabaseQuery(supabase.from("salt_purpose").select("id, name, factor, desc, is_default, confidence")),
//     handleSupabaseQuery(supabase.from("ingredient_type").select("id, name, desc")),
//     handleSupabaseQuery(supabase.from("markup_type").select("id, name, desc")),
//     handleSupabaseQuery(
//       supabase.from("markup").select("id, name, customer_id, desc, markup_type_id, factor, markup_type(id, name, desc)").eq("customer_id", customerId).order("factor", { ascending: true })
//     ),
//     handleSupabaseQuery(supabase.from("todo_status").select("id, name").eq("customer_id", customerId).order("id", { ascending: true })),
//     handleSupabaseQuery(supabase.from("other_costs_category").select("*").eq("customer_id", customerId)),
//     handleSupabaseQuery(supabase.rpc("get_other_costs_by_customer", { p_customer_id: customerId })),
//     handleSupabaseQuery(supabase.from("packaging_costs_category").select("*").eq("customer_id", customerId)),
//     handleSupabaseQuery(supabase.rpc("get_packaging_costs_by_customer", { p_customer_id: customerId })),
//     handleSupabaseQuery(supabase.from("vat_rules").select("id, name, cost, description, customer_id, default").eq("customer_id", customerId)),
//     handleSupabaseQuery(
//       supabase
//         .from("ingredients")
//         .select(
//           "id, name, names_alt, name_orig, customer_id, translation, primary_category_id, secondary_category, updated_at, is_default, confidence, dietary_classification_id, kosher_id, halal_id, ai_model"
//         )
//         .eq("customer_id", customerId)
//         .eq("deleted", false)
//     ),
//   ]);

//   // Manually build the final object, asserting types for each property.
//   // This is where you lose Prisma's automatic type safety.
//   return {
//     unit_type: unit_type as UnitTypeSelect[],
//     unit_metric_imperial: unit_metric_imperial as UnitMeasurementSelect[],
//     prep_instructions: prep_instructions as PrepInstructionsSelect[],
//     cooked_yields_categories: cooked_yields_categories as CookedYieldsCategoriesSelect[],
//     dry_cooked_yields_categories: dry_cooked_yields_categories as DryCookedYieldsCategoriesSelect[],
//     dry_cooked_yields: dry_cooked_yields as DryCookedYieldsSelect[],
//     ingredients_religious_certification: ingredients_religious_certification as IngredientsReligiousCertificationSelect[],

//     vat_rules: vat_rules as VatRulesSelect[],
//     ingredients: ingredients as IngredientSelect[],
//   };
// };

// export async function GET() {
//   const customerId = 1; // Default customer ID
//   try {
//     const response = await getSystemDataWithSupabase(customerId);
//     return NextResponse.json(response, { status: 200 });
//   } catch (error) {
//     console.error("Error processing GET request:", error);
//     return NextResponse.json({ error: (error as Error).message }, { status: 500 });
//   }
// }
