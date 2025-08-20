import React from "react";
import Table_Cell from "./Table_Cell";
import MenuDynamicChildren from "./MenuPopupOnMouseOver";
import { useRecipeData } from "@/contexts/useRecipeData";
import IngredientUnits from "./IngredientUnits";
import UnitCurrencyFormatter from "./UnitCurrencyFormatter";
import TextEditable from "./TextEditable";
import { editInfoProps } from "@/types/recipeTypes";

interface Row_PlatingListProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingList: React.FC<Row_PlatingListProps> = ({ className = "", viewPrices }) => {
  const { recipeData } = useRecipeData();

  return (
    <>
      {recipeData.componentsWeights.map((component, iC) => {
        const editInfo: editInfoProps = {
          uiName: "Component Name",
          name: recipeData.componentsNamesArray[iC],
          id: recipeData.componentsIDArray[iC],
          idColName: "uuid",
        };

        // TODO: Use real actions in dropdown
        const dropDownInfo = [{ jsx: <div key={1}>one</div> }, { jsx: <div key={2}>two</div> }];
        const keyName = editInfo.id;

        // CREATE FIRST COLUMN CELL WITH SUB RECIPE NAME
        const firstCell = (
          // firstCol={true} NB responsive resizing first column
          <Table_Cell firstCol={true} edit={"edit"} key={keyName} rowNum={iC} type="plating_list" dbDataId={recipeData.data.uuid}>
            {/* NO TRANSLATION NEED - CUSTOMER FIELD */}
            <TextEditable
              title={`${editInfo.uiName} - Row ${iC} - ${editInfo.idColName}: ${editInfo.id}`}
              path={`data.components[${iC}].name`}
              dbExpectedType="plaintext"
              optionalContent={editInfo.name}
              instantDbUpdate={true}
              dbUpdateConfig={{
                model: "recipe_components_on_recipe",
                id: iC.toString(),
                idColName: "uuid",
                field: "name",
              }}
            />
            {/* {name} */}
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
                {viewPrices && <div className="self-center">{<UnitCurrencyFormatter>(recipeData.componentsPrices[iC][iP])</UnitCurrencyFormatter>}</div>}
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
