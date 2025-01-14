export interface DataProps {
  portions: number[];
  setting: {
    unitMaster: string[];
    unitMask: string[];
    unitType: string[];
    vat: number;
    currency: string;
    locale: string;
    language: "EN" | "FR" | "SP";
  };
  costRules: CostRules;
  components: ComponentsProps[];
  uiElements?: UIElement[];
  // uiSubRecipeElements: UIElement[];
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

export interface ingredientType {}

export interface ComponentsProps {
  name: string;
  id: number;
  type: "ingredient" | "step" | "sub";
  parentId: null | number;
  recipeId: number | null;
  recipeType: "local" | "master" | "unlinkedMaster";

  ingredientId: number | null;
  portions: { [key: number]: number };
  // ingredientCosts?: { [key: number]: number };
  // ingrßedientCostPer1000: { [key: number]: number };
  yield: number;
  nutriPer100: nutriPer100Props[];
  version: string;
  recipe?: RecipeProps;
}

export interface RecipeProps {
  costPer1000: number;
  brand: {};
  customer: {};
  recipeDetail: recipeDetailProps[];
  method: string;
  // brand: { name: "fitchef", id: 3452, logoSrc: "" },
  // customer: { name: "emperors", id: 8667, logoSrc: "" },
  // recipeDetail: [
}

export interface recipeDetailProps {
  ingredId: number;
  ingredName?: string;
  dietClassification?: "vegan" | "vegetarian" | "animal_product";
  order: number;
  type: "ingredient" | "step" | "sub-recipe";
  stepInstruction?: string;
  supplier?: string;
  instruction?:
    | ""
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
    | "Other"
    | null;
  qty?: number;
  unitType?: "liquid" | "weight";
  costPer1000?: number;
  FQscore?: FQProps;
  needsPrep: boolean;
  isSalt: boolean;
  isSaltInWater: boolean;
  isOil: boolean;
  oilPurpose: ["100%_added", "thin_coating", "shallow_fry", "deep_fry"];
}

export interface FQProps {
  // MUSTS BE BETWEEN -1 to 1
  positive: number;
  negative: number;
  neutral: number;
  overall: number;
}

export interface CostsLiveProps {
  [key: number]: number;
}

export interface UIElement {
  name: string;
  costsLive: CostsLiveProps;

  // controls;
  // quantity;
  // plating;
  // plating_list;
  // ingredient_cost;
  // packaging_cost;
  // other_cost;
  // costs_sub_total;
  // markup;
  // sale_price_(ex_vat);
  // sale_price_(incl_vat);
  // print;
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
    language: "EN",
  },
  costRules: {
    // only include Packaging Costs included in the recipe
    packagingCosts: {
      34: { name: "350g - Container 220594 - 300/350g", cost: 2.37 },
      77: { name: "265g - Container H5001", cost: 1.76 },
    },
    // Only include otherCosts used in this recipe
    otherCosts: {
      23: {
        name: "350g meal extra",
        costs: [
          { name: "Sealing Film", cost: 0.45, id: 730 },
          { name: "Sleeve (350)", cost: 5.1, id: 730 },
          { name: "Naming Label on Sleeve", cost: 0.1, id: 356 },
          { name: "Outer Box 12's Shaft", cost: 8.25, id: 859 },
          { name: "Outer Box Label", cost: 0.1, id: 529 },
          { name: "Tape", cost: 3.1, id: 529 },
        ],
      },
      46: {
        name: "265g meal extra",
        costs: [
          { name: " Film", cost: 0.45, id: 730 },
          { name: "Sleeve (2500)", cost: 2.7, id: 430 },
          { name: "Naming Label on Sleeve", cost: 0.2, id: 356 },
          { name: "Outer Box 12's Shaft", cost: 6.25, id: 859 },
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
  portions: [265, 350],
  packagingCostsId: { 265: 77, 350: 34 },
  otherCostsId: { 265: 23, 350: 46 },
  markupId: { 265: 7, 350: 9 },
  components: [
    {
      name: "Master - FC Chicken Breast Novation Cooked",
      version: "22_mar_2024_12h34_WK_2",
      id: 77442,
      type: "sub",
      recipeType: "master",
      recipeId: 666,
      ingredientId: 666,
      portions: { 265: 90, 350: 120 },
      // ingredientCosts: { 265: 8.88, 350: 11.84 },
      yield: 0.71,
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
        costPer1000: 43.7,
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        method: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industrys standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with`,
        recipeDetail: [
          {
            ingredId: 666,
            ingredName: "Do not overcook chicken. Remove Chicken from bone while warm",
            qty: 0,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Chicken Breast Marination (Novation)",
            qty: 10000,
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
            qty: 100,
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
            qty: 50,
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
            qty: 0,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0,
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
      type: "sub",
      recipeType: "local",
      recipeId: 986,
      ingredientId: null,
      portions: { 265: 40, 350: 50 },
      // ingredientCosts: { 265: 0.97, 350: 1.22 },
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
        costPer1000: 43.7,
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        method: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industrys standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with`,
        recipeDetail: [
          {
            ingredId: 666,
            ingredName: "Sautee onions (light brown)",
            qty: 0,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Onion - White Fresh Whole",
            qty: 0.2,
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
            qty: 0.035,
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
            ingredName: "STEP 2 - Add, Simmer and Blend Fine",
            qty: 0,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Garlic - Fresh Whole",
            qty: 0.0267073779399365,
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
            qty: 0.356708130019699,
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
            qty: 0.00310347048751908,
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
            qty: 0.00195122395908212,
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
            qty: 0.00662073704004071,
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
            qty: 0.000827592130005088,
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
            qty: 0.00393106261752417,
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
            qty: 0.025,
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
            qty: 0.0479879142436758,
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
            qty: 0,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Cream (Dairy) - Fresh",
            qty: 0.1,
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
            qty: 0.1,
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
      id: 322,
      type: "sub",
      recipeId: 666,
      recipeType: "local",
      ingredientId: null,
      portions: { 265: 70, 350: 90 },
      // ingredientCosts: { 265: 3.01, 350: 3.91 },

      yield: 1,
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
        costPer1000: 43.7,
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        method: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industrys standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with`,
        recipeDetail: [
          {
            ingredId: 666,
            ingredName: " Dukkah Roasted Butternut with Feta",
            qty: 0,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Dukkah Roasted Butternut ",
            qty: 2.24,
            order: 2,
            type: "sub-recipe",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 32.8200027777778,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Feta",
            qty: 0.2,
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
            ingredName: "Pumpkin Seeds",
            qty: 0.05,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 125.9,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Coriander ",
            qty: 0.01,
            order: 2,
            type: "ingredient",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 145,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
        ],
      },
    },
    {
      name: "Spinach Fritters",
      version: "22_mar_2024_12h34_WK_2",
      id: 98747,
      type: "sub",
      recipeId: 666,
      recipeType: "local",
      ingredientId: null,
      portions: { 265: 45, 350: 60 },
      // ingredientCosts: { 265: 3.01, 350: 4.02 },

      yield: 0.89,
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
        costPer1000: 43.7,
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        method: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industrys standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with`,
        recipeDetail: [
          {
            ingredId: 666,
            ingredName: "Spinach ",
            qty: 0.45,
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
            qty: 0.02,
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
            qty: 0.05,
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
            qty: 0.035,
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
            qty: 0.15,
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
            qty: 0.15,
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
            qty: 0.04,
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
            qty: 0.005,
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
            qty: 0.0005,
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
            qty: 0.005,
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
      name: "Master - FC Rosemary Gravy",
      version: "22_mar_2024_12h34_WK_2",
      id: 4619766,
      type: "sub",
      recipeId: null,
      recipeType: "local",
      ingredientId: 66,
      portions: { 265: 20, 350: 30 },
      // ingredientCosts: { 265: 0.49, 350: 0.73 },
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
        costPer1000: 43.7,
        brand: { name: "fitchef", id: 3452, logoSrc: "" },
        customer: { name: "emperors", id: 8667, logoSrc: "" },
        method: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industrys standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with`,
        recipeDetail: [
          {
            ingredId: 666,
            ingredName: "Sautee onions (light brown)",
            qty: 0,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Onion - White Fresh Whole",
            qty: 0.2,
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
            qty: 0.035,
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
            ingredName: "STEP 2 - Add, Simmer and Blend Fine",
            qty: 0,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Garlic - Fresh Whole",
            qty: 0.0267073779399365,
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
            qty: 0.356708130019699,
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
            qty: 0.00310347048751908,
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
            qty: 0.00195122395908212,
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
            qty: 0.00662073704004071,
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
            qty: 0.000827592130005088,
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
            qty: 0.00393106261752417,
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
            qty: 0.025,
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
            qty: 0.0479879142436758,
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
            qty: 0,
            order: 2,
            type: "step",
            instruction: "Dice",
            dietClassification: "animal_product",
            stepInstruction: "",
            supplier: "Acme",
            unitType: "weight",
            costPer1000: 0,
            needsPrep: true,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0 },
          },
          {
            ingredId: 666,
            ingredName: "Cream (Dairy) - Fresh",
            qty: 0.1,
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
            qty: 0.1,
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
  ],
  // uiElements: [
  //   { name: "controls", costsLive: {} },
  //   { name: "plating", costsLive: {} },
  //   { name: "plating_list", costsLive: {} },
  //   { name: "ingredient_cost", costsLive: {} },
  //   { name: "packaging_cost", costsLive: {} },
  //   { name: "other_cost", costsLive: {} },
  //   { name: "costs_sub_total", costsLive: {} },
  //   { name: "markup", costsLive: {} },
  //   { name: "sale_price_(ex_vat)", costsLive: {} },
  //   { name: "sale_price_(incl_vat)", costsLive: {} },
  //   { name: "print", costsLive: {} },
  //   { name: "method", costsLive: {} },
  // ],
};
