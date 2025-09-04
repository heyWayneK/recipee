import { Prisma, enum_macro_micro_indent, enum_macro_micro_primary_category, enum_macro_micro_unit } from "@prisma/client";

import Decimal from "decimal.js";

import React from "react";
import { Recipe_detail_rowPosts } from "./recipeTypes_prisma";

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

// export type ComponentsProps2 = Prisma.recipe_detail_rowSelect;
// export type ComponentsProps = Prisma.recipe_detail_rowInclude;

// INFO: What We Expect from JSON from DB
export interface ComponentsInDataProps {
  name: string;
  uuid: string;
  recipe_id: string;
  order: number;
  version?: string;
  versions: string[];
  // type?: recipe_row_types;
  // TODO: need proper Ingredient relation
  ingredient_id?: number | null;
  // parentId?: null | number;
  portions: PortionSizeChildProps[];
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

// The shape of Recipe data after conversion from JSON to correct types
export interface DataProps {
  // CORRECT SHAPE 27 Aug 2025???? not
  readonly uuid: string;
  name: string;
  desc: string;

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
  components: ComponentsInDataProps[];
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
  //
  // recipe_portions: [] | portionSizeProps[];
  // packaging_costs_on_recipe: [] | recipeDataRuleProps;
  // other_costs_on_recipe: [] | recipeDataRuleProps;
  // markup_on_recipe: [] | recipeDataRuleProps;
  // vat_on_recipe: [] | recipeDataRuleProps;
  // recipe_components_on_recipe: [] | ComponentsInDataProps[];

  // recipe_portions: portionSizeProps[];
  // packaging_costs_on_recipe: recipeDataRuleProps;
  // other_costs_on_recipe: recipeDataRuleProps;
  // markup_on_recipe: recipeDataRuleProps;
  // vat_on_recipe: recipeDataRuleProps;
  // recipe_components_on_recipe: ComponentsInDataProps[];
  // recipes: RecipesInDataProps[];

  /* live db shape eg
    uuid: '1234567890',
    name: '<p>Wayne. gggg 08h23ss s2</p>',
    desc: '<p>Wayne Test Live UPDATED 2333</p>',
    is_live: true,
    org_uuid: '1',
    brand_uuid: '123',
    recipe_type_name: 'master',
    recipe_mode_name: 'pro',
    created_at: 2025-07-29T12:40:23.000Z,
    updated_at: 2025-08-23T16:42:15.820Z,
    recipe_portions: [ [Object], [Object] ],
    packaging_costs_on_recipe: [ [Object], [Object] ],
    other_costs_on_recipe: [ [Object], [Object] ],
    markup_on_recipe: [ [Object], [Object] ],
    vat_on_recipe: [ [Object], [Object] ],
    recipe_components_on_recipe: [ [Object], [Object], [Object], [Object], [Object] ]
  */
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

export type PortionSizeChildProps = Omit<portionSizeProps, "order">;

export interface portionSizeProps {
  id: number;
  qty_g: number;
  order: number;
}

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
export type recipe_row_types_type = "ingredient" | "step" | "sub";

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

export type ingredients_religious_certification_type = "no" | "yes" | "likely" | "likely" | "unknown";

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
  ingredients: IngredientTypeSelect[];
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
