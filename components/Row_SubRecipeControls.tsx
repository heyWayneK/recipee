import React from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";
import { getTextTranslation } from "@/utils/utils";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import ButtonThemeLightDark from "./ButtonThemeLightDark";
import { RecipesInDataProps } from "@/types/recipeTypes";

interface Row_SubRecipeControlsProps {
  recipe: RecipesInDataProps;
  // className?: string;
  // subRecipeId: string;
}
const Row_SubRecipeControls: React.FC<Row_SubRecipeControlsProps> = () => {
  // FUTURE: Might need const { qty, setQty, userData, localOrDbData } = useRecipeDataStore();

  return (
    <Table_Cell firstCol={false} header={false} type="controls" iconName="" key={"Row_SubRecipeControls"}>
      {/* SHOW PRICES BUTTON */}
      <Pill tone="dark" className="text-xs uppercase font-medium" edit="" onClick={() => {}}>
        {getTextTranslation("sub_recipe")}
        {/* {components.portions} */}
      </Pill>
      <div>
        <ButtonThemeLightDark />
        <Pill tone="white" className="text-xs" iconName="speech_to_text" edit="" onClick={() => {}}>
          {getTextTranslation("give_chef_feedback")}
        </Pill>
        <Pill tone="white" className=" text-xs bg-red-600 text-red-50 [&>svg]:fill-white" iconName="warning" edit="" onClick={() => {}}>
          {getTextTranslation("you_have_feedback")}
        </Pill>
      </div>
    </Table_Cell>
  );
};

export default Row_SubRecipeControls;
