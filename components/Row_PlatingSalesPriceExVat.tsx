import React from "react";

import Table_Cell from "./Table_Cell";
import { cleanComponentKeyName, formatCurrency, formatWeight, getTextTranslation, replace_ } from "@/libs/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/UseRecipeData";
import Row_FirstRowTableCell from "./Row_FirstRowTableCell";
import ViewPrices from "./ViewPrices";

interface Row_PlatingSalesPriceExVatProps {
  viewPrices: boolean;
}

const Row_PlatingSalesPriceExVat: React.FC<Row_PlatingSalesPriceExVatProps> = ({ viewPrices }) => {
  // INFO: useRecipeData: updateRecipeData, systemData, UserData, localOrDbData
  const { recipeData } = useRecipeData();

  const o = {
    name: cleanComponentKeyName("sale_price_(ex_vat)"),
    translatedName: getTextTranslation(replace_("sale_price_(ex_vat)")),
  };

  return (
    <>
      <Row_FirstRowTableCell translatedName={o.translatedName} />

      {/* OTHER COLUMNS START */}
      {data.portions.map((portionSize, i) => {
        return (
          // COLUMN CELLS START
          <Table_Cell type="text" key={o.name + "_" + i} trackChangeVisually={true} rowNum={i} trackChangesStorageName={o.name}>
            {formatCurrency(recipeData.salePricesExVat[i])}

            <ViewPrices viewPrices={viewPrices}>sub-total: {formatCurrency(recipeData.costsSubTotals[i]) + " + markup: " + formatCurrency(recipeData.markUpPriceAmounts[i])}</ViewPrices>
          </Table_Cell>
          // COLUMN CELLS END
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingSalesPriceExVat;
