/*
  Warnings:

  - You are about to drop the `_DryCookedYieldsToDryCookedYieldsCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `DryCookedYieldsCategoriesId` to the `DryCookedYields` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DryCookedYieldsToDryCookedYieldsCategories" DROP CONSTRAINT "_DryCookedYieldsToDryCookedYieldsCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_DryCookedYieldsToDryCookedYieldsCategories" DROP CONSTRAINT "_DryCookedYieldsToDryCookedYieldsCategories_B_fkey";

-- AlterTable
ALTER TABLE "DryCookedYields" ADD COLUMN     "DryCookedYieldsCategoriesId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_DryCookedYieldsToDryCookedYieldsCategories";

-- AddForeignKey
ALTER TABLE "DryCookedYields" ADD CONSTRAINT "DryCookedYields_DryCookedYieldsCategoriesId_fkey" FOREIGN KEY ("DryCookedYieldsCategoriesId") REFERENCES "DryCookedYieldsCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
