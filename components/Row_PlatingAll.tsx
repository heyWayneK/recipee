import React, { useState } from "react";
import Row_PlatingHeading from "./Row_PlatingHeading";
import Table_DynamicTableCols from "./Table_DynamicTableCols";
import DottedBorder from "./DottedBorder";
import Row_ControlsPlating from "./Row_ControlsPlating";
import Row_PlatingQuantity from "./Row_PlatingQuantity";
import Row_PlatingHeader from "./Row_PlatingHeader";
import Row_PlatingList from "./Row_PlatingList";
import Row_PlatingIngredientSubTotal from "./Row_PlatingIngredientSubTotal";
import Row_PlatingPackagingCosts from "./Row_PlatingPackagingCost";
import Row_PlatingOtherCost from "./Row_PlatingOtherCost";
import Row_PlatingCostsSubTotal from "./Row_PlatingCostsSubTotal";
import Row_PlatingMarkup from "./Row_PlatingMarkup";
import Row_PlatingSalesPriceExVat from "./Row_PlatingSalesPriceExVat";
import Row_PlatingSalesPriceInclVat from "./Row_PlatingSalesPriceInclVat";
import Row_PlatingPrint from "./Row_PlatingPrint";
import { useRecipeData } from "@/contexts/UseRecipeData";

interface Row_PlatingAllProps {}

const Row_PlatingAll: React.FC<Row_PlatingAllProps> = () => {
  const [viewPrices, setViewPrices] = useState(false);

  const { qty, recipeData } = useRecipeData();

  function handleViewPrices() {
    // e.preventDefault();
    setViewPrices(!viewPrices);
  }

  return (
    <DottedBorder className=" grid grid-cols-1 justify-items-center mb-8">
      {/* TODO: <Row_EditOrProduction data={data} /> */}
      <Row_PlatingHeading />

      {/* COL LENGTH ARRAY defines how many cols needed */}
      <Table_DynamicTableCols className=" gap-x-7" colLengthArray={recipeData.portionSizes.length}>
        <Row_ControlsPlating viewPrices={viewPrices} handleViewPrices={handleViewPrices} />

        {qty > 1 && <Row_PlatingQuantity />}

        <Row_PlatingHeader viewPrices={viewPrices} />

        <Row_PlatingList viewPrices={viewPrices} />

        <Row_PlatingIngredientSubTotal viewPrices={viewPrices} />

        <Row_PlatingPackagingCosts viewPrices={viewPrices} />

        <Row_PlatingOtherCost viewPrices={viewPrices} />

        <Row_PlatingCostsSubTotal viewPrices={viewPrices} />

        <Row_PlatingMarkup viewPrices={viewPrices} />

        <Row_PlatingSalesPriceExVat viewPrices={viewPrices} />

        <Row_PlatingSalesPriceInclVat viewPrices={viewPrices} />

        <Row_PlatingPrint viewPrices={viewPrices} />
      </Table_DynamicTableCols>
    </DottedBorder>
  );
};

export default Row_PlatingAll;
