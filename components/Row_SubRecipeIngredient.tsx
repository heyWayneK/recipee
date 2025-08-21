import React from "react";
import Table_Cell from "./Table_Cell";
import { recipeeUI } from "./Row_SubRecipesAll";
import SvgSprite from "./SvgSprite";
import MenuOption1 from "./MenuOption1";
import IngredientUnits from "./IngredientUnits";
import UnitCurrencyFormatter from "./UnitCurrencyFormatter";
import Decimal from "decimal.js";
import { recipeDetailProps } from "@/types/recipeTypes";
import TextEditable from "./TextEditable";

interface Row_SubRecipeIngredientProps {
  ingredient: recipeDetailProps;
  totalWeight: Decimal;
  recipeIndex: number; // INFO: the index of recipe in recipeData.data.recipes[?]array
  ingredientIndex: number;
}
// (typeof toneOptions)[number]
const Row_SubRecipeIngredient: React.FC<Row_SubRecipeIngredientProps> = ({ ingredient, totalWeight, recipeIndex, ingredientIndex }) => {
  // INFO:  const { ingredId, ingredName, qty_g, order, type, instruction, dietClassification, stepInstruction, supplier, unitType, costPer1000g, needsPrep, FQscore } = ingredient;
  const { qty_g, uuid, ingredId, ingredName } = ingredient;

  // if (!findRecipeIndex) {
  //   const e = `No findRecipeIndex provided.`;
  //   console.log(e);
  //   throw new Error(e);
  // }

  if (ingredientIndex < 0 || ingredientIndex === undefined) {
    const e = `No ingredientIndex provided or it is invalid: ${ingredientIndex}`;
    console.log(e);
    throw new Error(e);
  }

  const formatColContent = (type: string, value: any, ingredIndex: number) => {
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
          <div className=" overflow-hidden whitespace-nowrap w-full">
            {/* {value} */}
            <TextEditable
              title={`${value}`}
              // path={`data.recipes[0].recipeDetail[${ingredient.order}].ingredName`}
              path={`data.recipes[${recipeIndex}].recipeDetail[${ingredientIndex}].ingredName`}
              dbExpectedType="plaintext"
              optionalContent={`Add ingredient name...`}
              instantDbUpdate={true}
              dbUpdateConfig={{
                model: "recipe_detail_row",
                id: ingredient.uuid,
                idColName: "uuid",
                field: "name_extra_info",
              }}
            />
            <span className=" !text-xs">
              isSalt:{ingredient.isSalt} isOil:{ingredient.isOil} uuid:{ingredient.uuid} name:{ingredient.ingredName} ingredId:{ingredId} subrecipeId : {ingredient.subRecipeId}
            </span>
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <>
      {/* INFO: Column Name
          recipeeUI.sub_recipe: ["ingredName", "this_qty", "instruction", "costPer1000g", "qty_g", "%", "move"], 
      */}
      {recipeeUI.sub_recipe.map((col, ingredIndex) => {
        return (
          <Table_Cell edit={ingredIndex === 0 ? "edit" : null} firstCol={ingredIndex === 0} type="ingredient" key={col + "_" + ingredIndex} dbDataId={uuid}>
            {/* col is column name. to collect the correct value */}
            {formatColContent(col, ingredient[col as keyof recipeDetailProps] ? ingredient[col as keyof recipeDetailProps] : "", ingredIndex)}
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
