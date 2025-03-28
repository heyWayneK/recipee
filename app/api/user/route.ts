// OLD FILE DONE BY DENNIS NOT NEEDED

// TEMP PLACEHOLDER _____________________________________________START ::
import prisma from "@/libs/prisma";
import { type NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// Define the type for your response data
type IngredientClassification = {
  id: string;
  name: string;
  category: string;
  properties: {
    vegan: boolean;
    glutenFree: boolean;
    allergen: boolean;
  };
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ table: string }> }) {
  try {
    // Get the table parameter from the URL
    const url = new URL(request.url);
    const table = url.searchParams.get("table");
    // const { table } = await params;

    if (!table) {
      return NextResponse.json({ error: "Table parameter is required" }, { status: 400 });
    }

    // // For demonstration, we'll return mock data
    // const mockData: IngredientClassification[] = [
    //   {
    //     id: "1",
    //     name: "Tomatooo",
    //     category: "Vegetable",
    //     properties: {
    //       vegan: true,
    //       glutenFree: true,
    //       allergen: false,
    //     },
    //   },
    // ];

    // Create a new Prisma instance with a specified connection URL
    // const prisma = new PrismaClient({
    //   datasources: {
    //     db: {
    //       url: process.env.DATABASE_URL,
    //       // url: "postgresql://postgres.zozztsfhpsotmekjeiwt:U9c3eWo6bExDoVKd@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
    //     },
    //   },
    // });
    const p = process.env.DATABASE_URL;

    // alert(`prisma : ${p}`);

    // Retrieve 10 rows from the ingredients table
    const ingredients = await prisma.allergy.findMany({
      take: 10,
    });

    // Close the Prisma client
    await prisma.$disconnect();

    // Return the ingredients data
    return NextResponse.json({
      table,
      ingredients,
      time: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Handle errors appropriately
    return Response.json({ error: "Add a ?table=test param", message: error, time: new Date().toISOString(), url: process.env.DATABASE_URL }, { status: 500 });
  }
}
// TEMP PLACEHOLDER _____________________________________________END ::

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/libs/next-auth";
// import prisma from "@/libs/prisma";

// // This function handles retrieving the authenticated user's data from the database.
// // The user must be authenticated to access this route.

// export async function POST() {
//   // Get the user's session from the authentication system.
//   const session = await getServerSession(authOptions);

//   // Check if the user is authenticated.
//   if (session) {
//     // Extract the user's ID from the session.
//     const { id } = session.user;

//     try {
//       // Find the user in the database using the ID from the session.
//       const user = await prisma.user.findFirst({ where: { id: +id } });

//       // If the user is not found, return a 404 Not Found error.
//       if (!user) {
//         return NextResponse.json({ error: "User not found" }, { status: 404 });
//       }

//       // If the user is found, return the user data with a 200 OK status.
//       return NextResponse.json({ data: user }, { status: 200 });
//     } catch (e) {
//       console.error(e);

//       // Return a 500 Internal Server Error if something goes wrong.
//       return NextResponse.json(
//         { error: "Something went wrong" },
//         { status: 500 }
//       );
//     }
//   } else {
//     // If the user is not signed in, return a 401 Unauthorized response.
//     return NextResponse.json({ error: "Not signed in" }, { status: 401 });
//   }
// }
