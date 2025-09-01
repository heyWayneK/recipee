"use server";
import {
  PreCalculatedRecipeData,
  OtherCostsLineItemsLookupSelect,
  MacroMicroSelect,
  LineItemsLookup,
  dry_cooked_yield_type,
  dry_cooked_yields_category_type,
  raw_to_prepped_yield_type,
  RecipeDetailProps,
  ComponentsInDataProps,
  RecipesInDataProps,
  DataProps,
  JsonDataProps,
} from "@/types/recipeTypes";
import prisma from "@/libs/prisma";
import { Prisma, cooked_yields_categories, dry_cooked_yields, dry_cooked_yields_categories, enum_macro_micro_primary_category, raw_to_prepped_yields } from "@prisma/client";
import { SystemDataProps } from "@/types/recipeTypes";
import { Recipe_detail_rowPosts } from "@/types/recipeTypes_prisma";

// import { GetStaticProps } from "next";

// The JSON transformation function
const transformRecipeData = (recipe: JsonDataProps) => {
  // const transformRecipeData = (recipe: any) => {
  if (!recipe) {
    return null;
  }

  console.log("RECIPEEEEE", { recipe });

  return {
    uuid: recipe.uuid,
    name: recipe.name,
    desc: recipe.desc,
    portions: recipe.recipe_portions.map((p: any) => ({
      id: p.id,
      qty_g: p.portion_g,
      order: p.order,
    })),
    packagingCostsId: recipe.packaging_costs_on_recipe.map((pc: any) => ({
      pid: pc.recipe_portions_id,
      rule: pc.packaging_costs_categoryId,
    })),
    otherCostsId: recipe.other_costs_on_recipe.map((oc: any) => ({
      pid: oc.recipe_portions_id,
      rule: oc.other_costs_categoryId,
    })),
    markupId: recipe.markup_on_recipe.map((m: any) => ({
      pid: m.recipe_portions_id,
      rule: m.markup_categoryId,
    })),
    vatRulesId: recipe.vat_on_recipe.map((v: any) => ({
      pid: v.recipe_portions_id,
      rule: v.vat_categoryId,
    })),
    components: recipe.recipe_components_on_recipe.map((comp: any) => ({
      name: comp.name,
      uuid: comp.uuid,
      // recipeId: comp.recipe_uuid,
      order: comp.order,
      version: comp.version,
      versions: [], // Placeholder as in original query
      // type: comp.ingredient_type_name,
      ingredientId: comp.ingredient_id,
      yield: comp.yield,
      // costPer1000g: comp.,
      // method: comp.,
      portions: comp.component_portion_on_recipe.map((p: any) => ({
        id: p.recipe_portions_id,
        qty_g: p.qty_g,
      })),
      nutriPer100: [], // Placeholder, nutrition transformation can be added here if needed
      // recipeDetail: comp.recipe_detail_row.map((row: any) => ({
      //   uuid: row.uuid,
      //   type: row.ingredient_type.name,
      //   name_extra_info: row.name_extra_info,
      //   qty_g: row.qty_g,
      //   order: row.sort_order,
      //   isSalt: !!row.salt_purpose_id,
      //   isOil: !!row.oil_purpose_id,
      //   FQscore: row.fq_score,
      //   ingredient: row.ingredients,
      //   cookingMethodYields: row.cooking_method_yields,
      //   dryCookedYield: row.dry_cooked_yield,
      //   instruction: row.instruction,
      //   homeModeUnits: row.home_mode_units,
      // })),
    })),
    // recipes: recipe.recipe_components_on_recipe.map((comp: RecipeDetailProps) => ({
    recipes: recipe.recipe_components_on_recipe.map((comp: any) => ({
      name: comp.name,
      uuid: comp.uuid,
      recipeId: comp.uuid,
      // order: comp.,
      // version: comp.version,
      // versions: [], // Placeholder as in original query
      // type: comp.ingredient_type_name,
      // ingredientId: comp.ingredients_id,
      // yield: comp.yield,
      // costPer1000g: comp.cost_per_1000g,
      method: comp.method,
      nutriPer100: [], // Placeholder, nutrition transformation can be added here if needed
      recipeDetail: comp.recipe_detail_row.map((row: Recipe_detail_rowPosts) => ({
        uuid: row.uuid,
        type: row.ingredient_type_name,
        name_extra_info: row.name_extra_info,
        cost_per_1000g: row.cost_per_1000g,
        qty_g: row.qty_g,
        order: row.sort_order,
        isSalt: !!row.salt_purpose_id,
        isOil: !!row.oil_purpose_id,
        FQscore: row.fq_score_id,
        ingredient: row.ingredients,
        cookingMethodYields: row.cooking_method_yields,
        dryCookedYield: row.dry_cooked_yield,
        instruction: row.instruction?.name,
        homeModeUnits: row.home_mode_units,
        stepInstruction: row.step_instruction,
        // WAS
        // uuid: row.uuid,
        // type: row.ingredient_type.name,
        // name_extra_info: row.name_extra_info,
        // cost_per_1000g: row.cost_per_1000g,
        // qty_g: row.qty_g,
        // order: row.sort_order,
        // isSalt: !!row.salt_purpose_id,
        // isOil: !!row.oil_purpose_id,
        // FQscore: row.fq_score,
        // ingredient: row.ingredients,
        // cookingMethodYields: row.cooking_method_yields,
        // dryCookedYield: row.dry_cooked_yield,
        // instruction: row.instruction,
        // homeModeUnits: row.home_mode_units,
      })),
    })),
  };
};

