"use server";

import { preCalculateData } from "@/libs/preCalculatedRecipeData";
import { NextResponse } from "next/server";
import { getSystemDataFunc2, getRecipeDataFunc2, getLiveRecipeData } from "./functions/system_user_recipe";

// TODO: Do we need this
// import { GetStaticProps } from "next";

/* TESTING:________________________________________START::
 * curl -X GET http://localhost:3000/api/data/system/
 * http://localhost:3000/api/data/system
 * http://recipee.app/api/data/system
 * TESTING:________________________________________END::*/

// / DEFINE PRECALCULATED RECIPE DATA
//- These contain the calulated recipe subTotals, Totals and
//- lookup values like markup, or the cost of other costs etc

// // INFO: This is the initial state of the recipe data - empty arrays
// export const preCalculatedRecipeData: PreCalculatedRecipeData = {
//   portionSizes: [],
//   portionIds: [],
//   componentsWeights: [],
//   componentsNamesArray: [],
//   componentsIDArray: [],
//   componentsPricePer1000: [],
//   componentsPrices: [],
//   componentsPricesDesc: [],
//   componentsSubTotalsPrices: [],
//   packingCostPriceTotals: [],
//   packingCostPriceRules: [],
//   otherCostsPriceTotals: [],
//   otherCostsPriceRules: [],
//   costsSubTotals: [],
//   markUpPriceAmounts: [],
//   markUpPriceRules: [],
//   salePricesExVat: [],
//   salesPricesIncVat: [],
//   vatRuleIds: [],
//   vatRulePercs: [],
//   vatRuleNames: [],

//   // Create a deep copy of the data object (Recipe Data)
//   data: JSON.parse(JSON.stringify(data)),
// };

export async function GET() {
  const orgId = "1"; // Default customer ID
  try {
    const recipeData2 = await getLiveRecipeData("1234567890", "1"); // Using a static recipe UUID for demo purposes
    const recipeLive = { data: recipeData2[0] };
    const recipeData = await getRecipeDataFunc2();
    const systemData = await getSystemDataFunc2(orgId);

    const preCalcData = await preCalculateData({ ...recipeData, ...recipeLive }, systemData);
    // const preCalcData = await preCalculateData(recipeData, systemData);
    // const preCalcData = await preCalculateData(recipeData, systemData);
    // return { recipeData: { ...recipeData, ...preCalcData, ...recipeLive }, systemData };

    // Update the precalulated recipe data with the full recipe data
    return NextResponse.json({ recipeData: { ...recipeData, ...preCalcData, ...recipeLive }, systemData }, { status: 200 });
    // return NextResponse.json({ hello: "world" }, { status: 200 });
  } catch (error) {
    // Log the error for server-side debugging
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
