import { DataProps, data } from "@/app/data/recipe";
import { preCalculateData } from "@/libs/preCalculatedRecipeData";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { mergeDeep } from "@/libs/mergeDeep";
import { getUserData } from "@/app/api/data/user/[profileid]/route";
import {
  AllergySelect,
  CookedYieldsCategoriesSelect,
  DietaryClassificationSelect,
  DryCookedYieldsCategoriesSelect,
  DryCookedYieldsSelect,
  IngredientCategoryPrimarySelect,
  IngredientCategorySecondarySelect,
  IngredientTypeSelect,
  IngredientsReligiousCertificationSelect,
  LanguageSelect,
  MarkupTypeSelect,
  MarkupSelect,
  NutritionalDataValuesSelect,
  OilPurposeSelect,
  OtherCostsCategorySelect,
  OtherCostsLineItemsLookupSelect,
  PackagingCostsCategorySelect,
  PackagingCostsLineItemsLookupSelect,
  PrepInstructionsSelect,
  RecipeModeSelect,
  RecipeTypeSelect,
  SaltPurposeSelect,
  TodoStatusSelect,
  UnitMeasurementSelect,
  UnitTypeSelect,
  VatRulesSelect,
  getSystemData,
} from "@/app/api/data/system/route";
// FUTURE: POTENTIALLY USE GETSTATICPROPS for cache
// import { GetStaticProps } from "next";

// DEFINE PRECALCULATED RECIPE DATA
//- These contain the calulated recipe subTotals, Totals and
//- lookup values like markup, or the cost of other costs etc
export interface PreCalculatedRecipeData {
  portionSizes: number[];
  portionIds: number[];
  componentsNamesArray: string[];
  componentsIDArray: string[];
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
  vatRuleIds: number[];
  vatRulePercs: number[];
  vatRuleNames: string[];
  data: DataProps;
}

export const preCalculatedRecipeData: PreCalculatedRecipeData = {
  portionSizes: [],
  portionIds: [],
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
  vatRuleIds: [],
  vatRulePercs: [],
  vatRuleNames: [],
  // Create a deep copy of the data object (Recipe Data)
  data: JSON.parse(JSON.stringify(data)),
};
export interface UserDataProps {
  // USER VALUES BELOW (to overwrite System Data {...vals, ... userVals})
  // OVERWRITE OR ADD TO THE SYSTEM DATA
  other_costs_category: OtherCostsCategorySelect[];
  other_costs_line_items_lookup: OtherCostsLineItemsLookupSelect[];
  packaging_costs_category: PackagingCostsCategorySelect[];
  packaging_costs_line_items_lookup: PackagingCostsLineItemsLookupSelect[];
  vat_rules: VatRulesSelect[];
}

export interface SystemDataProps {
  unit_type: UnitTypeSelect[];
  unit_measurement: UnitMeasurementSelect[];
  prep_instructions: PrepInstructionsSelect[];
  cooked_yields_categories: CookedYieldsCategoriesSelect[];
  dry_cooked_yields_categories: DryCookedYieldsCategoriesSelect[];
  dry_cooked_yields: DryCookedYieldsSelect[];
  ingredients_religious_certification: IngredientsReligiousCertificationSelect[];
  language: LanguageSelect[];
  nutritional_data_values: NutritionalDataValuesSelect[];
  ingredient_category_primary: IngredientCategoryPrimarySelect[];
  // FUTURE: need to create secondary cats
  ingredient_category_secondary: IngredientCategorySecondarySelect[];
  dietary_classification: DietaryClassificationSelect[];
  allergy: AllergySelect[];
  recipe_mode: RecipeModeSelect[];
  recipe_type: RecipeTypeSelect[];
  oil_purpose: OilPurposeSelect[];
  salt_purpose: SaltPurposeSelect[];
  ingredient_type: IngredientTypeSelect[];
  markup_type: MarkupTypeSelect[];
  markup: MarkupSelect[];
  todo_status: TodoStatusSelect[];
  // DEFAULT VALUES BELOW (to overwritten {...vals, ... userVals})
  // GET VALUES WHERE CUSTOMER = 1 (Default Account)
  other_costs_category: OtherCostsCategorySelect[];
  other_costs_line_items_lookup: OtherCostsLineItemsLookupSelect[];
  packaging_costs_category: PackagingCostsCategorySelect[];
  packaging_costs_line_items_lookup: PackagingCostsLineItemsLookupSelect[];
  vat_rules: VatRulesSelect[];
}

