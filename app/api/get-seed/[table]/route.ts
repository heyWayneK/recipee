// import { TableName } from "@/app/recipee/formgen/_types/formGen_setup";
import { PrismaClient } from "@prisma/client";
// import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { table: unknown } }) {
  try {
    const tableName = params.table;
    // INFO: IGNORE ERROR
    const data = await prisma[tableName].findMany(); // Use the table name dynamically
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: "GET request FAIL", error: error });
  }
}
