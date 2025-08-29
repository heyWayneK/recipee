import React from "react";

import Table_Cell from "./Table_Cell";
import { getTextTranslation, replace_ } from "@/utils/utils";
// import { data } from "@/app/api/recipe";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import UnitCurrencyFormatter from "./UnitCurrencyFormatter";
import { columnNames } from "./Row_SubRecipesAll";
import Decimal from "decimal.js";
import IngredientUnits from "./IngredientUnits";

const getColumValue = (col: string, org_unit_metric_imperial: string, totalCost: Decimal | string, totalWeight: Decimal | string, totalPerc: Decimal | string) => {
  switch (col) {
    case "ingredName":
      return getTextTranslation("Sub Total");
    //
    // case "this_qty":
    //   return getTextTranslation("Bulk Qty");
    // case "instruction":
    //   return getTextTranslation("Cut Size");
    // return <SvgSprite className="fill-white" iconName="info" size={20} />;
    //
    case "this_qty":
      return <IngredientUnits>{"6.66"}</IngredientUnits>;
    //
    case "qty_g":
      return <IngredientUnits>{totalWeight.toString()}</IngredientUnits>;
    //
    // case "costPer1000g":
    //   // √  TODO: totalCost doesnt make sense here... we need an average or something else
    //   return <UnitCurrencyFormatter>{totalCost.toString()}</UnitCurrencyFormatter>;
    //
    case "%":
      return `${totalPerc}%`;

    default:
      return " ";
  }
};

interface Row_SubRecipeHeaderProps {
  // className?: string;
  totalCost: Decimal | string;
  totalWeight: Decimal | string;
  totalPerc: Decimal | string;
}
const Row_SubRecipeSubTotal: React.FC<Row_SubRecipeHeaderProps> = ({ totalCost = 0, totalWeight = 0, totalPerc = 0 }) => {
  const { recipeData } = useRecipeDataStore();

  return columnNames.sub_recipe.map((col, i) => {
    return (
      <Table_Cell firstCol={i === 0} header={false} type="sub_total" iconName="" key={"header" + col}>
        {getColumValue(col, recipeData.measurementUnitsObj.weight[1], totalCost.toString(), totalWeight.toString(), totalPerc.toString())}
      </Table_Cell>
    );
  });
};

export default Row_SubRecipeSubTotal;
