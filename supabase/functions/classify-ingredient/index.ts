// DEPLOY:  npx supabase functions deploy classify-ingredient
// INFO: IGNORE THE DENO WARNINGS

// PROCESSED = FALSE
// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js";

// eslint-disable-next-line
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
// eslint-disable-next-line
const supabaseAnonKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// eslint-disable-next-line
Deno.serve(async (req: Request) => {
  try {
    console.log("Processing webhook tasks...");
    // Delete all rows where processed is TRUE
    const { data: tasks, error: fetchError } = await supabase.from("webhook_queue").select("id, ingredient_id, name").eq("processed", false).limit(10);
    console.log("Feched Tasks:", tasks);

    if (fetchError) throw fetchError;

    if (!tasks || tasks.length === 0) {
      console.log("No tasks to process");
      return new Response(JSON.stringify({ message: "No tasks to process" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Loop through each task and call the webhook
    for (const task of tasks) {
      console.log("Processing task:", `id: ${task.ingredient_id}, name: ${task.name}`);
      const response = await fetch(
        "https://16a2-82-132-214-241.ngrok-free.app/api/classify-ingredient/all",
        // 'https://recipee.app/api/classify-ingredient/x',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: task.ingredient_id, name: task.name }),
        }
      );

      // If the call is successful, update the processed status
      if (response.ok) {
        await supabase.from("webhook_queue").update({ processed: true }).eq("id", task.id);
      }
      return new Response(JSON.stringify({ message: "All tasks completed successfully" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
