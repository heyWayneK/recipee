import { useRecipeData } from "@/contexts/useRecipeData";
import Decimal from "decimal.js";
import React from "react";

type UnitCurrenctFormatterProps = {
  children: number | string | Decimal;
};

const UnitCurrencyFormatter: React.FC<UnitCurrenctFormatterProps> = ({ children = undefined }): React.ReactElement => {
  const { recipeData } = useRecipeData();

  if (children === undefined) throw new Error("Invalid children prop");

  return (
    <span className=" text-nowrap">
      {recipeData.currencySymbol} {Number(children).toFixed(2)}
    </span>
  );
};

export default UnitCurrencyFormatter;
