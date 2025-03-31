// import "jsr:@supabase/functions-js/edge-runtime.d.ts";
// import { createClient } from "jsr:@supabase/supabase-js";

// const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
// const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// IMPORTANT: IGNORE DENO ERRORS. THE SERVER WILL STILL RUN
Deno.serve(async (req: Request) => {
  try {
    // // Retrieve unprocessed tasks from the webhook_queue
    // const { data: tasks, error: fetchError } = await supabase
    //   .from('webhook_queue')
    //   .select('id, ingredient_id, name')
    //   .eq('processed', false)s
    //   .limit(10);

    // if (fetchError) throw fetchError;

    console.log("DO SOMETHING:");

    // return {
    //   statusCode: 200,
    //   body: "Hello, world!",
    // };
    return new Response(JSON.stringify({ message: "Sucesss - Hello World" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
