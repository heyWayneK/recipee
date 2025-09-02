import React from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";
import { RecipesInDataProps } from "@/types/recipeTypes";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import { useAddIngredientModalStore } from "@/hooks/useAddIngredientModalStore";

interface Row_SubRecipeAddButtonsProps {
  recipe: RecipesInDataProps;
  recipeIndex: number;
}

const Row_SubRecipeAddButtons: React.FC<Row_SubRecipeAddButtonsProps> = ({ recipe, recipeIndex }) => {
  const { createIngredientStep } = useRecipeDataStore();
  const { openModal } = useAddIngredientModalStore();

  const componentPath = `data.recipes[${recipeIndex}]`;

  return (
    <Table_Cell type="controls">
      <Pill tone="dark" iconName="add_circle" onClick={() => openModal(componentPath)}>
        Add Ingredient
      </Pill>
      <Pill tone="dark" iconName="add_circle" onClick={() => createIngredientStep(componentPath)}>
        Add Step
      </Pill>
      <Pill tone="dark" iconName="add_circle" onClick={() => {}}>
        Add Existing Sub Recipe
      </Pill>
    </Table_Cell>
  );
};

export default Row_SubRecipeAddButtons;
