"use server";
import { PreCalculatedRecipeData, PackagingCostsLineItemsLookup, OtherCostsLineItemsLookupSelect, NutritionalDataValuesSelect, OrgTypeSelect, measurementUnitsObjProps } from "@/types/recipeTypes";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { data } from "@/app/api/recipe";

import { preCalculateData } from "@/libs/preCalculatedRecipeData";
import { SystemDataProps } from "@/types/recipeTypes";

// import { GetStaticProps } from "next";

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
      where: { org_id: { in: orgIds } },
      select: { id: true, name: true, org_id: true, desc: true, markup_type_id: true, factor: true, markup_type: { select: { id: true, name: true, desc: true } } },
      orderBy: { factor: "asc" },
    }),

    prisma.todo_status.findMany({ select: { id: true, name: true }, where: { org_id: { in: orgIds } }, orderBy: { id: "asc" } }),

    prisma.other_costs_category.findMany({ where: { org_id: { in: orgIds } } }),

    prisma.$queryRaw<
      OtherCostsLineItemsLookupSelect[]
    >`SELECT li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.org_id, string_agg(l.other_costs_category_id::text, ',' ORDER BY l.other_costs_category_id) AS category_ids FROM public.other_costs_line_item li INNER JOIN public.other_costs_lookup l ON li.id = l.other_costs_line_item_id WHERE l.org_id IN (${Prisma.join(
      orgIds
    )}) GROUP BY li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.org_id ORDER BY li.name;`,

    prisma.packaging_costs_category.findMany({ where: { org_id: { in: orgIds } } }),

    prisma.$queryRaw<
      PackagingCostsLineItemsLookup[]
    >`SELECT li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.org_id, string_agg(l.packaging_costs_category_id::text, ',' ORDER BY l.packaging_costs_category_id) AS category_ids FROM public.packaging_costs_line_item li INNER JOIN public.packaging_costs_lookup l ON li.id = l.packaging_costs_line_item_id WHERE l.org_id IN (${Prisma.join(
      orgIds
    )}) GROUP BY li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.org_id ORDER BY li.name;`,

    prisma.vat_rules.findMany({ where: { org_id: { in: orgIds } }, select: { id: true, name: true, cost: true, description: true, org_id: true, default: true } }),

    prisma.ingredients.findMany({
      where: { org_id: orgId, deleted: false },
      select: {
        id: true,
        name: true,
        names_alt: true,
        name_orig: true,
        org_id: true,
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
      where: { id: orgId },
      select: {
        id: true,
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
  const recipesStatic = JSON.parse(JSON.stringify(data));
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
    data: recipesStatic,
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
    const recipeData = await getRecipeDataFunc2();
    const systemData = await getSystemDataFunc2(orgId);
    // Pre-calculate Recipe Components and other data
    const preCalcData = await preCalculateData(recipeData, systemData);
    return { recipeData: { ...recipeData, ...preCalcData }, systemData };
  } catch (error) {
    console.error("Error fetching system data:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}
