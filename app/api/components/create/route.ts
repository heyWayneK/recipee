import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    // const { userId, orgId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    const orgId = "1"; // Hardcoded as per request

    const body = await request.json();
    const { newComponent, newRecipe, recipeUuid } = body;

    if (!newComponent || !newRecipe || !recipeUuid) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const createdRecipe = await prisma.recipe.create({
      data: {
        uuid: newRecipe.uuid,
        name: newRecipe.name,
        org_uuid: orgId,
        // brand_uuid: "1", //Should come from org
        // customer_uuid: "1", //Should come from org
      },
    });

    const createdComponent = await prisma.recipe_components_on_recipe.create({
      data: {
        recipe_uuid: recipeUuid,
        component_recipe_uuid: createdRecipe.uuid,
        order: newComponent.order,
      },
    });

    return NextResponse.json({ createdComponent, createdRecipe });
  } catch (error) {
    console.error("[COMPONENTS_CREATE_API]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
