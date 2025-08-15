import React, { ReactNode } from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";
import { RecipeProps } from "@/types/recipeTypes";

interface Row_SubRecipeAddButtonsProps {
  recipe: RecipeProps;
}
const Row_SubRecipeAddButtons: React.FC<Row_SubRecipeAddButtonsProps> = ({ recipe }) => {
  return (
    <Table_Cell type="controls">
      <Pill tone="dark" iconName="add_circle">
        Add Ingredient
      </Pill>
      <Pill tone="dark" iconName="add_circle">
        Add Method Step
      </Pill>
      <Pill tone="dark" iconName="add_circle">
        Add Existing Sub Recipe
      </Pill>
    </Table_Cell>
  );
};

export default Row_SubRecipeAddButtons;
