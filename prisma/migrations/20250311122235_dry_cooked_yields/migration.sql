/*
  Warnings:

  - Added the required column `CookedYieldsCategoriesId` to the `CookedYields` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CookedYields" ADD COLUMN     "CookedYieldsCategoriesId" INTEGER NOT NULL,
ADD COLUMN     "yield" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RawToPreppedYields" ADD COLUMN     "yield" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "CookedYieldsCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "yield" DOUBLE PRECISION,
    "isLive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CookedYieldsCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DryCookedYieldsCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "yield" DOUBLE PRECISION,
    "isLive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DryCookedYieldsCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DryCookedYields" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "yield" DOUBLE PRECISION,
    "isLive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ingredientsId" INTEGER,

    CONSTRAINT "DryCookedYields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DryCookedYieldsToDryCookedYieldsCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DryCookedYieldsToDryCookedYieldsCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DryCookedYieldsToDryCookedYieldsCategories_B_index" ON "_DryCookedYieldsToDryCookedYieldsCategories"("B");

-- AddForeignKey
ALTER TABLE "CookedYields" ADD CONSTRAINT "CookedYields_CookedYieldsCategoriesId_fkey" FOREIGN KEY ("CookedYieldsCategoriesId") REFERENCES "CookedYieldsCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DryCookedYields" ADD CONSTRAINT "DryCookedYields_ingredientsId_fkey" FOREIGN KEY ("ingredientsId") REFERENCES "Ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DryCookedYieldsToDryCookedYieldsCategories" ADD CONSTRAINT "_DryCookedYieldsToDryCookedYieldsCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "DryCookedYields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DryCookedYieldsToDryCookedYieldsCategories" ADD CONSTRAINT "_DryCookedYieldsToDryCookedYieldsCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "DryCookedYieldsCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
