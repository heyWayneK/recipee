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
    // Parse the JSON body of the POST request
    const body = await request.json();
    const { id, name } = body;

    console.log(`POST request received: id=${id}, name=${name}`);

    // Process the webhook payload
    return NextResponse.json({ message: `Success POST! id=${id}, name=${name}` }, { status: 200 });
  } catch (error: any) {
    console.error(`Webhook error POST: ${error.message}`);
    return NextResponse.json({ error: `Webhook error POST: ${error.message}` }, { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    // Extract query parameters from the URL
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const name = url.searchParams.get("name");

    console.log(`GET request received: id=${id}, name=${name}`);

    // Process the webhook payload
    return NextResponse.json({ message: `GET request successful --- id=${id}, name=${name}` }, { status: 200 });
  } catch (error: any) {
    console.error(`Webhook error GET: ${error.message}`);
    return NextResponse.json({ error: `Webhook error GET: ${error.message}` }, { status: 400 });
  }
}
