import React from "react";
import { getTextTranslation, replace_ } from "@/libs/utils";
import { useRecipeData } from "@/contexts/UseRecipeData";

import Row_CatAndLineItems from "./Row_CatAndLineItems";

interface Row_PlatingPackagingCostsProps {
  // Show prices by expanding the cells
  viewPrices: boolean;
}

const Row_PlatingPackagingCosts: React.FC<Row_PlatingPackagingCostsProps> = ({ viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData, systemData } = useRecipeData();

  // SETUP UNIQUE VARS
  const o = {
    name: "packaging_costs",
    translatedName: getTextTranslation(replace_("packaging_costs")),
    catListObj: systemData.packaging_costs_category,
    lineItemsObj: systemData.packaging_costs_line_items_lookup,
    rulesIdObj: recipeData.packingCostPriceRules,
    priceSumObj: recipeData.packingCostPriceTotals,
    updateObj: "packagingCostsId",
    updateObjPath: recipeData.data.packagingCostsId,
    viewPrices: viewPrices,
  };
  // SETUP OBJ VARS
  return <Row_CatAndLineItems {...o} />;
};

export default Row_PlatingPackagingCosts;
