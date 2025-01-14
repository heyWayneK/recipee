import React from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, formatWeight, getLiveTotal, getTextTranslation, replace_ } from "@/lib/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/UseRecipeData";

interface Row_PlatingCostsSubTotalProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingCostsSubTotal: React.FC<Row_PlatingCostsSubTotalProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
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
          <Table_Cell type="sub_total" key={name + "_" + i} className="">
            <span className=" text-nowrap"> {formatCurrency(cost)}</span>
          </Table_Cell>
          // COLUMN CELLS END
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingCostsSubTotal;
