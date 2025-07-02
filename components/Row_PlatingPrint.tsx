import React from "react";
import Table_Cell from "./Table_Cell";
import { data } from "@/app/data/recipe";
import SvgSpriteLink from "./SvgSpriteLink";
import { cleanComponentKeyName, getTextTranslation } from "@/libs/utils";

interface Row_PlatingPrintProps {}

const Row_PlatingPrint: React.FC<Row_PlatingPrintProps> = () => {
  // INFO: useRecipeData: updateRecipeData, systemData, UserData, localOrDbData
  // const { recipeData } = useRecipeData();
  const name = getTextTranslation("print");
  const keyName = cleanComponentKeyName(name);

  return (
    <>
      {/* FIRST COLUMN*/}
      <Table_Cell type="print" key={keyName + "_ firstRow"}></Table_Cell>

      {/* OTHER COLUMNS START */}
      {data.portions.map((portionSize, i) => {
        return (
          <Table_Cell type="print" key={keyName + "_" + i}>
            {<SvgSpriteLink key={`print_${String(i)}  + "_" + rowNum`} size={25} onClick={() => alert("Need to add print feature")} iconName="print" />}
          </Table_Cell>
        );
      })}
    </>
  );
};

export default Row_PlatingPrint;
