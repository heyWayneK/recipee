import React from "react";
import Row_SubRecipeControls from "./Row_SubRecipeControls";
import Row_SubRecipeSubName from "./Row_SubRecipeName";
import Row_SubRecipeHeader from "./Row_SubRecipeHeader";
import Row_SubRecipeIngredients from "./Row_SubRecipeIngredients";
import DottedBorder from "./DottedBorder";
import { RecipesInDataProps } from "@/types/recipeTypes";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";

interface Row_SubRecipesAllProps {
  recipeIndex: number;
}

export const columnNames = {
  sub_recipe: ["ingredName", "this_qty", "instruction", "cost_per_1000g", "qty_g", "%", "move"],
};

const Row_SubRecipesAll: React.FC<Row_SubRecipesAllProps> = () => {
  const { recipeData } = useRecipeDataStore();

  // return recipeData.data.components.map((subRecipe, i) => {
  return recipeData.data.recipes.map((subRecipe, i) => {
    // Recipes are a flat structure, so we need to find the recipe by its uuid
    const findRecipe: RecipesInDataProps | undefined = recipeData.data.recipes.find((recipe) => recipe.uuid === subRecipe.uuid);

    if (!findRecipe) {
      const e = `Recipe with ID ${subRecipe.uuid} not found.`;
      console.log(e);
      throw new Error(e);
    }

    const findRecipeIndex: number = recipeData.data.recipes.findIndex((recipe) => recipe.uuid === subRecipe.uuid);

    if (findRecipeIndex === -1) {
      const e = `No Recipe Index for ${subRecipe.uuid} not found in recipes array.`;
      console.log(e);
      throw new Error(e);
    }

    return (
      <DottedBorder key={findRecipe.uuid + "_" + i}>
        <div
          className={`grid gap-y-2 gap-x-2`}
          style={{
            gridTemplateColumns: `2fr repeat(${columnNames.sub_recipe.length - 1}, max-content)`,
          }}
        >
          <Row_SubRecipeControls recipe={findRecipe} />
          <Row_SubRecipeSubName subRecipe={subRecipe} colorNum={i} recipeIndex={findRecipeIndex} />
          <Row_SubRecipeHeader />
          <Row_SubRecipeIngredients recipe={findRecipe} recipeIndex={findRecipeIndex} />
        </div>
      </DottedBorder>
    );
  });
};

export default Row_SubRecipesAll;
