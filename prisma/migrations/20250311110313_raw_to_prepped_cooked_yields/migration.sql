/*
  Warnings:

  - You are about to drop the column `createdAt` on the `RawToPreppedYields` table. All the data in the column will be lost.
  - You are about to drop the column `diced` on the `RawToPreppedYields` table. All the data in the column will be lost.
  - You are about to drop the column `grated` on the `RawToPreppedYields` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `RawToPreppedYields` table. All the data in the column will be lost.
  - You are about to drop the column `peeled` on the `RawToPreppedYields` table. All the data in the column will be lost.
  - You are about to drop the column `peeled_and_cored` on the `RawToPreppedYields` table. All the data in the column will be lost.
  - You are about to drop the column `sliced` on the `RawToPreppedYields` table. All the data in the column will be lost.
  - You are about to drop the column `whole` on the `RawToPreppedYields` table. All the data in the column will be lost.
  - Added the required column `name` to the `RawToPreppedYields` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RawToPreppedYields" DROP CONSTRAINT "RawToPreppedYields_ingredientId_fkey";

-- AlterTable
ALTER TABLE "RawToPreppedYields" DROP COLUMN "createdAt",
DROP COLUMN "diced",
DROP COLUMN "grated",
DROP COLUMN "ingredientId",
DROP COLUMN "peeled",
DROP COLUMN "peeled_and_cored",
DROP COLUMN "sliced",
DROP COLUMN "whole",
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "ingredientsId" INTEGER,
ADD COLUMN     "isLive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CookedYields" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "isLive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ingredientsId" INTEGER,

    CONSTRAINT "CookedYields_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RawToPreppedYields" ADD CONSTRAINT "RawToPreppedYields_ingredientsId_fkey" FOREIGN KEY ("ingredientsId") REFERENCES "Ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookedYields" ADD CONSTRAINT "CookedYields_ingredientsId_fkey" FOREIGN KEY ("ingredientsId") REFERENCES "Ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
