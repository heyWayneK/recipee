"use server";

import { calcProfit } from "@/utils/utils";
import { LineItemsLookup, PreCalculatedRecipeData, SystemDataProps, UnitTypeSelect, measurementUnitsObjProps } from "@/types/recipeTypes";
import { Decimal } from "decimal.js";
import { logger } from "./serverside_logger";

export async function preCalculateData(recipeData: PreCalculatedRecipeData, systemData: SystemDataProps): Promise<Partial<PreCalculatedRecipeData>> {
  /**
   * TODO: Self Healing Recipe
   * This function will check if the recipe data is valid and if not, it will try to fix it.
   * It will also log any errors that occur during the process.
   * * @param recipeData - The recipe data to be checked and fixed.
   * * @param systemData - The system data to be used for the calculations.
   * * @returns - The pre-calculated recipe data with all the required settings.
   */

  const allowErrors: boolean = true; // Set to true to allow errors, false to throw errors

  /**
   * SERVER SIDE LOGGING
   * Ensure console.log is used in production
   */
  logger.info("Pre-calculating recipe data", {
    recipeId: recipeData.data?.uuid,
    portionsCount: recipeData.data?.portions.length,
    componentsCount: recipeData.data?.components.length,
    recipesCount: recipeData.data?.recipes.length,
  });

  logger.debug("Pre-calculating recipe data", {
    recipeId: recipeData.data?.uuid,
    portionsCount: recipeData.data?.portions.length,
    componentsCount: recipeData.data?.components.length,
    recipesCount: recipeData.data?.recipes.length,
  });
  logger.error("Pre-calculating recipe data", {
    recipeId: recipeData.data?.uuid,
    portionsCount: recipeData.data?.portions.length,
    componentsCount: recipeData.data?.components.length,
    recipesCount: recipeData.data?.recipes.length,
  });

  // ERROR HANDLING
  if (!recipeData || !recipeData.data) {
    console.error("Recipe data is not available");
    return {};
  }
  if (!systemData || !systemData.org) {
    console.error("System data is not available");
    return {};
  }
  if (recipeData.data.portions.length === 0) {
    console.error("No portions found in recipe data");
    return {};
  }

  if (recipeData.data.components.length === 0) {
    console.error("No components found in recipe data");
    return {};
  }

  if (recipeData.data.recipes.length === 0) {
    console.error("No recipes found in recipe data");
    return {};
  }

  // TODO: ADD HISTORY
  // PLATING COST CALCULATION ____________________START::
  // RECALC LIVE PORTION SIZES___________________________
  const portionSizes: number[] = [];
  const portionIds: number[] = [];
  const portionsSum: Decimal[] = [];

  const o = recipeData.data.portions;
  for (const portion of o.sort((a, b) => a.order - b.order)) {
    if (!portion.qty_g) console.error(`Portion with no qty`);
    if (!portion.id) console.error(`Portion with no id`);
    if (!portion.order) console.error(`Portion with no order`);

    portionSizes.push(portion.qty_g);
    portionIds.push(portion.id);

    portionsSum.push(
      recipeData.data.components.reduce((acc, comp) => {
        let getQty = comp.portions.find((p) => p.id === portion.id)?.qty_g;
        if (!getQty) {
          getQty = 0; // If allowErrors true, set=0 instead of throwing an error
          if (!allowErrors) {
            throw new Error(`Portion ${portion.id} not found in component ${comp.name}`);
          }
        }
        return acc.add(getQty);
      }, new Decimal(0))
    );

    // ERROR if expected do not match actual portions sum
    if (new Decimal(portionSizes[portionSizes.length - 1]).toString() !== portionsSum[portionsSum.length - 1].toString()) {
      const e = `Recipe plating portions do not match actual sum of plating portions: ${portionSizes.toString()} !== ${portionsSum.toString()} grams`;
      console.warn(e);
      // TODO: turn errors on
      console.error(e);
      // throw new Error(e);
    }
  }

  // COMPONENT WEIGHTS ARRAY : number[][]________________
  const componentsNamesArray: string[] = [];
  const componentsWeights: number[][] = [];
  const componentsIDArray: string[] = [];
  for (const component of recipeData.data.components.sort((a, b) => a.order - b.order)) {
    if (!component.name) {
      if (allowErrors) {
        throw new Error(`Component ${component.name} does not have portions name`);
      }
      componentsNamesArray.push("No Name");
    } else {
      componentsNamesArray.push(component.name);
    }

    componentsWeights.push(
      portionIds.map((portionId) => {
        const getQty = component.portions.find((p) => p.id === portionId)?.qty_g || 0;
        if (!getQty) console.error(`Portion ${portionId} not in ${component.name}`);
        return getQty;
      })
    );
    componentsIDArray.push(component.uuid);
  }

  // COSTS PER 1000/COMPONENT____________________________
  const componentsPricePer1000Decimals: Decimal[] = [];
  for (const component of recipeData.data.components) {
    const recipeId = component.uuid;
    if (!recipeId) {
      throw new Error(`No Component RecipeId. recipeData.data.components`);
    }
    const recipe = recipeData.data.recipes.find((recipe) => recipe.uuid === recipeId);
    if (!recipe) {
      throw new Error(`No Component Recipe with ID ${recipeId} can't find ID in recipeData.data.recipes`);
    }

    const totalPrice = recipe.recipeDetail.reduce((ttlPrice, val) => {
      if (val.type !== "ingredient") return ttlPrice;
      const costPer1000 = new Decimal(val.costPer1000);
      const qty = new Decimal(val.qty);
      return ttlPrice.add(costPer1000.mul(qty.div(1000)));
    }, new Decimal(0));

    const totalWeight = recipe.recipeDetail.reduce((ttlWeight, val) => {
      if (val.type !== "ingredient") return ttlWeight;
      return ttlWeight.add(val.qty);
    }, new Decimal(0));

    const yld: Decimal = component.yield ? new Decimal(component.yield) : new Decimal(1.0);

    // Avoid division by zero
    const effectiveWeight = new Decimal(totalWeight).mul(yld);
    if (effectiveWeight.isZero()) {
      componentsPricePer1000Decimals.push(new Decimal(0));
    } else {
      componentsPricePer1000Decimals.push(totalPrice.div(effectiveWeight.div(1000)));
    }
  }

  // COMPONENT PRICES per portion : Decimal[][]___________
  const componentsPricesDecimals: Decimal[][] = [];
  for (let iC = 0; iC < componentsWeights.length; iC++) {
    componentsPricesDecimals.push(componentsWeights[iC].map((portionWeight) => new Decimal(portionWeight).div(1000).mul(componentsPricePer1000Decimals[iC])));
  }

  // SUB-TOTALS OF COMPONENT PRICES per portion : Decimal[]
  const componentsSubTotalsPricesDecimals: Decimal[] = [];
  for (let iP = 0; iP < portionSizes.length; iP++) {
    componentsSubTotalsPricesDecimals.push(componentsPricesDecimals.reduce((acc, componentPrices) => acc.add(componentPrices[iP]), new Decimal(0)));
  }

  // COMPONENT PRICES BREAKDOWN [][][]___________________
  const componentsPricesDesc: string[][][] = [];
  for (let iC = 0; iC < recipeData.data.components.length; iC++) {
    const recipeId = recipeData.data.components[iC].uuid;
    const recipe = recipeData.data.recipes.find((r) => r.uuid === recipeId);

    if (!recipe) {
      throw new Error(`Recipe with ID ${recipeId} not found. Component recipeId and Recipe id must match`);
    }

    componentsPricesDesc.push(
      portionSizes.map((_, iP) => {
        const componentTotalWeight = recipe.recipeDetail.reduce((acc, val) => (val.type === "ingredient" ? acc.add(val.qty) : acc), new Decimal(0));

        if (componentTotalWeight.isZero()) return [];

        return recipe.recipeDetail.flatMap((row) => {
          if (row.type !== "ingredient") return [];
          const ingredientCost = new Decimal(row.qty).div(componentTotalWeight).mul(componentsPricesDecimals[iC][iP]);
          return `${row.ingredName}: ${ingredientCost.toFixed(4)}`; // Using .toFixed for display
        });
      })
    );
  }

  const returnLookupCostsArr = (categoryId: number, lookupArray: LineItemsLookup[]): Decimal => {
    return lookupArray.reduce((acc, val) => {
      const categoryIds = val.category_ids.split(",");
      if (categoryIds.includes(categoryId.toString())) {
        return acc.add(val.cost);
      }
      return acc;
    }, new Decimal(0));
  };

  // PACKAGING COSTS AND RULES ARRAYS____________________
  const packingCostPriceTotalsDecimals: Decimal[] = [];
  const packingCostPriceRules: number[] = [];
  for (const portionId of portionIds) {
    const packagingIdRuleForPortion = recipeData.data.packagingCostsId.find((p) => p.pid === portionId)?.rule;
    if (packagingIdRuleForPortion === undefined) {
      throw new Error(`Packaging rule for portion ID ${portionId} not found.`);
    }
    packingCostPriceRules.push(packagingIdRuleForPortion);
    const cost = returnLookupCostsArr(packagingIdRuleForPortion, systemData.packaging_costs_line_items_lookup);
    packingCostPriceTotalsDecimals.push(cost);
  }

  // OTHER COSTS AND RULES ARRAY_________________________
  const otherCostsPriceTotalsDecimals: Decimal[] = [];
  const otherCostsPriceRules: number[] = [];
  for (const portionId of portionIds) {
    let otherCostsIdRuleForPortion = recipeData.data.otherCostsId.find((p) => p.pid === portionId)?.rule;

    if (otherCostsIdRuleForPortion === undefined) {
      if (!allowErrors) {
        throw new Error(`Other costs rule for portion ID ${portionId} not found.`);
      } else {
        console.warn(`Other costs rule for portion ID ${portionId} not found. Setting to 0.`);
        otherCostsIdRuleForPortion = 0;
      }
    }
    otherCostsPriceRules.push(otherCostsIdRuleForPortion);
    const cost = returnLookupCostsArr(otherCostsIdRuleForPortion, systemData.other_costs_line_items_lookup);
    otherCostsPriceTotalsDecimals.push(cost);
  }

  // SUB TOTAL COSTS_____________________________________
  const costsSubTotalsDecimals: Decimal[] = portionSizes.map((_, i) => componentsSubTotalsPricesDecimals[i].add(packingCostPriceTotalsDecimals[i]).add(otherCostsPriceTotalsDecimals[i]));

  // MARKUP CALCULATIONS AND RULES _______________________
  const markUpPriceAmountsDecimals: Decimal[] = [];
  const markUpPriceRules: number[] = [];
  const markUpPriceRuleName: string[] = [];
  for (let i = 0; i < portionIds.length; i++) {
    const markupRuleId = recipeData.data.markupId.find((p) => portionIds[i] === p.pid)?.rule;
    if (markupRuleId === undefined) {
      throw new Error(`Markup rule for portion ID ${portionIds[i]} not found.`);
    }
    const foundMarkupRule = systemData.markup.find((m) => m.id === markupRuleId);
    if (!foundMarkupRule) throw new Error(`Markup Rule ID: ${markupRuleId} not found in db.`);

    const { markup_type, factor, name } = foundMarkupRule;
    const markupAmount = calcProfit(costsSubTotalsDecimals[i].toNumber(), markup_type.name, Number(factor));
    markUpPriceAmountsDecimals.push(new Decimal(markupAmount));
    markUpPriceRules.push(markupRuleId);
    markUpPriceRuleName.push(name);
  }

  // SALES PRICE EX VAT _____________________________________
  const salePricesExVatDecimals: Decimal[] = costsSubTotalsDecimals.map((cost, i) => cost.add(markUpPriceAmountsDecimals[i]));

  // SALES PRICE INCL VAT ___________________________________
  const salesPricesIncVatDecimals: Decimal[] = [];
  const vatRuleIds: number[] = [];
  const vatRulePercs: number[] = [];
  const vatRuleNames: string[] = [];

  const defaultVatRule = systemData.vat_rules.find((vat) => vat.default) || systemData.vat_rules[0];
  const defaultVatPerc = defaultVatRule ? new Decimal(defaultVatRule.cost) : new Decimal(0);

  portionIds.forEach((pid, i) => {
    const vatRuleId = recipeData.data.vatRulesId.find((rule) => rule.pid === pid)?.rule;
    const vatRule = systemData.vat_rules.find((vat) => vat.id === vatRuleId);

    if (vatRuleId === undefined || !vatRule) {
      if (!allowErrors) throw new Error(`VAT rule for portion ID ${pid} not found.`);
      console.warn(`VAT rule for portion ID ${pid} not found. Using default.`);
      const vatAmount = salePricesExVatDecimals[i].mul(defaultVatPerc);
      salesPricesIncVatDecimals.push(salePricesExVatDecimals[i].add(vatAmount));
      vatRuleIds.push(defaultVatRule?.id || 0);
      vatRulePercs.push(defaultVatPerc.toNumber());
      vatRuleNames.push(defaultVatRule?.name || "No VAT found");
      return;
    }

    const vatRulePerc = new Decimal(vatRule.cost);
    const vatAmount = salePricesExVatDecimals[i].mul(vatRulePerc);
    salesPricesIncVatDecimals.push(salePricesExVatDecimals[i].add(vatAmount));
    vatRuleIds.push(vatRuleId);
    vatRulePercs.push(vatRulePerc.toNumber());
    vatRuleNames.push(vatRule.name);
  });

  // MEASUREMENT UNITS ____________________________________
  /**
   * @returns weight, fluid, each as METRIC or IMPERIAL units
   * This will check if the system is using metric or imperial units
   * then extract the fluid, weight, and each units in METRIC or IMPERIAL
   * Objects are always smaller|bigger  e.g. mL|L or g|kg or each|each
   */
  const measurementUnitsObj: measurementUnitsObjProps = { weight: [], fluid: [], each: [] } as measurementUnitsObjProps;

  // Needs to be either "metric" or "imperial" as keys of UnitTypeSelect
  // We then retrieve either the metric or imperial units based on the org's default unit type
  const orgDefaultUnitType: keyof UnitTypeSelect = (systemData.org.unit_metric_imperial_name as keyof UnitTypeSelect) || "metric";

  if (orgDefaultUnitType !== "metric" && orgDefaultUnitType !== "imperial") {
    throw new Error(`Invalid org unit type: ${orgDefaultUnitType}, should be either "metric" or "imperial".`);
  }

  if (!systemData.unit_type || !Array.isArray(systemData.unit_type) || systemData.unit_type.length != 3) throw new Error("System data does not contain valid unit types.");

  for (const unit of systemData.unit_type) {
    if (!unit.name || !unit.metric || !unit[orgDefaultUnitType]) {
      console.warn("Unit type object is missing required properties:", unit);
      continue;
    }

    // Loop through "weight", "fluid", and "each" to populate the measurementUnitsObj
    if (unit.name in measurementUnitsObj) {
      if (unit === null || unit[orgDefaultUnitType] === null) {
        console.warn(`Unit type ${unit.name} has null values for ${orgDefaultUnitType}.`);
        measurementUnitsObj[unit.name as keyof measurementUnitsObjProps] = ["No Unit", "No Unit"];
      }
      if (orgDefaultUnitType === "metric") {
        // unit_name is either "weight", "fluid", or "each"
        measurementUnitsObj[unit.name as keyof measurementUnitsObjProps] = unit["metric"].split("|");
      } else if (orgDefaultUnitType === "imperial") {
        // unit_name is either "weight", "fluid", or "each"
        measurementUnitsObj[unit.name as keyof measurementUnitsObjProps] = unit["imperial"]?.split("|") ?? ["No Unit", "No Unit"];
      } else {
        measurementUnitsObj[unit.name as keyof measurementUnitsObjProps] = ["No Unit", "No Unit"];
        throw new Error(`Invalid org unit type: ${orgDefaultUnitType}, should be either "metric" or "imperial".`);
      }
    }
  }

  // FINAL OBJECT with number types for compatibility
  const obj: Partial<PreCalculatedRecipeData> = {
    portionSizes,
    portionIds,
    componentsNamesArray,
    componentsIDArray,
    componentsWeights,
    componentsPricePer1000: componentsPricePer1000Decimals.map((d) => d.toNumber()),
    componentsPrices: componentsPricesDecimals.map((row) => row.map((d) => d.toNumber())),
    componentsPricesDesc,
    componentsSubTotalsPrices: componentsSubTotalsPricesDecimals.map((d) => d.toNumber()),
    packingCostPriceTotals: packingCostPriceTotalsDecimals.map((d) => d.toNumber()),
    packingCostPriceRules,
    otherCostsPriceTotals: otherCostsPriceTotalsDecimals.map((d) => d.toNumber()),
    otherCostsPriceRules,
    markUpPriceAmounts: markUpPriceAmountsDecimals.map((d) => d.toNumber()),
    markUpPriceRules,
    markUpPriceRuleName,
    costsSubTotals: costsSubTotalsDecimals.map((d) => d.toNumber()),
    salePricesExVat: salePricesExVatDecimals.map((d) => d.toNumber()),
    salesPricesIncVat: salesPricesIncVatDecimals.map((d) => d.toNumber()),
    vatRuleIds,
    vatRulePercs,
    vatRuleNames,
    isImperial: systemData.org.unit_metric_imperial_name === "imperial" || false,
    isHome: recipeData.isHome || false,
    currencySymbol: systemData.org.country_locale?.currency_symbol || "",
    measurementUnitsObj,
  };

  return obj;
}

