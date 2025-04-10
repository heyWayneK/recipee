/* TESTING:
    curl "http://localhost:3000/api/data/customer/123456?name=test&id=123"

    curl -X POST http://localhost:3000/api/data/customer/123456 \
     -H "Content-Type: application/json" \
     -d '{"id": "123", "name": "John"}'

     curl -X PUT http://localhost:3000/api/data/customer/123456
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
