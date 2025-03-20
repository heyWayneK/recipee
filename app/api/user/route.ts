// OLD FILE DONE BY DENNIS NOT NEEDED

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
