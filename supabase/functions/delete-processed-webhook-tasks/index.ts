// DEPLOY:  npx supabase functions deploy delete-processed-webhook-tasks
// INFO: IGNORE THE DENO WARNINGS - Server has global Deno object

// DELETE PROCESSED = TRUE
// This function deletes all rows where processed is TRUE in webhook_queue table.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

Deno.serve(async (req: Request) => {
  try {
    // Delete all rows where processed is TRUE
    const { error } = await supabase.from("webhook_queue").delete().eq("processed", true);

    if (error) throw error;

    return new Response(JSON.stringify({ message: "Processed tasks deleted successfully" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
