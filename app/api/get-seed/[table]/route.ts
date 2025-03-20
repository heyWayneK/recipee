import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { table: string } } // Correctly typed second argument
) {
  try {
    const tableName = params.table; // Extract the table name from the URL
    console.log("GET request tableName", tableName);

    // Dynamically query the table using Prisma
    const data = await (prisma as any)[tableName].findMany(); // Use 'as any' temporarily for dynamic access
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { message: "GET request FAIL", error: error.message },
      { status: 400 }
    );
  }
}

    // Validate the table name against allowed tables
    // if (!TABLES.includes(tableName as TableName)) {
    //   return NextResponse.json(
    //     { message: "Invalid table name", error: "Table not found" },
    //     { status: 400 }
    //   );
    // }