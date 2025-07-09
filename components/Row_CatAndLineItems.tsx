import React, { ReactNode } from "react";
import Table_Cell from "./Table_Cell";
import { formatCurrency, getTextTranslation, replace_ } from "@/libs/utils";
import { PreCalculatedRecipeData, useRecipeData } from "@/contexts/useRecipeData";
import MenuPopupOnMouseOver, { MenuOptionsProps } from "@/components/MenuPopupOnMouseOver";
import Row_FirstRowTableCell from "./Row_FirstRowTableCell";

interface Row_CatAndLineItemsProps {
  // Show prices by expanding the cells
  viewPrices: boolean;
  name: string;
  translatedName: string;
  catListObj: any[];
  lineItemsObj: any[];
  rulesIdObj: number[];
  priceSumObj: number[];
  updateObj: string;
  updateObjPath: any;
}
const Row_CatAndLineItems: React.FC<Row_CatAndLineItemsProps> = ({ viewPrices, name, translatedName, catListObj, lineItemsObj, rulesIdObj, priceSumObj, updateObj, updateObjPath }) => {
  // INFO: Other useRecipeData vars: qty, setQty, recipeData,
  const { recipeData, updateRecipeData } = useRecipeData();
  const update = (portionSize: number, ruleId: number) => {
    // CREATE UPDATE OBJECT
    const updatedObj: Partial<PreCalculatedRecipeData> = {
      data: {
        ...recipeData.data,
        [updateObj]: {
          ...updateObjPath,
          [portionSize]: ruleId,
        },
      },
    };

    //FUTURE:  ADD UPDATE HISTORY
    updateRecipeData(updatedObj);
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
                <span>
                  {formatCurrency(sumLineItems)} (#{value.id})
                </span>
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
              {formatCurrency(priceSumObj[i])}
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
