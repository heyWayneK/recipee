export interface DataProps {
  portions: number[];
  setting: {
    unitMaster: string[];
    unitMask: string[];
    unitType: string[];
    vat: number;
    currency: string;
    locale: string;
  };
  costRules: CostRules;
  components: ComponentsProps[];
  uiElements: UIElement[];
  packagingCostsId: { [key: number]: number };
  otherCostsId: { [key: number]: number };
  markupId: { [key: number]: number };
}

export interface CostRules {
  packagingCosts: {
    [key: number]: PackagingCost;
  };
  otherCosts: {
    [key: number]: OtherCost;
  };
  markUps: {
    [key: number]: MarkUp;
  };
}

export interface PackagingCost {
  name: string;
  cost: number;
}

export interface OtherCost {
  name: string;
  costs: OtherCostItem[];
}

export interface OtherCostItem {
  name: string;
  cost: number;
  id: number;
}

export interface MarkUp {
  name: string;
  factor: number;
  type: "markup" | "margin" | "xcost";
}

export interface RecipeType {
  type: ["local", "master", "unlinkedMaster"];
}

export interface nutriPer100Props {
  name: string;
  valuePer100: number;
  unit: string;
}

export interface ComponentsProps {
  name: string;
  id: number;
  subType: "ingredient" | "recipe";
  recipeId: number | null;
  recipeType: "local" | "master" | "unlinkedMaster";
  ingredientId: number | null;
  portions: { [key: number]: number };
  ingredientCosts: { [key: number]: number };
  yield: number;
  nutriPer100: nutriPer100Props[];
  version: string;
  recipe?: RecipeProps;
}

export interface RecipeProps {
  recipeSummary: {};
  brand: {};
  customer: {};
  recipeDetail: recipeDetailProps[];
  // recipeSummary: { yield: 0.85 },
  // brand: { name: "fitchef", id: 3452, logoSrc: "" },
  // customer: { name: "emperors", id: 8667, logoSrc: "" },
  // recipeDetail: [
}

export interface recipeDetailProps {
  ingredId: number;
  ingredName: string;
  dietClassification: "vegan" | "vegetarian" | "animal_product";
  order: number;
  type: "ingredient" | "step" | "sub-recipe";
  stepInstruction?: string;
  supplier: string;
  instruction: string;
  qty: number;
  unitType: "liquid" | "weight";
  cost: number;
  needsPrep: boolean;
  FQscore: FQProps;
}

export interface FQProps {
  // MUSTS BE BETWEEN -1 to 1
  positive: number;
  negative: number;
  neutral: number;
  overall: number;
}

export interface UIElement {
  name: string;
  reactComponent?: string;
  costsLive: { [key: number]: number };
}

export interface RecipeModuleProps {
  className?: string;
}

