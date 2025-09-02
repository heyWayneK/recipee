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
    const { name } = body;

    if (!name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newIngredient = await prisma.ingredients.create({
      data: {
        name,
        org_uuid: orgId,
      },
    });

    return NextResponse.json(newIngredient);
  } catch (error) {
    console.error("[INGREDIENTS_CREATE_API]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
