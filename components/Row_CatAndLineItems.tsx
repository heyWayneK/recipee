import React, { ReactNode } from "react";
import Table_Cell from "./Table_Cell";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import MenuPopupOnMouseOver, { MenuOptionsProps } from "@/components/MenuPopupOnMouseOver";
import Row_FirstRowTableCell from "./Row_FirstRowTableCell";
import { PreCalculatedRecipeData } from "@/types/recipeTypes";
import UnitCurrencyFormatter from "./UnitCurrencyFormatter";
import Decimal from "decimal.js";

interface Row_CatAndLineItemsProps {
  // Show prices by expanding the cells
  viewPrices: boolean;
  name: string;
  translatedName: string;
  catListObj: any[];
  lineItemsObj: any[];
  rulesIdObj: number[];
  priceSumObj: Decimal[];
  updateObj: string;
  updateObjPath: any;
}
const Row_CatAndLineItems: React.FC<Row_CatAndLineItemsProps> = ({ viewPrices, name, translatedName, catListObj, lineItemsObj, rulesIdObj, priceSumObj, updateObj, updateObjPath }) => {
  // INFO: Other useRecipeData vars: qty, setQty, recipeData,
  const { recipeData } = useRecipeDataStore();
  const update = (portionSize: Decimal, ruleId: number) => {
    // CREATE UPDATE OBJECT
    // const updatedObj: Partial<PreCalculatedRecipeData> = {
    //   data: {
    //     ...recipeData.data,
    //     [updateObj]: {
    //       ...updateObjPath,
    //       [portionSize]: ruleId,
    //     },
    //   },
    // };
  };

  return (
    <>
      {/* FIRST COLUMN ROW */}
      <Row_FirstRowTableCell translatedName={translatedName} />

      {/* OTHER COLUMNS START */}
      {rulesIdObj.map((portionSize, i) => {
        // DROP DOWN MODAL INFO__________START
        const dropDownLinks: MenuOptionsProps[] = [{ jsx: <span className="font-bold text-base-content capitalize">{translatedName}</span>, handler: () => {} }];
        // SORT List by Name
        for (const [key, value] of Object.entries(catListObj.sort((a, b) => a.name.localeCompare(b.name)))) {
          // SUM UP line item costs in the csv field category_ids "1,2,3"
          const sumLineItems = lineItemsObj.reduce((acc, val) => {
            const lineItemsIds: string = val.category_ids;
            const catId: string = value.id.toString();
            // Sum if CSV field contains id
            const idExists = lineItemsIds.split(",").includes(catId);
            return idExists ? (acc += +val.cost) : acc;
          }, 0);

          dropDownLinks.push({
            jsx: (
              <>
                <span className="font-bold">{value.name}</span>
                <br />
                <UnitCurrencyFormatter>{sumLineItems}</UnitCurrencyFormatter>
                {/* {sumLineItems} */}
                <span> : Rule {value.id}</span>
              </>
            ),
            handler: () => update(recipeData.portionSizes[i], +value.id),
            // SET THE SELECTED STATE
            selectedId: rulesIdObj[i],
            id: value.id,
          });
        }
        // DROP DOWN MODAL INFO__________END

        return (
          <MenuPopupOnMouseOver key={name + "menu" + i} type="onClick" menuArray={dropDownLinks}>
            <Table_Cell edit="edit" type="text" trackChangeVisually={true} rowNum={i} trackChangesStorageName={name}>
              <UnitCurrencyFormatter>{priceSumObj[i].toString()}</UnitCurrencyFormatter>
              {viewPrices && <div className="text-[10px] self-center">{name}</div>}
            </Table_Cell>
          </MenuPopupOnMouseOver>
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_CatAndLineItems;
