"use server";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai"; //for X/grok too
// FUTURE: import { GoogleGenerativeAI } from "@google/generative-ai";

// FIXME: Add Jest and Cypres tests - based on server TotalTimeSecs < 15 seconds
// FIXME: 15 secs is the Vercel Max time limit (It can be longer, with MUCH higher pricing)
// import { all } from "cypress/types/bluebird";

/* TESTING: CHECK WHAT OPEN-AI MODELS ARE AVAILABLE TO MY ACCOUNT
 curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer OPENAI_API_KEY" */

// TESTING: XAI:  curl -X GET "https://api.x.ai/v1" -H "Authorization: Bearer OPENAI_API_KEY" -H "Content-Type: application/json"

// GENERIC role/content Ai Prompt [{}]
interface PromptMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
interface OpenAIPrompt {
  model: string; // e.g., "gpt-3.5-turbo" or "gpt-4"
  messages: PromptMessage[]; // {role, content}[]
  temperature?: number; // Optional: Controls randomness (0 to 2)
  max_tokens?: number; // Optional: Limits response length
  top_p?: number; // Optional: Nucleus sampling
  frequency_penalty?: number; // Optional: Penalizes repetition
  presence_penalty?: number; // sOptional: Encourages new topics
}

// GEMINI prompt/request
interface GeminiPrompt {
  model: string; // e.g., "gemini-pro" (hypothetical)
  messages: PromptMessage[]; // Array of messages
  temperature?: number; // Optional: Controls randomness (0 to 1 typically)
  maxTokens?: number; // Optional: Limits response length
  stream?: boolean; // Optional: Stream responses
}

type openAiModels = "gpt-4o-2024-05-13" | "gpt-4" | "gpt-3.5-turbo" | "gpt-4o-2024-05-13";

const sdks = {
  xai: { connect: new OpenAI({ apiKey: process.env.XAI_API_KEY, baseURL: "https://api.x.ai/v1" }), model: "grok-2-latest" },
  // FUTURE: Switch Models if Xai is not available
  // openai: { connect: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }), model: "gpt-4o-2024-05-13" },
  // gemini: { connect: new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!), model: "gemini-1.5-flash" },
};

type TSDK = "openai" | "xai" | "gemini";
let useSdk: TSDK = "xai"; // Default

// type TAllergyConnect = { id: number };
// type TIngredientObj = { ingredient: { connect: TAllergyConnect }; allergy: { connect: TAllergyConnect }; updated_at: Date };

// RELIGIOUS CERTIFICATION (kosher, halal)
// 0 :no, 1: yes, 2: unlikely, 3: likely 4: unknown
function matchReligiousCertId(name: string, religiousCertArray: { id: number; name: string }[]): number {
  const match = religiousCertArray.find((item) => item.name.toLowerCase() === name.toLowerCase());
  const id = match ? Number(match.id) : 4; // 4: unknown
  return id;
}

// ALLERGY IDS
function matchAllergyId(allergyArray: { id: number; name: string }[], allergies: string, ingredientId: number): any[] {
  let allergyObj: any[] = [];
  let allergiesSplit: string[] = []; // e.g. jsonData.allergies: "none" | "none|val1|val2" | ""

  // Split by "|"  or create aarray of one element
  if (allergies.includes("|")) {
    // Check if the string contains "|"
    allergiesSplit = allergies
      .split("|")
      .map((allergy: string) => allergy.trim().toLowerCase())
      .filter(Boolean); // Remove empty strings
  } else {
    allergiesSplit = [allergies];
  }

  for (let i = 0; i < allergiesSplit.length; i++) {
    // LOOP THROUGH STRINGS - MATCH ID
    // const allergyId: { id: number; name: string } | undefined = allergyArray.find((item) => item.name.toLowerCase() === allergiesSplit[i]);
    const allergyId = allergyArray.find((item) => item.name.toLowerCase() === allergiesSplit[i]);

    if (allergyId !== undefined) {
      allergyObj = [
        ...allergyObj,
        {
          ingredient_id: ingredientId,
          allergy_id: allergyId.id,
          updated_at: new Date(),
        },
      ];
    }
  }
  // Object returned for LOOKUP TABLE INSERT
  return allergyObj;
}

