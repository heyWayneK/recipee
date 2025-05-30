/* TESTING:
      http://localhost:3000/api/data/customer/79
      
      curl -X GET http://localhost:3000/api/data/customer/79 
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
