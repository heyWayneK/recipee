import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Set this in your .env file

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ error: "Missing id or name" });
  }

  try {
    // Call OpenAI to classify the ingredient and get nutritional data
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a food classification and nutrition expert. Provide a JSON response with no extra text, following this structure:\n" +
            "{\n" +
            '  "primary_category": "<string>",\n' +
            '  "secondary_category": "<string>",\n' +
            '  "dietary_classification": "vegan|vegetarian|animal_product|unknown",\n' +
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
            '  "confidence": <number> // 0 to 1, e.g., 0.95 for 95% confidence\n' +
            "}\n" +
            "Use 0 for unknown numeric values and null for optional fields if unknown. Base your response on reliable nutritional data where possible.",
        },
        {
          role: "user",
          content: `Classify and analyze "${name}".`,
        },
      ],
      temperature: 0.3, // Low temperature for consistency
    });

    const result = JSON.parse(response.choices[0].message.content);

    // Update the Ingredients table
    await prisma.ingredients.update({
      where: { id },
      data: {
        primary_category: result.primary_category || "",
        secondary_category: result.secondary_category || "",
        dietary_classification: result.dietary_classification || "unknown",
        kcal_per_100g: result.nutritional_data.kcal_per_100g || 0,
        kj_per_100g: result.nutritional_data.kj_per_100g || 0,
        protein_per_100g: result.nutritional_data.protein_per_100g || 0,
        fat_per_100g: result.nutritional_data.fat_per_100g || 0,
        saturated_fat_per_100g: result.nutritional_data.saturated_fat_per_100g || 0,
        monounsaturate_per_100g: result.nutritional_data.monounsaturate_per_100g || 0,
        polyunsaturate_per_100g: result.nutritional_data.polyunsaturate_per_100g || 0,
        trans_fats_per_100g: result.nutritional_data.trans_fats_per_100g || 0,
        omega3_per_100g: result.nutritional_data.omega3_per_100g || 0,
        omega6_per_100g: result.nutritional_data.omega6_per_100g || 0,
        omega9_per_100g: result.nutritional_data.omega9_per_100g || 0,
        carbs_per_100g: result.nutritional_data.carbs_per_100g || 0,
        net_carbs_per_100g: result.nutritional_data.net_carbs_per_100g || 0,
        carbohydrates_per_100g: result.nutritional_data.carbohydrates_per_100g || 0,
        total_sugar_per_100g: result.nutritional_data.total_sugar_per_100g || 0,
        added_sugar_per_100g: result.nutritional_data.added_sugar_per_100g || 0,
        artificial_sugar_per_100g: result.nutritional_data.artificial_sugar_per_100g || 0,
        fibre_per_100g: result.nutritional_data.fibre_per_100g || 0,
        starch_per_100g: result.nutritional_data.starch_per_100g || 0,
        salt_per_100g: result.nutritional_data.salt_per_100g || 0,
        sodium_per_100g: result.nutritional_data.sodium_per_100g || 0,
      },
    });

    // Create or update the RawToPreppedYields entry
    await prisma.rawToPreppedYields.upsert({
      where: { ingredientId: id },
      update: {
        whole: result.raw_to_prepped_yields.whole || 1,
        peeled: result.raw_to_prepped_yields.peeled || 0,
        peeled_and_cored: result.raw_to_prepped_yields.peeled_and_cored || 0,
        diced: result.raw_to_prepped_yields.diced || 0,
        sliced: result.raw_to_prepped_yields.sliced || 0,
        grated: result.raw_to_prepped_yields.grated || 0,
      },
      create: {
        ingredientId: id,
        whole: result.raw_to_prepped_yields.whole || 1,
        peeled: result.raw_to_prepped_yields.peeled || 0,
        peeled_and_cored: result.raw_to_prepped_yields.peeled_and_cored || 0,
        diced: result.raw_to_prepped_yields.diced || 0,
        sliced: result.raw_to_prepped_yields.sliced || 0,
        grated: result.raw_to_prepped_yields.grated || 0,
      },
    });

    return res.status(200).json({
      message: "Ingredient classified successfully",
      confidence: result.confidence,
    });
  } catch (error) {
    console.error("Error classifying ingredient:", error);
    return res.status(500).json({ error: "Failed to classify ingredient", details: error.message });
  }
}
