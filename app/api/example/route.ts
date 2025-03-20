"use server";
import { NextResponse } from "next/server";

/* INFO: submit either"
- http://localhost:3000/api/example/route?id=123&name=John
- http://localhost:3000/api/example/route
with the following body:
{
  "id": "123",   // string
  "name": "John" // string
}
curl -X http://localhost:3000/api/example \
     -H "Content-Type: application/json" \
     -d '{"id": 6, "name": "pear"}'

curl "http://localhost:3000/api/example?id=6&name=pear"
*/

export async function POST(request: Request) {
  try {
    // Determine the HTTP method of the request
    const method = request.method;

    if (method === "POST") {
      // Handle POST request
      const body = await request.json();
      const { id, name } = body;

      console.log(`POST request received: id=${id}, name=${name}`);

      // Process the webhook payload
      return NextResponse.json({ message: `Success POST 2 id=${id}, name=${name}` }, { status: 200 });
    } else if (method === "GET") {
      // Handle GET request
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      const name = url.searchParams.get("name");

      console.log(`GET request received: id=${id}, name=${name}`);

      // Process the webhook payload
      return NextResponse.json({ message: `Success GET 2 --- id=${id}, name=${name}` }, { status: 200 });
    } else {
      // Unsupported HTTP method
      return NextResponse.json({ error: `Unsupported method: ${method}` }, { status: 405 });
    }
  } catch (error: any) {
    console.error(`Webhook error: ${error.message}`);
    return NextResponse.json({ error: `Webhook error: ${error.message}` }, { status: 400 });
  }
}

// // Export the handler as POST and GET
// export const POST = handler;
// export const GET = handler;
