// convex/mutations.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrg = mutation({
  args: { name: v.string(), address: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("org", {
      // Your schema likely has more fields to add here
      //   id: crypto.randomUUID(), // Or pass in the old one if needed
      name: args.name,
      address: args.address,
      active: true, // Set default values
      payment_options: "default",
      contacts: "default",
      unit_metric_imperial_name: "metric",
      country_locale_id: "your_default_locale_id" as any, // Cast if needed for seeding
      recipe_mode_name: "home",
    });
  },
});

export const createSupplier = mutation({
  args: { name: v.string(), orgId: v.id("org") },
  handler: async (ctx, args) => {
    await ctx.db.insert("supplier", {
      name: args.name,
      org_id: args.orgId,
    });
  },
});
