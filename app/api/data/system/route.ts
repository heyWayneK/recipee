/* TESTING:
      curl -X GET http://localhost:3000/api/data/system/ 
*/
/* FUTURE: CREATE INDEXES
CREATE INDEX idx_unit_type_name ON unit_type (name);
CREATE INDEX idx_unit_measurement_name ON unit_measurement (name);
-- Add indexes for other tables as needed
*/

"use server";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { GetStaticProps } from "next";

/* TESTING:
    curl "http://localhost:3000/api/example?name=test&id=123"

    curl -X POST http://localhost:3000/api/example \
     -H "Content-Type: application/json" \
     -d '{"id": "123", "name": "John"}'

     curl -X PUT http://localhost:3000/api/example

*/
// Filename: app/data/system/route.ts

interface ExampleResponseData {
  message: string;
  id: string | null; // Allow null if parameter might be missing (though we check below)
  name: string | null; // Allow null if parameter might be missing (though we check below)
}

/**
 * Handles GET requests to /api/example
 * Expects 'id' and 'name' query parameters.
 * Example: /api/example?id=123&name=test
 */
export async function GET(request: NextRequest) {
  try {
    const queries = {
      // unit_type: prisma.unit_type.findMany(),
      // unit_measurement: prisma.unit_measurement.findMany(),
      // prep_instructions: prisma.prep_instructions.findMany(),
      // raw_to_prepped_yields: prisma.raw_to_prepped_yields.findMany(),
      // cooked_yields_categories: prisma.cooked_yields_categories.findMany(),
      // cooked_yields: prisma.cooked_yields.findMany(),
      // dry_cooked_yields_categories: prisma.dry_cooked_yields_categories.findMany(),
      // dry_cooked_yields: prisma.dry_cooked_yields.findMany(),
      // ingredients_religious_certification: prisma.ingredients_religious_certification.findMany(),
      // language: prisma.language.findMany(),
      // country_locale: prisma.country_locale.findMany(),
      // ingredient_cooked_yields: prisma.ingredient_cooked_yields.findMany(),
      // ingredient_category_secondary: prisma.ingredient_category_secondary.findMany(),
      // dietary_classification: prisma.dietary_classification.findMany(),
      // ingredients_yields: prisma.ingredients_yields.findMany(),
      // allergy: prisma.allergy.findMany(),
      // recipe_mode: prisma.recipe_mode.findMany(),
      // recipe_type: prisma.recipe_type.findMany(),
      // oil_purpose: prisma.oil_purpose.findMany(),
      // salt_purpose: prisma.salt_purpose.findMany(),
      // todo_status: prisma.todo_status.findMany(),
      // cost_rules: prisma.cost_rules.findMany(),
      // markup_type: prisma.markup_type.findMany(),
      // ingredient_type: prisma.ingredient_type.findMany(),
      // packaging_costs_category_example: prisma.packaging_costs_category_example.findMany(),
      // packaging_costs_line_item_example: prisma.packaging_costs_line_item_example.findMany(),
      other_costs_category_example: prisma.other_costs_category_example.findMany(),
      other_costs_line_item_example: prisma.other_costs_line_item_example.findMany(),
      // other_costs_category: prisma.other_costs_category.findMany(),
      // packaging_costs_category: prisma.packaging_costs_category.findMany(),
      // vat_rules: prisma.vat_rules.findMany(),
    };

    const results = await Promise.all(Object.values(queries));
    const jsonObj = Object.fromEntries(Object.keys(queries).map((key, index) => [key, results[index]]));

    // Return the successful JSON response with a 200 OK status
    return NextResponse.json(jsonObj, { status: 200 });
  } catch (error) {
    // Log the error for server-side debugging
    console.error("Error processing GET request:", error);

    // Return a generic server error response with a 500 Internal Server Error status
    // Avoid sending detailed error messages to the client in production
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// FUTURE: CREATE INDEXES ON SUPERBASE
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
      supabase.from('unit_measurement').select('id, name'),
      // ... other tables
    ]).then((results) => results.map((result) => result.data));
    lastFetched = now;
  }
  return new Response(JSON.stringify(cachedData), {
    headers: { 'Content-Type': 'application/json' },
  });
});
*/
