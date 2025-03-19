/*
  Warnings:

  - You are about to drop the column `boiled` on the `cooked_yields` table. All the data in the column will be lost.
  - You are about to drop the column `cooked` on the `cooked_yields` table. All the data in the column will be lost.
  - You are about to drop the column `deep_fry` on the `cooked_yields` table. All the data in the column will be lost.
  - You are about to drop the column `raw` on the `cooked_yields` table. All the data in the column will be lost.
  - You are about to drop the column `roasted` on the `cooked_yields` table. All the data in the column will be lost.
  - You are about to drop the column `shallow_fry` on the `cooked_yields` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cooked_yields" DROP COLUMN "boiled",
DROP COLUMN "cooked",
DROP COLUMN "deep_fry",
DROP COLUMN "raw",
DROP COLUMN "roasted",
DROP COLUMN "shallow_fry",
ADD COLUMN     "yield" DOUBLE PRECISION NOT NULL DEFAULT 0;
