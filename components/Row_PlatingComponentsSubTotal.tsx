import React from "react";
import Table_Cell from "./Table_Cell";
import { getTextTranslation, replace_ } from "@/libs/utils";
import { useRecipeData } from "@/contexts/UseRecipeData";

interface Row_PlatingComponentsSubTotalProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingComponentsSubTotal: React.FC<Row_PlatingComponentsSubTotalProps> = ({ className = "", viewPrices }) => {
  // INFO: Other useRecipeData vars: qty, setQty, recipeData, updateRecipeData
  const { recipeData } = useRecipeData();
  const name = "components_sub_total";
  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} type="sub_total" key={name + +"_"}>
        {getTextTranslation(replace_(name))}
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {recipeData.componentsSubTotalsPrices.map((price, i) => {
        return (
          <Table_Cell type="sub_total" key={name + "_" + i}>
            {recipeData.data.setting.currency}
            {price.toFixed(2)}
          </Table_Cell>
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingComponentsSubTotal;
