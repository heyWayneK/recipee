import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipeUuid, newPortion, componentPortions } = body;

    if (!recipeUuid || !newPortion || !componentPortions) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const createdPortion = await prisma.recipe_portions.create({
      data: {
        recipe_uuid: recipeUuid,
        qty_g: newPortion.qty_g,
        order: newPortion.order,
      },
    });

    const createdComponentPortions = await Promise.all(
      componentPortions.map((cp: { component_recipe_uuid: string; qty_g: number }) => {
        return prisma.component_portion_on_recipe.create({
          data: {
            recipe_uuid: recipeUuid,
            component_recipe_uuid: cp.component_recipe_uuid,
            recipe_portion_id: createdPortion.id,
            qty_g: cp.qty_g,
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
