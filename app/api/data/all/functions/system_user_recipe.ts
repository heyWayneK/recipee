"use server";
import { PreCalculatedRecipeData, OtherCostsLineItemsLookupSelect, NutritionalDataValuesSelect, OrgTypeSelect, measurementUnitsObjProps, LineItemsLookup, RecipeDataProps } from "@/types/recipeTypes";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
// import { data } from "@/app/api/recipe";

import { preCalculateData } from "@/libs/preCalculatedRecipeData";
import { SystemDataProps } from "@/types/recipeTypes";

// import { GetStaticProps } from "next";

// export const getLiveRecipeData = async (recipeUuid: string, orgUuid: string): Promise<Partial<PreCalculatedRecipeData>> => {
export const getLiveRecipeData = async (recipeUuid: string, orgUuid: string) => {
  // TODO: Make sure its impossible to call this function with an empty recipeId or org_uuid
  if (!recipeUuid || !orgUuid) {
    throw new Error("Invalid recipeUuid or org_uuid provided");
  }

  const result: any = await prisma.$queryRaw`
   SELECT
  r.uuid,
  r.name,
  r.desc,
  -- Use COALESCE to ensure that if a recipe has no related items,
  -- we return an empty JSON array '[]' instead of SQL NULL.
  COALESCE(rp.portions, '[]'::json) AS "portions",
  COALESCE(pcor."packagingCostsId", '[]'::json) AS "packagingCostsId",
  COALESCE(ocor."otherCostsId", '[]'::json) AS "otherCostsId",
  COALESCE(mor."markupId", '[]'::json) AS "markupId",
  COALESCE(vor."vatRulesId", '[]'::json) AS "vatRulesId",
  COALESCE(rc.components, '[]'::json) AS "components",
  COALESCE(recipes_agg.recipes, '[]'::json) AS "recipes"
FROM
  recipe AS r
-- Subquery to aggregate recipe_portions into a JSON array
LEFT JOIN (
  SELECT
    "recipe_uuid",
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', id,
        'qty_g', portion_g,
        'order', "order"
      ) ORDER BY "order" ASC
    ) AS portions
  FROM
    recipe_portions
  GROUP BY
    "recipe_uuid"
) AS rp ON r.uuid = rp."recipe_uuid"
-- Subquery to aggregate packaging_costs_on_recipe
LEFT JOIN (
  SELECT
    "recipe_uuid",
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'pid', "recipe_portions_id",
        'rule', "packaging_costs_categoryId"
      )
    ) AS "packagingCostsId"
  FROM
    packaging_costs_on_recipe
  GROUP BY
    "recipe_uuid"
) AS pcor ON r.uuid = pcor."recipe_uuid"
-- Subquery to aggregate other_costs_on_recipe
LEFT JOIN (
  SELECT
    "recipe_uuid",
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'pid', "recipe_portions_id",
        'rule', "other_costs_categoryId"
      )
    ) AS "otherCostsId"
  FROM
    other_costs_on_recipe
  GROUP BY
    "recipe_uuid"
) AS ocor ON r.uuid = ocor."recipe_uuid"
-- Subquery to aggregate markup_on_recipe
LEFT JOIN (
  SELECT
    "recipe_uuid",
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'pid', "recipe_portions_id",
        'rule', "markup_categoryId"
      )
    ) AS "markupId"
  FROM
    markup_on_recipe
  GROUP BY
    "recipe_uuid"
) AS mor ON r.uuid = mor."recipe_uuid"
-- Subquery to aggregate vat_on_recipe
LEFT JOIN (
  SELECT
    "recipe_uuid",
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'pid', "recipe_portions_id",
        'rule', "vat_categoryId"
      )
    ) AS "vatRulesId"
  FROM
    vat_on_recipe
  GROUP BY
    "recipe_uuid"
) AS vor ON r.uuid = vor."recipe_uuid"
-- Subquery to aggregate the FULL recipe components array
LEFT JOIN (
    SELECT
        rcor."recipe_uuid",
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'name', rcor.name,
                'uuid', rcor.uuid,
                'recipeId', rcor."recipe_uuid",
                'order', rcor.sort_order,
                'version', rcor.version,
                'versions', '[]'::json,
                'type', rcor.ingredient_type_name,
                'ingredientId', rcor.ingredients_id,
                'yield', rcor.yield,
                'costPer1000', rcor.cost_per_1000g,
                'method', rcor.method,
                'portions', cpor.portions,
                'nutriPer100', cn.nutriPer100,
                'recipeDetail', rdr."recipeDetail"
            ) ORDER BY rcor.sort_order ASC
        ) as components
    FROM
        recipe_components_on_recipe as rcor
    -- Subquery for component-specific portions
    LEFT JOIN (
        SELECT
            "recipe_components_on_recipeUuid",
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', "recipe_portions_id",
                    'qty_g', qty_g
                )
            ) as portions
        FROM component_portion_on_recipe
        GROUP BY "recipe_components_on_recipeUuid"
    ) as cpor ON rcor.uuid = cpor."recipe_components_on_recipeUuid"
    -- Subquery to transform nutrition data
    LEFT JOIN (
        SELECT
            "recipe_components_on_recipeUuid",
            JSON_AGG(nutri.item) as nutriPer100
        FROM component_nutrition,
        LATERAL (
            VALUES
                ('kcal', kcal_per_100g, 'kcal'), ('kj', kj_per_100g, 'kcal'),
                ('protein', protein_per_100g, 'g'), ('fat', fat_per_100g, 'g'),
                ('saturated fat', saturated_fat_per_100g, 'g'), ('monounsaturate fat', monounsaturate_per_100g, 'g'),
                ('Polyunsaturate fat', polyunsaturate_per_100g, 'g'), ('trans fats', trans_fats_per_100g, 'g'),
                ('omega-3', omega3_per_100g, 'g'), ('omega-6', omega6_per_100g, 'g'), ('omega-9', omega9_per_100g, 'g'),
                ('net carbohydrate', net_carbs_per_100g, 'g'), ('total carbohydrate', carbohydrates_per_100g, 'g'),
                ('starch', starch_per_100g, 'g'), ('total sugars', total_sugar_per_100g, 'g'),
                ('added sugar', added_sugar_per_100g, 'g'), ('artificial sugar', artificial_sugar_per_100g, 'g'),
                ('fibre', fibre_per_100g, 'g'), ('sodium', sodium_per_100g, 'g (#mg)'),
                ('salt', salt_per_100g, 'g (#mg)')
        ) AS t(name, "valuePer100", unit),
        LATERAL (SELECT JSON_BUILD_OBJECT('name', t.name, 'valuePer100', t."valuePer100", 'unit', t.unit) as item) as nutri
        WHERE t."valuePer100" IS NOT NULL
        GROUP BY "recipe_components_on_recipeUuid"
    ) as cn ON rcor.uuid = cn."recipe_components_on_recipeUuid"
    -- Subquery for recipe detail rows
    LEFT JOIN (
        SELECT
            "recipe_components_on_recipeUuid",
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'uuid', rdr.uuid, 'ingredId', rdr.ingredients_id, 'ingredName', rdr.name_extra_info,
                    'qty', rdr.qty_g, 'qty_estimated_from_home', rdr.qty_estimated_from_home_g,
                    'qty_estimated_confidence', rdr.qty_estimated_confidence, 'home_qty_frac_numerator', rdr.home_qty_frac_numerator,
                    'home_qty_frac_denominator', rdr.home_qty_frac_denominator, 'home_qty', rdr.home_qty,
                    'home_qty_type', rdr.home_qty_type_name, 'order', rdr.sort_order, 'type', rdr.ingredient_type_name,
                    'instruction', rdr.prep_instruction_name, 'stepInstruction', rdr.step_instruction,
                    'costPer1000', rdr.cost_per_1000g, 'needsPrep', rdr.needs_prep,
          
                    'isSalt', CASE WHEN rdr.salt_purpose_id IS NOT NULL THEN true ELSE false END,
                    'isOil', CASE WHEN rdr.oil_purpose_id IS NOT NULL THEN true ELSE false END,
                    'FQscore', fq.score
                ) ORDER BY rdr.sort_order ASC
            ) as "recipeDetail"
        FROM recipe_detail_row as rdr
        LEFT JOIN (
            SELECT id, JSON_BUILD_OBJECT('positive', positive, 'negative', negative, 'neutral', neutral, 'overall', overall, 'positiveTxt', positive_txt, 'negativeTxt', negative_txt, 'neutralTxt', neutral_txt, 'overallTxt', overall_txt) as score
            FROM fq_score
        ) as fq ON rdr.fq_score_id = fq.id
        GROUP BY "recipe_components_on_recipeUuid"
    ) as rdr ON rcor.uuid = rdr."recipe_components_on_recipeUuid"
    GROUP BY rcor."recipe_uuid"
) AS rc ON r.uuid = rc."recipe_uuid"
-- Subquery to aggregate the new top-level 'recipes' array
LEFT JOIN (
    SELECT
        rcor."recipe_uuid",
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'name', rcor.name,
                'uuid', rcor.uuid,
                'costPer1000', rcor.cost_per_1000g,
                'brand', 'null'::json, -- Placeholder for brand info
                'customer', 'null'::json, -- Placeholder for customer info
                'method', rcor.method,
                'recipeDetail', rdr."recipeDetail"
            ) ORDER BY rcor.sort_order ASC
        ) as recipes
    FROM
        recipe_components_on_recipe as rcor
    -- This is the same subquery for recipe details as used above
    LEFT JOIN (
        SELECT
            "recipe_components_on_recipeUuid",
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'uuid', rdr.uuid, 'ingredId', rdr.ingredients_id, 'ingredName', rdr.name_extra_info,
                    'qty', rdr.qty_g, 'qty_estimated_from_home', rdr.qty_estimated_from_home_g,
                    'qty_estimated_confidence', rdr.qty_estimated_confidence, 'home_qty_frac_numerator', rdr.home_qty_frac_numerator,
                    'home_qty_frac_denominator', rdr.home_qty_frac_denominator, 'home_qty', rdr.home_qty,
                    'home_qty_type', rdr.home_qty_type_name, 'order', rdr.sort_order, 'type', rdr.ingredient_type_name,
                    'instruction', rdr.prep_instruction_name, 'stepInstruction', rdr.step_instruction,
                    'costPer1000', rdr.cost_per_1000g, 'needsPrep', rdr.needs_prep,
                    'isSalt', CASE WHEN rdr.salt_purpose_id IS NOT NULL THEN true ELSE false END,
                    'isOil', CASE WHEN rdr.oil_purpose_id IS NOT NULL THEN true ELSE false END
                    
                ) ORDER BY rdr.sort_order ASC
            ) as "recipeDetail"
        FROM recipe_detail_row as rdr
  
        LEFT JOIN (
            SELECT id, JSON_BUILD_OBJECT('positive', positive, 'negative', negative, 'neutral', neutral, 'overall', overall, 'positiveTxt', positive_txt, 'negativeTxt', negative_txt, 'neutralTxt', neutral_txt, 'overallTxt', overall_txt) as score
            FROM fq_score
        ) as fq ON rdr.fq_score_id = fq.id
        GROUP BY "recipe_components_on_recipeUuid"
    ) as rdr ON rcor.uuid = rdr."recipe_components_on_recipeUuid"
    GROUP BY rcor."recipe_uuid"
) AS recipes_agg ON r.uuid = recipes_agg."recipe_uuid"
WHERE
      r.uuid = ${recipeUuid}
  `;

  console.log("----->>>>>>>> getLiveRecipeData object:", result);
  // $queryRaw returns an array, so we take the first element.
  return result || null;
};

