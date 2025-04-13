/* TESTING:
    curl "http://localhost:3000/api/examples/post_get?id=123&name=test"

    curl -X POST http://localhost:3000/api/examples/post_get \
     -H "Content-Type: application/json" \
     -d '{"id": "123", "name": "John"}'

  http://localhost:3000/api/examples/post_get?id=123&name=test
*/

import { type NextRequest, NextResponse } from "next/server";

// Define the expected data structure
interface UserData {
  id: string;
  name: string;
}

// Shared handler logic for processing user data
async function handleUserData(data: UserData): Promise<NextResponse> {
  try {
    // Validate the data
    if (!data.id || !data.name) {
      return NextResponse.json({ error: "Missing required fields: id and name" }, { status: 400 });
    }

    // Process the data (replace with your actual logic)
    const result = {
      success: true,
      user: data,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error processing user data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET handler
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Extract query parameters
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  if (!id || !name) {
    return NextResponse.json({ error: "Missing required query parameters: id and name" }, { status: 400 });
  }

  return handleUserData({ id, name });
}

// POST handler
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse JSON body
    const body = await request.json();
    return handleUserData(body);
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}
