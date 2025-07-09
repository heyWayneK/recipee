import React from "react";
import Table_Cell from "./Table_Cell";
import { calcProfit, formatCurrency, getTextTranslation, replace_ } from "@/libs/utils";
import { PreCalculatedRecipeData, useRecipeData } from "@/contexts/useRecipeData";
import MenuDynamicChildren, { MenuOptionsProps } from "./MenuPopupOnMouseOver";
import Row_FirstRowTableCell from "./Row_FirstRowTableCell";
import ViewPrices from "@/components/ViewPrices";

interface Row_PlatingMarkupProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingMarkup: React.FC<Row_PlatingMarkupProps> = ({ className = "", viewPrices }) => {
  // INFO: useRecipeData: updateRecipeData, systemData, UserData, localOrDbData
  const { recipeData, updateRecipeData, systemData } = useRecipeData();

  // SETUP UNIQUE VARS
  const o = {
    name: "markup_profit",
    translatedName: getTextTranslation(replace_("markup_profit")),
    listObj: systemData.markup,
  };

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
    //FUTURE:  ADD HISTORY
    updateRecipeData(updatedObj);
  };

  return (
    <>
      <Row_FirstRowTableCell translatedName={o.translatedName} />

      {/* DROP DOWN MODAL INFO__________START */}
      {recipeData.portionSizes.map((portionSize, i) => {
        let { id, name, factor, markup_type } = systemData.markup.find((markup) => markup.id === recipeData.markUpPriceRules[i]) || {};

        if (!name) throw new Error("Markup name not found");
        if (!factor) throw new Error("Markup factor not found");
        if (!markup_type?.name) throw new Error("Markup type not found");

        const dropDownLinks: MenuOptionsProps[] = [{ jsx: <span className="font-bold text-base capitalize">{name}</span>, handler: () => {} }];

        for (const [key, value] of Object.entries(o.listObj.sort((a, b) => a.name.localeCompare(b.name)))) {
          dropDownLinks.push({
            jsx: (
              <>
                <span className="font-bold">{value.name}</span>
                <br />
                <span>
                  {value.markup_type.name} (#{value.id})
                </span>
              </>
            ),

            handler: () => update(portionSize, value.id),
            selectedId: id,
            id: value.id,
          });
        }
        // DROP DOWN MODAL INFO__________END

        return (
          // COLUMN CELLS START
          <MenuDynamicChildren key={name + "_" + "menu" + "_" + i} menuArray={dropDownLinks}>
            <Table_Cell key={name + "_" + i} className="flex gap-y-1 flex-col" edit="edit" trackChangeVisually={true} rowNum={i} trackChangesStorageName={name}>
              {formatCurrency(calcProfit(recipeData.costsSubTotals[i], markup_type.name, Number(factor)))}
              <ViewPrices viewPrices={viewPrices}>
                {name} ({id})
              </ViewPrices>
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
