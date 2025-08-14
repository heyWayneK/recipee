import React from "react";
import Row_SubRecipeIngredient from "./Row_SubRecipeIngredient";
// import { RecipeProps, data } from "@/app/api/recipe";
import Row_SubRecipeStep from "./Row_SubRecipeStep";
import { RecipeProps } from "@/types/recipeTypes";
import { useRecipeData } from "@/contexts/useRecipeData";
import Decimal from "decimal.js";

interface Row_SubRecipeIngredientsProps {
  recipe: RecipeProps;
}
const Row_SubRecipeIngredients: React.FC<Row_SubRecipeIngredientsProps> = ({ recipe }) => {
  const { recipeData } = useRecipeData();
  const findRecipe = recipeData.data.recipes.find((rec) => recipe.uuid === rec.uuid);

  if (!findRecipe) {
    const e = `Recipe with ID ${recipe.uuid} not found.`;
    console.log(e);
    throw new Error(e);
  }

  const totalWeight = findRecipe.recipeDetail.reduce((acc, v, ii) => acc.plus(acc).plus(v.qty_g), new Decimal(0));
  console.log("Total Weight___:", findRecipe.name, totalWeight.toString());
  let stepCount = 1;
  return (
    <>
      {findRecipe.recipeDetail.map((ingredient, i) =>
        ingredient.type === "step" ? (
          <Row_SubRecipeStep key={"ingredientName_" + i} stepCount={stepCount++}>
            {ingredient.stepInstruction}
          </Row_SubRecipeStep>
        ) : (
          <Row_SubRecipeIngredient key={ingredient.ingredId + "_" + i} ingredient={ingredient} totalWeight={totalWeight} />
        )
      )}
    </>
  );
};

export default Row_SubRecipeIngredients;
