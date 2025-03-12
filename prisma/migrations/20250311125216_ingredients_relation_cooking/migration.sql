/*
  Warnings:

  - You are about to drop the column `ingredientsId` on the `CookedYields` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientsId` on the `DryCookedYields` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CookedYields" DROP CONSTRAINT "CookedYields_ingredientsId_fkey";

-- DropForeignKey
ALTER TABLE "DryCookedYields" DROP CONSTRAINT "DryCookedYields_ingredientsId_fkey";

-- AlterTable
ALTER TABLE "CookedYields" DROP COLUMN "ingredientsId";

-- AlterTable
ALTER TABLE "DryCookedYields" DROP COLUMN "ingredientsId";

-- CreateTable
CREATE TABLE "_CookedYieldsToIngredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CookedYieldsToIngredients_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DryCookedYieldsToIngredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DryCookedYieldsToIngredients_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CookedYieldsToIngredients_B_index" ON "_CookedYieldsToIngredients"("B");

-- CreateIndex
CREATE INDEX "_DryCookedYieldsToIngredients_B_index" ON "_DryCookedYieldsToIngredients"("B");

-- AddForeignKey
ALTER TABLE "_CookedYieldsToIngredients" ADD CONSTRAINT "_CookedYieldsToIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "CookedYields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CookedYieldsToIngredients" ADD CONSTRAINT "_CookedYieldsToIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DryCookedYieldsToIngredients" ADD CONSTRAINT "_DryCookedYieldsToIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "DryCookedYields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DryCookedYieldsToIngredients" ADD CONSTRAINT "_DryCookedYieldsToIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
