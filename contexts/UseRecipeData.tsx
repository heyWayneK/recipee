import { DataProps, data } from "@/app/data/recipe";
import { preCalculateData } from "@/libs/preCalculatedRecipeData";
import React, { createContext, useContext, useEffect, useState } from "react";
import { mergeDeep } from "@/libs/mergeDeep";

// interface PreCalculatedTypes {
//   [key: string]: string;
// }

// DEFINE PRECALCULATED RECIPE DATA
//- These contain the calulated recipe subTotals, Totals and
//- lookup values like markup, or the cost of other costs etc
export interface PreCalculatedRecipeData {
  portionSizes: number[];
  componentsNamesArray: string[];
  componentsIDArray: any[];
  componentsWeights: number[][];
  componentsPricePer1000: number[];
  componentsPrices: number[][];
  componentsPricesDesc: string[][][];
  componentsSubTotalsPrices: number[];
  packingCostPriceTotals: number[];
  packingCostPriceRules: number[];
  otherCostsPriceTotals: number[];
  otherCostsPriceRules: number[];
  costsSubTotals: number[];
  markUpPriceAmounts: number[];
  markUpPriceRules: number[];
  salePricesExVat: number[];
  salesPricesIncVat: number[];
  data: DataProps;
}
export const preCalculatedRecipeData: PreCalculatedRecipeData = {
  portionSizes: [],
  componentsWeights: [],
  componentsNamesArray: [],
  componentsIDArray: [],
  componentsPricePer1000: [],
  componentsPrices: [],
  componentsPricesDesc: [],
  componentsSubTotalsPrices: [],
  packingCostPriceTotals: [],
  packingCostPriceRules: [],
  otherCostsPriceTotals: [],
  otherCostsPriceRules: [],
  costsSubTotals: [],
  markUpPriceAmounts: [],
  markUpPriceRules: [],
  salePricesExVat: [],
  salesPricesIncVat: [],
  // Create a deep copy of the data object (Recipe Data)
  data: JSON.parse(JSON.stringify(data)),
};

// DEFINE context shape
interface RecipeDataContextType {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  recipeMode: RecipeModeType;
  setRecipeMode: React.Dispatch<React.SetStateAction<RecipeModeType>>;
  recipeData: PreCalculatedRecipeData;
  updateRecipeData: (newData: Partial<PreCalculatedRecipeData>) => void;
  // updateRecipeData: Partial<PreCalculatedRecipeData>;
}

const RecipeDataContext = createContext<RecipeDataContextType | undefined>(undefined);

interface RecipeDataProviderProps {
  children: React.ReactNode;
}

type RecipeModeType = "easy" | "advanced";
// Context provider component
export const RecipeDataProvider: React.FC<RecipeDataProviderProps> = ({ children }) => {
  const [qty, setQty] = useState<number>(1);
  const [recipeMode, setRecipeMode] = useState<RecipeModeType>("easy");
  const [recipeDataState, setRecipeDataState] = useState<PreCalculatedRecipeData>(preCalculatedRecipeData);

  useEffect(() => {
    console.log("useEffect ---- ");
    updateRecipeData(preCalculateData(preCalculatedRecipeData));
  }, []);

  /* INFO: Function to update any part of the recipe data
  const updateRecipeData = (newData: Partial<PreCalculatedRecipeData>) => {
    // console.log("UPDATE NEW DATA", newData);
    setRecipeDataState((prevData) => ({ ...prevData, ...newData }));
  }; */

  // PARTIAL SAVE OF THE RECIPE DATA STATE
  /**
   *
   * @param newData
   * @returns new DataProps Object
   *
   * INFO: Usage Example
      const complexUpdate = {
          portionSizes: [4, 5],
          components: {
            0: { val: "updated one" },
            1: { val: "updated two" }
          }
        };
        updateRecipeData = (complexUpdate)
   */
  const updateRecipeData = (newData: Partial<PreCalculatedRecipeData>) => {
    setRecipeDataState((prevData) => {
      const merge: PreCalculatedRecipeData = mergeDeep(prevData, { ...newData });
      const preCalculated = { ...merge, ...preCalculateData(merge) };
      return preCalculated;
    });
  };

  const value: RecipeDataContextType = {
    qty,
    setQty,
    recipeMode,
    setRecipeMode,
    recipeData: recipeDataState,
    updateRecipeData,
  };

  // 2. Return Context
  return <RecipeDataContext.Provider value={value}>{children}</RecipeDataContext.Provider>;
};

// 3. Export Hook
export const useRecipeData = () => {
  const context = useContext(RecipeDataContext);
  if (context === undefined) throw new Error("useRecipeData is used in the wrong context");
  return context;
};
