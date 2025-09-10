import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { portionSizeProps } from "@/types/recipeTypes";
import { Recipe_portionsPosts, component_portion_on_recipePosts } from "@/types/recipeTypes_prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipeUuid, newPortion, componentPortions } = body;

    if (!recipeUuid || !newPortion || !componentPortions) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // const createdPortion: Partial<Recipe_portionsPosts> = await prisma.recipe_portions.create({
    const createdPortion = await prisma.recipe_portions.create({
      data: {
        // id: undefined,
        recipe_uuid: recipeUuid,
        portion_g: newPortion.qty_g,
      },
    });

    const createdComponentPortions: Partial<component_portion_on_recipePosts>[] = await Promise.all(
      componentPortions.map((cp: { component_recipe_uuid: string; qty_g: number }) => {
        return prisma.component_portion_on_recipe.create({
          data: {
            recipe_uuid: recipeUuid,
            recipe_portions_id: createdPortion.id,
            qty_g: cp.qty_g,
            recipe_components_on_recipeUuid: cp.component_recipe_uuid,
          },
        });
      })
    );

    return NextResponse.json({ createdPortion, createdComponentPortions });
  } catch (error) {
    console.error("[PORTIONS_CREATE_API]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
