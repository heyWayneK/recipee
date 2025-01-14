import React, { ReactNode } from "react";
import { data } from "@/app/data/recipe";
import Row_SubRecipeControls from "./Row_SubRecipeControls";
import Row_SubRecipeSubName from "./Row_SubRecipeName";
import Row_SubRecipeHeader from "./Row_SubRecipeHeader";
import Row_SubRecipeIngredients from "./Row_SubRecipeIngredients";
import Row_SubRecipeAddButtons from "./Row_SubRecipeAddButtons";
import Row_SubRecipeMethod from "./Row_SubRecipeMethod";
import DottedBorder from "./DottedBorder";

interface Row_SubRecipesAllProps {
  className?: string;
}

export const recipeeUI = {
  sub_recipe: ["ingredName", "instruction", "qty", "costPer1000", "%", "move"],
};

const Row_SubRecipesAll: React.FC<Row_SubRecipesAllProps> = ({ className = "" }) => {
  return data.components.map((subRecipe, iSub) => {
    return (
      <DottedBorder key={"recipe_" + iSub + "_" + subRecipe.name}>
        <div
          className={`grid gap-y-2 gap-x-2`}
          style={{
            gridTemplateColumns: `2fr repeat(${recipeeUI.sub_recipe.length - 1}, max-content)`,
          }}
        >
          <Row_SubRecipeControls subRecipeId={iSub} />
          <Row_SubRecipeSubName subRecipeId={iSub} />
          <Row_SubRecipeHeader />
          <Row_SubRecipeIngredients subRecipeId={iSub} subRecipe={subRecipe} />
          <Row_SubRecipeAddButtons subRecipeId={iSub} />
          <Row_SubRecipeMethod subRecipeId={iSub} />
        </div>
      </DottedBorder>
    );
  });
};

export default Row_SubRecipesAll;
