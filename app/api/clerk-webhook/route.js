import { supabase } from "@/supabaseClient";

export default async function handler(req, res) {
  const event = req.body;

  if (event.type === "user.created") {
    const { id, email_addresses } = event.data;
    const email = email_addresses[0].email_address;

    const { error } = await supabase.from("profiles").insert([{ id, email }]);

    if (error) return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: "Webhook processed" });
}
