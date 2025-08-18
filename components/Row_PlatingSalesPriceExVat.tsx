import React from "react";
import Table_Cell from "./Table_Cell";
import { cleanComponentKeyName, getTextTranslation, replace_ } from "@/utils/utils";
import { useRecipeData } from "@/contexts/useRecipeData";
import Row_FirstRowTableCell from "./Row_FirstRowTableCell";
import ViewPrices from "./ViewPrices";
import UnitCurrencyFormatter from "./UnitCurrencyFormatter";

interface Row_PlatingSalesPriceExVatProps {
  viewPrices: boolean;
}

const Row_PlatingSalesPriceExVat: React.FC<Row_PlatingSalesPriceExVatProps> = ({ viewPrices }) => {
  const { recipeData } = useRecipeData();

  const o = {
    name: cleanComponentKeyName("sale_price_(ex_vat)"),
    translatedName: getTextTranslation(replace_("sale_price_(ex_vat)")),
  };

  return (
    <>
      <Row_FirstRowTableCell translatedName={o.translatedName} />

      {/* OTHER COLUMNS START */}
      {/* {data.portions.map((portionSize, i) => { */}
      {recipeData.data.portions.map((portionSize, i) => {
        return (
          // COLUMN CELLS START
          <Table_Cell type="text" key={o.name + "_" + i} trackChangeVisually={true} rowNum={i} trackChangesStorageName={o.name}>
            <UnitCurrencyFormatter>{recipeData.salePricesExVat[i]}</UnitCurrencyFormatter>

            <ViewPrices viewPrices={viewPrices}>
              sub-total:{" "}
              {<UnitCurrencyFormatter>(recipeData.costsSubTotals[i])</UnitCurrencyFormatter> + " + markup: " + <UnitCurrencyFormatter>(recipeData.markUpPriceAmounts[i])</UnitCurrencyFormatter>}
            </ViewPrices>
          </Table_Cell>
          // COLUMN CELLS END
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingSalesPriceExVat;
