// "use server";
// import prisma from "@/libs/prisma";
// import OpenAI from "openai";
// import { NextResponse } from "next/server";

// const xai = new OpenAI({ apiKey: process.env.XAI_API_KEY, baseURL: "https://api.x.ai/v1" });

// // Get religious certification ID dynamically
// // 0: no, 1: yes, 2: unlikely, 3: likely, 4: unknown
// function getReligiousCertIdByName(name: string, religiousCertArray: { id: number; name: string }[]): number {
//   const match = religiousCertArray.find((item) => item.name.toLowerCase() === name.toLowerCase());
//   return match ? Number(match.id) : 4; // 4: unknown if no match
// }

// export async function POST(req: Request) {
//   // Parse the request body
//   let body;
//   try {
//     body = await req.json();
//   } catch (error) {
//     return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
//   }

//   const { id, name } = body;

//   if (!id || !name) {
//     return NextResponse.json({ error: "Missing id or name" }, { status: 400 });
//   }

//   try {
//     // Fetch classification from xAI
//     const response = await xai.chat.completions.create({
//       model: "grok-2-latest",
//       stream: false,
//       messages: [
//         {
//           role: "system",
//           content: `You are a food classification and nutrition expert. Provide a JSON response with no extra text, following this structure:
//             {
//               "primary_category": "alcoholic_beverages|baking_ingredients|broths_stocks|condiments_sauces|dairy|eggs|fats_oils|fermented_foods|flavorings_extracts|fruits|grains_cereals|herbs_spices|legumes|meat|mushrooms|non_alcoholic_beverages|nuts_seeds|other|pasta_noodles|plant_based_proteins|poultry|seafood|seaweed|sugars_sweeteners|vegetables|vitamins_minerals_supplements|water",
//               "name_correct_spelling": "<string>",
//               "secondary_category": "<string>",
//               "dietary_classification": "vegan|vegetarian|animal_product|unknown",
//               "allergies": "<string>",
//               "nutritional_data": {
//                 "kcal_per_100g": <number>,
//                 "kj_per_100g": <number>,
//                 "protein_per_100g": <number>,
//                 "fat_per_100g": <number>,
//                 "saturated_fat_per_100g": <number>,
//                 "monounsaturate_per_100g": <number>,
//                 "polyunsaturate_per_100g": <number>,
//                 "trans_fats_per_100g": <number>,
//                 "omega3_per_100g": <number>,
//                 "omega6_per_100g": <number>,
//                 "omega9_per_100g": <number>,
//                 "carbs_per_100g": <number>,
//                 "net_carbs_per_100g": <number>,
//                 "carbohydrates_per_100g": <number>,
//                 "total_sugar_per_100g": <number>,
//                 "added_sugar_per_100g": <number|null>,
//                 "artificial_sugar_per_100g": <number|null>,
//                 "fibre_per_100g": <number>,
//                 "starch_per_100g": <number|null>,
//                 "salt_per_100g": <number>,
//                 "sodium_per_100g": <number>
//               },
//               "raw_to_prepped_yields": {
//                 "whole": <number>,
//                 "peeled": <number>,
//                 "peeled_and_cored": <number>,
//                 "diced": <number>,
//                 "sliced": <number>,
//                 "grated": <number>
//               },
//               "cooked_yields": {
//                 "raw": <number>,
//                 "cooked": <number>,
//                 "deep_fry": <number>,
//                 "shallow_fry": <number>,
//                 "boiled": <number>,
//                 "roasted": <number>
//               },
//               "religious_certification": {
//                 "kosher": "no|yes|likely|unlikely|unknown",
//                 "halal": "no|yes|likely|unlikely|unknown"
//               },
//               "alternative_names": {"names_alt": "<string>"},
//               "confidence": <number>
//             }
//             Rules for religious certification:
//             - Pork and derivatives (e.g., bacon, ham, sausage from pork) are always "no" for halal and kosher.
//             - Meat is "yes" for halal/kosher only if from a permissible animal and slaughtered per Islamic/Jewish guidelines.
//             - If source or preparation is unclear, use "unknown".
//             - Non-meat items are "yes" unless contaminated with haram/treif substances.
//             Examples:
//             - "pork bacon": {"religious_certification": {"halal": "no", "kosher": "no"}}
//             - "beef": {"religious_certification": {"halal": "unknown", "kosher": "unknown"}}
//             Use 0 for unknown numeric values and null for optional fields.`,
//         },
//         { role: "user", content: `Classify and analyze "${name}".` },
//       ],
//       temperature: 0.3,
//     });

