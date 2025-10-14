import { v } from "convex/values";
import { QueryCtx, mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { internal } from "./_generated/api";

// export const getSuppliersByOrg({
//   args: {
//     orgId: v.id("org"),
//   },
//    handler: async (ctx, args) => {
//     return await ctx.db.query("YOUR_TABLE_NAME").take(10);
//   }
// });

export const hello = query({
  handler: async (ctx) => {
    return "Hello, Convex!";
  },
});

export const selectAllOrgs = query({
  handler: async (ctx) => {
    return await ctx.db.query("org").collect();
  },
});
// export const selectAllSuppliersByOrg = query({
//   handler: async (ctx) => {
//     args: {
//       orgId: v.id("org");
//     }

//     return await ctx.db.query("supplier", arg).collect();
//   },
// });

export const selectAllSuppliersByOrg = query({
  args: { orgId: v.id("org") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("supplier")
      .filter((q) => q.eq(q.field("org_id"), args.orgId))
      .collect();
  },
});
