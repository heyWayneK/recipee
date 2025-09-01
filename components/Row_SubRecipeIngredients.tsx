import React from "react";
import Row_SubRecipeIngredient from "./Row_SubRecipeIngredient";
// import { RecipesInDataProps, data } from "@/app/api/recipe";
import Row_SubRecipeStep from "./Row_SubRecipeStep";
import { RecipeDetailProps, RecipesInDataProps } from "@/types/recipeTypes";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import Decimal from "decimal.js";
import Row_SubRecipeSubTotal from "./Row_SubRecipeSubTotal";
import Row_SubRecipeMethod from "./Row_SubRecipeMethod";
import Row_SubRecipeAddButtons from "./Row_SubRecipeAddButtons";
import Row_SubRecipeActions from "./Row_SubRecipeActions";

interface Row_SubRecipeIngredientsProps {
  recipe: RecipesInDataProps;
  recipeIndex: number; // INFO: the index of recipe in recipeData.data.recipes[?]array
}
const Row_SubRecipeIngredients: React.FC<Row_SubRecipeIngredientsProps> = ({ recipe, recipeIndex }) => {
  // const { recipeData } = useRecipeDataStore();
  // const recipe = recipeData.data.recipes.find((rec) => recipe.uuid === rec.uuid);

  // if (!recipe) {
  //   const e = `Recipe with ID ${recipe.uuid} not found.`;
  //   console.log(e);
  //   return;
  //   // throw new Error(e);
  // }

  if (recipeIndex === undefined || recipeIndex < 0) {
    const e = `No recipeIndex provided or it is invalid: ${recipeIndex}`;
    console.log(e);
    throw new Error(e);
  }

  const totalWeight = recipe.recipeDetail.reduce((acc, ingred, ii) => acc.plus(ingred.qty_g), new Decimal(0));

  const totalPerc = recipe.recipeDetail.reduce((acc, ingred, ii) => acc.plus(new Decimal(ingred.qty_g).div(totalWeight)), new Decimal(0)).mul(100);

  // INFO: do NOT USE TOTALCOST... its a stupid value. This calculates the total cost of all cost/1000g
  const totalCost = recipe.recipeDetail.reduce((acc, ingred, ii) => acc.plus(ingred.cost_per_1000g), new Decimal(0));

  const allSteps = recipe.recipeDetail.map((ingred) => (ingred.type === "step" ? ingred.stepInstruction : "")).filter((step) => step !== "");

  // RECIPE STEPS
  let stepCount = 1;
  return (
    <>
      {recipe.recipeDetail.map((ingredient, i) =>
        ingredient.type !== "step" ? (
          <Row_SubRecipeIngredient key={ingredient.uuid + "_" + i} ingredient={ingredient} totalWeight={totalWeight} recipeIndex={recipeIndex} ingredientIndex={i} />
        ) : (
          <Row_SubRecipeStep key={"ingredientName_" + i} stepCount={stepCount++} recipeIndex={recipeIndex} ingredient={ingredient}>
            {ingredient.stepInstruction}
          </Row_SubRecipeStep>
        )
      )}
      <Row_SubRecipeSubTotal totalCost={totalCost.toString()} totalWeight={totalWeight.toString()} totalPerc={totalPerc.toString()} />

      <Row_SubRecipeAddButtons recipe={recipe} />

      <Row_SubRecipeMethod recipe={recipe} methods={allSteps} extraMethods={recipe.method} />

      <Row_SubRecipeActions recipe={recipe} methods={allSteps} extraMethods={recipe.method} />
    </>
  );
};

export default Row_SubRecipeIngredients;
