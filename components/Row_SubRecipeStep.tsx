import React, { ReactNode } from "react";
import Table_Cell from "./Table_Cell";
import { RecipeDetailProps } from "@/types/recipeTypes";

interface Row_SubRecipeStepProps {
  children: ReactNode;
  stepCount: number;
  recipeIndex: number; // INFO: the index of recipe in recipeData.data.recipes[?]array
  ingredient: RecipeDetailProps;
}
const Row_SubRecipeStep: React.FC<Row_SubRecipeStepProps> = ({ children, stepCount, recipeIndex, ingredient }) => {
  if (recipeIndex < 0 || recipeIndex === undefined) {
    const e = `No recipeIndex provided.`;
    console.log(e);
    throw new Error(e);
  }

  if (!ingredient) {
    const e = `No ingredient provided.`;
    console.log(e);
    throw new Error(e);
  }

  return (
    <Table_Cell firstCol={false} className={"grid grid-flow-col"} type="step" iconName="lightbulb" key={"step" + "_" + stepCount}>
      <span className="font-extrabold uppercase ">
        step
        {` ${stepCount}`}
      </span>
      : {children}
    </Table_Cell>
  );
};

export default Row_SubRecipeStep;
