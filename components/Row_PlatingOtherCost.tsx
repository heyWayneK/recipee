import React from "react";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import Row_CatAndLineItems from "./Row_CatAndLineItems";
import { getTextTranslation, replace_ } from "@/utils/utils";

interface Row_PlatingOtherCostProps {
  // Show prices by expanding the cells
  viewPrices: boolean;
}

const Row_PlatingOtherCost: React.FC<Row_PlatingOtherCostProps> = ({ viewPrices }) => {
  const { recipeData, systemData } = useRecipeDataStore();

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
