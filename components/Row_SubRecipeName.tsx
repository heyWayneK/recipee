import React from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";
import { ComponentsProps } from "@/app/data/recipe";
import ToggleThemeLightDark from "./ToggleThemeLightDark";

interface Row_SubRecipeSubNameProps {
  subRecipe: ComponentsProps;
  colorNum: number;
}

const Row_SubRecipeSubName: React.FC<Row_SubRecipeSubNameProps> = ({ subRecipe, colorNum }) => {
  return (
    <Table_Cell className="" firstCol={false} header={false} type="controls" rowNum={colorNum} iconName="" key={"Row_SubRecipeSubNameProps"}>
      <span className=" text-base-100  line-clamp-1">{subRecipe.name}</span>

      <div className="">
        <ToggleThemeLightDark />
        <Pill tone="white" className=" text-xs" edit="" onClick={() => {}}>
          Yield: {subRecipe.yield ?? 0 * 100}%
        </Pill>
        <Pill tone="white" className="flex " iconName="arrow_drop_down" edit="" onClick={() => {}}>
          Version
          {/* {data.components[subRecipeId].version} */}
        </Pill>
      </div>
    </Table_Cell>
  );
};

export default Row_SubRecipeSubName;
