import { PreCalculatedRecipeData } from "@/contexts/UseRecipeData";
import { calcProfit, formatCurrency } from "@/libs/utils";

export async function preCalculateData(recipeData: PreCalculatedRecipeData, updateRecipeData: (newData: Partial<PreCalculatedRecipeData>) => void) {
  // HOW TO USE:
  /** 
     const updatePackagingRule = (portionSize: number, ruleId: number) => {
       const newObj = { ...recipeData.data.packagingCostsId, ...{ [portionSize]: ruleId } };
       updateRecipeData((recipeData.data.packagingCostsId = { ...newObj }));
      };
    */
  // if (recipeData.data.portions.length === 0) return;

  // TODO: ADD HISTORY
  // PLATING COST CALCULATION ____________________START::
  // RECALC LIVE PORTION SIZES___________________________
  const portionSizes = recipeData.data.portions.map((val) => recipeData.data.components.reduce((acc2, val2) => (acc2 += val2.portions ? val2.portions[val] : 0), 0));

  // ERROR if portions do not match______________________
  if (portionSizes.toString() !== recipeData.data.portions.toString()) {
    throw new Error(`Recipe plating portions do not match expected plating portion: ${portionSizes.toString()} NOT ${recipeData.data.portions.toString()} grams`);
  }

  // COMPONENT WEIGHTS ARRAY : number[][]________________
  const componentsWeights: number[][] = [];
  const componentsNamesArray: string[] = [];
  const componentsIDArray: any[] = [];
  for (const component of recipeData.data.components) {
    // NAME
    componentsNamesArray.push(component.name);
    // WEIGHTS BY PORTION ARRAY
    componentsWeights.push(recipeData.data.portions.map((val) => (component.portions ? component.portions[val] : 0)));

    // TODO: dont need name length once db is being used
    // ID GENERATED FOR component KEY = unique key
    componentsIDArray.push(recipeData.data.portions.map((val) => component.id + "" + component.name.length + "" + val));
  }

  // COSTS PER 1000/COMPONENT____________________________
  const componentsPricePer1000: number[] = [];
  for (const component of recipeData.data.components) {
    // RECIPE NAME component.name
    const totalPrice = component.recipe.recipeDetail.reduce((ttlPrice, val): number => {
      if (val.type !== "ingredient") return ttlPrice;
      // TOTAL RAW WEIGHT
      return (ttlPrice += val.costPer1000 * (val.qty / 1000));
    }, 0);

    const totalWeight = component.recipe.recipeDetail.reduce((ttlWeight, val): number => {
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
    componentsPrices.push(componentsWeights[iC].map((portion, iP) => (portion / 1000) * componentsPricePer1000[iC]));
  }

  // CREATE ARRAY OF COMPONENENT PRICES per portion number[][]
  const componentsSubTotalsPrices: number[] = [];
  for (let iC = 0; iC < portionSizes.length; iC++) {
    componentsSubTotalsPrices.push(componentsPrices.reduce((acc, val) => (acc += val[iC]), 0));
  }

  // COMPONENT PRICES [][][]_____________________________
  const componentsPricesDesc: string[][][] = [];
  for (let iC = 0; iC < recipeData.data.components.length; iC++) {
    componentsPricesDesc.push(
      portionSizes.map((_, iP) =>
        recipeData.data.components[iC].recipe.recipeDetail.flatMap((recipe, iR) => {
          if (recipe.type !== "ingredient") return [];

          const componentTotalWeight = recipeData.data.components[iC].recipe.recipeDetail.reduce((arr, val) => (arr += val.qty), 0);
          // Work out igred % in original comp = % * price
          return recipe.ingredName + ": " + formatCurrency((recipe.qty / componentTotalWeight) * componentsPrices[iC][iP]);
        })
      )
    );
  }

  // PACKAGING COSTS AND RULES ARRAYS____________________
  const packingCostPriceTotals: number[] = [];
  const packingCostPriceRules: number[] = [];
  for (const portion of portionSizes) {
    packingCostPriceTotals.push(recipeData.data.costRules.packagingCosts[recipeData.data.packagingCostsId[portion]].cost);
    packingCostPriceRules.push(recipeData.data.packagingCostsId[portion]);
  }

  // OTHER COSTS AND RULES ARRAY_________________________
  const otherCostsPriceTotals: number[] = [];
  const otherCostsPriceRules: number[] = [];
  for (const portion of recipeData.data.portions) {
    const costRuleId = recipeData.data.otherCostsId[portion];
    otherCostsPriceTotals.push(recipeData.data.costRules.otherCosts[costRuleId].costs.reduce((arr, cost) => (arr += cost.cost), 0));
    otherCostsPriceRules.push(costRuleId);
  }

  // SUB TOTAL COSTS_____________________________________
  const costsSubTotals: number[] = portionSizes.map((portion, i) => componentsSubTotalsPrices[i] + packingCostPriceTotals[i] + otherCostsPriceTotals[i]);

  // MARKUP CALCULATIONS AND RULES _______________________
  const markUpPriceAmounts: number[] = [];
  const markUpPriceRules: number[] = [];
  portionSizes.map((portionSize, i) => {
    let markupRuleId = recipeData.data.markupId[portionSize];
    let { name, factor, type } = recipeData.data.costRules.markUps[markupRuleId];
    markUpPriceAmounts.push(calcProfit(costsSubTotals[i], type, factor));
    markUpPriceRules.push(markupRuleId);
  });

  // SALES PRICE EX VAT _____________________________________
  const salePricesExVat: number[] = portionSizes.map((portion, i) => costsSubTotals[i] + markUpPriceAmounts[i]);

  // SALES PRICE EX VAT _____________________________________
  const salesPricesIncVat: number[] = portionSizes.map((portion, i) => salePricesExVat[i] * (1 + recipeData.data.setting.vat));

  // // UPDATE OBJECT with precalculated recipe plating data:
  updateRecipeData({
    portionSizes,
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
  });
}