/* INFO:: 
      const updatePackagingRule = (portionSize: number, ruleId: number) => {
       const newObj = { ...recipeData.data.packagingCostsId, ...{ [portionSize]: ruleId } };
       updateRecipeData((recipeData.data.packagingCostsId = { ...newObj }));
      };
*/

// "use server";

// import { calcProfit } from "@/utils/utils";
// import { LineItemsLookup, PreCalculatedRecipeData, SystemDataProps, measurementUnitsObjProps } from "@/types/recipeTypes";
// import { Decimal } from "decimal.js";
// import { logger } from "./serverside_logger";

// export async function preCalculateData(recipeData: PreCalculatedRecipeData, systemData: SystemDataProps): Promise<Partial<PreCalculatedRecipeData>> {
//   /**
//    * TODO: Self Healing Recipe
//    * This function will check if the recipe data is valid and if not, it will try to fix it.
//    * It will also log any errors that occur during the process.
//    * * @param recipeData - The recipe data to be checked and fixed.
//    * * @param systemData - The system data to be used for the calculations.
//    * * @returns - The pre-calculated recipe data with all the required settings.
//    */

//   const allowErrors: boolean = true; // Set to true to allow errors, false to throw errors

//   /**
//    * SERVER SIDE LOGGING
//    * Ensure console.log is used in production
//    */

