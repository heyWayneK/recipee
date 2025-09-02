import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json([]);
    }

    const ingredients = await prisma.ingredients.findMany({
      where: {
        deleted: false,
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            names_alt: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 10, // Limit the number of results
    });

    return NextResponse.json(ingredients);
  } catch (error) {
    console.error("[INGREDIENTS_SEARCH_API]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
