import { useRecipeData } from "@/contexts/useRecipeData";
import React from "react";

type UnitCurrenctFormatterProps = {
  children: number | string;
};

const UnitCurrencyFormatter: React.FC<UnitCurrenctFormatterProps> = ({ children }): React.ReactElement => {
  const { recipeData } = useRecipeData();

  if (!children) throw new Error("Invalid children prop");

  return (
    <span>
      {recipeData.currencySymbol} {Number(children).toFixed(2)}
    </span>
  );
};

export default UnitCurrencyFormatter;
