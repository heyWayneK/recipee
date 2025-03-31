// IMPORTANT: Supbase right need to be granted as follows:
//            GRANT SELECT, INSERT, UPDATE, DELETE ON public.webhook_queue TO authenticated, service_role;
// IMPORTANT: Ignore Deno errors, the server has a gobal Deno object

// DEPLOY:  FIRST change .env to .env___ to exclude ENV vars (DENO edge has global vars)
// DEPLOY:  npx supabase functions deploy classify-ingredient
// INFO: IGNORE THE DENO WARNINGS
// INFO: Keep console logs for server side debugging and monitoring

// TESTING: USING POSTMAN
// TESTING:  https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/classify-ingredient?id=6&name=butter

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js";

// eslint-disable-next-line
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
// eslint disable next line
const supabaseAnonKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// eslint-disable-next-line
Deno.serve(async (req: Request) => {
  try {
    console.log("Processing webhook tasks...");
    // Delete all rows where processed is TRUE
    const { data: tasks, error: fetchError } = await supabase.from("webhook_queue").select("id, ingredient_id, name, run_count").eq("processed", false).lte("run_count", 2).limit(3);
    console.log("Feched Tasks...");

    if (fetchError) {
      console.log("Error fetching tasks", fetchError.message);
      return new Response(JSON.stringify({ message: "No tasks to process or error" }), {
        headers: { "Content-Type": "application/json" },
      });
      //  throw fetchError;
    }

    console.log("*** Tasks.name:", tasks.name, "Tasks.ingredient_id:", tasks.ingredient_id);
    console.log("*** Tasks.length to process:", tasks.length);

    if (!tasks || tasks.length === 0) {
      console.log("No tasks to process");
      return new Response(JSON.stringify({ message: "No tasks to process" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Loop through each task and call the webhook
    let count = 1;
    for (const task of tasks) {
      console.log(`Processing task: ${count}`, `id: ${task.ingredient_id}, name: ${task.name}`);

      // FIXME: localhost and live urls
      //      GENERATE new ngrok url : ngrok http http://localhost:3000
      //      "https://16a2-82-132-214-241.ngrok-free.app/api/classify-ingredient/all",
      //      const url = NODE_ENV === "development" ? "https://16a2-82-132-214-241.ngrok-free.app" : "https://recipee.app";

      const url = "https://recipee.app";
      const response = await fetch(`${url}/api/classify-ingredient/all`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.ingredient_id, name: task.name }),
      });

      // INFO: Ignore the response for now, rather update the processed status
      // If the call is successful, update the processed status
      // if (response.ok) {
      // }
      await supabase
        .from("webhook_queue")
        .update({ processed: true, run_count: task.run_count + 1 })
        .eq("id", task.id);
      count++;
    }
    return new Response(JSON.stringify({ message: `All ${count} tasks completed successfully` }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
