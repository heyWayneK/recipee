import React from "react";
import Table_Cell from "./Table_Cell";
import { recipeeUI } from "./Row_SubRecipesAll";
import { formatCurrency } from "@/utils/utils";
import SvgSprite from "./SvgSprite";
import MenuOption1 from "./MenuOption1";
import IngredientUnits from "./IngredientUnits";

interface Row_SubRecipeIngredientProps {
  className?: string;
  ingredient: any;
  // ingredient: recipeDetailProps;
  totalWeight: number;
}
// (typeof toneOptions)[number]
const Row_SubRecipeIngredient: React.FC<Row_SubRecipeIngredientProps> = ({ className = "", ingredient, totalWeight }) => {
  const { ingredId, ingredName, qty, order, type, instruction, dietClassification, stepInstruction, supplier, unitType, costPer1000, needsPrep, FQscore } = ingredient;

  const formatColContent = (type: string, value: any) => {
    // TYPEs: col = ingredName, instruction, qty, costPer100, %, move
    switch (type) {
      case "%":
        return ((qty / totalWeight) * 100).toFixed(1) + "%";
      case "move":
        return (
          <MenuOption1>
            <SvgSprite iconName="arrow_drop_down" size={15} />
          </MenuOption1>
        );
      case "costPer1000":
        return formatCurrency(value);
      case "qty":
        return <IngredientUnits>{qty}</IngredientUnits>;
      default:
        return value;
    }
  };

  return (
    <>
      {recipeeUI.sub_recipe.map((col, i) => {
        return (
          <Table_Cell className="" firstCol={i === 0} type="ingredient" key={col + "_" + i}>
            <div>{formatColContent(col, ingredient[col])}</div>
          </Table_Cell>
        );
      })}
    </>
  );
};

export default Row_SubRecipeIngredient;

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