export const data: DataProps = {
  setting: {
    // ALL RECIPES ARE IN g
    unitType: ["weight", "liquid"],
    unitMaster: ["g", "kg"] /*[["g", "kg"],["oz", "lbs"],] */,
    unitMask: ["metric", "imperial"],
    vat: 0.15,
    currency: "R",
    locale: "ZAR",
  },
  costRules: {
    // only include Packaging Costs included in the recipe
    packagingCosts: {
      1: { name: "350g Hulamin tray", cost: 2.37 },
      2: { name: "275g Hulamin Tub", cost: 2.43 },
      5: { name: "Smoothie 300ml", cost: 1.2 },
      8: { name: "1kg Hulamin", cost: 7.43 },
      25: { name: "300g Plastic Tray", cost: 7.43 },
      36: { name: "1kg Hulamin", cost: 7.43 },
      549876: { name: "1kg Hulamin", cost: 7.43 },
    },
    // Only include otherCosts used in this recipe
    otherCosts: {
      23: {
        name: "350g meal extra",
        costs: [
          { name: "Film 350g", cost: 1.43, id: 730 },
          { name: "Small Sticker", cost: 0.32, id: 356 },
          { name: "Lid Sticker", cost: 0.32, id: 859 },
          { name: "Share of Box", cost: 0.75, id: 529 },
        ],
      },
      46: {
        name: "350g meal extra",
        costs: [
          { name: "Film 350g", cost: 1.98, id: 730 },
          { name: "Small Sticker", cost: 1.3, id: 356 },
          { name: "Lid Sticker", cost: 0.92, id: 859 },
          { name: "Share of Box", cost: 0.88, id: 529 },
        ],
      },
    },
    markUps: {
      1: { name: "200%", factor: 2.0, type: "markup" },
      2: { name: "175%", factor: 1.75, type: "markup" },
      3: { name: "FitChef", factor: 1.5, type: "markup" },
      4: { name: "Thyme", factor: 1.4, type: "markup" },
      5: { name: "Smoothies", factor: 2.4, type: "markup" },
      6: { name: "Snacks", factor: 2.6, type: "markup" },
      7: { name: "70% Margin", factor: 0.7, type: "margin" },
      8: { name: "2x", factor: 2, type: "xcost" },
      9: { name: "2.5x", factor: 2.5, type: "xcost" },
    },
  },
  portions: [100, 275, 350],
  packagingCostsId: { 100: 2, 275: 2, 350: 1, 1000: 8 },
  otherCostsId: { 100: 23, 275: 46, 350: 46, 1000: 23 },
  markupId: { 100: 1, 275: 7, 350: 9, 1000: 8 },
  components: [
    {
      name: "Cheese Cheddar",
      version: "22_mar_2024_12h34_WK_2",
      id: 101235,
      subType: "ingredient",
      recipeType: "local",
      recipeId: 26668,
      ingredientId: 4567,
      portions: { 100: 11, 275: 12, 350: 13, 1000: 14 },
      ingredientCosts: { 100: 11.11, 275: 12.11, 350: 13.11, 1000: 14.11 },
      yield: 0.8,
      nutriPer100: [
        { name: "kcal", valuePer100: 2000, unit: "kcal" },
        { name: "kj", valuePer100: 4000, unit: "kcal" },
        { name: "protein", valuePer100: 7, unit: "g" },
        { name: "fat", valuePer100: 1.5, unit: "g" },
        { name: "saturated fat", valuePer100: 0.7, unit: "g" },
        { name: "monounsaturate fat", valuePer100: 0.5, unit: "g" },
        { name: "Polyunsaturate fat", valuePer100: 0.2, unit: "g" },
        { name: "trans fats", valuePer100: 0, unit: "g" },
        { name: "omega-3", valuePer100: 0.1, unit: "g" },
        { name: "omega-6", valuePer100: 0.05, unit: "g" },
        { name: "omega-9", valuePer100: 0.1, unit: "g" },
        { name: "net carbohydrate", valuePer100: 6, unit: "g" },
        { name: "total carbohydrate", valuePer100: 9, unit: "g" },
        { name: "starch", valuePer100: 1.3, unit: "g" },
        { name: "total sugars", valuePer100: 5, unit: "g" },
        { name: "added sugar", valuePer100: 0.2, unit: "g" },
        { name: "artificial sugar", valuePer100: 0, unit: "g" },
        { name: "fibre", valuePer100: 2, unit: "g" },
        { name: "sodium", valuePer100: 0.5, unit: "g (#mg)" },
        { name: "salt", valuePer100: 1, unit: "g (#mg)" },
      ],
    },
    {
      name: "Roasted Cauli Cheese 1",
      version: "22_mar_2024_12h34_WK_2",
      id: 101235,
      subType: "recipe",
      recipeType: "local",
      recipeId: 986,
      ingredientId: null,
      portions: { 100: 21, 275: 22, 350: 23, 1000: 24 },
      ingredientCosts: { 100: 21.11, 275: 22.45, 350: 23.47, 1000: 24.37 },
      yield: 0.79,
      nutriPer100: [
        { name: "kcal", valuePer100: 2000, unit: "kcal" },
        { name: "kj", valuePer100: 4000, unit: "kcal" },
        { name: "protein", valuePer100: 7, unit: "g" },
        { name: "fat", valuePer100: 1.5, unit: "g" },
        { name: "saturated fat", valuePer100: 0.7, unit: "g" },
        { name: "monounsaturate fat", valuePer100: 0.5, unit: "g" },
        { name: "Polyunsaturate fat", valuePer100: 0.2, unit: "g" },
        { name: "trans fats", valuePer100: 0, unit: "g" },
        { name: "omega-3", valuePer100: 0.1, unit: "g" },
        { name: "omega-6", valuePer100: 0.05, unit: "g" },
        { name: "omega-9", valuePer100: 0.1, unit: "g" },
        { name: "net carbohydrate", valuePer100: 6, unit: "g" },
        { name: "total carbohydrate", valuePer100: 9, unit: "g" },
        { name: "starch", valuePer100: 1.3, unit: "g" },
        { name: "total sugars", valuePer100: 5, unit: "g" },
        { name: "added sugar", valuePer100: 0.2, unit: "g" },
        { name: "artificial sugar", valuePer100: 0, unit: "g" },
        { name: "fibre", valuePer100: 2, unit: "g" },
        { name: "sodium", valuePer100: 0.5, unit: "g (#mg)" },
        { name: "salt", valuePer100: 1, unit: "g (#mg)" },
      ],
      recipe: {
        recipeSummary: { yield: 0.85, costPer100g: 43.7 },
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        recipeDetail: [
          {
            ingredId: 111,
            ingredName: "Master - FC Chicken Breast Novation Cooked",
            qty: 375,
            order: 2,
            type: "ingredient",
            instruction: "",
            dietClassification: "vegetarian",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            cost: 5.43,
            needsPrep: false,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 825,
            ingredName: "Coconut Oil",
            qty: 345,
            order: 2,
            type: "ingredient",
            instruction: "",
            dietClassification: "vegetarian",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            cost: 5.43,
            needsPrep: false,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
        ],
      },
    },
    {
      name: "Master - FC Potato Mash super long name",
      version: "22_mar_2024_12h34_WK_2",
      id: 1012456,
      subType: "recipe",
      recipeId: 6759,
      recipeType: "local",
      ingredientId: null,
      portions: { 100: 31, 275: 32, 350: 33, 1000: 34 },
      ingredientCosts: { 100: 31.66, 275: 32.43, 350: 33.7, 1000: 34.88 },

      yield: 0.82,
      nutriPer100: [
        { name: "kcal", valuePer100: 2000, unit: "kcal" },
        { name: "kj", valuePer100: 4000, unit: "kcal" },
        { name: "protein", valuePer100: 7, unit: "g" },
        { name: "fat", valuePer100: 1.5, unit: "g" },
        { name: "saturated fat", valuePer100: 0.7, unit: "g" },
        { name: "monounsaturate fat", valuePer100: 0.5, unit: "g" },
        { name: "Polyunsaturate fat", valuePer100: 0.2, unit: "g" },
        { name: "trans fats", valuePer100: 0, unit: "g" },
        { name: "omega-3", valuePer100: 0.1, unit: "g" },
        { name: "omega-6", valuePer100: 0.05, unit: "g" },
        { name: "omega-9", valuePer100: 0.1, unit: "g" },
        { name: "net carbohydrate", valuePer100: 6, unit: "g" },
        { name: "total carbohydrate", valuePer100: 9, unit: "g" },
        { name: "starch", valuePer100: 1.3, unit: "g" },
        { name: "total sugars", valuePer100: 5, unit: "g" },
        { name: "added sugar", valuePer100: 0.2, unit: "g" },
        { name: "artificial sugar", valuePer100: 0, unit: "g" },
        { name: "fibre", valuePer100: 2, unit: "g" },
        { name: "sodium", valuePer100: 0.5, unit: "g (#mg)" },
        { name: "salt", valuePer100: 1, unit: "g (#mg)" },
      ],
    },
    {
      name: "FC Mince Cautage Pie",
      version: "22_mar_2024_12h34_WK_2",
      id: 10129876,
      subType: "recipe",
      recipeId: 657,
      recipeType: "local",
      ingredientId: null,
      portions: { 100: 41, 275: 42, 350: 43, 1000: 44 },
      ingredientCosts: { 100: 41.66, 275: 42.43, 350: 43.7, 1000: 44.88 },

      yield: 89,
      nutriPer100: [
        { name: "kcal", valuePer100: 2000, unit: "kcal" },
        { name: "kj", valuePer100: 4000, unit: "kcal" },
        { name: "protein", valuePer100: 7, unit: "g" },
        { name: "fat", valuePer100: 1.5, unit: "g" },
        { name: "saturated fat", valuePer100: 0.7, unit: "g" },
        { name: "monounsaturate fat", valuePer100: 0.5, unit: "g" },
        { name: "Polyunsaturate fat", valuePer100: 0.2, unit: "g" },
        { name: "trans fats", valuePer100: 0, unit: "g" },
        { name: "omega-3", valuePer100: 0.1, unit: "g" },
        { name: "omega-6", valuePer100: 0.05, unit: "g" },
        { name: "omega-9", valuePer100: 0.1, unit: "g" },
        { name: "net carbohydrate", valuePer100: 6, unit: "g" },
        { name: "total carbohydrate", valuePer100: 9, unit: "g" },
        { name: "starch", valuePer100: 1.3, unit: "g" },
        { name: "total sugars", valuePer100: 5, unit: "g" },
        { name: "added sugar", valuePer100: 0.2, unit: "g" },
        { name: "artificial sugar", valuePer100: 0, unit: "g" },
        { name: "fibre", valuePer100: 2, unit: "g" },
        { name: "sodium", valuePer100: 0.5, unit: "g (#mg)" },
        { name: "salt", valuePer100: 1, unit: "g (#mg)" },
      ],
    },
    {
      name: "Olive Oil",
      version: "22_mar_2024_12h34_WK_2",
      id: 10129876,
      subType: "ingredient",
      recipeId: null,
      recipeType: "local",
      ingredientId: 568,
      portions: { 100: 51, 275: 52, 350: 53, 1000: 54 },
      ingredientCosts: { 100: 51.33, 275: 52.43, 350: 53.7, 1000: 54.88 },
      yield: 0.73,
      nutriPer100: [
        { name: "kcal", valuePer100: 2000, unit: "kcal" },
        { name: "kj", valuePer100: 4000, unit: "kcal" },
        { name: "protein", valuePer100: 7, unit: "g" },
        { name: "fat", valuePer100: 1.5, unit: "g" },
        { name: "saturated fat", valuePer100: 0.7, unit: "g" },
        { name: "monounsaturate fat", valuePer100: 0.5, unit: "g" },
        { name: "Polyunsaturate fat", valuePer100: 0.2, unit: "g" },
        { name: "trans fats", valuePer100: 0, unit: "g" },
        { name: "omega-3", valuePer100: 0.1, unit: "g" },
        { name: "omega-6", valuePer100: 0.05, unit: "g" },
        { name: "omega-9", valuePer100: 0.1, unit: "g" },
        { name: "net carbohydrate", valuePer100: 6, unit: "g" },
        { name: "total carbohydrate", valuePer100: 9, unit: "g" },
        { name: "starch", valuePer100: 1.3, unit: "g" },
        { name: "total sugars", valuePer100: 5, unit: "g" },
        { name: "added sugar", valuePer100: 0.2, unit: "g" },
        { name: "artificial sugar", valuePer100: 0, unit: "g" },
        { name: "fibre", valuePer100: 2, unit: "g" },
        { name: "sodium", valuePer100: 0.5, unit: "g (#mg)" },
        { name: "salt", valuePer100: 1, unit: "g (#mg)" },
      ],
    },
  ],
  uiElements: [
    // { name: "Edit Or Production", reactComponent: "<Row_EditOrProduction>" },
    { name: "controls", costsLive: {} },
    { name: "plating", costsLive: {} },
    { name: "components", costsLive: {} },
    { name: "ingredient_cost", costsLive: {} },
    { name: "packaging_cost", costsLive: {} },
    { name: "other_cost", costsLive: {} },
    { name: "costs_sub_total", costsLive: {} },
    { name: "markup", costsLive: {} },
    { name: "sale_price_(ex_vat)", costsLive: {} },
    { name: "sale_price_(incl_vat)", costsLive: {} },
    { name: "print", costsLive: {} },
    { name: "method", costsLive: {} },
  ],
};
