import React from "react";
import Table_Cell from "./Table_Cell";
import { getTextTranslation } from "@/utils/utils";
import { data } from "@/app/api/recipe";
import { useRecipeData } from "@/contexts/useRecipeData";

interface Row_PlatingQuantityProps {}

// TODO: this component can probably be deleted, unless a quick bulk mode is created?
const Row_PlatingQuantity: React.FC<Row_PlatingQuantityProps> = () => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();

  const name = getTextTranslation("quantity");

  return (
    <>
      <Table_Cell firstCol={false} header={false} type="text" iconName="123" key={name}>
        <span>{name}</span>
      </Table_Cell>
      {data.portions.map((portion, iP) => (
        <Table_Cell header={false} type="text" key={name + "_" + iP}>
          <span>{qty}</span>
        </Table_Cell>
      ))}
    </>
  );
  // PLATING QTY
};

export default Row_PlatingQuantity;
