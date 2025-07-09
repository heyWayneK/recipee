import { DataProps, data } from "@/app/data/recipe";
import { preCalculateData } from "@/libs/preCalculatedRecipeData";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { mergeDeep } from "@/libs/mergeDeep";
import { getUserData } from "@/app/api/data/user/[profileid]/route";
import type {
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
  MarkupSelectSerializable,
} from "@/app/api/data/system/route";
import { getSystemData } from "@/app/api/data/system/route";

// FUTURE: POTENTIALLY USE GETSTATICPROPS for cache
// import { GetStaticProps } from "next";

// DEFINE PRECALCULATED RECIPE DATA
//- These contain the calulated recipe subTotals, Totals and
//- lookup values like markup, or the cost of other costs etc
export interface PreCalculatedRecipeData {
  // TODO: Need to use DECIMAL type
  portionSizes: number[];
  portionIds: number[];
  componentsNamesArray: string[];
  componentsIDArray: string[];
  componentsWeights: number[][]; // Decimals
  componentsPricePer1000: number[]; // Decimals
  componentsPrices: number[][]; // Decimals
  componentsPricesDesc: string[][][];
  componentsSubTotalsPrices: number[]; // Decimals
  packingCostPriceTotals: number[]; // Decimals
  packingCostPriceRules: number[]; // Decimals
  otherCostsPriceTotals: number[]; // Decimals
  otherCostsPriceRules: number[]; // Decimals
  costsSubTotals: number[]; // Decimals
  markUpPriceAmounts: number[]; // Decimals
  markUpPriceRules: number[]; // Decimals
  salePricesExVat: number[]; // Decimals
  salesPricesIncVat: number[]; // Decimals
  vatRuleIds: number[]; // Decimals
  vatRulePercs: number[]; // Decimals
  vatRuleNames: string[]; // Decimals
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
  // FUTURE: need to create secondary categories
  ingredient_category_secondary: IngredientCategorySecondarySelect[];
  dietary_classification: DietaryClassificationSelect[];
  allergy: AllergySelect[];
  recipe_mode: RecipeModeSelect[];
  recipe_type: RecipeTypeSelect[];
  oil_purpose: OilPurposeSelect[];
  salt_purpose: SaltPurposeSelect[];
  ingredient_type: IngredientTypeSelect[];
  markup_type: MarkupTypeSelect[];
  markup: MarkupSelect[] | MarkupSelectSerializable[]; // Decimals
  todo_status: TodoStatusSelect[];
  // DEFAULT VALUES BELOW (to overwritten {...vals, ... userVals})
  // GET VALUES WHERE CUSTOMER = 1 (Default Account)
  other_costs_category: OtherCostsCategorySelect[];
  other_costs_line_items_lookup: OtherCostsLineItemsLookupSelect[];
  packaging_costs_category: PackagingCostsCategorySelect[];
  packaging_costs_line_items_lookup: PackagingCostsLineItemsLookupSelect[];
  vat_rules: VatRulesSelect[];
  ingredients: IngredientTypeSelect[];
}

export type localOrDbDataTypeOptions = "localStorage" | "database" | "undefined";
type localOrDbDataType = {
  user: localOrDbDataTypeOptions;
  system: localOrDbDataTypeOptions;
};

// DEFINE context shape
export interface RecipeDataContextType {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  recipeMode: RecipeModeType;
  setRecipeMode: React.Dispatch<React.SetStateAction<RecipeModeType>>;
  recipeData: PreCalculatedRecipeData;
  updateRecipeData: (newData: Partial<PreCalculatedRecipeData>) => void;
  systemData: SystemDataProps;
  userData: UserDataProps;
  localOrDbData: localOrDbDataType;
}

const RecipeDataContext = createContext<RecipeDataContextType | undefined>(undefined);

interface RecipeDataProviderProps {
  children: React.ReactNode;
}

export type RecipeModeType = "easy" | "advanced";

// Context provider component
export const RecipeDataProvider: React.FC<RecipeDataProviderProps> = ({ children }) => {
  const [qty, setQty] = useState<number>(1);
  const [recipeMode, setRecipeMode] = useState<RecipeModeType>("easy");
  const [recipeDataState, setRecipeDataState] = useState<PreCalculatedRecipeData>(preCalculatedRecipeData);
  const [systemData, setSystemData] = useState<SystemDataProps>();
  const [userData, setUserData] = useState<UserDataProps>();

  let localOrDbData = useRef<localOrDbDataType>({ user: "undefined", system: "undefined" }); // Default value

  // USER DATA__________________________________________START::
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = (await getUserData(1)) ?? undefined;

        if (response === undefined) {
          throw new Error("System data is null");
        }

        setUserData(response as UserDataProps);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check Local Storage for cached user data
    const cachedData = localStorage.getItem("userData") ?? undefined;

    // DEFINE WHERE THE DATA IS COMING FROM
    // const userDataMode: localOrDbDataTypeOptions = "database";
    const userDataMode = cachedData && cachedData ? "localStorage" : "database";

    if (userDataMode === "localStorage" && cachedData !== undefined && cachedData !== "undefined") {
      setUserData(JSON.parse(cachedData));
    } else if (userDataMode === "database") {
      fetchUserData();
    } else {
      // console.warn("No user data available, using default values");
      // setUserData({} as UserDataProps); // Set to empty object if no data is available
    }
    console.log("%%%%%%%%%%%%% USER DATA MODE:", userDataMode);
    localOrDbData.current.user = userDataMode; // Set the user data source
  }, []);

  useEffect(() => {
    if (!userData && userData !== undefined && userData !== "undefined") return;
    // SAVE USER DATA TO LOCAL STORAGE
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);
  // USER DATA__________________________________________END::
  //
  //
  //
  // SYSTEM DATA__________________________________________START::
  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        // FUTURE: GET CUSTOMER ID FROM USER DATA
        const customerId = 1; // customerId=1 is the default system account
        let response = (await getSystemData(customerId)) ?? undefined;

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
    // DEFINE WHERE THE DATA IS COMING FROM
    // const systemDataMode: localOrDbDataTypeOptions = "database";
    const systemDataMode = cachedData ? "localStorage" : "database";

    if (systemDataMode === "localStorage" && cachedData !== undefined && cachedData !== "undefined") {
      setSystemData(JSON.parse(cachedData));
    } else if (systemDataMode === "database") {
      fetchSystemData();
    } else {
      // console.warn("No system data available, using default values");
      // setSystemData({} as SystemDataProps); // Set to empty object if no data is available
    }

    console.log("%%%%%%%%%%%%% SYSTEM DATA MODE:", systemDataMode);
    localOrDbData.current.system = systemDataMode; // If we have cached data, we assume it's from localStorage
  }, []);

  useEffect(() => {
    // SAVE SYSTEM DATA TO LOCAL STORAGE
    if (!systemData && systemData !== undefined && systemData !== "undefined") return;
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
    console.log("LAST : %%%%%%%%%%%%%%%%%%%% useEffect ---- updateRecipeData");
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
    localOrDbData: localOrDbData.current,
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
