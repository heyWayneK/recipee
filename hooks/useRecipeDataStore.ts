import { create } from "zustand";
import { PreCalculatedRecipeData, localOrDbDataType, RecipeModeType, SystemDataProps, RecipeDetailProps } from "@/types/recipeTypes";
import { getValueByPath, setValueByPath } from "@/utils/getSetValueFromObject";
import Decimal from "decimal.js";

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
  setRecipeData: (recipeData: PreCalculatedRecipeData) => void;
  //______
  createIngredientStep: (componentPath: string) => void;
  createIngredientAsSub: (path: string) => any;
  updateIngredientPostions: (path: string, recipeUuid: string, ingredientId: string, position: number) => any;
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

  setRecipeDataByPath: (path, value) => {
    set((state) => ({
      recipeData: setValueByPath(state.recipeData, path, value),
    }));
  },

  getRecipeDataByPath: (path) => {
    const currentRecipeData = get().recipeData;
    return getValueByPath(currentRecipeData, path);
  },

  setRecipeData: (recipeData) => set({ recipeData }),

  createIngredientStep: (componentPath) => {
    const { recipeData, setRecipeData } = get();
    const component = getValueByPath(recipeData, componentPath);

    if (!component || !Array.isArray(component.recipeDetail)) {
      console.error("Invalid component path or recipeDetail is not an array", componentPath);
      return;
    }

    const newSortOrder = component.recipeDetail.length > 0 ? Math.max(...component.recipeDetail.map((d: any) => d.sort_order || 0)) + 1 : 1;

    const payload = {
      recipe_uuid: recipeData.data.uuid,
      recipe_components_on_recipeUuid: component.uuid,
      sort_order: newSortOrder,
      ingredient_type_name: "step",
      step_instruction: "New Step",
    };

    fetch('/api/recipe-detail-row/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    .then(res => res.json())
    .then(newRow => {
      const { recipeData, setRecipeData } = get();
      const component = getValueByPath(recipeData, componentPath);
      const newRecipeDetails = [...component.recipeDetail, newRow];
      const newRecipeData = setValueByPath(recipeData, `${componentPath}.recipeDetail`, newRecipeDetails);
      setRecipeData(newRecipeData);
    })
    .catch(error => console.error("Failed to create ingredient step", error));
  },

  createIngredientAsSub: (path) => {
    // Dscribe the functionality

    return {};
  },

  updateIngredientPostions: (path: string, recipeUuid: string, ingredientId: string, position: number) =>
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
