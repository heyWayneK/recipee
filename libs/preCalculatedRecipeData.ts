import { PreCalculatedRecipeData } from "@/contexts/UseRecipeData";
import { calcProfit, formatCurrency } from "@/libs/utils";

// export async function preCalculateData(recipeData: PreCalculatedRecipeData, updateRecipeData: (newData: Partial<PreCalculatedRecipeData>) => void): Promise<void> {
export function preCalculateData(recipeData: PreCalculatedRecipeData): Partial<PreCalculatedRecipeData> {
  console.log("*** preCalculateData() Called", recipeData);
  /**  INFO::
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
    console.error("******portionSizes DO NOT MATCH", portionSizes);
    // throw new Error(`Recipe plating portions do not match expected plating portion: ${portionSizes.toString()} NOT ${recipeData.data.portions.toString()} grams`);
  }

  // COMPONENT WEIGHTS ARRAY : number[][]________________
  const componentsNamesArray: string[] = [];
  const componentsWeights: number[][] = [];
  const componentsIDArray: any[] = [];
  for (const component of recipeData.data.components) {
    if (!component.name) {
      throw new Error(`Component ${component.name} does not have portions name`);
    }
    // NAM
    componentsNamesArray.push(component.name);
    // WEIGHTS BY PORTION ARRAY
    componentsWeights.push(recipeData.data.portions.map((val) => (component.portions ? component.portions[val] : 0)));

    // TODO: dont need name length once db is being used
    // ID GENERATED FOR component KEY = unique key
    componentsIDArray.push(recipeData.data.portions.map((val) => component.id + "" + component.name?.length + "" + val));
  }

  // COSTS PER 1000/COMPONENT____________________________
  const componentsPricePer1000: number[] = [];
  for (const component of recipeData.data.components) {
    // FIND RECIPE
    const recipeId = component.recipeId;
    // FIND RECIPE
    const recipe = recipeData.data.recipes.find((recipe) => recipe.id === recipeId);

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
    const recipe = recipeData.data.recipes.find((recipe) => recipe.id === recipeId);

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
  // TODO: ADD VAT RULES
  const salesPricesIncVat: number[] = portionSizes.map((portion, i) => salePricesExVat[i] * (1 + 0.15));
  // const salesPricesIncVat: number[] = portionSizes.map((portion, i) => salePricesExVat[i] * (1 + recipeData.data.vatRuless[recipeData.data.setting.vatDefaultId].));

  // // UPDATE OBJECT with precalculated recipe plating data:
  // updateRecipeData({
  //   portionSizes,
  //   componentsNamesArray,
  //   componentsIDArray,
  //   componentsWeights,
  //   componentsPricePer1000,
  //   componentsPrices,
  //   componentsPricesDesc,
  //   componentsSubTotalsPrices,
  //   packingCostPriceTotals,
  //   packingCostPriceRules,
  //   otherCostsPriceTotals,
  //   otherCostsPriceRules,
  //   markUpPriceAmounts,
  //   markUpPriceRules,
  //   costsSubTotals,
  //   salePricesExVat,
  //   salesPricesIncVat,
  // });

  // // UPDATE OBJECT with precalculated recipe plating data:
  const obj: Partial<PreCalculatedRecipeData> = {
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
  };
  // return obj;
  // console.log("*** preCalculateData() ENDED new object:", { ...recipeData, ...obj });

  return obj;
  // return { ...recipeData, ...obj };
}
