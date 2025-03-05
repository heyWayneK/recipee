/*
  Warnings:

  - The primary key for the `Profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar_url` on the `Profiles` table. All the data in the column will be lost.
  - The `id` column on the `Profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_pkey",
DROP COLUMN "avatar_url",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id");