//   logger.info("Pre-calculating recipe data", {
//     recipeId: recipeData.data?.uuid,
//     portionsCount: recipeData.data?.portions.length,
//     componentsCount: recipeData.data?.components.length,
//     recipesCount: recipeData.data?.recipes.length,
//   });

//   logger.debug("Pre-calculating recipe data", {
//     recipeId: recipeData.data?.uuid,
//     portionsCount: recipeData.data?.portions.length,
//     componentsCount: recipeData.data?.components.length,
//     recipesCount: recipeData.data?.recipes.length,
//   });
//   logger.error("Pre-calculating recipe data", {
//     recipeId: recipeData.data?.uuid,
//     portionsCount: recipeData.data?.portions.length,
//     componentsCount: recipeData.data?.components.length,
//     recipesCount: recipeData.data?.recipes.length,
//   });

//   // ERROR HANDLING
//   if (!recipeData || !recipeData.data) {
//     console.error("Recipe data is not available");
//     return {};
//   }
//   if (!systemData || !systemData.org) {
//     console.error("System data is not available");
//     return {};
//   }
//   if (recipeData.data.portions.length === 0) {
//     console.error("No portions found in recipe data");
//     return {};
//   }

//   if (recipeData.data.components.length === 0) {
//     console.error("No components found in recipe data");
//     return {};
//   }

