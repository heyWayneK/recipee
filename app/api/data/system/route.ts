/* TESTING:
      curl -X GET http://localhost:3000/api/data/system/ 

      http://localhost:3000/api/data/system
      http://recipee.app/api/data/system
*/
/* FUTURE: CREATE INDEXES
CREATE INDEX idx_unit_type_name ON unit_type (name);
CREATE INDEX idx_unit_measurement_name ON unit_measurement (name);
-- Add indexes for other tables as needed
*/

"use server";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
// import { GetStaticProps } from "next";

export type UnitTypeSelect = Prisma.unit_typeGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    imperial: true;
    metric: true;
  };
}>;

export type UnitMeasurementSelect = Prisma.unit_measurementGetPayload<{
  select: {
    id: true;
    name: true;
    is_default: true;
  };
}>;

export type PrepInstructionsSelect = Prisma.prep_instructionsGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    imperial: true;
    metric: true;
    translation: true;
    yield: true;
  };
}>;

export type CookedYieldsCategoriesSelect = Prisma.cooked_yields_categoriesGetPayload<{
  select: {
    id: true;
    name: true;
    translation: true;
    desc: true;
    yield: true;
    is_live?: boolean;
  };
}>;

export type DryCookedYieldsCategoriesSelect = Prisma.dry_cooked_yields_categoriesGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    translation: true;
    yield: true;
  };
}>;

export type DryCookedYieldsSelect = Prisma.dry_cooked_yieldsGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    translation: true;
    yield: true;
  };
}>;

export type IngredientsReligiousCertificationSelect = Prisma.ingredients_religious_certificationGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export type LanguageSelect = Prisma.languageGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

// export type NutritionalDataValuesSelect = Prisma.ingredients_nutritionGetPayload<
export type NutritionalDataValuesSelect = { column_name: string };

export type IngredientCategoryPrimarySelect = Prisma.ingredient_category_primaryGetPayload<{
  select: {
    id: true;
    name: true;
    translation: true;
  };
}>;

export type IngredientCategorySecondarySelect = Prisma.ingredient_category_secondaryGetPayload<{
  select: {
    id: true;
    name: true;
    translation: true;
    ingredient_category_primary_id: true;
  };
}>;

export type DietaryClassificationSelect = Prisma.dietary_classificationGetPayload<{
  select: {
    id: true;
    name: true;
    translation: true;
  };
}>;

export type AllergySelect = Prisma.allergyGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    translation: true;
  };
}>;

export type RecipeModeSelect = Prisma.recipe_modeGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
  };
}>;

export type RecipeTypeSelect = Prisma.recipe_typeGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    is_default: true;
  };
}>;

export type OilPurposeSelect = Prisma.oil_purposeGetPayload<{
  select: {
    id: true;
    name: true;
    factor: true;
    desc: true;
    is_default: true;
    confidence: true;
  };
}>;

export type SaltPurposeSelect = Prisma.salt_purposeGetPayload<{
  select: {
    id: true;
    name: true;
    factor: true;
    desc: true;
    is_default: true;
    confidence: true;
  };
}>;

export type IngredientTypeSelect = Prisma.ingredient_typeGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
  };
}>;

export type MarkupTypeSelect = Prisma.markup_typeGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
  };
}>;

export type MarkupSelect = Prisma.markupGetPayload<{
  select: {
    id: true;
    name: true;
    customer_id: true;
    desc: true;
    markup_type_id: true;
    factor: true;
    markup_type: { select: { id: true; name: true; desc: true } };
  };
}>;

export type TodoStatusSelect = Prisma.todo_statusGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export type OtherCostsCategorySelect = Prisma.other_costs_categoryGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export type OtherCostsLineItemsLookupSelect = Prisma.other_costs_line_itemGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    supplier_id: true;
    cost: true;
    is_active: true;
    customer_id: true;
    category_ids: true;
  };
}>;

export type PackagingCostsCategorySelect = Prisma.packaging_costs_categoryGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export type PackagingCostsLineItemsLookupSelect = Prisma.packaging_costs_line_itemGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    supplier_id: true;
    cost: true;
    is_active: true;
    customer_id: true;
    category_ids: true;
  };
}>;

