/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as classify_ingredients from "../classify_ingredients.js";
import type * as crons from "../crons.js";
import type * as importSeedData from "../importSeedData.js";
import type * as ingredients from "../ingredients.js";
import type * as llm_prompts from "../llm_prompts.js";
import type * as mutations from "../mutations.js";
import type * as query from "../query.js";
import type * as triggers from "../triggers.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  classify_ingredients: typeof classify_ingredients;
  crons: typeof crons;
  importSeedData: typeof importSeedData;
  ingredients: typeof ingredients;
  llm_prompts: typeof llm_prompts;
  mutations: typeof mutations;
  query: typeof query;
  triggers: typeof triggers;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