//   if (recipeData.data.recipes.length === 0) {
//     console.error("No recipes found in recipe data");
//     return {};
//   }

//   // TODO: ADD HISTORY
//   // PLATING COST CALCULATION ____________________START::
//   // RECALC LIVE PORTION SIZES___________________________
//   const portionSizes: number[] = [];
//   const portionIds: number[] = [];
//   const portionsSum: number[] = [];

//   const o = recipeData.data.portions;
//   for (const portion of o.sort((a, b) => a.order - b.order)) {
//     if (!portion.qty_g) console.error(`Portion with no qty`);
//     if (!portion.id) console.error(`Portion with no id`);
//     if (!portion.order) console.error(`Portion with no order`);

//     portionSizes.push(portion.qty_g);

//     portionIds.push(portion.id);

//     portionsSum.push(
//       recipeData.data.components.reduce((acc, comp) => {
//         let getQty = comp.portions.find((p) => p.id === portion.id)?.qty_g;
//         if (!getQty) {
//           getQty = 0; // If allowErrors true, set=0 instead of throwing an error
//           if (allowErrors) {
//             throw new Error(`Portion ${portion.id} not found in component ${comp.name}`);
//           }
//         }
//         return acc + getQty;
//       }, 0)
//     );

//     // ERROR if expected do not match actual portions sum
//     if (portionSizes.toString() !== portionsSum.toString()) {
//       const e = `Recipe plating portions do not match actual sum of plating portions: ${portionSizes.toString()} !== ${portionsSum.toString()} grams`;
//       console.warn(e);
//       // TODO: turn errors on
//       console.error(e);
//       // throw new Error(e);
//     }
//   }
//   // COMPONENT WEIGHTS ARRAY : number[][]________________
//   const componentsNamesArray: string[] = [];
//   const componentsWeights: number[][] = [];
//   const componentsIDArray: string[] = [];
//   for (const component of recipeData.data.components.sort((a, b) => a.order - b.order)) {
//     if (!component.name) {
//       if (allowErrors) {
//         throw new Error(`Component ${component.name} does not have portions name`);
//       }
//       componentsNamesArray.push("No Name");
//     } else {
//       componentsNamesArray.push(component.name);
//     }
//     // NAME
//     // WEIGHTS BY PORTION ARRAY
//     componentsWeights.push(
//       portionIds.map((portionId) => {
//         const getQty = component.portions.find((p) => p.id === portionId)?.qty_g || 0;
//         if (!getQty) console.error(`Portion ${portionId} not in ${component.name}`);
//         return getQty;
//       })
//     );

