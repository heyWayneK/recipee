import React from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";
import { RecipesInDataProps } from "@/types/recipeTypes";
import { useAddIngredientModalStore } from "@/hooks/useAddIngredientModalStore";
import { useAddStepModalStore } from "@/hooks/useAddStepModalStore";

interface Row_SubRecipeAddButtonsProps {
  recipe: RecipesInDataProps;
  recipeIndex: number;
}

const Row_SubRecipeAddButtons: React.FC<Row_SubRecipeAddButtonsProps> = ({ recipe, recipeIndex }) => {
  const { openModal: openIngredientModal } = useAddIngredientModalStore();
  const { openModal: openStepModal } = useAddStepModalStore();

  const componentPath = `data.recipes[${recipeIndex}]`;

  return (
    <Table_Cell type="controls">
      <Pill tone="dark" iconName="add_circle" onClick={() => openIngredientModal(componentPath)}>
        Add Ingredient
      </Pill>
      <Pill tone="dark" iconName="add_circle" onClick={() => openStepModal(componentPath)}>
        Add Step
      </Pill>
      <Pill tone="dark" iconName="add_circle" onClick={() => {}}>
        Add Existing Sub Recipe
      </Pill>
    </Table_Cell>
  );
};

export default Row_SubRecipeAddButtons;
