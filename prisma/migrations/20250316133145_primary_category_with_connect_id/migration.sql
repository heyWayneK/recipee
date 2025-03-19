/*
  Warnings:

  - You are about to drop the column `primary_category` on the `ingredients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "primary_category",
ADD COLUMN     "primary_category_id" INTEGER,
ALTER COLUMN "halal_id" DROP DEFAULT,
ALTER COLUMN "kosher_id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_primary_category_id_fkey" FOREIGN KEY ("primary_category_id") REFERENCES "ingredient_category_primary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
