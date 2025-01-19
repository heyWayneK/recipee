import React from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, formatWeight, getLiveTotal, getTextTranslation, replace_ } from "@/lib/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/UseRecipeData";
import MenuDynamicChildren, { MenuOptionsProps } from "./MenuPopupOnMouseOver";
import { Span } from "next/dist/trace";

interface Row_PlatingOtherCostProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingOtherCost: React.FC<Row_PlatingOtherCostProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = getTextTranslation(replace_("other_costs"));
  const dropDownInfoHead: MenuOptionsProps[] = [
    {
      jsx: (
        <>
          <span className=" text-lg capitalize font-bold">{name}</span>
          <br />
          <span>rule name (#78)</span>
        </>
      ),
      handler: null,
    },
  ];
  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} key={name + "_firstCol"}>
        {name}
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {recipeData.otherCostsPriceRules.map((rule, i) => {
        const dropDownInfo: MenuOptionsProps[] = recipeData.data.costRules.otherCosts[rule].costs.map((cost) => {
          return {
            jsx: (
              <>
                <span className=" font-bold">{cost.name}: </span>
                <br />
                <span>
                  {formatCurrency(cost.cost)} (#{cost.id})
                </span>
              </>
            ),
            handler: null,
          };
        });
        return (
          <MenuDynamicChildren key={name + "_" + "_" + "menu" + "_" + i} menuArray={[...dropDownInfoHead, ...dropDownInfo]}>
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
