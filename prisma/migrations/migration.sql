-- CreateEnum
CREATE TYPE "EnumLanguage" AS ENUM ('EN', 'FR', 'SP');

-- CreateEnum
CREATE TYPE "EnumMarkUpType" AS ENUM ('markup', 'margin', 'xcost');

-- CreateEnum
CREATE TYPE "EnumRecipeType" AS ENUM ('local', 'master', 'unlinked_master');

-- CreateEnum
CREATE TYPE "EnumDietClassification" AS ENUM ('vegan', 'vegetarian', 'animal_product', 'unknown');

-- CreateEnum
CREATE TYPE "EnumcomponentIngredientType" AS ENUM ('ingredient', 'step', 'sub');

-- CreateEnum
CREATE TYPE "EnumPrepInstruction" AS ENUM ('none', 'n10x10', 'n15x15', 'n20x20', 'fine', 'ground', 'grate', 'fresh', 'whole', 'brunoise', 'chiffonade', 'chop', 'cube', 'dice', 'dietClassification', 'julienne', 'mince', 'slice', 'rondelle', 'diagonal', 'batonnet', 'jardiniere', 'macedoine', 'other');

-- CreateEnum
CREATE TYPE "EnumOilPurpose" AS ENUM ('added', 'thin_coating', 'shallow_fry', 'deep_fry');

-- CreateEnum
CREATE TYPE "EnumUnitType" AS ENUM ('weight', 'liquid');

-- CreateEnum
CREATE TYPE "EnumMetricOrImperial" AS ENUM ('metric', 'imperial');

