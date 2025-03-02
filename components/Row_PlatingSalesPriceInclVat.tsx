import React from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, getTextTranslation, replace_ } from "@/libs/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/UseRecipeData";
import MenuPopupOnMouseOver, { MenuOptionsProps } from "./MenuPopupOnMouseOver";

interface Row_PlatingSalesPriceInclVatProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingSalesPriceInclVat: React.FC<Row_PlatingSalesPriceInclVatProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = "sale_price_(incl_vat)";

  // // UPDATE OBJECT
  // const update = (portionSize: number, ruleId: number) => {
  //   const newObj = { ...recipeData.data., ...{ [portionSize]: ruleId } };
  //   updateRecipeData((recipeData.data.packagingCostsId = { ...newObj }));
  //   // ADD HISTORY
  // };

  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} type="total" key={name + "_"}>
        <div> {replace_(name)}</div>
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {recipeData.data.portions.map((portionSize, i) => {
        const salesPriceIncVat = formatCurrency(recipeData.salePricesExVat[i] * (1 + data.setting.vat));

        const dropDownInfo = [`${getTextTranslation("VAT")}: ${data.setting.vat * 100}%`];

        // const dropDownLinks: MenuOptionsProps[] = [{ jsx: <span className="font-bold text-base capitalize">{name}</span>, handler: null }];
        const dropDownLinks: MenuOptionsProps[] = [{ jsx: <span className="font-bold text-base capitalize">{name}</span>, handler: () => {} }];
        // TODO: MAKE DATA USING LOCAL VAT INCL
        for (const [key, value] of Object.entries(recipeData.data.costRules.packagingCosts)) {
          dropDownLinks.push(
            {
              jsx: (
                <>
                  <span className="font-bold">{value.name}</span>
                  <br />
                  <span>
                    {formatCurrency(value.cost)} (#{key})
                  </span>
                </>
              ),
              handler: () => {},
            }
            //   handler: () => update(recipeData.portionSizes[i], +key),
            //   selectedId: recipeData.packingCostPriceRules[i],
            //   id: +key,
            // }
          );
        }
        // DROP DOWN MODAL INFO__________END

        return (
          // COLUMN CELLS START
          <MenuPopupOnMouseOver key={name + "_menu" + i} menuArray={dropDownLinks}>
            <Table_Cell type="total" key={name + "_" + i} edit="edit" trackChangeVisually={true} rowNum={i} trackChangesStorageName={name}>
              {salesPriceIncVat}
            </Table_Cell>
          </MenuPopupOnMouseOver>
          // COLUMN CELLS END
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingSalesPriceInclVat;
