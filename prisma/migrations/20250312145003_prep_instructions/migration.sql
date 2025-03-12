-- AlterTable
ALTER TABLE "CookedYields" ADD COLUMN     "translation" JSONB;

-- AlterTable
ALTER TABLE "CookedYieldsCategories" ADD COLUMN     "translation" JSONB;

-- AlterTable
ALTER TABLE "DryCookedYields" ADD COLUMN     "translation" JSONB;

-- AlterTable
ALTER TABLE "DryCookedYieldsCategories" ADD COLUMN     "translation" JSONB;

-- AlterTable
ALTER TABLE "Ingredients" ADD COLUMN     "translation" JSONB;

-- AlterTable
ALTER TABLE "RawToPreppedYields" ADD COLUMN     "translation" JSONB;

-- CreateTable
CREATE TABLE "PrepInstructions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translation" JSONB,
    "desc" TEXT,
    "yield" DOUBLE PRECISION,
    "isLive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ingredientsId" INTEGER,

    CONSTRAINT "PrepInstructions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PrepInstructions" ADD CONSTRAINT "PrepInstructions_ingredientsId_fkey" FOREIGN KEY ("ingredientsId") REFERENCES "Ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
