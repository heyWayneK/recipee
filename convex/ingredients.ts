// To run: npx convex run ingredients:seed

import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { ingredientTriggerMutation } from "./triggers";
import { Id } from "./_generated/dataModel";

const orgId = "kh7155v7tjdzt7zwwcf010wp7d7rxcv8"; // superAdmin master account

const newIngredient: any = [
  { deleted: false, is_default: false, is_oil: false, is_salt: false, name: "banana", org_id: orgId },
  { deleted: false, is_default: false, is_oil: false, is_salt: false, name: "cucumber", org_id: orgId },
];

// export const seed = internalMutation({
export const seed = ingredientTriggerMutation({
  args: {},
  handler: async (ctx, args) => {
    for (const ingredient of newIngredient) {
      await ctx.db.insert("ingredients", {
        ...ingredient,
      });
      console.log(`Inserted ingredient: ${ingredient.name}`);
    }
    return `Inserted ${newIngredient.length} ingredients.`;
  },
});

// export const createSupplierXXX = mutation({
//   args: { name: v.string(), orgId: v.id("org") },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("supplier", {
//       name: args.name,
//       org_id: args.orgId,
//     });
//   },
// });
