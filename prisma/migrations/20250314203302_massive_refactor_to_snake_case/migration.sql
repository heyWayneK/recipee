/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the `Allergy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Component` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConversationThread` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CookedYields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CookedYieldsCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CostRules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DryCookedYields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DryCookedYieldsCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngredientCategoryPrimary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngredientCategorySecondary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngredientDietClassification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngredientsNutrition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngredientsYields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Markup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OtherCosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackagingCosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrepInstructions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductionEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductionEventTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RawToPreppedYields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeBackup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeBookAccess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeBookCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeBookIndex` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipePortions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockMinimum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TodoDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TodoStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ComponentToIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CookedYieldsToIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DryCookedYieldsToIngredients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumcomponentIngredientType" AS ENUM ('ingredient', 'step', 'sub');

-- DropForeignKey
ALTER TABLE "Allergy" DROP CONSTRAINT "Allergy_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "ConversationThread" DROP CONSTRAINT "ConversationThread_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ConversationThread" DROP CONSTRAINT "ConversationThread_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "ConversationThread" DROP CONSTRAINT "ConversationThread_userId_fkey";

-- DropForeignKey
ALTER TABLE "CookedYields" DROP CONSTRAINT "CookedYields_cookedYieldsCategoriesId_fkey";

-- DropForeignKey
ALTER TABLE "CookedYields" DROP CONSTRAINT "CookedYields_ingredientsYieldsId_fkey";

-- DropForeignKey
ALTER TABLE "CostRules" DROP CONSTRAINT "CostRules_customerId_fkey";

-- DropForeignKey
ALTER TABLE "DryCookedYields" DROP CONSTRAINT "DryCookedYields_dryCookedYieldsCategoriesId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientCategorySecondary" DROP CONSTRAINT "IngredientCategorySecondary_ingredientCategoryPrimaryId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_ingredientDietClassificationId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientsNutrition" DROP CONSTRAINT "IngredientsNutrition_customerId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientsNutrition" DROP CONSTRAINT "IngredientsNutrition_ingredientsId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientsYields" DROP CONSTRAINT "IngredientsYields_customerId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientsYields" DROP CONSTRAINT "IngredientsYields_ingredientsId_fkey";

-- DropForeignKey
ALTER TABLE "Markup" DROP CONSTRAINT "Markup_customerId_fkey";

-- DropForeignKey
ALTER TABLE "OtherCosts" DROP CONSTRAINT "OtherCosts_customerId_fkey";

-- DropForeignKey
ALTER TABLE "PackagingCosts" DROP CONSTRAINT "PackagingCosts_customerId_fkey";

-- DropForeignKey
ALTER TABLE "PrepInstructions" DROP CONSTRAINT "PrepInstructions_ingredientsId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionEvent" DROP CONSTRAINT "ProductionEvent_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionEvent" DROP CONSTRAINT "ProductionEvent_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionEvent" DROP CONSTRAINT "ProductionEvent_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionEventTask" DROP CONSTRAINT "ProductionEventTask_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionEventTask" DROP CONSTRAINT "ProductionEventTask_productionEventId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionEventTask" DROP CONSTRAINT "ProductionEventTask_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionEventTask" DROP CONSTRAINT "ProductionEventTask_userId_fkey";

-- DropForeignKey
ALTER TABLE "RawToPreppedYields" DROP CONSTRAINT "RawToPreppedYields_ingredientsId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_customerId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBackup" DROP CONSTRAINT "RecipeBackup_customerId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBook" DROP CONSTRAINT "RecipeBook_customerId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookAccess" DROP CONSTRAINT "RecipeBookAccess_customerId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookAccess" DROP CONSTRAINT "RecipeBookAccess_recipeBookId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookCollection" DROP CONSTRAINT "RecipeBookCollection_customerId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookCollection" DROP CONSTRAINT "RecipeBookCollection_recipeBookId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookIndex" DROP CONSTRAINT "RecipeBookIndex_customerId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookIndex" DROP CONSTRAINT "RecipeBookIndex_recipeBookId_fkey";

-- DropForeignKey
ALTER TABLE "RecipePortions" DROP CONSTRAINT "RecipePortions_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_stockLocationId_fkey";

-- DropForeignKey
ALTER TABLE "StockLocation" DROP CONSTRAINT "StockLocation_customerId_fkey";

-- DropForeignKey
ALTER TABLE "StockMinimum" DROP CONSTRAINT "StockMinimum_customerId_fkey";

-- DropForeignKey
ALTER TABLE "StockMinimum" DROP CONSTRAINT "StockMinimum_stockId_fkey";

