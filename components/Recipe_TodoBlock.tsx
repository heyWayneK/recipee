import React from "react";
import DottedBorder from "./DottedBorder";

import { getTextTranslation } from "@/libs/utils";
import Pill from "./Pill";
import TextLink from "./TextLink";

interface Recipe_TodoBlockProps {}
const Recipe_TodoBlock: React.FC<Recipe_TodoBlockProps> = () => {
  return (
    <DottedBorder className=" bg-gradientGreyDarkerBott">
      <div className="flex flex-col items-start justify-items-start gap-4  h-min">
        <div className="flex gap-4">
          <Pill tone="dark" edit="" className="text-sm" iconName="done_outline">
            {getTextTranslation("Todo")}
          </Pill>
          <Pill tone="white" edit="options" className="text-sm relative" iconName="skillet">
            <span>{getTextTranslation("Chef Feedback")}</span>
            <div className="absolute top-[-4px] right-[-4px] text-white bg-red-700 w-4 h-4 rounded-full aspect-square leading-none flex place-items-center justify-center text-[9px]">2</div>
          </Pill>
        </div>
        <Pill tone="white" edit="edit" className="text-xs line-clamp-1" iconName="done_outline">
          <div>3 days ago - Review WK Feedback</div>
        </Pill>
        <Pill tone="white" edit="edit" className="text-xs line-clamp-1" iconName="hourglass_top">
          <div>3 days ago - Review WK Feedback</div>
        </Pill>
        <Pill tone="white" edit="edit" className="text-xs font-bold line-clamp-1" iconName="done_outline">
          <div>3 days ago - Review WK Feedback</div>
        </Pill>
        <TextLink className="text-xs line-clamp-1" onClick={() => {}}>
          -- see all --
        </TextLink>
      </div>
    </DottedBorder>
  );
};

export default Recipe_TodoBlock;
