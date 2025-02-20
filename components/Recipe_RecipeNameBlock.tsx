import React, { ReactNode } from "react";
import DottedBorder from "@/components/DottedBorder";
import TextEditable from "@/components/TextEditable";
import MenuOption1 from "@/components/MenuOption1";
import { getTextTranslation } from "@/libs/utils";
import MenuOption2 from "@/components/MenuOption2";
import Pill from "@/components/Pill";
import { useRecipeData } from "@/contexts/UseRecipeData";

interface Recipe_RecipeNameBlockProps {}

const Recipe_RecipeNameBlock: React.FC<Recipe_RecipeNameBlockProps> = ({}) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  return (
    <DottedBorder className="grid grid-cols-1 content-evenly gap-y-6">
      <TextEditable<"data.recipeName"> initialTextObject={{ "data.recipeName": recipeData.data?.recipeName }} />
      <TextEditable<"data.recipeDesc"> initialTextObject={{ "data.recipeDesc": recipeData.data.recipeDesc }} />

      <div className="flex flex-wrap justify-center items-stretch gap-1 w-full">
        <MenuOption1>
          <Pill edit="edit" className="text-xs" iconName="visibility">
            {getTextTranslation("metric")}: g/Kg
          </Pill>
        </MenuOption1>

        <MenuOption2>
          <Pill className="text-xs" iconName="event" edit="options">
            <div className="grid grid-rows-2 leading-none">
              <div>Last Saved</div>
              <div className="text-[8px] leading-tight">22 {getTextTranslation("Oct")} 2024 11h34 (WK)</div>
            </div>
          </Pill>
        </MenuOption2>

        <MenuOption2>
          <Pill tone="dark" className="text-xs" iconName="add_circle" edit="options">
            {getTextTranslation("Save")}
          </Pill>
        </MenuOption2>

        <MenuOption2>
          <Pill className="text-xs" edit="options" iconName="checklist"></Pill>
        </MenuOption2>
      </div>
    </DottedBorder>
  );
};

export default Recipe_RecipeNameBlock;
