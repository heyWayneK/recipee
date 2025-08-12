import React from "react";
import Table_Cell from "./Table_Cell";
import { getTextTranslation, replace_ } from "@/utils/utils";
import { useRecipeData } from "@/contexts/useRecipeData";
import Decimal from "decimal.js";

interface Row_PlatingComponentsSubTotalProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingComponentsSubTotal: React.FC<Row_PlatingComponentsSubTotalProps> = ({ className = "", viewPrices }) => {
  // INFO: Other useRecipeData vars: qty, setQty, recipeData, updateRecipeData
  const { recipeData, systemData } = useRecipeData();
  const name = "components_sub_total";
  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} type="sub_total" key={name + +"_"}>
        {getTextTranslation(replace_(name))}
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {recipeData.componentsSubTotalsPrices.map((price: Decimal, i) => {
        return (
          <Table_Cell type="sub_total" key={name + "_" + i}>
            {recipeData.currencySymbol}
            {/* {price.toDecimalPlaces(2).toString()} */}
            {Number(price).toFixed(2).toString()}
          </Table_Cell>
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingComponentsSubTotal;
