/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profiles_userId_key" ON "Profiles"("userId");
