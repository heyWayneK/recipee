import React from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, formatWeight, getTextTranslation, replace_ } from "@/libs/utils";
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
  // UPDATE OBJECT
  const update = (portionSize: number, ruleId: number) => {
    const newObj = { ...recipeData.data.otherCostsId, ...{ [portionSize]: ruleId } };
    updateRecipeData((recipeData.data.otherCostsId = { ...newObj }));
    // ADD HISTORY
  };

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
      {/* DROP DOWN MODAL INFO__________START */}
      {recipeData.otherCostsPriceRules.map((rule, i) => {
        const dropDownLinks: MenuOptionsProps[] = [{ jsx: <span className="font-bold text-base capitalize">{name}</span>, handler: null }];

        for (const [key, value] of Object.entries(recipeData.data.costRules.otherCosts)) {
          dropDownLinks.push({
            jsx: (
              <>
                <span className="font-bold">{value.name}</span>
                <br />
                <span>
                  {formatCurrency(+value.costs)} (#{key})
                </span>
              </>
            ),
            handler: () => update(recipeData.portionSizes[i], +key),
            selectedId: recipeData.otherCostsPriceRules[i],
            id: +key,
          });
        }
        // DROP DOWN MODAL INFO__________END

        return (
          <MenuDynamicChildren key={name + "_" + "menu" + "_" + i} menuArray={dropDownLinks}>
            <Table_Cell key={name + "_" + i} edit="edit" trackChangeVisually={true} rowNum={i} trackChangesStorageName={name}>
              {formatCurrency(recipeData.otherCostsPriceTotals[i])}

              {viewPrices && <div className="text-[10px] self-center">ID:{recipeData.otherCostsPriceRules[i]}</div>}
            </Table_Cell>
          </MenuDynamicChildren>
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingOtherCost;
