import React from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, formatWeight, getLiveTotal, getTextTranslation, replace_ } from "@/lib/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/UseRecipeData";
import MenuDynamicChildren from "./MenuPopupOnMouseOver";

interface Row_PlatingOtherCostProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingOtherCost: React.FC<Row_PlatingOtherCostProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = "other_costs";
  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} key={name + "_firstCol"}>
        {getTextTranslation(replace_(name))}
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {recipeData.otherCostsPriceRules.map((rule, i) => {
        const dropDownInfo = data.costRules.otherCosts[rule].costs.map((cost) => `${cost.name}: ${formatCurrency(cost.cost)} (#${cost.id})`);

        return (
          <MenuDynamicChildren key={name + "_" + "_" + "menu" + "_" + i} menuArray={dropDownInfo}>
            <Table_Cell key={name + "_" + i} edit="edit">
              <span className=" text-nowrap"> {formatCurrency(recipeData.otherCostsPriceTotals[i])}</span>

              {/* {viewPrices && (
                <div key={Math.random()} className="text-[10px] self-center">
                  ID:{recipeData.otherCostsPriceRules[i]}
                </div>
              )} */}
            </Table_Cell>
          </MenuDynamicChildren>
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingOtherCost;
