// "use server";
// import { SystemDataProps } from "@/contexts/useRecipeData";
// import prisma from "@/libs/prisma";
// import { Prisma } from "@prisma/client";
// import { NextResponse } from "next/server";

// import { z } from "zod";
// // import { GetStaticProps } from "next";

// /* TESTING:________________________________________START::
//  * curl -X GET http://localhost:3000/api/data/system/
//  * http://localhost:3000/api/data/system
//  * http://recipee.app/api/data/system
//  * TESTING:________________________________________END::*/

// /* FUTURE: CREATE INDEXES
// CREATE INDEX idx_unit_type_name ON unit_type (name);
// CREATE INDEX idx_unit_metric_imperial_name ON unit_metric_imperial (name);
// -- Add indexes for other tables as needed
// */

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
//  * Uses prisma.$transaction to fetch all system data concurrently.
//  * But keeps the object types intact for full type safety.
//  * @param customerId - The ID of the customer for whom to fetch system data.
//  * @returns
//  */

// export const getSystemData = async (customerId: number): Promise<SystemDataProps> => {
//   // prisma.$transaction executes all queries concurrently
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
//   ] = await prisma.$transaction([
//     // ] = await prisma.$transaction([
//     // The order of queries here MUST match the destructuring order above
//     prisma.unit_type.findMany({ select: { id: true, name: true, desc: true, imperial: true, metric: true } }),

//     prisma.unit_metric_imperial.findMany({ select: { id: true, name: true, is_default: true } }),

//     prisma.prep_instructions.findMany({ where: { is_live: true }, select: { id: true, name: true, desc: true, imperial: true, metric: true, translation: true, yield: true } }),

//     prisma.cooked_yields_categories.findMany({ where: { is_live: true }, select: { id: true, name: true, translation: true, desc: true, yield: true, is_live: true } }),

//     prisma.dry_cooked_yields_categories.findMany({ where: { is_live: true }, select: { id: true, name: true, desc: true, translation: true, yield: true } }),

//     prisma.dry_cooked_yields.findMany({ where: { is_live: true }, select: { id: true, name: true, desc: true, translation: true, yield: true } }),

//     prisma.ingredients_religious_certification.findMany({ select: { id: true, name: true } }),

//     prisma.language.findMany({ select: { id: true, name: true } }),

//     prisma.$queryRaw<NutritionalDataValuesSelect[]>`SELECT column_name FROM information_schema.columns WHERE table_name = 'ingredients_nutrition'`,

//     prisma.ingredient_category_primary.findMany({ select: { id: true, name: true, translation: true } }),

//     prisma.ingredient_category_secondary.findMany({ select: { id: true, name: true, translation: true, ingredient_category_primary_id: true } }),

//     prisma.dietary_classification.findMany({ select: { id: true, name: true, translation: true } }),

//     prisma.allergy.findMany({ select: { id: true, name: true, desc: true, translation: true } }),

//     prisma.recipe_mode.findMany({ select: { id: true, name: true, desc: true } }),

//     prisma.recipe_type.findMany({ select: { id: true, name: true, desc: true, is_default: true } }),

//     prisma.oil_purpose.findMany({ select: { id: true, name: true, factor: true, desc: true, is_default: true, confidence: true } }),

//     prisma.salt_purpose.findMany({ select: { id: true, name: true, factor: true, desc: true, is_default: true, confidence: true } }),

//     prisma.ingredient_type.findMany({ select: { id: true, name: true, desc: true } }),

//     prisma.markup_type.findMany({ select: { id: true, name: true, desc: true } }),

//     prisma.markup.findMany({
//       where: { customer_id: customerId },
//       select: { id: true, name: true, customer_id: true, desc: true, markup_type_id: true, factor: true, markup_type: { select: { id: true, name: true, desc: true } } },
//       orderBy: { factor: "asc" },
//     }),

//     prisma.todo_status.findMany({ select: { id: true, name: true }, where: { customer_id: customerId }, orderBy: { id: "asc" } }),

//     prisma.other_costs_category.findMany({ where: { customer_id: customerId } }),

