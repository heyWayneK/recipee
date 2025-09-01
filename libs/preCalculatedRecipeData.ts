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
  const portionSizes: Decimal[] = [];
  const portionIds: number[] = [];
  const portionsSum: Decimal[] = [];

  const o = recipeData.data.portions;
  for (const portion of o.sort((a, b) => a.order - b.order)) {
    if (!portion.qty_g) console.error(`Portion with no qty`);
    if (!portion.id) console.error(`Portion with no id`);
    if (!portion.order) console.error(`Portion with no order`);

    portionSizes.push(new Decimal(portion.qty_g));
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
  const componentsWeights: Decimal[][] = [];
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
        const getQty = new Decimal(component.portions.find((p) => p.id === portionId)?.qty_g || 0);
        if (!getQty) console.error(`Portion ${portionId} not in ${component.name}`);
        return getQty;
      })
    );
    componentsIDArray.push(component.uuid);
  }

  // COSTS PER 1000/COMPONENT____________________________
  const componentsPricePer1000g: Decimal[] = [];
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
      // is type either sub, step or ingredient : RecipeRowTypes
      if (!["sub", "step", "ingredient"].includes(val.type?.toString() || "")) {
        throw new Error(`Invalid type ${val.type} in recipeDetail. Not ["sub", "step", "ingredient"], val: ${JSON.stringify(val)}`);
      }
      if (val.type?.toString() === "step" || !val.type) return ttlPrice;
      const costPer1000g = new Decimal(val.cost_per_1000g);
      const qty = new Decimal(val.qty_g);
      return ttlPrice.add(costPer1000g.mul(qty.div(1000)));
    }, new Decimal(0));

    const totalWeight = recipe.recipeDetail.reduce((ttlWeight, val) => {
      if (val.type === "step" || !val.type) return ttlWeight;
      return ttlWeight.add(val.qty_g);
    }, new Decimal(0));

    const yld: Decimal = component.yield ? new Decimal(component.yield) : new Decimal(1.0);

    // Avoid division by zero
    const effectiveWeight = new Decimal(totalWeight).mul(yld);
    if (effectiveWeight.isZero()) {
      componentsPricePer1000g.push(new Decimal(0));
    } else {
      componentsPricePer1000g.push(totalPrice.div(effectiveWeight.div(1000)));
    }
  }

  // COMPONENT PRICES per portion : Decimal[][]___________
  const componentsPricesDecimals: Decimal[][] = [];
  for (let iC = 0; iC < componentsWeights.length; iC++) {
    componentsPricesDecimals.push(componentsWeights[iC].map((portionWeight) => new Decimal(portionWeight).div(1000).mul(componentsPricePer1000g[iC])));
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
        const componentTotalWeight = recipe.recipeDetail.reduce((acc, val) => (val.type === "ingredient" ? acc.add(val.qty_g) : acc), new Decimal(0));

        // Avoid division by zero
        if (componentTotalWeight.isZero()) return [];

        return recipe.recipeDetail.flatMap((row) => {
          if (row.type === "sub") return [];
          const ingredientCost = new Decimal(row.qty_g).div(componentTotalWeight).mul(componentsPricesDecimals[iC][iP]);
          return `${row.ingredient?.name || "*SUB* TBC"}: ${ingredientCost.toFixed(3)}`; // Using .toFixed for display
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
  const vatRulePercs: Decimal[] = [];
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
      vatRulePercs.push(new Decimal(defaultVatPerc));
      vatRuleNames.push(defaultVatRule?.name || "No VAT found");
      return;
    }

    const vatRulePerc = new Decimal(vatRule.cost);
    const vatAmount = salePricesExVatDecimals[i].mul(vatRulePerc);
    salesPricesIncVatDecimals.push(salePricesExVatDecimals[i].add(vatAmount));
    vatRuleIds.push(vatRuleId);
    vatRulePercs.push(new Decimal(vatRulePerc));
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

  // FINAL OBJECT using Deicimal.js for precision
  const obj: Partial<PreCalculatedRecipeData> = {
    portionSizes,
    portionIds,
    componentsNamesArray,
    componentsIDArray,
    componentsWeights,
    componentsPricePer1000g: componentsPricePer1000g.map((d) => new Decimal(d)),
    componentsPrices: componentsPricesDecimals.map((row) => row.map((d) => new Decimal(d))),
    componentsPricesDesc,
    componentsSubTotalsPrices: componentsSubTotalsPricesDecimals.map((d) => new Decimal(d)),
    packingCostPriceTotals: packingCostPriceTotalsDecimals.map((d) => new Decimal(d)),
    packingCostPriceRules,
    otherCostsPriceTotals: otherCostsPriceTotalsDecimals.map((d) => new Decimal(d)),
    otherCostsPriceRules,
    markUpPriceAmounts: markUpPriceAmountsDecimals.map((d) => new Decimal(d)),
    markUpPriceRules,
    markUpPriceRuleName,
    costsSubTotals: costsSubTotalsDecimals.map((d) => new Decimal(d)),
    salePricesExVat: salePricesExVatDecimals.map((d) => new Decimal(d)),
    salesPricesIncVat: salesPricesIncVatDecimals.map((d) => new Decimal(d)),
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
