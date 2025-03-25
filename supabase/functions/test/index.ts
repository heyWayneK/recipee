

// import "jsr:@supabase/functions-js/edge-runtime.d.ts";
// import { createClient } from "jsr:@supabase/supabase-js";

// const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
// const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

Deno.serve(async (req: Request) => {
  try {
    // // Retrieve unprocessed tasks from the webhook_queue
    // const { data: tasks, error: fetchError } = await supabase
    //   .from('webhook_queue')
    //   .select('id, ingredient_id, name')
    //   .eq('processed', false)
    //   .limit(10);

    // if (fetchError) throw fetchError;

    console.log('DO SOMETHING:', );

    // // Loop through each task and call the webhook
    // for (const task of tasks) {
    //     console.log('Processing task:', `id: ${task.ingredient_id}, name: ${task.name}`);
    //   const response 2= await fetch(
    //     'https://5e80-2a0a-ef40-114f-a501-b8d8-1156-b0e9-d0e8.ngrok-free.app/api/classify-ingredient/x',
    //     {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ id: task.ingredient_id, name: task.name }),
    //     }
    //   );

    //   // If the call is successful, update the processed status
    //   if (response.ok) {
    //     await supabase
    //       .from('webhook_queue')
    //       .update({ processed: true })
    //       .eq('id', task.id);
    //   }
    // }
    return {
        statusCode: 200,
        body: "Hello, world!"
    };
    // return new Response(JSON.stringify({ message: 'Tasks processed successfully' }), {
    //   headers: { 'Content-Type': 'application/json' },
    // });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});