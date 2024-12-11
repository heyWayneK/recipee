export const recipeeUI = {
  sub_recipe: ["ingredName", "instruction", "qty", "costPer1000", "%", "move"],
};

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
  uiSubRecipeElements: UIElement[];
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
  costPer100g: number;
  brand: {};
  customer: {};
  recipeDetail: recipeDetailProps[];
  // brand: { name: "fitchef", id: 3452, logoSrc: "" },
  // customer: { name: "emperors", id: 8667, logoSrc: "" },
  // recipeDetail: [
}

export interface recipeDetailProps {
  ingredId?: number;
  ingredName?: string;
  dietClassification?: "vegan" | "vegetarian" | "animal_product";
  order: number;
  type: "ingredient" | "step" | "sub-recipe";
  stepInstruction?: string;
  supplier?: string;
  instruction?:
    | "10x10"
    | "15x15"
    | "20x20"
    | "Fine"
    | "Ground"
    | "Grate"
    | "Fresh"
    | "Whole"
    | "Brunoise"
    | "Chiffonade"
    | "Chop"
    | "Cube"
    | "Dice"
    | "Julienne/French Cut"
    | "Mince"
    | "Slice"
    | "Rondelle"
    | "Diagonal (Oblique) Cuts"
    | "Batonnet (Chips)"
    | "Jardinière"
    | "Macedoine"
    | null;
  qty?: number;
  unitType?: "liquid" | "weight";
  costPer1000?: number;
  needsPrep?: boolean;
  FQscore?: FQProps;
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
      34: { name: "350g - Container 220594 - 300/350g", cost: 2.37 },
      77: { name: "275g - Container H5001", cost: 1.76 },
    },
    // Only include otherCosts used in this recipe
    otherCosts: {
      23: {
        name: "350g meal extra",
        costs: [
          { name: "Sealing Film", cost: 0.45, id: 730 },
          { name: "Sleeve (2500)", cost: 5.1, id: 730 },
          { name: "Naming Label on Sleeve", cost: 0.1, id: 356 },
          { name: "Outer Box 12's Shaft", cost: 7.25, id: 859 },
          { name: "Outer Box Label", cost: 0.1, id: 529 },
          { name: "Tape", cost: 2.5, id: 529 },
        ],
      },
      46: {
        name: "275g meal extra",
        costs: [
          { name: "Sealing Film", cost: 0.45, id: 730 },
          { name: "Sleeve (2500)", cost: 5, id: 730 },
          { name: "Naming Label on Sleeve", cost: 0.1, id: 356 },
          { name: "Outer Box 12's Shaft", cost: 7.25, id: 859 },
          { name: "Outer Box Label", cost: 0.1, id: 529 },
          { name: "Tape", cost: 2.5, id: 529 },
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
  portions: [275, 350],
  packagingCostsId: { 275: 77, 350: 34 },
  otherCostsId: { 275: 23, 350: 46 },
  markupId: { 275: 7, 350: 9 },
  components: [
    {
      name: "Master - FC Chicken Breast Novation Cooked",
      version: "22_mar_2024_12h34_WK_2",
      id: 666,
      subType: "recipe",
      recipeType: "master",
      recipeId: 666,
      ingredientId: 666,
      portions: { 275: 90, 350: 120 },
      ingredientCosts: { 275: 8.88, 350: 11.84 },
      yield: 0.66,
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
        costPer100g: 43.7,
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        recipeDetail: [
          {
            ingredId: 666,
            ingredName: "Chicken Breast Marination (Novation)",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 65.22235,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Rosemary - Dried Fine",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 88.03,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Thyme Fitchef Seasoning",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 61.89625,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Remove Chicken from bone while warm. Try avoid cartilage or bone",
            qty: 200,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: null,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
        ],
      },
    },
    {
      name: "Master - FC Rosemary Gravy",
      version: "22_mar_2024_12h34_WK_2",
      id: 101235,
      subType: "recipe",
      recipeType: "local",
      recipeId: 986,
      ingredientId: null,
      portions: { 275: 50, 350: 40 },
      ingredientCosts: { 275: 0.97, 350: 1.22 },
      yield: 0.86,
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
        costPer100g: 43.7,
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        recipeDetail: [
          {
            ingredId: 666,
            ingredName: "Sautee onions (light brown)",
            qty: 200,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: null,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Onion - White Fresh Whole",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 9.5,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Water",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0.7,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Add, Simmer and Blend Fine",
            qty: 200,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: null,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Garlic - Fresh Whole",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 160,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Water",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0.7,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Rosemary - Dried Fine",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 88.03,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Oreganum - Dried",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 48.9,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Salt",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 42.93,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Pepper - Black Fine",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 185,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Lemon - Juice",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 30.7692307692308,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Purity W",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 95.82,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Chicken Stock Granules",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 44.35,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Add Cream and remove from heat",
            qty: 200,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: null,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Cream (Dairy) - Fresh",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 57.35,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Milk Low Fat",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 13.38,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
        ],
      },
    },
    {
      name: "Dukkah Roasted Butternut with Feta",
      version: "22_mar_2024_12h34_WK_2",
      id: 666,
      subType: "recipe",
      recipeId: 666,
      recipeType: "local",
      ingredientId: null,
      portions: { 275: 70, 350: 90 },
      ingredientCosts: { 275: 3.01, 350: 3.91 },

      yield: 0.66,
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
        costPer100g: 43.7,
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        recipeDetail: [
          {
            ingredId: 666,
            ingredName: "Spinach ",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 52.2,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Onion",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 12.9,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Mozzarella",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 94,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Feta Low Fat",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 115.71,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Sweet Potato Mash",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 71.1298461850649,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Eggs",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 52.4,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Blended Oats",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 37.1764705882353,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Thyme Fitchef Seasoning",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 61.89625,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Paprika",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 52,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Coconut Oil Spray",
            qty: 200,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 139.1,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
        ],
      },
    },
    {
      name: "Spinach Fritters",
      version: "22_mar_2024_12h34_WK_2",
      id: 666,
      subType: "recipe",
      recipeId: 666,
      recipeType: "local",
      ingredientId: null,
      portions: { 275: 45, 350: 60 },
      ingredientCosts: { 275: 3.01, 350: 4.02 },

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
      recipe: {
        costPer100g: 43.7,
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        recipeDetail: [
          {
            order: 1,
            type: "step",
            stepInstruction: "Do not overcook chicken. Remove Chicken from bone while warm",
          },
          {
            ingredId: 666,
            ingredName: "Chicken Breast Marination (Novation)",
            qty: 50,
            order: 2,
            type: "ingredient",
            instruction: "20x20",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 5.43,
            needsPrep: false,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Rosemary - Dried Fine",
            qty: 100,
            order: 3,
            type: "ingredient",
            instruction: "Fine",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 5.43,
            needsPrep: false,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Thyme Fitchef Seasoning",
            qty: 50,
            order: 4,
            type: "ingredient",
            instruction: null,
            dietClassification: "vegan",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 5.43,
            needsPrep: false,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            order: 5,
            type: "step",
            stepInstruction: "Remove Chicken from bone while warm. Try avoid cartilage or bone",
          },
        ],
      },
    },
    {
      name: "Master - FC Rosemary Gravy",
      version: "22_mar_2024_12h34_WK_2",
      id: 666,
      subType: "ingredient",
      recipeId: null,
      recipeType: "local",
      ingredientId: 66,
      portions: { 275: 20, 350: 30 },
      ingredientCosts: { 275: 0.49, 350: 0.73 },
      yield: 0.66,
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
        costPer100g: 43.7,
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        recipeDetail: [
          {
            order: 1,
            type: "step",
            stepInstruction: "Do not overcook chicken. Remove Chicken from bone while warm",
          },
          {
            ingredId: 666,
            ingredName: "Chicken Breast Marination (Novation)",
            qty: 50,
            order: 2,
            type: "ingredient",
            instruction: "20x20",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 5.43,
            needsPrep: false,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Rosemary - Dried Fine",
            qty: 100,
            order: 3,
            type: "ingredient",
            instruction: "Fine",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 5.43,
            needsPrep: false,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Thyme Fitchef Seasoning",
            qty: 50,
            order: 4,
            type: "ingredient",
            instruction: null,
            dietClassification: "vegan",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 5.43,
            needsPrep: false,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            order: 5,
            type: "step",
            stepInstruction: "Remove Chicken from bone while warm. Try avoid cartilage or bone",
          },
        ],
      },
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
  uiSubRecipeElements: [
    // { name: "Edit Or Production", reactComponent: "<Row_EditOrProduction>" },
    { name: "controls", costsLive: {} },
    { name: "sub_info", costsLive: {} },
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
