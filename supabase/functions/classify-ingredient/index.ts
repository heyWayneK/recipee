import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// DO NOT USE THIS IN PRODUCTION
// import { Deno } from 'https://deno.land/std/node/module.ts'; 

const supabase = createClient(
  Deno.env.get('SB_URL') ?? '',
  Deno.env.get('SB_ANON_KEY') ?? ''
);

serve(async (req) => {
  // Fetch unprocessed tasks from the queue
  const { data: tasks, error } = await supabase
    .from('webhook_queue')
    .select('id, ingredient_id, name')
    .eq('processed', false)
    .limit(10); // Process in batches to avoid overload

  if (error) {
    console.error('Error fetching tasks:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  if (!tasks || tasks.length === 0) {
    return new Response(JSON.stringify({ message: 'No tasks to process' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  }

  // Process each task
  for (const task of tasks) {
    try {
      // Call your external webhook/API
      const response = await fetch(
        'https://7147-2a0a-ef40-114f-a501-b8d8-1156-b0e9-d0e8.ngrok-free.app/api/classify-ingredient/x',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: task.ingredient_id, name: task.name }),
        }
      );

      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }

      const result = await response.json();

      // Update the ingredient with the result (e.g., classification status)
      const { error: updateError } = await supabase
        .from('ingredients')
        .update({ status: result.status }) // Adjust based on your webhook response
        .eq('id', task.ingredient_id);

      if (updateError) {
        throw updateError;
      }

      // Mark the task as processed
      await supabase
        .from('webhook_queue')
        .update({ processed: true })
        .eq('id', task.id);
    } catch (err) {
      console.error(`Failed to process task ${task.id}:`, err);
      // Optionally, log the error and continue with other tasks
    }
  }

  return new Response(JSON.stringify({ message: 'Processed tasks', count: tasks.length }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
});