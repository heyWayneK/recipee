import React, { ReactNode } from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";

interface Row_SubRecipeAddButtonsProps {
  subRecipeId: number;
  className?: string;
}
const Row_SubRecipeAddButtons: React.FC<Row_SubRecipeAddButtonsProps> = ({ className = "" }) => {
  return (
    <Table_Cell type="controls">
      <Pill tone="dark" iconName="add_circle">
        Add Ingredient
      </Pill>
      <Pill tone="dark" iconName="add_circle">
        Add Step
      </Pill>
    </Table_Cell>
  );
};

export default Row_SubRecipeAddButtons;
