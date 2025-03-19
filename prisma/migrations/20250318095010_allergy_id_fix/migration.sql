/*
  Warnings:

  - You are about to drop the column `allergyId` on the `ingredients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_allergyId_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "allergyId",
ADD COLUMN     "allergy_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_allergy_id_fkey" FOREIGN KEY ("allergy_id") REFERENCES "allergy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
