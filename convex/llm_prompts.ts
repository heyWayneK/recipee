import OpenAI from "openai";
import {
  MutationCtx,
  QueryCtx,
  internalAction,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { v } from "convex/values";
import { logger } from "@/libs/serverside_logger";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const classifyIngredientGPT = internalAction({
  args: { name: v.string(), ingredient_id: v.id("ingredients") },
  handler: async (ctx, args) => {
    try {
      const startTime = Date.now();
      const SUPERADMIN_ORG: Id<"org"> = "kh7155v7tjdzt7zwwcf010wp7d7rxcv8" as Id<"org">;
      const INGREDIENT_ID: Id<"ingredients"> = args.ingredient_id as Id<"ingredients">;
      let jsonData = null;
      let useSdk: TSDK = "xai";
      const prompt: PromptMessage[] = getPrompt(args.name);

      if (useSdk === "xai") {
        const response = await sdks.xai.connect.chat.completions.create({
          model: sdks.xai.model,
          stream: false,
          messages: prompt,
          temperature: 0.3, // Low temperature for consistency
        });
        jsonData = await JSON.parse(response.choices[0].message.content ?? "{}");
      } else if (useSdk === "openai") {
        // FUTURE: Switch Models if Xai is not available
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
        //   jsonData = await JSON.parse(response.choices[0].message.content?.replace("```json\n", "").replace("\n```", "") ?? "{}");
      } else if (useSdk === "gemini") {
        // FUTURE: Google Gemini
        // const genAI = sdks.gemini.connect;
        // const model = genAI.getGenerativeModel({ model: sdks.gemini.model });
        // const response = await model.generateContent(JSON.stringify(prompt));
        // jsonData = await JSON.parse(response.response.text().replace("```json\n", "").replace("\n```", ""));
      }

      if (!jsonData) throw new Error(`No data returned from AI: ${sdks[useSdk].model}`);

      // CORRECT SPELLING OF INGREDIENT NAME to most common spelling or use the original names
      const name_correct_spelling = jsonData?.name_correct_spelling;
      if (!name_correct_spelling) throw new Error("*** error no name_correct_spelling");

      // Execute all database queries concurrently using Promise.all
      const [
        primaryCatArray,
        allergyArray,
        religiousCertArray,
        dietaryCatArray,
        correctSpellingNameExists,
        unitTypesArray,
      ] = await Promise.all([
        ctx.runQuery(internal.llm_prompts.getPrimaryCategories),
        ctx.runQuery(internal.llm_prompts.getAllergies),
        ctx.runQuery(internal.llm_prompts.getReligiousCertification),
        ctx.runQuery(internal.llm_prompts.getDietaryClassification),
        ctx.runQuery(internal.llm_prompts.getNameCorrectSpelling, {
          name_correct_spelling: name_correct_spelling,
          ingredient_id: INGREDIENT_ID,
        }),
        ctx.runQuery(internal.llm_prompts.getUnitTypes),
      ]);

      // CONFIRM DATA ARRAYS RETURNED
      if (!primaryCatArray || primaryCatArray.length === 0)
        throw new Error("*** error. No primaryCatArray");
      if (!allergyArray || allergyArray.length === 0) throw new Error("*** error. No allergyArray");
      if (!religiousCertArray || religiousCertArray.length === 0)
        throw new Error("*** error. No religiousCertArray");
      if (!dietaryCatArray || dietaryCatArray.length === 0)
        throw new Error(`*** error. No dietary_classification`);
      if (!unitTypesArray || unitTypesArray.length === 0)
        throw new Error(`*** error. No unitTypesArray`);

      // Match Words to Ids - FUNCTIONS
      const primaryCategoryId: Id<"ingredient_category_primary"> | null = matchPrimaryCategoryId(
        primaryCatArray,
        jsonData.primary_category,
      );

      const kosherId: Id<"ingredients_religious_certification"> | null = matchReligiousCertId(
        jsonData.religious_certification.kosher,
        religiousCertArray,
      );

      // HALAL  - Match Ids to words
      const halalId: Id<"ingredients_religious_certification"> | null = matchReligiousCertId(
        jsonData.religious_certification.halal,
        religiousCertArray,
      );

      // DIET_CATEGORY  - Match Ids to words
      let dietaryCatArrayId: Id<"dietary_classification"> | null = matchDietaryCatId(
        dietaryCatArray,
        jsonData.dietary_classification,
      );

      // UNIT TYPE - Match Ids to words
      let unitTypesArrayId: Id<"unit_type"> | null = matchUnitTypeId(
        unitTypesArray,
        jsonData.unit_type,
      );

      if (!primaryCategoryId) throw new Error(`*** error. No primaryCategoryId`);
      if (!kosherId) throw new Error(`*** error. No kosherId`);
      if (!halalId) throw new Error(`*** error. No halalId`);
      if (!dietaryCatArrayId) throw new Error(`*** error. No dietaryCatArrayId`);
      if (!unitTypesArrayId) throw new Error(`*** error. No unitTypesArrayId`);

      // CHECK IF CORRECT INGREDIENT SPELLING IS ALREADY IN THE DATABASE then SOFT DELETE
      if (correctSpellingNameExists !== null) {
        console.log("runMutation softDeleteIngredientById - Cleaning up old ingredient record");
        await ctx.runMutation(internal.llm_prompts.softDeleteIngredientById, {
          id: INGREDIENT_ID,
          name: args.name,
        });
      }

      // UPDATE INGREDIENT data into the ingredients table
      const ingredient: any = await ctx.runMutation(internal.llm_prompts.updateIngredientById, {
        ingredient_id: INGREDIENT_ID,
        name: name_correct_spelling || jsonData.name,
        name_orig: jsonData.name,
        names_alt: jsonData.alternative_names.names_alt.split("|").join(",") || "",
        org_id: SUPERADMIN_ORG,
        is_default: true,
        primary_category_id: primaryCategoryId,
        secondary_category: String(jsonData.secondary_category),
        unit_type_id: unitTypesArrayId, // each, fluid, weight
        translation: "", // Prisma type: Json
        dietary_classification_id: dietaryCatArrayId,
        kosher_id: kosherId,
        halal_id: halalId,
        confidence: String(jsonData.confidence) || "0",
        is_oil: jsonData.is_oil,
        is_salt: jsonData.is_salt,
        ai_model: sdks[useSdk].model,
      });

      if (!ingredient) throw new Error("Ingredient not found");
      if (!jsonData.cooked_yields) throw new Error("Cooked yields not found");
      if (!jsonData.nutritional_data) throw new Error("*** error Nutritional data not found");
      if (!jsonData.raw_to_prepped_yields)
        throw new Error("*** error. Raw to prepped yields not found");

      await ctx.runMutation(internal.llm_prompts.preppedToCookedYieldsUpsert, {
        ingredients_id: INGREDIENT_ID,
        raw: String(jsonData.cooked_yields?.raw) || "1",
        cooked: String(jsonData.cooked_yields?.cooked) || "0",
        deep_fry: String(jsonData.cooked_yields?.deep_fry) || "0",
        shallow_fry: String(jsonData.cooked_yields?.shallow_fry) || "0",
        boiled: String(jsonData.cooked_yields?.boiled) || "0",
        roasted: String(jsonData.cooked_yields?.roasted) || "0",
      });

      await ctx.runMutation(internal.llm_prompts.deleteAndInsertIngredientNutrition, {
        ingredients_id: INGREDIENT_ID,
        org_id: SUPERADMIN_ORG,
        kcal_per_100g: String(jsonData.nutritional_data?.kcal_per_100g) || "0",
        kj_per_100g: String(jsonData.nutritional_data?.kj_per_100g) || "0",
        protein_per_100g: String(jsonData.nutritional_data?.protein_per_100g) || "0",
        fat_per_100g: String(jsonData.nutritional_data?.fat_per_100g) || "0",
        saturated_fat_per_100g: String(jsonData.nutritional_data?.saturated_fat_per_100g) || "0",
        monounsaturate_per_100g: String(jsonData.nutritional_data?.monounsaturate_per_100g) || "0",
        polyunsaturate_per_100g: String(jsonData.nutritional_data?.polyunsaturate_per_100g) || "0",
        trans_fats_per_100g: String(jsonData.nutritional_data?.trans_fats_per_100g) || "0",
        omega3_per_100g: String(jsonData.nutritional_data?.omega3_per_100g) || "0",
        omega6_per_100g: String(jsonData.nutritional_data?.omega6_per_100g) || "0",
        omega9_per_100g: String(jsonData.nutritional_data?.omega9_per_100g) || "0",
        carbohydrates_per_100g: String(jsonData.nutritional_data?.carbohydrates_per_100g) || "0",
        net_carbs_per_100g: String(jsonData.nutritional_data?.net_carbs_per_100g) || "0",
        total_sugar_per_100g: String(jsonData.nutritional_data?.total_sugar_per_100g) || "0",
        added_sugar_per_100g: String(jsonData.nutritional_data?.added_sugar_per_100g) || "0",
        artificial_sugar_per_100g:
          String(jsonData.nutritional_data?.artificial_sugar_per_100g) || "0",
        fibre_per_100g: String(jsonData.nutritional_data?.fibre_per_100g) || "0",
        starch_per_100g: String(jsonData.nutritional_data?.starch_per_100g) || "0",
        salt_per_100g: String(jsonData.nutritional_data?.salt) || "0",
        sodium_per_100g: String(jsonData.nutritional_data?.sodium_per_100g) || "0",

        // OTHER
        water_per_100g: String(jsonData.other?.water_per_100g) || "0",
        nitrogen_g_per_100g: String(jsonData.other?.nitrogen_g_per_100g) || "0",
        ash_g_per_100g: String(jsonData.other?.ash_g_per_100g) || "0",
        calcium_mg_per_100g: String(jsonData.other?.calcium_mg_per_100g) || "0",
        iron_mg_per_100g: String(jsonData.other?.iron_mg_per_100g) || "0",
        magnesium_mg_per_100g: String(jsonData.other?.magnesium_mg_per_100g) || "0",
        phosphorus_mg_per_100g: String(jsonData.other?.phosphorus_mg_per_100g) || "0",
        potassium_mg_per_100g: String(jsonData.other?.potassium_mg_per_100g) || "0",
        zinc_mg_per_100g: String(jsonData.other?.zinc_mg_per_100g) || "0",
        copper_mg_per_100g: String(jsonData.other?.copper_mg_per_100g) || "0",
        manganese_mg_per_100g: String(jsonData.other?.manganese_mg_per_100g) || "0",
        selenium_micro_g_per_100g: String(jsonData.other?.selenium_micro_g_per_100g) || "0",
        vitamin_a_mg_per_100g: String(jsonData.other?.vitamin_a_mg_per_100g) || "0",
        vitamin_b1_thiamin_mg_per_100g:
          String(jsonData.other?.vitamin_b1_thiamin_mg_per_100g) || "0",
        vitamin_b2_mg_per_100g: String(jsonData.other?.vitamin_b2_mg_per_100g) || "0",
        vitamin_b3_niacin_mg_per_100g: String(jsonData.other?.vitamin_b3_niacin_mg_per_100g) || "0",
        vitamin_b6_mg_per_100g: String(jsonData.other?.vitamin_b6_mg_per_100g) || "0",
        vitamin_b7_biotin_micro_g_per_100g:
          String(jsonData.other?.vitamin_b7_biotin_micro_g_per_100g) || "0",
        vitamin_b9_folate_mg_per_100g: String(jsonData.other?.vitamin_b9_folate_mg_per_100g) || "0",
        vitamin_b12_mg_per_100g: String(jsonData.other?.vitamin_b12_mg_per_100g) || "0",
        vitamin_e_mg_per_100g: String(jsonData.other?.vitamin_e_mg_per_100g) || "0",
        vitamin_k_micro_g_per_100g: String(jsonData.other?.vitamin_k_micro_g_per_100g) || "0",
        sfa_16_0_palmitic_acid_g_per_100g:
          String(jsonData.other?.sfa_16_0_palmitic_acid_g_per_100g) || "0",
        sfa_18_0_stearic_acid_g_per_100g:
          String(jsonData.other?.sfa_18_0_stearic_acid_g_per_100g) || "0",
        mufa_16_1_palmitoleic_acid_g_per_100g:
          String(jsonData.other?.mufa_16_1_palmitoleic_acid_g_per_100g) || "0",
        mufa_18_1__oleic_acid_g_per_100g:
          String(jsonData.other?.mufa_18_1__oleic_acid_g_per_100g) || "0",
        pufa_18_2_linoleic_acid_g_per_100g:
          String(jsonData.other?.pufa_18_2_linoleic_acid_g_per_100g) || "0",
        tryptophan_g_per_100g: String(jsonData.other?.tryptophan_g_per_100g) || "0",
        threonine_g_per_100g: String(jsonData.other?.threonine_g_per_100g) || "0",
        isoleucine_g_per_100g: String(jsonData.other?.isoleucine_g_per_100g) || "0",
        leucine_g_per_100g: String(jsonData.other?.leucine_g_per_100g) || "0",
        lysine_g_per_100g: String(jsonData.other?.lysine_g_per_100g) || "0",
        methionine_g_per_100g: String(jsonData.other?.methionine_g_per_100g) || "0",
        phenylalanine_g_per_100g: String(jsonData.other?.phenylalanine_g_per_100g) || "0",
        tyrosine_g_per_100g: String(jsonData.other?.tyrosine_g_per_100g) || "0",
        valine_g_per_100g: String(jsonData.other?.valine_g_per_100g) || "0",
        arginine_g_per_100g: String(jsonData.other?.arginine_g_per_100g) || "0",
        histidine_g_per_100g: String(jsonData.other?.histidine_g_per_100g) || "0",
        alanine_g_per_100g: String(jsonData.other?.alanine_g_per_100g) || "0",
        aspartic_acid_g_per_100g: String(jsonData.other?.aspartic_acid_g_per_100g) || "0",
        glutamic_acid_g_per_100g: String(jsonData.other?.glutamic_acid_g_per_100g) || "0",
        glycine_g_per_100g: String(jsonData.other?.glycine_g_per_100g) || "0",
        proline_g_per_100g: String(jsonData.other?.proline_g_per_100g) || "0",
        serine_g_per_100g: String(jsonData.other?.serine_g_per_100g) || "0",
        hydroxyproline_g_per_100g: String(jsonData.other?.hydroxyproline_g_per_100g) || "0",
        cysteine_g_per_100g: String(jsonData.other?.cysteine_g_per_100g) || "0",
        daidzein_mg_per_100g: String(jsonData.other?.daidzein_mg_per_100g) || "0",
        genistein_mg_per_100g: String(jsonData.other?.genistein_mg_per_100g) || "0",
        daidzin_mg_per_100g: String(jsonData.other?.daidzin_mg_per_100g) || "0",
        genistin_mg_per_100g: String(jsonData.other?.genistin_mg_per_100g) || "0",
        glycitin_mg_per_100g: String(jsonData.other?.glycitin_mg_per_100g) || "0",
      });

      const allergyObj: {
        ingredient_id: Id<"ingredients">;
        allergy_id: Id<"allergy">;
      }[] = matchAllergyId(allergyArray, jsonData.allergies, INGREDIENT_ID);

      if (!allergyObj) throw new Error("Allergy object not found");

      await ctx.runMutation(internal.llm_prompts.deleteAndInsertAllergyIngredientsById, {
        ingredient_id: INGREDIENT_ID,
        allergyObj,
      });

      const totalTimeSecs = (Date.now() - startTime) / 1000 + " seconds";

      const msg = {
        message: "Success",
        timer: totalTimeSecs,
        ingredient_id: ingredient.id,
        resultJson: jsonData,
      };
      console.log(msg);
      return msg;
    } catch (error: any) {
      console.error("Webhook error:", error);

      if (error.status === 429) {
        console.log("Error. Out of Xai credits", error?.message);
        console.log(
          "Purchase x.ai credits: https://console.x.ai/team/30110b4c-4d37-411c-800e-226f8cdaa201?action=purchase-credits",
        );
      } else {
        return logger.error("*** error 500", {
          error: "Failure - errors",
        });
      }
    }
  },
});

// convex/ingredientCategoryPrimary.ts
export const getPrimaryCategories = internalQuery({
  handler: async (ctx: QueryCtx) =>
    ctx.db
      .query("ingredient_category_primary")
      .collect()
      .then((arr) => arr.map(({ _id, name }) => ({ id: _id, name }))),
});
export const getAllergies = internalQuery({
  handler: async (ctx: QueryCtx) =>
    ctx.db
      .query("allergy")
      .collect()
      .then((arr) => arr.map(({ _id, name }) => ({ id: _id, name }))),
});
export const getReligiousCertification = internalQuery({
  handler: async (ctx: QueryCtx) =>
    ctx.db
      .query("ingredients_religious_certification")
      .collect()
      .then((arr) => arr.map(({ _id, name }) => ({ id: _id, name }))),
});

export const getDietaryClassification = internalQuery({
  handler: (ctx: QueryCtx) =>
    ctx.db
      .query("dietary_classification")
      .collect()
      .then((arr) => arr.map(({ _id, name }) => ({ id: _id, name }))),
});

export const getNameCorrectSpelling = internalQuery({
  args: {
    name_correct_spelling: v.string(),
    ingredient_id: v.string(),
  },
  handler: async (ctx: QueryCtx, args) =>
    ctx.db
      .query("ingredients")
      .withIndex("by_name_and_org", (q) => q.eq("name", args.name_correct_spelling))
      .filter((q) => q.neq(q.field("_id"), args.ingredient_id)) // If you have an index on "name"
      .first()
      .then((doc) => (doc ? { id: doc._id } : null)),
});

export const getUnitTypes = internalQuery({
  handler: async (ctx: QueryCtx) =>
    ctx.db
      .query("unit_type")
      .collect()
      .then((arr) => arr.map(({ _id, name }) => ({ id: _id, name }))),
});

export const softDeleteIngredientById = internalMutation({
  args: {
    id: v.id("ingredients"),
    name: v.string(),
  },
  handler: async (ctx: MutationCtx, args) => {
    // DELETE INGREDIENT BY ID
    return ctx.db.patch(args.id, {
      deleted: true,
      name: `DELETE - name exists: ${args.name} `,
    });
  },
});

export const deleteAndInsertAllergyIngredientsById = internalMutation({
  // const docs =
  args: {
    ingredient_id: v.id("ingredients"),
    allergyObj: v.array(
      v.object({
        ingredient_id: v.id("ingredients"),
        allergy_id: v.id("allergy"),
      }),
    ),
  },
  handler: async (ctx, args) =>
    ctx.db
      .query("allergy_ingredient")
      .withIndex("by_allergy_and_ingredient", (q) => q.eq("ingredient_id", args.ingredient_id))
      .collect()
      .then((docs) => {
        Promise.all(docs.map((doc) => ctx.db.delete(doc._id)));
      })
      .then(async () => {
        await Promise.all(args.allergyObj.map((obj) => ctx.db.insert("allergy_ingredient", obj)));
        return null;
      }),
});

export const preppedToCookedYieldsUpsert = internalMutation({
  args: {
    ingredients_id: v.id("ingredients"),
    raw: v.string(),
    cooked: v.string(),
    deep_fry: v.string(),
    shallow_fry: v.string(),
    boiled: v.string(),
    roasted: v.string(),
  },
  handler: async (ctx: MutationCtx, args) => {
    const existing = await ctx.db
      .query("prepped_to_cooked_yields")
      .withIndex("by_ingredients_id", (q) => q.eq("ingredients_id", args.ingredients_id))
      .unique();

    if (existing) {
      return ctx.db.patch(existing._id, {
        raw: String(args.raw) as string,
        cooked: String(args.cooked) as string,
        deep_fry: String(args.deep_fry) as string,
        shallow_fry: String(args.shallow_fry) as string,
        boiled: String(args.boiled) as string,
        roasted: String(args.roasted) as string,
      });
    } else {
      return ctx.db.insert("prepped_to_cooked_yields", {
        ingredients_id: args.ingredients_id,
        raw: String(args.raw) as string,
        cooked: String(args.cooked) as string,
        deep_fry: String(args.deep_fry) as string,
        shallow_fry: String(args.shallow_fry) as string,
        boiled: String(args.boiled) as string,
        roasted: String(args.roasted) as string,
      });
    }
  },
});

export const updateIngredientById = internalMutation({
  args: {
    ingredient_id: v.id("ingredients"),
    name: v.string(),
    name_orig: v.optional(v.string()),
    names_alt: v.optional(v.string()),
    org_id: v.id("org"),
    is_default: v.boolean(),
    translation: v.optional(v.any()), // Prisma type: Json
    primary_category_id: v.id("ingredient_category_primary"),
    secondary_category: v.optional(v.string()),
    unit_type_id: v.optional(v.id("unit_type")),
    dietary_classification_id: v.optional(v.id("dietary_classification")),
    kosher_id: v.id("ingredients_religious_certification"),
    halal_id: v.id("ingredients_religious_certification"),
    confidence: v.string(),
    is_oil: v.boolean(),
    is_salt: v.boolean(),
    ai_model: v.optional(v.string()),
  },
  handler: async (ctx: MutationCtx, args) => {
    // UPDATE INGREDIENT BY ID
    console.log(
      "CALLING: runMutation updateIngredientById - into the ingredients table ingredient_id",
      args.ingredient_id,
    );
    await ctx.db.patch(args.ingredient_id, {
      name: args.name,
      name_orig: args.name_orig,
      names_alt: args.names_alt,
      org_id: args.org_id, //env.ORG_ID_SUPERADMIN as Id<"org">
      is_default: args.is_default,
      translation: args.translation,
      primary_category_id: args.primary_category_id,
      secondary_category: args.secondary_category,
      unit_type_id: args.unit_type_id,
      dietary_classification_id: args.dietary_classification_id,
      kosher_id: args.kosher_id,
      halal_id: args.halal_id,
      confidence: args.confidence,
      is_oil: args.is_oil,
      is_salt: args.is_salt,
      ai_model: args.ai_model,
    });

    console.log("END: runMutation updateIngredientById");
    return args.name;
  },
});

export const deleteAllExistingIngredientNutrition = internalMutation({
  args: {
    ingredients_id: v.id("ingredients"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("ingredients_nutrition")
      .withIndex("by_ingredients_id", (q) => q.eq("ingredients_id", args.ingredients_id))
      .collect();

    await Promise.all(existing.map((doc) => ctx.db.delete(doc._id)));
    return null;
  },
});

export const insertNewIngredientsNutrition = internalMutation({
  args: {
    ingredients_id: v.id("ingredients"),
    org_id: v.id("org"),
    kcal_per_100g: v.string(),
    kj_per_100g: v.string(),
    protein_per_100g: v.string(),
    fat_per_100g: v.string(),
    saturated_fat_per_100g: v.string(),
    monounsaturate_per_100g: v.string(),
    polyunsaturate_per_100g: v.string(),
    trans_fats_per_100g: v.string(),
    omega3_per_100g: v.string(),
    omega6_per_100g: v.string(),
    omega9_per_100g: v.string(),
    carbohydrates_per_100g: v.string(),
    net_carbs_per_100g: v.string(),
    total_sugar_per_100g: v.string(),
    added_sugar_per_100g: v.string(),
    artificial_sugar_per_100g: v.string(),
    fibre_per_100g: v.string(),
    starch_per_100g: v.string(),
    salt_per_100g: v.string(),
    sodium_per_100g: v.string(),

    // OTHER
    water_per_100g: v.string(),
    nitrogen_g_per_100g: v.string(),
    ash_g_per_100g: v.string(),
    calcium_mg_per_100g: v.string(),
    iron_mg_per_100g: v.string(),
    magnesium_mg_per_100g: v.string(),
    phosphorus_mg_per_100g: v.string(),
    potassium_mg_per_100g: v.string(),
    zinc_mg_per_100g: v.string(),
    copper_mg_per_100g: v.string(),
    manganese_mg_per_100g: v.string(),
    selenium_micro_g_per_100g: v.string(),
    vitamin_a_mg_per_100g: v.string(),
    vitamin_b1_thiamin_mg_per_100g: v.string(),
    vitamin_b2_mg_per_100g: v.string(),
    vitamin_b3_niacin_mg_per_100g: v.string(),
    vitamin_b6_mg_per_100g: v.string(),
    vitamin_b7_biotin_micro_g_per_100g: v.string(),
    vitamin_b9_folate_mg_per_100g: v.string(),
    vitamin_b12_mg_per_100g: v.string(),
    vitamin_e_mg_per_100g: v.string(),
    vitamin_k_micro_g_per_100g: v.string(),
    sfa_16_0_palmitic_acid_g_per_100g: v.string(),
    sfa_18_0_stearic_acid_g_per_100g: v.string(),
    mufa_16_1_palmitoleic_acid_g_per_100g: v.string(),
    mufa_18_1__oleic_acid_g_per_100g: v.string(),
    pufa_18_2_linoleic_acid_g_per_100g: v.string(),
    tryptophan_g_per_100g: v.string(),
    threonine_g_per_100g: v.string(),
    isoleucine_g_per_100g: v.string(),
    leucine_g_per_100g: v.string(),
    lysine_g_per_100g: v.string(),
    methionine_g_per_100g: v.string(),
    phenylalanine_g_per_100g: v.string(),
    tyrosine_g_per_100g: v.string(),
    valine_g_per_100g: v.string(),
    arginine_g_per_100g: v.string(),
    histidine_g_per_100g: v.string(),
    alanine_g_per_100g: v.string(),
    aspartic_acid_g_per_100g: v.string(),
    glutamic_acid_g_per_100g: v.string(),
    glycine_g_per_100g: v.string(),
    proline_g_per_100g: v.string(),
    serine_g_per_100g: v.string(),
    hydroxyproline_g_per_100g: v.string(),
    cysteine_g_per_100g: v.string(),
    daidzein_mg_per_100g: v.string(),
    genistein_mg_per_100g: v.string(),
    daidzin_mg_per_100g: v.string(),
    genistin_mg_per_100g: v.string(),
    glycitin_mg_per_100g: v.string(),
  },
  handler: async (ctx: MutationCtx, args) => await ctx.db.insert("ingredients_nutrition", args),
  // return null;
});

export const deleteAndInsertIngredientNutrition = internalMutation({
  args: {
    ingredients_id: v.id("ingredients"),
    org_id: v.id("org"),
    kcal_per_100g: v.string(),
    kj_per_100g: v.string(),
    protein_per_100g: v.string(),
    fat_per_100g: v.string(),
    saturated_fat_per_100g: v.string(),
    monounsaturate_per_100g: v.string(),
    polyunsaturate_per_100g: v.string(),
    trans_fats_per_100g: v.string(),
    omega3_per_100g: v.string(),
    omega6_per_100g: v.string(),
    omega9_per_100g: v.string(),
    carbohydrates_per_100g: v.string(),
    net_carbs_per_100g: v.string(),
    total_sugar_per_100g: v.string(),
    added_sugar_per_100g: v.string(),
    artificial_sugar_per_100g: v.string(),
    fibre_per_100g: v.string(),
    starch_per_100g: v.string(),
    salt_per_100g: v.string(),
    sodium_per_100g: v.string(),

    // OTHER
    water_per_100g: v.string(),
    nitrogen_g_per_100g: v.string(),
    ash_g_per_100g: v.string(),
    calcium_mg_per_100g: v.string(),
    iron_mg_per_100g: v.string(),
    magnesium_mg_per_100g: v.string(),
    phosphorus_mg_per_100g: v.string(),
    potassium_mg_per_100g: v.string(),
    zinc_mg_per_100g: v.string(),
    copper_mg_per_100g: v.string(),
    manganese_mg_per_100g: v.string(),
    selenium_micro_g_per_100g: v.string(),
    vitamin_a_mg_per_100g: v.string(),
    vitamin_b1_thiamin_mg_per_100g: v.string(),
    vitamin_b2_mg_per_100g: v.string(),
    vitamin_b3_niacin_mg_per_100g: v.string(),
    vitamin_b6_mg_per_100g: v.string(),
    vitamin_b7_biotin_micro_g_per_100g: v.string(),
    vitamin_b9_folate_mg_per_100g: v.string(),
    vitamin_b12_mg_per_100g: v.string(),
    vitamin_e_mg_per_100g: v.string(),
    vitamin_k_micro_g_per_100g: v.string(),
    sfa_16_0_palmitic_acid_g_per_100g: v.string(),
    sfa_18_0_stearic_acid_g_per_100g: v.string(),
    mufa_16_1_palmitoleic_acid_g_per_100g: v.string(),
    mufa_18_1__oleic_acid_g_per_100g: v.string(),
    pufa_18_2_linoleic_acid_g_per_100g: v.string(),
    tryptophan_g_per_100g: v.string(),
    threonine_g_per_100g: v.string(),
    isoleucine_g_per_100g: v.string(),
    leucine_g_per_100g: v.string(),
    lysine_g_per_100g: v.string(),
    methionine_g_per_100g: v.string(),
    phenylalanine_g_per_100g: v.string(),
    tyrosine_g_per_100g: v.string(),
    valine_g_per_100g: v.string(),
    arginine_g_per_100g: v.string(),
    histidine_g_per_100g: v.string(),
    alanine_g_per_100g: v.string(),
    aspartic_acid_g_per_100g: v.string(),
    glutamic_acid_g_per_100g: v.string(),
    glycine_g_per_100g: v.string(),
    proline_g_per_100g: v.string(),
    serine_g_per_100g: v.string(),
    hydroxyproline_g_per_100g: v.string(),
    cysteine_g_per_100g: v.string(),
    daidzein_mg_per_100g: v.string(),
    genistein_mg_per_100g: v.string(),
    daidzin_mg_per_100g: v.string(),
    genistin_mg_per_100g: v.string(),
    glycitin_mg_per_100g: v.string(),
  },
  handler: async (ctx: MutationCtx, args) => {
    await ctx.runMutation(internal.llm_prompts.deleteAllExistingIngredientNutrition, {
      ingredients_id: args.ingredients_id,
    });
    await ctx.runMutation(internal.llm_prompts.insertNewIngredientsNutrition, args);
  },
});

const getPrompt = (name: string): PromptMessage[] => {
  const prompt: PromptMessage[] = [
    {
      role: "system",
      content:
        "You are a food classification and nutrition expert. Cooked_yields values can be higher than 1 (e.g. rice and pasta). Alternative_names are for wholefoods that have other names (e.g. aubergine, eggplant).\n" +
        "Multiple Allergies can be returned as a pipe delimited list please e.g. (wheat|gluten)\n" +
        "unit_type defines how the ingredient is typically measured or sold, its a suggestion to measure by weight (g,kg,lbs,oz), fluid (mL, L, fl oz) or each (products like eggs, or garnish like bay leaf) \n" +
        "is_salt? boolean to determine if this product/ingredient is primarily classified mainly as salt (.e.g. table salt, fleur de sal, Himalayan Pink Salt) \n" +
        "is_oil? boolean to determine if this product/ingredient is primarily classified mainly as an oil (.e.g. olive oil, canola, sunflower seed oil, coconut oil) \n" +
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
        '    "carbohydrates_per_100g": <number>,\n' +
        '    "net_carbs_per_100g": <number>,\n' +
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
        '  "other": {\n' +
        '    "water_per_100g: <number>,\n' +
        '    "nitrogen_g_per_100g": <number>\n' +
        '    "protein_g_per_100g: <number>,\n' +
        '    "ash_g_per_100g: <number>,\n' +
        '    "calcium_mg_per_100g: <number>,\n' +
        '    "iron_mg_per_100g: <number>,\n' +
        '    "magnesium_mg_per_100g: <number>,\n' +
        '    "phosphorus_mg_per_100g: <number>,\n' +
        '    "potassium_mg_per_100g: <number>,\n' +
        '    "zinc_mg_per_100g: <number>,\n' +
        '    "copper_mg_per_100g: <number>,\n' +
        '    "manganese_mg_per_100g: <number>,\n' +
        '    "selenium_micro_g_per_100g: <number>,\n' +
        '    "vitamin_a_mg_per_100g: <number>,\n' +
        '    "vitamin_b1_thiamin_mg_per_100g: <number>,\n' +
        '    "vitamin_b2_mg_per_100g: <number>,\n' +
        '    "vitamin_b3_niacin_mg_per_100g: <number>,\n' +
        '    "vitamin_b6_mg_per_100g: <number>,\n' +
        '    "vitamin_b7_biotin_micro_g_per_100g: <number>,\n' +
        '    "vitamin_b9_folate_mg_per_100g: <number>,\n' +
        '    "vitamin_b12_mg_per_100g: <number>,\n' +
        '    "vitamin_e_mg_per_100g: <number>,\n' +
        '    "vitamin_k_micro_g_per_100g: <number>,\n' +
        '    "sfa_16_0_palmitic_acid_g_per_100g: <number>,\n' +
        '    "sfa_18_0_stearic_acid_g_per_100g: <number>,\n' +
        '    "mufa_16_1_palmitoleic_acid_g_per_100g: <number>,\n' +
        '    "mufa_18_1__oleic_acid_g_per_100g: <number>,\n' +
        '    "pufa_18_2_linoleic_acid_g_per_100g: <number>,\n' +
        '    "tryptophan_g_per_100g: <number>,\n' +
        '    "threonine_g_per_100g: <number>,\n' +
        '    "isoleucine_g_per_100g: <number>,\n' +
        '    "leucine_g_per_100g: <number>,\n' +
        '    "lysine_g_per_100g: <number>,\n' +
        '    "methionine_g_per_100g: <number>,\n' +
        '    "phenylalanine_g_per_100g: <number>,\n' +
        '    "tyrosine_g_per_100g: <number>,\n' +
        '    "valine_g_per_100g: <number>,\n' +
        '    "arginine_g_per_100g: <number>,\n' +
        '    "histidine_g_per_100g: <number>,\n' +
        '    "alanine_g_per_100g: <number>,\n' +
        '    "aspartic_acid_g_per_100g: <number>,\n' +
        '    "glutamic_acid_g_per_100g: <number>,\n' +
        '    "glycine_g_per_100g: <number>,\n' +
        '    "proline_g_per_100g: <number>,\n' +
        '    "serine_g_per_100g: <number>,\n' +
        '    "hydroxyproline_g_per_100g: <number>,\n' +
        '    "cysteine_g_per_100g: <number>,\n' +
        '    "daidzein_mg_per_100g: <number>,\n' +
        '    "genistein_mg_per_100g: <number>,\n' +
        '    "daidzin_mg_per_100g: <number>,\n' +
        '    "genistin_mg_per_100g: <number>,\n' +
        '    "glycitin_mg_per_100g": <number>,\n' +
        "  },\n" +
        '  "is_oil": <boolean> // true, or false, or false if unknown)\n' +
        '  "is_salt": <boolean> // true, or false, or false if unknown)\n' +
        '  "confidence": <number> // 0 to 1, e.g., 0.95 for 95% confidence\n' +
        "}\n" +
        "Use 0 for unknown numeric values and null for optional fields if unknown. Base your response on reliable nutritional data where possible.",
    },
    {
      role: "user",
      content: `Classify and analyze "${name}".`,
    },
  ];
  return prompt;
};

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
  messages: PromptMessage[];
  temperature?: number; // Optional: Controls randomness (0.0 to 1.0 typically)
  maxTokens?: number; // Optional: Limits response length
  stream?: boolean; // Optional: Stream responses
}

// FUTURE Keep this, incase we move to chatGPT instead of X
type openAiModels = "gpt-4o-2024-05-13" | "gpt-4" | "gpt-3.5-turbo" | "gpt-4o-2024-05-13";
const sdks = {
  xai: {
    connect: new OpenAI({
      apiKey: process.env.XAI_API_KEY,
      baseURL: "https://api.x.ai/v1",
    }),
    model: "grok-2-latest",
  },
};
type TSDK = "openai" | "xai" | "gemini";

// RELIGIOUS CERTIFICATION (kosher, halal)
// no, yes, unlikely,likely, unknown
function matchReligiousCertId(
  name: string,
  religiousCertArray: {
    id: Id<"ingredients_religious_certification">;
    name: string;
  }[],
) {
  const match = religiousCertArray.find((item) => item.name.toLowerCase() === name.toLowerCase());
  const unknownId = religiousCertArray.find((item) => item.name.toLowerCase() === "unknown");
  return match?.id ?? unknownId?.id ?? null;
}

// ALLERGY Arrays {ingredient_id, allergy_id},
function matchAllergyId(
  allergyArray: { id: Id<"allergy">; name: string }[],
  allergiesJson: string,
  ingredientId: Id<"ingredients">,
) {
  let ingredientAllergyObj: {
    ingredient_id: Id<"ingredients">;
    allergy_id: Id<"allergy">;
  }[] = [];

  // Split Pipe delimited string into array
  allergiesJson = allergiesJson.toLowerCase().trim();

  const allergiesSplit: string[] = allergiesJson.includes("|")
    ? allergiesJson
        .split("|")
        .map((allergy: string) => allergy.trim())
        .filter(Boolean) // filter(Boolean) removes empty strings
    : [allergiesJson]; // if no pipe, one string []

  // Find the ID for "unknown" allergy to use as a fallback
  const unknownAllergyId =
    allergyArray.find((item) => item.name.toLowerCase() === "unknown")?.id || null;

  // Look through the array of strings
  for (let i = 0; i < allergiesSplit.length; i++) {
    // LOOP THROUGH STRINGS - MATCH ID/IDs
    const allergyId: Id<"allergy"> | null =
      allergyArray.find((item) => item.name.toLowerCase() === allergiesSplit[i])?.id ||
      unknownAllergyId ||
      null;

    if (!allergyId) {
      throw new Error(`*** error No unknown allergy found.`);
    }

    if (allergyId) {
      ingredientAllergyObj = [
        ...ingredientAllergyObj,
        {
          ingredient_id: ingredientId,
          allergy_id: allergyId ?? unknownAllergyId,
        },
      ];
    }
  }
  // Object returned for LOOKUP TABLE to INSERT key/value pairs
  return ingredientAllergyObj;
}

function matchDietaryCatId(
  dietaryCatArray: {
    id: Id<"dietary_classification">;
    name: string;
  }[],
  dietaryCat: string,
): Id<"dietary_classification"> | null {
  const match = dietaryCatArray.find(
    (item) => item.name.toLowerCase() === dietaryCat.toLowerCase(),
  );
  const unknownId = dietaryCatArray.find((item) => item.name.toLowerCase() === "unknown");
  // const id = match ? Number(match.id) : 4; // 4: unknown
  return match?.id ?? unknownId?.id ?? null;
}

function matchUnitTypeId(
  unitTypeArray: { id: Id<"unit_type">; name: string }[],
  unitType: string,
): Id<"unit_type"> | null {
  const match = unitTypeArray.find((item) => item.name.toLowerCase() === unitType.toLowerCase());
  const unknownId = unitTypeArray.find((item) => item.name.toLowerCase() === "unknown");
  // const id = match ? Number(match.id) : 4; // 4: unknown
  return match?.id ?? unknownId?.id ?? null;
}

function matchPrimaryCategoryId(
  primaryCatArray: {
    id: Id<"ingredient_category_primary">;
    name: string;
  }[],
  primaryCat: string,
): Id<"ingredient_category_primary"> | null {
  const match = primaryCatArray.find(
    (item) => item.name.toLowerCase() === primaryCat.toLowerCase(),
  );
  const unknownId = primaryCatArray.find((item) => item.name.toLowerCase() === "unknown");
  // const id = match ? match.id : 0; // 0: unknown
  return match?.id ?? unknownId?.id ?? null;
}
