use "npx" for CLI prefix
hide .env when npx supabase functions deploy classify-ingredient

## PRISMA MODEL

model WebhookQueue {
id Int @id @default(autoincrement())
ingredientId Int @map("ingredient_id")
name String
createdAt DateTime @default(now()) @map("created_at")
processed Boolean @default(false)

ingredient Ingredient @relation(fields: [ingredientId], references: [id])

@@map("webhook_queue")
}s

Step 1: Set Up the Trigger and Queue Table
First, create a table to queue tasks and a trigger to populate it when a row is inserted into ingredients.
Create the Queue Table
sql

CREATE TABLE webhook_queue (
id SERIAL PRIMARY KEY,
ingredient_id INT NOT NULL,
name TEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
processed BOOLEAN DEFAULT FALSE,
FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

Create the Trigger Function
This function adds a task to the queue whenever a new row is inserted into ingredients.
sql

CREATE FUNCTION queue_ingredient_webhook()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO webhook_queue (ingredient_id, name)
VALUES (NEW.id, NEW.name);
RETURN NEW;
END;

$$
LANGUAGE plpgsql;

Attach the Trigger
sql

CREATE TRIGGER after_insert_ingredient
AFTER INSERT ON ingredients
FOR EACH ROW EXECUTE FUNCTION queue_ingredient_webhook();

How It Works: When you insert a row into ingredients (e.g., INSERT INTO ingredients (name) VALUES ('Tomato');), the trigger fires and adds a row to webhook_queue with the ingredient_id and name.

# Step 2: Update Your Edge Function to Process the Queue
Your deployed Edge Function (classify-ingredient) should check the webhook_queue table, process unhandled tasks, and mark them as done. Here’s how to tweak it:
Updated Edge Function
typescript

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
        'https://5e80-2a0a-ef40-114f-a501-b8d8-1156-b0e9-d0e8.ngrok-free.app/api/classify-ingredient/x',
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

Changes:
Filters for processed = false to only handle new tasks.

Adds error handling to avoid crashing on individual task failures.

Marks tasks as processed instead of deleting them (optional—you could delete with .delete() if preferred).

Deploy the Updated Function
Save this to supabase/functions/classify-ingredient/index.ts and deploy:
bash

supabase functions deploy classify-ingredient

Step 3: Invoke the Edge Function
Since Edge Functions respond to HTTP requests, you need a way to trigger it when new rows are queued. Here are your options:
Option 1: Periodic Invocation with a Scheduler
Use an external scheduler (e.g., cron job, GitHub Actions, or a cloud service like AWS Lambda) to call the Edge Function every minute or so.

Example curl command:
bash

curl -X POST https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/classify-ingredient

Setup (e.g., GitHub Actions):
Create a .github/workflows/process-queue.yml:
yaml

name: Process Webhook Queue
on:
  schedule:
    - cron: '*/5 * * * *' # Every 5 minutes
jobs:
  process:
    runs-on: ubuntu-latest
    steps:
      - name: Call Edge Function
        run: |
          curl -X POST https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/classify-ingredient

Push this to your repo, and it’ll run automatically.

Option 2: Supabase Realtime (Less Ideal)
Supabase Realtime can listen to INSERT events on webhook_queue and trigger the Edge Function via a client-side app. However, this requires a frontend or external service to make the HTTP call, which might not fit your server-side goal.

Example (client-side JS):
javascript

supabase
  .channel('webhook_queue')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'webhook_queue' }, () => {
    fetch('https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/classify-ingredient', { method: 'POST' });
  })
  .subscribe();

Downside: Requires a running client, not fully autonomous.

Option 3: Trigger Calls Edge Function Directly
Use the http extension in PostgreSQL to call the Edge Function from the trigger. This is less reliable due to transaction timing (as we saw earlier) but possible:
sql

CREATE FUNCTION call_edge_function()
RETURNS TRIGGER AS
$$

BEGIN
PERFORM http_post(
'https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/classify-ingredient',
'{}',
'application/json'
);
RETURN NEW;
END;

$$
LANGUAGE plpgsql;

CREATE TRIGGER after_insert_ingredient
AFTER INSERT ON ingredients
FOR EACH ROW EXECUTE FUNCTION call_edge_function();

Caveat: If the Edge Function updates the row, you risk the same race condition unless delayed.

Recommendation
Option 1 (Periodic Scheduler) is the most robust:
Simple to set up.

Decouples the database from the Edge Function.

Handles failures gracefully (retries on next run).

# Step 4: Test It
Insert a row:
sql

INSERT INTO ingredients (name) VALUES ('Tomato');

Check the queue:
sql

SELECT * FROM webhook_queue;

You should see a row with ingredient_id, name: 'Tomato', and processed: false.

Manually trigger the Edge Function:
bash

curl -X POST https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/classify-ingredient

Verify:
webhook_queue row should update to processed: true.

ingredients row should have the updated status (or whatever your webhook returns).

Set up the scheduler to automate it.

Final Notes
Queue Cleanup: Add a cron job or function to delete old processed rows from webhook_queue if you don’t need them:
sql

DELETE FROM webhook_queue WHERE processed = true AND created_at < NOW() - INTERVAL '1 day';

Error Handling: The Edge Function logs errors but continues. Adjust to retry failed tasks if needed.

Scalability: The limit(10) ensures it doesn’t overload; increase if necessary.

Let me know if you need help setting up the scheduler or tweaking the function further! You’re almost there—great progress!


$$
