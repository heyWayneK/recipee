import React from "react";
import Table_Cell from "./Table_Cell";
import { calcProfit, formatCurrency, getTextTranslation, replace_ } from "@/lib/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/UseRecipeData";
import MenuDynamicChildren from "./MenuPopupOnMouseOver";

interface Row_PlatingMarkupProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingMarkup: React.FC<Row_PlatingMarkupProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = "markup_profit";

  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} key={name + "_firstCol"}>
        <div>{getTextTranslation(replace_(name))}</div>
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {recipeData.markUpPriceAmounts.map((price, i) => {
        let { name, factor, type } = data.costRules.markUps[recipeData.markUpPriceRules[i]];

        const dropDownInfo = [`${getTextTranslation("name")}: ${name}`, `${getTextTranslation("factor")}: ${factor}`, `${getTextTranslation("type")}: ${type}`, "Change"];

        return (
          // COLUMN CELLS START
          <MenuDynamicChildren key={name + "_" + "_" + "menu" + "_" + i} menuArray={dropDownInfo}>
            <Table_Cell key={name + "_" + i} className="flex gap-y-1 flex-col" edit="edit">
              <div className=" text-nowrap">{formatCurrency(calcProfit(price, type, factor))}</div>
            </Table_Cell>
          </MenuDynamicChildren>
          // COLUMN CELLS END
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingMarkup;