interface PackagingCostsLineItemsLookup {
  id: number;
  name: string;
  desc: string;
  supplier_id: number;
  cost: number;
  is_active: boolean;
  customer_id: number;
  category_ids: number[]; // Adjust type based on your schema (e.g., array of numbers or strings)
}

export type VatRulesSelect = Prisma.vat_rulesGetPayload<{
  select: {
    id: true;
    name: true;
    cost: true;
    description: true;
    customer_id: true;
    default: true;
  };
}>;

interface obj {
  [key: string]: Promise<any>;
}

export const getSystemData = async (customerId: number) => {
  const queries: obj = {
    // JUST GET VALUES FORM TABLE AS IS.
    unit_type: prisma.unit_type.findMany({ select: { id: true, name: true, desc: true, imperial: true, metric: true } }) as Promise<UnitTypeSelect[]>,

    unit_measurement: prisma.unit_measurement.findMany({ select: { id: true, name: true, is_default: true } }) as Promise<UnitMeasurementSelect[]>,

    prep_instructions: prisma.prep_instructions.findMany({
      where: { is_live: true },
      select: { id: true, name: true, desc: true, imperial: true, metric: true, translation: true, yield: true },
    }) as Promise<PrepInstructionsSelect[]>,

    cooked_yields_categories: prisma.cooked_yields_categories.findMany({
      where: { is_live: true },
      select: { id: true, name: true, translation: true, desc: true, yield: true, is_live: true },
    }) as Promise<CookedYieldsCategoriesSelect[]>,

    dry_cooked_yields_categories: prisma.dry_cooked_yields_categories.findMany({ where: { is_live: true }, select: { id: true, name: true, desc: true, translation: true, yield: true } }) as Promise<
      DryCookedYieldsCategoriesSelect[]
    >,

    dry_cooked_yields: prisma.dry_cooked_yields.findMany({ where: { is_live: true }, select: { id: true, name: true, desc: true, translation: true, yield: true } }) as Promise<
      DryCookedYieldsCategoriesSelect[]
    >,

    ingredients_religious_certification: prisma.ingredients_religious_certification.findMany({ select: { id: true, name: true } }),

    language: prisma.language.findMany({ select: { id: true, name: true } }) as Promise<LanguageSelect[]>,

    nutritional_data_values: prisma.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'ingredients_nutrition'` as Promise<NutritionalDataValuesSelect[]>,

    ingredient_category_primary: prisma.ingredient_category_primary.findMany({ select: { id: true, name: true, translation: true } }) as Promise<IngredientCategoryPrimarySelect[]>,

    // FUTURE: need to create secondary
    ingredient_category_secondary: prisma.ingredient_category_secondary.findMany({ select: { id: true, name: true, translation: true, ingredient_category_primary_id: true } }) as Promise<
      IngredientCategorySecondarySelect[]
    >,

    dietary_classification: prisma.dietary_classification.findMany({ select: { id: true, name: true, translation: true } }) as Promise<DietaryClassificationSelect[]>,

    allergy: prisma.allergy.findMany({ select: { id: true, name: true, desc: true, translation: true } }) as Promise<AllergySelect[]>,

    recipe_mode: prisma.recipe_mode.findMany({ select: { id: true, name: true, desc: true } }) as Promise<RecipeModeSelect[]>,

    recipe_type: prisma.recipe_type.findMany({ select: { id: true, name: true, desc: true, is_default: true } }) as Promise<RecipeTypeSelect[]>,

    oil_purpose: prisma.oil_purpose.findMany({ select: { id: true, name: true, factor: true, desc: true, is_default: true, confidence: true } }) as Promise<OilPurposeSelect[]>,

    salt_purpose: prisma.salt_purpose.findMany({ select: { id: true, name: true, factor: true, desc: true, is_default: true, confidence: true } }) as Promise<SaltPurposeSelect[]>,

    ingredient_type: prisma.ingredient_type.findMany({ select: { id: true, name: true, desc: true } }) as Promise<IngredientTypeSelect[]>,

    markup_type: prisma.markup_type.findMany({ select: { id: true, name: true, desc: true } }) as Promise<MarkupTypeSelect[]>,

    markup: prisma.markup.findMany({
      where: { customer_id: customerId },
      select: { id: true, name: true, customer_id: true, desc: true, markup_type_id: true, factor: true, markup_type: { select: { id: true, name: true, desc: true } } },
      orderBy: { factor: "asc" },
    }) as Promise<MarkupSelect[]>,

    todo_status: prisma.todo_status.findMany({ select: { id: true, name: true }, where: { customer_id: customerId }, orderBy: { id: "asc" } }) as Promise<TodoStatusSelect[]>,

    // GET VALUES WHERE CUSTOMER = 1 (Default Account)
    other_costs_category: prisma.other_costs_category.findMany({ where: { customer_id: customerId } }) as Promise<OtherCostsCategorySelect[]>,

    other_costs_line_items_lookup: prisma.$queryRaw`
        SELECT
            li.id,
            li.name,
            li.desc,
            li.supplier_id,
            li.cost,
            li.is_active,
            l.customer_id,
            string_agg(l.other_costs_category_id::text, ',' ORDER BY l.other_costs_category_id) AS category_ids
        FROM
            public.other_costs_line_item li
        INNER JOIN
            public.other_costs_lookup l
            ON li.id = l.other_costs_line_item_id
        WHERE
            l.customer_id = ${customerId}
        GROUP BY
            li.id,
            li.name,
            li.desc,
            li.supplier_id,
            li.cost,
            li.is_active,
            l.customer_id
        ORDER BY
            li.name;
    `,

    packaging_costs_category: prisma.packaging_costs_category.findMany({ where: { customer_id: customerId } }) as Promise<PackagingCostsCategorySelect[]>,

    packaging_costs_line_items_lookup: prisma.$queryRaw`
        SELECT
            li.id,
            li.name,
            li.desc,
            li.supplier_id,
            li.cost,
            li.is_active,
            l.customer_id,
            string_agg(l.packaging_costs_category_id::text, ',' ORDER BY l.packaging_costs_category_id) AS category_ids
        FROM
            public.packaging_costs_line_item li
        INNER JOIN
            public.packaging_costs_lookup l
            ON li.id = l.packaging_costs_line_item_id
        WHERE
            l.customer_id = ${customerId}
        GROUP BY
            li.id,
            li.name,
            li.desc,
            li.supplier_id,
            li.cost,
            li.is_active,
            l.customer_id
        ORDER BY
            li.name;
    ` as Promise<PackagingCostsLineItemsLookup[]>,

    vat_rules: prisma.vat_rules.findMany({ where: { customer_id: customerId }, select: { id: true, name: true, cost: true, description: true, customer_id: true, default: true } }) as Promise<
      VatRulesSelect[]
    >,
  };

  const results = await Promise.all(Object.values(queries));
  return Object.fromEntries(Object.keys(queries).map((key, index) => [key, results[index]]));
};

/**
 * Handles GET requests to /api/example
 * Expects 'id' and 'name' query parameters.
 * Example: /api/data/system/
 */
export async function GET() {
  const customerId = 1; // Default customer ID
  try {
    const jsonObj = await getSystemData(customerId);
    // Return the successful JSON response with a 200 OK status
    return NextResponse.json(jsonObj, { status: 200 });
  } catch (error) {
    // Log the error for server-side debugging
    console.error("Error processing GET request:", error);
    return NextResponse.json({ error: "Script or Server Error" }, { status: 500 });
  }
}

// FUTURE: CREATE INDEXES ON SUPERBASE
//
// FUTURE: POSSIBLY MAKE EDGE FUNCTION
/*
// supabase/functions/get-lookup-data.ts
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
);

let cachedData: any[] | null = null;
let lastFetched = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

serve(async (req) => {
  const now = Date.now();
  if (!cachedData || now - lastFetched > CACHE_DURATION) {
    cachedData = await Promise.all([
      supabase.from('unit_type').select('id, name'),
      supabase.from('unit_measurement').select('id, name'),
      // ... other tables
    ]).then((results) => results.map((result) => result.data));
    lastFetched = now;
  }
  return new Response(JSON.stringify(cachedData), {
    headers: { 'Content-Type': 'application/json' },
  });
});
*/
