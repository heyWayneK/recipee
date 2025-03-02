import { DataProps, data } from "@/app/data/recipe";
import React, { createContext, useContext, useState } from "react";

interface PreCalculatedTypes {
  [key: string]: string;
}

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
  data: JSON.parse(JSON.stringify(data)),
};

// DEFINE context shape
interface RecipeDataContextType {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  recipeData: PreCalculatedRecipeData;
  updateRecipeData: (newData: Partial<PreCalculatedRecipeData>) => void;
}

const RecipeDataContext = createContext<RecipeDataContextType | undefined>(undefined);

interface RecipeDataProviderProps {
  children: React.ReactNode;
}

// Context provider component
export const RecipeDataProvider: React.FC<RecipeDataProviderProps> = ({ children }) => {
  const [qty, setQty] = useState<number>(1);

  // const [recipeDataState, setRecipeDataState] = useState<PreCalculatedRecipeData>(JSON.parse(JSON.stringify(data)));
  const [recipeDataState, setRecipeDataState] = useState<PreCalculatedRecipeData>(preCalculatedRecipeData);

  // Function to update any part of the recipe data
  // const updateRecipeData = (newData: Partial<PreCalculatedRecipeData>) => {
  //   // console.log("UPDATE NEW DATA", newData);
  //   setRecipeDataState((prevData) => ({ ...prevData, ...newData }));
  // };

  // PARTIAL SAVE recipeData.data structure
  const updateRecipeData = (newData: Partial<PreCalculatedRecipeData>) => {
    setRecipeDataState((prevData) => {
      const mergeDeep = (target: any, source: any): any => {
        // If source value is not object or is null, return source directly
        if (source === null || typeof source !== "object") return source;

        // Target and source must be objects
        for (const key in source) {
          // TODO: DOES THIS STILL WORK... new option below
          // if (source.hasOwnProperty(key)) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (target[key] && typeof target[key] === "object" && typeof source[key] === "object") {
              // If both target[key] and source[key] are objects, merge deeply
              target[key] = mergeDeep(target[key], source[key]);
            } else {
              // Otherwise, overwrite the target property
              target[key] = source[key];
            }
          }
        }
        return target;
      };

      return mergeDeep({ ...prevData }, newData);
    });
  };

  const value: RecipeDataContextType = {
    qty,
    setQty,
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
