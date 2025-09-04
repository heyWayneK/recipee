import React, { useContext } from "react";
import Table_Cell from "./Table_Cell";
import MenuOption1 from "./MenuOption1";
import MenuOption2 from "./MenuOption2";
import Pill from "./Pill";
import { getTextTranslation } from "@/utils/utils";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import ButtonThemeLightDark from "./ButtonThemeLightDark";

interface Row_ControlsPlatingProps {
  viewPrices: boolean;
  handleViewPrices: () => void;
  className?: string;
}
const Row_ControlsPlating: React.FC<Row_ControlsPlatingProps> = ({ className = "", viewPrices, handleViewPrices }) => {
  const { qty, setQty, recipeData } = useRecipeDataStore();
  const name = "controls_for_components";

  const handleAddComponent = () => {};
  const handleAddPlatingQty_g = () => {};

  return (
    <Table_Cell firstCol={false} header={false} type="controls" iconName="">
      {/* SHOW PRICES BUTTON */}

      {/* Add Component Row and Sub Recipe 
        - Add component to db
        - data.recipes[?]
      */}
      <Pill tone="dark" iconName="add_circle" className=" capitalize" onClick={handleAddComponent}>
        {getTextTranslation("add_component")}
      </Pill>

      {/* Add Plating quantity column */}
      <Pill tone="dark" iconName="add_circle" className=" capitalize" onClick={handleAddPlatingQty_g}>
        {/* // Add another Plating size */}
        {getTextTranslation("add_plating_quantity")}
      </Pill>

      {/* VIEW PRICES BUTTON TOGGLE */}
      <Pill tone="white" className="text-xs" iconName={viewPrices ? "visibility_off" : "visibility"} edit="" onClick={handleViewPrices}>
        {viewPrices ? <span className=" capitalize">{getTextTranslation("hide_prices")}</span> : <span className=" capitalize">{getTextTranslation("show_prices")}</span>}
      </Pill>
    </Table_Cell>
  );
};

export default Row_ControlsPlating;
