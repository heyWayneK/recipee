// INFO: This script demonstrates how to import data as a seed file
// To run: npx convex run importSeedData

// convex/importData.ts
"use client";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { ConvexError } from "convex/values";

// This is the main action you will run from the command line.
export const run = internalAction({
  handler: async (ctx) => {
    // ⚠️ IMPORTANT: Import parent tables before child tables.
    // In this example, 'org' is the parent of 'supplier'.

    // 1. Create a map to store old Supabase IDs -> new Convex _id's
    const orgIdMap = new Map<string, any>(); // Maps old org.uuid to new org._id

    // 2. Pretend this is your data read from 'orgs.csv'
    const orgsFromCsv = [
      { uuid: "uuid-org-1", name: "First Org", address: "123 Main St" },
      { uuid: "uuid-org-2", name: "Second Org", address: "456 Oak Ave" },
    ];

    console.log("Importing organizations...");
    for (const org of orgsFromCsv) {
      // Create the new org document in Convex
      const newOrgId = await ctx.runMutation(internal.mutations.createOrg, {
        name: org.name,
        address: org.address,
        // ...other org fields
      });
      // Store the mapping from the old ID to the new one
      orgIdMap.set(org.uuid, newOrgId);
      console.log(`Mapped old UUID ${org.uuid} to new Convex ID ${newOrgId}`);
    }

    // 3. Pretend this is your data read from 'suppliers.csv'
    const suppliersFromCsv = [
      { name: "Supplier A", org_uuid: "uuid-org-1" },
      { name: "Supplier B", org_uuid: "uuid-org-2" },
      { name: "Supplier C", org_uuid: "uuid-org-1" },
    ];

    console.log("\nImporting suppliers...");
    for (const supplier of suppliersFromCsv) {
      // 4. Look up the new Convex ID for the parent org
      const newOrgId = orgIdMap.get(supplier.org_uuid);

      if (!newOrgId) {
        console.error(`Could not find new ID for old org_uuid: ${supplier.org_uuid}`);
        continue; // Skip this supplier if its parent org wasn't found
      }

      // 5. Create the supplier with the correct, new orgId
      await ctx.runMutation(internal.mutations.createSupplier, {
        name: supplier.name,
        orgId: newOrgId, // Use the new, mapped ID
      });
    }

    console.log("\n✅ Import complete!");
  },
});
