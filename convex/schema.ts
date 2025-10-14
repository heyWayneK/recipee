import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  // CUSTOMER
  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  org: defineTable({
    name: v.string(),
    address: v.string(),
    logo: v.optional(v.string()),
    active: v.boolean(), // Prisma default: true
    payment_options: v.string(),
    contacts: v.string(),
    username: v.optional(v.string()),
    emails: v.optional(v.any()), // Prisma type: Json
    phone_numbers: v.optional(v.any()), // Prisma type: Json
    last_sign_in_at: v.optional(v.number()), // Prisma default: now()
    json: v.optional(v.any()),
    unit_metric_imperial_name: v.string(), // Prisma default: "metric"
    vat_number: v.optional(v.string()),
    country_locale_id: v.id("country_locale"),
    recipe_mode_name: v.string(), // Prisma default: "home"
  }),

  supplier: defineTable({
    org_id: v.id("org"),
    name: v.string(),
    vat: v.optional(v.string()),
    corporation_number: v.optional(v.string()),
    logo: v.optional(v.string()),
    email: v.optional(v.string()),
    tel: v.optional(v.string()),
    cell: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
    account_email: v.optional(v.string()),
    account_name: v.optional(v.string()),
    account_tel: v.optional(v.string()),
  }),

  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  // USER
  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  brand: defineTable({
    name: v.string(),
    logoSrc: v.optional(v.string()),
    org_id: v.id("org"),
  }),

  markup: defineTable({
    org_id: v.id("org"),
    name: v.string(),
    factor: v.string(), // Prisma type: Decimal
    markup_type_id: v.id("markup_type"),
    desc: v.string(),
    recipe_id: v.optional(v.string()),
  }),

  member: defineTable({
    email: v.optional(v.string()),
    email_verified: v.optional(v.number()),
    image: v.optional(v.string()),
    org_id: v.optional(v.string()),
    price_id: v.optional(v.string()),
    hasAccess: v.optional(v.boolean()),
    avatar_url: v.optional(v.string()),
    roles: v.optional(v.any()), // Prisma type: Json
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
  }).index("by_email", ["email"]),

  VerificationToken: defineTable({
    identifier: v.string(),
    token: v.string(),
    expires: v.number(),
  }).index("by_identifier_token", ["identifier", "token"]),

  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  // SETTINGS
  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  unit_type: defineTable({
    name: v.string(),
    desc: v.optional(v.string()),
    imperial: v.string(),
    metric: v.string(),
  }),

  unit_metric_imperial: defineTable({
    name: v.string(),
    is_default: v.optional(v.boolean()), // Prisma default: false
  }).index("by_name", ["name"]),

  prep_instructions: defineTable({
    name: v.string(),
    translation: v.optional(v.any()), // Prisma type: Json
    metric: v.optional(v.string()),
    imperial: v.optional(v.string()),
    desc: v.optional(v.string()),
    yield: v.optional(v.string()), // Prisma type: Decimal
    is_live: v.boolean(), // Prisma default: true
  }).index("by_name", ["name"]),

  raw_to_prepped_yields: defineTable({
    whole: v.string(), // Prisma type: Decimal
    peeled: v.string(), // Prisma type: Decimal
    peeled_and_cored: v.string(), // Prisma type: Decimal
    diced: v.string(), // Prisma type: Decimal
    sliced: v.string(), // Prisma type: Decimal
    grated: v.string(), // Prisma type: Decimal
    ingredients_id: v.id("ingredients"),
    custom: v.optional(v.string()), // Prisma type: Decimal, default: 0.00
    custom_name: v.optional(v.string()), // Prisma default: "Custom"
  }).index("by_ingredients_id", ["ingredients_id"]),

  cooked_yields_categories: defineTable({
    name: v.string(),
    translation: v.optional(v.any()), // Prisma type: Json
    desc: v.string(),
    yield: v.string(), // Prisma type: Decimal
    is_live: v.boolean(), // Prisma default: true
  }),

  dry_cooked_yields_categories: defineTable({
    name: v.string(),
    translation: v.optional(v.any()), // Prisma type: Json
    desc: v.optional(v.string()),
    yield: v.optional(v.string()), // Prisma type: Decimal
    is_live: v.boolean(), // Prisma default: true
    primary_category_id: v.id("ingredient_category_primary"),
  }),

  dry_cooked_yields: defineTable({
    name: v.string(),
    translation: v.optional(v.any()), // Prisma type: Json
    desc: v.optional(v.string()),
    yield: v.optional(v.string()), // Prisma type: Decimal
    is_live: v.boolean(), // Prisma default: true
    dry_cooked_yields_categories_id: v.optional(v.id("dry_cooked_yields_categories")),
  }),

  ingredients_religious_certification: defineTable({
    name: v.string(), // Prisma default: "unknown"
  }),

  language: defineTable({
    name: v.string(),
    code: v.string(),
    is_active: v.boolean(), // Prisma default: true
  }).index("by_name", ["name"]),

  country_locale: defineTable({
    country_name: v.string(),
    country_code: v.string(),
    currency_code: v.string(),
    currency_name: v.string(),
    currency_symbol: v.string(),
    language_code: v.string(),
    locale: v.string(),
    time_zone: v.string(),
    date_format: v.string(),
    decimal_separator: v.string(),
    is_active: v.boolean(), // Prisma default: true
    language_id: v.id("language"),
  }).index("by_country_name", ["country_name"]),

  prepped_to_cooked_yields: defineTable({
    ingredients_id: v.id("ingredients"),
    raw: v.string(), // Prisma type: Decimal
    cooked: v.string(), // Prisma type: Decimal
    deep_fry: v.string(), // Prisma type: Decimal
    shallow_fry: v.string(), // Prisma type: Decimal
    boiled: v.string(), // Prisma type: Decimal
    roasted: v.string(), // Prisma type: Decimal
    custom: v.optional(v.string()), // Prisma type: Decimal, default: 0.00
    custom_name: v.optional(v.string()), // Prisma default: "Custom"
  }).index("by_ingredients_id", ["ingredients_id"]),

  home_mode_units: defineTable({
    name: v.string(),
    order: v.number(), // Prisma default: 1
    desc: v.optional(v.string()),
    primary_category_ids: v.optional(v.string()),
    group: v.optional(v.string()),
    default_g: v.string(), // Prisma type: Decimal, default: 0.00
    default_g_conf: v.string(), // Prisma type: Decimal, default: 0.00
    fluid_g: v.string(), // Prisma type: Decimal, default: 0.00
    fluid_g_conf: v.string(), // Prisma type: Decimal, default: 0.00
    weight_g: v.string(), // Prisma type: Decimal, default: 0.00
    weight_g_conf: v.string(), // Prisma type: Decimal, default: 0.00
    is_default: v.boolean(), // Prisma default: false
  }).index("by_name", ["name"]),

  // need to use this table
  home_units_on_category_primary: defineTable({
    home_mode_units_id: v.id("home_mode_units"),
    ingredient_category_primary_id: v.id("ingredient_category_primary"),
  }).index("by_unit_and_category", ["home_mode_units_id", "ingredient_category_primary_id"]),

  ingredient_category_primary: defineTable({
    name: v.string(),
    translation: v.optional(v.any()), // Prisma type: Json
  }),

  ingredient_category_secondary: defineTable({
    name: v.string(),
    ingredient_category_primary_id: v.id("ingredient_category_primary"),
    translation: v.optional(v.any()), // Prisma type: Json
  }),

  dietary_classification: defineTable({
    name: v.string(),
    translation: v.optional(v.any()), // Prisma type: Json
  }).index("by_name", ["name"]),

  allergy: defineTable({
    org_id: v.id("org"),
    name: v.string(),
    desc: v.string(),
    translation: v.optional(v.any()), // Prisma type: Json
  }),

  oil_purpose: defineTable({
    name: v.string(),
    factor: v.string(), // Prisma type: Decimal
    desc: v.optional(v.string()),
    is_default: v.boolean(), // Prisma default: false
    confidence: v.optional(v.string()), // Prisma type: Decimal
  }),

  salt_purpose: defineTable({
    name: v.string(),
    factor: v.string(), // Prisma type: Decimal
    desc: v.optional(v.string()),
    is_default: v.boolean(), // Prisma default: false
    confidence: v.optional(v.string()), // Prisma type: Decimal
  }),

  todo_status: defineTable({
    org_id: v.id("org"),
    name: v.string(),
  }),

  markup_type: defineTable({
    name: v.string(),
    desc: v.optional(v.string()),
  }),

  ingredient_type: defineTable({
    name: v.string(),
    desc: v.string(),
  }).index("by_name", ["name"]),

  other_costs_category: defineTable({
    org_id: v.id("org"),
    name: v.string(),
    desc: v.string(),
  }),

  other_costs_lookup: defineTable({
    org_id: v.id("org"),
    other_costs_category_id: v.id("other_costs_category"),
    other_costs_line_item_id: v.id("other_costs_line_item"),
  }).index("by_category_and_item", ["other_costs_category_id", "other_costs_line_item_id"]),

  other_costs_line_item: defineTable({
    name: v.string(),
    cost: v.string(), // Prisma type: Decimal
    desc: v.string(),
    supplier_id: v.optional(v.id("supplier")),
    is_active: v.boolean(), // Prisma default: true
    org_id: v.optional(v.id("org")),
  }),

  packaging_costs_category: defineTable({
    org_id: v.id("org"),
    name: v.string(),
    desc: v.string(),
    is_active: v.boolean(), // Prisma default: true
  }),

  packaging_costs_lookup: defineTable({
    packaging_costs_category_id: v.id("packaging_costs_category"),
    packaging_costs_line_item_id: v.id("packaging_costs_line_item"),
    org_id: v.id("org"),
  }).index("by_category_and_item", ["packaging_costs_category_id", "packaging_costs_line_item_id"]),

  packaging_costs_line_item: defineTable({
    name: v.string(),
    cost: v.string(), // Prisma type: Decimal
    desc: v.string(),
    is_active: v.boolean(), // Prisma default: true
    supplier_id: v.optional(v.id("supplier")),
    org_id: v.id("org"),
  }),

  vat_rules: defineTable({
    org_id: v.id("org"),
    name: v.string(),
    cost: v.string(), // Prisma type: Decimal
    description: v.string(),
    is_active: v.boolean(), // Prisma default: true
    default: v.boolean(), // Prisma default: false
  }).index("by_org_and_default", ["org_id", "default"]),

  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  // RECIPE
  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  ingredients: defineTable({
    name: v.string(),
    name_orig: v.optional(v.string()),
    names_alt: v.optional(v.string()),
    org_id: v.id("org"),
    is_default: v.boolean(), // Prisma default: false
    translation: v.optional(v.any()), // Prisma type: Json
    primary_category_id: v.optional(v.id("ingredient_category_primary")), // Prisma default: 0
    secondary_category: v.optional(v.string()),
    unit_type_id: v.optional(v.id("unit_type")), // Prisma default: 1
    dietary_classification_id: v.optional(v.id("dietary_classification")), // Prisma default: 0
    kosher_id: v.optional(v.id("ingredients_religious_certification")), // Prisma default: 4
    halal_id: v.optional(v.id("ingredients_religious_certification")), // Prisma default: 4
    confidence: v.optional(v.string()), // Prisma type: Decimal, default: 0.00
    is_oil: v.boolean(), // Prisma default: false
    is_salt: v.boolean(), // Prisma default: false
    // allergy_custom: v.optional(v.string()),
    ai_model: v.optional(v.string()),
    // allergy_id: v.optional(v.id("allergy")), no needed... used on lookup tables.
    deleted: v.optional(v.boolean()), // Prisma default: false
  }).index("by_name_and_org", ["name", "org_id"]),

  // Many fields here, all optional strings (from Decimal)
  ingredients_nutrition: defineTable({
    org_id: v.id("org"),
    ingredients_id: v.id("ingredients"),
    kcal_per_100g: v.string(),
    kj_per_100g: v.string(),
    protein_per_100g: v.string(),
    fat_per_100g: v.string(),
    saturated_fat_per_100g: v.string(),
    monounsaturate_per_100g: v.string(),
    polyunsaturate_per_100g: v.string(),
    trans_fats_per_100g: v.string(),
    omega3_per_100g: v.string(),
    omega6_per_100g: v.string(),
    omega9_per_100g: v.string(),
    carbohydrates_per_100g: v.string(),
    net_carbs_per_100g: v.string(),
    total_sugar_per_100g: v.string(),
    added_sugar_per_100g: v.string(),
    artificial_sugar_per_100g: v.string(),
    fibre_per_100g: v.string(),
    starch_per_100g: v.string(),
    salt_per_100g: v.string(),
    sodium_per_100g: v.string(),
    water_per_100g: v.string(),
    nitrogen_g_per_100g: v.string(),
    ash_g_per_100g: v.string(),
    calcium_mg_per_100g: v.string(),
    iron_mg_per_100g: v.string(),
    magnesium_mg_per_100g: v.string(),
    phosphorus_mg_per_100g: v.string(),
    potassium_mg_per_100g: v.string(),
    zinc_mg_per_100g: v.string(),
    copper_mg_per_100g: v.string(),
    manganese_mg_per_100g: v.string(),
    selenium_micro_g_per_100g: v.string(),
    vitamin_a_mg_per_100g: v.string(),
    vitamin_b1_thiamin_mg_per_100g: v.string(),
    vitamin_b2_mg_per_100g: v.string(),
    vitamin_b3_niacin_mg_per_100g: v.string(),
    vitamin_b6_mg_per_100g: v.string(),
    vitamin_b7_biotin_micro_g_per_100g: v.string(),
    vitamin_b9_folate_mg_per_100g: v.string(),
    vitamin_b12_mg_per_100g: v.string(),
    vitamin_e_mg_per_100g: v.string(),
    vitamin_k_micro_g_per_100g: v.string(),
    sfa_16_0_palmitic_acid_g_per_100g: v.string(),
    sfa_18_0_stearic_acid_g_per_100g: v.string(),
    mufa_16_1_palmitoleic_acid_g_per_100g: v.string(),
    mufa_18_1__oleic_acid_g_per_100g: v.string(),
    pufa_18_2_linoleic_acid_g_per_100g: v.string(),
    tryptophan_g_per_100g: v.string(),
    threonine_g_per_100g: v.string(),
    isoleucine_g_per_100g: v.string(),
    leucine_g_per_100g: v.string(),
    lysine_g_per_100g: v.string(),
    methionine_g_per_100g: v.string(),
    phenylalanine_g_per_100g: v.string(),
    tyrosine_g_per_100g: v.string(),
    valine_g_per_100g: v.string(),
    arginine_g_per_100g: v.string(),
    histidine_g_per_100g: v.string(),
    alanine_g_per_100g: v.string(),
    aspartic_acid_g_per_100g: v.string(),
    glutamic_acid_g_per_100g: v.string(),
    glycine_g_per_100g: v.string(),
    proline_g_per_100g: v.string(),
    serine_g_per_100g: v.string(),
    hydroxyproline_g_per_100g: v.string(),
    cysteine_g_per_100g: v.string(),
    daidzein_mg_per_100g: v.string(),
    genistein_mg_per_100g: v.string(),
    daidzin_mg_per_100g: v.string(),
    genistin_mg_per_100g: v.string(),
    glycitin_mg_per_100g: v.string(),
  }).index("by_ingredients_id", ["ingredients_id"]),

  macro_micro: defineTable({
    name: v.string(),
    full_name: v.string(),
    primary_category: v.union(v.literal("macro"), v.literal("micro")),
    secondary_category: v.optional(v.string()),
    unit: v.union(v.literal("g"), v.literal("mg"), v.literal("µg")),
    short_name: v.string(),
    indent: v.union(v.literal("null"), v.literal("parent"), v.literal("child")),
    order: v.number(),
  }),

  allergy_ingredient: defineTable({
    allergy_id: v.id("allergy"),
    ingredient_id: v.id("ingredients"),
  }).index("by_allergy_and_ingredient", ["ingredient_id", "allergy_id"]),

  stock: defineTable({
    stock_location_id: v.id("stock_location"),
    org_id: v.id("org"),
    qty: v.number(),
    is_active: v.boolean(), // Prisma default: true
  }),

  stock_minimum: defineTable({
    stock_id: v.id("stock"),
    stock_location_id: v.id("stock_location"),
    org_id: v.id("org"),
    qty: v.number(),
  }),

  stock_location: defineTable({
    org_id: v.id("org"),
    name: v.string(),
  }),

  recipe_book: defineTable({
    org_id: v.id("org"),
    name: v.string(),
    desc: v.optional(v.string()),
    image: v.optional(v.string()),
    price: v.optional(v.string()), // Prisma type: Decimal
    url: v.optional(v.string()),
  }),

  recipe_book_index: defineTable({
    recipe_book_id: v.id("recipe_book"),
    org_id: v.id("org"),
    order: v.number(),
    name: v.string(),
  }),

  recipe_book_lookup: defineTable({
    recipe_id: v.number(), // Assuming this refers to an external ID
    recipe_book_id: v.id("recipe_book"),
    org_id: v.id("org"),
    name: v.string(),
  }),

  recipe_book_access: defineTable({
    recipe_book_id: v.id("recipe_book"),
    org_id: v.id("org"),
  }),

  todo: defineTable({
    org_id: v.id("org"),
    status_id: v.id("todo_status"),
  }),

  todo_document: defineTable({
    todo_id: v.id("todo"),
    org_id: v.id("org"),
    file: v.string(),
  }),

  conversation_thread: defineTable({
    org_id: v.id("org"),
    message: v.string(),
  }),

  production_event: defineTable({
    org_id: v.id("org"),
    recipe_id: v.string(),
    pdf: v.string(),
  }),

  production_event_task: defineTable({
    production_event_id: v.id("production_event"),
    org_id: v.id("org"),
    recipe_id: v.string(),
    pdf: v.string(),
  }),

  recipe: defineTable({
    name: v.string(),
    desc: v.string(),
    is_live: v.boolean(), // Prisma default: true
    org_id: v.id("org"),
    brand_id: v.optional(v.string()),
    recipe_type_name: v.string(), // Prisma default: "local"
    recipe_mode_name: v.string(), // Prisma default: "pro"
  }),

  rationalised_recipe_on_recipe: defineTable({
    org_id: v.id("org"),
    recipe_id: v.string(),
    data: v.any(), // Prisma type: Json
  }),

  change_history_on_recipe: defineTable({
    org_id: v.id("org"),
    recipe_id: v.string(),
    data: v.any(), // Prisma type: Json
  }),

  recipe_portions: defineTable({
    recipe_id: v.string(),
    portion_g: v.number(),
  }),

  recipe_components_on_recipe: defineTable({
    name: v.string(),
    sort_order: v.number(),
    yield: v.string(), // Prisma type: Decimal, default: 0.000
    version: v.optional(v.string()),
    org_id: v.id("org"),
    cost_per_1000g: v.string(), // Prisma type: Decimal
    method: v.optional(v.string()),
    recipe_id: v.string(),
    cooked_yields_categories_id: v.optional(v.id("cooked_yields_categories")),
    ingredient_type_name: v.string(), // Prisma default: "ingredient"
    is_ingredient: v.boolean(), // Prisma default: false
    ingredients_id: v.optional(v.id("ingredients")),
  }).index("by_ingredients_id", ["ingredients_id"]),

  component_portion_on_recipe: defineTable({
    recipe_id: v.string(),
    recipe_portions_id: v.id("recipe_portions"),
    qty_g: v.string(), // Prisma type: Decimal
    recipe_components_on_recipe_id: v.string(),
  }).index("composite_id", ["recipe_id", "recipe_portions_id", "recipe_components_on_recipe_id"]),

  packaging_costs_on_recipe: defineTable({
    recipe_id: v.string(),
    recipe_portions_id: v.id("recipe_portions"),
    packaging_costs_categoryId: v.optional(v.id("packaging_costs_category")),
  }).index("composite_id", ["recipe_id", "recipe_portions_id"]),

  other_costs_on_recipe: defineTable({
    recipe_id: v.string(),
    recipe_portions_id: v.id("recipe_portions"),
    other_costs_categoryId: v.id("other_costs_category"),
  }).index("composite_id", ["recipe_id", "recipe_portions_id"]),

  markup_on_recipe: defineTable({
    recipe_id: v.string(),
    recipe_portions_id: v.id("recipe_portions"),
    markup_categoryId: v.optional(v.id("markup")),
  }).index("composite_id", ["recipe_id", "recipe_portions_id"]),

  vat_on_recipe: defineTable({
    recipe_id: v.string(),
    recipe_portions_id: v.id("recipe_portions"),
    vat_categoryId: v.optional(v.id("vat_rules")),
  }).index("composite_id", ["recipe_id", "recipe_portions_id"]),

  recipe_detail_row: defineTable({
    recipe_id: v.string(),
    recipe_components_on_recipe_id: v.string(),
    name_extra_info: v.optional(v.string()),
    ingredients_id: v.optional(v.id("ingredients")),
    qty_g: v.string(), // Prisma type: Decimal, default: 0.000
    qty_estimated_from_home_g: v.optional(v.string()), // Prisma type: Decimal
    qty_estimated_confidence: v.optional(v.string()), // Prisma type: Decimal
    home_qty_frac_numerator: v.optional(v.number()),
    home_qty_frac_denominator: v.optional(v.number()),
    home_qty: v.optional(v.number()),
    home_qty_type_name: v.optional(v.string()),
    salt_purpose_id: v.optional(v.id("salt_purpose")),
    oil_purpose_id: v.optional(v.id("oil_purpose")),
    sort_order: v.number(), // Prisma default: 1
    cooked_yield_categories_id: v.optional(v.id("cooked_yields_categories")),
    cooked_yield_custom: v.optional(v.string()), // Prisma type: Decimal
    dry_cooked_yield_categories_id: v.optional(v.id("dry_cooked_yields_categories")),
    dry_cooked_yield_id: v.optional(v.id("dry_cooked_yields")),
    dry_cooked_yield_custom: v.optional(v.string()), // Prisma type: Decimal
    ingredient_type_name: v.string(), // Prisma default: "ingredient"
    prep_instruction_name: v.optional(v.string()), // Prisma default: "whole"
    prep_instruction_other: v.optional(v.string()),
    step_instruction: v.optional(v.string()),
    cost_per_1000g: v.string(), // Prisma type: Decimal, default: 0.000
    needs_prep: v.boolean(), // Prisma default: false
    prep_details: v.optional(v.any()), // Prisma type: Json
    fq_score_id: v.optional(v.id("fq_score")),
    isUpdated: v.boolean(), // Prisma default: false
  }),

  fq_score: defineTable({
    positive: v.optional(v.string()), // Prisma type: Decimal
    negative: v.optional(v.string()), // Prisma type: Decimal
    neutral: v.optional(v.string()), // Prisma type: Decimal
    overall: v.optional(v.string()), // Prisma type: Decimal
    positive_txt: v.optional(v.string()),
    negative_txt: v.optional(v.string()),
    neutral_txt: v.optional(v.string()),
    overall_txt: v.optional(v.string()),
    recipe_id: v.string(),
  }),

  component_nutrition: defineTable({
    org_id: v.optional(v.id("org")),
    is_default: v.optional(v.boolean()), // Prisma default: false
    ingredients_id: v.id("ingredients"),
    // Nutritional fields are optional strings (from Decimal)
    kcal_per_100g: v.optional(v.string()),
    kj_per_100g: v.optional(v.string()),
    protein_per_100g: v.optional(v.string()),
    fat_per_100g: v.optional(v.string()),
    // ... other nutritional fields
    recipe_components_on_recipe_id: v.optional(v.string()),
  }).index("by_ingredients_id", ["ingredients_id"]),

  recipe_mode: defineTable({
    name: v.string(),
    desc: v.optional(v.string()),
    is_default: v.boolean(), // Prisma default: false
  }).index("by_name", ["name"]),

  recipe_type: defineTable({
    name: v.string(),
    desc: v.optional(v.string()),
    is_default: v.boolean(), // Prisma default: false
  }).index("by_name", ["name"]),

  recipe_backup: defineTable({
    recipe_id: v.string(),
    org_id: v.id("org"),
    desc: v.string(),
    updated_at: v.number(), // This must be manually set in mutations
  }),

  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  // MARKETING
  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  lead: defineTable({
    email: v.string(),
  }),

  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  // CRON QUEUES
  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  webhook_queue: defineTable({
    ingredient_id: v.id("ingredients"),
    name: v.string(),
    run_count: v.optional(v.number()), // Prisma default: 0
    processed: v.boolean(), // Prisma default: false
    type: v.optional(v.string()),
  }),
});
