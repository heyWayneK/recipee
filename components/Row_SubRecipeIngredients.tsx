import React from "react";
import Row_SubRecipeIngredient from "./Row_SubRecipeIngredient";
import { ComponentsProps, data } from "@/app/data/recipe";
import Row_SubRecipeStep from "./Row_SubRecipeStep";

interface Row_SubRecipeIngredientsProps {
  subRecipeId: number;
  subRecipe: ComponentsProps;
  className?: string;
}
const Row_SubRecipeIngredients: React.FC<Row_SubRecipeIngredientsProps> = ({ subRecipeId, subRecipe, className = "" }) => {
  const totalWeight = subRecipe.recipe.recipeDetail.reduce((acc, v) => (acc += v.qty), 0);
  let stepCount = 1;
  return (
    <>
      {data.components[subRecipeId].recipe.recipeDetail.map((ingredient, i) =>
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
