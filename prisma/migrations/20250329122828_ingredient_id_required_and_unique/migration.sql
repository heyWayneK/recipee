/*
  Warnings:

  - A unique constraint covering the columns `[ingredients_id]` on the table `ingredient_cooked_yields` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ingredients_id]` on the table `ingredients_nutrition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ingredients_id]` on the table `raw_to_prepped_yields` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ingredients_id` on table `ingredient_cooked_yields` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ingredients_id` on table `ingredients_nutrition` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ingredients_id` on table `prep_instructions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ingredients_id` on table `raw_to_prepped_yields` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ingredient_cooked_yields" DROP CONSTRAINT "ingredient_cooked_yields_ingredients_id_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_nutrition" DROP CONSTRAINT "ingredients_nutrition_ingredients_id_fkey";

-- DropForeignKey
ALTER TABLE "prep_instructions" DROP CONSTRAINT "prep_instructions_ingredients_id_fkey";

-- DropForeignKey
ALTER TABLE "raw_to_prepped_yields" DROP CONSTRAINT "raw_to_prepped_yields_ingredients_id_fkey";

-- AlterTable
ALTER TABLE "ingredient_cooked_yields" ALTER COLUMN "ingredients_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "ingredients_nutrition" ALTER COLUMN "ingredients_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "prep_instructions" ALTER COLUMN "ingredients_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "raw_to_prepped_yields" ALTER COLUMN "ingredients_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ingredient_cooked_yields_ingredients_id_key" ON "ingredient_cooked_yields"("ingredients_id");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_nutrition_ingredients_id_key" ON "ingredients_nutrition"("ingredients_id");

-- CreateIndex
CREATE UNIQUE INDEX "raw_to_prepped_yields_ingredients_id_key" ON "raw_to_prepped_yields"("ingredients_id");

-- AddForeignKey
ALTER TABLE "prep_instructions" ADD CONSTRAINT "prep_instructions_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raw_to_prepped_yields" ADD CONSTRAINT "raw_to_prepped_yields_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_cooked_yields" ADD CONSTRAINT "ingredient_cooked_yields_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_nutrition" ADD CONSTRAINT "ingredients_nutrition_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