-- DropForeignKey
ALTER TABLE "StockMinimum" DROP CONSTRAINT "StockMinimum_stockLocationId_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- DropForeignKey
ALTER TABLE "TodoDocument" DROP CONSTRAINT "TodoDocument_customerId_fkey";

-- DropForeignKey
ALTER TABLE "TodoDocument" DROP CONSTRAINT "TodoDocument_todoId_fkey";

-- DropForeignKey
ALTER TABLE "TodoDocument" DROP CONSTRAINT "TodoDocument_userId_fkey";

-- DropForeignKey
ALTER TABLE "TodoStatus" DROP CONSTRAINT "TodoStatus_customerId_fkey";

-- DropForeignKey
ALTER TABLE "TodoStatus" DROP CONSTRAINT "TodoStatus_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ComponentToIngredients" DROP CONSTRAINT "_ComponentToIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_ComponentToIngredients" DROP CONSTRAINT "_ComponentToIngredients_B_fkey";

-- DropForeignKey
ALTER TABLE "_CookedYieldsToIngredients" DROP CONSTRAINT "_CookedYieldsToIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_CookedYieldsToIngredients" DROP CONSTRAINT "_CookedYieldsToIngredients_B_fkey";

-- DropForeignKey
ALTER TABLE "_DryCookedYieldsToIngredients" DROP CONSTRAINT "_DryCookedYieldsToIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_DryCookedYieldsToIngredients" DROP CONSTRAINT "_DryCookedYieldsToIngredients_B_fkey";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Allergy";

-- DropTable
DROP TABLE "Component";

-- DropTable
DROP TABLE "ConversationThread";

-- DropTable
DROP TABLE "CookedYields";

-- DropTable
DROP TABLE "CookedYieldsCategories";

-- DropTable
DROP TABLE "CostRules";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "DryCookedYields";

-- DropTable
DROP TABLE "DryCookedYieldsCategories";

-- DropTable
DROP TABLE "IngredientCategoryPrimary";

-- DropTable
DROP TABLE "IngredientCategorySecondary";

-- DropTable
DROP TABLE "IngredientDietClassification";

-- DropTable
DROP TABLE "Ingredients";

-- DropTable
DROP TABLE "IngredientsNutrition";

-- DropTable
DROP TABLE "IngredientsYields";

-- DropTable
DROP TABLE "Lead";

-- DropTable
DROP TABLE "Markup";

-- DropTable
DROP TABLE "OtherCosts";

-- DropTable
DROP TABLE "PackagingCosts";

-- DropTable
DROP TABLE "PrepInstructions";

-- DropTable
DROP TABLE "ProductionEvent";

-- DropTable
DROP TABLE "ProductionEventTask";

-- DropTable
DROP TABLE "Profiles";

-- DropTable
DROP TABLE "RawToPreppedYields";

-- DropTable
DROP TABLE "Recipe";

-- DropTable
DROP TABLE "RecipeBackup";

-- DropTable
DROP TABLE "RecipeBook";

-- DropTable
DROP TABLE "RecipeBookAccess";

-- DropTable
DROP TABLE "RecipeBookCollection";

-- DropTable
DROP TABLE "RecipeBookIndex";

-- DropTable
DROP TABLE "RecipePortions";

-- DropTable
DROP TABLE "Stock";

-- DropTable
DROP TABLE "StockLocation";

-- DropTable
DROP TABLE "StockMinimum";

-- DropTable
DROP TABLE "Supplier";

-- DropTable
DROP TABLE "Todo";

-- DropTable
DROP TABLE "TodoDocument";

-- DropTable
DROP TABLE "TodoStatus";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_ComponentToIngredients";

-- DropTable
DROP TABLE "_CookedYieldsToIngredients";

-- DropTable
DROP TABLE "_DryCookedYieldsToIngredients";

