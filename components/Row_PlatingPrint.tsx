import React from "react";

import Table_Cell from "./Table_Cell";
import { formatWeight } from "@/libs/utils";
import { data } from "@/app/data/recipe";
import SvgSpriteLink from "./SvgSpriteLink";
import { useRecipeData } from "@/contexts/UseRecipeData";

interface Row_PlatingPrintProps {
  className?: string;

  viewPrices: boolean;
}

const Row_PlatingPrint: React.FC<Row_PlatingPrintProps> = ({ className = "", viewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = "print";

  return (
    <>
      {/* FIRST COLUMN START */}
      <Table_Cell key={name + "_ firstRow"}> </Table_Cell>
      {/* FIRST COLUMN END */}
      {/* OTHER COLUMNS START */}
      {data.portions.map((portionSize, i) => {
        // LIVE COSTS - Packaging Costs :: START

        // LIVE COSTS - Packaging Costs :: END
        return (
          // COLUMN CELLS START
          <Table_Cell type="print" key={name + "_" + i} className="">
            <div>{<SvgSpriteLink key={`print_${String(i)}  + "_" + rowNum`} size={30} link={""} iconName="print" className="" />}</div>
          </Table_Cell>
          // COLUMN CELLS END
        );
      })}
      {/* OTHER COLUMNS END */}
    </>
  );
};

export default Row_PlatingPrint;
