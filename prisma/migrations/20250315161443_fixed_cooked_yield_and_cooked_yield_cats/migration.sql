/*
  Warnings:

  - The values [none] on the enum `EnumDietClassification` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `dietary_classificationId` on the `ingredients` table. All the data in the column will be lost.
  - Added the required column `name` to the `cooked_yields` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumDietClassification_new" AS ENUM ('vegan', 'vegetarian', 'animal_product', 'unknown');
ALTER TYPE "EnumDietClassification" RENAME TO "EnumDietClassification_old";
ALTER TYPE "EnumDietClassification_new" RENAME TO "EnumDietClassification";
DROP TYPE "EnumDietClassification_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_dietary_classificationId_fkey";

-- AlterTable
ALTER TABLE "cooked_yields" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "translation" JSONB;

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "dietary_classificationId",
ADD COLUMN     "dietary_classification_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_dietary_classification_id_fkey" FOREIGN KEY ("dietary_classification_id") REFERENCES "dietary_classification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
