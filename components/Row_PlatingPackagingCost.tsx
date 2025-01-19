import React, { useEffect, useRef, useState } from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, getTextTranslation, replace_ } from "@/lib/utils";
import { useRecipeData } from "@/contexts/UseRecipeData";
import MenuPopupOnMouseOver, { MenuOptionsProps } from "@/components/MenuPopupOnMouseOver";

interface Row_PlatingPackagingCostsProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingPackagingCosts: React.FC<Row_PlatingPackagingCostsProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = getTextTranslation(replace_("packaging_costs"));

  // const [value, setValue] = useState(() => {
  //   const storedValue = localStorage.getItem("myValue");
  //   return storedValue ? parseFloat(storedValue) : 0; // Assuming it's a number
  // });

  // useEffect(() => {
  //   localStorage.setItem("myValue", value.toString());
  // }, [value]);

  // // Here, you can check if the value has changed since last reload
  // useEffect(() => {
  //   const previousValue = localStorage.getItem("myValue");
  //   if (previousValue !== null && parseFloat(previousValue) !== value) {
  //     console.log("Value changed since last reload");
  //   }
  // }, []); // Empty dependency array means this runs once after initial render

  // UPDATE SELECTED PACKING COSTS
  const updatePackagingRule = (portionSize: number, ruleId: number) => {
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
      {recipeData.packingCostPriceRules.map((portionSize, i) => {
        // DROP DOWN MODAL INFO__________START
        const dropDownLinks: MenuOptionsProps[] = [{ jsx: <span className="font-bold text-base capitalize">{name}</span>, handler: null }];

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
            handler: () => updatePackagingRule(recipeData.portionSizes[i], +key),
            selectedId: recipeData.packingCostPriceRules[i],
            id: +key,
          });
        }
        // DROP DOWN MODAL INFO__________END

        return (
          <MenuPopupOnMouseOver key={name + "_" + portionSize + "_" + "menu" + "_" + i} type="onClick" menuArray={dropDownLinks}>
            <Table_Cell key={name + "_" + portionSize + "_" + i} edit="edit">
              {formatCurrency(recipeData.packingCostPriceTotals[i])}
            </Table_Cell>
          </MenuPopupOnMouseOver>
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingPackagingCosts;
