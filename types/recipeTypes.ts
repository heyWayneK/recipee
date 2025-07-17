import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import React from "react";

// TODO: NOT SURE IF THIS IS NEEDED
// const prismaExtended = new PrismaClient().$extends({
//   result: {
//     markup: {
//       factor: {
//         // We need the original 'factor' field to compute the new one.
//         needs: { factor: true },
//         compute(markup) {
//           // Convert the decimal to a string.
//           return markup.factor.toString();
//         },
//       },
//     },
//   },
// });

export type AllergySelect = Prisma.allergyGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    translation: true;
  };
}>;

export interface Brand {
  id: number;
  name: string;
  logoSrc: string;
}

export interface ComponentsProps {
  uuid: string;
  recipeId: string;
  order: number;
  name?: string;
  type?: "ingredient" | "step" | "sub";
  ingredientId?: number | null;
  // parentId?: null | number;
  portions: PortionSizeChildProps[];
  yield?: number;
  nutriPer100?: nutriPer100Props[];
  version?: string;
  versions?: versionsProps[];
}

export type CookedYieldsCategoriesSelect = Prisma.cooked_yields_categoriesGetPayload<{
  select: {
    id: true;
    name: true;
    translation: true;
    desc: true;
    yield: true;
    is_live?: boolean;
  };
}>;

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
  vatRules: {
    [key: number]: { name: string; factor: number; isDefault: boolean };
  };
}

export interface CostsLiveProps {
  [key: number]: number;
}

export interface CustomerType {
  id: number;
  name: string;
  logoSrc: string;
}

export interface RecipeDataProps {
  readonly recipeUUID: string;
  recipeName: string;
  recipeDesc: string;

  portions: portionSizeProps[];
  packagingCostsId: { [key: number]: number };
  otherCostsId: { [key: number]: number };
  markupId: { [key: number]: number };
  vatRulesId: { pid: number; rule: number }[];
  components: ComponentsProps[];
  recipes: RecipeProps[];
}

export type DietaryClassificationSelect = Prisma.dietary_classificationGetPayload<{
  select: {
    id: true;
    name: true;
    translation: true;
  };
}>;

export type DryCookedYieldsCategoriesSelect = Prisma.dry_cooked_yields_categoriesGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    translation: true;
    yield: true;
  };
}>;

export type DryCookedYieldsSelect = Prisma.dry_cooked_yieldsGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    translation: true;
    yield: true;
  };
}>;

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

export type IngredientCategoryPrimarySelect = Prisma.ingredient_category_primaryGetPayload<{
  select: {
    id: true;
    name: true;
    translation: true;
  };
}>;

export type IngredientCategorySecondarySelect = Prisma.ingredient_category_secondaryGetPayload<{
  select: {
    id: true;
    name: true;
    translation: true;
    ingredient_category_primary_id: true;
  };
}>;

export type IngredientSelect = Prisma.ingredientsGetPayload<{
  select: {
    id: true;
    name: true;
    names_alt: true;
    name_orig: true;
    customer_id: true;
    translation: true;
    primary_category_id: true;
    secondary_category: true;
    updated_at: true;
    is_default: boolean;
    confidence: true;
    dietary_classification_id: true;
    kosher_id: true;
    halal_id: true;
    ai_model: true;
  };
}>;

export type IngredientTypeSelect = Prisma.ingredient_typeGetPayload<{
  select: {
    id: true;
    name: true;
    // desc: true;
  };
}>;

export type IngredientsReligiousCertificationSelect = Prisma.ingredients_religious_certificationGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export type LanguageSelect = Prisma.languageGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export type localOrDbDataTypeOptions = "localStorage" | "database" | undefined;
export type localOrDbDataType = {
  system: localOrDbDataTypeOptions;
  systemUpdated: Date | undefined;
  recipe: localOrDbDataTypeOptions;
  recipeUpdated: Date | undefined;
};

