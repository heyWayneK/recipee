"use server";
import { UserDataProps, PreCalculatedRecipeData, RecipeDataProps, PackagingCostsLineItemsLookup, OtherCostsLineItemsLookupSelect, NutritionalDataValuesSelect } from "@/types/recipeTypes";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { data } from "@/app/api/recipe";

import { preCalculateData } from "@/libs/preCalculatedRecipeData";
import { SystemDataProps, OrgTypeSelect } from "@/types/recipeTypes";

// import { GetStaticProps } from "next";

// TODO: TEMP Org Settings need db
// 1 = metric, 2 = imperial
const org: OrgTypeSelect = {
  id: 1,
  user_id: "ClerkUserId123",
  username: "admin",
  emails: "wayne@hardcoded.com",
  phone_numbers: "+1234567890",
  organisations: "org 1",
  avatar_url: "https://clerk.com/avatar.png",
  roles: "admin",
  first_name: "Admin",
  last_name: "User",
  last_sign_in_at: "2023-10-01T00:00:00.000Z",
  json: { test: "test" },
  unit_metric_imperial_id: 1, // 1: metric, // 2: imperial
  vat_number: "123456789",
  country_locale_id: 1, // Default country locale ID
  country_locale: {
    id: 1,
    country_code: "GB",
    country_name: "United Kingdom",
    currency_code: "GBP",
    currency_name: "British Pound",
    currency_symbol: "£",
    language_code: "en",
    locale: "en-GB",
    date_format: "DD/MM/YYYY",
    decimal_separator: ".",
    time_zone: "Europe/London",
  },
};

// Using prisma.$transaction to run multiple queries in a single transaction and
// keep type safety with TypeScript.
export const getSystemDataFunc2 = async (customerId: number): Promise<SystemDataProps> => {
  // / 1. Determine which customer IDs to query for.
  // Always include the Admin default customer (ID 1).
  const customerIds = [1];
  if (customerId && customerId !== 1) {
    // If an additional customerId is provided and it's not 1, add it to the list.
    customerIds.push(customerId);
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
      where: { customer_id: { in: customerIds } },
      select: { id: true, name: true, customer_id: true, desc: true, markup_type_id: true, factor: true, markup_type: { select: { id: true, name: true, desc: true } } },
      orderBy: { factor: "asc" },
    }),

    prisma.todo_status.findMany({ select: { id: true, name: true }, where: { customer_id: { in: customerIds } }, orderBy: { id: "asc" } }),

    prisma.other_costs_category.findMany({ where: { customer_id: { in: customerIds } } }),

    prisma.$queryRaw<
      OtherCostsLineItemsLookupSelect[]
    >`SELECT li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.customer_id, string_agg(l.other_costs_category_id::text, ',' ORDER BY l.other_costs_category_id) AS category_ids FROM public.other_costs_line_item li INNER JOIN public.other_costs_lookup l ON li.id = l.other_costs_line_item_id WHERE l.customer_id IN (${Prisma.join(
      customerIds
    )}) GROUP BY li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.customer_id ORDER BY li.name;`,

    prisma.packaging_costs_category.findMany({ where: { customer_id: { in: customerIds } } }),

    prisma.$queryRaw<
      PackagingCostsLineItemsLookup[]
    >`SELECT li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.customer_id, string_agg(l.packaging_costs_category_id::text, ',' ORDER BY l.packaging_costs_category_id) AS category_ids FROM public.packaging_costs_line_item li INNER JOIN public.packaging_costs_lookup l ON li.id = l.packaging_costs_line_item_id WHERE l.customer_id IN (${Prisma.join(
      customerIds
    )}) GROUP BY li.id, li.name, li.desc, li.supplier_id, li.cost, li.is_active, l.customer_id ORDER BY li.name;`,

    prisma.vat_rules.findMany({ where: { customer_id: { in: customerIds } }, select: { id: true, name: true, cost: true, description: true, customer_id: true, default: true } }),

    prisma.ingredients.findMany({
      where: { customer_id: customerId, deleted: false },
      select: {
        id: true,
        name: true,
        names_alt: true,
        name_orig: true,
        customer_id: true,
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
    org: org,
  };
};

export const getRecipeDataFunc2 = async (): Promise<PreCalculatedRecipeData> => {
  // INFO: This is the initial state of the recipe data - empty arrays
  const r = JSON.parse(JSON.stringify(data));
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
    data: r,
  };
};
export interface All {
  recipeData: PreCalculatedRecipeData;
  systemData: SystemDataProps;
}

export async function getAllRecipeObject(customerId: number): Promise<All> {
  try {
    const recipeData = await getRecipeDataFunc2();
    const systemData = await getSystemDataFunc2(customerId);
    // Pre-calculate Recipe Components and other data
    const preCalcData = await preCalculateData(recipeData, systemData);
    return { recipeData: { ...recipeData, ...preCalcData }, systemData };
  } catch (error) {
    console.error("Error fetching system data:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}
