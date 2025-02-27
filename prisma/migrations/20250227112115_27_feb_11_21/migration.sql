/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `nameOther` on the `Ingredients` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "EnumDietClassification" ADD VALUE 'unknown';

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_customerId_fkey";

-- AlterTable
ALTER TABLE "Component" DROP COLUMN "ingredientId";

-- AlterTable
ALTER TABLE "Ingredients" DROP COLUMN "nameOther",
ADD COLUMN     "added_sugar_per_100g" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "artificial_sugar_per_100g" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "carbohydrates_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "carbs_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "dietary_classification" "EnumDietClassification" NOT NULL DEFAULT 'unknown',
ADD COLUMN     "fat_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fibre_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "kcal_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "kj_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "monounsaturate_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "name_alt" TEXT,
ADD COLUMN     "net_carbs_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "omega3_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "omega6_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "omega9_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "polyunsaturate_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "primary_category" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "protein_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "salt_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "saturated_fat_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "secondary_category" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "sodium_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "starch_per_100g" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "total_sugar_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "trans_fats_per_100g" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "customerId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "RawToPreppedYields" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "whole" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "peeled" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "peeled_and_cored" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "diced" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sliced" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grated" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RawToPreppedYields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ComponentToIngredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ComponentToIngredients_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ComponentToIngredients_B_index" ON "_ComponentToIngredients"("B");

-- AddForeignKey
ALTER TABLE "RawToPreppedYields" ADD CONSTRAINT "RawToPreppedYields_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComponentToIngredients" ADD CONSTRAINT "_ComponentToIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComponentToIngredients" ADD CONSTRAINT "_ComponentToIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