//     prisma.$queryRaw<OtherCostsLineItemsLookupSelect[]>`SELECT
//     li.id,
//     li.name,
//     li.desc,
//     li.supplier_id,
//     li.cost,
//     li.is_active,
//     l.customer_id,
//     string_agg(l.other_costs_category_id::text, ',' ORDER BY l.other_costs_category_id) AS category_ids
// FROM
//     public.other_costs_line_item li
// INNER JOIN
//     public.other_costs_lookup l
//     ON li.id = l.other_costs_line_item_id
// WHERE
//     l.customer_id = ${customerId}
// GROUP BY
//     li.id,
//     li.name,
//     li.desc,
//     li.supplier_id,
//     li.cost,
//     li.is_active,
//     l.customer_id
// ORDER BY
//     li.name;`, // NOTE: Pass the type to $queryRaw

//     prisma.packaging_costs_category.findMany({ where: { customer_id: customerId } }),

//     prisma.$queryRaw<PackagingCostsLineItemsLookup[]>`SELECT
//     li.id,
//     li.name,
//     li.desc,
//     li.supplier_id,
//     li.cost,
//     li.is_active,
//     l.customer_id,
//     string_agg(l.packaging_costs_category_id::text, ',' ORDER BY l.packaging_costs_category_id) AS category_ids
// FROM
//     public.packaging_costs_line_item li
// INNER JOIN
//     public.packaging_costs_lookup l
//     ON li.id = l.packaging_costs_line_item_id
// WHERE
//     l.customer_id = ${customerId}
// GROUP BY
//     li.id,
//     li.name,
//     li.desc,
//     li.supplier_id,
//     li.cost,
//     li.is_active,
//     l.customer_id
// ORDER BY
//     li.name;`,

//     prisma.vat_rules.findMany({ where: { customer_id: customerId }, select: { id: true, name: true, cost: true, description: true, customer_id: true, default: true } }),

//     prisma.ingredients.findMany({
//       where: { customer_id: customerId, deleted: false },
//       select: {
//         id: true,
//         name: true,
//         names_alt: true,
//         name_orig: true,
//         customer_id: true,
//         translation: true,
//         primary_category_id: true,
//         secondary_category: true,
//         updated_at: true,
//         is_default: true,
//         confidence: true,
//         dietary_classification_id: true,
//         kosher_id: true,
//         halal_id: true,
//         ai_model: true,
//       },
//     }),
//   ]);

//   // Because of destructuring, TypeScript now knows the exact type of each constant.
//   // Now we can build the final object with full type safety.
//   return {
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
//   };
// };

// /**
//  * Handles GET requests to /api/example
//  * Expects 'id' and 'name' query parameters.
//  * Example: /api/data/system/
//  */
// export async function GET() {
//   const customerId = 1; // Default customer ID
//   try {
//     const response = await getSystemData(customerId);
//     // const response = await JSON.parse(JSON.stringify(getSystemData(customerId)));
//     // console.log("WAYNE DEBUG: Response from getSystemData:", response);
//     return NextResponse.json(response, { status: 200 });
//   } catch (error) {
//     // Log the error for server-side debugging
//     console.error("Error processing GET request:", error);
//     return NextResponse.json({ error: "Script or Server Error" }, { status: 500 });
//   }
// }

// // FUTURE: CREATE INDEXES ON SUPERBASE
// //
// // FUTURE: POSSIBLY MAKE EDGE FUNCTION
// /*
// // supabase/functions/get-lookup-data.ts
// import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// const supabase = createClient(
//   Deno.env.get('SUPABASE_URL')!,
//   Deno.env.get('SUPABASE_ANON_KEY')!
// );

// let cachedData: any[] | null = null;
// let lastFetched = 0;
// const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// serve(async (req) => {
//   const now = Date.now();
//   if (!cachedData || now - lastFetched > CACHE_DURATION) {
//     cachedData = await Promise.all([
//       supabase.from('unit_type').select('id, name'),
//       supabase.from('unit_metric_imperial').select('id, name'),
//       // ... other tables
//     ]).then((results) => results.map((result) => result.data));
//     lastFetched = now;
//   }
//   return new Response(JSON.stringify(cachedData), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// });
// */
