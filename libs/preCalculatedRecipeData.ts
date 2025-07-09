// import { MarkupSelect } from "@/app/api/data/system/route";
import { PreCalculatedRecipeData, SystemDataProps, UserDataProps, useRecipeData } from "@/contexts/useRecipeData";
import { calcProfit, formatCurrency } from "@/libs/utils";

const getLineItemTotal = (categoryId: number, lineItemObj: {}) => {
  //
};

// export async function preCalculateData(recipeData: PreCalculatedRecipeData, updateRecipeData: (newData: Partial<PreCalculatedRecipeData>) => void): Promise<void> {
export function preCalculateData(recipeData: PreCalculatedRecipeData, systemData: SystemDataProps, userData: UserDataProps): Partial<PreCalculatedRecipeData> {
  // ERROR HANDLING
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
    if (!portion.qty) console.error(`Portion with no qty`);
    if (!portion.id) console.error(`Portion with no id`);
    if (!portion.order) console.error(`Portion with no order`);

    portionSizes.push(portion.qty);

    portionIds.push(portion.id);

    portionsSum.push(
      recipeData.data.components.reduce((acc, comp) => {
        const getQty = comp.portions.find((p) => p.id === portion.id)?.qty;
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
        const getQty = component.portions.find((p) => p.id === portionId)?.qty || 0;
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
          if (row.type !== "ingredient") return [];

          const componentTotalWeight = recipe.recipeDetail.reduce((arr, val) => (arr += val.qty), 0);
          // Work out igred % in original comp = % * price
          return row.ingredName + ": " + formatCurrency((row.qty / componentTotalWeight) * componentsPrices[iC][iP]);
        })
      )
    );
  }

  // PACKAGING COSTS AND RULES ARRAYS____________________
  const packingCostPriceTotals: number[] = [];
  const packingCostPriceRules: number[] = [];
  for (const portion of portionSizes) {
    const packagingCostId = +recipeData.data.packagingCostsId[portion];
    const packingCostObj = systemData.packaging_costs_category.find((cost) => cost.id === packagingCostId);

    if (!packingCostObj) {
      const e = `Packing cost with ID ${packagingCostId} not found. Packing cost id must match`;
      console.error(e);
      throw new Error(e);
    }

    packingCostPriceTotals.push(
      systemData.packaging_costs_line_items_lookup.reduce((acc, val) => {
        if (+val.category_ids === packagingCostId) {
          acc += +val.cost;
        }
        return acc;
      }, 0)
    );
    packingCostPriceRules.push(packagingCostId);
  }

  // OTHER COSTS AND RULES ARRAY_________________________
  const otherCostsPriceTotals: number[] = [];
  const otherCostsPriceRules: number[] = [];
  for (const portion of portionSizes) {
    const otherCostId = +recipeData.data.otherCostsId[portion];
    const otherCostObj = systemData.other_costs_category.find((cost) => cost.id === otherCostId);

    if (!otherCostObj) {
      const e = `Other costs with ID ${otherCostId} not found. Packing cost id must match`;
      console.error(e);
      throw new Error(e);
    }

    otherCostsPriceTotals.push(
      systemData.other_costs_line_items_lookup.reduce((acc, val) => {
        if (+val.category_ids === otherCostId) {
          acc += +val.cost;
        }
        return acc;
      }, 0)
    );
    otherCostsPriceRules.push(otherCostId);
  }

  // SUB TOTAL COSTS_____________________________________
  let costsSubTotals: number[] = [];
  costsSubTotals = portionSizes.map((portion, i) => componentsSubTotalsPrices[i] + packingCostPriceTotals[i] + otherCostsPriceTotals[i]);

  // MARKUP CALCULATIONS AND RULES _______________________
  const markUpPriceAmounts: number[] = [];
  const markUpPriceRules: number[] = [];

  for (let i = 0; i < portionSizes.length; i++) {
    const markupRuleId = +recipeData.data.markupId[portionSizes[i]];
    const foundMarkupRule = systemData.markup.find((m) => m.id === markupRuleId) || undefined;

    if (!foundMarkupRule) throw new Error(`Markup Rule ID: ${markupRuleId} not found in db.`);
    const { markup_type: name, factor } = foundMarkupRule;
    markUpPriceAmounts.push(calcProfit(costsSubTotals[i], name.name, Number(factor)));
    markUpPriceRules.push(markupRuleId);
  }

  // SALES PRICE EX VAT _____________________________________
  const salePricesExVat: number[] = portionSizes.map((portion, i) => {
    return recipeData.costsSubTotals[i] + recipeData.markUpPriceAmounts[i];
  });

  // SALES PRICE INCL VAT ______________ _______________________
  const salesPricesIncVat: number[] = [];
  const vatRuleIds: number[] = [];
  const vatRulePercs: number[] = [];
  const vatRuleNames: string[] = [];
  // GET DEFAULT VAT in case recipe has no VAT
  const defaultVatByOrg: number | undefined = Number(userData.vat_rules.find((vat) => vat.default === true)?.cost || userData.vat_rules[0].cost || undefined); // or 0%

  console.log("defaultVatByOrg:::", defaultVatByOrg);
  if (!defaultVatByOrg) console.error(`defaultVatByOrg (#${defaultVatByOrg}) not found.`);

  // GET RULE then GET RULE ID vat value
  portionIds.map((pid, i) => {
    const vatId: number | undefined = recipeData.data.vatRulesId.find((rule) => rule.id === pid)?.rule || undefined;

    const vatRulePerc: number | undefined = Number(systemData.vat_rules.find((rule) => rule.id === vatRuleIds[i])?.cost || undefined);

    console.log("vatId:::", vatId);
    console.log("vatRulePerc:::", vatRulePerc);

    // ERROR CHECK
    if (vatRulePerc === undefined) throw new Error(`vatRulePerc (${vatRulePerc}) for portion ${pid} not found.`);

    if (vatId === undefined) throw new Error(`vatId (#${vatId}) for portion ${pid} not found.`);

    salesPricesIncVat.push(salePricesExVat[i] * (1 + (vatRulePerc || Number(defaultVatByOrg))));
    vatRuleIds.push(vatId);
    vatRulePercs.push(vatRulePerc || Number(defaultVatByOrg));
    vatRuleNames.push(systemData.vat_rules.find((vat) => vat.id === vatId)?.name || "No VAT found");
  });

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
    costsSubTotals,
    salePricesExVat,
    salesPricesIncVat,
    vatRuleIds,
    vatRulePercs,
    vatRuleNames,
  };

  return obj;
}

/* INFO:: 
      const updatePackagingRule = (portionSize: number, ruleId: number) => {
       const newObj = { ...recipeData.data.packagingCostsId, ...{ [portionSize]: ruleId } };
       updateRecipeData((recipeData.data.packagingCostsId = { ...newObj }));
      };
  */