export interface MarkUp {
  readonly name: string;
  readonly factor: number;
  readonly type: "markup" | "margin" | "xcost";
}

// DECIMAL FIELD: factor _____________START ::
export type MarkupSelect = Prisma.markupGetPayload<{
  select: {
    id: true;
    name: true;
    customer_id: true;
    desc: true;
    markup_type_id: true;
    factor: true;
    markup_type: { select: { id: true; name: true; desc: true } };
  };
}>;
export type MarkupSelectSerializable = Omit<MarkupSelect, "factor"> & {
  factor: string;
};

// DECIMAL FIELD: factor _____________END ::

export type MarkupTypeSelect = Prisma.markup_typeGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
  };
}>;

export interface nutriPer100Props {
  name: string;
  valuePer100: number;
  unit: string;
}

// // export type NutritionalDataValuesSelect = Prisma.ingredients_nutritionGetPayload<
export type NutritionalDataValuesSelect = { column_name: string };

export type OilPurposeSelect = Prisma.oil_purposeGetPayload<{
  select: {
    id: true;
    name: true;
    factor: true;
    desc: true;
    is_default: true;
    confidence: true;
  };
}>;

export interface OtherCost {
  readonly name: string;
  readonly costs: OtherCostItem[];
}

export interface OtherCostItem {
  readonly id: number;
  readonly name: string;
  readonly cost: number;
}

export type OtherCostsCategorySelect = Prisma.other_costs_categoryGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export type OtherCostsLineItemsLookupSelect = Prisma.other_costs_line_itemGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    supplier_id: true;
    cost: true;
    is_active: true;
    customer_id: true;
    category_ids: true;
  };
}>;

export type OrgTypeSelect = Prisma.orgGetPayload<{
  select: {
    id: true;
    user_id: true;
    username: true;
    emails: true;
    phone_numbers: true;
    organisations: true;
    avatar_url: true;
    roles: true;
    first_name: true;
    last_name: true;
    last_sign_in_at: true;
    json: true;
    unit_metric_imperial_id: true;
    vat_number: true;
    country_locale: {
      select: {
        id: true;
        country_code: true;
        country_name: true;
        currency_code: true;
        currency_name: true;
        currency_symbol: true;
        language_code: true;
        locale: true;
        date_format: true;
        decimal_separator: true;
        time_zone: true;
      };
    };
    country_locale_id: true;
  };
}>;

export interface PackagingCost {
  readonly name: string;
  readonly cost: number;
}

export type PackagingCostsCategorySelect = Prisma.packaging_costs_categoryGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export interface PackagingCostsLineItemsLookup {
  id: number;
  name: string;
  desc: string;
  supplier_id: number;
  cost: number;
  is_active: boolean;
  customer_id: number;
  category_ids: number[]; // Adjust type based on your schema (e.g., array of numbers or strings)
}

// export type PackagingCostsLineItemsLookupSelect = Prisma.packaging_costs_line_itemGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//     supplier_id: true;
//     cost: true;
//     is_active: true;
//     customer_id: true;
//     category_ids: true;
//   };
// }>;
export interface PackagingCostsLineItemsLookupSelect {
  id: number;
  name: string;
  desc: string;
  supplier_id: number;
  cost: number;
  is_active: boolean;
  customer_id: number;
  category_ids: number[];
}

export type PortionSizeChildProps = Omit<portionSizeProps, "order">;

export interface portionSizeProps {
  id: number;
  qty: number;
  order: number;
}

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
  markUpPriceRuleName: string[]; // Decimals
  salePricesExVat: number[]; // Decimals
  salesPricesIncVat: number[]; // Decimals
  vatRuleIds: number[]; // Decimals
  vatRulePercs: number[]; // Decimals
  vatRuleNames: string[]; // Decimals
  data: RecipeDataProps;
}

export type PrepInstructionsSelect = Prisma.prep_instructionsGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    imperial: true;
    metric: true;
    translation: true;
    yield: true;
  };
}>;

