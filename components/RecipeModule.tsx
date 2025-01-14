import React, { Suspense, useEffect, useState } from "react";
import { calcProfit, formatCurrency, setLiveTotal } from "@/lib/utils";
import { data, CostsLiveProps, UIElement } from "@/app/data/recipe";
import Row_SubRecipesAll from "./Row_SubRecipesAll";
import Row_PlatingAll from "./Row_PlatingAll";
import { preCalculatedRecipeData, useRecipeData } from "@/contexts/UseRecipeData";
import Loading from "./Loading";

// const uiPlatingObject_reset = () => {
//   for (const uiElement of data.uiElements) {
//     let obj: CostsLiveProps = {};
//     for (const portion of data.portions) {
//       obj[portion] = 0;
//     }
//     setLiveTotal(obj, uiElement.name);
//   }
// };
// ARRAY OBJECT to store totals, if any data.uiElements
//  const rowNum = data.uiElements.findIndex((obj) => obj.name === costsLiveName);

const uiPlatingObject_components = () => {
  const objName = "plating_list";
  // CREATE a uiELEMENT for each plating component.
  data.components.map((component, ic) => {
    // CREATE LiveCosts Totals from recipe ingredients
    let costsLiveObj: UIElement = {
      name: `${objName + "_" + ic}`,
      costsLive: {} as CostsLiveProps,
    };
    // Get Portion Sizes
    for (const portionSize of data.portions) {
      // save recipes
      costsLiveObj.costsLive[portionSize] = component.recipe.recipeDetail.reduce((acc, ingredient) => {
        // console.log(
        //   "++++",
        //   component.name,
        //   ingredient.ingredName,
        //   portionSize,
        //   " = ",
        //   ingredient.qty
        // );
        return (acc += ingredient.type === "ingredient" ? (component.portions[portionSize] / 1000) * ingredient.costPer1000 : 0);
      }, 0);
    }
  });
};
export interface RecipeModuleProps {
  className?: string;
  // myObject: Object;
}

// PAGE
const RecipeModule: React.FC<RecipeModuleProps> = () => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const [myObject, setMyObject] = useState(null);

  useEffect(() => {
    try {
      // HOWTO USE:
      // setMyObject({ key: "This really needs to work" });

      // CLEAR RECIPE DATA
      updateRecipeData(preCalculatedRecipeData);

      // PLATING COST CALCULATION ____________________START::

      // RECALC LIVE PORTION SIZES___________________________
      const portionSizes = data.portions.map((val) => data.components.reduce((acc2, val2) => (acc2 += val2.portions[val]), 0));

      // ERROR if portions do not match______________________
      if (portionSizes.toString() !== data.portions.toString()) {
        throw new Error(`Recipe plating portions do not match expected plating portion: ${portionSizes.toString()} NOT ${data.portions.toString()} grams`);
      }

      // COMPONENT WEIGHTS ARRAY : number[][]________________
      const componentsWeights: number[][] = [];
      const componentsNamesArray: string[] = [];
      const componentsIDArray: any[] = [];
      for (const component of data.components) {
        // NAME
        componentsNamesArray.push(component.name);
        // WEIGHTS BY PORTION ARRAY
        componentsWeights.push(data.portions.map((val) => component.portions[val]));

        // TODO: dont need name length once db is being used
        // ID GENERATED FOR component KEY = unique key
        componentsIDArray.push(data.portions.map((val) => component.id + "" + component.name.length + "" + val));
      }

      // COSTS PER 1000/COMPONENT____________________________
      const componentsPricePer1000: number[] = [];
      for (const component of data.components) {
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

        componentsPricePer1000.push(
          // GET COMPONENT TOTAL INGREDIENTCOST/1000
          totalPrice / ((totalWeight * component.yield) / 1000)
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
      for (let iC = 0; iC < data.components.length; iC++) {
        componentsPricesDesc.push(
          portionSizes.map((_, iP) =>
            data.components[iC].recipe.recipeDetail.flatMap((recipe, iR) => {
              if (recipe.type !== "ingredient") return [];

              const componentTotalWeight = data.components[iC].recipe.recipeDetail.reduce((arr, val) => (arr += val.qty), 0);
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
        packingCostPriceTotals.push(data.costRules.packagingCosts[data.packagingCostsId[portion]].cost);
        packingCostPriceRules.push(data.packagingCostsId[portion]);
      }

      // OTHER COSTS AND RULES ARRAY_________________________
      const otherCostsPriceTotals: number[] = [];
      const otherCostsPriceRules: number[] = [];
      for (const portion of data.portions) {
        const costRuleId = data.otherCostsId[portion];
        otherCostsPriceTotals.push(data.costRules.otherCosts[costRuleId].costs.reduce((arr, cost) => (arr += cost.cost), 0));
        otherCostsPriceRules.push(costRuleId);
      }
      for (const portion of portionSizes) {
        packingCostPriceTotals.push(data.costRules.packagingCosts[data.packagingCostsId[portion]].cost);
        packingCostPriceRules.push(data.packagingCostsId[portion]);
      }

      // SUB TOTAL COSTS_____________________________________
      const costsSubTotals: number[] = portionSizes.map((portion, i) => componentsSubTotalsPrices[i] + packingCostPriceTotals[i] + otherCostsPriceTotals[i]);

      // MARKUP CALCULATIONS AND RULES _______________________
      const markUpPriceAmounts: number[] = [];
      const markUpPriceRules: number[] = [];
      portionSizes.map((portionSize, i) => {
        let markupRuleId = data.markupId[portionSize];
        let { name, factor, type } = data.costRules.markUps[markupRuleId];
        markUpPriceAmounts.push(calcProfit(costsSubTotals[i], type, factor));
        markUpPriceRules.push(markupRuleId);
      });

      // SALES PRICE EX VAT _____________________________________
      const salePricesExVat: number[] = portionSizes.map((portion, i) => costsSubTotals[i] + markUpPriceAmounts[i]);

      // SALES PRICE EX VAT _____________________________________
      const salesPricesIncVat: number[] = portionSizes.map((portion, i) => salePricesExVat[i] * (1 + data.setting.vat));

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
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  console.log(recipeData);
  if (!recipeData.portionSizes.length) return <Loading />;

  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* <div>hellp {myObject?.key}</div> */}
        <Row_PlatingAll />
        <Row_SubRecipesAll />
      </Suspense>
    </>
  );
};

export default RecipeModule;

/** 
// RELOAD Either Serverside or client side props
export async function getStaticProps() {
  // Fetch or initialize data here
  const myObject = { key: "Hello Wayne" };
  return {
    props: {
      myObject,
    },
  };
}
export async function getServerSideProps() {
  // Fetch or initialize data here
  const myObject = { key: "Hello Wayne" };
  return {
    props: {
      myObject,
    },
  };
}


// WRAP IN get serverside or static props()
import data from './data.json';

interface DataStructure {
  id: number;
  name: string;
  // Define other fields as per your JSON structure
}

const typedData: DataStructure[] = data as DataStructure[];

*/
