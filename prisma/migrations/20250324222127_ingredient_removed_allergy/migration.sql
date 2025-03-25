/*
  Warnings:

  - You are about to drop the column `allergy_id` on the `ingredients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_allergy_id_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "allergy_id",
ADD COLUMN     "allergyId" INTEGER;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "allergy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
