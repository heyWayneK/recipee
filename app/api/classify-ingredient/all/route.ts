"use server";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai"; //for X too
// import { GoogleGenerativeAI } from "@google/generative-ai";

// Define the message structure
interface PromptMessage {
  role: "system" | "user" | "assistant"; // Roles typically used in Open AI APIss
  content: string; // The text content of the message
}
// Define the prompt/request structure
interface OpenAIPrompt {
  model: string; // e.g., "gpt-3.5-turbo" or "gpt-4"
  messages: PromptMessage[]; // Array of messages for the conversation
  temperature?: number; // Optional: Controls randomness (0 to 2)
  max_tokens?: number; // Optional: Limits response length
  top_p?: number; // Optional: Nucleus sampling
  frequency_penalty?: number; // Optional: Penalizes repetition
  presence_penalty?: number; // sOptional: Encourages new topics
}

// Define the Gemini prompt/request structure
interface GeminiPrompt {
  model: string; // e.g., "gemini-pro" (hypothetical)
  messages: PromptMessage[]; // Array of messages
  temperature?: number; // Optional: Controls randomness (0 to 1 typically)
  maxTokens?: number; // Optional: Limits response length
  stream?: boolean; // Optional: Stream responses
}
type openAiModels = "gpt-4o-2024-05-13" | "gpt-4" | "gpt-3.5-turbo" | "gpt-4o-2024-05-13";
// INFO: CHECK WHAT OPEN AI MODEL IS AVAILABLE
/* curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer OPENAI_API_KEY" */
const sdks = {
  // openai: { connect: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }), model: "gpt-4o-2024-05-13" },

  xai: { connect: new OpenAI({ apiKey: process.env.XAI_API_KEY, baseURL: "https://api.x.ai/v1" }), model: "grok-2-latest" },

  // gemini: { connect: new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!), model: "gemini-1.5-flash" },
};
type TSDK = "xai";
// type TSDK = "openai" | "xai" | "gemini";
const useSdk: TSDK = "xai"; // "openai" | "xai" | "gemini"

// OPEN AI
// const xai = ;
// const model = "gpt-4o";
// const ai = "openai";

// X AI
// const xai = new OpenAI({ apiKey: process.env.XAI_API_KEY, baseURL: "https://api.x.ai/v1" });
// const model = "grok-2-latest;
// const ai = "xai";
// INFO TESTING: curl -X GET "https://api.x.ai/v1" -H "Authorization: Bearer OPENAI_API_KEY" -H "Content-Type: application/json"

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const ai = "gemini";

// const xai = new Anthropic({
//   apiKey: process.env.XAI_API_KEY,
//   baseURL: "https://api.x.ai/",
// });

type TAllergyConnect = { id: number };
type TIngredientObj = { ingredient: { connect: TAllergyConnect }; allergy: { connect: TAllergyConnect }; updated_at: Date };

// getReligiousCertIdByName()
// Matching likelyhood of having religious certification (kosher, halal)
// 0 :no, 1: yes, 2: unlikely, 3: likely 4: unknown
function getReligiousCertIdByName(name: string, religiousCertArray: { id: number; name: string }[]): number {
  const match = religiousCertArray.find((item) => item.name.toLowerCase() === name.toLowerCase());
  const id = match ? Number(match.id) : 4; // 4: unknown
  return id;
}

