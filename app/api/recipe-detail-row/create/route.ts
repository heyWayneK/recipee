import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    // const { userId, orgId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    // Hardcoded orgId as per user request
    const orgId = "1";

    const body = await request.json();
    const {
      recipe_uuid,
      recipe_components_on_recipeUuid,
      sort_order,
      ingredient_type_name,
      name_extra_info,
      step_instruction,
      ingredients_id,
    } = body;

    if (
      !recipe_uuid ||
      !recipe_components_on_recipeUuid ||
      sort_order === undefined ||
      !ingredient_type_name
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newRecipeDetailRow = await prisma.recipe_detail_row.create({
      data: {
        recipe: { connect: { uuid: recipe_uuid } },
        recipe_components_on_recipe: {
          connect: { uuid: recipe_components_on_recipeUuid },
        },
        sort_order,
        ingredient_type: { connect: { name: ingredient_type_name } },
        name_extra_info: name_extra_info,
        step_instruction: step_instruction,
        ingredients: ingredients_id ? { connect: { id: ingredients_id } } : undefined,
      },
      include: {
        instruction: true,
        ingredients: true,
        dry_cooked_yield: true,
        cooking_method_yields: true,
        ingredient_type: true,
        salt_purpose: true,
        oil_purpose: true,
        fq_score: true,
        home_mode_units: true,
      },
    });

    return NextResponse.json(newRecipeDetailRow);
  } catch (error) {
    console.error("[RECIPE_DETAIL_ROW_CREATE_API]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
