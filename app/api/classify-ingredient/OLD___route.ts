import { NextResponse } from "next/server";

const jsonResponse = {
  message: "This is public data",
  status: "success",
};

// export default async function handler(req: any, res: any) {
//   try {
//     res.status(200).json(jsonResponse);
//   } catch (error) {
//     // Handle errors (e.g., file not found)
//     res.status(500).json({ error: "Failed to read data" });
//   }
// }

//_____________________________________________________

// // pages/api/hello.ts
// import { NextApiRequest, NextApiResponse } from "next";

// import { auth } from "@clerk/nextjs/server";

// export async function GET() {
//   const { userId } = await auth();
//   if (userId) {
//     return Response.json({ message: "Hello, authenticated user!", userId });
//   }
//   return Response.json({ message: "Hello, public user!" });
// }

// export default async function handler() {
//   console.log("Hello, World!");
//   const { userId } = await auth();
//   if (userId) {
//     return Response.json({ message: "Hello, authenticated user!", userId });
//   }
//   return Response.json({ message: "Hello, public user!" });
// }

// _______________________________________

// interface ApiResponse {
//   status: number;
//   message: string;
//   data?: {
//     test: string;
//   }; // Define the specific type for data
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
//   try {
//     if (req.method === "GET") {
//       res.status(200).json({
//         status: 200,
//         message: "Hello, World!",
//         data: { test: "yes" },
//       });
//     } else {
//       res.setHeader("Allow", ["GET"]);
//       res.status(405).json({
//         status: 405,
//         message: `Method ${req.method} Not Allowed`,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: "Internal Server Error",
//     });
//   }
// }

export async function GET(req: any, res: any) {
  // Your GET method logic here
  // res.status(200).json({ message: "GET request successful" });
  return NextResponse.json({ message: "GET request successful" });
}

export async function POST(req: any, res: any) {
  // Your POST method logic here
  // res.status(200).json({ message: "POST request successful" });
  return NextResponse.json({ message: "GET request successful" });
}

export default async function HTTP(req: any, res: any) {
  // Your POST method logic here
  // res.status(200).json({ message: "HTTP request successful" });
  return NextResponse.json({ message: "GET request successful" });
}

// // Add other HTTP methods as needed
