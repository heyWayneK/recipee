import React from "react";
import Table_Cell from "./Table_Cell";

import { getTextTranslation } from "@/utils/utils";
import SvgSprite from "./SvgSprite";
import { recipeeUI } from "./Row_SubRecipesAll";
import { useRecipeData } from "@/contexts/useRecipeData";

const getColumHeading = (col: string, org_unit_metric_imperial: string) => {
  switch (col) {
    case "ingredName":
      return getTextTranslation("Ingredient Name");
    case "instruction":
      return getTextTranslation("Cut Size");
    // return <SvgSprite className="fill-white" iconName="info" size={20} />;
    case "qty":
      return getTextTranslation("qty");
    case "costPer1000":
      // return getTextTranslation("cost") + "/" + data.setting.unitMaster[1];
      return getTextTranslation("cost") + "/" + org_unit_metric_imperial;
    case "%":
      return "%";
    case "move":
      return <SvgSprite className="fill-white" iconName="arrow_drop_down" size={20} />;
    default:
      return "--";
  }
};

interface Row_SubRecipeHeaderProps {
  className?: string;
}
const Row_SubRecipeHeader: React.FC<Row_SubRecipeHeaderProps> = ({ className = "" }) => {
  const { recipeData } = useRecipeData();

  return recipeeUI.sub_recipe.map((col) => {
    return (
      <Table_Cell firstCol={false} header={false} type="plating" iconName="" key={"header" + col}>
        {getColumHeading(col, recipeData.measurementUnitsObj.weight[1])}
        {/* BROKEN BUT SOLUTION IS SOMETHING LIKE THIS BUT NEED METRIC AND WEIGHT OR FLUID???
        {getColumHeading(col, systemData.unit_metric_imperial[systemData?.org?.unit_metric_imperial.id])} */}
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
