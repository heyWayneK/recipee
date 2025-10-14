// INFO: to run npx convex run classify_ingredients:processWebhookQueue

import { QueryCtx, internalAction, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { logger } from "@/libs/serverside_logger";
import { cache } from "react";
// import { json } from "stream/consumers";
// FUTURE: import { GoogleGenerativeAI } from "@google/generative-ai";

// TYPES
// Assuming the shape of a webhook_queue row:
// type WebhookQueueItem = {
//   row: { _id: Id<"webhook_queue"> };
//   name: string;
//   ingredient_id: string;
//   processed: boolean;
//   // ...other fields
// };

export const processWebhookQueue = internalAction({
  handler: async (ctx) => {
    // Query webhook_queue for unprocessed rows - Limit to 2 for now
    const unprocessed: Doc<"webhook_queue">[] = await ctx.runQuery(
      internal.classify_ingredients.getUnprocessedWebhookQueueItems,
    );
    console.log("*** unprocessed:", { unprocessed });

    // SUBMIT TO OPENAI FOR CLASSIFICATION
    for (const row of unprocessed) {
      console.log("*** row", { row });

      // classifyIngredientGPT
      const classification: any = await ctx.runAction(internal.llm_prompts.classifyIngredientGPT, {
        name: row.name,
        ingredient_id: row.ingredient_id,
      });

      console.log("*** classification:", classification);
    }
    return `Processed ${unprocessed.length} webhook queue items.`;
  },
});

export const getUnprocessedWebhookQueueItems = internalQuery({
  handler: async (ctx: QueryCtx): Promise<Doc<"webhook_queue">[]> => {
    const result = await ctx.db
      .query("webhook_queue")
      .filter((q) => q.eq(q.field("processed"), false))
      .take(1);
    return result;
  },
});

export const insertIngredientClassification = internalMutation({
  // args: { name: v.string(), ingredient_id: v.id("ingredients"), row: v.object({ _id: v.id("webhook_queue") }) },

  args: {
    _id: v.id("webhook_queue"),
    name: v.string(),
    ingredient_id: v.id("ingredients"),
    _creationTime: v.number(),
    processed: v.boolean(),
  },
  handler: async (ctx, args) => {
    logger.info("*** insertIngredientClassification args:", args);
    const name_orig = "ZZZZZZ";
    // Insert data back into ingredients table
    await ctx.db.patch(args.ingredient_id, { name: args.name, name_orig });

    // await ctx.scheduler.runAfter(0, internal.llm_prompts.classifyIngredientGPT, {
    //   name: args.name,
    //   ingredient_id: args.ingredient_id,
    // });

    // Mark webhook_queue as "processed = true"
    await ctx.db.patch(args._id, { processed: true });
    // Will delete later on
    console.log(`*** Processed ingredient`, { name: args.name });
  },
});

// // IF I WANT TO RUN AS A POST WEBHOOK
// // app/api/trigger-mutation/route.ts
// import { NextResponse } from "next/server";
// import { api } from "@/convex/_generated/api";
// import { fetchMutation } from "convex/nextjs";

// export async function POST(request: Request) {
//   // Parse request body, call your mutation
//   await fetchMutation(api.yourMutation, { /* args */ });
//   return NextResponse.json({ success: true });
// }
