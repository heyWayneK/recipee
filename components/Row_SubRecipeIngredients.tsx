import React from "react";
import Row_SubRecipeIngredient from "./Row_SubRecipeIngredient";
import { ComponentsProps, RecipeProps, data } from "@/app/data/recipe";
import Row_SubRecipeStep from "./Row_SubRecipeStep";

interface Row_SubRecipeIngredientsProps {
  recipe: RecipeProps;
}
const Row_SubRecipeIngredients: React.FC<Row_SubRecipeIngredientsProps> = ({ recipe }) => {
  const findRecipe = data.recipes.find((rec) => recipe.id === rec.id);

  if (!findRecipe) {
    const e = `Recipe with ID ${recipe.id} not found.`;
    console.log(e);
    throw new Error(e);
  }

  const totalWeight = findRecipe.recipeDetail.reduce((acc, v) => (acc += v.qty), 0);
  let stepCount = 1;
  return (
    <>
      {findRecipe.recipeDetail.map((ingredient, i) =>
        ingredient.type === "step" ? (
          <Row_SubRecipeStep key={"ingredientName_" + i} stepCount={stepCount++}>
            {ingredient.ingredName}
          </Row_SubRecipeStep>
        ) : (
          <Row_SubRecipeIngredient key={ingredient.ingredId + "_" + i} ingredient={ingredient} totalWeight={totalWeight} />
        )
      )}
    </>
  );
};

export default Row_SubRecipeIngredients;