// DEFINE context shape
interface RecipeDataContextType {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  recipeMode: RecipeModeType;
  setRecipeMode: React.Dispatch<React.SetStateAction<RecipeModeType>>;
  recipeData: PreCalculatedRecipeData;
  updateRecipeData: (newData: Partial<PreCalculatedRecipeData>) => void;
  systemData: SystemDataProps;
  userData: UserDataProps;
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
  const [systemData, setSystemData] = useState<SystemDataProps>();
  const [userData, setUserData] = useState<UserDataProps>();

  // USER DATA__________________________________________START::
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await getUserData(1)) ?? undefined;
        // FUTURE: API CALL ALTERNATIVE
        // const response = await fetch("/api/user/[profileid]");
        // const data = await response.json();

        if (response === undefined) {
          throw new Error("System data is null");
        }

        setUserData(response as UserDataProps);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const cachedData = localStorage.getItem("userData") ?? undefined;

    if (cachedData === undefined && cachedData === "undefined") {
      setUserData(JSON.parse(cachedData));
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);
  // USER DATA__________________________________________END::
  //
  //
  //
  // SYSTEM DATA__________________________________________START::
  useEffect(() => {
    const fetchData = async () => {
      try {
        // FUTURE: GET CUSTOMER ID FROM USER DATA
        const customerId = 1; // organisation ID
        const response = (await getSystemData(customerId)) ?? undefined;
        // FUTURE: for APP - API CALL ALTERNATIVE
        // const response = await fetch("/api/data/system");
        // const data = await response.json();

        if (response === undefined) {
          throw new Error("System data is null");
        }

        setSystemData(response as SystemDataProps);
      } catch (error) {
        console.error("Error fetching System Data:", error);
        throw new Error("Error fetching System Data");
      }
    };

    const cachedData = localStorage.getItem("systemData") ?? undefined;
    if (cachedData !== undefined && cachedData !== "undefined") {
      setSystemData(JSON.parse(cachedData));
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("systemData", JSON.stringify(systemData));
  }, [systemData]);
  // SYSTEM DATA__________________________________________END::

  // PRECALCULATED RECIPE DATA (Totals, SubTotals, Prices)_________START::
  const updateRecipeData = useCallback(
    (newData: Partial<PreCalculatedRecipeData>) => {
      setRecipeDataState((prevData) => {
        const merge: PreCalculatedRecipeData = mergeDeep(prevData, { ...newData });
        if (!systemData || !userData) return merge;
        const preCalculated = { ...merge, ...preCalculateData(merge, systemData, userData) };
        return preCalculated;
      });
    },
    [systemData, userData]
  );

  useEffect(() => {
    // console.log("useEffect ---- preCalculatedRecipeData ----");
    if (!systemData || !userData) return;
    updateRecipeData(preCalculateData(preCalculatedRecipeData, systemData, userData));
  }, [systemData, userData, updateRecipeData]);

  /* INFO: Function to update any part of the recipe data
    const updateRecipeData = (newData: Partial<PreCalculatedRecipeData>) => {
    // console.log("UPDATE NEW DATA", newData);
    setRecipeDataState((prevData) => ({ ...prevData, ...newData }));
    }; 
  */

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

  const value: RecipeDataContextType = {
    qty,
    setQty,
    recipeMode,
    setRecipeMode,
    recipeData: recipeDataState,
    updateRecipeData,
    systemData: systemData ?? ({} as SystemDataProps),
    userData: userData ?? ({} as UserDataProps),
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
