// TEMPORARY_ Delete later________START ::
export interface Customer {
  id: number;
  name: string;
  email: string;
  emailVerified: string;
  address: string;
  logo: string;
  active: boolean;
  paymentOptions: [];
  contacts: [];
}

export interface Session {
  id: number;
  sessionToken: string;
  userId: number;
  expires: string;
}

export interface Role {
  id: number;
  userId: number;
  role: number;
}

export interface Ingredients {
  id: number;
  customerId: number;
  isDefault: boolean;
  name: string;
  name_other: string;
}

export interface Suppliers {
  id: number;
  customerId: number;
  name: string;
  vat: string;
  corporationNumber: string;
  logo: string;
  email: string;
  tel: string;
  cell: string;
  whatsapp: string;
  acountEmail: string;
  accountName: string;
  accountTel: string;
}

export interface Allergies {
  id: number;
  customerId: number;
  name: string;
}

export interface Stock {
  id: number;
  stockLocationId: string;
  customerId: number;
  qty: number;
  isActive: boolean;
}

export interface StockMinimum {
  id: number;
  stockId: number;
  stockLocationId: string;
  customerId: number;
  qty: number;
}

export interface StockLocations {
  id: number;
  customerId: number;
  name: string;
}

export interface StockStorageLocations {
  id: number;
  customerId: number;
  name: string;
  address: string;
}

export interface RecipeBackups {
  id: number;
  recipeId: number;
  customerId: number;
  userId: number;
  name: string;
}

export interface RecipeBook {
  id: number;
  customerId: number;
  name: string;
  desc: string;
  image: string;
  price: number;
  url: string;
}
export interface RecipeBookIndex {
  id: number;
  recipebookId: number;
  customerId: number;
  order: number;
  name: string;
}

export interface RecipeBookCollection {
  id: number;
  recipeId: number;
  recipeBookId: number;
  customerId: number;
  name: string;
}

export interface RecipeBookAccess {
  id: number;
  recipeBookId: number;
  customerId: number;
}

export interface Todo {
  id: number;
  userId: number;
  customerId: number;
  status: number;
}

export interface TodoStatuses {
  id: number;
  userId: number;
  customerId: number;
  name: number;
}

export interface TodoDocuments {
  id: number;
  userId: number;
  customerId: number;
  file: string;
}

export interface ConversationThread {
  id: number;
  userId: number;
  customerId: number;
  recipeId: number;
  message: string;
}

export interface ProductionEvents {
  id: number;
  userId: number;
  customerId: number;
  recipeId: number;
  pdf: string;
}

export interface ProductionEventsTasks {
  id: number;
  userId: number;
  customerId: number;
  recipeId: number;
  pdf: string;
}

// TEMPORARY_ Delete later________END ::

export enum EnumLanguage {
  EN = "EN",
  FR = "FR",
  SP = "FR",
}

export enum EnumMarkUpType {
  markup = "markup",
  margin = "margin",
  xcost = "xcost",
}

export enum EnumRecipeType {
  local = "local",
  master = "master",
  unlinked_master = "unlinked_master",
}

export enum EnumDietClassification {
  vegan = "vegan",
  vegetarian = "vegetarian",
  animal_product = "animal_product",
}

export enum EnumComponentIngredientType {
  ingredient = "ingredient",
  step = "step",
  sub = "sub",
}

export enum EnumPrepInstruction {
  none = "none",
  n10x10 = "10x10",
  n15x15 = "15x15",
  n20x20 = "20x20",
  fine = "Fine",
  ground = "Ground",
  grate = "Grate",
  fresh = "Fresh",
  whole = "Whole",
  brunoise = "Brunoise",
  chiffonade = "Chiffonade",
  chop = "Chop",
  cube = "Cube",
  dice = "Dice",
  dietClassification = "Dice",
  julienne = "Julienne/French Cut",
  mince = "Mince",
  slice = "Slice",
  rondelle = "Rondelle",
  diagonal = "Diagonal (Oblique) Cuts",
  batonnet = "Batonnet (Chips)",
  jardiniere = "Jardinière",
  macedoine = "Macedoine",
  other = "Other (See Method)",
}

export enum EnumOilPurpose {
  added = "100%_added",
  thin_coating = "thin_coating",
  shallow_fry = "shallow_fry",
  deep_fry = "deep_fry",
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
  readonly name: string;
  readonly cost: number;
}

export interface OtherCost {
  readonly name: string;
  readonly costs: OtherCostItem[];
}

export interface OtherCostItem {
  readonly id: number;
  readonly name: string;
  readonly cost: number;
}

