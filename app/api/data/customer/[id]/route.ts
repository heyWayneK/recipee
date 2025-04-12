/* TESTING:
      curl -X POST http://localhost:3000/api/example2/123456 \ 
      -H "Content-Type: application/json" \
      -d '{"id": "123", "name": "John"}'
      
      curl -X POST http://localhost:3000/api/example2/123456 \
  -H "Content-Type: application/json" \
  -d '{"id": "123", "name": "John"}'
    
      curl -X GET http://localhost:3000/api/example2/12345/ 
*/

import { NextRequest, NextResponse } from "next/server";

// Define the expected structure for the response data (optional but good practice)
interface ExampleResponseData {
  message: string;
  id: string | null; // Allow null if parameter might be missing (though we check below)
}

/**
 * Handles GET requests to /api/example
 * Expects 'id' and 'name' query parameters.
 * Example: /api/example?id=123&name=test
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = await params.id;
    if (!id) {
      console.log("Required query parameters (name, id) are missing");
      // Return a JSON response with a 400 Bad Request status
      return NextResponse.json({ error: "Query parameters 'name' and 'id' are required" }, { status: 400 });
    }

    // Construct the data you want to return
    const responseData: ExampleResponseData = {
      message: `Hello World 1! Received: id: ${id}`,
      id: id,
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

// // api/data/customer/[customerid]/route.ts
// import { NextResponse } from "next/server";

// interface ExampleData {
//   customerid: string;
//   name: string;
//   test: string;
// }

// export async function GET(request: Request, context: { params: { id: string } }) {
//   try {
//     const { id } = await context.params;

//     // Simulate fetching data based on ID
//     const data: ExampleData = {
//       customerid: `${id}`,
//       name: `Example ${id}`,
//       test: "test3",
//     };

//     return NextResponse.json({ data: data }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error in GET:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

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
