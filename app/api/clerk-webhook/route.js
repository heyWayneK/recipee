import prisma from "@/libs/prisma";

// Export a POST handler for Next.js App Router
export async function POST(req) {
  try {
    // Parse the request body
    const event = await req.json();

    // Handle "user.created" event
    if (event.type === "user.created" || event.type === "user.updated") {
      const { id, email_addresses } = event.data;
      const email = email_addresses[0].email_address;
      const organisation = "Wayne test"; // Consider making this dynamic
      const json = JSON.stringify({ event });

      // Upsert the profile using Prisma
      await prisma.profiles.upsert({
        where: { userId: id },
        create: { userId: id, email, organisation, json },
        update: { email, organisation, json },
      });

      return new Response(JSON.stringify({ message: "Webhook processed" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ message: "Event not supported" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// import prisma from "@/libs/prisma";
// import { supabase } from "@/utils/supabaseClient.js";

// // Export a POST handler instead of a default handler
// export async function POST(req) {
//   // In App Router, req is a Web Request object, so we need to parse the body
//   const event = await req.json();

//   if (event.type === "user.created") {
//     const { id, email_addresses } = event.data;
//     const email = email_addresses[0].email_address;
//     const organisation = "Wayne test";
//     const json = JSON.stringify({ event });

//     const { error } = prisma.profiles.upsert({ id, email, organisation, json });

//     // const { error } = await supabase.from("profiles").insert([{ id, email, organisation, json }]);

//     if (error) {
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   } else if (!req) {
//     return new Response(JSON.stringify({ message: "Event not supported" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   return new Response(JSON.stringify({ message: "Webhook processed" }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }
