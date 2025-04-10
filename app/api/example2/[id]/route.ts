/* TESTING:
 
    

      curl -X POST http://localhost:3000/api/example2/123456 \ 
      -H "Content-Type: application/json" \
      -d '{"id": "123", "name": "John"}'
      
      curl -X POST http://localhost:3000/api/example2/123456 \
  -H "Content-Type: application/json" \
  -d '{"id": "123", "name": "John"}'
    
      curl -X GET http://localhost:3000/api/example2/12345/ 
*/
"use server";
// Shared handler logic for GET and POST
// app/api/example2/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

// Define your data type
interface ExampleData {
  id: string;
  name: string;
}

// GET request handler
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id; // Access the dynamic 'id' from params

    // Simulate fetching data based on ID
    const data: ExampleData = {
      id,
      name: `Example ${id}`,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// [id]+ POST - MOST LIKELY DONT NEED THIS
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id; // Access the dynamic 'id' from params

    // Parse the request body and handle potential parsing errors
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }

    // Validate that body contains the expected data
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Request body is required" }, { status: 400 });
    }

    // Simulate creating/updating data
    const newData: ExampleData = {
      id,
      name: body.name || `Example ${id}`,
    };

    return NextResponse.json({ message: "success", dats: newData }, { status: 201 });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: "Internal Server Error", message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