//     componentsIDArray.push(component.uuid);
//   }
//   // COSTS PER 1000/COMPONENT____________________________
//   const componentsPricePer1000: number[] = [];
//   for (const component of recipeData.data.components) {
//     // FIND RECIPE
//     // const recipeId = component.recipeId;
//     const recipeId = component.uuid;
//     // FIND RECIPE
//     if (!recipeId) {
//       throw new Error(`No Component RecipeId. recipeData.data.components`);
//     }
//     const recipe = recipeData.data.recipes.find((recipe) => recipe.uuid === recipeId);

//     if (!recipe) {
//       throw new Error(`No Component Recipe with ID ${recipeId} can't find ID in recipeData.data.recipes`);
//     }

//     const totalPrice = recipe?.recipeDetail.reduce((ttlPrice, val): number => {
//       if (val.type !== "ingredient") return ttlPrice;
//       // TOTAL RAW WEIGHT
//       // return (ttlPrice += val.costPer1000 * (val.qty / 1000));
//       return (ttlPrice += val.costPer1000 * (val.qty / 1000));
//     }, 0);

//     const totalWeight = recipe?.recipeDetail.reduce((ttlWeight, val): number => {
//       if (val.type !== "ingredient") return ttlWeight;
//       // TOTAL PRICE OF COMPONENT
//       return (ttlWeight += val.qty);
//     }, 0);

