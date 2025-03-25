/*
  Warnings:

  - You are about to drop the `allergyIngredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "allergyIngredient" DROP CONSTRAINT "allergyIngredient_allergy_id_fkey";

-- DropForeignKey
ALTER TABLE "allergyIngredient" DROP CONSTRAINT "allergyIngredient_ingredient_id_fkey";

-- DropTable
DROP TABLE "allergyIngredient";

-- CreateTable
CREATE TABLE "allergy_ingredient" (
    "id" SERIAL NOT NULL,
    "allergy_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allergy_ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "allergy_ingredient" ADD CONSTRAINT "allergy_ingredient_allergy_id_fkey" FOREIGN KEY ("allergy_id") REFERENCES "allergy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allergy_ingredient" ADD CONSTRAINT "allergy_ingredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
