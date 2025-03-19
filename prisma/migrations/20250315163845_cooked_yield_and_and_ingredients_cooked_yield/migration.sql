/*
  Warnings:

  - You are about to drop the column `ingredients_id` on the `cooked_yields` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cooked_yields" DROP CONSTRAINT "cooked_yields_ingredients_id_fkey";

-- AlterTable
ALTER TABLE "cooked_yields" DROP COLUMN "ingredients_id",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_live" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "cooked_yields_categories" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ingredient_cooked_yields" (
    "id" SERIAL NOT NULL,
    "ingredients_id" INTEGER,
    "raw" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cooked" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deep_fry" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shallow_fry" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "boiled" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "roasted" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredient_cooked_yields_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredient_cooked_yields" ADD CONSTRAINT "ingredient_cooked_yields_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
