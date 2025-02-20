import React from "react";
import Table_Cell from "./Table_Cell";
import { formatCurrency, formatWeight } from "@/libs/utils"; // Removed unused imports
import { data } from "@/app/data/recipe"; // Removed unused import
import MenuDynamicChildren from "./MenuPopupOnMouseOver";
import { useRecipeData } from "@/contexts/UseRecipeData";
// Removed unused imports

interface Row_PlatingListProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingList: React.FC<Row_PlatingListProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData(); // Removed unused variables
  const name = "plating_components"; // Removed unused variable

  return (
    // Crucial: Return the result of the map
    <>
      {" "}
      {/* Added a Fragment to wrap the returned array of arrays */}
      {recipeData.componentsWeights.map((component, iC) => {
        const name = recipeData.componentsNamesArray[iC];
        const dropDownInfo = [{ jsx: <div key={1}>one</div> }, { jsx: <div key={2}>two</div> }];
        const keyName = iC;

        const firstCell = // No need for an array here, it's a single element
          (
            <Table_Cell key={keyName} firstCol={true} rowNum={iC} type="plating_list">
              {name}
            </Table_Cell>
          );

        const otherCells: React.ReactElement[] = []; // Initialize as an empty array *before* the inner loop

        recipeData.portionSizes.forEach((portionSize, iP) => {
          const keyNameSub = keyName + `_${portionSize}_${iP}`;
          otherCells.push(
            <MenuDynamicChildren key={keyNameSub} menuArray={dropDownInfo}>
              <Table_Cell edit="edit" type="plating_list" rowNum={iC}>
                {formatWeight(component[iP])}
                {viewPrices && <div className="text-[10px] self-center">{formatCurrency(recipeData.componentsPrices[iC][iP])}</div>}
              </Table_Cell>
            </MenuDynamicChildren>
          );
        });

        return [firstCell, ...otherCells]; // Return the combined array for this component
      })}
    </>
  );
};

export default Row_PlatingList;