//     // TODO: check this yield, added for vercel errors
//     const yld: Decimal = component.yield ? component.yield : new Decimal(1.0);
//     componentsPricePer1000.push(
//       // GET COMPONENT TOTAL INGREDIENTCOST/1000
//       new Decimal(totalPrice).div(new Decimal(totalWeight).mul(yld).div(1000)).toNumber()
//     );
//   }

//   // COMPONENT PRICES per portion : number[][]___________
//   const componentsPrices: number[][] = [];
//   for (let iC = 0; iC < componentsWeights.length; iC++) {
//     componentsPrices.push(componentsWeights[iC].map((portion) => (portion / 1000) * componentsPricePer1000[iC]));
//   }

//   // CREATE ARRAY OF COMPONENENT PRICES per portion number[][]
//   const componentsSubTotalsPrices: number[] = [];
//   for (let iC = 0; iC < portionSizes.length; iC++) {
//     componentsSubTotalsPrices.push(componentsPrices.reduce((acc, val) => (acc += val[iC]), 0));
//   }

//   // COMPONENT PRICES [][][]_____________________________
//   // CREATE FROP DOWN LIST OF INGREDIENT PRICES (To understand where costs are high)
//   const componentsPricesDesc: string[][][] = [];
//   for (let iC = 0; iC < recipeData.data.components.length; iC++) {
//     // find the recipe
//     const recipeId = recipeData.data.components[iC].uuid;
//     const recipe = recipeData.data.recipes.find((recipe) => recipe.uuid === recipeId);

//     if (!recipe) {
//       throw new Error(`Recipe with ID ${recipeId} not found. Component recipeId and Recipe id must match`);
//     }

//     componentsPricesDesc.push(
//       portionSizes.map((_, iP) =>
//         recipe.recipeDetail.flatMap((row, iR) => {
//           // TODO: Check this.
//           // An ingredient can be a component (like "cheese"), without a recipe.
//           if (row.type !== "ingredient") return [];

//           const componentTotalWeight = recipe.recipeDetail.reduce((arr, val) => (arr += val.qty), 0);
//           // Work out igred % in original comp = % * price
//           return row.ingredName + ": " + (row.qty / componentTotalWeight) * componentsPrices[iC][iP];
//         })
//       )
//     );
//   }

//   const ReturnLookupCostsArr = (categoryId: number, lookupArray: LineItemsLookup[]): number => {
//     // Function to get the total cost for a given category ID from the lookup array
//     const ttl = lookupArray.reduce((acc, val) => {
//       // category_ids can have one or more CSV ids
//       if (+val.category_ids === +categoryId || val.category_ids.split(",").includes(categoryId.toString())) {
//         acc += Number(val.cost);
//       }
//       // console.log("Acc Total", acc);
//       return acc;
//     }, 0);
//     // console.log("_____ categoryId", categoryId, "__total", ttl);
//     return ttl;
//   };

//   // PACKAGING COSTS AND RULES ARRAYS____________________
//   const packingCostPriceTotals: number[] = [];
//   const packingCostPriceRules: number[] = [];
//   // Loop through the portions, always using portion IDs
//   for (const portionId of portionIds) {
//     // Summarise the packaging costs in a single array
//     const packagingIdRuleForPortion = recipeData.data.packagingCostsId.find((p) => p.pid === portionId)?.rule || undefined;

//     if (packagingIdRuleForPortion === undefined) throw new Error(`Packaging rule for portion ID ${portionId} not found.`);

//     packingCostPriceRules.push(packagingIdRuleForPortion);

//     // Use Lookup, Category and Line Items to get the total cost for the packaging rule
//     // Get all Line Item Ids for the packaging rule
//     // const packingCostLineItemsCost = systemData.packaging_costs_line_items_lookup
//     //   .filter((item) => item.category_ids.split(",").find((id) => +id === +packagingIdRuleForPortion))
//     //   .reduce((acc, val) => (acc += val.cost), 0);

//     const packingCostLineItemsCost = ReturnLookupCostsArr(packagingIdRuleForPortion, systemData.packaging_costs_line_items_lookup);
//     packingCostPriceTotals.push(packingCostLineItemsCost);
//   }

//   // for (const portion of portionSizes) {
//   //   const packagingCostId = +recipeData.data.packagingCostsId[portion];
//   //   const packingCostObj = systemData.packaging_costs_category.find((cost) => cost.id === packagingCostId);

