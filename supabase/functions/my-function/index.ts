// DEPLOY:  npx supabase functions deploy my-function
// INFO: IGNORE THE DENO WARNINGS

// DELETE PROCESSED = TRUE


// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
// SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.info('Hello World function started');

Deno.serve(async (req: Request) => {
  // Check if the request method is GET

  const { data: tasks, error: fetchError } = await supabase
  .from('webhook_queue')
  .select('id, ingredient_id, name')
  .eq('processed', false)
  .limit(10);

  if (fetchError) throw fetchError;

  console.log('Tasks from queue:', tasks);

  // Loop through each task and call the webhook
  for (const task of tasks) {
    console.log('Processing task:', `id: ${task.ingredient_id}, name: ${task.name}`);
  const response = await fetch(
    'https://5e80-2a0a-ef40-114f-a501-b8d8-1156-b0e9-d0e8.ngrok-free.app/api/classify-ingredient/x',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: task.ingredient_id, name: task.name }),
    }
  );

  // If the call is successful, update the processed status
  if (response.ok) {
    await supabase
      .from('webhook_queue')
      .update({ processed: true })
      .eq('id', task.id);
  }
}


  if (req.method === 'GET') {
    const data = {
      message: 'Hello, World THREE!',
      tasks: tasks,
      error: fetchError,
    };

//   if (fetchError) throw fetchError;

//   console.log('Tasks from queue:', tasks);

    return new Response(
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive' } }
    );
  }

  // If the method is not GET, return a 405 Method Not Allowed response
  return new Response('Method Not Allowed', { status: 405 });
});