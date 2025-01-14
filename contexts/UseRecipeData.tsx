import React, { ReactNode, createContext, useContext, useState } from "react";
import { DataProps as RecipeData } from "@/app/data/recipe";
import { data as recipeData } from "@/app/data/recipe";
import { UnknownKeysParam } from "zod";

// interface ContextType {
//   qty: number;
//   setQty: React.Dispatch<React.SetStateAction<number>>;
//   components: Record<string, any>;
//   setComponents: React.Dispatch<React.SetStateAction<Record<string, any>>>;

interface PreCalculatedTypes {
  // [key: string]: string | number;
  [key: string]: string;
}

// DEFINE PRECALCULATED RECIPE DATA
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
};

// DEFINE context shape
interface RecipeDataContextType {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  recipeData: PreCalculatedRecipeData;
  // recipeData: RecipeData;
  updateRecipeData: (newData: Partial<PreCalculatedRecipeData>) => void;
  // updateRecipeData: (newData: Partial<RecipeData>) => void;
}

const RecipeDataContext = createContext<RecipeDataContextType | undefined>(undefined);
// const RecipeDataContext = createContext<PreCalculatedRecipeData | undefined>(undefined);

interface RecipeDataProviderProps {
  children: React.ReactNode;
}

// Context provider component
export const RecipeDataProvider: React.FC<RecipeDataProviderProps> = ({ children }) => {
  const [qty, setQty] = useState<number>(1);

  const [recipeDataState, setRecipeDataState] = useState<PreCalculatedRecipeData>(preCalculatedRecipeData);
  // const [recipeDataState, setRecipeDataState] = useState<RecipeData>(recipeData);

  // Function to update any part of the recipe data
  const updateRecipeData = (newData: Partial<PreCalculatedRecipeData>) => {
    console.log("UPDATE NEW DATA", newData);
    setRecipeDataState((prevData) => ({ ...prevData, ...newData }));
  };
  // const updateRecipeData = (newData: Partial<RecipeData>) => {
  //   setRecipeDataState((prevData) => ({ ...prevData, ...newData }));
  // };

  const value: RecipeDataContextType = {
    qty,
    setQty,
    recipeData: recipeDataState,
    // recipeData: recipeDataState,
    updateRecipeData,
  };

  // let components;
  // let ingredientSubTotal;
  // let packingCost;
  // let otherCost;
  // let costsSubTotal;
  // let markUp;
  // let salePriceExVat;
  // let salesPriceIncVat;

  // 2. Return Context
  return <RecipeDataContext.Provider value={value}>{children}</RecipeDataContext.Provider>;
  // return <RecipeDataContext.Provider value={value}>{children}</RecipeDataContext.Provider>;
};

// 3. Export Hook
export const useRecipeData = () => {
  const context = useContext(RecipeDataContext);
  if (context === undefined) throw new Error("useRecipeData is used in the wrong context");
  return context;
};
