import React, { useContext } from "react";
import Table_Cell from "./Table_Cell";
import MenuOption1 from "./MenuOption1";
import MenuOption2 from "./MenuOption2";
import Pill from "./Pill";
import { getTextTranslation } from "@/utils/utils";
import { useRecipeData } from "@/contexts/useRecipeData";
import ButtonThemeLightDark from "./ButtonThemeLightDark";

interface Row_ControlsPlatingProps {
  viewPrices: boolean;
  handleViewPrices: () => void;
  className?: string;
}
const Row_ControlsPlating: React.FC<Row_ControlsPlatingProps> = ({ className = "", viewPrices, handleViewPrices }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  const name = "controls_for_components";

  return (
    <Table_Cell firstCol={false} header={false} type="controls" iconName="">
      {/* SHOW PRICES BUTTON */}
      <ButtonThemeLightDark />
      <MenuOption1>
        <span className=" capitalize">{getTextTranslation("add_component")}</span>
      </MenuOption1>
      <MenuOption2>
        <span className=" capitalize">{getTextTranslation("add_step")}</span>
      </MenuOption2>

      {/* VIEW PRICES BUTTON TOGGLE */}
      <Pill tone="white" className="text-xs" iconName={viewPrices ? "visibility_off" : "visibility"} edit="" onClick={handleViewPrices}>
        {viewPrices ? <span className=" capitalize">{getTextTranslation("hide_prices")}</span> : <span className=" capitalize">{getTextTranslation("show_prices")}</span>}
      </Pill>
    </Table_Cell>
  );
};

export default Row_ControlsPlating;
