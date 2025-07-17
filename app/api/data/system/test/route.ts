// /* TESTING:
//     curl "http://localhost:3000/api/examples/post_get?id=123&name=test"

//     curl -X POST http://localhost:3000/api/examples/post_get \
//      -H "Content-Type: application/json" \
//      -d '{"id": "123", "name": "John"}'

//   http://localhost:3000/api/examples/post_get?id=123&name=test
// */
// "use server";
// import { type NextRequest, NextResponse } from "next/server";
// import { getSystemData } from "../promise_all/route";

// // Define the expected data structure
// interface UserData {
//   id: string;
//   name: string;
// }

// // GET handler
// export async function GET(request: NextRequest): Promise<NextResponse> {
//   // Extract query parameters
//   const customerId = 1; // organisation ID
//   let response = (await getSystemData(customerId)) ?? undefined;

//   return NextResponse.json(response, { status: 200 });
// }
