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
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { UserDataProps } from "@/contexts/useRecipeData";
// import { GetStaticProps } from "next";

type RouteContext = {
  params: Promise<{
    profileid: string;
  }>;
};

interface obj {
  [key: string]: Promise<any>;
}

export const getUserData = async (customerId: number) => {
  const queries: obj = {
    // GET VALUES WHERE CUSTOMER = 1 (Default Account)
    other_costs_category: prisma.other_costs_category.findMany({ where: { customer_id: customerId } }),
    other_costs_line_items_lookup: prisma.$queryRaw`
        SELECT
            li.id,
            li.name,
            li.desc,
            li.supplier_id,
            li.cost,
            li.is_active,
            l.customer_id,
            string_agg(l.other_costs_category_id::text, ',' ORDER BY l.other_costs_category_id) AS category_ids
        FROM
            public.other_costs_line_item li
        INNER JOIN
            public.other_costs_lookup l
            ON li.id = l.other_costs_line_item_id
        WHERE
            l.customer_id = ${customerId}
        GROUP BY
            li.id,
            li.name,
            li.desc,
            li.supplier_id,
            li.cost,
            li.is_active,
            l.customer_id
        ORDER BY
            li.name;
    `,
    packaging_costs_category: prisma.packaging_costs_category.findMany({ where: { customer_id: customerId } }),
    packaging_costs_line_items_lookup: prisma.$queryRaw`
        SELECT
            li.id,
            li.name,
            li.desc,
            li.supplier_id,
            li.cost,
            li.is_active,
            l.customer_id,
            string_agg(l.packaging_costs_category_id::text, ',' ORDER BY l.packaging_costs_category_id) AS category_ids
        FROM
            public.packaging_costs_line_item li
        INNER JOIN
            public.packaging_costs_lookup l
            ON li.id = l.packaging_costs_line_item_id
        WHERE
            l.customer_id = ${customerId}
        GROUP BY
            li.id,
            li.name,
            li.desc,
            li.supplier_id,
            li.cost,
            li.is_active,
            l.customer_id
        ORDER BY
            li.name;
    `,
    vat_rules: prisma.vat_rules.findMany({ where: { customer_id: customerId } }),
  };

  const results = await Promise.all(Object.values(queries));
  return Object.fromEntries(Object.keys(queries).map((key, index) => [key, results[index]]));
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const customerId = Number((await context.params).profileid);

    if (!customerId) {
      return NextResponse.json({ error: "Parameter 'id' is required" }, { status: 400 });
    }

    const jsonObj = await getUserData(customerId);
    // Return the successful JSON response with a 200 OK status
    return NextResponse.json(jsonObj, { status: 200 });
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

//_____________________________
//_____________________________
//_____________________________
//_____________________________

// export async function GET(request: Request, context: { params: { id: string } }) {
//   try {
//     const { id } = await context.params;

//     if (!id) {
//       return NextResponse.json({ error: "Parameter 'id' is required" }, { status: 400 });
//     }

//     return NextResponse.json(
//       {
//         message: `Hello World 1bb! Received: id: ${id}`,
//         id: id,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error processing GET request:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

//____________________________
//____________________________
//____________________________
//____________________________

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
