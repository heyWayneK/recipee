/*
  Warnings:

  - You are about to drop the column `ingredientCategoryPrimaryId` on the `ingredient_category_secondary` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientsId` on the `ingredients_nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `ingredients_nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientsId` on the `ingredients_yields` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `ingredients_yields` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientsId` on the `prep_instructions` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `recipe` table. All the data in the column will be lost.
  - Added the required column `ingredient_category_primary_id` to the `ingredient_category_secondary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_id` to the `recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredient_category_secondary" DROP CONSTRAINT "ingredient_category_secondary_ingredientCategoryPrimaryId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_nutrition" DROP CONSTRAINT "ingredients_nutrition_ingredientsId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_yields" DROP CONSTRAINT "ingredients_yields_ingredientsId_fkey";

-- DropForeignKey
ALTER TABLE "prep_instructions" DROP CONSTRAINT "prep_instructions_ingredientsId_fkey";

-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_brandId_fkey";

-- AlterTable
ALTER TABLE "ingredient_category_secondary" DROP COLUMN "ingredientCategoryPrimaryId",
ADD COLUMN     "ingredient_category_primary_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "isDefault",
ADD COLUMN     "is_default" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "ingredients_nutrition" DROP COLUMN "ingredientsId",
DROP COLUMN "isDefault",
ADD COLUMN     "ingredients_id" INTEGER,
ADD COLUMN     "is_default" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "ingredients_yields" DROP COLUMN "ingredientsId",
DROP COLUMN "isDefault",
ADD COLUMN     "ingredients_id" INTEGER,
ADD COLUMN     "is_default" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "prep_instructions" DROP COLUMN "ingredientsId",
ADD COLUMN     "ingredients_id" INTEGER;

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "brandId",
ADD COLUMN     "brand_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "prep_instructions" ADD CONSTRAINT "prep_instructions_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_category_secondary" ADD CONSTRAINT "ingredient_category_secondary_ingredient_category_primary__fkey" FOREIGN KEY ("ingredient_category_primary_id") REFERENCES "ingredient_category_primary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_yields" ADD CONSTRAINT "ingredients_yields_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_nutrition" ADD CONSTRAINT "ingredients_nutrition_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
