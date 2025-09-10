import { Prisma, enum_macro_micro_indent, enum_macro_micro_primary_category, enum_macro_micro_unit } from "@prisma/client";
import Decimal from "decimal.js";
import { Recipe_detail_rowPosts } from "./recipeTypes_prisma";
export interface PreCalculatedRecipeData {
  // CORRECT SHAPE 27 Aug 2025
  isHome: boolean;
  isImperial: boolean; // true = imperial, false = metric
  componentsIDArray: string[];
  componentsNamesArray: string[];
  componentsPricePer1000g: Decimal[];
  componentsPrices: Decimal[][];
  componentsPricesDesc: string[][][];
  componentsSubTotalsPrices: Decimal[];
  componentsWeights: Decimal[][];
  costsSubTotals: Decimal[];
  markUpPriceAmounts: Decimal[];
  markUpPriceRuleName: string[];
  markUpPriceRules: number[];
  measurementUnitsObj: measurementUnitsObjProps; // e.g. [g, kg,] [ml, l] [oz, lb,]
  otherCostsPriceRules: number[];
  otherCostsPriceTotals: Decimal[];
  packingCostPriceRules: number[];
  packingCostPriceTotals: Decimal[];
  portionIds: number[];
  portionSizes: Decimal[];
  salePricesExVat: Decimal[];
  salesPricesIncVat: Decimal[];
  vatRuleIds: number[];
  vatRuleNames: string[];
  vatRulePercs: Decimal[];
  data: DataProps;
  currencySymbol: string; // e.g. $, €, £
}

// The shape of Recipe data after conversion from JSON to correct types
export interface DataProps {
  // CORRECT SHAPE 27 Aug 2025???? not
  readonly uuid: string;
  name: string;
  desc: string;
  yield?: Decimal | null;
  // is_live: boolean;
  // org_uuid: string;
  // brand_uuid: number;
  // recipe_type_name: "master" | "sub" | "component";
  // recipe_mode_name: "pro" | "home";
  // created_at: Date;
  // updated_at: Date;

  portions: portionSizeProps[];
  packagingCostsId: recipeDataRuleProps;
  otherCostsId: recipeDataRuleProps;
  markupId: recipeDataRuleProps;
  vatRulesId: recipeDataRuleProps;
  // components: ComponentsInDataProps[];
  recipes: RecipesInDataProps[];
}
export interface JsonDataProps {
  // CORRECT SHAPE 27 Aug 2025???? not
  readonly uuid: string;
  name: string;
  desc: string;

  is_live: boolean;
  org_uuid: string;
  brand_uuid: string | number | null;
  recipe_type_name: string | "master" | "sub" | "component";
  recipe_mode_name: string | "pro" | "home";
  created_at: Date;
  updated_at: Date;

  // I am lazily using :  {} | type[] because json data from db is a slighly different shape from processed content
  recipe_portions: any;
  packaging_costs_on_recipe: any;
  other_costs_on_recipe: any;
  markup_on_recipe: any;
  vat_on_recipe: any;
  recipe_components_on_recipe: any;
}

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

// export type ComponentsProps2 = Prisma.recipe_detail_rowSelect;
// export type ComponentsProps = Prisma.recipe_detail_rowInclude;

// INFO: What We Expect from JSON from DB
export interface ComponentsInDataProps {
  name: string;
  uuid: string;
  // recipe_id: string;
  order: number;
  version?: string;
  versions: string[];
  // type?: recipe_row_types;
  // TODO: need proper Ingredient relation
  ingredient_id?: number | null;
  // parentId?: null | number;
  portions: portionSizeProps[];
  yield?: Decimal | null; // Yield can be null if not applicable
  nutri_per_100g?: nutriPer100Props[];
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

export type recipeDataRuleProps = { pid: number; rule: number }[];

// Partial<Prisma.recipeSelect>
// The Recipe Data shape from the db

// What is the id of a db table called id or uuid?
export type idColnameType = "id" | "uuid";

export interface editInfoProps {
  // Keep a Giraffe Case
  uiName: string;
  name: string;
  id: string;
  idColName: idColnameType;
}

// export interface RecipeDataApiProps {
//   readonly uuid: string;
//   isHome: boolean;
//   isImperial: boolean; // true = imperial, false = metric
//   componentsIDArray: string[];
//   componentsNamesArray: string[];
//   componentsPricePer1000g: Decimal[];
//   componentsPrices: Decimal[][];
//   componentsPricesDesc: string[][][];
//   componentsSubTotalsPrices: Decimal[];
//   componentsWeights: Decimal[][];
//   costsSubTotals: Decimal[];
//   markUpPriceAmounts: Decimal[];
//   markUpPriceRuleName: string[];
//   markUpPriceRules: number[];
//   measurementUnitsObj: measurementUnitsObjProps; // e.g. [g, kg,] [ml, l] [oz, lb,]
//   otherCostsPriceRules: number[];
//   otherCostsPriceTotals: Decimal[];
//   packingCostPriceRules: number[];
//   packingCostPriceTotals: Decimal[];
//   portionIds: number[];
//   portionSizes: Decimal[];
//   salePricesExVat: Decimal[];
//   salesPricesIncVat: Decimal[];
//   vatRuleIds: number[];
//   vatRuleNames: string[];
//   vatRulePercs: Decimal[];
//   data: DataProps; //{}; // Prisma.recipeSelect
//   currencySymbol: string; // e.g. $, €, £
// }

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
    org_uuid: true;
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
    org_uuid: true;
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
  value_per_100g: number;
  unit: string;
}

export type NutritionalDataSelect = Prisma.ingredients_nutritionGetPayload<{
  select: {
    id: true;
    name: true;
    unit: true;
    translation: true;
    is_default: true;
    confidence: true;
  };
}>;

// export type NutritionalDataValuesSelect = { column_name: string };
export type MacroMicroSelect2 = {
  select: {
    id: true;
    name: true;
    full_name: true;
    primary_category: enum_macro_micro_primary_category;
    unit: enum_macro_micro_unit;
    indent: enum_macro_micro_indent;
    secondary_category: true;
    short_name: true;
    order: true;
  };
};

/* */
// INFO: These have been moved to into the Prisma schema as enums
// export const enum_macro_micro_units {
//   g: "g";
//   mg: "mg";
//   µg: "µg";
// };

// enum enum_macro_micro_primary_category {
//   "macro",
//   "micro",
// }

// enum enum_macro_micro_indent {
//   null,
//   "parent",
//   "child",
// }

export type MacroMicroSelect = Prisma.macro_microGetPayload<{
  select: {
    id: true;
    name: true;
    full_name: true;
    // primary_category: enum_macro_micro_primary_category;
    // unit: enum_macro_micro_unit;
    // indent: enum_macro_micro_indent;
    primary_category: true;
    unit: true;
    indent: true;
    secondary_category: true;
    short_name: true;
    order: true;
  };
}>;

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
    org_uuid: true;
    category_ids: true;
  };
}>;

