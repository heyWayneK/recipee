import React from "react";
import DottedBorder from "@/components/DottedBorder";
import TextEditable from "@/components/TextEditable";
import MenuOption1 from "@/components/MenuOption1";
import { getTextTranslation } from "@/utils/utils";
import MenuOption2 from "@/components/MenuOption2";
import Pill from "@/components/Pill";
import { useRecipeData } from "@/contexts/useRecipeData";

interface Recipe_RecipeNameBlockProps {}

const Recipe_RecipeNameBlock: React.FC<Recipe_RecipeNameBlockProps> = () => {
  const { recipeData } = useRecipeData();
  // const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  return (
    <DottedBorder className="grid grid-cols-1 content-evenly gap-y-6 ">
      <TextEditable initialTextObject={{ "data.name": recipeData.data?.name }} />
      <TextEditable initialTextObject={{ "data.desc": recipeData.data.desc }} />

      {/* BUTTON: Metric or Imperial Button */}
      <div className="flex flex-wrap justify-center items-stretch gap-1 w-full">
        <MenuOption1>
          <Pill edit="edit" className="text-xs" iconName="visibility" tone="white">
            {getTextTranslation("metric")}: g/Kg
          </Pill>
        </MenuOption1>

        {/* BUTTON -  LAST SAVED BUTTON */}
        <MenuOption2>
          <Pill className="text-xs" iconName="event" edit="options" tone="white">
            <div className="grid grid-rows-2 leading-none">
              <div>Last Saved</div>
              <div className="text-[8px] leading-tight">22 {getTextTranslation("Oct")} 2024 11h34 (WK)</div>
            </div>
          </Pill>
        </MenuOption2>

        {/* BUTTON - SAVE BUTTON */}
        <MenuOption2>
          <Pill tone="dark" className="text-xs" iconName="add_circle" edit="save">
            {getTextTranslation("Save")}
          </Pill>
        </MenuOption2>

        {/* BUTTON - SETTINGS BUTTON */}
        <MenuOption2>
          <Pill className="text-xs" edit="options" iconName="checklist"></Pill>
        </MenuOption2>
      </div>
    </DottedBorder>
  );
};

export default Recipe_RecipeNameBlock;
