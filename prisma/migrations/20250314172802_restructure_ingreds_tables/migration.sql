/*
  Warnings:

  - You are about to drop the column `CookedYieldsCategoriesId` on the `CookedYields` table. All the data in the column will be lost.
  - You are about to drop the column `DryCookedYieldsCategoriesId` on the `DryCookedYields` table. All the data in the column will be lost.
  - You are about to drop the column `added_sugar_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `artificial_sugar_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `carbohydrates_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `carbs_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `dietary_classification` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `fat_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `fibre_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `kcal_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `kj_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `monounsaturate_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `name_alt` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `net_carbs_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `omega3_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `omega6_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `omega9_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `polyunsaturate_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `primary_category` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `protein_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `salt_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `saturated_fat_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `secondary_category` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `sodium_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `starch_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `total_sugar_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `trans_fats_per_100g` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "CookedYields" DROP CONSTRAINT "CookedYields_CookedYieldsCategoriesId_fkey";

-- DropForeignKey
ALTER TABLE "DryCookedYields" DROP CONSTRAINT "DryCookedYields_DryCookedYieldsCategoriesId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "CookedYields" DROP COLUMN "CookedYieldsCategoriesId",
ADD COLUMN     "cookedYieldsCategoriesId" INTEGER,
ADD COLUMN     "ingredientsYieldsId" INTEGER;

-- AlterTable
ALTER TABLE "DryCookedYields" DROP COLUMN "DryCookedYieldsCategoriesId",
ADD COLUMN     "dryCookedYieldsCategoriesId" INTEGER;

-- AlterTable
ALTER TABLE "Ingredients" DROP COLUMN "added_sugar_per_100g",
DROP COLUMN "artificial_sugar_per_100g",
DROP COLUMN "carbohydrates_per_100g",
DROP COLUMN "carbs_per_100g",
DROP COLUMN "dietary_classification",
DROP COLUMN "fat_per_100g",
DROP COLUMN "fibre_per_100g",
DROP COLUMN "kcal_per_100g",
DROP COLUMN "kj_per_100g",
DROP COLUMN "monounsaturate_per_100g",
DROP COLUMN "name_alt",
DROP COLUMN "net_carbs_per_100g",
DROP COLUMN "omega3_per_100g",
DROP COLUMN "omega6_per_100g",
DROP COLUMN "omega9_per_100g",
DROP COLUMN "polyunsaturate_per_100g",
DROP COLUMN "primary_category",
DROP COLUMN "protein_per_100g",
DROP COLUMN "salt_per_100g",
DROP COLUMN "saturated_fat_per_100g",
DROP COLUMN "secondary_category",
DROP COLUMN "sodium_per_100g",
DROP COLUMN "starch_per_100g",
DROP COLUMN "total_sugar_per_100g",
DROP COLUMN "trans_fats_per_100g",
ADD COLUMN     "ingredientDietClassificationId" INTEGER,
ADD COLUMN     "nameAlt" TEXT,
ADD COLUMN     "primaryCategory" TEXT,
ADD COLUMN     "secondaryCategory" TEXT;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "IngredientCategoryPrimary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IngredientCategoryPrimary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientCategorySecondary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ingredientCategoryPrimaryId" INTEGER NOT NULL,
    "translation" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IngredientCategorySecondary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientDietClassification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IngredientDietClassification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsYields" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER,
    "isDefault" BOOLEAN DEFAULT false,
    "name" TEXT NOT NULL,
    "ingredientsId" INTEGER,
    "yield" DOUBLE PRECISION,
    "isLive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IngredientsYields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsNutrition" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IngredientsNutrition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CookedYields" ADD CONSTRAINT "CookedYields_cookedYieldsCategoriesId_fkey" FOREIGN KEY ("cookedYieldsCategoriesId") REFERENCES "CookedYieldsCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookedYields" ADD CONSTRAINT "CookedYields_ingredientsYieldsId_fkey" FOREIGN KEY ("ingredientsYieldsId") REFERENCES "IngredientsYields"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DryCookedYields" ADD CONSTRAINT "DryCookedYields_dryCookedYieldsCategoriesId_fkey" FOREIGN KEY ("dryCookedYieldsCategoriesId") REFERENCES "DryCookedYieldsCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_ingredientDietClassificationId_fkey" FOREIGN KEY ("ingredientDietClassificationId") REFERENCES "IngredientDietClassification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientCategorySecondary" ADD CONSTRAINT "IngredientCategorySecondary_ingredientCategoryPrimaryId_fkey" FOREIGN KEY ("ingredientCategoryPrimaryId") REFERENCES "IngredientCategoryPrimary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsYields" ADD CONSTRAINT "IngredientsYields_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsYields" ADD CONSTRAINT "IngredientsYields_ingredientsId_fkey" FOREIGN KEY ("ingredientsId") REFERENCES "Ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsNutrition" ADD CONSTRAINT "IngredientsNutrition_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsNutrition" ADD CONSTRAINT "IngredientsNutrition_ingredientsId_fkey" FOREIGN KEY ("ingredientsId") REFERENCES "Ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
