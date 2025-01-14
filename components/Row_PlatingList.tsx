import React from "react";
import Table_Cell from "./Table_Cell";
import { formatCurrency, formatWeight, getTextTranslation, replace_ } from "@/lib/utils";
import { data } from "@/app/data/recipe";
import MenuDynamicChildren from "./MenuPopupOnMouseOver";
import { useRecipeData } from "@/contexts/UseRecipeData";

interface Row_PlatingListProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingList: React.FC<Row_PlatingListProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = "plating_components";
  return (
    <>
      {recipeData.componentsWeights.map((component, iC) => {
        const name = recipeData.componentsNamesArray[iC];

        // const dropDownInfo = [{ name: "one" }];
        const dropDownInfo = ["one", "two"];
        // ROWS ::: START
        return (
          <>
            {/* FIRST COLUMN START */}
            <Table_Cell key={iC + "" + component.join("")} firstCol={true} rowNum={iC} type="plating_list">
              {name}
            </Table_Cell>
            {/* FIRST COLUMN END */}

            {/* OTHER COLUMNS START */}
            {recipeData.portionSizes.map((portionSize, iP) => {
              // CREATE LIST Ingredient Weight Yield Adjusted

              return (
                <MenuDynamicChildren key={recipeData.componentsIDArray[iC].join("-") + "-" + iC + "" + iP} menuArray={dropDownInfo}>
                  <Table_Cell key={recipeData.componentsIDArray[iC].join("-")} edit="edit" type="plating_list" rowNum={iC}>
                    {formatWeight(component[iP])}
                    {viewPrices && (
                      <div key={recipeData.componentsIDArray[iC][iP]} className="text-[10px] self-center">
                        {formatCurrency(recipeData.componentsPrices[iC][iP])}
                      </div>
                    )}
                  </Table_Cell>
                </MenuDynamicChildren>
              );
            })}
            {/* OTHER COLUMNS END */}
          </>
        );
      })}
    </>
  );
};

export default Row_PlatingList;
