/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ingredients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `desc` to the `allergy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "allergy" DROP CONSTRAINT "allergy_customer_id_fkey";

-- AlterTable
ALTER TABLE "allergy" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "tralation" JSONB,
ALTER COLUMN "customer_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "allergyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "allergy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allergy" ADD CONSTRAINT "allergy_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
