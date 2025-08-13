"use server";

import { preCalculateData } from "@/libs/preCalculatedRecipeData";
import { NextResponse } from "next/server";
import { getSystemDataFunc2, getLiveRecipeData } from "./functions/system_user_recipe";
import { PreCalculatedRecipeData } from "@/types/recipeTypes";

// TODO: Do we need this
// import { GetStaticProps } from "next";

/* TESTING:________________________________________START::
 * curl -X GET http://localhost:3000/api/data/system/
 * http://localhost:3000/api/data/system
 * http://recipee.app/api/data/system
 * TESTING:________________________________________END::*/

export async function GET() {
  // TODO: Use orgId from session or request
  // TODO: get recipeId from request parameters
  const orgId = "1"; // Default customer ID
  const recipeId = "1234567890";
  try {
    const recipeData = await getLiveRecipeData(recipeId, orgId);
    const recipeLive = { data: recipeData[0] } as PreCalculatedRecipeData;
    const systemData = await getSystemDataFunc2(orgId);

    // Pre-calculate data arrays to build recipe UI
    const preCalcData = await preCalculateData(recipeLive, systemData);

    return NextResponse.json({ recipeData: { ...preCalcData, ...recipeLive }, systemData }, { status: 200 });
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json({ error: "Script or Server Error" }, { status: 500 });
  }
}

// FUTURE: CREATE INDEXES ON SUPERBASE
//
// FUTURE: POSSIBLY MAKE EDGE FUNCTION
/*
// supabase/functions/get-lookup-data.ts
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
);

let cachedData: any[] | null = null;
let lastFetched = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

serve(async (req) => {
  const now = Date.now();
  if (!cachedData || now - lastFetched > CACHE_DURATION) {
    cachedData = await Promise.all([
      supabase.from('unit_type').select('id, name'),
      supabase.from('unit_metric_imperial').select('id, name'),
      // ... other tables
    ]).then((results) => results.map((result) => result.data));
    lastFetched = now;
  }
  return new Response(JSON.stringify(cachedData), {
    headers: { 'Content-Type': 'application/json' },
  });
});
*/
