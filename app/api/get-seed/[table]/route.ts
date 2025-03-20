import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { table: string } }) {
  try {
    // Get the table parameter from the URL
    const { table } = params;
    console.log("GET request tableName", table);

       // Validate the table name against allowed tables
    // if (!TABLES.includes(tableName as TableName)) {
    //   return NextResponse.json(
    //     { message: "Invalid table name", error: "Table not found" },
    //     { status: 400 }
    //   );
    // }

    const data = await (prisma as any)[table].findMany();
    return NextResponse.json({
      data,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    // Handle errors appropriately
    return NextResponse.json({ error: "Failed to fetch ingredient data" }, { status: 500 })
  }
}


 