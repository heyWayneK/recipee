import React from "react";
import Row_SubRecipeIngredient from "./Row_SubRecipeIngredient";
// import { RecipeProps, data } from "@/app/api/recipe";
import Row_SubRecipeStep from "./Row_SubRecipeStep";
import { RecipeProps } from "@/types/recipeTypes";
import { useRecipeData } from "@/contexts/useRecipeData";
import Decimal from "decimal.js";
import Row_SubRecipeSubTotal from "./Row_SubRecipeSubTotal";
import Row_SubRecipeMethod from "./Row_SubRecipeMethod";
import Row_SubRecipeAddButtons from "./Row_SubRecipeAddButtons";
import Row_SubRecipeActions from "./Row_SubRecipeActions";

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

  const totalWeight = findRecipe.recipeDetail.reduce((acc, ingred, ii) => acc.plus(ingred.qty_g), new Decimal(0));

  const totalPerc = findRecipe.recipeDetail.reduce((acc, ingred, ii) => acc.plus(new Decimal(ingred.qty_g).div(totalWeight)), new Decimal(0)).mul(100);

  // INFO: do NOT USE TOTALCOST... its a stupid value. This calculates the total cost of all cost/1000g
  const totalCost = findRecipe.recipeDetail.reduce((acc, ingred, ii) => acc.plus(ingred.costPer1000g), new Decimal(0));

  const allSteps = findRecipe.recipeDetail.map((ingred) => (ingred.type === "step" ? ingred.stepInstruction : "")).filter((step) => step !== "");

  let stepCount = 1;
  return (
    <>
      {findRecipe.recipeDetail.map((ingredient, i) =>
        ingredient.type !== "step" ? (
          <Row_SubRecipeIngredient key={ingredient.ingredId + "_" + i} ingredient={ingredient} totalWeight={totalWeight} />
        ) : (
          <Row_SubRecipeStep key={"ingredientName_" + i} stepCount={stepCount++}>
            {ingredient.stepInstruction}
          </Row_SubRecipeStep>
        )
      )}
      <Row_SubRecipeSubTotal totalCost={totalCost.toString()} totalWeight={totalWeight.toString()} totalPerc={totalPerc.toString()} />

      <Row_SubRecipeAddButtons recipe={findRecipe} />

      <Row_SubRecipeMethod recipe={findRecipe} methods={allSteps} extraMethods={findRecipe.method} />

      <Row_SubRecipeActions recipe={findRecipe} methods={allSteps} extraMethods={findRecipe.method} />
    </>
  );
};

export default Row_SubRecipeIngredients;