// export async function handler(request: Request) {
export async function POST(request: Request) {
  try {
    // console.log("X Ai initialized>>>>>:", xai);

    // if (!xai) {
    //   return Response.json({ error: "X Ai not initialized" }, { status: 500 });
    // }

    let id: number | null = null;
    let name: string | null = null;

    // Determine the HTTP method of the request
    const method = request.method;

    if (method === "POST") {
      // Handle POST request
      const body = await request.json();
      id = body.id;
      name = body.name;
    } else if (method === "GET") {
      // Handle GET request
      const url = new URL(request.url);
      id = Number(url.searchParams.get("id"));
      name = url.searchParams.get("name");
      // Process the webhook payload
      // return NextResponse.json({ message: `GET METHOD name: ${name}, id: ${id}` }, { status: 200 });
    } else {
      // Unsupported HTTP method
      return NextResponse.json({ error: `Unsupported method: ${method}` }, { status: 405 });
    }

    console.log("1.>>>>>>>>>>>>>>>>>>>>id:", id, "name:", name);

    if (!id || !name) {
      return NextResponse.json({ error: "Missing id or name" }, { status: 400 });
    }

    console.log("2.>>>>>>>>>>>>>>>>>>>>s Start Prompts id");

    const prompt: PromptMessage[] = [
      {
        role: "system",
        content:
          "You are a food classification and nutrition expert. Cooked_yields values can be higher than 1 (e.g. rice and pasta). Alternative_names are for wholefoods that have other names (e.g. aubergine, eggplant). Provide a JSON response with no extra text, following this structure:\n" +
          `Rules for halal classification:
          - Pork and its derivatives (e.g., bacon, ham, sausage from pork) are always haram, so "halal" must be "no".
          - Meat is halal ("likely") only if from a permissible animal (e.g., cow, sheep, chicken) and slaughtered per Islamic guidelines (blessing said, blood drained).
          - If the ingredient’s source or preparation is unclear, use "unknown".
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
    console.log("3.>>>>>>>>>>>>>>>>>>>>s  useSdk:", useSdk);

    let jsonData = null;
    if (useSdk === "xai") {
      // X Ai to classify the ingredient and get nutritional data
      console.log("4.>>>>>>>>>>>>>>>>>>>> Start X Ai");
      const response = await sdks.xai.connect.chat.completions.create({
        model: sdks.xai.model,
        stream: false,
        messages: prompt,
        temperature: 0.3, // Lows temperature for consistency
      });
      console.log("5.>>>>>>>>>>>>>>>>>>>> Response:", response);
      jsonData = JSON.parse(response.choices[0].message.content ?? "{}");
      console.log("6.>>>>>>>>>>>>>>>>>>>> Json:", jsonData);
    } else if (useSdk === "openai") {
      // const response = await sdks.openai.connect.chat.completions.create(
      //   {
      //     model: sdks.openai.model,
      //     messages: prompt,
      //     temperature: 0.3,
      //     // max_tokens: 150,
      //   },
      //   {
      //     headers: {
      //       organization: "org-qqfxsQUxiycsDzEmw7bCxleY",
      //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // jsonData = JSON.parse(response.choices[0].message.content?.replace("```json\n", "").replace("\n```", "") ?? "{}");
    } else if (useSdk === "gemini") {
      // const genAI = sdks.gemini.connect;
      // const model = genAI.getGenerativeModel({ model: sdks.gemini.model });
      // const response = await model.generateContent(JSON.stringify(prompt));
      // jsonData = JSON.parse(response.response.text().replace("```json\n", "").replace("\n```", ""));
    }

    console.log("jsonData>>>>>>>>>>>>>>>:", jsonData);

    // FIXME: CHECK ID EMPTY
    if (!jsonData) {
      return NextResponse.json({ message: "GET request FAIL", error: "No data returned from X Ai" });
    }

    // CORRECT SPELLING OF INGREDIENT NAME to most common spelling or use the original name
    const name_correct_spelling = jsonData.name_correct_spelling || name;

    // FIXME: CHECK IF INGREDIENT NAME (CORRECT SPELLING) IS ALREADY IN THE DATABASE
    // const existingIngredient = await prisma.ingredients.findFirst({
    //   where: {
    //     name: name_correct_spelling,
    //   },
    // });
    // if (existingIngredient) {
    //   // Handle the case when the ingredient already exists in the database
    //   return res.status(400).json({ error: "Ingredient already exists in the database" });
    //   // return NextResponse.json({ message: "Ingredient already exists in the database" });
    // }

    // CHECK INGREDIENT PRIMARY CATEGORY ID or SET TO ZERO (UNKNOWN)
    const ingredientCategory = await prisma.ingredient_category_primary.findFirst({
      select: {
        id: true,
      },
      where: {
        name: jsonData.primary_category,
      },
    });
    const ingredientCategoryId: number = ingredientCategory?.id || 0;

    console.log("ingredientCategoryId>>>>>>>>>>>>>>>:", ingredientCategoryId);

    // CHECK INGREDIENT DIET CATEGORY (veg, vegan, animal_product) or SET TO ZERO (UNKNOWN)
    const dietaryCategory = await prisma.dietary_classification.findFirst({
      select: {
        id: true,
      },
      where: {
        name: jsonData.dietary_classification,
      },
    });
    const dietaryCategoryId: number = dietaryCategory?.id || 0;

    console.log("dietaryCategoryId>>>>>>>>>>>>>>>:", dietaryCategoryId);

    // CHECK ALLERGY or SET TO UNKNOWN : 0
    // FIXME: multiple allergies
    const allergyList = await prisma.allergy.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        name: jsonData.allergies,
      },
    });

    console.log("allergyList>>>>>>>>>>>>>>>:", allergyList);

    // GET RELIGIOUS CERTIFICATION ID array
    const religiousCertificationArray = await prisma.ingredients_religious_certification.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log("religiousCertificationArray>>>>>>>>>>>>>>>:", religiousCertificationArray);

    // INSERT INGREDIENT data into the ingredients table
    const ingredient: { id: number } = await prisma.ingredients.update({
      where: { id },
      data: {
        // FIXME: name should not be updated on the update
        name: name_correct_spelling,
        name_orig: name,
        names_alt: jsonData.alternative_names.names_alt || "",
        primary_category: { connect: { id: ingredientCategoryId } },
        secondary_category: jsonData.secondary_category || "",
        updated_at: new Date(),
        // Dietary Classification: vegan|vegetarian|animal_product|unknown
        dietary_classification: { connect: { id: dietaryCategoryId } },
        // Kosher
        kosher: { connect: { id: getReligiousCertIdByName(jsonData.religious_certification.kosher, religiousCertificationArray) } },
        // Halal
        halal: { connect: { id: getReligiousCertIdByName(jsonData.religious_certification.halal, religiousCertificationArray) } },
        confidence: jsonData.confidence || 0,
        // FUTURE: only true if a super admin account
        is_default: true,
        ai_model: sdks[useSdk].model,
      },
      select: {
        id: true,
      },
    });

    console.log("ingredient>>>>>>>>>>>>>>>:", ingredient);

    // INSERT COOKED YIELDS into the cooked_yields table
    await prisma.ingredient_cooked_yields.create({
      data: {
        ingredients_id: ingredient.id,
        raw: jsonData.cooked_yields.raw || 1,
        cooked: jsonData.cooked_yields.cooked || 0,
        deep_fry: jsonData.cooked_yields.deep_fry || 0,
        shallow_fry: jsonData.cooked_yields.shallow_fry || 0,
        boiled: jsonData.cooked_yields.boiled || 0,
        roasted: jsonData.cooked_yields.roasted || 0,
      },
    });

    console.log("INSERT ingredient_cooked_yields"); // INSERT NUTRITIONAL DATA into the ingredients_nutrition table

    await prisma.ingredients_nutrition.create({
      data: {
        ingredients_id: ingredient.id,
        kcal_per_100g: jsonData.nutritional_data.kcal_per_100g || 0,
        kj_per_100g: jsonData.nutritional_data.kj_per_100g || 0,
        protein_per_100g: jsonData.nutritional_data.protein_per_100g || 0,
        fat_per_100g: jsonData.nutritional_data.fat_per_100g || 0,
        saturated_fat_per_100g: jsonData.nutritional_data.saturated_fat_per_100g || 0,
        monounsaturate_per_100g: jsonData.nutritional_data.monounsaturate_per_100g || 0,
        polyunsaturate_per_100g: jsonData.nutritional_data.polyunsaturate_per_100g || 0,
      },
    });

    console.log("INSERT ingredient_nutrition"); // INSERT NUTRITIONAL DATA into the ingredients_nutrition table

    // Insert data into the raw_to_prepped_yields table
    await prisma.raw_to_prepped_yields.create({
      data: {
        ingredients_id: ingredient.id,
        whole: jsonData.raw_to_prepped_yields.whole || 0,
        peeled: jsonData.raw_to_prepped_yields.peeled || 0,
        peeled_and_cored: jsonData.raw_to_prepped_yields.peeled_and_cored || 0,
        diced: jsonData.raw_to_prepped_yields.diced || 0,
        sliced: jsonData.raw_to_prepped_yields.sliced || 0,
        grated: jsonData.raw_to_prepped_yields.grated || 0,
      },
    });

    console.log("INSERT raw_to_prepped_yelds"); // INSERT NUTRITIONAL DATA into the ingredients_nutrition table

    // ALLERGIES LOOKUP TABLE
    // INSERT ALLERGIES INTO THE INGREDIENTS_ALLERGY TABLE
    // jsonData.allergies: "none" | "none|val1|val2" | even ""
    let allergies: string[] = [];
    const a = jsonData.allergies;

    // Split by "|" regardless of content, then filter invalid values
    allergies = a
      .split("|")
      .map((allergy: string) => allergy.trim().toLowerCase()) // Normalize case and whitespace
      .filter(Boolean); // Remove empty strings

    // let allergyObj: allergy_ingredientCreateManyInput[] = [];
    // let allergyObj = Prisma.allergy_ingredientCreateManyInput[];
    let allergyObj = [];
    // let allergyObj: TIngredientObj[] = [];
    // data: Prisma.allergy_ingredientCreateManyInput | Prisma.allergy_ingredientCreateManyInput[]
    // allergy_ingredientCreateManyInput | allergy_ingredientCreateManyInput[]

    /* 
    export type allergy_ingredientCreateManyInput = {
      id?: number
      allergy_id: number
      ingredient_id: number
      created_at?: Date | string
      updated_at?: Date | string | null
    }
    */

    // CLASSIFY MULTIPLE ALLERGIES
    if (allergies.length > 0 && allergyList.length > 0) {
      for (let i = 0; i < allergies.length; i++) {
        // GET ALLERGY ID
        const allergyId: { id: number; name: string } | undefined = allergyList.find((item) => item.name.toLowerCase() === allergies[i]);
        if (allergyId !== undefined && ingredient.id !== undefined) {
          allergyObj.push({
            // ingredient_id: Number(ingredient.id),
            ingredient_id: Number(ingredient.id),
            allergy_id: Number(allergyId.id),
            updated_at: new Date(),
          });
          // allergyObj.push({
          //   // ingredient_id: Number(ingredient.id),
          //   ingredient: { connect: { id: Number(ingredient.id) } },
          //   allergy: { connect: { id: Number(allergyId.id) } },
          //   updated_at: new Date(),
          // });
        }
      }

      allergyObj = allergyObj.filter(Boolean); // Remove null entries

      console.log("allergyObj>>>>>>>>>>>>>>>:", allergyObj);
      // Only create records if there are valid entries
      if (allergyObj.length === 1) {
        await prisma.allergy_ingredient.create({
          data: allergyObj[0],
        });
      } else if (allergyObj.length > 1) {
        await prisma.allergy_ingredient.createMany({
          data: allergyObj,
        });
      }
    }
    return NextResponse.json({ message: "Success", resultJson: jsonData }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Export the handler as POST and GET
// export const POST = handler;
// export const GET = handler;

export async function GET(request: Request) {
  try {
    console.log("GET METHOD");
  } catch (error) {
    // Determine the HTTP method of the request
    return NextResponse.json({ error: `Please use POST` }, { status: 405 });
  }
}
