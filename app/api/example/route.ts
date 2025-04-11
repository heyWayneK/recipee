import { ta } from "date-fns/locale";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

/* TESTING:
    curl "http://localhost:3000/api/example?name=test&id=123"

    curl -X POST http://localhost:3000/api/example \
     -H "Content-Type: application/json" \
     -d '{"id": "123", "name": "John"}'

     curl -X PUT http://localhost:3000/api/example

*/

export async function GET(request: Request, res: NextApiResponse) {
  try {
    // Get the table parameter from the URL
    const url = new URL(request.url);
    const name = url.searchParams?.get("name");
    const id = url.searchParams?.get("id");
    if (!name || !id) {
      console.log("Table parameter is missing");
      return NextResponse.json({ error: "Table parameter is required" }, { status: 400 });
    }
    const mockData = [
      {
        message: "Hello World 1",
        id: id,
        name: name,
      },
    ];
    return NextResponse.json(mockData, { status: 200 });
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return NextResponse.json({ error: `Error fetching data: ${error}` }, { status: 500 });
  }
}

// import { NextApiResponse } from "next";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { id, name } = body;
//     console.log(`POST request received: id=${id}, name=${name}`);
//     // Process the webhook payload

//     return NextResponse.json({ message: `Hello World, body=${body}` }, { status: 200 });
//   } catch (error: any) {
//     console.error(`Webhook error: ${error.message}`);
//     return NextResponse.json({ error: `Webhook error: ${error.message}` }, { status: 400 });
//   }
// }

// export async function GET(request: Request, res: NextApiResponse) {
//   try {
//     // Get the table parameter from the URL
//     const url = new URL(request.url);
//     const table = url.searchParams?.get("table");

//     if (!table) {
//       console.log("Table parameter is missing");
//       //   return NextResponse.json({ error: "Table parameter is required" }, { status: 400 });
//     }
//     const mockData = [
//       {
//         id: "Hello World 1",
//       },
//     ];
//     return NextResponse.json(mockData, { status: 200 });
//   } catch (error) {
//     console.error(`Error fetching data: ${error}`);
//     return NextResponse.json({ error: `Error fetching data: ${error}` }, { status: 500 });
//   }
// }
