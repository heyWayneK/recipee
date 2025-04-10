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
export async function GET(request: NextRequest, { params }: { params: { customerId: string } }) {
  try {
    const id = params.customerId; // Access the dynamic 'id' from params

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

// id                       Int                        @id @default(autoincrement())
//   name                     String
//   email                    String                     @unique
//   email_verified           DateTime?
//   address                  String
//   logo                     String?
//   active                   Boolean                    @default(true)
//   payment_options          String
//   contacts                 String
//   created_at               DateTime                   @default(now())
//   updated_at               DateTime                   @updatedAt
//   ingredients              ingredients[]
//   suppliers                supplier[]
//   allergies                allergy[]
//   stocks                   stock[]
//   stock_locations          stock_location[]
//   recipe_books             recipe_book[]
//   todos                    todo[]
//   stock_minimum            stock_minimum[]
//   recip_backup             recipe_backup[]
//   recipe_book_index        recipe_book_index[]
//   recipe_book_collection   recipe_book_collection[]
//   recipe_book_ccess        recipe_book_access[]
//   todo_status              todo_status[]
//   todo_document            todo_document[]
//   conversation_thread      conversation_thread[]
//   production_event         production_event[]
//   production_event_task    production_event_task[]
//   cost_rules               cost_rules[]
//   packagingCosts           packaging_costs[]
//   other_costs_category     other_costs_category[]
//   markup                   markup[]
//   recipe                   recipe[]
//   ingredients_nutrition    ingredients_nutrition[]
//   ingredients_yields       ingredients_yields[]
//   packaging_costs_category packaging_costs_category[]
//   vat_rules                vat_rules[]
