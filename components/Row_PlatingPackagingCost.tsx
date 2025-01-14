import React, { ReactElement } from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, formatWeight, getLiveTotal, getTextTranslation, replace_ } from "@/lib/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/UseRecipeData";
import MenuDynamicChildren from "./MenuPopupOnMouseOver";

interface Row_PlatingPackagingCostsProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingPackagingCosts: React.FC<Row_PlatingPackagingCostsProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = "packaging_costs";

  const packagingCostList: string[] = [];
  for (const packagingCost in data.costRules.packagingCosts) {
    packagingCostList.push(`id: ${packagingCost} name: `);
  }

  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} key={name + "_firstRow"}>
        {getTextTranslation(replace_(name))}
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {data.portions.map((portionSize, i) => {
        const pCostId = recipeData.packingCostPriceRules[i];

        const dropDownInfo = `Name: ${data.costRules.packagingCosts[pCostId]?.name}` + ` (${formatCurrency(data.costRules.packagingCosts[pCostId]?.cost).toString()})` + " " + `(#${pCostId})`;

        // CREATE DROPDOWN OPTIONS
        const dropDownLinks: ReactElement[] = [];
        for (const [key, value] of Object.entries(data.costRules.packagingCosts)) {
          dropDownLinks.push(
            <>
              <span className="font-bold">{value.name}</span> {formatCurrency(value.cost)} (#${key})`
            </>
          );
        }

        return (
          <MenuDynamicChildren key={name + "_" + portionSize + "_" + "menu" + "_" + i} type="onClick" menuArray={[dropDownInfo, "Change Packaging:", ...dropDownLinks]}>
            <Table_Cell key={name + "_" + i} edit="edit">
              {formatCurrency(recipeData.packingCostPriceTotals[i])}
              {/* {viewPrices && <div className="text-[10px] self-center">Id:{recipeData.packingCostPriceRules[i]}</div>} */}
            </Table_Cell>
          </MenuDynamicChildren>
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingPackagingCosts;