export const getLiveRecipeData = async (recipeUuid: string, orgUuid: string) => {
  if (!recipeUuid || !orgUuid) {
    throw new Error("Invalid recipeUuid or org_uuid provided");
  }

  // RecipeData will be placed in recipData.data{}
  const recipeData = await prisma.recipe.findFirst({
    where: {
      uuid: recipeUuid,
      org_uuid: orgUuid,
    },
    include: {
      recipe_portions: {
        orderBy: { order: "asc" },
      },
      packaging_costs_on_recipe: true,
      other_costs_on_recipe: true,
      markup_on_recipe: true,
      vat_on_recipe: true,
      recipe_components_on_recipe: {
        orderBy: { sort_order: "asc" },
        include: {
          component_portion_on_recipe: true,
          nutri_per_100g: true,
          recipe_detail_row: {
            orderBy: { sort_order: "asc" },
            include: {
              ingredient_type: true,
              // raw_to_prepped_yields: true,
              cooking_method_yields: true,
              dry_cooked_yield: true,
              ingredients: {
                include: {
                  primary_category: true,
                  unit_type: true,

                  // raw_to_prepped_yields: true,
                  cooked_yields: true,
                  dry_cooked_yields: true,
                  ingredients_nutrition: true,
                  dietary_classification: true,
                  kosher: true,
                  halal: true,
                  allergy: true,
                },
              },

              // ingredient_type: true,
              home_mode_units: true,
              salt_purpose: true,
              oil_purpose: true,
              // raw_to_prepped_yields: true,
              // cooking_method_yields: true,

              // dry_cooked_yield_categories: true,
              // dry_cooked_yield: true,
              instruction: true,
              fq_score: true,
            },
          },
        },
      },
    },
  });

  if (!recipeData) {
    console.log("No recipe found with the provided UUID and org_uuid.");
    return [];
  }
  const transformedData = transformRecipeData(recipeData);

  console.log("----->>>>>>>> getLiveRecipeData result:", transformedData);
  return transformedData ? [transformedData] : [];
};

// SYSTEM DATA_________________________________________________ START::
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
    macro_micro,
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

    prisma.dry_cooked_yields.findMany({
      where: { is_live: true },
      select: { id: true, name: true, desc: true, translation: true, yield: true, dry_cooked_yields_categories: true, dry_cooked_yields_categories_id: true },
    }),

    prisma.ingredients_religious_certification.findMany({ select: { id: true, name: true } }),

    prisma.language.findMany({ select: { id: true, name: true } }),

    prisma.macro_micro.findMany({
      select: {
        id: true,
        name: true,
        full_name: true,
        primary_category: true,
        secondary_category: true,
        unit: true,
        indent: true,
        short_name: true,
        order: true,
      },
    }),

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
        name_orig: true,
        names_alt: true,
        org_uuid: true,
        translation: true,
        primary_category_id: true,
        secondary_category: true,
        unit_type_id: true,
        dietary_classification_id: true,
        kosher_id: true,
        halal_id: true,
        confidence: true,
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
    macro_micro,
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
