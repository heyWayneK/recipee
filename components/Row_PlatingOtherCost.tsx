import React from "react";
import Table_Cell from "./Table_Cell";
import { formatCurrency, getTextTranslation, replace_ } from "@/libs/utils";
import { PreCalculatedRecipeData, useRecipeData } from "@/contexts/UseRecipeData";
import MenuPopupOnMouseOver, { MenuOptionsProps } from "./MenuPopupOnMouseOver";
import Row_FirstRowTableCell from "./Row_FirstRowTableCell";
import Row_CatAndLineItems from "./Row_CatAndLineItems";

interface Row_PlatingOtherCostProps {
  // Show prices by expanding the cells
  viewPrices: boolean;
}

const Row_PlatingOtherCost: React.FC<Row_PlatingOtherCostProps> = ({ viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData, systemData } = useRecipeData();

  // SETUP UNIQUE VARS
  const o = {
    name: "other_costs",
    translatedName: getTextTranslation(replace_("other_costs")),
    catListObj: systemData.other_costs_category,
    lineItemsObj: systemData.other_costs_line_items_lookup,
    rulesIdObj: recipeData.otherCostsPriceRules,
    priceSumObj: recipeData.otherCostsPriceTotals,
    updateObj: "otherCostsId",
    updateObjPath: recipeData.data.otherCostsId,
    viewPrices: viewPrices,
  };
  // SETUP OBJ VARS
  return <Row_CatAndLineItems {...o} />; // Correct JSX spread syntax
};

export default Row_PlatingOtherCost;
