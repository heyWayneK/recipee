/*
  Warnings:

  - Added the required column `name` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Inside the migration file
ALTER TABLE "ingredients" ADD COLUMN "name" TEXT NOT NULL DEFAULT 'default_name';
