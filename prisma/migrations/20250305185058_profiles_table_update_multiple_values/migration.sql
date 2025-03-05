/*
  Warnings:

  - You are about to drop the column `email` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `organisation` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Profiles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Profiles_email_key";

-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "email",
DROP COLUMN "organisation",
DROP COLUMN "role",
ADD COLUMN     "emails" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "lastSignInAt" TEXT,
ADD COLUMN     "organisations" TEXT,
ADD COLUMN     "phoneNumbers" TEXT,
ADD COLUMN     "roles" TEXT;