export interface MarkUp {
  readonly name: string;
  readonly factor: number;
  readonly type: EnumMarkUpType;
}

export interface nutriPer100Props {
  name: string;
  valuePer100: number;
  unit: string;
}

export interface versionsProps {
  id: number;
  datetime: string;
  user: string;
}

export interface ComponentsProps {
  id: number | null;
  name: string;
  type?: EnumComponentIngredientType;
  parentId?: null | number;
  ingredientId?: number | null;
  portions: { [key: number]: number };
  yield?: number;
  nutriPer100?: nutriPer100Props[];
  version?: string;
  versions?: versionsProps[];
  //  TODO: does recipe need to be ? and null
  // recipe?: RecipeProps | null;
  recipe: RecipeProps;
}

export interface Brand {
  id: number;
  name: string;
  logoSrc: string;
}

export interface CustomerType {
  id: number;
  name: string;
  logoSrc: string;
}

export interface RecipeProps {
  id?: number;
  costPer1000: number;
  brand: Brand;
  customer: CustomerType;
  recipeDetail: recipeDetailProps[];
  method: string;
  rationalisedRecipe?: string;
}

export interface recipeDetailProps {
  id?: number;
  ingredId: number;
  ingredName: string;
  dietClassification: EnumDietClassification;
  order: number;
  type: EnumComponentIngredientType;
  stepInstruction: string;
  supplier: string;
  instruction: EnumPrepInstruction;
  qty: number;
  unitType: EnumUnitType;
  costPer1000: number;
  rationalisedRecipe: string;
  FQscore: FQProps;
  needsPrep: boolean;
  isSalt: boolean;
  isSaltInWater: boolean;
  isOil: boolean;
  oilPurpose: EnumOilPurpose;
  subRecipe: ComponentsProps | null;
}

export interface FQProps {
  id?: number;
  // MUSTS BE BETWEEN -1 to 1
  positive: number;
  negative: number;
  neutral: number;
  overall: number;
  positiveTxt: string;
  negativeTxt: string;
  neutralTxt: string;
  overallTxt: string;
}

export interface CostsLiveProps {
  [key: number]: number;
}

/**
 °C = (°F - 32) × 5/9
°F = (°C × 9/5) + 32
 */

export enum EnumUnitType {
  // DEFAULT IS weight. So g/kg & mL/L  & °C
  // TODO: liquid must = litres and mls
  weight = "weight",
  liquid = "liquid",
}
// TODO: add heat and length
export type UnitMasterType = ["g", "kg"] | ["oz", "lbs"];
// DEFAULT IS METRIC
// TODO: liquid must = litres and mls
// TODO: liquid must = litres and mls

export enum EnumMetricOrImperial {
  // DEFAULT IS METRIC
  metric = "metric",
  imperial = "imperial",
}

export interface DataProps {
  recipeName: string;
  recipeDesc: string;
  portions: number[];
  readonly setting: {
    unitMaster: UnitMasterType;
    unitMask: EnumMetricOrImperial;
    // unitType: EnumUnitType;
    vat: number;
    currency: string;
    locale: string;
    language: EnumLanguage;
  };
  readonly costRules: CostRules;
  components: ComponentsProps[];
  packagingCostsId: { [key: number]: number };
  otherCostsId: { [key: number]: number };
  markupId: { [key: number]: number };
}

// TODO: metric vs Imperial
/**
 Metric Units
The metric system is based on units of 10 and is widely used globally. Common units include:

Weight (Mass):
Gram (g): Used for small quantities (e.g., spices, flour).
Kilogram (kg): Used for larger quantities (e.g., meat, vegetables).

Volume:
Milliliter (mL): Used for small liquid quantities (e.g., vanilla extract, water).
Liter (L): Used for larger liquid quantities (e.g., milk, broth).

Length:
Millimeter (mm): Rarely used in food but can describe thickness.
Centimeter (cm): Used for sizing (e.g., cake diameter).

Temperature:
Celsius (°C): Used for cooking and baking temperatures.

Imperial Units

Weight (Mass):
Ounce (oz): 
Pound (lb): 

Volume:
Teaspoon (tsp): Used for small liquid or dry quantities (e.g., salt, vanilla extract).
Tablespoon (tbsp): Used for slightly larger quantities (e.g., oil, sugar).
Fluid Ounce (fl oz): Used for liquid measurements (e.g., milk, juice).
Cup (c): Used for both dry and liquid ingredients (e.g., flour, water).
Pint (pt): Used for larger liquid quantities (e.g., cream, beer).
Quart (qt): Used for even larger quantities (e.g., soup, stock).
Gallon (gal): Used for very large quantities (e.g., milk, water).

Length:
Inch (in): Used for sizing (e.g., pie diameter).

Temperature:
Fahrenheit (°F): Used for cooking and baking temperatures.

 */