//     const jsonData = JSON.parse(response.choices[0].message.content ?? "{}");
//     if (!Object.keys(jsonData).length) {
//       return NextResponse.json({ error: "No data returned from xAI" }, { status: 500 });
//     }

//     const name_correct_spelling = jsonData.name_correct_spelling || name;

//     // Fetch related data in parallel
//     const [religiousCerts, primaryCat, dietaryCat] = await Promise.all([
//       prisma.ingredients_religious_certification.findMany({ select: { id: true, name: true } }),
//       prisma.ingredient_category_primary.findFirst({ where: { name: jsonData.primary_category }, select: { id: true } }),
//       prisma.dietary_classification.findFirst({ where: { name: jsonData.dietary_classification }, select: { id: true } }),
//     ]);

//     const primaryCategoryId = primaryCat?.id;
//     const dietaryCategoryId = dietaryCat?.id;

//     // Get kosher and halal IDs dynamically
//     const kosherId = getReligiousCertIdByName(jsonData.religious_certification.kosher, religiousCerts);
//     const halalId = getReligiousCertIdByName(jsonData.religious_certification.halal, religiousCerts);

//     // Shared data for upsert
//     const ingredientData = {
//       name: name_correct_spelling,
//       names_alt: jsonData.alternative_names.names_alt || "",
//       primary_category_id: primaryCategoryId,
//       secondary_category: jsonData.secondary_category || "",
//       updated_at: new Date(),
//       dietary_classification_id: dietaryCategoryId,
//       kosher_id: kosherId !== 4 ? kosherId : null, // Set to null if "unknown" (4)
//       halal_id: halalId !== 4 ? halalId : null, // Set to null if "unknown" (4)
//       confidence: jsonData.confidence || 0,
//       is_default: true,
//     };