function matchDietaryCatId(dietaryCatArray: { id: number; name: string }[], dietaryCat: string): number {
  const match = dietaryCatArray.find((item) => item.name.toLowerCase() === dietaryCat.toLowerCase());
  const id = match ? Number(match.id) : 4; // 4: unknown
  return id;
}

function matchPrimaryCategoryId(primaryCatArray: { id: number; name: string }[], primaryCat: string): number {
  const match = primaryCatArray.find((item) => item.name.toLowerCase() === primaryCat.toLowerCase());
  const id = match ? Number(match.id) : 0; // 0: unknown
  return id;
}

// export async function handler(request: Request) {
export async function POST(request: Request) {
  try {
    const startTime = Date.now();
    let jsonData = null;
    let id: number;
    let name: string;
    // WHICH AI SDK TO USE
    useSdk = "xai";

    // Determine the HTTP method of the request
    const method = request.method;

    if (method === "POST") {
      const body = await request.json();
      if (!body.id || !body.name) NextResponse.json({ error: "Missing POST: id & name" }, { status: 400 });
      id = body?.id;
      name = body?.name;
      console.log("**POST id:", id, "name:", name);
      if (!id || !name) NextResponse.json({ error: "Missing id or name" }, { status: 400 });
      // TESTING: For testing in future using GET
      // TESTING: https://recipee.app/api/classify-ingredient/all?name=all%20bran%20Flakes&id=33
      // } else if (method === "GET") {
      //   const url = new URL(request.url);
      //   id = Number(url.searchParams.get("id"));
      //   name = url.searchParams.get("name") || "";Dietary category not found unknown
      //   if (!id || !name) {
      //     return NextResponse.json({ error: "GET method no supported - Missing id or name" }, { status: 400 });
      //   }
    } else {
      return NextResponse.json({ error: `Unsupported method: ${method}` }, { status: 405 });
    }

    // TODO: ADD TO PROMPT and DB
    // other >>
    // 1. unit_type fluid or Weight... or g's or ml's | kgs or L

    const prompt: PromptMessage[] = [
      {
        role: "system",
        content:
          "You are a food classification and nutrition expert. Cooked_yields values can be higher than 1 (e.g. rice and pasta). Alternative_names are for wholefoods that have other names (e.g. aubergine, eggplant).\n" +
          "Multiple Allergies can be returned as a pipe delimited list please e.g. (wheat|gluten)\n" +
          "unit_type defines how the ingredient is typically measured or sold, its a suggestion to measure by weight (g,kg,lbs,oz), fluid (mL, L, fl oz) or each (products like eggs, or garnish like bay leaf) \n" +
          "Provide a JSON response with no extra text, following this structure:\n" +
          `Rules for halal classification:
          - Pork and its derivatives (e.g., bacon, ham, sausage from pork) are always haram, so "halal" must be "no".
          - Meat is halal ("likely") only if from a permissible animal (e.g., cow, sheep, chicken) and slaughtered per Islamic guidelines (blessing said, blood drained).
          - If the ingredients source or preparation is unclear, use "unknown".
          - Non-meat items (e.g., vegetables, fruits) are halal ("yes") unless contaminated with haram substances (e.g., alcohol, pork fat).
          Examples:
          - "pork bacon": {"religious_certification": {"halal": "no"}}
          - "turkey bacon": {"religious_certification": {"halal": "yes"}} (assume halal slaughter if unspecified)
          - "meat": {"religious_certification": {"halal": "unknown"}} (lacks details)
          Base your response on reliable Islamic dietary laws and nutritional data.\n` +
          "{\n" +
          '  "primary_category": "alcoholic_beverages|baking_ingredients|broths_stocks|condiments_sauces|dairy|eggs|fats_oils|fermented_foods|flavorings_extracts|fruits|grains_cereals|herbs_spices|legumes|meat|mushrooms|non_alcoholic_beverages|nuts_seeds|other|pasta_noodles|plant_based_proteins|poultry|seafood|seaweed|sugars_sweeteners|vegetables|vitamins_minerals_supplements|water" ,\n' +
          '  "name_correct_spelling": "<string>",\n' +
          '  "secondary_category": "<string>",\n' +
          '  "dietary_classification": "vegan|vegetarian|animal_product|unknown",\n' +
          '  "allergies": "unknown|none|buckwheat|celery|chilli|eggs|garlic|gluten|lupin|milk_dairy|mustard|peanuts|rice|seafood_fish|sesame|shellfish|soybeans|sulphur_dioxide|tree_nuts|wheat|nightshade",\n' +
          '  "unit_type": "weight|fluid|each",\n' +
          '  "nutritional_data": {\n' +
          '    "kcal_per_100g": <number>,\n' +
          '    "kj_per_100g": <number>,\n' +
          '    "protein_per_100g": <number>,\n' +
          '    "fat_per_100g": <number>,\n' +
          '    "saturated_fat_per_100g": <number>,\n' +
          '    "monounsaturate_per_100g": <number>,\n' +
          '    "polyunsaturate_per_100g": <number>,\n' +
          '    "trans_fats_per_100g": <number>,\n' +
          '    "omega3_per_100g": <number>,\n' +
          '    "omega6_per_100g": <number>,\n' +
          '    "omega9_per_100g": <number>,\n' +
          '    "carbs_per_100g": <number>,\n' +
          '    "net_carbs_per_100g": <number>,\n' +
          '    "carbohydrates_per_100g": <number>,\n' +
          '    "total_sugar_per_100g": <number>,\n' +
          '    "added_sugar_per_100g": <number|null>,\n' +
          '    "artificial_sugar_per_100g": <number|null>,\n' +
          '    "fibre_per_100g": <number>,\n' +
          '    "starch_per_100g": <number|null>,\n' +
          '    "salt_per_100g": <number>,\n' +
          '    "sodium_per_100g": <number>\n' +
          "  },\n" +
          '  "raw_to_prepped_yields": {\n' +
          '    "whole": <number>,\n' +
          '    "peeled": <number>,\n' +
          '    "peeled_and_cored": <number>,\n' +
          '    "diced": <number>,\n' +
          '    "sliced": <number>,\n' +
          '    "grated": <number>\n' +
          "  },\n" +
          '  "cooked_yields": {\n' +
          '    "raw": <number>,\n' +
          '    "cooked": <number>,\n' +
          '    "deep_fry": <number>,\n' +
          '    "shallow_fry": <number>,\n' +
          '    "boiled": <number>,\n' +
          '    "roasted": <number>,\n' +
          "  },\n" +
          '  "religious_certification": {\n' +
          '    "kosher": "no|yes|likely|unlikely|unknown",\n' +
          '    "halal": "no|yes|likely|unlikely|unknown",\n' +
          "  },\n" +
          '  "alternative_names": {\n' +
          '    "names_alt": <string>,\n' +
          "  },\n" +
          '  "confidence": <number> // 0 to 1, e.g., 0.95 for 95% confidence\n' +
          "}\n" +
          "Use 0 for unknown numeric values and null for optional fields if unknown. Base your response on reliable nutritional data where possible.",
      },
      {
        role: "user",
        content: `Classify and analyze "${name}".`,
      },
    ];

    if (useSdk === "xai") {
      // X Ai to classify the ingredient and get nutritional data
      const response = await sdks.xai.connect.chat.completions.create({
        model: sdks.xai.model,
        stream: false,
        messages: prompt,
        temperature: 0.3, // Lows temperature for consistency
      });

      jsonData = JSON.parse(response.choices[0].message.content ?? "{}");

      console.log(`jsonData: ${JSON.stringify(jsonData)}`);
    }
    // FUTURE: Switch Models if Xai is not available
    // else if (useSdk === "openai") {
    //   const response = await sdks.openai.connect.chat.completions.create(
    //     {
    //       model: sdks.openai.model,
    //       messages: prompt,
    //       temperature: 0.3,
    //       // max_tokens: 150,
    //     },
    //     {
    //       headers: {
    //         organization: "org-qqfxsQUxiycsDzEmw7bCxleY",
    //         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   jsonData = JSON.parse(response.choices[0].message.content?.replace("```json\n", "").replace("\n```", "") ?? "{}");
    // } else if (useSdk === "gemini") {
    //   const genAI = sdks.gemini.connect;
    //   const model = genAI.getGenerativeModel({ model: sdks.gemini.model });
    //   const response = await model.generateContent(JSON.stringify(prompt));
    //   jsonData = JSON.parse(response.response.text().replace("```json\n", "").replace("\n```", ""));
    // }

    if (!jsonData) NextResponse.json({ message: "Fail", error: `No data returned from ${sdks[useSdk].model} Ai` });

    // CORRECT SPELLING OF INGREDIENT NAME to most common spelling or use the original names
    const name_correct_spelling = jsonData?.name_correct_spelling;

    if (!name_correct_spelling) {
      return NextResponse.json({ error: "no name_correct_spelling" });
    } else {
      console.log("OK name_correct_spelling:", name_correct_spelling);
    }

    // Execute all database queries concurrently using Promise.all
    // GET id/name arrays for relational checks
    const [primaryCatArray, allergyArray, religiousCertArray, dietaryCatArray, correctSpellingNameExists] = await Promise.all([
      // INGREDIENT CATEGORY e.g. Vegetable, Fruit, Meat, etc.
      prisma.ingredient_category_primary.findMany({
        select: {
          id: true,
          name: true,
        },
      }),

      // ALLERGIES
      prisma.allergy.findMany({
        select: {
          id: true,
          name: true,
        },
      }),

      // RELIGIOUS CERTIFICATION e.g. kosher, halal
      prisma.ingredients_religious_certification.findMany({
        select: {
          id: true,
          name: true,
        },
      }),

      // DIET CATEGORY e.g. vegan, vegetarian, animal_product, unknown
      prisma.dietary_classification.findMany({
        select: {
          id: true,
          name: true,
        },
      }),

      // DOES CORRECT SPELLING OF INGREDIENT NAME ALREADY EXIST IN THE DATABASE, not current id
      prisma.ingredients.findFirst({
        select: {
          id: true,
        },
        where: {
          name: name_correct_spelling,
          id: {
            not: id,
          },
        },
      }),
    ]);

    // WAS ARRAY DATA RETURNED
    if (!primaryCatArray || primaryCatArray.length === 0) {
      return NextResponse.json({ error: "no data from ingredient_category_primary" });
    } else {
      console.log("OK primaryCatArray:", primaryCatArray);
    }
    // WAS ARRAY DATA RETURNED
    if (!allergyArray || allergyArray.length === 0) {
      return NextResponse.json({ error: "no data from allergy" });
    } else {
      console.log("OK allergyArray:", allergyArray);
    }
    // WAS ARRAY DATA RETURNED
    if (!religiousCertArray || religiousCertArray.length === 0) {
      return NextResponse.json({ error: "no data from ingredients_religious_certification" });
    } else {
      console.log("OK religiousCertArray:", religiousCertArray);
    }
    // WAS ARRAY DATA RETURNED
    if (!dietaryCatArray || dietaryCatArray.length === 0) {
      return NextResponse.json({ error: "no data from dietary_classification" });
    } else {
      console.log("OK dietaryCatArray:", dietaryCatArray);
    }

    // WAS NAME MATCHED TO id: number
    const primaryCategoryId: number = matchPrimaryCategoryId(primaryCatArray, jsonData.primary_category);
    if (primaryCategoryId === undefined || primaryCategoryId === null) {
      console.log("Primary category not found");
      return NextResponse.json({ error: "Primary category not found" });
    } else {
      console.log("OK Primary category id:", primaryCategoryId);
    }

    const kosherId: number = matchReligiousCertId(jsonData.religious_certification.kosher, religiousCertArray);
    if (kosherId === undefined || kosherId === null) {
      console.log("Kosher id not found");
      return NextResponse.json({ error: "Kosher id not found" });
    } else {
      console.log("OK Kosher id:", kosherId);
    }

    const halalId: number = matchReligiousCertId(jsonData.religious_certification.halal, religiousCertArray);
    if (halalId === undefined || halalId === null) {
      console.log("Halal id not found");
      return NextResponse.json({ error: "Halal id not found" });
    } else {
      console.log("OK Halal id:", halalId);
    }

    let dietaryCatArrayId: number = matchDietaryCatId(dietaryCatArray, jsonData.dietary_classification);
    if (dietaryCatArrayId === null || dietaryCatArrayId === undefined) {
      console.log("Dietary category not found", jsonData.dietary_classification);
      // INFO: This shouldnt happen, but if it does, set to 0
      dietaryCatArrayId = 0;
      return NextResponse.json({ error: `Dietary category not found ${jsonData.dietary_classification}` });
    } else {
      console.log("OK Dietary category id:", dietaryCatArrayId);
    }

    console.log("Correct Spelling Name Exists. VALUE:", correctSpellingNameExists);

    // CHECK IF INGREDIENT NAME (CORRECT SPELLING) IS ALREADY IN THE DATABASE
    if (correctSpellingNameExists !== null) {
      // IF CORRECT SPELLING OF INGREDIENT NAME ALREADY EXISTS IN THE DATABASE DELETE THE INGREDIENT
      await prisma.ingredients.update({
        where: { id: id },
        data: {
          name: `DELETE - name exists: ${name}`,
          deleted: true,
        },
      });
      // FUTURE: Allow Customers to use the customers original name
      return NextResponse.json({ error: `Corrected Name Already Exists in Ingredients Table. orig: ${name}, corrected: ${name_correct_spelling}` }, { status: 200 });
    } else {
      console.log("OK Corrected Name does not exist");
    }

    // INSERT INGREDIENT data into the ingredients table
    const ingredient: { id: number } = await prisma.ingredients.update({
      where: { id },
      data: {
        // FIXME: name should not be updated on the update
        name: name_correct_spelling || name,
        name_orig: name,
        names_alt: jsonData.alternative_names.names_alt.split("|").join(",") || "",
        primary_category: { connect: { id: primaryCategoryId } },
        secondary_category: jsonData.secondary_category || "",
        updated_at: new Date(),
        dietary_classification: { connect: { id: dietaryCatArrayId || 0 } },
        kosher: { connect: { id: kosherId } },
        halal: { connect: { id: halalId } },
        confidence: jsonData.confidence || 0,
        // FUTURE: only true if a super admin account
        is_default: true,
        ai_model: sdks[useSdk].model,
      },
      select: {
        id: true,
      },
    });

    if (!ingredient) {
      console.log("Ingredient not found");
      return NextResponse.json({ error: "Ingredient not found" });
    } else {
      console.log("OK Ingredient:", ingredient);
    }

    if (!jsonData.cooked_yields) {
      console.log("Cooked yields not found");
      return NextResponse.json({ error: "Cooked yields not found" });
    } else {
      console.log("OK Cooked yields:", jsonData.cooked_yields);
    }

    if (!jsonData.nutritional_data) {
      console.log("Nutritional data not found");
      return NextResponse.json({ error: "Nutritional data not found" });
    } else {
      console.log("OK Nutritional data:", jsonData.nutritional_data);
    }

    if (!jsonData.raw_to_prepped_yields) {
      console.log("Raw to prepped yields not found");
      return NextResponse.json({ error: "Raw to prepped yields not found" });
    } else {
      console.log("OK Raw to prepped yields:", jsonData.raw_to_prepped_yields);
    }

    const allergyObj = matchAllergyId(allergyArray, jsonData.allergies, ingredient.id);
    if (!allergyObj) {
      console.log("Allergy object not found");
      return NextResponse.json({ error: "Allergy object not found" });
    } else {
      console.log("OK Allergy object:", allergyObj);
    }

    // DELETE ALLERGY allergy_ingredient table
    await prisma.allergy_ingredient.deleteMany({
      where: {
        ingredient_id: ingredient.id,
      },
    });

    console.log("Cleared Any Existing Allergies in allergy_ingredient");
    console.log("Start Upserting Data for promise");

    await Promise.all([
      // UPSERT COOKED YIELDS into the cooked_yields table
      prisma.ingredient_cooked_yields.upsert({
        where: { ingredients_id: ingredient.id },
        create: {
          ingredients_id: ingredient.id,
          raw: jsonData.cooked_yields?.raw || 1,
          cooked: jsonData.cooked_yields?.cooked || 0,
          deep_fry: jsonData.cooked_yields?.deep_fry || 0,
          shallow_fry: jsonData.cooked_yields?.shallow_fry || 0,
          boiled: jsonData.cooked_yields?.boiled || 0,
          roasted: jsonData.cooked_yields?.roasted || 0,
        },
        update: {
          raw: jsonData.cooked_yields?.raw || 1,
          cooked: jsonData.cooked_yields?.cooked || 0,
          deep_fry: jsonData.cooked_yields?.deep_fry || 0,
          shallow_fry: jsonData.cooked_yields?.shallow_fry || 0,
          boiled: jsonData.cooked_yields?.boiled || 0,
          roasted: jsonData.cooked_yields?.roasted || 0,
        },
      }),
      // UPSERT NUTRITIONAL DATA into the ingredients_nutrition table
      prisma.ingredients_nutrition.upsert({
        where: { ingredients_id: ingredient.id },
        create: {
          ingredients_id: ingredient.id,
          kcal_per_100g: jsonData.nutritional_data?.kcal_per_100g || 0,
          kj_per_100g: jsonData.nutritional_data?.kj_per_100g || 0,
          protein_per_100g: jsonData.nutritional_data?.protein_per_100g || 0,
          fat_per_100g: jsonData.nutritional_data?.fat_per_100g || 0,
          saturated_fat_per_100g: jsonData.nutritional_data?.saturated_fat_per_100g || 0,
          monounsaturate_per_100g: jsonData.nutritional_data?.monounsaturate_per_100g || 0,
          polyunsaturate_per_100g: jsonData.nutritional_data?.polyunsaturate_per_100g || 0,
        },
        update: {
          kcal_per_100g: jsonData.nutritional_data?.kcal_per_100g || 0,
          kj_per_100g: jsonData.nutritional_data?.kj_per_100g || 0,
          protein_per_100g: jsonData.nutritional_data?.protein_per_100g || 0,
          fat_per_100g: jsonData.nutritional_data?.fat_per_100g || 0,
          saturated_fat_per_100g: jsonData.nutritional_data?.saturated_fat_per_100g || 0,
          monounsaturate_per_100g: jsonData.nutritional_data?.monounsaturate_per_100g || 0,
          polyunsaturate_per_100g: jsonData.nutritional_data?.polyunsaturate_per_100g || 0,
        },
      }),
      // UPSERT RAW TO PREPPED YIELDS into the raw_to_prepped_yields table
      prisma.raw_to_prepped_yields.upsert({
        where: { ingredients_id: ingredient.id },
        create: {
          ingredients_id: ingredient.id,
          whole: jsonData.raw_to_prepped_yields?.whole || 0,
          peeled: jsonData.raw_to_prepped_yields?.peeled || 0,
          peeled_and_cored: jsonData.raw_to_prepped_yields?.peeled_and_cored || 0,
          diced: jsonData.raw_to_prepped_yields?.diced || 0,
          sliced: jsonData.raw_to_prepped_yields?.sliced || 0,
          grated: jsonData.raw_to_prepped_yields?.grated || 0,
        },
        update: {
          whole: jsonData.raw_to_prepped_yields?.whole || 0,
          peeled: jsonData.raw_to_prepped_yields?.peeled || 0,
          peeled_and_cored: jsonData.raw_to_prepped_yields?.peeled_and_cored || 0,
          diced: jsonData.raw_to_prepped_yields?.diced || 0,
          sliced: jsonData.raw_to_prepped_yields?.sliced || 0,
          grated: jsonData.raw_to_prepped_yields?.grated || 0,
        },
      }),
      // INSERT ALLERGY INGREDIENTS into the allergy_ingredient table
      prisma.allergy_ingredient.createMany({
        data: allergyObj,
      }),
    ]);

    const totalTimeSecs = (Date.now() - startTime) / 1000 + " seconds";
    console.log("Total time taken:", totalTimeSecs);

    return NextResponse.json({ message: "Success", timer: totalTimeSecs, resultJson: jsonData }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook error:", error);

    if (error.status === 429) {
      //  insert error into slack and or email/whatsapp
      console.log("Out of Xai credits", error?.message);
    }
    return NextResponse.json({ error: "Failure - errors" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    console.log("GET METHOD - Use POST instead");
    // Handle GET request
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id"));
    const name = url.searchParams.get("name");
    if (!id || !name) {
      return NextResponse.json({ error: "USE POST instead - Missing id or name" }, { status: 400 });
    }
    // Process the webhook payload
    return NextResponse.json({ message: `Error - USE POST INSTEAD` }, { status: 200 });
  } catch (error) {
    // Determine the HTTP method of the request
    return NextResponse.json({ error: `Error - Please use POST` }, { status: 405 });
  }
}

// export async function POST(request: Request) {
