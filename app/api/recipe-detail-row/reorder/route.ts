import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rowsToUpdate } = body; // expecting an array of { uuid: string, sort_order: number }

    if (!Array.isArray(rowsToUpdate) || rowsToUpdate.length === 0) {
      return new NextResponse("Missing or invalid rowsToUpdate array", { status: 400 });
    }

    const updatePromises = rowsToUpdate.map(row =>
      prisma.recipe_detail_row.update({
        where: { uuid: row.uuid },
        data: { sort_order: row.sort_order },
      })
    );

    await prisma.$transaction(updatePromises);

    return NextResponse.json({ message: "Reordering successful" });
  } catch (error) {
    console.error("[REORDER_API]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
