import React from "react";
import Table_Cell from "./Table_Cell";
import { recipeeUI } from "./Row_SubRecipesAll";
import SvgSprite from "./SvgSprite";
import MenuOption1 from "./MenuOption1";
import IngredientUnits from "./IngredientUnits";
import UnitCurrencyFormatter from "./UnitCurrencyFormatter";
import Decimal from "decimal.js";
import { RecipeDataProps, recipeDetailProps } from "@/types/recipeTypes";

interface Row_SubRecipeIngredientProps {
  ingredient: recipeDetailProps;
  totalWeight: Decimal;
}
// (typeof toneOptions)[number]
const Row_SubRecipeIngredient: React.FC<Row_SubRecipeIngredientProps> = ({ ingredient, totalWeight }) => {
  // INFO:  const { ingredId, ingredName, qty_g, order, type, instruction, dietClassification, stepInstruction, supplier, unitType, costPer1000g, needsPrep, FQscore } = ingredient;
  const { qty_g } = ingredient;

  const formatColContent = (type: string, value: any) => {
    // TYPEs: col = ingredName, instruction, qty, costPer100, %, move
    switch (type) {
      case "%":
        // avoid dividing by 0
        if (totalWeight.isZero() || new Decimal(qty_g).isZero()) {
          return "0%";
        }
        return new Decimal(qty_g).dividedBy(totalWeight).mul(100).toFixed(1) + "%";
      case "move":
        return (
          <MenuOption1>
            <SvgSprite iconName="arrow_drop_down" size={15} />
          </MenuOption1>
        );
      case "costPer1000g":
        return <UnitCurrencyFormatter>{value}</UnitCurrencyFormatter>;
      case "qty_g":
        return <IngredientUnits>{qty_g.toString()}</IngredientUnits>;
      case "ingredName":
        return (
          <div>
            {value}{" "}
            <span className=" !text-xs">
              isSalt:{ingredient.isSalt} isOil:{ingredient.isOil}
            </span>
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <>
      {recipeeUI.sub_recipe.map((col, i) => {
        return (
          <Table_Cell edit={i === 0 ? "edit" : null} firstCol={i === 0} type="ingredient" key={col + "_" + i}>
            <div>{formatColContent(col, ingredient[col as keyof recipeDetailProps] ? ingredient[col as keyof recipeDetailProps] : "")}</div>
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
