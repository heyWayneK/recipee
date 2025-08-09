import React from "react";
// import { data } from "@/app/api/recipe";
import Row_SubRecipeControls from "./Row_SubRecipeControls";
import Row_SubRecipeSubName from "./Row_SubRecipeName";
import Row_SubRecipeHeader from "./Row_SubRecipeHeader";
import Row_SubRecipeIngredients from "./Row_SubRecipeIngredients";
import Row_SubRecipeAddButtons from "./Row_SubRecipeAddButtons";
import Row_SubRecipeMethod from "./Row_SubRecipeMethod";
import DottedBorder from "./DottedBorder";
import { RecipeProps } from "@/types/recipeTypes";
import { useRecipeData } from "@/contexts/useRecipeData";

interface Row_SubRecipesAllProps {}

export const recipeeUI = {
  sub_recipe: ["ingredName", "instruction", "qty", "costPer1000", "%", "move"],
};

const Row_SubRecipesAll: React.FC<Row_SubRecipesAllProps> = () => {
  const { recipeData } = useRecipeData();

  // return recipeData.data.components.map((subRecipe, i) => {
  return recipeData.data.components.map((subRecipe, i) => {
    // Recipes are a flat structure, so we need to find the recipe by its uuid
    const findRecipe: RecipeProps | undefined = recipeData.data.recipes.find((recipe) => recipe.uuid === subRecipe.uuid);

    if (!findRecipe) {
      const e = `Recipe with ID ${subRecipe.uuid} not found.`;
      console.log(e);
      throw new Error(e);
    }

    return (
      <DottedBorder key={findRecipe.uuid + "_" + i}>
        <div
          className={`grid gap-y-2 gap-x-2`}
          style={{
            gridTemplateColumns: `2fr repeat(${recipeeUI.sub_recipe.length - 1}, max-content)`,
          }}
        >
          <Row_SubRecipeControls recipe={findRecipe} />
          <Row_SubRecipeSubName subRecipe={subRecipe} colorNum={i} />
          <Row_SubRecipeHeader />
          <Row_SubRecipeIngredients recipe={findRecipe} />
          <Row_SubRecipeAddButtons recipe={findRecipe} />
          <Row_SubRecipeMethod recipe={findRecipe} />
        </div>
      </DottedBorder>
    );
  });
};

export default Row_SubRecipesAll;
