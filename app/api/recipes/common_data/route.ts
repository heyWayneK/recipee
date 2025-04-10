"use server";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const startTime = Date.now();

    const recipeDefault = await Promise.all([
      prisma.allergy.findMany(),
      prisma.cooked_yields_categories.findMany(),
      //   prisma.cost_rules.findMany(),
      //   prisma.dietary_classification.findMany(),
      //   prisma.dry_cooked_yields.findMany(),
      //   prisma.dry_cooked_yields_categories.findMany(),
      //   prisma.ingredient_category_primary.findMany(),
      //   prisma.ingredient_category_secondary.findMany(),
      //   prisma.ingredient_cooked_yields.findMany(),
      //   prisma.ingredients.findMany(),
      //   prisma.ingredients_nutrition.findMany(),
      //   prisma.ingredients_religious_certification.findMany(),

      //   prisma.packaging_costs.findMany(),
      //   // prisma.prep_instructions.findMany(),
      //   prisma.profiles.findMany(),
      //   prisma.raw_to_prepped_yields.findMany(),
      //   prisma.stock_location.findMany(),

      //   // prisma.language.findMany(),
      //   // prisma.country_locale.findMany(),
      //   // prisma.markup_type.findMany(),
      //   // prisma.oil_purpose.findMany(),
      //   // prisma.other_costs_category_example.findMany(),
      //   prisma.other_costs_line_item_example.findMany(),
    ]);

    const [
      allergy,
      cooked_yields_categories,
      //   cost_rules,
      //   customer,
      //   dietary_classification,
      //   dry_cooked_yields,
      //   dry_cooked_yields_categories,
      //   ingredient_category_primary,
      //   ingredient_category_secondary,
      //   ingredient_cooked_yields,
      //   ingredients,
      //   ingredients_nutrition,
      //   ingredients_religious_certification,

      //   packaging_costs,
      //   // prep_instructions,
      //   profiles,
      //   raw_to_prepped_yields,
      //   // recipe,
      //   stock_location,

      //   supplier,
      //   todo,

      // language,
      // country_locale,
      // markup_type,
      // oil_purpose,

      //   other_costs_line_item_example,
    ] = recipeDefault;

    const totalTimeSecs = (Date.now() - startTime) / 1000;
    return NextResponse.json({ message: "Success", timer: totalTimeSecs, resultJson: recipeDefault }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook error:", error);

    if (error.status === 429) {
      //  insert error into slack and or email/whatsapp
      console.log("Error", error?.message);
    }
    return NextResponse.json({ error: "Failure - errors" }, { status: 500 });
  }
}
