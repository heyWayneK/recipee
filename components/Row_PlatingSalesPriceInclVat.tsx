import React from "react";
import Table_Cell from "./Table_Cell";
import { replace_ } from "@/utils/utils";
import { useRecipeData } from "@/contexts/useRecipeData";
import MenuPopupOnMouseOver, { MenuOptionsProps } from "./MenuPopupOnMouseOver";
import ViewPrices from "./ViewPrices";

import UnitCurrencyFormatter from "./UnitCurrencyFormatter";
import { Decimal } from "decimal.js";
// import { PreCalculatedRecipeData } from "@/types/recipeTypes";

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
    return {};
    // const updatedObj: Partial<PreCalculatedRecipeData> = {
    //   data: {
    //     ...recipeData.data,
    //     markupId: {
    //       ...recipeData.data.markupId,
    //       [portionSize]: ruleId,
    //     },
    //   },
    // };
    // updateRecipeData(updatedObj);
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
        const priceExVat: Decimal = new Decimal(recipeData.salePricesExVat[i]);
        const vatPercentage: Decimal = new Decimal(recipeData.vatRulePercs[i]);
        const vatAmount: Decimal = priceExVat.mul(vatPercentage);

        // TODO: These values seem to calc wrong with 0% VAT selected as the Rule
        const vatRuleName: string = recipeData.vatRuleNames[i];
        // console.log("priceExVat", priceExVat.toString());
        // console.log("vatPercentage", vatPercentage.toString());
        // console.log("vatAmount", vatAmount.toString());
        // console.log("vatRuleName", vatRuleName.toString());

        const salesPriceIncVat = priceExVat.plus(vatAmount).toString();

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
            // handler: () => update(recipeData.portionSizes[i], +key),
            handler: () => {},
            // TODO: selectedId is broken...not working
            selectedId: recipeData.markUpPriceRules[i],
            id: +key,
          });
        }
        // DROP DOWN MODAL INFO__________END

        return (
          // COLUMN CELLS START
          <MenuPopupOnMouseOver key={name + "_menu" + i} menuArray={dropDownLinks}>
            <Table_Cell type="total" key={name + "_" + i} edit="edit" trackChangeVisually={true} trackChangesStorageName={name} rowNum={i}>
              {<UnitCurrencyFormatter>{salesPriceIncVat.toString()}</UnitCurrencyFormatter>}
              <ViewPrices viewPrices={viewPrices}>{`VAT: ${(<UnitCurrencyFormatter>vatAmount</UnitCurrencyFormatter>)} (${vatPercentage.mul(100)}%) - ${vatRuleName}`}</ViewPrices>
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
