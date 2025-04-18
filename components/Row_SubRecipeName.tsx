import React from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";
import { ComponentsProps } from "@/app/data/recipe";

interface Row_SubRecipeSubNameProps {
  subRecipe: ComponentsProps;
  colorNum: number;
}

const Row_SubRecipeSubName: React.FC<Row_SubRecipeSubNameProps> = ({ subRecipe, colorNum }) => {
  return (
    <Table_Cell className="" firstCol={false} header={false} type="controls" rowNum={colorNum} iconName="" key={"Row_SubRecipeSubNameProps"}>
      <span className=" text-white text-lg line-clamp-2 leading-none">{subRecipe.name}</span>

      <div className="">
        <Pill tone="white" className=" text-xs" iconName="" edit="" onClick={() => {}}>
          Yield: {subRecipe.yield ?? 0 * 100}%
        </Pill>
        <Pill tone="white" className="max-w-20 line-clamp-1" iconName="arrow_drop_down" edit="" onClick={() => {}}>
          Version
          {/* {data.components[subRecipeId].version} */}
        </Pill>
      </div>
    </Table_Cell>
  );
};

export default Row_SubRecipeSubName;