// Using prisma.$transaction to run multiple queries in a single transaction and
// keep type safety with TypeScript.
export const getSystemDataFunc2 = async (orgId: string): Promise<SystemDataProps> => {
  // / 1. Determine which customer IDs to query for.
  // Always include the Admin default customer (ID 1).
  const orgIds: string[] = ["1"];
  if (orgId && orgId !== "1") {
    // If an additional customerId is provided and it's not 1, add it to the list.
    orgIds.push(orgId).toString();
  }

  // 1. Run all queries within prisma.$transaction.
  // The result will be a tuple with a specific type for each element.
  const [
    unit_type,
    unit_metric_imperial,
    prep_instructions,
    cooked_yields_categories,
    dry_cooked_yields_categories,
    dry_cooked_yields,
    ingredients_religious_certification,
    language,
    nutritional_data_values,
    ingredient_category_primary,
    ingredient_category_secondary,
    dietary_classification,
    allergy,
    recipe_mode,
    recipe_type,
    oil_purpose,
    salt_purpose,
    ingredient_type,
    markup_type,
    markup,
    todo_status,
    other_costs_category,
    other_costs_line_items_lookup,
    packaging_costs_category,
    packaging_costs_line_items_lookup,
    vat_rules,
    ingredients,
    org,
  ] = await prisma.$transaction([
    prisma.unit_type.findMany({ select: { id: true, name: true, desc: true, imperial: true, metric: true } }),

    prisma.unit_metric_imperial.findMany({ select: { id: true, name: true, is_default: true } }),

    prisma.prep_instructions.findMany({ where: { is_live: true }, select: { id: true, name: true, desc: true, imperial: true, metric: true, translation: true, yield: true } }),

    prisma.cooked_yields_categories.findMany({ where: { is_live: true }, select: { id: true, name: true, translation: true, desc: true, yield: true, is_live: true } }),

    prisma.dry_cooked_yields_categories.findMany({ where: { is_live: true }, select: { id: true, name: true, desc: true, translation: true, yield: true } }),

    prisma.dry_cooked_yields.findMany({ where: { is_live: true }, select: { id: true, name: true, desc: true, translation: true, yield: true } }),

    prisma.ingredients_religious_certification.findMany({ select: { id: true, name: true } }),

    prisma.language.findMany({ select: { id: true, name: true } }),

    prisma.$queryRaw<NutritionalDataValuesSelect[]>`SELECT column_name FROM information_schema.columns WHERE table_name = 'ingredients_nutrition'`,

    prisma.ingredient_category_primary.findMany({ select: { id: true, name: true, translation: true } }),

    prisma.ingredient_category_secondary.findMany({ select: { id: true, name: true, translation: true, ingredient_category_primary_id: true } }),

    prisma.dietary_classification.findMany({ select: { id: true, name: true, translation: true } }),

    prisma.allergy.findMany({ select: { id: true, name: true, desc: true, translation: true } }),

    prisma.recipe_mode.findMany({ select: { id: true, name: true, desc: true } }),

    prisma.recipe_type.findMany({ select: { id: true, name: true, desc: true, is_default: true } }),

    prisma.oil_purpose.findMany({ select: { id: true, name: true, factor: true, desc: true, is_default: true, confidence: true } }),

    prisma.salt_purpose.findMany({ select: { id: true, name: true, factor: true, desc: true, is_default: true, confidence: true } }),

    prisma.ingredient_type.findMany({ select: { id: true, name: true, desc: true } }),

    prisma.markup_type.findMany({ select: { id: true, name: true, desc: true } }),

    prisma.markup.findMany({
      where: { org_uuid: { in: orgIds } },
      select: { id: true, name: true, org_uuid: true, desc: true, markup_type_id: true, factor: true, markup_type: { select: { id: true, name: true, desc: true } } },
      orderBy: { factor: "asc" },
    }),

    prisma.todo_status.findMany({ select: { id: true, name: true }, where: { org_uuid: { in: orgIds } }, orderBy: { id: "asc" } }),

    prisma.other_costs_category.findMany({ where: { org_uuid: { in: orgIds } } }),

    prisma.$queryRaw<
      OtherCostsLineItemsLookupSelect[]
    >`SELECT li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.org_uuid, string_agg(l.other_costs_category_id::text, ',' ORDER BY l.other_costs_category_id) AS category_ids FROM public.other_costs_line_item li INNER JOIN public.other_costs_lookup l ON li.id = l.other_costs_line_item_id WHERE l.org_uuid IN (${Prisma.join(
      orgIds
    )}) GROUP BY li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.org_uuid ORDER BY li.name;`,

    prisma.packaging_costs_category.findMany({ where: { org_uuid: { in: orgIds } } }),

    prisma.$queryRaw<
      LineItemsLookup[]
    >`SELECT li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.org_uuid, string_agg(l.packaging_costs_category_id::text, ',' ORDER BY l.packaging_costs_category_id) AS category_ids FROM public.packaging_costs_line_item li INNER JOIN public.packaging_costs_lookup l ON li.id = l.packaging_costs_line_item_id WHERE l.org_uuid IN (${Prisma.join(
      orgIds
    )}) GROUP BY li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.org_uuid ORDER BY li.name;`,

    prisma.vat_rules.findMany({ where: { org_uuid: { in: orgIds } }, select: { id: true, name: true, cost: true, description: true, org_uuid: true, default: true } }),

    prisma.ingredients.findMany({
      where: { org_uuid: orgId, deleted: false },
      select: {
        id: true,
        name: true,
        names_alt: true,
        name_orig: true,
        org_uuid: true,
        translation: true,
        primary_category_id: true,
        secondary_category: true,
        updated_at: true,
        is_default: true,
        confidence: true,
        dietary_classification_id: true,
        kosher_id: true,
        halal_id: true,
        ai_model: true,
      },
    }),
    prisma.org.findFirst({
      where: { uuid: orgId },
      select: {
        uuid: true,
        username: true,
        emails: true,
        phone_numbers: true,
        last_sign_in_at: true,
        json: true,
        unit_metric_imperial_name: true, // 1 = metric, 2 = imperial
        vat_number: true,
        country_locale_id: true,
        country_locale: {
          select: {
            id: true,
            country_code: true,
            country_name: true,
            currency_code: true,
            currency_name: true,
            currency_symbol: true,
            language_code: true,
            locale: true,
            date_format: true,
            decimal_separator: true,
            time_zone: true,
          },
        },
      },
    }),
  ]);

  // 2. Construct the final object. TypeScript will now validate
  // that each property is assigned the correct type.
  return {
    unit_type,
    unit_metric_imperial,
    prep_instructions,
    cooked_yields_categories,
    dry_cooked_yields_categories,
    dry_cooked_yields,
    ingredients_religious_certification,
    language,
    nutritional_data_values,
    ingredient_category_primary,
    ingredient_category_secondary,
    dietary_classification,
    allergy,
    recipe_mode,
    recipe_type,
    oil_purpose,
    salt_purpose,
    ingredient_type,
    markup_type,
    markup,
    todo_status,
    other_costs_category,
    other_costs_line_items_lookup,
    packaging_costs_category,
    packaging_costs_line_items_lookup,
    vat_rules,
    ingredients,
    org,
  };
};

