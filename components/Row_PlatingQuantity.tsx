import React from "react";

import Table_Cell from "./Table_Cell";
import { formatWeight, getTextTranslation } from "@/lib/utils";
import { data } from "@/app/data/recipe";
import { useRecipeData } from "@/contexts/UseRecipeData";

interface Row_PlatingQuantityProps {}

const Row_PlatingQuantity: React.FC<Row_PlatingQuantityProps> = ({}) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();

  const name = getTextTranslation("quantity");

  return (
    <>
      <Table_Cell firstCol={false} header={false} type="text" iconName="123" key={name}>
        ---<span>{name}</span>
      </Table_Cell>
      {data.portions.map((portion, iP) => (
        <Table_Cell header={false} type="clear" key={name + "_" + iP}>
          <div>{qty}</div>
        </Table_Cell>
      ))}
    </>
  );
  // PLATING QTY
};

export default Row_PlatingQuantity;
