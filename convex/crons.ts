import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// crons.interval(
//   "process webhook queue", // Unique name
//   { minutes: 5 }, // Every 5 minutes
//   internal.classify_ingredients.processWebhookQueue, // Reference to your internal mutation
//   // turn off for now
// );

export default crons;
