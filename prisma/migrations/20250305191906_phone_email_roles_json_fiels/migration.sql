/*
  Warnings:

  - The `emails` column on the `Profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `phoneNumbers` column on the `Profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `roles` column on the `Profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "emails",
ADD COLUMN     "emails" JSONB,
DROP COLUMN "phoneNumbers",
ADD COLUMN     "phoneNumbers" JSONB,
DROP COLUMN "roles",
ADD COLUMN     "roles" JSONB;