export const data: DataProps = {
  recipeName: "My Recipe name that could be very very long",
  recipeDesc: "Thinly sliced beef with a pepper sauce and roasted veg",
  setting: {
    // ALL RECIPES ARE IN g
    // unitType: EnumUnitType,
    unitMaster: ["g", "kg"] /*[["g", "kg"],["oz", "lbs"],] */,
    unitMask: EnumMetricOrImperial.metric,
    vat: 0.15,
    currency: "R",
    locale: "ZAR",
    language: EnumLanguage.EN,
  },
  costRules: {
    // only include Packaging Costs included in the recipe
    packagingCosts: {
      77: { name: "265g - Container H5001", cost: 1.76 },
      34: { name: "350g - Container 220594 - 300/350g", cost: 2.37 },
      1: { name: "500g - Container Test", cost: 4.83 },
      123: { name: "700g - Container Test2", cost: 9.83 },
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
      1: { name: "200%", factor: 2.0, type: EnumMarkUpType.markup },
      2: { name: "175%", factor: 1.75, type: EnumMarkUpType.markup },
      3: { name: "FitChef", factor: 1.5, type: EnumMarkUpType.markup },
      4: { name: "Thyme", factor: 1.4, type: EnumMarkUpType.markup },
      5: { name: "Smoothies", factor: 2.4, type: EnumMarkUpType.markup },
      6: { name: "Snacks", factor: 2.6, type: EnumMarkUpType.markup },
      7: { name: "70% Margin", factor: 0.7, type: EnumMarkUpType.margin },
      8: { name: "2x", factor: 2, type: EnumMarkUpType.xcost },
      9: { name: "2.5x", factor: 2.5, type: EnumMarkUpType.xcost },
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
      versions: [],
      id: 77442,
      type: EnumComponentIngredientType.sub,
      parentId: null,
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
            type: EnumComponentIngredientType.step,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 66.66,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Chicken Breast Marination (Novation)",
            qty: 10000,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 65.22235,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Rosemary - Dried Fine",
            qty: 100,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 88.03,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Thyme Fitchef Seasoning",
            qty: 50,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 61.89625,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Remove Chicken from bone while warm. Try avoid cartilage or bone",
            qty: 0,
            order: 2,
            type: EnumComponentIngredientType.step,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 66.66,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
        ],
      },
    },
    {
      name: "Master - FC Rosemary Gravy",
      version: "22_mar_2024_12h34_WK_2",
      versions: [],
      id: 101235,
      type: EnumComponentIngredientType.sub,
      parentId: null,
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
            type: EnumComponentIngredientType.step,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 66.66,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Onion - White Fresh Whole",
            qty: 0.2,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 9.5,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Water",
            qty: 0.035,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 0.7,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "STEP 2 - Add, Simmer and Blend Fine",
            qty: 0,
            order: 2,
            type: EnumComponentIngredientType.step,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 66.66,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Garlic - Fresh Whole",
            qty: 0.0267073779399365,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 160,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Water",
            qty: 0.356708130019699,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 0.7,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Rosemary - Dried Fine",
            qty: 0.00310347048751908,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 88.03,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Oreganum - Dried",
            qty: 0.00195122395908212,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 48.9,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Salt",
            qty: 0.00662073704004071,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 42.93,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Pepper - Black Fine",
            qty: 0.000827592130005088,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 185,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Lemon - Juice",
            qty: 0.00393106261752417,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 30.7692307692308,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Purity W",
            qty: 0.025,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 95.82,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Chicken Stock Granules",
            qty: 0.0479879142436758,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 44.35,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Add Cream and remove from heat",
            qty: 0,
            order: 2,
            type: EnumComponentIngredientType.step,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 66.66,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Cream (Dairy) - Fresh",
            qty: 0.1,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 57.35,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Milk Low Fat",
            qty: 0.1,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 13.38,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
        ],
      },
    },
    {
      name: "Dukkah Roasted Butternut with Feta",
      version: "22_mar_2024_12h34_WK_2",
      versions: [],
      id: 322,
      type: EnumComponentIngredientType.sub,
      parentId: null,
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
            type: EnumComponentIngredientType.step,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 66.66,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,

            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
            subRecipe: {
              name: "Dukkah Roasted Butternut ",
              version: "2_mar_2024_12h00_WK_2",
              versions: [],
              id: 32,
              type: EnumComponentIngredientType.sub,
              parentId: 3,

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
                costPer1000: 23.5,
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
                    ingredName: "Dukkah Roasted Butternut",
                    qty: 0,
                    order: 2,
                    type: EnumComponentIngredientType.step,
                    instruction: EnumPrepInstruction.dice,
                    dietClassification: EnumDietClassification.animal_product,
                    stepInstruction: "",
                    supplier: "Acme",
                    unitType: EnumUnitType.weight,
                    costPer1000: 66.66,
                    rationalisedRecipe: "",
                    needsPrep: false,
                    isSalt: false,
                    isSaltInWater: false,
                    isOil: false,
                    oilPurpose: EnumOilPurpose.thin_coating,
                    subRecipe: null,
                    FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                  },
                  {
                    ingredId: 666,
                    ingredName: "Butternut ",
                    qty: 1,
                    order: 2,
                    type: EnumComponentIngredientType.ingredient,
                    instruction: EnumPrepInstruction.dice,
                    dietClassification: EnumDietClassification.animal_product,
                    stepInstruction: "",
                    supplier: "Acme",
                    unitType: EnumUnitType.weight,
                    costPer1000: 12.5,
                    rationalisedRecipe: "",
                    needsPrep: false,
                    isSalt: false,
                    isSaltInWater: false,
                    isOil: false,
                    oilPurpose: EnumOilPurpose.thin_coating,
                    subRecipe: null,
                    FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                  },
                  {
                    ingredId: 666,
                    ingredName: "Dukkah Seasoning",
                    qty: 0.06,
                    order: 2,
                    type: EnumComponentIngredientType.sub,
                    instruction: EnumPrepInstruction.dice,
                    dietClassification: EnumDietClassification.animal_product,
                    stepInstruction: "",
                    supplier: "Acme",
                    unitType: EnumUnitType.weight,
                    costPer1000: 271.208375,
                    rationalisedRecipe: "",
                    needsPrep: false,
                    isSalt: false,
                    isSaltInWater: false,
                    isOil: false,
                    oilPurpose: EnumOilPurpose.thin_coating,

                    FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                    subRecipe: {
                      name: "Dukkah Seasoning",
                      version: "2_mar_2024_12h00_WK_2",
                      versions: [],
                      id: 32,
                      type: EnumComponentIngredientType.sub,
                      parentId: 3,

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
                        costPer1000: 23.5,
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
                            ingredName: "Dukkah Spice",
                            qty: 0,
                            order: 2,
                            type: EnumComponentIngredientType.step,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 66.66,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "Hazelnuts",
                            qty: 0.08,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 275.9,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "Almonds",
                            qty: 0.03,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 157.4,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "Sesame Seeds",
                            qty: 0.02,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 68,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "Pistachios",
                            qty: 0.03,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 477.6,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "Fennel Seeds",
                            qty: 0.005,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 39.66,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "Cumin",
                            qty: 0.003,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 158.25,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "Corriander ",
                            qty: 0.003,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 49.02,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "Cayenne Pepper",
                            qty: 0.001,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 48.3,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "Salt",
                            qty: 0.001,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 42.93,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "0",
                            qty: 0.173,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 66.66,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                          {
                            ingredId: 666,
                            ingredName: "0",
                            qty: 0,
                            order: 2,
                            type: EnumComponentIngredientType.ingredient,
                            instruction: EnumPrepInstruction.dice,
                            dietClassification: EnumDietClassification.animal_product,
                            stepInstruction: "",
                            supplier: "Acme",
                            unitType: EnumUnitType.weight,
                            costPer1000: 66.66,
                            rationalisedRecipe: "",
                            needsPrep: false,
                            isSalt: false,
                            isSaltInWater: false,
                            isOil: false,
                            oilPurpose: EnumOilPurpose.thin_coating,
                            subRecipe: null,
                            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                          },
                        ],
                      },
                    },
                  },
                  {
                    ingredId: 666,
                    ingredName: "Coconut Oil Spray",
                    qty: 0.005,
                    order: 2,
                    type: EnumComponentIngredientType.ingredient,
                    instruction: EnumPrepInstruction.dice,
                    dietClassification: EnumDietClassification.animal_product,
                    stepInstruction: "",
                    supplier: "Acme",
                    unitType: EnumUnitType.weight,
                    costPer1000: 139.1,
                    rationalisedRecipe: "",
                    needsPrep: false,
                    isSalt: false,
                    isSaltInWater: false,
                    isOil: false,
                    oilPurpose: EnumOilPurpose.thin_coating,
                    subRecipe: null,
                    FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                  },
                  {
                    ingredId: 666,
                    ingredName: "Honey",
                    qty: 0.1,
                    order: 2,
                    type: EnumComponentIngredientType.ingredient,
                    instruction: EnumPrepInstruction.dice,
                    dietClassification: EnumDietClassification.animal_product,
                    stepInstruction: "",
                    supplier: "Acme",
                    unitType: EnumUnitType.weight,
                    costPer1000: 0.7,
                    rationalisedRecipe: "",
                    needsPrep: false,
                    isSalt: false,
                    isSaltInWater: false,
                    isOil: false,
                    oilPurpose: EnumOilPurpose.thin_coating,
                    subRecipe: null,
                    FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
                  },
                ],
              },
            },
          },
          {
            ingredId: 666,
            ingredName: "Dukkah Roasted Butternut ",
            qty: 2.24,
            order: 2,
            type: EnumComponentIngredientType.sub,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 32.8200027777778,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Feta",
            qty: 0.2,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 115.71,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Pumpkin Seeds",
            qty: 0.05,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 125.9,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Coriander ",
            qty: 0.01,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 145,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
        ],
      },
    },
    {
      name: "Spinach Fritters",
      version: "22_mar_2024_12h34_WK_2",
      versions: [],
      id: 98747,
      type: EnumComponentIngredientType.sub,
      parentId: null,

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
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 52.2,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Onion",
            qty: 0.02,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 12.9,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Mozzarella",
            qty: 0.05,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 94,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Feta Low Fat",
            qty: 0.035,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 115.71,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Sweet Potato Mash",
            qty: 0.15,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 71.1298461850649,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Eggs",
            qty: 0.15,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 52.4,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Blended Oats",
            qty: 0.04,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 37.1764705882353,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Thyme Fitchef Seasoning",
            qty: 0.005,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 61.89625,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Paprika",
            qty: 0.0005,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 52,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Coconut Oil Spray",
            qty: 0.005,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 139.1,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
        ],
      },
    },
    {
      name: "Master - FC Rosemary Gravy",
      version: "22_mar_2024_12h34_WK_2",
      versions: [],
      id: 4619766,
      type: EnumComponentIngredientType.sub,
      parentId: null,

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
            type: EnumComponentIngredientType.step,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 66.66,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Onion - White Fresh Whole",
            qty: 0.2,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 9.5,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Water",
            qty: 0.035,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 0.7,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "STEP 2 - Add, Simmer and Blend Fine",
            qty: 0,
            order: 2,
            type: EnumComponentIngredientType.step,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 66.66,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Garlic - Fresh Whole",
            qty: 0.0267073779399365,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 160,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Water",
            qty: 0.356708130019699,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 0.7,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Rosemary - Dried Fine",
            qty: 0.00310347048751908,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 88.03,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Oreganum - Dried",
            qty: 0.00195122395908212,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 48.9,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Salt",
            qty: 0.00662073704004071,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 42.93,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Pepper - Black Fine",
            qty: 0.000827592130005088,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 185,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Lemon - Juice",
            qty: 0.00393106261752417,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 30.7692307692308,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Purity W",
            qty: 0.025,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 95.82,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Chicken Stock Granules",
            qty: 0.0479879142436758,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 44.35,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Add Cream and remove from heat",
            qty: 0,
            order: 2,
            type: EnumComponentIngredientType.step,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 66.66,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Cream (Dairy) - Fresh",
            qty: 0.1,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 57.35,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
          {
            ingredId: 666,
            ingredName: "Milk Low Fat",
            qty: 0.1,
            order: 2,
            type: EnumComponentIngredientType.ingredient,
            instruction: EnumPrepInstruction.dice,
            dietClassification: EnumDietClassification.animal_product,
            stepInstruction: "",
            supplier: "Acme",
            unitType: EnumUnitType.weight,
            costPer1000: 13.38,
            rationalisedRecipe: "",
            needsPrep: false,
            isSalt: false,
            isSaltInWater: false,
            isOil: false,
            oilPurpose: EnumOilPurpose.thin_coating,
            subRecipe: null,
            FQscore: { positive: 0, negative: 0, neutral: 0, overall: 0, positiveTxt: "", negativeTxt: "", neutralTxt: "", overallTxt: "" },
          },
        ],
      },
    },
  ],
};
