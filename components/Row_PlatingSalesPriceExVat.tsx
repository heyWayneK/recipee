import React from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, formatWeight, getTextTranslation, replace_ } from "@/libs/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/UseRecipeData";

interface Row_PlatingSalesPriceExVatProps {
  viewPrices: boolean;
}

const Row_PlatingSalesPriceExVat: React.FC<Row_PlatingSalesPriceExVatProps> = ({ viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = "sale_price_(ex_vat)";

  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} type="sub_total" key={name + "_firstCol"}>
        {getTextTranslation(replace_(name))}
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {data.portions.map((portionSize, i) => {
        return (
          // COLUMN CELLS START
          <Table_Cell type="sub_total" key={name + "_" + i} trackChangeVisually={true} rowNum={i} trackChangesStorageName={name}>
            {formatCurrency(recipeData.salePricesExVat[i])}
          </Table_Cell>
          // COLUMN CELLS END
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingSalesPriceExVat;