//   //   if (!packingCostObj) {
//   //     const e = `Packing cost with ID ${packagingCostId} not found. Packing cost id must match`;
//   //     console.error(e);
//   //     throw new Error(e);
//   //   }

//   //   packingCostPriceTotals.push(
//   //     systemData.packaging_costs_line_items_lookup.reduce((acc, val) => {
//   //       if (+val.category_ids === packagingCostId) {
//   //         acc += +val.cost;
//   //       }
//   //       return acc;
//   //     }, 0)
//   //   );
//   //   packingCostPriceRules.push(packagingCostId);
//   // }

//   // OTHER COSTS AND RULES ARRAY_________________________
//   const otherCostsPriceTotals: number[] = [];
//   const otherCostsPriceRules: number[] = [];
//   for (const portionId of portionIds) {
//     // Summarise the packaging costs in a single array
//     let otherCostsIdRuleForPortion = recipeData.data.otherCostsId.find((p) => p.pid === portionId)?.rule || undefined;

//     // If no Other Costs Rule/Category found
//     if (otherCostsIdRuleForPortion === undefined) {
//       if (allowErrors) {
//         throw new Error(`Other costs rule for portion ID ${portionId} not found.`);
//       } else {
//         console.warn(`Other costs rule for portion ID ${portionId} not found. Setting to 0.`);
//         // Select the first rule or set to 0 if allowErrors is true
//         otherCostsIdRuleForPortion = recipeData.data.otherCostsId[0]?.rule || 0; // Set to 0 if allowErrors is true
//         // otherCostsPriceTotals.push(0);
//         // otherCostsPriceRules.push(0);
//         // continue; // Skip this iteration if allowErrors is true
//       }
//     }

//     otherCostsPriceRules.push(otherCostsIdRuleForPortion);

//     // Use Lookup, Category and Line Items to get the total cost for the packaging rule
//     // Get all Line Item Ids for the packaging rule
//     // const packingCostLineItemsCost = systemData.packaging_costs_line_items_lookup
//     //   .filter((item) => item.category_ids.split(",").find((id) => +id === +packagingIdRuleForPortion))
//     //   .reduce((acc, val) => (acc += val.cost), 0);

//     const otherCostLineItemsCost = ReturnLookupCostsArr(otherCostsIdRuleForPortion, systemData.other_costs_line_items_lookup);
//     otherCostsPriceTotals.push(otherCostLineItemsCost);
//   }
//   // for (const portion of portionSizes) {
//   //   const otherCostId = +recipeData.data.otherCostsId[portion];
//   //   const otherCostObj = systemData.other_costs_category.find((cost) => cost.id === otherCostId);

//   //   if (!otherCostObj) {
//   //     const e = `Other costs with ID ${otherCostId} not found. Packing cost id must match`;
//   //     console.error(e);
//   //     throw new Error(e);
//   //   }

//   //   otherCostsPriceTotals.push(
//   //     systemData.other_costs_line_items_lookup.reduce((acc, val) => {
//   //       if (+val.category_ids === otherCostId) {
//   //         acc += +val.cost;
//   //       }
//   //       return acc;
//   //     }, 0)
//   //   );
//   //   otherCostsPriceRules.push(otherCostId);
//   // }

//   // SUB TOTAL COSTS_____________________________________
//   let costsSubTotals: number[] = [];
//   costsSubTotals = portionSizes.map((portion, i) => componentsSubTotalsPrices[i] + packingCostPriceTotals[i] + otherCostsPriceTotals[i]);

//   // MARKUP CALCULATIONS AND RULES _______________________
//   const markUpPriceAmounts: number[] = [];
//   const markUpPriceRules: number[] = [];
//   const markUpPriceRuleName: string[] = [];

//   for (let i = 0; i < portionIds.length; i++) {
//     const markupRuleId = recipeData.data.markupId.find((p) => portionIds[i] === p.pid)?.rule || undefined; // Get the markup rule ID for the portion size
//     console.log("markupRuleId:::", markupRuleId, "portionIds[i]:::", portionIds[i]);
//     if (markupRuleId === undefined) {
//       throw new Error(`Markup rule for portion size ${portionIds[i]} not found.`);
//     }
//     // const markupRuleId = +recipeData.data.markupId[portionSizes[i]];
//     // const foundMarkupRule = systemData.markup.find((m) => m.id === markupRuleId) || undefined;
//     const foundMarkupRule = systemData.markup.find((m) => m.id === markupRuleId) || undefined;

//     if (!foundMarkupRule) throw new Error(`Markup Rule ID: ${markupRuleId} not found in db.`);
//     const { markup_type: name, factor } = foundMarkupRule;
//     markUpPriceAmounts.push(calcProfit(costsSubTotals[i], name.name, Number(factor)));
//     markUpPriceRules.push(markupRuleId);
//     markUpPriceRuleName.push(foundMarkupRule.name);
//   }

