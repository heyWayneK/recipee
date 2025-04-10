import React from "react";
import Table_Cell from "./Table_Cell";
import { calcProfit, formatCurrency, getTextTranslation, replace_ } from "@/libs/utils";
import { data } from "@/app/data/recipe";
import { PreCalculatedRecipeData, useRecipeData } from "@/contexts/UseRecipeData";
import MenuDynamicChildren, { MenuOptionsProps } from "./MenuPopupOnMouseOver";

interface Row_PlatingMarkupProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingMarkup: React.FC<Row_PlatingMarkupProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = "markup_profit";

  // UPDATE OBJECT
  const update = (portionSize: number, ruleId: number) => {
    const updatedObj: Partial<PreCalculatedRecipeData> = {
      data: {
        ...recipeData.data,
        markupId: {
          ...recipeData.data.markupId,
          [portionSize]: ruleId,
        },
      },
    };
    updateRecipeData(updatedObj);
    //FUTURE:  ADD HISTORY
  };

  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} key={name + "_firstCol"}>
        <div>{getTextTranslation(replace_(name))}</div>
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {/* DROP DOWN MODAL INFO__________START */}
      {recipeData.markUpPriceAmounts.map((price, i) => {
        let { name: markupName, factor, type } = data.costRules.markUps[recipeData.markUpPriceRules[i]];

        const dropDownLinks: MenuOptionsProps[] = [{ jsx: <span className="font-bold text-base capitalize">{name}</span>, handler: () => {} }];

        for (const [key, value] of Object.entries(recipeData.data.costRules.markUps)) {
          dropDownLinks.push({
            jsx: (
              <>
                <span className="font-bold">{value.name}</span>
                <br />
                <span>
                  {value.type} (#{key})
                </span>
              </>
            ),
            handler: () => update(recipeData.portionSizes[i], +key),
            selectedId: recipeData.markUpPriceRules[i],
            id: +key,
          });
        }
        // DROP DOWN MODAL INFO__________END

        return (
          // COLUMN CELLS START
          <MenuDynamicChildren key={name + "_" + "menu" + "_" + i} menuArray={dropDownLinks}>
            <Table_Cell key={name + "_" + i} className="flex gap-y-1 flex-col" edit="edit" trackChangeVisually={true} rowNum={i} trackChangesStorageName={name}>
              {formatCurrency(calcProfit(price, type, factor))}
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
