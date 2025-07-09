import React from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, getTextTranslation, replace_ } from "@/libs/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/useRecipeData";

interface Row_PlatingCostsSubTotalProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingCostsSubTotal: React.FC<Row_PlatingCostsSubTotalProps> = ({ className = "", viewPrices }) => {
  // INFO: useRecipeData: updateRecipeData, systemData, UserData, localOrDbData
  const { recipeData } = useRecipeData();
  const name = "costs_sub_total";

  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} type="sub_total" key={name + "_firstCol"}>
        {getTextTranslation(replace_(name))}
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {recipeData.costsSubTotals.map((cost, i) => {
        return (
          // COLUMN CELLS START
          <Table_Cell type="sub_total" key={name + "_" + i} trackChangeVisually={true} rowNum={i} trackChangesStorageName={name}>
            {formatCurrency(cost)}
          </Table_Cell>
          // COLUMN CELLS END
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingCostsSubTotal;
