import React from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";
import { RecipeDetailProps, RecipesInDataProps } from "@/types/recipeTypes";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";

interface Row_SubRecipeAddButtonsProps {
  recipe: RecipesInDataProps;
}

const addIngredient = (recipe: RecipeDetailProps) => {
  // Logic to add an ingredient to the recipe
  console.log(`Adding ingredient to recipe: ${recipe.ingredient.name}`);
};
const addMethodStep = (recipe: RecipeDetailProps) => {
  // Logic to add a method step to the recipe
  console.log(`Adding method step to recipe: ${recipe.ingredient.name}`);
};

const Row_SubRecipeAddButtons: React.FC<Row_SubRecipeAddButtonsProps> = ({ recipe }) => {
  const { recipeData, createIngredient, createIngredientStep, createIngredientAsSub } = useRecipeDataStore();

  const recipeUuid = recipe.uuid;
  return (
    <Table_Cell type="controls">
      {/* <Pill tone="dark" iconName="add_circle" onClick={() => createIngredient()}> */}
      <Pill tone="dark" iconName="add_circle" onClick={() => {}}>
        Add Ingredient
      </Pill>
      {/* <Pill tone="dark" iconName="add_circle" onClick={() => createIngredientStep()}> */}
      <Pill tone="dark" iconName="add_circle" onClick={() => {}}>
        Add Step
      </Pill>
      {/* <Pill tone="dark" iconName="add_circle" onClick={() => createIngredientAsSub()}> */}
      <Pill tone="dark" iconName="add_circle" onClick={() => {}}>
        Add Existing Sub Recipe
      </Pill>
    </Table_Cell>
  );
};

export default Row_SubRecipeAddButtons;
