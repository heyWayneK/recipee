import React from "react";

import Table_Cell from "./Table_Cell";
import { formatCurrency, getTextTranslation, replace_ } from "@/utils/utils";
import { data } from "@/app/api/recipe";
import { useRecipeData } from "@/contexts/useRecipeData";
import MenuPopupOnMouseOver, { MenuOptionsProps } from "./MenuPopupOnMouseOver";
import ViewPrices from "./ViewPrices";

import UnitCurrencyFormatter from "./UnitCurrencyFormatter";
import { PreCalculatedRecipeData } from "@/types/recipeTypes";

interface Row_PlatingSalesPriceInclVatProps {
  className?: string;
  viewPrices: boolean;
}

const Row_PlatingSalesPriceInclVat: React.FC<Row_PlatingSalesPriceInclVatProps> = ({ className = "", viewPrices }) => {
  // INFO: useRecipeData: updateRecipeData, systemData, UserData, localOrDbData
  const { recipeData, updateRecipeData, systemData } = useRecipeData();
  const name = "sale_price_(incl_vat)";

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
    updateRecipeData(updatedObj);
    //FUTURE:  ADD HISTORY FOR UNDO REDO
  };

  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell firstCol={true} type="total" key={name + "_"}>
        <div> {replace_(name)}</div>
      </Table_Cell>
      {/* FIRST COLUMN END */}

      {/* OTHER COLUMNS START */}
      {recipeData.data.portions.map((portionSize, i) => {
        const priceExVat = recipeData.salePricesExVat[i];
        const vatPercentage = recipeData.vatRulePercs[i];
        const vatAmount = priceExVat * vatPercentage;
        const vatRuleName = recipeData.vatRuleNames[i];
        const salesPriceIncVat = priceExVat + vatAmount;

        // const dropDownLinks: MenuOptionsProps[] = [{ jsx: <span className="font-bold text-base capitalize">{name}</span>, handler: null }];
        const dropDownLinks: MenuOptionsProps[] = [{ jsx: <span className="font-bold capitalize">{name}</span>, handler: () => {} }];
        // TODO: MAKE DATA USING LOCAL VAT INCL

        for (const [key, value] of Object.entries(systemData.vat_rules.sort((a, b) => Number(a.cost) - Number(b.cost)))) {
          dropDownLinks.push({
            jsx: (
              <>
                <span className="font-semibold">{value.name}</span>
                <br />
                <span>
                  {value.name} (#{value.id})
                </span>
              </>
            ),
            handler: () => update(recipeData.portionSizes[i], +key),
            selectedId: recipeData.markUpPriceRules[i],
            id: +key,
          });
        }
        // DROP DOWN MODAL INFO__________END

        return (
          // COLUMN CELLS START
          <MenuPopupOnMouseOver key={name + "_menu" + i} menuArray={dropDownLinks}>
            <Table_Cell type="total" key={name + "_" + i} edit="edit" trackChangeVisually={true} trackChangesStorageName={name} rowNum={i}>
              {<UnitCurrencyFormatter>{salesPriceIncVat}</UnitCurrencyFormatter>}
              <ViewPrices viewPrices={viewPrices}>{`VAT: ${(<UnitCurrencyFormatter>vatAmount</UnitCurrencyFormatter>)} (${vatPercentage * 100}%) - ${vatRuleName}`}</ViewPrices>
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
