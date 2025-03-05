import { supabase } from "@/utils/supabaseClient.js";

// Export a POST handler instead of a default handler
export async function POST(req) {
  // In App Router, req is a Web Request object, so we need to parse the body
  const event = await req.json();

  if (event.type === "user.created") {
    const { id, email_addresses } = event.data;
    const email = email_addresses[0].email_address;
    const organisation = "Wayne test";
    const json = JSON.stringify({ event });

    const { error } = await supabase.from("profiles").insert([{ id, email, organisation, json }]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else if (!req) {
    return new Response(JSON.stringify({ message: "Event not supported" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "Webhook processed" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// import { NextRequest, NextResponse } from "next/server";

// export async function webhookHandler(req) {
//   if (req.method === "GET") {
//     return new NextResponse(JSON.stringify({ message: "GET request received" }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } else if (req.method === "POST") {
//     try {
//       const body = await req.json();
//       // Process the body as needed
//       return new NextResponse(JSON.stringify({ message: "POST request received", data: body }), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     } catch (error) {
//       return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   } else {
//     return new NextResponse(JSON.stringify({ message: "Method not supported" }), {
//       status: 405,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
