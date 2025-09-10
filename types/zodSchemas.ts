import { z } from 'zod';
import { enum_macro_micro_indent, enum_macro_micro_primary_category, enum_macro_micro_unit } from "@prisma/client";
import Decimal from 'decimal.js';

export const portionSizeSchema = z.object({
  id: z.number(),
  portion_g: z.union([z.number(), z.string().transform(v => parseFloat(v))]),
});

export const recipeDataRuleSchema = z.object({
  pid: z.number(),
  rule: z.number(),
});

export const nutriPer100Schema = z.object({
  name: z.string(),
  value_per_100g: z.number(),
  unit: z.string(),
});

export const brandSchema = z.object({
  id: z.number(),
  name: z.string(),
  logoSrc: z.string(),
});

export const customerSchema = z.object({
  id: z.number(),
  name: z.string(),
  logoSrc: z.string(),
});

export const fqSchema = z.object({
    id: z.number().optional(),
    positive: z.number(),
    negative: z.number(),
    neutral: z.number(),
    overall: z.number(),
    positiveTxt: z.string(),
    negativeTxt: z.string(),
    neutralTxt: z.string(),
    overallTxt: z.string(),
});

export const recipeDetailRowSchema = z.object({
    uuid: z.string(),
    name_extra_info: z.string().nullable(),
    sub_recipe_id: z.string().nullable(),
    diet_classification: z.string(),
    order: z.number(),
    type: z.string(),
    ingredient_type: z.string(),
    step_instruction: z.string().nullable(),
    supplier: z.string(),
    qty_g: z.number().transform(v => new Decimal(v)),
    qty_estimated_from_home_g: z.number().nullable(),
    qty_estimated_confidence: z.number().nullable(),
    home_qty_frac_numerator: z.number().nullable(),
    home_qty_frac_denominator: z.number().nullable(),
    home_qty: z.number().nullable(),
    home_qty_type: z.string().nullable(),
    unit_type: z.string(),
    cost_per_1000g: z.number().transform(v => new Decimal(v)),
    rationalised_recipe: z.string(),
    fq_score: fqSchema,
    needs_prep: z.boolean(),
    is_salt: z.boolean(),
    is_oil: z.boolean(),
    oil_purpose: z.string(),
});

export const recipesInDataSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  cost_per_1000g: z.number(),
  brand: brandSchema,
  customer: customerSchema,
  recipe_detail: z.array(recipeDetailRowSchema),
  method: z.string(),
  rationalised_recipe: z.string().optional(),
  yield: z.union([z.number(), z.string()]).transform(v => new Decimal(v)).nullable(),
  order: z.number(),
  version: z.string().optional(),
  versions: z.array(z.string()).optional(),
  ingredient_id: z.number().nullable().optional(),
  portions: z.array(portionSizeSchema),
  nutri_per_100g: z.array(nutriPer100Schema).optional(),
});

export const dataSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  desc: z.string(),
  yield: z.union([z.number(), z.string()]).transform(v => new Decimal(v)).nullable(),
  portions: z.array(portionSizeSchema),
  packagingCostsId: z.array(recipeDataRuleSchema),
  otherCostsId: z.array(recipeDataRuleSchema),
  markupId: z.array(recipeDataRuleSchema),
  vatRulesId: z.array(recipeDataRuleSchema),
  recipes: z.array(recipesInDataSchema),
});

