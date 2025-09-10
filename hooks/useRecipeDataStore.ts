import { create } from "zustand";
import { PreCalculatedRecipeData, localOrDbDataType, RecipeModeType, SystemDataProps } from "@/types/recipeTypes";
import { getValueByPath, setValueByPath } from "@/utils/getSetValueFromObject";
import Decimal from "decimal.js";
import { preCalculateData } from "@/libs/preCalculatedRecipeData";
import { getLiveRecipeData } from "@/app/api/data/functions/system_user_recipe";

interface RecipeDataState {
  qty: number;
  recipeMode: RecipeModeType;
  systemData: SystemDataProps;
  recipeData: PreCalculatedRecipeData;
  localOrDbData: localOrDbDataType;
  loading: boolean;
  loaded: boolean; // To prevent refetching
  setQty: (qty: number) => void;
  setRecipeMode: (mode: RecipeModeType) => void;
  fetchData: (orgId: string | undefined) => Promise<void>;
  fetchRecipeData: (recipeUuid: string, orgId: string) => Promise<void>;
  setRecipeDataByPath: (path: string, value: any) => void;
  getRecipeDataByPath: (path: string) => any;
  setRecipeData: (recipeData: PreCalculatedRecipeData) => void;
  setSystemData: (systemData: SystemDataProps) => void;
  // WAYNE
  updatePreCalc: () => void;
  // reloadRecipeDataFromDb: () => Promise<void>;

  //______
  createIngredientAsSub: (path: string) => any;
  updateIngredientPositions: (path: string, recipeUuid: string, ingredientId: string, position: number) => any;
}

export const useRecipeDataStore = create<RecipeDataState>((set, get) => ({
  qty: 1,
  recipeMode: "pro",
  systemData: {} as SystemDataProps,
  recipeData: {} as PreCalculatedRecipeData,
  localOrDbData: {
    system: undefined,
    systemUpdated: undefined,
    recipe: undefined,
    recipeUpdated: undefined,
  },
  loading: false,
  loaded: false,

  setQty: (qty) => set({ qty }),
  setRecipeMode: (mode) => set({ recipeMode: mode }),

  fetchData: async (orgId) => {
    set({ loading: true });
    const secsToUpdate = 60;

    try {
      const systemDataLocal = localStorage.getItem("systemData");
      const recipeDataLocal = localStorage.getItem("recipeData");
      const systemDataUpdated = localStorage.getItem("systemDataUpdated");
      const date = new Date();

      if (!systemDataLocal || !recipeDataLocal || !systemDataUpdated || date.getTime() - new Date(systemDataUpdated).getTime() > secsToUpdate * 1000) {
        set({
          localOrDbData: {
            system: "database",
            systemUpdated: date,
            recipe: "database",
            recipeUpdated: date,
          },
        });

        const response = await fetch("/api/data/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const { systemData, recipeData } = await response.json();

        set({
          systemData: systemData as SystemDataProps,
          recipeData: recipeData as PreCalculatedRecipeData,
          loading: false,
          loaded: true,
        });

        localStorage.setItem("systemData", JSON.stringify(systemData));
        localStorage.setItem("recipeData", JSON.stringify(recipeData));
        localStorage.setItem("systemDataUpdated", new Date().toISOString());
        localStorage.setItem("recipeDataUpdated", new Date().toISOString());
      } else {
        const systemDataLocalParsed = JSON.parse(systemDataLocal);
        const recipeDataLocalParsed = JSON.parse(recipeDataLocal);

        set({
          systemData: systemDataLocalParsed as SystemDataProps,
          recipeData: recipeDataLocalParsed as PreCalculatedRecipeData,
          localOrDbData: {
            system: "localStorage",
            systemUpdated: date,
            recipe: "localStorage",
            recipeUpdated: date,
          },
          loading: false,
          loaded: true,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },

  fetchRecipeData: async (recipeUuid, orgId) => {
    set({ loading: true });

    try {
      set({
        localOrDbData: {
          recipe: "database",
          recipeUpdated: new Date(),
          system: get().localOrDbData.system,
          systemUpdated: get().localOrDbData.systemUpdated,
        },
      });

      const response = await fetch("/api/data/recipe", {
        // need to add get pr post
      });
      console.log("FetchRecipe DATA_____________", response);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { recipeData } = await response.json();
      const dataObject = { data: recipeData[0] } as PreCalculatedRecipeData;
      const preCalcData = await preCalculateData(dataObject, get().systemData);

      set({
        recipeData: { ...preCalcData, ...dataObject } as PreCalculatedRecipeData,
        // recipeData: recipeData as PreCalculatedRecipeData,
        loading: false,
        loaded: true,
      });

      localStorage.setItem("recipeData", JSON.stringify(recipeData));
      localStorage.setItem("recipeDataUpdated", new Date().toISOString());
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },

  setRecipeDataByPath: async (path, value) => {
    // const orgId = "1"; // Default customer ID
    // const recipeId = "1234567890";

    // RELOAD DATABASE
    // WRONG METHOD to call data, need api call
    // const newRecipeData = await getLiveRecipeData(recipeId, orgId);
    // const newRecipeData = await getLiveRecipeData(recipeId, orgId);
    // const dataObject = { data: newRecipeData[0] } as PreCalculatedRecipeData;
    // Pre-calculate data arrays to build recipe UI

    // const newRecipeData = setValueByPath(get().recipeData, path, value);
    // const preCalcData = await preCalculateData(newRecipeData, get().systemData);
    // const preCalcData = await preCalculateData(dataObject, get().systemData);

    set((state) => ({
      // recipeData: { ...preCalcData, ...dataObject },
      // recipeData: { ...state.recipeData, ...preCalcData },

      // ORIGINAL
      recipeData: setValueByPath(state.recipeData, path, value),
    }));
  },

  // reloadRecipeData: ()

  updatePreCalc: async () => {
    const currRecipeData = get().recipeData;
    const currSystemData = get().systemData;
    const preCalcData = await preCalculateData(currRecipeData, currSystemData);
    set((state) => ({
      recipeData: setValueByPath(state.recipeData, "", preCalcData),
    }));
    // return recipeData: (recipeData) => set({...,recipeData, ...preCalcData }),
    // return recipeData: (recipeData) => set({...,recipeData, ...preCalcData }),
  },

  getRecipeDataByPath: (path) => {
    const currentRecipeData = get().recipeData;
    return getValueByPath(currentRecipeData, path);
  },

  setRecipeData: (recipeData) => set({ recipeData }),

  setSystemData: (systemData) => set({ systemData }),

  createIngredientAsSub: (path) => {
    // Dscribe the functionality

    return {};
  },

  updateIngredientPositions: (path: string, recipeUuid: string, ingredientId: string, position: number) =>
    set((state) => {
      const ingredients = getValueByPath(state.recipeData, path);
      if (Array.isArray(ingredients)) {
        const updatedIngredients = ingredients.map((ingred, index) => ({
          ...ingred,
          order: index,
        }));
        return {
          recipeData: setValueByPath(state.recipeData, path, updatedIngredients),
        };
      }
      return {};
    }),
}));
