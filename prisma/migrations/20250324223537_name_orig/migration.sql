/*
  Warnings:

  - You are about to drop the column `names_orig` on the `ingredients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "names_orig",
ADD COLUMN     "name_orig" TEXT;