//     // Perform upserts in a transaction
//     const [ingredient] = await prisma.$transaction([
//       prisma.ingredients.upsert({
//         where: { id },
//         update: ingredientData,
//         create: { ...ingredientData, created_at: new Date() },
//         select: { id: true },
//       }),
//       prisma.ingredient_cooked_yields.upsert({
//         where: { ingredients_id: id },
//         update: {
//           raw: jsonData.cooked_yields.raw || 0,
//           cooked: jsonData.cooked_yields.cooked || 0,
//           deep_fry: jsonData.cooked_yields.deep_fry || 0,
//           shallow_fry: jsonData.cooked_yields.shallow_fry || 0,
//           boiled: jsonData.cooked_yields.boiled || 0,
//           roasted: jsonData.cooked_yields.roasted || 0,
//         },
//         create: {
//           ingredients_id: id,
//           raw: jsonData.cooked_yields.raw || 0,
//           cooked: jsonData.cooked_yields.cooked || 0,
//           deep_fry: jsonData.cooked_yields.deep_fry || 0,
//           shallow_fry: jsonData.cooked_yields.shallow_fry || 0,
//           boiled: jsonData.cooked_yields.boiled || 0,
//           roasted: jsonData.cooked_yields.roasted || 0,
//         },
//       }),
//       prisma.ingredients_nutrition.upsert({
//         where: { ingredients_id: id },
//         update: {
//           kcal_per_100g: jsonData.nutritional_data.kcal_per_100g || 0,
//           kj_per_100g: jsonData.nutritional_data.kj_per_100g || 0,
//           protein_per_100g: jsonData.nutritional_data.protein_per_100g || 0,
//           fat_per_100g: jsonData.nutritional_data.fat_per_100g || 0,
//           saturated_fat_per_100g: jsonData.nutritional_data.saturated_fat_per_100g || 0,
//           monounsaturate_per_100g: jsonData.nutritional_data.monounsaturate_per_100g || 0,
//           polyunsaturate_per_100g: jsonData.nutritional_data.polyunsaturate_per_100g || 0,
//           trans_fats_per_100g: jsonData.nutritional_data.trans_fats_per_100g || 0,
//           omega3_per_100g: jsonData.nutritional_data.omega3_per_100g || 0,
//           omega6_per_100g: jsonData.nutritional_data.omega6_per_100g || 0,
//           omega9_per_100g: jsonData.nutritional_data.omega9_per_100g || 0,
//           carbs_per_100g: jsonData.nutritional_data.carbs_per_100g || 0,
//           net_carbs_per_100g: jsonData.nutritional_data.net_carbs_per_100g || 0,
//           carbohydrates_per_100g: jsonData.nutritional_data.carbohydrates_per_100g || 0,
//           total_sugar_per_100g: jsonData.nutritional_data.total_sugar_per_100g || 0,
//           added_sugar_per_100g: jsonData.nutritional_data.added_sugar_per_100g || 0,
//           artificial_sugar_per_100g: jsonData.nutritional_data.artificial_sugar_per_100g || 0,
//           fibre_per_100g: jsonData.nutritional_data.fibre_per_100g || 0,
//           starch_per_100g: jsonData.nutritional_data.starch_per_100g || 0,
//           salt_per_100g: jsonData.nutritional_data.salt_per_100g || 0,
//           sodium_per_100g: jsonData.nutritional_data.sodium_per_100g || 0,
//         },
//         create: {
//           ingredients_id: id,
//           kcal_per_100g: jsonData.nutritional_data.kcal_per_100g || 0,
//           kj_per_100g: jsonData.nutritional_data.kj_per_100g || 0,
//           protein_per_100g: jsonData.nutritional_data.protein_per_100g || 0,
//           fat_per_100g: jsonData.nutritional_data.fat_per_100g || 0,
//           saturated_fat_per_100g: jsonData.nutritional_data.saturated_fat_per_100g || 0,
//           monounsaturate_per_100g: jsonData.nutritional_data.monounsaturate_per_100g || 0,
//           polyunsaturate_per_100g: jsonData.nutritional_data.polyunsaturate_per_100g || 0,
//           trans_fats_per_100g: jsonData.nutritional_data.trans_fats_per_100g || 0,
//           omega3_per_100g: jsonData.nutritional_data.omega3_per_100g || 0,
//           omega6_per_100g: jsonData.nutritional_data.omega6_per_100g || 0,
//           omega9_per_100g: jsonData.nutritional_data.omega9_per_100g || 0,
//           carbs_per_100g: jsonData.nutritional_data.carbs_per_100g || 0,
//           net_carbs_per_100g: jsonData.nutritional_data.net_carbs_per_100g || 0,
//           carbohydrates_per_100g: jsonData.nutritional_data.carbohydrates_per_100g || 0,
//           total_sugar_per_100g: jsonData.nutritional_data.total_sugar_per_100g || 0,
//           added_sugar_per_100g: jsonData.nutritional_data.added_sugar_per_100g || 0,
//           artificial_sugar_per_100g: jsonData.nutritional_data.artificial_sugar_per_100g || 0,
//           fibre_per_100g: jsonData.nutritional_data.fibre_per_100g || 0,
//           starch_per_100g: jsonData.nutritional_data.starch_per_100g || 0,
//           salt_per_100g: jsonData.nutritional_data.salt_per_100g || 0,
//           sodium_per_100g: jsonData.nutritional_data.sodium_per_100g || 0,
//         },
//       }),
//       prisma.raw_to_prepped_yields.upsert({
//         where: { ingredients_id: id },
//         update: {
//           whole: jsonData.raw_to_prepped_yields.whole || 0,
//           peeled: jsonData.raw_to_prepped_yields.peeled || 0,
//           peeled_and_cored: jsonData.raw_to_prepped_yields.peeled_and_cored || 0,
//           diced: jsonData.raw_to_prepped_yields.diced || 0,
//           sliced: jsonData.raw_to_prepped_yields.sliced || 0,
//           grated: jsonData.raw_to_prepped_yields.grated || 0,
//         },
//         create: {
//           ingredients_id: id,
//           whole: jsonData.raw_to_prepped_yields.whole || 0,
//           peeled: jsonData.raw_to_prepped_yields.peeled || 0,
//           peeled_and_cored: jsonData.raw_to_prepped_yields.peeled_and_cored || 0,
//           diced: jsonData.raw_to_prepped_yields.diced || 0,
//           sliced: jsonData.raw_to_prepped_yields.sliced || 0,
//           grated: jsonData.raw_to_prepped_yields.grated || 0,
//         },
//       }),
//     ]);

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
