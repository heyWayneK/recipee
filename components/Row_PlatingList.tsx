import React from "react";
import Table_Cell from "./Table_Cell";
import { cleanComponentKeyName, formatCurrency } from "@/utils/utils";
import MenuDynamicChildren from "./MenuPopupOnMouseOver";
import { useRecipeData } from "@/contexts/useRecipeData";
import IngredientUnits from "./IngredientUnits";
// Removed unused imports

interface Row_PlatingListProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingList: React.FC<Row_PlatingListProps> = ({ className = "", viewPrices }) => {
  // INFO: Other useRecipeData vars: qty, setQty, recipeData, updateRecipeData
  const { recipeData } = useRecipeData(); // Removed unused variables

  return (
    <>
      {recipeData.componentsWeights.map((component, iC) => {
        const name = recipeData.componentsNamesArray[iC];

        // TODO: Use real actions in dropdown
        const dropDownInfo = [{ jsx: <div key={1}>one</div> }, { jsx: <div key={2}>two</div> }];
        const keyName = cleanComponentKeyName(iC);

        // CREATE FIRST COLUMN CELL WITH SUB RECIPE NAME
        const firstCell = (
          // firstCol={true} NB responsive resizing first column
          <Table_Cell firstCol={true} edit={"edit"} key={keyName} rowNum={iC} type="plating_list">
            {/* NO TRANSLATION NEED - CUSTOMER FIELD */}
            {name}
          </Table_Cell>
        );

        // CREATE OTHER COLUMN CELL WITH SUB RECIPE WEIGHTS
        const otherCells: React.ReactElement[] = [];

        recipeData.portionSizes.forEach((portionSize, iP) => {
          const keyNameSub = keyName + `_${portionSize}_${iP}`;
          otherCells.push(
            <MenuDynamicChildren key={keyNameSub} menuArray={dropDownInfo}>
              <Table_Cell edit="edit" type="plating_list" rowNum={iC}>
                <IngredientUnits>{component[iP]}</IngredientUnits>
                {viewPrices && <div className="self-center">{formatCurrency(recipeData.componentsPrices[iC][iP])}</div>}
              </Table_Cell>
            </MenuDynamicChildren>
          );
        });

        return [firstCell, ...otherCells];
      })}
    </>
  );
};

export default Row_PlatingList;
