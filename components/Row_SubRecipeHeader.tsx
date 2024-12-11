import React from "react";
import Table_Cell from "./Table_Cell";

import { recipeDetailProps, recipeeUI } from "@/app/data/recipe";
import Pill from "./Pill";
import { formatCurrency } from "@/lib/utils";

interface Row_SubRecipeHeaderProps {
  className?: string;
}
const Row_SubRecipeHeader: React.FC<Row_SubRecipeHeaderProps> = ({ className = "" }) => {
  return recipeeUI.sub_recipe.map((col) => {
    return (
      <Table_Cell firstCol={true} header={true} type="plating" iconName="" key={"header" + col}>
        {col}
      </Table_Cell>
    );
  });
};

export default Row_SubRecipeHeader;

/**
 * 
ingredId
ingredName, qty
order,
type,
instruction,
dietClassification,
stepInstruction,
supplier,
unitType,
costPer1000,
needsPrep,
FQscore,
 * 
 */
