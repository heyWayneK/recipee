import { TABLES, TableName } from "@/app/recipee/formgen/_types/formGen_setup";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  context: { params: { table: string } } // Correct type for the second argument
) {
  try {
    const tableName = context.params.table; // Extract the table name from the URL
    console.log("GET request tableName", tableName);

    // Validate the table name against allowed tables
    // if (!TABLES.includes(tableName as TableName)) {
    //   return NextResponse.json(
    //     { message: "Invalid table name", error: "Table not found" },
    //     { status: 400 }
    //   );
    // }

    // Dynamically query the table using Prisma
    const data = await prisma[tableName].findMany(); // Use the table name dynamically
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { message: "GET request FAIL", error: error.message },
      { status: 400 }
    );
  }
}