-- CreateEnum
CREATE TYPE "EnumPrimaryCategory" AS ENUM ('alcoholic_beverages', 'baking_ingredients', 'broths_stocks', 'condiments_sauces', 'dairy', 'eggs', 'fats_oils', 'fermented_foods', 'flavorings_extracts', 'fruits', 'grains_cereals', 'herbs_spices', 'legumes', 'meat', 'mushrooms', 'non_alcoholic_beverages', 'nuts_seeds', 'other', 'pasta_noodles', 'plant_based_proteins', 'poultry', 'seafood', 'seaweed', 'sugars_sweeteners', 'vegetables', 'vitamins_minerals_supplements', 'water');

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "profiles_id" TEXT,
    "username" TEXT,
    "emails" JSONB,
    "phone_numbers" JSONB,
    "organisations" TEXT,
    "avatar_url" TEXT,
    "roles" JSONB,
    "first_name" TEXT,
    "last_name" TEXT,
    "last_sign_in_at" TEXT,
    "json" JSONB,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "address" TEXT NOT NULL,
    "logo" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "payment_options" TEXT NOT NULL,
    "contacts" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prep_instructions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "desc" TEXT,
    "yield" DOUBLE PRECISION,
    "is_live" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ingredients_id" INTEGER,

    CONSTRAINT "prep_instructions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raw_to_prepped_yields" (
    "id" SERIAL NOT NULL,
    "whole" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "peeled" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "peeled_and_cored" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "diced" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sliced" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grated" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ingredients_id" INTEGER,

    CONSTRAINT "raw_to_prepped_yields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooked_yields_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "desc" TEXT,
    "yield" DOUBLE PRECISION,
    "is_live" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cooked_yields_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooked_yields" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "desc" TEXT,
    "is_live" BOOLEAN NOT NULL DEFAULT true,
    "yield" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "cooked_yields_categories_id" INTEGER,
    "ingredients_yields_id" INTEGER,

    CONSTRAINT "cooked_yields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dry_cooked_yields_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "desc" TEXT,
    "yield" DOUBLE PRECISION,
    "is_live" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dry_cooked_yields_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dry_cooked_yields" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "desc" TEXT,
    "yield" DOUBLE PRECISION,
    "is_live" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "dry_cooked_yields_categories_id" INTEGER,

    CONSTRAINT "dry_cooked_yields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients_religious_certification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'unknown',

    CONSTRAINT "ingredients_religious_certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_orig" TEXT,
    "names_alt" TEXT,
    "customer_id" INTEGER,
    "is_default" BOOLEAN DEFAULT false,
    "translation" JSONB,
    "primary_category_id" INTEGER,
    "secondary_category" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "dietary_classification_id" INTEGER,
    "kosher_id" INTEGER,
    "halal_id" INTEGER,
    "confidence" DOUBLE PRECISION,
    "ai_model" TEXT,
    "allergyId" INTEGER,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_cooked_yields" (
    "id" SERIAL NOT NULL,
    "ingredients_id" INTEGER,
    "raw" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cooked" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deep_fry" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shallow_fry" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "boiled" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "roasted" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredient_cooked_yields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_category_primary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ingredient_category_primary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_category_secondary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ingredient_category_primary_id" INTEGER NOT NULL,
    "translation" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ingredient_category_secondary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dietary_classification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dietary_classification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients_yields" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER,
    "is_default" BOOLEAN DEFAULT false,
    "name" TEXT NOT NULL,
    "ingredients_id" INTEGER,
    "yield" DOUBLE PRECISION,
    "is_live" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_yields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients_nutrition" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER,
    "is_default" BOOLEAN DEFAULT false,
    "ingredients_id" INTEGER,
    "kcal_per_100g" DOUBLE PRECISION DEFAULT 0,
    "kj_per_100g" DOUBLE PRECISION DEFAULT 0,
    "protein_per_100g" DOUBLE PRECISION DEFAULT 0,
    "fat_per_100g" DOUBLE PRECISION DEFAULT 0,
    "saturated_fat_per_100g" DOUBLE PRECISION DEFAULT 0,
    "monounsaturate_per_100g" DOUBLE PRECISION DEFAULT 0,
    "polyunsaturate_per_100g" DOUBLE PRECISION DEFAULT 0,
    "trans_fats_per_100g" DOUBLE PRECISION DEFAULT 0,
    "omega3_per_100g" DOUBLE PRECISION DEFAULT 0,
    "omega6_per_100g" DOUBLE PRECISION DEFAULT 0,
    "omega9_per_100g" DOUBLE PRECISION DEFAULT 0,
    "carbs_per_100g" DOUBLE PRECISION DEFAULT 0,
    "net_carbs_per_100g" DOUBLE PRECISION DEFAULT 0,
    "carbohydrates_per_100g" DOUBLE PRECISION DEFAULT 0,
    "total_sugar_per_100g" DOUBLE PRECISION DEFAULT 0,
    "added_sugar_per_100g" DOUBLE PRECISION DEFAULT 0,
    "artificial_sugar_per_100g" DOUBLE PRECISION DEFAULT 0,
    "fibre_per_100g" DOUBLE PRECISION DEFAULT 0,
    "starch_per_100g" DOUBLE PRECISION DEFAULT 0,
    "salt_per_100g" DOUBLE PRECISION DEFAULT 0,
    "sodium_per_100g" DOUBLE PRECISION DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_nutrition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "vat" TEXT,
    "corporation_number" TEXT,
    "logo" TEXT,
    "email" TEXT,
    "tel" TEXT,
    "cell" TEXT,
    "whatsapp" TEXT,
    "account_email" TEXT,
    "account_name" TEXT,
    "account_tel" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allergy" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "translation" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allergy_ingredient" (
    "id" SERIAL NOT NULL,
    "allergy_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "allergy_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" SERIAL NOT NULL,
    "stock_location_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "qty" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_minimum" (
    "id" SERIAL NOT NULL,
    "stock_id" INTEGER NOT NULL,
    "stock_location_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "qty" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_minimum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_location" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_backup" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "profiles_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_backup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_book" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "image" TEXT,
    "price" DOUBLE PRECISION,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_book_index" (
    "id" SERIAL NOT NULL,
    "recipe_book_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_book_index_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_book_collection" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "recipe_book_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_book_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_book_access" (
    "id" SERIAL NOT NULL,
    "recipe_book_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_book_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "profiles_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo_status" (
    "id" SERIAL NOT NULL,
    "profiles_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todo_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo_document" (
    "id" SERIAL NOT NULL,
    "todo_id" INTEGER NOT NULL,
    "profiles_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "file" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todo_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_thread" (
    "id" SERIAL NOT NULL,
    "profiles_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversation_thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_event" (
    "id" SERIAL NOT NULL,
    "profiles_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "pdf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "production_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_event_task" (
    "id" SERIAL NOT NULL,
    "production_event_id" INTEGER NOT NULL,
    "profiles_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "pdf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "production_event_task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_rules" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "cost_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packaging_costs" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "packaging_costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "other_costs" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "other_costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "markup" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "factor" TEXT NOT NULL,
    "type" "EnumMarkUpType" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "markup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "portions" INTEGER[],
    "cost_rules" JSONB NOT NULL,
    "packaging_costs_id" JSONB NOT NULL,
    "other_costs_id" JSONB NOT NULL,
    "markup_id" JSONB NOT NULL,
    "setting" JSONB NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "type" "EnumRecipeType" NOT NULL,
    "version" TEXT NOT NULL,
    "versions" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_portions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "cost_rules" INTEGER NOT NULL,
    "packaging_costs_id" INTEGER NOT NULL,
    "other_costs_id" INTEGER NOT NULL,
    "markup_id" INTEGER NOT NULL,

    CONSTRAINT "recipe_portions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "component" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EnumcomponentIngredientType" NOT NULL,
    "parent_id" INTEGER,
    "portions" JSONB NOT NULL,
    "yield" DOUBLE PRECISION NOT NULL,
    "nutri_per_100" JSONB NOT NULL,
    "version" TEXT NOT NULL,
    "versions" JSONB NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoSrc" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhook_queue" (
    "id" SERIAL NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "webhook_queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_dry_cooked_yieldsToingredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_dry_cooked_yieldsToingredients_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_componentToingredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_componentToingredients_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_profiles_id_key" ON "profiles"("profiles_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

-- CreateIndex
CREATE INDEX "_dry_cooked_yieldsToingredients_B_index" ON "_dry_cooked_yieldsToingredients"("B");

-- CreateIndex
CREATE INDEX "_componentToingredients_B_index" ON "_componentToingredients"("B");

-- AddForeignKey
ALTER TABLE "prep_instructions" ADD CONSTRAINT "prep_instructions_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raw_to_prepped_yields" ADD CONSTRAINT "raw_to_prepped_yields_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooked_yields" ADD CONSTRAINT "cooked_yields_cooked_yields_categories_id_fkey" FOREIGN KEY ("cooked_yields_categories_id") REFERENCES "cooked_yields_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooked_yields" ADD CONSTRAINT "cooked_yields_ingredients_yields_id_fkey" FOREIGN KEY ("ingredients_yields_id") REFERENCES "ingredients_yields"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dry_cooked_yields" ADD CONSTRAINT "dry_cooked_yields_dry_cooked_yields_categories_id_fkey" FOREIGN KEY ("dry_cooked_yields_categories_id") REFERENCES "dry_cooked_yields_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_primary_category_id_fkey" FOREIGN KEY ("primary_category_id") REFERENCES "ingredient_category_primary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_dietary_classification_id_fkey" FOREIGN KEY ("dietary_classification_id") REFERENCES "dietary_classification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_kosher_id_fkey" FOREIGN KEY ("kosher_id") REFERENCES "ingredients_religious_certification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_halal_id_fkey" FOREIGN KEY ("halal_id") REFERENCES "ingredients_religious_certification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "allergy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_cooked_yields" ADD CONSTRAINT "ingredient_cooked_yields_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_category_secondary" ADD CONSTRAINT "ingredient_category_secondary_ingredient_category_primary__fkey" FOREIGN KEY ("ingredient_category_primary_id") REFERENCES "ingredient_category_primary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_yields" ADD CONSTRAINT "ingredients_yields_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_yields" ADD CONSTRAINT "ingredients_yields_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_nutrition" ADD CONSTRAINT "ingredients_nutrition_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_nutrition" ADD CONSTRAINT "ingredients_nutrition_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier" ADD CONSTRAINT "supplier_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allergy" ADD CONSTRAINT "allergy_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allergy_ingredient" ADD CONSTRAINT "allergy_ingredient_allergy_id_fkey" FOREIGN KEY ("allergy_id") REFERENCES "allergy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allergy_ingredient" ADD CONSTRAINT "allergy_ingredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_stock_location_id_fkey" FOREIGN KEY ("stock_location_id") REFERENCES "stock_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_minimum" ADD CONSTRAINT "stock_minimum_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_minimum" ADD CONSTRAINT "stock_minimum_stock_location_id_fkey" FOREIGN KEY ("stock_location_id") REFERENCES "stock_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_minimum" ADD CONSTRAINT "stock_minimum_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_location" ADD CONSTRAINT "stock_location_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_backup" ADD CONSTRAINT "recipe_backup_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_book" ADD CONSTRAINT "recipe_book_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_book_index" ADD CONSTRAINT "recipe_book_index_recipe_book_id_fkey" FOREIGN KEY ("recipe_book_id") REFERENCES "recipe_book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_book_index" ADD CONSTRAINT "recipe_book_index_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_book_collection" ADD CONSTRAINT "recipe_book_collection_recipe_book_id_fkey" FOREIGN KEY ("recipe_book_id") REFERENCES "recipe_book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_book_collection" ADD CONSTRAINT "recipe_book_collection_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_book_access" ADD CONSTRAINT "recipe_book_access_recipe_book_id_fkey" FOREIGN KEY ("recipe_book_id") REFERENCES "recipe_book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_book_access" ADD CONSTRAINT "recipe_book_access_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_profiles_id_fkey" FOREIGN KEY ("profiles_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "todo_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo_status" ADD CONSTRAINT "todo_status_profiles_id_fkey" FOREIGN KEY ("profiles_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo_status" ADD CONSTRAINT "todo_status_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo_document" ADD CONSTRAINT "todo_document_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo_document" ADD CONSTRAINT "todo_document_profiles_id_fkey" FOREIGN KEY ("profiles_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo_document" ADD CONSTRAINT "todo_document_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_thread" ADD CONSTRAINT "conversation_thread_profiles_id_fkey" FOREIGN KEY ("profiles_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_thread" ADD CONSTRAINT "conversation_thread_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_thread" ADD CONSTRAINT "conversation_thread_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_event" ADD CONSTRAINT "production_event_profiles_id_fkey" FOREIGN KEY ("profiles_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_event" ADD CONSTRAINT "production_event_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_event" ADD CONSTRAINT "production_event_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_event_task" ADD CONSTRAINT "production_event_task_production_event_id_fkey" FOREIGN KEY ("production_event_id") REFERENCES "production_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_event_task" ADD CONSTRAINT "production_event_task_profiles_id_fkey" FOREIGN KEY ("profiles_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_event_task" ADD CONSTRAINT "production_event_task_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_event_task" ADD CONSTRAINT "production_event_task_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_rules" ADD CONSTRAINT "cost_rules_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packaging_costs" ADD CONSTRAINT "packaging_costs_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "other_costs" ADD CONSTRAINT "other_costs_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "markup" ADD CONSTRAINT "markup_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_portions" ADD CONSTRAINT "recipe_portions_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component" ADD CONSTRAINT "component_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "component"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component" ADD CONSTRAINT "component_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_queue" ADD CONSTRAINT "webhook_queue_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dry_cooked_yieldsToingredients" ADD CONSTRAINT "_dry_cooked_yieldsToingredients_A_fkey" FOREIGN KEY ("A") REFERENCES "dry_cooked_yields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dry_cooked_yieldsToingredients" ADD CONSTRAINT "_dry_cooked_yieldsToingredients_B_fkey" FOREIGN KEY ("B") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_componentToingredients" ADD CONSTRAINT "_componentToingredients_A_fkey" FOREIGN KEY ("A") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_componentToingredients" ADD CONSTRAINT "_componentToingredients_B_fkey" FOREIGN KEY ("B") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