export type OrgTypeSelect = Prisma.orgGetPayload<{
  select: {
    uuid: true;
    username: true;
    emails: true;
    phone_numbers: true;
    last_sign_in_at: true;
    json: true;
    unit_metric_imperial_name: true; // 1 = metric, 2 = imperial
    vat_number: true;
    country_locale_id: true;
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

// export interface PackagingCostsLineItemsLookup {
//   id: number;
//   name: string;
//   desc: string;
//   supplier_id: number;
//   cost: number;
//   is_active: boolean;
//   org_uuid: number;
//   category_ids: string; // Could be "3" pr "3,4,5,"
// }
export interface LineItemsLookup {
  id: number;
  name: string;
  desc: string;
  supplier_id: number | null; // supplier_id can be null
  cost: number | Decimal;
  is_active: boolean;
  org_uuid: string;
  category_ids: string; // Could be "3" pr "3,4,5,"
}

// export type PackagingCostsLineItemsLookupSelect = Prisma.packaging_costs_line_itemGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     desc: true;
//     supplier_id: true;
//     cost: true;
//     is_active: true;
//     org_uuid: true;
//     category_ids: true;
//   };
// }>;
// export interface PackagingCostsLineItemsLookupSelect {
//   id: number;
//   name: string;
//   desc: string;
//   supplier_id: number;
//   cost: number;
//   is_active: boolean;
//   org_uuid: number;
//   category_ids: string; // Could be "3" pr "3,4,5,"
// }

export interface portionSizeProps {
  id: number;
  portion_g: Decimal | number;
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

// // DEFINE context shape
// export interface RecipeDataContextType {
//   qty: number;
//   setQty: React.Dispatch<React.SetStateAction<number>>;
//   recipeMode: RecipeModeType;
//   setRecipeMode: React.Dispatch<React.SetStateAction<RecipeModeType>>;
//   recipeData: PreCalculatedRecipeData;
//   setRecipeDataByPath: (path: string, value: any, recipeData: PreCalculatedRecipeData) => any; // e.g. setRecipeDataByPath("data.packagingCostsId", { ...newObj });
//   getRecipeDataByPath: (path: string, recipeData: PreCalculatedRecipeData) => any; // e.g. getRecipeDataByPath("data.packagingCostsId");
//   systemData: SystemDataProps;
//   localOrDbData: localOrDbDataType;
// }

// IMPORTANT: These are manually set. They are NOT from the DB.
// May have tp update them
export type ingredient_type = "ingredient" | "step" | "sub";

export type recipe_type = "local" | "master" | "unlinked_master";

export type unit_type = "weight" | "fluid" | "each";

export type unit_metric_imperial_type = "metric" | "imperial";

export type prep_instruction_type =
  | "none"
  | "10x10mm"
  | "15x15mm"
  | "20x20mm"
  | "fine"
  | "ground"
  | "ground - fine"
  | "ground - medium"
  | "ground - coarse"
  | "grate"
  | "grate - large"
  | "grate - medium"
  | "grate - fine"
  | "fresh"
  | "whole"
  | "brunoise"
  | "chiffonade"
  | "chop"
  | "chopped fine"
  | "chopped rough"
  | "cube"
  | "dice"
  | "julienne/french-cut"
  | "mince"
  | "slice"
  | "rondelle"
  | "diagonal"
  | "batonnet"
  | "jardiniere"
  | "macedoine"
  | "other";

export type cooked_yields_category_type = "Roasting & Baking" | "Grilling & Broiling" | "Frying" | "Sautéing & Stir-Frying" | "Boiling & Simmering" | "Steaming" | "Combination Cooking" | "Sous Vide"; // & "Custom"

export type dry_cooked_yields_category_type =
  | "Unknown\n"
  | "Pasta"
  | "Rice"
  | "Cereals, Pseudocereals"
  | "Grains"
  | "Barley (pearled)"
  | "Farro Grain"
  | "Oats"
  | "Egg Noodles"
  | "Rice Noodles"
  | "Lentils"
  | "Polenta"
  | "Semolina-- ? Flours"
  | "Chickpeas"
  | "Beans";

export type dry_cooked_yield_type =
  | "Short Pasta (Penne, Fusilli, Macaroni)"
  | "Long pasta (spaghetti, fettuccine)"
  | "Whole Wheat Pasta"
  | "Fresh Pasta (Egg Based)"
  | "Fresh Semolina Pasta"
  | "White Rice"
  | "Brown Rice"
  | "Wild Rice"
  | "Quinoa"
  | "Bulgur Wheat"
  | "Couscous"
  | "Farro Grain"
  | "Gnocchi"
  | "Oats (rolled)"
  | "Oats (steel-cut)"
  | "Couscous";

// 0: "no", 1: "yes", 2: "unlikely", 3: "likely", 4: "unknown"
export type ingredients_religious_certification_type = "no" | "yes" | "unlikely" | "likely" | "unknown";

export type language = "English (UK)" | "English (US)" | "German" | "Italian" | "Dutch" | "Portuguese" | "French" | "Spanish";

export type dietary_classification_type = "animal_product" | "vegan" | "vegetarian";

export type oil_purpose_type = "added" | "thin_coating" | "shallow_fry" | "deep_fry";

export type raw_to_prepped_yield_type = "whole" | "peeled" | "peeled_and_cored" | "diced" | "sliced" | "grated";

export type cooked_yields_type = "raw" | "cooked" | "deep_fry" | "shallow_fry" | "boiled" | "roasted";

// export interface RecipeDetailProps {
//   uuid: number | string;
//   name_extra_info: string | null;
//   sub_recipe_id: string | null;
//   diet_classification: dietary_classification_type;
//   order: number;
//   // type: recipe_row_types_type;
//   type: string;
//   ingredient_type: recipe_row_types_type;
//   step_instruction: string;
//   supplier: string;

//   // Professional Mode
//   qty_g: Decimal; // g
//   qty_estimated_from_home_g: number | null; // g kg ml l oz lb fl oz
//   qty_estimated_confidence: number | null; // from Ai confidence 0.0 - 1.0
//   // Low confidence (<0.8) means we need to ask the user to confirm
//   // Home Mode
//   // e.g. 1 1/2 Cup "Ingredient Name"
//   // Calc = home_qty  home_qty_frac_numerator/home_qty_frac_denominator  home_qty_type  ""
//   home_qty_frac_numerator: number | null;
//   home_qty_frac_denominator: number | null;
//   home_qty: number | null;
//   home_qty_type: string | null; // "sprig|number|spoons|cups|";
//   // Unit Type:
//   // weight (g kg oz lb), fluid (mL L fl oz) or each (ea for eggs)
//   unit_type: unit_type;

//   cost_per_1000g: Decimal;
//   rationalised_recipe: string;
//   fq_score: FQProps;
//   needs_prep: boolean;
//   is_salt: boolean;
//   // is_saltInWater: boolean;
//   is_oil: boolean;
//   oil_purpose: oil_purpose_type;

//   ingred_name: true;
//   ingredient: {
//     id: number;
//     name: string;
//     name_orig: string;
//     names_alt: string;
//     org_uuid: string;
//     is_default: boolean;
//     translation: string;
//     secondary_category: string;
//     unit_type_id: number;
//     dietary_classification_id: true;
//     kosher_id: true;
//     halal_id: true;
//     confidence: true;
//     is_oil: true;
//     is_salt: true;
//     allergy_custom: true;
//     ai_model: true;
//     allergyId: true;
//     deleted: true;
//     created_at: true;
//     updated_at: true;

//     recipe_uuid: string;
//     recipe_components_on_recipeUuid: string;

//     ingredients_id: number | null;
//     home_qty_type_name: string | null;
//     salt_purpose_id: number | null;
//     oil_purpose_id: number | null;
//     sort_order: number | null;
//     raw_to_prepped_yield_custom_id: number | null;
//     raw_to_prepped_yield_custom: Decimal | null;
//     cooked_yield_categories_id: number | null;
//     cooked_yield_custom: Decimal | null;
//     dry_cooked_yield_categories_id: number | null;
//     dry_cooked_yield_id: number | null;
//     dry_cooked_yield_custom: Decimal | null;
//     ingredient_type_name: recipe_row_types_type;
//     prep_instruction_name: prep_instruction_type;
//     prep_instruction_other: string | null;
//     step_instruction: string | null;
//     cost_per_1000g: Decimal | null;
//     needs_prep: true;
//     prep_details: true;
//     fq_score_id: true;
//     isUpdated: true;
//     home_mode_units: true;
//     salt_purpose: boolean;
//     oil_purpose: boolean;

//     cooking_method_yields: Decimal | null;
//     dry_cooked_yield_categories: Decimal | null;
//     dry_cooked_yield: Decimal | null;
//     instruction: {
//       id: true;
//       name: true;
//       translation: true;
//       metric: true;
//       desc: true;
//       is_live: true;
//       updated_at: true;
//     };
//     fq_score: true;

//     primary_category_id: true;
//     primary_category: {
//       id: true;
//       name: true;
//       translation: true;
//       created_at: true;
//       updated_at: true;
//     };
//     unit_type: {
//       id: true;
//       name: true;
//       desc: true;
//       imperial: true;
//       metric: true;
//     };
//     raw_to_prepped_yields: [
//       {
//         id: true;
//         whole: true;
//         peeled: true;
//         peeled_and_cored: true;
//         diced: true;
//         sliced: true;
//         grated: true;
//         updated_at: true;
//         ingredients_id: true;
//       }
//     ];
//     cooked_yields: [
//       {
//         id: true;
//         ingredients_id: true;
//         raw: true;
//         cooked: true;
//         deep_fry: true;
//         shallow_fry: true;
//         boiled: true;
//         roasted: true;
//         updated_at: true;
//         created_at: true;
//       }
//     ];
//     dry_cooked_yields: true;
//     ingredients_nutrition: [
//       {
//         id: true;
//         org_uuid: true;
//         is_default: true;
//         ingredients_id: true;
//         kcal_per_100g: true;
//         kj_per_100g: true;
//         protein_per_100g: true;
//         fat_per_100g: true;
//         saturated_fat_per_100g: true;
//         monounsaturate_per_100g: true;
//         polyunsaturate_per_100g: true;
//         trans_fats_per_100g: true;
//         omega3_per_100g: true;
//         omega6_per_100g: true;
//         omega9_per_100g: true;
//         carbohydrates_per_100g: true;
//         net_carbs_per_100g: true;
//         total_sugar_per_100g: true;
//         added_sugar_per_100g: true;
//         artificial_sugar_per_100g: true;
//         fibre_per_100g: true;
//         starch_per_100g: true;
//         salt_per_100g: true;
//         sodium_per_100g: true;
//         water_per_100g: true;
//         nitrogen_g_per_100g: true;
//         ash_g_per_100g: true;
//         calcium_mg_per_100g: true;
//         iron_mg_per_100g: true;
//         magnesium_mg_per_100g: true;
//         phosphorus_mg_per_100g: true;
//         potassium_mg_per_100g: true;
//         zinc_mg_per_100g: true;
//         copper_mg_per_100g: true;
//         manganese_mg_per_100g: true;
//         selenium_µg_per_100g: true;
//         vitamin_a_mg_per_100g: true;
//         vitamin_b1_thiamin_mg_per_100g: true;
//         vitamin_b2_mg_per_100g: true;
//         vitamin_b3_niacin_mg_per_100g: true;
//         vitamin_b6_mg_per_100g: true;
//         vitamin_b7_biotin_µg_per_100g: true;
//         vitamin_b9_folate_mg_per_100g: true;
//         vitamin_b12_mg_per_100g: true;
//         vitamin_e_mg_per_100g: true;
//         vitamin_k_µg_per_100g: true;
//         sfa_16_0_palmitic_acid_g_per_100g: true;
//         sfa_18_0_stearic_acid_g_per_100g: true;
//         mufa_16_1_palmitoleic_acid_g_per_100g: true;
//         mufa_18_1__oleic_acid_g_per_100g: true;
//         pufa_18_2_linoleic_acid_g_per_100g: true;
//         tryptophan_g_per_100g: true;
//         threonine_g_per_100g: true;
//         isoleucine_g_per_100g: true;
//         leucine_g_per_100g: true;
//         lysine_g_per_100g: true;
//         methionine_g_per_100g: true;
//         phenylalanine_g_per_100g: true;
//         tyrosine_g_per_100g: true;
//         valine_g_per_100g: true;
//         arginine_g_per_100g: true;
//         histidine_g_per_100g: true;
//         alanine_g_per_100g: true;
//         aspartic_acid_g_per_100g: true;
//         glutamic_acid_g_per_100g: true;
//         glycine_g_per_100g: true;
//         proline_g_per_100g: true;
//         serine_g_per_100g: true;
//         hydroxyproline_g_per_100g: true;
//         cysteine_g_per_100g: true;
//         daidzein_mg_per_100g: true;
//         genistein_mg_per_100g: true;
//         daidzin_mg_per_100g: true;
//         genistin_mg_per_100g: true;
//         glycitin_mg_per_100g: true;
//         created_at: true;
//         updated_at: true;
//       }
//     ];
//     dietary_classification: {
//       id: true;
//       name: true;
//       translation: true;
//       created_at: true;
//       updated_at: true;
//     };
//     kosher: {
//       id: true;
//       name: true;
//     };
//     halal: {
//       id: true;
//       name: true;
//     };
//     allergy: null;
//   };
// }

export type RecipeModeSelect = Prisma.recipe_modeGetPayload<{
  select: {
    id: true;
    name: true;
    desc: true;
  };
}>;

export type RecipeModeType = "home" | "pro";

export interface RecipesInDataProps {
  uuid: string;
  name: string;
  cost_per_1000g: number;
  brand: Brand;
  customer: CustomerType;
  // recipe_detail: RecipeDetailProps[];
  recipe_detail: Recipe_detail_rowPosts[];
  method: string;
  rationalised_recipe?: string;
  yield?: Decimal | null;

  // recipe_id: string;
  order: number;
  version?: string;
  versions?: string[];
  // type?: recipe_row_types;
  // TODO: need proper Ingredient relation
  ingredient_id?: number | null;
  // parentId?: null | number;
  portions: portionSizeProps[];
  nutri_per_100g?: nutriPer100Props[];
}
// RATHER USE Prisma.recipeGetPayload
// export type RecipeProps = Prisma.recipeSelect;

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

  macro_micro: MacroMicroSelect[];
  // macro_micro: NutritionalDataValuesSelect[];
  // macro_micro: MacroMicroSelect[];
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
  // other_costs_line_items_lookup: OtherCostsLineItemsLookupSelect[];
  other_costs_line_items_lookup: LineItemsLookup[];
  packaging_costs_category: PackagingCostsCategorySelect[];
  packaging_costs_line_items_lookup: LineItemsLookup[];
  vat_rules: VatRulesSelect[];
  // ingredients: IngredientTypeSelect[];
  org: OrgTypeSelect | null; // OrgTypeSelect | null;
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

export interface measurementUnitsObjProps {
  weight: string[];
  fluid: string[];
  each: string[];
}
export interface UserDataProps {
  // USER VALUES BELOW (to overwrite System Data {...vals, ... userVals})
  // OVERWRITE OR ADD TO THE SYSTEM DATA
  other_costs_category: OtherCostsCategorySelect[];
  other_costs_line_items_lookup: OtherCostsLineItemsLookupSelect[];
  packaging_costs_category: PackagingCostsCategorySelect[];
  packaging_costs_line_items_lookup: LineItemsLookup[];
  vat_rules: VatRulesSelect[];
}

export type VatRulesSelect = Prisma.vat_rulesGetPayload<{
  select: {
    id: true;
    name: true;
    cost: true;
    description: true;
    org_uuid: true;
    default: true;
  };
}>;

export interface versionsProps {
  id: number;
  datetime: string;
  user: string;
}

// JSON SYSTEMDATA______________9 SEPT 2025 START::
/* 
 "systemData": {
    "unit_type": [
      {
        "id": 1,
        "name": "weight",
        "desc": "Weight values like kg/g or lbs/oz",
        "imperial": "oz|lbs",
        "metric": "g|kg"
      },
      {
        "id": 2,
        "name": "fluid",
        "desc": "Liquid weights e.g fl oz",
        "imperial": "oz|oz",
        "metric": "mL|L"
      },
      {
        "id": 3,
        "name": "each",
        "desc": "Individual Units, e.g. 2 eggs, or  1 Bay leaf garnish)",
        "imperial": "ea",
        "metric": "ea|ea"
      }
    ],
    "unit_metric_imperial": [
      {
        "id": 2,
        "name": "imperial",
        "is_default": false
      },
      {
        "id": 1,
        "name": "metric",
        "is_default": true
      }
    ],
    "prep_instructions": [
      {
        "id": 4,
        "name": "none",
        "desc": "The ingredient is left unprocessed or uncut, used in its natural state as received (e.g., whole vegetables, raw meat cuts, or intact fruit). No cutting or preparation is applied beyond basic cleaning or trimming.",
        "imperial": "none",
        "metric": "none",
        "translation": null,
        "yield": "1"
      },
      {
        "id": 5,
        "name": "10x10mm",
        "desc": "Ingredients are cut into small, uniform cubes measuring 10 millimeters (1 cm) on each side. Suitable for vegetables, fruits, or tender meats, often used for garnishes or even cooking.",
        "imperial": "0.4 in x 0.4 in x 0.4 in",
        "metric": "10 mm x 10 mm x 10 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 6,
        "name": "15x15mm",
        "desc": "Ingredients are diced into medium cubes measuring 15 millimeters (1.5 cm) on each side. Common for stews or dishes where slightly larger pieces are desired.",
        "imperial": "0.6 in x 0.6 in x 0.6 in",
        "metric": "15 mm x 15 mm x 15 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 7,
        "name": "20x20mm",
        "desc": "Ingredients are cut into larger cubes measuring 20 millimeters (2 cm) on each side. Ideal for hearty dishes like roasts or chunky vegetable medleys.",
        "imperial": "0.8 in x 0.8 in x 0.8 in",
        "metric": "20 mm x 20 mm x 20 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 8,
        "name": "fine",
        "desc": "Ingredients are very finely chopped or processed into small, uniform pieces, typically less than 2-3 mm in size. Used for meats, or fruits when a delicate texture is needed (e.g., fine herbs or fruit purées).",
        "imperial": "\u003C 0.08-0.12 in",
        "metric": "\u003C 2-3 mm",
        "translation": null,
        "yield": "0.94"
      },
      {
        "id": 9,
        "name": "ground",
        "desc": "Ingredients (usually meat, but sometimes fruits or vegetables) are mechanically processed into a paste-like consistency using a grinder or food processor. Common for minced meat or fruit bases.",
        "imperial": "Ground fine",
        "metric": "Ground fine",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 10,
        "name": "ground - fine",
        "desc": "This is one of the smallest and most common grind sizes. ",
        "imperial": "1/8 inch",
        "metric": " 3-4 mm",
        "translation": null,
        "yield": "0.92"
      },
      {
        "id": 11,
        "name": "ground - medium",
        "desc": "Common for burgers, tacos, Bolognese sauce, or shepherd’s pie. ",
        "imperial": "3/16 to 1/4 inch",
        "metric": "5-6 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 12,
        "name": "ground - coarse",
        "desc": "A chunkier grind, often used for hearty dishes like chili, stews, or specialty burgers where you want more bite.",
        "imperial": "3/8 inch",
        "metric": "8-10 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 13,
        "name": "grate",
        "desc": "Ingredients are shredded into small, thin fragments using a grater. Often applied to vegetables (e.g., carrots), fruits (e.g., apples), or even firm meats for specific recipes.",
        "imperial": "Varies, typically 0.04-0.2 in fragments",
        "metric": "Varies, typically 1-5 mm fragments",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 14,
        "name": "grate - large",
        "desc": "Ingredients are shredded into small, thin fragments using a grater. Often applied to vegetables (e.g., carrots), fruits (e.g., apples), or even firm meats for specific recipes.",
        "imperial": "Grated Large",
        "metric": "Grated Large",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 15,
        "name": "grate - medium",
        "desc": "Ingredients are shredded into small, thin fragments using a grater. Often applied to vegetables (e.g., carrots), fruits (e.g., apples), or even firm meats for specific recipes.",
        "imperial": "Grated Medium",
        "metric": "Grated Medium",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 16,
        "name": "grate - fine",
        "desc": "Ingredients are shredded into small, thin fragments using a grater. Often applied to vegetables (e.g., carrots), fruits (e.g., apples), or even firm meats for specific recipes.",
        "imperial": "Grated Fine",
        "metric": "Grated Fine",
        "translation": null,
        "yield": "0.92"
      },
      {
        "id": 17,
        "name": "fresh",
        "desc": "The ingredient is used in its raw, unprocessed, and freshly harvested or sourced state, without cooking, drying, or freezing. Applies to vegetables, fruits, or meats.",
        "imperial": "Used in its raw unprocessed state",
        "metric": "Used in its raw unprocessed state",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 18,
        "name": "whole",
        "desc": "The ingredient is left intact, uncut, and unprocessed beyond basic cleaning or peeling (e.g., a whole carrot, apple, or chicken breast).",
        "imperial": "Ingredient left whole and intact",
        "metric": "Ingredient left whole and intact",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 19,
        "name": "brunoise",
        "desc": "A precise, very small dice, typically 1-3 mm cubes, achieved by first cutting into julienne strips and then dicing. Commonly used for vegetables (e.g., carrots, onions) or fruits for garnishes.",
        "imperial": "0.04-0.12 in x 0.04-0.12 in x 0.04-0.12 in",
        "metric": "1-3 mm x 1-3 mm x 1-3 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 20,
        "name": "chiffonade",
        "desc": "Thin, ribbon-like strips created by stacking and rolling leafy vegetables (e.g., basil, spinach) or herbs, then slicing finely across. Not typically used for meats or solid fruits.",
        "imperial": "0.04-0.08 in wide strips",
        "metric": "1-2 mm wide strips",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 21,
        "name": "chop",
        "desc": "Ingredients are roughly cut into irregular, bite-sized pieces without strict uniformity. Applies to vegetables, meats, or fruits for rustic preparations.",
        "imperial": "Varies, typically 0.4-1.2 in",
        "metric": "Varies, typically 1-3 cm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 22,
        "name": "chopped fine",
        "desc": "Ingredients are roughly cut into irregular, bite-sized pieces without strict uniformity. Applies to vegetables, meats, or fruits for rustic preparations.",
        "imperial": "Varies 0.04-0.12 in",
        "metric": "Varies 1-3 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 23,
        "name": "chopped rough",
        "desc": "Ingredients are roughly cut into irregular, bite-sized pieces without strict uniformity. Applies to vegetables, meats, or fruits for rustic preparations.",
        "imperial": "Varies, typically 0.4-1.2 in",
        "metric": "Varies, typically 1-3 cm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 24,
        "name": "cube",
        "desc": "Ingredients are cut into uniform, three-dimensional squares, typically larger than a dice (e.g., 1-2 cm or more). Used for vegetables, meats, or firm fruits.",
        "imperial": "0.4-0.8 in x 0.4-0.8 in x 0.4-0.8 in",
        "metric": "10-20 mm x 10-20 mm x 10-20 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 25,
        "name": "dice",
        "desc": "Ingredients are cut into small, uniform cubes, typically smaller than a standard cube (e.g., 0.5-1 cm). Common for vegetables, meats, or fruits in precise recipes.",
        "imperial": "0.2-0.4 in x 0.2-0.4 in x 0.2-0.4 in",
        "metric": "5-10 mm x 5-10 mm x 5-10 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 26,
        "name": "julienne/french-cut",
        "desc": "Ingredients are cut into long, thin matchstick-like strips, typically 1-2 mm thick and 4-5 cm long. Often used for vegetables (e.g., carrots) or firm fruits; less common for meats.",
        "imperial": "0.04-0.08 in x 0.04-0.08 in x 1.6-2 in",
        "metric": "1-2 mm x 1-2 mm x 40-50 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 27,
        "name": "mince",
        "desc": "Ingredients are finely chopped into very small pieces, smaller than a chop (e.g., 1-2 mm). Common for vegetables (e.g., garlic), meats, or fruits for pastes or fillings.",
        "imperial": "0.04-0.08 in",
        "metric": "1-2 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 28,
        "name": "slice",
        "desc": "Ingredients are cut into thin, flat pieces of varying thickness. Applies to vegetables (e.g., tomatoes), meats (e.g., steak), or fruits (e.g., apples).",
        "imperial": "0.08-0.2 in thick",
        "metric": "2-5 mm thick",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 29,
        "name": "rondelle",
        "desc": "Ingredients are cut into round, coin-shaped slices, typically from cylindrical vegetables (e.g., carrots, zucchini) or fruits. Not commonly used for meats.",
        "imperial": "0.08-0.2 in thick",
        "metric": "2-5 mm thick",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 30,
        "name": "diagonal",
        "desc": "Ingredients are sliced at an angle to create elongated, oval-shaped pieces. Often used for vegetables (e.g., carrots) or meats for presentation.",
        "imperial": "0.08-0.2 in thick (angled)",
        "metric": "2-5 mm thick (angled)",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 31,
        "name": "batonnet",
        "desc": "Ingredients are cut into thick, stick-like pieces, typically 6 mm x 6 mm x 5-6 cm long. Common for vegetables (e.g., potatoes for fries) or firm fruits; less common for meats.",
        "imperial": "0.25 in x 0.25 in x 2-2.4 in",
        "metric": "6 mm x 6 mm x 50-60 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 32,
        "name": "jardiniere",
        "desc": "Ingredients are cut into baton-like shapes, slightly smaller than batonnet (e.g., 4 mm x 4 mm x 2-3 cm). Used for vegetables in classic French cooking.",
        "imperial": "0.16 in x 0.16 in x 0.8-1.2 in",
        "metric": "4 mm x 4 mm x 20-30 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 33,
        "name": "macedoine",
        "desc": "Ingredients are diced into small, uniform cubes, typically 5 mm on each side. Used for vegetables or fruits in mixed dishes or salads.",
        "imperial": "0.2 in x 0.2 in x 0.2 in",
        "metric": "5 mm x 5 mm x 5 mm",
        "translation": null,
        "yield": "0.95"
      },
      {
        "id": 34,
        "name": "other",
        "desc": "Any processing or cutting method not explicitly listed, specific to the recipe or preparation context.",
        "imperial": "Other",
        "metric": "Other",
        "translation": null,
        "yield": "0.7"
      }
    ],
    "cooked_yields_categories": [
      {
        "id": 1,
        "name": "Roasting & Baking",
        "translation": null,
        "desc": "Hot Air Cooking",
        "yield": "0.7",
        "is_live": true
      },
      {
        "id": 2,
        "name": "Grilling & Broiling",
        "translation": null,
        "desc": "Direct High Heat",
        "yield": "0.75",
        "is_live": true
      },
      {
        "id": 3,
        "name": "Frying",
        "translation": null,
        "desc": "Oil as a Heat Medium",
        "yield": "0.7",
        "is_live": true
      },
      {
        "id": 4,
        "name": "Sautéing & Stir-Frying",
        "translation": null,
        "desc": "Fast, High Heat",
        "yield": "0.8",
        "is_live": true
      },
      {
        "id": 6,
        "name": "Boiling & Simmering",
        "translation": null,
        "desc": "Direct Water Cooking",
        "yield": "0.85",
        "is_live": true
      },
      {
        "id": 7,
        "name": "Steaming",
        "translation": null,
        "desc": "Using Steam to Cook.",
        "yield": "0.9",
        "is_live": true
      },
      {
        "id": 8,
        "name": "Combination Cooking",
        "translation": null,
        "desc": "Dry + Moist Heat",
        "yield": "0.72",
        "is_live": true
      },
      {
        "id": 10,
        "name": "Sous Vide",
        "translation": null,
        "desc": "Sealed, Slow Sous Vide Cooking",
        "yield": "0.9",
        "is_live": true
      }
    ],
    "dry_cooked_yields_categories": [
      {
        "id": 0,
        "name": "Unknown\n",
        "desc": null,
        "translation": null,
        "yield": null
      },
      {
        "id": 1,
        "name": "Pasta",
        "desc": "General Dry  or Fresh Pasta Cooking",
        "translation": null,
        "yield": "2"
      },
      {
        "id": 2,
        "name": "Rice",
        "desc": "White Rice (long/short grain)",
        "translation": null,
        "yield": "3"
      },
      {
        "id": 4,
        "name": "Grains",
        "desc": "Grains e.g., Bulgar Wheat",
        "translation": null,
        "yield": "2.7"
      },
      {
        "id": 7,
        "name": "Oats",
        "desc": "Oats Raw",
        "translation": null,
        "yield": "2.5"
      },
      {
        "id": 10,
        "name": "Legumes, Lentils, Beans",
        "desc": "Lentils Dried",
        "translation": null,
        "yield": "2"
      },
      {
        "id": 8,
        "name": "Noodles",
        "desc": "Noodles Dried Raw",
        "translation": null,
        "yield": "2"
      },
      {
        "id": 3,
        "name": "Cereals, Pseudocereals (Quinoa)",
        "desc": "Cereals\t(Monocots)\ne.g. Wheat, Rice, Corn, Oats, Barley\nUsually have Gluten, incomplete proteins.\n\nPseudocereals (Dicots)\ne.g. Quinoa, Buckwheat, Amaranth, Chia\nNaturally Gluten free, complete Protein\n",
        "translation": null,
        "yield": "2.5"
      }
    ],
    "dry_cooked_yields": [
      {
        "id": 1,
        "name": "Short Pasta (Penne, Fusilli, Macaroni)",
        "desc": "Short White Pasta (Penne, Fusilli, Macaroni)",
        "translation": null,
        "yield": "2.4",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      },
      {
        "id": 2,
        "name": "Long pasta (spaghetti, fettuccine)",
        "desc": "Long White asta (spaghetti, fettuccine)",
        "translation": null,
        "yield": "2.25",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      },
      {
        "id": 3,
        "name": "Whole Wheat Pasta",
        "desc": "Whole Wheat Dry Pasta",
        "translation": null,
        "yield": "2",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      },
      {
        "id": 4,
        "name": "Fresh Pasta (Egg Based)",
        "desc": "Egg-based pasta (tagliatelle, fettuccine, ravioli)",
        "translation": null,
        "yield": "1.4",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      },
      {
        "id": 5,
        "name": "Fresh Semolina Pasta",
        "desc": "Fresh Semolina pasta (gnocchi, orecchiette, trofie)",
        "translation": null,
        "yield": "1.45",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      },
      {
        "id": 6,
        "name": "White Rice",
        "desc": "White Rice General",
        "translation": null,
        "yield": "3",
        "dry_cooked_yields_categories": {
          "id": 2,
          "name": "Rice",
          "translation": null,
          "desc": "White Rice (long/short grain)",
          "yield": "3",
          "is_live": true,
          "updated_at": "2025-03-11T19:31:21.000Z",
          "primary_category_id": 12
        },
        "dry_cooked_yields_categories_id": 2
      },
      {
        "id": 7,
        "name": "Brown Rice",
        "desc": "Brown Rice General",
        "translation": null,
        "yield": "2.5",
        "dry_cooked_yields_categories": {
          "id": 2,
          "name": "Rice",
          "translation": null,
          "desc": "White Rice (long/short grain)",
          "yield": "3",
          "is_live": true,
          "updated_at": "2025-03-11T19:31:21.000Z",
          "primary_category_id": 12
        },
        "dry_cooked_yields_categories_id": 2
      },
      {
        "id": 8,
        "name": "Wild Rice",
        "desc": "Wild Rice",
        "translation": null,
        "yield": "3.5",
        "dry_cooked_yields_categories": {
          "id": 2,
          "name": "Rice",
          "translation": null,
          "desc": "White Rice (long/short grain)",
          "yield": "3",
          "is_live": true,
          "updated_at": "2025-03-11T19:31:21.000Z",
          "primary_category_id": 12
        },
        "dry_cooked_yields_categories_id": 2
      },
      {
        "id": 9,
        "name": "Quinoa",
        "desc": "Quinoa Raw",
        "translation": null,
        "yield": "3",
        "dry_cooked_yields_categories": {
          "id": 3,
          "name": "Cereals, Pseudocereals (Quinoa)",
          "translation": null,
          "desc": "Cereals\t(Monocots)\ne.g. Wheat, Rice, Corn, Oats, Barley\nUsually have Gluten, incomplete proteins.\n\nPseudocereals (Dicots)\ne.g. Quinoa, Buckwheat, Amaranth, Chia\nNaturally Gluten free, complete Protein\n",
          "yield": "2.5",
          "is_live": true,
          "updated_at": "2025-03-11T19:32:42.000Z",
          "primary_category_id": 12
        },
        "dry_cooked_yields_categories_id": 3
      },
      {
        "id": 10,
        "name": "Bulgur Wheat",
        "desc": "Bulgur Wheat Raw",
        "translation": null,
        "yield": "2.5",
        "dry_cooked_yields_categories": {
          "id": 3,
          "name": "Cereals, Pseudocereals (Quinoa)",
          "translation": null,
          "desc": "Cereals\t(Monocots)\ne.g. Wheat, Rice, Corn, Oats, Barley\nUsually have Gluten, incomplete proteins.\n\nPseudocereals (Dicots)\ne.g. Quinoa, Buckwheat, Amaranth, Chia\nNaturally Gluten free, complete Protein\n",
          "yield": "2.5",
          "is_live": true,
          "updated_at": "2025-03-11T19:32:42.000Z",
          "primary_category_id": 12
        },
        "dry_cooked_yields_categories_id": 3
      },
      {
        "id": 13,
        "name": "Farro Grain",
        "desc": "Farro Grain Raw",
        "translation": null,
        "yield": "2.7",
        "dry_cooked_yields_categories": {
          "id": 3,
          "name": "Cereals, Pseudocereals (Quinoa)",
          "translation": null,
          "desc": "Cereals\t(Monocots)\ne.g. Wheat, Rice, Corn, Oats, Barley\nUsually have Gluten, incomplete proteins.\n\nPseudocereals (Dicots)\ne.g. Quinoa, Buckwheat, Amaranth, Chia\nNaturally Gluten free, complete Protein\n",
          "yield": "2.5",
          "is_live": true,
          "updated_at": "2025-03-11T19:32:42.000Z",
          "primary_category_id": 12
        },
        "dry_cooked_yields_categories_id": 3
      },
      {
        "id": 15,
        "name": "Oats (rolled)",
        "desc": "Oats (rolled)",
        "translation": null,
        "yield": "2.5",
        "dry_cooked_yields_categories": {
          "id": 7,
          "name": "Oats",
          "translation": null,
          "desc": "Oats Raw",
          "yield": "2.5",
          "is_live": true,
          "updated_at": "2025-03-11T20:34:48.000Z",
          "primary_category_id": 12
        },
        "dry_cooked_yields_categories_id": 7
      },
      {
        "id": 16,
        "name": "Oats (steel-cut)",
        "desc": "Oats (steel-cut)",
        "translation": null,
        "yield": "2.7",
        "dry_cooked_yields_categories": {
          "id": 7,
          "name": "Oats",
          "translation": null,
          "desc": "Oats Raw",
          "yield": "2.5",
          "is_live": true,
          "updated_at": "2025-03-11T20:34:48.000Z",
          "primary_category_id": 12
        },
        "dry_cooked_yields_categories_id": 7
      },
      {
        "id": 20,
        "name": "Barley (pearled)",
        "desc": "Barley (pearled)",
        "translation": null,
        "yield": "3.5",
        "dry_cooked_yields_categories": {
          "id": 4,
          "name": "Grains",
          "translation": null,
          "desc": "Grains e.g., Bulgar Wheat",
          "yield": "2.7",
          "is_live": true,
          "updated_at": "2025-03-11T19:33:42.000Z",
          "primary_category_id": 12
        },
        "dry_cooked_yields_categories_id": 4
      },
      {
        "id": 21,
        "name": "Farro Grain",
        "desc": "Farro Grain",
        "translation": null,
        "yield": "2.7",
        "dry_cooked_yields_categories": {
          "id": 4,
          "name": "Grains",
          "translation": null,
          "desc": "Grains e.g., Bulgar Wheat",
          "yield": "2.7",
          "is_live": true,
          "updated_at": "2025-03-11T19:33:42.000Z",
          "primary_category_id": 12
        },
        "dry_cooked_yields_categories_id": 4
      },
      {
        "id": 23,
        "name": "Chickpeas Dried",
        "desc": "Chickpeas Raw Dry",
        "translation": null,
        "yield": "2.7",
        "dry_cooked_yields_categories": {
          "id": 10,
          "name": "Legumes, Lentils, Beans",
          "translation": null,
          "desc": "Lentils Dried",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T20:38:48.000Z",
          "primary_category_id": 14
        },
        "dry_cooked_yields_categories_id": 10
      },
      {
        "id": 24,
        "name": "Beans Dried",
        "desc": "Beans Raw Dried",
        "translation": null,
        "yield": "2.5",
        "dry_cooked_yields_categories": {
          "id": 10,
          "name": "Legumes, Lentils, Beans",
          "translation": null,
          "desc": "Lentils Dried",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T20:38:48.000Z",
          "primary_category_id": 14
        },
        "dry_cooked_yields_categories_id": 10
      },
      {
        "id": 12,
        "name": "Couscous",
        "desc": "Couscous Raw",
        "translation": null,
        "yield": "2.5",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      },
      {
        "id": 14,
        "name": "Gnocchi",
        "desc": "Fresh Gnocchi Dumpling Pasta",
        "translation": null,
        "yield": "1.2",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      },
      {
        "id": 18,
        "name": "Couscous",
        "desc": "Couscous - Semolina Flour from Durum Wheat. 3 Sizes Small Moroccan, Medium Israeli Pear Couscous, Large Lebanese",
        "translation": null,
        "yield": "2.5",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      },
      {
        "id": 19,
        "name": "Egg Noodles",
        "desc": "Egg Noodles Dry",
        "translation": null,
        "yield": "2.5",
        "dry_cooked_yields_categories": {
          "id": 8,
          "name": "Noodles",
          "translation": null,
          "desc": "Noodles Dried Raw",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T20:35:48.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 8
      },
      {
        "id": 26,
        "name": "Semolina Dried",
        "desc": "Semolina Dried",
        "translation": null,
        "yield": "2.5",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      },
      {
        "id": 22,
        "name": "Lentils Dried",
        "desc": "Lentils Raw Dry",
        "translation": null,
        "yield": null,
        "dry_cooked_yields_categories": {
          "id": 10,
          "name": "Legumes, Lentils, Beans",
          "translation": null,
          "desc": "Lentils Dried",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T20:38:48.000Z",
          "primary_category_id": 14
        },
        "dry_cooked_yields_categories_id": 10
      },
      {
        "id": 27,
        "name": "Gnocchi Raw Fresh",
        "desc": "Uncooked Fresh Gnocchi",
        "translation": null,
        "yield": "1.056",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      },
      {
        "id": 25,
        "name": "Polenta Dried",
        "desc": "Polenta Dried",
        "translation": null,
        "yield": "4",
        "dry_cooked_yields_categories": {
          "id": 1,
          "name": "Pasta",
          "translation": null,
          "desc": "General Dry  or Fresh Pasta Cooking",
          "yield": "2",
          "is_live": true,
          "updated_at": "2025-03-11T17:42:07.000Z",
          "primary_category_id": 20
        },
        "dry_cooked_yields_categories_id": 1
      }
    ],
    "ingredients_religious_certification": [
      {
        "id": 0,
        "name": "no"
      },
      {
        "id": 1,
        "name": "yes"
      },
      {
        "id": 4,
        "name": "unknown"
      },
      {
        "id": 3,
        "name": "likely"
      },
      {
        "id": 2,
        "name": "unlikely"
      }
    ],
    "language": [
      {
        "id": 1,
        "name": "English (UK)"
      },
      {
        "id": 2,
        "name": "English (US)"
      },
      {
        "id": 5,
        "name": "German"
      },
      {
        "id": 6,
        "name": "Italian"
      },
      {
        "id": 7,
        "name": "Dutch"
      },
      {
        "id": 8,
        "name": "Portuguese"
      },
      {
        "id": 3,
        "name": "French"
      },
      {
        "id": 4,
        "name": "Spanish"
      }
    ],
    "macro_micro": [
      {
        "id": 1,
        "name": "kcal_per_100g",
        "full_name": "Calories",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "parent",
        "short_name": "kcal",
        "order": 1
      },
      {
        "id": 2,
        "name": "kj_per_100g",
        "full_name": "Kilojoules",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "parent",
        "short_name": "kJ",
        "order": 2
      },
      {
        "id": 3,
        "name": "protein_per_100g",
        "full_name": "Protein",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "parent",
        "short_name": "Protein",
        "order": 3
      },
      {
        "id": 4,
        "name": "fat_per_100g",
        "full_name": "Total Fat",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "parent",
        "short_name": "Fat",
        "order": 4
      },
      {
        "id": 5,
        "name": "saturated_fat_per_100g",
        "full_name": "Saturated Fat",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "child",
        "short_name": "Sat Fat",
        "order": 5
      },
      {
        "id": 6,
        "name": "monounsaturate_per_100g",
        "full_name": "Monounsaturated Fat",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "child",
        "short_name": "MUFA",
        "order": 6
      },
      {
        "id": 7,
        "name": "polyunsaturate_per_100g",
        "full_name": "Polyunsaturated Fat",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "child",
        "short_name": "PUFA",
        "order": 7
      },
      {
        "id": 8,
        "name": "trans_fats_per_100g",
        "full_name": "Trans Fat",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "child",
        "short_name": "Trans Fat",
        "order": 8
      },
      {
        "id": 9,
        "name": "carbohydrates_per_100g",
        "full_name": "Carbohydrate",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "parent",
        "short_name": "Carbs",
        "order": 9
      },
      {
        "id": 10,
        "name": "net_carbs_per_100g",
        "full_name": "Net Carbohydrates",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "child",
        "short_name": "Net Carbs",
        "order": 10
      },
      {
        "id": 11,
        "name": "total_sugar_per_100g",
        "full_name": "Total Sugar",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "child",
        "short_name": "Sugar",
        "order": 11
      },
      {
        "id": 12,
        "name": "added_sugar_per_100g",
        "full_name": "Added Sugar",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "child",
        "short_name": "Added Sugar",
        "order": 12
      },
      {
        "id": 13,
        "name": "artificial_sugar_per_100g",
        "full_name": "Artificial Sugar",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "child",
        "short_name": "Art. Sugar",
        "order": 13
      },
      {
        "id": 14,
        "name": "starch_per_100g",
        "full_name": "Starch",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "child",
        "short_name": "Starch",
        "order": 14
      },
      {
        "id": 15,
        "name": "fibre_per_100g",
        "full_name": "Fibre",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "parent",
        "short_name": "Fibre",
        "order": 15
      },
      {
        "id": 16,
        "name": "salt_per_100g",
        "full_name": "Salt",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "parent",
        "short_name": "Salt",
        "order": 16
      },
      {
        "id": 17,
        "name": "sodium_per_100g",
        "full_name": "Sodium",
        "primary_category": "macro",
        "secondary_category": null,
        "unit": "g",
        "indent": "child",
        "short_name": "Na",
        "order": 17
      },
      {
        "id": 18,
        "name": "water_per_100g",
        "full_name": "Water",
        "primary_category": "micro",
        "secondary_category": null,
        "unit": "g",
        "indent": "parent",
        "short_name": "H₂O",
        "order": 1
      },
      {
        "id": 19,
        "name": "nitrogen_g_per_100g",
        "full_name": "Nitrogen",
        "primary_category": "micro",
        "secondary_category": null,
        "unit": "g",
        "indent": "parent",
        "short_name": "N",
        "order": 2
      },
      {
        "id": 20,
        "name": "ash_g_per_100g",
        "full_name": "Ash",
        "primary_category": "micro",
        "secondary_category": null,
        "unit": "g",
        "indent": "parent",
        "short_name": "Ash",
        "order": 3
      },
      {
        "id": 21,
        "name": "calcium_mg_per_100g",
        "full_name": "Calcium",
        "primary_category": "micro",
        "secondary_category": "minerals",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Ca",
        "order": 4
      },
      {
        "id": 22,
        "name": "iron_mg_per_100g",
        "full_name": "Iron",
        "primary_category": "micro",
        "secondary_category": "minerals",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Fe",
        "order": 5
      },
      {
        "id": 23,
        "name": "magnesium_mg_per_100g",
        "full_name": "Magnesium",
        "primary_category": "micro",
        "secondary_category": "minerals",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Mg",
        "order": 6
      },
      {
        "id": 24,
        "name": "phosphorus_mg_per_100g",
        "full_name": "Phosphorus",
        "primary_category": "micro",
        "secondary_category": "minerals",
        "unit": "mg",
        "indent": "parent",
        "short_name": "P",
        "order": 7
      },
      {
        "id": 25,
        "name": "potassium_mg_per_100g",
        "full_name": "Potassium",
        "primary_category": "micro",
        "secondary_category": "minerals",
        "unit": "mg",
        "indent": "parent",
        "short_name": "K",
        "order": 8
      },
      {
        "id": 26,
        "name": "zinc_mg_per_100g",
        "full_name": "Zinc",
        "primary_category": "micro",
        "secondary_category": "minerals",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Zn",
        "order": 9
      },
      {
        "id": 27,
        "name": "copper_mg_per_100g",
        "full_name": "Copper",
        "primary_category": "micro",
        "secondary_category": "minerals",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Cu",
        "order": 10
      },
      {
        "id": 28,
        "name": "manganese_mg_per_100g",
        "full_name": "Manganese",
        "primary_category": "micro",
        "secondary_category": "minerals",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Mn",
        "order": 11
      },
      {
        "id": 29,
        "name": "selenium_¬µg_per_100g",
        "full_name": "Selenium",
        "primary_category": "micro",
        "secondary_category": "minerals",
        "unit": "µg",
        "indent": "parent",
        "short_name": "Se",
        "order": 12
      },
      {
        "id": 30,
        "name": "vitamin_a_mg_per_100g",
        "full_name": "Vitamin A",
        "primary_category": "micro",
        "secondary_category": "vitamins",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Vit A",
        "order": 13
      },
      {
        "id": 31,
        "name": "vitamin_b1_thiamin_mg_per_100g",
        "full_name": "Vitamin B1 (Thiamin)",
        "primary_category": "micro",
        "secondary_category": "vitamins",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Vit B1",
        "order": 14
      },
      {
        "id": 32,
        "name": "vitamin_b2_mg_per_100g",
        "full_name": "Vitamin B2 (Riboflavin)",
        "primary_category": "micro",
        "secondary_category": "vitamins",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Vit B2",
        "order": 15
      },
      {
        "id": 33,
        "name": "vitamin_b3_niacin_mg_per_100g",
        "full_name": "Vitamin B3 (Niacin)",
        "primary_category": "micro",
        "secondary_category": "vitamins",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Vit B3",
        "order": 16
      },
      {
        "id": 34,
        "name": "vitamin_b6_mg_per_100g",
        "full_name": "Vitamin B6",
        "primary_category": "micro",
        "secondary_category": "vitamins",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Vit B6",
        "order": 17
      },
      {
        "id": 35,
        "name": "vitamin_b7_biotin_¬µg_per_100g",
        "full_name": "Vitamin B7 (Biotin)",
        "primary_category": "micro",
        "secondary_category": "vitamins",
        "unit": "µg",
        "indent": "parent",
        "short_name": "Vit B7",
        "order": 18
      },
      {
        "id": 36,
        "name": "vitamin_b9_folate_mg_per_100g",
        "full_name": "Vitamin B9 (Folate)",
        "primary_category": "micro",
        "secondary_category": "vitamins",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Vit B9",
        "order": 19
      },
      {
        "id": 37,
        "name": "vitamin_b12_mg_per_100g",
        "full_name": "Vitamin B12",
        "primary_category": "micro",
        "secondary_category": "vitamins",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Vit B12",
        "order": 20
      },
      {
        "id": 38,
        "name": "vitamin_e_mg_per_100g",
        "full_name": "Vitamin E",
        "primary_category": "micro",
        "secondary_category": "vitamins",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Vit E",
        "order": 21
      },
      {
        "id": 39,
        "name": "vitamin_k_¬µg_per_100g",
        "full_name": "Vitamin K",
        "primary_category": "micro",
        "secondary_category": "vitamins",
        "unit": "µg",
        "indent": "parent",
        "short_name": "Vit K",
        "order": 22
      },
      {
        "id": 40,
        "name": "sfa_16_0_palmitic_acid_g_per_100g",
        "full_name": "Palmitic Acid",
        "primary_category": "micro",
        "secondary_category": "fatty_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "C16:0",
        "order": 23
      },
      {
        "id": 41,
        "name": "sfa_18_0_stearic_acid_g_per_100g",
        "full_name": "Stearic Acid",
        "primary_category": "micro",
        "secondary_category": "fatty_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "C18:0",
        "order": 24
      },
      {
        "id": 42,
        "name": "mufa_16_1_palmitoleic_acid_g_per_100g",
        "full_name": "Palmitoleic Acid",
        "primary_category": "micro",
        "secondary_category": "fatty_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "C16:1",
        "order": 25
      },
      {
        "id": 43,
        "name": "mufa_18_1__oleic_acid_g_per_100g",
        "full_name": " Oleic Acid",
        "primary_category": "micro",
        "secondary_category": "fatty_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "C18:1",
        "order": 26
      },
      {
        "id": 44,
        "name": "pufa_18_2_linoleic_acid_g_per_100g",
        "full_name": "Linoleic Acid",
        "primary_category": "micro",
        "secondary_category": "fatty_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "C18:2",
        "order": 27
      },
      {
        "id": 45,
        "name": "omega3_per_100g",
        "full_name": "Omega-3 Fatty Acids",
        "primary_category": "micro",
        "secondary_category": "lipids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Ome",
        "order": 28
      },
      {
        "id": 46,
        "name": "omega6_per_100g",
        "full_name": "Omega-6 Fatty Acids",
        "primary_category": "micro",
        "secondary_category": "lipids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Ome",
        "order": 29
      },
      {
        "id": 47,
        "name": "omega9_per_100g",
        "full_name": "Omega-9 Fatty Acids",
        "primary_category": "micro",
        "secondary_category": "lipids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Ome",
        "order": 30
      },
      {
        "id": 48,
        "name": "tryptophan_g_per_100g",
        "full_name": "Tryptophan",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Try",
        "order": 31
      },
      {
        "id": 49,
        "name": "threonine_g_per_100g",
        "full_name": "Threonine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Thr",
        "order": 32
      },
      {
        "id": 50,
        "name": "isoleucine_g_per_100g",
        "full_name": "Isoleucine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Iso",
        "order": 33
      },
      {
        "id": 51,
        "name": "leucine_g_per_100g",
        "full_name": "Leucine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Leu",
        "order": 34
      },
      {
        "id": 52,
        "name": "lysine_g_per_100g",
        "full_name": "Lysine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Lys",
        "order": 35
      },
      {
        "id": 53,
        "name": "methionine_g_per_100g",
        "full_name": "Methionine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Met",
        "order": 36
      },
      {
        "id": 54,
        "name": "phenylalanine_g_per_100g",
        "full_name": "Phenylalanine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Phe",
        "order": 37
      },
      {
        "id": 55,
        "name": "tyrosine_g_per_100g",
        "full_name": "Tyrosine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Tyr",
        "order": 38
      },
      {
        "id": 56,
        "name": "valine_g_per_100g",
        "full_name": "Valine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Val",
        "order": 39
      },
      {
        "id": 57,
        "name": "arginine_g_per_100g",
        "full_name": "Arginine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Arg",
        "order": 40
      },
      {
        "id": 58,
        "name": "histidine_g_per_100g",
        "full_name": "Histidine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "His",
        "order": 41
      },
      {
        "id": 59,
        "name": "alanine_g_per_100g",
        "full_name": "Alanine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Ala",
        "order": 42
      },
      {
        "id": 60,
        "name": "aspartic_acid_g_per_100g",
        "full_name": "Aspartic Acid",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Asp",
        "order": 43
      },
      {
        "id": 61,
        "name": "glutamic_acid_g_per_100g",
        "full_name": "Glutamic Acid",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Glu",
        "order": 44
      },
      {
        "id": 62,
        "name": "glycine_g_per_100g",
        "full_name": "Glycine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Gly",
        "order": 45
      },
      {
        "id": 63,
        "name": "proline_g_per_100g",
        "full_name": "Proline",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Pro",
        "order": 46
      },
      {
        "id": 64,
        "name": "serine_g_per_100g",
        "full_name": "Serine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Ser",
        "order": 47
      },
      {
        "id": 65,
        "name": "hydroxyproline_g_per_100g",
        "full_name": "Hydroxyproline",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Hyd",
        "order": 48
      },
      {
        "id": 66,
        "name": "cysteine_g_per_100g",
        "full_name": "Cysteine",
        "primary_category": "micro",
        "secondary_category": "amino_acids",
        "unit": "g",
        "indent": "parent",
        "short_name": "Cys",
        "order": 49
      },
      {
        "id": 67,
        "name": "daidzein_mg_per_100g",
        "full_name": "Daidzein",
        "primary_category": "micro",
        "secondary_category": "isoflavones",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Daidzein",
        "order": 50
      },
      {
        "id": 68,
        "name": "genistein_mg_per_100g",
        "full_name": "Genistein",
        "primary_category": "micro",
        "secondary_category": "isoflavones",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Genistein",
        "order": 51
      },
      {
        "id": 69,
        "name": "daidzin_mg_per_100g",
        "full_name": "Daidzin",
        "primary_category": "micro",
        "secondary_category": "isoflavones",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Daidzin",
        "order": 52
      },
      {
        "id": 70,
        "name": "genistin_mg_per_100g",
        "full_name": "Genistin",
        "primary_category": "micro",
        "secondary_category": "isoflavones",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Genistin",
        "order": 53
      },
      {
        "id": 71,
        "name": "glycitin_mg_per_100g",
        "full_name": "Glycitin",
        "primary_category": "micro",
        "secondary_category": "isoflavones",
        "unit": "mg",
        "indent": "parent",
        "short_name": "Glycitin",
        "order": 54
      }
    ],
    "ingredient_category_primary": [
      {
        "id": 0,
        "name": "unknown",
        "translation": null
      },
      {
        "id": 2,
        "name": "alcoholic_beverages",
        "translation": null
      },
      {
        "id": 3,
        "name": "baking_ingredients",
        "translation": null
      },
      {
        "id": 4,
        "name": "broths_stocks",
        "translation": null
      },
      {
        "id": 5,
        "name": "condiments_sauces",
        "translation": null
      },
      {
        "id": 6,
        "name": "dairy",
        "translation": null
      },
      {
        "id": 7,
        "name": "eggs",
        "translation": null
      },
      {
        "id": 8,
        "name": "fats_oils",
        "translation": null
      },
      {
        "id": 9,
        "name": "fermented_foods",
        "translation": null
      },
      {
        "id": 10,
        "name": "flavorings_extracts",
        "translation": null
      },
      {
        "id": 11,
        "name": "fruits",
        "translation": null
      },
      {
        "id": 12,
        "name": "grains_cereals",
        "translation": null
      },
      {
        "id": 13,
        "name": "herbs_spices",
        "translation": null
      },
      {
        "id": 15,
        "name": "meat",
        "translation": null
      },
      {
        "id": 16,
        "name": "mushrooms",
        "translation": null
      },
      {
        "id": 17,
        "name": "non_alcoholic_beverages",
        "translation": null
      },
      {
        "id": 18,
        "name": "nuts_seeds",
        "translation": null
      },
      {
        "id": 19,
        "name": "other",
        "translation": null
      },
      {
        "id": 20,
        "name": "pasta_noodles",
        "translation": null
      },
      {
        "id": 21,
        "name": "plant_based_proteins",
        "translation": null
      },
      {
        "id": 22,
        "name": "poultry",
        "translation": null
      },
      {
        "id": 23,
        "name": "seafood",
        "translation": null
      },
      {
        "id": 24,
        "name": "seaweed",
        "translation": null
      },
      {
        "id": 25,
        "name": "sugars_sweeteners",
        "translation": null
      },
      {
        "id": 26,
        "name": "vegetables",
        "translation": null
      },
      {
        "id": 27,
        "name": "vitamins_minerals_supplements",
        "translation": null
      },
      {
        "id": 28,
        "name": "water",
        "translation": null
      },
      {
        "id": 14,
        "name": "legumes_beans",
        "translation": null
      }
    ],
    "ingredient_category_secondary": [
      {
        "id": 0,
        "name": "None",
        "translation": null,
        "ingredient_category_primary_id": 0
      }
    ],
    "dietary_classification": [
      {
        "id": 0,
        "name": "unknown",
        "translation": null
      },
      {
        "id": 1,
        "name": "vegan",
        "translation": null
      },
      {
        "id": 2,
        "name": "vegetarian",
        "translation": null
      },
      {
        "id": 3,
        "name": "animal_product",
        "translation": null
      }
    ],
    "allergy": [
      {
        "id": 0,
        "name": "unknown",
        "desc": "Unable to classify ingredient allergies. Manual intervention is required.",
        "translation": null
      },
      {
        "id": 1,
        "name": "none",
        "desc": "No common food allergy associations.",
        "translation": null
      },
      {
        "id": 3,
        "name": "buckwheat",
        "desc": "Common in Asia, especially Japan (e.g. in soba noodles).",
        "translation": null
      },
      {
        "id": 4,
        "name": "celery",
        "desc": "Celery might sneak into soups, stocks, or seasoning blends. ",
        "translation": null
      },
      {
        "id": 5,
        "name": "chilli",
        "desc": "Chilli and garlic are staples in countless cuisines, from sauces to marinades, often unlisted in fine detail. ",
        "translation": null
      },
      {
        "id": 6,
        "name": "eggs",
        "desc": "Particularly egg whites, a common allergen in children.",
        "translation": null
      },
      {
        "id": 7,
        "name": "garlic",
        "desc": "Though rare, garlic allergies can occur, leading to symptoms like skin rashes or respiratory discomfort.",
        "translation": null
      },
      {
        "id": 8,
        "name": "gluten",
        "desc": "Gluten, bread and pasta, lurks in processed foods like soups, dressings, or even soy sauce. ",
        "translation": null
      },
      {
        "id": 9,
        "name": "lupin",
        "desc": "A legume used in flours and baked goods, notable in Europe.",
        "translation": null
      },
      {
        "id": 10,
        "name": "milk_dairy",
        "desc": "Cows milk",
        "translation": null
      },
      {
        "id": 11,
        "name": "mustard",
        "desc": "Significant in Europe, found in sauces and condiments.",
        "translation": null
      },
      {
        "id": 12,
        "name": "peanuts",
        "desc": "Technically a legume, but listed separately due to its high allergenic potential.",
        "translation": null
      },
      {
        "id": 13,
        "name": "rice",
        "desc": "More prevalent in Asia, though less common globally.",
        "translation": null
      },
      {
        "id": 14,
        "name": "seafood_fish",
        "desc": "Beyond fish and shellfish, allergies to squid or octopus may occur.",
        "translation": null
      },
      {
        "id": 15,
        "name": "sesame",
        "desc": "Widespread in regional cuisine (e.g., tahini, halva).",
        "translation": null
      },
      {
        "id": 16,
        "name": "shellfish",
        "desc": "Crustaceans: Shrimp, crab, lobster & Mollusks: Clams, mussels, oysters, squid. ",
        "translation": null
      },
      {
        "id": 17,
        "name": "soybeans",
        "desc": "Soy Beans, Edamame and soy-based products like tofu and soy milk.",
        "translation": null
      },
      {
        "id": 18,
        "name": "sulphur_dioxide",
        "desc": "Sulphur dioxide, a preservative, hides in dried fruits, wines, and some packaged snacks.",
        "translation": null
      },
      {
        "id": 19,
        "name": "tree_nuts",
        "desc": "Includes almonds, walnuts, cashews, pistachios, pecans, hazelnuts, Brazil nuts, etc.",
        "translation": null
      },
      {
        "id": 20,
        "name": "wheat",
        "desc": "A frequent trigger, especially in children.",
        "translation": null
      },
      {
        "id": 21,
        "name": "nightshade",
        "desc": "Nightshades contain alkaloids, but the highest concentration is in the leaves and stem (questionable as an allergen), not the vegetable/fruit. Tomatoes, Potatoes, Eggplant, Peppers, Goji berries etc",
        "translation": null
      }
    ],
    "recipe_mode": [
      {
        "id": 2,
        "name": "pro",
        "desc": "Professional Recipe For Bulk Production"
      },
      {
        "id": 1,
        "name": "home",
        "desc": "Home Recipe Style"
      }
    ],
    "recipe_type": [
      {
        "id": 1,
        "name": "local",
        "desc": "A recipe only available for this recipe. i.e. Local Recipe",
        "is_default": false
      },
      {
        "id": 2,
        "name": "master",
        "desc": "A master recipe. Changes affect all recipes. i.e. Global Recipe.",
        "is_default": false
      },
      {
        "id": 3,
        "name": "unlinked_master",
        "desc": "A recipe that was a master, but unlocked for local use, but can be relinked to a master.",
        "is_default": false
      }
    ],
    "oil_purpose": [
      {
        "id": 1,
        "name": "added",
        "factor": "1",
        "desc": "100% oil added",
        "is_default": true,
        "confidence": "1"
      },
      {
        "id": 2,
        "name": "thin_coating",
        "factor": "0.75",
        "desc": "Thin coating for roasting",
        "is_default": false,
        "confidence": "0.95"
      },
      {
        "id": 4,
        "name": "deep_fry",
        "factor": "0.1",
        "desc": "Estimate - Deep Frying (High Oil Absorption)",
        "is_default": false,
        "confidence": "0.5"
      },
      {
        "id": 3,
        "name": "shallow_fry",
        "factor": "0.4",
        "desc": "Shallow Fry (Low Oil Absorption)",
        "is_default": false,
        "confidence": "0.7"
      }
    ],
    "salt_purpose": [
      {
        "id": 1,
        "name": "100% Added\n",
        "factor": "1",
        "desc": null,
        "is_default": true,
        "confidence": "1"
      },
      {
        "id": 4,
        "name": "Salt for Pasta Water (6.5% average)",
        "factor": "0.065",
        "desc": null,
        "is_default": false,
        "confidence": "0.9"
      },
      {
        "id": 6,
        "name": "Salt Added to Pasta Water (10% High Scenario)",
        "factor": "0.1",
        "desc": null,
        "is_default": false,
        "confidence": "0.9"
      },
      {
        "id": 7,
        "name": "Salt in Rice water (Boiled & Drained Method) - 10%",
        "factor": "0.1",
        "desc": null,
        "is_default": false,
        "confidence": "0.85"
      },
      {
        "id": 8,
        "name": "Salt in Rice water (Water fully absorbed) - 100%",
        "factor": "1",
        "desc": null,
        "is_default": false,
        "confidence": "0.85"
      },
      {
        "id": 9,
        "name": "Salt Added to Water to Boil Vegetables 15%",
        "factor": "0.15",
        "desc": null,
        "is_default": false,
        "confidence": "0.8"
      },
      {
        "id": 10,
        "name": "Salt Sprinkled on Vegetables with Oil - 85%\n\n",
        "factor": "0.85",
        "desc": null,
        "is_default": false,
        "confidence": "0.75"
      },
      {
        "id": 11,
        "name": "Salt in shallow frying - 80%",
        "factor": "0.8",
        "desc": null,
        "is_default": false,
        "confidence": "0.6"
      },
      {
        "id": 12,
        "name": "Salt on Air fryer foods - 85%",
        "factor": "0.85",
        "desc": null,
        "is_default": false,
        "confidence": "0.7"
      },
      {
        "id": 13,
        "name": "Salt In Cooking Water: Legumes, Beans, Lentils (12%)",
        "factor": "0.12",
        "desc": null,
        "is_default": false,
        "confidence": "0.85"
      },
      {
        "id": 14,
        "name": "Soaking Legumes, beans, and lentils overnight (3.5%)",
        "factor": "0.035",
        "desc": null,
        "is_default": false,
        "confidence": "0.75"
      },
      {
        "id": 15,
        "name": "Soaking Legumes, beans, and lentils overnight (3.5%)",
        "factor": "0.035",
        "desc": null,
        "is_default": false,
        "confidence": "0.75"
      },
      {
        "id": 5,
        "name": "Salt for Pasta Water (3% Low Scenario)",
        "factor": "0.03",
        "desc": null,
        "is_default": false,
        "confidence": "0.9"
      }
    ],
    "ingredient_type": [
      {
        "id": 2,
        "name": "step",
        "desc": "A step description in a recipe."
      },
      {
        "id": 3,
        "name": "sub",
        "desc": "A sub-recipe, can either be a link to a Master (reusable recipe), or a private recipe only used for this recipe. "
      },
      {
        "id": 1,
        "name": "ingredient",
        "desc": "An ingredient in a recipe or a component."
      }
    ],
    "markup_type": [
      {
        "id": 1,
        "name": "markup",
        "desc": "A pricing method where a fixed percentage or amount is added to the cost of preparing a meal to determine its selling price. This reflects the additional value or profit the company wants to earn beyond the base cost (e.g."
      },
      {
        "id": 2,
        "name": "margin",
        "desc": "A pricing method based on the desired profit percentage relative to the selling price of the meal. The margin is calculated as the profit divided by the selling price"
      },
      {
        "id": 3,
        "name": "x_cost",
        "desc": "A pricing method where the meal’s selling price is determined by multiplying the total cost (e.g."
      },
      {
        "id": 0,
        "name": "Unknown",
        "desc": "Please select a type"
      }
    ],
    "markup": [
      {
        "id": 0,
        "name": "Unknown",
        "org_uuid": "1",
        "desc": "Please select a markup option",
        "markup_type_id": 1,
        "factor": "0",
        "markup_type": {
          "id": 1,
          "name": "markup",
          "desc": "A pricing method where a fixed percentage or amount is added to the cost of preparing a meal to determine its selling price. This reflects the additional value or profit the company wants to earn beyond the base cost (e.g."
        }
      },
      {
        "id": 15,
        "name": "30% Margin",
        "org_uuid": "1",
        "desc": "30% margin on total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 2,
        "factor": "0.3",
        "markup_type": {
          "id": 2,
          "name": "margin",
          "desc": "A pricing method based on the desired profit percentage relative to the selling price of the meal. The margin is calculated as the profit divided by the selling price"
        }
      },
      {
        "id": 14,
        "name": "40% Margin",
        "org_uuid": "1",
        "desc": "40% margin on total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 2,
        "factor": "0.4",
        "markup_type": {
          "id": 2,
          "name": "margin",
          "desc": "A pricing method based on the desired profit percentage relative to the selling price of the meal. The margin is calculated as the profit divided by the selling price"
        }
      },
      {
        "id": 1,
        "name": "50% Markup",
        "org_uuid": "1",
        "desc": "50% Markup on total costs (ingredients + packaging + others)",
        "markup_type_id": 1,
        "factor": "0.5",
        "markup_type": {
          "id": 1,
          "name": "markup",
          "desc": "A pricing method where a fixed percentage or amount is added to the cost of preparing a meal to determine its selling price. This reflects the additional value or profit the company wants to earn beyond the base cost (e.g."
        }
      },
      {
        "id": 10,
        "name": "50% Margin",
        "org_uuid": "1",
        "desc": "50% margin on total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 2,
        "factor": "0.5",
        "markup_type": {
          "id": 2,
          "name": "margin",
          "desc": "A pricing method based on the desired profit percentage relative to the selling price of the meal. The margin is calculated as the profit divided by the selling price"
        }
      },
      {
        "id": 2,
        "name": "60% Markup",
        "org_uuid": "1",
        "desc": "60% Markup on total costs (ingredients + packaging costs + other costs)",
        "markup_type_id": 1,
        "factor": "0.6",
        "markup_type": {
          "id": 1,
          "name": "markup",
          "desc": "A pricing method where a fixed percentage or amount is added to the cost of preparing a meal to determine its selling price. This reflects the additional value or profit the company wants to earn beyond the base cost (e.g."
        }
      },
      {
        "id": 11,
        "name": "60% Margin",
        "org_uuid": "1",
        "desc": "60% margin on total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 2,
        "factor": "0.6",
        "markup_type": {
          "id": 2,
          "name": "margin",
          "desc": "A pricing method based on the desired profit percentage relative to the selling price of the meal. The margin is calculated as the profit divided by the selling price"
        }
      },
      {
        "id": 12,
        "name": "70% Margin",
        "org_uuid": "1",
        "desc": "70% margin on total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 2,
        "factor": "0.7",
        "markup_type": {
          "id": 2,
          "name": "margin",
          "desc": "A pricing method based on the desired profit percentage relative to the selling price of the meal. The margin is calculated as the profit divided by the selling price"
        }
      },
      {
        "id": 3,
        "name": "70% Markup",
        "org_uuid": "1",
        "desc": "70% Markup on total costs (ingredient costs + packaging costs + other costs)",
        "markup_type_id": 1,
        "factor": "0.7",
        "markup_type": {
          "id": 1,
          "name": "markup",
          "desc": "A pricing method where a fixed percentage or amount is added to the cost of preparing a meal to determine its selling price. This reflects the additional value or profit the company wants to earn beyond the base cost (e.g."
        }
      },
      {
        "id": 4,
        "name": "80% Markup",
        "org_uuid": "1",
        "desc": "80% Markup on total costs (ingredients + packaging + other costs)",
        "markup_type_id": 1,
        "factor": "0.8",
        "markup_type": {
          "id": 1,
          "name": "markup",
          "desc": "A pricing method where a fixed percentage or amount is added to the cost of preparing a meal to determine its selling price. This reflects the additional value or profit the company wants to earn beyond the base cost (e.g."
        }
      },
      {
        "id": 13,
        "name": "80% Margin",
        "org_uuid": "1",
        "desc": "80% margin on total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 2,
        "factor": "0.8",
        "markup_type": {
          "id": 2,
          "name": "margin",
          "desc": "A pricing method based on the desired profit percentage relative to the selling price of the meal. The margin is calculated as the profit divided by the selling price"
        }
      },
      {
        "id": 5,
        "name": "1.5x cost",
        "org_uuid": "1",
        "desc": "1.5x total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 3,
        "factor": "1.5",
        "markup_type": {
          "id": 3,
          "name": "x_cost",
          "desc": "A pricing method where the meal’s selling price is determined by multiplying the total cost (e.g."
        }
      },
      {
        "id": 7,
        "name": "1.75x cost",
        "org_uuid": "1",
        "desc": "1.75x total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 3,
        "factor": "1.75",
        "markup_type": {
          "id": 3,
          "name": "x_cost",
          "desc": "A pricing method where the meal’s selling price is determined by multiplying the total cost (e.g."
        }
      },
      {
        "id": 6,
        "name": "2x cost",
        "org_uuid": "1",
        "desc": "2x total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 3,
        "factor": "2",
        "markup_type": {
          "id": 3,
          "name": "x_cost",
          "desc": "A pricing method where the meal’s selling price is determined by multiplying the total cost (e.g."
        }
      },
      {
        "id": 8,
        "name": "2.5x cost",
        "org_uuid": "1",
        "desc": "2.5x total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 3,
        "factor": "2.5",
        "markup_type": {
          "id": 3,
          "name": "x_cost",
          "desc": "A pricing method where the meal’s selling price is determined by multiplying the total cost (e.g."
        }
      },
      {
        "id": 9,
        "name": "3x cost",
        "org_uuid": "1",
        "desc": "3x total cost price (ingredients + packaging + other costs)",
        "markup_type_id": 3,
        "factor": "3",
        "markup_type": {
          "id": 3,
          "name": "x_cost",
          "desc": "A pricing method where the meal’s selling price is determined by multiplying the total cost (e.g."
        }
      }
    ],
    "todo_status": [
      {
        "id": 1,
        "name": "Awaiting Action"
      },
      {
        "id": 2,
        "name": "Completed"
      },
      {
        "id": 3,
        "name": "Deleted"
      }
    ],
    "other_costs_category": [
      {
        "id": 3,
        "org_uuid": "1",
        "name": "350g meal extra costs (Test)",
        "desc": "Extra costs associated with a 350g plated meal",
        "recipeUuid": null
      },
      {
        "id": 4,
        "org_uuid": "1",
        "name": "265g meal extra costs",
        "desc": "Extra costs associated with a 265g plated meal (test)",
        "recipeUuid": null
      },
      {
        "id": 0,
        "org_uuid": "1",
        "name": "Unknown",
        "desc": "Please select a cost category.",
        "recipeUuid": null
      }
    ],
    "other_costs_line_items_lookup": [
      {
        "id": 2,
        "name": "Film",
        "desc": "Clear film",
        "supplier_id": 1,
        "cost": "0.45",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "3,4"
      },
      {
        "id": 4,
        "name": "Label (100x50mm)",
        "desc": "Heat print label",
        "supplier_id": 1,
        "cost": "0.2",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "3,4"
      },
      {
        "id": 5,
        "name": "Outer Box (12 meals)",
        "desc": "Generic outer box",
        "supplier_id": 1,
        "cost": "6.25",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "3,4"
      },
      {
        "id": 6,
        "name": "Outer Box Label (50x50mm)",
        "desc": "Heat Printable Label",
        "supplier_id": 1,
        "cost": "0.1",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "3,4"
      },
      {
        "id": 8,
        "name": "Printed Sleeve (265g meal)",
        "desc": "Smaller Printed Sleeve",
        "supplier_id": 1,
        "cost": "2.2",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "4"
      },
      {
        "id": 3,
        "name": "Printed Sleeve - 350g ",
        "desc": "Full Printed Sleeve",
        "supplier_id": 1,
        "cost": "2.7",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "3"
      },
      {
        "id": 7,
        "name": "Tape",
        "desc": "Box Tape",
        "supplier_id": 1,
        "cost": "2.5",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "3,4"
      }
    ],
    "packaging_costs_category": [
      {
        "id": 3,
        "org_uuid": "1",
        "name": "265g Container + Lid (0001)",
        "desc": "Small Meal",
        "is_active": true,
        "recipeUuid": null
      },
      {
        "id": 4,
        "org_uuid": "1",
        "name": "350g Container (0002)",
        "desc": "Medium Meal",
        "is_active": true,
        "recipeUuid": null
      },
      {
        "id": 5,
        "org_uuid": "1",
        "name": "700g Container + Lid (0003)",
        "desc": "Large Meal",
        "is_active": true,
        "recipeUuid": null
      },
      {
        "id": 6,
        "org_uuid": "1",
        "name": "1400g Container (0004)",
        "desc": "XL Meal",
        "is_active": true,
        "recipeUuid": null
      },
      {
        "id": 0,
        "org_uuid": "1",
        "name": "Unknown",
        "desc": "Please select or create a cost category.",
        "is_active": true,
        "recipeUuid": null
      }
    ],
    "packaging_costs_line_items_lookup": [
      {
        "id": 7,
        "name": "1400g Foil Container",
        "desc": "Foil XL",
        "supplier_id": 1,
        "cost": "9.83",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "6"
      },
      {
        "id": 11,
        "name": "1400g Plastic Lid",
        "desc": "Plastic",
        "supplier_id": 1,
        "cost": "3.65",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "6"
      },
      {
        "id": 8,
        "name": "265g/350g Plastic Lid",
        "desc": "Plastic Clip On",
        "supplier_id": 1,
        "cost": "1.35",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "3"
      },
      {
        "id": 4,
        "name": "265g Container",
        "desc": "Foil Small",
        "supplier_id": 1,
        "cost": "1.76",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "3"
      },
      {
        "id": 5,
        "name": "350g Foil Container",
        "desc": "Foil Medium",
        "supplier_id": 1,
        "cost": "2.37",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "3,4"
      },
      {
        "id": 6,
        "name": "700g Foil Container",
        "desc": "Foil Large",
        "supplier_id": 1,
        "cost": "4.83",
        "is_active": true,
        "org_uuid": "1",
        "category_ids": "5"
      }
    ],
    "vat_rules": [
      {
        "id": 2,
        "name": "15% VAT",
        "cost": "0.15",
        "description": "15% VAT",
        "org_uuid": "1",
        "default": true
      },
      {
        "id": 0,
        "name": "0% VAT",
        "cost": "0",
        "description": "Zero VAT",
        "org_uuid": "1",
        "default": false
      }
    ],

    "org": {
      "uuid": "1",
      "username": "heyWayneKTest",
      "emails": [
        {
          "val": "wayne@recipee.app",
          "default": true
        },
        {
          "val": "wayne@fitchef.co.za"
        }
      ],
      "phone_numbers": [
        {
          "val": "+447562212249",
          "default": true
        },
        {
          "val": "+447562212248"
        }
      ],
      "last_sign_in_at": "2025-07-21T16:01:28.801Z",
      "json": [
        {
          "val": "spare value 1",
          "default": true
        },
        {
          "val": "spare value 2"
        }
      ],
      "unit_metric_imperial_name": "metric",
      "vat_number": "VAT123456",
      "country_locale_id": 1,
      "country_locale": {
        "id": 1,
        "country_code": "GB",
        "country_name": "United Kingdom",
        "currency_code": "GBP",
        "currency_name": "British Pound",
        "currency_symbol": "£",
        "language_code": "en",
        "locale": "en-GB",
        "date_format": "DD/MM/YYYY",
        "decimal_separator": ".",
        "time_zone": "Europe/London"
      }
    }
  }

*/
