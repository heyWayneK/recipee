/* TESTING:
    curl -X GET http://localhost:3000/api/examples/urldynamic/7798989 \
    
    http://localhost:3000/api/examples/urldynamic/7798989
*/
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Parameter 'id' is required" }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: `Hello World 1c! Received: id: ${id}`,
        id: id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// [id]+ POST - MOST LIKELY DONT NEED THIS
// export async function POST(request: NextRequest, props: { params: Promise<{ id: string }> }) {
//   const params = await props.params;
//   try {
//     const id = params.id; // Access the dynamic 'id' from params

//     // Parse the request body and handle potential parsing errors
//     let body;
//     try {
//       body = await request.json();
//     } catch (parseError) {
//       return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
//     }

//     // Validate that body contains the expected data
//     if (!body || typeof body !== "object") {
//       return NextResponse.json({ error: "Request body is required" }, { status: 400 });
//     }

//     // Simulate creating/updating data
//     const newData: ExampleData = {
//       id,
//       name: body.name || `Example ${id}`,
//     };

//     return NextResponse.json({ message: "success", dats: newData }, { status: 201 });
//   } catch (error) {
//     console.error("Error in POST:", error);
//     return NextResponse.json({ error: "Internal Server Error", message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
//   }
// }
