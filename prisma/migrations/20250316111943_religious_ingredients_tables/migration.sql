/*
  Warnings:

  - You are about to drop the column `halal` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `kosher` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `nameAlt` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `production_eventId` on the `production_event_task` table. All the data in the column will be lost.
  - You are about to drop the column `stock_locationId` on the `stock` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `stock_location` table. All the data in the column will be lost.
  - You are about to drop the column `stockId` on the `stock_minimum` table. All the data in the column will be lost.
  - You are about to drop the column `stock_locationId` on the `stock_minimum` table. All the data in the column will be lost.
  - You are about to drop the column `accountTel` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the `recipe_bookIndex` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `production_event_id` to the `production_event_task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_location_id` to the `stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `stock_location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_id` to the `stock_minimum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_location_id` to the `stock_minimum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "production_event_task" DROP CONSTRAINT "production_event_task_production_eventId_fkey";

-- DropForeignKey
ALTER TABLE "recipe_bookIndex" DROP CONSTRAINT "recipe_bookIndex_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_bookIndex" DROP CONSTRAINT "recipe_bookIndex_recipe_book_id_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_stock_locationId_fkey";

-- DropForeignKey
ALTER TABLE "stock_minimum" DROP CONSTRAINT "stock_minimum_stockId_fkey";

-- DropForeignKey
ALTER TABLE "stock_minimum" DROP CONSTRAINT "stock_minimum_stock_locationId_fkey";

-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_statusId_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "halal",
DROP COLUMN "kosher",
DROP COLUMN "name",
DROP COLUMN "nameAlt",
ADD COLUMN     "halal_id" INTEGER,
ADD COLUMN     "kosher_id" INTEGER,
ADD COLUMN     "names_alt" TEXT;

-- AlterTable
ALTER TABLE "production_event_task" DROP COLUMN "production_eventId",
ADD COLUMN     "production_event_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stock" DROP COLUMN "stock_locationId",
ADD COLUMN     "stock_location_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stock_location" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "stock_minimum" DROP COLUMN "stockId",
DROP COLUMN "stock_locationId",
ADD COLUMN     "stock_id" INTEGER NOT NULL,
ADD COLUMN     "stock_location_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "supplier" DROP COLUMN "accountTel",
ADD COLUMN     "account_tel" TEXT;

-- AlterTable
ALTER TABLE "todo" DROP COLUMN "statusId",
ADD COLUMN     "status_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "recipe_bookIndex";

-- DropEnum
DROP TYPE "EnumReligiousCertification";

-- CreateTable
CREATE TABLE "ingredients_religious_certification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'unknown',

    CONSTRAINT "ingredients_religious_certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_book_index" (
    "id" SERIAL NOT NULL,
    "recipe_book_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_book_index_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_kosher_id_fkey" FOREIGN KEY ("kosher_id") REFERENCES "ingredients_religious_certification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_halal_id_fkey" FOREIGN KEY ("halal_id") REFERENCES "ingredients_religious_certification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_stock_location_id_fkey" FOREIGN KEY ("stock_location_id") REFERENCES "stock_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_minimum" ADD CONSTRAINT "stock_minimum_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_minimum" ADD CONSTRAINT "stock_minimum_stock_location_id_fkey" FOREIGN KEY ("stock_location_id") REFERENCES "stock_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_book_index" ADD CONSTRAINT "recipe_book_index_recipe_book_id_fkey" FOREIGN KEY ("recipe_book_id") REFERENCES "recipe_book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_book_index" ADD CONSTRAINT "recipe_book_index_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "todo_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_event_task" ADD CONSTRAINT "production_event_task_production_event_id_fkey" FOREIGN KEY ("production_event_id") REFERENCES "production_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
