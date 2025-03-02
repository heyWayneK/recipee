import React from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, getTextTranslation, replace_ } from "@/libs/utils";
import { useRecipeData } from "@/contexts/UseRecipeData";
import MenuPopupOnMouseOver, { MenuOptionsProps } from "@/components/MenuPopupOnMouseOver";

interface Row_PlatingPackagingCostsProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingPackagingCosts: React.FC<Row_PlatingPackagingCostsProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = getTextTranslation(replace_("packaging_costs"));

  // UPDATE OBJECT
  const update = (portionSize: number, ruleId: number) => {
    const newObj = { ...recipeData.data.packagingCostsId, ...{ [portionSize]: ruleId } };
    updateRecipeData((recipeData.data.packagingCostsId = { ...newObj }));
    // ADD HISTORY
  };

  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} key={name + "_firstRow"}>
        {name}
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}

      {/* DROP DOWN MODAL INFO__________START */}
      {recipeData.packingCostPriceRules.map((portionSize, i) => {
        const dropDownLinks: MenuOptionsProps[] = [{ jsx: <span className="font-bold text-base capitalize">{name}</span>, handler: () => {} }];

        for (const [key, value] of Object.entries(recipeData.data.costRules.packagingCosts)) {
          dropDownLinks.push({
            jsx: (
              <>
                <span className="font-bold">{value.name}</span>
                <br />
                <span>
                  {formatCurrency(value.cost)} (#{key})
                </span>
              </>
            ),
            handler: () => update(recipeData.portionSizes[i], +key),
            selectedId: recipeData.packingCostPriceRules[i],
            id: +key,
          });
        }
        // DROP DOWN MODAL INFO__________END

        return (
          <MenuPopupOnMouseOver key={name + "_" + portionSize + "_" + "menu" + "_" + i} type="onClick" menuArray={dropDownLinks}>
            <Table_Cell key={name + "_" + portionSize + "_" + i} edit="edit" trackChangeVisually={true} rowNum={i} trackChangesStorageName={name}>
              {formatCurrency(recipeData.packingCostPriceTotals[i])}
              {viewPrices && <div className="text-[10px] self-center">{recipeData.data.costRules.packagingCosts[recipeData.packingCostPriceRules[i]].name}</div>}
            </Table_Cell>
          </MenuPopupOnMouseOver>
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingPackagingCosts;
