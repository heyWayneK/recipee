/*
  Warnings:

  - You are about to drop the `_cooked_yieldsToingredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_cooked_yieldsToingredients" DROP CONSTRAINT "_cooked_yieldsToingredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_cooked_yieldsToingredients" DROP CONSTRAINT "_cooked_yieldsToingredients_B_fkey";

-- AlterTable
ALTER TABLE "cooked_yields" ADD COLUMN     "ingredients_id" INTEGER;

-- DropTable
DROP TABLE "_cooked_yieldsToingredients";

-- AddForeignKey
ALTER TABLE "cooked_yields" ADD CONSTRAINT "cooked_yields_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