-- DropEnum
DROP TYPE "EnumComponentIngredientType";

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
    "ingredientsId" INTEGER,

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

    CONSTRAINT "cooked_yields_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooked_yields" (
    "id" SERIAL NOT NULL,
    "raw" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cooked" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deep_fry" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shallow_fry" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "boiled" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "roasted" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
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
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER,
    "isDefault" BOOLEAN DEFAULT false,
    "name" TEXT NOT NULL,
    "nameAlt" TEXT,
    "translation" JSONB,
    "primary_category" TEXT,
    "secondary_category" TEXT,
    "dietary_classificationId" INTEGER,
    "created_nat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_category_primary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredient_category_primary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_category_secondary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ingredientCategoryPrimaryId" INTEGER NOT NULL,
    "translation" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

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
    "isDefault" BOOLEAN DEFAULT false,
    "name" TEXT NOT NULL,
    "ingredientsId" INTEGER,
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
    "isDefault" BOOLEAN DEFAULT false,
    "ingredientsId" INTEGER,
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
    "accountTel" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allergy" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" SERIAL NOT NULL,
    "stock_locationId" INTEGER NOT NULL,
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
    "stockId" INTEGER NOT NULL,
    "stock_locationId" INTEGER NOT NULL,
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
    "updatedAt" TIMESTAMP(3) NOT NULL,

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
CREATE TABLE "recipe_bookIndex" (
    "id" SERIAL NOT NULL,
    "recipe_book_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_bookIndex_pkey" PRIMARY KEY ("id")
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
    "statusId" INTEGER NOT NULL,
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
    "production_eventId" INTEGER NOT NULL,
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
    "type" "EnumRecipeType" NOT NULL,
    "version" TEXT NOT NULL,
    "versions" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "brandId" INTEGER NOT NULL,

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
CREATE TABLE "_cooked_yieldsToingredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_cooked_yieldsToingredients_AB_pkey" PRIMARY KEY ("A","B")
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
CREATE INDEX "_cooked_yieldsToingredients_B_index" ON "_cooked_yieldsToingredients"("B");

-- CreateIndex
CREATE INDEX "_dry_cooked_yieldsToingredients_B_index" ON "_dry_cooked_yieldsToingredients"("B");

-- CreateIndex
CREATE INDEX "_componentToingredients_B_index" ON "_componentToingredients"("B");

-- AddForeignKey
ALTER TABLE "prep_instructions" ADD CONSTRAINT "prep_instructions_ingredientsId_fkey" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_dietary_classificationId_fkey" FOREIGN KEY ("dietary_classificationId") REFERENCES "dietary_classification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_category_secondary" ADD CONSTRAINT "ingredient_category_secondary_ingredientCategoryPrimaryId_fkey" FOREIGN KEY ("ingredientCategoryPrimaryId") REFERENCES "ingredient_category_primary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_yields" ADD CONSTRAINT "ingredients_yields_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_yields" ADD CONSTRAINT "ingredients_yields_ingredientsId_fkey" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_nutrition" ADD CONSTRAINT "ingredients_nutrition_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_nutrition" ADD CONSTRAINT "ingredients_nutrition_ingredientsId_fkey" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier" ADD CONSTRAINT "supplier_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allergy" ADD CONSTRAINT "allergy_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_stock_locationId_fkey" FOREIGN KEY ("stock_locationId") REFERENCES "stock_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_minimum" ADD CONSTRAINT "stock_minimum_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_minimum" ADD CONSTRAINT "stock_minimum_stock_locationId_fkey" FOREIGN KEY ("stock_locationId") REFERENCES "stock_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_minimum" ADD CONSTRAINT "stock_minimum_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_location" ADD CONSTRAINT "stock_location_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_backup" ADD CONSTRAINT "recipe_backup_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_book" ADD CONSTRAINT "recipe_book_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_bookIndex" ADD CONSTRAINT "recipe_bookIndex_recipe_book_id_fkey" FOREIGN KEY ("recipe_book_id") REFERENCES "recipe_book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_bookIndex" ADD CONSTRAINT "recipe_bookIndex_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "todo" ADD CONSTRAINT "todo_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "todo_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "production_event_task" ADD CONSTRAINT "production_event_task_production_eventId_fkey" FOREIGN KEY ("production_eventId") REFERENCES "production_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_portions" ADD CONSTRAINT "recipe_portions_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component" ADD CONSTRAINT "component_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "component"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component" ADD CONSTRAINT "component_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cooked_yieldsToingredients" ADD CONSTRAINT "_cooked_yieldsToingredients_A_fkey" FOREIGN KEY ("A") REFERENCES "cooked_yields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cooked_yieldsToingredients" ADD CONSTRAINT "_cooked_yieldsToingredients_B_fkey" FOREIGN KEY ("B") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dry_cooked_yieldsToingredients" ADD CONSTRAINT "_dry_cooked_yieldsToingredients_A_fkey" FOREIGN KEY ("A") REFERENCES "dry_cooked_yields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dry_cooked_yieldsToingredients" ADD CONSTRAINT "_dry_cooked_yieldsToingredients_B_fkey" FOREIGN KEY ("B") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_componentToingredients" ADD CONSTRAINT "_componentToingredients_A_fkey" FOREIGN KEY ("A") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_componentToingredients" ADD CONSTRAINT "_componentToingredients_B_fkey" FOREIGN KEY ("B") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
