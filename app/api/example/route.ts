/* TESTING:
    curl "http://localhost:3000/api/example?name=test&id=123"

    curl -X POST http://localhost:3000/api/example \
     -H "Content-Type: application/json" \
     -d '{"id": "123", "name": "John"}'

     curl -X PUT http://localhost:3000/api/example
*/

// Filename: app/api/example/route.ts

import { NextRequest, NextResponse } from "next/server";

// Define the expected structure for the response data (optional but good practice)
interface ExampleResponseData {
  message: string;
  id: string | null; // Allow null if parameter might be missing (though we check below)
  name: string | null; // Allow null if parameter might be missing (though we check below)
}

/**
 * Handles GET requests to /api/example
 * Expects 'id' and 'name' query parameters.
 * Example: /api/example?id=123&name=test
 */
export async function GET(request: NextRequest) {
  try {
    // In the App Router, query parameters are easily accessed via request.nextUrl.searchParams
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");
    const id = searchParams.get("id");

    // Check if the required query parameters are present
    if (!name || !id) {
      console.log("Required query parameters (name, id) are missing");
      // Return a JSON response with a 400 Bad Request status
      return NextResponse.json({ error: "Query parameters 'name' and 'id' are required" }, { status: 400 });
    }

    // Construct the data you want to return
    const responseData: ExampleResponseData = {
      message: `Hello World 1! Received name: ${name} and id: ${id}`,
      id: id,
      name: name,
    };

    // Return the successful JSON response with a 200 OK status
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    // Log the error for server-side debugging
    console.error("Error processing GET request:", error);

    // Return a generic server error response with a 500 Internal Server Error status
    // Avoid sending detailed error messages to the client in production
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// You can add handlers for other HTTP methods (POST, PUT, DELETE, etc.) here as needed
// export async function POST(request: NextRequest) { ... }
// export async function PUT(request: NextRequest) { ... }
// etc.

//_____________________________________

// export async function GET(request: Request, res: NextApiResponse) {
//   try {
//     // Get the table parameter from the URL
//     const url = new URL(request.url);
//     const name = url.searchParams?.get("name");
//     const id = url.searchParams?.get("id");
//     if (!name || !id) {
//       console.log("Table parameter is missing");
//       return NextResponse.json({ error: "Table parameter is required" }, { status: 400 });
//     }
//     const mockData = [
//       {
//         message: "Hello World 1",
//         id: id,
//         name: name,
//       },
//     ];
//     return NextResponse.json(mockData, { status: 200 });
//   } catch (error) {
//     console.error(`Error fetching data: ${error}`);
//     return NextResponse.json({ error: `Error fetching data: ${error}` }, { status: 500 });
//   }
// }

//___________________________________

// import { NextApiResponse } from "next";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { id, name } = body;
//     console.log(`POST request received: id=${id}, name=${name}`);
//     // Process the webhook payload

//     return NextResponse.json({ message: `Hello World, body=${body}` }, { status: 200 });
//   } catch (error: any) {
//     console.error(`Webhook error: ${error.message}`);
//     return NextResponse.json({ error: `Webhook error: ${error.message}` }, { status: 400 });
//   }
// }

// export async function GET(request: Request, res: NextApiResponse) {
//   try {
//     // Get the table parameter from the URL
//     const url = new URL(request.url);
//     const table = url.searchParams?.get("table");

//     if (!table) {
//       console.log("Table parameter is missing");
//       //   return NextResponse.json({ error: "Table parameter is required" }, { status: 400 });
//     }
//     const mockData = [
//       {
//         id: "Hello World 1",
//       },
//     ];
//     return NextResponse.json(mockData, { status: 200 });
//   } catch (error) {
//     console.error(`Error fetching data: ${error}`);
//     return NextResponse.json({ error: `Error fetching data: ${error}` }, { status: 500 });
//   }
// }