export const getRecipeDataFunc2 = async (): Promise<PreCalculatedRecipeData> => {
  // INFO: This is the initial state of the recipe data - empty arrays
  // const recipesStatic = JSON.parse(JSON.stringify(data));
  //
  return {
    portionSizes: [],
    portionIds: [],
    componentsNamesArray: [],
    componentsIDArray: [],
    componentsWeights: [],
    componentsPricePer1000: [],
    componentsPrices: [],
    componentsPricesDesc: [],
    componentsSubTotalsPrices: [],
    packingCostPriceTotals: [],
    packingCostPriceRules: [],
    otherCostsPriceTotals: [],
    otherCostsPriceRules: [],
    costsSubTotals: [],
    markUpPriceAmounts: [],
    markUpPriceRules: [],
    markUpPriceRuleName: [],
    salePricesExVat: [],
    salesPricesIncVat: [],
    vatRuleIds: [],
    vatRulePercs: [],
    vatRuleNames: [],
    // Create a deep copy of the data object (Recipe Data)
    data: {} as RecipeDataProps, // Initialize as an empty array
    // data: recipesStatic,
    data2: [],
    isImperial: false,
    isHome: false,
    currencySymbol: "",
    measurementUnitsObj: {} as measurementUnitsObjProps,
  };
};
export interface All {
  recipeData: PreCalculatedRecipeData;
  systemData: SystemDataProps;
}

export async function getAllRecipeObject(orgId: string): Promise<All> {
  try {
    const recipeData2 = await getLiveRecipeData("1234567890", "1"); // Using a static recipe UUID for demo purposes
    console.log("----->>>>>>>> getAllRecipeObject recipeData2:", recipeData2);
    const rec2 = { data2: recipeData2 };
    const recipeData = await getRecipeDataFunc2();
    const systemData = await getSystemDataFunc2(orgId);
    // Pre-calculate Recipe Components and other data
    const preCalcData = await preCalculateData(recipeData, systemData);
    return { recipeData: { ...recipeData, ...preCalcData, ...rec2 }, systemData };
  } catch (error) {
    console.error("Error fetching system data:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}
