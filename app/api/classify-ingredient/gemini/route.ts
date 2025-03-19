"use server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient();
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Set this in your .env file

export async function GET(req: any, res: any) {
  let id = 1;
  let name = "nutella";

  // if (!id || !name) {
  //   return res.status(400).json({ error: "Missing id or name" });
  // }

  const prompt = `You are a food classification and nutrition expert. The values returned are represented as 100% = 1, 200% = 2. Provide a JSON response with no extra text, following this structure:
{
  "primary_category": "<string>",
  "secondary_category": "<string>",
  "dietary_classification": "vegan|vegetarian|animal_product|unknown",
  "allergies": "<string>",
  "nutritional_data": {
    "kcal_per_100g": <number>,
    "kj_per_100g": <number>,
    "protein_per_100g": <number>,
    "fat_per_100g": <number>,
    "saturated_fat_per_100g": <number>,
    "monounsaturate_per_100g": <number>,
    "polyunsaturate_per_100g": <number>,
    "trans_fats_per_100g": <number>,
    "omega3_per_100g": <number>,
    "omega6_per_100g": <number>,
    "omega9_per_100g": <number>,
    "carbs_per_100g": <number>,
    "net_carbs_per_100g": <number>,
    "carbohydrates_per_100g": <number>,
    "total_sugar_per_100g": <number>,
    "added_sugar_per_100g": <number|null>,
    "artificial_sugar_per_100g": <number|null>,
    "fibre_per_100g": <number>,
    "starch_per_100g": <number|null>,
    "salt_per_100g": <number>,
    "sodium_per_100g": <number>
  },
  "raw_to_prepped_yields": {
    "whole": <number>,
    "peeled": <number>,
    "peeled_and_cored": <number>,
    "diced": <number>,
    "sliced": <number>,
    "grated": <number>
  },
  "cooked_yields": {\n' +
            '    "raw": <number>,\n' +
            '    "cooked": <number>,\n' +
            '    "deep_fry": <number>,\n' +
            '    "shallow_fry": <number>,\n' +
            '    "boiled": <number>,\n' +
            '    "roasted": <number>,\n' +
            "  },\n" +
  "confidence": <number> // 0 to 1, e.g., 0.95 for 95% confidence
}
Use 0 for unknown numeric values and null for optional fields if unknown. Base your response on reliable nutritional data where possible. Classify and analyze "${name}".`;

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  try {
    const response = result.response.text().replace("```json\n", "").replace("\n```", "");
    const json = JSON.parse(response);
    return NextResponse.json(json);
  } catch (error: any) {
    return NextResponse.json({ message: "GET request FAIL", error: error });
  }
}

// export async function POST(req: any, res: any) {
//   // Your POST method logic here
//   // res.status(200).json({ message: "POST request successful" });
//   return NextResponse.json({ message: "POST request successful" });
// }
