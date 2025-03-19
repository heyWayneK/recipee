/*
  Warnings:

  - You are about to drop the column `tralation` on the `allergy` table. All the data in the column will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_brand_id_fkey";

-- AlterTable
ALTER TABLE "allergy" DROP COLUMN "tralation",
ADD COLUMN     "translation" JSONB;

-- DropTable
DROP TABLE "Brand";

-- CreateTable
CREATE TABLE "allergyIngredient" (
    "id" SERIAL NOT NULL,
    "allergy_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allergyIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoSrc" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhook_queue" (
    "id" SERIAL NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "webhook_queue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "allergyIngredient" ADD CONSTRAINT "allergyIngredient_allergy_id_fkey" FOREIGN KEY ("allergy_id") REFERENCES "allergy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allergyIngredient" ADD CONSTRAINT "allergyIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_queue" ADD CONSTRAINT "webhook_queue_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
