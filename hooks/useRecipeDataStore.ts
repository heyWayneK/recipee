import { create } from "zustand";
import {
  PreCalculatedRecipeData,
  localOrDbDataType,
  RecipeModeType,
  SystemDataProps,
} from "@/types/recipeTypes";
import { getValueByPath, setValueByPath } from "@/utils/getSetValueFromObject";

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
  setRecipeDataByPath: (path: string, value: any) => void;
  getRecipeDataByPath: (path: string) => any;
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
    const secsToUpdate = 3600;

    try {
      const systemDataLocal = localStorage.getItem("systemData");
      const recipeDataLocal = localStorage.getItem("recipeData");
      const systemDataUpdated = localStorage.getItem("systemDataUpdated");
      const date = new Date();

      if (
        !systemDataLocal ||
        !recipeDataLocal ||
        !systemDataUpdated ||
        (date.getTime() - new Date(systemDataUpdated).getTime() > secsToUpdate * 1000)
      ) {
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

  setRecipeDataByPath: (path, value) => {
    set((state) => ({
        recipeData: setValueByPath(state.recipeData, path, value)
    }));
  },

  getRecipeDataByPath: (path) => {
    const currentRecipeData = get().recipeData;
    return getValueByPath(currentRecipeData, path);
  },
}));
