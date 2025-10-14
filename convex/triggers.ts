import { internalMutation, mutation as rawMutation } from "./_generated/server";
import { DataModel } from "./_generated/dataModel";
import { Triggers } from "convex-helpers/server/triggers";
import { customCtx, customMutation } from "convex-helpers/server/customFunctions";

// Initialize triggers
const triggers = new Triggers<DataModel>();

// INFO: THIS METHOD needs to be manually used elsewhere
// Register the trigger for the "ingredients" table
triggers.register("ingredients", async (ctx, change) => {
  console.log("Trigger fired for ingredients table:", change);
  if (change.operation === "insert" && change.newDoc) {
    await ctx.db.insert("webhook_queue", {
      ingredient_id: change.newDoc._id,
      name: change.newDoc.name,
      processed: false,
    });
    console.log(`Trigger inserted ${change.newDoc.name} into webhook_queue`);
  }
});
// Export wrapped mutation so triggers run
export const ingredientTriggerMutation = customMutation(rawMutation, customCtx(triggers.wrapDB));

// INFO: THIS METHOD is added to the defineTables in schema.ts
// export const addToWebhookQueue = internalMutation({
//   handler: async (ctx, { newDoc }: any) => {
//     console.log(`Trigger fired for new ingredient: ${newDoc.name}`);
//     await ctx.db.insert("webhook_queue", {
//       ingredient_id: newDoc._id,
//       name: newDoc.name,
//       processed: false,
//     });
//   },
// });