//   // SALES PRICE EX VAT _____________________________________
//   const salePricesExVat: number[] = portionSizes.map((portion, i) => {
//     return costsSubTotals[i] + markUpPriceAmounts[i];
//   });

//   // SALES PRICE INCL VAT ______________ _______________________
//   const salesPricesIncVat: number[] = [];
//   const vatRuleIds: number[] = [];
//   const vatRulePercs: number[] = [];
//   const vatRuleNames: string[] = [];

//   // GET DEFAULT VAT in case recipe has no VAT
//   // find vat with default === true or the first one in the list or 0
//   const defaultVatByOrg: number | undefined = Number(systemData.vat_rules.find((vat) => vat.default === true)?.cost || Number(systemData.vat_rules[0].cost) || 0);

//   console.log("defaultVatByOrg:::", defaultVatByOrg);
//   if (!defaultVatByOrg) console.error(`defaultVatByOrg (#${defaultVatByOrg}) not found.`);

//   // GET RULE then GET RULE ID & the VAT VALUE
//   portionIds.map((pid, i) => {
//     // Find the vat rule id that matches the portion id
//     const vatId: number | undefined = recipeData.data.vatRulesId.find((rule) => rule.pid === pid)?.rule || undefined;

//     const vatRulePerc: number | undefined = Number(systemData.vat_rules.find((vat) => vat.id === vatId)?.cost);

//     // ERROR CHECK
//     if (vatRulePerc === undefined) throw new Error(`vatRulePerc (${vatRulePerc}) for portion ${pid} not found.`);

//     if (vatId === undefined) throw new Error(`vatId (#${vatId}) for portion ${pid} not found.`);

//     salesPricesIncVat.push(salePricesExVat[i] * (1 + vatRulePerc));
//     vatRuleIds.push(vatId);
//     vatRulePercs.push(vatRulePerc === undefined ? defaultVatByOrg : vatRulePerc);
//     vatRuleNames.push(systemData.vat_rules.find((vat) => vat.id === vatId)?.name || "No VAT found");
//   });

//   // MEASUREMENT UNITS ______________ _______________________
//   // eg weight = ["g", "kg"], fluid = ["ml", "l"], each = ["each", "each"]
//   const measurementUnitsObj: measurementUnitsObjProps = {} as measurementUnitsObjProps; // Updated type to include index signature
//   // const measurementUnitsObj: { [key: string]: string[] } = {};
//   // do a deep copy of the systemData.unit_type to avoid typescript errors
//   const unit_type_copy = JSON.parse(JSON.stringify(systemData.unit_type));
//   for (const unit of unit_type_copy) {
//     // let metricOrImperial: "metric" | "imperial" = systemData.org?.unit_metric_imperial_name || "metric"; // Default to metric
//     if (unit.name === "fluid") {
//       measurementUnitsObj.fluid = unit[systemData.org.unit_metric_imperial_name].split("|");
//     } else if (unit.name === "weight") {
//       // measurementUnitsObj.weight = "g|kg".split("|");
//       measurementUnitsObj.weight = unit[systemData.org.unit_metric_imperial_name].split("|");
//     } else if (unit.name === "each") {
//       measurementUnitsObj.each = unit[systemData.org.unit_metric_imperial_name].split("|");
//     } else {
//       // Handle other unit types if needed
//       console.warn(`Unknown unit type, not weight, fluid, or each: ${unit.name}`);
//     }
//   }

//   // // UPDATE OBJECT with precalculated recipe plating data:
//   const obj: Partial<PreCalculatedRecipeData> = {
//     portionSizes,
//     portionIds,
//     componentsNamesArray,
//     componentsIDArray,
//     componentsWeights,
//     componentsPricePer1000,
//     componentsPrices,
//     componentsPricesDesc,
//     componentsSubTotalsPrices,
//     packingCostPriceTotals,
//     packingCostPriceRules,
//     otherCostsPriceTotals,
//     otherCostsPriceRules,
//     markUpPriceAmounts,
//     markUpPriceRules,
//     markUpPriceRuleName,
//     costsSubTotals,
//     salePricesExVat,
//     salesPricesIncVat,
//     vatRuleIds,
//     vatRulePercs,
//     vatRuleNames,
//     isImperial: systemData.org.unit_metric_imperial_name === "imperial" || false,
//     isHome: recipeData.isHome || false,
//     currencySymbol: systemData.org.country_locale?.currency_symbol || "",
//     measurementUnitsObj,
//   };

//   return obj;
// }

// /* INFO::
//       const updatePackagingRule = (portionSize: number, ruleId: number) => {
//        const newObj = { ...recipeData.data.packagingCostsId, ...{ [portionSize]: ruleId } };
//        updateRecipeData((recipeData.data.packagingCostsId = { ...newObj }));
//       };
//   */
