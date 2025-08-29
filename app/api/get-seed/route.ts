import prisma from "@/libs/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ table: string }> }) {
  try {
    const [
      allergy_ingredient,
      allergy,
      cooked_yields_categories,
      cost_rules,
      customer,
      dietary_classification,
      dry_cooked_yields,
      dry_cooked_yields_categories,
      ingredient_category_primary,
      ingredient_category_secondary,
      prepped_to_cooked_yields,
      ingredients,
      ingredients_nutrition,
      ingredients_religious_certification,

      packaging_costs,
      // prep_instructions,
      profiles,
      raw_to_prepped_yields,
      // recipe,
      stock_location,
      supplier,
      todo,
      // language,
      // country_locale,
      // markup_type,
      // oil_purpose,
      // other_costs_category_example,
      other_costs_line_item_example,
      // ADDDDD these to the list
      // -->>>>>>>>> recipe_type
      // -->>>>>>>>> recipe_mode
    ] = await Promise.all([
      prisma.allergy.findMany(),
      prisma.allergy_ingredient.findMany(),
      prisma.allergy.findMany(),
      prisma.cooked_yields_categories.findMany(),
      prisma.cost_rules.findMany(),
      prisma.customer.findMany(),
      prisma.dietary_classification.findMany(),
      prisma.dry_cooked_yields.findMany(),
      prisma.dry_cooked_yields_categories.findMany(),
      prisma.ingredient_category_primary.findMany(),
      prisma.ingredient_category_secondary.findMany(),
      prisma.prepped_to_cooked_yields.findMany(),
      prisma.ingredients.findMany(),
      prisma.ingredients_nutrition.findMany(),
      prisma.ingredients_religious_certification.findMany(),

      prisma.packaging_costs.findMany(),
      // prisma.prep_instructions.findMany(),
      prisma.profiles.findMany(),
      prisma.raw_to_prepped_yields.findMany(),
      // prisma.recipe.findMany(),
      prisma.stock_location.findMany(),
      prisma.supplier.findMany(),
      prisma.todo.findMany(),
      // prisma.language.findMany(),
      // prisma.country_locale.findMany(),
      // prisma.markup_type.findMany(),
      // prisma.oil_purpose.findMany(),
      // prisma.other_costs_category_example.findMany(),
      prisma.other_costs_line_item_example.findMany(),
      prisma.recipe_mode.findMany(),
    ]);

    const data = {
      allergy_ingredient,
      allergy,
      cooked_yields_categories,
      cost_rules,
      customer,
      dietary_classification,
      dry_cooked_yields,
      dry_cooked_yields_categories,
      ingredient_category_primary,
      ingredient_category_secondary,
      prepped_to_cooked_yields,
      ingredients,
      ingredients_nutrition,
      ingredients_religious_certification,

      packaging_costs,
      // prep_instructions,
      profiles,
      raw_to_prepped_yields,
      // recipe,
      stock_location,
      supplier,
      todo,
      // language,
      // country_locale,
      // markup_type,
      // oil_purpose,
      // other_costs_category_example,
      other_costs_line_item_example,
      // recipe_mode,
    };

    // const jsonData = JSON.stringify(data);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch ingredient data",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// // await Promise.all([
// //   prisma.allergy.findMany(),
// //   prisma.allergy_ingredient.findMany(),
// //   prisma.allergy.findMany(),
// //   prisma.cooked_yields_categories.findMany(),
// //   prisma.cost_rules.findMany(),
// //   prisma.customer.findMany(),
// //   prisma.dietary_classification.findMany(),
// //   prisma.dry_cooked_yields.findMany(),
// //   prisma.dry_cooked_yields_categories.findMany(),
// //   prisma.ingredient_category_primary.findMany(),
// //   prisma.ingredient_category_secondary.findMany(),
// //   prisma.prepped_to_cooked_yields.findMany(),
// //   prisma.ingredients.findMany(),
// //   prisma.ingredients_nutrition.findMany(),
// //   prisma.ingredients_religious_certification.findMany(),
// //   prisma.markup.findMany(),
// //   prisma.packaging_costs.findMany(),
// //   prisma.prep_instructions.findMany(),
// //   prisma.profiles.findMany(),
// //   prisma.raw_to_prepped_yields.findMany(),
// //   prisma.recipe.findMany(),
// //   prisma.stock_location.findMany(),
// //   prisma.supplier.findMany(),
// //   prisma.todo.findMany(),
// //   prisma.language.findMany(),
// //   prisma.country_locale.findMany(),
// //   prisma.markup_type.findMany(),
// //   prisma.oil_purpose.findMany(),
// //   prisma.other_costs_category_example.findMany(),
// //   prisma.other_costs_line_item_example.findMany(),
// //   prisma.prep_instructions.findMany(),
// // ]);
// // const jsonData = JSON.stringify(data);

// const data = {
//   allergy_ingredient,
//   allergy,
//   cooked_yields_categories,
//   cost_rules,
//   customer,
//   dietary_classification,
//   dry_cooked_yields,
//   dry_cooked_yields_categories,
//   ingredient_category_primary,
//   ingredient_category_secondary,
//   prepped_to_cooked_yields,
//   ingredients,
//   ingredients_nutrition,
//   ingredients_religious_certification,
//   markup,
//   packaging_costs,
//   prep_instructions,
//   profiles,
//   raw_to_prepped_yields,
//   recipe,
//   stock_location,
//   supplier,
//   todo,
//   language,
//   country_locale,
//   markup_type,
//   oil_purpose,
//   other_costs_category_example,
//   other_costs_line_item_example,
//   prep_instructions,
// };
// You could use the table parameter to filter or select different data
// For example, if table === 'vegan', you could filter for vegan ingredients
