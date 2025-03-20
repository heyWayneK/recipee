import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type RouteParams = {
  params: {
    table: string;
  };
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { table } = params;
    console.log("GET request tableName", table);

    const data = await (prisma as any)[table].findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { message: "GET request FAIL", error: error.message },
      { status: 400 }
    );
  }
}