export const preCalculatedRecipeDataSchema = z.object({
  isHome: z.boolean(),
  isImperial: z.boolean(),
  componentsIDArray: z.array(z.string()),
  componentsNamesArray: z.array(z.string()),
  componentsPricePer1000g: z.array(z.number().transform(v => new Decimal(v))),
  componentsPrices: z.array(z.array(z.number().transform(v => new Decimal(v)))),
  componentsPricesDesc: z.array(z.array(z.array(z.string()))),
  componentsSubTotalsPrices: z.array(z.number().transform(v => new Decimal(v))),
  componentsWeights: z.array(z.array(z.number().transform(v => new Decimal(v)))),
  costsSubTotals: z.array(z.number().transform(v => new Decimal(v))),
  markUpPriceAmounts: z.array(z.number().transform(v => new Decimal(v))),
  markUpPriceRuleName: z.array(z.string()),
  markUpPriceRules: z.array(z.number()),
  measurementUnitsObj: z.object({
    weight: z.array(z.string()),
    fluid: z.array(z.string()),
    each: z.array(z.string()),
  }),
  otherCostsPriceRules: z.array(z.number()),
  otherCostsPriceTotals: z.array(z.number().transform(v => new Decimal(v))),
  packingCostPriceRules: z.array(z.number()),
  packingCostPriceTotals: z.array(z.number().transform(v => new Decimal(v))),
  portionIds: z.array(z.number()),
  portionSizes: z.array(z.number().transform(v => new Decimal(v))),
  salePricesExVat: z.array(z.number().transform(v => new Decimal(v))),
  salesPricesIncVat: z.array(z.number().transform(v => new Decimal(v))),
  vatRuleIds: z.array(z.number()),
  vatRuleNames: z.array(z.string()),
  vatRulePercs: z.array(z.number().transform(v => new Decimal(v))),
  data: dataSchema,
  currencySymbol: z.string(),
});

export const unitTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    desc: z.string().nullable(),
    imperial: z.string().nullable(),
    metric: z.string().nullable(),
});

export const unitMetricImperialSchema = z.object({
    id: z.number(),
    name: z.string(),
    is_default: z.boolean().nullable(),
});

export const prepInstructionsSchema = z.object({
    id: z.number(),
    name: z.string(),
    desc: z.string().nullable(),
    imperial: z.string().nullable(),
    metric: z.string().nullable(),
    translation: z.any().nullable(),
    yield: z.union([z.number(), z.string()]).transform(v => new Decimal(v)).nullable(),
});

export const cookedYieldsCategoriesSchema = z.object({
    id: z.number(),
    name: z.string(),
    translation: z.any().nullable(),
    desc: z.string().nullable(),
    yield: z.union([z.number(), z.string()]).transform(v => new Decimal(v)).nullable(),
    is_live: z.boolean().optional(),
});

export const dryCookedYieldsCategoriesSchema = z.object({
    id: z.number(),
    name: z.string(),
    desc: z.string().nullable(),
    translation: z.any().nullable(),
    yield: z.union([z.number(), z.string()]).transform(v => new Decimal(v)).nullable(),
});

export const dryCookedYieldsSchema = z.object({
    id: z.number(),
    name: z.string(),
    desc: z.string().nullable(),
    translation: z.any().nullable(),
    yield: z.union([z.number(), z.string()]).transform(v => new Decimal(v)).nullable(),
});

export const ingredientsReligiousCertificationSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const languageSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const macroMicroSchema = z.object({
    id: z.number(),
    name: z.string(),
    full_name: z.string(),
    primary_category: z.nativeEnum(enum_macro_micro_primary_category),
    secondary_category: z.string().nullable(),
    unit: z.nativeEnum(enum_macro_micro_unit),
    indent: z.nativeEnum(enum_macro_micro_indent),
    short_name: z.string(),
    order: z.number(),
});

export const ingredientCategoryPrimarySchema = z.object({
    id: z.number(),
    name: z.string(),
    translation: z.any().nullable(),
});

export const ingredientCategorySecondarySchema = z.object({
    id: z.number(),
    name: z.string(),
    translation: z.any().nullable(),
    ingredient_category_primary_id: z.number(),
});

export const dietaryClassificationSchema = z.object({
    id: z.number(),
    name: z.string(),
    translation: z.any().nullable(),
});

export const allergySchema = z.object({
    id: z.number(),
    name: z.string(),
    desc: z.string(),
    translation: z.any().nullable(),
});

export const recipeModeSchema = z.object({
    id: z.number(),
    name: z.string(),
    desc: z.string().nullable(),
});

export const recipeTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    desc: z.string().nullable(),
    is_default: z.boolean(),
});

