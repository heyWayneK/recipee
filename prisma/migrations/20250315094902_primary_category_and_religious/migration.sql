-- CreateEnum
CREATE TYPE "EnumReligiousCertification" AS ENUM ('likeley', 'unlikely', 'unknown');

-- CreateEnum
CREATE TYPE "EnumPrimaryCategory" AS ENUM ('alcoholic_beverages', 'baking_ingredients', 'broths_stocks', 'condiments_sauces', 'dairy', 'eggs', 'fats_oils', 'fermented_foods', 'flavorings_extracts', 'fruits', 'grains_cereals', 'herbs_spices', 'legumes', 'meat', 'mushrooms', 'non_alcoholic_beverages', 'nuts_seeds', 'other', 'pasta_noodles', 'plant_based_proteins', 'poultry', 'seafood', 'seaweed', 'sugars_sweeteners', 'vegetables', 'vitamins_minerals_supplements', 'water');

-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "confidence" DOUBLE PRECISION,
ADD COLUMN     "halal" "EnumReligiousCertification",
ADD COLUMN     "kosher" "EnumReligiousCertification";
