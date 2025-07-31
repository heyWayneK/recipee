"use server";

// import { MarkupSelect } from "@/app/api/data/system/route";
// import type { PreCalculatedRecipeData, SystemDataProps, UserDataProps, useRecipeData } from "@/contexts/useRecipeData";
import type { useRecipeData } from "@/contexts/useRecipeData";
import { calcProfit, formatCurrency } from "@/utils/utils";
import { LineItemsLookup, PreCalculatedRecipeData, SystemDataProps, measurementUnitsObjProps } from "@/types/recipeTypes";
import { th } from "date-fns/locale";
import { Decimal } from "decimal.js";

const getLineItemTotal = (categoryId: number, lineItemObj: {}) => {
  //
};

// export async function preCalculateData(recipeData: PreCalculatedRecipeData, updateRecipeData: (newData: Partial<PreCalculatedRecipeData>) => void): Promise<void> {
export async function preCalculateData(recipeData: PreCalculatedRecipeData, systemData: SystemDataProps): Promise<Partial<PreCalculatedRecipeData>> {
  // export async function preCalculateData(recipeData: PreCalculatedRecipeData, systemData: SystemDataProps, userData: UserDataProps): Promise<Partial<PreCalculatedRecipeData>> {
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
  const portionsSum: number[] = [];

  const o = recipeData.data.portions;
  for (const portion of o.sort((a, b) => a.order - b.order)) {
    if (!portion.qty_g) console.error(`Portion with no qty`);
    if (!portion.id) console.error(`Portion with no id`);
    if (!portion.order) console.error(`Portion with no order`);

    portionSizes.push(portion.qty_g);

    portionIds.push(portion.id);

    portionsSum.push(
      recipeData.data.components.reduce((acc, comp) => {
        const getQty = comp.portions.find((p) => p.id === portion.id)?.qty_g;
        if (!getQty) {
          throw new Error(`Portion ${portion.id} not found in component ${comp.name}`);
        }
        return acc + getQty;
      }, 0)
    );

    // ERROR if expected do not match actual portions sum
    if (portionSizes.toString() !== portionsSum.toString()) {
      const e = `Recipe plating portions do not match actual sum of plating portions: ${portionSizes.toString()} !== ${portionsSum.toString()} grams`;
      console.error(e);
      throw new Error(e);
    }
  }
  // COMPONENT WEIGHTS ARRAY : number[][]________________
  const componentsNamesArray: string[] = [];
  const componentsWeights: number[][] = [];
  const componentsIDArray: string[] = [];
  for (const component of recipeData.data.components.sort((a, b) => a.order - b.order)) {
    if (!component.name) {
      throw new Error(`Component ${component.name} does not have portions name`);
    }
    // NAME
    componentsNamesArray.push(component.name);
    // WEIGHTS BY PORTION ARRAY
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
  const componentsPricePer1000: number[] = [];
  for (const component of recipeData.data.components) {
    // FIND RECIPE
    const recipeId = component.recipeId;
    // FIND RECIPE
    const recipe = recipeData.data.recipes.find((recipe) => recipe.uuid === recipeId);

    if (!recipe) {
      throw new Error(`Recipe with ID ${recipeId} not found. Component recipeId and Recipe id must match`);
    }

    const totalPrice = recipe?.recipeDetail.reduce((ttlPrice, val): number => {
      if (val.type !== "ingredient") return ttlPrice;
      // TOTAL RAW WEIGHT
      return (ttlPrice += val.costPer1000 * (val.qty / 1000));
    }, 0);

    const totalWeight = recipe?.recipeDetail.reduce((ttlWeight, val): number => {
      if (val.type !== "ingredient") return ttlWeight;
      // TOTAL PRICE OF COMPONENT
      return (ttlWeight += val.qty);
    }, 0);

    // TODO: check this yield, added for vercel errors
    const yld: number = component.yield ? component.yield : 1;
    componentsPricePer1000.push(
      // GET COMPONENT TOTAL INGREDIENTCOST/1000

      totalPrice / ((totalWeight * yld) / 1000)
    );
  }

  // COMPONENT PRICES per portion : number[][]___________
  const componentsPrices: number[][] = [];
  for (let iC = 0; iC < componentsWeights.length; iC++) {
    componentsPrices.push(componentsWeights[iC].map((portion) => (portion / 1000) * componentsPricePer1000[iC]));
  }

  // CREATE ARRAY OF COMPONENENT PRICES per portion number[][]
  const componentsSubTotalsPrices: number[] = [];
  for (let iC = 0; iC < portionSizes.length; iC++) {
    componentsSubTotalsPrices.push(componentsPrices.reduce((acc, val) => (acc += val[iC]), 0));
  }

  // COMPONENT PRICES [][][]_____________________________
  // CREATE FROP DOWN LIST OF INGREDIENT PRICES (To understand where costs are high)
  const componentsPricesDesc: string[][][] = [];
  for (let iC = 0; iC < recipeData.data.components.length; iC++) {
    // find the recipe
    const recipeId = recipeData.data.components[iC].recipeId;
    const recipe = recipeData.data.recipes.find((recipe) => recipe.uuid === recipeId);

    if (!recipe) {
      throw new Error(`Recipe with ID ${recipeId} not found. Component recipeId and Recipe id must match`);
    }

    componentsPricesDesc.push(
      portionSizes.map((_, iP) =>
        recipe.recipeDetail.flatMap((row, iR) => {
          // TODO: Check this.
          // An ingredient can be a component (like "cheese"), without a recipe.
          if (row.type !== "ingredient") return [];

          const componentTotalWeight = recipe.recipeDetail.reduce((arr, val) => (arr += val.qty), 0);
          // Work out igred % in original comp = % * price
          return row.ingredName + ": " + (row.qty / componentTotalWeight) * componentsPrices[iC][iP];
        })
      )
    );
  }

  const ReturnLookupCostsArr = (categoryId: number, lookupArray: LineItemsLookup[]): number => {
    // Function to get the total cost for a given category ID from the lookup array
    const ttl = lookupArray.reduce((acc, val) => {
      // category_ids can have one or more CSV ids
      if (+val.category_ids === +categoryId || val.category_ids.split(",").includes(categoryId.toString())) {
        acc += Number(val.cost);
      }
      // console.log("Acc Total", acc);
      return acc;
    }, 0);
    // console.log("_____ categoryId", categoryId, "__total", ttl);
    return ttl;
  };

  // PACKAGING COSTS AND RULES ARRAYS____________________
  const packingCostPriceTotals: number[] = [];
  const packingCostPriceRules: number[] = [];
  // Loop through the portions, always using portion IDs
  for (const portionId of portionIds) {
    // Summarise the packaging costs in a single array
    const packagingIdRuleForPortion = recipeData.data.packagingCostsId.find((p) => p.pid === portionId)?.rule || undefined;

    if (packagingIdRuleForPortion === undefined) throw new Error(`Packaging rule for portion ID ${portionId} not found.`);

    packingCostPriceRules.push(packagingIdRuleForPortion);

    // Use Lookup, Category and Line Items to get the total cost for the packaging rule
    // Get all Line Item Ids for the packaging rule
    // const packingCostLineItemsCost = systemData.packaging_costs_line_items_lookup
    //   .filter((item) => item.category_ids.split(",").find((id) => +id === +packagingIdRuleForPortion))
    //   .reduce((acc, val) => (acc += val.cost), 0);

    const packingCostLineItemsCost = ReturnLookupCostsArr(packagingIdRuleForPortion, systemData.packaging_costs_line_items_lookup);
    console.log("packingCostPriceTotals PUSH_____ portionId", portionId, "__total", packingCostLineItemsCost);
    packingCostPriceTotals.push(packingCostLineItemsCost);
  }

  // for (const portion of portionSizes) {
  //   const packagingCostId = +recipeData.data.packagingCostsId[portion];
  //   const packingCostObj = systemData.packaging_costs_category.find((cost) => cost.id === packagingCostId);

  //   if (!packingCostObj) {
  //     const e = `Packing cost with ID ${packagingCostId} not found. Packing cost id must match`;
  //     console.error(e);
  //     throw new Error(e);
  //   }

  //   packingCostPriceTotals.push(
  //     systemData.packaging_costs_line_items_lookup.reduce((acc, val) => {
  //       if (+val.category_ids === packagingCostId) {
  //         acc += +val.cost;
  //       }
  //       return acc;
  //     }, 0)
  //   );
  //   packingCostPriceRules.push(packagingCostId);
  // }

  // OTHER COSTS AND RULES ARRAY_________________________
  const otherCostsPriceTotals: number[] = [];
  const otherCostsPriceRules: number[] = [];
  for (const portionId of portionIds) {
    // Summarise the packaging costs in a single array
    const otherCostsIdRuleForPortion = recipeData.data.otherCostsId.find((p) => p.pid === portionId)?.rule || undefined;

    if (otherCostsIdRuleForPortion === undefined) throw new Error(`Packaging rule for portion ID ${portionId} not found.`);

    otherCostsPriceRules.push(otherCostsIdRuleForPortion);

    // Use Lookup, Category and Line Items to get the total cost for the packaging rule
    // Get all Line Item Ids for the packaging rule
    // const packingCostLineItemsCost = systemData.packaging_costs_line_items_lookup
    //   .filter((item) => item.category_ids.split(",").find((id) => +id === +packagingIdRuleForPortion))
    //   .reduce((acc, val) => (acc += val.cost), 0);

    const otherCostLineItemsCost = ReturnLookupCostsArr(otherCostsIdRuleForPortion, systemData.other_costs_line_items_lookup);
    console.log("packingCostPriceTotals PUSH_____ portionId", portionId, "__total", otherCostLineItemsCost);
    otherCostsPriceTotals.push(otherCostLineItemsCost);
  }
  // for (const portion of portionSizes) {
  //   const otherCostId = +recipeData.data.otherCostsId[portion];
  //   const otherCostObj = systemData.other_costs_category.find((cost) => cost.id === otherCostId);

  //   if (!otherCostObj) {
  //     const e = `Other costs with ID ${otherCostId} not found. Packing cost id must match`;
  //     console.error(e);
  //     throw new Error(e);
  //   }

  //   otherCostsPriceTotals.push(
  //     systemData.other_costs_line_items_lookup.reduce((acc, val) => {
  //       if (+val.category_ids === otherCostId) {
  //         acc += +val.cost;
  //       }
  //       return acc;
  //     }, 0)
  //   );
  //   otherCostsPriceRules.push(otherCostId);
  // }

  // SUB TOTAL COSTS_____________________________________
  let costsSubTotals: number[] = [];
  costsSubTotals = portionSizes.map((portion, i) => componentsSubTotalsPrices[i] + packingCostPriceTotals[i] + otherCostsPriceTotals[i]);

  // MARKUP CALCULATIONS AND RULES _______________________
  const markUpPriceAmounts: number[] = [];
  const markUpPriceRules: number[] = [];
  const markUpPriceRuleName: string[] = [];

  for (let i = 0; i < portionIds.length; i++) {
    const markupRuleId = recipeData.data.markupId.find((p) => portionIds[i] === p.pid)?.rule || undefined; // Get the markup rule ID for the portion size
    console.log("markupRuleId:::", markupRuleId, "portionIds[i]:::", portionIds[i]);
    if (markupRuleId === undefined) {
      throw new Error(`Markup rule for portion size ${portionIds[i]} not found.`);
    }
    // const markupRuleId = +recipeData.data.markupId[portionSizes[i]];
    // const foundMarkupRule = systemData.markup.find((m) => m.id === markupRuleId) || undefined;
    const foundMarkupRule = systemData.markup.find((m) => m.id === markupRuleId) || undefined;

    if (!foundMarkupRule) throw new Error(`Markup Rule ID: ${markupRuleId} not found in db.`);
    const { markup_type: name, factor } = foundMarkupRule;
    markUpPriceAmounts.push(calcProfit(costsSubTotals[i], name.name, Number(factor)));
    markUpPriceRules.push(markupRuleId);
    markUpPriceRuleName.push(foundMarkupRule.name);
  }

  // SALES PRICE EX VAT _____________________________________
  const salePricesExVat: number[] = portionSizes.map((portion, i) => {
    return costsSubTotals[i] + markUpPriceAmounts[i];
  });

  // SALES PRICE INCL VAT ______________ _______________________
  const salesPricesIncVat: number[] = [];
  const vatRuleIds: number[] = [];
  const vatRulePercs: number[] = [];
  const vatRuleNames: string[] = [];

  // GET DEFAULT VAT in case recipe has no VAT
  // find vat with default === true or the first one in the list or 0
  const defaultVatByOrg: number | undefined = Number(systemData.vat_rules.find((vat) => vat.default === true)?.cost || Number(systemData.vat_rules[0].cost) || 0);

  console.log("defaultVatByOrg:::", defaultVatByOrg);
  if (!defaultVatByOrg) console.error(`defaultVatByOrg (#${defaultVatByOrg}) not found.`);

  // GET RULE then GET RULE ID & the VAT VALUE
  portionIds.map((pid, i) => {
    // Find the vat rule id that matches the portion id
    const vatId: number | undefined = recipeData.data.vatRulesId.find((rule) => rule.pid === pid)?.rule || undefined;

    const vatRulePerc: number | undefined = Number(systemData.vat_rules.find((vat) => vat.id === vatId)?.cost);

    // ERROR CHECK
    if (vatRulePerc === undefined) throw new Error(`vatRulePerc (${vatRulePerc}) for portion ${pid} not found.`);

    if (vatId === undefined) throw new Error(`vatId (#${vatId}) for portion ${pid} not found.`);

    salesPricesIncVat.push(salePricesExVat[i] * (1 + vatRulePerc));
    vatRuleIds.push(vatId);
    vatRulePercs.push(vatRulePerc === undefined ? defaultVatByOrg : vatRulePerc);
    vatRuleNames.push(systemData.vat_rules.find((vat) => vat.id === vatId)?.name || "No VAT found");
  });

  // MEASUREMENT UNITS ______________ _______________________
  // eg weight = ["g", "kg"], fluid = ["ml", "l"], each = ["each", "each"]
  const measurementUnitsObj: measurementUnitsObjProps = {} as measurementUnitsObjProps; // Updated type to include index signature
  // const measurementUnitsObj: { [key: string]: string[] } = {};
  // do a deep copy of the systemData.unit_type to avoid typescript errors
  const unit_type_copy = JSON.parse(JSON.stringify(systemData.unit_type));
  for (const unit of unit_type_copy) {
    // let metricOrImperial: "metric" | "imperial" = systemData.org?.unit_metric_imperial_name || "metric"; // Default to metric
    if (unit.name === "fluid") {
      measurementUnitsObj.fluid = unit[systemData.org.unit_metric_imperial_name].split("|");
    } else if (unit.name === "weight") {
      // measurementUnitsObj.weight = "g|kg".split("|");
      measurementUnitsObj.weight = unit[systemData.org.unit_metric_imperial_name].split("|");
    } else if (unit.name === "each") {
      measurementUnitsObj.each = unit[systemData.org.unit_metric_imperial_name].split("|");
    } else {
      // Handle other unit types if needed
      console.warn(`Unknown unit type, not weight, fluid, or each: ${unit.name}`);
    }
  }

  // // UPDATE OBJECT with precalculated recipe plating data:
  const obj: Partial<PreCalculatedRecipeData> = {
    portionSizes,
    portionIds,
    componentsNamesArray,
    componentsIDArray,
    componentsWeights,
    componentsPricePer1000,
    componentsPrices,
    componentsPricesDesc,
    componentsSubTotalsPrices,
    packingCostPriceTotals,
    packingCostPriceRules,
    otherCostsPriceTotals,
    otherCostsPriceRules,
    markUpPriceAmounts,
    markUpPriceRules,
    markUpPriceRuleName,
    costsSubTotals,
    salePricesExVat,
    salesPricesIncVat,
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