export const oilPurposeSchema = z.object({
    id: z.number(),
    name: z.string(),
    factor: z.union([z.number(), z.string()]).transform(v => new Decimal(v)),
    desc: z.string().nullable(),
    is_default: z.boolean(),
    confidence: z.union([z.number(), z.string()]).transform(v => new Decimal(v))).nullable(),
});

export const saltPurposeSchema = z.object({
    id: z.number(),
    name: z.string(),
    factor: z.union([z.number(), z.string()]).transform(v => new Decimal(v)),
    desc: z.string().nullable(),
    is_default: z.boolean(),
    confidence: z.union([z.number(), z.string()]).transform(v => new Decimal(v))).nullable(),
});

export const ingredientTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    desc: z.string(),
});

export const markupTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    desc: z.string().nullable(),
});

export const markupSchema = z.object({
    id: z.number(),
    name: z.string(),
    org_uuid: z.string(),
    desc: z.string(),
    markup_type_id: z.number(),
    factor: z.union([z.number(), z.string()]).transform(v => new Decimal(v)),
    markup_type: markupTypeSchema,
});

export const todoStatusSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const otherCostsCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const lineItemsLookupSchema = z.object({
    id: z.number(),
    name: z.string(),
    desc: z.string(),
    supplier_id: z.number().nullable(),
    cost: z.union([z.number(), z.string()]).transform(v => new Decimal(v)),
    is_active: z.boolean(),
    org_uuid: z.string(),
    category_ids: z.string(),
});

export const packagingCostsCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const vatRulesSchema = z.object({
    id: z.number(),
    name: z.string(),
    cost: z.union([z.number(), z.string()]).transform(v => new Decimal(v)),
    description: z.string(),
    org_uuid: z.string(),
    default: z.boolean(),
});

export const orgSchema = z.object({
    uuid: z.string(),
    username: z.string().nullable(),
    emails: z.any().nullable(),
    phone_numbers: z.any().nullable(),
    last_sign_in_at: z.date().nullable(),
    json: z.any().nullable(),
    unit_metric_imperial_name: z.string(),
    vat_number: z.string().nullable(),
    country_locale_id: z.number(),
    country_locale: z.object({
        id: z.number(),
        country_code: z.string(),
        country_name: z.string(),
        currency_code: z.string(),
        currency_name: z.string(),
        currency_symbol: z.string(),
        language_code: z.string(),
        locale: z.string(),
        date_format: z.string(),
        decimal_separator: z.string(),
        time_zone: z.string(),
    }),
});

export const systemDataSchema = z.object({
    unit_type: z.array(unitTypeSchema),
    unit_metric_imperial: z.array(unitMetricImperialSchema),
    prep_instructions: z.array(prepInstructionsSchema),
    cooked_yields_categories: z.array(cookedYieldsCategoriesSchema),
    dry_cooked_yields_categories: z.array(dryCookedYieldsCategoriesSchema),
    dry_cooked_yields: z.array(dryCookedYieldsSchema),
    ingredients_religious_certification: z.array(ingredientsReligiousCertificationSchema),
    language: z.array(languageSchema),
    macro_micro: z.array(macroMicroSchema),
    ingredient_category_primary: z.array(ingredientCategoryPrimarySchema),
    ingredient_category_secondary: z.array(ingredientCategorySecondarySchema),
    dietary_classification: z.array(dietaryClassificationSchema),
    allergy: z.array(allergySchema),
    recipe_mode: z.array(recipeModeSchema),
    recipe_type: z.array(recipeTypeSchema),
    oil_purpose: z.array(oilPurposeSchema),
    salt_purpose: z.array(saltPurposeSchema),
    ingredient_type: z.array(ingredientTypeSchema),
    markup_type: z.array(markupTypeSchema),
    markup: z.array(markupSchema),
    todo_status: z.array(todoStatusSchema),
    other_costs_category: z.array(otherCostsCategorySchema),
    other_costs_line_items_lookup: z.array(lineItemsLookupSchema),
    packaging_costs_category: z.array(packagingCostsCategorySchema),
    packaging_costs_line_items_lookup: z.array(lineItemsLookupSchema),
    vat_rules: z.array(vatRulesSchema),
    org: orgSchema.nullable(),
});