// DEFINE context shape
export interface RecipeDataContextType {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  recipeMode: RecipeModeType;
  setRecipeMode: React.Dispatch<React.SetStateAction<RecipeModeType>>;
  recipeData: PreCalculatedRecipeData;
  updateRecipeData: (newData: Partial<PreCalculatedRecipeData>) => void;
  systemData: SystemDataProps;
  localOrDbData: localOrDbDataType;
}

export interface recipeDetailProps {
  uuid: string;
  ingredId: number | null;
  ingredName: string | null;
  subRecipeId: string | null;
  dietClassification: "animal_product" | "vegan" | "vegetarian";
  order: number;
  type: "ingredient" | "step" | "sub";
  stepInstruction: string;
  supplier: string;
  instruction: string;
  // Professional Mode
  qty: number; // g kg ml l oz lb fl oz
  qty_estimated_from_home: number | null; // g kg ml l oz lb fl oz
  qty_estimated_confidence: number | null; // from Ai confidence 0.0 - 1.0
  // Low confidence (<0.8) means we need to ask the user to confirm
  // Home Mode
  // e.g. 1 1/2 Cup "Ingredient Name"
  // Calc = home_qty  home_qty_frac_numerator/home_qty_frac_denominator  home_qty_type  ""
  home_qty_frac_numerator: number | null;
  home_qty_frac_denominator: number | null;
  home_qty: number | null;
  home_qty_type: string | null; // "sprig|number|spoons|cups|";
  // Unit Type:
  // weight (g kg oz lb), fluid (mL L fl oz) or each (ea for eggs)
  unitType: "weight";

  costPer1000: number;
  rationalisedRecipe: string;
  FQscore: FQProps;
  needsPrep: boolean;
  isSalt: boolean;
  isSaltInWater: boolean;
  isOil: boolean;
  oilPurpose: "added" | "thin_coating" | "shallow_fry" | "deep_fry";
}

export type RecipeModeSelect = Prisma.recipe_modeGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
  };
}>;

export type RecipeModeType = "home" | "pro";

export interface RecipeProps {
  uuid: string;
  name: string;
  costPer1000: number;
  brand: Brand;
  customer: CustomerType;
  recipeDetail: recipeDetailProps[];
  method: string;
  rationalisedRecipe?: string;
}

export type RecipeTypeSelect = Prisma.recipe_typeGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    is_default: true;
  };
}>;

export type SaltPurposeSelect = Prisma.salt_purposeGetPayload<{
  select: {
    id: true;
    name: true;
    factor: true;
    desc: true;
    is_default: true;
    confidence: true;
  };
}>;

export interface SystemDataProps {
  unit_type: UnitTypeSelect[];
  unit_metric_imperial: UnitMetricImperialSelect[];
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
  org: OrgTypeSelect;
}

export type TodoStatusSelect = Prisma.todo_statusGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export type UnitMetricImperialSelect = Prisma.unit_metric_imperialGetPayload<{
  select: {
    id: true;
    name: true;
    is_default: true;
  };
}>;

export type UnitTypeSelect = Prisma.unit_typeGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
    imperial: true;
    metric: true;
  };
}>;

export interface UserDataProps {
  // USER VALUES BELOW (to overwrite System Data {...vals, ... userVals})
  // OVERWRITE OR ADD TO THE SYSTEM DATA
  other_costs_category: OtherCostsCategorySelect[];
  other_costs_line_items_lookup: OtherCostsLineItemsLookupSelect[];
  packaging_costs_category: PackagingCostsCategorySelect[];
  packaging_costs_line_items_lookup: PackagingCostsLineItemsLookupSelect[];
  vat_rules: VatRulesSelect[];
}

export type VatRulesSelect = Prisma.vat_rulesGetPayload<{
  select: {
    id: true;
    name: true;
    cost: true;
    description: true;
    customer_id: true;
    default: true;
  };
}>;

export interface versionsProps {
  id: number;
  datetime: string;
  user: string;
}
