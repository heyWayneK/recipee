import React from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, formatWeight, getLiveTotal, getTextTranslation, replace_ } from "@/lib/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/UseRecipeData";
import MenuDynamicChildren from "./MenuPopupOnMouseOver";

interface Row_PlatingSalesPriceInclVatProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingSalesPriceInclVat: React.FC<Row_PlatingSalesPriceInclVatProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = "sale_price_(incl_vat)";

  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} type="total" key={name + "_"}>
        <div> {replace_(name)}</div>
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {data.portions.map((portionSize, i) => {
        const salesPriceIncVat = recipeData.salePricesExVat[i] * (1 + data.setting.vat);

        const dropDownInfo = [`${getTextTranslation("VAT")}: ${data.setting.vat * 100}%`];

        return (
          // COLUMN CELLS START
          <MenuDynamicChildren key={name + "_" + "_" + "menu" + "_" + i} menuArray={dropDownInfo}>
            <Table_Cell type="total" key={name + "_" + i} edit="edit">
              <span className=" text-nowrap"> {formatCurrency(salesPriceIncVat)}</span>
            </Table_Cell>
          </MenuDynamicChildren>
          // COLUMN CELLS END
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingSalesPriceInclVat;
