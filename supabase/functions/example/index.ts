// IMPORTANT: Supbase right need to be granted as follows:
//            GRANT SELECT, INSERT, UPDATE, DELETE ON public.webhook_queue TO authenticated, service_role;
// IMPORTANT: Ignore Deno errors, the server has a gobal Deno object

// DEPLOY:  FIRST change .env to .env___ to exclude ENV vars (DENO edge has global vars)
// DEPLOY:  npx supabase functions deploy <MY FUNCTION FOLDER NAME>
// INFO: IGNORE THE DENO WARNINGS
// INFO: Keep console logs for server side debugging and monitoring

// TESTING: USING POSTMAN
// TESTING:  https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/<MY FUNCTION NAME>?id=6&name=butter

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

console.log("Hello from Functions!");

// eslint-disable-next-line
Deno.serve(async (req) => {
  const { name } = await req.json();
  const data = {
    message: `Hello ${name}!`,
  };

  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:0/functions/v1/classify-ingredient' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
